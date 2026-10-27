---
layout: post.njk
title: "Getting the words right, and why polishing didn't help"
date: 2026-10-27
permalink: /posts/getting-the-words-right/
series: "Translation From Scratch"
part: 7
---

[Part 6](/posts/what-structure-first-translation-is-good-for/) ended on an optimistic note: the structure was learnable, the vocabulary was handled, and what remained looked like a word-order problem. Then I typed a sentence into the demo that a real person would type.

> **Can you drop me at the airport.**
>
> क्या आप मुझे एयरपोर्ट पर **गिरावट** हैं?

गिरावट is "a drop" — as in *a drop in share prices*. The sentence asks whether you *are* a decline at the airport. The order is fine. The postposition is fine. The word is wrong, and the verb is a bare है. This post is about the two problems hiding in that one line — word sense and tense — and about an idea that should have fixed fluency and didn't, which turned out to be the most informative failure of the whole project.

## Problem one: the skeleton threw the tense away

The verb first. I went looking and found something embarrassing: *announced*, *announces* and *will announce* all produced the same Hindi verb, किया. The structure model wasn't confused about tense. It had never been told. When the English sentence becomes a skeleton, every verb becomes `V1` — and `V1` has no tense. The Hindi side of the training data carried a tense tag on its slots (`V1.mse` = masculine, singular, perfective), so the model learned to *emit* tense — but with nothing on the source to condition on, it emitted the most common one: the news-corpus perfective.

The fix is one character. English verb slots now carry the English tense: `V1.p` (past), `V1.r` (present), `V1.n` (infinitive / future with *will*), and so on. Retrain, and the tenses separate: *announced* → perfective किया, *announces* → habitual करते हैं, the future lands on its own form. Verb-form accuracy (gender + number + tense) went from 0.366 to 0.387 — small, because most verbs in the corpus are past-tense news, but the behaviour is now right.

The general lesson took me longer to absorb than it should have: **the skeleton is only as good as what it keeps.** Everything the abstraction drops, the model has to guess. That lesson comes back, much bigger, in [part 9](/posts/the-glue-was-hidden/).

## Problem two: one dictionary entry per word

Now the word. The read-out looks up each English content word in a bilingual dictionary built from the word alignments, and that dictionary stores the *most frequent* Hindi translation. For *drop*, in a corpus of news, that's गिरावट. The right sense — छोड़ना, "to drop someone off" — was in the data. We had just thrown it away when we took the argmax.

So the first step was to stop throwing it away: a **multi-sense dictionary**, built from the same alignments, that keeps every Hindi lemma an English word was aligned to, with counts. For *drop*: गिरावट (5), बूंद "a droplet" (5), छोड़ना (4). About 5,500 English words have more than one real sense.

Then you need something that picks a sense from context. I tried two, and the difference between them is a neat illustration of why embeddings won:

- **Collocations** (a Naive-Bayes vote over the context words seen with each sense) are transparent — you can print the words that voted — and work for frequent senses. But *airport* never co-occurred with *drop* in training, so there was nothing to vote with.
- **Nearest neighbours over contextual embeddings.** The aligner is a fine-tuned multilingual BERT, so it already produces a context-dependent vector for every word occurrence. Store up to a couple of dozen occurrences of each ambiguous word (about 100k vectors in all), labelled with the sense the alignment gave them; at translation time, embed the new occurrence and see which sense's neighbours it lands near. *Drop me at the airport* lands among the occurrences where *drop* meant leaving someone somewhere, and छोड़ना wins.

Getting the kNN right took three fixes worth writing down, because each one is a general trap:

1. **Constrain the vote to the word's own sense list.** Unconstrained, a neighbour from a different word can win, and the system cheerfully returns a Hindi word that isn't a translation of *drop* at all.
2. **Average the best few neighbours per sense; don't sum all of them.** Summing lets the frequent sense win on sheer numbers, which is the bias we were trying to escape.
3. **Only override the default with a margin.** If the best sense barely beats the majority sense, keep the majority sense.

With that, *drop me at the airport* became क्या आप मुझे एयरपोर्ट पर छोड़… — right sense, still rough verb form.

## Looking inside: what the structure model attends to

At this point I wanted to *see* what the structure model was doing, so I pulled out its cross-attention: for each Hindi skeleton token it generates, how much it looks at each English skeleton token.

![Cross-attention heatmap for "The boy gave a book to his sister." Rows are the predicted Hindi skeleton (N1 boy, ने, अपने, N3 sister, को, NUM, N2 book, V1 gave); columns are the English skeleton. अपने attends mostly to "his" and "sister"; को attends to the region around "a book"; a lot of mass sits on the final period.](/img/attn_sam_hi_am2_0.png)

It is readable in places — अपने ("his own") looks at *his* and *sister*; को looks at the recipient region — and murky in others: a lot of attention sits on the final full stop, a common "sink" in small transformers, and some rows land one token to the side of where you'd expect. Attention maps are a flashlight, not a proof.

But look at the row label `N3.msx(sister)`. The model marked *sister* — बहन, a feminine noun — as masculine. It had to: it never sees which Hindi word fills `N3`. It predicts the gender of a slot without knowing the word. Remember that row; it becomes the key to [part 10](/posts/rules-or-learning/).

## The idea that should have fixed fluency

By now each sentence came out with roughly the right words in roughly the right order — and still read as broken Hindi. The natural idea (and a good one) was a **smoother**: a second, monolingual Hindi→Hindi seq2seq model that takes the mechanical read-out and polishes it into fluent Hindi. Keep the faithful, inspectable pipeline; bolt fluency on at the end.

**Version 1** was trained on (read-out → reference Hindi) pairs. It was worse on everything: chrF 0.326 → 0.232, and 96% of its outputs changed the *content* of the sentence. The reason is obvious in hindsight. The references are loose human translations, so the model learned "rewrite this into something like a reference" — and it hallucinated toward them. *No new taxes* became *no new programs*. A content-diff guard caught it (it reverted 96% of the outputs), which made the smoother safe and useless.

**Version 2** fixed the training signal: a denoising autoencoder. Take the *reference* Hindi, corrupt its grammar while keeping its content fixed — wrong inflection of the same word, dropped or duplicated function words, a dropped final auxiliary, a local swap — and train the model to restore it. Now the only thing it can learn is grammar. Content drift fell from 96% to 47% and faithfulness held. And fluency didn't move at all.

## The judge that told me why

To score these smoothers honestly I needed something better than chrF (which [lied before](/posts/chrf-lied-labse-didnt/)) and better than LaBSE (which only measures meaning). I used **Jev**, a calibrated judgment API from TypeSafe, which answers typed questions — yes/no probabilities and ordered scores — and asked it three separate things: *is it faithful*, *how much of the meaning does it convey* (0–3), *how fluent is the Hindi* (0–3).

| | faithful | adequacy /3 | fluency /3 |
|---|---|---|---|
| our read-out | 0.25 | 1.70 | 0.63 |
| smoother v1 | 0.09 | 0.99 | 0.54 |
| smoother v2 (denoising) | 0.23 | 1.57 | 0.64 |
| reference Hindi | 0.56 | 2.48 | 2.26 |

That table reframed the project. LaBSE had said we were at 96% of the reference's semantic score, and that was true — the *meaning* mostly got through. What LaBSE couldn't see was that our Hindi scored 0.63 out of 3 for fluency against the reference's 2.26. **The gap was never adequacy. It was fluency, and it was huge.** (Jev also caught the references being noisy: the reference itself was judged fully faithful only 56% of the time.)

And it explained the smoother. A denoiser can fix साइटें → साइट. It cannot invent a verb the read-out never produced, or put back a postposition the skeleton never contained. Our read-outs weren't slightly wrong Hindi with surface errors; they were missing pieces. **Fluency lives upstream** — in what the structure model is allowed to see and produce — not in post-processing.

I didn't yet know *which* pieces were missing, or why. Finding that out took a detour through someone else's translator, which is the next post.

---
layout: post.njk
title: "Indexing words, and the alignment problem"
date: 2026-08-13
permalink: /posts/indexing-words-and-the-alignment-problem/
series: "Translation From Scratch"
part: 3
---

A translated skeleton is a grammatical frame full of holes. To turn it back into a sentence, every hole has to be filled with the right Hindi word in the right place. This post is about how the words get carried across the reordering — and about the single unglamorous component that turns out to gate the whole system's quality.

## Indices instead of blanks

In [the last post](/posts/translating-structure-not-words/) the skeleton replaced every content word with its bare part of speech, which loses the identity of the word. The fix is to replace it with an **indexed** slot instead. The first noun becomes `N1`, the second `N2`, the first verb `V1`, the first adjective `A1`, and so on. Crucially, the *same index is shared* between the English and Hindi skeletons for words that correspond:

```
en:  N1 ne  N2 ko  N3 V1        (the boy gave a book to his sister)
hi:  N1 ne apni N3 ko ek N2 V1  (लड़के ने अपनी बहन को एक किताब दी)
```

Now the structure model's job is sharper: predict the Hindi skeleton *including which index goes where*. If it puts `N2` (book) after `N3` (sister) and marks `N3` with को, it has done the reordering **and** told us how to fill the holes. Read-out is then mechanical: `N1` → लड़का, `N2` → किताब, `N3` → बहन, and inflect. The transformer never sees the words, only the indices — so it stays a pure structure model — but the indices are a routing table back to the content.

Measured, this indexed version reaches **0.86 token similarity** and, more importantly, **0.93 order-concordance** — a rank measure of whether pairs of shared words appear in the same relative order in prediction and reference. An identity copy scores 0.54 there (that's chance). So the model is genuinely *reordering English content into Hindi order*, not copying.

## Where the indices come from: word alignment

The catch is that shared index. To know that English `book` and Hindi किताब are the same slot, something has to align them — the exact problem SMT solved with GIZA++ and friends. I use a neural aligner, [awesome-align](https://github.com/neulab/awesome-align), which is a multilingual BERT fine-tuned to produce word correspondences from a sentence pair. For each pair it emits links like *boy↔लड़के, book↔किताब, gave↔दी*, and those links assign the shared indices.

When alignment is good, the pipeline is clean. When it misses, you get an **orphan**: an English content word that never received an index, so at read-out time there's no Hindi word to emit for it — and it leaks through as the English word sitting in the middle of a Hindi sentence. Orphans are the single biggest source of ugliness in the output, and fighting them is most of the engineering.

## Fighting orphans

Two levers moved the orphan rate the most.

**Argmax-union alignment.** awesome-align's default extraction keeps only links that clear a probability threshold in *both* directions (source→target and target→source). That's high precision but drops a lot of real links on rarer words. Adding each token's single best partner in *either* direction — a bidirectional argmax union, gated by a mild floor so it doesn't attach to punctuation — recovers a chunk of them. On a fixed slice this cut the content-word orphan rate from **0.354 to 0.272**, about a fifth fewer, with the downstream part-of-speech filter cleaning up the few bad links it lets in.

**Dictionary-backed recovery.** After aligning the whole corpus once, you have a learned bilingual lexicon as a side effect (every alignment is a vote for an English↔Hindi word pair). A second pass uses it: for an English content word the aligner missed, look it up in that lexicon and, if the corresponding Hindi word is sitting unclaimed in the target sentence, pair them and assign an index. This recovered tens of thousands of alignments and — because a recovered word now *has* an index — the transformer places it in Hindi order instead of the read-out guessing by English order. It fixed both coverage and ordering at once.

## The data was lying to me

Here is the part I did not expect, and it's the most important lesson of the whole project.

I built the first version on the **IIT-Bombay English–Hindi corpus**, because it was easy to get. The numbers were *excellent* — order concordance 0.95, verb agreement 0.92, a chrF (surface-similarity) score of 0.57. I was pleased.

Then I looked at what the corpus actually was. It's dominated by software-localization strings: *"Highlight last event entry," "Start / stop event recording," "Could not load signature."* Short, repetitive, templated UI text with a tiny recurring vocabulary. On data like that, everything is easy — the word order is trivial, the same few verbs recur, alignment nails the handful of words that ever appear. The great scores were an artifact of a **low-entropy corpus**, not a good translator. And the visible symptom was that everyday words the corpus never contained — *girl, flower, mother* — had no Hindi in the learned dictionary, so the demo spat them back in English.

So I switched to [Samanantar](https://ai4bharat.iitm.ac.in/samanantar/), AI4Bharat's large web-mined corpus of real English–Hindi **prose**, and pulled ~320,000 clean sentence pairs. The bilingual dictionary grew from about **2,000 words to 47,000**. And every metric got *worse*: order concordance fell to 0.83, chrF to 0.31.

That drop is the honest signal. Real prose is genuinely harder than UI strings — diverse vocabulary, complex clauses, real reordering, and some web-mining noise. The IIT-Bombay numbers had been a mirage the entire time. But the *sentences* got better: real vocabulary, readable Hindi, only the occasional English orphan leaking through. The task got harder and the output got more honest.

Which raises an awkward question the surface metrics couldn't answer: if the scores went down but the sentences looked better, *which one do I believe?* Before I could trust any of it I had to deal with two more things — the morphology (so the Hindi is actually inflected correctly), and the measurement itself (so I know what "better" even means). Those are the next two posts.

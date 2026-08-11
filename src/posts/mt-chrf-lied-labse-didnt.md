---
layout: post.njk
title: "chrF lied, LaBSE didn't"
date: 2026-08-15
permalink: /posts/chrf-lied-labse-didnt/
series: "Translation From Scratch"
part: 5
---

By this point in the project I had a translator whose scores kept disagreeing with my eyes. Switching to real prose data made the numbers *drop* but the sentences *better*. Wiring in a working morphological model didn't move the score at all. Either the translator was fooling me, or the metric was. This post is about discovering it was the metric, and about what you do when your ruler is broken.

## What chrF measures, and why it failed here

The score I'd been quoting is **chrF** — character n-gram overlap between the system output and a reference translation. It's a standard, reasonable surface metric: if your output shares a lot of character sequences with the reference, chrF is high.

It has one assumption baked in: **the reference is correct, and close to the one right answer.** That assumption held on the IIT-Bombay UI strings, where a short command has essentially one canonical translation. It fell apart on Samanantar prose, for two compounding reasons.

First, there are many correct ways to translate a sentence, and chrF rewards only surface agreement with the *particular* one on file. A translation can be perfectly faithful and share few character n-grams with the reference because it made different, equally valid wording choices.

Second — and this was the real problem — **the references themselves are noisy.** Samanantar is web-mined, and some of its pairs are loose paraphrases or outright misalignments. My favorite example, straight from the test set:

> **English:** The woman has been rushed to a Lucknow hospital.
> **Our output:** महिला को लखनऊ अस्पताल में पहुँचे है। *(the woman has been brought to a Lucknow hospital)*
> **Reference:** महिला की लखनऊ के अस्पताल में मौत हो गई। *(the woman died in a Lucknow hospital)*

Our translation is *more faithful to the English than the reference is.* chrF, dutifully, penalized us for not matching the reference's mistranslation. When your ruler is bent, every measurement is wrong in the same invisible direction.

## A reference-independent measure

The fix is to stop trusting the reference as the sole ground truth. I used **LaBSE**, a multilingual sentence encoder that maps English and Hindi into the *same* embedding space, so you can measure semantic similarity *across* languages. That unlocks a measurement the reference can't poison:

> **adequacy = cosine( our Hindi output, the source English )**

This asks directly: *how much of the source meaning survived into the translation?* It needs no reference at all, so noisy references can't distort it. And to calibrate the scale, I computed two anchors:

- a **ceiling** — cosine(gold reference, source English): how adequate the *human* reference itself is against the source;
- a **floor** — cosine(our output, a mismatched source sentence): what chance looks like.

Here is the whole story in four numbers, on 1,500 held-out sentences:

| | LaBSE cosine vs. source |
|---|---|
| our translation | **0.758** |
| gold reference (ceiling) | 0.802 |
| mismatched pair (floor / chance) | 0.201 |

Read that carefully, because it's the vindication of the entire approach. On a scale where chance is 0.20, our interpretable, structure-first, few-million-parameter translator preserves **0.758** of the source meaning — and the *human reference* only manages **0.802**. We are at about **94% of the reference's own adequacy.** The chrF score of 0.31 that made the system look broken was measuring the noise in the references, not the quality of the translation.

Two things fall out of this. The ceiling being **0.80 rather than ~1.0** quantifies exactly how loose the Samanantar references are — that gap *is* the reference noise, made numeric, and it's the reason chrF understated everything. And the gap from our 0.758 to that 0.80 ceiling is the *real* remaining headroom: not vocabulary (that's handled), but residual word-order slips and the last few orphans.

## A twist about the orphans

There's a coda that sharpened my understanding of my own system. Remember the English words that leak through when alignment misses. I added an external bilingual dictionary — the **MUSE** English–Hindi lexicon, ~32,000 entries — to translate those orphans instead of leaving them in English. It worked, on its own terms: the fraction of Latin-script tokens in the output dropped from **0.094 to 0.042**, more than halving the visible leaks. *announced → घोषित, within → अन्दर, own → अपनी.* The output reads as clean, monolingual Hindi now.

And its effect on the LaBSE adequacy score was… none. 0.758 with the dictionary, 0.758 without.

That surprised me until it didn't. LaBSE is multilingual; it reads *through* a stray English word embedded in a Hindi sentence and recovers the meaning anyway. The leaks were hurting **readability**, not **adequacy** — they were a cosmetic problem, not a semantic one. The dictionary makes the output look like a real translation (which matters for anyone reading it), without adding meaning that was already getting through.

Which is its own lesson, and maybe the meta-lesson of the whole project: **you have to measure the thing you actually care about.** chrF measured surface overlap and called a good translator broken. Leak rate measured readability and called the dictionary a big win. LaBSE-vs-source measured adequacy and showed both the translator's real quality and the dictionary's real irrelevance to meaning. Three rulers, three different truths, and you only get the right answer by picking the ruler that matches the question. The last post steps back and asks what a translator built this way is actually *for*.

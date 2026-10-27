---
layout: post.njk
title: "A fingerprint, not a fence"
date: 2026-09-20
permalink: /posts/a-fingerprint-not-a-fence/
series: "The Shape of a Story"
part: 11
---

Two papers landed recently that read like independent confirmations of this whole
project's founding bet — that the *structure* of text, not its surface style, is
what separates machine writing from human writing. **StoryScope**
([arXiv:2604.03136](https://arxiv.org/abs/2604.03136)) shows discourse-level
narrative features tell AI fiction from human fiction at 93% macro-F1, with
distinct per-model fingerprints. **SlopShape**
([arXiv:2609.15369](https://arxiv.org/abs/2609.15369)) replicates it on commercial
blogs and lands the punch I most wanted to see: **98% detection that stays 98%
when every AI post is reworded by its own model.** Structure survives paraphrase;
word choice doesn't.

That's the claim [part 6](/posts/what-its-actually-good-for/) made and the one my
Stage-16 detection experiment *failed* to demonstrate cleanly. But the papers also
point at *why* I failed: they don't use a learned embedding (what I used, and what
came back a muddle), they use an **LLM to score interpretable structural features**
directly. I happen to have exactly that tool now — the calibrated critic
[from the last post](/posts/a-critic-in-the-loop/). So I redid detection the way
they suggest, and the result is more interesting than a win: it's a clean split
into what structure *can* and *can't* do, with one generator that makes the whole
thing legible.

## The instrument

Thirteen questions, each scored by the critic on a whole document, all about *how*
the text is built rather than *what* it says: does it over-explain its point? is
the organization formulaic? is the voice generic or idiosyncratic? how uniform are
the sentence rhythms? how specific are the details? does it wrap up with a neat
conclusion? — and so on. Content-free by design, so a paraphrase shouldn't move
them. Each document becomes a 13-number structural vector. Against it, everywhere,
I run a **word-level baseline** (character n-grams) — the classic surface detector.

Three tests. They don't agree, and the disagreement is the finding.

## Test 1 — rewording. Structure holds; surface collapses.

Matched human/AI pairs, then paraphrase the AI side and re-test (SlopShape's move):

| detector | normal | after rewording |
|---|---|---|
| structural (13 features) | 0.670 | **0.617** |
| word-level (char n-gram) | 0.639 | **0.485** |

The structural detector barely flinches. The word-level detector doesn't just
weaken — it drops **below chance (0.485)**: paraphrase *flips* it. This is the
SlopShape result in miniature, and it's the thing that makes structure worth
caring about. Surface detection is a mirage the moment anyone runs the text
through a rewriter.

## Test 2 — an unseen generator. Structure *loses*.

Now the hard test: train on some AI generators, detect a generator the model has
*never seen*. On MAGE, holding out one generator at a time:

| detector | mean AUC across held-out generators |
|---|---|
| structural | 0.670 |
| word-level | 0.770 |

Sit with that, because it's an honest negative. **Structure does *not* transfer to
an unseen generator better than surface** — if anything, worse. And on one
generator, `text-davinci-003`, the structural detector scored **0.198** — far below
chance. Trained on the other models, it confidently rates davinci's AI text as
*more human than the humans*. This is exactly the Stage-16 negative I reported
before, reproduced with a better instrument. Structure, it turns out, is a bad
*fence*: it can't keep out a machine it hasn't met.

## Test 3 — which model wrote it. Structure *wins*.

But StoryScope kept saying **fingerprints** — each model has a characteristic
structure. A fingerprint is useless for spotting a stranger and perfect for
identifying someone you know. So I flipped the question from "is this AI?" to
"*which* model wrote this?" — attribution across six generators:

| detector | accuracy | (chance 16.7%) |
|---|---|---|
| structural (13 features) | **61.1%** | 3.7× chance |
| word-level (char n-gram) | 32.8% | — |

Structure nearly *doubles* the surface baseline at naming the author. The
per-model signature that was useless for detecting a stranger is highly
discriminative for identifying a known one — the same 79%-attribution result
SlopShape reports, from thirteen general questions.

## The generator that explains everything

One model ties the three tests into a single story. `text-davinci-003`:

- **Test 2 (detection): 0.198** — the *worst*. Its structure is so unlike the other
  generators that a detector trained on them can't recognize it as machine at all.
- **Test 3 (attribution): 93% recall** — the *best*. Its structure is so
  distinctive that identifying a text *as* davinci is trivial.

Worst at detection, best at attribution — **the same fingerprint, doing opposite
jobs.** That's not a contradiction; it's the whole thesis in one data point. A
fingerprint identifies *this* individual precisely (great attribution) and tells
you nothing about individuals you've never fingerprinted (poor open-set detection).

## What structure actually is

Put the three together and the claim sharpens into something I'd defend:

> The structure of text is **surface-robust** and **model-characteristic**. That
> makes it excellent for rewording-robust discrimination and for attribution, and
> poor for detecting a generator you've never seen.

Which finally makes sense of the old Stage-16 negative. It wasn't that structure is
a weak signal — it's that I was measuring the *one thing fingerprints are bad at*
(spotting a stranger) and concluding the fingerprint didn't exist. It does. It's
just a fingerprint, not a fence.

The honest caveats stand: small samples (a few dozen docs per generator), thirteen
untuned questions where the papers use two to three hundred, and older base-model
generators. The absolute numbers would climb with their instrument. But the
*shape* of the result — robust to rewording, strong at attribution, weak at
unseen-generator detection, and one generator that proves all three are the same
phenomenon — is exactly what the fingerprint thesis predicts, and it's the most
coherent account this series has had of what a content-free structural signal is
for.

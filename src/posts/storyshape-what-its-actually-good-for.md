---
layout: post.njk
title: "What it's actually good for"
date: 2026-08-07
permalink: /posts/what-its-actually-good-for/
series: "The Shape of a Story"
part: 6
---

Five stages of honest measurement had left me with a clear verdict on the thing I
set out to build. As a *predictor* of how a story moves, the structure embedding
is weak — the signal is faint, sentence-local, and meaning turned out to be a
predictability mirage.

But the same measurements were quietly pointing at what the embedding *is* good
at. Every time it won, it won by being **characteristic** — by describing a text
so distinctively that you could tell what kind of text it was, or who wrote it.
That's a discriminative tool, not a generative one. So I pointed it at two
discriminative problems.

## It fingerprints an author

Style is form: sentence rhythm, how you handle your cast, how heavily you modify,
how deep your clauses run. All of which this embedding captures, with zero
vocabulary. So I asked it to attribute authorship across fifteen public-domain
authors, testing on *held-out works* so it can't just memorize a book.

Content-free form alone identified the author with **98.0% accuracy** — against a
6.7% chance baseline. Adding meaning barely moved it (98.6%). A near-perfect
authorial fingerprint, built from grammar and cast dynamics, that never once
looked at *what* the author was writing about.

Why does the content-free part matter more than the slightly higher content
score? Because the moment your author writes about something new — or someone
imitates their subject matter but not their syntax — a content model is lost and
a form model isn't. Style is the robust signal. This is the forensic-linguistics,
plagiarism, ghostwriting use case, and form is exactly the part you want doing
the work.

## It catches machines it has never seen

The other problem is machine-text detection, and here the structure embedding
targets a known blind spot. The usual detectors read content and word-likelihood;
they get fooled by LLM prose whose *form* is the tell (the relentless
rule-of-three, the antithesis, the tidy staccato). Form is content-free — which,
this repo has found before, is exactly the property that lets a signal
**transfer to generators it never trained on.**

So I ran the test that matters: train on some LLMs, then detect text from a
*different, unseen* LLM. The numbers (AUC, held-out generator):

- content (meaning): **0.815** — the *worst* transferrer. It learns one
  generator's vocabulary and topics, which don't carry to the next.
- content-free form: **0.861** — it keys on syntax and cast dynamics, which do
  carry. It generalizes to unseen models better than meaning.
- content + form: **0.882** — best of both.

The hypothesis held: the content-free channel is the transfer-robust one. It's
not usable alone — its false-positive rate on human text is too high (around a
fifth), the same caution this repo has raised about every pure-form detector — so
it belongs as a *contributing feature group* alongside the word-likelihood
features that keep false positives near 5%, adding the cross-generator robustness
the likelihood half lacks.

## Where it landed

I started out trying to predict the shape of a story and found that the shape, as
a *forecast*, is faint. But the honest negatives kept sharpening what the tool
actually is: not a crystal ball for narrative, but a remarkably clean *description*
of how a text is built. Point it at "who wrote this" or "is this a machine" and it
earns its keep. Point it at "what happens next" and it will politely remind you
that most of a story's next sentence is just the story staying on topic.

That's a smaller claim than "stories have a predictable shape." It's also true,
which — around here — is the only kind of claim worth keeping.

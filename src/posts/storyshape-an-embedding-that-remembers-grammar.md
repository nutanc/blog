---
layout: post.njk
title: "An embedding that remembers grammar"
date: 2026-08-02
permalink: /posts/an-embedding-that-remembers-grammar/
series: "The Shape of a Story"
part: 1
---

Here are two sentences:

> It's not a bug, it's a feature.
> It's not about money, it's about respect.

They mean completely different things. They are also, unmistakably, the same
sentence — the same *antithesis* skeleton, the same rhythm, the same rhetorical
move. Any human sees it instantly.

Ask a sentence embedding model — SBERT, or whatever powers your favourite
semantic search — and it will tell you they're miles apart, because it was
trained to capture what a sentence is *about*. Form is exactly the thing it's
built to discard. That's usually a feature. But if you care about *style*, or
*structure*, or the shape of how a story is told rather than what it's about,
you're holding the wrong instrument.

So I set out to build the opposite instrument: an embedding where those two
sentences land on top of each other, and two sentences about the same topic in
different grammar land apart.

## Structure is a small problem

The encouraging thing about this goal is that it's *easier* than a meaning
embedding, not harder. Meaning lives in a vocabulary of a hundred thousand words;
you need the whole internet to learn it. Structure lives in a vocabulary of
about seventeen part-of-speech tags and forty grammatical relations. The entropy
is orders of magnitude lower. And you can manufacture unlimited training signal
for free: take any sentence, swap its content words for other words of the same
part of speech, and you have a guaranteed *structural twin* with different
meaning.

The recipe I settled on: run each sentence through a dependency parser, then
throw the content away. Nouns, verbs, adjectives become their POS tag; function
words and punctuation stay. "It's not a bug, it's a feature" and "It's not about
money, it's about respect" both collapse toward `it is not ... , it is ...` — the
skeleton. Embed the skeleton and you have a form vector.

## But form alone forgets who's on stage

The first thing I noticed is that a pure skeleton is not just content-free, it's
*identity-free*. It can't tell that the same character keeps reappearing. And in
a story, who's on stage — and whether it's the same who as the last sentence — is
most of what structure *means*.

So I added an entity grid (an old idea from Barzilay and Lapata's work on
coherence). The first distinct noun-phrase head becomes E1, the next new one E2,
and so on; each sentence records which known characters appear and in what role
(subject, object), and whether a brand-new one just walked in. Now the skeleton
of a Sherlock passage carries "E1 did something to E2, then E1 spoke" — the
choreography of the cast, still without a single content word.

A collaborator asked the obvious follow-up: if you track recurring *nouns*, why
not recurring *verbs* and *adverbs* too — to catch the choices the author makes?
The answer turned out to be a nice distinction. For nouns, recurrence is
identity — the *same character* came back, which is narrative. For verbs and
modifiers, tracking *which specific word* repeats just smuggles content back in
through the side door. But the *instinct* was right: the content-free version of
"the author's choices" is **recurrence rate and density** — does this writer
reuse verbs or keep reaching for new ones? how heavy is the modifier load? Those
are distributional, so they stay content-free while capturing style. Nouns get
identity slots; verbs and adjectives get rates.

## What we've got

At the end of stage one we have, for every sentence, a content-free vector that
encodes its grammar, its cast, and its author's rhythmic habits — and nothing
about its subject matter. On a controlled test it does exactly what SBERT
refuses to: it puts structural twins together and topical twins apart.

That's a nice widget. The real question is what happens when you string these
vectors together and watch a whole story move through the space. Does a story
have a *shape*?

That's where it gets interesting — and where I walked straight into a trap.

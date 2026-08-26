---
layout: post.njk
title: "A model that plans its own shape"
date: 2026-08-12
permalink: /posts/a-model-that-plans-its-own-shape/
series: "The Shape of a Story"
part: 8
---

At the end of [the last post](/posts/a-knob-not-an-engine/) I had a story generator
you could steer, but the steering came from outside — a little bigram chain chose
the sequence of shapes and the transformer just rendered words into it. The model
obeyed a plan; it never made one.

The original dream of this whole project was the opposite. Way back, the goal I
wrote down was *next-token prediction where the prediction is the shape* — a model
that looks at the story so far and chooses the **shape of the next sentence**, the
way a normal language model chooses the next word. This post is that model, built
and measured, and it comes with a genuinely clean trade-off I didn't expect.

## Give the transformer a second mouth

The change is small to describe. A normal language model has one output head: a
softmax over the word vocabulary that predicts the next word. I gave the
transformer a **second head** — a softmax over the 64 shapes that predicts the
next *shape*. Same body, same attention, two things to say at each step: the next
word, and the shape of the sentence it belongs to.

Training is a joint loss: word cross-entropy plus a weighted shape cross-entropy.
At generation there is no external planner anymore. The model writes a sentence in
the current shape; at the sentence boundary it consults its *own* shape head to
pick the next sentence's shape; and it writes on. The structure is emergent —
predicted by the model, from context, as it goes. I'll call this arm **shapehead**.

## The bug that was baked into the interface

My first version worked, but it had a subtle flaw that's worth spelling out because
the fix is the interesting part.

I fed the shape in *causally* — at each position the model saw the shape of the
token it had just written, and predicted the shape of the next one. Clean, but it
means the shape of a new sentence only becomes available to the model **one token
too late**. The first word of every sentence got generated while the model was still
conditioned on the *previous* sentence's shape. Each sentence opened blind to its
own structure and only "locked in" from the second word on.

You can feel this in the numbers, and I could feel it in the stories: the arm was
choosing shapes fine, but it wasn't *realizing* them as faithfully as the arm that
was simply handed the shape.

The fix is a re-timing. Make the word input **target-aligned** — every word,
including the first of a sentence, is conditioned on *its own* sentence's shape,
exactly like the pertoken arm. Then, to have that shape ready in time at generation,
make the shape head predict **two ahead**: at the end of a sentence it forecasts the
next sentence's shape, so that shape is known *before* the first word is drawn. And
because the model is fed the current shape while predicting the one after, the
prediction can't just copy its input — no leakage. The boundary lag disappears.

## What killing the lag bought

Same data, same steps, same seed — the only thing that changed is the interface.
Against the lagged version:

| | lagged | **lag-free** |
|---|---|---|
| adherence (does it realize its own plan?) | 0.169 | **0.187** |
| — lift over chance | +0.145 | **+0.164** |
| gender-clash ↓ (pronoun/gender errors) | 0.217 | **0.167** |
| GPT-2 PPL ↓ (fluency) | 24.6 | 25.9 |
| shape-JS to real ↓ | 0.394 | 0.391 |

Two things moved, both the right way.

**Adherence went up.** The model realizes the structure it planned more faithfully —
which is exactly what fixing the lag should do, since now each sentence's first word
finally sees the shape it's supposed to belong to. It's climbing toward the
*dictated* ceiling: the pertoken arm, which is simply *handed* the shape by an
external planner, sits at 0.227. Self-planning is now within striking distance of
being told.

**Gender-clash dropped** — from 0.217 to 0.167, toward the plain baseline's 0.100.
Fewer "the girl… he…" slips. Giving the opening word of each sentence its own
structural context made the model more locally coherent, not just more on-plan. That
matters, because coherence was the whole reason to like this arm.

The one wobble is GPT-2 PPL, up slightly to 25.9 — but that's within
sampling noise between runs, and it's still the most fluent of the *structured*
arms. I wouldn't read a real fluency regression into it.

## The trade-off, stated plainly

Put shapehead next to the externally-planned arms and a clean picture appears. There
are two ways to get structure into a story:

- **Dictate it** (pertoken + an external planner): maximum control — adherence 0.227,
  the highest — but the realized story drifts very slightly off-distribution, because
  you're forcing shapes the model didn't choose.
- **Let the model plan it** (shapehead): less control — adherence 0.187 — but the
  most *natural* result. It stays on-distribution (shape-JS 0.391, essentially tied
  with the plain model) and reads the most coherently, because it only ever plans
  structure it can actually render.

Control versus naturalness. Dictating structure buys you a tighter grip at a small
cost in naturalness; letting the model choose recovers the naturalness and gives up
some grip. Neither is strictly better — you can now pick your point on that line,
which is a more useful place to be than "structure adds nothing."

## What it writes

Raw output — lowercase, and the odd spacing around quotes is just the detokenizer:

> once upon a time, there was a little girl named lily. she loved to play with her
> toys every day. one day, lily's mom said, "lily, your toy is broken. you have to
> buy your own toy." lily didn't want to buy it… lily was happy to have her toy car.
> from that day on, lily and her friends played with their toys together.

> once upon a time, there was a girl called amy. she had a big garden full of
> flowers and toys. she liked to look at the flowers and the birds that made it
> sparkle in the sun. one day, amy started to feel anxious. she wanted to rest and
> play with her friends. "can i see my leaves?" asked her mom.

Consistent named characters, correct *she/her* and *they/their* agreement, real
arcs — *once upon a time* → event → resolution. The weak spot is semantic drift: a
story wanders from flowers to birds to leaves, or conflates buying a toy with buying
money. That's the same honest limit this project keeps finding — **the form is
low-entropy and generatable; meaning is the hard part.** The model plans and renders
grammar beautifully and still doesn't fully *understand* what it's saying.

Which raises the obvious question, the one that has quietly explained every failure
in this arc: how much of that is just a small model that hasn't read enough? That's
[the next and last post](/posts/how-much-was-just-data/).

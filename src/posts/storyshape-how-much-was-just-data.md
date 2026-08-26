---
layout: post.njk
title: "How much of it was just data?"
date: 2026-08-12
permalink: /posts/how-much-was-just-data/
series: "The Shape of a Story"
part: 9
---

Every post in this generative arc has ended on the same shrug: the structure is
real but faint, the model plans grammar it can't fully mean, the stories drift.
And every time, a small voice asked whether I was blaming the architecture for
something much more boring — a model that simply hasn't read enough. This post
takes that voice seriously, because when I finally tested it, it was mostly right.

## The control that settled it

The cleanest way to separate "the idea is weak" from "the model is starved" is to
change *only* the amount of data and hold everything else fixed. So I took the
plain word transformer — no structure, no shapes, just [nanoGPT on
words](/posts/nanogpt-without-a-vocabulary/) — and trained it twice: once on 12k
TinyStories, once on 150k. Same architecture, same steps, same everything.

| | 12k stories | 150k stories | real TinyStories |
|---|---|---|---|
| GPT-2 PPL ↓ | 26.8 | **20.5** | 14.1 |
| gender-clash ↓ | 0.075 | **0.050** | — |

The incoherence I'd been philosophizing about mostly **dissolved**. The stories
went from muddled to genuinely coherent, with correct pronoun agreement and
sensible little plots — the same lesson the TinyStories paper reported, reproduced
here from the wrong direction. The earlier fast overfitting wasn't a wall in the
idea; it was starvation. Data was the lever the whole time.

That reframes the honest verdict of this series. Two levers, and they are
**orthogonal**:

- **Data** is the *quality* lever. More stories → more fluent, more coherent text.
  Nothing structural required.
- **Structure** is the *control* lever. It buys you a steering knob and a
  self-planning target ([parts 7](/posts/a-knob-not-an-engine/) and
  [8](/posts/a-model-that-plans-its-own-shape/)), and it costs quality nothing —
  but it doesn't *add* quality either.

You can watch them stay separate in the structured runs, too. Going from 58k to
150k stories, the plain baseline's fluency improved (GPT-2 PPL 23.3 → 20.1),
*and* the control got better and cleaner — adherence rose (the pertoken arm went
from +0.170 to +0.203 over chance) and the off-distribution penalty on steering
vanished (shape-JS to real fell from 0.457 to 0.393). More data helped the engine
and the knob. What it did **not** do is close the gap between the structured arms
and vanilla on quality. That gap isn't a data problem. It's the whole point:
structure was never the thing making the stories good.

## The wall

If data is the lever, the obvious move is to pull it harder — 500k stories, more
steps. And here the project ran into a wall that has nothing to do with ideas and
everything to do with a laptop.

The structure pipeline is memory-hungry in a way plain training is not. To assign a
shape to every sentence it has to hold *all* the parsed records in RAM at once,
plus a dense sentence-embedding array for the whole corpus. At 150k stories that's
already near the ceiling of a 16GB machine. At 500k it's an estimated 35GB-plus of
RAM and ~24GB of disk for the embedding cache alone — comfortably impossible on the
hardware I'd been using. The plain baseline scales cheaply because it needs none of
that apparatus; the *structured* arms are the expensive ones, precisely because
they carry the shape machinery.

So the honest thing was to stop pretending the laptop could do it and package the
run for a machine that can. I made the code device-portable — it now selects CUDA,
Apple's MPS, or CPU automatically, no edits — and bundled a clean source snapshot,
both environment specs (the spaCy parser and the torch modeling side live in
separate virtualenvs, because one needs an old NumPy and the other a new one), a
run script, and a written guide, ready to hand to a colleague with a real GPU box.
One important note baked into the guide: at a *fixed* step count, more data alone
under-trains — you have to scale steps with stories — so the 500k run pairs the
data with twice the training.

## What I expect, and what I don't

I'm writing this before the big run finishes, so let me be honest about the
prediction rather than dress it up as a result. On the 500k / longer-training run I
expect the plain baseline's fluency to keep sliding toward real TinyStories (from
~20 toward ~14), because that's what the whole scaling curve has done so far. And I
expect the self-planning shapehead arm's adherence to keep climbing toward the
dictated ceiling, for the same reason control improved from 58k to 150k.

What I do **not** expect — and would be delighted to be wrong about — is for more
data to suddenly make structure a *source* of quality. Everything in this arc says
those two things live in different rooms. If 500k stories change that, it's a real
finding; if they don't, it's the thesis holding at scale.

## Where the shape of a story landed, part two

The [first half of this series](/posts/what-its-actually-good-for/) ended by saying
the structure embedding is a great *description* and a weak *forecast* — good for
telling who wrote a text or whether a machine did, bad for guessing what comes next.

The generative half ends a step further along. Point the shape at *making* stories
and it's still not the engine — data and attention write the good sentences. But it
is a clean, cheap **control surface**: you can dictate a story's grammar sentence by
sentence, or let the model plan its own and stay natural while it does. That's the
[goal I started with](/posts/a-model-that-plans-its-own-shape/) — a model that
predicts the shape — actually built, and honestly, it works about as well as a
faint-but-real signal was ever going to. The shape of a story is not a crystal ball
and not a muse. It's a knob. It turns out a good knob is worth having.

---
layout: post.njk
title: "A knob, not an engine"
date: 2026-08-09
permalink: /posts/a-knob-not-an-engine/
series: "The Shape of a Story"
part: 7
---

The [last post](/posts/what-its-actually-good-for/) closed a verdict: as a
*description* of how a text is built, the structure embedding is excellent — good
enough to fingerprint an author or catch an unseen machine. As a *forecast* of
what happens next, it's faint. That was supposed to be the end.

But there's a third thing you can do with a signal that's too weak to predict and
too clean to ignore: you can **feed it back in**. Not "predict the shape" and not
"describe the shape," but *condition a generator on the shape* — hand a story
model the structural plan and make it write to spec. If the shape is a real
handle on how a sentence is built, then telling a model "make this one a short
action beat, now a long descriptive one, now a line of dialogue" should make it
write better, more controllable stories.

That is a generative claim, and this project had only ever made discriminative
ones. So I built the experiment to test it honestly.

## The testbed: tiny stories

You can't test story *generation* on Sherlock and Moby-Dick — a model small
enough to train on a laptop can't write Victorian prose, so you'd be measuring the
model's incompetence, not the structure channel. You need a corpus simple enough
that a tiny model can actually write it well, so that any *difference* between
"with structure" and "without" is attributable to the structure, not to the model
drowning.

So I moved to **TinyStories** — a couple of million three-year-old-vocabulary
stories, the corpus that exists precisely to ask "how small can a language model
be and still write coherent English?" I re-fit the shape vocabulary here: the same
recipe as [before](/posts/a-language-model-with-no-words/) — a content-free
skeleton embedding plus entity and style dynamics, PCA, then **64 KMeans
clusters**. The shapes are legible: dialogue turns, fresh-cast scene-setters,
terse action beats, long descriptive sentences. On TinyStories the shape *grammar*
is even stronger than in literature (the corpus is near-template), which made it
the ideal place to see whether the channel helps.

## Three ways to wire structure into a transformer

I trained a plain word-level transformer — about 14M parameters, the kind of thing
[nanoGPT](/posts/nanogpt-without-a-vocabulary/) is — on the same stories, for the
same number of steps, in three arms that differ *only* in how the shape gets in:

- **vanilla** — no structure at all. A normal next-word language model. The control.
- **prefix** — before each sentence, emit one `<Sk>` token naming that sentence's
  shape. The model sees the plan as a token in the stream (this was an earlier design).
- **pertoken** — add the current sentence's shape *embedding* to every token
  position. The structural intent is present in the residual stream at every step,
  not just at a boundary.

For the two structured arms, generation is driven by a tiny **planner** — a bigram
Markov chain over shape ids, learned from real stories — that decides the sequence
of shapes; the transformer's only job is to render words into that plan.

To grade it, three numbers:

- **GPT-2 PPL** — an *independent* GPT-2 scoring the generated stories' fluency.
  It never saw our shapes; it just says how story-like the text reads. Lower is better.
- **adherence** — re-parse each generated sentence, find its nearest shape, and
  check whether it matches the shape the planner asked for. This is *control*: did
  the model obey?
- **shape-JS to real** — how far the generated *distribution* of shapes drifts
  from real TinyStories. This catches a model that obeys locally but produces a
  globally weird mix.

## The result: control is real, quality is not

Here are the well-fed numbers (about 150k stories):

| arm | GPT-2 PPL ↓ | adherence (lift over chance) | shape-JS to real ↓ |
|---|---|---|---|
| vanilla | **20.1** | — | 0.393 |
| prefix | 27.3 | +0.177 | 0.409 |
| pertoken | 27.6 | **+0.203** | 0.400 |

Read the columns against each other and the finding falls out.

**Quality: vanilla wins.** The plain model writes the most fluent stories. Feeding
structure in did *not* make the stories better — if anything the independent judge
liked the structured arms slightly less. Whatever makes a tiny model write
coherent TinyStories, it is not a structural plan; it is data and attention.

**Control: the structured arms obey.** Adherence runs at roughly six to eight times
chance. The model genuinely writes the shape it's told to — dialogue when asked for
dialogue, a terse beat when asked for terse. And **pertoken beats prefix**: keeping
the structural signal alive at every position is a better interface than a single
boundary token. It makes sense — the residual stream carries the plan the whole
way, so attention doesn't have to route it from one marker.

So the honest one-liner: **structure is a knob, not an engine.** You can steer this
generator's grammar precisely, for free, and it costs the stories nothing — but it
adds nothing to their quality either. Quality comes from somewhere else.

## The distortion that data erased

There's a subtlety worth its own paragraph, because it's the part that changed with
scale. When I first ran this at *small* data (about 12k stories), steering had a
price: forcing the planner's shapes dragged the realized story *off-distribution*.
The model could only faithfully render maybe one in five requested shapes, so
forcing the rest bent the output into something globally unlike real stories — the
shape-JS to real blew up to 0.40 for the steered arm versus 0.06 for vanilla.

At 150k stories that penalty is **gone**. Look at the table again: the structured
arms' shape-JS (0.400–0.409) is essentially vanilla's (0.393). A generator with
enough data is strong enough to render whatever the planner asks *without*
distorting itself. Control went from "expensive and distorting" to "free and
clean" — purely by feeding the model more stories.

That is the first appearance of a theme that turns out to run under everything in
this generative arc: **the interesting failures were data-starvation, not
architecture.** I'll come back to exactly how much data in [part 9](/posts/how-much-was-just-data/).

## The itch this leaves

I had a controllable story generator. I could hand it a structural score and it
would play it. But the plan was coming from a dumb bigram chain bolted onto the
side — the transformer never *decided* the structure, it only obeyed. And the
whole project started, years of honest negatives ago, from a different dream:
[predict the shape itself](/posts/a-language-model-with-no-words/). Not obey a
plan — *make* one. Let the model look at the story so far and choose the shape of
the next sentence, the way it already chooses the next word.

That's the [next post](/posts/a-model-that-plans-its-own-shape/): a model that
plans its own structure as it writes.

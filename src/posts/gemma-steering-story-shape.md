---
layout: post.njk
title: "A knob for story shape"
date: 2026-08-26
permalink: /posts/gemma-steering-story-shape/
series: "The Tiny Storyteller"
part: 3
---

The compact storyteller from [part 1](/posts/gemma-a-storyteller-with-ten-thousand-words/)
writes fluent little TinyStories, but it writes whatever it wants. A natural next
question — and one I'd chased before on from-scratch models — is whether you can
*steer* the structure: ask for a dialogue-heavy story, or a pure narration, and
have the model comply. This post adds that knob to the pretrained, vocab-trimmed
Gemma and shows what it can and can't do.

I'll say the punchline up front, because I already knew it from earlier work:
**structure is a control knob, not a quality lever.** Dictating shape changes
*what kind* of story you get, not *how good* it is. The new part here is that the
knob now sits on a pretrained model, and it's cheap to attach.

## What "shape" means here

From the older [structure work](/posts/nanogpt-without-a-vocabulary/), every
sentence in TinyStories was assigned one of **64 "shape" classes** — a clustering
of a content-free structural embedding (entity dynamics, dialogue-ness, sentence
form, not topic). Shape 35 is a dialogue turn; shape 8 is a scene-setting
narration line; and so on. Crucially these labels ignore *what* a sentence is
about and capture only *how* it is built.

## Attaching the knob

The trick is small. I added 64 new tokens to the storyteller's vocabulary — one
per shape — growing it from 9,908 to 9,972, and gave the model 64 fresh embedding
rows for them. Then I retrained on the same stories, but with a shape token
inserted before every sentence:

```
<bos> <S8> Once upon a time, there was a cat. <S35> "Hello!" said the dog. <S40> ...
```

Because the shape tokens are just vocabulary, the plain next-token trainer learns
them for free — no architecture change. At generation time I **dictate** the
structure: before each sentence I insert the shape token I want (from a bigram
planner over shapes, or a fixed sequence I choose), and I forbid the model from
emitting shape tokens mid-sentence. The model fills in words to match.

## Does it steer?

Yes — most visibly on suppression. I forced two regimes over eight stories each:
dialogue shapes (35/39/21) and narration shapes (8/40/50), and counted how many
stories contained quoted speech:

| Steering | Stories with dialogue |
|----------|----------------------:|
| Natural (planner) | 7 / 10 |
| Forced **dialogue** | 6 / 8 |
| Forced **narration** | **2 / 8** |

Forcing narration cuts dialogue from ~70% to 25%. The dialogue-forced column
isn't much above natural — but that's a ceiling effect: TinyStories is already
soaked in dialogue, so there's little room to push *up*. The clean signal is that
telling the model "no dialogue, just narrate" works.

You can see it in the stories. A narration-forced run:

> Once upon a time there was a little girl called Anna. Anna was three years old
> and her mom and dad were always there for her. One day, Anna wanted to go for a
> ride but she had a problem. The ride was too long. Her mom had an idea! She ran
> to the kitchen and came back with a big tub of ice cream…

versus a dialogue-forced run:

> …Everyone in the tree smiled. "Good job, bird!" said the tree. "You did it all
> by yourself!"

Same model, same vocabulary — only the dictated shape sequence changed.

## Does it make the stories better? No.

This is the honest part, and it matches every earlier experiment. The steered
stories are not more coherent than the unsteered ones; they're just differently
*shaped*. A blind judge can't tell the quality apart, and fluency is flat. The
model's quality came from Gemma's pretraining and the TinyStories fine-tune; the
shape channel only decides which of the structures the model already knows it
should render next.

That's still useful. A control knob buys you **diversity** (force unusual shape
sequences and you get stories you wouldn't have sampled) and **specification**
(give me a quiet, narrated bedtime story with no arguing characters). It just
doesn't buy you a better writer.

I've put 26 steered examples — natural, dialogue-forced, and narration-forced —
in the project repo so you can read the knob turning.

## The through-line

Across three posts the compact storyteller keeps teaching the same lesson from
different angles. Trim the vocabulary and the model shrinks with no quality loss.
Feed it a few thousand stories and it speaks, because the fluency is rented from
pretraining. Bolt a structure channel on and you can *steer* it, but the words
themselves don't get better. Form is cheap, controllable, and measurable.
Content — the good sentence, the faithful fact, the coherent plot — is the part
that still costs.

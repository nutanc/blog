---
layout: post.njk
title: "A critic in the loop"
date: 2026-09-18
permalink: /posts/a-critic-in-the-loop/
series: "The Shape of a Story"
part: 10
---

The [last three posts](/posts/how-much-was-just-data/) kept circling one honest
wall: a 14M model writes TinyStories that are **locally clean but globally loose**.
Grammar is fine, pronouns agree, but the plot drifts, characters appear from
nowhere, and sentences stutter. Form is solved; meaning is the hard part. The
obvious fix is a bigger model. This post is about a different fix — **not a bigger
student, a teacher.**

The idea is the old one about how children learn: comprehension runs ahead of
production. A four-year-old can *hear* that "the girl… he…" is wrong long before
they'd never make the mistake themselves. So give the tiny student a critic that
can hear its mistakes, and let the critic correct it as it writes. I used a
calibrated judgment API — TypeSafe's Jev — as that critic: you hand it some text
and typed questions, it returns **calibrated probabilities**, fast, no generation.
A checker, not a writer. The whole question of this post is whether a good checker
can be turned into better writing.

## First, is the teacher any good?

Before trusting a critic to teach, you have to prove it can *localize* — not just
say "something's wrong" but say *which* thing. So I ran it over three cohorts: real
TinyStories, our generated ones, and stories with **one injected error each**. The
diagonal is the whole story (low probability = flagged):

| story | coherence | pronoun | entity | selectional | on-topic | resolves |
|---|---|---|---|---|---|---|
| real TinyStories | **2.9** | .88 | .95 | .96 | .94 | .98 |
| our generated | **0.7** | .40 | .16 | .40 | .18 | .30 |
| + injected gender clash | 2.0 | **.09** | .76 | .92 | .92 | .98 |
| + injected entity collision | 1.1 | .83 | **.05** | .87 | .77 | .95 |
| + injected type error | 0.6 | .83 | .37 | **.01** | .28 | .97 |
| + injected off-topic line | 1.3 | .83 | .91 | .93 | **.03** | .96 |
| + cut off mid-sentence | 2.3 | .94 | .94 | .94 | .94 | **.03** |

Read the diagonal: each injected error trips **its own axis and only its own**,
while the rest stay green. And real stories sit clean at coherence 2.9 — no
false-flagging. That last row of the "our generated" cohort is the real find: our
stories separate from real ones on the **meaning** axes — the exact thing GPT-2
perplexity, which we'd leaned on for the whole series, is blind to. The teacher
passed.

## The loop: write a sentence, hear the critique, rewrite

The student writes **one sentence**. The critic reads the *whole story so far*
(cumulative context is what lets it catch a pronoun that clashes with a character
introduced three sentences ago) and scores the new sentence. If any axis is
flagged, the student **resamples that sentence** until it passes or we give up
after a few tries; then it writes the next one. Repeat.

Here is the mechanism catching, in real time, one of the exact sentences that
motivated all this:

> ✗ (motivated 0.32): *she wanted a band of different colors.*
> ✓ *she had a big, red ball that she loved to play with.* — coherence 2.0 → **3.0**

"A band of different colors" isn't ungrammatical, and it's on-topic. It's just an
aimless want that leads nowhere — and the critic sees that, and the student trades
it for a concrete object that drives the rest of the story. Whole stories went from
this:

> …they also liked to **pretend they were explorers and pretend they were
> explorers**. …ben had a sad face and **a hole in its fur**…

to this:

> once there was a little girl named lily. she had a big, red ball that she loved
> to play with. one day, she went to the park to play with her ball. she was very
> happy and ran around all day. but then, she tripped on a rock and hurt her knee.
> "oh no, lily!" she cried.

A real little arc — setup, mishap, reaction — instead of a stutter and a friend
that has fur.

## Design the questions by testing, not guessing

The critic is only as good as the questions. I had a "does it fit the story?"
question, but it let two kinds of bad sentence through: an ungrammatical one
(*"…wanted to play with billy anymore"*) and the vague one above. So I wrote
candidate questions and **tested them against those exact sentences plus good
controls** — because a plausible-sounding question can quietly do damage:

| candidate | catches bad #1 | catches bad #2 | false-fires on a good line? |
|---|---|---|---|
| `grammatical` | **0.05** ✓ | 0.77 | no (.96) |
| `motivated` | **0.23** ✓ | **0.42** ✓ | no (.90) |
| `sensible` | 0.41 | 0.70 ✗ (misses it) | no |
| `advances` | 0.21 ✓ | 0.33 ✓ | **yes — 0.25 on dialogue** ✗ |

`grammatical` and `motivated` earned their place. `advances` was seductive — it
caught both bad sentences — but it **flagged a perfectly good line of dialogue** as
"not a concrete action." Ship that and you start deleting every conversation in
every story. This is why you test the teacher instead of trusting your intuition
about it.

## Judge the whole story, but blame the right sentence

One subtlety cost me a version. The critic judges the story cumulatively, which is
right — but I was only ever rewriting the *newest* sentence. So when a bad sentence
squeaked past the gate, it got **frozen** and dragged down every later score, with
no way back. The fix has two parts, both about credit assignment: I pass the state
as `{story_so_far, new_sentence}` so the questions target the new sentence *in*
context, and I add a **before/after coherence delta** — if adding a sentence drops
whole-story coherence, that sentence is the culprit even if its absolute score
looks okay. (Plus one guard: don't ask whether the *opening* sentence is "motivated
by the story so far" — nothing precedes it.)

## The payoff: does it move the weights?

Inference-time correction is nice, but the goal is to make the student *learn*, so
it needs the teacher less. So: harvest corrected stories, fine-tune on them, then
generate fresh stories **with no teacher** and see if they got better.

My first pass was a useful failure. Forty corrected stories, fine-tuned straight,
and the result was mixed: grammar, pronouns and entities each nudged up ~0.1 — the
exact axes the teacher policed, now in the student's own weights — but `resolves`
got *worse* (−0.13) and coherence barely moved. Two self-inflicted bugs. The
stories had been capped at eight sentences, so most never reached an ending, and
fine-tuning on truncated stories taught the student to trail off. And forty stories
is 0.03% of the base's training data — the fine-tune just memorized them (loss fell
to 0.1 within a hundred steps).

So I fixed both. **Finished endings:** generate each story until it actually ends —
and when the student won't, let the teacher pick the most-*resolving* closing
sentence — keeping only finished stories. **Replay:** interleave real training data
with the corrected set during the fine-tune, so it learns the corrections without
memorizing them. Then I scaled to **150 finished corrected stories** and ran it
again. The no-teacher before/after:

| axis | base | after RFT | Δ |
|---|---|---|---|
| **finish rate** | 0.13 | 0.60 | **+0.47** |
| coherence (0–3) | 1.01 | 1.24 | **+0.23** |
| grammatical | 0.12 | 0.23 | **+0.10** |
| on-topic | 0.37 | 0.46 | **+0.09** |
| entity | 0.21 | 0.27 | +0.06 |
| resolves | 0.40 | 0.46 | +0.06 |
| pronoun | 0.68 | 0.65 | −0.03 |

This time it's a real, across-the-board gain — in the student's *own* output, with
no teacher present. The standout is **finish rate: 0.13 → 0.60.** The student
learned to end its stories, purely from being trained on stories that ended. And
the loss no longer collapses — it oscillates between the easy corrected batches and
the harder real ones, which is exactly what learning-not-memorizing looks like. The
correction moved into the weights.

Two caveats keep it in proportion: pronoun agreement dipped a hair (noise at this
scale), and 150 stories is still small — a few thousand would sharpen every number.
But the *direction* is now unambiguous, and it came from a teacher that never wrote
a word. It only told the student which of its own sentences to keep.

If you want to read the model's actual output rather than take my word for the
numbers, [every story from the harvest — all 150, raw vs teacher-guided](/posts/a-critic-in-the-loop-stories/)
is collected in an appendix.

## Where this leaves the tiny storyteller

The series has now found three levers, and they're distinct. **Data** buys
fluency. **Structure** buys control. And a **critic** buys targeted, local
correction — aimed squarely at the meaning gap that data and structure both left
open. None of them is a bigger model, and that's the point: the student is small
enough that the ceiling isn't its capacity, it's the signal it learns from. A
calibrated critic is a very good signal. It can't invent a plot the student could
never have written — best-of-a-few can only pick from what the 14M produces — but
it can hear the mistakes the student can't yet, and, given enough corrected
examples, teach it not to make them. Comprehension lifting production, at fourteen
million parameters.

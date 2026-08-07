---
layout: post.njk
title: "Meaning is a mirage, grammar is real"
date: 2026-08-06
permalink: /posts/meaning-is-a-mirage/
series: "The Shape of a Story"
part: 5
---

Everything so far predicted the next *form*. But form is a thin, low-information
channel — a few percent of predictability. The obvious lever was to make the
token carry more: predict the next sentence's *meaning* (its ordinary SBERT
embedding), or meaning-plus-form, instead of the bare skeleton. Surely "what
happens next" is more predictable than "what grammar next."

I ran three tokens through the identical pipeline — same model, same split, only
the token changes — and measured, for each, how much the model beat the copy
baseline. That gap is the thing that matters: it's the structure the model
*learns*, over and above the autocorrelation a dumb copy already exploits.

| token | how predictable (top-5) | gap over copy |
|---|---|---|
| form (grammar) | 0.271 | **+0.099** |
| content (meaning) | 0.374 | **−0.029** |
| content + form | 0.308 | **+0.118** |

Read the middle row twice. Content is the *most predictable* token by raw
score — and its model **loses to copy.** A negative gap.

## The mirage

Here's what's happening. The next sentence's *meaning* is easy to retrieve, but
only because prose stays on topic — the next sentence is about roughly what this
one was about. "Predict next meaning = current meaning" (copy) is therefore a
brutally strong baseline, and the trained model, for all its attention and
context, can't beat it. The *sequence* through meaning-space teaches it nothing
that "assume more of the same" doesn't already know.

So "content is predictable" was a mirage. It's not that the story arc is
learnable in meaning-space; it's that topic is sticky. This is, quantified, the
exact suspicion that has haunted this repo since the beginning — that the
content trajectory's apparent structure is mostly autocorrelation — and here it
is on a scoreboard.

Form is the opposite. It's *less* predictable in absolute terms, but the model
genuinely beats copy (+0.099), because form actually *changes* in structured ways
— dialogue gives way to narration gives way to description — that depend on where
you are in the story. There's a real, if faint, grammar there.

And the winner is **content + form** (+0.118, the largest learnable gap of all).
Fusing meaning with grammar gives the model a handle on the transitions that
meaning-alone, stuck in its own stickiness, never offered. Your instinct to add
content was right — but it's content *plus* form that lifts the ceiling, not
content by itself.

## The idea that didn't survive

That result carried a strong hint: if the learnable signal is faint at the
sentence level, maybe it lives at a *coarser* scale. Plot — the real shape of a
story — surely operates over scenes, not sentences. So I pooled sentences into
segments and predicted the next *segment*, sweeping the segment size, expecting
the learnable gap to *grow* as I zoomed out to the scale where plot lives.

It shrank. The content+form gap fell from +0.113 at the sentence level to +0.054
at sixteen-sentence scenes. And a detail I'd predicted backwards: the copy
baseline got *stronger* as I pooled, not weaker — because averaging sixteen
sentences pulls every segment toward the story's overall topic, making
neighbouring scene-means *more* alike, not less.

So the learnable narrative-form signal is **sentence-local**. Averaging into
scenes destroys it (form averages to mush, meaning averages to the topic
centroid). This doesn't prove plot structure doesn't exist — it proves that a
mean-pooled scene embedding is the wrong tool to find it. A faithful search for
"plot shape" would need a richer scene representation than an average: the shape
of the scene's own trajectory, or a summary of what changed in its cast. That's
a different project.

Two stages, two overturned intuitions: meaning isn't the predictable part, and
zooming out doesn't help. At which point the honest question is no longer "can we
predict the story" — we know it's faint — but "is this embedding good for
anything?"

It is. Just not for what I set out to do.

---
layout: post.njk
title: "Giving a tiny story-writer a teacher"
date: 2026-09-20
permalink: /posts/tiny-story-writer-with-a-teacher/
---

For a while now I've been playing with a slightly odd question: **how small can an
AI be and still tell a story?**

The AI systems everyone talks about — the ones behind chatbots — are enormous.
They have tens or hundreds of *billions* of internal settings (people call these
"parameters" — think of them as tiny knobs the model tunes as it learns). That
size is why they're expensive to run and impossible to fit on a phone or a toy.
I wanted to go the other way. How much can you strip away and still get something
that writes a real, if wobbly, little story?

## A storyteller the size of a rounding error

So I built one. I shrank the vocabulary down to the simple words a small child
uses, cut the model's size again and again, and trained it on **TinyStories** — a
collection of very simple tales written with a toddler-sized vocabulary, made
exactly for this kind of experiment. The result is a storyteller with about **14
million** parameters. That sounds like a lot until you remember the big models
have *a hundred thousand times* more.

And it works — sort of. It writes recognizable little stories about girls and boys
and balls and parks. They're charming. They're also, frankly, not very good. It
loses the thread, repeats itself, introduces a character and forgets them, has
things happen for no reason. Here's a real example of what it produced on its own:

> …they also liked to pretend they were explorers and pretend they were explorers.
> …ben had a sad face and a hole in its fur…

A stutter ("pretend they were explorers" twice), and a friend who somehow has fur.
Fun to read, but not a story you'd want read to you.

That's roughly where you'd expect a model this tiny to top out. But I didn't want
to stop there.

## The insight: a child doesn't write alone

Here's the thing that nagged at me. A four-year-old tells stories with a *tinier*
vocabulary than my model — fewer than two thousand words — and their stories are
often better. How?

Part of the answer is that **a child rarely writes alone.** There's usually a
parent or a teacher nearby, gently nudging: *"Wait — why did the horse start
singing?"* … *"What did the forest look like?"* … *"You said the leaves were soft
*and* sharp — which is it?"* The child doesn't need those questions written into
their head. They just need someone to ask them at the right moment, and they
correct themselves.

So I wondered: **what if my tiny writer had a teacher too?**

## Enter the teacher

The teacher I reached for is a model called **Jev**. Jev is unusual: it doesn't
write anything. What it does is *judge*. You show it a piece of text and ask it
precise questions — "Does this sentence follow from what came before?", "Is this
too repetitive?", "Did this event happen for a reason the story gives?" — and it
answers each one with a **calibrated confidence**, a number saying how sure it is.
It's less like a writer and more like a very fast, very consistent reading teacher
who only ever answers yes/no questions, honestly.

That turns out to be exactly the shape of a teacher you can put in a loop. So here
is what my tiny writer now does. It writes **one sentence**. Jev reads the whole
story so far and checks it against a handful of those questions. If everything's
fine, the writer moves on. If Jev flags something — the sentence drifts off topic,
or repeats a word, or an event came out of nowhere — the writer simply **tries that
sentence again**, and again, until it passes. Then it writes the next one, with the
teacher watching the whole time.

## It actually works

Here's a single correction, caught live. The writer produced:

> ✗ *she wanted a band of different colors.*

Jev flagged it — not for grammar (it's fine) and not for being off-topic, but for
being **unmotivated**: a vague wish that leads nowhere. ("A band of different
colors" — you can't quite picture it, and nothing follows from it.) So the writer
tried again:

> ✓ *she had a big, red ball that she loved to play with.*

A concrete thing, one the rest of the story can actually use. The teacher's own
coherence rating for the story jumped from a 2 to a 3 out of 3.

Multiply that across every sentence and the difference is night and day. Remember
the stuttering, fur-covered mess from before? With the teacher in the loop, the
same little model wrote this:

> once there was a little girl named lily. she had a big, red ball that she loved
> to play with. one day, she went to the park to play with her ball. she was very
> happy and ran around all day. but then, she tripped on a rock and hurt her knee.
> "oh no, lily!" she cried.

That's a *real little arc* — a setup, a mishap, a reaction — instead of a stutter
and a friend with fur. Same tiny brain. The only thing that changed is that
someone was asking it the right questions as it went.

## Why I think this is a big deal

Sit with what just happened: a model a hundred-thousandth the size of a frontier
system produced a genuinely better story — not by getting bigger, but by getting
**coached.** The intelligence didn't all have to live *inside* the writer. Some of
it lived in the teacher standing next to it.

That opens up two directions I find genuinely exciting.

The first is about **doing more with less.** If a small, cheap model plus a good
teacher can punch this far above its weight, you don't always need the giant
expensive model. You need a decent little one and a sharp critic — and a critic
that only answers focused questions can be small and cheap too. (I want to be
honest about the ceiling: the teacher can only ever pick from sentences the little
writer is *capable* of producing — it can't put words in its mouth it could never
have found. It makes the writer reliably do its best, not become something else.
But "reliably its best" is a large improvement.)

The second is about **people, not models.** Look again at that loop — a learner
produces something, a patient teacher reads it and asks exactly the right question
at exactly the right moment, and the learner revises. That's not just how you coach
a tiny AI. **That's what good teaching is.** The same idea — a tireless, consistent
tutor that reads a student's own writing and nudges with the right question instead
of just marking it wrong — could sit inside education products and help real
children write better. That's the version of this I most want to explore.

## What's next: learning, not just redoing

There's one honest limitation in what I've described. Right now, when the teacher
flags a sentence, the writer just **rewrites it** — in that moment. It doesn't
*remember* the lesson. Ask it to write a fresh story tomorrow with no teacher, and
it'll make the same kinds of mistakes again.

Real learning is the opposite: you internalize the feedback so you stop needing it.
I've taken a first step in that direction — I fed the teacher-corrected stories
*back into* the little model as practice, and its solo writing did measurably
improve (it even learned to actually *finish* its stories, which it rarely did
before). But that's just the beginning.

The frontier I'm heading toward is a proper **feedback curriculum**: not a teacher
that corrects the same mistake forever, but one that turns each correction into a
lesson the writer keeps — the way a child eventually stops needing to be asked "why
did that happen?" because they've learned to ask it themselves. Right now my little
writer has a teacher. Next, I want to give it an education.

More soon.

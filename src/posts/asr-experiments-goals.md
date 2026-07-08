---
layout: post.njk
title: What I'm trying to learn from my speech recognition experiments
date: 2026-07-08
permalink: /posts/asr-experiments-goals/
---

I've been running a series of experiments around automatic speech recognition (ASR), and I wanted to write down *why* — the goals, not the mechanics — since that's the part that actually stays interesting once a given method is tried, kept, or discarded.

## Can speech be reduced to a small vocabulary of reusable building blocks?

Audio is continuous and high-dimensional, but the sounds of a language are not — there's a small, finite inventory of phonemes underneath. A core goal of this work is figuring out whether that finite structure can be *discovered* directly from raw audio, rather than hand-engineered, and whether the discovered units line up with real phonetic categories well enough to be useful for recognition.

## Reducing dependence on large labeled datasets

Most strong ASR systems today lean on enormous amounts of transcribed audio. I'm interested in how far you can get with recognizers that need much less labeled supervision — where most of the heavy lifting comes from structure the model finds in unlabeled audio, and only a small amount of labeled data is needed to map that structure onto actual language output.

## Making the intermediate representation understandable, not just accurate

It's easy to chase raw accuracy with an opaque model. A goal I care about here is keeping the intermediate representation — whatever "units" the audio gets reduced to — inspectable enough that I can ask questions like: are these units phonetically coherent? Do they cluster the way linguists would expect? Getting that visibility is as important as the final error rate, because it tells you *why* a system works or doesn't.

## Extending this to low-resource languages

The harder and more motivating version of this problem is languages that don't have the mountains of labeled data English does. I've been extending the same line of inquiry to Telugu, specifically to understand whether unit-discovery approaches that work reasonably well for English actually transfer to a language with very different phonetics and far less available training data — or whether they need to be rethought from scratch.

## Being honest about negative results

Not everything works, and that's fine — a real goal here is treating a negative result as informative rather than as a failure to hide. If a particular way of representing speech turns out not to add useful signal, understanding *why* is often more valuable than the win would have been, because it narrows down what actually matters for the next attempt.

More to come as these experiments progress.

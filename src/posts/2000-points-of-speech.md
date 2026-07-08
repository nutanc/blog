---
layout: post.njk
title: "2000 points are enough: what a frozen codebook says about the size of speech"
date: 2026-07-08
permalink: /posts/2000-points-of-speech/
---

I recently finished an experiment I've been calling *tiny ASR via a frozen VQ codebook*, and the headline number is worth sitting with: **9.1% WER on LibriSpeech dev-clean**, from a recognizer whose entire view of the audio is a sequence of frames snapped to just **2000 fixed points**.

Here's the setup in one breath. A large self-supervised speech encoder (HuBERT) turns audio into a sequence of 768-dimensional frame embeddings. We run k-means over those embeddings *once, offline*, and keep the 2000 cluster centroids as a frozen codebook. From then on, every frame of every utterance is replaced by its nearest centroid — the original embedding is thrown away. A small CTC model (17 MB) reads these quantized sequences and produces text, with a standard 3-gram language model on top.

That's it. And it works — 9.1% WER is real, usable speech recognition.

## The surprising part isn't the encoder. It's the count.

Everyone knows the embedding matters — HuBERT's representation does the heavy lifting of turning raw waveforms into a space where phonetic structure is geometrically laid out. No argument there.

But the experiment says something sharper: **once you're in that space, 2000 points are enough to decode what a human actually said.** Not 2000 dimensions — 2000 *discrete locations*. Every nuance of every speaker's voice, accent, speaking rate, and recording condition gets collapsed onto the same small set of anchors, and the words survive.

Think about what's being discarded. A 768-dimensional continuous space is unimaginably vast; the quantization replaces all of it with a lookup table you could print on a few pages. Speaker identity, most prosody, channel effects — gone, absorbed into "which of the 2000 centroids is closest." What remains is, apparently, almost exactly the part that carries the linguistic message.

This resonates with what phonetics has always claimed: languages are built on a small inventory of contrastive sound categories, maybe a few dozen phonemes, each realized in context-dependent variants. 2000 units is roughly the right order of magnitude for "phonemes × contextual color" — enough to cover allophones, transitions, and coarticulation, but nowhere near enough to encode who you are or how you sounded that day. The codebook seems to be rediscovering that structure from data alone.

## Why the discrete bottleneck is a feature, not a compromise

One design choice made this work gracefully: the recognizer receives the **centroid vector**, not the cluster ID. If a frame gets assigned to a wrong-but-nearby centroid, the downstream model sees a small perturbation, not a completely different symbol. The geometry of the space is preserved through the bottleneck, so errors degrade smoothly instead of catastrophically.

That turns the codebook into something genuinely useful: a **contract**. The thing that produces units and the thing that consumes them are trained independently and never need to see each other — they only need to agree on the 2000 points. That's a very different engineering shape from an end-to-end monolith.

## Downstream effects, if this holds up

If human speech — for the purposes of *what was said* — fits in 2000 points, several things follow:

**Compression as a first-class interface.** A frame stream over a 2000-entry codebook is ~11 bits per frame before any entropy coding. That's a transcription-preserving representation of speech at a bitrate far below any conventional audio codec. Voice interfaces could ship units, not audio.

**The heavy encoder becomes an offline tool, not a runtime dependency.** In this experiment HuBERT was only *needed* to define the codebook. The follow-up question — can a cheap front-end map raw audio into the codebook's space at inference time? — turned out to be subtle (a naive local classifier hit a hard ceiling; a small contextual model that regresses the embedding broke through to 19.9% WER without HuBERT in the loop at all). But the direction is clear: the expensive model's knowledge can be distilled into a fixed set of points plus a lightweight mapper. That's a path to ASR on devices that could never run the big encoder.

**Modularity across the speech stack.** Once the unit inventory is frozen, everything downstream — recognizers, translators, spoken language models — can be built against a stable, tiny vocabulary. Swapping or improving one component doesn't invalidate the others. This is the same move that tokenization made for text NLP, and discrete speech units are increasingly looking like the audio equivalent.

**A tool for low-resource languages.** The codebook is learned from *unlabeled* audio; only the small unit-to-text model needs transcripts. If a few thousand points can cover the acoustic space of a language, the labeled-data burden shifts to the smallest, cheapest part of the system.

**A concrete handle on an old scientific question.** How much information in the speech signal is *linguistic*? Here's an operational answer: keep only "nearest of 2000 anchors in a good embedding space, ~50 times a second" and word error stays under ten percent. Everything else in the signal is, for transcription purposes, decoration.

## The honest caveats

The 2000 points are only meaningful *inside a good embedding space* — k-means on raw spectral features gets nowhere near this (I've measured that separately, and the ceiling is low). The codebook doesn't replace representation learning; it reveals how compactly the result of representation learning can be summarized. And this is dev-clean LibriSpeech — read English audiobooks. Noisy, conversational, multilingual speech will surely want more points, or better ones.

But the core observation stands, and I find it genuinely striking: the message inside human speech is small. We knew this abstractly. Now there's a lookup table.

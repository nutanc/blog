---
layout: post.njk
title: "One codebook, both directions: a frozen alphabet as a contract"
date: 2026-08-07
permalink: /posts/one-codebook-both-directions/
---

The [frozen-codebook ASR experiment](/posts/speech-as-independent-parts/) produced one artifact I kept reusing without quite noticing it was the point: a set of **2000 fixed points** in HuBERT's layer-9 space, found once by k-means and never touched again. In the recognizer it was the input alphabet — audio snapped to clusters, then [read into text by a transformer](/posts/cluster-attention-maps/). But nothing about those 2000 points is specific to recognition. They're just a discrete inventory of "sounds this encoder distinguishes." So I asked whether the *same inventory, unchanged*, could run the other way — as the **output** alphabet of a text-to-speech system.

It can, and the exercise turned the codebook from "a preprocessing step in an ASR pipeline" into something more like an **interface** — a contract two independently-trained models agree to speak.

## The same 2000 points, read and written

Here is the arrangement:

- **Recognition** (last posts): `audio → HuBERT → nearest of 2000 centroids → units → transformer → text`. The codebook is the *source*.
- **Synthesis** (this line of work): `text → transformer → units (ids in the same 2000) → vocoder → audio`. The codebook is the *target*.

The recognizer and the synthesizer share no weights. They were trained separately, on different objectives, one to read and one to write. The **only** thing they have in common is the codebook — and because they both speak it, the units a recognizer emits are exactly the units a synthesizer consumes. The alphabet is the contract; the models are swappable implementations on either side of it.

That the same frozen units carry enough to *reconstruct the voice* is easy to check — resynthesize a held-out clip straight from its centroid sequence:

<figure>
  <figcaption>Original:</figcaption>
  <audio controls src="/img/audio/contract-orig.wav"></audio>
  <figcaption>Resynthesized from the 2000-point unit sequence:</figcaption>
  <audio controls src="/img/audio/contract-resynth.wav"></audio>
</figure>

It's her voice, from nothing but a walk through the codebook. (Buzz is the small single-speaker vocoder, not the units.)

## Why "contract" is the right word

Treating the codebook as an interface buys the things interfaces always buy:

- **Independent replacement.** Swap the recognizer for a better one, or the voice for a different speaker's vocoder, without retraining the other side — as long as both keep speaking the 2000 points. The codebook is a bytecode; the models are compilers and interpreters that target it.
- **Inspectability at the seam.** Because the interface is discrete and finite, everything that crosses it is legible. The [reading diagonal](/posts/cluster-attention-maps/) and the [writing diagonal](/posts/attention-writes-speech/) are the *same alphabet* viewed from either side — you can read cluster 630 spelling an *I* going one way and being spelled *by* an *I* going the other.
- **A shared unit of debugging.** A recognition error and a synthesis error are now expressed in the same vocabulary. "The model picked the wrong cluster here" means the same thing on both sides.

I want to be careful about what's new. None of the *pieces* are: discrete SSL units, k-means codebooks, and unit vocoders are the textless-NLP toolkit, and using them for TTS is well-trodden. What I hadn't seen laid out is the plainest version of the idea — **fit the inventory exactly once, then serve both recognition and synthesis from it, verbatim** — and the observation that when you do, the codebook stops being a stage in a pipeline and starts behaving like a contract between programs. The two diagonals are the evidence that the contract is real: both sides independently discovered the same left-to-right correspondence to it.

The next posts pull on two consequences of taking the interface seriously: what you should actually pass across it (spoiler: [not the integer id](/posts/hand-off-the-vector/)), and the [false signals](/posts/three-things-that-fooled-me/) I hit believing the interface was doing more, or less, than it was.

---
layout: post.njk
title: "Three things that fooled me building a codebook TTS"
date: 2026-08-09
permalink: /posts/three-things-that-fooled-me/
---

The [reading and writing posts](/posts/attention-writes-speech/) tell the tidy version: reuse the frozen codebook, watch the diagonal come back, ship text-to-speech. The actual build was mostly me believing three things that were false — each one a proxy I trusted that had quietly come apart from the goal. They're more useful than the tidy version, so here they are, with the audio that set me straight.

## 1. The better codec was the wrong codec

The codebook lives in HuBERT space, and HuBERT throws away almost everything about *how* a voice sounds — it keeps the phonetic content. EnCodec, a neural audio codec, keeps everything: its latent reconstructs the waveform almost perfectly. So the obvious move was to build the codebook on EnCodec's latent instead. Better reconstruction, better TTS — right?

Listen to what a single 2000-point k-means codebook on EnCodec's latent actually resynthesizes, next to the original and the un-quantized ceiling:

<figure>
  <figcaption>Original:</figcaption>
  <audio controls src="/img/audio/encodec-orig.wav"></audio>
  <figcaption>One flat 2000-point codebook (what I hoped to predict from text):</figcaption>
  <audio controls src="/img/audio/encodec-L1.wav"></audio>
  <figcaption>Eight residual codebooks:</figcaption>
  <audio controls src="/img/audio/encodec-L8.wav"></audio>
  <figcaption>Continuous latent, no quantization (the ceiling):</figcaption>
  <audio controls src="/img/audio/encodec-continuous.wav"></audio>
</figure>

The single flat codebook is a smear. EnCodec's latent is *dense* — it packs the whole waveform — so quantizing it coarsely destroys most of it; you need eight stacked codebooks before it's clean. And predicting eight entangled streams from text is the hard problem. HuBERT's units are the opposite: **sparse**, phonetic, and a *single* codebook captures them — which is exactly why one codebook is enough to read and write.

The lesson took me a while: **reconstruction quality and predictability are different axes, often opposed.** The best representation to *invert* is the worst to *predict*. TTS wants the predictable one and lets the vocoder supply the richness. I'd been optimizing the wrong axis.

## 2. A perfect diagonal that said the wrong words

Then came [the diagonal](/posts/attention-writes-speech/) — clean, monotonic, textbook. I took it as proof the model worked. On text it had trained on, it did:

<figure>
  <figcaption>Trained sentence — generated from text:</figcaption>
  <audio controls src="/img/audio/overfit-train.wav"></audio>
</figure>

Right words. So I ran a held-out sentence, expecting the same:

<figure>
  <figcaption>Held-out sentence — same model, generated from text:</figcaption>
  <audio controls src="/img/audio/overfit-heldout.wav"></audio>
</figure>

Confident, correctly-timed, fluent — and *the wrong words*. The attention diagonal was pristine the whole time. It certifies **where** the model looks, not **what** it writes; a model can march across the input on schedule and emit nonsense when it arrives. I'd trained on too little data with raw-character input, so it had memorized spelling instead of learning sound. Phonemes plus the full corpus fixed the content — the diagonal never changed:

<figure>
  <figcaption>Held-out sentence — phoneme model, full data:</figcaption>
  <audio controls src="/img/audio/fixed-heldout.wav"></audio>
  <figcaption>(reference recording:)</figcaption>
  <audio controls src="/img/audio/heldout-orig.wav"></audio>
</figure>

**A healthy-looking alignment is necessary, not sufficient.** It's a diagnostic I still love — but it's a health check, not a proof of correctness.

## 3. A metric that rewarded the broken model

While chasing #2 I watched a number: for each generated frame, does its cluster match the reference recording's cluster? On the memorizing model it read **0.96**. On the fixed, generalizing model it read **near zero**. The number preferred the broken model.

Because it's the wrong number. A correct synthesizer produces a *different valid rendition* — different micro-timing, a different but equally-good walk through the codebook — and one frame of duration drift slides the two sequences out of registration, so a frame-exact match craters even when every word is right. The memorizer scored high precisely *because* it reproduced one specific recording it had seen. **The comforting metric and the correct model were anti-correlated.** The only honest judges were my ears and, failing that, running the output back through a recognizer.

## The through-line

Three fools, one shape: a proxy standing in for the goal, silently diverging from it. Reconstruction quality standing in for predictability. A clean diagonal standing in for correct content. A frame-match score standing in for intelligibility. Each was a reasonable proxy right up until it wasn't, and each cost a few days. The discrete codebook helped here too — because the interface is inspectable, every one of these was *catchable*: I could listen to a codebook resynthesis, plot the attention, and line the metric up against what I heard. Building out of parts you can point at doesn't stop you being fooled. It just makes getting un-fooled a matter of looking.

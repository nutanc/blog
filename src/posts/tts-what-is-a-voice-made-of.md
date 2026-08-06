---
layout: post.njk
title: "What should a voice be made of? Two jobs, two kinds of token"
date: 2026-08-11
permalink: /posts/tts-what-is-a-voice-made-of/
series: "TTS From Scratch"
part: 2
---

Every system in this series has the same shape — [predict a sequence of discrete sound-tokens, then turn them into a waveform](/posts/tts-reading-is-not-writing/). So the first real design decision is: *what are the tokens?* What discrete alphabet should a voice be made of? The answer isn't obvious, because the alphabet has to do **two jobs that pull in opposite directions**.

## The tokenizer's two jobs

A speech token is asked to be two things at once:

- **A prediction target.** The model that turns text into tokens has to *guess* them. That wants the alphabet to be **small, low-entropy, and phonetic** — close to the content, far from the noise. If a token depends on things text can't know (exact pitch, room tone), it's unpredictable, and you're back to [regressing the average](/posts/tts-reading-is-not-writing/).
- **A reconstruction basis.** The tokens also have to be *enough to rebuild the voice*. That wants the alphabet to be **rich, high-entropy, and faithful** — carrying timbre and texture, everything that makes it a voice.

These are in tension. The more phonetic and predictable you make the token, the less voice it carries. The more faithful you make it, the harder it is to predict from text. This single tension explains almost every architecture in modern TTS.

## Two families of token

There are two well-known families, one on each side of the tension.

**Semantic tokens** (HuBERT, wav2vec, w2v-BERT). These come from a self-supervised model trained to predict masked speech; [k-means on its hidden layer](/posts/speech-as-independent-parts/) gives a small alphabet — the 2000 units the ASR series ran on. They are *sparse and phonetic*: great prediction targets, which is exactly why [the text→unit diagonal forms so cleanly](/posts/attention-writes-speech/). But they've thrown the voice away. You need a separate vocoder to put timbre back, and — as [the resynthesis clips showed](/posts/one-codebook-both-directions/) — the voice you get is only as good as that vocoder.

**Acoustic tokens** (SoundStream, EnCodec, Mimi). These come from a neural audio *codec*: an encoder–quantizer–decoder trained end-to-end to compress and reconstruct the waveform. They are *dense and faithful*: run the tokens back through the codec's own decoder and you get the voice, timbre and all, no separate vocoder to train. But that fidelity is entropy, and entropy is exactly what makes a token hard to predict from text.

The whole first half of this project lived in the semantic family: one HuBERT codebook, [read and written both ways](/posts/one-codebook-both-directions/). It worked, and it taught the method. But the voice was bottlenecked by a small single-speaker vocoder, and — looking ahead to the real target — [HuBERT units don't always survive an accent](/posts/three-things-that-fooled-me/). So the second half of the series moves to the acoustic family, to a codec called **Mimi**.

## Residual quantization, or how a codec makes an alphabet

Acoustic codecs don't use one codebook; they use a stack, via **residual vector quantization (RVQ)**. The idea is coarse-to-fine, like successive rounding:

- Quantize the frame to the nearest entry in codebook 0. Call the leftover — what codebook 0 *missed* — the residual.
- Quantize *that residual* against codebook 1. Take the new, smaller leftover.
- Repeat, N times.

So a single 80-ms-ish frame becomes not one token but a **column of N tokens** (Q0, Q1, … Q7), each refining the last. Q0 carries the coarsest, most important structure; the deeper codebooks add finer and finer acoustic detail. Reconstruction sums the chosen codebook vectors and decodes. More codebooks → higher fidelity → more bits → more to predict. It's the two-jobs tension made into a dial you can turn.

## Why Mimi specifically

[Kyutai's Mimi](https://kyutai.org/) (the codec inside Moshi) has three properties that make it the right acoustic codec for this project, and they map exactly onto the problems above:

- **A semantic first codebook.** This is the one that matters. Mimi is trained so that **Q0 is distilled against a self-supervised model (WavLM)** — its first codebook is *semantic*, like a HuBERT unit, while Q1–Q7 carry the acoustic residual. So a Mimi column is, in effect, *both families stacked*: a predictable phonetic token on top, faithful acoustic detail underneath. That single fact is what makes the [two-stage plan in part 4](/posts/tts-say-it-then-voice-it/) possible.
- **A very low frame rate — 12.5 Hz.** Where the HuBERT units ran at 50 Hz, Mimi emits a column only 12.5 times a second. Four times fewer timesteps to predict is a large, free win for any autoregressive model.
- **A trained decoder, for free.** The codec ships its own decoder. Feed it the codebook columns and you get 24 kHz audio — no vocoder to train, no [checkerboard buzz](/posts/one-codebook-both-directions/) to fight, and, crucially for the accent goal, the decoder is *language-agnostic*: it reconstructs whatever voice the tokens describe.

There's a bonus that only shows up when you actually run it: unlike EnCodec (which was subtly wrong on this machine's GPU), Mimi round-trips **identically on CPU and MPS** — bit-for-bit — so the codec never became a bottleneck. Small thing, saved days.

## The tension didn't disappear — it moved

Here's the honest catch, and it sets up the next post. Mimi *packages* the two-jobs tension beautifully — semantic Q0 for predictability, acoustic Q1–Q7 for fidelity — but it doesn't *dissolve* it. Somebody still has to predict all eight codebooks from text. And when you try to do that the obvious way, with one model, straight through, you walk directly into [the wall](/posts/tts-the-wall/): the semantic codebook is learnable, and the acoustic ones are very nearly not.

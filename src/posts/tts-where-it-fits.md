---
layout: post.njk
title: "Where it fits: a map, and the voice it was aimed at"
date: 2026-08-16
permalink: /posts/tts-where-it-fits/
series: "TTS From Scratch"
part: 7
---

Time to step back from the mechanics and put the whole thing on a map — where it sits in the literature, how it relates to [the recognition work it grew out of](/posts/one-codebook-both-directions/), and what it was actually for.

## The system, in one breath

```
text → [Stage 1] → Q0            say it   (semantic; text-conditioned; needs transcripts)
Q0   → [Stage 2] → Q1…Q7         voice it (acoustic; audio-only; depth-transformer; producer-aware)
Q0…Q7 → Mimi decoder → 24 kHz waveform
```

Every piece is load-bearing and every piece was *forced* by a measurement, not chosen up front:

- **Mimi**, because a codec gives you a [trained decoder for free and a semantic first codebook](/posts/tts-what-is-a-voice-made-of/) to split on.
- **Two stages**, because the single-stage model [failed codebook-by-codebook in a way that drew the seam for us](/posts/tts-the-wall/).
- **A depth transformer** in Stage 2, because independent heads [made incoherent residuals that decode to harshness](/posts/tts-coherent-residuals/).
- **Q0 augmentation**, because two good models [don't make a good pipeline unless the consumer is trained on the producer's mistakes](/posts/tts-adapt-consumer-to-producer/).

## What's borrowed, and what's ours

I try to be [precise about novelty](/posts/one-codebook-both-directions/), so, plainly:

**Borrowed — essentially the whole architecture.** Semantic-then-acoustic is AudioLM. "Reading needs little paired data, speaking can be learned from raw audio" is SPEAR-TTS. Predicting a codec's RVQ codebooks is VALL-E. The RQ-Transformer depth step and the Mimi codec are Moshi/Kyutai. None of the boxes are new.

**Ours — the derivation and the seam.** Two things I haven't seen laid out this way:

1. **The split as a *consequence*, not a premise.** We didn't set out to build AudioLM. We built the naïve thing, [measured it fail per-codebook](/posts/tts-the-wall/), and the semantic/acoustic split fell out as the obvious repair. The per-codebook table *is* the argument for two stages. Rediscovering a known-good structure because the data cornered you into it is worth more than adopting it on authority — you learn *why* it's right.
2. **One principle, run both directions across the seam.** This TTS system is the mirror of [the ASR codebook work](/posts/one-codebook-both-directions/), and the same two rules govern the handoff in both: [ship the vector, not the name](/posts/hand-off-the-vector/), and [train the consumer on the producer's errors](/posts/tts-adapt-consumer-to-producer/). Reading and writing turned out to be [asymmetric in the middle](/posts/tts-reading-is-not-writing/) but *identical at the seam*. That symmetry-of-the-interface is the through-line of both series.

## Why this shape, for *this* goal

None of this was for a US audiobook narrator. The target is **Indian English** — an accent with plenty of audio and little clean, transcribed, studio-grade paired data. Read the architecture through that lens and the two-stage split stops being an engineering nicety and becomes the *point*:

- **Stage 1 (text → Q0)** is the only part that needs transcripts — and it's the *small, cheap, low-entropy* part. A modest amount of paired Indian-English text–audio can carry it.
- **Stage 2 (Q0 → acoustics)** is where the **voice and the accent actually live** — timbre, rhythm, the vowel colour that makes it Indian English and not General American. And Stage 2 [needs no transcripts at all](/posts/tts-say-it-then-voice-it/). It can train on hours of untranscribed Indian speech, which is abundant.
- **Mimi's decoder is language-agnostic** — it reconstructs whatever the tokens describe — so [the accent survives tokenization](/posts/three-things-that-fooled-me/) in a way it didn't always through HuBERT units.

So the decomposition puts the data you *have* (raw audio) exactly where the *hard, voice-defining* work is, and the data you *lack* (transcripts) exactly where the work is *small*. That's not a coincidence you engineer after the fact; it's the reason to prefer this shape for a low-resource accent in the first place.

## Honest status

Where it actually stands, without polish:

- **Validated end-to-end on LJSpeech.** Text goes in, an intelligible voice comes out, on held-out sentences. The two-stage decomposition is sound and the failure modes are understood and individually fixed.
- **Not yet at the codec ceiling.** Stage 2 with real Q0 is close; the full pipeline trails it and is being closed by [producer-aware training](/posts/tts-adapt-consumer-to-producer/). There's known headroom in model size and training steps.
- **Still English.** The accent goal is the next data swap, not a new architecture: re-fit Stage 1 on Indian-English pairs, train Stage 2 on untranscribed Indian audio, keep Mimi as-is.

That last line is the whole reason to have done it on LJSpeech first: get the machinery honest on data you can trust, so that when you change the *one* variable that matters — the voice — you're changing only that. The map is drawn. The next post in this story is in a different language.

---

*This is the end of the mechanics series. It started with [a set of questions about what it means to speak](/posts/tts-prologue-the-second-questions/); the answers, as promised, mostly contradicted the assumption that speaking is hearing in reverse. It is — but only at the seam.*

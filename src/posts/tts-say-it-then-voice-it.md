---
layout: post.njk
title: "Say it, then voice it: splitting one hard job into two"
date: 2026-08-13
permalink: /posts/tts-say-it-then-voice-it/
series: "TTS From Scratch"
part: 4
---

[The wall](/posts/tts-the-wall/) came with its own way through, printed right on it. The per-codebook table said: the semantic codebook Q0 is learnable from text; the acoustic residual Q1–Q7 is not. And Q0, by construction, is the codebook that carries *what was said*. So stop asking one model to predict all eight at once. Split the job along the seam the codec already gave you:

```
Stage 1:  text  → Q0            (say it:   content, aligned to the words)
Stage 2:  Q0    → Q1…Q7         (voice it:  acoustic detail, given the content)
          Q0…Q7 → Mimi decoder → waveform
```

Two models, one seam. This post is about why each half is genuinely easier than the whole, and why the seam is in exactly the right place.

## Stage 1 is a problem we've already solved

**text → Q0** is a single low-entropy codebook predicted from text. That is *precisely* [the HuBERT text→unit model from earlier in the series](/posts/attention-writes-speech/), with Mimi's semantic codebook standing in for the k-means unit. Same encoder–decoder, same guided attention, same [monotonic diagonal that doubles as a duration model](/posts/attention-writes-speech/). It's the part text actually determines, and it's the part the old machinery already handles. When I trained it alone, the diagonal snapped to a clean 1.0 and — after enough steps — it generalized to sentences it had never seen.

The one honest wrinkle: Q0 is a *sound* token, not a text token, so its errors are "close but not identical" rather than "right or wrong." That matters later, in [part 6](/posts/tts-adapt-consumer-to-producer/). But as a learning problem, Stage 1 is the tractable half, and we already knew it was tractable.

## Stage 2 is easier *and* it needs no transcripts

**Q0 → Q1…Q7** is where the surprise is. Three things make it a fundamentally friendlier problem than text → acoustics:

- **The condition is much closer to the answer.** Predicting fine acoustic detail *from the semantics of the same frame* is a local, almost-deterministic refinement — nothing like predicting it from a string of letters. The information is *there* now; text never had it.
- **No alignment to learn.** Q0 and Q1…Q7 are the same frames. It's a frame-aligned map, not a sequence-to-sequence one — no diagonal to form, no duration to invent. That means it can be **bidirectional and non-autoregressive**: every frame sees the whole Q0 context and fills in its residual in one pass.
- **It needs no text at all.** This is the big one. Stage 2's training data is just `(Q0, Q1…Q7)` columns — which you get from *any* audio by running it through Mimi's encoder. **No transcripts.** The only stage that needs paired text–audio is the small semantic Stage 1.

That last point is the one I care about most, and it's the reason this whole detour is worth it. It's spelled out in [part 6](/posts/tts-adapt-consumer-to-producer/) and the [finale](/posts/tts-where-it-fits/), but the headline is: the data-hungry, transcript-hungry part of speaking is small, and the part that carries the *voice and the accent* can be trained on cheap untranscribed audio.

## Where this fits: it's the AudioLM lineage, rediscovered

I want to be careful, as [always](/posts/one-codebook-both-directions/), about what's new here. The answer: not the shape. **Semantic-then-acoustic is the spine of modern audio LMs.** AudioLM introduced the split (semantic tokens from w2v-BERT, then coarse and fine acoustic tokens from SoundStream). SPEAR-TTS made the payoff explicit — *"reading" (text→semantic) needs little paired data; "speaking" (semantic→acoustic) can be trained on untranscribed audio* — which is exactly the argument above. VALL-E predicted EnCodec's RVQ codebooks with a coarse/fine split. And Mimi is the codec from Moshi, which lives entirely in this world.

What this rebuild contributes is not a new architecture but a **derivation**: I didn't start with "do AudioLM." I started by trying the naïve single-stage model, [measured it fail codebook by codebook](/posts/tts-the-wall/), and the split *fell out of the measurement* as the obvious repair. When you find yourself reinventing a known-good structure because the data forced you to, that's usually a sign the structure is right for a real reason and not just fashion. The measurement is the contribution; the architecture is the field's.

## The seam has to carry a vector, not a name

One detail carries straight over from the recognition side. What crosses the Stage 1 → Stage 2 seam is a Q0 *token*, and — just as with [the codebook contract](/posts/hand-off-the-vector/) — you want to hand off the **embedding, not the integer id**. Stage 1 predicts a discrete Q0 (so it can sample a realization instead of averaging), but Stage 2 consumes Q0's *codebook vector*, so a close-but-wrong pick lands it a nearby coordinate and the voice wobbles instead of glitching. Same rule, third time it's shown up: **predict in the discrete space, hand off in the continuous one.**

## It works — and then the seam bites

Split this way, the system speaks. Feeding Stage 2 the *real* Q0 from a held-out clip and letting it fill Q1–Q7, the reconstruction lands very close to the codec ceiling — the two-stage decomposition is sound, and the earlier garble really was [one model asked to do two jobs](/posts/tts-the-wall/).

<figure>
  <figcaption>Stage 2 alone: real Q0 in, predicted Q1–Q7, decoded — isolating the "voice it" half:</figcaption>
  <audio controls src="/img/audio/tts-residual-depthtf.wav"></audio>
  <figcaption>The codec ceiling for the same clip (all-real tokens):</figcaption>
  <audio controls src="/img/audio/tts-ceiling.wav"></audio>
</figure>

Compare that first clip to [the single-stage attempt from the last post](/posts/tts-the-wall/) — same speaker, same sentence, and the difference is entirely that the acoustic model is being asked to fill in *from the semantics* instead of *from text*.

But two things still stand between "it works" and "it sounds good," and they're the last two posts. First, filling the residual codebooks *independently* makes them incoherent, and Mimi's decoder renders incoherence as harshness — [fixed by letting the codebooks talk to each other](/posts/tts-coherent-residuals/). Second, Stage 2 trained on *real* Q0 gets *predicted* Q0 at inference, and the gap between those two is its own problem — the [adapt-the-consumer-to-the-producer](/posts/tts-adapt-consumer-to-producer/) lesson, back for an encore.

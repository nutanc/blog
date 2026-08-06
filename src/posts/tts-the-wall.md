---
layout: post.njk
title: "The wall: why you can't just predict the sound"
date: 2026-08-12
permalink: /posts/tts-the-wall/
series: "TTS From Scratch"
part: 3
---

With [Mimi's tokens in hand](/posts/tts-what-is-a-voice-made-of/) — a column of 8 codebooks per frame at 12.5 Hz, semantic on top, acoustic underneath — the obvious thing is to do exactly what worked for the HuBERT units, just with more codebooks. One encoder–decoder transformer: text in, all 8 codebooks per frame out, run the columns through Mimi's decoder. Straight through. One model.

I built it. It walks straight into a wall, and the shape of the wall is the whole lesson.

## The obvious model, and how it fails

The setup is a faithful scale-up of [the text→unit model](/posts/attention-writes-speech/): a phoneme encoder, an autoregressive decoder, a delay pattern so the 8 codebooks of a frame can be predicted in a staggered order. Cross-entropy over the codebook ids, guided attention to seed the alignment. It trains without drama — the loss falls, the [alignment diagonal forms](/posts/attention-writes-speech/) just like before.

And the output is a garbled mess. Not subtly worse than the HuBERT system — *unintelligible*.

<figure>
  <figcaption>The held-out sentence, as the original speaker said it:</figcaption>
  <audio controls src="/img/audio/tts-orig.wav"></audio>
  <figcaption>The single-stage model, text → all 8 codebooks, straight through:</figcaption>
  <audio controls src="/img/audio/tts-singlestage.wav"></audio>
  <figcaption>And the ceiling — the same clip's <em>real</em> Mimi tokens through the decoder, i.e. the best any model predicting these tokens could sound:</figcaption>
  <audio controls src="/img/audio/tts-ceiling.wav"></audio>
</figure>

The gap between the second clip and the third is the whole problem: it is *not* a codec or a vocoder gap (the ceiling proves the tokens can reconstruct the voice), it is a *prediction* gap.

The diagonal forming told me alignment wasn't the problem. So what was? The useful move was to stop looking at the average loss and look at the model **codebook by codebook** — teacher-forced accuracy, one number per RVQ level:

| codebook | what it carries | teacher-forced accuracy |
|---|---|---|
| Q0 | semantic (WavLM-distilled) | **~0.50** (from 0.10, still climbing) |
| Q1 | coarse acoustic | ~0.15 |
| Q2 | | ~0.06 |
| Q3–Q7 | fine acoustic residual | ~0.02–0.03 |

(Chance is 1/2048 ≈ 0.0005, so even the bottom row is *learning something* — just not much.)

There it is, laid out. **The semantic codebook is learnable from text. The acoustic residual is very nearly not.** This is exactly [the two-jobs tension from the last post](/posts/tts-what-is-a-voice-made-of/) showing up as a measurement: Q0 is the predictable phonetic token, Q1–Q7 are the high-entropy detail text simply doesn't determine. And the average loss *hid* this — it looked like it was falling nicely, because Q0 improving drags the mean down while the deep codebooks sit near their noise floor forever.

## Why "predict the acoustics from text" is the wrong ask

Step back and it's obvious in hindsight. The fine codebooks encode *the leftover after the semantics* — the specific timbre and micro-texture of one particular rendition. Text has no opinion about that. Asking a text-conditioned model to predict Q7 is asking it to guess which of thousands of equally-valid acoustic realizations the original speaker happened to produce. There is no signal for it in the input. The model does the only sane thing under cross-entropy: it hedges toward the marginal, and [free-running generation compounds the hedge into mush](/posts/tts-reading-is-not-writing/).

So the single-stage model isn't badly built. It's badly *asked*. It's one model shouldering two jobs with opposite requirements, and the acoustic job is one text can't help with.

## A metric that lies, one more time

Two numbers tempted me to declare victory or defeat too early, and both are worth naming because [I've been fooled by metrics before](/posts/three-things-that-fooled-me/):

- **Average codebook loss** falls smoothly and means almost nothing — it's Q0's success averaged with the deep codebooks' near-random floor.
- **Exact-match accuracy on the deep codebooks** stays near zero *and always will*, even for a perfect model, because the fine acoustic detail is one-of-many: a different-but-equally-valid Q7 counts as "wrong." Low deep-codebook accuracy is not failure; it's the entropy being honest.

The only judge that survived was the ear. And the ear said: garbled.

## The crack in the wall

But that per-codebook table isn't just a diagnosis of failure — it's a map of where the difficulty *isn't*. Q0 is learnable. Q0 is also, by construction, the semantic codebook — the one that carries *what was said*. If the words live in Q0, and Q0 is the part you *can* predict from text, then maybe the mistake was ever asking one model to predict all eight at once.

That's the hinge of the whole project, and it's [the next post](/posts/tts-say-it-then-voice-it/): don't predict the sound from text. Predict the *meaning* from text, and the *sound* from the meaning.

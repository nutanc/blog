---
layout: post.njk
title: "Adapt the consumer to the producer, again"
date: 2026-08-15
permalink: /posts/tts-adapt-consumer-to-producer/
series: "TTS From Scratch"
part: 6
---

Here is the state of things after [the depth transformer](/posts/tts-coherent-residuals/): fed the *real* semantic codebook Q0 from a held-out clip, Stage 2 fills the acoustic residual and the audio comes out clean, close to the codec ceiling. And [Stage 1](/posts/tts-say-it-then-voice-it/), on its own, predicts Q0 from text well enough that you can hear the right words in it. Both halves work.

Wire them together and it gets *worse*. The full pipeline — text → Stage 1 → Q0 → Stage 2 → voice — drops words and sounds rushed, on sentences where each stage, tested alone, was fine. The whole is worse than either part. That paradox has a cause, and it's a lesson this project already learned once, on the recognition side.

## Localizing the fault

The trick was to test the seam directly. Stage 2 with *real* Q0: clean. Stage 1's Q0 decoded on its own (just the semantic codebook through the decoder — low-fi, but the words are audible): the words are **there**. So Stage 1 is producing good content and Stage 2 can produce clean audio — yet chained, they fail.

<figure>
  <figcaption>Stage 1's predicted Q0, decoded on its own (semantic codebook only — deliberately low-fidelity, listen past the robotic timbre): the <em>words</em> are present.</figcaption>
  <audio controls src="/img/audio/tts-q0only.wav"></audio>
</figure>

The only thing that's different in the chain is *which Q0 Stage 2 receives*. In training it always saw **real** Q0, straight from Mimi's encoder. At inference it receives **predicted** Q0 from Stage 1 — which has the right words but a subtly different fingerprint: different specific tokens here and there, slightly different transitions. Same content, off distribution.

And Stage 2 — especially the sharp [depth-transformer version](/posts/tts-coherent-residuals/) — was tuned tightly to the statistics of *real* Q0. Hand it Q0 from a slightly different distribution and it extrapolates badly. The very sharpness that made it clean on real Q0 made it **brittle** on predicted Q0. The better I made Stage 2 at its training distribution, the worse it coped with the distribution it actually meets in production.

## This is the ASR lesson, wearing a hat

If that has a familiar ring, it should. The [recognition series' hardest-won lesson](/posts/hand-off-the-vector/) was **adapt the consumer to the producer**: a model that consumes another model's imperfect output has to be *trained on that imperfect output*, not on clean ground truth. Train a units→text model on perfect units and it shatters on real, error-laden ones. Same shape here: Stage 2 is a consumer, Stage 1 is its producer, and Stage 2 had only ever seen the clean article.

Naming it that way also rules out the tempting non-fix. You might think: just train Stage 2 on Stage 1's *actual* predicted Q0. But Stage 1's free-running Q0 is a *different realization* — it isn't frame-aligned to the real Q1…Q7 you'd use as targets, so there's nothing to regress against. The clean move keeps the real targets and perturbs the *input*.

## The fix: feed it flawed Q0 on purpose

So: fine-tune Stage 2 with **Q0 augmentation**. During training, corrupt a fraction of the input Q0 frames — some replaced with a temporal neighbor (mimicking the near-miss timing errors Stage 1 makes), some with a random code (a wrong-cluster error) — while keeping the *real* Q1…Q7 as targets. The model is now asked: *given a Q0 that's roughly right but not exactly, still produce the clean residual.* That's the job it actually has in production, so that's the job it should train on.

Alignment is preserved (only the input is perturbed, the targets stay put), and the corruption is shaped to look like Stage 1's real error profile rather than arbitrary noise. It's the input-space cousin of [handing off the vector instead of the id](/posts/hand-off-the-vector/): both are ways of making the seam *forgiving* — one by carrying geometry across it, the other by teaching the receiver that the sender is fallible.

<figure>
  <figcaption>Full pipeline, Stage 2 trained on <em>real</em> Q0 only — the same held-out sentence, dropping words and rushing:</figcaption>
  <audio controls src="/img/audio/tts-pipeline-before.wav"></audio>
  <figcaption>Full pipeline, Stage 2 fine-tuned with Q0 augmentation — same text, same Stage 1, only the consumer changed:</figcaption>
  <audio controls src="/img/audio/tts-pipeline-after.wav"></audio>
</figure>

There's a real trade here, and it's worth stating plainly: robustness to flawed Q0 costs a little sharpness on flawless Q0. A model trained to tolerate a wobbly input is slightly less crisp on a perfect one. But the perfect input never happens in the full pipeline — so trading a sliver of the isolated-test ceiling for graceful behavior on the Q0 you actually receive is the right trade. You're optimizing the system, not the component.

## The moral, stated once

Two independently-good models do not make a good pipeline. The interface between them is its own thing to design and its own thing to *train for*. On the recognition side that meant [shipping vectors, not names](/posts/hand-off-the-vector/), so errors stayed small. On the synthesis side it means training the consumer on the producer's mistakes, so it stops being surprised by them. Same principle, both directions across the seam: **the handoff is where the system is won or lost, and it has to be built for imperfection, because imperfection is what crosses it.**

Which is a good note to end the mechanics on, and step back to ask [where this whole thing actually fits](/posts/tts-where-it-fits/) — against the literature, against the recognition work it grew out of, and against the voice it was always really aimed at.

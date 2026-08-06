---
layout: post.njk
title: "Coherent residuals: from independent heads to a depth transformer"
date: 2026-08-14
permalink: /posts/tts-coherent-residuals/
series: "TTS From Scratch"
part: 5
---

[The two-stage split](/posts/tts-say-it-then-voice-it/) made the system speak: with the real semantic codebook Q0 in hand, Stage 2 fills the seven acoustic codebooks and Mimi's decoder turns the column back into a voice. But the first Stage 2 I built, fed a *perfect* Q0, still came out **harsh** — intelligible, the right words, but a grainy, buzzy texture sitting on top. This post is about where that harshness comes from, because the fix is a small idea with a clean name.

## Seven right answers that are wrong together

The first Stage 2 predicted Q1 through Q7 with **seven independent heads**: one shared context per frame, seven linear layers reading it, each guessing its codebook on its own. Fast, simple, and — for [an RVQ codec](/posts/tts-what-is-a-voice-made-of/) — subtly broken.

RVQ codebooks are not independent. They're a *chain*: Q2 quantizes the residual left after Q1, Q3 the residual after Q2, and so on. Each one only makes sense *relative to the ones above it*. So the joint of (Q1…Q7) lives on a thin manifold of coherent combinations. Seven heads guessing separately will each pick a locally-plausible token, but their **combination** drifts off that manifold — codebook 4 refining a residual that codebook 2 didn't actually leave. Mimi's decoder, handed a column that no real audio would have produced, renders the contradiction as grain and buzz.

The tell was diagnostic: with independent heads the harshness was there even when Q0 was the ground-truth codebook. So it wasn't a content problem and it wasn't a Q0 problem. It was the residuals disagreeing with each other.

## Let the codebooks talk: depth conditioning

The fix is to stop predicting the codebooks independently and predict them **in order, each conditioned on the ones already chosen** — decode the RVQ chain the way it was built. Two versions, escalating:

- **Additive conditioning (v2).** Before predicting codebook *k*, add in the embeddings of codebooks 1…*k*−1 that you've already decided. Cheap; each head now at least *sees* the running reconstruction. It helped — clearly cleaner than independent heads — but not all the way. A summed embedding is a blunt summary of "what's been decided so far."
- **A depth transformer (v3).** Treat the 8 codebooks of a frame as a little **sequence along the codebook axis**, and run a small causal transformer over it: codebook *k* *attends* to the actual tokens Q0…Q*k*−1, not just their sum. This is the **RQ-Transformer** step — the same mechanism Mimi/Moshi use internally — and it's the natural model for "predict the next refinement given all the coarser ones."

Concretely: a bidirectional transformer over Q0 gives a per-frame context (Q0 is fully observed, so this half can see everything), and then, *within* each frame, a tiny causal transformer walks down the 8 codebooks, each attending to the coarser ones already emitted. Time is bidirectional; depth is autoregressive. It's cheap — the depth axis is only 8 long — and it captures exactly the chain structure the independent heads ignored.

## What changed

Two signals moved in the right direction together, which is the comforting case:

- The training loss on the residual codebooks dropped meaningfully below the independent-head and additive versions — the depth transformer is modeling a distribution the others couldn't reach.
- Fed real Q0, the decoded audio went from *harsh* to *close to the codec ceiling*. The residuals stopped fighting each other, and the grain went away.

Not, I'll note, all the way to indistinguishable — there's headroom left in capacity and training steps — but the harshness as a *category of defect* was gone, and gone for a reason you can point at: coherent residuals decode to clean audio; incoherent ones don't.

<figure>
  <figcaption>Independent heads (v1) — the residuals disagree, and you hear it as grain:</figcaption>
  <audio controls src="/img/audio/tts-residual-independent.wav"></audio>
  <figcaption>Additive conditioning (v2) — each codebook sees the sum of the ones above it:</figcaption>
  <audio controls src="/img/audio/tts-residual-additive.wav"></audio>
  <figcaption>Depth transformer (v3) — each codebook <em>attends</em> to the coarser ones:</figcaption>
  <audio controls src="/img/audio/tts-residual-depthtf.wav"></audio>
  <figcaption>Ceiling, for reference:</figcaption>
  <audio controls src="/img/audio/tts-ceiling.wav"></audio>
</figure>

(All four are the same held-out clip with the same real Q0 — only the residual model changes, so what you're hearing is purely coherence.)

## The pattern under the fix

It's worth naming the general move, because it recurs. When you're predicting several correlated things at once, predicting them *independently* and predicting them *jointly* can produce the same marginal accuracy and wildly different **coherence** — and for anything that gets decoded or rendered downstream, coherence is what you hear. [Exact-match accuracy was blind to it](/posts/tts-the-wall/); the ear was not. The depth transformer is just the smallest honest way to model the joint instead of the marginals.

That handles the residuals when Q0 is perfect. But at inference Q0 is *not* perfect — it comes from [Stage 1](/posts/tts-say-it-then-voice-it/), which predicts it from text and gets it *mostly* right. Stage 2 was trained on flawless Q0 and now has to eat flawed Q0, and that mismatch is [the last problem](/posts/tts-adapt-consumer-to-producer/) — and an old friend.

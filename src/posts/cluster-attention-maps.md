---
layout: post.njk
title: "Watching attention read speech: cluster-attention maps from a units-to-text transformer"
date: 2026-07-19
permalink: /posts/cluster-attention-maps/
---

In the [frozen-codebook ASR experiment](/posts/speech-as-independent-parts/), the recognizer's entire view of the audio is a sequence of frames snapped to 2000 fixed points — a discrete "phonetic alphabet" of cluster ids. That system decoded the units to text with a CTC model plus a 3-gram language model (9.1% WER). But CTC is conditionally independent frame-by-frame: it never learns the *language*, which is why it leans on the external LM.

So I asked a different question. If the units are really a phonetic alphabet, then turning them into English is **translation** — and translation is what attention encoder-decoders are for. Can a transformer learn to read the cluster sequence and write the transcript, with the decoder's own attention doing the alignment? And if it does — can we *see* it attend to the right clusters?

The answer to both is yes, and the pictures are the point of this post.

## The setup

A small from-scratch transformer encoder-decoder (~9.5M parameters): the encoder reads the deduplicated unit sequence, an autoregressive character decoder emits the transcript. A joint CTC loss on the encoder (weight 0.3, the ESPnet recipe) keeps the alignment honest during training. No pretrained weights, no external language model at decode time — just greedy decoding.

On a tenth of LibriSpeech train-clean-100 it reaches **17.0% WER on dev-clean, greedy, no LM** — beating the true-unit CTC's *greedy* number (20.8%) outright. The autoregressive decoder is an implicit language model; it does for free what CTC needed KenLM bolted on to do.

(One instructive failure: warm-starting the decoder from a pretrained text model — ByT5 — made it *worse*. The strong text prior let the decoder ignore the audio entirely and hallucinate fluent, unrelated English. The win comes from learning the mapping from scratch, with the CTC auxiliary forcing the encoder to actually be read.)

## The diagonal

Here is the cross-attention of the trained model on one dev-clean utterance — *"nor is mister quilter's manner less interesting than his matter"*. Rows are output characters; columns are the input units, labelled by cluster id.

![Cross-attention heatmap showing a clean monotonic diagonal from top-left to bottom-right; each output character attends to a tight band of input units at the matching time position.](/img/attn/full-diagonal-hard.png)

It's a clean monotonic diagonal. Each character attends to a tight band of units at the corresponding position in the sequence, sweeping from the first character to the last with no off-diagonal mass. This is the alignment the model was never given and never told to form — it fell out of learning to translate. It is exactly the shape a healthy speech recognizer's attention should have.

## Up close: one word, character by character

Zoom into a single word and the mechanism is legible. Below is the attention for the seven characters of **QUILTER**, cropped to just the units they attend to. Each cell shows the attention weight; the starred cell is that character's argmax cluster.

![Zoomed attention for the word QUILTER: a staircase where each successive character peaks on a later cluster id, with sharp peaks of 0.57 on I and 0.52 on E.](/img/attn/zoom-quilter-hard.png)

| character | argmax cluster | weight |
|---|---|---|
| Q | 1549 | 0.15 |
| U | 965  | 0.31 |
| I | 630  | **0.57** |
| L | 630  | 0.43 |
| T | 1544 | 0.25 |
| E | 953  | **0.52** |
| R | 186  | 0.29 |

It's a staircase. As the decoder emits each letter it walks left-to-right across the unit sequence, its attention concentrated on one or two clusters at a time — the vowels *I* and *E* almost entirely on a single cluster (0.57, 0.52). This is the char→cluster correspondence made visible: the model has learned which cluster ids realize which sounds, and attends to them in order.

The same word for the **soft-input** variant (which feeds each frame's probability-weighted blend of its top clusters instead of a single hard id, and scores 15.5% WER) shows the same staircase — the soft handoff doesn't change *what* the model learns, it just makes the mapping a little easier to learn:

![The QUILTER zoom for the soft-input model, showing the same monotonic staircase alignment.](/img/attn/zoom-quilter-blend.png)

And a second word, **MISTER**, for good measure — same story:

![Zoomed attention for the word MISTER showing the same left-to-right staircase over cluster ids.](/img/attn/zoom-mister-hard.png)

## Why this is worth looking at

The frozen-codebook experiment was about building a recognizer as a *system of parts* you can point at — the part that knows what an "s" sounds like, separate from the part that knows English spelling. These maps are that idea paying off. The codebook is a discrete interface, so the alignment between sound and text is not dissolved into a tensor — it's a picture you can read off the axes. You can literally see cluster 630 spell the *I* in "quilter," cluster 953 spell the *E*.

Scaling this up is in progress: on the full 460-hour corpus the same model is already at **11.2% WER (greedy, no LM)** partway through training, closing on the 9.1% that the original CTC needed a language model to reach. But the number isn't the part I find compelling. It's that when you build recognition out of discrete, inspectable parts, understanding the model stops being a research project and becomes a matter of plotting the attention.

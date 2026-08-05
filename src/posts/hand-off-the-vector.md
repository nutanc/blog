---
layout: post.njk
title: "Hand off the vector, not the id"
date: 2026-08-08
permalink: /posts/hand-off-the-vector/
---

If [the codebook is a contract](/posts/one-codebook-both-directions/) between two models, there's a question the contract has to answer: *what actually crosses the seam?* The obvious answer is the cluster id — an integer in `[0, 2000)`. It's the wrong answer, and getting it right is one small idea that shows up on both the recognition and the synthesis side.

## The problem with the integer

Cluster ids are labels, not coordinates. Cluster 631 is not "next to" cluster 630 in any sense the number implies; the k-means labels are arbitrary. So if a model hands its neighbour an id and gets it slightly wrong — picks 1544 when the truth was 1549 — the receiver sees a *completely unrelated* symbol. A one-cluster error is a discontinuous jump. Worse, quantizing to a hard id throws away *how* close the frame was to the boundary: a frame sitting halfway between two centroids and a frame dead-centre on one both collapse to the same integer.

But the 2000 points aren't labels — they're **vectors** in HuBERT space, and that space has geometry. Two centroids that realize similar sounds sit close together. So the fix is to hand off the **centroid vector**, not its id: the receiver gets the actual 768-dimensional coordinate the frame was snapped to. Now a wrong-but-nearby pick is a *small perturbation* instead of a jump, and the receiver degrades gracefully instead of falling off a cliff. The id is a name; the vector is a place.

## The same move, on both sides of the contract

What I find satisfying is that this is the *same* decision in recognition and synthesis, just pointing opposite ways across the seam:

- **Reading (consumer side).** The [units-to-text transformer](/posts/cluster-attention-maps/) doesn't embed cluster ids with a lookup table; its encoder reads the centroid **vectors**. Its input space *is* HuBERT space snapped to 2000 points. A soft variant goes further — feeding each frame's probability-weighted blend of its top clusters rather than a single hard id — and it scored a little better (15.5% vs 17.0% WER). Soft blending is only meaningful because the targets are vectors: you can average places, you can't average names.
- **Writing (producer side).** The TTS model has to *predict* discrete ids — you sample a softmax, because the map from text to sound is one-to-many and regressing a vector just returns the blurry average of every valid rendition. But once a unit is chosen, what the vocoder receives is again the **centroid vector**, not the id. So Stage B's occasional wrong pick lands the vocoder a nearby coordinate, and the audio wobbles instead of glitching — and you can hand it the top-k blend for free.

So the rule that falls out: **predict in the discrete space, hand off in the continuous one.** Quantize because discreteness makes the prediction tractable and the interface finite and inspectable; but let the thing that crosses the seam carry the geometry, so errors stay local and uncertainty survives the handoff.

## Not a new trick, a consistent one

This isn't novel machinery — continuous and soft-VQ handoffs exist, and "use the embedding, not the index" is folklore anywhere VQ meets a downstream model. What the two-directions setup makes clean is that it's *one principle applied symmetrically*: the codebook is a discrete contract for tractability and legibility, but the payload is a vector for robustness. Name the point for bookkeeping; ship the coordinate for the work.

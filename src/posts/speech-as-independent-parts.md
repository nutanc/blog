---
layout: post.njk
title: "Speech recognition as independent parts: notes from a frozen-codebook ASR experiment"
date: 2026-07-08
permalink: /posts/speech-as-independent-parts/
---

I recently finished an experiment I've been calling *tiny ASR via a frozen VQ codebook*. The headline number: **9.1% WER on LibriSpeech dev-clean** from a recognizer whose entire view of the audio is a sequence of frames snapped to 2000 fixed points, decoded by a 17 MB model plus a 3-gram language model.

Before going further, credit where due: discrete-unit speech processing is established territory. HuBERT is itself *trained* on k-means cluster targets; the textless-NLP line of work builds language models and resynthesis on exactly these kinds of units; cluster-to-phoneme purity of SSL units has been measured in published work. I ran this as an independent replication on a laptop, to see the machinery from the inside. What I want to write about isn't a new result — it's what the *shape* of the system taught me.

## Everything in one set of weights, or a system of parts?

The dominant way to build a recognizer today is end-to-end: audio in, text out, one large model, everything — acoustics, phonetics, vocabulary, grammar — dissolved into a single set of weights. It works extremely well. But it's also opaque: you can't point at the part that knows what an "s" sounds like, or the part that knows English spelling, and you can't improve one without retraining the whole.

This experiment is the opposite bet: **break the problem into parts, where each part does exactly one thing, and the interfaces between them are explicit.** Concretely, the pipeline has four components, and each has a single job:

**The embedding (HuBERT) does perception.** It turns raw waveforms into a space where phonetically similar sounds land near each other, across speakers and recording conditions. This is the hard, expensive, learned part — and in this design it runs *offline, once*. It is not consulted at recognition time in the encoder-free variant.

**The codebook (2000 k-means centroids) does discretization.** It converts the continuous perceptual space into a finite inventory of reusable units. Nothing else. It has no opinion about language; it's a frozen lookup table you could print out.

**The CTC model does transduction.** It maps unit sequences to character sequences — learning, essentially, the pronunciation-to-spelling regularities of English. At 17 MB it's tiny, because that's all it has to know.

**The language model does prior knowledge.** A standard 3-gram LM contributes what English words and phrases are likely. And it matters a lot: greedy decoding gives 20.8% WER, the LM brings it to 9.1%. Which is itself informative — a good chunk of "recognition" is not in the acoustics at all, it's in knowing the language.

None of these components saw each other during training. They compose because the interfaces are explicit: an embedding space, a codebook, a unit sequence, a character lattice. When performance is bad, you can localize the fault. When one part improves, you swap it in. Try doing either with a monolith.

## The interface is the interesting design decision

Two findings from this experiment are, I think, the genuinely useful ones — both are about interfaces, not accuracy.

**First: hand off the centroid *vector*, not the cluster *ID*.** The CTC's input is the centroid's actual 768-d vector, so its input space is the embedding space snapped to 2000 points. A wrong-but-nearby cluster assignment becomes a small numerical perturbation instead of a completely different symbol, and the system degrades gracefully. Discreteness for modularity, geometry for robustness — you can have both.

**Second: the consumer must be adapted to the producer.** When I replaced HuBERT at inference with a small transformer that predicts embeddings from plain filterbank features, the predictions were *more* faithful to HuBERT's embeddings than the codebook quantization itself (cosine 0.788 vs the 0.722 centroid floor) — and yet the frozen CTC performed terribly on them (46% WER), because it had never seen this front-end's output distribution. Retraining the CTC on the new front-end's outputs dropped encoder-free WER to **19.9%**. Fidelity to an interface on paper isn't enough; distributions have to match. (Also notable: the naive approach — classify the cluster ID from local features — hit a hard 48% frame-accuracy ceiling that survived 20× data and every architecture change. Regressing the embedding instead broke it. The framing was the bottleneck, not the information.)

## Why doesn't anyone publish the centroids?

Here's the thing that nags me. When HuBERT (or any SSL model) is released, we get the weights. What we *don't* get is a canonical codebook — the cluster centroids that turn its embedding space into a shared, versioned unit inventory.

Everyone who builds discrete-unit systems re-runs k-means themselves, on their own data sample, with their own k, getting their own incompatible units. My cluster 1347 is not your cluster 1347. Every unit-based model — recognizers, unit language models, resynthesizers — is welded to whichever private clustering its authors happened to compute.

Compare this to text: tokenizers ship *with* language models, versioned, as part of the artifact. The vocabulary is the contract that lets independently built systems interoperate. Speech has no equivalent. There's no reason it couldn't:

- **A published, versioned codebook** ("hubert-large-L9-km2000-v1") would make discrete speech units a stable target. Anyone's unit-to-text model would run on anyone's front-end that maps into the same codebook.
- **Cheap front-ends become independently valuable.** My encoder-free result distills the expensive encoder into "map audio near the right centroids." With a shared codebook, one group could train tiny on-device front-ends, another could train better unit-to-text models, and they'd compose without coordination — the way the LM in my pipeline was trained by someone else, years ago, for other purposes, and just slotted in.
- **Extensions have an obvious grammar.** Hierarchical codebooks (coarse phonetic units refined by residual ones), per-language codebooks sharing a universal backbone, codebooks fit on far more audio than any one lab's sample. All of these are only worth building *on top of a fixed reference* — which is exactly what doesn't exist.

The closest existing things are neural audio codec tokens (which are optimized for reconstruction, carrying speaker and channel detail the recognition task doesn't want) and each paper's private k-means. The gap — a shared *phonetic* unit inventory as a published artifact — seems real, and cheap to fill: it's literally a 2000×768 matrix.

## The honest caveats

The centroids are only meaningful inside a good embedding space — clustering raw spectral features gets nowhere near this (I've measured that separately; the ceiling is low and it's flat). Quantization does lose real information: 9.1% is several times worse than state-of-the-art on this benchmark, and part of the recovery comes from the LM injecting linguistic redundancy rather than the acoustics being sufficient. There's nothing magic about k=2000 — it's a point on a curve I didn't sweep in this pipeline. And this is read, clean, English audiobook speech.

But the architectural lesson doesn't depend on the benchmark being won. LLMs solve everything in weights; this pipeline solves it as a society of small systems, each doing one job, agreeing only on interfaces. The perception part runs once, offline. The discretization is a printable table. The transducer is 17 MB. The prior is a swappable file from 2012-era speech research. It's legible, debuggable, and improvable part by part — and it gets within striking distance of respectable. I'll keep pulling on the parts separately; that's rather the point.

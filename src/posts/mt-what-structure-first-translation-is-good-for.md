---
layout: post.njk
title: "What structure-first translation is good for"
date: 2026-08-16
permalink: /posts/what-structure-first-translation-is-good-for/
series: "Translation From Scratch"
part: 6
---

Let me be blunt up front: this system does not beat Google Translate, or an LLM, or a modern NMT model, on translation quality. If you want the best Hindi for an arbitrary English sentence, use one of those. So why build it?

Because "quality on high-resource pairs" is one axis, and the black-box systems that win it are bad at almost everything else you might want from a translator. This post is about the axes they're bad at, where a structure-first pipeline is *good*, and where it should go next.

## What you get that a black box doesn't

**Interpretability, all the way down.** Every stage is a legible artifact. You can watch the pipeline turn *"the company announced a new phone"* into an English skeleton, into a reordered Hindi skeleton with agreement tags, into a read-out — and when it makes a mistake you can point at the stage that made it. Did it get the word order wrong, pick the wrong verb sense, or fail to inflect? You can *see* which, because those are separate, inspectable steps rather than a single distribution over tokens. Nothing about an LLM's translation is inspectable in this way.

**Control and faithfulness by construction.** Because content words are carried across as indexed slots rather than generated, the system *cannot* hallucinate a person who wasn't in the source — the entities are copied, not invented. You get guarantees that a fluent black box can only be asked for and never made to keep: preserve this spelling, don't add facts, keep this register. This is the same reason [the summarization experiments in the earlier project](/posts/what-its-actually-good-for/) leaned on structure — faithfulness you can prove beats fluency you have to trust.

**Data efficiency and low-resource reach.** The whole thing runs on a few hundred thousand sentence pairs and trains on a laptop — a four-million-parameter structure model, a small character-level morphology model, and an aligner. There is no giant parallel corpus and no data center. For the thousands of languages that will never have LLM-scale data, an interpretable pipeline that squeezes a strong *structural* signal out of modest data is not a toy — it may be the only thing that works.

**It's a rehabilitation of a good old idea.** What this pipeline really is, in the vocabulary of the field, is **neural preordering** — permute the source into target order first, then fill in the words — plus a learned inflection model. Preordering worked before neural translation buried it. The contribution here is doing it with modern parsers, neural alignment, and tiny transformers, and *measuring* it honestly.

## What it's bad at, stated plainly

- **Fluency of long, complex sentences.** Short factual sentences come out clean. Long ones accumulate word-order slips and dropped function words. The residual gap to the [LaBSE ceiling](/posts/chrf-lied-labse-didnt/) is mostly this.
- **Word order is the weak link now.** Vocabulary is handled (a 47k dictionary plus MUSE), morphology is handled (the character generator). What's left is the structure model's ordering errors on hard sentences — which is a modeling problem, not a data problem.
- **It inherits the aligner's mistakes.** Every orphan traces back to an alignment miss. The pipeline is only as good as the word alignment underneath it, and unsupervised alignment on noisy web data has a real ceiling.

## Where it goes next

**A stronger word-order model.** The single highest-value lever. The structure transformer is deliberately tiny; the ordering errors on long sentences are the main thing between 0.758 and the 0.80 ceiling. More capacity, more training, and possibly a syntax-aware decoder go directly at that.

**Phrase-level alignment.** Some Hindi content is expressed as multi-word light-verb constructions (*delete →* विलोपित करना) that a word-level aligner splits and orphans. Aligning contiguous phrases as single units, rather than words, would recover a class of orphans the current dictionary recovery can't.

**More language pairs — and a caution about tooling.** The natural next step is Telugu, and it's a good reminder that the interpretable approach lives and dies by its linguistic tools. I tried it, and hit a wall immediately: the parser I rely on has no Telugu lemmatizer at all, and Telugu's agglutinative morphology and sandhi would stress the character generator far harder than Hindi does. A black-box LLM doesn't care what tooling exists for a language; a structure-first pipeline needs a parser, a lemmatizer, and an aligner that all work. That dependency is a real limitation — and also, arguably, the point: it forces you to confront what you actually know about a language instead of hoping the weights figured it out.

**Reusing the machinery beyond translation.** The same factorization — structure model plus content model plus faithful copy — transfers to other conditional-generation tasks. It already showed up in [summarization](/posts/what-its-actually-good-for/), where faithfulness-by-construction is worth more than a fluency point.

## The thread that runs through all of it

The finding that started [the whole project](/posts/meaning-is-a-mirage/) was that structure is the transferable, learnable, low-entropy channel and content is the hard, high-entropy one. Translation is the clearest demonstration of that thesis paying off. The structure of a Hindi sentence really is predictable from the structure of its English source — verb-final order, postpositions, gender agreement, all learned from parallel data with no rules and no scale. The content is where the difficulty stays, exactly as predicted.

You will not get state-of-the-art fluency this way. You will get something the state of the art can't give you: a translator you can open up, watch reason in steps you understand, correct one stage at a time, run on almost no data, and trust not to make things up. For a lot of real problems, that is the better trade — the same one the field made in reverse, twice, on the way to the black box.

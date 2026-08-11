---
layout: post.njk
title: "How machines learned to translate"
date: 2026-08-11
permalink: /posts/how-machines-learned-to-translate/
series: "Translation From Scratch"
part: 1
---

This is the start of a series about a translation system I built the wrong way on purpose. Everyone else translates by throwing a very large neural network at a very large pile of sentence pairs and letting it sort out the details. I wanted to see how far you get if you insist on the opposite: translate the *structure* of a sentence first, explicitly, in a form you can read and check at every step, and only then fill in the words.

Before any of that makes sense, it's worth remembering how the field actually got to where it is — because the approach in this series is a deliberate throwback to an idea that neural translation quietly absorbed and stopped talking about.

## Translation is not word substitution

The naive picture of translation is a dictionary lookup: replace each English word with its Hindi equivalent and you're done. This fails immediately, in three separate ways, and every era of machine translation is really a different answer to these three problems.

**Word order.** English is subject–verb–object: *"the boy reads a book."* Hindi is subject–object–verb: *"the boy a book reads"* (लड़का किताब पढ़ता है). English uses prepositions (*to the market*); Hindi uses postpositions (बाज़ार को, literally *market to*). A word-for-word substitution produces grammatical nonsense.

**Morphology.** Hindi verbs and adjectives agree with the gender and number of what they attach to. *"gave"* is दिया with a masculine object and दी with a feminine one — same English word, different Hindi surface form depending on grammar the English never marked.

**Meaning.** *"bank"* is a riverbank or a financial institution; *"light"* is a noun, a verb, or an adjective. You cannot pick the right translation without understanding the sentence.

Every serious translation system is a machine for solving reordering, inflection, and word-sense at once. The history of the field is the history of *where* that machinery lived.

## Four eras, one moving black box

**Rule-based (RBMT), roughly the 1950s–1980s.** Linguists wrote the rules by hand: dictionaries, morphological analyzers, syntactic transfer rules that turned an English parse tree into a Hindi one. Fully interpretable — you could point at the exact rule that fired — and hopelessly brittle. Language has too many exceptions to enumerate.

**Statistical (SMT), roughly the 1990s–2014.** Instead of writing rules, learn them from data. The IBM models and later phrase-based systems learned, from millions of sentence pairs, a *phrase table* (which source chunks translate to which target chunks) and a *reordering model* (how to permute them). The quiet workhorse underneath was **word alignment**: an algorithm that, given a sentence pair, figures out which source word produced which target word. Tools like GIZA++ and `fast_align` did this, and everything else was built on top. SMT was less interpretable than RBMT but far more robust.

**Neural (NMT), roughly 2014–2018.** Replace the whole pipeline with one sequence-to-sequence neural network: an encoder reads the source into a vector, a decoder writes the target. Then [attention](/posts/why-attention-isnt-the-problem/) let the decoder look back at any source position while generating, and the Transformer made that the entire architecture. Fluency jumped dramatically. But the phrase table, the reordering model, and the explicit alignment all dissolved into weights. The system worked better and told you nothing about *why*.

**LLMs, roughly 2019–now.** A large decoder-only model trained on essentially all text can translate as a side effect of next-token prediction, often with no translation-specific training at all — you just ask. This is the current state of the art for high-resource pairs, and it is the least interpretable of all: translation is now an emergent behavior of a general model, with no component you could point to and call "the translator."

The trend is unmistakable. Each era translated *better* and understood *less*. We traded the glass box for the black box, and mostly it was a good trade.

## What we gave up

Fluency is not the only thing a translation system can be judged on, and for a lot of real situations it isn't even the most important. Three things got harder as the box got darker:

- **Interpretability.** When an LLM mistranslates, there is no stage to inspect. You can't ask "did it get the word order right but pick the wrong verb sense?" because there are no stages — just a probability distribution over the next token.
- **Low-resource languages.** LLMs and NMT are hungry. The world's ~7,000 languages mostly do not have millions of clean sentence pairs. For most of them, the black-box approach simply has too little to eat.
- **Control and faithfulness.** Sometimes you need guarantees: never invent a person who isn't in the source, keep this entity spelled exactly this way, produce output in a specific register. A black box gives you none of these by construction; you can only ask nicely and hope.

## The idea this series follows

The word alignment that SMT leaned on never stopped being true — sentences really do have a correspondence between their parts. And the syntactic transfer that RBMT tried to hand-write really is learnable — you just shouldn't write the rules by hand. There was even a technique, popular right before NMT swept everything away, called **preordering**: permute the source words into target-language order *first*, as a separate step, then translate the reordered sentence almost monotonically. It was interpretable and it worked, and neural translation made it look quaint overnight.

This series rebuilds that idea with modern tools. The plan:

1. Represent a sentence as its grammatical **skeleton** — parts of speech and function words, content words abstracted away — and learn to translate the *skeleton* from English to Hindi. That's the reordering model, made explicit and inspectable. (This grew directly out of an earlier project on [the structure of a story](/posts/an-embedding-that-remembers-grammar/).)
2. **Index** the content words (nouns, verbs, adjectives) so they can be carried across and slotted back in after reordering. That's word alignment, doing exactly the job it always did.
3. **Inflect** them correctly with a small morphological model, so agreement is handled instead of ignored.
4. Read the whole thing out into Hindi — and then figure out how to *measure* whether any of it worked, which turns out to be its own hard problem.

None of this will beat an LLM on fluency. That is not the point. The point is a translator you can open up, watch think, and correct — one that runs on a few hundred thousand sentence pairs and a laptop instead of a data center. In the next post we start where the whole thing starts: translating a sentence's shape while completely ignoring its words.

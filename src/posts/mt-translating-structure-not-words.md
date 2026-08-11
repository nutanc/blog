---
layout: post.njk
title: "Translating structure, not words"
date: 2026-08-12
permalink: /posts/translating-structure-not-words/
series: "Translation From Scratch"
part: 2
---

The whole approach rests on one bet: that the *structure* of a translation is far more predictable than its *content*, and that you can learn the structural part cleanly by throwing the content away entirely.

That bet came out of an earlier project. In [The Shape of a Story](/posts/an-embedding-that-remembers-grammar/) I spent a long time separating a sentence's *form* — its grammatical skeleton — from its *meaning*, and the recurring finding was blunt: [meaning is a mirage and grammar is real](/posts/meaning-is-a-mirage/). Form is low-entropy and learnable; content mostly isn't. Translation is where that finding earns its keep, because translation is exactly a structural transformation with a content substitution riding on top.

## What a skeleton is

Take an English sentence and a Hindi sentence and run both through a dependency parser (I use [Stanza](https://stanfordnlp.github.io/stanza/), which has models for both languages). The parser gives every word a **universal part-of-speech tag** — `NOUN`, `VERB`, `ADJ`, `ADP` (adposition), `PRON`, and so on — from a scheme shared across languages.

Now build the skeleton by a simple rule: **replace every open-class content word with its part-of-speech tag, but keep the function words as themselves.** Open-class words (nouns, verbs, adjectives, adverbs) are where meaning lives and where the vocabulary is effectively infinite; function words (the, to, में, ने) are a small closed set that carries the grammar.

So the English *"the boy gave a book to his sister"* becomes something like:

```
the NOUN VERB a NOUN to his NOUN
```

and its Hindi translation *"लड़के ने अपनी बहन को एक किताब दी"* becomes:

```
NOUN ne apni NOUN ko ek NOUN VERB
```

Every specific noun is gone. What remains is pure structure: the word order, the function words that mark grammatical roles (ने marks the subject of a completed action, को marks the recipient), and the shape of the clause.

## The experiment

Train a small encoder–decoder Transformer — about four million parameters, tiny by any modern standard — to translate the **English skeleton into the Hindi skeleton**. Nothing else. It never sees a content word. Its entire job is: given the grammatical shape of an English sentence, predict the grammatical shape of its Hindi translation.

If English-to-Hindi structural divergence is *systematic* — if SVO reliably becomes SOV, if prepositions reliably become postpositions — then a model this small should pick it up from parallel skeletons alone, with nobody writing down a single rule. And if the divergence is idiosyncratic noise, the model has nothing to learn and will do no better than chance.

## It works, and it induces the grammar

On held-out sentence pairs, the skeleton translator hits **0.61 token similarity** with the true Hindi skeleton. The baselines make that number mean something:

- an **identity copy** (just guess the Hindi skeleton *is* the English skeleton) scores 0.24 — that's how different the two structures are to begin with;
- a **source-blind decoder** (same model, but the English input is hidden, so it can only produce a generic "typical Hindi skeleton") scores 0.28.

So the model is genuinely *conditioning on the English structure*, not memorizing an average Hindi shape. And the specific things it learned are exactly the textbook typological differences — which I could check directly, because the skeleton is readable:

- **Verb-final word order (SOV).** Fraction of sentences where the main verb lands in final position: the model's output, **0.42**, matches real Hindi's **0.38**. The English source is **0.14**. The model moved the verb to the end.
- **Postpositions.** Fraction of adpositions that follow their noun rather than precede it: model **0.67**, real Hindi **0.66**, English **0.58**. The model turned prepositions into postpositions.

Nobody told it that Hindi is verb-final or postpositional. It learned both from parallel skeletons, the way SMT's reordering models used to — except here the "reordering model" is a legible sequence you can print out and read.

## Why this is the good part

This is the cleanest result in the whole project, and it's worth being clear about why.

Structure transfers **because it is low-entropy**. There are only so many ways a clause can be shaped, the function words are a closed set, and the mapping from English shape to Hindi shape is regular. That regularity is precisely what a small model can nail with little data — the opposite of content, where the vocabulary is open and the "right" word depends on world knowledge the model doesn't have.

It's also the part that neural translation hid. An LLM certainly *knows* that Hindi is verb-final, but that knowledge is smeared across billions of weights with no handle on it. Here it's a standalone module that took a four-million-parameter model and a few hours to learn, and whose behavior you can audit sentence by sentence.

Of course, a skeleton is not a translation. *"NOUN ne apni NOUN ko ek NOUN VERB"* is a grammatical frame with holes where the meaning should be. Getting the actual words back — the boy, the book, the sister — means solving the problem SMT called word alignment, and that turns out to be where most of the difficulty, and most of the interesting engineering, lives. That's the next post.

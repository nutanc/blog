---
layout: post.njk
title: "A language model with no words"
date: 2026-08-04
permalink: /posts/a-language-model-with-no-words/
series: "The Shape of a Story"
part: 3
---

The reframing from last time: stop looking at the story-shape as a *picture* (it's
mostly a clock) and start asking whether it's a *sequence you can predict*. Given
the forms of the sentences so far, can you guess the form of the next one?

To ask that, I needed to turn the continuous structure embeddings into something
like words. So I ran k-means over all the sentence vectors and got a vocabulary
of **64 "shape-tokens"** — 64 prototypical sentence-forms. Now every story is a
string in a 64-symbol alphabet, and "predict the next form" is literally
next-token prediction. A language model, but the tokens are grammar, not words.

I trained the usual suspects — unigram, bigram, trigram — and measured how well
each predicts the next shape-token on held-out stories, against two baselines
that matter:

- **unigram** — is there any sequence signal at all, or just a marginal
  distribution of forms?
- **persistence** — predict "next form = current form." Adjacent sentences are
  correlated (dialogue comes in runs), so a real grammar has to beat this, not
  just beat chance.

The result was deflating. The bigram and trigram were *worse* than the unigram.
Persistence barely beat the unigram either. On its face: **no grammar.** The
sequence of forms looked memoryless.

## The negative result was a sample-size bug

Before writing "stories have no learnable form-grammar," I checked whether the
test was even capable of finding one. A bigram over 64 symbols has 64 × 64 =
4,096 transition probabilities to estimate. I had about 6,000 tokens per corpus.
That's barely one observation per cell — the model was drowning in its own
sparsity and losing to the marginal for purely statistical reasons, not because
the signal was absent.

Two fixes told the real story.

First, I swept the vocabulary size. At K=8 and K=16 — small enough that the
transition table is actually estimable — the bigram **did** beat the unigram and
persistence. It was only at K=64 that it collapsed. The "no grammar" reading was
an artifact of too fine an alphabet for the data.

Second, and more convincing because it doesn't depend on any model, I measured
the **mutual information** between consecutive shape-tokens directly, with a
shuffle correction to subtract the finite-sample bias. It was **positive
everywhere** — about 0.03 to 0.14 bits per step, growing with K. There is
genuine sequential structure; the n-gram just couldn't always exploit it.

## How much is "0.03 to 0.14 bits"?

Small. The uncertainty about the next form is several bits; the story-so-far
removes a few percent of it. It's real — persistence-beating, shuffle-surviving,
two-methods-agreeing real — but it is a faint local regularity, not a rich
grammar. And it's genre-dependent in a way I didn't expect: **Grimm fairy tales
had the *least* predictable form-sequence.** Their famous formula lives in the
plot (Propp's morphology), not in how one sentence's grammar follows another.
Sherlock and Moby-Dick had more.

I could even sample from the model — generate a plausible sequence of
shape-tokens and decode each to a representative sentence, a "narrative
skeleton." It produced recognizable rhythms of form. But hard-quantizing into 64
buckets was obviously throwing information away — the mutual information said so.

If the signal is faint, you don't want to lose *any* of it at a clustering
boundary. So the next move was to drop the vocabulary entirely and predict the
next structure *vector* directly. Which is a stranger kind of language model than
it sounds.

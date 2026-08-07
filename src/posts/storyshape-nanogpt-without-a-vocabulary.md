---
layout: post.njk
title: "nanoGPT without a vocabulary"
date: 2026-08-05
permalink: /posts/nanogpt-without-a-vocabulary/
series: "The Shape of a Story"
part: 4
---

Karpathy's char-level nanoGPT works like this: a finite vocabulary of tokens, a
softmax over that vocabulary, cross-entropy against the true next token, and you
sample from the softmax to generate. The output space is a fixed list you can put
probabilities on.

Our "tokens" are structure *vectors* — points in a continuous space. There is no
finite vocabulary, so the softmax trick is gone, and with it the loss and the
sampling. Predicting the next *vector* is a genuinely different animal. I built it
two ways.

## Way one: rank, don't reconstruct

The first head is contrastive (InfoNCE). Instead of asking the model to output
the exact next vector — which is hopeless, since many continuations are plausible
and a squared-error model would just predict their blurry average — you ask it to
*rank* the true next vector above a batch of impostors. Then you evaluate by
retrieval: given the predicted vector, does the true next sentence rank above 49
random distractors?

The bar to beat is not chance (1-in-50). It's **copy** — predict "next vector =
current vector" — because adjacent sentences are correlated and copying is
surprisingly hard to beat. A tiny 3-layer causal Transformer (small on purpose;
this repo has a long history of bigger models overfitting) cleared it on all
three corpora. Sherlock: copy retrieves the right next sentence in its top-5
about 18% of the time; the Transformer, 28%. It also beat a linear autoregressor,
so the attention over the story-so-far was doing real work.

Modest, but consistent and real: the model uses context beyond the current
sentence to place the next form.

## Way two: model the whole distribution

The contrastive head ranks; it can't tell you *how* uncertain it is, and it can't
really generate. So I added a mixture-density head — the continuous analogue of
nanoGPT's softmax. Instead of one vector it outputs a *mixture of Gaussians* over
the space: a soft, twelve-component "vocabulary" you can put a proper likelihood
on and actually sample from. (This is the trick Ha and Schmidhuber's World Models
used for exactly the same reason.)

Sampling from it finally produced skeletons with real diversity — three draws
from the same seed genuinely diverged, one drifting into dialogue, another into
exposition. That's the generative payoff the greedy nearest-neighbour decoder
couldn't give.

## The two heads disagreed, and the disagreement is the finding

Here's the part I didn't see coming. On *likelihood* — how much probability the
model puts on the true next vector — the mixture model beat a persistence
Gaussian (so "next ≈ current" is a bad density model), but it **lost to a plain,
unconditional bell curve** fit to the marginal distribution of forms.

Sit with that. The contrastive head says context clearly helps (it beats copy at
ranking). The density head says context does *not* help (it can't beat knowing
the overall distribution). Both are true, and they're not contradictory: the
faint context signal is enough to *reorder* candidates — to say "of these fifty,
the true next is more form-like-this than those" — but far too weak to sharpen
the *absolute* probability landscape over the whole space against a
well-calibrated marginal.

That's the honest shape of a few-percent signal. It shows up in relative ranking
and vanishes in absolute likelihood.

## Does more data help?

Yes, a little, and it diagnosed something. On the small corpus the model started
overfitting by step 200. Scaling from 12k to 154k sentences let it train to step
700 before overfitting and nudged every retrieval number up. So the fast overfit
was data-starvation, not a fundamental wall — the ceiling is set by how much
signal the form sequence contains, and more data buys you a bit more of it.

At this point I had a working next-form predictor that beat the honest baselines
but only just. Before pushing harder on the model, I wanted to know *what kind of
token* carried the signal. That experiment flipped my intuition completely.

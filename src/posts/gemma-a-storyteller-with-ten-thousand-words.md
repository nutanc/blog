---
layout: post.njk
title: "A storyteller with ten thousand words"
date: 2026-08-25
permalink: /posts/gemma-a-storyteller-with-ten-thousand-words/
series: "The Tiny Storyteller"
part: 1
---

Gemma-3-270M is a curious little model. It has 270M parameters, and **168M of
them — 62.6% — are the vocabulary embedding table**: 262,144 tokens × 640
dimensions. The actual transformer, the part that does the thinking, is only
100M. Most of the model is a dictionary.

That set off an idea. Children's stories don't need 262,144 tokens. If I restrict
the vocabulary to just the words that appear in simple stories and physically cut
the embedding table down to size, the model should shrink a lot — and because
Gemma *ties* its input and output embeddings, cutting the table shrinks the
softmax at the same time. Two questions came with it:

1. How small can I make the vocabulary before the stories fall apart?
2. How few stories do I need to fine-tune it into a storyteller?

The whole experiment rests on one honest admission I'll come back to: **I am not
teaching Gemma English. I'm renting English fluency it already learned in
pretraining, and only teaching it a *style*.** That's the trick that makes
everything cheap.

## How much of TinyStories' vocabulary is real?

[TinyStories](https://huggingface.co/datasets/roneneldan/TinyStories) is a corpus
of simple stories written with the vocabulary of a 3–4 year old. I tokenized
200,000 of them with Gemma's tokenizer: 43.7M tokens, but only **25,558 distinct
tokens**. The full model carries ten times that many rows it will never use here.

The frequency distribution is steep. Keeping every token that appears at least 20
times gives **9,908 tokens** and discards only **0.175%** of all token
occurrences (those become `<unk>`). So:

| | Full Gemma-3-270M | Compact |
|---|---|---|
| Vocab | 262,144 | 9,908 |
| Embedding params | 167.8M (62.6%) | 6.3M (~6%) |
| Total params | 268.1M | **106.7M (39.8%)** |

The surgery itself is almost embarrassingly simple — slice the embedding matrix
to the rows you're keeping, remember the mapping, and let tied weights carry the
change through to the output head:

```python
kept = special_ids | {t for t, c in freq.items() if c >= 20}
new_emb = old_embedding.weight[kept_ids]      # [9908, 640]
model.resize_token_embeddings(len(kept_ids))
model.get_input_embeddings().weight.data.copy_(new_emb)
```

At the boundary I keep Gemma's original tokenizer and just remap ids: text →
Gemma ids → compact ids for input, and back again for decoding. Before any
fine-tuning, the sliced model already emits fluent English — proof the remap is
correct and, more importantly, proof the *fluency survived the cut*.

## Fine-tuning: less than a fifth of one epoch

I did a full fine-tune of the 106.7M compact model on Apple Silicon (an M5, in
plain fp32 — more on why below). The striking part is how little training it took.
Validation perplexity fell fast:

| step | 200 | 1000 | 1200 | 1400 | 1500 |
|------|-----|------|------|------|------|
| val ppl | 6.28 | 4.17 | 3.97 | 3.84 | **3.78** |

That's **1,500 steps ≈ 6.14M tokens ≈ 0.14 of one epoch** over the 200k-story
set. A sample, generated unconditioned:

> Once upon a time, there was a little girl named Lily. She loved to play with
> her toys and watch cartoons on TV. One day, Lily's mommy told her that they
> were going to have a picnic at the park… She learned that even though things
> don't always go the way we want, we can [...]

Complete arc, dialogue, a little moral, from a 106.7M model with a 9,908-word
vocabulary. And you can steer it — prompt it with *"The old robot was very sad
because"* and it writes about a robot; prompt *"a dog named Max found a big red
ball"* and it writes about the dog.

## How small can the vocabulary go?

I rebuilt the model at 4,064 tokens (keep-count ≥ 300, 1.31% OOV). It trains just
as well (val ppl 3.74) and the stories are, to the eye, indistinguishable — with
one tell: the higher OOV rate occasionally corrupts a rare word mid-story
(*"They used **aels** to make the roof"*, where a dropped subword became junk).

But here's the punchline on size: 4,064 tokens is **102.9M** params versus
**106.7M** at 9,908. Almost no difference. Once the vocabulary is below ~10k, the
embedding is a rounding error and the **100M transformer is the floor**. The
entire payoff is in the *first* cut — 262k → ~10k drops the embedding from 168M
to 6M. Going smaller only trades story quality for nothing. So ~10k is the sweet
spot: it removes the `<unk>` artifacts at essentially the same model size.

## How few stories do we need?

This was the question I most wanted answered. I trained the same compact model on
2,000 / 6,000 / 10,000 / 15,000 unique stories — same fixed vocabulary, same
fixed compute (500 steps), same held-out validation set. Only the number of
stories changed. Best validation perplexity:

| stories | 2,000 | 6,000 | 10,000 | 15,000 | (200,000) |
|---------|------:|------:|-------:|-------:|----------:|
| val ppl | 6.62* | 4.73 | 4.34 | 4.28 | 3.78 |

<small>*best-ever; see below.</small>

The `*` on 2,000 is the interesting part. With only 2,000 stories the model
*memorizes* them — by step 500 (five passes over the tiny set) validation
perplexity had **exploded from 6.6 to 48**. The generated prose still *reads*
fluent — pretraining hides it — but the logic quietly breaks: it tries to *"wipe
the storm away with a towel"* and *"put a bubble on the top of the storm."*
Perplexity is the honest detector; the surface is not.

At 6,000 stories and up, that collapse is gone — validation perplexity decreases
smoothly and is still improving when the budget runs out. **The overfitting cliff
sits between 2k and 6k stories.** Above 6k it's gentle diminishing returns: 6k
gets you most of the way, and the jump from 15k to the full 200k only buys you
4.28 → 3.78.

So the answer is: **roughly 6,000–10,000 stories** for a coherent, generalizing
tiny storyteller. Which is remarkably few — and now the caveat I promised.

## The honest part: whose fluency is this?

Those ~6,000 stories did not teach the model English. They taught it *the
TinyStories style*. The grammar, the vocabulary in context, the ability to finish
a sentence — all of that came free from Gemma's pretraining. Strip that away and
6,000 stories would get you nothing. When I checked novelty, the stories are
recombinations, not whole-cloth memorization, but they lean heavily on the
dataset's stock openings ("Once upon a time, there was a little girl named
Lily…") — which makes sense at 0.14 of an epoch.

That reframing matters, because it predicts exactly where this method will and
won't transfer cheaply. It'll be cheap wherever Gemma is already fluent, and
expensive wherever it isn't. Which is the next post: I ran the same probes for
**Hindi and Telugu**, and the tokenizer alone tells you most of the story.

## Notes from the trenches (Apple Silicon)

A few things cost me time, in case they save you some:

- **bf16 autocast hangs** on this MPS build — the process just stalls. fp32 was
  the only reliable fast path (~1,850 tok/s at batch 4).
- **seq_len 512 hits a pathologically slow MPS path**; 256 was ~10× healthier and
  fits these stories fine (they average ~220 tokens).
- **Batch 16 made MPS balloon to ~12GB** of activations and swap-thrashed a 16GB
  machine down to 0.16 it/s. Batch 4 fits in 3.45GB and runs clean. The model is
  small; the activations are not.

Full code and the per-run logs are in the repo. Next: does any of this survive
the jump to Hindi?

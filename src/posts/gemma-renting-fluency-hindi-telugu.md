---
layout: post.njk
title: "Renting fluency: the same trick in Hindi and Telugu"
date: 2026-08-26
permalink: /posts/gemma-renting-fluency-hindi-telugu/
series: "The Tiny Storyteller"
part: 2
---

In [part 1](/posts/gemma-a-storyteller-with-ten-thousand-words/) I trimmed
Gemma-3-270M down to a 106.7M-parameter English storyteller by slicing its
vocabulary embedding, and found it needed only ~6,000 stories and 0.14 of an
epoch to become coherent. I ended on a confession: those stories weren't teaching
the model English. They were teaching it a *style*. The English fluency came free
from pretraining. I called it **renting fluency**.

This post tests that claim two ways. First, directly: what happens if there's no
pretraining to rent? Second, across languages: the "rent" story predicts the
method should be cheap wherever Gemma is already fluent and expensive where it
isn't. So I tried Hindi and Telugu.

## Proving the rent: a from-scratch baseline

The cleanest test is a control. I took the *same* compact architecture, the
*same* 200k stories, the *same* 1,500 steps — and randomly initialized the
weights instead of starting from Gemma. The only variable is whether the
transformer begins with pretrained knowledge.

| Val perplexity at step | 200 | 600 | 1000 | 1500 |
|------------------------|-----|-----|------|------|
| Pretrained-init | 6.28 | ~4.9 | 4.17 | **3.78** |
| Random-init (scratch) | 21.50 | 10.75 | 8.19 | 7.12 |

At every matched step the pretrained model is ~1.9× better, and the gap in the
stories is visible: from-scratch completions drift and contradict themselves — a
story that starts about lost *shoes* ends with mom fetching a *dress*; a fish
that "was always happy when he jumped and growled." The pretrained model stays on
the rails. That 3.78-vs-7.12 gap is the rent, made concrete.

(A footnote on evaluation: I also tried an automated LLM judge, a local
Qwen2.5-1.5B, and it *saturated* — rating both models ~8/10 and failing to see a
gap that perplexity and my own eyes found obvious. That's a real lesson: a weak
judge is worse than no judge. TinyStories used GPT-4 for a reason.)

## The tokenizer tells you the answer before you train

Before training anything in a new language, one cheap probe is startlingly
predictive: how does Gemma's tokenizer *chew* the language?

| | tokens/char | how it splits |
|---|---|---|
| English | 0.25 | whole words: `Once ▁upon ▁a ▁time` |
| Hindi | 0.26 | whole words: `एक ▁बार ▁की ▁बात ▁है` |
| Telugu | 0.40 | characters/syllables: `అ న గ గా` |

Hindi tokenizes almost exactly like English — into words. That only happens if
Gemma saw a lot of Hindi in pretraining (it learned Hindi merges). Telugu falls
back to near-character level: the tokenizer barely knows it. And when I asked the
base model to free-generate, the split held up — base Hindi was rough but real;
base Telugu was grammatical-looking nonsense that looped. (Neither could
translate at all; a 270M model just can't.)

So the prediction: Hindi should rent cheaply, Telugu should resist.

## Hindi: rent confirmed

Using the native Hindi stories from
[Regional Tiny Stories](https://huggingface.co/datasets/Regional-TinyStories/hindi-generated_4o-mini_2M)
(generated directly in Hindi by GPT-4o-mini, not translated), I ran the exact
same pipeline: only 3,304 distinct tokens are needed, giving a 102.4M-parameter
model. It fine-tuned to a validation perplexity of **2.52** — and the output is
genuinely fluent:

> एक बार की बात है, एक छोटे से गाँव में एक प्यारा सा बच्चा था जिसका नाम मोहन था।
> मोहन को खेलना बहुत पसंद था। एक दिन, उसने अपने दोस्तों के साथ मिलकर एक खेल खेलने
> का सोचा…

*(Once upon a time, in a small village there was a lovely child named Mohan.
Mohan loved to play. One day, he thought of playing a game with his friends…)*

Grammatical, coherent, culturally natural. It even inherits the same quirk as the
English model — it mode-collapses onto a favourite name (English loved "Lily",
Hindi loves "Mohan") — which is itself a fingerprint of a small model trained
briefly. Hindi rents just fine.

## Telugu: harder than predicted, but not a failure

Here I was wrong, and pleasantly so. I expected Telugu to fall apart. The *base*
model's Telugu is incoherent, and the tokenizer is character-level. But
fine-tuning on ~10,000 Telugu stories (from
[deeponh/multilingual-tinystories](https://huggingface.co/datasets/deeponh/multilingual-tinystories))
still **coaxed** coherent stories out of it:

> చందమామ ఒక రోజు టీ తోటలోకి వెళ్ళాడు. అక్కడ ఒక చిన్న కాగితం దొరికింది. దానిపై
> "రహస్యం!" అని రాసి ఉంది… చివరికి, అతను ఆ పాత చెట్టు కింద బంగారు నాణేలు మరియు
> రత్నాలు కనుగొన్నాడు!

*(One day Chandamama went into the tea garden and found a small paper reading
"Secret!" … an old box held a note: "Be brave, it will show you the way." …
finally, under the old tree, he found gold coins and gems!)*

That's a real narrative arc. So the tokenizer probe predicted *difficulty*, not
*failure*: Telugu lands at a much higher perplexity (~6 vs Hindi's 2.5) with more
frequent logical drift, but it works. The lesson is subtler than "no Telugu in
pretraining, no Telugu stories" — there's enough latent Telugu to coax, just not
enough to rent cheaply.

## Can't we just *add* Telugu vocabulary?

The obvious fix: if Telugu tokenizes badly, give Gemma a proper Telugu tokenizer.
This is standard **vocabulary expansion**. I trained an 8,000-token Telugu
tokenizer, added those tokens to the model, and — the important trick —
initialized each new embedding not randomly but from the *average* of the Gemma
character-pieces that spell the token, so the model starts able to "read" a new
word as roughly the sum of its parts. Then fine-tuned.

It halved the tokens-per-character (0.40 → 0.20), exactly as hoped. And it made
the model **worse**.

| Telugu model | tokens/char | bits-per-character |
|--------------|-------------|--------------------|
| char-level (reuse Gemma tokens) | 0.40 | **0.887** |
| vocab-expanded (new 8k tokens) | 0.20 | 0.963 |

(Bits-per-character, not perplexity, because perplexity isn't comparable across
tokenizations — a word-level model has more to predict per token.) The expanded
model also overfit far faster, its validation perplexity diverging past 90.

Why? Because vocabulary expansion doesn't add knowledge — it adds 8,000 *empty*
embeddings that must be learned from scratch, and it does so while *halving* the
number of training tokens per story. You've added parameters and removed signal.
Reusing Gemma's existing character embeddings, which carry a little pretraining,
models Telugu better per character than freshly-minted word embeddings do. The
bottleneck was never the tokenizer. It's that the transformer doesn't know
Telugu.

## Rent, coax, buy

That's the whole arc in three words:

- **Rent** (English, Hindi): the base is already fluent; a few thousand stories
  buy you a coherent storyteller for almost nothing.
- **Coax** (Telugu, char-level): the base half-knows the language; fine-tuning
  drags out coherence, but at a quality ceiling you can feel.
- **Buy** (Telugu, vocab-expanded): if you want to actually *add* a language, new
  tokens aren't enough — you need continued pretraining on a lot of text, which
  is the expensive thing the whole "tiny storyteller" recipe was avoiding.

The vocabulary trick from part 1 shrinks a model beautifully when the fluency is
already there to keep. What it can't do is manufacture fluency that was never
pretrained in. Which languages you can rent, it turns out, you can read straight
off the tokenizer.

*Code and the full write-up (including a short paper draft) live in the project
repo.*

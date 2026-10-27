---
layout: post.njk
title: "More data, and how close we are"
date: 2026-10-27
permalink: /posts/more-data-and-how-close-we-are/
series: "Translation From Scratch"
part: 11
---

[Part 10](/posts/rules-or-learning/) ended in a tie between hand-written grammar rules and a model that learns them, at 314k training pairs. The bet was that learning gains more from data. So the last experiment on the laptop was the simplest one in the series: the same design, five times the data, a bigger model.

## Five times the data on 16 GB

Samanantar, the parallel corpus I've used since part 3, has roughly 8–10 million English–Hindi pairs. I streamed the first 1.93 million, kept the 1.5 million that passed the same cleanliness filters, and rebuilt everything: English dependency parse, Hindi parse with case, word alignment, skeletons, dictionaries.

The first obstacle wasn't modelling. 1.5 million parsed sentences don't fit in a 16 GB laptop's memory the way the builder held them. So the builder now works in shards of 320k pairs, caching each shard's parse and alignment on disk and streaming them twice: once to build the dictionaries, once to write the training data. I checked on a small pilot that sharding produces exactly the same output as the original builder. The first shard is exactly the old 320k slice, so its cached parses were reused. The build took 15 hours, almost all of it parsing and alignment.

What came out: 1.47M training pairs, a 166k-word dictionary, 1,967 verb case frames (up from 801), 72 compound postpositions, and 20k English words with more than one Hindi sense. The structure model grew from d384/4 layers to d512/6 layers (35.7M parameters) and trained for 60k steps, 11.5 hours on the laptop's GPU.

## What more data bought

Teacher-forced accuracy, same design at 320k and at 1.5M pairs (each on its own held-out sample):

| token type | 320k | 1.5M |
|---|---|---|
| content slots | 0.49 | **0.53** |
| case markers | 0.50 | **0.55** |
| auxiliaries | 0.64 | **0.69** |
| pronouns | 0.30 | **0.39** |
| negation / particles | 0.40 | **0.49** |
| light verbs | 0.46 | **0.48** |

Every grammar class improved. End to end, on the same 100 conversational sentences used throughout:

| system | chrF | LaBSE | function-word F1 | fluency /3 |
|---|---|---|---|---|
| where part 9 started (am3) | 28.5 | 0.691 | 0.451 | 0.63 |
| v6, 320k pairs, offline | 36.5 | 0.799 | 0.582 | 1.24 |
| **v6, 1.5M pairs, offline** | **39.3** | 0.797 | 0.587 | 1.24 |
| v6, 320k pairs + judge | 42.8 | 0.828 | 0.595 | 1.69 |
| **v6, 1.5M pairs + judge** | **47.5** | **0.835** | **0.618** | **1.80** |
| Gemma-4-12B | 47.8 | 0.860 | 0.733 | 2.26 |

("+ judge" means the Jev word-sense choice and candidate rerank from [part 9](/posts/the-glue-was-hidden/).)

Paired bootstrap, 1.5M against 320k: offline chrF +2.8 (95% CI [+0.9, +4.8]); with the judge, chrF +4.7 [+2.3, +7.1] and fluency +0.11 [+0.02, +0.20]. More data helped, significantly, with nothing else changed.

With the judge, **chrF now matches the 12B LLM**: 47.5 against 47.8. chrF is a character-overlap score against one reference, so it overstates how close we are. The other columns tell the rest: meaning (LaBSE) is within 0.025, fluency is 1.80 against 2.26, and the small words are 0.62 against 0.73.

A concrete case. *"Please do not share your OTP with anyone, even if they claim to be from the bank."* At 320k pairs the negation came out garbled. At 1.5M:

> …तो किसी के साथ अपना ओटीपी **साझा न करें**।

The instruction is right now: "do not share your OTP with anyone". It still has a sense error, though: *from the bank* became बैंक से **बाहर**, "from *outside* the bank".

## How close is "close"?

Corpus averages hide what a user would experience, so I counted sentences instead. A translation conveys the meaning if the judge gives it 2.5+ out of 3 for adequacy, and is readable if fluency is at least 1.5.

| system | meaning conveyed | conveyed + readable | meaning broken |
|---|---|---|---|
| am3 (start of part 9) | 4% | 1% | 37% |
| v6, 1.5M pairs, offline | 30% | 25% | 11% |
| **v6, 1.5M pairs + judge** | **66%** | **51%** | **2%** |
| Gemma-4-12B | 99% | 98% | 1% |

Half our sentences are good, and almost none are broken. The 12B gets essentially all of them right. That's an honest summary of where structure-first translation stands. Its Hindi reads like a careful non-native speaker's: understandable, sometimes clumsy.

## What it's for today, and how small it is

It works now for short transactional and templated messages (*आपका प्रमाणपत्र डाउनलोड के लिए तैयार है*), gist translation, and glossary-controlled terminology. Every word comes from a dictionary, so you can force a term and it can't invent content. As [part 8](/posts/the-translator-as-an-inspector/) showed, it also works as a monitor for an LLM. It isn't ready for meaning-critical text without a guard: the monitor would flag the risky sentences and send those to a bigger model.

On size:

| part | size |
|---|---|
| structure model (d512/6L) | 35.7M parameters |
| character morphology model | 12.1M parameters |
| dictionaries, morph table, case frames | tens of MB |
| English parser (currently Stanza) | ~280 MB, replaceable by a small parser |
| context word-sense picker (mBERT + kNN) | the heavy part; optional |

Our own models total about 48M parameters. With int8 weights, a light parser and without the mBERT sense picker, an offline edge build is roughly 60–80 MB. That's an order of magnitude smaller than the smallest serious neural translators. The judge is a cloud call, so the realistic on-device design is a hybrid: translate locally, and send only the sentences the local monitor flags.

## What I'd do next, and where

The laptop has done what a laptop can. The next round moves to a bigger machine (an NVIDIA DGX Spark), with a handoff report of everything here. In order:

1. **All of Samanantar**, 8–10M pairs. Five times the data was worth +2.8 to +4.7 chrF. That's the cheapest lever left, and it's the one that should separate learning from rules.
2. **A small pretrained realizer for fluency.** Fluency is the remaining gap, and [part 7](/posts/getting-the-words-right/) showed it can't be polished in afterwards. The plan is a Gemma-270M, already taught to write Hindi, that turns our skeleton plus chosen words into a sentence. The structure monitor guards it against drifting from the meaning. It's still small enough for a phone (~150 MB at int4).
3. **Structure beside the LLM.** Run the monitor next to the 12B on the same machine, and replace "escalate to the expensive prompt" with "repair the word the monitor flagged".
4. **Verb identity for constructions** like *have*, *need*, *like*: मेरे पास है, मुझे चाहिए, मुझे पसंद है. These are still visibly wrong (*मैं रिफंड जरूरत करता हूं*).

## The thread, one more time

The bet from [part 2](/posts/translating-structure-not-words/) was that a Hindi sentence's structure can be predicted from its English source. It held up, and it held up further than I expected. Word order came first. Then agreement and tense. Then auxiliaries and light verbs, once the data stopped hiding them. Then case markers, once the source carried the verb's case frame and the possessed noun's gender. Each step came from finding what the skeleton threw away and putting it back.

What structure doesn't give you is fluency, the last 0.5 on a 3-point scale, and the shrinking gap that remains. Everything in this series says that part gets rented from a pretrained model, and earned with data.

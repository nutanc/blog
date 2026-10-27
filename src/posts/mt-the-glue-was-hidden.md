---
layout: post.njk
title: "The glue was hidden"
date: 2026-10-27
permalink: /posts/the-glue-was-hidden/
series: "Translation From Scratch"
part: 9
---

[Part 8](/posts/the-translator-as-an-inspector/) built a monitor for someone else's translator. The obvious next move was to turn it on my own: let the calibrated judge choose word senses, and let it pick the best of several candidate translations. It worked — and the way it stopped working pointed straight at the real problem.

## A judge in the loop

Two changes to the structure-first translator, one judge call each per sentence:

- **Word senses by choice.** For every content word with several possible Hindi translations, ask Jev a multiple-choice question: *which of these Hindi words translates 'said' as used here?* — and use its pick when it's confident. *said* → कहा (not दिया, "gave"), *fee* → शुल्क (not रुपये, "rupees"), river *bank* → तट (not बैंक).
- **Rerank.** Produce a few candidates (the greedy skeleton plus beam-search alternatives), score each for faithfulness, adequacy and fluency, keep the best.

On 100 conversational sentences, chrF went from 28.5 to 34.4 and LaBSE from 0.691 to 0.747, a significant gain (+0.056, 95% CI [0.043, 0.069]). But fluency barely moved: 0.63 → 0.84 out of 3. Choosing better words and better skeletons couldn't fix what the read-out never produced.

## "Should we add the story-shape features?"

At this point the question came up whether the skeleton needed richer metadata — the narrative axes this project started from, like valence, tension and concreteness. The instinct (*give the structure model more to condition on*) was right; those particular features weren't. Hindi grammar doesn't care whether a sentence is tense or joyful: *the boy gave a book to his sister* takes the same ने, को and दिया either way. The one axis-like signal that *does* change Hindi is register and speech act: a polite request takes कृपया … करें, a casual one … करो, a question needs क्या. Those belong in the skeleton. Narrative mood doesn't.

But before adding anything, I wanted to know exactly what the model was getting wrong.

## Measuring where the glue goes missing

The structure model gets **word order** right: when it produces the same tokens as the reference skeleton, it puts them in the same relative order 85% of the time (copying the English order would score 65%). But only about a third of its tokens match the reference exactly. What makes up the other two-thirds?

I split the Hindi target skeleton into token types and measured, for each type, how often the model predicts the next token correctly when given the correct prefix (teacher-forced accuracy) on held-out pairs:

| token type | share of target | accuracy |
|---|---|---|
| content slot (N1, V1, …) | 38% | 0.47 |
| case markers (ने को से में का की के) | 18% | 0.45 |
| **unaligned bare tags** (NOUN, ADJ, VERB) | **14%** | 0.39 |
| pronouns | 5% | 0.26 |
| **auxiliaries** (है था रहा गया सकता) | **3.7%** | 0.48 |
| collapsed function words (PRON, ADP tags) | 2.4% | 0.18 |
| **light verbs** (कर किया दिया हुआ) | **0.1%** | 0.10 |

Two numbers in that table are wrong in a suspicious way. Hindi uses auxiliaries in nearly every finite clause — है, था, रहा है, गया — yet they are under 4% of the target. And light verbs, the करना of *दर्ज करना* ("to register") and *इंतज़ार करना* ("to wait"), are 0.1%. Hindi is full of them.

They weren't rare. They were **hidden**. When the training-data builder aligned an English verb to a Hindi verb, it absorbed the following verb or auxiliary into the same slot — so *किया गया है* ("has been done") lived *inside* `V1`. Half of all verb slots (49%) had swallowed their auxiliary this way: है 23,000 times, गया 9,000, हैं 8,600, था 4,200. The model never saw the glue as something to predict, and the read-out — which prints one dictionary word per slot — dropped it. That's where *चाहता* without *हूँ* came from.

The rest of the table had the same flavour. The builder kept only the 150 most frequent Hindi function words as literal tokens; everything else became a `PRON` or `ADP` tag the read-out couldn't fill — and those tags leaked into 24% of the outputs as literal "PRON". And 14% of the target was Hindi content words with no English partner (mostly loose reference paraphrases), which taught the model to emit placeholders for words that had no source.

## Skeleton v4: make the glue visible, then make it predictable

The fix had two halves, and the experiment was designed to measure each.

**Target side — make the glue visible.**
- A slot holds only the content word. Auxiliaries and light verbs become literal tokens after it.
- When an English verb is realized as a noun plus a light verb (*registered* → दर्ज कर), the **noun** is the slot's head and कर is glue the model learns to emit.
- Every Hindi closed-class word seen 20+ times stays literal: pronouns, postpositions, particles.
- Unaligned Hindi content words are dropped from the target; numbers stay as `NUM`.

**Source side — make the glue predictable.** Each English token becomes a bundle of four features whose embeddings are summed, so `N1` stays the same slot however it's annotated:

```
<decl>  the|det  N1|subj|m|s  has|aux  V1|root|p|al3s  a|det  N2|obj|f|s  …
         word | dependency role | gender or tense | number, or voice + light verb + subject person/number
```

- `subj`, `obj`, `obl` drive ने, को and से.
- The **lexical gender of the chosen Hindi word** drives agreement. The Hindi word is chosen *before* decoding, so we know it — fixing the "sister marked masculine" problem from [part 7](/posts/getting-the-words-right/).
- `al3s` reads: active voice, realized as noun + light verb, third-person singular subject. That drives हूँ/है/हैं and कर/हो.
- A sentence-type token (`<decl>`, `<q>`, `<imp>`) drives क्या and imperatives.

Retrained on 314k pairs, teacher-forced accuracy moved where it should: auxiliaries 0.48 → 0.62 while their share doubled to 7.5%; light verbs 0.10 → 0.45 (share 0.1% → 2.9%); content slots 0.47 → 0.54. Bare tags fell from 14% to 2.3% of the target.

## End to end

Same 100 conversational sentences (and the 12B LLM from part 8 for reference):

| system | chrF | LaBSE | function-word F1 | tag leaks | fluency /3 |
|---|---|---|---|---|---|
| before (am3) | 28.5 | 0.691 | 0.451 | 35% | 0.63 |
| v4, target-side changes only | 32.5 | 0.793 | 0.473 | 0% | 0.99 |
| **v4, full** | **36.6** | **0.795** | **0.559** | **0%** | **1.17** |
| v4 + judge (senses + rerank) | 43.3 | 0.830 | 0.588 | 0% | 1.61 |
| Gemma-4-12B | 47.8 | 0.860 | 0.733 | 0% | 2.26 |

The ablation splits the credit cleanly. Making the glue **visible** (target side) brought nearly all of the meaning gain — LaBSE +0.10 either way — and killed the tag leaks. But the **function-word** gain came only from the source features: +0.108 (95% CI [0.072, 0.144]) for the full model against +0.021, not significant, for target-only. Visibility lets the model place the small words; the source features let it pick the right ones.

What that looks like:

| English | before | after (v4 + judge) |
|---|---|---|
| Your cart is waiting for you! | PRON गाडी PRON लिए कर है | **आपकी गाड़ी आपके लिए इंतजार कर रही है।** |
| Police have registered cases against the accused. | पुलिस ने आरोपी के खिलाफ मामले किया | **पुलिस ने आरोपियों के खिलाफ मुकदमा दर्ज कर लिया है।** |
| Your certificate is ready for download now. | PRON सर्टिफिकेट सिर्फ करें के लिए तैयार | **आपका प्रमाणपत्र डाउनलोड के लिए तैयार है।** |

The light verbs (इंतजार **कर**, दर्ज **कर लिया**), the auxiliaries (रही **है**, लिया **है**) and agreement (गाड़ी … रही, feminine) are all there now. (गाड़ी is "car" rather than "cart" — a sense error, not a grammar one.)

## The lesson

I had spent a week assuming the structure model needed to be bigger or smarter. The largest single improvement of the project came from neither: it came from **looking at what the training targets actually contained**. The model can only learn what the data shows it, and the data had been hiding the most important part of Hindi grammar inside a slot.

One thing didn't move: case markers stayed at 0.45 → 0.46. Why, and what to do about it, led to the most interesting question in the series — whether grammar like this should be written down as rules or learned. That's [part 10](/posts/rules-or-learning/).

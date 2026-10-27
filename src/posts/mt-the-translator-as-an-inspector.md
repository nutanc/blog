---
layout: post.njk
title: "The translator as an inspector"
date: 2026-10-27
permalink: /posts/the-translator-as-an-inspector/
series: "Translation From Scratch"
part: 8
---

In parallel with this project I'd been running a very different English→Hindi system on a bigger machine: a 12-billion-parameter LLM (Gemma-4-12B), prompted to translate, with a 31B model judging the output and listing its errors. That work had found a few things on its own:

- An explicit "first extract the meaning into fields, then write Hindi" scaffold made translations *worse*. The source sentence is already the most faithful representation of its meaning; any intermediate form you squeeze it through is lossy.
- A single staged prompt — comprehend, plan, draft, check, finalize — helped, but only for spoken-register Hindi, and at about 28 times the cost of a plain prompt.
- Its remaining errors had a pattern: tense and modality flattened, paraphrase drift and additions, loanword agreement, a few untranslated English words. And the "check" step couldn't catch them, because it checked the draft against **the model's own understanding of the sentence**, not against the source.

Put that next to [part 7](/posts/getting-the-words-right/) and the two projects had arrived at mirror-image conclusions. The LLM writes fluent Hindi and drifts. The structure-first pipeline stays anchored to the source and can't write fluent Hindi. So: what if the structure pipeline stopped trying to *write*, and *inspected* the LLM instead?

## A monitor that sees the source

Everything the pipeline computes on the way to a translation is also a check on someone else's translation:

- **Word alignment** says which English words have a Hindi counterpart. An English content word with no counterpart is a candidate **omission**; a Hindi content word with no English source is a candidate **addition**.
- **The Hindi parser** gives gender and number on every noun and verb — so it can flag **agreement** clashes.
- A script check catches **untranslated English** left in the Hindi.
- **Alignment confidence** on each English word was my guess for **wrong word sense**.

I ran these detectors over 3,000 translations (FLORES and WMT14, five systems including the 12B and a 600M-parameter NLLB baseline) and scored them against the 31B judge's error listings.

| detector | target error | AUC | notes |
|---|---|---|---|
| English letters in Hindi | untranslated | **0.876** | 0.916 on the 12B |
| unaligned English content word | omission | **0.769** | 0.813 within each system |
| low alignment confidence | wrong word sense | 0.583 | barely above chance |
| parser agreement clash | grammar | 0.563 | weak |

The omission detector did something better than its AUC suggests: when the judge reported an omission, the unaligned English word **was the dropped word 67% of the time**, against 19% for picking a random content word. It doesn't just say "something is missing" — it names *what*. Its weakness is precision: it fires on 37% of all translations, and only 4% of those really dropped something.

The word-sense detector told the opposite story, and the reason is instructive. A wrong-sense word still *aligns perfectly*: *spokesperson* translated as मुखपत्र ("mouthpiece") sits exactly where it should. **Alignment checks where a word went, not what it means.** Structure can localize; it can't judge meaning.

## Structure localizes, a judge decides

So split the job. Let structure point at the suspect words, and ask a calibrated judge one narrow question per suspect. I used Jev again (the judgment API from part 7), which answers typed questions with a probability.

**Omissions.** For each unaligned English word: *"The meaning of the English word 'X', as used in this sentence, is conveyed somewhere in the Hindi translation."* Precision went from 0.03 (alignment alone) to 0.28 at p < 0.5, 0.49 at p < 0.3 and 1.00 at p < 0.15; the least-present word matched the judge's quoted word 16 times out of 16. And many of the "false positives" weren't false: *the woman*, *ran back*, *to choose from* — real omissions the 31B judge hadn't listed. The genuine false alarms were idioms asked about word by word: *long in the **tooth***.

**Word sense.** For each content word: *"The English word 'X' is translated with the meaning it has in this sentence."* Sentence-level AUC 0.673 (LaBSE 0.620, alignment 0.605), and the lowest-scoring word was the wrong one 60% of the time (alignment 32%, chance 26%). It caught *spokesperson → मुखपत्र* and *lanes → गलियाँ* ("alleyways" for traffic lanes).

**Agreement went the other way.** I tried asking Jev about gender agreement pairs and it couldn't separate errors from correct text (0.73 vs 0.72). The case that convinced me: *आपका रिपोर्ट* ("your report", masculine possessive). Jev accepts it, which is fair — colloquial usage of loanword gender varies. The Hindi parser's lexicon, though, knows रिपोर्ट is feminine and flags it. On that one class, **the parser beats the judge**.

## Does it pay for itself? A routing simulation

The practical question for the LLM system was cost. The staged prompt makes about half as many meaning errors as a plain one but costs about 28 times as much. Could the monitor decide *which* sentences deserve the expensive treatment?

On a 300-sentence conversational benchmark (Hinglish-Bench) I already had both systems' outputs and the judge's error lists, so every routing policy could be scored offline: translate everything cheaply, run the monitor, escalate the top-scored fraction.

| escalate | cost | random | by length | by LaBSE | **monitor** | oracle |
|---|---|---|---|---|---|---|
| 10% | 3.8× | 39.7 | 42 | 41 | 35 | 10 |
| 20% | 6.6× | 37.4 | 40 | 40 | 31 | 6 |
| 30% | 9.4× | 35.1 | 40 | 37 | **26** | 6 |

*(fidelity errors over 300 sentences: always-cheap 42, always-expensive 19)*

Escalating the 30% the monitor flags gives 26 errors at 9.4× cost, against 35 for escalating a random 30%. That closes about 70% of the gap to always using the expensive prompt, at a third of its cost. A paired bootstrap puts the saving at 9.1 errors, 95% CI [2.3, 16.2]. The sample is small (the whole gap is 23 errors), but the interval clears zero.

Two side results surprised me. **Sentence length was worse than random** as a difficulty signal on conversational text (AUC 0.45) — long doesn't mean hard. And the **oracle row** shows the expensive prompt is *worse* than the cheap one on 13 sentences: a chooser that monitored both outputs and kept the cleaner one could beat both systems.

## What this changed

This was the point where I stopped thinking of the project as "a small translator that loses to big ones." The parse-and-align machinery is genuinely good at one thing an LLM is bad at: **staying anchored to the source**. It knows which English words exist and where they went. Paired with a judge that understands meaning, it's a monitor that can point at the exact word an LLM dropped.

It also handed me the tool I'd use on my own translator next. If Jev can decide word senses for someone else's output, it can decide them for mine — and rerank my candidates. That's where [part 9](/posts/the-glue-was-hidden/) starts, and where I finally found what was missing from my Hindi.

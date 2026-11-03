---
layout: post.njk
title: "Reading the Weights of Small Models: One Direction Fixes a Habit, Not a Mistake"
date: 2026-11-03
permalink: /posts/reading-the-weights/
---

*November 2026 · Ozonetel AI experiments*

**TL;DR.** The [Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/) post fixed a small model's
maths by deleting a single direction from its weights, and reported that the same move did nothing for a different small model
whose errors were "ordinary". We tried the idea on two of our own models: a 4B English→Hindi translator and a 270M children's-story
writer. **The boundary the post describes holds, cleanly.** In the story writer, repetition is carried by one direction in layer 8;
pushing away from it cuts repeated sentences from 32% to 2% and loops from 9% to 0%, and a control direction built the same way from
shuffled labels makes repetition worse. In the translator, the meaning errors are not a habit but missing per-sentence information
— which phrase matters here and what it means — and every weight-level edit we tried either did nothing or broke the model. The
same model fixes about a third of those errors when it is simply *told* which phrase to keep.

---

## Background

The post's strongest language-model result took Qwen3.5-0.8B from 7.9% to 48.1% on MATH-500 by subtracting one direction, written
by the MLPs of two layers, from 64 output columns each — 0.016% of the weights. The failure it removed was a mode: the model looped
until it hit the token limit. On Gemma-3-270M, whose maths errors were ordinary arithmetic and algebra slips, the same approach
gained at most a point; there was "no single component behind them to switch off". The post's own summary of the boundary: an edit
can remove an obstacle that hides an ability, but it cannot add an ability the model lacks.

The post had a frontier LLM read raw weight tensors as text. We did not do that. We read the weights through the model's own
forward passes — exact logit attribution, activation patching and contrastive directions — which is the measurable version of the
same question: *is the failure carried by something small enough to remove?*

Our two models:

- **The translator**: Gemma-4-E4B fine-tuned to write spoken (everyday) Hindi, wrapped in CPU tools that pass it notes (idioms,
  loanword gender, a translation memory) plus a guarded self-repair. On conversational text it matches a 12B prompt pipeline
  (24 vs 23 errors on 300 sentences, both 92% error-free, by an independent Gemma-4-31B judge); on news it does not (125 vs 91).
- **The story writer**: gemma-3-270m fine-tuned on TinyStories. A small critic — a 22M student of a 13-axis story-shape reader, plus
  hard checks — catches its failures; picking the best of 8 candidates per segment brings its stories close to real TinyStories in
  shape. Written freely, it relapses into web markup in 37% of stories, repeats sentences in 28%, and invents new characters late
  in 40%.

The second model is, by design, the post's negative case: the same 270M base, fine-tuned for a different task.

---

## Part 1 — The translator

### Experiment 1: Does the 4B misread the English, or lose it while writing?

The 31B judge listed 93 meaning errors in the 4B's 300 news translations; re-reading them with the error localised, it called 87
real. **Most of them are writing failures, not reading failures.** For each error we took the exact English span and asked the
4B, with the sentence in view, to (C) explain the span in English and (L) give Hindi for just that span:

| model | explains the span correctly (errors / control) | Hindi for the span alone (errors / control) |
|---|---|---|
| deployed 4B | 70% / 80% | 54% / 68% |
| base Gemma-4-E4B | 69% / 70% | 60% / 81% |
| Gemma-4-12B | 93% / 89% | 79% / 85% |

Splitting the 87 errors by where they break: **37%** the span is misread, **20%** read correctly but no Hindi for it, and **44%** the
4B explains the span and translates it correctly on its own, yet loses it in the full sentence. The dominant pattern is flattening:
"beginning to see" becomes "sees", "fits neatly" becomes "fits", a figure of speech becomes its plain core. Fine-tuning did not cause
the reading gap — the base model reads no better.

One more measurement shaped everything after it: under its own prompt, the 4B scores a minimally corrected sentence *above* its own
output on only **5 of 86** errors. This is not a decoding accident that beam search would fix. The model prefers the flat sentence,
often by 3–12 nats.

### Experiment 2: Is the knowledge there?

**Yes, when the model is told where to look.** We gave the 4B a note for each localised error span, using its *own* isolated Hindi
for that span ("'fits neatly' here: say it like बिल्कुल फिट हो जाता है — keep it in the sentence"):

| arm (300 news sentences) | total errors | meaning errors | error-free |
|---|---|---|---|
| deployed 4B | 125 | 93 | 65% |
| + oracle span notes, the 4B's own Hindi | **103** | **65** | 70% |
| + oracle span notes, the 12B's Hindi | 106 | 66 | 70% |
| 12B prompt pipeline (reference) | 91 | 65 | 73% |

Meaning errors fell to exactly the 12B pipeline's count, and the 12B's phrase Hindi was no better than the 4B's own. The knowledge
is in the 4B. What is missing is attention to the right phrase.

That is what made the weight-space idea worth testing: a capability blocked by a preference sounds like the post's "obstacle".

### Experiment 3: Which components push toward the flat word?

At the first token where the 4B's output and the correction diverge, we split the logit gap exactly over every attention block,
MLP and per-layer branch (the parts sum to the true gap within 0.03 logits). The model prefers its own token on **86 of 86**
errors, by 9.3 logits on average; **69%** of the push comes from late MLPs (layers 29–41), and one neuron, L40·n4704, is among the
top three on 37 errors.

**None of it is specific to the errors.** The same late-MLP band carries 67% of the push for *ordinary* token choices in correct
translations, against 68% here: it is simply where the 4B writes every output. The recurring neurons' unembedding readouts are
mixed-script noise. Zeroing up to 64 of them flips 7 of 49 held-out errors; negating them flips 15 but costs +4.5 nats per token on
correct output.

### Experiment 4: Is the fix one direction?

We patched the residual stream of a run *with* the oracle note into a run without it, one layer at a time. **The fix forms late
(layers 27–35) and points somewhere different for every sentence.** The mean pairwise cosine of the clean-minus-corrupt differences
across errors is 0.03–0.14 at every layer; steering held-out errors with their average flips 0 of 8 (the note itself flips 4).

### Experiment 5: Is there a generic "keep every detail" direction?

We built one from 400 training sentences: the residual difference between the normal prompt and the same prompt plus "translate
every detail, keep every qualifier". At the divergence token it flips 15–31 of 86 errors at a small cost on correct output (+0.03 to
+0.10 nats/token), where a random direction of the same size flips as many but costs +4 to +10 nats. That looked like a lead.

**End to end it was a disaster.** Applied at every position — the form a weight edit takes — and judged on full translations:

| arm | conversational errors | news errors |
|---|---|---|
| unsteered | 28 | 125 |
| faithfulness direction, layer 18, ×4 | 65 | 278 |
| faithfulness direction, layer 20, ×6 | 320 | 855 |

The direction carries "literal, formal and long" together with "detailed" — news output grew from 108 to 236 characters on average,
full of bookish words the spoken register avoids — and applied to the prompt it damaged how the model read the English (omissions
11 → 154).

---

## Part 2 — The story writer

### Experiment 6: Which failures share a direction?

We sampled 8 continuations at every segment of 400 stories (15,213 in all), let the critic label each one, and for every prefix
compared the flagged continuations' mean residual with the clean ones'. If a failure is one direction, those differences should
point the same way across stories.

| failure | kind | consistency across stories (best layer) |
|---|---|---|
| loop | habit | **0.65** (layer 8) |
| repetitive | habit | **0.45** (layer 9) |
| repeated sentence | habit | **0.30** (layer 8) |
| markup | habit? | 0.37 at layer 1 only; 0.04–0.09 deeper |
| late new character | content | 0.06 |
| hero swapped | content | 0.07 |
| unresolved ending | content | 0.10 |

**Repetition is one direction; invented characters and unresolved endings are not.** Markup's only signal sits in layer 1, where
it is most likely the markup characters themselves rather than a "web-text mode".

### Experiment 7: Removing the repetition direction

The first edit we tried — projecting the direction out of the residual at every layer — broke generation entirely, and so did a
random direction: the model stopped producing complete sentences. The direction is two-sided, and zero is not where clean text sits.

**Pushing away from the loop side at layer 8 alone works.** On 100 held-out openings with paired sampling seeds:

| arm | repeated sentence | loop | markup | late new character | distinct-2 | GPT-2 ppl |
|---|---|---|---|---|---|---|
| unedited | 32% | 9% | 35% | 36% | 0.805 | 8.7 |
| loop direction, ×0.5 | 10% | 3% | 47% | 40% | 0.846 | 9.3 |
| **loop direction, ×0.75** | **2%** | **0%** | 44% | 39% | 0.848 | 9.5 |
| loop direction, ×1 | 0% | 0% | 44% | 29% | 0.857 | 10.0 |
| shuffled-label direction, ×0.75 | 46% | 24% | 21% | 22% | 0.717 | 10.2 |
| random direction, same size | — | — | — | — | — | breaks generation |
| late-new-character direction, ×3 | 44% | 9% | 33% | 27% | 0.777 | 8.2 |

The control in the shuffled-label row is the important one: the same construction, the same data and the same size, but labels
drawn at random within each prefix. It makes repetition worse. The loop label is what carries the effect. Pushing on the content
direction moves its own target only a little and adds repeats.

The window is narrow — three times the strength breaks the model — and the edit is not free: markup rises from 35% to 44%, and
GPT-2 perplexity from 8.7 to 9.5 (partly expected, since repeated text is cheap for GPT-2).

### Experiment 8: What it looks like

Same opening, same sampling seed; the only difference is the layer-8 edit.

> **Unedited** — …Bob and the little boy shared a hug and a kiss. They were so happy. They had made an impression on the stage. They
> were happy and proud. They were bobos. they all had a wonderful time and made memories for the future. was that was a good idea.
> akhirnya kami memberikan penghargaan! kami memberikan penghargaan. semoga berkah. selanjutnya. akhirnya kami memberikan
> penghargaan. akhirnya kami memberikan penghargaan. semoga berkah…

> **Edited** — …Bob and Jack played with their toys and had a fun time together. They all learned a valuable lesson that day. They
> both knew that if they were honest, they could be brave and take risks and be more confident in their abilities. They both
> smiled and laughed together, and it was a good day.

The loop — here into Indonesian, elsewhere into "The end. The end." or emoji — is gone, and the story keeps producing new
sentences. It is not a good story: Bob's dog appears from nowhere, a party and some stairs follow, and the moral is vague. Those are
the content failures that Experiment 6 found have no direction.

---

## What we take away

**A habit can be one direction; a mistake usually is not.** Repetition is the same behaviour in every story, and it was represented
the same way in every story. A meaning error in translation is different every time — which phrase, what sense, what context — and
the information needed to fix it differs with it. A weight edit is a constant; it can switch a habit off, but it cannot deliver
different information to different sentences.

That also explains what *does* work for the translator. Notes that name the phrase cut its meaning errors to the 12B pipeline's
level; a 12B checker that reads the 4B's output and names the failed phrase fixed 4 news errors and broke none. Both deliver
per-sentence information through the input. The weights are the wrong channel for it.

The post's test is a good one to run first. A few forward passes tell you which kind of failure you have: if the flagged-minus-clean
differences agree across examples, edit; if they do not, put the information in the prompt.

## Limitations

- **We did not have a model read the weights.** Our reading is instrumented: attribution, patching and contrastive directions on
  forward passes. The post's results come from a frontier LLM reading raw tensors.
- **Translation judgements come from one judge family.** Gemma-4-31B listed the errors, localised them and graded the probes; judge
  counts also move by a few errors between runs, so we compare only within a run.
- **The story edit is scored by the critic that defined its labels.** The independent 12B story judge has not been run on the edited
  writer yet.
- **The story edit is a constant shift in layer 8**, not a change to stored weights: Gemma-3 has no bias terms to absorb it, so it
  runs as an inference hook.
- **Small samples in places**: 86 translation errors, 18 usable patching pairs, 100 openings per story arm.

---

*Code and reports: `scaffold_translate/src/{distort_probe,spanpass,learnloop,wsp_locate,wsp_probe,wsp_patch,wsp_caa,wsp_gen}.py` and
`out/{distort,spanpass,wsp}/`; `story_axes/src/wsp_story.py` and `out/wsp_story/`. Evaluation text is public WMT14 news and our own
synthetic conversational benchmark; no customer data.*

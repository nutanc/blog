---
layout: post.njk
title: "I downloaded data to fix the gaps. A control proved me half-wrong."
date: 2026-08-18
permalink: /posts/download-data-control/
series: "ASR From Scratch"
part: 8
---

Two posts ago I [found the recognizer's data gaps](/posts/what-speech-is-made-of/); the last one argued you should [borrow public data for the general tail and record for your own names](/posts/filling-the-gaps/). That was all analysis and prediction. This time I actually did it — downloaded a public dataset, fine-tuned, and measured. The first number looked like a clean win. Then I ran the control that any honest version of this requires, and it took most of the win away — while leaving behind something better: proof of the *specific* claim, cleanly isolated.

## The setup

The recognizer is the frozen-codebook true-unit CTC — HuBERT features snapped to a 2000-point codebook, a small CTC mapping units to characters. Its greedy word-error on LibriSpeech dev-clean is 18.3%. I downloaded LibriSpeech **test-clean** (~5 hours of held-out clean audiobook speech — a different set of books and speakers than training), ran it through HuBERT to get unit sequences, and continue-trained the CTC on those units plus a replay sample of the original training data to avoid forgetting. Eight epochs, small learning rate, keep the best checkpoint on a dev subset.

*(A detour worth one sentence: doing this on an Apple-silicon laptop with a nearly-full disk, HuBERT on the MPS backend quietly grew swap to 13.6 GB and nearly filled the drive. Moving feature extraction to CPU fixed it. Metal memory growth is real; budget for it.)*

## The number that looked like a win

![Grouped bars of word-error rate before and after fine-tuning, for three word groups. Words covered by test-clean fall from 56% to 37%, rare uncovered words from 69% to 63%, common words from 13% to 9%. Global WER falls from 18.3% to 13.0%.](/img/phones/finetune_proof.png)

Global dev-clean WER dropped from **18.3% to 13.0%**. And when I sliced the reference words by whether the downloaded data covered them, the story looked even better: words that were rare in the original training but *present* in test-clean improved by 19.6 points, while equally-rare words *absent* from test-clean improved only 6.6. Covered words improved three times as much. I nearly wrote that up as "downloading public data fixes the gaps," with a satisfied graph and a link to the download.

Two things stopped me. First, the *common* words also improved a lot — 13% to 9% — and test-clean can't have added coverage for words the model already saw thousands of times. Second, the rare-uncovered "control" words improved too, by 6.6 points, when by the theory they shouldn't have moved at all. Both smelled like a confound with one obvious name: **I hadn't just added data, I'd also trained for eight more epochs.** Maybe the model simply wasn't done training, and *any* extra data — even a re-run of what it already had — would have produced most of this.

## The control that had to happen

So I ran the boring, decisive experiment: the exact same fine-tune, same number of steps, same everything — but with **zero test-clean data**, just more of the original training data, volume-matched. If the download mattered, the test-clean run should beat this replay-only control. If it didn't, they'd land in the same place.

They landed in the same place. Replay-only reached **12.7%** global WER — if anything a touch *better* than the 13.0% I got with test-clean. Globally, the download bought nothing. The five-point drop I almost took credit for was eight epochs of training finding room the original model had left on the table. Had I stopped at the first graph, I'd have published a real result with the wrong cause attached to it.

## What survived — and it's the part that matters

Here's why the control is a gift rather than a debunking. With three models — the original, the test-clean fine-tune (A), and the replay-only control (B) — I can ask a sharper question than "did WER go down." I can ask: for each group of words, how much better is A than B? That difference is the effect of the *data specifically*, with the "more training" and any quirk of the word groups subtracted out on both sides. This is a difference-in-differences, and it is unforgiving.

![Grouped bars comparing three models per word group. For words covered by test-clean, error is 56% before, 48% with replay-only training, and 37% with test-clean data. For uncovered rare words, 69% / 61% / 63%. For common words, 13% / 9% / 9%. Difference-in-differences is +13.7 points.](/img/phones/did_proof.png)

Look at the covered words. Training alone (replay-only, B) took them from 56% to 48%. Adding the actual test-clean audio (A) took them to **37%** — a further **11.8 points that only the data can explain**. Now look at the uncovered rare words: training alone got them to 61%; the download left them at 63% — no help at all, a hair worse from mild domain dilution. And the common words: identical, 9% either way. The download helped **exactly the words it contained, and nothing else.** The difference-in-differences — the covered-word data effect minus the uncovered-word data effect — is **+13.7 points**, controlled for training and for any intrinsic difference between the word groups.

That is the claim from the [previous post](/posts/filling-the-gaps/), now proven instead of predicted: **generic public data helps precisely the words it happens to contain, not your error rate in general.** It fills the specific holes its vocabulary overlaps, and it is silent on everything else — including the domain-specific names that are the actual long tail of a deployed system, which is why those still have to be recorded.

## Two lessons I'm keeping

**Always run the training-matched control before crediting new data for a gain.** More epochs, more data, a fresh learning-rate warmup — any of these moves the number, and none of them are the thing you think you're testing. The control costs one more training run and converts "the number went down" into "*this* is why." I was one graph away from getting it wrong.

**Measure on the slice, not the average.** Global WER is where this effect goes to hide: the covered words are 0.7% of the corpus, so an 11.8-point win on them is a rounding error on the headline number — swamped by, and in this case indistinguishable from, ordinary training noise. The whole signal lived in the slice that the intervention was actually supposed to touch. If you collect data to fix specific things, you have to evaluate on those specific things, or you'll conclude — wrongly, in both directions — that it did nothing.

The frozen-codebook design is what made any of this legible: because the units are discrete phones, "which words did the data cover" is a lookup and "did those words get better" is a slice, so the experiment and its control are things you can actually draw. The recipe for the [Telugu port](/posts/asr-experiments-goals/) is now battle-tested: borrow broad data for the tail, record for the names, and — the part I nearly skipped — always keep a control, and always score on the slice you meant to move.

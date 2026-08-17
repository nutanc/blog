---
layout: post.njk
title: "What speech is made of, and how much of it you need"
date: 2026-08-17
permalink: /posts/what-speech-is-made-of/
series: "ASR From Scratch"
part: 6
---

The [frozen-codebook recognizer](/posts/speech-as-independent-parts/) turns audio into a sequence of ids from a fixed 2000-point codebook, and [the attention maps](/posts/cluster-attention-maps/) showed those ids behave like a phonetic alphabet — cluster 630 spells the *I* in "quilter," cluster 953 the *E*. Once your units are phones, a new kind of question opens up. You can stop analysing the *model* and start analysing the *language* — because the model's alphabet is now legible enough to count.

So I did the boring, clarifying thing. I ran a phoneme recognizer over all of LibriSpeech dev-clean, collapsed it into phone segments with durations, and just counted: which sounds, how long, in what order, and — the part I actually care about — **which errors happen where, and whether they trace back to what the training data did or didn't contain.** This post is that count, and it ends with a number: roughly how many hours of audio a new language needs before an ASR like this one stops falling apart.

## The shape of English, by the phone

Here is what 260 minutes of read English is actually made of.

![Horizontal bar chart of the 24 most frequent English phones from dev-clean, coloured by vowel and consonant. The nasal n leads at 7.3%, then the reduced vowels and coronal consonants.](/img/phones/inventory.png)

A mean phone lasts **82 ms**; speech runs at about **12 phones a second**, and **19% of the wall-clock is silence**. The inventory is brutally top-heavy: a handful of reduced vowels (`ə ɪ`) and coronal consonants (`n t d s`) do most of the work, fricatives (`s z`) are the longest events, stops the briefest. This is the first reason a coarse token hurts — at 82 ms per phone, a 160 ms unit straddles four or five of these, and the transitions between them are where the information lives.

How much information? You can measure it. Take the next-phone guessing game and give the guesser more context:

![Bar chart of an entropy ladder: H(next) with no context is 5.18 bits, H(next given the current phone) is 4.13 bits, H(next given the previous two phones) is 3.34 bits.](/img/phones/entropy_ladder.png)

Knowing the current phone removes about a bit of uncertainty; knowing the previous two removes nearly two. That is not an abstraction — it is exactly why the [from-scratch seq2seq](/posts/cluster-attention-maps/) beat CTC on the *same units*. CTC decides each frame independently and throws that 1.8 bits away; an autoregressive decoder keeps it. And the triphones that carry the predictability aren't random triples — they're English morphemes falling out of the raw counts: `æ n d` (AND), `ʃ ə n` (the *-tion* suffix), `w ɪ ð` (WITH), `ʌ v ð` (OF THE). The language's building blocks are sitting right there in the phone stream.

One more structural fact, because it changes the coverage question below: word boundaries are their own phonology. Inside a word, the consonant/vowel skeleton alternates — CV and VC transitions dominate. *Across* a word gap it flips to consonant-cluster-heavy (CC jumps from 16% to 47% of transitions) with a spike of vowel-to-vowel hiatus, and almost every diphone that occurs *only* across a boundary ends in `ð` — because *the / this / that / them* begin more English words than anything else. Continuous speech isn't a bag of words; it's words welded at phonetically specific seams.

## Demand versus supply

Now the question this was all building toward. The recognizer is trained on train-clean-460. When it makes a mistake on dev-clean, is that because the sound it needed was **under-represented in the training data** — or is it just the model's ceiling?

To ask cleanly, I phonemized every transcript in both sets (canonically, from the lexicon) and lined up what dev *demands* against what 460 hours *supplies*, at the level of phones, diphones, triphones, and whole words.

![Line chart of coverage: what fraction of dev-clean tokens are backed by a train-460 unit seen at least K times. Phones and diphones sit at 100% across all thresholds; triphones stay near 98%; words fall off, reaching 87% at a threshold of 100.](/img/phones/coverage.png)

Phones and diphones are a non-problem: all 39 phones and all 895 dev diphones appear in training, every one of them hundreds of times over. The English **phonotactic base saturates almost immediately.** Triphones are where scarcity begins — 99.3% of dev triphone *types* are seen, but the coverage frays as you demand higher counts, and 0.7% of triphone types were never seen at all (`OY R AH`, `W AO V` — the debris of rare names). Words are the leaky level: **4.5% of dev word types never appear in 460 hours of training** (`BOZZLE`, `TREVELYAN`, `QUILTER` — LibriSpeech is full of Victorian surnames), and one dev word in a hundred is genuinely out-of-vocabulary.

## The errors line up with the gaps

Then I took the recognizer's own greedy hypotheses on dev-clean, aligned them to the references word by word, and coloured each reference word by how well its training data covered it. The result is about as clean as this kind of thing ever gets.

![Two bar charts of word-error rate. Left, by how often the word appeared in train-460: 87% error for out-of-vocabulary words, falling monotonically to 7% for words seen 1000+ times. Right, by the count of the word's rarest triphone: 97% error when that triple was never seen, down to 11% when it was seen 1000+ times.](/img/phones/error_vs_coverage.png)

Both curves are monotonic and steep. A word the model saw a thousand times is wrong 7% of the time; an out-of-vocabulary word is wrong **87%** of the time. Slice instead by the rarest *sound-triple* the word contains — so a word built entirely from common triphones counts as well-covered even if the word itself is rare — and the same gradient appears: 11% error when the rarest triple is common, 97% when it was never trained. Under-representation isn't a vague worry; it's a **12× swing** in error rate, and it correlates with both word frequency (r ≈ 0.43) and rarest-triphone frequency (r ≈ 0.36).

Here is the honest nuance, though, and it matters. Rare units are *rare*. Out-of-vocabulary words are only 0.9% of all spoken words, and everything I'd call under-represented (rarest triple seen fewer than 50 times, or OOV) is about 2% of words — accounting for **10% of the total errors**. The other 90% of errors are on perfectly well-covered words, sitting on that ~7% floor. So the finding is two-sided: **data coverage is a powerful per-word risk factor and the entire story of the hard tail, but it is not the story of the bulk error.** The floor is the model and the tokenizer — the price of a 2000-cluster bottleneck and greedy decoding. Under-representation is what turns a 7% word into an 87% word.

## So how much data does a language need?

That framing gives a way to answer the question the whole experiment implies: if you wanted to stand up a recognizer like this for a *new* language, how much transcribed audio is the floor? Down-sample train-460 and watch how phonotactic coverage collapses:

![Line chart of how much data a language needs. As hours of transcribed audio grow from 5 to 460 on a log axis, the fraction of dev triphone tokens backed by a well-trained triphone rises along three S-curves for three frequency thresholds; a shaded band marks roughly 100 to 150 hours as minimum viable.](/img/phones/min_data.png)

Read it by level, because each level has a different appetite:

- **Phones (~40 of them):** saturated by the first hour of anything. Not a constraint for any real corpus.
- **Diphones (~1,200 that actually occur):** all comfortably covered by **10–20 hours**. Also not the binding constraint.
- **Triphones — the binding constraint.** To get most running speech onto triphones the model has seen *enough* times to learn them (≥200×, the point where per-word error drops under ~35% and an LM can carry the rest), you need on the order of **100–150 hours**. Below ~25 hours the triphone tail falls off a cliff — only half of running triphones are backed at that level — and everything uncommon breaks. Pushing the frequent triphones to the ≥1000× *acoustic floor* takes the full 460 hours and then some.
- **Words:** never fully solved by audio. The rare-word tail is Zipfian and bottomless; that's what a language model and targeted lexicon collection are for, not more raw hours.

So the recipe for a minimum viable ASR of this kind: **~100–150 hours of transcribed audio** gets the phonotactics — phones, diphones, and the workhorse triphones — covered well enough to hit the model's floor on common speech. What that budget *cannot* buy is the tail of rare words and names; those stay error-prone until you add a language model and go collect them on purpose. It's a satisfying answer because it's decomposable: the audio buys phonetic coverage, and phonetic coverage saturates; everything past that is a vocabulary problem, not a data-hours problem.

## Why I find this worth the detour

None of this moved a WER. It's a data analysis, not a model. But it's the analysis the whole frozen-codebook approach was set up to make possible. Because the units are discrete, inspectable phones, the *model's* alphabet and the *language's* statistics are the same countable objects — so "why did it get this word wrong" and "did the data contain this sound" become the same question, answered off the same axes. You can audit the training set the way [we audited the attention](/posts/cluster-attention-maps/): by plotting it.

And it hands the [Telugu port](/posts/asr-experiments-goals/) a checklist instead of a guess. Don't ask for "a lot of data." Count the language's triphones, and collect until the frequent ones clear a few hundred examples each — somewhere around a hundred hours — then spend the rest of the effort on the vocabulary, where the hours stop helping. The codebook made the sounds legible; legible sounds make the data requirement countable.

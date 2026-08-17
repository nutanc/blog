---
layout: post.njk
title: "Filling the gaps: borrow the data, or record it?"
date: 2026-08-18
permalink: /posts/filling-the-gaps/
series: "ASR From Scratch"
part: 7
---

[Last time](/posts/what-speech-is-made-of/) I traced the recognizer's errors down to the specific sound-triples it was starved of in training, and turned that into a targeted recording script — a few hundred sentences that cover the gaps far faster than recording random text. Which raises the obvious, cheaper question before anyone touches a microphone: **do we even need to record? Is this gap already sitting in some public dataset we could just download?**

So I checked, and then worked out what recording would actually buy. The answer is a clean split: most of the gap is a *domain* accident that public data fixes for free, and a small residual is genuinely yours to record.

## Are the gaps even English?

The gaps are rare triphones — sound-triples the model barely saw. The first thing to ask is whether they're rare because English rarely uses them, or just because *LibriSpeech* rarely uses them. LibriSpeech is read audiobooks, heavy on 19th-century prose; its rare units cluster in Victorian surnames (`Bozzle`, `Trevelyan`, `Quilter`). That's a corpus artifact, not a fact about English.

To test it, I took every gap triphone and asked whether it appears in *any* ordinary English word, using CMUdict's 123,000-word lexicon as a stand-in for "the language at large."

![Two panels. Left: of the 1,607 rare gap triphones, 98% occur in ordinary English words; of the 37 never-seen triphones, 68% do and 32% must be scripted. Right: predicted word error on the gap slice falls from 82% now to 35% if those triphones are trained to 200 examples, and 11% at 1000 examples.](/img/phones/fix_plan.png)

**98% of the rare gap triphones, and 68% of the ones never seen in 460 hours, occur in everyday English words.** The units the model fails on aren't exotic — `ɔɪ ɹ ʌ` lives in *Moira*, `b æ z` in *basil* and *Baz*, `ɚ ɡ ɔɪ` in *Burgoyne*. They're missing from LibriSpeech's books, not from the language. Which means a broader-domain corpus almost certainly contains them:

| Public English corpus | Domain | ~Hours |
|---|---|---|
| LibriSpeech `train-other-500` | audiobooks (same as ours) | 500 |
| TED-LIUM 3 | conference talks | 452 |
| VoxPopuli (EN) | European Parliament | 1,800 |
| Common Voice (EN) | crowd-read sentences | thousands |
| GigaSpeech | audiobooks, podcasts, YouTube | 10,000 |
| People's Speech | broad, web-scraped | ~30,000 |
| Loquacious Set (2025) | several of the above, merged | 25,000 |

Scaling from our 460 hours into any of the big multi-domain sets — GigaSpeech, People's Speech, the combined Loquacious set — would pull the vast bulk of the rare-triphone tail above the frequency where it stops causing errors. **For the general phonotactic gap, the cheapest fix is not a microphone; it's a bigger, more varied download.** That's the honest first move.

## Where borrowing stops working

But look at the right-hand tail of that check. Thirty-two percent of the never-seen triphones — and a stubborn ~40 of the rare ones — appear in *no* CMUdict word at all. And even the ones that do live almost entirely in **proper names**: places, surnames, loanwords. This is where public data quietly fails you, and it fails in a way that's easy to miss.

A bigger corpus has *more* names — but they're *different* names. GigaSpeech will teach the model *Obama* and *Zelensky*; it will not teach it *Bozzle*, and it certainly won't teach it whatever names matter in **your** deployment — your users, your streets, your product's vocabulary. Names are an open class; you cannot download your way to the ones you specifically need. This is exactly the residual the [targeted recording script](/posts/what-speech-is-made-of/) was built for: the sounds no natural pool sentence contains, which you have to script on purpose from words that realize them.

So the decision rule is simple. **Borrow for the general tail; record for your names.**

## What recording buys, before you record

Because the errors are tied to training frequency by a measured curve, you can predict the payoff *before* collecting anything. The words sitting on gap triphones (rarest triple seen fewer than fifty times) are **1.5% of dev words and wrong 82% of the time.** Push those triphones over ~200 training examples each and the curve says their error should fall to about **35%**; over ~1000 examples, to about **11%** — the same floor as common words.

Globally that's small — 1.5% of words moving from 82% to 11% shaves overall word-error from ~16.8% to ~15.7%. **This is the honest part: filling the gaps does not move the headline WER much, because the gaps are rare by definition.** What it does is turn specific hard words from *almost always wrong* into *usually right* — the names and rare terms a user actually notices getting mangled. If those words are load-bearing for your application, that per-word swing is the whole game; if they aren't, don't bother, and spend the effort elsewhere. The audit tells you which case you're in.

## The loop, end to end

Here's the concrete procedure to record and confirm the gain, in this repo's terms:

1. **Freeze the target.** Take the gap list (`gap_report.py`) and the recording script (`recording_script.py`), plus a hand-written prompt set for the ~40 must-script triphones — pick real words that realize each (`b æ z` → "Baz", `s ɔɪ ɚ` → "Sawyer") and drop them into carrier sentences.
2. **Borrow first.** Fold a broad public set (GigaSpeech or Common Voice) into the manifest and re-measure coverage. Most of the rare tail closes here for free; whatever gap units *remain* under-supplied are your real recording list — usually a few hundred, dominated by names.
3. **Record deliberately.** Several speakers (accent and pitch variety matter more than raw hours here), 16 kHz, quiet room. Aim for each target unit realized **≥200 times across speakers** — the curve's usable knee — which for a few hundred units is on the order of a few hours, not hundreds.
4. **Prepare and retrain.** Add the clips to the manifest, rebuild the per-utterance caches (`phase1` features, true-unit codes), extend the BPE/lexicon so the new names are spellable, and *continue-train* the existing recognizer — every training script here is resumable (`RESUME=1`), so this is a fine-tune, not a restart.
5. **Measure the right thing.** Do **not** just watch overall WER — it barely moves. Build a **targeted eval slice** of dev/test utterances that contain the gap units and report error on that slice, before and after. That's where the 82% → 35% drop shows up, and it's the number that proves the collection worked. Global WER is the vanity metric; the slice is the honest one.

## Why this is the payoff of the whole approach

This closes a loop the [frozen-codebook idea](/posts/speech-as-independent-parts/) was quietly built for. Because the units are discrete, legible phones, every step here is *countable*: the gap is a set of triphones, "is it in public data" is a lexicon lookup, the recording script is a set-cover, and the expected gain is read off a frequency curve. Data collection stops being "get more audio and hope" and becomes an audit with a bill attached — *these* units, from *this* source, for *this* predicted improvement on *these* words.

And it's the piece the [Telugu port](/posts/asr-experiments-goals/) actually needs. The recipe transfers whole: build the phone recognizer, count the triphones, borrow what broad Indic corpora already cover, and reserve the microphone for the aksharas and names that nobody else has recorded — measuring success on the slice that contains them, not on an average that hides them.

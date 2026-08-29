---
layout: post.njk
title: "When the speaker disagrees with the label: accent phenomena inside an Indic phone recognizer"
date: 2026-08-28
permalink: /posts/when-the-speaker-disagrees-with-the-label/
series: "Varna"
part: 3
---

**TL;DR** — A phone recognizer's "errors" are not all errors. We aligned
thousands of decoded phone sequences from *varna* (our 93M multilingual Indic
phone recognizer) against their G2P reference labels and went hunting for
patterns that linguists have documented for decades: sibilant mergers in the
east, deaspiration in the south, Tamil's disappearing retroflex approximant,
the pan-Indian *zindagi/jindagi* alternation. Every one of them showed up,
with rates that track the literature. Roughly **500+ of the substitution
"errors" in a 600-clip sample are structured speaker variation** — the model
hearing what was actually said while the label records what the dictionary
prescribes.

## The setup: canonical labels vs real mouths

varna's training labels come from espeak-ng: text goes in, citation-form IPA
comes out. That means every label asserts how a word *should* sound in careful
speech. But our audio is real speakers across 12 languages, and real speakers
carry their phonology with them. When a Telugu speaker reads a Sanskrit
loanword with a *gh* in it and says plain *g* — as Telugu speakers famously do
— the model transcribes [ɡ], the label says [ɡʱ], and our metric books an
error. The model was right about the sound; the label was right about the
dictionary. They're measuring different things.

To quantify this, we Levenshtein-aligned model output against references for
50 golden-set clips per language (both for the released v2 model and a
mid-training v3 checkpoint — patterns are stable across both) and counted
substitutions inside specific, literature-predicted confusion families.

## Case 1 — The Eastern sibilant story (Bengali, Odia, Assamese)

The three Sanskrit sibilants (*s, ś, ṣ*) collapsed into a single fricative in
all of Magadhan-descended Eastern Indo-Aryan — but each language picked a
different survivor: **Bengali → /ʃ/, Odia → /s/, Assamese → /x/** (the famous
velar–uvular Assamese sound), with Bengali additionally fronting to [s] before
t/tʰ/n/r/l ([Bengali](https://www.languagesgulper.com/eng/Bengali.html),
[Oriya](https://languagesgulper.com/eng/Oriya.html) profiles; [Eastern Bengali
dialects](https://grokipedia.com/page/eastern_bengali_dialects)).

Our confusion tables reproduce all three outcomes:

- **Bengali**: `s→ʃ` substitutions outnumber `ʃ→s` more than 3:1 — the
  orthography (and hence the label) writes স as /s/, the speaker says [ʃ].
- **Assamese**: sibilant confusions cluster around **ʃ↔χ↔h** — the model
  keeps hearing the documented /x/ lenition that the labels can't say.
- **Odia**: near-zero sibilant confusion (~1%) — the control case: Odia merged
  *to* /s/ and espeak's Odia rules already write /s/, so label and speaker
  agree. When the convention matches the mouth, the "error" vanishes.

## Case 2 — Dravidian deaspiration

Native Dravidian phonology has **no aspirated stops at all**; aspirates enter
only through Sanskrit/Indo-Aryan loans, and speakers deaspirate them freely in
casual registers — the classic account is Sjoberg's [*Coexistent Phonemic
Systems in Telugu*
(1962)](https://www.tandfonline.com/doi/pdf/10.1080/00437956.1962.11659778).

Measured deaspiration rate (aspirated reference → plain stop in the decode):

| language | rate | | language | rate |
|---|---|---|---|---|
| **Kannada** | **19–21%** | | Gujarati | ~8% |
| Telugu | 11–13% | | Hindi | **~7%** |
| Malayalam | 7–13% | | Marathi | 9–10% |

Kannada deaspirates at roughly **three times the Hindi rate** — precisely the
Dravidian-vs-Indo-Aryan split the literature predicts, since Hindi speakers
maintain aspiration contrastively while Dravidian speakers treat it as
optional loanword decoration.

## Case 3 — Tamil's vanishing zha

Tamil's celebrated retroflex approximant /ɻ/ (ழ, "zha") is shifting to /ɭ/ in
southern colloquial speech and /j/ in the north ([Tamil
phonology](https://en.wikipedia.org/wiki/Tamil_phonology), [voiced retroflex
approximant](https://en.wikipedia.org/wiki/Voiced_retroflex_approximant)). In
our Tamil sample, **34% of reference /ɻ/ tokens decoded as ɭ or l** — a third
of the zha tokens, merged exactly the documented way.

## Case 4 — zindagi vs jindagi

/z/ is a loan phoneme (Persian, later English) with shaky native status;
speakers across the Hindi belt substitute the affricate /dʒ/. In our data this
is the **highest per-token rate of any phenomenon**: 35% of Hindi /z/ tokens
and 32% of Punjabi ones decode as the affricate. The same nativizing pressure
shows in **f→pʰ**: Hindi labels that say /f/ (फ़) decode as [pʰ] — and never
the reverse.

## Case 5 — The retroflex nasal gradient

Reference /ɳ/ decoding as plain [n]: Telugu 25%, Tamil 23%, Punjabi 12%,
Marathi 11% — against Gujarati's 3% and Hindi's 7%. Colloquial retroflex-nasal
weakening is strongest exactly where descriptive work places it, and Marathi's
ṇ/n variation is a known sociolinguistic marker. Relatedly, Tamil shows the
highest **intervocalic voicing alternation** of any language (3% of stops) —
unsurprising for the one language in our set with no phonemic voicing contrast
([Tamil overview,
Armstrong](https://www.yorku.ca/earmstro/southasia/tamil/Tamil_Overview.pdf)).

## Why this matters for speech systems

1. **A chunk of "PER" is not model failure.** Summed across families, 500+ of
   the substitutions in our 600-clip sample are linguistically structured
   variation. Any Indic system scored against G2P references carries this
   hidden floor — and it's *language-dependent*, so cross-language comparisons
   silently penalize languages whose speakers diverge most from citation form.
2. **Scoring can be variation-aware.** A merger-tolerant diagnostic metric
   (collapse s/ʃ in Bengali, Cʰ/C in Dravidian, ɻ/ɭ in Tamil before scoring)
   separates accent from genuine error. Our golden-set review protocol now
   asks native reviewers to mark these as acceptable pronunciations rather
   than mistakes.
3. **The model is a sociophonetic instrument.** Read in reverse, the confusion
   matrix is field data: merger rates per language, per register, measurable
   at corpus scale for free. The recognizer documents the variation while
   trying to transcribe through it.

## Caveats

Small per-language samples (50 clips); alignment-based counting can attribute
an error to the wrong token in noisy stretches; rates shift somewhat between
checkpoints (we report both our released model and a mid-training one — the
patterns hold in both); and espeak's own per-language conventions are part of
the measurement, which is precisely the point. Some phenomena we could *not*
measure yet: Punjabi's tonal reflexes of voiced aspirates and Indian-English
v/w need targeted samples — next on the list, alongside the native-speaker
golden review that turns all of this from statistics into ground truth.

*Part of the varna project. Previous posts: the teacher-gap analysis and the
speech mechanics of 12 Indian languages. If you're a native speaker who wants
to argue with our confusion matrix — the golden-set volunteer program is open.*

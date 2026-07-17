---
layout: post.njk
title: "Beyond WER and CER: Why Indian-Language ASR Needs Akshara-Level, Phonetically-Weighted Metrics"
description: "నాకు అర్థం కాలేదు, నాకు అర్తం కాలేదు, and నాకర్థం కాలేదు all mean the same thing — but WER scores them 0%, 33%, and 67% wrong. Based on experiments across six models and two encoders, we show why WER and CER misrepresent quality for abugida scripts, and how AER, PSW-AER, and PSW-CER fix (most of) it."
date: 2026-07-16
permalink: /posts/beyond-wer-and-cer/
---

Our best Telugu ASR model has a **74% word error rate**.

If you've only ever evaluated English ASR, that number says "garbage — throw it away." But here is what that model actually produces on a held-out sentence:

```
REF:  అది నాకు అర్థం కాలేదు ఖచ్చితంగా న్యాయం కాదు
HYP:  అధి నా కార్ధం కాలెధు క్చ్ంగా న్యాయిం ుకాదు
```

Every word is recognizable. The errors are the kind a Telugu reader resolves without conscious effort: ద written as ధ (an aspiration difference), ే written as ె (a vowel-length difference), a word boundary shifted by one akshara. A native speaker reads the hypothesis and recovers the sentence.

So which number is lying — the 74% WER, or your eyes?

This post argues, from a series of controlled experiments we ran training small CTC heads over frozen self-supervised encoders (XLS-R 300M and MMS-300m) on FLEURS Telugu, that for Indian languages **both WER and codepoint-level CER systematically misrepresent quality**, and that a three-metric stack — **AER** (Akshara Error Rate), **PSW-AER**, and **PSW-CER** (Phonetic-Similarity-Weighted variants) — gives numbers that actually track what a reader perceives. We'll show a case where the metrics disagree about which of six trained models is *best*, and where the phonetically-weighted metric picks the right one.

## The experimental setup, briefly

Everything below comes from one experiment family, so the metric comparisons are apples-to-apples:

- **Task:** Telugu ASR on FLEURS `te_in` (Wikipedia-derived sentences, multiple native speakers, ~3 hours of audio).
- **Models:** a 3.96M-parameter character-level CTC head (two stride-2 convs, 4-layer Transformer, linear projection) trained from scratch over a **frozen** self-supervised encoder. No language model, no beam search — greedy decoding throughout, so the metrics measure the acoustic model alone.
- **Encoders:** XLS-R 300M and MMS-300m, each swept over 500 / 1000 / 2000 training clips — six models total.
- **Output vocabulary:** 61–63 NFC-normalized Unicode atoms (independent vowels, consonants, matras, virama, anusvara/visarga, word delimiter).
- **Hardware:** one Apple M2 laptop. Each run trains in under an hour.

The best model (MMS-300m, 2000 clips) reaches **CER 18.8%** on the FLEURS dev set. Keep that number in mind — we're about to take it apart.

## Problem 1: WER treats every word as atomic, and Telugu words are enormous

WER counts a word as wrong if *anything* in it is wrong. That's tolerable for English, where words average four or five characters and morphology is mostly analytic. Telugu is agglutinative: case markers, plural markers, and postpositions all fuse into the word. A single word like వెళతాను ("I will go") packs subject agreement and tense into four aksharas. Get one matra wrong anywhere in it and WER charges you the entire word.

The arithmetic consequence showed up consistently across all six models:

| Model | CER | AER | WER |
|---|---|---|---|
| XLS-R, 500 clips | 25.0% | 45.7% | 87.7% |
| XLS-R, 1000 clips | 21.4% | 38.7% | 78.8% |
| XLS-R, 2000 clips | 20.9% | 39.1% | 77.4% |
| MMS, 500 clips | 20.9% | 38.9% | 76.4% |
| MMS, 1000 clips | 19.8% | 35.8% | 74.5% |
| MMS, 2000 clips | 18.8% | 34.1% | ~74% |

WER sits stubbornly at **3–4× the akshara error rate**, because a single akshara error blows out an entire (long, morphologically dense) word. The models improve steadily — the transcriptions become visibly more readable — while WER barely tells you anything. It compresses the entire useful range of low-resource Indic ASR quality into the 70–100% band, where it has almost no resolution.

WER isn't wrong, exactly. It's answering a question ("how many words are perfectly transcribed?") that is the wrong question for a language where words are long, fusional, and where near-miss words remain fully legible.

## Problem 2: CER counts codepoints, but Telugu readers perceive aksharas

The obvious fix is character error rate. But "character" is doing a lot of hidden work in that sentence. Telugu is an **abugida**: the visual unit a reader perceives — the **akshara** — is a Unicode *grapheme cluster* that spans 2–7 codepoints. The akshara క్షా is a single perceptual unit built from four codepoints: క + ్ (virama) + ష + ా (matra).

Codepoint-level CER has two distortions, and they point in *opposite directions*, which is the worst kind of wrong:

**It under-counts perceptual errors.** One wrong akshara often shows up as just one codepoint edit out of the 2–4 codepoints that make it up. The denominator is inflated by all the codepoints inside aksharas the model got right. Empirically in our FLEURS data, each akshara averages ~1.8–2 codepoints, so:

> **AER ≈ 1.8–2 × CER**, consistently, across every model we trained.

Our headline "CER 18.8%" model is really getting about **one in three aksharas wrong** (AER 34.1%). If you report CER for a Telugu system and your reader mentally calibrates it against English CER, you have accidentally halved your error rate.

**It over-counts benign differences.** Meanwhile, CER treats every codepoint edit as equally bad:

- A missing **virama** — which re-renders the same consonant sequence in a visually different but acoustically near-identical way — costs the same as a completely different consonant.
- A **short-vs-long vowel matra** (ి vs ీ) costs the same as a hallucinated syllable.
- An extra **anusvara** (ం), often inserted from acoustic nasal resonance rather than actual content, costs the same as a dropped akshara.

A Telugu reader weights these categories completely differently. CER can't see the difference.

### AER: measure what the reader sees

The first fix is mechanical and cheap: run the Levenshtein distance over **grapheme clusters** instead of codepoints. Python's `regex` module gives you the Unicode grapheme-cluster segmentation for free:

```python
import regex as re

def to_aksharas(text: str) -> list[str]:
    return [g for g in re.findall(r"\X", text) if not g.isspace()]
```

(That's `\X`, the Unicode extended-grapheme-cluster pattern — it groups క ్ ష ా into క్షా exactly the way a font shaper and a human reader do.)

AER is then plain edit distance over those clusters, normalized by reference akshara count. It's the honest number: *how many of the units a reader actually perceives are wrong?* For our best model that's 34.1%, not 18.8% — a less flattering but far more truthful summary.

## Problem 3: not all akshara errors are equal

AER fixes the *unit* of error but still treats every substitution as cost 1.0. Look again at the errors our models actually make:

```
REF:  అది నాకు అర్థం కాలేదు ...
HYP:  అధి నా కార్ధం కాలెధు ...
       ↑           ↑    ↑
      ద→ధ         ధ→ధ  ే→ె
   (aspiration) (aspiration) (vowel length)
```

These are not random. Telugu consonants organize into *vargas* — 5×5 grids where rows differ by place of articulation and columns by voicing and aspiration. Acoustically adjacent cells (త/ద, క/ఖ, బ/భ) are precisely the pairs an acoustic model confuses, and precisely the pairs a human listener also merges in casual speech. Several of these contrasts are weakly realized in everyday spoken Telugu, which is why a native reader glides over them in a transcript.

Following the framework proposed in *"Rethinking ASR Evaluation for Telugu: A Framework for Akshara Error Rate and Phonetic-Intent Metrics,"* we implemented a **weighted Levenshtein over aksharas** where the substitution cost is fractional when two aksharas differ only by a discountable phonetic feature:

| Confusion class | Example | Cost |
|---|---|---|
| Aspiration pair | ధ ↔ ద | 0.2 |
| Voicing pair | త ↔ ద | 0.3 |
| Short/long vowel | ి ↔ ీ | 0.3 |
| Virama merge/split | ళ తా ↔ ళ్తా | 0.3 |
| Anusvara/visarga insertion or deletion | …ం ↔ … | 0.4 |
| Voicing + aspiration combined | త ↔ ధ | 0.5 |
| Retroflex/dental | ట ↔ త | 0.5 |
| Sibilant variant | శ ↔ ష ↔ స | 0.5 |
| Everything else | | 1.0 |

The implementation decomposes each akshara into components and applies the table component-wise:

```python
def akshara_sub_cost(ref: str, hyp: str) -> float:
    """Phonetic-similarity substitution cost between two aksharas, in [0, 1]."""
    if ref == hyp:
        return 0.0
    r, h = decompose(ref), decompose(hyp)   # → (consonant chain, matra, marks)

    cost = 0.0
    for a, b in zip(r["consonants"], h["consonants"]):
        cost += _sub_cost_atom(a, b, _CONSONANT_PAIRS)   # 0.2 / 0.3 / 0.5 / 1.0
    if r["vowel"] != h["vowel"]:
        cost += _sub_cost_atom(r["vowel"], h["vowel"], _VOWEL_PAIRS)  # 0.3 / 1.0
    cost += 0.4 * len(set(r["marks"]) ^ set(h["marks"]))  # anusvara/visarga
    return min(1.0, cost)
```

Costs **sum** rather than average, so a single-feature error keeps its listed cost instead of being diluted by the components that matched, and the total is capped at 1.0 so a phonetically-weighted substitution can never cost more than a plain one.

### The virama placement fallacy needs its own rule

One error class defeats even a weighted *substitution* table, because it isn't a substitution — it's a **restructuring**. Consider ధ్యానం ("meditation") transcribed as ధయానం. The consonant and vowel codepoints are nearly identical; the only difference is a virama, which fuses ధ and య into one conjunct akshara versus leaving them as two. Acoustically, "dhyā" versus "dhayā" is a negligible distinction — both give a listener the same word.

But at the akshara level, the alignment is now 1-cluster-vs-2-clusters, so a standard edit distance charges **two full operations** (a deletion plus a substitution). In the pathological single-akshara case ధ్య vs ధయ, raw AER is *200%* for an error a listener can't even hear.

So the weighted Levenshtein gets two extra transitions — a 2→1 **merge** and a 1→2 **split** — that fire only when inserting a virama between two adjacent aksharas reproduces the other side exactly, charged at 0.3:

```python
def is_virama_merge(a1: str, a2: str, merged: str) -> bool:
    """True if joining a1 + virama + a2 yields `merged` (e.g. ళ + తా → ళ్తా)."""
    if not _is_bare_consonant(a1):
        return False
    candidate = unicodedata.normalize("NFC", a1 + VIRAMA + a2)
    return candidate == unicodedata.normalize("NFC", merged)

# inside the DP loop, alongside the usual three transitions:
if i >= 2 and is_virama_merge(ref[i-2], ref[i-1], hyp[j-1]):
    best = min(best, dp[i-2][j-1] + 0.3)   # 2 ref aksharas → 1 hyp akshara
if j >= 2 and is_virama_merge(hyp[j-2], hyp[j-1], ref[i-1]):
    best = min(best, dp[i-1][j-2] + 0.3)   # 1 ref akshara → 2 hyp aksharas
```

That drops the ధ్యానం/ధయానం case from 200% raw AER to 30% — which finally matches the linguistic reality that these are the same word.

### One numerator, two denominators: PSW-AER and PSW-CER

The weighted edit total gives us two metrics, differing only in normalization:

- **PSW-AER** = weighted edits ÷ reference *akshara* count. Same scale as AER; compare them to see how much of your akshara error is phonetically forgivable.
- **PSW-CER** = the *same* weighted edits ÷ reference *codepoint* count. Same denominator as CER, so it's the drop-in, head-to-head replacement: if PSW-CER is well below CER, your model's errors are concentrated in the forgivable classes.

## A worked example: one sentence, three correct spellings

Before the aggregate results, here is the whole argument in a single sentence. Take "I didn't understand":

> నాకు అర్థం కాలేదు

Telugu speakers accept at least three written realizations of this utterance, and would call **all three correct**:

1. **నాకు అర్థం కాలేదు** — the canonical dictionary form.
2. **నాకు అర్తం కాలేదు** — థ written as త. The aspirate contrast is weakly realized in everyday speech; readers process both spellings as the same word.
3. **నాకర్థం కాలేదు** — నాకు and అర్థం fused by **sandhi** (the final ఉ elides before the following vowel). This isn't sloppiness; sandhi is standard Telugu grammar, and both the fused and unfused forms are legitimate renderings of the same utterance.

We ran variants 2 and 3 through our metric implementations against variant 1 as the reference. Measured, not estimated:

| Hypothesis | WER | CER | AER | PSW-AER |
|---|---|---|---|---|
| నాకు **అర్తం** కాలేదు (aspiration) | 33.3% | 6.7% | 14.3% | **2.9%** |
| **నాకర్థం** కాలేదు (sandhi merge) | 66.7% | 13.3% | 28.6% | 21.4% |

WER says a transcript every Telugu reader accepts as correct is one-third wrong, and the sandhi form — arguably the *more natural* rendering of connected speech — is two-thirds wrong. A model that faithfully writes what was said gets punished for the writing system having more than one valid surface form.

### When strict WER *does* make sense — and why English intuitions mislead here

None of this means dictionary-strict WER is useless. If your downstream consumer demands canonical orthography — a search index that must tokenize consistently, subtitles following a style guide, text-to-speech alignment against a fixed lexicon — then "did the model emit the standard spelling?" is a real question, and strict WER against that dictionary answers it. Whether words arrive sandhi-fused or split genuinely matters to a tokenizer even when it doesn't matter to a reader.

The mistake is stopping there. In **English**, strict orthographic matching quietly carries *semantic* weight: "loose" and "lose" sound nearly identical, but they are different words with different meanings — a strict word match is doing lexical disambiguation for you, and a metric that forgave the swap would be forgiving a real error. In **Telugu**, the common surface variation runs the other way: అర్థం and అర్తం are the *same word* in two spellings; నాకు అర్థం and నాకర్థం are the *same phrase* at two levels of sandhi. The strictness that protects meaning in English destroys signal in Telugu — it charges full price for variation that carries no meaning at all. Report strict WER when your pipeline needs canonical text, but without an intent-level metric next to it, you lose the essence of what the model actually got right.

### Does our implementation actually handle all three? (Honest answer: two out of three)

Since we're advocating these metrics, we verified our own implementation against this example. The results are worth being precise about:

- **Aspiration (అర్తం): handled.** The akshara ర్థం vs ర్తం decomposes to the consonant pair థ↔త, hits the aspiration table, and costs 0.2 — hence PSW-AER 2.9% instead of AER's 14.3%.
- **Word respacing (బయటకు vs బయట కు): handled, for free.** Akshara segmentation strips whitespace before alignment, so AER and PSW-AER are *word-boundary-blind* by construction. A spurious or missing space costs nothing — already the right behavior for a language where word boundaries are orthographically fluid.
- **Vowel sandhi (నాకర్థం): not handled.** Our virama merge/split rule only recognizes restructurings where inserting a virama maps one side onto the other — consonant-conjunct cases like ళ తా ↔ ళ్తా. Vowel sandhi is a different operation (కు + అ → క, with the ఉ elided), the rule doesn't fire, and the DP falls back to charging a matra substitution (0.5) plus a deleted vowel (1.0): 1.5 weighted edits, PSW-AER 21.4%, for a rendering that deserves ~0.

That third result is a genuine, currently-open gap — PSW-AER as implemented here still over-charges sandhi by nearly as much as raw AER does. The fix has the same shape as the virama rule: a merge transition that fires when eliding the first akshara's final vowel and concatenating reproduces the other side, at a small or zero cost. Telugu sandhi is largely rule-governed (ఉత్వ, అత్వ, ఇత్వ sandhi classes), so the check is mechanical; we just haven't built it yet. We include the failing case here deliberately — a metrics post should be graded by its own rubric.

## The evidence

### Finding 1: the phonetic discount is real, large, and consistent

All six models, evaluated on the same 100 FLEURS dev clips:

| Model | Encoder | Clips | CER | AER | PSW-AER | PSW-CER | CER − PSW-CER |
|---|---|---|---|---|---|---|---|
| telugu-ctc-500 | XLS-R 300M | 500 | 25.0% | 45.7% | 36.4% | 17.8% | 7.2 pt |
| telugu-ctc-1000 | XLS-R 300M | 1000 | 21.4% | 38.7% | 30.4% | 14.9% | 6.5 pt |
| telugu-ctc-2000 | XLS-R 300M | 2000 | 20.9% | 39.1% | 30.2% | 14.8% | 6.1 pt |
| telugu-mms-500 | MMS 300M | 500 | 20.9% | 38.9% | 29.8% | 14.6% | 6.3 pt |
| telugu-mms-1000 | MMS 300M | 1000 | 19.8% | 35.8% | 27.4% | 13.4% | 6.4 pt |
| **telugu-mms-2000** | **MMS 300M** | **2000** | **18.8%** | **34.1%** | **26.8%** | **13.2%** | **5.6 pt** |

Two things to notice:

**The discount is stable at 5.6–7.2 points** across encoders and data scales. This is not an artifact of one lucky model — it's a property of the error *distribution* that Telugu acoustic models produce. And it independently lands right on top of AI4Bharat's Orthographically-Informed WER work, which reported an average **6.3-point** reduction across Indian languages when accounting for orthographically valid variations — by a completely different route (corpus-mined valid spellings, versus our linguistic substitution classes). Two methods, same magnitude: roughly six points of a naive Telugu CER is measuring things readers don't perceive as errors.

**The discount shrinks as models improve** (14.4 → 10.7 points on the AER scale from 500 to 2000 clips, and the gap narrows on the CER scale too). This has a satisfying interpretation: badly-trained models make *wild* errors that earn no discount; well-trained models make *phonetically nearby* errors — the right kind of mistakes. Between MMS-500 and MMS-2000, most of the AER improvement came from fixing already-forgivable errors, while the catastrophic-error floor moved much more slowly. The gap between AER and PSW-AER is itself diagnostic: it tells you what *kind* of errors your model makes, not just how many.

### Finding 2: the metrics disagree about which model to ship

This is the result that turns the argument from aesthetic to practical. We recorded a live-mic sentence in the project author's voice — a speaker in no model's training data:

> ఈ రోజు చాలా బాగుంది నేను బయటకు వెళతాను
> ("Today is very good. I am going outside.")

and ran all six checkpoints on the same recording:

| Model | CER | AER | PSW-AER | WER |
|---|---|---|---|---|
| XLS-R 500 | 12.5% | 22.2% | 17.8% | 71.4% |
| XLS-R 1000 | 9.4% | 22.2% | 22.2% | 42.9% |
| XLS-R 2000 | 15.6% | 27.8% | 19.7% | 57.1% |
| **MMS 500** | 6.2% | **11.1%** | **2.5%** | 57.1% |
| MMS 1000 | 6.2% | 22.2% | 16.7% | **28.6%** |
| MMS 2000 | 6.2% | 16.7% | 12.2% | 42.9% |

Now ask: which model is best?

- **WER says MMS-1000** (28.6%, by a wide margin).
- **CER says it's a three-way tie** — MMS-500, MMS-1000, and MMS-2000 all score 6.2%.
- **Dev-set CER says MMS-2000** (18.8%, the "best" checkpoint we would have deployed).
- **PSW-AER says MMS-500** (2.5%), and PSW-AER is right.

Look at what the models actually wrote. MMS-500's three "errors" were: బా → భా (aspiration, cost 0.2), బయటకు → బయట కు (a spurious space — semantically identical), and వెళతాను → వెళితాను (a matra confusion, cost 0.3). **Every single error is one a Telugu reader resolves without noticing.** The transcription is communicatively identical to the reference — which is exactly what PSW-AER 2.5% claims.

MMS-1000 — the WER winner — dropped the న in నేను, producing నేు: a hard, unforgivable content error that mangles the word "I". It won WER by getting more words *exactly* right while committing a real error elsewhere. CER couldn't separate the two models at all: 6.2% each, because CER counts an inaudible aspiration flip and a dropped consonant as the same thing.

If you select checkpoints by WER or CER here, you deploy the wrong model. This is precisely the failure mode the phonetic-intent framework predicts: **optimizing an unweighted metric selects for models whose errors are countable-but-catastrophic over models whose errors are frequent-but-invisible.**

### Finding 3: the virama rule earns its place

The same live-mic test originally produced a paradox: MMS-2000 scored PSW-AER 12.2% — *worse than its own CER of 6.2%*. A weighted metric scoring worse than its unweighted cousin means an error is being double-charged. The culprit was structural: the model inserted a virama that merged ళ తా into the single conjunct ళ్తా. The codepoint diff is one character; the akshara-level alignment is 2-vs-1, and the first PSW implementation charged it as a full delete plus substitute.

Adding the merge/split rule (cost 0.3) brought MMS-2000 down to **2.8%** — below its CER, restoring the sane ordering, and matching the linguistic judgment that "ḷtā" versus "ḷa tā" is essentially undetectable to a listener. Metric design is iterative: the live-mic test was worth running precisely because it surfaced an error class the FLEURS averages had smoothed over.

### Finding 4: the metrics stay meaningful even when models are bad

In a follow-up experiment with a deliberately cheap frozen encoder (random-hyperplane projections over log-mel features — no pretrained transformer at all), error rates were much higher, and the metric stack kept discriminating where WER had completely flatlined:

| Encoder | CER | PSW-CER | WER |
|---|---|---|---|
| Random flat planes, FLEURS 2k | 53.9% | 34.5% | 100.3% |
| Hierarchical planes, FLEURS 2k | 50.6% | 32.5% | 98.7% |
| Per-phoneme planes, IndicVoices 16k | 35.6% | 21.7% | 91.4% |
| MMS-300m, FLEURS 2k | 18.8% | 13.2% | — |

WER spans 91–100% across systems whose transcriptions range from "noise" to "five consecutive words correct on live audio." It has zero resolution in exactly the regime where low-resource Indic ASR development happens. PSW-CER spans 13–35% over the same systems and tracks the qualitative differences you see when you read the outputs. If you're iterating on a low-resource Indic system and gating decisions on WER, you are flying blind through the entire early and middle phase of the project.

## Why this generalizes beyond Telugu

Nothing in the argument is Telugu-specific. The three structural facts driving it hold across most major Indian languages:

1. **Abugida scripts with multi-codepoint grapheme clusters** — Devanagari (Hindi, Marathi, Nepali), Bengali, Gujarati, Gurmukhi, Odia, Kannada, Malayalam, Tamil, Sinhala. All of them have matras, viramas/conjuncts, and nasalization marks; all of them break the codepoint-CER assumption that one edit equals one perceptual error. AER via `\X` grapheme clusters works unchanged on every one of them.
2. **Agglutinative or heavily inflected morphology** — Dravidian languages especially, but Hindi–Urdu verb complexes too. Long fused words make WER a 3–4× amplified, low-resolution version of the akshara error rate.
3. **Varga-organized consonant inventories** with voicing/aspiration/retroflexion contrasts that are acoustically fragile and dialectally merged — the confusion classes in the discount table are pan-Indic phonology, not Telugu trivia. The table's *entries* transfer directly (the varga grid is shared across Indic scripts); only the codepoints change.

Per-language work is real but bounded: transliterate the pair tables, decide language-specific marks (e.g., chandrabindu vs anusvara in Devanagari), and calibrate costs against native-speaker judgments. That's days of linguist time, not a research program.

## What we're *not* claiming

Honest limitations, because a metrics post that oversells its metric would be ironic:

- **The cost table is hand-set, not learned.** The 0.2/0.3/0.4/0.5 values follow the source framework's recommendations and match native-reader intuition, but they're not fitted to perceptual data. Finer-grained articulatory-feature distances (e.g., stepped functions over CPMS features) and dialect-conditioned weightings (Telangana / Coastal Andhra / Rayalaseema have different merger patterns) are natural extensions we didn't implement.
- **Vowel sandhi is not yet discounted.** As shown in the worked example, the current implementation charges నాకు అర్థం ↔ నాకర్థం at 1.5 weighted edits (PSW-AER 21.4%) when it should cost roughly nothing. The virama merge/split rule covers consonant-conjunct restructuring only; a sandhi-aware merge transition (elide the first akshara's final vowel, concatenate, compare) is the next extension, and Telugu's rule-governed sandhi classes make it mechanically checkable.
- **PSW metrics measure *reading* intent, not *semantic* intent.** A voicing flip that lands on a different real word (కల "dream" vs గల "having") is discounted the same as one that lands on a non-word. A morphologically-aware, lemma-level intent metric would catch this; it needs a morphological analyzer in the loop.
- **The live-mic result is one sentence.** It's a motivating example of metric disagreement, not a statistically significant model ranking. The six-model FLEURS table (100 clips each) carries the statistical weight; the live-mic test shows what the disagreement looks like when it matters.
- **Don't report PSW-CER alone.** It's the flattering number, and on its own it invites exactly the metric-shopping this post argues against. The stack works *as a stack*: CER for backwards comparability, AER for perceptual truth, PSW-AER/PSW-CER for phonetic intent — and the *gaps between them* as diagnostics.

## Recommendations

If you build or evaluate ASR for any Indic language:

1. **Never report WER alone.** For agglutinative abugida languages it's a saturated, low-resolution metric that can actively invert model rankings.
2. **Report AER next to CER.** It costs one `regex.findall(r"\X", text)` call, and it's the number that means what your reader thinks "character error rate" means.
3. **Add phonetic weighting when you're selecting models for human-facing use.** The weighted Levenshtein is ~100 lines of dependency-free Python (a substitution-cost table, an akshara decomposer, and a DP with two extra transitions for virama merge/split).
4. **Normalize the weighted edits both ways.** PSW-AER for comparison against AER, PSW-CER for comparison against CER. Same numerator, two denominators, zero extra compute.
5. **Watch the gaps, not just the values.** AER − PSW-AER tells you whether your model makes forgivable errors or catastrophic ones. If a weighted metric ever exceeds its unweighted twin, you've found an error class your metric is double-charging — go look at it.

The full implementation — akshara decomposition, the substitution tables, the virama-shift DP, and the evaluation harness — is in `telugu_phonetic_aer.py` in the project's release bundle, alongside the training and evaluation scripts that produced every number in this post. All experiments run on a single consumer laptop with public data (FLEURS `te_in`) and public encoders (XLS-R, MMS-300m).

The model at the top of this post didn't get better between the first paragraph and this one. It was always producing readable Telugu. We just started measuring it in units a Telugu reader would recognize.

---

*References: Conneau et al., FLEURS (2022) · Babu et al., XLS-R (2021) · Pratap et al., MMS (2023) · Graves et al., CTC (ICML 2006) · "Rethinking ASR Evaluation for Telugu: A Framework for Akshara Error Rate and Phonetic-Intent Metrics" (source framework for the discount table) · AI4Bharat, "Towards Orthographically-Informed Evaluation of Speech Recognition Systems for Indian Languages" (2024).*

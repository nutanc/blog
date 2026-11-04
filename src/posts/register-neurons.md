---
layout: post.njk
title: "The Register Dial: 256 Neurons Decide Between Pure Hindi and Hinglish"
date: 2026-11-04
permalink: /posts/register-neurons/
---

**TL;DR.** Our 4B English→Hindi translator is fine-tuned to write Hindi the way people speak it — *रिफंड*, *मीटिंग*, *कॉन्सेप्ट* —
rather than the editorial Hindi of newspapers and government forms (*धनवापसी*, *बैठक*, *अवधारणा*). We looked for the part of the model
that makes that choice. **Reading the weights alone finds it being written**: thousands of late-layer neurons push spoken fillers and
English loans one way and Sanskritised connectives and nouns the other, and their vocabulary readouts are legible to a person. **But
those neurons only carry out the decision.** The decision is made earlier, by a small set of middle-layer neurons: shifting **256 of
them (0.06%)** moves the model about halfway to editorial Hindi — three times what an explicit "write शुद्ध हिंदी" instruction achieves —
or further into Hinglish. 256 random neurons from the same layers, shifted by the same amounts, change nothing. Meaning mostly survives
the switch; grammar pays for it.

This follows our post on [reading the weights of small models](/posts/reading-the-weights/), where a single direction
fixed a story writer's repetition but nothing fixed the translator's meaning errors. Register is the third case, and it sides with
repetition: a habit, with a handful of components behind it.

---

## Background

"Which Hindi?" is not a style footnote for us. For call-centre text, the target is spoken Hindi: an educated speaker on the phone says
*रिफंड प्रोसेस हो गया* and *टेक्नोलॉजी*, not *धनवापसी संसाधित हो गई* and *प्रौद्योगिकी*. Most translation systems, and most references,
default to the editorial register. We fine-tuned a Gemma-4-E4B to write the spoken one, and it does: on our conversational benchmark
its output has 12.8 English-origin loanwords per 100 Hindi words, against 12.5 in the spoken reference and 5.7 in the editorial one.

The question here is narrower than "how good is the translator". Does the model keep register somewhere we can find — and turn?

We measure register two ways throughout:

- **Lexical counts per 100 Devanagari words**: English-origin loanwords (words written with the ऑ / ॉ vowel or listed in our loanword
  lexicon) and bookish, Sanskritised words (from a register thesaurus).
- **An independent judge**: Gemma-4-31B, told to judge as a speaker of everyday Hindi, lists each translation's errors by type —
  meaning, grammar, and "register" (a bookish word where a speaker would use an everyday one).

Evaluation sentences: 300 conversational sentences from our Hinglish-Bench and 300 WMT14 news sentences. Neurons and directions were
found on 685 *other* Hinglish-Bench sentences.

---

## Experiment 1: Is register visible in the weights alone?

Following the [Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/) post, we first read the tensors
without running the model on any text. The input embedding and output unembedding are the same matrix in this model, so a word pair
like *कॉन्सेप्ट / अवधारणा* is two rows of it.

**There is a register axis in the vocabulary itself.** Across 89 pairs with the same meaning (one loanword, one Sanskritised word), the
loanword-minus-pure differences point in a weakly but consistently shared direction — mean pairwise cosine 0.042, against −0.001 for
random token pairs. An axis fitted on half the pairs puts the loanword on the positive side for **100%** of the other half.

## Experiment 2: Which neurons write it?

Each MLP neuron writes a fixed column into the residual stream, which the output matrix turns into a push on every word. We read every
one of the model's 430,080 neurons against the 89 pairs, and compared with the same statistic on shuffled pairs.

**About 8,900 neurons on each side write register beyond chance** — roughly 4% of the network. The strongest sit in layers 29–41 and
favour one member of a pair in 97–98% of pairs. Their readouts are the most legible thing we have found in this model:

| neuron | pushes up | pushes down |
|---|---|---|
| L29·n4093 | एवं, यदि, सर्वप्रथम, अथवा, अवश्य, तथा, परंतु, सदैव | मतलब, वगैरह, दिक्कत, एक्चुअली |
| L30·n8809 | एक्चुअली, बेसिकली, ऑलरेडी, मतलब, वगैरह | यदि, अर्थात्, पुनः, प्रत्येक, केवल |
| L35·n5127 | कंट्री, फिजिकल, हिस्ट्री, नेचर, डिमांड, स्टेटमेंट | लाभ, विद्यालय, नवीन, विद्युत, विश्वविद्यालय |
| L39·n8074 | क्वेश्चन, डायरेक्ट, पॉलिटिकल, रिक्वेस्ट, शेड्यूल, टारगेट | गृह, वित्त, क्षेत्र, केंद्र, कार्य, वेतन |
| L41·n10011 | आवश्यक, उपस्थित, संबंधित, अपेक्षित, प्राप्त, उपयुक्त | टाइम, भैया, बात |
| L34·n9119 | — | रिक्वायरमेंट, रिक्वेस्ट, ट्रेनिंग, सिक्योरिटी, ट्रैफिक |

Two families recur: **connectives and fillers** (the formal *एवं / यदि / अतः* against the spoken *मतलब / वगैरह / एक्चुअली*), and
**nouns** (English loans against tatsama words). One cross-link: L35·n5127 was among the components pushing the 4B toward its
*flattened* translations in our earlier analysis of meaning errors, where its readout made no sense. Read against register, it is a
spoken-loanword neuron.

## Experiment 3: Do the writers control it?

**No.** We turned the 512 strongest pure-writing neurons up threefold and switched the 512 strongest loan-writing ones off:

| arm | conversational loanwords | conversational bookish |
|---|---|---|
| unedited | 12.8 | 0.6 |
| top-64 pure writers ×3, loan writers off | 11.3 | 0.4 |
| top-512 pure writers ×3, loan writers off | 12.1 | 0.3 |
| the reverse (top-512) | 12.7 | 0.6 |

Most outputs came back word for word identical. The writers execute a choice made before them; a neuron's output column shows what it
writes, not what decides that it should fire.

## Experiment 4: Where is the choice made?

For this we did need forward passes. Two contrasts, on 685 sentences outside the evaluation set:

- **Output contrast**: the same English with its editorial and its spoken reference fed in as the answer, comparing each neuron's mean
  activation.
- **Prompt contrast**: the same English with a "write शुद्ध हिंदी" versus a "write it the way people speak" instruction, read at the
  moment before the model writes its first word — so no Hindi word can be the reason a neuron fires.

**The deciders sit in the middle of the network, layers 9–23** — L21·n6994, L21·n1180, L22·n3253, L20·n6879, L22·n481 among the
strongest. **147 of the top 200** neurons from the output contrast also separate the two instructions in the same direction before a
single word is written: they encode the intention, not the words. The two contrasts' directions agree more with depth, from cosine
0.04 at the first layer to 0.69–0.78 in layers 33–39 — the decision flowing into the writers of Experiment 2.

## Experiment 5: Turning the dial

We shifted the 256 strongest deciders by twice their measured editorial-minus-spoken difference, at every position, and generated
translations of the 600 evaluation sentences.

| arm | conv. loanwords | conv. bookish | news loanwords | news bookish |
|---|---|---|---|---|
| unedited | 12.8 | 0.6 | 4.3 | 1.3 |
| instruction "write शुद्ध हिंदी" | 11.6 | 1.1 | 3.3 | 2.5 |
| **256 deciders → editorial** | **8.2** | **3.3** | **2.5** | **3.8** |
| 256 deciders → Hinglish | 14.0 | 0.5 | 6.1 | 0.5 |
| 256 random neurons, same layers and shift sizes | 12.9 | 0.6 | 4.4 | 1.2 |
| *editorial reference* | *5.7* | *5.6* | — | — |
| *spoken reference* | *12.5* | *0.5* | — | — |

**The register moved in both directions; the random control did not move at all.** Toward editorial it covers about half the distance
to the editorial reference — about three times what the instruction manages on this fine-tuned model, which resists being asked.
Output length is unchanged (69 / 108 characters on average), so this is not the rambling we saw from a generic "faithfulness" direction
in the earlier post.

## Experiment 6: What does the switch cost?

The judge confirms the switch independently: told to prefer everyday Hindi, it flags the editorial output's words as register errors —
**1 → 70** on conversational text and **6 → 88** on news. That is the intended effect, not damage. The question is what else moved:

| arm | conversational: meaning / grammar / register | news: meaning / grammar / register |
|---|---|---|
| unedited | 12 / 16 / 1 | 95 / 26 / 6 |
| instruction "write शुद्ध हिंदी" | 16 / 19 / 9 | 101 / 26 / 31 |
| deciders → editorial | 16 / 27 / 70 | 106 / 46 / 88 |
| deciders → Hinglish | 14 / 33 / 1 | 110 / 62 / 4 |
| random control | 11 / 15 / 1 | 94 / 29 / 7 |

**Meaning mostly survives** (+4 conversational, +11 news toward editorial). **Grammar pays**: +11 to +36 errors depending on direction
and set. A constant shift changes the words without always fixing the agreement around them.

## Experiment 7: What it looks like

Same English, same model; only the 256 deciders are shifted. Examples drawn at random from the sentences the edit changed.

> **EN** — Please check the main valve because my tap is completely dry.
> **Pure** — कृपया **मुख्य** वाल्व की **जाँच** करें क्योंकि मेरा नल **पूरी तरह से** सूखा है।
> **Unedited** — कृपया मेन वाल्व चेक करें क्योंकि मेरा नल बिल्कुल सूखा है।
> **Hinglish** — **प्लीज** मेन वाल्व चेक कर लेना क्योंकि मेरा **टैप** बिल्कुल **ड्राई** है।

> **EN** — Could you please tell me if I need to update my KYC for this UPI ID?
> **Pure** — …अपना KYC अपडेट करने की **आवश्यकता है**?
> **Unedited** — …अपना KYC अपडेट करना होगा?
> **Hinglish** — …अपना KYC अपडेट करना **पड़ेगा**?

> **EN** — However, Ruhail was arrested under section 404 for hiding the facts and possessions of the deceased.
> **Pure** — हालांकि, रुहैल को मृतक के तथ्यों और सामान को छिपाने के आरोप में **धारा** 404 के तहत गिरफ्तार किया गया।
> **Unedited** — …सेक्शन 404 के तहत गिरफ्तार कर लिया गया।
> **Hinglish** — **लेकिन**, रुहैल को **डेड की फैक्ट्स** और सामान छुपाने के लिए सेक्शन 404 के तहत **अरेस्ट** कर लिया गया।

> **EN** — She added, "That was a long time ago, and he's been very kind."
> **Pure** — **उन्होंने** कहा, "यह बहुत पहले की बात है, और वह बहुत **दयालु** रहे हैं।"
> **Unedited** — उसने कहा, "वो बहुत पहले की बात है, और वो बहुत अच्छे हैं।"
> **Hinglish** — उसने कहा, "वो बहुत **टाइम** पहले की बात है, और वो बहुत अच्छे हैं।"

The dial does more than swap nouns. Toward editorial it changes grammar frames (*करना होगा → करने की आवश्यकता है*) and politeness
(*उसने → उन्होंने*); toward Hinglish it reaches past loanwords into everyday Hindi words (*नल → टैप*, *सूखा → ड्राई*). The grammar cost
shows at the extremes: *डेड की फैक्ट्स* is clumsy, and elsewhere *बहुत लकी एस्केप थी* gets the gender wrong.

---

## What we take away

**Reading weights finds the writers; finding the deciders takes behaviour.** The weight-only reading was not wasted: it showed that
register is represented, legibly, in thousands of neurons, and it produced the clearest neuron readouts we have seen. But a neuron's
output weights cannot show whether it decides or merely executes, and the late writers turned out to be executors. A few forward passes
on contrasting examples — with the intent separated from the words — found the small set that decides.

**Register is a habit, and habits have handles.** Across our three studies the pattern is consistent. The story writer's repetition and
the translator's register are the same behaviour in every sentence, and both had a small, findable set of components whose edit moves
behaviour while a matched random edit does not. The translator's meaning errors differ in every sentence, and nothing in the weights
moved them.

**A register dial is plausible, not finished.** A deployable "formal / spoken" switch needs a gentler or better-chosen shift — at half
the strength the register moved less (conversational loanwords 11.1, bookish 1.4) — and a fix for the agreement errors it introduces.

## Limitations

- **Register is measured lexically plus one judge.** The loanword and bookish counts come from fixed word lists; the 31B judge applies a
  spoken-Hindi criterion and is a single model family.
- **The base model is locked in.** This 4B was fine-tuned to the spoken register, which is why even an explicit instruction barely moves
  it; the dial's effect relative to asking may be smaller on an untuned model.
- **One setting tested in depth.** 256 neurons at ×2, chosen by an activation contrast on 685 sentences from the same benchmark family
  as the conversational evaluation set (disjoint sentences, same domains).
- **The edit is an activation shift at inference**, not a change to stored weights.
- **Weights-only reading here is code plus a human reader**, not a model reading raw tensors: the 4B's 8B parameters do not fit in any
  context window.

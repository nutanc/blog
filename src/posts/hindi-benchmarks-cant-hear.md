---
layout: post.njk
title: "The Hindi That Benchmarks Can't Hear: Why It's Time for a New Evaluation Standard"
date: 2026-10-26
permalink: /posts/hindi-benchmarks-cant-hear/
---

If you evaluated English-to-Hindi machine translation systems purely by public leaderboards, you'd assume the state of the art is solved, polished, and ready for deployment.

Recently, our team built an English→Hindi translation pipeline on Gemma-4-12B that we called the **"brain" recipe**. Inspired by human bilingual cognitive processing, it asks the model to sequentially comprehend intent, plan register and tense, draft, and monitor against source text before generating output.

When we ran it against standard evaluation suites, the numbers looked disastrous:

* On **FLORES-200**, the conversational variant fell from a baseline **54.6 chrF++ to 45.5**.
* On **WMT14**, it fell from **49.3 to 40.8**.
* Under an independent Gemma-4-31B judge instructed to be register-neutral, our conversational model was rejected by margins between 3:1 and 4:1.

We were ready to scrap the system as an over-engineered negative result. Then we put thirty random outputs in front of human native speakers in a blind evaluation. The result didn't just complicate the picture—it completely inverted it.

The benchmarks weren't wrong about overlap. They were answering a question that real-world users never ask: ***Which Hindi?***

---

## The Illusion of the "Register-Neutral" Benchmark

Standard machine translation benchmarks like FLORES-200 and WMT14 share an implicit, foundational assumption: **there is a single canonical target distribution for a language.**

In Hindi, that target distribution is formal, Sanskritized, editorial prose (*Shuddh/Standard Hindi*). It is the register of state gazettes, official textbooks, and formal news bulletins. Words like अवधारणा (*concept*), घूर्णन (*rotation*), or संग्रहकर्ता (*collector*) rule supreme.

That Hindi is real, but it is not the Hindi spoken in living rooms, corporate offices, clinics, retail counters, or customer service chats. In daily life, Hindi speakers use a natural, Devanagari-script register that naturally assimilates loanwords: *concept*, *team members*, *wallet*, *test*, and *research paper*.

When we asked a native speaker to evaluate our outputs with no explicit criteria, they gravitated toward the default prompt 23 out of 30 times, mirroring the 31B judge. But the moment we asked: **"Pick the translation as you would actually say it out loud,"** the decision flipped **7 out of 7 times** to the conversational model.

| Source (EN) | Default Prompt (Wins Benchmark) | Conversational Brain (Wins Blind Spoken Test) |
| --- | --- | --- |
| *The concept is not a universal hit.* | यह अवधारणा सार्वभौमिक रूप से सफल नहीं है। | यह कॉन्सेप्ट हर जगह हिट नहीं है। |
| *Virtual team members often function as the point of contact...* | वर्चुअल टीम के सदस्य अक्सर अपने तत्काल भौतिक समूह के लिए संपर्क बिंदु... | वर्चुअल टीम मेंबर्स अक्सर अपने पास के फिजिकल ग्रुप के लिए पॉइंट ऑफ कॉन्टैक्ट... |
| *The consolation tour was a part of this tour.* | यह सांत्वना दौरा इस दौरे का एक हिस्सा था। | कॉन्सलेशन टूर इस टूर का एक हिस्सा था। |

Look closely at that third sentence: **"The consolation tour was a part of this tour."**

The textbook dictionary translation for *consolation* is सांत्वना (*saantvana*). But in living Hindi, *saantvana* carries the heavy, somber weight of bereavement and grief counseling. Translating a sports consolation fixture as a "सांत्वना दौरा" doesn't make it refined—it makes it sound like a state visit to a funeral.

The conversational output, by preserving the loanword *कॉन्सलेशन टूर*, wasn't just more natural; **it was the only semantically faithful translation.** Yet, to an n-gram overlap metric and a "register-neutral" LLM judge, the literal dictionary substitution took the prize.

---

## 4 Reasons Today's Hindi MT Benchmarks Are Broken

Our experiment surfaced systematic blind spots in how MT evaluation handles languages with sharp formal/colloquial diglossia:

### 1. One Reference Means Negative Scoring for Real Speech

chrF++ and BLEU are mathematically designed to penalize deviations from a single reference string. When your sole ground truth is written in formal editorial prose, every natural loanword or colloquial phrasing drops your score. Our system suffered a massive 9-point chrF penalty on FLORES strictly for producing the words urban Indians actually use.

### 2. "Register-Neutral" Judges Harbor Editorial Bias

Telling an LLM judge to be "register-neutral and ignore loanwords" sounds fair on paper. In practice, models trained on vast corpuses of written literature treat formal phrasing as a proxy for competence. Faced with two grammatically sound variants, an unguided LLM defaults to bookish syntax every time. Neutrality without explicit constraints is just an unstated formal bias.

### 3. Overlap Metrics Miss Glaring Hallucinations and Distortions

Our test run revealed that NLLB-600M virtually matched a 12B model on chrF++ (54.2 vs 54.6 on FLORES), yet generated **nearly four times as many semantic meaning errors** (1.07 errors/sentence vs 0.28). Overlap metrics reward models that parrot reference vocabulary while remaining completely blind to catastrophic loss of meaning.

### 4. Code-Mixed Corpora Solve the Wrong Problem

When researchers realize standard Hindi datasets are too stiff, they typically jump to Hinglish datasets (Roman-script code-mixing from social media platforms). But that leaves a critical vacuum: **spoken, natural Hindi written in Devanagari script.** That is the register used across fintech apps, telemedicine consultations, ride-hailing interfaces, and voice-assisted customer support. Today, there is virtually zero standardized benchmark data measuring it.

---

## Designing a Modern Translation Benchmark

If machine translation is going to serve human communication rather than academic leaderboards, our evaluation infrastructure must evolve. A modern Hindi benchmark requires three structural shifts:

1. **Dual-Reference Ground Truths:** Every source segment must carry paired references—one in standard editorial Hindi, and one in natural spoken Hindi. Systems must be tested against the specific register they claim to target.
2. **Register-Conditioned Evaluation:** Human and LLM judges must evaluate candidates against an explicit target persona (e.g., *"How a doctor speaks to a patient"* or *"How a bank sends an SMS notification"*), categorizing archaic or hyper-formal terms as register violations rather than rewards.
3. **Fidelity Error Tagging Over String Similarity:** Leaderboards must prioritize categorical error counts (omissions, hallucinated facts, register mismatches) over black-box overlap metrics that disguise semantic failures.

---

Until evaluation metrics reflect the language people actually speak, developers will be forced to choose between winning public leaderboards and delivering usable software. Machine translation shouldn't force real-world users to talk like a government gazette just to pass a test.

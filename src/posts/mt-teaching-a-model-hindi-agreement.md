---
layout: post.njk
title: "Teaching a model Hindi agreement"
date: 2026-08-14
permalink: /posts/teaching-a-model-hindi-agreement/
series: "Translation From Scratch"
part: 4
---

Suppose the structure model has reordered everything correctly and the alignment has handed back the right Hindi lemmas. You still don't have a correct sentence, because Hindi words change shape depending on grammar the lemma doesn't carry. This post is about that last transformation — inflection — and about a small model that learned it, and an honest result about how much it actually helped.

## The दी / दिया problem

Hindi verbs, adjectives, and many nouns agree in **gender and number** with what they relate to. The English verb *"gave"* is one word. Its Hindi form depends on the object:

- masculine singular object → दिया
- feminine singular object → दी
- masculine plural → दिए

Same English lemma देना ("to give"), three surface forms, and picking the wrong one is a grammatical error a native speaker hears instantly. A translator that emits bare lemmas — देना, किताब — produces something like caveman Hindi: understandable, obviously wrong.

So the skeleton carries the grammar the read-out needs. When the aligner and parser process the Hindi side, each indexed slot gets a small tag from the Hindi word's morphological features: `V1.fs` means "verb slot 1, feminine singular." The structure model learns to **predict these tags** as part of the Hindi skeleton — which means it's learning agreement, the same way it learned word order: from parallel data, no rules. On held-out pairs it predicts the correct verb gender-and-number **0.93** of the time in the clean-corpus regime. That's the दी/दिया axis, and the model gets it right nine times in ten.

## Lookup versus generation

Predicting the tag is half the job. You still have to *produce* the surface form: given the lemma देना and the tag `fs`, emit दी.

The obvious approach is a **lookup table**: during training, record every (lemma, gender, number) → surface form you saw, and at read-out time look it up. It works perfectly for combinations you've seen. It fails completely on ones you haven't — a lemma that never appeared in training, or a lemma-plus-feature combination that didn't, has no entry, and the table can only shrug and return the bare lemma. For an open vocabulary this tail is not small.

The alternative is to *learn* inflection as a function. I trained a tiny **character-level sequence-to-sequence model**: input the lemma's characters plus two feature tokens (`G=f N=s`), output the inflected form's characters. It's the same seq2seq machinery from the rest of the project, just over characters instead of words. The idea is that Hindi inflection is regular enough at the character level that a model can generalize the *pattern* to lemmas it has never seen.

The test is deliberately harsh: hold out entire lemmas, so at evaluation the model sees words it never trained on — exactly where the lookup table is helpless.

| method | exact-match on unseen lemmas | coverage |
|---|---|---|
| lookup table | 0.000 | 0.000 |
| **char generator** | **0.864** | 1.000 |

The lookup table scores zero, by construction — it has no entry for a lemma it never saw. The character model inflects **86%** of them correctly, and produces *some* form for every input. It learned Hindi gender/number morphology from the extracted examples, with no hand-written rules — मानना → मानी for feminine plural, and so on. (On the earlier, smaller corpus the same model got 0.67; the larger prose corpus pushed it to 0.86. More data, better generalization.)

## The honest part: wiring it in barely moved the needle

Here's where I have to be careful, because the intrinsic result above is genuinely good and it would be easy to oversell it.

I wired the generator into the read-out as a fallback: try the lookup table first, and when it misses, call the character model instead of falling back to the bare lemma. In the full translation pipeline it **fired on 92% of the table's misses** — so it was doing real work on the tail. And the aggregate translation score (chrF against the reference) moved from 0.310 to 0.309. Essentially nothing.

Why? Because the lookup table was built over the *whole* corpus, including words that also appear in the test sentences, so on this particular evaluation the table already covered most slots. The tail the generator owns — the genuinely unseen combinations — was only about a tenth of the words, and a tenth of the words nudging from "bare lemma" to "correctly inflected" doesn't swing a corpus-level surface metric, especially against noisy references.

So the correct conclusion is specific: the character generator is the **right tool for inflection at inference time**, where you routinely hit lemmas outside any table (this is exactly what the live demo needs). On a held-out-corpus benchmark where the table isn't really held out, it's a wash. Both statements are true; reporting only the 0.864 would have been misleading, and reporting only the flat chrF would have buried a component that matters in deployment.

That "flat chrF" kept showing up — the morphology didn't move it, the data switch made it *drop*. By this point I stopped trusting chrF at all and went looking for an evaluation that measured what I actually cared about. That's the next post, and it's where the whole project gets vindicated.

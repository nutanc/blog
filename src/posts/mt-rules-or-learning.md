---
layout: post.njk
title: "Rules or learning? The Hindi genitive"
date: 2026-10-27
permalink: /posts/rules-or-learning/
series: "Translation From Scratch"
part: 10
---

[Part 9](/posts/the-glue-was-hidden/) fixed auxiliaries and light verbs by letting the model see them. Case markers didn't budge: teacher-forced accuracy 0.45 → 0.46. These are the small words that carry most of Hindi's grammar — ने, को, से, में, पर, and the genitive का / की / के — so this post is about them, and about a question I kept circling: Hindi grammar has rules. Should we write them down, or keep learning them?

## Form errors or choice errors?

The genitive is the cleanest case to study. English *the girl's room* and *the room of the girl* both become लड़की **का** कमरा, and the marker has three forms:

- का — before a masculine singular noun in the direct case (कमरा)
- की — before any feminine noun (किताब)
- के — before a masculine plural, or a masculine noun in the oblique case, which is what happens when another postposition follows it: लड़की **के** कमरे **में**, "in the girl's room"

The key fact is that the marker agrees with the *possessed* noun that follows it, not with the possessor — so a gender feature on *girl* can't help. That suggested a diagnosis: maybe the model chooses the right postposition but inflects it wrong.

I measured it. Of the agreement genitives in the held-out targets, the model predicted the right one 36% of the time. The errors split as:

| error | share |
|---|---|
| **form** — the wrong one of का / की / के | 12% |
| **choice** — a different postposition | 18% |
| other — no postposition at that position | 34% |

So form errors were the *small* part. Three more findings from the same pass:

- **26% of all genitives aren't agreement at all.** के लिए ("for"), के बारे में ("about"), की तरह ("like") are frozen compound postpositions. They swamp any agreement statistic you compute.
- **The references obey the textbook rule only 75% of the time.** Part of that is parse noise; part is the honorific plural — respected singular people take के (*राम के पिता*, "Ram's father"). The worst offenders in the data: नेता, सचिव, अध्यक्ष, विधायक (leader, secretary, chairman, legislator).
- **The worst postpositions were on nouns with no English preposition at all.** "No preposition → पर" scored 0.20; "→ से" 0.25. With an English preposition the model was fine: *in* → में 0.85, *on* → पर 0.75. These are **verb-governed**: *asked him* → उससे पूछा, *attacked him* → उस पर हमला, *waited for* → का इंतज़ार. And the skeleton replaces every verb with `V1`, which throws away exactly the information that chooses the postposition.

## v5: rules for form, learning for choice

That diagnosis suggested a split design:

- **The model learns *choice*.** The source gets the cues that drive it: the chosen Hindi verb's **case frame**, mined from the corpus (हमला → पर, इंतज़ार → का, पूछना → से, 801 verbs in all); a WordNet **noun class** on each noun slot (time, location, person, artifact, substance); a transitivity bit for ने; and English multiword prepositions merged into one token (*because of*, *in front of*).
- **The read-out computes *form* by rule.** The target writes a generic `GEN`, and the read-out picks का/की/के from the next noun: its gender from the Hindi lexicon, plural or oblique → के, honorific heads → के. Nouns get a fourth grammar-code letter for case, so कमरा becomes कमरे before में. Compound postpositions become single tokens (`के_लिए`).

The structure model improved — word-order agreement 0.860 → 0.886, teacher-forced case-marker accuracy 0.46 → 0.53 — and the translations got **worse**. Case-F1 against the references fell from 0.486 to 0.426.

The cause was four bugs in my rules, and each is a little lesson in why rules are hard:

1. **"का लिए".** The builder was supposed to turn के लिए into one token, but it refused whenever the *next* token belonged to a slot — which it usually does. So the model learned `GEN लिए`, and my rule, seeing no noun after GEN, defaulted to का.
2. **A garbage honorific list.** I mined "masculine nouns that take के in the direct case" from the corpus. It returned अस्पताल (hospital), उत्पाद (product), ऑनलाइन… — noun compounds where the real head came one word later.
3. **The wrong head.** In *फोन की कैमरा गुणवत्ता* ("the phone's camera quality") the head is the *last* noun of the compound, गुणवत्ता (feminine → की). I took the first.
4. **Invisible heads.** In *गड़बड़ी का सामना कर* ("face a glitch") the head is सामना — but in our skeleton that's a *verb* slot, because *facing* became noun + light verb. My head-finder only looked at noun slots.

Fixed, v5 tied v4 on the conversational set (case-F1 0.482 vs 0.486) and beat it on held-out news (0.442 vs 0.403).

## Can the rules be found from data?

That left the question the bugs had raised: are the rules really there, and is my problem just that I write them badly? So I ran an experiment. I gave a decision tree 252,000 agreement genitives from the corpus with nothing but features of the head noun, and asked it to predict the form.

| features given to the tree | accuracy |
|---|---|
| none (always guess the most common form) | 39.9% |
| the head's dictionary gender + number + "a postposition follows" | **84.5%** |
| + honorific list | 85.1% |
| the head's exact parse in that sentence (gender, number, case) | **87.6%** |

And it printed the rule it found:

```
head feminine                                    → की
head masculine, singular, nothing follows it     → का
otherwise (plural, or a postposition follows)    → के
```

That's the textbook rule, rediscovered from raw data with no linguistics supplied. So yes: **the rules are clear, and they can be found systematically.** The ~12% the tree can't explain isn't hidden grammar; it's parse errors, misidentified heads, honorifics and inconsistent references. Even a perfect rule tops out around 85–88% against these references.

## Then why didn't the rules win?

Because a rule is only as good as its inputs, and at translation time every input is itself a prediction. Which noun is the head, what its number is, whether a postposition will follow it: all of that comes from a skeleton the model generated a moment ago. Each prediction error flows straight through the rule. A learned model weighs the same evidence jointly, and when it's unsure it hedges.

And form was only 12% of the errors anyway. Most of the damage was **choice** — which postposition, or whether to use one at all — and that depends on verb frames, idiom and meaning, exactly where hand-written rules are hardest.

## v6: learn it, but hand the learner the rule's inputs

The tree said which three inputs matter, so the last version gives them to the model as features rather than applying them as a rule:

- The target keeps literal का/की/के (learned, as in v4).
- On the English token that becomes the genitive — *'s*, *his*, *my*, *of* — a sixth feature carries the **possessed head's** dictionary gender, number and role: `'s|…|ms:obj` means "the thing possessed is masculine, singular, and an object". The model no longer has to find the head itself.
- Compound postpositions stay single tokens; verb frames, noun classes and transitivity stay from v5.

Rules (v5b, with every fix) against learning (v6), same data, same features otherwise:

| | case-F1 (conv.) | function-word F1 (conv.) | case-F1 (news) | function-word F1 (news) |
|---|---|---|---|---|
| v4 | 0.486 | 0.559 | 0.403 | 0.424 |
| v5b — rules | 0.457 | 0.553 | 0.457 | 0.431 |
| **v6 — learned + controller** | 0.460 | **0.582** | **0.484** | **0.454** |

On case-F1 it's a tie (the difference is inside the noise). On the small words around the case markers, learning edges ahead: +0.029 function-word F1 on the conversational set, 95% CI [+0.001, +0.058]. Against v4, the controller feature lifted case-F1 on the news set by +0.081 [+0.027, +0.148].

## What I take from this

Language does have clear rules, and data can find them: a three-line tree recovered the genitive. The hard part isn't knowing the rule; it's **knowing its inputs at the moment you need them**, inside a pipeline where every input is a guess. Writing the rule into the read-out makes the system brittle in exactly the places where the guesses are wrong. Giving the learner the rule's inputs as features gets you the rule's knowledge without its brittleness.

At 314k training pairs the two approaches tie. Learning should gain more from more data than rules do, which is the experiment in [part 11](/posts/more-data-and-how-close-we-are/).

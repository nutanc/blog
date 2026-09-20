---
layout: post.njk
title: "Three levers of control (and a decision head)"
date: 2026-08-27
permalink: /posts/gemma-three-levers-of-control/
series: "The Tiny Storyteller"
part: 5
---

[Part 3](/posts/gemma-steering-story-shape/) and [part 4](/posts/gemma-control-tokens-for-slides/)
added *control tokens* — a learned symbol that steers story shape or slide layout.
But a control token is a training-time answer to a question that also has two
cheaper, inference-time answers. Prompted by a reader pointing me at two "System-1"
decision engines — Convai's **Laya** and **TypeSafe's System One / Jev** — I mapped
out the whole space. There are exactly three ways to bend a language model's output
distribution, and it's worth knowing which to reach for.

## The three levers

**1. Constrain (inference, free).** Set the probability of the tokens you don't
want to zero. Our vocabulary trim from [part 1](/posts/gemma-a-storyteller-with-ten-thousand-words/)
was already this — the model *can't* emit a token outside the kept set. You can do
it more surgically at decode time. To force a slide's layout, just prefill the
JSON: start the model's output with `{"layout": "quote", "title": "` and let it
finish. On the plain slide model, with **no control-token training at all**, this
hits **0.98 layout adherence** — identical to the trained control token. In fact
adherence equals the valid-JSON rate: whenever the JSON parses, the layout is
*always* right.

**2. Bias (inference, free).** Add a constant to the logits of a target
sub-vocabulary — nudge probabilities up instead of forcing them. Boosting an
"ocean" word set on the storyteller pulled the average number of sea-words per
story from 0.3 to 2.2 to 4.0 as I turned the knob from 0 to +3 to +6. At +10 the
model collapsed into noise. Bias is a real knob with a control-versus-coherence
tradeoff — cheap and general, but soft.

**3. Learn (training).** Train a control token, as in parts 3–4. Also 0.98 for
layout. It costs a fine-tune and new embeddings.

Here's the punchline. For an **explicit** field the model writes down — like
`layout` — the free inference constraint *equals* the trained token. Training buys
you nothing; just prefill it. You only need the learned token for an **emergent**
attribute — like narrative shape, which isn't a field anywhere, so there's nothing
to prefill. *Constrain what you can express; learn what you can't.*

## Pushing constrain to a guarantee

If layout adherence is capped only by JSON validity, close that gap. Instead of
free-generating the JSON and hoping it parses, I let the model fill only the
*values* — titles, bullet text, the quote — while my code forces every key, comma,
brace, and the layout's field set. The slide is then **valid JSON by
construction**: 1.00, never a fallback, ever. That is exactly the
"hallucination-is-impossible" property Laya and TypeSafe sell — they get it by
refusing to generate at all and emitting a structured value directly. Same
guarantee, reached on a generative model by fencing the structure and only letting
it write words into the gaps.

## The part I liked most: decide, then render

Laya and Jev aren't generators. They're *decision* models: an encoder that, in one
forward pass, returns a **calibrated probability distribution** over a fixed set of
answers. And a control value — "which layout?" — is precisely such a decision. So I
built one: a MiniLM encoder plus a small classifier, trained on the teacher's own
layout labels (free), mapping a passage to a distribution over the four layouts.

It gets 60% accuracy (chance is 25%), which sounds middling until you notice that
layout is a genuine *judgment call* — a passage can reasonably be bullets *or* a
statement — so a single "correct" label is the wrong thing to expect. What matters
is that it's **well calibrated**: an expected calibration error of 0.037, and it's
more confident when it's right (0.63) than when it's wrong (0.55). It knows what it
doesn't know.

Chain the two and you get a clean little system that looks a lot like the System-1
/ System-2 split people keep gesturing at:

> **decide** the layout with a calibrated head (System-1) → **render** it with the
> tiny model under a hard structural constraint (System-2) → a slide that is
> on-layout and valid *by construction*.

The decision is cheap, calibrated, and abstains-by-uncertainty; the generation is
fenced so it can't produce garbage. No 10-billion-parameter model in sight.

## Where this leaves the series

Five posts, one stubborn theme. Trim the vocabulary and the model shrinks for free.
Rent fluency from pretraining and a few thousand examples teach it a task. And when
you want to *steer* it, form turns out to be a knob with three settings —
constrain, bias, learn — while content stays the thing that actually has to be
right. The cheapest lever that expresses your constraint usually wins. Reach for
the learned one only when the thing you want to control isn't written down anywhere
for you to grab.

*Written up as a short standalone paper — "Steering Form, Not Content" — in the
project repo.*

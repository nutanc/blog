---
layout: post.njk
title: "Control tokens for slides"
date: 2026-08-26
permalink: /posts/gemma-control-tokens-for-slides/
series: "The Tiny Storyteller"
part: 4
---

In [part 3](/posts/gemma-steering-story-shape/) I bolted a control knob onto the
storyteller: dictate a shape token before each sentence and the story's structure
follows. The knob worked but was blunt — story shape is an *emergent* property, so
you could suppress dialogue reliably but not force it past what the plot afforded.

That raised a question. What if the thing you're controlling isn't emergent, but
something the model writes down explicitly? To test it I needed a different task,
so I built one: a local **slide generator**, and then gave it a control token for
slide *layout*. The result is the cleanest steering in the whole series.

## A local slide generator, first

Presentation tools turn a document into slides by calling a cloud model on each
chunk. I wanted that offline. So I distilled it: I ran an existing cloud
slide-maker (`gpt-5.4-mini`) over 2,500 text chunks and kept the (chunk → slide
JSON) pairs it produced — each slide a small object with a `layout`, a `title`,
and `bullets`. Then, exactly as in [part 1](/posts/gemma-a-storyteller-with-ten-thousand-words/),
I trimmed Gemma's vocabulary to English (28k tokens → a 118M model) and fine-tuned
it (LoRA) on those pairs.

It runs fully offline and produces valid slides. As always at this size, the
*format* is nailed and the *content* is imperfect — occasionally a garbled title
or an inverted fact. Form is cheap; content is hard. (A recurring tune on this
blog.)

## The control token: layout

Every slide the teacher produced already carried a `layout` field, one of four:
`bullets`, `statement`, `quote`, `stat`. That's a free control label for every
training example — I didn't have to annotate anything. So I added four tokens to
the vocabulary, one per layout, and retrained with the desired layout token
prepended to each passage:

```
Make one slide as JSON.
LAYOUT: <quote>
PASSAGE: ...
SLIDE JSON:
```

At training the token is the layout the teacher actually chose. At inference I
*dictate* it — "make this a quote slide" — and read back what the model produced.

## It obeys, almost perfectly

I forced each of the four layouts on 80 held-out passages and checked the
generated slide's layout:

| forced ↓ / got → | bullets | statement | quote | stat |
|------------------|--------:|----------:|------:|-----:|
| **bullets**   | 79 | · | · | · |
| **statement** | 2 | 78 | · | · |
| **quote**     | · | · | 79 | · |
| **stat**      | · | · | · | 77 |

Mean adherence **0.98**, against a chance rate of 0.25. Tell it "quote" and you
get a quote slide 99% of the time.

This is far cleaner than story shape, and the reason is the interesting part:
**layout is something the model writes down explicitly** — it literally emits
`"layout": "quote"` — whereas story shape had to be inferred from the sentences it
generated. When the controlled attribute is an explicit output field, the control
token lands almost perfectly. When it's emergent, control is real but partial.
Same mechanism, very different ceilings.

## What the knob can't do: make a statistic exist

Near-perfect adherence doesn't mean near-perfect slides. Force a layout the
passage can't support and the *format* holds while the *content* strains. Here's
all four layouts forced on a passage about a lighthouse keeper — no numbers
anywhere:

- **bullets** → *"helped hundreds of ships"* ✓
- **statement** → *"saved hundreds more ships"* ✓
- **quote** → lifts the passage's own quote-like line ✓
- **stat** → format-correct, but its `value` field comes out as **"years"** with
  the label *"saved ships over decades"* — there is no statistic to render, so the
  model fabricates one to fill the slot.

That's the ceiling, and it's the same one stories hit with dialogue: **the control
token dictates the form, and the failure mode is always content, never format.**
The model does exactly what you asked structurally, and pays for it in words.

## The through-line, one more time

Two modalities now tell the identical story. Trim the vocabulary and the model
shrinks for free. Rent fluency from pretraining and a few thousand examples teach
it a task. Add a control token — a shape for stories, a layout for slides — and
you get a cheap, reliable, *measurable* handle on structure: 0.98 for the explicit
attribute, partial for the emergent one. And in both, the knob turns form, not
quality. The good sentence and the real statistic still have to come from
somewhere else.

*This pair of results — narrative shape and slide layout — is written up as a
short standalone paper in the project repo.*

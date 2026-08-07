---
layout: post.njk
title: "Does a detective story have a shape?"
date: 2026-08-03
permalink: /posts/does-a-detective-story-have-a-shape/
series: "The Shape of a Story"
part: 2
---

Kurt Vonnegut had a theory that stories have shapes you could draw on a
blackboard — man-in-hole, boy-meets-girl, Cinderella. The premise of this whole
project is to test that literally: embed each sentence, add the vectors up one at
a time, and watch the path the story traces through the space. If Vonnegut was
right, stories of the same *kind* should trace similar paths.

I had a clean test. Take Sherlock Holmes — twelve formulaic detective stories,
the closest public-domain thing to a Perry Mason box set — and ask: do the twelve
resemble *each other* more than they resemble Grimm fairy tales or Moby-Dick
chapters? If detective stories have a shared shape, the answer is yes.

I ran it with several embeddings. The number to watch is a separation ratio: how
much more a series' stories resemble each other than they resemble other genres.
Above 1 means a shared shape exists.

- **Content shape** (ordinary SBERT): Sherlock scored **0.87** — *below* one.
  Detective stories are no more alike each other, by content-shape, than they are
  like fairy tales. Vonnegut's blackboard, drawn in meaning-space, is empty.
- **Structure shape** (our form + entity embedding): Sherlock scored **2.70**.
  Detective stories cluster hard, away from the other genres.

A 2.70! The content-free structure trajectory sees exactly what content-shape is
blind to: detective stories *move* the same way. I was thrilled for about an
hour.

## The graph was secretly a clock

Then I did the thing this repo exists to do, which is to try to kill my own
result. One of the features feeding the structure embedding was `cum_cast` — the
number of distinct characters introduced *so far*. That number only ever goes up.
It is, quietly, a monotonic function of "how far into the story you are." A
sentence counter wearing a trench coat.

And a sentence counter will make *every* story look like the same rising ramp,
which will make them all resemble each other, which inflates the separation for
reasons that have nothing to do with narrative. This is the original sin the
whole `storyshape` project was built to avoid — the naive version of "story
shape" is dominated by PC1 ≈ sentence index — and I'd let it back in.

So I removed the one strictly-monotonic feature and re-ran. Separation fell from
**2.70 to 1.37**. Roughly half the beautiful result was a clock.

But — and this is why the stage was worth it — it didn't fall to *one*. Counting
removed, Sherlock stories are still 1.37× more alike each other than other
genres, and still more alike than shuffled versions of themselves. There is a
real, if smaller, shared detective-form-shape underneath the artifact.

## The bigger lesson: the picture is the wrong instrument

The other thing this stage taught me is that the *2-D shape plot* — the pretty
Vonnegut curve you'd actually draw — is a bad way to see any of this. I measured
how much the dominant axis of the 2-D trajectory correlates with the plain
sentence index, across every embedding I had. The answer was **~0.74**, and for
the skeleton embedding it was **0.90**. The "shape" you plot is mostly just a
clock, no matter what you embed. The real signal lives in dimensions the
projection throws away.

That reframed the entire project. If the shape-as-a-picture is uninformative,
the interesting question isn't "what does the curve look like" — it's "is the
*sequence* of structural states predictable?" Can you, given the story so far,
guess the shape of the next sentence?

That's a language-modelling question. And to ask it, I first had to turn stories
into a language.

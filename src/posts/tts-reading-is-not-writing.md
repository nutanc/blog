---
layout: post.njk
title: "Reading is not writing: the asymmetry at the heart of TTS"
date: 2026-08-10
permalink: /posts/tts-reading-is-not-writing/
series: "TTS From Scratch"
part: 1
---

The [codebook-as-contract](/posts/one-codebook-both-directions/) post ended on a tidy symmetry: the same 2000 frozen units that a recognizer *reads* into text, a synthesizer can *write* from text, and [the alignment diagonal comes back mirror-image](/posts/attention-writes-speech/). That symmetry is real, and it's a good place to start. But it hides the asymmetry that actually shapes every design decision downstream. This post is about that asymmetry, because once you feel it, the rest of the series is mostly consequences.

## Recognition subtracts; synthesis adds

Speech recognition is a **many-to-one** map. A thousand recordings of "cat" — different speakers, pitches, rooms — all have to land on the same three letters. The whole job is to *throw away* everything that isn't the message: the speaker, the prosody, the noise. Information goes *down*. That's why a tiny model can do it, and why rounding sound to a coarse alphabet *helps* — the coarseness is doing your job for you.

Synthesis is **one-to-many**, and it runs the other way. One string, "the cat sat," has a thousand valid spoken realizations. Fast or slow, bright or breathy, rising or falling. To speak, the model has to *manufacture* all the detail the recognizer was allowed to discard. Information goes *up*.

This isn't a slogan; it's the source of the central difficulty. When a task has many correct answers and you train a model to minimize average error, the safest prediction is the **average of all the correct answers** — and the average of a thousand voices is not a voice. It's a mumble. Regression-to-the-mean is the default failure mode of generation, and everything careful in TTS is, in some sense, a trick to avoid predicting the average.

## The three jobs hiding inside "say this sentence"

Reading was almost one job — map units to letters. Writing is at least three, tangled together:

1. **Content.** Which sounds, in which order? This is the part that most resembles the recognizer running backwards, and it's the part text actually determines.
2. **Duration and alignment.** How *long* is each sound, and which stretch of audio belongs to which letter? In recognition this was handed to you — the audio was already as long as it was. In synthesis you have to invent it. The good news, from [watching attention write speech](/posts/attention-writes-speech/): the alignment diagonal's *slope* is a duration model you get for free — a long vowel owns more output frames, a quick consonant fewer.
3. **Acoustic detail.** The exact timbre, breathiness, the micro-texture that makes it a *voice* and not a buzzer. Text says almost nothing about this. It's the part with the most entropy and the least guidance.

Keep these three separate in your head, because the through-line of this whole series is: **content is easy and text-determined; acoustic detail is hard and text-underdetermined; and the smartest thing you can do is stop asking one model to do both at once.** We'll get there in [part 4](/posts/tts-say-it-then-voice-it/).

## Why "predict the discrete thing" is the escape hatch

If regressing the average is the trap, the escape is to **predict discretely and sample**. Instead of asking "what is the waveform" (and getting the mean), you ask "which of these N sound-tokens comes next" and *sample* one from the distribution. Sampling picks *a* valid realization instead of averaging all of them. This is the same reason [we predict a cluster id and sample the softmax rather than regress the centroid](/posts/hand-off-the-vector/): the map from text to sound is one-to-many, and a discrete choice is how you commit to one branch of it.

So the shape of every system in this series is the same:

```
text → [predict a sequence of discrete sound-tokens] → [turn tokens back into a waveform]
```

Two questions fall out of that shape, and they organize the rest of the series:

- **What are the tokens?** What discrete alphabet should a voice be made of — and is the alphabet that's good for *reading* also good for *writing*? That's [the next post](/posts/tts-what-is-a-voice-made-of/).
- **How do you predict them?** When the tokens are rich enough to carry a real voice, predicting them from text turns out to be startlingly hard — hard enough to need a different plan than "one model, straight through." That's [the wall](/posts/tts-the-wall/), and then the way around it.

The symmetry — read the alphabet, write the alphabet — is the frame. The asymmetry — subtracting versus adding — is why writing needs machinery reading never did.

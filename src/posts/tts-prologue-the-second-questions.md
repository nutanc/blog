---
layout: post.njk
title: "Prologue: The second set of questions"
date: 2026-08-09
permalink: /posts/tts-prologue-the-second-questions/
series: "TTS From Scratch"
part: 0
---

The [first series](/posts/prologue-the-questions/) asked what it means for a machine to *hear* — to take pressure changes in the air and turn them into words. This one asks the opposite: what does it mean for a machine to *speak*? To start with words and end with a voice?

They sound like the same problem run backwards, and for a while I assumed they were. They are not. Reading and writing speech are asymmetric in a way that took me a whole rebuild to feel, and most of the interesting decisions in this series come from that asymmetry. So, as before, here are the questions — in roughly the order they stopped seeming obvious.

## What are you even producing?

When you decide to say "the cat sat," what is the thing your brain hands to your mouth? Words? Sounds? A plan for how long each sound should last? If I want a machine to speak, do I make it draw a waveform sample by sample — 24,000 numbers a second — or is there a smaller, smarter thing to predict? Is a voice a signal, or a sequence of decisions that *become* a signal?

## Why is saying harder than hearing?

Recognition throws information away: a hundred waveforms for "cat" all collapse to three letters. Generation has to *add* it back — one text, but a thousand valid ways to say it, each with its own pitch, pace, breath. When there are many right answers, what does it even mean to "predict the answer"? If I train a model to guess the average of all the ways to say a word, what do I get — and why does it come out as a blurry mumble?

## What is a unit, when you're the one making it?

The recognizer got to *round* sound to a clean alphabet and call the leftovers noise. The speaker can't. The leftovers — the exact timbre, the breathiness, the room — are the difference between a voice and a robot. So is the alphabet that's good for reading also good for writing? Or does writing need a richer one? And if it needs a richer alphabet, does that make the prediction harder — trading a voice you can *hear* for a voice you can't *predict*?

## Where does time come from?

Reading, the durations were handed to me — the audio was already as long as it was. Speaking, I have to *invent* them. How long is the "ee" in "speech"? Who decides that a comma is worth 200 milliseconds of silence? Is timing a separate thing I have to model, or does it fall out of everything else for free?

## Can you split a hard job into two easy ones?

Saying a sentence is at least two jobs: deciding *what sounds* to make (the content, aligned to the words) and deciding *exactly how they sound* (the timbre, the texture). Are those one problem or two? If I make one model do both at once, does it do neither well? And if I split them — a model to say it and a model to voice it — where exactly is the seam, and what crosses it?

## What can you learn without a teacher?

Transcribed speech is expensive; you need someone to write down what was said. But raw *audio* — hours of a voice with no transcript — is almost free. Is there a version of "learning to speak" where the hard, data-hungry part needs transcripts and the rest can feast on untranscribed sound? If so, that changes who can build a voice, and in what language.

## Whose voice, and in what accent?

Everything above gets sharper when the target isn't a US audiobook narrator but Indian English — an accent with little clean paired data. If the machinery is accent-blind, the accent is just data. If it isn't, no amount of cleverness saves you. Which parts of a speaker survive being turned into tokens, and which parts are lost the moment you quantize?

---

*The rest of the series answers these by building a text-to-speech system on top of [the ASR codebook work](/posts/one-codebook-both-directions/) and then, when that hits a wall, on top of a very different kind of token. Where an answer surprised me, it's because it contradicted what I assumed when I asked the question — usually the assumption that speaking is just hearing in reverse.*

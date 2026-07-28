---
layout: post.njk
title: "Prologue: The Questions"
date: 2026-07-19
permalink: /posts/prologue-the-questions/
series: "ASR From Scratch"
part: 0
---

Before the experiments, the questions. This whole series is really just a long attempt to
answer them by building a speech recognizer from scratch and watching what breaks. Here
they are, unanswered, in roughly the order they stopped seeming obvious.

## What is speech recognition, actually?

When you hear a sentence, where does the *meaning* live — in the air, in your ear, or in
your head? If I record you saying "the cat sat," what exactly do I have: a picture of the
words, or just pressure changes over time? Is turning that into text *reading* the sound,
or *guessing* it? If two people say the same word and the waveforms look nothing alike,
what is it that's "the same"? When a machine gets it right, has it *understood* anything,
or only matched patterns? And if it's only matching — are you sure you're doing more?

## What is a sound, to a machine?

How do you feed *time* to a model that only sees numbers? Is a vowel a thing, or an
interval? Where does one sound end and the next begin — is there a seam, or does it all
blur? Why can you hear the /t/ in "stop" even though, physically, it's mostly silence?
If speech is continuous, why do we insist it's made of discrete pieces? Are those pieces
*in* the signal, or are they a story we tell about it?

## How does anyone learn to hear?

A baby isn't given phonemes; how does it discover them? What tells you that "cat" and
"cot" are different words but "cat" said loudly and softly is the *same* word? How do you
learn to throw away everything that doesn't matter — the speaker, the pitch, the room —
and keep the sliver that does? Is that what "learning acoustic features" means: learning
what to ignore? And can a machine learn it the way you did — by *predicting* what it
can't yet hear?

## What is a unit?

If I want to reduce all of English speech to a small alphabet of sounds, how many letters
should it have — 40? 500? 3,000? Who decides? When I round a smooth sound to the nearest
"unit," what did I just throw away — and can I ever get it back? Is a cleaner alphabet
always a better one, or can making the pieces *purer* make the message *worse*?

## What is spelling, and why is it like this?

Why is the /k/ sound in "cat" a C but in "kite" a K? If the sound is identical, what tells
you which letter to write — the sound, or the word? Is spelling a property of speech at
all, or a separate, arbitrary code bolted on top? When a recognizer writes "KALIKO" as
"CALICO," did it *mishear*, or did it *hear correctly and misspell*? Are those even the
same kind of mistake? And where does a word *end* — how do you know "less interesting" is
two words when the sound is one unbroken stream?

## How much of the past do you need?

To write down the word you're hearing right now, how far back do you need to remember? The
last sound? The last word? The whole sentence? The topic of the conversation? Is speech
more like reading a book — where the beginning shapes the end — or more like walking,
where you mostly just need your last step? If a model needed almost no memory to
transcribe, what would that tell you about speech itself?

## Why do we mishear?

Why are some sounds impossible to tell apart — "caught" and "cot," "bit" and "bid" — even
for a careful human ear? If the difference isn't reliably *in* the sound, where do you get
it from? Is "hearing the right word" ever really about hearing, or is it about *knowing
what word could go there*? When you resolve an ambiguous sound from context, are you
recognizing speech — or predicting language? And is there a floor below which no amount of
listening helps, because the information was never there to begin with?

## What is the smallest thing that could do this?

Does turning sound into text require having read the internet? Or could something tiny —
smaller than a photo on your phone — do it, if it only learned the *right* things? How
little supervision is enough: full transcripts, just the sounds, or nothing but the
audio? And if a small model *can* do it, what does that say about how much of "language"
is actually needed to *transcribe* it — versus to *understand* it?

---

*The rest of the series tries to answer these by building the thing. Where a question has
a surprising answer, that answer usually contradicted what I assumed when I asked it.*

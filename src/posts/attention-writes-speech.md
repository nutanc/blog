---
layout: post.njk
title: "Watching attention write speech: the cluster diagonal, in reverse"
date: 2026-08-06
permalink: /posts/attention-writes-speech/
---

In [the last post](/posts/cluster-attention-maps/) a transformer *read* speech: it took the sequence of 2000-way cluster ids — the frozen "phonetic alphabet" from the [codebook ASR experiment](/posts/speech-as-independent-parts/) — and translated it to text, and its cross-attention fell into a clean monotonic diagonal you could read off the axes. Cluster 630 spelled the *I* in "quilter"; cluster 953 spelled the *E*.

So I ran it backwards. If reading the codebook is translation, then *writing* it is translation the other way: text in, cluster ids out. Same frozen codebook — not retrained, not even re-fit — but now it's the **target** alphabet instead of the source. Feed the units to a small single-speaker vocoder and you have text-to-speech built on the exact same 2000 points. The question that carried over: does the diagonal come back, mirror-image?

The answer is yes. And then the diagonal lies to you, which turns out to be the more interesting half of the story.

## The setup

Another small from-scratch encoder-decoder, pointed the other way. The encoder reads the text; an autoregressive decoder emits cluster ids, one per 20 ms frame, which the codebook turns back into HuBERT-space vectors for the vocoder. A guided-attention penalty (the Tacotron-2 trick — punish attention mass far from the diagonal) nudges the alignment, though it forms without much nudging. Trained on LJSpeech, greedy decoding.

One difference from the ASR direction matters for the pictures. For recognition the units were *deduplicated* — repeats collapsed, because duration is noise when all you want is the letters. For synthesis you keep every frame, because duration **is** the signal. So where the ASR diagonal was roughly square, this one is tall.

## The diagonal, reversed

Here is the cross-attention forming over training — step 1, step 2000, step 8000 — on a held-out sentence. Columns are the input text; rows are the emitted unit frames, top to bottom in time.

![Three cross-attention heatmaps side by side. At step 1 the attention is diffuse noise. By step 2000 a clean diagonal has appeared running top-left to bottom-right. By step 8000 it is a crisp monotonic band with almost no off-diagonal mass.](/img/attn/tts-diagonal-progression.png)

Same phenomenon as before, axes swapped. Each output frame attends to a tight band of text at the matching position, and the band sweeps from the first character to the last. Nobody specified this alignment; it fell out of learning to write.

The tell is the **slope**. It isn't 45°: roughly a hundred input characters map to a few hundred output frames, so each character owns three-ish frames on average — and the local slope wobbles, steep on a long vowel, shallow on a quick consonant. That slope *is* the duration model. In the ASR direction the diagonal told you *what* was said; here the very same picture, tilted, also tells you *how long* — the prosody is in the gradient.

## Up close: one word, frame by frame

Zoom into a single word and the mechanism — and the duration — become legible. Here is the attention for **agents** (phonemes `EY JH AH N T S`) from the working phoneme model, cropped to just those inputs; each row is one 20 ms output frame, and the star marks its argmax phoneme.

![Zoomed attention for the word 'agents': a staircase where each phoneme owns a vertical run of output frames — EY six frames, JH eight, S five — while AH gets one and T gets none, the stars stepping down and to the right.](/img/attn/tts-staircase.png)

| phoneme | output frames | peak |
|---|---|---|
| EY (stressed) | 6 | 0.91 |
| JH | 8 | 0.86 |
| AH (unstressed) | 1 | 0.38 |
| N | 3 | 0.74 |
| T | **0** | 0.22 |
| S | 5 | 0.62 |

It's the ASR staircase stood on its end. There, each output *character* peaked on one input cluster; here each input *phoneme* owns a vertical run of output frames, and the length of that run is the duration the model chose. The stressed vowel **EY** holds for six frames and the fricative **S** for five, while the unstressed **AH** gets a single frame and the **T** — the barely-articulated /t/ in "agents" — gets *none*, folded into its neighbours exactly as a fast talker would drop it. The reading direction showed you *which cluster spells a sound*; the writing direction shows you that, plus *how long to dwell on it*. The duration model was never a separate module; it's the height of each step.

## Where the diagonal lies

Everything above is from a model whose input is raw characters. Its diagonal is gorgeous. It is also, on text it has never seen, almost entirely wrong.

Play the held-out audio and you get confident, correctly-timed, fluent-sounding speech saying *different words than the text asked for*. The attention is pointing at the right place in the input the whole time; the model just emits the wrong clusters when it gets there. A clean diagonal certifies **where** the model is looking. It certifies nothing about **what** it writes.

This is the same trap as the ByT5 failure from the reading post, wearing the opposite costume. There, a strong text prior let the decoder ignore the audio and hallucinate fluent English. Here, a model with only ~a thousand training utterances and raw-character input memorised English *spelling* — it learned to march across the letters on schedule without learning what sound each letter should become — and on new text it marches just as confidently into nonsense. Alignment without grounding, twice.

Two things fixed the content, neither of which touched the diagonal (it stayed diagonal throughout):

- **Phonemes instead of characters.** English spelling is a cruel intermediate — the same letters make different sounds, so a character model is rewarded for memorising words. Running the text through grapheme-to-phoneme first hands the model something already close to the acoustic units, and it starts *generalising* instead of remembering.
- **All of the data.** A thousand utterances is enough to memorise and enough to draw a diagonal; it is not enough to learn a language. On the full corpus the cross-entropy settles at a value that is comfortably *above* the memorising model's — which is exactly right. Genuine text-to-unit is uncertain (many unit sequences say the same sentence); a loss that collapses toward zero is the sound of overfitting, not of learning.

With both, held-out synthesis crosses over from wrong words to mostly-right words. Still imperfect — a small model, greedy decoding — but grounded.

A closing caution on metrics, since the diagonal already burned us once. The obvious score — how often the generated cluster matches the reference recording's cluster, frame for frame — is nearly useless here. A correct synthesiser produces a *different valid rendition* of the sentence; one frame of duration drift and the two sequences slide out of alignment and the number craters, even when the words are perfect. It reads near-zero for a good model and 0.96 for the memorising one. Same lesson as the diagonal, in a different disguise: the comforting number and the correct model are not the same thing.

## Why this is worth looking at

The reading post made the case that a discrete codebook turns a recognizer into a *system of inspectable parts*. The writing direction makes the same case and then adds the fine print. The alignment is still a picture you can read off the axes — now with duration legible in its slope — which is a real gift for debugging. But a beautiful diagonal is a **health check, not a proof**: necessary, not sufficient. It tells you the attention is aligned; it will happily coexist with a model that is aligned and wrong.

The part I keep coming back to is the symmetry. One set of 2000 points, fit once, never touched again — read left-to-right it recognises speech, written top-to-bottom it synthesises it, and the same diagonal supervises both directions. The codebook really is behaving like an alphabet: something you can spell *out of* and *into*.

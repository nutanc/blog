---
layout: post.njk
title: "The Feminine Switch That Doesn't Know Whom It Is For"
date: 2026-11-05
permalink: /posts/gender-neurons/
---

**TL;DR.** English *"I am waiting for my refund"* says nothing about the speaker; Hindi must choose — *मैं इंतज़ार कर **रहा** हूँ* (a man) or
*कर **रही** हूँ* (a woman). Our 4B translator always chooses the man. We looked for the part of the model that holds the choice and found
it: a small set of neurons and a single direction that turn feminine agreement on, which random neurons of the same size cannot do.
**But the switch does not know whom it is for.** Turned on, it makes the speaker feminine 90–97% of the time — and also the parcel, the
pipe and the customer-service agent being addressed, in a fifth to a third of all sentences. A one-line note in the prompt, *"the speaker
is a woman"*, flips the speaker 93% of the time and touches anything else 3% of the time. The model has a shared "feminine" feature;
*who* it belongs to is information that only the input can carry.

This follows [The Register Dial](/posts/register-neurons/), where 256 neurons moved the same model between pure Hindi
and Hinglish. Gender looked like the same kind of habit. It is half of one.

---

## Background

In Hindi, verbs, adjectives and possessives agree in gender. In the first person that means the speaker's gender is written into almost
every sentence: *करता / करती हूँ*, *गया / गई था*, *सकता / सकती हूँ*. For a call-centre translator this is not cosmetic — a customer who is a
woman, translated as a man in every sentence, notices. English gives the model nothing to go on; the information has to come from
outside the sentence.

We used the deployed 4B translator (a fine-tuned Gemma-4-E4B), the 143 first-person sentences of our 300-sentence conversational
benchmark, and 339 other first-person sentences to find the neurons. The notes format the model was trained to read carries the
instruction when we give one: *"The speaker is a WOMAN: use feminine first-person forms for her (मैं करती हूँ, मैं गई थी …)"*.

**The measurement matters here, and our first one was wrong.** Counting any feminine verb in a sentence that contains *मैं* or *मुझे*
counts feminised *nouns* as speaker flips. The clean test uses the one form only the speaker can take: a verb right before **हूँ**
("am"), which in Hindi belongs to *I* alone. 30 of the model's 143 outputs carry such a form; those are the test set for the speaker.
Everything that turns feminine elsewhere we count as collateral.

---

## Experiment 1: What does the model do by default?

**It speaks as a man, always.** All 30 first-person *हूँ* forms are masculine: *इंतज़ार कर रहा हूँ*, *डिस्काउंट चाहता हूँ*, *माफ़ी चाहता हूँ*.
Nothing in the English could tell it otherwise, and its training data defaulted to the masculine.

## Experiment 2: Is gender a shared state?

We used two contrasts, as for register:

- **Prompt contrast**: the same English with a woman-note versus a man-note, read at the moment before the model writes its first word.
- **Output contrast**: the model's own feminine and masculine translations of the same sentence, fed back in as answers.

**The difference points the same way across sentences** — mean pairwise cosine 0.80 at layer 12 for the output contrast and 0.73 at layer
16 for the prompt contrast, and the two contrasts agree more with depth (cosine 0.53 at layer 32). By that measure this is the most
uniform state we have found in either model; repetition in the story writer was 0.65, register 0.10–0.25.

One caution we wrote down at the time: both contrasts carry built-in sameness. The note text is identical across sentences, and
feminine forms always differ from masculine ones by the same endings. Consistency alone could not settle it; steering had to.

## Experiment 3: Turning it on

With no note, we shifted the 256 neurons that separate the genders most strongly in *both* contrasts, or added the layer-12 direction,
and translated the 143 sentences again.

| arm | speaker forms feminine (of 30) | other words turned feminine (of 143 sentences) |
|---|---|---|
| unedited | 0% | 0% |
| note: "the speaker is a woman" | **93%** | **3%** |
| gender direction, ×2 | 97% | 20% |
| 256 gender neurons, ×2 | 90% | 31% |
| 1,024 gender neurons, ×2 | 90% | 36% |
| 256 random neurons, same layers and shift sizes | 0% | 0% |

**The feature is real and specific**: the gender neurons flip the speaker 90% of the time, random neurons never do. **But it leaks**: in a
fifth to a third of all sentences something other than the speaker turns feminine as well. The note does the job almost perfectly and
touches nothing else.

## Experiment 4: What the switch does

The clean cases look exactly like a woman speaking. Unedited first, then the 256-neuron edit:

> **EN** — I am not happy with this service because I have been waiting for a refund for three days now.
> **Unedited** — मैं इस सर्विस से खुश नहीं हूँ क्योंकि मैं तीन दिन से रिफंड का इंतज़ार कर **रहा** हूँ।
> **Neurons** — मैं इस सर्विस से खुश नहीं हूँ क्योंकि मैं तीन दिन से रिफंड का इंतज़ार कर **रही** हूँ।

> **EN** — Since the AC has been broken since check-in, I expect a discount of at least 500 rupees on my final bill.
> **Unedited** — चूंकि चेक-इन से ही एसी खराब है, इसलिए मैं अपने फाइनल बिल पर कम से कम 500 रुपये का डिस्काउंट **चाहता** हूँ।
> **Neurons** — चेक-इन से ही एसी खराब है, तो मैं अपने फाइनल बिल पर कम से कम 500 रुपये का डिस्काउंट **चाहती** हूँ।

> **EN** — Please wait for a while while I check the details in our system.
> **Unedited** — कृपया थोड़ी देर रुकिए जब तक मैं हमारे सिस्टम में डिटेल्स चेक **करता** हूँ।
> **Neurons** — कृपया थोड़ी देर रुकिए जब तक मैं हमारे सिस्टम में डिटेल्स चेक **करती** हूँ।

> **EN** — I am sorry for the inconvenience caused by the repeated delay.
> **Unedited** — बार-बार होने वाली देरी की वजह से हुई असुविधा के लिए मैं माफ़ी **चाहता** हूँ।
> **Neurons** — बार-बार होने वाली देरी की वजह से हुई असुविधा के लिए मैं माफ़ी **चाहती** हूँ।

## Experiment 5: What else it does

**The same switch feminises things that are not the speaker.** The parcel, the pipe and the email change gender:

> **EN** — I received the parcel today, but the screen has a small scratch on it.
> **Unedited** — मुझे आज पार्सल **मिला**, लेकिन स्क्रीन पर एक छोटा सा स्क्रैच है।
> **Neurons** — मुझे आज पार्सल **मिली**, लेकिन स्क्रीन पर एक छोटा सा स्क्रैच है।

> **EN** — I am really sorry for the delay, but the main pipe has burst near the main road.
> **Unedited** — …लेकिन मेन रोड के पास मेन पाइप फट **गया** है।
> **Neurons** — …लेकिन मेन रोड के पास मेन पाइप फट **गई** है।

> **EN** — I don't want a repair; I want a full replacement because it's brand new.
> **Unedited** — मुझे रिपेयर नहीं चाहिए; मुझे पूरा रिप्लेसमेंट चाहिए क्योंकि यह बिल्कुल **नया** है।
> **Neurons** — मुझे रिपेयर नहीं चाहिए; मुझे पूरा रिप्लेसमेंट चाहिए क्योंकि यह बिल्कुल **नई** है।

Sometimes it rewrites the sentence to find something feminine to agree with — *प्रोडक्ट* (m) becomes *चीज़* (f):

> **EN** — I don't want to pay anything extra for a product that is less than a year old.
> **Unedited** — मैं एक साल से भी कम **पुराने प्रोडक्ट** के लिए कुछ भी एक्स्ट्रा नहीं देना चाहता।
> **Neurons** — मैं एक साल से भी कम **पुरानी चीज़** के लिए कुछ भी एक्स्ट्रा नहीं देना चाहती।

**And it changes the person being spoken to.** In 23 sentences the customer-service agent addressed as *आप* became a woman:

> **EN** — Could you please share your order ID so I can check the status in our system?
> **Unedited** — क्या आप अपनी ऑर्डर आईडी शेयर कर **सकते** हैं ताकि मैं हमारे सिस्टम में स्टेटस चेक कर सकूँ?
> **Neurons** — क्या आप अपनी ऑर्डर आईडी शेयर कर **सकती** हैं ताकि मैं हमारे सिस्टम में स्टेटस चेक कर सकूँ?

> **EN** — Can you please check if my washing machine is still under warranty?
> **Unedited** — क्या आप प्लीज चेक कर **सकते** हैं कि मेरी वॉशिंग मशीन अभी भी वारंटी में है?
> **Neurons** — क्या आप प्लीज चेक कर **सकती** हैं कि मेरी वॉशिंग मशीन अभी भी वारंटी में है?

The note, given the same sentences, changes none of these. It flips *रहा हूँ → रही हूँ* and leaves the parcel, the pipe and the agent alone.

---

## What we take away

**A feature is not a fact.** The neurons hold "feminine" — a feature that the model's agreement machinery reads wherever it is deciding
an ending. Turning the feature on makes the endings feminine, and the model cannot tell which endings were meant. *Which person is a
woman* is a different kind of thing: a fact about this conversation, bound to one participant. The note states the fact; the edit only
supplies the feature.

**This fits the line our three studies keep drawing.** Repetition in the story writer and register in this translator are the same in
every sentence, and a constant edit could set them. Meaning errors in translation differ in every sentence, and no edit moved them.
Gender sits between the two: the *feature* is shared and has neurons; the *binding* — speaker, listener, parcel — is per-sentence, and
belongs in the input.

**For a product, the answer is metadata.** A call-centre system usually knows the speaker's gender, or can ask once per call. Passing it
as a note gets 93% of the speaker forms right at almost no collateral cost, and it can name the listener separately. A weight or
activation edit would need a feature that is *already bound* — a direction found by varying only the speaker while the listener stays
fixed — and we have not found one yet.

## Limitations

- **The clean test set is small**: 30 sentences carry a first-person *हूँ* form; past-tense forms (*मैं गई थी*) and sentences that do not
  carry the speaker's gender were excluded from the speaker score.
- **Gender is measured by a pattern over common verb stems**, checked by hand on examples; nouns whose gender genuinely varies in use
  (*ट्रांजैक्शन*, *ऐप*) make some collateral flips arguable.
- **No judge pass on meaning.** We did not run the 31B judge here; the examples show meaning preserved, but that is a reading, not a count.
- **One setting per arm**, at inference time, on one fine-tuned model.
- **We first reported the opposite.** A looser count — any feminine verb in a sentence containing *मैं* — had the neurons beating the note
  (43% versus 22%). It counted the parcel and the agent as the speaker. The table above is the corrected measurement.

---
layout: post.njk
title: "Every call has an interval"
date: 2026-10-08
permalink: /posts/the-shape-of-a-call/
---

<style>
/* charts use fixed light-theme colours; keep them on a light card in every theme so they stay legible in dark mode */
.post-body figure.chart{background:#faf8f3;border:1px solid #e4e0d6;border-radius:4px;padding:10px 12px;margin:1.5rem 0;overflow-x:auto}
</style>

Every Indian movie has an interval. The lights come up at the moment of maximum trouble: the hero has just found out, the villain has just won the round, somebody is on a train that is leaving. You go and buy popcorn knowing that the second half will have to fix all of this.

A customer-service call has one too. Nobody sells popcorn, but there is a moment, usually early, when the call stops being about the problem and starts being about the call itself. Before it, the customer is explaining and the agent is looking things up. After it, the customer is repeating and the agent is defending. If you could spot that moment while it was happening, you could do something about it.

[Last time](/posts/the-shape-of-a-story/) we taught a computer to read stories the way a careful reader does, with a notebook, and the shapes your English teacher drew on the chalkboard fell out of 625 real stories and 1,200 screenplays. This post is about what happened when we pointed the same reader at 668 real calls to a TV company's helpline, mostly in Hindi, transcribed by a speech recogniser that is not always sure what it heard.

Short version: calls have shapes, the shapes have an interval, and the reader can tell you how the film ends from the first half.

## Thirteen dials, re-labelled for the call centre

The reader scores thirteen dials at every step of a text. For a story they are things like *how well are things going for the hero*, *how tense is this*, *is the central problem resolved yet*. For a call we kept the same thirteen and rewrote the questions, with the customer as the hero:

| the dial | what it asks about a call |
|---|---|
| fortune | is the customer getting what they called for |
| tension | friction between customer and agent |
| stakes | what is on the line: money, a dead TV, a wasted afternoon, a cancelled subscription |
| emotion | how hot the customer is running |
| resolution | is the reason for the call settled yet |
| new information | did something come out in this part: a cause, a fact, an offer |
| misunderstanding | are the two sides talking past each other |
| open question | is the cause of the problem still unknown |
| new participant | a transfer, a supervisor, a family member grabbing the phone |
| phase change | verification, diagnosis, a sales pitch, the wrap-up |
| agency | is the customer driving the call or at the mercy of process and policy |
| pressure | how hard policy, holds and cost push back against what the customer wants |
| fairness | is the customer being treated fairly |

The reader works the way it did for stories. It gets the call in eight parts, cut at turn boundaries so nobody is interrupted mid-sentence. At each part it sees two things: its own notes on the call so far, which it wrote itself a moment ago, and the new part. It returns the thirteen dials and a fresh set of notes. It never sees the whole transcript at once, and it does not need to, because the notes carry the plot.

The notes are a bonus product. Each one is a sixty-word synopsis in plain English of a call that happened in Hindi, Kannada or Odia: who called, why, what has been tried, what the customer thinks of it so far. A quality-assurance lead can read eight of them in a minute.

## Act one, the interval, act three

Here is the average call, split by how the company's own system later labelled it. The line is the *fortune* dial: how well things are going for the customer.

<figure class="chart"><svg viewBox="0 0 720 300" role="img" aria-label="How well things are going for the customer, by how the call was labelled afterwards" style="width:100%;height:auto;font-family:system-ui,sans-serif">
<text x="40" y="16" font-size="13" font-weight="600" fill="#444">How well things are going for the customer, by how the call was labelled afterwards</text>
<line x1="40" x2="550" y1="256.0" y2="256.0" stroke="#e4e0d6"/>
<line x1="40" x2="550" y1="142.0" y2="142.0" stroke="#e4e0d6"/>
<line x1="40" x2="550" y1="28.0" y2="28.0" stroke="#e4e0d6"/>
<text x="34" y="32.0" font-size="11" fill="#777" text-anchor="end">going well</text><text x="34" y="260.0" font-size="11" fill="#777" text-anchor="end">going badly</text>
<text x="40" y="288" font-size="11" fill="#777">start of call</text><text x="550" y="288" font-size="11" fill="#777" text-anchor="end">end of call</text>
<polyline points="40.0,177.3 112.9,174.8 185.7,182.6 258.6,174.8 331.4,174.8 404.3,166.9 477.1,132.9 550.0,72.5" fill="none" stroke="#2e6b3a" stroke-width="2.4"/>
<text x="558" y="76.5" font-size="12" font-weight="600" fill="#2e6b3a">improved (n=29)</text>
<polyline points="40.0,169.6 112.9,169.4 185.7,172.3 258.6,172.1 331.4,166.4 404.3,162.1 477.1,149.1 550.0,111.4" fill="none" stroke="#b07a1a" stroke-width="2.4"/>
<text x="558" y="115.4" font-size="12" font-weight="600" fill="#b07a1a">no shift (n=466)</text>
<polyline points="40.0,173.0 112.9,181.2 185.7,190.6 258.6,197.2 331.4,199.9 404.3,204.2 477.1,211.3 550.0,207.4" fill="none" stroke="#b33a2b" stroke-width="2.4"/>
<text x="558" y="211.4" font-size="12" font-weight="600" fill="#b33a2b">worsened (n=172)</text>
</svg></figure>

Three things to see. Calls that ended well do not start well: they start exactly where the others do and climb late, in the last two parts, when the fix lands. Calls that got worse were falling from the second part and never came back. And the big middle group, the no-shift calls, has a quiet first half and a late lift: things get sorted, just not dramatically.

Now the interval. Put tension and resolution on the same chart.

<figure class="chart"><svg viewBox="0 0 720 300" role="img" aria-label="Tension vs resolution: the interval is where one overtakes the other" style="width:100%;height:auto;font-family:system-ui,sans-serif">
<text x="40" y="16" font-size="13" font-weight="600" fill="#444">Tension vs resolution: the interval is where one overtakes the other</text>
<line x1="40" x2="550" y1="256.0" y2="256.0" stroke="#e4e0d6"/>
<line x1="40" x2="550" y1="142.0" y2="142.0" stroke="#e4e0d6"/>
<line x1="40" x2="550" y1="28.0" y2="28.0" stroke="#e4e0d6"/>
<text x="34" y="32.0" font-size="11" fill="#777" text-anchor="end">high</text><text x="34" y="260.0" font-size="11" fill="#777" text-anchor="end">low</text>
<text x="40" y="288" font-size="11" fill="#777">start of call</text><text x="550" y="288" font-size="11" fill="#777" text-anchor="end">end of call</text>
<polyline points="40.0,192.4 112.9,167.5 185.7,148.2 258.6,128.3 331.4,116.9 404.3,102.8 477.1,91.2 550.0,101.9" fill="none" stroke="#1e1b16" stroke-width="2.4"/>
<text x="558" y="105.9" font-size="12" font-weight="600" fill="#1e1b16">tension, worsened</text>
<polyline points="40.0,249.8 112.9,235.3 185.7,224.1 258.6,224.5 331.4,219.7 404.3,216.3 477.1,218.8 550.0,204.2" fill="none" stroke="#2e6b3a" stroke-width="2.4"/>
<text x="558" y="208.2" font-size="12" font-weight="600" fill="#2e6b3a">resolution, worsened</text>
<polyline points="40.0,195.8 112.9,174.8 185.7,151.1 258.6,159.1 331.4,151.1 404.3,161.6 477.1,177.3 550.0,232.5" fill="none" stroke="#1e1b16" stroke-width="2.4" stroke-dasharray="5 4"/>
<text x="558" y="236.5" font-size="12" font-weight="600" fill="#1e1b16">tension, improved</text>
<polyline points="40.0,248.2 112.9,235.0 185.7,214.0 258.6,190.6 331.4,190.6 404.3,187.8 477.1,145.9 550.0,64.7" fill="none" stroke="#2e6b3a" stroke-width="2.4" stroke-dasharray="5 4"/>
<text x="558" y="68.7" font-size="12" font-weight="600" fill="#2e6b3a">resolution, improved</text>
</svg></figure>

In a call that goes well, resolution climbs and tension never gets above it. In a call that goes badly the two lines cross early and stay crossed: tension overtakes resolution and resolution flat-lines. We called that crossing the **turning point**, and it is the call's interval. It exists in 73% of the calls that got worse and in only 22% of the rest. Among the calls that got worse, half of them turn at **part two of eight**. Three quarters turn before the midpoint.

That is the number to remember. The second half of a bad call is not where it goes bad. It is where it stays bad.

## The four shapes of a call

Vonnegut said stories come in a handful of shapes. We asked the same of calls, by clustering the fortune line, and four came out.

<figure class="chart"><svg viewBox="0 0 720 300" role="img" aria-label="The four shapes of a call (fortune, centred)" style="width:100%;height:auto;font-family:system-ui,sans-serif">
<text x="40" y="16" font-size="13" font-weight="600" fill="#444">The four shapes of a call (fortune, centred)</text>
<line x1="40" x2="550" y1="256.0" y2="256.0" stroke="#e4e0d6"/>
<line x1="40" x2="550" y1="142.0" y2="142.0" stroke="#e4e0d6"/>
<line x1="40" x2="550" y1="28.0" y2="28.0" stroke="#e4e0d6"/>
<text x="34" y="32.0" font-size="11" fill="#777" text-anchor="end">up</text><text x="34" y="260.0" font-size="11" fill="#777" text-anchor="end">down</text>
<text x="40" y="288" font-size="11" fill="#777">start of call</text><text x="550" y="288" font-size="11" fill="#777" text-anchor="end">end of call</text>
<polyline points="40.0,184.0 112.9,183.5 185.7,181.0 258.6,165.9 331.4,150.9 404.3,127.0 477.1,88.4 550.0,55.4" fill="none" stroke="#2e6b3a" stroke-width="2.4"/>
<text x="558" y="59.4" font-size="12" font-weight="600" fill="#2e6b3a">late rise — 5% worsened</text>
<polyline points="40.0,133.6 112.9,135.8 185.7,146.1 258.6,165.0 331.4,172.3 404.3,170.0 477.1,147.5 550.0,65.8" fill="none" stroke="#1f5f6b" stroke-width="2.4"/>
<text x="558" y="74.4" font-size="12" font-weight="600" fill="#1f5f6b">dip then recover — 16% worsened</text>
<polyline points="40.0,159.3 112.9,158.6 185.7,157.0 258.6,139.3 331.4,117.4 404.3,122.2 477.1,145.2 550.0,137.0" fill="none" stroke="#b07a1a" stroke-width="2.4"/>
<text x="558" y="141.0" font-size="12" font-weight="600" fill="#b07a1a">flat / late lift — 29% worsened</text>
<polyline points="40.0,104.6 112.9,110.3 185.7,121.5 258.6,136.1 331.4,148.2 404.3,163.2 477.1,174.8 550.0,177.3" fill="none" stroke="#b33a2b" stroke-width="2.4"/>
<text x="558" y="181.3" font-size="12" font-weight="600" fill="#b33a2b">slow fall — 53% worsened</text>
</svg></figure>

- **Late rise.** Nothing happens for a while, then the fix lands and the customer leaves happy. 187 calls; 5% were labelled worsened, none were dropped, pressure low throughout. This is what a call is supposed to look like.
- **Dip then recover.** Vonnegut's *man in a hole*: the problem turns out to be worse than it sounded, then it gets solved. 164 calls, 16% worsened. Honest trouble, honestly fixed.
- **Flat, late lift.** The call that never quite gets going. 129 calls, 29% worsened.
- **Slow fall.** The tragedy. Starts fine, slides from part two, ends low. 188 calls, **53% labelled worsened, 59% ended frustrated, 9% ended with the customer hanging up unresolved**. Pressure averages 0.56 on a scale where the late-rise calls average 0.25. Nearly two thirds of these calls end with the problem still open.

The slow fall is the one to catch. It is also the easiest to catch early, because it starts falling early.

## Does the reader know how the film ends?

The company's system labels every call afterwards: did the customer's mood get worse, did the call end frustrated, did it drop unresolved. We never showed the reader those labels. We asked whether the thirteen lines, read along the call, predict them, and compared against two other readers: the switch metadata every call centre already has (duration, hold time, who hung up, interruption counts), and a reader *without* a notebook that just scores each part on its own.

| will this call… | metadata | reader without notebook | reader with notebook |
|---|---|---|---|
| get worse rather than better | 0.63 | 0.59 | **0.87** |
| end frustrated or angry | 0.69 | 0.65 | **0.83** |
| drop with the problem unresolved | 0.73 | 0.66 | **0.86** |
| be rated negative overall | 0.64 | 0.69 | **0.85** |

(Numbers are AUC: 0.5 is a coin toss, 1.0 is certainty. Five-fold cross-validated, same 668 calls for every column.)

The reader without a notebook, which is roughly what sentiment-of-the-last-utterance tools do, is no better than the switch. The reader with a notebook is a different instrument. And the single best predictor of a call going bad is not a clever combination; it is tension at the end of the call, on its own, at 0.91.

Now the question that matters for a live call: can you tell *before the end*?

<figure class="chart"><svg viewBox="0 0 720 300" role="img" aria-label="Can we tell, part by part, that this call will end badly? (AUC)" style="width:100%;height:auto;font-family:system-ui,sans-serif">
<text x="40" y="16" font-size="13" font-weight="600" fill="#444">Can we tell, part by part, that this call will end badly? (AUC)</text>
<line x1="40" x2="550" y1="256.0" y2="256.0" stroke="#e4e0d6"/>
<line x1="40" x2="550" y1="142.0" y2="142.0" stroke="#e4e0d6"/>
<line x1="40" x2="550" y1="28.0" y2="28.0" stroke="#e4e0d6"/>
<text x="34" y="32.0" font-size="11" fill="#777" text-anchor="end">1.0 certain</text><text x="34" y="260.0" font-size="11" fill="#777" text-anchor="end">0.5 coin toss</text>
<text x="40" y="288" font-size="11" fill="#777">after part 1</text><text x="550" y="288" font-size="11" fill="#777" text-anchor="end">after part 8</text>
<line x1="258.6" x2="258.6" y1="28" y2="256" stroke="#b33a2b" stroke-dasharray="4 3"/><text x="262.6" y="40" font-size="11" fill="#b33a2b">interval</text>
<polyline points="40.0,123.8 112.9,123.8 185.7,121.5 258.6,112.4 331.4,107.8 404.3,101.0 477.1,85.0 550.0,66.8" fill="none" stroke="#1f5f6b" stroke-width="2.4"/>
<text x="558" y="70.8" font-size="12" font-weight="600" fill="#1f5f6b">reader with a notebook</text>
<polyline points="40.0,128.3 112.9,130.6 185.7,135.2 258.6,139.7 331.4,130.6 404.3,126.0 477.1,121.5 550.0,110.1" fill="none" stroke="#b07a1a" stroke-width="2.4"/>
<text x="558" y="114.1" font-size="12" font-weight="600" fill="#b07a1a">reader without one</text>
<polyline points="40.0,142.0 112.9,142.0 185.7,142.0 258.6,142.0 331.4,142.0 404.3,142.0 477.1,142.0 550.0,142.0" fill="none" stroke="#999" stroke-width="2.4" stroke-dasharray="5 4"/>
<text x="558" y="146.0" font-size="12" font-weight="600" fill="#999">coin toss</text>
</svg></figure>

The notebook reader is at 0.63 by the interval, 0.68 at three quarters, 0.75 one part before the end. The reader without a notebook sits at the coin-toss line until the credits roll. Memory is the whole difference: you cannot see escalation building if you cannot remember where it started.

## A call, scene by scene

Here is a composite slow-fall call. The dials are the average of every slow-fall call that ended in an unresolved escalation (169 of them), rounded to thirds, so it is nobody's call in particular, but it is what dozens of them look like.

| dial | p1 | p2 | p3 | p4 | p5 | p6 | p7 | p8 |
|---|---|---|---|---|---|---|---|---|
| fortune | 0.33 | 0.33 | 0.33 | 0.33 | 0.33 | 0.00 | 0.00 | 0.00 |
| tension | 0.33 | 0.33 | 0.33 | 0.67 | 0.67 | 0.67 | 0.67 | 1.00 |
| pressure | 0.00 | 0.33 | 0.33 | 0.67 | 0.67 | 0.67 | 1.00 | 1.00 |
| resolution | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| mystery | 1.00 | 1.00 | 0.67 | 0.67 | 0.67 | 0.67 | 0.67 | 0.67 |
| agency | 0.67 | 0.33 | 0.33 | 0.33 | 0.33 | 0.33 | 0.00 | 0.00 |

And the kind of notes the reader writes along the way, in the same composite spirit:

> **Part 1.** Customer called about a charge they do not recognise on this month's recharge. Agent is verifying the account. Mood neutral.
> **Part 3.** The charge is still unexplained. Agent has moved to offering a longer, discounted plan. Customer is asking about prices but has not dropped the original question.
> **Part 6.** Agent reports the longer plan is now active and gives a reference number. Customer says they had not agreed to it. The original charge remains unexplained. Mood: confused, rising to angry.
> **Part 8.** Customer is demanding the plan be reversed and the first charge explained. Agent is quoting package prices. Nothing is resolved. Customer hung up.

The dials tell the same story with numbers: resolution never leaves zero, tension and pressure climb from part four and end at the top of the scale, agency falls to zero by part seven, and four rule-based flags fire: *unresolved escalation*, *policy or process obstacle*, *customer left powerless*, *ended, not solved*. The company's own label for that pattern of call was "Neutral → Frustrated/Angry, worsened". The reader got there without the label, and it can say *where* and *why*.

## What is process, and what is the agent

The most useful table in the whole exercise is the one by topic, because it separates two things that quality teams tend to blur.

Calls about **technical faults** (no signal, channels missing, the box says inactive, "I recharged and it still does not work") run at pressure 0.45 to 0.47 and end with resolution around 0.42 to 0.55. Their resolution line barely climbs until the last part. Between a fifth and a third of them get worse.

Calls that are **service requests** (upgrade my pack, add a channel, pause my account) run at pressure 0.15 to 0.36 and end with resolution 0.72 to 0.87. Eight to twenty percent get worse.

Same agents, same scripts, same day. The difference is whether the thing the customer wants is something the agent can actually do on the call. That is a process finding, not a coaching finding, and the *pressure* dial is how you see it: the calls in the top quarter by pressure were 48% worsened and 45% ended unsolved, with an average hold of 12 seconds and a length of 381 seconds. The bottom quarter: 4% worsened, 3% unsolved, no holds, 217 seconds. Any hold at all moves a call from the second group towards the first.

Two smaller things the dials noticed that a dashboard would not. Of the 14 calls where the *agent* hung up, resolution at the end averaged 0.21 against 0.56 for the rest. And the catch-all topic "Others" was the worst bucket in the data, with 72% ended-unsolved, which is a polite way of saying that if you cannot name what the customer wanted, you probably did not give it to them.

## What you can do with this

- **QA with a why.** Instead of one sentiment label per call, you get the moment it turned, the dials around it, the flags that fired and a readable synopsis. A reviewer can check the reader's reasoning in a minute.
- **An early flag.** By the interval the reader knows at 0.63 which calls are heading somewhere bad, and by three quarters at 0.75. That is time to bring in a supervisor, offer a callback, or just not launch the sales pitch.
- **Coaching by shape.** Which of an agent's calls are slow falls, where their tension peaks, whether their customers leave in control. Shapes a coach can show, like a writer's pyramid against a genre.
- **Process fixes.** Topics whose calls carry pressure *from the start* are policy problems: holds, refusals, verification loops. Fix the policy, not the agent.

Caveats, because there always are. The labels we compared against were produced by the company's own pipeline, not by humans, so these are agreement numbers; before any flag drives an operation you want a few hundred human-checked calls. Hindi calls read a little better (0.79 to 0.85) than the other eight languages (0.76 to 0.79, on a smaller sample). And everything here stays on-premises: the reader's notes paraphrase what customers said.

## The technical bit, briefly

The reader is a 12-billion-parameter open model running locally, asked at each of eight steps for thirteen integers and sixty words of notes, with the JSON enforced by the inference server. 668 calls took about two and a half hours on one workstation GPU; the calls run in lockstep so each step is one batched request. The thirteen dials, the turning point, the four families and the rule flags are packaged as a small service with a batch mode, a live mode that takes new turns as they arrive, QA cards and a process dashboard. The next step is the same one as for stories: distil the reader into a small model that runs per turn on a CPU, so the early flag can live on the agent's desktop.

Movies know where the interval goes. Calls, it turns out, put it at part two. The good news is that it is early enough to do something about.

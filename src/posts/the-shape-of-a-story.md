---
layout: post.njk
title: "The Shape of a Story"
date: 2026-10-04
permalink: /posts/the-shape-of-a-story/
---

<style>
.ss-chart{margin:1.5rem 0;padding:14px 10px 10px;background:color-mix(in srgb,var(--rule) 20%,transparent);border:1px solid var(--rule);border-radius:4px}
.ss-chart svg{display:block;width:100%;height:auto;max-width:100%;font-family:var(--mono)}
.ss-chart .ctitle{font-weight:600;font-size:14px;fill:var(--ink)}
.ss-chart .tick{font-size:11px;fill:var(--ink-soft)}
.ss-chart .grid{stroke:var(--rule);stroke-width:1}
.ss-chart .line{stroke-width:2.4;fill:none;stroke-linejoin:round;stroke-linecap:round}
.ss-chart .lab{font-size:11.5px;font-weight:500}
.ss-chart .c-fairy{stroke:#2F5BAA;fill:#2F5BAA}
.ss-chart .c-mystery{stroke:#B5443A;fill:#B5443A}
.ss-chart .c-literary{stroke:#5E8A6E;fill:#5E8A6E}
.ss-chart .c-fairy2{stroke:#8FA9E0;fill:#8FA9E0}
.ss-chart .c-mystery2{stroke:#E0A39D;fill:#E0A39D}
.ss-chart .c-flat{stroke:#9AA3AE;fill:#9AA3AE;stroke-dasharray:5 5}
.ss-chart figcaption{font-size:0.85rem;line-height:1.5;color:var(--ink-soft);padding:10px 6px 2px}
@media (prefers-color-scheme: dark){
  .ss-chart .c-fairy{stroke:#7FA0E6;fill:#7FA0E6}
  .ss-chart .c-mystery{stroke:#E07A70;fill:#E07A70}
  .ss-chart .c-literary{stroke:#8DBB9C;fill:#8DBB9C}
  .ss-chart .c-fairy2{stroke:#4A6AA6;fill:#4A6AA6}
  .ss-chart .c-mystery2{stroke:#8E514B;fill:#8E514B}
  .ss-chart .c-flat{stroke:#6E7883;fill:#6E7883}
}
</style>

*We taught a computer to read stories the way a careful reader does — with a notebook — and the shapes your English teacher drew on the chalkboard fell out of 625 real stories and screenplays. Here is what we tried, what failed, and what it is good for.*

Kurt Vonnegut once argued that stories have shapes. Draw a line for how well things are going for the hero, from beginning to end, and most tales trace one of a handful of curves: *Man in a Hole* (fine, then trouble, then better than before), *Cinderella* (a slow climb, a midnight crash, a rise to infinity), the straight downhill of a tragedy. Your English teacher drew a different shape: Freytag's pyramid, where tension climbs to a climax and falls away.

Those shapes are intuitive, and that is the problem. Nobody could *measure* them. A few years ago researchers tried, using sentiment analysis — counting happy and sad words — across 1,300 novels, and found six rough shapes. But happy words are not the same as fortune (a villain's death is sad words and good fortune), and sentiment is only one of the things that moves in a story. What about tension? What about what the reader knows that the hero doesn't? What about who holds the power?

We wanted to measure all of it. This is the story of how we got there, including the part where we got it wrong.

<figure class="ss-chart"><svg viewBox="0 0 720 300" role="img" aria-label="Dramatic tension, 325 stories, averaged by kind">
<text x="44" y="15" class="ctitle">Dramatic tension, 325 stories, averaged by kind</text>
<line x1="44" x2="570" y1="256.0" y2="256.0" class="grid"/>
<line x1="44" x2="570" y1="141.0" y2="141.0" class="grid"/>
<line x1="44" x2="570" y1="26.0" y2="26.0" class="grid"/>
<text x="38" y="30.0" class="tick" text-anchor="end">high</text>
<text x="38" y="260.0" class="tick" text-anchor="end">none</text>
<text x="44" y="286" class="tick">beginning</text>
<text x="570" y="286" class="tick" text-anchor="end">end of story</text>
<text x="307" y="286" class="tick" text-anchor="middle">→ story time →</text>
<polyline points="44.0,180.3 71.7,139.4 99.4,126.4 127.1,131.9 154.7,128.2 182.4,128.7 210.1,119.9 237.8,124.5 265.5,117.5 293.2,113.8 320.8,113.4 348.5,113.8 376.2,111.5 403.9,110.1 431.6,108.7 459.3,105.9 486.9,109.2 514.6,111.0 542.3,116.1 570.0,178.9" class="line c-fairy" fill="none"/>
<text x="578" y="182.9" class="lab c-fairy">Fairy tales</text>
<polyline points="44.0,156.5 71.7,148.3 99.4,131.7 127.1,119.2 154.7,131.7 182.4,117.2 210.1,111.0 237.8,108.9 265.5,115.1 293.2,106.8 320.8,108.9 348.5,121.3 376.2,111.0 403.9,98.5 431.6,96.5 459.3,102.7 486.9,73.7 514.6,96.5 542.3,100.6 570.0,185.5" class="line c-mystery" fill="none"/>
<text x="578" y="197.9" class="lab c-mystery">Sherlock Holmes</text>
<polyline points="44.0,188.7 71.7,165.6 99.4,151.3 127.1,145.7 154.7,140.1 182.4,138.2 210.1,128.8 237.8,123.9 265.5,127.0 293.2,120.7 320.8,115.8 348.5,109.5 376.2,110.8 403.9,102.7 431.6,97.1 459.3,108.3 486.9,97.1 514.6,95.8 542.3,100.8 570.0,136.3" class="line c-literary" fill="none"/>
<text x="578" y="140.3" class="lab c-literary">Literary fiction</text>
</svg>
<figcaption>Freytag's pyramid, recovered from text: tension climbs through the story and drops in the last few pages. Each line is the average of every story of that kind, read from beginning to end.</figcaption>
</figure>

## Thirteen dials

We started from a taxonomy of what moves in a story — the things a screenwriting teacher would name — and turned each into a question that can be asked at any point in a text. Thirteen dials, in four groups:

- **How it feels** — Fortune (how well things are going for the hero), tension, stakes, emotional intensity.
- **What is known** — How resolved the central problem is, whether new information just arrived, whether there is an open puzzle, and dramatic irony — does the reader know something a character doesn't?
- **Structure** — Did a new character just enter? Did we change scene?
- **Power and morals** — How much control the hero has, how strong the opposing force is, and the hero's moral standing.

Score every dial at twenty points through a story and you have its shape: not one line but thirteen. Score 625 stories and you can ask whether the shapes cluster, whether they predict genre, and whether Vonnegut was right.

## The first attempt, and why pretty graphs lie

Our first version used an off-the-shelf language model to score each slice of a story on its own — hand it a few paragraphs, ask "how tense is this?", move to the next slice. It produced beautiful curves. Sherlock Holmes stories seemed to cluster into one arc family, fairy tales into another. We nearly published that.

Then we ran a test every result like this should pass: **shuffle the slices.** Take each story, scramble the order of its twenty pieces, and re-run the analysis. If the method is really reading the *arc*, scrambled stories should look like noise. Ours didn't. The scrambled stories clustered into "families" just as neatly as the real ones, and the pretty curves came from three artifacts stacked on top of each other: a scoring trick that turned near-ties into big jumps, tiny groups averaged together, and the fact that averaging whatever clusters together always looks like structure.

![Six panels: top row, real story order, three cluster-mean arcs; bottom row, the same stories with their segments shuffled, which still form three tidy clusters.](/img/story-shape/artifact.png)
*Our own data, scored the original way. Top: real order. Bottom: the same stories with their pieces shuffled — no story left in them at all — still producing tidy "families". The method was sorting stories by what kind they were, not by their arc.*

The underlying reason is simple once you see it. Asking "how well are things going for the hero?" about an isolated 250-word slice is like asking a stranger how a film is going from a thirty-second clip. They can tell you it's a horror film. They cannot tell you whether this is the calm before the storm or the aftermath. **A story's state lives in what came before.** A method with no memory cannot see it — and no amount of slicing finer fixes that; we tried.

<figure class="ss-chart"><svg viewBox="0 0 720 300" role="img" aria-label="How well things are going for the hero">
<text x="44" y="15" class="ctitle">How well things are going for the hero</text>
<line x1="44" x2="570" y1="256.0" y2="256.0" class="grid"/>
<line x1="44" x2="570" y1="141.0" y2="141.0" class="grid"/>
<line x1="44" x2="570" y1="26.0" y2="26.0" class="grid"/>
<text x="38" y="30.0" class="tick" text-anchor="end">very good</text>
<text x="38" y="260.0" class="tick" text-anchor="end">very bad</text>
<text x="44" y="286" class="tick">beginning</text>
<text x="570" y="286" class="tick" text-anchor="end">end of story</text>
<text x="307" y="286" class="tick" text-anchor="middle">→ story time →</text>
<polyline points="44.0,130.1 71.7,138.9 99.4,143.6 127.1,135.2 154.7,137.1 182.4,131.9 210.1,145.4 237.8,141.2 265.5,132.4 293.2,135.2 320.8,135.7 348.5,136.1 376.2,140.3 403.9,151.9 431.6,155.6 459.3,156.9 486.9,144.9 514.6,130.5 542.3,110.6 570.0,67.8" class="line c-fairy" fill="none"/>
<text x="578" y="82.3" class="lab c-fairy">Fairy tales</text>
<polyline points="44.0,111.0 71.7,125.5 99.4,125.5 127.1,137.9 154.7,131.7 182.4,133.7 210.1,140.0 237.8,131.7 265.5,144.1 293.2,129.6 320.8,123.4 348.5,125.5 376.2,127.5 403.9,119.2 431.6,119.2 459.3,106.8 486.9,100.6 514.6,111.0 542.3,125.5 570.0,63.3" class="line c-mystery" fill="none"/>
<text x="578" y="67.3" class="lab c-mystery">Sherlock Holmes</text>
<polyline points="44.0,123.9 71.7,128.2 99.4,133.2 127.1,132.6 154.7,128.2 182.4,141.9 210.1,141.3 237.8,143.2 265.5,147.5 293.2,141.9 320.8,155.0 348.5,153.0 376.2,156.9 403.9,161.3 431.6,158.8 459.3,153.2 486.9,161.9 514.6,164.4 542.3,161.3 570.0,143.8" class="line c-literary" fill="none"/>
<text x="578" y="147.8" class="lab c-literary">Literary fiction</text>
<polyline points="44.0,140.7 71.7,141.0 99.4,142.2 127.1,140.0 154.7,137.0 182.4,138.3 210.1,142.1 237.8,138.0 265.5,140.2 293.2,140.1 320.8,140.1 348.5,141.1 376.2,140.0 403.9,139.9 431.6,145.3 459.3,142.8 486.9,138.7 514.6,140.2 542.3,137.1 570.0,122.1" class="line c-flat" fill="none"/>
<text x="578" y="126.1" class="lab c-flat">First attempt (any kind)</text>
</svg>
<figcaption>Fairy tales and Holmes end happily; literary fiction (Maupassant, Poe, Chekhov) ends where it started or lower. The dotted grey line is what our first method produced for the same stories: a flat line. It could not see the story at all.</figcaption>
</figure>

## The fix: a reader with a notebook

So we built the thing a careful reader actually does. The model reads the story one piece at a time and keeps **running notes** — at most 120 words: who the characters are, where we are, what has happened, what is at stake, what is still unresolved. For each new piece it gets its own notes plus the new text, rates the thirteen dials *for the state of the story right now*, and rewrites the notes. Then on to the next piece.

1. **Notes so far** — "Watson and Holmes at Baker Street. Jabez Wilson, red-haired pawnbroker, arrives with a singular case…"
2. **+ New piece** — the next 5% of the story, read in full.
3. **Rate the 13 dials** — Tension 2/4. Puzzle open: yes. Resolved: no. Hero in control: 3/4…
4. **Rewrite the notes** — keep what still matters, drop what doesn't. Repeat.

Nothing about this is exotic — it is how you would brief a friend who missed the first half of a film. But it changes everything about what the scores mean, because every rating is now a judgment about the *whole story so far*. It also scales: the cost per step is constant, so a 120-page screenplay costs the same per step as a fairy tale, and the notes themselves are something a human can read and check.

> **The notebook, reading "The Red-Headed League"**
>
> **Piece 1 of 20** — Dr. Watson and Sherlock Holmes are in Holmes's residence in the autumn. Holmes introduces Mr. Jabez Wilson, a stout, florid-faced man with fiery red hair, who has arrived to recount a "singular" case…
> *puzzle open 1.0 · resolved 0.0 · tension 0.33 · hero's fortune 0.67*
>
> **Piece 10 of 20** — Wilson was hired by the "Red-Headed League" to copy the Encyclopædia Britannica. The League dissolved suddenly. The man Wilson thought was the manager was a solicitor who moved; at that address, only a factory of artificial knee-caps…
> *puzzle open 1.0 · resolved 0.0 · tension 0.33 · hero's fortune 0.33*
>
> **Piece 20 of 20** — Back at Baker Street. Holmes explains his deductions: the tunnel's direction from the worn knees of the assistant, the timing from the League's closing. The bank robbery is fully resolved; the 30,000 gold napoleons are safe.
> *puzzle open 0.0 · resolved 1.0 · tension 0.0 · hero's fortune 1.0*

We checked the new reader the same unforgiving way. Shuffle the pieces: now the real order beats the scrambled order in **98% of stories**. Rephrase every question a different way: the dials barely move. Give it screenplays, which mark every scene change in capital letters, and ask whether its "did we change scene?" dial agrees with the script — it does, where the old method was a coin flip. And when we read the same stories two different ways (notes vs. re-reading the entire text so far), the two readings agree. The dials are measuring the stories, not the question wording.

## What 625 stories look like

We read 325 public-domain stories — Sherlock Holmes, Grimm, Andersen and Lang's fairy tales, Poe, Chekhov, O. Henry, Maupassant, Kipling — and 300 Hollywood screenplays, with their genres. A few things fell out.

| Number | What it means |
|---|---|
| **98%** | of stories have a readable arc: the real order beats the shuffled order |
| **6** | Vonnegut's shapes, recovered per story — and sorted by genre the way he'd have predicted |
| **0.82** | how well the shape alone predicts "thriller" or "action" (AUC; 0.5 is guessing) |

### Freytag's pyramid is real

The tension chart at the top of this post is the average of every story of each kind. Tension climbs through the story and releases in the last few pages — for fairy tales, detective stories and literary fiction alike. Stakes do the same. "How resolved is the problem?" runs from zero to one in every kind of story. Nobody told the reader to find a pyramid; it is simply what stories do.

<figure class="ss-chart"><svg viewBox="0 0 720 300" role="img" aria-label="How settled the story's problem is">
<text x="44" y="15" class="ctitle">How settled the story's problem is</text>
<line x1="44" x2="570" y1="256.0" y2="256.0" class="grid"/>
<line x1="44" x2="570" y1="141.0" y2="141.0" class="grid"/>
<line x1="44" x2="570" y1="26.0" y2="26.0" class="grid"/>
<text x="38" y="30.0" class="tick" text-anchor="end">resolved</text>
<text x="38" y="260.0" class="tick" text-anchor="end">wide open</text>
<text x="44" y="286" class="tick">beginning</text>
<text x="570" y="286" class="tick" text-anchor="end">end of story</text>
<text x="307" y="286" class="tick" text-anchor="middle">→ story time →</text>
<polyline points="44.0,253.7 71.7,239.7 99.4,226.7 127.1,222.5 154.7,220.7 182.4,217.9 210.1,215.6 237.8,216.5 265.5,204.4 293.2,208.1 320.8,204.4 348.5,204.4 376.2,202.1 403.9,198.8 431.6,196.5 459.3,189.8 486.9,176.5 514.6,152.4 542.3,122.2 570.0,33.0" class="line c-fairy" fill="none"/>
<text x="578" y="37.0" class="lab c-fairy">Fairy tales</text>
<polyline points="44.0,256.0 71.7,251.9 99.4,249.8 127.1,245.6 154.7,247.7 182.4,235.3 210.1,227.0 237.8,231.1 265.5,233.2 293.2,229.1 320.8,210.4 348.5,208.3 376.2,189.7 403.9,179.3 431.6,181.4 459.3,162.8 486.9,140.0 514.6,123.4 542.3,117.2 570.0,38.4" class="line c-mystery" fill="none"/>
<text x="578" y="52.0" class="lab c-mystery">Sherlock Holmes</text>
<polyline points="44.0,256.0 71.7,254.1 99.4,248.5 127.1,244.8 154.7,242.3 182.4,246.0 210.1,240.4 237.8,240.4 265.5,237.3 293.2,236.1 320.8,235.4 348.5,225.7 376.2,223.6 403.9,214.2 431.6,211.1 459.3,212.4 486.9,196.8 514.6,182.4 542.3,156.9 570.0,90.8" class="line c-literary" fill="none"/>
<text x="578" y="94.8" class="lab c-literary">Literary fiction</text>
</svg>
<figcaption>Every kind of story resolves at the end, but literary fiction resolves least, and detective stories hold everything back until the last 20%.</figcaption>
</figure>

### Two kinds of suspense

Here is the result we find most satisfying, because it is something a critic would say and a computer found. A detective story keeps its puzzle fully open — the "is there an unanswered question?" dial sits near maximum — until about four-fifths of the way through, when it collapses: the reveal. Fairy tales run on a *different* kind of suspense. Their "dramatic irony" dial is high: the reader knows the wolf is in the bed and Little Red Riding Hood does not. In Sherlock Holmes that dial is almost zero, because we learn everything alongside Watson. Hitchcock's bomb under the table versus the whodunit — both recovered from text, by a reader with a notebook.

<figure class="ss-chart"><svg viewBox="0 0 720 300" role="img" aria-label="Two kinds of not-knowing">
<text x="44" y="15" class="ctitle">Two kinds of not-knowing</text>
<line x1="44" x2="570" y1="256.0" y2="256.0" class="grid"/>
<line x1="44" x2="570" y1="141.0" y2="141.0" class="grid"/>
<line x1="44" x2="570" y1="26.0" y2="26.0" class="grid"/>
<text x="38" y="30.0" class="tick" text-anchor="end">yes</text>
<text x="38" y="260.0" class="tick" text-anchor="end">no</text>
<text x="44" y="286" class="tick">beginning</text>
<text x="570" y="286" class="tick" text-anchor="end">end of story</text>
<text x="307" y="286" class="tick" text-anchor="middle">→ story time →</text>
<polyline points="44.0,64.9 71.7,57.1 99.4,36.9 127.1,33.8 154.7,33.8 182.4,35.3 210.1,30.7 237.8,29.1 265.5,33.8 293.2,33.8 320.8,35.3 348.5,38.4 376.2,41.5 403.9,54.0 431.6,66.4 459.3,88.2 486.9,111.5 514.6,134.8 542.3,156.5 570.0,232.7" class="line c-mystery" fill="none"/>
<text x="578" y="250.1" class="lab c-mystery">Sherlock Holmes: an open puzzle</text>
<polyline points="44.0,136.5 71.7,115.2 99.4,115.9 127.1,115.2 154.7,112.8 182.4,109.3 210.1,106.8 237.8,101.3 265.5,108.6 293.2,110.3 320.8,110.3 348.5,114.9 376.2,111.4 403.9,115.6 431.6,114.5 459.3,114.3 486.9,124.3 514.6,140.7 542.3,171.0 570.0,245.2" class="line c-fairy" fill="none"/>
<text x="578" y="265.1" class="lab c-fairy">Fairy tales: an open puzzle</text>
<polyline points="44.0,228.5 71.7,187.7 99.4,152.8 127.1,154.2 154.7,131.2 182.4,131.6 210.1,125.3 237.8,121.5 265.5,114.9 293.2,119.0 320.8,120.8 348.5,109.3 376.2,107.2 403.9,108.6 431.6,107.2 459.3,101.3 486.9,101.3 514.6,107.9 542.3,118.0 570.0,196.1" class="line c-fairy2" fill="none"/>
<text x="578" y="200.1" class="lab c-fairy2">Fairy tales: reader knows more</text>
<polyline points="44.0,256.0 71.7,256.0 99.4,256.0 127.1,246.7 154.7,240.5 182.4,242.0 210.1,221.8 237.8,224.9 265.5,224.9 293.2,238.9 320.8,218.7 348.5,218.7 376.2,214.0 403.9,214.0 431.6,210.9 459.3,215.6 486.9,204.7 514.6,221.8 542.3,200.1 570.0,231.1" class="line c-mystery2" fill="none"/>
<text x="578" y="235.1" class="lab c-mystery2">Sherlock: reader knows more</text>
</svg>
<figcaption>A detective story keeps its puzzle wide open until the reveal at about the 80% mark, then it collapses. Fairy tales run on the opposite kind of suspense: the reader knows more than the hero (we know the wolf is in the bed), which barely happens in Holmes, where we learn alongside Watson.</figcaption>
</figure>

### Vonnegut was right, about prose

Fit each story's fortune line to his six shapes and the fit is real (it is not for scrambled stories). The sorting is what he would have predicted: the straight-downhill *tragedy* is 50 literary stories and 3 Holmes; *Cinderella* is 44 fairy tales and 7 literary. Screenplays do not fit at all. A film hero's fortune, as read by the model, is a long low plateau and then a spike in the last five minutes — a step, not a curve. Films have shape, just not that one.

![Six panels, one per Vonnegut archetype, each showing the average fortune line of the stories that fit it, by kind of story, against the template.](/img/story-shape/archetypes.png)
*Each panel: the stories whose fortune line best matched that archetype, averaged by kind, with the template dashed. "Fall" is almost entirely literary fiction; "Cinderella" is almost entirely fairy tales.*

### Genre has a shape

From the thirteen lines alone — no words, no title — a classifier can tell a thriller from everything else with AUC 0.82, an action film at 0.82, a comedy at 0.77. Horror has the lowest fortune line throughout and the highest dramatic irony (the audience knows the monster is there). Comedy has the lowest tension and pressure and the happiest ending. In every genre the puzzle collapses and the pressure releases in the last five percent.

![Eight panels of average dial lines for 300 screenplays, split by genre.](/img/story-shape/genres.png)
*300 screenplays, average dial lines by genre. Horror (purple) sits lowest on fortune and highest on dramatic irony and tension; comedy (orange) lowest on tension and pressure.*

## What this is good for

Once a story has a shape you can compute, a lot of things that used to need a human reader become possible — and a few things no reader could do at scale.

- **Recommend by shape, not by genre.** "People who liked this also liked" works on labels and co-viewing. Shape adds what the labels miss: you may not want *more mysteries*, you want slow-burn ones that resolve late, or anything with a Cinderella arc. Two "thrillers" can have opposite shapes; two books from different shelves can have the same one. A streaming or book service can embed the thirteen lines next to its existing signals.
- **Feedback for writers and editors.** Run a manuscript or screenplay through the reader and show the author their own pyramid: where tension sags in act two, where the stakes never rise, where the reader has been handed the answer too early. Compare against the shape of the genre they are writing in.
- **Reading the slush pile.** Not to replace readers, but to triage: which submissions have an arc at all, which resolve, which match the shape of what sold. The notes the model keeps are a built-in synopsis — checkable by a human in a minute.
- **Pacing for audiobooks, podcasts, series.** Where does a chapter break land relative to the tension curve? Which episode of a season has the cliffhanger? Shape data can drive where to cut, where to put the "next episode" prompt, and which chapter to use as the free sample.
- **Calls and chats have arcs too.** A support call has tension, stakes, resolution and power. The same reader, with its notebook, can score a transcript as it unfolds: is this call escalating, is the problem resolved or merely ended, did the customer ever regain control? That is a quality score with a *why* attached — and an early-warning signal while the call is still live.
- **Steering machine-written stories.** Today you can ask a model for "a mystery". With shape you can ask for "a Man-in-a-Hole with the reveal at 80% and a happy ending" and check that it delivered. The same dials become a reward signal for training story generators — which is the experiment we are running next.
- **Narrative design for games and interactive.** Branching stories can be measured branch by branch: does every path through the game have a climax, or do some fizzle? Which choices raise the stakes and which quietly resolve them?
- **Teaching structure.** Show students the pyramid in the story they just read — their own, or *Hamlet*'s — rather than drawing it on the board. Compare a first draft to a revision and watch the shape change.

> **What to keep in mind.** This is one model's reading of 625 English texts, mostly from the public domain, on a twenty-point grid. The dials are robust to rewording and agree across two reading methods, but they are judgments, not ground truth — a different reader would draw slightly different lines. Vonnegut's shapes hold for prose and not for film. Genre and shape are entangled: the arcs carry genre information, so "families of shape" are partly families of genre. And the whole run cost about two and a half hours on a single workstation GPU — cheap for 625 stories, not yet cheap for a library of millions, which is why distilling the reader into a small fast model is the next step.

## What's next

Three things, in order. Distil the reader into a small model so it runs on anything. Combine the thirteen named lines with the older, unlabelled "trajectory" view of a story, so the families we find can be described in plain words. And feed the shape back into a tiny story-writing model as its plan — the experiment this whole line of work was built to run — to find out whether a writer that knows where the story is going writes better stories, or merely more controllable ones.

*Method in one line: a 12-billion-parameter open language model (Gemma 4) reading each story in twenty pieces, keeping ≤120-word notes, rating thirteen axes per piece; results tested against within-story shuffles with leave-one-out means. Prose from Project Gutenberg (public domain). Screenplays from IMSDb, analysed for features only, text not redistributed. Every number in this post comes from that run; the full write-up with all tables lives in the lab's findings file.*

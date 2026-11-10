---
layout: post.njk
title: "From a Child's Poem to a Music Video: Our Four-Step Process"
date: 2026-11-10
permalink: /posts/poem-to-music-video/
---

It starts with a poem my kid wrote. A few steps later, it's a three-minute music video with a story, a soundtrack, and captions timed to every word.

We've now made several of these. The latest is **"Do not weep"**, a song about grief, letting go, and finding someone you've lost in the wind, the birds, and the light. This post walks through the whole process we've settled on, so anyone can try it.

The pipeline has four steps:

1. **Poems by my kid**: the words and the heart of the piece.
2. **Suno**: turns the poem into a song.
3. **Shape of Story**: turns the song into a screenplay.
4. **Opus 5.5**: builds the video, syncs it to the music, and mixes in the audio.

---

## Step 1: The Poem

Everything starts here, and it's the one step we never automate.

My kid writes the poems. Some come out in one go, others get reworked over a few days. My job is mostly to stay out of the way. I might ask "what happens next?" or "how does that feel?", but the words are theirs.

"Do not weep" is built on a simple, powerful idea: *don't mourn at the grave, because I'm not there. I'm in the wind, the birds, the stars, the laughter.* It ends on a refrain that repeats like a promise: *"All will be, all will be."*

**Why this step matters most:** every later step is about amplifying what's already in the poem. A strong central image (here, the wind) gives the music, the story, and the visuals something to hold on to.

---

## Step 2: Suno for the Music

Next, we give the poem to [Suno](https://suno.com) to turn it into a full song.

What we've learned:

- **Keep the lyrics close to the original.** We sometimes split a poem into verses, choruses, and a bridge, but we try not to rewrite the words. A repeated line in the poem usually becomes a natural chorus.
- **Describe the mood, not just the genre.** Prompts like "gentle, hopeful, wind and open sky, building to an uplifting finish" work better than a bare genre tag.
- **Generate several versions and listen as a family.** We pick the one where the emotional high point lands in the right place. For "Do not weep", that meant quiet, tender verses and choruses that open up and soar.

The song's structure becomes the backbone of the video. Quiet sections get slow, intimate shots; loud sections get faster cuts and wider views.

---

## Step 3: Shape of Story for the Screenplay

A song isn't a story yet. This is where **Shape of Story** comes in. We give it the lyrics and the song's structure, and it helps us turn them into a screenplay: a sequence of scenes, each tied to a section of the song.

For "Do not weep", the screenplay had seven sections:

| Section | Time | What happens |
|---|---|---|
| **Intro** | 0:00–0:13 | Blue hour at a coastal cemetery. A young woman in a dark coat stands at a simple grave, holding a long white scarf that flutters in the wind. |
| **Verse 1** | 0:13–0:53 | She walks the cliff path, the scarf trailing behind her. She lays it across the grave, trying out letting go. |
| **Chorus** | 0:53–1:20 | The wind lifts the scarf off the stone and carries it across the frame. She follows it. |
| **Verse 2** | 1:20–2:00 | At home with an unopened keepsake box. She can't finish the ritual. The scarf is folded away, until a window bangs open and it slips back into view. |
| **Chorus** | 2:00–2:26 | A clifftop at night in hard wind. The scarf stretches like a sail. She still hasn't let go. |
| **Bridge** | 2:26–2:53 | Dawn after rain, pale gold and silver-blue. She opens the box and scatters the ashes. The scarf lifts from her hand into the bright sky. |
| **Outro** | 2:53–3:20 | Full morning light on the cliff. She dances freely as birds rise over the sea, and the camera pulls back to a wide horizon. |

A few rules we set for this one:

- **Story only.** No singer, no performance shots. The character and the scarf carry the whole emotional arc.
- **One recurring object.** The white scarf stands for the person she lost. Watching how she holds it, lets it go, chases it, and finally releases it *is* the story.
- **Camera and captions follow the music.** The screenplay notes when to use gentle handheld shots versus big sweeping ones, and when captions should be subtle versus bold.

**Tip:** the screenplay doesn't need to match the song's timestamps exactly. Lyrics drift a little. What matters is that each story beat lands on the right *section* of the song.

---

## Step 4: Opus 5.5 for the Video and Audio

The last step is building the video itself. For this we work with **Opus 5.5**, an AI coding assistant, in the terminal. Rather than generating video clips, it **writes code that builds and films a 3D world**, one frame at a time.

### The building blocks

- **3D models from [Polyfork](https://polyfork.dev/):** the woman, gulls, headstones, a grave mound, a funerary urn, a lighthouse, sea stacks, clouds, and furniture for the home scene. Characters come with animations like walking, running, crouching, sitting, and dancing.
- **three.js** to put the scenes together, with lighting set for dusk, moonlit night, dawn, and morning.
- **A headless Chrome browser** to render each frame at 1920×1080.
- **ffmpeg** to stitch the frames into video and add the song.

### Syncing to the music

This is where the video comes alive. Before any scenes are built, the song is analyzed in two ways:

1. **Word-level lyric timings:** exactly when each word of each line is sung. These drive the captions, which highlight word by word as the song plays.
2. **An energy curve:** how loud and intense the music is in every frame. Quiet passages get slow, steady cameras. When the chorus hits, the camera shakes harder, the waves rise, sea spray thickens, and the frame pulses slightly on the beat.

### Building the shots

Opus 5.5 turned the screenplay into about 45 shots. Each one defines:

- **The camera:** where it starts, where it moves, what it looks at, and how much handheld shake it has.
- **The character:** her path through the scene and which animation she's playing (walking, crouching at the grave, running after the scarf, dancing).
- **The scarf:** a ribbon simulated in code. It flutters in her hand, lies draped on the grave, flies free on the wind, or lies folded on a table.
- **Atmosphere:** lighting preset, color grade, the lantern's flicker, the lighthouse beam, stars, birds, and particles (sea spray, blowing leaves, drifting ash, morning dust).
- **Transitions:** fades to black between scenes, a white flash into the dawn.

### Mixing the audio

Opus 5.5 also handles the audio side: it extracts the song, uses it for timing and energy analysis, and mixes the final track into the rendered video, so picture and sound stay frame-accurate.

### Test, fix, render

The workflow that worked best:

1. **Render a contact sheet first.** About 30 still frames from across the song, tiled into one image. Problems jump out at a glance.
2. **Fix what's broken.** On our first contact sheet, the camera ended up inside the character in a couple of shots, and in one shot her back blocked the view. Each fix was a small change.
3. **Render the full video.** On a laptop, about 5,600 frames rendered in **just over 2 minutes**.

---

## What We've Learned

- **The poem is the anchor.** Every decision traces back to an image or feeling in the original words.
- **Pick one visual idea and stick with it.** A single symbolic object like the scarf does more than a dozen locations.
- **Let the music set the pace.** Tying camera energy and cut speed to the song's loudness makes the video feel edited, even though it's entirely generated in code.
- **Check stills before the full render.** Rendering is fast; building the world takes longer. Catching problems on a contact sheet saves time.
- **Scope matters.** "Do not weep" took longer to make than our earlier videos: four locations, about 45 shots, a hand-animated scarf, urn and ashes scenes, and birds. Fewer shots or locations makes for a much faster turnaround.

---

## Try It Yourself

You don't need to be a filmmaker, a musician, or a 3D artist. You need:

1. Someone with a story to tell (in our house, that's the kid).
2. A tool to turn words into music.
3. A way to shape the song into scenes.
4. An AI collaborator that can build and render those scenes.

The most rewarding part isn't the final file. It's watching a child see their own words become a song, and then a world.

*If you make one, I'd love to see it.*

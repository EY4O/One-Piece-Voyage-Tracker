---
name: Eternal Pose
description: A One Piece watch tracker that announces the next episode as a broadcast title card.
colors:
  ground: "#f3f2ee"
  surface: "#ffffff"
  sunk: "#e8e6e0"
  ink: "#17150f"
  ink-2: "#47433b"
  ink-3: "#635e54"
  rule: "#17150f"
  hair: "rgb(23 21 15 / .16)"
  tone: "rgb(23 21 15 / .2)"
  struck: "#b3261e"
  ground-night: "#11100e"
  surface-night: "#1a1916"
  sunk-night: "#25231f"
  ink-night: "#eeece6"
  ink-2-night: "#c2bdb2"
  ink-3-night: "#9a958a"
  rule-night: "#d9d5cb"
  hair-night: "rgb(238 236 230 / .14)"
  tone-night: "rgb(238 236 230 / .16)"
  struck-night: "#f0776c"
  keyframe-black: "#0b0a08"
  scrim: "rgb(10 9 7 / .78)"
  placard-white: "#ffffff"
  placard-grey: "#e9e6de"
  field-classic: "#f2b705"
  field-luffy: "#d8322a"
  field-zoro: "#2a7d45"
  field-nami: "#f27d1f"
  field-usopp: "#c9a227"
  field-sanji: "#2a5fc4"
  field-chopper: "#ef7fae"
  field-robin: "#6c4bb6"
  field-franky: "#19a7c9"
  field-brook: "#a7adb8"
  field-jinbe: "#0e7a72"
  field-nika: "#f6ecd0"
typography:
  display:
    fontFamily: "'Dela Gothic One', 'Zen Kaku Gothic New', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(56px, calc((100cqi - 96px) / (var(--digits, 3) * .78)), 176px)"
    fontWeight: 400
    lineHeight: 0.8
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Dela Gothic One', 'Zen Kaku Gothic New', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(26px, 5.2vw, 50px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Dela Gothic One', 'Zen Kaku Gothic New', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(26px, 4vw, 36px)"
    fontWeight: 400
    lineHeight: 1.05
  title-sm:
    fontFamily: "'Dela Gothic One', 'Zen Kaku Gothic New', ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "'Zen Kaku Gothic New', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-strong:
    fontFamily: "'Zen Kaku Gothic New', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.3
  meta:
    fontFamily: "'Zen Kaku Gothic New', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Zen Kaku Gothic New', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.05em"
  tab-label:
    fontFamily: "'Dela Gothic One', 'Zen Kaku Gothic New', ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  none: "0px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "36px"
  gutter: "clamp(16px, 4vw, 32px)"
  frame: "2px"
  page: "1180px"
components:
  button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  button-hover:
    backgroundColor: "{colors.sunk}"
  button-field:
    backgroundColor: "{colors.field-classic}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "56px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "36px"
  button-plain:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 10px"
    height: "44px"
  button-danger:
    backgroundColor: "{colors.struck}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  card-tab:
    backgroundColor: "{colors.field-classic}"
    textColor: "{colors.ink}"
    typography: "{typography.tab-label}"
    rounded: "{rounded.none}"
    padding: "8px 14px 9px"
  bounty-strip:
    backgroundColor: "{colors.field-classic}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "38px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "44px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "48px"
  tab-selected:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
  state-mark:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
    size: "26px"
  state-mark-done:
    backgroundColor: "{colors.ink}"
  state-mark-current:
    backgroundColor: "{colors.field-classic}"
  dialog-head:
    backgroundColor: "{colors.field-classic}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    padding: "14px 14px 12px 20px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "10px 10px 10px 16px"
    height: "52px"
  now-ep:
    backgroundColor: "{colors.field-classic}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    width: "52px"
    height: "44px"
---

# Design System: Eternal Pose

## Overview

**Creative North Star: "The Broadcast Title Card"**

The next episode arrives the way the show announces it: a full title card with the saga art full-bleed inside an ink frame, a monumental episode numeral, and the episode title in heavy gothic lettering. Everything else in the app borrows the same broadcast graphic language: flat eyecatch colour fields, square panels ruled in manga ink, and a printed screentone where a surface needs to read as printed.

The system is two grounds and one field. Day is broadcast white paper with ink rules; night is ink paper with chalk rules. The only colour the user chooses is the field: a Straw Hat's flat eyecatch colour that paints the card tab, the bounty strip, the primary action, dialog heads and the current-position marks. Its text ink is computed, not chosen. The saga art is the primary identity of every hero surface; the field is the second voice, and it never becomes a gradient, a glow or a tint.

Density is phone-first and thumb-first: 44px minimum targets, 56px primary actions, one column of framed panels stacked 12px apart under the card, then tabs.

**Key Characteristics:**
- Square corners everywhere, framed in a 2px ink rule.
- One flat, user-chosen field colour with computed ink or white text.
- Dela Gothic One for numerals and titles, Zen Kaku Gothic New for everything read.
- Saga art as the keyframe inside ink-ruled frames, under a bottom-up scrim.
- State shown by a mark in a fixed cell plus a word, never by colour alone.
- Motion as broadcast edits: a hard cut on the numeral, an eyecatch wipe on arc completion.

## Colors

Warm paper neutrals and warm ink, plus one flat eyecatch field drawn from twelve character themes.

### Primary
- **Eyecatch Field** (`--field`, default `{colors.field-classic}` Romance Dawn yellow): the one user colour. Paints the card tab, the saga "you are here" tab, the bounty strip, the primary title-card action, the axis pin, dialog heads, the now-playing episode box, the eyecatch overlay, the current state mark, the "pick" kind chip, switches when on, and `::selection`. The theme only ever sets `--field` and `--on-field` on the root, so dialogs in the top layer inherit it.
- **On-Field Ink** (`--on-field`): computed per theme by comparing contrast against ink (#17150f) and white; it resolves to ink for Classic, Nami, Usopp, Chopper, Franky, Brook and Nika, and to white for Luffy, Zoro, Sanji, Robin and Jinbe.

The twelve fields: Romance Dawn/Classic, Luffy, Zoro, Nami, Usopp, Sanji, Chopper, Robin, Franky, Brook, Jinbe, Nika (all `field-*` tokens in the frontmatter).

### Secondary
- **Struck Red** (`{colors.struck}`, night `{colors.struck-night}`): the skip slash across a skipped state mark, the danger button, danger dialog sections and warning callouts. It means removed or destructive, nothing else.

### Neutral
- **Broadcast Paper** (`{colors.ground}` / night `{colors.ground-night}`): the page ground, tab-selected face, form fields in the tune panel.
- **Panel White** (`{colors.surface}` / night `{colors.surface-night}`): every framed panel, list, dialog body and button face.
- **Sunk Paper** (`{colors.sunk}` / night `{colors.sunk-night}`): hover faces, expanded stop details, locked or unmet slots.
- **Manga Ink** (`{colors.ink}` / night `{colors.ink-night}`): text, filled state marks, selected chips and segments, the ink button, toasts.
- **Ink 2 / Ink 3** (`{colors.ink-2}`, `{colors.ink-3}` and night pairs): secondary copy and meta; tertiary for placeholders, axis ends and skipped titles. Ink 3 holds at least 5.7:1 on its grounds.
- **Rule** (`{colors.rule}` / night `{colors.rule-night}`): the 2px frame on every container and control.
- **Hair** (`{colors.hair}`): 1px dividers inside a frame (between stops, settings, table rows).
- **Keyframe Black** (`{colors.keyframe-black}`): the fixed dark behind art (title card, saga bands, art picker), the outline stroke on display lettering over art, and the card-tab rule. It does not change with mode, because art does not.
- **Scrim** (`{colors.scrim}`): the bottom-up gradient that seats the placard over the art.

### Named Rules
**The One Field Rule.** The theme supplies exactly two values, `--field` and `--on-field`. Nothing else is themed, and the field is always a flat fill: no gradients, tints, glows or opacity steps.

**The Computed Ink Rule.** Text on the field is never picked by hand; it is whichever of ink or white contrasts better with that field.

## Typography

**Display Font:** Dela Gothic One (with Zen Kaku Gothic New, system sans)
**Body Font:** Zen Kaku Gothic New (400, 500, 700; with system sans)

**Character:** Heavy Japanese broadcast gothic for anything announced, paired with a clean, humane gothic for anything read. Dela Gothic is only loaded at 400; its weight is the display voice, so it is never bolded.

### Hierarchy
- **Display** (400, sized to the card by digit count, 56 to 176px, line-height .8, -.04em): the episode numeral only. Painted in the field with a 3px keyframe-black stroke (`paint-order: stroke fill`) so it reads on any art. Non-episode stops use a word ("Film", "OVA") at `clamp(64px, 15vw, 128px)`.
- **Headline** (400, `clamp(26px, 5.2vw, 50px)`, 1.08): the episode title on the card, white with a 5px keyframe-black stroke, max 22ch, clamped to three lines. The caught-up headline and eyecatch line use the same face larger.
- **Title** (400, `clamp(26px, 4vw, 36px)`, 1.05): tab panel headings. Saga plates use `clamp(22px, 3.6vw, 32px)` with a 4px stroke.
- **Title small** (400, 20 to 24px, 1.1): dialog heads, logbook and guide block headings, empty states.
- **Body** (400, 16px, 1.55): all reading copy, capped at 56 to 68ch. Stop titles are 17px 700.
- **Meta** (14px, ink-2): stop meta, captions, panel intros. Nothing smaller than 12px ships.
- **Label** (700, 12 to 13px, .05em, uppercase): kind chips, bounty label, milestone tiers, table heads. Always a label on a value it names.

### Named Rules
**The Two Voices Rule.** Dela Gothic One announces (numerals, titles, the card tab, the bounty figure, the now-playing number); Zen Kaku Gothic New explains. Never set body copy or controls in the display face, except the primary title-card action.

**The Own Figures Rule.** Tabular numerals everywhere numbers sit in text, except in Dela Gothic display numerals, where its tabular figures gap; those keep default spacing.

## Layout

A single 1180px column (`--page`) with a fluid gutter (`clamp(16px, 4vw, 32px)`), top to bottom: masthead (60px, ruled below), stage (title card at `clamp(440px, 64svh, 640px)` tall, then bounty strip and voyage axis, each 12px apart), tabs 36px below, panels 24px below the tabs. The title card is a two-row grid: art-and-placard over a ruled action bar. On phones the action bar stacks to one column and the primary action takes the full width.

Rows use a fixed two-column grid: a 56px rail cell (48px under 640px) and the content. The logbook runs a 12-column grid with 16px gaps; blocks span 12, then 6 at 720px, 4 or 8 at 960px. Guide columns go to two at 720px.

Fixed overlays respect safe areas: the now-playing strip pads with `env(safe-area-inset-bottom)`, dialogs inset from both safe areas, and the footer leaves 96px clearance for the strip. Breakpoints: 360, 640, 720, 960.

## Elevation & Depth

Flat by default. Depth comes from the 2px ink frame, the keyframe black behind art, and the scrim, not from shadow. One shadow exists, `--lift` (`0 2px 0 rgb(23 21 15 / .08), 0 12px 32px -12px rgb(23 21 15 / .28)`, deeper at night), and only things floating above the page wear it: the now-playing strip, toasts, dialogs and the install banner. Pressed and hover feedback uses inset fills (`inset 0 0 0 999px` at 8 to 10%) or a 1px press-down, never a raised shadow.

### Named Rules
**The Only Floaters Lift Rule.** A surface in the page flow never casts a shadow. If it does not sit above the page, it is framed, not lifted.

## Shapes

Every corner is square (0px), including dialogs, toasts, switches, the switch thumb, chips, inputs and the scrollbar thumb. Containers and controls are framed in `--frame` (2px) solid rule; internal dividers drop to 1px hair; secondary tags (kind chips, the per-arc progress bar) use 1px currentColor. Adjoining frames share a rule rather than doubling it (saga band, bar and route stack with `border-top: 0`; axis segments drop their left border). Dashed borders mean locked or not yet met; a dashed rail means skipped.

The screentone (`radial-gradient` dots, 1.1px on a 6px grid in `--tone`) is the one texture. It marks the current saga segment on the voyage axis and bands the lower third of the eyecatch (1.4px on 8px). It appears only where a surface should read as printed.

## Components

### Title Card (signature)
Full-width framed card, keyframe black behind the saga art (`object-position: center 40%`) with a bottom-up scrim. The placard sits bottom-left: "EP" plus the display numeral, the headline title, then arc, saga and episode range in 15px near-white. The ruled action bar below holds the field-coloured primary ("Watched ep N", 56px, display face), a framed "Skip detour" button only when the stop is a detour, and underlined link actions ("Find it in the roadmap", "Skip this arc"). The caught-up state keeps the card and swaps the numeral for "You're caught up."

### Card Tab
A field-coloured tab flush in the card's top-left corner, ruled in keyframe black on its right and bottom edges, set in the display face at 14px. It names the card's state ("Next episode", "Detour", "Film", "The end, for now"). The saga band carries a mirrored tab top-right for "you are here".

### Bounty Strip
A slim framed strip on the field: uppercase label, the bounty figure in the display face (container-sized, 20 to 34px), and a transparent currentColor-framed "Logbook" button. Under 640px the figure drops to its own row.

### Voyage Axis
One continuous episode line: framed segments proportional to each saga's episode span (`--span`), ink fill for the watched share (`--done`), screentone on the current saga, and a field pin with an ink pointer showing the episode number above the line. Episode 1 and the latest episode label the ends. Below it, "Tune to episode" is a number field plus button behind a hair rule.

### Route and Stop Rows
Each saga is a band (art, left-to-right scrim, stroked plate title), a ruled count bar, then the route: a framed list of stops on a 2px rail. Each stop has a 26px square state mark in a fixed cell:
- **Unwatched:** hollow surface square.
- **Partial:** diagonal half ink.
- **Done:** filled ink.
- **Current:** field fill with a surface gap and a 2px rule ring.
- **Skipped:** a struck-red diagonal slash, a dashed rail through the stop, and the title in ink-3.
Every mark also has a written state word beside the title and a full `aria-label`. Detours are offset by a short horizontal spur off the rail and indented 12px. Kind chips: canon in ink, picks on the field, others outlined. Episode-based arcs expose a stepper (minus, ink "+1", "+5", a number field) and a 6px progress bar that scales from the left.

### Buttons, Chips, Inputs, Tabs
- **Buttons:** 44px, 2px frame, square, 700 weight 15px. Variants: surface (hover to sunk), field, ink, plain (no frame), danger, small (36px), icon (44 square). Press moves 1px down.
- **Chips and segmented controls:** framed, surface; selected fills ink with ground text and sets `aria-pressed`.
- **Inputs and selects:** 44px, 2px frame, square; the select arrow is drawn in CSS. Focus uses the global 3px ink outline with 2px offset.
- **Tabs:** a folder-tab row on a 2px baseline; the selected tab opens into the panel (framed on three sides, ground face).
- **Switches:** a square 52 by 30 track, sunk when off and field when on, with a square ink thumb.

### Dialogs
Native `<dialog>`, max 600px, framed and lifted, inset from both safe areas. A sticky field-coloured head with a display title and transparent framed close button, sections split by hair rules with display subheads, and a sticky ruled footer. Backdrop is keyframe black at 62%.

### Toasts
An ink bar with ground text, framed, lifted, 52px tall, sliding up 12px on entry, docked above the now-playing strip. Undo is a field-coloured button inside.

### Now-Playing Strip
Fixed to the bottom once the title card scrolls away: a ruled, lifted surface bar with the field-coloured episode box (display face), the title and context truncating to one line each, and a field-coloured "Watched" button on the right. It slides in from below.

### Eyecatch
A full-screen field overlay with the line "[Arc], done." in the display face and a screentone band across the lower 30%. Decorative and `aria-hidden`.

### Motion
- **The cut** (.26s, `cubic-bezier(.16, 1, .3, 1)`): when the episode changes, the numeral comes in from a -5% shift with an -8deg skew and a 1.5px blur. It never plays on first load, only once the number has changed.
- **The eyecatch wipe** (1.25s, `cubic-bezier(.7, 0, .2, 1)`): on arc completion the field wipes in from the left via `clip-path`, holds, and exits right; the type skews in blurred and slides out.
- **Utility motion:** strip and progress at .32 to .35s, toast .28s, switch .2s, press .12s, all on the same out-curve.
- **Reduced motion:** all animation and transition durations collapse to .01ms, and the eyecatch is not shown at all (its timer resolves immediately).

## Do's and Don'ts

### Do:
- **Do** keep every corner square (0px) and frame containers and controls in the 2px rule (`--frame`).
- **Do** let the saga art be the identity of the title card and saga bands, always inside keyframe black with a scrim. Whole Cake, Wano, Final Saga and Elbaph currently ship placeholder art until the author supplies final pieces; build surfaces so the art can be swapped without layout change.
- **Do** paint the field flat, and take its text colour from `--on-field`.
- **Do** show state with a mark in a fixed cell and a word: filled, half, hollow, current ring, struck slash. Colour is a third signal, never the only one.
- **Do** make a skip visible as a break (dashed rail) until it is restored, and make every skip undoable.
- **Do** stroke display lettering over art in keyframe black with `paint-order: stroke fill`.
- **Do** keep targets at 44px minimum and the primary title-card action at 56px.

### Don't:
- **Don't** round corners or use pill shapes anywhere.
- **Don't** use coloured side stripes on rows, callouts or cards; a warning changes the whole frame to struck red.
- **Don't** put eyebrow kickers or small uppercase lines above headings; uppercase labels only name the value beside them.
- **Don't** open with a stat-tile hero, progress rings or a poster grid; stats live in the logbook, and the first viewport belongs to the title card.
- **Don't** cast shadows on in-flow surfaces; `--lift` is for floating layers only.
- **Don't** theme anything but `--field` and `--on-field`, or tint and gradient the field.
- **Don't** set body copy below 12px or in the display face.

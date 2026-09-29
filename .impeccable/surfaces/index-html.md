---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["src/OnePieceWatchOrder.jsx","src/components/VoyageUI.jsx","src/components/ArcCard.jsx"]
---

# Surface brief: Eternal Pose app (single page)

Scope: the whole tracker. That covers the Up Next title card, the roadmap, the logbook (bounty, crew, achievements, time), films, the watch guide, settings and backup. Mode: Operate. It's a phone-first, quick check-in before or after an episode, with occasional longer planning sessions on desktop.

Task: know the exact next episode, mark it, skip or restore a detour, get back to any episode, and keep the only copy of the data safe.

Critique inputs (2026-09-29, 22/40): safety nets for import, skip and saga actions; spoilers and accuracy in Films and Guide; a first viewport that competed with itself; tiny, faint text; and secondary tabs off-system. The user confirmed a full redesign, with the stats moved to a logbook and nothing off-limits.

## Direction contract

THESIS: The next episode arrives the way the show announces it, as a full broadcast title card, not a dashboard. It refuses the category default of a stats hero, poster grid and progress rings.

OWN-WORLD: broadcast white and night ink grounds, each with 2px manga ink rules; flat eyecatch colour fields from the active character theme (Committed: the field owns the title card and the bounty strip); Dela Gothic One lettering for numerals and episode titles; the user's saga art as the keyframe inside ink-ruled frames; and a state cell in each row (filled, hollow, struck) on a continuous route rail that shows a break wherever a skip is.

STORY: Open the app and see "Episode 9, the title", press +1 with a thumb. Detours are labelled as detours, skips can be undone, and the logbook holds the fun.

FIRST VIEWPORT: On a phone the title card fills about 65% of the screen: the art full-bleed, a huge episode number at bottom-left, and the title in heavy lettering under it with arc and saga beneath. The thumb bar at the bottom of the card holds +1 Watched (primary, full width) with Skip and Jump smaller and set apart. A slim bounty strip on the eyecatch field sits under the card, then Tune to episode. Signature: an eyecatch wipe (the colour field sweeps across) when an arc completes.

FORM: Broadcast Title Card, number 3 on the ordered grounded list. Seed key 2125143e.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Raises kept from declined challengers: Tune to episode by number (Teletext); a state mark in a fixed cell, never colour alone (Timetable); a skip is a visible break in the rail until restored (Jackfield); one continuous episode axis with position pinned (Deep Dive); the monumental episode title (Alphabet Storm).

Unresolved: art for Whole Cake, Wano, Final Saga and Elbaph is placeholder until the user makes those pieces.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two groups of viewers share the top spot:

- **First-time watchers.** They're starting One Piece or partway through a first run. They need an order that makes sense, honest calls on filler, and no spoilers for anything past where they are.
- **Returners.** They dropped off somewhere and are coming back. They need to find where they stopped, see what's left, and decide what's worth skipping.

The main job for both is the same: *tell me the next thing to watch and remember where I am.* Rewatchers and completionists also use the full roadmap, but when their needs conflict with the first two groups, the first two win.

## Product Purpose

Eternal Pose is a watch-order tracker for the One Piece anime. It lays out 1,100+ episodes, the films, the specials and the OVA as a single ordered route of 68 stops across 11 sagas (East Blue through Egghead and Elbaph). It always shows the next episode to watch, down to the episode number and title, and it remembers progress between visits.

Success means a viewer never loses their place, never gets spoiled by the tracker itself, and can make informed skip decisions without leaving the app.

## Positioning

Eternal Pose puts the whole franchise into one opinionated order: canon, filler, movies, specials and the OVA, each placed where it fits. Every stop carries its episode range, manga chapters, One Pace runtime, and a short note on why filler is skippable (or, in cases like G-8, worth watching anyway). It combines that route with per-episode progress, and it does this with no account and no server.

## Operating Context

- Mostly used next to the actual watching, often on a phone and often as an installed home-screen PWA. It's a quick check-in before or after an episode, with occasional longer planning sessions.
- The core loop is Up Next → watch → +1 / skip / jump to the arc. Longer arcs have +1 / -1 / +5 steppers and exact episode entry.
- Search covers arc name, description and episode range. Filters cover canon, films and specials, must-watches and filler. Canon Purist mode hides everything that isn't canon or mixed from both the queue and the roadmap.
- Progress moves between devices only through JSON export and import. Importing overwrites current progress.

## Capabilities and Constraints

**Hard constraints (confirmed):**

- **No accounts and no server.** All progress lives in `localStorage`. Moving devices means a JSON backup file, and there is no cloud sync. Future work must not add sign-in, backend storage or telemetry that depends on a server.
- **Spoiler-safe by default.** Spoiler Shield is on out of the box. Hidden plot summaries, locked achievements and unmet crew members are *not rendered at all* until the viewer reveals them, rather than blurred. The viewer reveals them with an explicit action, never on hover. Arc names and artwork stay visible, and the product doesn't claim the Shield is bulletproof.
- **Free and non-commercial.** No ads and no monetization. The fan-project disclaimer (One Piece belongs to Eiichiro Oda, Shueisha and Toei Animation) stays.
- **Installable and offline.** It's a PWA (`vite-plugin-pwa`, auto-updating service worker) and must stay fully usable without a connection.

**Established behavior to preserve:**

- Watched and skipped are separate states. Skipping can always be undone, and Settings can restore every skipped arc at once.
- Up Next is the first unwatched, unskipped item in dataset order. It ignores search and display filters, and Canon Purist mode narrows it.
- Persisted `localStorage` keys and the backup JSON format (version `3.0`) are a compatibility contract with existing users' saved progress. See `docs/UI-UX-REVIEW.md`.
- "Watch units" count movies and specials as rough episode equivalents, at 23.5 minutes each.
- Voyage extras: a bounty that grows with progress, 25 achievements, a crew roster that fills in as the Straw Hats join, time-spent and filler-hours-avoided totals, and a pacing estimate (1–15 episodes a day).

**Stack:** React 18, Vite 5, Tailwind 3 and Lucide icons. It deploys to GitHub Pages at `eternalpose.io` through `.github/workflows/deploy.yml` when `main` is pushed.

**Terminology:** voyage, saga, arc, stop, Up Next, watch units, Canon Purist, Spoiler Shield, One Pace, filler / mixed / canon, must-watch.

**Known gaps (open, not promised):** there are no tests. Daily pace is saved in the backup but resets to 3 on reload. Share URLs are not implemented.

## Brand Commitments

- **Name:** "Eternal Pose" is the product name. "The One Piece Voyage Tracker" is the deliberate descriptive subtitle, used for page titles, OG and share metadata, and search. The home-screen label "OP Tracker" in `index.html` is a leftover and doesn't match the manifest's `short_name` of "Eternal Pose".
- **Voice:** first person, plain and a bit wry. It sounds like one fan who built the tool for their own watch-through ("I kept losing track of where I was…"). No hype, no emoji-heavy copy, and nothing that reads as AI-generated.
- **Existing assets:** saga header artwork in `src/assets/sagas/` (12 saga backgrounds plus 3 showcase images), PWA icons in `public/`, and 12 character colour themes (one per Straw Hat, plus Nika and a classic theme).
- **Saga artwork is central and made by the author.** Each saga gets its own art piece, made by the owner as they reach that saga in their own watch-through. Whole Cake, Wano, Final Saga, Elbaph and the Sunny showcase currently share one placeholder image until those pieces exist. Design work must treat the art as a primary identity element and must work with a placeholder until each piece arrives.
- **Must stay visible:** the 12 character themes, the Berry (฿) bounty, and light and dark modes (plus following the system setting). The crew roster and achievements can move into a secondary logbook.
- **Tone guardrails:** never too serious (it must not read as a productivity app or streaming service), never gimmicky pirate cosplay (rope borders, treasure-map fonts, parchment for its own sake), never slower to use (no extra taps or scrolling between opening the app and +1), and it must keep the manga feel: ink, panels and the source material's own graphic language.

## Evidence on Hand

- The full watch-order dataset, arc notes, One Pace mappings and achievements are in `src/OnePieceWatchOrder.jsx`. Episode titles through episode 1179 are in `src/data/episodeTitles.js`.
- There are two sample backup files for testing imports: `docs/qa/new-voyage.json` and `docs/qa/returning-voyage.json`.
- A prior UI audit and a record of its decisions are in `docs/UI-UX-REVIEW.md`.
- **Absent:** no user counts, testimonials, reviews, press or usage analytics. Future work must not invent any of these.

## Product Principles

1. **The next episode comes first.** Every screen should make "what do I watch now" obvious and one tap away. Analytics and extras support it and never compete with it.
2. **The tracker must never be the spoiler.** When in doubt, hide it, and don't render what the viewer hasn't reached yet.
3. **Opinionated, but always reversible.** Give a clear recommendation on filler and order, and never make a skip or a mark permanent.
4. **The viewer's data stays on the viewer's device.** No account, no server, no lock-in, with a plain JSON backup they own.
5. **Accuracy is the product.** Getting episode ranges, placements and titles right matters more than any feature, and watch-order corrections are the contribution that helps most.

## Accessibility & Inclusion

No formal standard has been set. The established baseline from the prior UI work is labeled controls, keyboard focus management in native dialogs, adequate mobile touch targets, and spoiler reveals done with explicit buttons (not hover) so hidden text stays out of the accessibility tree. Light (broadcast white) and dark (night ink) modes follow the system setting by default.

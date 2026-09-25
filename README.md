# Eternal Pose

A watch-order tracker for One Piece. Live at **[eternalpose.io](https://eternalpose.io)**.

One Piece is 1,100+ episodes, plus fifteen-odd movies, a handful of specials, and a lot of filler that may or may not be worth your time. I kept losing track of where I was and which bits I'd meant to skip, so I made this. It lays the whole thing out in the order I'd actually watch it and remembers where you stopped.

There's no account and no server. Your progress lives in your browser.

## What's in it

**The roadmap.** 68 stops across 11 sagas, East Blue through Egghead and Elbaph. Canon arcs, filler, movies, specials and the old OVA are all slotted in where they fit. Each arc has its episode range, manga chapters, a One Pace runtime, and a short note. Filler arcs say why they're skippable, and the few worth watching anyway (G-8, mostly) are marked as such.

**Up Next.** The top of the page always shows the next thing to watch, down to the episode number and title. Hit +1 as you go, skip something, or jump straight to that arc in the list. Longer arcs have +1 / -1 / +5 buttons, or you can type the episode number in.

**Search and filters.** Search by arc name, description or episode range. Filter to canon only, films and specials, must-watches or filler. Canon Purist mode (in Settings) hides everything that isn't canon or mixed from both the queue and the roadmap.

**Skipping is undoable.** Skipped arcs stay skipped, not watched, and you can put any of them back in the queue later. Settings has a button to restore all of them at once.

**Spoiler Shield.** On by default. It hides plot summaries for stuff you haven't watched yet, plus locked achievements and crew members you haven't met. Hidden text isn't just blurred, it isn't rendered at all until you reveal it. Arc names and artwork still show, so it's not bulletproof, but it covers the obvious stuff.

**The fun bits.** A bounty that goes up as you watch, 25 achievements, and a crew roster that fills in as the Straw Hats join. It also keeps a running total of how much time you've sunk into this (in hours, and in whole days if you watched nonstop) and how many hours of filler you haven't watched.

**Pacing.** Tell it how many episodes a day you watch (1 to 15) and it'll estimate when you'll catch up.

**Movies & placement.** Where each film fits, which ones are worth it, and which tie-in filler to watch right before them.

**Looks.** Light mode (parchment) and dark mode (navy), or follow your system. Twelve colour themes, one per Straw Hat plus Nika and a classic one. The header art follows whatever saga you're on, or you can pin one of 15 images.

**Installable.** It's a PWA, so you can add it to your home screen and it works offline.

## Backing up your progress

Everything saves to `localStorage` on whatever device you're using. If you want to move to another browser or phone, use the download button in the toolbar to export a JSON file, then import it on the other end. There's no cloud sync.

Importing overwrites your current progress, so be a little careful.

A couple of quirks worth knowing:

- "Watch units" count movies and specials as roughly equivalent episodes, so your total won't match the anime's episode count exactly.
- Your daily pace gets saved in the backup file but resets to 3 when you reload the page.

## Running it locally

You'll need Node 18 or newer.

```bash
git clone https://github.com/EY4O/One-Piece-Voyage-Tracker.git
cd One-Piece-Voyage-Tracker
npm install
npm run dev
```

To build and preview the production version:

```bash
npm run build
npm run preview
```

Pushing to `main` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml`.

Built with React, Vite and Tailwind. Icons are from Lucide, fonts are Instrument Serif and Outfit, and the PWA side is `vite-plugin-pwa`.

## Where things are

- `src/OnePieceWatchOrder.jsx` is the big one. The whole watch order, the themes, achievements, state and save logic all live here. If you want to fix an episode range or add an arc, this is the file.
- `src/components/VoyageUI.jsx` has the header, the Up Next bar, the toolbar, progress bars and dialogs.
- `src/components/ArcCard.jsx` is the arc card, in both compact and detailed layouts.
- `src/data/episodeTitles.js` maps episode numbers to titles.
- `src/index.css` holds the design system: colour modes, character accents, layout.
- `src/InstallPromptBanner.jsx` is the "add to home screen" banner.
- `src/assets/sagas/` is the header artwork.

There aren't any tests yet. `docs/qa/` has two sample backup files (a fresh start and a returning viewer) that are handy for testing imports. Use a throwaway browser profile for that since importing replaces your progress. `docs/UI-UX-REVIEW.md` has notes from an older round of UI work.

## Contributing

Spotted a wrong episode range, a missing special, or an arc that's in the wrong spot? Open an issue or a PR. Watch-order stuff is the most useful help by far.

## Disclaimer

This is a free, non-commercial fan project. One Piece and everything related to it belongs to Eiichiro Oda, Shueisha and Toei Animation. I don't own any of it.

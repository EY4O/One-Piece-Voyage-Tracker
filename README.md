<div align="center">

# 🏴‍☠️ The One Piece Voyage Tracker

A watch-order companion for your *One Piece* journey, with episode tracking, movies, specials, OVAs, and optional spoiler protection. Follow the roadmap, find your next watch, and build your crew as you progress.

[![Live App](https://img.shields.io/badge/Live_Site-Set_Sail-E53935?style=for-the-badge&logo=googlechrome&logoColor=white)](https://eternalpose.io)

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](#tech-stack)
[![Vite](https://img.shields.io/badge/Vite-Ready-646CFF?style=flat-square&logo=vite&logoColor=white)](#tech-stack)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styled-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](#tech-stack)
[![Node](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](#prerequisites)

</div>

---

## ✨ Features

### 🧭 Continue Your Voyage

* **Next-Watch Dashboard**: A cinematic header puts your current saga, arc, episode, and voyage progress together. The episode title uses larger, brighter, semibold text for quick recognition.
* **Sticky Up Next Bar**: Shows the episode number **and episode title**, with **Jump to Arc**, **Skip**, and **Next (+1)** actions. Movies and specials show their titles and a **Mark watched** action.
* **Unified Toolbar**: Compact/Detailed View, Spoiler Shield, **Settings**, JSON download, and JSON import sit together below the section navigation. Settings is positioned between Spoiler Shield and JSON download.

### 🎨 Dynamic Theme & Background Engine

* **12 Character Palettes**: Character themes supply consistent accents for progress, selected controls, badges, and important actions across a shared navy design system.
* **15 Header Artwork Choices**: Choose from 12 saga artworks and three showcases—Thousand Sunny, Straw Hat, and Going Merry—or let Auto-Sync follow the saga of your next queued item.
* **Restrained Visuals**: Readable cards, consistent borders and buttons, and subtle transitions replace pulsing glows and bouncing notifications.

### 🧭 Navigation & Watch Queue

* **Saga Navigation**: Use numbered saga sections, the saga selector, and Expand All / Collapse All to navigate the roadmap. A floating Navigation link returns to the section controls.
* **Reliable Jump to Arc**: Opens the current saga, clears conflicting search/type filters, and scrolls to and focuses the active card.
* **Search & Filters**: Find arcs, movies, or episode-range text; filter canon arcs, films/specials, must-watch content, or filler.
* **Canon Purist Mode**: Settings can restrict both the queue and roadmap to canon and mixed arcs. A visible notice lets you return to all content.
* **Shared Arc Controls**: Compact and detailed views share episode steppers (`+1`, `-1`, and `+5` for longer arcs). Exact episode entry saves on **Enter or leaving the field**, so intermediate digits do not change progress.
* **Clear Card Status**: Up Next, Completed, and Skipped states remain readable. Episode ranges use a **television icon**, and episode-based cards show a progress bar and percentage.
* **Reversible Skips**: Restore an individual skipped card to the queue, or restore all skipped content in Settings. Skipping does not mark an item watched.
* **Watch Details**: Expand compact-card details for summaries, One Pace information, watch advisories, and explanations of optional content.

### 💰 Pirate Milestones & Analytics

* **Live Marine Bounty**: Reflects completed items and partial episode progress using the existing rewards.
* **25 Grand Line Achievements**: Unlock milestones through arc completion and watch-unit thresholds.
* **Crew Recruitment**: Track your ten-member roster, select character themes, and receive brief feedback for newly recruited crew and unlocked milestones.
* **Watch-Time Analytics**: View logged watch units, estimated screen time, continuous watch days, and unwatched/skipped filler hours.

Voyage totals use **watch units**, including movie/special equivalents; they are not an exact count of numbered anime episodes. Filler hours include unwatched filler, so they do not necessarily represent time you deliberately saved.

### 🛡️ Spoiler Shield

* **Deliberate Reveal Controls**: Reveal or hide unwatched plot summaries, saga overviews, locked milestones, and unrecruited crew identities with buttons that work on touchscreens and keyboards.
* **Accessible Concealment**: Concealed content is not rendered until revealed, instead of being visually blurred while remaining available to screen readers.
* **Protected Theme Names**: Locked character names are concealed in Settings. Turn Shield off to explore all character themes.

Arc names, current episode titles, guide/placement text, and manually selected artwork retain their existing visibility. Spoiler Shield does not guarantee that every title or image is spoiler-free.

### ⏳ Planning & Pacing Tools

* **Catch-Up Estimator**: Set a daily pace of **1–15 episodes/day** to estimate time remaining and a completion date from your watch-unit progress.
* **Movie Placement Guide**: Consult the existing placement notes and recommendations for theatrical content and specials.
* **Curated Watch Advisories**: Distinguish recommended anime-original arcs, such as *G-8*, from optional filler.

### 💾 Local Progress & JSON Backups

* **Device-Local Persistence**: Watched/skipped items, episode sub-progress, theme, artwork mode, Compact View, Canon Purist, and Spoiler Shield are saved in `localStorage`.
* **Compatible Backups**: Export and import version **3.0 JSON** to transfer progress manually between browsers or devices. There is no automatic cloud sync.
* **Saved-Progress Compatibility**: The redesign preserves storage keys, stored formats, watch-order data, calculations, and unlock requirements. Existing users need no migration.

Daily pace is included in JSON backups but still resets to 3 on reload. Shareable URLs were described in an earlier README but are **not implemented in this checkout**.

### 📱 Responsive Design, Accessibility & Installation

* Responsive layouts reviewed at **375, 430, 768, 1024, and 1440px**, with wrapping controls, readable long card titles, and safe-area spacing.
* Labeled controls, visible keyboard focus, a skip-to-content link, progress indicators, and live milestone feedback.
* Native settings, reset, and about dialogs support keyboard focus management and Escape. Resetting progress retains its confirmation step.
* Reduced-motion preferences suppress animation and smooth Jump scrolling.
* Existing PWA service-worker registration, browser install prompt, iOS Add to Home Screen guidance, and dismissal preference are retained.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18+ |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Component Icons** | Lucide React |
| **State Storage** | Web Storage API (`localStorage`) |
| **PWA** | Vite PWA plugin + Workbox |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (*v18 or newer*) and **npm** installed:

```bash
git clone https://github.com/EY4O/One-Piece-Voyage-Tracker.git
cd One-Piece-Voyage-Tracker
npm install
npm run dev
```

Create a production build and preview it locally:

```bash
npm run build
npm run preview
```

The modernization build was verified with Node.js **22.23.2**. Use the local URL printed by Vite to open the application.

## 🧩 Project Structure

| File | Responsibility |
| :--- | :--- |
| `src/OnePieceWatchOrder.jsx` | Master watch-order data, themes, achievements, application state, persistence, calculations, and state-changing handlers. |
| `src/components/VoyageUI.jsx` | Header, sticky Up Next, section navigation/toolbar, progress bars, spoiler disclosures, and modal shell. |
| `src/components/ArcCard.jsx` | Compact/detailed arc cards and shared episode stepper. |
| `src/index.css` | Shared visual system, character accents, responsive layouts, and accessibility styles. |
| `src/InstallPromptBanner.jsx` | Install prompt, iOS instructions, and dismissal behavior. |
| `src/data/episodeTitles.js` | Episode-title lookup. |
| `src/assets/sagas/` | Existing header artwork. |
| `src/main.jsx` / `vite.config.js` | App entry point and PWA registration/build configuration. |

Generated `dist/`, `node_modules/`, and `.sites-runtime/` directories are ignored for new files. Previously tracked dependency files remain tracked.

## ✅ Validation & Review

The UI changes passed `npm run build`, including PWA generation. Local browser smoke checks covered progress controls, saved reloads, imports, skipping/restoring, filters, saga navigation, all 12 theme selections, dialogs, and the five viewport widths above. The latest refinements also verified the television icon, episode titles in Up Next, the relocated Settings button, and stronger episode-title styling.

JSON serialization and export-handler behavior were checked separately; completed file delivery through the in-app browser was not verified. Native PWA installation/offline behavior and OS-level reduced-motion emulation still need device testing. The project currently has no dedicated test or lint script.

See the [UI/UX review](docs/UI-UX-REVIEW.md) for the architecture audit, compatibility details, validation results, and remaining opportunities. The [empty-voyage](docs/qa/new-voyage.json) and [returning-viewer](docs/qa/returning-voyage.json) JSON fixtures support manual import checks; import them only in a disposable test browser/profile because importing replaces progress fields.

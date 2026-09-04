<div align="center">

# 🏴‍☠️ The One Piece Voyage Tracker

An interactive, spoiler-protected watch order companion engineered for the entire *One Piece* anime journey—spanning **1,120+ episodes**, **theatrical films**, **canonical specials**, and **OVAs**.

[![Live App](https://img.shields.io/badge/Live_Site-Set_Sail-E53935?style=for-the-badge&logo=googlechrome&logoColor=white)](https://ey4o.github.io/One-Piece-Voyage-Tracker/)

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](#tech-stack)
[![Vite](https://img.shields.io/badge/Vite-Ready-646CFF?style=flat-square&logo=vite&logoColor=white)](#tech-stack)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styled-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](#tech-stack)
[![Node](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](#prerequisites)

</div>

---

## ✨ Features

### 🎨 Dynamic Theme & Background Engine
* **12 Straw Hat Character Themes**: Canonical color palettes matching Straw Hat crew members dynamically tint borders, badges, glow effects, and overlays.
* **14 Adaptive Header Artworks**:

### 🧭 Navigation & Watch Queue
* **Sticky "Up Next" Command Bar**: Locks your active episode or movie to the top of the viewport with rapid **Jump to Arc**, **Skip**, and **Next (+1)** actions.
* **Mobile-First Layout**: Fully responsive interface tuned for handheld viewing.
* **Precision Episode Steppers**: Advance progress via granular controls (`+1`, `-1`, `+5`) or type exact episode numbers directly inside arc cards.
* **One Pace Integration**: View condensed runtimes and fan-edit episode equivalents alongside canonical broadcast metrics.
* **Quick Navigation FAB**: Floating action button to instantly jump straight to your active milestone on the roadmap.

### 💰 Pirate Milestones & Analytics
* **Live Marine Bounty Metric**: Increases your personal bounty in real time as you check off episodes and complete sagas.
* **24 Grand Line Achievements**: Unlock collectible badges scattered throughout the Sea.
* **Visual Crew Roster**: Tracks recruited Straw Hat crew members as your voyage advances across the Grand Line.
* **Screen Time Analytics**: Aggregates cumulative watch time into total hours, continuous 24-hour days, and total filler hours avoided.

### 🛡️ Spoiler Shield
* **Global Redaction Mode**: Actively blurs summaries, unearned achievement titles, descriptions, and crew themes until explicitly hovered or unlocked.

### ⏳ Planning & Pacing Tools
* **Catch-Up Estimator**: Set a daily watch quota (**1–15 episodes/day**) to calculate remaining milestones and forecast exact target completion dates.
* **Theatrical Movie Guide**: Chronological placement guide integrating all 15 movies at safe, spoiler-free viewing junctures.
* **Curated Watch Advisories**: Distinguishes between essential anime-original arcs (e.g., *G-8 Navarone Base*) and skippable non-canon filler.

### 💾 Data Portability & Sharing
* **Zero-Backend Persistence**: Progress, themes, and steppers are preserved locally via `localStorage`.
* **JSON Backup & Migration**: One-click JSON data export and import for seamless cross-device syncing.
* **Shareable Voyage URLs**: Generates query-string links containing your active theme and current episode coordinates.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18+ |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Component Icons** | Lucide React |
| **State Storage** | Web Storage API (`localStorage`) |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (*v18 or newer*) and **npm** installed:

```bash
git clone https://github.com/EY4O/One-Piece-Voyage-Tracker.git
cd One-Piece-Voyage-Tracker
npm install
npm run dev
npm run build

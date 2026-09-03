<div align="center">

# 🏴‍☠️ One Piece Voyage Tracker

An interactive, spoiler-safe companion web application engineered to navigate all **1,120+ anime episodes** and **15 theatrical movies** in definitive chronological order.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Voyage-E53935?style=for-the-badge&logo=google-chrome&logoColor=white)](https://ey4o.github.io/One-Piece-Voyage-Tracker/)
[![Node Version](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](#prerequisites)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#disclaimer)

</div>

---

## ✨ Features

- 🧭 **Definitive Watch Roadmap**  
  Every canon arc, filler, OVA, and film positioned at its optimal milestone to eliminate character, plot, and ability spoilers.
- 🔢 **Global Episode Stepping & Direct Jumps**  
  Progress displays your actual current episode number (e.g., `Ep 579` ➔ `Ep 580` ➔ `Ep 581` in *Punk Hazard*). Includes `+1`, `-1`, and `+5` quick-advance buttons, alongside direct episode input.
- ⚓ **"Up Next" Sticky Quick Bar & Floating Beacon**  
  A persistent top banner shows your active arc and episode with an instant `+1 Next Episode` action. The floating action button (FAB) instantly scrolls back to your current arc card.
- ⏱️ **Cumulative Watch-Time & Filler Savings**  
  Real-time voyage metrics calculating total hours watched, days logged, and precise hours saved by bypassing non-canon filler.
- 🏆 **Visual Milestone Achievements**  
  Unlock animated badges across critical story peaks—from conquering *Arlong Park* and *Enies Lobby* to surviving *Marineford* and awakening *Sun God Nika (Gear 5)*.
- 🔗 **Shareable URL Query Strings**  
  Encode progress, captain aliases, and visual themes into reproducible links (e.g., `?ep=489&name=Mugiwara&theme=luffy`) with automated state restoration.
- 🛡️ **Spoiler Shield**  
  Blurs narrative summaries and milestone highlights for uncompleted episodes until actively hovered or marked as watched.
- 💰 **Dynamic Marine Bounty Progression**  
  Climb the World Government's most-wanted tier in real time as you complete sagas, log episodes, and recruit crew members.
- ⏳ **Pacing & Catch-Up Estimator**  
  Configure your daily viewing capacity to compute arrival dates for future milestones—from *Reverse Mountain* to *Wano* and *Egghead*.
- 🎨 **12 Straw Hat Themes**  
  Canonical palettes matching every crewmate, including *Luffy's Red Hawk Crimson*, *Zoro's Santoryu Emerald*, *Nami's Tangerine*, and *Sun God Nika*.
- ⚡ **Manga & One Pace Cross-References**  
  Direct chapter-to-episode alignments paired with runtime comparisons and time savings for *One Pace* releases.
- 💾 **Zero-Backend Persistence**  
  All states, custom bounty configurations, uploaded portraits, and themes persist client-side via `localStorage`, accompanied by full JSON import/export support.

---

## 📦 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Core Framework** | React 18 |
| **Build Tooling** | Vite |
| **Styling** | Tailwind CSS |
| **Iconography** | Lucide React |
| **Graphics Engine** | Native HTML5 Canvas API *(Wanted Poster rendering)* |
| **CI/CD & Hosting** | GitHub Pages via GitHub Actions |

---

## 🚀 Quick Start

### Prerequisites

Ensure you have **Node.js** (*v18 or newer*) and **npm** installed:

```bash
npm install
npm run dev

Open your browser and navigate to http://localhost:5173.


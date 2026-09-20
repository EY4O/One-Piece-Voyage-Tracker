import React, { useState, useMemo, useEffect, useRef } from 'react';
import { EPISODE_TITLES } from './data/episodeTitles';
import InstallPromptBanner from './InstallPromptBanner';
import ArcCard from './components/ArcCard';
import { Modal, ModeToggle, Navigation, ProgressBar, SpoilerContent, UpNextBar, VoyageHeader } from './components/VoyageUI';

// 12 Saga Background Artworks (src/assets/sagas/)
import bgEastBlue from './assets/sagas/1east-blue.jpg';
import bgAlabasta from './assets/sagas/2alabasta.jpg';
import bgSkypiea from './assets/sagas/3skypiea.jpg';
import bgWater7 from './assets/sagas/4water-7.jpg';
import bgThrillerBark from './assets/sagas/5thriller-bark.jpg';
import bgSummitWar from './assets/sagas/6summit-war.jpg';
import bgFishmanIsland from './assets/sagas/7fishman-island.jpg';
import bgDressrosa from './assets/sagas/8dressrosa-saga.jpg';
import bgWholeCake from './assets/sagas/9whole-cake.jpg';
import bgWano from './assets/sagas/10wano.jpg';
import bgFinalSaga from './assets/sagas/11final-saga.jpg';
import bgElbaph from './assets/sagas/12elbaph.jpg';

// 3 Custom Showcase Backgrounds (src/assets/sagas/)
import bgSunny from './assets/sagas/sunny.jpg';
import bgStrawHat from './assets/sagas/strawhat.jpg';
import bgMerry from './assets/sagas/merry.jpg';

import {
  Compass,
  Film,
  CheckCircle2,
  Flame,
  Search,
  Filter,
  CheckCheck,
  RotateCcw,
  Info,
  ChevronDown,
  ChevronUp,
  Trophy,
  ShieldCheck,
  AlertTriangle,
  Palette,
  Calculator,
  Lock,
  Image as ImageIcon,
  Settings,
  X,
  Coffee,
  Heart,
  Sailboat,
  Ship,
  Anchor,
  Waves,
  Flower2,
  Skull,
  Bell,
  HeartCrack,
  Droplet,
  Hand,
  KeyRound,
  Crown,
  Hourglass,
  Map,
  Zap,
  Flag,
  Swords,
  Bird,
  Sun,
  Star,
  Cpu,
  Castle
} from 'lucide-react';

// Background Map: Sagas + Custom Ship & Iconography Backgrounds
const BACKGROUND_ARTWORKS = {
  'east-blue': { name: 'East Blue', img: bgEastBlue, type: 'saga' },
  'alabasta': { name: 'Alabasta', img: bgAlabasta, type: 'saga' },
  'skypiea': { name: 'Skypiea', img: bgSkypiea, type: 'saga' },
  'water-7': { name: 'Water 7', img: bgWater7, type: 'saga' },
  'thriller-bark': { name: 'Thriller Bark', img: bgThrillerBark, type: 'saga' },
  'summit-war': { name: 'Summit War', img: bgSummitWar, type: 'saga' },
  'fishman-island': { name: 'Fish-Man Island', img: bgFishmanIsland, type: 'saga' },
  'dressrosa-saga': { name: 'Dressrosa', img: bgDressrosa, type: 'saga' },
  'whole-cake': { name: 'Whole Cake Island', img: bgWholeCake, type: 'saga' },
  'wano': { name: 'Wano Country', img: bgWano, type: 'saga' },
  'final-saga': { name: 'Final Saga (Egghead)', img: bgFinalSaga, type: 'saga' },
  'elbaph': { name: 'Elbaph', img: bgElbaph, type: 'saga' },

  'sunny': { name: 'Thousand Sunny', img: bgSunny, type: 'custom', icon: Sun },
  'strawhat': { name: 'Straw Hat', img: bgStrawHat, type: 'custom', icon: Crown },
  'merry': { name: 'Going Merry', img: bgMerry, type: 'custom', icon: Sailboat }
};

// Straw Hat Themes
const THEMES = {
  classic: {
    id: 'classic',
    name: 'Romance Dawn (Gold)',
    character: 'Classic One Piece',
    primary: '#f59e0b',
    primaryHover: '#d97706',
    border: 'border-amber-500/40',
    bgBadge: 'bg-amber-500/10',
    textBadge: 'text-amber-400',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    accentGlow: 'rgba(245, 158, 11, 0.15)'
  },
  luffy: {
    id: 'luffy',
    name: 'Luffy (Red Hawk)',
    character: 'Monkey D. Luffy',
    primary: '#ef4444',
    primaryHover: '#dc2626',
    border: 'border-red-500/40',
    bgBadge: 'bg-red-500/10',
    textBadge: 'text-red-400',
    gradient: 'from-red-500 via-rose-600 to-amber-600',
    accentGlow: 'rgba(239, 68, 68, 0.15)'
  },
  zoro: {
    id: 'zoro',
    name: 'Zoro (Santoryu)',
    character: 'Roronoa Zoro',
    primary: '#10b981',
    primaryHover: '#059669',
    border: 'border-emerald-500/40',
    bgBadge: 'bg-emerald-500/10',
    textBadge: 'text-emerald-400',
    gradient: 'from-emerald-500 via-teal-600 to-green-700',
    accentGlow: 'rgba(16, 185, 129, 0.15)'
  },
  nami: {
    id: 'nami',
    name: 'Nami (Cat Burglar)',
    character: 'Nami',
    primary: '#f97316',
    primaryHover: '#ea580c',
    border: 'border-orange-500/40',
    bgBadge: 'bg-orange-500/10',
    textBadge: 'text-orange-400',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    accentGlow: 'rgba(249, 115, 22, 0.15)'
  },
  usopp: {
    id: 'usopp',
    name: 'God Usopp (Sogeking)',
    character: 'Usopp',
    primary: '#eab308',
    primaryHover: '#ca8a04',
    border: 'border-yellow-500/40',
    bgBadge: 'bg-yellow-500/10',
    textBadge: 'text-yellow-400',
    gradient: 'from-yellow-500 via-amber-600 to-orange-600',
    accentGlow: 'rgba(234, 179, 8, 0.15)'
  },
  sanji: {
    id: 'sanji',
    name: 'Sanji (All Blue)',
    character: 'Sanji',
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    border: 'border-blue-500/40',
    bgBadge: 'bg-blue-500/10',
    textBadge: 'text-blue-400',
    gradient: 'from-blue-500 via-indigo-600 to-sky-500',
    accentGlow: 'rgba(59, 130, 246, 0.15)'
  },
  chopper: {
    id: 'chopper',
    name: 'Chopper (Sakura)',
    character: 'Tony Tony Chopper',
    primary: '#ec4899',
    primaryHover: '#db2777',
    border: 'border-pink-500/40',
    bgBadge: 'bg-pink-500/10',
    textBadge: 'text-pink-400',
    gradient: 'from-pink-500 via-rose-400 to-fuchsia-500',
    accentGlow: 'rgba(236, 72, 153, 0.15)'
  },
  robin: {
    id: 'robin',
    name: 'Robin (Fleur)',
    character: 'Nico Robin',
    primary: '#a855f7',
    primaryHover: '#9333ea',
    border: 'border-purple-500/40',
    bgBadge: 'bg-purple-500/10',
    textBadge: 'text-purple-400',
    gradient: 'from-purple-500 via-violet-600 to-indigo-600',
    accentGlow: 'rgba(168, 85, 247, 0.15)'
  },
  franky: {
    id: 'franky',
    name: 'Franky (SUPER)',
    character: 'Franky',
    primary: '#06b6d4',
    primaryHover: '#0891b2',
    border: 'border-cyan-500/40',
    bgBadge: 'bg-cyan-500/10',
    textBadge: 'text-cyan-400',
    gradient: 'from-cyan-500 via-teal-500 to-blue-600',
    accentGlow: 'rgba(6, 182, 212, 0.15)'
  },
  brook: {
    id: 'brook',
    name: 'Brook (Soul King)',
    character: 'Brook',
    primary: '#94a3b8',
    primaryHover: '#64748b',
    border: 'border-slate-400/40',
    bgBadge: 'bg-slate-400/10',
    textBadge: 'text-slate-300',
    gradient: 'from-slate-400 via-zinc-500 to-stone-600',
    accentGlow: 'rgba(148, 163, 184, 0.15)'
  },
  jinbe: {
    id: 'jinbe',
    name: 'Jinbe (First Son)',
    character: 'Jinbe',
    primary: '#0d9488',
    primaryHover: '#0f766e',
    border: 'border-teal-500/40',
    bgBadge: 'bg-teal-500/10',
    textBadge: 'text-teal-400',
    gradient: 'from-teal-500 via-cyan-600 to-emerald-700',
    accentGlow: 'rgba(13, 148, 136, 0.15)'
  },
  nika: {
    id: 'nika',
    name: 'Sun God Nika (Gear 5)',
    character: 'Drums of Liberation',
    primary: '#fbbf24',
    primaryHover: '#f59e0b',
    border: 'border-yellow-400/60',
    bgBadge: 'bg-yellow-400/20',
    textBadge: 'text-yellow-300',
    gradient: 'from-yellow-300 via-amber-400 to-white',
    accentGlow: 'rgba(251, 191, 36, 0.25)'
  }
};

// Sagas Master Dataset
const SAGAS_DATA = [
  {
    id: 'east-blue',
    title: 'East Blue Saga',
    tagline: 'The Romance Dawn and Gathering of the First Straw Hats',
    episodes: '1 – 61',
    mangaChapters: 'Chapters 1 – 100',
    crewJoined: ['Luffy', 'Zoro', 'Usopp', 'Sanji', 'Nami'],
    items: [
      { id: 'arc-1', title: 'Romance Dawn Arc', type: 'canon', episodes: '1 – 3', startEp: 1, endEp: 3, epCount: 3, chapters: 'Ch 1 – 7', onePace: '1 ep (39 min)', bountyReward: 1000000, description: 'Luffy sets sail, meets Koby, and recruits Pirate Hunter Zoro.', highlights: 'Luffy meets Zoro, Gum-Gum Fruit backstory with Shanks.', tier: 'Core' },
      { id: 'arc-2', title: 'Orange Town Arc', type: 'canon', episodes: '4 – 8', startEp: 4, endEp: 8, epCount: 5, chapters: 'Ch 8 – 21', onePace: '3 eps (1 hr 15m)', bountyReward: 2000000, description: 'Encounter with Buggy the Clown. Introduces Nami.', highlights: 'Chouchou the loyal dog, Luffy vs. Buggy.', tier: 'Core' },
      { id: 'ova-1', title: 'Defeat Him! The Pirate Ganzack! (OVA)', type: 'special', episodes: 'OVA (1998)', epCount: 1, bountyReward: 500000, description: 'First animated adaptation ever produced by Production I.G.', watchTip: 'Optional vintage novelty. Watch right after Orange Town.', tier: 'Vintage Side Story' },
      { id: 'arc-3', title: 'Syrup Village Arc', type: 'canon', episodes: '9 – 18', startEp: 9, endEp: 18, epCount: 10, chapters: 'Ch 22 – 41', onePace: '4 eps (1 hr 45m)', bountyReward: 5000000, description: 'Straw Hats defend Kaya from Captain Kuro. Usopp joins with Going Merry.', highlights: 'Usopp joins the crew, Going Merry gifted.', tier: 'Core' },
      { id: 'mov-1', title: 'Movie 1: One Piece: The Movie (2000)', type: 'movie', episodes: 'Movie (50 min)', epCount: 2, bountyReward: 1000000, description: 'The original film. Hunts for pirate Woonan treasure.', watchTip: 'Optional standalone film. Skippable unless you want extra early Straw Hat nostalgia.', skipReason: 'Standard non-canon Toei filler not written by Oda; hard to find and breaks early story momentum.', tier: 'Vintage Side Story' },
      { id: 'arc-4', title: 'Baratie Arc', type: 'canon', episodes: '19 – 30', startEp: 19, endEp: 30, epCount: 12, chapters: 'Ch 42 – 68', onePace: '6 eps (2 hr 40m)', bountyReward: 15000000, description: 'Ocean restaurant attacked by Don Krieg. Zoro duels Mihawk.', highlights: 'Sanji joins, Mihawk vs Zoro, Baratie defense.', tier: 'Core' },
      { id: 'arc-5', title: 'Arlong Park Arc', type: 'canon', episodes: '31 – 44', startEp: 31, endEp: 44, epCount: 14, chapters: 'Ch 69 – 95', onePace: '7 eps (3 hr 10m)', bountyReward: 30000000, description: 'Confronting Arlong to liberate Nami and Cocoyasi Village.', highlights: 'Walk to Arlong Park, Nami officially joins with 30M Bounty!', tier: 'Core' },
      { id: 'arc-6', title: 'Loguetown Arc', type: 'canon', episodes: '45, 48 – 53', startEp: 45, endEp: 53, epCount: 7, chapters: 'Ch 96 – 100', onePace: '3 eps (1 hr 15m)', bountyReward: 5000000, description: 'Where Gol D. Roger was executed. Smoker and Tashigi debut.', highlights: 'Luffy execution platform smile, Dragon in storm.', tier: 'Core' },
      { id: 'mov-2', title: 'Movie 2: Clockwork Island Adventure (2001)', type: 'movie', episodes: 'Movie (55 min)', epCount: 2, bountyReward: 1000000, description: 'Going Merry is stolen by the Trump Pirates!', watchTip: 'Watch after Episode 53 before Reverse Mountain.', skipReason: 'Early non-canon standalone film with zero impact on the overarching plot.', tier: 'Vintage Side Story' },
      { id: 'arc-7', title: 'Warship Island Arc', type: 'filler', episodes: '54 – 61', startEp: 54, endEp: 61, epCount: 8, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Apis and Millennium Dragon filler adventure.', watchTip: 'Filler. Skip straight to Episode 62.', skipReason: 'Anime-original side arc; has zero bearing on the Grand Line journey and disrupts momentum into Reverse Mountain.', tier: 'Filler' }
    ]
  },
  {
    id: 'alabasta',
    title: 'Arabasta / Alabasta Saga',
    tagline: 'Entering the Grand Line, Meeting Vivi, and Overthrowing Warlord Crocodile',
    episodes: '62 – 135',
    mangaChapters: 'Chapters 101 – 217',
    crewJoined: ['Tony Tony Chopper', 'Nico Robin'],
    items: [
      { id: 'arc-8', title: 'Reverse Mountain & Whisky Peak', type: 'canon', episodes: '62 – 67', startEp: 62, endEp: 67, epCount: 6, chapters: 'Ch 101 – 114', onePace: '4 eps (1 hr 45m)', bountyReward: 5000000, description: 'Entering Grand Line, meeting Laboon, uncovering Baroque Works.', highlights: 'Laboon promise, Princess Vivi reveal.', tier: 'Core' },
      { id: 'arc-9', title: 'Little Garden Arc', type: 'canon', episodes: '70 – 77', startEp: 70, endEp: 77, epCount: 8, chapters: 'Ch 115 – 129', onePace: '5 eps (2 hr 10m)', bountyReward: 8000000, description: 'Battling giants Dorry and Brogy and agent Mr. 3.', highlights: 'Giant warriors honor, Usopp warrior dream.', tier: 'Core' },
      { id: 'arc-10', title: 'Drum Island Arc', type: 'canon', episodes: '78 – 91', startEp: 78, endEp: 91, epCount: 14, chapters: 'Ch 130 – 154', onePace: '7 eps (3 hr 00m)', bountyReward: 15000000, description: 'Winter kingdom ruled by tyrant Wapol. Chopper joins.', highlights: 'Chopper joins, Dr. Hiriluk cherry blossom speech.', tier: 'Core' },
      { id: 'mov-3', title: 'Movie 3: Chopper’s Kingdom on Strange Island', type: 'movie', episodes: 'Movie (56 min)', epCount: 2, bountyReward: 1000000, description: 'Chopper crowned animal king of Crown Island.', watchTip: 'Watch right after Drum Island (Episode 91).', skipReason: 'Early standalone festival movie not written by Oda; completely non-essential.', tier: 'Vintage Side Story' },
      { id: 'arc-11', title: 'Alabasta Arc', type: 'canon', episodes: '92 – 130', startEp: 92, endEp: 130, epCount: 39, chapters: 'Ch 155 – 217', onePace: '15 eps (7 hr 30m)', bountyReward: 70000000, description: 'Desert civil war by Crocodile. Showdown with Ace & Vivi.', highlights: 'Luffy vs Crocodile 1-3, Robin joins. 100M Bounty!', tier: 'Core' },
      { id: 'arc-12', title: 'Post-Alabasta Filler Episodes', type: 'filler', episodes: '131 – 135', startEp: 131, endEp: 135, epCount: 5, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Standalone character focus episodes.', watchTip: 'Filler. Skippable.', skipReason: 'Slice-of-life episodic vignettes with no ongoing narrative progression.', tier: 'Filler' }
    ]
  },
  {
    id: 'skypiea',
    title: 'Sky Island / Skypiea Saga',
    tagline: 'Knock Up Stream to the Heavens, Ancient City of Gold, and God Enel',
    episodes: '136 – 206',
    mangaChapters: 'Chapters 218 – 302',
    crewJoined: [],
    items: [
      { id: 'arc-13', title: 'Goat Island & Ruluka Island Arcs', type: 'filler', episodes: '136 – 143', startEp: 136, endEp: 143, epCount: 8, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Filler arcs with Zenny goats and Rainbow Mist.', watchTip: 'Filler. Skip to 144.', skipReason: 'Standalone anime-original detours that delay the Jaya & Skypiea storyline.', tier: 'Filler' },
      { id: 'mov-4', title: 'Movie 4: Dead End Adventure (2003)', type: 'movie', episodes: 'Movie (95 min)', epCount: 4, bountyReward: 5000000, description: 'Straw Hats join underground pirate regatta race.', watchTip: '⭐ Highly Recommended! Watch between Ep 138-143.', tier: 'Must Watch' },
      { id: 'mov-5', title: 'Movie 5: The Cursed Holy Sword (2004)', type: 'movie', episodes: 'Movie (95 min)', epCount: 4, bountyReward: 2000000, description: 'Zoro-centric film dealing with cursed sword.', watchTip: 'Skippable movie.', skipReason: 'Non-canon movie contradicting Zoro swordsmanship rules; skippable.', tier: 'Vintage Side Story' },
      { id: 'arc-14', title: 'Jaya Arc', type: 'canon', episodes: '144 – 152', startEp: 144, endEp: 152, epCount: 9, chapters: 'Ch 218 – 236', onePace: '5 eps (2 hr 10m)', bountyReward: 10000000, description: 'Mock Town pirate haven. Meeting Blackbeard.', highlights: 'Blackbeard dreams speech, Knock Up Stream.', tier: 'Core' },
      { id: 'arc-15', title: 'Skypiea Arc', type: 'canon', episodes: '153 – 195', startEp: 153, endEp: 195, epCount: 43, chapters: 'Ch 237 – 302', onePace: '24 eps (10 hr 30m)', bountyReward: 50000000, description: 'White clouds 10,000m high. Survival against God Enel.', highlights: 'Golden Bell rings, Mont Blanc Noland story.', tier: 'Core' },
      { id: 'arc-16', title: 'G-8 Arc (Navarone Marine Base)', type: 'recommended_filler', episodes: '196 – 206', startEp: 196, endEp: 206, epCount: 11, chapters: 'Anime Original', onePace: 'Retained by Fans', bountyReward: 10000000, description: 'Falling into Vice Admiral Jonathan fortress.', watchTip: 'Essential filler. Elite writing.', tier: 'Must Watch' }
    ]
  },
  {
    id: 'water-7',
    title: 'Water 7 & Enies Lobby Saga',
    tagline: 'CP9 Conspiracy, Robin’s Past, Gear 2nd, and the Fall of Enies Lobby',
    episodes: '207 – 325',
    mangaChapters: 'Chapters 303 – 441',
    crewJoined: ['Franky'],
    items: [
      { id: 'mov-6', title: 'Movie 6: Baron Omatsuri (2005)', type: 'movie', episodes: 'Movie (91 min)', epCount: 4, bountyReward: 8000000, description: 'Directed by Mamoru Hosoda. Dark psychological thriller.', watchTip: '⭐ MASTERPIECE FILM! Watch before Water 7.', tier: 'Must Watch' },
      { id: 'arc-17', title: 'Long Ring Long Land (Davy Back)', type: 'mixed', episodes: '207 – 219', startEp: 207, endEp: 219, epCount: 13, chapters: 'Ch 303 – 321', onePace: '5 eps (2 hr 10m)', bountyReward: 5000000, description: 'Sports contest vs Foxy; Admiral Aokiji debut.', highlights: 'Afro Luffy, Admiral Aokiji ice power.', tier: 'Core' },
      { id: 'arc-18', title: 'Ocean’s Dream & Foxy Return', type: 'filler', episodes: '220 – 226', startEp: 220, endEp: 226, epCount: 7, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Memory theft filler. Skip to 227.', watchTip: 'Filler.', skipReason: 'Based on a PS1 video game plot line followed by non-canon Foxy filler; completely skippable before Water 7.', tier: 'Filler' },
      { id: 'mov-7', title: 'Movie 7: Mechanical Soldier of Karakuri', type: 'movie', episodes: 'Movie (94 min)', epCount: 4, bountyReward: 3000000, description: 'Mecha puzzle adventure on Karakuri Island.', watchTip: 'Watch before 227.', skipReason: 'Puzzle comedy film with zero canonical bearing on CP9 or Water 7.', tier: 'Vintage Side Story' },
      { id: 'arc-19', title: 'Water 7 Arc', type: 'canon', episodes: '227 – 263', startEp: 227, endEp: 263, epCount: 37, chapters: 'Ch 322 – 374', onePace: '20 eps (9 hr 10m)', bountyReward: 40000000, description: 'City of water. Merry unfixable, CP9 unmasked.', highlights: 'Luffy vs Usopp, CP9 undercover reveal.', tier: 'Core' },
      { id: 'arc-20', title: 'Enies Lobby Arc', type: 'canon', episodes: '264 – 312', startEp: 264, endEp: 312, epCount: 49, chapters: 'Ch 375 – 430', onePace: '26 eps (12 hr 00m)', bountyReward: 200000000, description: 'Straw Hats declare war on world government for Robin.', highlights: 'Gear 2nd/3rd, "I Want To Live!", Merry farewell. 300M Bounty!', tier: 'Core' },
      { id: 'arc-21', title: 'Post-Enies Lobby Arc', type: 'canon', episodes: '313 – 325', startEp: 313, endEp: 325, epCount: 13, chapters: 'Ch 431 – 441', onePace: '6 eps (2 hr 40m)', bountyReward: 20000000, description: 'Garp reveals Dragon; Thousand Sunny completed.', highlights: 'Franky joins, Ace vs Blackbeard.', tier: 'Core' }
    ]
  },
  {
    id: 'thriller-bark',
    title: 'Thriller Bark Saga',
    tagline: 'Haunted Pirate Ship Island, Warlord Moria, and Brook',
    episodes: '326 – 384',
    mangaChapters: 'Chapters 442 – 489',
    crewJoined: ['Brook'],
    items: [
      { id: 'arc-22', title: 'Ice Hunter Arc', type: 'filler', episodes: '326 – 335', startEp: 326, endEp: 335, epCount: 10, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Accino bounty hunters steal pirate flag.', watchTip: 'Filler. Skip to 337.', skipReason: 'Anime-only bounty hunter conflict with no canon continuity consequences.', tier: 'Filler' },
      { id: 'arc-23', title: 'Thriller Bark Arc', type: 'canon', episodes: '337 – 381', startEp: 337, endEp: 381, epCount: 45, chapters: 'Ch 442 – 489', onePace: '23 eps (10 hr 30m)', bountyReward: 60000000, description: 'Ghost island in Florian Triangle. Battles vs zombies.', highlights: 'Binks Sake, Zoro "Nothing Happened" sacrifice.', tier: 'Core' },
      { id: 'arc-24', title: 'Spa Island & Romance Dawn Story', type: 'filler', episodes: '382 – 384', startEp: 382, endEp: 384, epCount: 3, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Vacation filler with Foxy cameos.', watchTip: 'Filler. Skip to 385.', skipReason: 'Comedy resort filler; skip straight to the Sabaody Archipelago Arc.', tier: 'Filler' }
    ]
  },
  {
    id: 'summit-war',
    title: 'Summit War / Marineford Saga',
    tagline: 'Worst Generation, Straw Hat Separation, Impel Down, and Marineford',
    episodes: '385 – 516',
    mangaChapters: 'Chapters 490 – 597',
    crewJoined: [],
    items: [
      { id: 'arc-25', title: 'Sabaody Archipelago Arc', type: 'canon', episodes: '385 – 405', startEp: 385, endEp: 405, epCount: 21, chapters: 'Ch 490 – 513', onePace: '11 eps (5 hr 15m)', bountyReward: 50000000, description: 'Celestial dragon punched; Kuma separates crew.', highlights: 'Rayleigh intro, tragic separation of Straw Hats.', tier: 'Core' },
      { id: 'arc-26', title: 'Amazon Lily Arc', type: 'canon', episodes: '408 – 421', startEp: 408, endEp: 421, epCount: 14, chapters: 'Ch 514 – 524', onePace: '6 eps (2 hr 45m)', bountyReward: 20000000, description: 'Luffy lands on women-only island of Boa Hancock.', highlights: 'Boa Hancock backstory, Ace execution news.', tier: 'Core' },
      { id: 'arc-27', title: 'Little East Blue Arc', type: 'filler', episodes: '426 – 429', startEp: 426, endEp: 429, epCount: 4, chapters: 'Film Tie-in', onePace: 'Skipped', bountyReward: 2000000, description: 'Prologue tie-in to Strong World film.', watchTip: 'Watch right before Strong World!', skipReason: 'Prequel tie-in specifically produced for Film Strong World; optional if not watching the movie.', tier: 'Recommended' },
      { id: 'mov-10', title: 'Movie 10: Film Strong World & Ep 0', type: 'movie', episodes: 'Movie (115 min)', epCount: 5, bountyReward: 15000000, description: 'Written by Oda. Battle against Golden Lion Shiki.', watchTip: '⭐ MUST WATCH! Watch Ep 0 first.', tier: 'Must Watch' },
      { id: 'mov-11', title: 'Movie 11: Straw Hat Chase 3D', type: 'movie', episodes: 'Short (30 min)', epCount: 1, bountyReward: 1000000, description: 'Fast 3D chase to recover Straw Hat.', watchTip: 'Fun short.', tier: 'Side Story' },
      { id: 'arc-28', title: 'Impel Down Arc', type: 'canon', episodes: '422 – 425, 430 – 456', startEp: 422, endEp: 456, epCount: 31, chapters: 'Ch 525 – 549', onePace: '16 eps (7 hr 40m)', bountyReward: 80000000, description: 'Underwater prison break with Buggy, Bon Clay, Jinbe.', highlights: 'Warden Magellan, Bon Clay heroic sacrifice.', tier: 'Core' },
      { id: 'arc-29', title: 'Marineford Arc (Paramount War)', type: 'canon', episodes: '457 – 489', startEp: 457, endEp: 489, epCount: 33, chapters: 'Ch 550 – 580', onePace: '16 eps (7 hr 30m)', bountyReward: 100000000, description: 'Whitebeard and Luffy storm Marine HQ to rescue Ace.', highlights: '"The One Piece is real!", Ace & Luffy brotherhood. 400M Bounty!', tier: 'Core' },
      { id: 'arc-30', title: 'Post-War Arc & ASL Flashback', type: 'canon', episodes: '490 – 516', startEp: 490, endEp: 516, epCount: 27, chapters: 'Ch 581 – 597', onePace: '10 eps (4 hr 45m)', bountyReward: 30000000, description: 'Luffy, Ace, and Sabo childhood; 3D2Y message.', highlights: 'Sake cup oath, Rayleigh training begins.', tier: 'Core' },
      { id: 'sp-3d2y', title: 'Special: 3D2Y (Timeskip Special)', type: 'special', episodes: 'Special (107 min)', epCount: 4, bountyReward: 10000000, description: '2-year training period on Rusukaina Island.', watchTip: '⭐ Great bridge special! Watch after Ep 516.', tier: 'Recommended' }
    ]
  },
  {
    id: 'fishman-island',
    title: 'Fish-Man Island Saga (Post-Timeskip)',
    tagline: 'Reunion at Sabaody 2 Years Later and Voyage into the Deep Ocean',
    episodes: '517 – 574',
    mangaChapters: 'Chapters 598 – 653',
    crewJoined: [],
    items: [
      { id: 'arc-31', title: 'Return to Sabaody Arc', type: 'canon', episodes: '517 – 522', startEp: 517, endEp: 522, epCount: 6, chapters: 'Ch 598 – 602', onePace: '3 eps (1 hr 20m)', bountyReward: 10000000, description: 'Straw Hats reunite with monstrous new powers.', highlights: 'Pacifista one-shot, setting sail to deep sea.', tier: 'Core' },
      { id: 'arc-32', title: 'Fish-Man Island Arc', type: 'canon', episodes: '523 – 574', startEp: 523, endEp: 574, epCount: 52, chapters: 'Ch 603 – 653', onePace: '24 eps (11 hr 00m)', bountyReward: 40000000, description: '10,000 meters down. Fisher Tiger lore and Poseidon.', highlights: '50,000 Conqueror knockout, Big Mom challenge.', tier: 'Core' }
    ]
  },
  {
    id: 'dressrosa-saga',
    title: 'Dressrosa Saga',
    tagline: 'Alliance with Trafalgar Law and the Fall of Doflamingo',
    episodes: '575 – 746',
    mangaChapters: 'Chapters 654 – 801',
    crewJoined: ['Grand Fleet Formed'],
    items: [
      { id: 'arc-33', title: 'Z’s Ambition Arc', type: 'filler', episodes: '575 – 578', startEp: 575, endEp: 578, epCount: 4, chapters: 'Film Tie-in', onePace: 'Skipped', bountyReward: 2000000, description: 'Neo Navy filler leading into Film Z.', watchTip: 'Watch right before Film Z.', skipReason: 'Anime tie-in prologue set up strictly for Film: Z.', tier: 'Recommended' },
      { id: 'mov-12', title: 'Movie 12: Film: Z (2012)', type: 'movie', episodes: 'Movie (108 min)', epCount: 5, bountyReward: 20000000, description: 'Former Admiral Zephyr plans to destroy the New World.', watchTip: '⭐ MASTERPIECE FILM! Considered top film.', tier: 'Must Watch' },
      { id: 'arc-34', title: 'Punk Hazard Arc', type: 'canon', episodes: '579 – 625', startEp: 579, endEp: 625, epCount: 47, chapters: 'Ch 654 – 699', onePace: '22 eps (10 hr 15m)', bountyReward: 60000000, description: 'Half-ice half-fire island. Law and Luffy forge alliance.', highlights: 'Pirate Alliance formed, Caesar Clown defeat.', tier: 'Core' },
      { id: 'arc-35', title: 'Caesar Retrieval Arc', type: 'filler', episodes: '626 – 628', startEp: 626, endEp: 628, epCount: 3, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Filler arc where Breed kidnaps Caesar.', watchTip: 'Filler. Skip to 629.', skipReason: 'Brief side detour between Punk Hazard and Dressrosa with no canonical stakes.', tier: 'Filler' },
      { id: 'arc-36', title: 'Dressrosa Arc', type: 'canon', episodes: '629 – 746', startEp: 629, endEp: 746, epCount: 118, chapters: 'Ch 700 – 801', onePace: '48 eps (23 hr 30m)', bountyReward: 200000000, description: 'Corrida Colosseum, Doflamingo Birdcage, Gear 4th.', highlights: 'Sabo inherits flame fruit, Gear 4th Boundman. 500M Bounty!', tier: 'Core' },
      { id: 'sp-sabo', title: 'Special: Episode of Sabo & Nebulandia', type: 'special', episodes: 'Specials', epCount: 4, bountyReward: 5000000, description: 'Sabo perspective retelling and Nebulandia.', watchTip: 'Optional bonus watches.', tier: 'Optional' }
    ]
  },
  {
    id: 'whole-cake',
    title: 'Whole Cake Island & Zou Saga',
    tagline: 'Sanji Vinsmoke Heritage and Infiltrating Big Mom Territory',
    episodes: '747 – 889',
    mangaChapters: 'Chapters 802 – 908',
    crewJoined: [],
    items: [
      { id: 'arc-37', title: 'Silver Mine & Heart of Gold', type: 'filler', episodes: '747 – 750 + Special', startEp: 747, endEp: 750, epCount: 6, chapters: 'Film Tie-in', onePace: 'Skipped', bountyReward: 5000000, description: 'Film Gold tie-in adventure.', watchTip: 'Watch right before Film Gold.', skipReason: 'Lead-in adventure designed exclusively to promote Film: Gold.', tier: 'Recommended' },
      { id: 'mov-13', title: 'Movie 13: Film: Gold (2016)', type: 'movie', episodes: 'Movie (120 min)', epCount: 5, bountyReward: 25000000, description: 'Glamorous casino heist thriller aboard Gran Tesoro.', watchTip: '⭐ Fantastic spectacle. Watch after 750.', tier: 'Must Watch' },
      { id: 'arc-38', title: 'Zou Arc', type: 'canon', episodes: '751 – 779', startEp: 751, endEp: 779, epCount: 29, chapters: 'Ch 802 – 824', onePace: '12 eps (5 hr 30m)', bountyReward: 50000000, description: 'Elephant island Zunesha. Mink Tribe and Road Poneglyphs.', highlights: '"Raizo is safe!", Road Poneglyphs explained.', tier: 'Core' },
      { id: 'arc-39', title: 'Marine Rookie Arc', type: 'filler', episodes: '780 – 782', startEp: 780, endEp: 782, epCount: 3, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Luffy raids a marine base for food.', watchTip: 'Filler. Skip to 783.', skipReason: 'Short food-raid diversion right before infiltrating Big Mom territory.', tier: 'Filler' },
      { id: 'arc-40', title: 'Whole Cake Island Arc', type: 'canon', episodes: '783 – 877', startEp: 783, endEp: 877, epCount: 95, chapters: 'Ch 825 – 902', onePace: '39 eps (19 hr 00m)', bountyReward: 500000000, description: 'Crashing Big Mom Tea Party to rescue Sanji.', highlights: 'Luffy vs Katakuri, Snakeman form. 1.5 Billion Bounty!', tier: 'Core' },
      { id: 'arc-41', title: 'Levely / Reverie Arc', type: 'canon', episodes: '878 – 889', startEp: 878, endEp: 889, epCount: 12, chapters: 'Ch 903 – 908', onePace: '5 eps (2 hr 15m)', bountyReward: 100000000, description: 'Monarchs assemble; Im-sama and Empty Throne.', highlights: 'Fifth Emperor headline, giant straw hat.', tier: 'Core' }
    ]
  },
  {
    id: 'wano',
    title: 'Wano Country Saga',
    tagline: 'Samurai Realm, Oden Legend, Onigashima, and Gear 5 Awakening',
    episodes: '890 – 1085',
    mangaChapters: 'Chapters 909 – 1057',
    crewJoined: ['Jinbe'],
    items: [
      { id: 'arc-42', title: 'Wano Country Arc – Act 1', type: 'canon', episodes: '890 – 894', startEp: 890, endEp: 894, epCount: 5, chapters: 'Ch 909 – 924', onePace: '3 eps (1 hr 20m)', bountyReward: 50000050, description: 'Entering Wano. Clashing with Kaido.', highlights: 'Kaido Thunder Bagua one-shot.', tier: 'Core' },
      { id: 'arc-43', title: 'Cidre Guild (Stampede Tie-in)', type: 'filler', episodes: '895 – 896', startEp: 895, endEp: 896, epCount: 2, chapters: 'Film Tie-in', onePace: 'Skipped', bountyReward: 2000000, description: 'Tie-in for Stampede.', watchTip: 'Watch before Stampede.', skipReason: 'Two-episode anime filler introducing Bounty Hunter Guild Cidre to promote Stampede.', tier: 'Recommended' },
      { id: 'mov-14', title: 'Movie 14: One Piece: Stampede', type: 'movie', episodes: 'Movie (101 min)', epCount: 5, bountyReward: 40000000, description: 'Pirate festival vs Douglas Bullet.', watchTip: '⭐ Non-stop dream team fights.', tier: 'Must Watch' },
      { id: 'arc-44', title: 'Wano Act 2 & Udon Prison', type: 'canon', episodes: '897 – 958', startEp: 897, endEp: 958, epCount: 62, chapters: 'Ch 925 – 955', onePace: '26 eps (12 hr 30m)', bountyReward: 150000000, description: 'Luffy masters Advanced Ryou in prison.', highlights: 'Zoro receives blade Enma.', tier: 'Core' },
      { id: 'arc-45', title: 'Wano Act 3: Oden & Raid Launch', type: 'canon', episodes: '959 – 1028', startEp: 959, endEp: 1028, epCount: 70, chapters: 'Ch 956 – 1010', onePace: '32 eps (15 hr 45m)', bountyReward: 300000000, description: 'Oden voyage with Whitebeard and Roger. Raid begins.', highlights: 'Roger "He Laughed", Jinbe arrives.', tier: 'Core' },
      { id: 'arc-46', title: 'Uta Past (Film Red Tie-in)', type: 'mixed', episodes: '1029 – 1030', startEp: 1029, endEp: 1030, epCount: 2, chapters: 'Film Tie-in', onePace: 'Skipped', bountyReward: 5000000, description: 'Luffy childhood with Uta.', watchTip: 'Watch before Film Red.', skipReason: 'Flashback prologue tie-in specifically produced for Film: Red.', tier: 'Recommended' },
      { id: 'mov-15', title: 'Movie 15: Film: Red (2022)', type: 'movie', episodes: 'Movie (115 min)', epCount: 5, bountyReward: 50000000, description: 'Diva Uta on Elegia island. Shanks in action.', watchTip: '⭐ Phenomenal soundtrack by Ado.', tier: 'Must Watch' },
      { id: 'arc-47', title: 'Wano Climax & Gear 5 Awakening', type: 'canon', episodes: '1031 – 1085', startEp: 1031, endEp: 1085, epCount: 55, chapters: 'Ch 1011 – 1057', onePace: '25 eps (12 hr 00m)', bountyReward: 1500000000, description: 'Gear 5 Drums of Liberation defeats Kaido.', highlights: 'Ep 1071 Gear 5, Emperor Luffy. 3 Billion Bounty!', tier: 'Core' }
    ]
  },
  {
    id: 'final-saga',
    title: 'Final Saga (Egghead Island & Beyond)',
    tagline: 'Dr. Vegapunk, Island of Future, and Global Race for the One Piece',
    episodes: '1086 – Present',
    mangaChapters: 'Chapters 1058 – Present',
    crewJoined: [],
    items: [
      { id: 'arc-48', title: 'Egghead Island Arc', type: 'canon', episodes: '1086 – 1155', startEp: 1086, endEp: 1155, epCount: 70, chapters: 'Ch 1058 – 1125', onePace: 'In Production', bountyReward: 500000000, description: 'Future island of Dr. Vegapunk. Global broadcast.', highlights: 'Kuma backstory, Vegapunk broadcast. 3.5B Bounty!', tier: 'Core' },
      { id: 'sp-fanletter', title: 'Special: ONE PIECE FAN LETTER (2024)', type: 'special', episodes: 'Special (25 min)', epCount: 2, bountyReward: 10000000, description: 'Masterpiece 25th anniversary episode by Megumi Ishitani.', watchTip: '⭐ MASTERPIECE OF ANIMATION.', tier: 'Must Watch' },
      { id: 'arc-49', title: 'Elbaph Arc (Warland)', type: 'canon', episodes: '1156 – Present', startEp: 1156, endEp: 1177, epCount: 22, chapters: 'Ch 1126 – Present', onePace: 'TBA', bountyReward: 1000000000, description: 'Arrival at the legendary realm of warrior giants, ancient lore of the Sun God, and the mythical tree Yggdrasil.', highlights: 'Dorry & Brogy reunion, mystery of the Sun God, giants of Elbaph.', tier: 'Core' },
      { id: 'mov-16', title: 'Movie 16: One Piece Film: God Valley', type: 'movie', episodes: 'Theatrical (Summer 2027)', epCount: 5, bountyReward: 60000000, description: 'ONE PIECE FILM GOD VALLEY (Wan Pīsu Firumu Goddo Barē). The legendary incident that shook the world.', watchTip: 'Upcoming theatrical release (Summer 2027). Watch after the Egghead & Elbaph revelations.', tier: 'Must Watch' },
      { id: 'mov-17', title: 'Movie 17: One Piece Film: Baad', type: 'movie', episodes: 'Theatrical (2029)', epCount: 5, bountyReward: 75000000, description: 'ONE PIECE FILM BAAD. The high-stakes theatrical spectacle set in the climax era of the Final Saga.', watchTip: 'Upcoming theatrical release (2029). Anticipated for the late Final Saga.', tier: 'Must Watch' }
    ]
  }
];

// PIRATE ACHIEVEMENTS SYSTEM
const ACHIEVEMENTS = [
  { id: 'ach-1', title: 'Setting Sail', icon: Sailboat, tier: 'Bronze', description: 'Watched Episode 1 and began the journey across the Grand Line.', check: (watched, sub, eps) => eps >= 1 },
  { id: 'ach-2', title: 'East Blue Conqueror', icon: Waves, tier: 'Bronze', description: 'Defeated Arlong and liberated Cocoyasi Village.', check: (watched) => watched.has('arc-5') },
  { id: 'ach-3', title: 'Entering the Grand Line', icon: Compass, tier: 'Bronze', description: 'Scaled Reverse Mountain and passed through the Twin Capes.', check: (watched) => watched.has('arc-8') },
  { id: 'ach-4', title: 'Cherry Blossoms in Winter', icon: Flower2, tier: 'Silver', description: 'Witnessed Dr. Hiriluk miracle and recruited Tony Tony Chopper.', check: (watched) => watched.has('arc-10') },
  { id: 'ach-5', title: 'Warlord Down: Crocodile', icon: Skull, tier: 'Silver', description: 'Saved Alabasta and brought rain to the desert.', check: (watched) => watched.has('arc-11') },
  { id: 'ach-6', title: 'Ring the Golden Bell', icon: Bell, tier: 'Silver', description: 'Proved the City of Gold exists 10,000 meters in the sky.', check: (watched) => watched.has('arc-15') },
  { id: 'ach-7', title: 'Navarone Escapist', icon: Anchor, tier: 'Bronze', description: 'Completed G-8, the greatest filler arc in anime history.', check: (watched) => watched.has('arc-16') },
  { id: 'ach-8', title: 'Say You Want to Live!', icon: Flame, tier: 'Gold', description: 'Declared war on the World Government at Enies Lobby.', check: (watched) => watched.has('arc-20') },
  { id: 'ach-9', title: 'Farewell, Merry', icon: HeartCrack, tier: 'Silver', description: 'Said goodbye to the Going Merry on the snowy ocean.', check: (watched, sub, eps) => eps >= 312 },
  { id: 'ach-10', title: 'Nothing Happened', icon: Droplet, tier: 'Gold', description: 'Survived Bartholomew Kuma trial on Thriller Bark.', check: (watched) => watched.has('arc-23') },
  { id: 'ach-11', title: 'Celestial Punch', icon: Hand, tier: 'Silver', description: 'Punched Saint Charlos at the Sabaody Auction House.', check: (watched, sub, eps) => eps >= 396 },
  { id: 'ach-12', title: 'Great Prison Infiltration', icon: KeyRound, tier: 'Silver', description: 'Broke all levels of Impel Down with the pirate alliance.', check: (watched) => watched.has('arc-28') },
  { id: 'ach-13', title: 'The One Piece Is Real!', icon: Crown, tier: 'Gold', description: 'Witnessed the climax of the Paramount War at Marineford.', check: (watched) => watched.has('arc-29') },
  { id: 'ach-14', title: '3D2Y Rebirth', icon: Hourglass, tier: 'Silver', description: 'Completed the pre-timeskip era and began the 2-year training.', check: (watched) => watched.has('arc-30') },
  { id: 'ach-15', title: 'Halfway Mark', icon: Map, tier: 'Gold', description: 'Watched over 500 total episodes and specials.', check: (watched, sub, eps) => eps >= 500 },
  { id: 'ach-16', title: 'Deep Ocean Emancipator', icon: Ship, tier: 'Silver', description: 'Protected Fish-Man Island and learned of Joy Boy.', check: (watched) => watched.has('arc-32') },
  { id: 'ach-17', title: 'The Boundman Awakens', icon: Zap, tier: 'Gold', description: 'Unlocked Fourth Gear and shattered Doflamingo Birdcage.', check: (watched) => watched.has('arc-36') },
  { id: 'ach-18', title: 'Grand Fleet Founder', icon: Flag, tier: 'Silver', description: 'Formed the 5,600-member Straw Hat Grand Fleet.', check: (watched, sub, eps) => eps >= 745 },
  { id: 'ach-19', title: 'Raizo Is Safe!', icon: Swords, tier: 'Silver', description: 'Discovered the Mink Tribe loyalty and the Road Poneglyphs.', check: (watched) => watched.has('arc-38') },
  { id: 'ach-20', title: 'Fifth Emperor of the Sea', icon: Bird, tier: 'Gold', description: 'Escaped Whole Cake Island with a 1.5 Billion Bounty.', check: (watched) => watched.has('arc-40') },
  { id: 'ach-21', title: 'Drums of Liberation', icon: Sun, tier: 'Platinum', description: 'Witnessed the Gear 5th Sun God Nika awakening in Wano.', check: (watched) => watched.has('arc-47') },
  { id: 'ach-22', title: 'Millennium Voyager', icon: Star, tier: 'Platinum', description: 'Watched 1,000+ total episodes of One Piece.', check: (watched, sub, eps) => eps >= 1000 },
  { id: 'ach-23', title: 'Future Island Scholar', icon: Cpu, tier: 'Gold', description: 'Arrived at Dr. Vegapunk future island of Egghead.', check: (watched, sub, eps) => eps >= 1086 },
  { id: 'ach-24', title: 'King of the Pirates', icon: Trophy, tier: 'Platinum', description: 'Caught up with the entire Grand Line broadcast voyage!', check: (watched, sub, eps, total) => eps >= total && total > 0 },
  { id: 'ach-25', title: 'Warland of Giants', icon: Castle, tier: 'Platinum', description: 'Reached Elbaph and stepped into the legendary realm of warrior giants.', check: (watched) => watched.has('arc-49') }
];

// Helper to look up or generate episode title
function getEpisodeTitle(epNumber, arcTitle) {
  if (EPISODE_TITLES && EPISODE_TITLES[epNumber]) {
    return EPISODE_TITLES[epNumber];
  }
  return `${arcTitle || 'Grand Line'} — Episode ${epNumber}`;
}

// The selected character palette drives the accent ramp in both colour modes.
// Dark mode lifts the hue toward white so it reads on navy; light mode pulls it
// toward ink so the same accent stays legible on parchment. Both ramps are
// published as channel triplets so Tailwind's /alpha modifiers keep working.
const INK_RGB = [21, 32, 46];
const WHITE_RGB = [255, 255, 255];

function accentRamp(hex) {
  const value = parseInt(hex.replace('#', ''), 16);
  const base = [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  const mix = (target, amount) => base.map((c, i) => Math.round(c + (target[i] - c) * amount)).join(' ');
  const pure = base.join(' ');
  return {
    '--a100-dark': mix(WHITE_RGB, 0.64), '--a200-dark': mix(WHITE_RGB, 0.5),
    '--a300-dark': mix(WHITE_RGB, 0.36), '--a400-dark': mix(WHITE_RGB, 0.2),
    '--a500-dark': pure,
    '--a600-dark': mix(INK_RGB, 0.2), '--a700-dark': mix(INK_RGB, 0.38),

    '--a100-light': mix(INK_RGB, 0.72), '--a200-light': mix(INK_RGB, 0.64),
    '--a300-light': mix(INK_RGB, 0.56), '--a400-light': mix(INK_RGB, 0.48),
    '--a500-light': pure,
    '--a600-light': mix(INK_RGB, 0.3), '--a700-light': mix(INK_RGB, 0.52)
  };
}

export default function App() {
  const [activeThemeId, setActiveThemeId] = useState(() => localStorage.getItem('op_tracker_theme') || 'classic');
  const [bgMode, setBgMode] = useState(() => localStorage.getItem('op_header_bg_mode') || 'auto');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [compactView, setCompactView] = useState(() => localStorage.getItem('op_compact_view') === 'true');
  const [canonPuristMode, setCanonPuristMode] = useState(() => localStorage.getItem('op_canon_purist_mode') === 'true');

  useEffect(() => {
    localStorage.setItem('op_compact_view', compactView.toString());
  }, [compactView]);

  useEffect(() => {
    localStorage.setItem('op_canon_purist_mode', canonPuristMode.toString());
  }, [canonPuristMode]);

  // 'system' follows prefers-color-scheme; an explicit choice is remembered.
  const [colorMode, setColorMode] = useState(() => {
    try {
      const saved = localStorage.getItem('op_color_mode');
      return saved === 'light' || saved === 'dark' ? saved : 'system';
    } catch {
      return 'system';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (colorMode === 'system') root.removeAttribute('data-mode');
    else root.setAttribute('data-mode', colorMode);
    try { localStorage.setItem('op_color_mode', colorMode); } catch { /* storage unavailable */ }
  }, [colorMode]);

  // Keep the PWA status bar in step with whichever mode is actually showing.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      const dark = colorMode === 'dark' || (colorMode === 'system' && query.matches);
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0B121C' : '#F2EADB');
    };
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, [colorMode]);

  const [watchedIds, setWatchedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('op_tracker_watched');
      return saved ? new Set(JSON.parse(saved)) : new Set(['arc-1', 'arc-2']);
    } catch {
      return new Set(['arc-1', 'arc-2']);
    }
  });

  const [skippedIds, setSkippedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('op_tracker_skipped');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [subProgress, setSubProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('op_tracker_subprogress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('roadmap');
  const [expandedSagas, setExpandedSagas] = useState(() => new Set(SAGAS_DATA.map(s => s.id)));
  const [spoilerShield, setSpoilerShield] = useState(() => localStorage.getItem('op_spoiler_shield') !== 'false');
  const [dailyPace, setDailyPace] = useState(3);

  const [showResetModal, setShowResetModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimer = useRef(null);
  const previousMilestones = useRef(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const theme = THEMES[activeThemeId] || THEMES.classic;

  useEffect(() => { localStorage.setItem('op_tracker_theme', activeThemeId); }, [activeThemeId]);
  useEffect(() => { localStorage.setItem('op_header_bg_mode', bgMode); }, [bgMode]);
  useEffect(() => { localStorage.setItem('op_tracker_watched', JSON.stringify(Array.from(watchedIds))); }, [watchedIds]);
  useEffect(() => { localStorage.setItem('op_tracker_skipped', JSON.stringify(Array.from(skippedIds))); }, [skippedIds]);
  useEffect(() => { localStorage.setItem('op_tracker_subprogress', JSON.stringify(subProgress)); }, [subProgress]);
  useEffect(() => { localStorage.setItem('op_spoiler_shield', spoilerShield.toString()); }, [spoilerShield]);

  const showToast = (msg) => {
    clearTimeout(toastTimer.current);
    setToastMessage(msg);
    toastTimer.current = setTimeout(() => setToastMessage(null), 4500);
  };

  const allItems = useMemo(() => SAGAS_DATA.flatMap(s => s.items), []);

  const totalEpisodesCount = useMemo(() => {
    return allItems.reduce((acc, curr) => acc + (curr.epCount || 0), 0);
  }, [allItems]);

  const watchedEpisodesCount = useMemo(() => {
    return allItems.reduce((acc, item) => {
      if (watchedIds.has(item.id)) return acc + (item.epCount || 0);
      if (item.startEp && item.endEp && subProgress[item.id]) {
        const curEp = subProgress[item.id];
        return acc + Math.max(0, Math.min(item.epCount, curEp - item.startEp + 1));
      }
      return acc;
    }, 0);
  }, [allItems, watchedIds, subProgress]);

  const progressPercent = Math.min(100, Math.round((watchedEpisodesCount / Math.max(1, totalEpisodesCount)) * 100));

  const watchTimeStats = useMemo(() => {
    const minutesWatched = watchedEpisodesCount * 23.5;
    const hoursWatched = (minutesWatched / 60).toFixed(1);
    const daysEquivalent = (minutesWatched / (60 * 24)).toFixed(1);
    const skippedFillerEps = allItems
      .filter(item => (item.type === 'filler' || item.type === 'recommended_filler') && (!watchedIds.has(item.id) || skippedIds.has(item.id)))
      .reduce((sum, item) => sum + (item.epCount || 0), 0);
    const fillerHoursSaved = ((skippedFillerEps * 20) / 60).toFixed(1);

    return { hoursWatched, daysEquivalent, fillerHoursSaved };
  }, [watchedEpisodesCount, allItems, watchedIds, skippedIds]);

  const calculatedBounty = useMemo(() => {
    let bounty = 0;
    allItems.forEach(item => {
      const reward = item.bountyReward || 0;
      if (watchedIds.has(item.id)) {
        bounty += reward;
      } else if (item.startEp && item.endEp && subProgress[item.id]) {
        const curEp = subProgress[item.id];
        const fraction = Math.max(0, Math.min(1, (curEp - item.startEp + 1) / item.epCount));
        bounty += Math.round(reward * fraction);
      }
    });
    return bounty;
  }, [allItems, watchedIds, subProgress]);

  const formatBounty = (num) => new Intl.NumberFormat('en-US').format(num);

  const getItemCurrentEpisode = (item) => {
    if (watchedIds.has(item.id)) return item.endEp || item.epCount;
    if (item.startEp && item.endEp && subProgress[item.id] !== undefined) return subProgress[item.id];
    return null;
  };

  const unlockedCrew = useMemo(() => {
    const list = ['Luffy'];
    if (watchedIds.has('arc-1')) list.push('Zoro');
    if (watchedIds.has('arc-3')) list.push('Usopp');
    if (watchedIds.has('arc-4')) list.push('Sanji');
    if (watchedIds.has('arc-5')) list.push('Nami');
    if (watchedIds.has('arc-10')) list.push('Chopper');
    if (watchedIds.has('arc-11')) list.push('Nico Robin');
    if (watchedIds.has('arc-21')) list.push('Franky');
    if (watchedIds.has('arc-23')) list.push('Brook');
    if (watchedIds.has('arc-45') || watchedIds.has('arc-47')) list.push('Jinbe');
    return Array.from(new Set(list));
  }, [watchedIds]);

  const evaluatedAchievements = useMemo(() => {
    return ACHIEVEMENTS.map(ach => {
      const isUnlocked = ach.check(watchedIds, subProgress, watchedEpisodesCount, totalEpisodesCount);
      return { ...ach, isUnlocked };
    });
  }, [watchedIds, subProgress, watchedEpisodesCount, totalEpisodesCount]);

  const unlockedCount = useMemo(() => {
    return evaluatedAchievements.filter(a => a.isUnlocked).length;
  }, [evaluatedAchievements]);

  useEffect(() => {
    const unlocked = evaluatedAchievements.filter(a => a.isUnlocked);
    const previous = previousMilestones.current;
    if (previous) {
      const newCrew = unlockedCrew.filter(name => !previous.crew.includes(name));
      const newAwards = unlocked.filter(award => !previous.awards.includes(award.id));
      const messages = [];
      if (newCrew.length) messages.push(`${newCrew.join(', ')} joined your crew!`);
      if (newAwards.length) messages.push(`${newAwards.length} milestone${newAwards.length === 1 ? '' : 's'} unlocked.`);
      if (messages.length) showToast(messages.join(' '));
    }
    previousMilestones.current = { crew: unlockedCrew, awards: unlocked.map(award => award.id) };
  }, [unlockedCrew, evaluatedAchievements]);

  const upNextData = useMemo(() => {
    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      if (canonPuristMode && item.type !== 'canon' && item.type !== 'mixed') {
        continue;
      }
      if (!watchedIds.has(item.id) && !skippedIds.has(item.id)) {
        const parentSaga = SAGAS_DATA.find(s => s.items.some(it => it.id === item.id));
        const isEpBased = Boolean(item.startEp && item.endEp);
        const currentEp = isEpBased
          ? (subProgress[item.id] !== undefined ? subProgress[item.id] : item.startEp)
          : null;
        const episodeTitle = isEpBased ? getEpisodeTitle(currentEp, item.title) : item.title;

        return {
          index: i,
          item,
          saga: parentSaga,
          isEpBased,
          currentEp,
          startEp: item.startEp,
          endEp: item.endEp,
          episodeTitle
        };
      }
    }
    return null;
  }, [allItems, watchedIds, skippedIds, subProgress, canonPuristMode]);

  const activeBgKey = useMemo(() => {
    if (bgMode !== 'auto' && BACKGROUND_ARTWORKS[bgMode]) {
      return bgMode;
    }
    return upNextData?.saga?.id || 'east-blue';
  }, [bgMode, upNextData]);

  const activeHeaderArtwork = BACKGROUND_ARTWORKS[activeBgKey]?.img || bgEastBlue;

  const handleSetCurrentEpisode = (item, newEpisode) => {
    if (!item.startEp || !item.endEp) return;
    if (newEpisode >= item.endEp) {
      setWatchedIds(prev => new Set(prev).add(item.id));
      setSkippedIds(prev => { const n = new Set(prev); n.delete(item.id); return n; });
      setSubProgress(prev => { const n = { ...prev }; delete n[item.id]; return n; });
    } else if (newEpisode < item.startEp) {
      setWatchedIds(prev => { const n = new Set(prev); n.delete(item.id); return n; });
      setSubProgress(prev => { const n = { ...prev }; delete n[item.id]; return n; });
    } else {
      setWatchedIds(prev => { const n = new Set(prev); n.delete(item.id); return n; });
      setSubProgress(prev => ({ ...prev, [item.id]: newEpisode }));
    }
  };

  const advanceUpNext = () => {
    if (!upNextData) return;
    const { item, isEpBased, currentEp, endEp } = upNextData;
    if (isEpBased) {
      if (currentEp < endEp) {
        handleSetCurrentEpisode(item, currentEp + 1);
        showToast(`Advanced to Episode ${currentEp + 1}!`);
      } else {
        setWatchedIds(prev => new Set(prev).add(item.id));
        setSubProgress(prev => { const n = { ...prev }; delete n[item.id]; return n; });
        const nextIndex = upNextData.index + 1;
        if (nextIndex < allItems.length) {
          showToast(`Completed ${item.title}! Starting ${allItems[nextIndex].title}.`);
        } else {
          showToast(`Congratulations! You have completed the entire Grand Line voyage!`);
        }
      }
    } else {
      setWatchedIds(prev => new Set(prev).add(item.id));
      const nextIndex = upNextData.index + 1;
      if (nextIndex < allItems.length) {
        showToast(`Completed ${item.title}! Starting ${allItems[nextIndex].title}.`);
      }
    }
  };

  const skipUpNext = () => {
    if (!upNextData) return;
    const { item } = upNextData;
    setSkippedIds(prev => new Set(prev).add(item.id));
    setSubProgress(prev => { const n = { ...prev }; delete n[item.id]; return n; });
    const nextIndex = upNextData.index + 1;
    if (nextIndex < allItems.length) {
      showToast(`Skipped ${item.title}. Up next: ${allItems[nextIndex].title}`);
    } else {
      showToast(`Skipped ${item.title}.`);
    }
  };

  const resetSkippedItems = () => {
    setSkippedIds(new Set());
    showToast('Restored all skipped items to the queue.');
  };

  const scrollToActiveArc = () => {
    if (!upNextData) return;
    setActiveTab('roadmap');
    setSearchQuery('');
    setFilterType('all');
    if (upNextData.saga) {
      setExpandedSagas(prev => new Set(prev).add(upNextData.saga.id));
    }
    setTimeout(() => {
      const el = document.getElementById(`arc-card-${upNextData.item.id}`);
      if (el) { el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }); el.focus({ preventScroll: true }); }
    }, 100);
  };

  const toggleItem = (item) => {
    setWatchedIds(prev => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
        setSkippedIds(sk => { const s = new Set(sk); s.delete(item.id); return s; });
        setSubProgress(sub => { const s = { ...sub }; delete s[item.id]; return s; });
      }
      return next;
    });
  };

  const markSaga = (sagaId, markAsWatched) => {
    const saga = SAGAS_DATA.find(s => s.id === sagaId);
    if (!saga) return;
    setWatchedIds(prev => {
      const next = new Set(prev);
      saga.items.forEach(item => {
        if (markAsWatched) next.add(item.id);
        else next.delete(item.id);
      });
      return next;
    });
    if (markAsWatched) {
      setSkippedIds(prev => {
        const next = new Set(prev);
        saga.items.forEach(item => next.delete(item.id));
        return next;
      });
      setSubProgress(prev => {
        const next = { ...prev };
        saga.items.forEach(item => delete next[item.id]);
        return next;
      });
    }
  };

  const toggleSagaExpand = (sagaId) => {
    setExpandedSagas(prev => {
      const next = new Set(prev);
      if (next.has(sagaId)) next.delete(sagaId);
      else next.add(sagaId);
      return next;
    });
  };

  const exportProgressJSON = () => {
    const backupData = {
      version: '3.0',
      exportDate: new Date().toISOString(),
      theme: activeThemeId,
      bgMode,
      watchedIds: Array.from(watchedIds),
      skippedIds: Array.from(skippedIds),
      subProgress,
      dailyPace,
      canonPuristMode
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `one_piece_voyage_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Voyage progress saved to JSON!');
  };

  const importProgressJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result);
        if (data.watchedIds) setWatchedIds(new Set(data.watchedIds));
        if (data.skippedIds) setSkippedIds(new Set(data.skippedIds));
        if (data.subProgress) setSubProgress(data.subProgress);
        if (data.theme) setActiveThemeId(data.theme);
        if (data.bgMode) setBgMode(data.bgMode);
        if (data.dailyPace) setDailyPace(data.dailyPace);
        if (typeof data.canonPuristMode === 'boolean') setCanonPuristMode(data.canonPuristMode);
        showToast('Voyage progress restored successfully!');
      } catch {
        showToast('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const filteredSagas = useMemo(() => {
    return SAGAS_DATA.map(saga => {
      const filteredItems = saga.items.filter(item => {
        // Enforce manga canon only when Purist Mode is active
        if (canonPuristMode && item.type !== 'canon' && item.type !== 'mixed') {
          return false;
        }

        const matchSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.episodes.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchSearch) return false;

        if (filterType === 'canon') return item.type === 'canon' || item.type === 'mixed';
        if (filterType === 'movies') return item.type === 'movie' || item.type === 'special';
        if (filterType === 'must-watch') return item.tier === 'Must Watch' || item.type === 'canon';
        if (filterType === 'filler') return item.type === 'filler' || item.type === 'recommended_filler';
        return true;
      });
      return { ...saga, items: filteredItems };
    }).filter(saga => saga.items.length > 0);
  }, [filterType, searchQuery, canonPuristMode]);

  const pacingStats = useMemo(() => {
    const remainingEpisodes = Math.max(0, totalEpisodesCount - watchedEpisodesCount);
    const daysToFinish = Math.ceil(remainingEpisodes / Math.max(1, dailyPace));
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + daysToFinish);
    return {
      remainingEpisodes,
      daysToFinish,
      completionDateStr: completionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  }, [totalEpisodesCount, watchedEpisodesCount, dailyPace]);

  return (
    <div
      className="voyage-app min-h-screen bg-slate-950 text-slate-100 font-sans pb-24"
      style={{
        '--theme-primary': theme.primary,
        '--theme-hover': theme.primaryHover,
        ...accentRamp(theme.primary)
      }}
    >
      <a className="skip-link" href="#main-content">Skip to voyage content</a>
      <div className="voyage-toast" role="status" aria-live="polite">{toastMessage && <span><CheckCircle2 size={16} />{toastMessage}</span>}</div>
      <UpNextBar next={upNextData} onJump={scrollToActiveArc} onSkip={skipUpNext} onAdvance={advanceUpNext} />
      <VoyageHeader artwork={activeHeaderArtwork} next={upNextData} progress={progressPercent}
        watched={watchedEpisodesCount} total={totalEpisodesCount} stats={watchTimeStats}
        bounty={formatBounty(calculatedBounty)} unlockedCount={unlockedCount} achievementCount={ACHIEVEMENTS.length}
        crew={unlockedCrew} shield={spoilerShield} themeId={activeThemeId} onTheme={setActiveThemeId}
        onAchievements={() => { setActiveTab('achievements'); document.getElementById('main-content')?.scrollIntoView(); }}
        onJump={scrollToActiveArc} onAdvance={advanceUpNext} />

      {/* Main Container */}
      <main id="main-content" tabIndex={-1} className="page-width main-content">
        <Navigation active={activeTab} onTab={setActiveTab} compact={compactView} onSettings={() => setShowSettingsModal(true)}
          onCompact={() => setCompactView(!compactView)} shield={spoilerShield}
          onShield={() => setSpoilerShield(!spoilerShield)} onExport={exportProgressJSON} onImport={importProgressJSON} />

        {/* TAB 1: WATCH ROADMAP */}
        {activeTab === 'roadmap' && (
          <div>
            <div className="roadmap-heading"><div><h2>Your watch roadmap</h2><p>Follow the story. Choose your detours.</p></div>
              <label className="saga-picker"><span>Navigate to saga</span><select aria-label="Navigate to saga" value="" onChange={e => {
                const id = e.target.value;
                setSearchQuery(''); setFilterType('all'); setExpandedSagas(prev => new Set(prev).add(id));
                setTimeout(() => { const target = document.getElementById(`saga-${id}`); target?.scrollIntoView({ block: 'start' }); target?.focus({ preventScroll: true }); }, 100);
              }}><option value="" disabled>Choose a saga…</option>{SAGAS_DATA.map((saga, i) => <option key={saga.id} value={saga.id}>{String(i+1).padStart(2,'0')} · {saga.title}</option>)}</select></label>
            </div>
            {canonPuristMode && <div className="mode-notice"><ShieldCheck size={16} />Canon Purist is on: canon and mixed arcs only.<button className="ui-button quiet" onClick={() => setCanonPuristMode(false)}>Show all content</button></div>}
            <div className="filter-bar">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  aria-label="Search arcs, movies, or episodes"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search arc, movie, or episode..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                <span className="text-xs text-slate-500 font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>

                {[
                  { id: 'all', label: 'All Content' },
                  { id: 'canon', label: 'Canon Arcs' },
                  { id: 'movies', label: 'Films & Specials' },
                  { id: 'must-watch', label: 'Must-Watch' },
                  { id: 'filler', label: 'Fillers' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    aria-pressed={filterType === filter.id}
                    onClick={() => setFilterType(filter.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                      filterType === filter.id
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="roadmap-tools"><span role="status">{filteredSagas.reduce((sum, saga) => sum + saga.items.length, 0)} stops · {filteredSagas.length} sagas{searchQuery && ` matching “${searchQuery}”`}</span><div>{(searchQuery || filterType !== 'all') && <button className="ui-button quiet" onClick={() => { setSearchQuery(''); setFilterType('all'); }}>Clear filters</button>}<button className="ui-button quiet" onClick={() => setExpandedSagas(new Set())}>Collapse all</button><button className="ui-button quiet" onClick={() => setExpandedSagas(new Set(SAGAS_DATA.map(s => s.id)))}>Expand all</button></div></div>
            <div className="space-y-8">
              {filteredSagas.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
                  <Compass className="w-12 h-12 mx-auto text-slate-600 mb-3" />
                  <h3 className="text-lg font-bold text-slate-300">No Arcs Found</h3>
                  <p className="text-slate-500 text-sm mt-1">Try clearing your search query or filter settings.</p>
                </div>
              ) : (
                filteredSagas.map(saga => {
                  const isExpanded = expandedSagas.has(saga.id);
                  const fullSaga = SAGAS_DATA.find(s => s.id === saga.id);
                  const sagaWatchedCount = fullSaga.items.filter(i => watchedIds.has(i.id)).length;
                  const sagaTotalCount = fullSaga.items.length;
                  const isSagaComplete = sagaTotalCount > 0 && sagaWatchedCount === sagaTotalCount;

                  const canonCount = saga.items.filter(i => i.type === 'canon' || i.type === 'mixed').length;
                  const fillerCount = saga.items.filter(i => i.type === 'filler' || i.type === 'recommended_filler').length;
                  const movieCount = saga.items.filter(i => i.type === 'movie' || i.type === 'special').length;

                  return (
                    <div
                      key={saga.id}
                      id={`saga-${saga.id}`} tabIndex={-1}
                      className="saga-section"
                    >
                      <div className="saga-heading">
                        <div className="flex items-start gap-4">
                          <button
                            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${saga.title}`}
                            aria-expanded={isExpanded}
                            aria-controls={`saga-items-${saga.id}`}
                            onClick={() => toggleSagaExpand(saga.id)}
                            className="saga-toggle mt-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          <span className="saga-ordinal" aria-hidden="true">{String(SAGAS_DATA.findIndex(s => s.id === saga.id) + 1).padStart(2, '0')}</span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                                {saga.episodes}
                              </span>
                              {saga.mangaChapters && (
                                <span className="text-xs font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                                  {saga.mangaChapters}
                                </span>
                              )}
                              {isSagaComplete && (
                                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1">
                                  <CheckCheck className="w-3.5 h-3.5" /> Saga Completed
                                </span>
                              )}
                              {compactView && (
                                <span className="text-[11px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-0.5 rounded-md border border-slate-800 flex items-center gap-1.5">
                                  <span className="text-blue-400 font-bold">{canonCount} Canon</span>
                                  <span>&bull;</span>
                                  <span className="text-slate-500 font-bold">{fillerCount} Filler</span>
                                  {movieCount > 0 && (
                                    <>
                                      <span>&bull;</span>
                                      <span className="text-rose-400 font-bold">{movieCount} Film/Spec</span>
                                    </>
                                  )}
                                </span>
                              )}
                            </div>
                            <h2 className="saga-title"><span>{String(SAGAS_DATA.findIndex(s => s.id === saga.id) + 1).padStart(2, '0')}</span>{saga.title}</h2>
                            {upNextData?.saga?.id === saga.id && <span className="saga-current">Current saga</span>}
                            <SpoilerContent hidden={spoilerShield && !isSagaComplete} label="saga overview"><p className="text-sm text-slate-400 mt-2">{saga.tagline}</p></SpoilerContent>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <span className="text-xs font-medium text-slate-400 mr-2">
                            {sagaWatchedCount}/{sagaTotalCount} stops complete
                          </span>
                          <button
                            onClick={() => markSaga(saga.id, !isSagaComplete)}
                            className={`text-xs px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition ${
                              isSagaComplete
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {isSagaComplete ? 'Unmark Saga' : 'Complete Saga'}
                          </button>
                        </div>
                      </div>

                      <ProgressBar value={sagaWatchedCount / sagaTotalCount * 100} label={`${saga.title} completion`} />
                      {isExpanded && (
                        <div id={`saga-items-${saga.id}`} className={compactView ? "arc-list compact-list" : "arc-list"}>
                          {saga.items.map(item => <ArcCard key={item.id} item={item}
                            watched={watchedIds.has(item.id)} skipped={skippedIds.has(item.id)}
                            active={upNextData?.item?.id === item.id} currentEp={getItemCurrentEpisode(item)}
                            currentEpTitle={getItemCurrentEpisode(item) !== null ? getEpisodeTitle(getItemCurrentEpisode(item), item.title) : null}
                            compact={compactView} shield={spoilerShield} onToggle={toggleItem} onEpisode={handleSetCurrentEpisode}
                            onRestore={id => { setSkippedIds(prev => { const next = new Set(prev); next.delete(id); return next; }); showToast('Restored to your watch queue.'); }} />)}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PIRATE ACHIEVEMENTS WITH SPOILER PROTECTION */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  <Trophy className="w-4 h-4" /> Grand Line Milestones
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-100">Pirate Achievements</h2>
                <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xl">
                  Unlock accolades by navigating sagas, surviving landmark battles, and reaching episode thresholds on the Grand Line.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 px-6 py-4 rounded-2xl shrink-0">
                <div className="text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Unlocked</div>
                  <div className="text-2xl font-black text-amber-400 font-mono">{unlockedCount} / {ACHIEVEMENTS.length}</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div className="text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Completion</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {evaluatedAchievements.map(ach => {
                const tierStyles = {
                  Bronze: 'border-amber-700/40 text-amber-600 bg-amber-950/20',
                  Silver: 'border-slate-400/40 text-slate-300 bg-slate-800/40',
                  Gold: 'border-amber-400/50 text-amber-300 bg-amber-500/10',
                  Platinum: 'border-cyan-400/50 text-cyan-300 bg-cyan-500/10'
                }[ach.tier];

                const isMasked = spoilerShield && !ach.isUnlocked;

                return (
                  <div
                    key={ach.id}
                    className={`achievement-card p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                      ach.isUnlocked
                        ? 'bg-slate-900/90 border-slate-700 shadow-md'
                        : 'bg-slate-950/40 border-slate-900 group'
                    }`}
                  >
                    <div className={`achievement-icon ${ach.isUnlocked ? '' : 'locked'}`}>{isMasked ? <Lock size={22} /> : <ach.icon size={22} strokeWidth={1.5} />}</div>
                    <div className="flex-1 min-w-0"><div className="achievement-state"><span className={`text-xs font-bold ${ach.isUnlocked ? 'text-emerald-400' : 'text-slate-400'}`}>{ach.isUnlocked ? 'Unlocked' : 'Locked milestone'}</span><span className={`text-[11px] px-2 py-0.5 rounded border ${tierStyles}`}>{ach.tier}</span></div>
                      <SpoilerContent hidden={isMasked} label="milestone"><h3 className="text-base font-bold mt-2">{ach.title}</h3><p className="text-sm text-slate-400 mt-1">{ach.description}</p></SpoilerContent>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: FILM GUIDE */}
        {activeTab === 'tierlist' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black text-amber-400 flex items-center gap-2">
                <Film className="w-7 h-7" /> The Canonical One Piece Film Guide
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                All 15 movies are standalone theatrical adventures positioned to ensure zero spoilers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'One Piece Film: Z (2012)', movieNum: 'Movie 12', placement: 'Watch after Episode 578 (Post-Fishman Island)', why: 'Widely hailed as the best film. Former Admiral Zephyr and Marine justice.', tier: 'Fan Favorite' },
                { title: 'One Piece Film: Strong World (2009)', movieNum: 'Movie 10', placement: 'Watch after Episode 381 (or Ep 429)', why: 'First film written by Eiichiro Oda. The battle with Shiki the Golden Lion.', tier: 'Fan Favorite' },
                { title: 'Baron Omatsuri & Secret Island (2005)', movieNum: 'Movie 6', placement: 'Watch after Episode 224 (before Water 7)', why: 'Directed by Mamoru Hosoda. Dark, psychological thriller exploring crew bonds.', tier: 'Fan Favorite' },
                { title: 'One Piece Film: Red (2022)', movieNum: 'Movie 15', placement: 'Watch after Episode 1030 (Wano Act 3)', why: 'Global phenomenon with vocals by Ado as Uta and Red-Haired Shanks.', tier: 'Fan Favorite' },
                { title: 'One Piece: Stampede (2019)', movieNum: 'Movie 14', placement: 'Watch after Episode 896 (between WCI and Wano)', why: '20th Anniversary festival war uniting Worst Generation, Marines, and Warlords.', tier: 'Fan Favorite' },
                { title: 'One Piece Film: Gold (2016)', movieNum: 'Movie 13', placement: 'Watch after Episode 750 (Post-Dressrosa)', why: 'High-octane casino heist thriller aboard the 10km golden ship Gran Tesoro.', tier: 'Fan Favorite' },
                { title: 'One Piece Film: God Valley (Summer 2027)', movieNum: 'Movie 16', placement: 'Watch after Egghead / Elbaph Arc', why: 'ONE PIECE FILM GOD VALLEY (ワンピース フィルム ゴッドバレー). Delves into the historic incident involving Roger, Garp, and the Rocks Pirates.', tier: 'Upcoming' },
                { title: 'One Piece Film: Baad (2029)', movieNum: 'Movie 17', placement: 'Watch in the late Final Saga era', why: 'ONE PIECE FILM BAAD. The major theatrical follow-up releasing deep into the anime\'s final stretch.', tier: 'Upcoming' }
              ].map(m => (
                <div key={m.title} className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {m.movieNum} &bull; {m.tier}
                  </span>
                  <h4 className="text-base font-bold text-slate-100 mt-2">{m.title}</h4>
                  <div className="text-xs font-semibold text-cyan-400 my-1 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> {m.placement}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{m.why}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PACING CALCULATOR */}
        {activeTab === 'pacing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6">
              <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <Calculator className="w-5 h-5" /> Voyage Catch-Up Estimator
              </h3>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
                  <span>Daily Watch Pace:</span>
                  <span className="text-amber-400 text-sm font-mono">{dailyPace} Episodes / Day</span>
                </div>
                <input
                  type="range"
                  aria-label="Daily watch pace"
                  min="1"
                  max="15"
                  value={dailyPace}
                  onChange={e => setDailyPace(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Episodes Remaining</div>
                  <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">{pacingStats.remainingEpisodes}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Days to Catch Up</div>
                  <div className="text-2xl font-black text-cyan-400 font-mono mt-0.5">{pacingStats.daysToFinish} Days</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                <div className="font-bold text-sm mb-0.5">Estimated Catch-up Date:</div>
                <div className="text-base font-black font-mono">{pacingStats.completionDateStr}</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" /> Time Saved by Skipping Fillers
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By skipping the ~95 purely non-canon filler episodes identified in this tracker, you save approximately:
              </p>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-3xl font-black text-amber-400 font-mono">~{watchTimeStats.fillerHoursSaved} Hours</div>
                <div className="text-xs text-slate-400 mt-1">Equal to roughly 38 full-length feature films!</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: QUICK TIPS */}
        {activeTab === 'quicktips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center gap-2 text-amber-400 mb-3">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-100">Gold Standard Watch Rules</h3>
              </div>
              <ul className="space-y-3 text-xs md:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">1.</span>
                  <span><strong>Never Skip G-8 (Episodes 196–206):</strong> Even though it is filler, Vice Admiral Jonathan and Navarone Fortress are brilliantly written.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">2.</span>
                  <span><strong>Watch Film Strong World at Ep 381 or 429:</strong> Watching Episode 0 (OVA) first provides vital Roger-era lore.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">3.</span>
                  <span><strong>Watch "3D2Y" Special After Ep 516:</strong> It provides the perfect emotional bridge before the timeskip.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">4.</span>
                  <span><strong>Do Not Miss "ONE PIECE FAN LETTER" (2024):</strong> Directed by Megumi Ishitani, this 25-minute special is one of the highest-rated episodes in history.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center gap-2 text-rose-400 mb-3">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-100">Recommended Fillers to Skip</h3>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Warship Island Arc', eps: 'Episodes 54 – 61' },
                  { name: 'Goat & Ruluka Islands', eps: 'Episodes 136 – 143' },
                  { name: 'Ocean’s Dream & Foxy Return', eps: 'Episodes 220 – 226' },
                  { name: 'Ice Hunter Arc', eps: 'Episodes 326 – 335' },
                  { name: 'Caesar Retrieval Arc', eps: 'Episodes 626 – 628' },
                  { name: 'Marine Rookie Arc', eps: 'Episodes 780 – 782' }
                ].map(f => (
                  <div key={f.name} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span className="font-semibold text-slate-200">{f.name}</span>
                    <span className="text-slate-400">{f.eps}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer & Social Links */}
      <footer className="max-w-6xl mx-auto px-4 mt-16">
        <hr className="border-slate-800/80 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pb-8">
          <div className="flex items-center gap-2">
            <span>Eternal Pose</span>
            <span>&bull;</span>
            <span>Made for Pirates sailing the Grand Line.</span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Legal / Info Button */}
            <button
              onClick={() => setShowDisclaimerModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition duration-200 font-semibold text-xs"
              title="Legal Disclaimer & Credits"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>About & Legal</span>
            </button>

            {/* Ko-fi Donation Link */}
            <a
              href="https://ko-fi.com/looneth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-500/30 transition duration-200 group font-semibold text-xs"
              title="Support the voyage on Ko-fi"
            >
              <Coffee className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Support on Ko-fi</span>
            </a>

            {/* GitHub Link */}
            <a
              href="https://github.com/EY4O/One-Piece-Voyage-Tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition duration-200 group"
              title="View Repository on GitHub"
            >
              <svg
                className="w-4 h-4 fill-current text-slate-400 group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="font-semibold text-xs">GitHub</span>
            </a>
          </div>
        </div>
      </footer>

      <a href="#main-content" className="back-to-roadmap" aria-label="Back to voyage navigation"><ChevronUp size={18} /><span>Navigation</span></a>

      {/* VOYAGE SETTINGS MODAL */}
      {showSettingsModal && (
        <Modal label="Voyage Settings" message={toastMessage} onClose={() => setShowSettingsModal(false)}>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-100">Voyage Settings</h3>
                  <p className="text-xs text-slate-400">Customize your Straw Hat theme and artwork</p>
                </div>
              </div>
              <button
                aria-label="Close settings"
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
              {/* Support Project Banner in Settings */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      Fuel the Voyage <Heart className="w-3 h-3 text-red-500 fill-current" />
                    </h4>
                    <p className="text-[11px] text-slate-400">Support the ongoing development of this tracker</p>
                  </div>
                </div>
                <a
                  href="https://ko-fi.com/looneth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-ink font-black text-xs transition shadow-md shadow-amber-500/20 shrink-0 flex items-center gap-1.5"
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Support on Ko-fi</span>
                </a>
              </div>

              {/* Colour mode */}
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" /> Appearance
                </div>
                <ModeToggle mode={colorMode} onMode={setColorMode} />
              </div>

              {/* SECTION 1: Straw Hat Character Theme */}
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-400" /> Straw Hat Character Theme
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.values(THEMES).map(t => {
                    const isUnlocked =
                      t.id === 'classic' ||
                      t.id === 'luffy' ||
                      unlockedCrew.some(
                        c => c.toLowerCase() === t.id.toLowerCase() || (t.id === 'robin' && c === 'Nico Robin')
                      );
                    const isNika = t.id === 'nika';
                    const nikaUnlocked = watchedIds.has('arc-47');
                    const isThemeLocked = spoilerShield && !isUnlocked && (!isNika || !nikaUnlocked);

                    return (
                      <button
                        key={t.id}
                        aria-pressed={activeThemeId === t.id}
                        onClick={() => {
                          if (isThemeLocked) { showToast('Turn off Spoiler Shield to explore unrecruited character themes.'); return; }
                          setActiveThemeId(t.id);
                          showToast(`Switched theme to ${t.character}!`);
                        }}
                        className={`flex items-center gap-3 p-2.5 rounded-2xl border text-left transition ${
                          activeThemeId === t.id
                            ? 'bg-slate-800 border-amber-500/50 shadow-md'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="crew-initial" aria-hidden="true">{isThemeLocked ? <Lock size={12} /> : t.name.trim()[0]}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-bold truncate ${isThemeLocked ? 'text-slate-400' : 'text-slate-200'}`}>
                            {isThemeLocked ? 'Locked Member' : t.name}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">{isThemeLocked ? 'Hidden by Spoiler Shield' : t.character}</div>
                        </div>
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: t.primary }} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: Header Background Artwork */}
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" /> Header Background Artwork
                </div>

                {/* Auto Mode Button */}
                <button
                  aria-pressed={bgMode === 'auto'}
                  onClick={() => {
                    setBgMode('auto');
                    showToast('Header art set to Auto-Sync with your active arc!');
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border mb-3 transition ${
                    bgMode === 'auto'
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <RotateCcw size={17} strokeWidth={1.5} className="shrink-0" />
                    <div className="text-left">
                      <div className="text-xs font-bold">Auto-Sync With Active Arc</div>
                      <div className="text-[10px] text-slate-500">Artwork updates as you advance through the story</div>
                    </div>
                  </div>
                  {bgMode === 'auto' && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                </button>

                {/* Special Showcases (Sunny, Straw Hat, Merry) */}
                <div className="text-[11px] font-bold text-amber-400/90 uppercase tracking-wider mb-2">
                  Special Showcases
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {['sunny', 'strawhat', 'merry'].map(customKey => {
                    const item = BACKGROUND_ARTWORKS[customKey];
                    return (
                      <button
                        key={customKey}
                        aria-pressed={bgMode === customKey}
                        onClick={() => {
                          setBgMode(customKey);
                          showToast(`Header background locked to ${item.name}!`);
                        }}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center transition ${
                          bgMode === customKey
                            ? 'bg-slate-800 border-amber-500/50 text-amber-300 shadow-md'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <item.icon size={22} strokeWidth={1.5} />
                        <span className="text-xs font-bold leading-tight">{item.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Lock to Saga Artwork */}
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Lock to Saga Artwork
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {Object.entries(BACKGROUND_ARTWORKS)
                    .filter(([_, data]) => data.type === 'saga')
                    .map(([key, data], idx) => (
                      <button
                        key={key}
                        aria-pressed={bgMode === key}
                        onClick={() => {
                          setBgMode(key);
                          showToast(`Header background locked to ${data.name}!`);
                        }}
                        className={`flex items-center justify-between p-2 rounded-xl border text-xs font-medium transition ${
                          bgMode === key
                            ? 'bg-slate-800 border-amber-500/50 text-amber-300'
                            : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate">{idx + 1}. {data.name}</span>
                        {bgMode === key && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </button>
                    ))}
                </div>
              </div>

              {/* SECTION 3: Content & Viewing Modes */}
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Content & Viewing Preferences
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-200">Canon Purist Mode</span>
                      <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Manga Only
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Hides all filler arcs, theatrical films, and specials from your queue and roadmap, leaving only 100% canon story progression.
                    </p>
                  </div>

                  <button
                    role="switch" aria-label="Canon Purist Mode" aria-checked={canonPuristMode}
                    onClick={() => {
                      setCanonPuristMode(!canonPuristMode);
                      showToast(`Canon Purist Mode ${!canonPuristMode ? 'Enabled' : 'Disabled'}!`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      canonPuristMode ? 'bg-emerald-500' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        canonPuristMode ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* SECTION 4: Data & Voyage Resets */}
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" /> Data & Voyage Resets
                </div>

                <div className="space-y-2.5">
                  {/* Reset Skips Row */}
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                        <span>Restore Skipped Queue</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                          {skippedIds.size} Skipped
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Restores any episodes or arcs you previously skipped back into your active roadmap queue.
                      </p>
                    </div>

                    <button
                      onClick={resetSkippedItems}
                      disabled={skippedIds.size === 0}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-amber-300 border border-slate-700 text-xs font-bold transition shrink-0 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Skips</span>
                    </button>
                  </div>

                  {/* Reset All Progress Row */}
                  <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-rose-300">Reset All Voyage Data</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Clears all watched episodes, active steppers, and unlocked pirate achievements back to day one.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowSettingsModal(false);
                        setShowResetModal(true);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition shadow-md shadow-rose-600/20 shrink-0 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Progress</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-ink font-bold text-xs shadow-md shadow-amber-500/20 transition"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reset Modal */}
      {showResetModal && (
        <Modal label="Reset Voyage Progress?" onClose={() => setShowResetModal(false)}>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-rose-500 mb-3" />
            <h3 className="text-lg font-bold text-slate-100">Reset Voyage Progress?</h3>
            <p className="text-xs text-slate-400 mt-2">
              This resets all checked arcs, episode steppers, and achievements back to the start.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setWatchedIds(new Set());
                  setSkippedIds(new Set());
                  setSubProgress({});
                  setShowResetModal(false);
                  showToast('Voyage progress reset to start.');
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </Modal>
      )}
      
      {/* LEGAL & CREDITS MODAL */}
      {showDisclaimerModal && (
        <Modal label="About & Disclaimer" onClose={() => setShowDisclaimerModal(false)}>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="text-slate-100 font-black text-base">About & Disclaimer</span>
              </div>
              <button
                aria-label="Close about dialog"
                onClick={() => setShowDisclaimerModal(false)}
                className="p-1 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p>
                <strong>Eternal Pose</strong> is a free, open-source, non-profit fan application developed solely for informational, navigational, and entertainment purposes.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                <span className="text-slate-200 font-semibold">Copyright & Trademark Notice:</span><br />
                <em>One Piece</em> and all associated characters, artwork, audio, logos, names, and indicia are exclusive trademarks and copyrights of <strong>Eiichiro Oda</strong>, <strong>Shueisha</strong>, and <strong>Toei Animation</strong>.
              </div>

              <p className="text-slate-400">
                This project claims no ownership over any official artwork, narrative content, or trademarks. All assets and episode titles are utilized strictly under non-commercial fair-use guidelines.
              </p>

              <p className="text-slate-400">
                Voluntary tips through Ko-fi are purely non-commercial donations that go directly toward defraying third-party domain, hosting, and API server costs.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowDisclaimerModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ONE-TIME PWA INSTALL PROMPT FOR MOBILE */}
      <InstallPromptBanner />
    </div>
  );
}

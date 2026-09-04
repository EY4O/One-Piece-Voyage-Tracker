import React, { useState, useMemo, useEffect } from 'react';
import { EPISODE_TITLES } from './data/episodeTitles';

// 11 Saga Background Artworks (src/assets/sagas/)
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

// 3 Custom Showcase Backgrounds (src/assets/sagas/)
import bgSunny from './assets/sagas/sunny.jpg';
import bgStrawHat from './assets/sagas/strawhat.jpg';
import bgMerry from './assets/sagas/merry.jpg';

import {
  Compass,
  Film,
  CheckCircle2,
  Circle,
  Sparkles,
  Flame,
  Star,
  Search,
  Filter,
  CheckCheck,
  RotateCcw,
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
  Clock,
  Trophy,
  Users,
  Anchor,
  ShieldCheck,
  AlertTriangle,
  Palette,
  Eye,
  EyeOff,
  Calculator,
  Download,
  Upload,
  Share2,
  Plus,
  Minus,
  FastForward,
  BookmarkCheck,
  PlayCircle,
  ArrowRight,
  SkipForward,
  Lock,
  Award,
  Image as ImageIcon
} from 'lucide-react';

// Background Map: Sagas + Custom Ship & Iconography Backgrounds
const BACKGROUND_ARTWORKS = {
  // Sagas
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

  // Custom Showcases
  'sunny': { name: 'Thousand Sunny', img: bgSunny, type: 'custom', icon: '🦁' },
  'strawhat': { name: 'Straw Hat', img: bgStrawHat, type: 'custom', icon: '👒' },
  'merry': { name: 'Going Merry', img: bgMerry, type: 'custom', icon: '🐑' }
};

// Straw Hat Themes
const THEMES = {
  classic: {
    id: 'classic',
    name: 'Romance Dawn (Gold)',
    character: 'Classic One Piece',
    avatar: '👑',
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
    avatar: '🍖',
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
    avatar: '⚔️',
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
    avatar: '🍊',
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
    avatar: '🎯',
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
    avatar: '🍳',
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
    avatar: '🌸',
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
    avatar: '📖',
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
    avatar: '⭐',
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
    avatar: '🎻',
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
    avatar: '🌊',
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
    avatar: '☀️',
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
      { id: 'ova-1', title: 'Defeat Him! The Pirate Ganzack! (OVA)', type: 'special', episodes: 'OVA (1998)', epCount: 1, bountyReward: 500000, description: 'First animated adaptation ever produced by Production I.G.', watchTip: 'Optional vintage novelty. Watch right after Orange Town.', tier: 'Optional' },
      { id: 'arc-3', title: 'Syrup Village Arc', type: 'canon', episodes: '9 – 18', startEp: 9, endEp: 18, epCount: 10, chapters: 'Ch 22 – 41', onePace: '4 eps (1 hr 45m)', bountyReward: 5000000, description: 'Straw Hats defend Kaya from Captain Kuro. Usopp joins with Going Merry.', highlights: 'Usopp joins the crew, Going Merry gifted.', tier: 'Core' },
      { id: 'mov-1', title: 'Movie 1: One Piece: The Movie (2000)', type: 'movie', episodes: 'Movie (50 min)', epCount: 2, bountyReward: 1000000, description: 'The original film. Hunts for pirate Woonan treasure.', watchTip: 'Watch right after Episode 18 before meeting Sanji.', tier: 'Classic' },
      { id: 'arc-4', title: 'Baratie Arc', type: 'canon', episodes: '19 – 30', startEp: 19, endEp: 30, epCount: 12, chapters: 'Ch 42 – 68', onePace: '6 eps (2 hr 40m)', bountyReward: 15000000, description: 'Ocean restaurant attacked by Don Krieg. Zoro duels Mihawk.', highlights: 'Sanji joins, Mihawk vs Zoro, Baratie defense.', tier: 'Core' },
      { id: 'arc-5', title: 'Arlong Park Arc', type: 'canon', episodes: '31 – 44', startEp: 31, endEp: 44, epCount: 14, chapters: 'Ch 69 – 95', onePace: '7 eps (3 hr 10m)', bountyReward: 30000000, description: 'Confronting Arlong to liberate Nami and Cocoyasi Village.', highlights: 'Walk to Arlong Park, Nami officially joins with 30M Bounty!', tier: 'Core' },
      { id: 'arc-6', title: 'Loguetown Arc', type: 'canon', episodes: '45, 48 – 53', startEp: 45, endEp: 53, epCount: 7, chapters: 'Ch 96 – 100', onePace: '3 eps (1 hr 15m)', bountyReward: 5000000, description: 'Where Gol D. Roger was executed. Smoker and Tashigi debut.', highlights: 'Luffy execution platform smile, Dragon in storm.', tier: 'Core' },
      { id: 'mov-2', title: 'Movie 2: Clockwork Island Adventure (2001)', type: 'movie', episodes: 'Movie (55 min)', epCount: 2, bountyReward: 1000000, description: 'Going Merry is stolen by the Trump Pirates!', watchTip: 'Watch after Episode 53 before Reverse Mountain.', tier: 'Classic' },
      { id: 'arc-7', title: 'Warship Island Arc', type: 'filler', episodes: '54 – 61', startEp: 54, endEp: 61, epCount: 8, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Apis and Millennium Dragon filler adventure.', watchTip: 'Filler. Skip straight to Episode 62.', tier: 'Filler' }
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
      { id: 'mov-3', title: 'Movie 3: Chopper’s Kingdom on Strange Island', type: 'movie', episodes: 'Movie (56 min)', epCount: 2, bountyReward: 1000000, description: 'Chopper crowned animal king of Crown Island.', watchTip: 'Watch right after Drum Island (Episode 91).', tier: 'Classic' },
      { id: 'arc-11', title: 'Alabasta Arc', type: 'canon', episodes: '92 – 130', startEp: 92, endEp: 130, epCount: 39, chapters: 'Ch 155 – 217', onePace: '15 eps (7 hr 30m)', bountyReward: 70000000, description: 'Desert civil war by Crocodile. Showdown with Ace & Vivi.', highlights: 'Luffy vs Crocodile 1-3, Robin joins. 100M Bounty!', tier: 'Core' },
      { id: 'arc-12', title: 'Post-Alabasta Filler Episodes', type: 'filler', episodes: '131 – 135', startEp: 131, endEp: 135, epCount: 5, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Standalone character focus episodes.', watchTip: 'Filler. Skippable.', tier: 'Filler' }
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
      { id: 'arc-13', title: 'Goat Island & Ruluka Island Arcs', type: 'filler', episodes: '136 – 143', startEp: 136, endEp: 143, epCount: 8, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Filler arcs with Zenny goats and Rainbow Mist.', watchTip: 'Filler. Skip to 144.', tier: 'Filler' },
      { id: 'mov-4', title: 'Movie 4: Dead End Adventure (2003)', type: 'movie', episodes: 'Movie (95 min)', epCount: 4, bountyReward: 5000000, description: 'Straw Hats join underground pirate regatta race.', watchTip: '⭐ Highly Recommended! Watch between Ep 138-143.', tier: 'Must Watch' },
      { id: 'mov-5', title: 'Movie 5: The Cursed Holy Sword (2004)', type: 'movie', episodes: 'Movie (95 min)', epCount: 4, bountyReward: 2000000, description: 'Zoro-centric film dealing with cursed sword.', watchTip: 'Skippable movie.', tier: 'Classic' },
      { id: 'arc-14', title: 'Jaya Arc', type: 'canon', episodes: '144 – 152', startEp: 144, endEp: 152, epCount: 9, chapters: 'Ch 218 – 236', onePace: '5 eps (2 hr 10m)', bountyReward: 10000000, description: 'Mock Town pirate haven. Meeting Blackbeard.', highlights: 'Blackbeard dreams speech, Knock Up Stream.', tier: 'Core' },
      { id: 'arc-15', title: 'Skypiea Arc', type: 'canon', episodes: '153 – 195', startEp: 153, endEp: 195, epCount: 43, chapters: 'Ch 237 – 302', onePace: '24 eps (10 hr 30m)', bountyReward: 50000000, description: 'White clouds 10,000m high. Survival against God Enel.', highlights: 'Golden Bell rings, Mont Blanc Noland story.', tier: 'Core' },
      { id: 'arc-16', title: 'G-8 Arc (Navarone Marine Base)', type: 'recommended_filler', episodes: '196 – 206', startEp: 196, endEp: 206, epCount: 11, chapters: 'Anime Original', onePace: 'Retained by Fans', bountyReward: 10000000, description: 'Falling into Vice Admiral Jonathan fortress.', watchTip: '🔥 MUST WATCH FILLER! Elite writing.', tier: 'Must Watch' }
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
      { id: 'arc-18', title: 'Ocean’s Dream & Foxy Return', type: 'filler', episodes: '220 – 226', startEp: 220, endEp: 226, epCount: 7, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Memory theft filler. Skip to 227.', watchTip: 'Filler.', tier: 'Filler' },
      { id: 'mov-7', title: 'Movie 7: Mechanical Soldier of Karakuri', type: 'movie', episodes: 'Movie (94 min)', epCount: 4, bountyReward: 3000000, description: 'Mecha puzzle adventure on Karakuri Island.', watchTip: 'Watch before 227.', tier: 'Classic' },
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
      { id: 'arc-22', title: 'Ice Hunter Arc', type: 'filler', episodes: '326 – 335', startEp: 326, endEp: 335, epCount: 10, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Accino bounty hunters steal pirate flag.', watchTip: 'Filler. Skip to 337.', tier: 'Filler' },
      { id: 'arc-23', title: 'Thriller Bark Arc', type: 'canon', episodes: '337 – 381', startEp: 337, endEp: 381, epCount: 45, chapters: 'Ch 442 – 489', onePace: '23 eps (10 hr 30m)', bountyReward: 60000000, description: 'Ghost island in Florian Triangle. Battles vs zombies.', highlights: 'Binks Sake, Zoro "Nothing Happened" sacrifice.', tier: 'Core' },
      { id: 'arc-24', title: 'Spa Island & Romance Dawn Story', type: 'filler', episodes: '382 – 384', startEp: 382, endEp: 384, epCount: 3, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Vacation filler with Foxy cameos.', watchTip: 'Filler. Skip to 385.', tier: 'Filler' }
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
      { id: 'arc-27', title: 'Little East Blue Arc', type: 'filler', episodes: '426 – 429', startEp: 426, endEp: 429, epCount: 4, chapters: 'Film Tie-in', onePace: 'Skipped', bountyReward: 2000000, description: 'Prologue tie-in to Strong World film.', watchTip: 'Watch right before Strong World!', tier: 'Recommended' },
      { id: 'mov-10', title: 'Movie 10: Film Strong World & Ep 0', type: 'movie', episodes: 'Movie (115 min)', epCount: 5, bountyReward: 15000000, description: 'Written by Oda. Battle against Golden Lion Shiki.', watchTip: '⭐ MUST WATCH! Watch Ep 0 first.', tier: 'Must Watch' },
      { id: 'mov-11', title: 'Movie 11: Straw Hat Chase 3D', type: 'movie', episodes: 'Short (30 min)', epCount: 1, bountyReward: 1000000, description: 'Fast 3D chase to recover Straw Hat.', watchTip: 'Fun short.', tier: 'Classic' },
      { id: 'arc-28', title: 'Impel Down Arc', type: 'canon', episodes: '422 – 425, 430 – 456', startEp: 422, endEp: 456, epCount: 31, chapters: 'Ch 525 – 549', onePace: '16 eps (7 hr 40m)', bountyReward: 80000000, description: 'Underwater prison break with Buggy, Bon Clay, Jinbe.', highlights: 'Warden Magellan, Bon Clay heroic sacrifice.', tier: 'Core' },
      { id: 'arc-29', title: 'Marineford Arc (Paramount War)', type: 'canon', episodes: '457 – 489', startEp: 457, endEp: 489, epCount: 33, chapters: 'Ch 550 – 580', onePace: '16 eps (7 hr 30m)', bountyReward: 100000000, description: 'Whitebeard and Luffy storm Marine HQ to rescue Ace.', highlights: '"The One Piece is real!", Ace & Luffy brotherhood. 400M Bounty!', tier: 'Core' },
      { id: 'arc-30', title: 'Post-War Arc & ASL Flashback', type: 'canon', episodes: '490 – 516', startEp: 490, endEp: 516, epCount: 27, chapters: 'Ch 581 – 597', onePace: '10 eps (4 hr 45m)', bountyReward: 30000000, description: 'Luffy, Ace, and Sabo childhood; 3D2Y message.', highlights: 'Sake cup oath, Rayleigh training begins.', tier: 'Core' },
      { id: 'sp-3d2y', title: 'Special: 3D2Y (Overcoming Ace Death)', type: 'special', episodes: 'Special (107 min)', epCount: 4, bountyReward: 10000000, description: '2-year training period on Rusukaina Island.', watchTip: '⭐ Great bridge special! Watch after Ep 516.', tier: 'Must Watch' }
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
      { id: 'arc-33', title: 'Z’s Ambition Arc', type: 'filler', episodes: '575 – 578', startEp: 575, endEp: 578, epCount: 4, chapters: 'Film Tie-in', onePace: 'Skipped', bountyReward: 2000000, description: 'Neo Navy filler leading into Film Z.', watchTip: 'Watch right before Film Z.', tier: 'Recommended' },
      { id: 'mov-12', title: 'Movie 12: Film: Z (2012)', type: 'movie', episodes: 'Movie (108 min)', epCount: 5, bountyReward: 20000000, description: 'Former Admiral Zephyr plans to destroy the New World.', watchTip: '⭐ MASTERPIECE FILM! Considered top film.', tier: 'Must Watch' },
      { id: 'arc-34', title: 'Punk Hazard Arc', type: 'canon', episodes: '579 – 625', startEp: 579, endEp: 625, epCount: 47, chapters: 'Ch 654 – 699', onePace: '22 eps (10 hr 15m)', bountyReward: 60000000, description: 'Half-ice half-fire island. Law and Luffy forge alliance.', highlights: 'Pirate Alliance formed, Caesar Clown defeat.', tier: 'Core' },
      { id: 'arc-35', title: 'Caesar Retrieval Arc', type: 'filler', episodes: '626 – 628', startEp: 626, endEp: 628, epCount: 3, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Filler arc where Breed kidnaps Caesar.', watchTip: 'Filler. Skip to 629.', tier: 'Filler' },
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
      { id: 'arc-37', title: 'Silver Mine & Heart of Gold', type: 'filler', episodes: '747 – 750 + Special', startEp: 747, endEp: 750, epCount: 6, chapters: 'Film Tie-in', onePace: 'Skipped', bountyReward: 5000000, description: 'Film Gold tie-in adventure.', watchTip: 'Watch right before Film Gold.', tier: 'Recommended' },
      { id: 'mov-13', title: 'Movie 13: Film: Gold (2016)', type: 'movie', episodes: 'Movie (120 min)', epCount: 5, bountyReward: 25000000, description: 'Glamorous casino heist thriller aboard Gran Tesoro.', watchTip: '⭐ Fantastic spectacle. Watch after 750.', tier: 'Must Watch' },
      { id: 'arc-38', title: 'Zou Arc', type: 'canon', episodes: '751 – 779', startEp: 751, endEp: 779, epCount: 29, chapters: 'Ch 802 – 824', onePace: '12 eps (5 hr 30m)', bountyReward: 50000000, description: 'Elephant island Zunesha. Mink Tribe and Road Poneglyphs.', highlights: '"Raizo is safe!", Road Poneglyphs explained.', tier: 'Core' },
      { id: 'arc-39', title: 'Marine Rookie Arc', type: 'filler', episodes: '780 – 782', startEp: 780, endEp: 782, epCount: 3, chapters: 'Anime Original', onePace: 'Skipped', bountyReward: 0, description: 'Luffy raids a marine base for food.', watchTip: 'Filler. Skip to 783.', tier: 'Filler' },
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
      { id: 'arc-43', title: 'Cidre Guild (Stampede Tie-in)', type: 'filler', episodes: '895 – 896', startEp: 895, endEp: 896, epCount: 2, chapters: 'Film Tie-in', onePace: 'Skipped', bountyReward: 2000000, description: 'Tie-in for Stampede.', watchTip: 'Watch before Stampede.', tier: 'Recommended' },
      { id: 'mov-14', title: 'Movie 14: One Piece: Stampede', type: 'movie', episodes: 'Movie (101 min)', epCount: 5, bountyReward: 40000000, description: 'Pirate festival vs Douglas Bullet.', watchTip: '⭐ Non-stop dream team fights.', tier: 'Must Watch' },
      { id: 'arc-44', title: 'Wano Act 2 & Udon Prison', type: 'canon', episodes: '897 – 958', startEp: 897, endEp: 958, epCount: 62, chapters: 'Ch 925 – 955', onePace: '26 eps (12 hr 30m)', bountyReward: 150000000, description: 'Luffy masters Advanced Ryou in prison.', highlights: 'Zoro receives blade Enma.', tier: 'Core' },
      { id: 'arc-45', title: 'Wano Act 3: Oden & Raid Launch', type: 'canon', episodes: '959 – 1028', startEp: 959, endEp: 1028, epCount: 70, chapters: 'Ch 956 – 1010', onePace: '32 eps (15 hr 45m)', bountyReward: 300000000, description: 'Oden voyage with Whitebeard and Roger. Raid begins.', highlights: 'Roger "He Laughed", Jinbe arrives.', tier: 'Core' },
      { id: 'arc-46', title: 'Uta Past (Film Red Tie-in)', type: 'mixed', episodes: '1029 – 1030', startEp: 1029, endEp: 1030, epCount: 2, chapters: 'Film Tie-in', onePace: 'Skipped', bountyReward: 5000000, description: 'Luffy childhood with Uta.', watchTip: 'Watch before Film Red.', tier: 'Recommended' },
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
      { id: 'arc-48', title: 'Egghead Island Arc', type: 'canon', episodes: '1086 – Present', startEp: 1086, endEp: 1125, epCount: 40, chapters: 'Ch 1058 – 1125', onePace: 'In Production', bountyReward: 500000000, description: 'Future island of Dr. Vegapunk. Global broadcast.', highlights: 'Kuma backstory, Vegapunk broadcast. 3.5B Bounty!', tier: 'Core' },
      { id: 'sp-fanletter', title: 'Special: ONE PIECE FAN LETTER (2024)', type: 'special', episodes: 'Special (25 min)', epCount: 2, bountyReward: 10000000, description: 'Masterpiece 25th anniversary episode by Megumi Ishitani.', watchTip: '⭐ MASTERPIECE OF ANIMATION.', tier: 'Must Watch' }
    ]
  }
];

// PIRATE ACHIEVEMENTS SYSTEM
const ACHIEVEMENTS = [
  { id: 'ach-1', title: 'Setting Sail', icon: '⛵', tier: 'Bronze', description: 'Watched Episode 1 and began the journey across the Grand Line.', check: (watched, sub, eps) => eps >= 1 },
  { id: 'ach-2', title: 'East Blue Conqueror', icon: '🌊', tier: 'Bronze', description: 'Defeated Arlong and liberated Cocoyasi Village.', check: (watched) => watched.has('arc-5') },
  { id: 'ach-3', title: 'Entering the Grand Line', icon: '🧭', tier: 'Bronze', description: 'Scaled Reverse Mountain and passed through the Twin Capes.', check: (watched) => watched.has('arc-8') },
  { id: 'ach-4', title: 'Cherry Blossoms in Winter', icon: '🌸', tier: 'Silver', description: 'Witnessed Dr. Hiriluk miracle and recruited Tony Tony Chopper.', check: (watched) => watched.has('arc-10') },
  { id: 'ach-5', title: 'Warlord Down: Crocodile', icon: '🐊', tier: 'Silver', description: 'Saved Alabasta and brought rain to the desert.', check: (watched) => watched.has('arc-11') },
  { id: 'ach-6', title: 'Ring the Golden Bell', icon: '🔔', tier: 'Silver', description: 'Proved the City of Gold exists 10,000 meters in the sky.', check: (watched) => watched.has('arc-15') },
  { id: 'ach-7', title: 'Navarone Escapist', icon: '⚓', tier: 'Bronze', description: 'Completed G-8, the greatest filler arc in anime history.', check: (watched) => watched.has('arc-16') },
  { id: 'ach-8', title: 'Say You Want to Live!', icon: '🔥', tier: 'Gold', description: 'Declared war on the World Government at Enies Lobby.', check: (watched) => watched.has('arc-20') },
  { id: 'ach-9', title: 'Farewell, Merry', icon: '💔', tier: 'Silver', description: 'Said goodbye to the Going Merry on the snowy ocean.', check: (watched, sub, eps) => eps >= 312 },
  { id: 'ach-10', title: 'Nothing Happened', icon: '🩸', tier: 'Gold', description: 'Survived Bartholomew Kuma trial on Thriller Bark.', check: (watched) => watched.has('arc-23') },
  { id: 'ach-11', title: 'Celestial Punch', icon: '👊', tier: 'Silver', description: 'Punched Saint Charlos at the Sabaody Auction House.', check: (watched, sub, eps) => eps >= 396 },
  { id: 'ach-12', title: 'Great Prison Infiltration', icon: '🗝️', tier: 'Silver', description: 'Broke all levels of Impel Down with the pirate alliance.', check: (watched) => watched.has('arc-28') },
  { id: 'ach-13', title: 'The One Piece Is Real!', icon: '👑', tier: 'Gold', description: 'Witnessed the climax of the Paramount War at Marineford.', check: (watched) => watched.has('arc-29') },
  { id: 'ach-14', title: '3D2Y Rebirth', icon: '⏳', tier: 'Silver', description: 'Completed the pre-timeskip era and began the 2-year training.', check: (watched) => watched.has('arc-30') },
  { id: 'ach-15', title: 'Halfway Mark', icon: '🗺️', tier: 'Gold', description: 'Watched over 500 total episodes and specials.', check: (watched, sub, eps) => eps >= 500 },
  { id: 'ach-16', title: 'Deep Ocean Emancipator', icon: '🧜‍♂️', tier: 'Silver', description: 'Protected Fish-Man Island and learned of Joy Boy.', check: (watched) => watched.has('arc-32') },
  { id: 'ach-17', title: 'The Boundman Awakens', icon: '🦍', tier: 'Gold', description: 'Unlocked Fourth Gear and shattered Doflamingo Birdcage.', check: (watched) => watched.has('arc-36') },
  { id: 'ach-18', title: 'Grand Fleet Founder', icon: '🚩', tier: 'Silver', description: 'Formed the 5,600-member Straw Hat Grand Fleet.', check: (watched, sub, eps) => eps >= 745 },
  { id: 'ach-19', title: 'Raizo Is Safe!', icon: '🥷', tier: 'Silver', description: 'Discovered the Mink Tribe loyalty and the Road Poneglyphs.', check: (watched) => watched.has('arc-38') },
  { id: 'ach-20', title: 'Fifth Emperor of the Sea', icon: '🦅', tier: 'Gold', description: 'Escaped Whole Cake Island with a 1.5 Billion Bounty.', check: (watched) => watched.has('arc-40') },
  { id: 'ach-21', title: 'Drums of Liberation', icon: '☀️', tier: 'Platinum', description: 'Witnessed the Gear 5th Sun God Nika awakening in Wano.', check: (watched) => watched.has('arc-47') },
  { id: 'ach-22', title: 'Millennium Voyager', icon: '⭐', tier: 'Platinum', description: 'Watched 1,000+ total episodes of One Piece.', check: (watched, sub, eps) => eps >= 1000 },
  { id: 'ach-23', title: 'Future Island Scholar', icon: '🤖', tier: 'Gold', description: 'Arrived at Dr. Vegapunk future island of Egghead.', check: (watched, sub, eps) => eps >= 1086 },
  { id: 'ach-24', title: 'King of the Pirates', icon: '🏆', tier: 'Platinum', description: 'Caught up with the entire Grand Line broadcast voyage!', check: (watched, sub, eps, total) => eps >= total && total > 0 }
];

// Helper to look up or generate episode title
function getEpisodeTitle(epNumber, arcTitle) {
  if (EPISODE_TITLES && EPISODE_TITLES[epNumber]) {
    return EPISODE_TITLES[epNumber];
  }
  return `${arcTitle || 'Grand Line'} — Episode ${epNumber}`;
}

export default function App() {
  const [activeThemeId, setActiveThemeId] = useState(() => localStorage.getItem('op_tracker_theme') || 'classic');
  const [showThemePicker, setShowThemePicker] = useState(false);

  const [bgMode, setBgMode] = useState(() => localStorage.getItem('op_header_bg_mode') || 'auto');
  const [showBgPicker, setShowBgPicker] = useState(false);

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

  const theme = THEMES[activeThemeId] || THEMES.classic;

  useEffect(() => { localStorage.setItem('op_tracker_theme', activeThemeId); }, [activeThemeId]);
  useEffect(() => { localStorage.setItem('op_header_bg_mode', bgMode); }, [bgMode]);
  useEffect(() => { localStorage.setItem('op_tracker_watched', JSON.stringify(Array.from(watchedIds))); }, [watchedIds]);
  useEffect(() => { localStorage.setItem('op_tracker_skipped', JSON.stringify(Array.from(skippedIds))); }, [skippedIds]);
  useEffect(() => { localStorage.setItem('op_tracker_subprogress', JSON.stringify(subProgress)); }, [subProgress]);
  useEffect(() => { localStorage.setItem('op_spoiler_shield', spoilerShield.toString()); }, [spoilerShield]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
      .filter(item => item.type === 'filler' && (!watchedIds.has(item.id) || skippedIds.has(item.id)))
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

  const upNextData = useMemo(() => {
    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
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
  }, [allItems, watchedIds, skippedIds, subProgress]);

  const activeBgKey = useMemo(() => {
    if (bgMode !== 'auto' && BACKGROUND_ARTWORKS[bgMode]) {
      return bgMode;
    }
    return upNextData?.saga?.id || 'east-blue';
  }, [bgMode, upNextData]);

  const activeHeaderArtwork = BACKGROUND_ARTWORKS[activeBgKey]?.img || bgEastBlue;
  const activeHeaderLabel = bgMode === 'auto'
    ? `Auto (${BACKGROUND_ARTWORKS[activeBgKey]?.name || 'Arc'})`
    : BACKGROUND_ARTWORKS[activeBgKey]?.name || 'Custom';

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
    if (upNextData.saga) {
      setExpandedSagas(prev => new Set(prev).add(upNextData.saga.id));
    }
    setTimeout(() => {
      const el = document.getElementById(`arc-card-${upNextData.item.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      dailyPace
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
        showToast('Voyage progress restored successfully!');
      } catch {
        showToast('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const shareVoyageLink = () => {
    const params = new URLSearchParams();
    if (upNextData?.currentEp) params.set('ep', upNextData.currentEp.toString());
    params.set('theme', activeThemeId);
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard?.writeText
      ? navigator.clipboard.writeText(shareUrl)
      : document.execCommand('copy');
    showToast('Voyage link copied to clipboard!');
  };

  const filteredSagas = useMemo(() => {
    return SAGAS_DATA.map(saga => {
      const filteredItems = saga.items.filter(item => {
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
  }, [filterType, searchQuery]);

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
      className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 selection:text-slate-950 transition-colors duration-300"
      style={{
        '--theme-primary': theme.primary,
        '--theme-hover': theme.primaryHover
      }}
    >
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/50 text-amber-300 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* STICKY "UP NEXT" BAR WITH iOS SAFE-AREA SUPPORT */}
      {upNextData && (
        <div 
          className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/30 px-3 sm:px-4 pb-2 sm:pb-2.5 shadow-xl transition"
          style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
            
            {/* Row 1 on Mobile: Episode Metadata */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 w-full sm:flex-1 overflow-hidden">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                {upNextData.item.type === 'movie' ? (
                  <Film className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" />
                ) : (
                  <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" />
                )}
              </div>

              <div 
                className="min-w-0 flex-1 overflow-hidden select-none"
                title={upNextData.episodeTitle}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 sm:px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                    {upNextData.isEpBased
                      ? `Up Next • Ep ${upNextData.currentEp}`
                      : `Up Next • ${upNextData.item.type.toUpperCase()}`}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-400 truncate">
                    {upNextData.item.title}
                  </span>
                </div>

                <div className="relative overflow-hidden w-full mt-0.5">
                  <h4 className="text-xs sm:text-sm font-black text-slate-100 truncate">
                    {upNextData.isEpBased && (
                      <span className="text-amber-300 mr-1 shrink-0">Ep {upNextData.currentEp}:</span>
                    )}
                    <span className="italic text-slate-200">"{upNextData.episodeTitle}"</span>
                  </h4>
                </div>
              </div>
            </div>

            {/* Row 2 on Mobile: Action Buttons (Equal Grid on Mobile, Flex on Desktop) */}
            <div className="grid grid-cols-3 sm:flex sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={scrollToActiveArc}
                className="px-2 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] sm:text-xs font-semibold border border-slate-700 transition flex items-center justify-center gap-1 whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Jump</span>
              </button>

              <button
                onClick={skipUpNext}
                title="Skip this item without marking as watched"
                className="px-2 sm:px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-300 text-[11px] sm:text-xs font-semibold border border-slate-700/80 transition flex items-center justify-center gap-1 whitespace-nowrap"
              >
                <SkipForward className="w-3.5 h-3.5 shrink-0" />
                <span>Skip</span>
              </button>

              <button
                onClick={advanceUpNext}
                className="px-2.5 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-[11px] sm:text-xs font-black shadow-md shadow-amber-500/20 transition flex items-center justify-center gap-1 whitespace-nowrap col-span-1"
              >
                {upNextData.isEpBased ? (
                  <>
                    <span>{upNextData.currentEp === upNextData.endEp ? 'Finish' : 'Next (+1)'}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Header Banner with Dynamic Safe-Area Padding */}
      <header 
        className="relative bg-slate-950 border-b border-slate-800 px-4 pb-8 md:py-12 overflow-hidden"
        style={{ paddingTop: 'max(2rem, calc(env(safe-area-inset-top) + 1.5rem))' }}
      >
        {/* 1. Dynamic Background Artwork Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            key={activeBgKey}
            src={activeHeaderArtwork}
            alt="One Piece Background Artwork"
            className="w-full h-full object-cover object-center opacity-30 filter contrast-125 brightness-95 transition-opacity duration-1000"
          />
        </div>

        {/* 2. Dynamic Straw Hat Theme Tint Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 mix-blend-color"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}66 0%, transparent 80%)`
          }}
        />

        {/* 3. Dark Vignette Overlay for Text Readability */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-950/70 via-slate-950/85 to-slate-950" />

        {/* 4. Straw Hat Radial Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 z-0"
          style={{ background: theme.accentGlow }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm"
                  style={{
                    backgroundColor: `${theme.primary}15`,
                    borderColor: `${theme.primary}50`,
                    color: theme.primary
                  }}
                >
                  <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                  Grand Line Definitive Order
                </div>

                {/* Theme Selector Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowThemePicker(!showThemePicker)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 transition"
                  >
                    <Palette className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                    <span>Theme: <strong>{theme.character}</strong></span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {showThemePicker && (
                    <div className="absolute left-0 mt-2 w-64 bg-slate-900/95 border border-slate-800 rounded-2xl p-2.5 shadow-2xl z-50 backdrop-blur-md grid grid-cols-1 gap-1 max-h-80 overflow-y-auto">
                      <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                        Choose Straw Hat Theme
                      </div>
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
                            onClick={() => {
                              setActiveThemeId(t.id);
                              setShowThemePicker(false);
                              showToast(`Switched theme to ${t.character}!`);
                            }}
                            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition ${
                              activeThemeId === t.id ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/60'
                            }`}
                          >
                            <span className="text-base">{isThemeLocked ? '🔒' : t.avatar}</span>
                            <div className="flex-1 truncate">
                              <div className={`font-bold ${isThemeLocked ? 'filter blur-[3px] select-none' : ''}`}>
                                {isThemeLocked ? 'Locked Member' : t.name}
                              </div>
                            </div>
                            <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: t.primary }} />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Background Selector Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowBgPicker(!showBgPicker)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 transition"
                    title="Change header background artwork"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Background: <strong>{activeHeaderLabel}</strong></span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {showBgPicker && (
                    <div className="absolute left-0 mt-2 w-64 bg-slate-900/95 border border-slate-800 rounded-2xl p-2.5 shadow-2xl z-50 backdrop-blur-md grid grid-cols-1 gap-1 max-h-80 overflow-y-auto">
                      <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                        Header Background Mode
                      </div>
                      
                      <button
                        onClick={() => {
                          setBgMode('auto');
                          setShowBgPicker(false);
                          showToast('Header art set to Auto-Sync with your active arc!');
                        }}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition ${
                          bgMode === 'auto' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <span>🔄 Auto (Follow Active Arc)</span>
                        {bgMode === 'auto' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                      </button>

                      {/* Custom Showcases Group */}
                      <div className="my-1 border-t border-slate-800" />
                      <div className="text-[10px] font-bold text-amber-400/90 px-2 uppercase tracking-wider">
                        Special Showcases
                      </div>

                      {['sunny', 'strawhat', 'merry'].map(customKey => {
                        const item = BACKGROUND_ARTWORKS[customKey];
                        return (
                          <button
                            key={customKey}
                            onClick={() => {
                              setBgMode(customKey);
                              setShowBgPicker(false);
                              showToast(`Header background locked to ${item.name}!`);
                            }}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition ${
                              bgMode === customKey ? 'bg-slate-800 text-amber-300' : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{item.icon}</span>
                              <strong className="font-semibold">{item.name}</strong>
                            </span>
                            {bgMode === customKey && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                          </button>
                        );
                      })}

                      {/* Saga Collection Group */}
                      <div className="my-1 border-t border-slate-800" />
                      <div className="text-[10px] font-bold text-slate-500 px-2 uppercase tracking-wider">
                        Lock to Specific Saga
                      </div>

                      {SAGAS_DATA.map((saga, idx) => (
                        <button
                          key={saga.id}
                          onClick={() => {
                            setBgMode(saga.id);
                            setShowBgPicker(false);
                            showToast(`Header background locked to ${saga.title}!`);
                          }}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition ${
                            bgMode === saga.id ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                          }`}
                        >
                          <span className="truncate">{idx + 1}. {saga.title}</span>
                          {bgMode === saga.id && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
                <span>The One Piece Voyage</span>
                <span className="text-2xl md:text-3xl">{theme.avatar}</span>
              </h1>
              <p className="mt-2 text-slate-400 text-xs md:text-sm max-w-2xl">
                Track all 1,120+ episodes, movies, and canonical arcs. Log your progress and unlock Grand Line achievements.
              </p>
            </div>

            {/* Live Marine Bounty & Achievements Quick Card */}
            <div
              onClick={() => setActiveTab('achievements')}
              className="cursor-pointer group bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 p-4 rounded-3xl shadow-xl transition flex items-center gap-4 relative overflow-hidden shrink-0 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl group-hover:scale-105 transition shrink-0">
                💰
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-400" /> Active Marine Bounty
                </div>
                
                <div className="text-2xl md:text-3xl font-black text-amber-400 tracking-tight font-mono truncate mt-0.5">
                  ฿ {formatBounty(calculatedBounty)}
                </div>

                <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <Award className="w-3 h-3 text-amber-500/80 shrink-0" />
                  <span>Achievements:</span>
                  <span className="text-slate-200 font-bold font-mono">
                    {unlockedCount} / {ACHIEVEMENTS.length}
                  </span>
                  <span className="text-emerald-400 font-semibold font-mono text-[10px]">
                    ({Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Watch Time Metrics */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center backdrop-blur-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Watched Units</div>
              <div className="text-lg font-black text-amber-400 font-mono mt-0.5">{watchedEpisodesCount}</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center backdrop-blur-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Screen Time</div>
              <div className="text-lg font-black text-cyan-400 font-mono mt-0.5">{watchTimeStats.hoursWatched} hrs</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center backdrop-blur-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Continuous Days</div>
              <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">{watchTimeStats.daysEquivalent} days</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center backdrop-blur-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Filler Time Saved</div>
              <div className="text-lg font-black text-orange-400 font-mono mt-0.5">+{watchTimeStats.fillerHoursSaved} hrs</div>
            </div>
          </div>

          {/* Global Progress Bar */}
          <div className="mt-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-800/80 shadow-lg backdrop-blur-sm">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="flex items-center gap-1.5" style={{ color: theme.primary }}>
                <Anchor className="w-4 h-4" /> Voyage Progress
              </span>
              <span className="text-slate-400">
                {watchedEpisodesCount} of ~{totalEpisodesCount} Episodes ({progressPercent}%)
              </span>
            </div>

            <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full transition-all duration-500 shadow-sm`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Crew Status Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" style={{ color: theme.primary }} /> Straw Hats Recruited:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Luffy', icon: '🍖', id: 'luffy' },
                  { name: 'Zoro', icon: '⚔️', id: 'zoro' },
                  { name: 'Usopp', icon: '🎯', id: 'usopp' },
                  { name: 'Sanji', icon: '🍳', id: 'sanji' },
                  { name: 'Nami', icon: '🍊', id: 'nami' },
                  { name: 'Chopper', icon: '🌸', id: 'chopper' },
                  { name: 'Robin', icon: '📖', id: 'robin' },
                  { name: 'Franky', icon: '⭐', id: 'franky' },
                  { name: 'Brook', icon: '🎻', id: 'brook' },
                  { name: 'Jinbe', icon: '🌊', id: 'jinbe' }
                ].map(member => {
                  const isRecruited = unlockedCrew.includes(member.name === 'Robin' ? 'Nico Robin' : member.name);
                  const isMasked = spoilerShield && !isRecruited;

                  return (
                    <button
                      key={member.name}
                      onClick={() => {
                        setActiveThemeId(member.id);
                        showToast(`Active Straw Hat: ${member.name}!`);
                      }}
                      title={isMasked ? 'Locked Member' : `Activate ${member.name} theme`}
                      className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-all flex items-center gap-1.5 ${
                        isRecruited
                          ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-500/50'
                          : 'bg-slate-950/40 text-slate-600 border border-slate-900 opacity-70 group'
                      }`}
                    >
                      {isMasked ? (
                        <>
                          <Lock className="w-3 h-3 text-slate-500 group-hover:hidden" />
                          <span className="hidden group-hover:inline">{member.icon}</span>
                          <span className="filter blur-[3.5px] group-hover:filter-none select-none transition">
                            {member.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>{member.icon}</span>
                          <span>{member.name}</span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 mt-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4 overflow-x-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                activeTab === 'roadmap'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Compass className="w-4 h-4" /> Watch Roadmap
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                activeTab === 'achievements'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-4 h-4" /> Achievements ({unlockedCount}/{ACHIEVEMENTS.length})
            </button>
            <button
              onClick={() => setActiveTab('tierlist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                activeTab === 'tierlist'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Film className="w-4 h-4" /> Movies & Placement
            </button>
            <button
              onClick={() => setActiveTab('pacing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                activeTab === 'pacing'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4" /> Pacing Calculator
            </button>
            <button
              onClick={() => setActiveTab('quicktips')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                activeTab === 'quicktips'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Guide & Fillers
            </button>
          </div>

          <div className="flex items-center gap-2">
            {skippedIds.size > 0 && (
              <button
                onClick={resetSkippedItems}
                title="Restore skipped items"
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden md:inline">Reset Skips ({skippedIds.size})</span>
              </button>
            )}

            <button
              onClick={shareVoyageLink}
              title="Share Current Voyage URL"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => {
                setSpoilerShield(!spoilerShield);
                showToast(`Spoiler Shield ${!spoilerShield ? 'Activated' : 'Deactivated'}!`);
              }}
              title="Toggle Spoiler Shield"
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                spoilerShield
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {spoilerShield ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden md:inline">Spoiler Shield</span>
            </button>

            <button
              onClick={exportProgressJSON}
              title="Export progress JSON"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
            >
              <Download className="w-4 h-4" />
            </button>

            <label
              title="Import progress JSON"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={importProgressJSON} className="hidden" />
            </label>

            <button
              onClick={() => setShowResetModal(true)}
              title="Reset progress"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TAB 1: WATCH ROADMAP */}
        {activeTab === 'roadmap' && (
          <div>
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-sm">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
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
                  const sagaWatchedCount = saga.items.filter(i => watchedIds.has(i.id)).length;
                  const sagaTotalCount = saga.items.length;
                  const isSagaComplete = sagaTotalCount > 0 && sagaWatchedCount === sagaTotalCount;

                  return (
                    <div
                      key={saga.id}
                      className="bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl hover:border-slate-700/80 transition"
                    >
                      <div className="p-5 md:p-6 bg-gradient-to-r from-slate-900 to-slate-900/40 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => toggleSagaExpand(saga.id)}
                            className="mt-1 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
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
                            </div>
                            <h2 className="text-xl md:text-2xl font-black text-slate-100">{saga.title}</h2>
                            <p className="text-xs md:text-sm text-slate-400 mt-0.5">{saga.tagline}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <span className="text-xs font-medium text-slate-400 mr-2">
                            {sagaWatchedCount}/{sagaTotalCount} Done
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

                      {isExpanded && (
                        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {saga.items.map(item => {
                            const isWatched = watchedIds.has(item.id);
                            const isSkipped = skippedIds.has(item.id);
                            const isMustWatch = item.tier === 'Must Watch';
                            const isFiller = item.type === 'filler';
                            const currentEp = getItemCurrentEpisode(item);
                            const hasStepper = Boolean(item.startEp && item.endEp);
                            const currentEpTitle = currentEp !== null ? getEpisodeTitle(currentEp, item.title) : null;

                            return (
                              <div
                                key={item.id}
                                id={`arc-card-${item.id}`}
                                className={`relative p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                                  isWatched
                                    ? 'bg-slate-950/60 border-emerald-500/30 text-slate-300'
                                    : isSkipped
                                    ? 'bg-slate-950/30 border-amber-500/20 text-slate-400 opacity-60'
                                    : isMustWatch
                                    ? 'bg-slate-900/90 border-amber-500/40 shadow-md shadow-amber-500/5'
                                    : isFiller
                                    ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                                    : 'bg-slate-900/80 border-slate-800'
                                }`}
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      {item.type === 'canon' && <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Canon</span>}
                                      {item.type === 'mixed' && <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Mixed</span>}
                                      {item.type === 'movie' && <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1"><Film className="w-3 h-3" /> Movie</span>}
                                      {item.type === 'special' && <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Special</span>}
                                      {item.type === 'recommended_filler' && <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Top Filler</span>}
                                      {item.type === 'filler' && <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">Filler (Skip)</span>}
                                      {isMustWatch && <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950 flex items-center gap-0.5 font-bold"><Star className="w-2.5 h-2.5 fill-current" /> Essential</span>}
                                      {isSkipped && <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-400/80 border border-amber-500/20">Skipped</span>}
                                    </div>

                                    <button
                                      onClick={() => toggleItem(item)}
                                      title={isWatched ? 'Mark unwatched' : 'Mark watched'}
                                      className="shrink-0 p-1 text-slate-400 hover:text-amber-400 transition"
                                    >
                                      {isWatched ? <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" /> : <Circle className="w-5 h-5" />}
                                    </button>
                                  </div>

                                  <div className="mb-2">
                                    <h3 className={`text-base font-bold transition ${isWatched ? 'text-slate-300 line-through' : 'text-slate-100'}`}>
                                      {item.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-amber-400/90 mt-1">
                                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.episodes}</span>
                                      {item.chapters && <span className="text-slate-400 flex items-center gap-1"><BookOpen className="w-3 h-3" /> {item.chapters}</span>}
                                      {item.onePace && item.onePace !== 'Skipped' && <span className="text-cyan-400 text-[11px] font-normal">⚡ One Pace: {item.onePace}</span>}
                                    </div>
                                  </div>

                                  <div className="relative mb-3">
                                    <p className={`text-xs text-slate-400 leading-relaxed transition duration-300 ${spoilerShield && !isWatched ? 'filter blur-[3.5px] hover:filter-none select-none hover:select-text' : ''}`}>
                                      {item.description}
                                    </p>
                                    {spoilerShield && !isWatched && (
                                      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-slate-300 bg-slate-950/60 rounded-lg pointer-events-none">
                                        🔒 Hover to view plot (Spoiler Shield Active)
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {hasStepper && (
                                  <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-950/40 -mx-4 -mb-4 p-3.5 rounded-b-2xl">
                                    <div className="flex items-center justify-between text-xs mb-1.5">
                                      <div className="flex items-center gap-1.5 truncate mr-2">
                                        <BookmarkCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                        <span className="font-semibold text-slate-300 truncate">
                                          {isWatched ? (
                                            <span className="text-emerald-400">Completed through Ep {item.endEp}</span>
                                          ) : currentEp !== null ? (
                                            <span>Watching: <strong className="text-amber-300 font-mono text-sm">Episode {currentEp}</strong> of {item.endEp}</span>
                                          ) : (
                                            <span className="text-slate-500">Not started (Starts at Ep {item.startEp})</span>
                                          )}
                                        </span>
                                      </div>
                                      {currentEp !== null && !isWatched && (
                                        <span className="text-[11px] font-mono text-slate-400 shrink-0">
                                          ({currentEp - item.startEp + 1}/{item.epCount})
                                        </span>
                                      )}
                                    </div>

                                    {currentEp !== null && !isWatched && currentEpTitle && (
                                      <div className="text-[11px] italic text-slate-400 truncate mb-2.5 pl-5 border-l border-amber-500/30">
                                        "{currentEpTitle}"
                                      </div>
                                    )}

                                    <div className="flex items-center justify-between gap-2">
                                      <div className="flex items-center gap-1">
                                        <button
                                          onClick={() => handleSetCurrentEpisode(item, (currentEp !== null ? currentEp : item.startEp) - 1)}
                                          disabled={currentEp === null || currentEp < item.startEp}
                                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 text-xs font-bold transition flex items-center gap-1"
                                        >
                                          <Minus className="w-3 h-3" /> 1
                                        </button>
                                        <button
                                          onClick={() => handleSetCurrentEpisode(item, (currentEp !== null ? currentEp : item.startEp - 1) + 1)}
                                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1"
                                        >
                                          <Plus className="w-3 h-3" /> 1
                                        </button>
                                        {item.epCount > 5 && (
                                          <button
                                            onClick={() => handleSetCurrentEpisode(item, Math.min(item.endEp, (currentEp !== null ? currentEp : item.startEp - 1) + 5))}
                                            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition flex items-center gap-0.5"
                                          >
                                            <FastForward className="w-3 h-3 text-cyan-400" /> +5
                                          </button>
                                        )}
                                      </div>

                                      <div className="flex items-center gap-1 text-xs">
                                        <span className="text-[11px] text-slate-500 font-medium">Jump Ep:</span>
                                        <input
                                          type="number"
                                          min={item.startEp}
                                          max={item.endEp}
                                          value={currentEp || ''}
                                          placeholder={item.startEp.toString()}
                                          onChange={(e) => {
                                            const val = parseInt(e.target.value, 10);
                                            if (!isNaN(val)) handleSetCurrentEpisode(item, val);
                                          }}
                                          className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-center text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {!hasStepper && item.watchTip && (
                                  <div className="text-[11px] bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-amber-300/90 font-medium flex items-start gap-2 mt-2">
                                    <Info className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
                                    <span>{item.watchTip}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
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
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                      ach.isUnlocked
                        ? 'bg-slate-900/90 border-slate-700 shadow-md'
                        : 'bg-slate-950/40 border-slate-900 opacity-75 group'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border ${
                        ach.isUnlocked ? tierStyles : 'bg-slate-900 border-slate-800 grayscale'
                      }`}
                    >
                      {ach.isUnlocked ? (
                        ach.icon
                      ) : isMasked ? (
                        <>
                          <Lock className="w-5 h-5 text-slate-500 group-hover:hidden" />
                          <span className="hidden group-hover:inline">{ach.icon}</span>
                        </>
                      ) : (
                        ach.icon
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h4 className="text-sm font-bold truncate">
                          {isMasked ? (
                            <span className="filter blur-[3.5px] group-hover:filter-none select-none transition text-slate-400">
                              {ach.title}
                            </span>
                          ) : (
                            <span className={ach.isUnlocked ? 'text-slate-100' : 'text-slate-400'}>
                              {ach.title}
                            </span>
                          )}
                        </h4>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border shrink-0 ${tierStyles}`}>
                          {ach.tier}
                        </span>
                      </div>

                      <div className="relative mt-1">
                        <p className={`text-xs leading-relaxed transition-all duration-300 ${
                          isMasked 
                            ? 'filter blur-[3.5px] group-hover:filter-none select-none text-slate-500 group-hover:text-slate-400' 
                            : ach.isUnlocked 
                            ? 'text-slate-400' 
                            : 'text-slate-600'
                        }`}>
                          {ach.description}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[10px] font-bold">
                        {ach.isUnlocked ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Unlocked
                          </span>
                        ) : isMasked ? (
                          <span className="text-slate-500 flex items-center gap-1 group-hover:text-amber-400/80 transition">
                            <Lock className="w-3 h-3" /> Hidden (Hover to view)
                          </span>
                        ) : (
                          <span className="text-slate-500 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Locked
                          </span>
                        )}
                      </div>
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
                { title: 'One Piece Film: Z (2012)', movieNum: 'Movie 12', placement: 'Watch after Episode 578 (Post-Fishman Island)', why: 'Widely hailed as the best film. Former Admiral Zephyr and Marine justice.', tier: 'S-Tier' },
                { title: 'One Piece Film: Strong World (2009)', movieNum: 'Movie 10', placement: 'Watch after Episode 381 (or Ep 429)', why: 'First film written by Eiichiro Oda. The battle with Shiki the Golden Lion.', tier: 'S-Tier' },
                { title: 'Baron Omatsuri & Secret Island (2005)', movieNum: 'Movie 6', placement: 'Watch after Episode 224 (before Water 7)', why: 'Directed by Mamoru Hosoda. Dark, psychological thriller exploring crew bonds.', tier: 'S-Tier' },
                { title: 'One Piece Film: Red (2022)', movieNum: 'Movie 15', placement: 'Watch after Episode 1030 (Wano Act 3)', why: 'Global phenomenon with vocals by Ado as Uta and Red-Haired Shanks.', tier: 'S-Tier' },
                { title: 'One Piece: Stampede (2019)', movieNum: 'Movie 14', placement: 'Watch after Episode 896 (between WCI and Wano)', why: '20th Anniversary festival war uniting Worst Generation, Marines, and Warlords.', tier: 'Must Watch' },
                { title: 'One Piece Film: Gold (2016)', movieNum: 'Movie 13', placement: 'Watch after Episode 750 (Post-Dressrosa)', why: 'High-octane casino heist thriller aboard the 10km golden ship Gran Tesoro.', tier: 'Must Watch' }
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
            <span>One Piece Voyage Tracker</span>
            <span>&bull;</span>
            <span>Made for Straw Hat Pirates across the Grand Line</span>
          </div>

          <div className="flex items-center gap-3">
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

      {/* FLOATING ACTION BUTTON WITH iOS SAFE-AREA BOTTOM SUPPORT */}
      {upNextData && (
        <button
          onClick={scrollToActiveArc}
          title={`Jump to ${upNextData.item.title}`}
          style={{ bottom: 'max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))' }}
          className="fixed left-6 z-40 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 px-4 py-3 rounded-2xl shadow-2xl font-black text-xs flex items-center gap-2 border border-amber-300/40 hover:scale-105 active:scale-95 transition"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>{upNextData.isEpBased ? `Ep ${upNextData.currentEp} • ` : ''}Jump to Arc</span>
        </button>
      )}

      {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
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
        </div>
      )}
    </div>
  );
}
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { EPISODE_TITLES } from './data/episodeTitles';
import InstallPromptBanner from './InstallPromptBanner';
import ArcCard, { isDetourType } from './components/ArcCard';
import { Art, BountyStrip, Eyecatch, Masthead, NowStrip, SpoilerContent, Tabs, TitleCard, ToastDock, VoyageAxis } from './components/VoyageUI';
import { Films, Guide, Logbook } from './components/Panels';
import { AboutDialog, FinaleDialog, ImportDialog, ResetDialog, SettingsDialog, TuneDialog } from './components/Dialogs';

import {
  Anchor, Bell, Bird, Castle, ChevronDown, Compass, Cpu, Crown, Droplet, Flag, Flame, Flower2, Hand,
  HeartCrack, Hourglass, KeyRound, Map, Sailboat, Search, Ship, Skull, Star, Sun, Swords, Trophy, Waves, Zap
} from 'lucide-react';

// Saga artwork. The originals live in src/assets/sagas; `npm run art` makes the
// web-sized copies in src/assets/sagas/web that the app actually ships.
const ART_FILES = import.meta.glob('./assets/sagas/web/*.webp', { eager: true, import: 'default' });
const artFor = file => {
  const find = w => ART_FILES[`./assets/sagas/web/${file}-${w}.webp`];
  return { w960: find(960), w1920: find(1920) };
};

// Background Map: Sagas + Custom Ship & Iconography Backgrounds
const BACKGROUND_ARTWORKS = {
  'east-blue': { name: 'East Blue', ...artFor('1east-blue'), type: 'saga' },
  'alabasta': { name: 'Alabasta', ...artFor('2alabasta'), type: 'saga' },
  'skypiea': { name: 'Skypiea', ...artFor('3skypiea'), type: 'saga' },
  'water-7': { name: 'Water 7', ...artFor('4water-7'), type: 'saga' },
  'thriller-bark': { name: 'Thriller Bark', ...artFor('5thriller-bark'), type: 'saga' },
  'summit-war': { name: 'Summit War', ...artFor('6summit-war'), type: 'saga' },
  'fishman-island': { name: 'Fish-Man Island', ...artFor('7fishman-island'), type: 'saga' },
  'dressrosa-saga': { name: 'Dressrosa', ...artFor('8dressrosa-saga'), type: 'saga' },
  'whole-cake': { name: 'Whole Cake Island', ...artFor('9whole-cake'), type: 'saga' },
  'wano': { name: 'Wano Country', ...artFor('10wano'), type: 'saga' },
  'final-saga': { name: 'Final Saga (Egghead)', ...artFor('11final-saga'), type: 'saga' },
  'elbaph': { name: 'Elbaph', ...artFor('12elbaph'), type: 'saga' },

  'sunny': { name: 'Thousand Sunny', ...artFor('sunny'), type: 'custom' },
  'strawhat': { name: 'Straw Hat', ...artFor('strawhat'), type: 'custom' },
  'merry': { name: 'Going Merry', ...artFor('merry'), type: 'custom' }
};

// Straw Hat themes. Each one is an eyecatch colour: a flat field the title card,
// bounty strip and primary buttons are painted in.
const THEMES = {
  classic: { id: 'classic', name: 'Romance Dawn', character: 'Classic One Piece', primary: '#f2b705' },
  luffy: { id: 'luffy', name: 'Luffy', character: 'Monkey D. Luffy', primary: '#d8322a' },
  zoro: { id: 'zoro', name: 'Zoro', character: 'Roronoa Zoro', primary: '#2a7d45' },
  nami: { id: 'nami', name: 'Nami', character: 'Nami', primary: '#f27d1f' },
  usopp: { id: 'usopp', name: 'Usopp', character: 'Usopp', primary: '#c9a227' },
  sanji: { id: 'sanji', name: 'Sanji', character: 'Sanji', primary: '#2a5fc4' },
  chopper: { id: 'chopper', name: 'Chopper', character: 'Tony Tony Chopper', primary: '#ef7fae' },
  robin: { id: 'robin', name: 'Robin', character: 'Nico Robin', primary: '#6c4bb6' },
  franky: { id: 'franky', name: 'Franky', character: 'Franky', primary: '#19a7c9' },
  brook: { id: 'brook', name: 'Brook', character: 'Brook', primary: '#a7adb8' },
  jinbe: { id: 'jinbe', name: 'Jinbe', character: 'Jinbe', primary: '#0e7a72' },
  nika: { id: 'nika', name: 'Nika', character: 'Drums of Liberation', primary: '#f6ecd0' }
};

// Ink or white, whichever reads better on a flat field of this colour.
function onField(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  const lin = c => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
  const L = 0.2126 * lin((v >> 16) & 255) + 0.7152 * lin((v >> 8) & 255) + 0.0722 * lin(v & 255);
  const inkContrast = (L + 0.05) / (0.0082 + 0.05);
  const whiteContrast = 1.05 / (L + 0.05);
  return inkContrast >= whiteContrast ? '#17150f' : '#ffffff';
}

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
  return `${arcTitle || 'Grand Line'}, episode ${epNumber}`;
}

const ALL_ITEMS = SAGAS_DATA.flatMap(s => s.items.map(item => ({ item, saga: s })));
const ITEM_INDEX = Object.fromEntries(ALL_ITEMS.map(({ item }, i) => [item.id, i]));
const KNOWN_IDS = new Set(Object.keys(ITEM_INDEX));
const LAST_EP = Math.max(...ALL_ITEMS.map(({ item }) => item.endEp || 0));
const MINUTES_PER_UNIT = 23.5;
const isEpBased = item => Boolean(item.startEp && item.endEp);

// subProgress[id] is the episode you're on inside that arc: the next one to watch.
// Everything from startEp up to (not including) it counts as watched.
function unitsWatchedIn(item, watched, sub) {
  if (watched.has(item.id)) return item.epCount || 0;
  if (isEpBased(item) && sub[item.id] !== undefined) return Math.max(0, Math.min(item.epCount, sub[item.id] - item.startEp));
  return 0;
}

function findNext(watched, skipped, sub, purist) {
  for (let i = 0; i < ALL_ITEMS.length; i++) {
    const { item, saga } = ALL_ITEMS[i];
    if (purist && isDetourType(item.type)) continue;
    if (watched.has(item.id) || skipped.has(item.id)) continue;
    const epBased = isEpBased(item);
    const currentEp = epBased ? Math.max(item.startEp, sub[item.id] ?? item.startEp) : null;
    return {
      index: i, item, saga, isEpBased: epBased, currentEp, startEp: item.startEp, endEp: item.endEp,
      episodeTitle: epBased ? getEpisodeTitle(currentEp, item.title) : item.title,
      isDetour: isDetourType(item.type)
    };
  }
  return null;
}

const describeNext = next => !next ? 'caught up' : next.isEpBased ? `Ep ${next.currentEp}, ${next.item.title}` : next.item.title;

// The episode the viewer is standing on, for the voyage line.
function positionEpisode(next) {
  if (!next) return LAST_EP;
  if (next.isEpBased) return next.currentEp;
  for (let i = next.index - 1; i >= 0; i--) {
    const { item } = ALL_ITEMS[i];
    if (isEpBased(item)) return Math.min(LAST_EP, item.endEp + 1);
  }
  return 1;
}

const readJSON = (key, fallback) => {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
};
const writeKey = (key, value) => { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } };

export default function App() {
  const [activeThemeId, setActiveThemeId] = useState(() => localStorage.getItem('op_tracker_theme') || 'classic');
  const [bgMode, setBgMode] = useState(() => localStorage.getItem('op_header_bg_mode') || 'auto');
  const [canonPuristMode, setCanonPuristMode] = useState(() => localStorage.getItem('op_canon_purist_mode') === 'true');
  const [spoilerShield, setSpoilerShield] = useState(() => localStorage.getItem('op_spoiler_shield') !== 'false');
  const [colorMode, setColorMode] = useState(() => {
    try { const saved = localStorage.getItem('op_color_mode'); return saved === 'light' || saved === 'dark' ? saved : 'system'; } catch { return 'system'; }
  });

  // A fresh start is a fresh start: nothing pre-marked, Up Next is episode 1.
  const [watchedIds, setWatchedIds] = useState(() => new Set(readJSON('op_tracker_watched', [])));
  const [skippedIds, setSkippedIds] = useState(() => new Set(readJSON('op_tracker_skipped', [])));
  const [subProgress, setSubProgress] = useState(() => readJSON('op_tracker_subprogress', {}));
  const [dailyPace, setDailyPace] = useState(3);

  const [activeTab, setActiveTab] = useState('roadmap');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSagas, setExpandedSagas] = useState(() => new Set(SAGAS_DATA.map(s => s.id)));

  const [dialog, setDialog] = useState(null); // settings | about | reset | import | tune | finale
  const [importPlan, setImportPlan] = useState(null);
  const [tuneTarget, setTuneTarget] = useState(null);
  const [preImport, setPreImport] = useState(() => readJSON('op_tracker_pre_import', null));
  const [toast, setToast] = useState(null);
  const [eyecatch, setEyecatch] = useState(null);
  const toastTimer = useRef(null);
  const previousMilestones = useRef(null);
  const quietNews = useRef(false);
  const cardRef = useRef(null);
  const [cardVisible, setCardVisible] = useState(true);

  const theme = THEMES[activeThemeId] || THEMES.classic;

  useEffect(() => { writeKey('op_tracker_theme', activeThemeId); }, [activeThemeId]);
  useEffect(() => { writeKey('op_header_bg_mode', bgMode); }, [bgMode]);
  useEffect(() => { writeKey('op_tracker_watched', JSON.stringify(Array.from(watchedIds))); }, [watchedIds]);
  useEffect(() => { writeKey('op_tracker_skipped', JSON.stringify(Array.from(skippedIds))); }, [skippedIds]);
  useEffect(() => { writeKey('op_tracker_subprogress', JSON.stringify(subProgress)); }, [subProgress]);
  useEffect(() => { writeKey('op_spoiler_shield', String(spoilerShield)); }, [spoilerShield]);
  useEffect(() => { writeKey('op_canon_purist_mode', String(canonPuristMode)); }, [canonPuristMode]);

  // 'system' follows prefers-color-scheme; an explicit choice is remembered.
  useEffect(() => {
    const root = document.documentElement;
    if (colorMode === 'system') root.removeAttribute('data-mode');
    else root.setAttribute('data-mode', colorMode);
    writeKey('op_color_mode', colorMode);
  }, [colorMode]);

  // Keep the PWA status bar in step with whichever mode is actually showing.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      const dark = colorMode === 'dark' || (colorMode === 'system' && query.matches);
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#11100e' : '#f3f2ee');
    };
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, [colorMode]);

  // The field colour lives on the root so dialogs (top layer) and ::selection get it too.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--field', theme.primary);
    root.setProperty('--on-field', onField(theme.primary));
  }, [theme.primary]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // --- toasts with undo -------------------------------------------------------
  const snapshot = () => ({ watched: new Set(watchedIds), skipped: new Set(skippedIds), sub: { ...subProgress } });
  const restore = snap => { setWatchedIds(new Set(snap.watched)); setSkippedIds(new Set(snap.skipped)); setSubProgress({ ...snap.sub }); };

  const notify = (message, undoSnap = null, ms = 6000) => {
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message, undo: undoSnap });
    toastTimer.current = setTimeout(() => setToast(null), ms);
  };
  const undoToast = () => {
    if (!toast?.undo) return;
    const snap = toast.undo;
    if (snap.settings) { setActiveThemeId(snap.settings.theme); setBgMode(snap.settings.bgMode); setCanonPuristMode(snap.settings.purist); }
    quietNews.current = true;
    restore(snap);
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message: 'Undone.', undo: null });
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  // --- derived state ----------------------------------------------------------
  const totalUnits = useMemo(() => ALL_ITEMS.reduce((acc, { item }) => acc + (item.epCount || 0), 0), []);
  const watchedUnits = useMemo(() => ALL_ITEMS.reduce((acc, { item }) => acc + unitsWatchedIn(item, watchedIds, subProgress), 0), [watchedIds, subProgress]);
  const progressPercent = Math.min(100, Math.round((watchedUnits / Math.max(1, totalUnits)) * 100));

  const stats = useMemo(() => {
    const minutes = watchedUnits * MINUTES_PER_UNIT;
    const fillerSkipped = ALL_ITEMS
      .filter(({ item }) => (item.type === 'filler' || item.type === 'recommended_filler') && skippedIds.has(item.id))
      .reduce((sum, { item }) => sum + (item.epCount || 0), 0);
    return {
      units: watchedUnits,
      hours: (minutes / 60).toFixed(1),
      days: (minutes / (60 * 24)).toFixed(1),
      fillerSkippedHours: (fillerSkipped * MINUTES_PER_UNIT / 60).toFixed(1)
    };
  }, [watchedUnits, skippedIds]);

  const bounty = useMemo(() => ALL_ITEMS.reduce((sum, { item }) => {
    const reward = item.bountyReward || 0;
    if (watchedIds.has(item.id)) return sum + reward;
    if (!item.epCount) return sum;
    return sum + Math.round(reward * unitsWatchedIn(item, watchedIds, subProgress) / item.epCount);
  }, 0), [watchedIds, subProgress]);
  const formatBounty = num => new Intl.NumberFormat('en-US').format(num);

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

  const evaluatedAchievements = useMemo(() => ACHIEVEMENTS.map(ach => ({
    ...ach, isUnlocked: ach.check(watchedIds, subProgress, watchedUnits, totalUnits)
  })), [watchedIds, subProgress, watchedUnits, totalUnits]);

  // Crew and milestone news rides along on whatever toast is already showing,
  // so it never knocks an Undo off the screen.
  useEffect(() => {
    const unlocked = evaluatedAchievements.filter(a => a.isUnlocked).map(a => a.id);
    const previous = previousMilestones.current;
    if (previous && !quietNews.current) {
      const newCrew = unlockedCrew.filter(name => !previous.crew.includes(name));
      const newAwards = unlocked.filter(id => !previous.awards.includes(id));
      const parts = [];
      if (newCrew.length) parts.push(`${newCrew.join(', ')} joined the crew.`);
      if (newAwards.length) parts.push(`${newAwards.length} new milestone${newAwards.length === 1 ? '' : 's'} in the logbook.`);
      if (parts.length) {
        const extra = parts.join(' ');
        setToast(t => t ? { ...t, message: `${t.message} ${extra}` } : { id: Date.now(), message: extra, undo: null });
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 7000);
      }
    }
    quietNews.current = false;
    previousMilestones.current = { crew: unlockedCrew, awards: unlocked };
  }, [unlockedCrew, evaluatedAchievements]);

  const upNext = useMemo(() => findNext(watchedIds, skippedIds, subProgress, canonPuristMode), [watchedIds, skippedIds, subProgress, canonPuristMode]);

  // Where a skip would land you, so the card can say so before you press it.
  const afterSkip = useMemo(() => {
    if (!upNext) return null;
    const after = findNext(watchedIds, new Set(skippedIds).add(upNext.item.id), subProgress, canonPuristMode);
    return after ? (after.isEpBased ? `ep ${after.currentEp}, ${after.item.title}` : after.item.title) : 'the end of your queue';
  }, [upNext, watchedIds, skippedIds, subProgress, canonPuristMode]);

  // The end of the queue gets a proper ending, once.
  const hadNext = useRef(Boolean(upNext));
  useEffect(() => {
    if (hadNext.current && !upNext && watchedUnits > 0) setDialog('finale');
    hadNext.current = Boolean(upNext);
  }, [upNext, watchedUnits]);

  const positionEp = positionEpisode(upNext);
  const positionIndex = upNext ? upNext.index : ALL_ITEMS.length;

  const activeBgKey = bgMode !== 'auto' && BACKGROUND_ARTWORKS[bgMode] ? bgMode : upNext?.saga?.id || 'east-blue';
  const cardArt = BACKGROUND_ARTWORKS[activeBgKey];

  const segments = useMemo(() => SAGAS_DATA.map(saga => {
    const eps = saga.items.filter(isEpBased);
    const start = Math.min(...eps.map(i => i.startEp));
    const end = Math.max(...eps.map(i => i.endEp));
    const units = saga.items.reduce((s, i) => s + (i.epCount || 0), 0);
    const done = saga.items.reduce((s, i) => s + unitsWatchedIn(i, watchedIds, subProgress), 0);
    return { id: saga.id, title: saga.title, start, end, span: end - start + 1, done: units ? done / units : 0 };
  }), [watchedIds, subProgress]);

  // The strip at the bottom only appears once the title card has scrolled away.
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setCardVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [upNext === null]);

  // --- actions ----------------------------------------------------------------
  const completeItem = (item, snap, { celebrate }) => {
    setWatchedIds(prev => new Set(prev).add(item.id));
    setSkippedIds(prev => { const n = new Set(prev); n.delete(item.id); return n; });
    setSubProgress(prev => { const n = { ...prev }; delete n[item.id]; return n; });
    if (celebrate && isEpBased(item)) setEyecatch({ id: Date.now(), title: item.title });
    notify(`${item.title} done.`, snap);
  };

  const setEpisode = (item, onEp) => {
    if (!isEpBased(item)) return;
    const snap = snapshot();
    if (onEp > item.endEp) { completeItem(item, snap, { celebrate: upNext?.item.id === item.id }); return; }
    setWatchedIds(prev => { const n = new Set(prev); n.delete(item.id); return n; });
    setSkippedIds(prev => { const n = new Set(prev); n.delete(item.id); return n; });
    setSubProgress(prev => {
      const n = { ...prev };
      if (onEp <= item.startEp) delete n[item.id]; else n[item.id] = onEp;
      return n;
    });
  };

  const advanceUpNext = () => {
    if (!upNext) return;
    const { item, isEpBased: epBased, currentEp, endEp } = upNext;
    const snap = snapshot();
    if (epBased && currentEp < endEp) {
      setSubProgress(prev => ({ ...prev, [item.id]: currentEp + 1 }));
      notify(`Ep ${currentEp} watched.`, snap, 4000);
    } else {
      completeItem(item, snap, { celebrate: true });
    }
  };

  const skipItem = item => {
    const snap = snapshot();
    setSkippedIds(prev => new Set(prev).add(item.id));
    setSubProgress(prev => { const n = { ...prev }; delete n[item.id]; return n; });
    notify(`Skipped ${item.title}. It stays on the roadmap if you change your mind.`, snap);
  };

  const toggleItem = item => {
    const snap = snapshot();
    if (watchedIds.has(item.id)) {
      setWatchedIds(prev => { const n = new Set(prev); n.delete(item.id); return n; });
      notify(`${item.title} marked as not watched.`, snap);
    } else {
      completeItem(item, snap, { celebrate: false });
    }
  };

  const restoreItem = id => {
    const snap = snapshot();
    setSkippedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    notify(`${ALL_ITEMS[ITEM_INDEX[id]].item.title} is back in the queue.`, snap);
  };

  const restoreAllSkipped = () => {
    const snap = snapshot();
    const count = skippedIds.size;
    setSkippedIds(new Set());
    notify(`Put ${count} skipped stop${count === 1 ? '' : 's'} back in the queue.`, snap);
  };

  const markSaga = (saga, watch) => {
    const snap = snapshot();
    setWatchedIds(prev => {
      const next = new Set(prev);
      saga.items.forEach(item => { if (watch) next.add(item.id); else next.delete(item.id); });
      return next;
    });
    setSubProgress(prev => { const next = { ...prev }; saga.items.forEach(item => delete next[item.id]); return next; });
    if (watch) setSkippedIds(prev => { const next = new Set(prev); saga.items.forEach(item => next.delete(item.id)); return next; });
    notify(watch ? `Marked all ${saga.items.length} stops in ${saga.title} as watched.` : `Cleared ${saga.title}.`, snap);
  };

  const revealItem = id => {
    setActiveTab('roadmap');
    setSearchQuery('');
    setFilterType('all');
    const saga = ALL_ITEMS[ITEM_INDEX[id]]?.saga;
    if (saga) setExpandedSagas(prev => new Set(prev).add(saga.id));
    setTimeout(() => {
      const el = document.getElementById(`arc-card-${id}`);
      if (!el) return;
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
      el.focus({ preventScroll: true });
    }, 60);
  };

  const goToSaga = id => {
    setActiveTab('roadmap');
    setSearchQuery('');
    setFilterType('all');
    setExpandedSagas(prev => new Set(prev).add(id));
    setTimeout(() => {
      const target = document.getElementById(`saga-${id}`);
      target?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      target?.focus({ preventScroll: true });
    }, 60);
  };

  const openTab = tab => {
    setActiveTab(tab);
    requestAnimationFrame(() => document.getElementById('sections')?.scrollIntoView({ block: 'start' }));
  };

  // --- set my place -----------------------------------------------------------
  const planTune = (ep, extras) => {
    const containing = ALL_ITEMS.filter(({ item }) => isEpBased(item) && item.startEp <= ep && ep <= item.endEp);
    const target = (containing.find(({ item }) => !isDetourType(item.type)) || containing[0])?.item
      || ALL_ITEMS.find(({ item }) => isEpBased(item) && item.startEp >= ep)?.item;
    if (!target) return null;
    const targetIndex = ITEM_INDEX[target.id];
    const watched = new Set(watchedIds);
    const skipped = new Set(skippedIds);
    const sub = { ...subProgress };
    let story = 0, extrasCount = 0, cleared = 0;
    ALL_ITEMS.forEach(({ item }, i) => {
      if (i < targetIndex) {
        if (!isDetourType(item.type)) { if (!watched.has(item.id)) story++; watched.add(item.id); skipped.delete(item.id); delete sub[item.id]; }
        else if (!watched.has(item.id)) {
          extrasCount++;
          if (extras === 'watched') { watched.add(item.id); skipped.delete(item.id); } else skipped.add(item.id);
          delete sub[item.id];
        }
      } else if (i > targetIndex) {
        if (watched.has(item.id) || sub[item.id] !== undefined) cleared++;
        watched.delete(item.id); delete sub[item.id];
      }
    });
    const onEp = Math.max(target.startEp, Math.min(target.endEp, ep));
    watched.delete(target.id); skipped.delete(target.id);
    if (onEp > target.startEp) sub[target.id] = onEp; else delete sub[target.id];
    return { ep: onEp, target, story, extras: extrasCount, cleared, result: { watched, skipped, sub }, next: findNext(watched, skipped, sub, canonPuristMode) };
  };

  const applyTune = plan => {
    const snap = snapshot();
    restore({ watched: plan.result.watched, skipped: plan.result.skipped, sub: plan.result.sub });
    setDialog(null);
    notify(`You're on ep ${plan.ep}. Everything before it is sorted.`, snap, 10000);
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  };

  // --- backup -----------------------------------------------------------------
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
    const filename = `one_piece_voyage_${new Date().toISOString().slice(0, 10)}.json`;
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    notify(`Backup saved as ${filename}.`);
  };

  const readBackup = e => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      let data;
      try { data = JSON.parse(event.target?.result); } catch {
        setImportPlan({ error: `“${file.name}” isn't a readable backup file. Nothing was changed.` }); setDialog('import'); return;
      }
      const ids = v => Array.isArray(v) ? v.filter(x => typeof x === 'string') : null;
      const watched = ids(data?.watchedIds);
      const skipped = ids(data?.skippedIds);
      const subOk = data?.subProgress && typeof data.subProgress === 'object' && !Array.isArray(data.subProgress);
      if (!watched && !skipped && !subOk) {
        setImportPlan({ error: `“${file.name}” doesn't look like an Eternal Pose backup. It has no watched, skipped or episode progress in it, so nothing was changed.` }); setDialog('import'); return;
      }
      const unknown = [...(watched || []), ...(skipped || [])].filter(id => !KNOWN_IDS.has(id)).length;
      const sub = {};
      if (subOk) Object.entries(data.subProgress).forEach(([id, v]) => { if (KNOWN_IDS.has(id) && Number.isFinite(v)) sub[id] = v; });
      const result = {
        watched: new Set((watched || []).filter(id => KNOWN_IDS.has(id))),
        skipped: new Set((skipped || []).filter(id => KNOWN_IDS.has(id))),
        sub,
        theme: THEMES[data.theme] ? data.theme : null,
        bgMode: typeof data.bgMode === 'string' && (data.bgMode === 'auto' || BACKGROUND_ARTWORKS[data.bgMode]) ? data.bgMode : null,
        pace: Number.isInteger(data.dailyPace) && data.dailyPace >= 1 && data.dailyPace <= 15 ? data.dailyPace : null,
        purist: typeof data.canonPuristMode === 'boolean' ? data.canonPuristMode : null
      };
      const purist = result.purist ?? canonPuristMode;
      setImportPlan({
        file: file.name,
        date: data.exportDate ? new Date(data.exportDate) : null,
        partial: !watched || !skipped || !subOk,
        unknown,
        result,
        backupNext: describeNext(findNext(result.watched, result.skipped, result.sub, purist)),
        backupUnits: ALL_ITEMS.reduce((acc, { item }) => acc + unitsWatchedIn(item, result.watched, result.sub), 0)
      });
      setDialog('import');
    };
    reader.readAsText(file);
  };

  const applyImport = plan => {
    const snap = { ...snapshot(), settings: { theme: activeThemeId, bgMode, purist: canonPuristMode } };
    const saved = { watched: [...snap.watched], skipped: [...snap.skipped], sub: snap.sub, settings: snap.settings, savedAt: new Date().toISOString() };
    writeKey('op_tracker_pre_import', JSON.stringify(saved));
    setPreImport(saved);
    const r = plan.result;
    restore({ watched: r.watched, skipped: r.skipped, sub: r.sub });
    if (r.theme) setActiveThemeId(r.theme);
    if (r.bgMode) setBgMode(r.bgMode);
    if (r.pace) setDailyPace(r.pace);
    if (r.purist !== null) setCanonPuristMode(r.purist);
    setDialog(null);
    notify(`Backup loaded. You're at ${plan.backupNext}.`, snap, 10000);
  };

  const undoLastImport = () => {
    if (!preImport) return;
    const snap = snapshot();
    restore({ watched: new Set(preImport.watched), skipped: new Set(preImport.skipped), sub: preImport.sub });
    if (preImport.settings) { setActiveThemeId(preImport.settings.theme); setBgMode(preImport.settings.bgMode); setCanonPuristMode(preImport.settings.purist); }
    try { localStorage.removeItem('op_tracker_pre_import'); } catch { /* storage unavailable */ }
    setPreImport(null);
    notify('Your progress from before the import is back.', snap);
  };

  const resetAll = () => {
    const snap = snapshot();
    restore({ watched: new Set(), skipped: new Set(), sub: {} });
    setDialog(null);
    notify('Everything reset. Up next is episode 1.', snap, 10000);
  };

  // --- roadmap filtering ----------------------------------------------------
  const filteredSagas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SAGAS_DATA.map(saga => {
      const filteredItems = saga.items.filter(item => {
        if (canonPuristMode && isDetourType(item.type)) return false;
        const matchSearch = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.episodes.toLowerCase().includes(q);
        if (!matchSearch) return false;
        if (filterType === 'canon') return !isDetourType(item.type);
        if (filterType === 'movies') return item.type === 'movie' || item.type === 'special';
        if (filterType === 'must-watch') return item.tier === 'Must Watch' || item.type === 'canon';
        if (filterType === 'filler') return item.type === 'filler' || item.type === 'recommended_filler';
        return true;
      });
      return { ...saga, items: filteredItems };
    }).filter(saga => saga.items.length > 0);
  }, [filterType, searchQuery, canonPuristMode]);

  const pacing = useMemo(() => {
    const remaining = Math.max(0, totalUnits - watchedUnits);
    const days = Math.ceil(remaining / Math.max(1, dailyPace));
    const date = new Date();
    date.setDate(date.getDate() + days);
    return { remaining, days, date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
  }, [totalUnits, watchedUnits, dailyPace]);

  const films = useMemo(() => ALL_ITEMS.map(({ item }, index) => ({ item, index })).filter(({ item }) => item.type === 'movie' || item.type === 'special'), []);
  const filmPlacement = index => {
    for (let i = index - 1; i >= 0; i--) {
      const { item } = ALL_ITEMS[i];
      if (isEpBased(item)) return `After ep ${item.endEp}`;
    }
    return 'Before ep 1';
  };
  const fillerSkippable = useMemo(() => ALL_ITEMS.map(({ item }) => item).filter(item => item.type === 'filler' && item.tier === 'Filler'), []);
  const fillerTieIns = useMemo(() => ALL_ITEMS.map(({ item }) => item).filter(item => item.type === 'filler' && item.tier !== 'Filler'), []);
  const fillerHours = (fillerSkippable.reduce((s, i) => s + i.epCount, 0) * MINUTES_PER_UNIT / 60).toFixed(0);

  const themeLocked = t => {
    if (!spoilerShield) return false;
    if (t.id === 'classic' || t.id === 'luffy') return false;
    if (t.id === 'nika') return !watchedIds.has('arc-47');
    return !unlockedCrew.some(c => c.toLowerCase() === t.id || (t.id === 'robin' && c === 'Nico Robin'));
  };

  const filmCount = films.filter(f => f.item.type === 'movie').length;
  const specialCount = films.length - filmCount;
  const filmsWatched = films.filter(f => watchedIds.has(f.item.id)).length;
  const allExpanded = expandedSagas.size === SAGAS_DATA.length;
  const clearEyecatch = useCallback(() => setEyecatch(null), []);
  const stopCount = filteredSagas.reduce((sum, saga) => sum + saga.items.length, 0);

  return (
    <div className="app">
      <a className="skip-link" href="#sections">Skip to the roadmap</a>
      <Masthead shield={spoilerShield} onShield={() => setSpoilerShield(!spoilerShield)} onSettings={() => setDialog('settings')} />

      <main id="main-content" tabIndex={-1} className="shell stage">
        <TitleCard next={upNext} art={cardArt} afterSkip={afterSkip} skippedCount={skippedIds.size} cardRef={cardRef}
          onAdvance={advanceUpNext} onSkip={() => upNext && skipItem(upNext.item)} onJump={() => upNext && revealItem(upNext.item.id)}
          onRestoreSkipped={restoreAllSkipped} onRoadmap={() => openTab('roadmap')} />
        <BountyStrip bounty={formatBounty(bounty)} onLogbook={() => openTab('logbook')} />
        <VoyageAxis segments={segments} positionEp={positionEp} lastEp={LAST_EP} percent={progressPercent}
          currentSagaId={upNext?.saga.id} onSaga={goToSaga}
          onTune={ep => { setTuneTarget({ ep, extras: 'skip' }); setDialog('tune'); }} />

        <div id="sections" style={{ scrollMarginTop: 12 }}>
          <Tabs active={activeTab} onTab={setActiveTab} />
        </div>

        {activeTab === 'roadmap' && <section className="panel" id="panel-roadmap" role="tabpanel" aria-labelledby="tab-roadmap">
          <div className="panel-head">
            <div><h2>The roadmap</h2><p>Every arc, film and special in the order I'd watch them. Canon runs down the line, detours branch off it.</p></div>
            <select className="select" aria-label="Go to a saga" value="" onChange={e => goToSaga(e.target.value)}>
              <option value="" disabled>Go to a saga…</option>
              {SAGAS_DATA.map(saga => <option key={saga.id} value={saga.id}>{saga.title}</option>)}
            </select>
          </div>
          {canonPuristMode && <div className="notice">Canon Purist is on, so only canon and mostly-canon arcs show.<button className="link-btn" onClick={() => setCanonPuristMode(false)}>Show everything</button></div>}
          <div className="finder">
            <div className="finder-row">
              <div className="search">
                <Search size={18} aria-hidden="true" />
                <input type="search" aria-label="Search arcs, films or episodes" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search an arc, film or episode range" />
              </div>
            </div>
            <div className="chips" role="group" aria-label="Show">
              {[['all', 'Everything'], ['canon', 'Canon'], ['must-watch', 'Must-watch'], ['movies', 'Films & specials'], ['filler', 'Filler']].map(([id, label]) =>
                <button key={id} className="chip" aria-pressed={filterType === id} onClick={() => setFilterType(id)}>{label}</button>)}
            </div>
            <div className="finder-status">
              <span role="status">{stopCount} stops in {filteredSagas.length} sagas{searchQuery && ` matching “${searchQuery}”`}</span>
              <span style={{ display: 'flex', gap: 16 }}>
                {(searchQuery || filterType !== 'all') && <button className="link-btn" onClick={() => { setSearchQuery(''); setFilterType('all'); }}>Clear</button>}
                <button className="link-btn" onClick={() => setExpandedSagas(allExpanded ? new Set() : new Set(SAGAS_DATA.map(s => s.id)))}>{allExpanded ? 'Collapse all' : 'Expand all'}</button>
              </span>
            </div>
          </div>

          {filteredSagas.length === 0 ? <div className="empty">
            <h3>Nothing matches that</h3>
            <p>Try an arc name, a film, or an episode range like “196”.</p>
            <button className="btn" onClick={() => { setSearchQuery(''); setFilterType('all'); }}>Clear the search</button>
          </div> : filteredSagas.map(saga => {
            const fullSaga = SAGAS_DATA.find(s => s.id === saga.id);
            const expanded = expandedSagas.has(saga.id);
            const done = fullSaga.items.filter(i => watchedIds.has(i.id)).length;
            const total = fullSaga.items.length;
            const sagaDone = done === total;
            const here = upNext?.saga.id === saga.id;
            const art = BACKGROUND_ARTWORKS[saga.id];
            return <section key={saga.id} id={`saga-${saga.id}`} tabIndex={-1} className="saga" aria-labelledby={`saga-title-${saga.id}`}>
              <div className="saga-band">
                <Art art={art} />
                {here && <span className="saga-here">You're here</span>}
                <div className="saga-plate">
                  <h2 id={`saga-title-${saga.id}`}>{saga.title}</h2>
                  <p><span className="num">Ep {saga.episodes}</span> · {saga.mangaChapters}</p>
                </div>
              </div>
              <div className="saga-bar">
                <span className="count"><strong className="num">{done}</strong> of <span className="num">{total}</span> stops watched</span>
                <div className="saga-bar-actions">
                  <button className="btn btn-sm" onClick={() => markSaga(fullSaga, !sagaDone)}>{sagaDone ? 'Unmark saga' : 'Mark saga watched'}</button>
                  <button className="btn btn-sm" aria-expanded={expanded} aria-controls={`saga-items-${saga.id}`}
                    onClick={() => setExpandedSagas(prev => { const n = new Set(prev); if (n.has(saga.id)) n.delete(saga.id); else n.add(saga.id); return n; })}>
                    {expanded ? 'Hide stops' : 'Show stops'}<ChevronDown size={16} aria-hidden="true" style={{ transform: expanded ? 'rotate(180deg)' : 'none' }} />
                  </button>
                </div>
              </div>
              {expanded && <>
                <div className="saga-overview">
                  <SpoilerContent hidden={spoilerShield && !sagaDone} label="saga overview"><p style={{ margin: 0 }}>{saga.tagline}</p></SpoilerContent>
                </div>
                <ol className="route" id={`saga-items-${saga.id}`}>
                  {saga.items.map(item => <ArcCard key={item.id} item={item}
                    watched={watchedIds.has(item.id)} skipped={skippedIds.has(item.id)} current={upNext?.item.id === item.id}
                    onEp={watchedIds.has(item.id) ? null : subProgress[item.id] ?? null} shield={spoilerShield}
                    onToggle={toggleItem} onSetEp={setEpisode} onRestore={restoreItem} onSkip={skipItem} />)}
                </ol>
              </>}
            </section>;
          })}
        </section>}

        {activeTab === 'logbook' && <section className="panel" id="panel-logbook" role="tabpanel" aria-labelledby="tab-logbook">
          <div className="panel-head"><div><h2>Logbook</h2><p>The fun bits: your bounty, the crew you've picked up, milestones, and how long this is going to take.</p></div></div>
          <Logbook bounty={formatBounty(bounty)} stats={stats} crew={unlockedCrew} themes={THEMES} onField={onField} shield={spoilerShield}
            themeId={activeThemeId} onTheme={id => { setActiveThemeId(id); notify(`Wearing ${THEMES[id].character}'s colours.`); }}
            achievements={evaluatedAchievements} pace={dailyPace} onPace={setDailyPace} pacing={pacing} />
        </section>}

        {activeTab === 'films' && <section className="panel" id="panel-films" role="tabpanel" aria-labelledby="tab-films">
          <div className="panel-head"><div><h2>Films and specials</h2><p><span className="num">{filmCount}</span> films and <span className="num">{specialCount}</span> specials, each placed where it fits. You've watched <span className="num">{filmsWatched}</span>. What happens in the ones ahead of you stays hidden while the Spoiler Shield is on.</p></div></div>
          <Films films={films} positionIndex={positionIndex} shield={spoilerShield} placement={filmPlacement}
            isWatched={id => watchedIds.has(id)} isSkipped={id => skippedIds.has(id)} onToggle={toggleItem} />
        </section>}

        {activeTab === 'guide' && <section className="panel" id="panel-guide" role="tabpanel" aria-labelledby="tab-guide">
          <div className="panel-head"><div><h2>Watch guide</h2><p>How the tracker works, what's worth keeping, and what you can safely skip.</p></div></div>
          <Guide skippable={fillerSkippable} tieIns={fillerTieIns} fillerHours={fillerHours} onJumpTo={revealItem} />
        </section>}
      </main>

      <footer className="footer">
        <div className="shell">
          <span>Eternal Pose is a free fan project. One Piece belongs to Eiichiro Oda, Shueisha and Toei Animation.</span>
          <nav aria-label="About">
            <button className="link-btn" onClick={() => setDialog('about')}>About</button>
            <a href="https://github.com/EY4O/One-Piece-Voyage-Tracker" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://ko-fi.com/looneth" target="_blank" rel="noopener noreferrer">Ko-fi</a>
          </nav>
        </div>
      </footer>

      <NowStrip next={upNext} visible={!cardVisible && !dialog} onAdvance={advanceUpNext}
        onShow={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} />
      <ToastDock toast={toast} onUndo={undoToast} onDismiss={() => setToast(null)} />
      <Eyecatch event={eyecatch} onDone={clearEyecatch} />

      {dialog === 'settings' && <SettingsDialog onClose={() => setDialog(null)}
        shield={spoilerShield} onShield={setSpoilerShield} purist={canonPuristMode} onPurist={setCanonPuristMode}
        colorMode={colorMode} onColorMode={setColorMode}
        themes={THEMES} themeId={activeThemeId} themeLocked={themeLocked} onTheme={setActiveThemeId}
        artworks={BACKGROUND_ARTWORKS} bgMode={bgMode} onBgMode={setBgMode}
        onExport={exportProgressJSON} onImport={readBackup} preImport={preImport} onUndoImport={undoLastImport}
        skippedCount={skippedIds.size} onRestoreSkipped={restoreAllSkipped} onReset={() => setDialog('reset')}
        onAbout={() => setDialog('about')} />}
      {dialog === 'import' && importPlan && <ImportDialog plan={importPlan} currentNext={describeNext(upNext)} currentUnits={watchedUnits}
        onApply={applyImport} onClose={() => { setDialog(null); setImportPlan(null); }} />}
      {dialog === 'tune' && tuneTarget && <TuneDialog target={tuneTarget} plan={planTune(tuneTarget.ep, tuneTarget.extras)}
        onExtras={extras => setTuneTarget(t => ({ ...t, extras }))} currentNext={describeNext(upNext)}
        onApply={applyTune} onClose={() => setDialog(null)} />}
      {dialog === 'reset' && <ResetDialog units={watchedUnits} onConfirm={resetAll} onClose={() => setDialog(null)} />}
      {dialog === 'about' && <AboutDialog onClose={() => setDialog(null)} />}
      {dialog === 'finale' && <FinaleDialog stats={stats} bounty={formatBounty(bounty)} onClose={() => setDialog(null)} />}

      <InstallPromptBanner />
    </div>
  );
}

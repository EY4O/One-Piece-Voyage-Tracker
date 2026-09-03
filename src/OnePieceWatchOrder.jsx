import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Compass,
  Film,
  Tv,
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
  Camera,
  Layers,
  Plus,
  Minus,
  FastForward,
  BookmarkCheck,
  PlayCircle,
  ArrowRight
} from 'lucide-react';

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

const EPISODE_TITLES = {
  1: "I'm Luffy! The Man Who Will Become the Pirate King!",
  2: "Great Swordsman Appears! Pirate Hunter Roronoa Zoro",
  3: "Morgan vs. Luffy! Who's This Beautiful Young Girl?",
  4: "Luffy's Past! Red-Haired Shanks Appears",
  8: "Who is the Victor? Devil Fruit Power Showdown!",
  19: "Past of the Three Swords! Promise Between Zoro and Kuina",
  24: "Hawk-Eye Mihawk! Swordsman Zoro Falls at Sea",
  31: "The Worst Man of the East Blue! Arlong the Fishman",
  37: "Luffy Stands Up! End of a Broken Promise",
  44: "Setting Sail with a Smile! Farewell Cocoyasi Village",
  48: "The Town of Beginning and End: Arrival at Loguetown",
  53: "The Legend has Begun! Head for the Grand Line",
  62: "The First Obstacle? Giant Whale Laboon Appears",
  65: "Exploding Santoryu! Zoro vs. Baroque Works",
  78: "Nami is Sick? Beyond the Snow That Falls on the Ocean!",
  86: "Hiriluk's Cherry Blossoms and Inherited Will!",
  91: "Farewell Drum Island! I'm Going Out to Sea!",
  92: "The Hero of Arabasta and the Ballerina on Shipboard",
  110: "Merciless Death Match! Luffy vs. Crocodile",
  126: "I Will Surpass You! Rain Falls on Arabasta!",
  130: "Scent of Danger! The Seventh Member is Nico Robin!",
  147: "Distinguished Pirates! A Man Who Talks of Dreams and Undersea Search",
  151: "100 Million Man! World's Greatest Power and Pirate Blackbeard",
  153: "Sail into the Sky Ocean! Farewell to the Blue Sea",
  182: "At Last They Clash! Pirate Luffy vs. God Enel!",
  195: "Off to the Blue Sea!! A Heartfelt Finale",
  196: "A State of Emergency Issued! A Notorious Pirate Ship Infiltrates!",
  206: "So Long, Marine Base! The Final Escape",
  227: "Marine High Admiral Aokiji! The Threat of the Greatest Power",
  236: "Luffy vs. Usopp! Collision of Two Men's Pride!",
  278: "Say You Want to Live! We Are Friends!!",
  309: "Fists Full of Emotion! Luffy Unleashes Gatling with All His Might",
  312: "Thank You, Merry! Snow Falls on the Parting Sea",
  313: "Disturbed Peace! Vice Admiral Garp and His Fist of Love",
  325: "The Most Heinous Ability! Blackbeard's Darkness Attacks Ace",
  377: "My Crewmates' Pain is My Pain: Zoro Fights Prepared to Die",
  380: "Binks' Sake: The Song that Connects the Past and Present",
  381: "A New Crewmate! The Musician 'Humming' Brook",
  405: "Disappearing Crew: The Final Day of the Straw Hat Crew",
  416: "Rescuing Ace! The New Destination is the Great Prison",
  451: "Come, Miracle! The Gates of Justice Open",
  483: "Looking for the Answer: Fire Fist Ace Dies on the Battlefield",
  485: "Settling the Score: Whitebeard vs. The Blackbeard Pirates",
  505: "I Want to See Them! Luffy's Tearful Plea",
  516: "Luffy's Training Begins: To the Place We Promised in 2 Years",
  517: "The Beginning of the New Chapter: The Straw Hats Reunited!",
  522: "Everyone Assembled! Luffy Sets Sail for the New World",
  567: "Stop, Noah! Desperate Elephant Gatling!",
  574: "To the New World! Heading for the Ultimate Sea",
  579: "Landing! Burning Island, Punk Hazard",
  580: "A Battle in the Heat! Luffy vs. The Giant Dragon!",
  581: "The Crew is Confused! The Shocking Severed Samurai Head!",
  625: "Tense! Aokiji vs. Doflamingo",
  629: "Violent Commotion! Big News Shakes the New World",
  663: "Luffy Astonished: The Man Who Inherits Ace's Will",
  706: "Go, Law! A Kind Man's Final Battle!",
  726: "Fourth Gear! The Phenomenal Boundman!",
  733: "Strike on the Heavens! Luffy's King Kong Gun of Rage",
  746: "The Clash of the Strongest! The Mad Ruffians of the New World",
  751: "Curtain Falls on a New Adventure! Arrival at Phantom Island Zou",
  777: "To the Reverie! Princess Vivi and Princess Shirahoshi",
  808: "A Heartbreaking Duel: Luffy vs. Sanji (Part 2)",
  870: "A Fist of Divine Speed! Another Gear Fourth Activated!",
  877: "The Parting Request: Pudding's Secret Wish",
  878: "The World in Shock: The Fifth Emperor of the Sea Emerges!",
  890: "Marco! The Keeper of Whitebeard's Last Memento",
  892: "Wano Country! To the Land of Samurais Where Cherry Blossoms Flutter",
  914: "Finally Clashing! The Ferocious Emperor Kaido vs. Luffy!",
  957: "Big News! An Incident That Will Affect the Seven Warlords",
  968: "The Pirate King is Born! Arriving at the Last Island!",
  1000: "Overwhelming Strength! The Straw Hats Come Together!",
  1015: "Straw Hat Luffy! The Man Who Will Become the Pirate King!",
  1061: "The Strike of an Ifrit! Sanji vs. Queen",
  1062: "The Three-Sword Style of the Supreme King! Zoro vs. King",
  1071: "Luffy's Peak – Attained! GEAR 5",
  1072: "The Ridiculous Power! GEAR 5 in Full Play",
  1085: "The Last Curtain! Luffy and Momonosuke's Vow",
  1086: "A New Emperor! Buggy the Genius Jester!",
  1089: "Entering a New Chapter! Luffy and Sabo's Paths!",
  1100: "Powers on a Different Level! Luffy vs. Lucci!"
};

const SAGAS_DATA = [
  {
    id: 'east-blue',
    title: 'East Blue Saga',
    tagline: 'The Romance Dawn and Gathering of the First Straw Hats',
    episodes: '1 – 61',
    mangaChapters: 'Chapters 1 – 100',
    crewJoined: ['Luffy', 'Zoro', 'Usopp', 'Sanji', 'Nami'],
    items: [
      {
        id: 'arc-1',
        title: 'Romance Dawn Arc',
        type: 'canon',
        episodes: '1 – 3',
        startEp: 1,
        endEp: 3,
        epCount: 3,
        chapters: 'Ch 1 – 7',
        onePace: '1 ep (39 min)',
        bountyReward: 1000000,
        description: 'Luffy sets sail, meets Koby, and recruits "Pirate Hunter" Roronoa Zoro from Marine Captain Morgan.',
        highlights: 'Luffy meets Zoro, Gum-Gum Devil Fruit backstory with Red-Haired Shanks.',
        tier: 'Core'
      },
      {
        id: 'arc-2',
        title: 'Orange Town Arc',
        type: 'canon',
        episodes: '4 – 8',
        startEp: 4,
        endEp: 8,
        epCount: 5,
        chapters: 'Ch 8 – 21',
        onePace: '3 eps (1 hr 15m)',
        bountyReward: 2000000,
        description: 'Encounter with Buggy the Clown. Introduces Nami as a cunning pirate thief.',
        highlights: 'Chouchou the loyal dog, Luffy vs. Buggy.',
        tier: 'Core'
      },
      {
        id: 'ova-1',
        title: 'Defeat Him! The Pirate Ganzack! (OVA)',
        type: 'special',
        episodes: 'OVA (1998)',
        epCount: 1,
        bountyReward: 500000,
        description: 'First animated adaptation ever produced by Production I.G before the Toei anime series.',
        watchTip: 'Optional vintage novelty. Watch right after Orange Town.',
        tier: 'Optional'
      },
      {
        id: 'arc-3',
        title: 'Syrup Village Arc',
        type: 'canon',
        episodes: '9 – 18',
        startEp: 9,
        endEp: 18,
        epCount: 10,
        chapters: 'Ch 22 – 41',
        onePace: '4 eps (1 hr 45m)',
        bountyReward: 5000000,
        description: 'Straw Hats defend Lady Kaya from traitorous Captain Kuro. Usopp joins and they acquire the Going Merry.',
        highlights: 'Usopp joins the crew, Going Merry gifted.',
        tier: 'Core'
      },
      {
        id: 'mov-1',
        title: 'Movie 1: One Piece: The Movie (2000)',
        type: 'movie',
        episodes: 'Movie (50 min)',
        epCount: 2,
        bountyReward: 1000000,
        description: 'The original film. The crew hunts for the lost treasure of the legendary pirate Woonan.',
        watchTip: 'Best watched right after Episode 18 before meeting Sanji.',
        tier: 'Classic'
      },
      {
        id: 'arc-4',
        title: 'Baratie Arc',
        type: 'canon',
        episodes: '19 – 30',
        startEp: 19,
        endEp: 30,
        epCount: 12,
        chapters: 'Ch 42 – 68',
        onePace: '6 eps (2 hr 40m)',
        bountyReward: 15000000,
        description: 'Ocean-going restaurant attacked by Don Krieg. Zoro duels Mihawk. Sanji joins as chef.',
        highlights: 'Sanji joins, Mihawk vs Zoro, Baratie restaurant defense.',
        tier: 'Core'
      },
      {
        id: 'arc-5',
        title: 'Arlong Park Arc',
        type: 'canon',
        episodes: '31 – 44',
        startEp: 31,
        endEp: 44,
        epCount: 14,
        chapters: 'Ch 69 – 95',
        onePace: '7 eps (3 hr 10m)',
        bountyReward: 30000000,
        description: 'The emotional peak of East Blue. Straw Hats confront Arlong to liberate Nami and Cocoyasi Village.',
        highlights: 'Iconic "Luffy, help me" scene, walk to Arlong Park, Nami officially joins with 30,000,000 Bounty!',
        tier: 'Core'
      },
      {
        id: 'arc-6',
        title: 'Loguetown Arc',
        type: 'canon',
        episodes: '45, 48 – 53',
        startEp: 45,
        endEp: 53,
        epCount: 7,
        chapters: 'Ch 96 – 100',
        onePace: '3 eps (1 hr 15m)',
        bountyReward: 5000000,
        description: 'The city of beginning and end where Gol D. Roger was executed. Smoker and Tashigi debut.',
        highlights: 'Luffy execution platform smile, Dragon debut in storm.',
        tier: 'Core'
      },
      {
        id: 'mov-2',
        title: 'Movie 2: Clockwork Island Adventure (2001)',
        type: 'movie',
        episodes: 'Movie (55 min)',
        epCount: 2,
        bountyReward: 1000000,
        description: 'Going Merry is stolen by the Trump Pirates! Crew journeys to Clockwork Island.',
        watchTip: 'Watch after Episode 53 before heading up Reverse Mountain.',
        tier: 'Classic'
      },
      {
        id: 'arc-7',
        title: 'Warship Island Arc',
        type: 'filler',
        episodes: '54 – 61',
        startEp: 54,
        endEp: 61,
        epCount: 8,
        chapters: 'Anime Original',
        onePace: 'Skipped',
        bountyReward: 0,
        description: 'Apis and Millennium Dragon filler adventure. Easy to skip.',
        watchTip: 'Filler. Skip straight to Episode 62 for Grand Line entrance.',
        tier: 'Filler'
      }
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
      {
        id: 'arc-8',
        title: 'Reverse Mountain & Whisky Peak',
        type: 'canon',
        episodes: '62 – 67',
        startEp: 62,
        endEp: 67,
        epCount: 6,
        chapters: 'Ch 101 – 114',
        onePace: '4 eps (1 hr 45m)',
        bountyReward: 5000000,
        description: 'Reverse mountain river into Grand Line, meeting Laboon, uncovering Baroque Works at Whisky Peak.',
        highlights: 'Laboon promise, Princess Vivi reveal, Zoro vs 100 bounty hunters.',
        tier: 'Core'
      },
      {
        id: 'arc-9',
        title: 'Little Garden Arc',
        type: 'canon',
        episodes: '70 – 77',
        startEp: 70,
        endEp: 77,
        epCount: 8,
        chapters: 'Ch 115 – 129',
        onePace: '5 eps (2 hr 10m)',
        bountyReward: 8000000,
        description: 'Prehistoric island with battling giants Dorry & Brogy and Baroque Works agents Mr. 3 & Goldenweek.',
        highlights: 'Giant warriors honor, Usopp discovers warrior dream.',
        tier: 'Core'
      },
      {
        id: 'arc-10',
        title: 'Drum Island Arc',
        type: 'canon',
        episodes: '78 – 91',
        startEp: 78,
        endEp: 91,
        epCount: 14,
        chapters: 'Ch 130 – 154',
        onePace: '7 eps (3 hr 00m)',
        bountyReward: 15000000,
        description: 'Winter kingdom ruled by tyrant Wapol. Tony Tony Chopper’s heartbreaking backstory with Dr. Hiriluk.',
        highlights: 'Chopper joins, Dr. Hiriluk cherry blossom speech, Blackbeard named.',
        tier: 'Core'
      },
      {
        id: 'mov-3',
        title: 'Movie 3: Chopper’s Kingdom on Strange Island (2002)',
        type: 'movie',
        episodes: 'Movie (56 min)',
        epCount: 2,
        bountyReward: 1000000,
        description: 'Chopper is accidentally crowned animal king of Crown Island.',
        watchTip: 'Watch right after Drum Island (Episode 91).',
        tier: 'Classic'
      },
      {
        id: 'arc-11',
        title: 'Alabasta Arc',
        type: 'canon',
        episodes: '92 – 130',
        startEp: 92,
        endEp: 130,
        epCount: 39,
        chapters: 'Ch 155 – 217',
        onePace: '15 eps (7 hr 30m)',
        bountyReward: 70000000,
        description: 'Desert civil war by Warlord Crocodile. Epic high-stakes showdown alongside Princess Vivi and Portgas D. Ace.',
        highlights: 'Luffy vs Crocodile 1-3, Zoro cuts steel vs Mr. 1, Nico Robin joins, 100,000,000 Bounty!',
        tier: 'Core'
      },
      {
        id: 'arc-12',
        title: 'Post-Alabasta Filler Episodes',
        type: 'filler',
        episodes: '131 – 135',
        startEp: 131,
        endEp: 135,
        epCount: 5,
        chapters: 'Anime Original',
        onePace: 'Skipped',
        bountyReward: 0,
        description: 'Standalone character focus episodes exploring crew memories on the calm ocean.',
        watchTip: 'Filler. Charming character moments, but skippable.',
        tier: 'Filler'
      }
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
      {
        id: 'arc-13',
        title: 'Goat Island & Ruluka Island Arcs',
        type: 'filler',
        episodes: '136 – 143',
        startEp: 136,
        endEp: 143,
        epCount: 8,
        chapters: 'Anime Original',
        onePace: 'Skipped',
        bountyReward: 0,
        description: 'Filler arcs with Zenny goats and Rainbow Mist dimension.',
        watchTip: 'Filler. Can be completely skipped.',
        tier: 'Filler'
      },
      {
        id: 'mov-4',
        title: 'Movie 4: Dead End Adventure (2003)',
        type: 'movie',
        episodes: 'Movie (95 min)',
        epCount: 4,
        bountyReward: 5000000,
        description: 'The Straw Hats join an underground pirate regatta race (Dead End Competition).',
        watchTip: '⭐ Highly Recommended! First full-length cinema film. Watch between Ep 138-143.',
        tier: 'Must Watch'
      },
      {
        id: 'mov-5',
        title: 'Movie 5: The Cursed Holy Sword (2004)',
        type: 'movie',
        episodes: 'Movie (95 min)',
        epCount: 4,
        bountyReward: 2000000,
        description: 'Zoro-centric film dealing with childhood friend Saga and Seven Stars cursed sword.',
        watchTip: 'Skippable movie. Watch after Episode 143 if you love Zoro.',
        tier: 'Classic'
      },
      {
        id: 'arc-14',
        title: 'Jaya Arc',
        type: 'canon',
        episodes: '144 – 152',
        startEp: 144,
        endEp: 152,
        epCount: 9,
        chapters: 'Ch 218 – 236',
        onePace: '5 eps (2 hr 10m)',
        bountyReward: 10000000,
        description: 'Mock Town lawless pirate haven. Luffy encounters Bellamy and crosses paths with Marshall D. Teach.',
        highlights: 'Blackbeard "People\'s dreams never end" speech, Luffy one-punching Bellamy, Knock Up Stream.',
        tier: 'Core'
      },
      {
        id: 'arc-15',
        title: 'Skypiea Arc',
        type: 'canon',
        episodes: '153 – 195',
        startEp: 153,
        endEp: 195,
        epCount: 43,
        chapters: 'Ch 237 – 302',
        onePace: '24 eps (10 hr 30m)',
        bountyReward: 50000000,
        description: 'White sea clouds 10,000 meters high. Survival game against lightning "God" Enel in Shandora.',
        highlights: 'Mont Blanc Noland flashback, Luffy ringing the Golden Bell, Mantra/Haki intro.',
        tier: 'Core'
      },
      {
        id: 'arc-16',
        title: 'G-8 Arc (Navarone Marine Base)',
        type: 'recommended_filler',
        episodes: '196 – 206',
        startEp: 196,
        endEp: 206,
        epCount: 11,
        chapters: 'Anime Original (Elite)',
        onePace: 'Retained by Fans',
        bountyReward: 10000000,
        description: 'Falling into Vice Admiral Jonathan’s Marine base. Widely acclaimed as the greatest anime filler ever made.',
        watchTip: '🔥 MUST WATCH FILLER! Hilarious Straw Hat infiltration, Condoriano gag, and tactical Marine commander.',
        tier: 'Must Watch'
      }
    ]
  },
  {
    id: 'water-7',
    title: 'Water 7 & Enies Lobby Saga',
    tagline: 'CP9 Conspiracy, Robin’s Past, Gear 2nd, and the Fall of the World Government Fortress',
    episodes: '207 – 325',
    mangaChapters: 'Chapters 303 – 441',
    crewJoined: ['Franky'],
    items: [
      {
        id: 'mov-6',
        title: 'Movie 6: Baron Omatsuri & Secret Island (2005)',
        type: 'movie',
        episodes: 'Movie (91 min)',
        epCount: 4,
        bountyReward: 8000000,
        description: 'Directed by Mamoru Hosoda (*Summer Wars*). A dark, psychological masterpiece about crew isolation.',
        watchTip: '⭐ MASTERPIECE FILM! Watch before Water 7 or around Episode 224.',
        tier: 'Must Watch'
      },
      {
        id: 'arc-17',
        title: 'Long Ring Long Land Arc (Davy Back Fight)',
        type: 'mixed',
        episodes: '207 – 219',
        startEp: 207,
        endEp: 219,
        epCount: 13,
        chapters: 'Ch 303 – 321',
        onePace: '5 eps (2 hr 10m)',
        bountyReward: 5000000,
        description: 'Pirate sports tournament against Foxy, concluding with chilling arrival of Marine Admiral Aokiji (Kuzan).',
        highlights: 'Afro Luffy, Admiral Aokiji demonstrates terrifying Logia ice power.',
        tier: 'Core'
      },
      {
        id: 'arc-18',
        title: 'Ocean’s Dream & Foxy’s Return',
        type: 'filler',
        episodes: '220 – 226',
        startEp: 220,
        endEp: 226,
        epCount: 7,
        chapters: 'Anime Original',
        onePace: 'Skipped',
        bountyReward: 0,
        description: 'Filler episodes where the crew loses memories, followed by Foxy returning.',
        watchTip: 'Filler. Skip directly to Episode 227 for Water 7.',
        tier: 'Filler'
      },
      {
        id: 'mov-7',
        title: 'Movie 7: Mechanical Soldier of Karakuri (2006)',
        type: 'movie',
        episodes: 'Movie (94 min)',
        epCount: 4,
        bountyReward: 3000000,
        description: 'Mecha-puzzle adventure on Mecha Island. Foreshadows Gear Second.',
        watchTip: 'Watch right before Episode 227.',
        tier: 'Classic'
      },
      {
        id: 'arc-19',
        title: 'Water 7 Arc',
        type: 'canon',
        episodes: '227 – 263',
        startEp: 227,
        endEp: 263,
        epCount: 37,
        chapters: 'Ch 322 – 374',
        onePace: '20 eps (9 hr 10m)',
        bountyReward: 40000000,
        description: 'City of water and shipwrights. Merry declared unfixable, Usopp clashes with Luffy, CP9 captures Nico Robin.',
        highlights: 'Luffy vs Usopp, Franky Family feud, CP9 undercover reveal, Aqua Laguna sea train.',
        tier: 'Core'
      },
      {
        id: 'arc-20',
        title: 'Enies Lobby Arc',
        type: 'canon',
        episodes: '264 – 312',
        startEp: 264,
        endEp: 312,
        epCount: 49,
        chapters: 'Ch 375 – 430',
        onePace: '26 eps (12 hr 00m)',
        bountyReward: 200000000,
        description: 'Straw Hats declare war on the world to save Nico Robin. Peak shonen fights and emotional payoffs.',
        highlights: 'Luffy Gear 2nd & 3rd, "I Want To Live!", Zoro Asura, Sanji Diable Jambe, Luffy vs Lucci, Going Merry farewell. 300M Bounty!',
        tier: 'Core'
      },
      {
        id: 'arc-21',
        title: 'Post-Enies Lobby Arc',
        type: 'canon',
        episodes: '313 – 325',
        startEp: 313,
        endEp: 325,
        epCount: 13,
        chapters: 'Ch 431 – 441',
        onePace: '6 eps (2 hr 40m)',
        bountyReward: 20000000,
        description: 'Garp reveals Luffy’s family lineage. Franky builds Thousand Sunny and joins. Ace vs Blackbeard duel.',
        highlights: 'Dragon revealed, Franky joins, Thousand Sunny debut, Ace vs. Blackbeard at Banaro Island.',
        tier: 'Core'
      }
    ]
  },
  {
    id: 'thriller-bark',
    title: 'Thriller Bark Saga',
    tagline: 'Haunted Pirate Ship Island, Warlord Moria, and the Musician Skeleton',
    episodes: '326 – 384',
    mangaChapters: 'Chapters 442 – 489',
    crewJoined: ['Brook'],
    items: [
      {
        id: 'arc-22',
        title: 'Ice Hunter Arc',
        type: 'filler',
        episodes: '326 – 335',
        startEp: 326,
        endEp: 335,
        epCount: 10,
        chapters: 'Anime Original',
        onePace: 'Skipped',
        bountyReward: 0,
        description: 'Accino Family bounty hunters steal the Straw Hats\' pirate flag in an icy sea.',
        watchTip: 'Filler. Skip directly to Episode 337.',
        tier: 'Filler'
      },
      {
        id: 'arc-23',
        title: 'Thriller Bark Arc',
        type: 'canon',
        episodes: '337 – 381',
        startEp: 337,
        endEp: 381,
        epCount: 45,
        chapters: 'Ch 442 – 489',
        onePace: '23 eps (10 hr 30m)',
        bountyReward: 60000000,
        description: 'Trapped in Florian Triangle on Gecko Moria’s ghost island. Battles against zombies and Oars.',
        highlights: 'Brook’s Binks\' Sake backstory, Nightmare Luffy, Zoro "Nothing Happened" sacrifice with Bartholomew Kuma.',
        tier: 'Core'
      },
      {
        id: 'arc-24',
        title: 'Spa Island & Romance Dawn Story',
        type: 'filler',
        episodes: '382 – 384',
        startEp: 382,
        endEp: 384,
        epCount: 3,
        chapters: 'Anime Original',
        onePace: 'Skipped',
        bountyReward: 0,
        description: 'Filler vacation arc with Foxy cameos and Romance Dawn Story special.',
        watchTip: 'Filler. Proceed to Episode 385 (Sabaody).',
        tier: 'Filler'
      }
    ]
  },
  {
    id: 'summit-war',
    title: 'Summit War / Marineford Saga',
    tagline: 'Worst Generation, Straw Hat Separation, Impel Down Breakout, and the Paramount War',
    episodes: '385 – 516',
    mangaChapters: 'Chapters 490 – 597',
    crewJoined: [],
    items: [
      {
        id: 'arc-25',
        title: 'Sabaody Archipelago Arc',
        type: 'canon',
        episodes: '385 – 405',
        startEp: 385,
        endEp: 405,
        epCount: 21,
        chapters: 'Ch 490 – 513',
        onePace: '11 eps (5 hr 15m)',
        bountyReward: 50000000,
        description: '11 Supernovas converge. Luffy punches a Celestial Dragon, prompting Kizaru and Kuma to dismantle the crew.',
        highlights: 'Silvers Rayleigh introduction, Luffy punches Saint Charlos, tragic separation of the Straw Hats.',
        tier: 'Core'
      },
      {
        id: 'arc-26',
        title: 'Amazon Lily Arc',
        type: 'canon',
        episodes: '408 – 421',
        startEp: 408,
        endEp: 421,
        epCount: 14,
        chapters: 'Ch 514 – 524',
        onePace: '6 eps (2 hr 45m)',
        bountyReward: 20000000,
        description: 'Luffy lands on women-only island ruled by Boa Hancock. Learns of Ace’s execution at Marineford.',
        highlights: 'Boa Hancock backstory, Conqueror\'s Haki, Luffy discovers Ace is captured.',
        tier: 'Core'
      },
      {
        id: 'arc-27',
        title: 'Little East Blue Arc (Film Tie-in)',
        type: 'filler',
        episodes: '426 – 429',
        startEp: 426,
        endEp: 429,
        epCount: 4,
        chapters: 'Film Tie-in',
        onePace: 'Skipped',
        bountyReward: 2000000,
        description: 'Prologue tie-in episodes establishing Shiki the Golden Lion’s floating islands.',
        watchTip: 'Watch right before Strong World Movie 10!',
        tier: 'Recommended'
      },
      {
        id: 'mov-10',
        title: 'Movie 10: Film: Strong World (2009) & Ep 0',
        type: 'movie',
        episodes: 'Movie (115 min) + Ep 0',
        epCount: 5,
        bountyReward: 15000000,
        description: 'Written and supervised by Eiichiro Oda! The Straw Hats battle legendary pirate Shiki in black suits.',
        watchTip: '⭐ MUST WATCH! Watch Episode 0 (OVA) first, then Strong World.',
        tier: 'Must Watch'
      },
      {
        id: 'mov-11',
        title: 'Movie 11: Straw Hat Chase 3D (2011)',
        type: 'movie',
        episodes: 'Short (30 min)',
        epCount: 1,
        bountyReward: 1000000,
        description: 'Fast-paced, fully 3D CGI chase to recover Luffy’s Straw Hat from a giant bird.',
        watchTip: 'Watch after Strong World.',
        tier: 'Classic'
      },
      {
        id: 'arc-28',
        title: 'Impel Down Arc',
        type: 'canon',
        episodes: '422 – 425, 430 – 456',
        startEp: 422,
        endEp: 456,
        epCount: 31,
        chapters: 'Ch 525 – 549',
        onePace: '16 eps (7 hr 40m)',
        bountyReward: 80000000,
        description: 'Luffy infiltrates maximum-security underwater prison. Alliances with Buggy, Mr. 3, Bon Clay, Crocodile, and Jinbe.',
        highlights: 'Warden Magellan poison horror, Emporio Ivankov & Okamas, Bon Clay’s heroic sacrifice.',
        tier: 'Core'
      },
      {
        id: 'arc-29',
        title: 'Marineford Arc (The Paramount War)',
        type: 'canon',
        episodes: '457 – 489',
        startEp: 457,
        endEp: 489,
        epCount: 33,
        chapters: 'Ch 550 – 580',
        onePace: '16 eps (7 hr 30m)',
        bountyReward: 100000000,
        description: 'Whitebeard Pirates and Luffy storm Marine HQ to rescue Ace against three Admirals, Warlords, and Fleet Admiral Sengoku.',
        highlights: 'Whitebeard "The One Piece is real!", Ace & Luffy brotherhood, Blackbeard steals Gura Gura power, Shanks ends the war. 400M Bounty!',
        tier: 'Core'
      },
      {
        id: 'arc-30',
        title: 'Post-War Arc & ASL Flashback',
        type: 'canon',
        episodes: '490 – 516',
        startEp: 490,
        endEp: 516,
        epCount: 27,
        chapters: 'Ch 581 – 597',
        onePace: '10 eps (4 hr 45m)',
        bountyReward: 30000000,
        description: 'Luffy’s childhood flashback with Ace and Sabo. Rayleigh trains Luffy and "3D2Y" message is dispatched.',
        highlights: 'Ace, Sabo, Luffy sake cup oath, Jinbe snaps Luffy out of despair, Rayleigh Haki training begins.',
        tier: 'Core'
      },
      {
        id: 'sp-3d2y',
        title: 'Special: 3D2Y (Overcoming Ace’s Death!) (2014)',
        type: 'special',
        episodes: 'TV Special (107 min)',
        epCount: 4,
        bountyReward: 10000000,
        description: 'Covers the 2-year timeskip training period on Rusukaina Island with Byrnndi World and Boa Hancock.',
        watchTip: '⭐ Great bridge special! Watch right after Episode 516.',
        tier: 'Must Watch'
      }
    ]
  },
  {
    id: 'fishman-island',
    title: 'Fish-Man Island Saga (Post-Timeskip)',
    tagline: 'Reunion at Sabaody 2 Years Later and Voyage to the 10,000m Deep Ocean Realm',
    episodes: '517 – 574',
    mangaChapters: 'Chapters 598 – 653',
    crewJoined: [],
    items: [
      {
        id: 'arc-31',
        title: 'Return to Sabaody Arc',
        type: 'canon',
        episodes: '517 – 522',
        startEp: 517,
        endEp: 522,
        epCount: 6,
        chapters: 'Ch 598 – 602',
        onePace: '3 eps (1 hr 20m)',
        bountyReward: 10000000,
        description: 'Straw Hats reunite after 2 years of training, flexing monstrous new powers against Pacifistas.',
        highlights: 'New designs, Luffy one-shots Pacifista with Haki, Zoro cuts galleon in half.',
        tier: 'Core'
      },
      {
        id: 'arc-32',
        title: 'Fish-Man Island Arc',
        type: 'canon',
        episodes: '523 – 574',
        startEp: 523,
        endEp: 574,
        epCount: 52,
        chapters: 'Ch 603 – 653',
        onePace: '24 eps (11 hr 00m)',
        bountyReward: 40000000,
        description: 'Submerging 10,000 meters into Ryugu Kingdom. Confronting Hordy Jones and unravelling Otohime & Fisher Tiger’s history.',
        highlights: 'Luffy 50,000 Conqueror knockout, Poseidon reveal, Joy Boy lore, Big Mom tea party challenge.',
        tier: 'Core'
      }
    ]
  },
  {
    id: 'dressrosa-saga',
    title: 'Dressrosa Saga',
    tagline: 'Pirate Alliance with Trafalgar Law, SMILE Factories, and the Fall of Doflamingo',
    episodes: '575 – 746',
    mangaChapters: 'Chapters 654 – 801',
    crewJoined: ['Grand Fleet Formed'],
    items: [
      {
        id: 'arc-33',
        title: 'Z’s Ambition Arc (Film Tie-in)',
        type: 'filler',
        episodes: '575 – 578',
        startEp: 575,
        endEp: 578,
        epCount: 4,
        chapters: 'Film Tie-in',
        onePace: 'Skipped',
        bountyReward: 2000000,
        description: 'Anime filler establishing the Neo Navy threat right before Film Z.',
        watchTip: 'Watch right before Film: Z!',
        tier: 'Recommended'
      },
      {
        id: 'mov-12',
        title: 'Movie 12: One Piece Film: Z (2012)',
        type: 'movie',
        episodes: 'Movie (108 min)',
        epCount: 5,
        bountyReward: 20000000,
        description: 'Former Marine Admiral Zephyr (Z) plans to destroy the New World with Dyna Stones. Masterful music and brutal fistfights.',
        watchTip: '⭐ MASTERPIECE FILM! Considered the finest One Piece movie. Watch after Episode 578.',
        tier: 'Must Watch'
      },
      {
        id: 'arc-34',
        title: 'Punk Hazard Arc',
        type: 'canon',
        episodes: '579 – 625',
        startEp: 579,
        endEp: 625,
        epCount: 47,
        chapters: 'Ch 654 – 699',
        onePace: '22 eps (10 hr 15m)',
        bountyReward: 60000000,
        description: 'Half-ice, half-magma island. Luffy and Law forge pirate alliance, kidnap Caesar Clown, and rescue Kin’emon.',
        highlights: 'Law & Luffy Pirate Alliance, Zoro cuts Monet without Haki, Caesar defeated, Doflamingo setup.',
        tier: 'Core'
      },
      {
        id: 'arc-35',
        title: 'Caesar Retrieval Arc',
        type: 'filler',
        episodes: '626 – 628',
        startEp: 626,
        endEp: 628,
        epCount: 3,
        chapters: 'Anime Original',
        onePace: 'Skipped',
        bountyReward: 0,
        description: 'Short filler arc where Breed kidnaps Caesar with Peto Peto powers.',
        watchTip: 'Filler. Skip straight to Episode 629.',
        tier: 'Filler'
      },
      {
        id: 'arc-36',
        title: 'Dressrosa Arc',
        type: 'canon',
        episodes: '629 – 746',
        startEp: 629,
        endEp: 746,
        epCount: 118,
        chapters: 'Ch 700 – 801',
        onePace: '48 eps (23 hr 30m)',
        bountyReward: 200000000,
        description: 'Corrida Colosseum battle for Ace’s Flame-Flame Fruit, Doflamingo’s Birdcage, Law’s past with Corazon, and Gear 4th.',
        highlights: 'Sabo inherits Mera Mera no Mi, Corazon backstory, Luffy Gear 4th: Boundman, 5,600 member Grand Fleet founded. 500M Bounty!',
        tier: 'Core'
      },
      {
        id: 'sp-sabo',
        title: 'Special: Episode of Sabo & Nebulandia (2015)',
        type: 'special',
        episodes: 'Specials',
        epCount: 4,
        bountyReward: 5000000,
        description: 'Retelling of Sabo’s perspective of Dressrosa, and Nebulandia filler battle against tactical Foxy crew.',
        watchTip: 'Optional bonus watches after Episode 746.',
        tier: 'Optional'
      }
    ]
  },
  {
    id: 'whole-cake',
    title: 'Whole Cake Island & Zou Saga',
    tagline: 'Sanji’s Vinsmoke Heritage, Road Poneglyphs, and Infiltrating Emperor Big Mom’s Territory',
    episodes: '747 – 889',
    mangaChapters: 'Chapters 802 – 908',
    crewJoined: [],
    items: [
      {
        id: 'arc-37',
        title: 'Silver Mine Arc & Heart of Gold',
        type: 'filler',
        episodes: '747 – 750 + Special',
        startEp: 747,
        endEp: 750,
        epCount: 6,
        chapters: 'Film Tie-in',
        onePace: 'Skipped',
        bountyReward: 5000000,
        description: 'Luffy and Bartolomeo escape Silver Pirate Alliance; Heart of Gold leads directly into Film Gold.',
        watchTip: 'Watch right before Film: Gold.',
        tier: 'Recommended'
      },
      {
        id: 'mov-13',
        title: 'Movie 13: One Piece Film: Gold (2016)',
        type: 'movie',
        episodes: 'Movie (120 min)',
        epCount: 5,
        bountyReward: 25000000,
        description: 'Glamorous casino heist thriller aboard the 10-kilometer golden ship Gran Tesoro ruled by Gild Tesoro.',
        watchTip: '⭐ Fantastic spectacle, sleek visuals, and fun casino caper. Watch after Episode 750.',
        tier: 'Must Watch'
      },
      {
        id: 'arc-38',
        title: 'Zou Arc',
        type: 'canon',
        episodes: '751 – 779',
        startEp: 751,
        endEp: 779,
        epCount: 29,
        chapters: 'Ch 802 – 824',
        onePace: '12 eps (5 hr 30m)',
        bountyReward: 50000000,
        description: 'Ancient elephant Zunesha carrying Mink Tribe. Jack the Drought, Red Road Poneglyphs, and Sanji’s forced wedding.',
        highlights: '"Raizo is safe!" Mink loyalty, Road Poneglyph & Laugh Tale navigation explained, Ninja-Pirate-Mink-Samurai alliance.',
        tier: 'Core'
      },
      {
        id: 'arc-39',
        title: 'Marine Rookie Arc',
        type: 'filler',
        episodes: '780 – 782',
        startEp: 780,
        endEp: 782,
        epCount: 3,
        chapters: 'Anime Original',
        onePace: 'Skipped',
        bountyReward: 0,
        description: 'Luffy starves and raids a frontline Marine base for food.',
        watchTip: 'Filler. Skip to Episode 783.',
        tier: 'Filler'
      },
      {
        id: 'arc-40',
        title: 'Whole Cake Island Arc',
        type: 'canon',
        episodes: '783 – 877',
        startEp: 783,
        endEp: 877,
        epCount: 95,
        chapters: 'Ch 825 – 902',
        onePace: '39 eps (19 hr 00m)',
        bountyReward: 500000000,
        description: 'Crash Big Mom’s Tea Party to rescue Sanji from Germa 66 and Charlotte Pudding.',
        highlights: 'Sanji vs Luffy emotional fight, Brook steals Poneglyph rubbing, Gear 4th Snakeman vs Katakuri. 1.5 Billion Bounty!',
        tier: 'Core'
      },
      {
        id: 'arc-41',
        title: 'Levely / Reverie Arc',
        type: 'canon',
        episodes: '878 – 889',
        startEp: 878,
        endEp: 889,
        epCount: 12,
        chapters: 'Ch 903 – 908',
        onePace: '5 eps (2 hr 15m)',
        bountyReward: 100000000,
        description: 'World monarchs assemble at Mary Geoise. Empty Throne, Im-sama, Shanks, and Sabo’s attack.',
        highlights: 'Luffy\'s 1.5 Billion "Fifth Emperor" headline, Im-sama and giant Straw Hat reveal.',
        tier: 'Core'
      }
    ]
  },
  {
    id: 'wano',
    title: 'Wano Country Saga',
    tagline: 'Feudal Samurai Realm, Oden’s Legend, Raid on Onigashima, and Gear 5th Awakening',
    episodes: '890 – 1085',
    mangaChapters: 'Chapters 909 – 1057',
    crewJoined: ['Jinbe'],
    items: [
      {
        id: 'arc-42',
        title: 'Wano Country Arc – Act 1',
        type: 'canon',
        episodes: '890 – 894',
        startEp: 890,
        endEp: 894,
        epCount: 5,
        chapters: 'Ch 909 – 924',
        onePace: '3 eps (1 hr 20m)',
        bountyReward: 50000000,
        description: 'Entering closed borders of Wano. Luffy meets Otama and Zoro in Bakura Town, confronting Emperor Kaido.',
        highlights: 'Luffy vs Kaido first clash (Thunder Bagua one-shot).',
        tier: 'Core'
      },
      {
        id: 'arc-43',
        title: 'Cidre Guild Arc (Stampede Tie-in)',
        type: 'filler',
        episodes: '895 – 896',
        startEp: 895,
        endEp: 896,
        epCount: 2,
        chapters: 'Film Tie-in',
        onePace: 'Skipped',
        bountyReward: 2000000,
        description: 'Carbonated water bounty hunter battle pairing Luffy with Boa Hancock.',
        watchTip: 'Watch right before Stampede Movie 14!',
        tier: 'Recommended'
      },
      {
        id: 'mov-14',
        title: 'Movie 14: One Piece: Stampede (2019)',
        type: 'movie',
        episodes: 'Movie (101 min)',
        epCount: 5,
        bountyReward: 40000000,
        description: '20th Anniversary massive festival! Worst Generation, Marines, Warlords, and Revolutionaries battle Douglas Bullet.',
        watchTip: '⭐ PURE HYPE! Non-stop dream team fights and insane sakuga animation. Watch after Episode 896.',
        tier: 'Must Watch'
      },
      {
        id: 'arc-44',
        title: 'Wano Country Arc – Act 2 & Udon Prison',
        type: 'canon',
        episodes: '897 – 958',
        startEp: 897,
        endEp: 958,
        epCount: 62,
        chapters: 'Ch 925 – 955',
        onePace: '26 eps (12 hr 30m)',
        bountyReward: 150000000,
        description: 'Luffy masters Advanced Ryou Haki in Udon Prison. Zoro obtains Enma. Tragic execution of Shimotsuki Yasuie.',
        highlights: 'Big Mom arrives in Udon, Ryou Haki training, Zoro receives Kozuki Oden’s blade Enma.',
        tier: 'Core'
      },
      {
        id: 'arc-45',
        title: 'Wano Act 3: Kozuki Oden Flashback & Onigashima Raid',
        type: 'canon',
        episodes: '959 – 1028',
        startEp: 959,
        endEp: 1028,
        epCount: 70,
        chapters: 'Ch 956 – 1010',
        onePace: '32 eps (15 hr 45m)',
        bountyReward: 300000000,
        description: 'Life of Kozuki Oden sailing with Whitebeard and Roger to Laugh Tale, followed by fire festival assault on Onigashima.',
        highlights: 'Roger vs Whitebeard clash, "He Laughed" Laugh Tale, Jinbe arrives as Helmsman, Roof Piece begins.',
        tier: 'Core'
      },
      {
        id: 'arc-46',
        title: 'Uta’s Past Arc (Film Red Tie-in)',
        type: 'mixed',
        episodes: '1029 – 1030',
        startEp: 1029,
        endEp: 1030,
        epCount: 2,
        chapters: 'Film Tie-in',
        onePace: 'Skipped',
        bountyReward: 5000000,
        description: 'Flashback showing Luffy’s childhood friendship with Shanks’ musical daughter, Uta.',
        watchTip: 'Watch right before Film: Red!',
        tier: 'Recommended'
      },
      {
        id: 'mov-15',
        title: 'Movie 15: One Piece Film: Red (2022)',
        type: 'movie',
        episodes: 'Movie (115 min)',
        epCount: 5,
        bountyReward: 50000000,
        description: 'World-famous diva Uta performs on Elegia island. Phenomenal music by Ado and Red-Haired Shanks in combat.',
        watchTip: '⭐ Global Box Office Phenomenon! Watch after Episode 1030.',
        tier: 'Must Watch'
      },
      {
        id: 'arc-47',
        title: 'Wano Country: Climax & Gear 5th Awakening',
        type: 'canon',
        episodes: '1031 – 1085',
        startEp: 1031,
        endEp: 1085,
        epCount: 55,
        chapters: 'Ch 1011 – 1057',
        onePace: '25 eps (12 hr 00m)',
        bountyReward: 1500000000,
        description: 'Zoro King of Hell, Sanji Ifrit Jambe, Law & Kid awaken Devil Fruits, and Luffy awakens Sun God Nika Gear 5th to defeat Kaido.',
        highlights: 'Ep 1061 (Sanji), Ep 1062 (Zoro vs King), Ep 1071 & 1072 (Luffy Gear 5th Drums of Liberation), Luffy becomes Emperor of the Sea! 3 Billion Bounty!',
        tier: 'Core'
      }
    ]
  },
  {
    id: 'final-saga',
    title: 'Final Saga (Egghead Island & Beyond)',
    tagline: 'Dr. Vegapunk, Island of the Future, Void Century Broadcast, and the Global Race for the One Piece',
    episodes: '1086 – Present',
    mangaChapters: 'Chapters 1058 – Present',
    crewJoined: [],
    items: [
      {
        id: 'arc-48',
        title: 'Egghead Island Arc (Future Island)',
        type: 'canon',
        episodes: '1086 – Present',
        startEp: 1086,
        endEp: 1125,
        epCount: 40,
        chapters: 'Ch 1058 – 1125',
        onePace: 'In Production',
        bountyReward: 500000000,
        description: '500-years-in-the-future island of Dr. Vegapunk. Shocking world events with Shanks, Garp at Hachinosu, Kuma\'s past, and Five Elders.',
        highlights: 'Kuma & Bonney backstory, Zoro vs Lucci rematch, Vegapunk global broadcast, Five Elders Yokai forms.',
        tier: 'Core'
      },
      {
        id: 'sp-fanletter',
        title: 'Special: ONE PIECE FAN LETTER (2024)',
        type: 'special',
        episodes: 'Special (25 min)',
        epCount: 2,
        bountyReward: 10000000,
        description: '25th Anime Anniversary masterpiece directed by Megumi Ishitani. Follows ordinary people whose lives were changed by the Straw Hats.',
        watchTip: '⭐ MASTERPIECE OF ANIMATION! Must-watch for any fan. Best enjoyed anytime after Summit War / Wano.',
        tier: 'Must Watch'
      }
    ]
  }
];

// Helper to look up or generate episode title
function getEpisodeTitle(epNumber, arcTitle) {
  if (EPISODE_TITLES[epNumber]) {
    return EPISODE_TITLES[epNumber];
  }
  return `${arcTitle || 'Grand Line'} — Part ${epNumber}`;
}

export default function App() {
  const [activeThemeId, setActiveThemeId] = useState(() => {
    return localStorage.getItem('op_tracker_theme') || 'classic';
  });
  const [showThemePicker, setShowThemePicker] = useState(false);

  const [watchedIds, setWatchedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('op_tracker_watched');
      return saved ? new Set(JSON.parse(saved)) : new Set(['arc-1', 'arc-2']);
    } catch {
      return new Set(['arc-1', 'arc-2']);
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

  const [pirateName, setPirateName] = useState(() => {
    return localStorage.getItem('op_pirate_name') || 'MUGIWARA';
  });
  const [pirateEpithet, setPirateEpithet] = useState(() => {
    return localStorage.getItem('op_pirate_epithet') || 'Straw Hat Captain';
  });
  const [userPhoto, setUserPhoto] = useState(() => {
    return localStorage.getItem('op_user_photo') || null;
  });
  const [photoFilter, setPhotoFilter] = useState('sepia');
  const [photoZoom, setPhotoZoom] = useState(1);

  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('roadmap');
  const [expandedSagas, setExpandedSagas] = useState(() => new Set(SAGAS_DATA.map(s => s.id)));
  const [spoilerShield, setSpoilerShield] = useState(() => {
    return localStorage.getItem('op_spoiler_shield') !== 'false';
  });
  const [dailyPace, setDailyPace] = useState(3);

  const [showResetModal, setShowResetModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const fileInputRef = useRef(null);
  const posterCanvasRef = useRef(null);

  const theme = THEMES[activeThemeId] || THEMES.classic;

  useEffect(() => {
    localStorage.setItem('op_tracker_theme', activeThemeId);
  }, [activeThemeId]);

  useEffect(() => {
    localStorage.setItem('op_tracker_watched', JSON.stringify(Array.from(watchedIds)));
  }, [watchedIds]);

  useEffect(() => {
    localStorage.setItem('op_tracker_subprogress', JSON.stringify(subProgress));
  }, [subProgress]);

  useEffect(() => {
    localStorage.setItem('op_pirate_name', pirateName);
    localStorage.setItem('op_pirate_epithet', pirateEpithet);
  }, [pirateName, pirateEpithet]);

  useEffect(() => {
    localStorage.setItem('op_spoiler_shield', spoilerShield.toString());
  }, [spoilerShield]);

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
      if (watchedIds.has(item.id)) {
        return acc + (item.epCount || 0);
      }
      if (item.startEp && item.endEp && subProgress[item.id]) {
        const curEp = subProgress[item.id];
        const partialCount = Math.max(0, Math.min(item.epCount, curEp - item.startEp + 1));
        return acc + partialCount;
      }
      return acc;
    }, 0);
  }, [allItems, watchedIds, subProgress]);

  const progressPercent = Math.min(
    100,
    Math.round((watchedEpisodesCount / Math.max(1, totalEpisodesCount)) * 100)
  );

  const watchTimeStats = useMemo(() => {
    const minutesWatched = watchedEpisodesCount * 23.5;
    const hoursWatched = (minutesWatched / 60).toFixed(1);
    const daysEquivalent = (minutesWatched / (60 * 24)).toFixed(1);

    const skippedFillerEps = allItems
      .filter(item => item.type === 'filler' && !watchedIds.has(item.id))
      .reduce((sum, item) => sum + (item.epCount || 0), 0);
    const fillerHoursSaved = ((skippedFillerEps * 20) / 60).toFixed(1);

    return {
      hoursWatched,
      daysEquivalent,
      fillerHoursSaved
    };
  }, [watchedEpisodesCount, allItems, watchedIds]);

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

  const formatBounty = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getItemCurrentEpisode = (item) => {
    if (watchedIds.has(item.id)) {
      return item.endEp || item.epCount;
    }
    if (item.startEp && item.endEp && subProgress[item.id] !== undefined) {
      return subProgress[item.id];
    }
    return null;
  };

  const upNextData = useMemo(() => {
    for (const saga of SAGAS_DATA) {
      for (const item of saga.items) {
        if (!watchedIds.has(item.id)) {
          const start = item.startEp || 1;
          const end = item.endEp || item.epCount || 1;
          const current = subProgress[item.id] !== undefined ? subProgress[item.id] : start;
          const episodeTitle = getEpisodeTitle(current, item.title);

          return {
            saga,
            item,
            currentEp: current,
            startEp: start,
            endEp: end,
            episodeTitle
          };
        }
      }
    }
    return null;
  }, [watchedIds, subProgress]);

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

  const handleSetCurrentEpisode = (item, newEpisode) => {
    if (!item.startEp || !item.endEp) return;

    if (newEpisode >= item.endEp) {
      setWatchedIds(prev => new Set(prev).add(item.id));
      setSubProgress(prev => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
    } else if (newEpisode < item.startEp) {
      setWatchedIds(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
      setSubProgress(prev => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
    } else {
      setWatchedIds(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
      setSubProgress(prev => ({
        ...prev,
        [item.id]: newEpisode
      }));
    }
  };

  const advanceUpNext = () => {
    if (!upNextData) return;
    const { item, currentEp } = upNextData;
    handleSetCurrentEpisode(item, currentEp + 1);
    showToast(`Advanced to Episode ${currentEp + 1}!`);
  };

  const scrollToActiveArc = () => {
    if (!upNextData) return;
    setActiveTab('roadmap');
    setExpandedSagas(prev => new Set(prev).add(upNextData.saga.id));
    setTimeout(() => {
      const el = document.getElementById(`arc-card-${upNextData.item.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const toggleItem = (item) => {
    setWatchedIds(prev => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
        setSubProgress(sub => {
          const s = { ...sub };
          delete s[item.id];
          return s;
        });
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
        if (markAsWatched) {
          next.add(item.id);
        } else {
          next.delete(item.id);
        }
      });
      return next;
    });
    if (markAsWatched) {
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
      if (next.has(sagaId)) {
        next.delete(sagaId);
      } else {
        next.add(sagaId);
      }
      return next;
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setUserPhoto(result);
          localStorage.setItem('op_user_photo', result);
          showToast('Wanted poster portrait updated!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadWantedPoster = () => {
    const canvas = posterCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 720;
    canvas.height = 1018;

    const bgGradient = ctx.createLinearGradient(0, 0, 720, 1018);
    bgGradient.addColorStop(0, '#e8d7b8');
    bgGradient.addColorStop(0.5, '#deb887');
    bgGradient.addColorStop(1, '#c8a168');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 720, 1018);

    ctx.strokeStyle = '#3d2514';
    ctx.lineWidth = 14;
    ctx.strokeRect(18, 18, 684, 982);
    ctx.lineWidth = 3;
    ctx.strokeRect(28, 28, 664, 962);

    ctx.fillStyle = '#3d2514';
    ctx.font = '900 88px "Times New Roman", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('WANTED', 360, 125);

    const px = 80;
    const py = 155;
    const pw = 560;
    const ph = 430;

    ctx.save();
    ctx.beginPath();
    ctx.rect(px, py, pw, ph);
    ctx.clip();

    if (userPhoto) {
      const img = new Image();
      img.src = userPhoto;
      ctx.drawImage(img, px - (pw * (photoZoom - 1)) / 2, py - (ph * (photoZoom - 1)) / 2, pw * photoZoom, ph * photoZoom);

      if (photoFilter === 'sepia') {
        ctx.fillStyle = 'rgba(112, 66, 20, 0.35)';
        ctx.fillRect(px, py, pw, ph);
      } else if (photoFilter === 'bw') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(px, py, pw, ph);
      } else if (photoFilter === 'ink') {
        ctx.fillStyle = 'rgba(40, 20, 10, 0.45)';
        ctx.fillRect(px, py, pw, ph);
      }
    } else {
      ctx.fillStyle = '#1e1b18';
      ctx.fillRect(px, py, pw, ph);
      ctx.fillStyle = '#f59e0b';
      ctx.font = '140px sans-serif';
      ctx.fillText(theme.avatar, 360, 410);
    }
    ctx.restore();

    ctx.strokeStyle = '#2d1808';
    ctx.lineWidth = 6;
    ctx.strokeRect(px, py, pw, ph);

    ctx.fillStyle = '#3d2514';
    ctx.font = 'bold 36px "Times New Roman", Georgia, serif';
    ctx.fillText('DEAD OR ALIVE', 360, 640);

    ctx.fillStyle = '#221206';
    ctx.font = '900 58px "Times New Roman", Georgia, serif';
    ctx.fillText(pirateName.toUpperCase(), 360, 725);

    if (pirateEpithet) {
      ctx.font = 'italic bold 22px Georgia, serif';
      ctx.fillStyle = '#5c3a21';
      ctx.fillText(`"${pirateEpithet}"`, 360, 765);
    }

    ctx.fillStyle = '#221206';
    ctx.font = '900 54px "Courier New", monospace, serif';
    ctx.fillText(`฿ ${formatBounty(calculatedBounty)}-`, 360, 845);

    ctx.font = '900 42px "Times New Roman", Georgia, serif';
    ctx.fillStyle = '#3d2514';
    ctx.textAlign = 'right';
    ctx.fillText('MARINE', 640, 930);

    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#5c3a21';
    ctx.fillText('KONO SAKUHIN HA FICTION DETHUNODE JITSUZAISURU JINBUTSU DANTAI', 80, 935);
    ctx.fillText('SONOTA NO SOSHIKI TO DOITSU NO MEISHOU GA GEKICHU NI TOUJYOU', 80, 950);
    ctx.fillText('SHITATOSHITEMO JITSUZAI NA MONOTOHA ISSAI MUKANKEIDETH', 80, 965);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `WANTED_${pirateName.replace(/\s+/g, '_')}_BOUNTY.png`;
    link.href = dataUrl;
    link.click();
    showToast('Wanted Poster downloaded successfully!');
  };

  const exportProgressJSON = () => {
    const backupData = {
      version: '2.6',
      exportDate: new Date().toISOString(),
      theme: activeThemeId,
      pirateName,
      pirateEpithet,
      userPhoto,
      watchedIds: Array.from(watchedIds),
      subProgress,
      dailyPace
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `one_piece_voyage_backup_${new Date().toISOString().slice(0, 10)}.json`;
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
        if (data.subProgress) setSubProgress(data.subProgress);
        if (data.theme) setActiveThemeId(data.theme);
        if (data.pirateName) setPirateName(data.pirateName);
        if (data.pirateEpithet) setPirateEpithet(data.pirateEpithet);
        if (data.userPhoto) setUserPhoto(data.userPhoto);
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
    params.set('name', pirateName);
    params.set('theme', activeThemeId);
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    navigator.clipboard?.writeText
      ? navigator.clipboard.writeText(shareUrl)
      : document.execCommand('copy');
    showToast('Shareable voyage link copied to clipboard!');
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

      return {
        ...saga,
        items: filteredItems
      };
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
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/50 text-amber-300 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Hidden Canvas for High-Res Poster Export */}
      <canvas ref={posterCanvasRef} className="hidden" />

      {/* STICKY "UP NEXT / CONTINUE VOYAGE" BAR WITH EPISODE TITLE */}
      {upNextData && (
        <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/30 px-4 py-2.5 shadow-xl transition">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <PlayCircle className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>

              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Up Next &bull; Episode {upNextData.currentEp}
                  </span>
                  <span className="text-xs font-bold text-slate-400 truncate">
                    {upNextData.item.title}
                  </span>
                </div>

                {/* Specific Episode Name Display */}
                <h4 className="text-xs md:text-sm font-black text-slate-100 truncate mt-0.5 flex items-center gap-1.5">
                  <span className="text-amber-300">Ep {upNextData.currentEp}:</span>
                  <span className="italic text-slate-200">"{upNextData.episodeTitle}"</span>
                </h4>
              </div>
            </div>

            {/* Quick Actions: Jump to Arc & +1 Next Episode */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={scrollToActiveArc}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Jump to Arc</span>
              </button>

              <button
                onClick={advanceUpNext}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 transition flex items-center gap-1"
              >
                <span>Next Episode (+1)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <header className="relative bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-b border-slate-800 px-4 py-8 md:py-12 overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700"
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

                {/* Straw Hat Theme Switcher Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setShowThemePicker(!showThemePicker)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition"
                  >
                    <Palette className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                    <span>Theme: <strong>{theme.character}</strong></span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Dropdown Menu with Spoiler Masking */}
                  {showThemePicker && (
                    <div className="absolute left-0 mt-2 w-64 bg-slate-900/95 border border-slate-800 rounded-2xl p-2.5 shadow-2xl z-50 backdrop-blur-md grid grid-cols-1 gap-1 max-h-80 overflow-y-auto">
                      <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                        Choose Straw Hat Theme
                      </div>
                      {Object.values(THEMES).map(t => {
                        const isCrewTheme = ['luffy', 'zoro', 'usopp', 'sanji', 'nami', 'chopper', 'robin', 'franky', 'brook', 'jinbe'].includes(t.id);
                        const isMemberRecruited = !isCrewTheme || unlockedCrew.some(
                          c => c.toLowerCase().includes(t.id) || (t.id === 'robin' && c === 'Nico Robin')
                        );
                        const isNikaTheme = t.id === 'nika';
                        const isNikaUnlocked = watchedIds.has('arc-47');
                        const isThemeShielded = spoilerShield && ((isCrewTheme && !isMemberRecruited) || (isNikaTheme && !isNikaUnlocked));

                        return (
                          <button
                            key={t.id}
                            onClick={() => {
                              setActiveThemeId(t.id);
                              setShowThemePicker(false);
                              showToast(`Switched theme to ${t.character}!`);
                            }}
                            title={isThemeShielded ? '🔒 Mystery Theme (Hover to reveal spoiler)' : t.name}
                            className={`group/theme flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition ${
                              activeThemeId === t.id
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-300 hover:bg-slate-800/60'
                            }`}
                          >
                            <span className="text-base shrink-0">
                              {isThemeShielded ? (
                                <span className="inline-flex items-center">
                                  <span className="group-hover/theme:hidden text-xs">🔒</span>
                                  <span className="hidden group-hover/theme:inline">{t.avatar}</span>
                                </span>
                              ) : (
                                t.avatar
                              )}
                            </span>
                            <div className="flex-1 truncate">
                              <div
                                className={`font-bold transition-all duration-200 ${
                                  isThemeShielded
                                    ? 'filter blur-[4.5px] group-hover/theme:blur-none select-none text-slate-400 group-hover/theme:text-white'
                                    : ''
                                }`}
                              >
                                {t.name}
                              </div>
                            </div>
                            <span
                              className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                              style={{ backgroundColor: t.primary }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
                <span>The One Piece Voyage</span>
                <span className="text-2xl md:text-3xl">{theme.avatar}</span>
              </h1>
              <p className="mt-2 text-slate-400 text-xs md:text-sm max-w-2xl">
                Master 1,120+ episodes, 15 movies, specials, and manga chapter sync. Track your progress episode-by-episode on the Grand Line.
              </p>
            </div>

            {/* Live Marine Bounty Card & Quick Stats */}
            <div
              onClick={() => setActiveTab('poster')}
              className="cursor-pointer group bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 p-4 rounded-3xl shadow-xl transition flex items-center gap-4 relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl group-hover:scale-105 transition">
                {userPhoto ? (
                  <img src={userPhoto} alt="Portrait" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span>{theme.avatar}</span>
                )}
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-400" /> Active Marine Bounty
                </div>
                <div className="text-xl md:text-2xl font-black text-amber-400 tracking-tight font-mono">
                  ฿ {formatBounty(calculatedBounty)}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {pirateName} &bull; <span className="text-cyan-400">{progressPercent}% Voyage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cumulative Watch-Time Stats Strip */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Watched Units</div>
              <div className="text-lg font-black text-amber-400 font-mono mt-0.5">{watchedEpisodesCount}</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Screen Time</div>
              <div className="text-lg font-black text-cyan-400 font-mono mt-0.5">{watchTimeStats.hoursWatched} hrs</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Continuous Days</div>
              <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">{watchTimeStats.daysEquivalent} days</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Filler Time Saved</div>
              <div className="text-lg font-black text-orange-400 font-mono mt-0.5">+{watchTimeStats.fillerHoursSaved} hrs</div>
            </div>
          </div>

          {/* Grand Line Global Progress Bar */}
          <div className="mt-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-800/80 shadow-lg">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="flex items-center gap-1.5" style={{ color: theme.primary }}>
                <Anchor className="w-4 h-4" /> Voyage Progress
              </span>
              <span className="text-slate-400">
                {watchedEpisodesCount} of ~{totalEpisodesCount} Episodes / Specials ({progressPercent}%)
              </span>
            </div>

            <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full transition-all duration-500 shadow-sm`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Crew Recruitment Status Bar with Spoiler Shield Protection */}
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
                  const isRecruited = unlockedCrew.includes(
                    member.name === 'Robin' ? 'Nico Robin' : member.name
                  );
                  const isShielded = spoilerShield && !isRecruited;

                  return (
                    <button
                      key={member.name}
                      onClick={() => {
                        setActiveThemeId(member.id);
                        showToast(`Active Straw Hat: ${member.name}!`);
                      }}
                      title={
                        isShielded
                          ? '🔒 Mystery Straw Hat (Hover to reveal - Spoiler Shield Active)'
                          : isRecruited
                          ? `Recruited: Click to activate ${member.name} theme`
                          : `Yet to join: ${member.name}`
                      }
                      className={`group/crew text-[11px] px-2.5 py-0.5 rounded-full font-medium transition-all flex items-center gap-1.5 relative overflow-hidden ${
                        isRecruited
                          ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-500/50 cursor-pointer'
                          : isShielded
                          ? 'bg-slate-950/70 text-slate-400 border border-slate-800/80 hover:border-slate-700 cursor-pointer'
                          : 'bg-slate-950/40 text-slate-600 border border-slate-900 opacity-60'
                      }`}
                    >
                      <span className="shrink-0 text-xs">
                        {isRecruited ? (
                          member.icon
                        ) : isShielded ? (
                          <span className="inline-flex items-center">
                            <span className="group-hover/crew:hidden text-[10px]">🔒</span>
                            <span className="hidden group-hover/crew:inline text-xs">{member.icon}</span>
                          </span>
                        ) : (
                          member.icon
                        )}
                      </span>
                      <span
                        className={`transition-all duration-200 ${
                          isShielded
                            ? 'filter blur-[4.5px] group-hover/crew:blur-none select-none text-slate-400 group-hover/crew:text-slate-200'
                            : ''
                        }`}
                      >
                        {member.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation and Content Sections */}
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
              onClick={() => setActiveTab('poster')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                activeTab === 'poster'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-4 h-4" /> Wanted Poster Studio
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

          {/* Utility Tools: Share URL, Spoiler Shield, Backup JSON, Reset */}
          <div className="flex items-center gap-2">
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
              title="Toggle Spoiler Blur Shield"
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
              title="Backup Voyage Progress to JSON"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
            >
              <Download className="w-4 h-4" />
            </button>

            <label
              title="Restore Voyage Progress from JSON"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={importProgressJSON} className="hidden" />
            </label>

            <button
              onClick={() => setShowResetModal(true)}
              title="Reset all voyage progress"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE WATCH ROADMAP */}
        {activeTab === 'roadmap' && (
          <div>
            {/* Search & Filter Toolbar */}
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

              {/* Filter Pills */}
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

            {/* Sagas List */}
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
                      {/* Saga Header */}
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
                            <h2 className="text-xl md:text-2xl font-black text-slate-100">
                              {saga.title}
                            </h2>
                            <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                              {saga.tagline}
                            </p>
                          </div>
                        </div>

                        {/* Fast Actions: Mark Saga */}
                        <div className="flex items-center gap-2 self-end md:self-center">
                          <span className="text-xs font-medium text-slate-400 mr-2">
                            {sagaWatchedCount}/{sagaTotalCount} Arcs Done
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

                      {/* Arcs Grid */}
                      {isExpanded && (
                        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {saga.items.map(item => {
                            const isWatched = watchedIds.has(item.id);
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
                                    : isMustWatch
                                    ? 'bg-slate-900/90 border-amber-500/40 shadow-md shadow-amber-500/5'
                                    : isFiller
                                    ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                                    : 'bg-slate-900/80 border-slate-800'
                                }`}
                              >
                                <div>
                                  {/* Item Header */}
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      {item.type === 'canon' && (
                                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                          Canon Arc
                                        </span>
                                      )}
                                      {item.type === 'mixed' && (
                                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                          Mixed Canon
                                        </span>
                                      )}
                                      {item.type === 'movie' && (
                                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                                          <Film className="w-3 h-3" /> Movie
                                        </span>
                                      )}
                                      {item.type === 'special' && (
                                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                                          <Sparkles className="w-3 h-3" /> Special
                                        </span>
                                      )}
                                      {item.type === 'recommended_filler' && (
                                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                                          <Flame className="w-3 h-3" /> Top Tier Filler
                                        </span>
                                      )}
                                      {item.type === 'filler' && (
                                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                          Filler (Skip)
                                        </span>
                                      )}

                                      {isMustWatch && (
                                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950 flex items-center gap-0.5 font-bold">
                                          <Star className="w-2.5 h-2.5 fill-current" /> Essential
                                        </span>
                                      )}
                                    </div>

                                    {/* Mark Complete Checkbox */}
                                    <button
                                      onClick={() => toggleItem(item)}
                                      title={isWatched ? 'Mark as unwatched' : 'Mark full arc as watched'}
                                      className="shrink-0 p-1 text-slate-400 hover:text-amber-400 transition"
                                    >
                                      {isWatched ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                                      ) : (
                                        <Circle className="w-5 h-5" />
                                      )}
                                    </button>
                                  </div>

                                  {/* Title & Metadata */}
                                  <div className="mb-2">
                                    <h3 className={`text-base font-bold transition ${isWatched ? 'text-slate-300 line-through' : 'text-slate-100'}`}>
                                      {item.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-amber-400/90 mt-1">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {item.episodes}
                                      </span>
                                      {item.chapters && (
                                        <span className="text-slate-400 flex items-center gap-1">
                                          <BookOpen className="w-3 h-3" /> {item.chapters}
                                        </span>
                                      )}
                                      {item.onePace && item.onePace !== 'Skipped' && (
                                        <span className="text-cyan-400 text-[11px] font-normal">
                                          ⚡ One Pace: {item.onePace}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Description & Spoiler Shield */}
                                  <div className="relative mb-3">
                                    <p
                                      className={`text-xs text-slate-400 leading-relaxed transition duration-300 ${
                                        spoilerShield && !isWatched ? 'filter blur-[3.5px] hover:filter-none select-none hover:select-text' : ''
                                      }`}
                                    >
                                      {item.description}
                                    </p>
                                    {spoilerShield && !isWatched && (
                                      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-slate-300 bg-slate-950/60 rounded-lg pointer-events-none">
                                        🔒 Hover to view plot details (Spoiler Shield Active)
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Micro-Episode Stepper with Global Episode Tracking */}
                                {hasStepper && (
                                  <div className="mt-3 pt-3 border-t border-slate-800/80 bg-slate-950/40 -mx-4 -mb-4 p-3.5 rounded-b-2xl">
                                    <div className="flex items-center justify-between text-xs mb-1.5">
                                      <div className="flex items-center gap-1.5 truncate mr-2">
                                        <BookmarkCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                        <span className="font-semibold text-slate-300 truncate">
                                          {isWatched ? (
                                            <span className="text-emerald-400">Completed through Ep {item.endEp}</span>
                                          ) : currentEp !== null ? (
                                            <span>
                                              Watching: <strong className="text-amber-300 font-mono text-sm">Episode {currentEp}</strong> of {item.endEp}
                                            </span>
                                          ) : (
                                            <span className="text-slate-500">Not started (Starts at Ep {item.startEp})</span>
                                          )}
                                        </span>
                                      </div>

                                      {currentEp !== null && !isWatched && (
                                        <span className="text-[11px] font-mono text-slate-400 shrink-0">
                                          ({currentEp - item.startEp + 1}/{item.epCount} in arc)
                                        </span>
                                      )}
                                    </div>

                                    {/* Active Episode Title Preview inside Card */}
                                    {currentEp !== null && !isWatched && currentEpTitle && (
                                      <div className="text-[11px] italic text-slate-400 truncate mb-2.5 pl-5 border-l border-amber-500/30">
                                        "{currentEpTitle}"
                                      </div>
                                    )}

                                    {/* Controls: [-] [+] [+5] & Quick Episode Number Input */}
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="flex items-center gap-1">
                                        <button
                                          onClick={() => {
                                            const base = currentEp !== null ? currentEp : item.startEp;
                                            handleSetCurrentEpisode(item, base - 1);
                                          }}
                                          disabled={currentEp === null || currentEp < item.startEp}
                                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 text-xs font-bold transition flex items-center gap-1"
                                          title="Previous Episode"
                                        >
                                          <Minus className="w-3 h-3" /> 1
                                        </button>

                                        <button
                                          onClick={() => {
                                            const base = currentEp !== null ? currentEp : item.startEp - 1;
                                            handleSetCurrentEpisode(item, base + 1);
                                          }}
                                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1"
                                          title="Next Episode"
                                        >
                                          <Plus className="w-3 h-3" /> 1
                                        </button>

                                        {item.epCount > 5 && (
                                          <button
                                            onClick={() => {
                                              const base = currentEp !== null ? currentEp : item.startEp - 1;
                                              handleSetCurrentEpisode(item, Math.min(item.endEp, base + 5));
                                            }}
                                            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition flex items-center gap-0.5"
                                            title="Fast-forward +5 Episodes"
                                          >
                                            <FastForward className="w-3 h-3 text-cyan-400" /> +5
                                          </button>
                                        )}
                                      </div>

                                      {/* Direct Jump Input */}
                                      <div className="flex items-center gap-1 text-xs">
                                        <span className="text-[11px] text-slate-500 font-medium">Jump to Ep:</span>
                                        <input
                                          type="number"
                                          min={item.startEp}
                                          max={item.endEp}
                                          value={currentEp || ''}
                                          placeholder={item.startEp.toString()}
                                          onChange={(e) => {
                                            const val = parseInt(e.target.value, 10);
                                            if (!isNaN(val)) {
                                              handleSetCurrentEpisode(item, val);
                                            }
                                          }}
                                          className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-center text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Bottom Tips */}
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

        {/* TAB 2: WANTED POSTER STUDIO */}
        {activeTab === 'poster' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6">
              <div>
                <h3 className="text-xl font-black text-amber-400 flex items-center gap-2">
                  <Trophy className="w-5 h-5" /> Wanted Poster Studio
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Customize your pirate persona and portrait. Your bounty dynamically updates based on watched episodes.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Pirate Captain Name
                </label>
                <input
                  type="text"
                  value={pirateName}
                  onChange={e => setPirateName(e.target.value)}
                  placeholder="e.g. MUGIWARA LUFFY"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 font-bold focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Epithet / Title
                </label>
                <input
                  type="text"
                  value={pirateEpithet}
                  onChange={e => setPirateEpithet(e.target.value)}
                  placeholder="e.g. King of the Pirates"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Upload Pirate Portrait
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4 text-amber-400" />
                    {userPhoto ? 'Change Photo' : 'Upload Selfie / Avatar'}
                  </button>
                  {userPhoto && (
                    <button
                      onClick={() => {
                        setUserPhoto(null);
                        localStorage.removeItem('op_user_photo');
                      }}
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition"
                      title="Remove Photo"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {userPhoto && (
                <div className="space-y-4 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Portrait Color Filter
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: 'sepia', label: 'Sepia' },
                        { id: 'bw', label: 'B & W' },
                        { id: 'ink', label: 'Ink Grain' },
                        { id: 'normal', label: 'Original' }
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => setPhotoFilter(f.id)}
                          className={`text-xs py-1.5 rounded-lg font-semibold border transition ${
                            photoFilter === f.id
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                      <span>Zoom / Crop</span>
                      <span>{photoZoom.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="2.5"
                      step="0.1"
                      value={photoZoom}
                      onChange={e => setPhotoZoom(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={downloadWantedPoster}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Wanted Poster (PNG)
              </button>
            </div>

            {/* Live Visual Wanted Poster Preview */}
            <div className="lg:col-span-7 flex justify-center">
              <div
                className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl border-4 border-[#3d2514] select-none text-[#3d2514]"
                style={{
                  background: 'linear-gradient(180deg, #e8d7b8 0%, #deb887 50%, #c8a168 100%)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                }}
              >
                <div className="border-2 border-[#3d2514] p-4 flex flex-col items-center text-center">
                  <div className="font-serif font-black text-5xl md:text-6xl tracking-wider text-[#3d2514] mb-3">
                    WANTED
                  </div>

                  <div className="relative w-full aspect-[4/3] bg-[#1a140f] rounded border-4 border-[#2d1808] overflow-hidden flex items-center justify-center mb-3">
                    {userPhoto ? (
                      <img
                        src={userPhoto}
                        alt="Portrait"
                        className="w-full h-full object-cover transition"
                        style={{
                          transform: `scale(${photoZoom})`,
                          filter:
                            photoFilter === 'sepia'
                              ? 'sepia(0.8) contrast(1.1)'
                              : photoFilter === 'bw'
                              ? 'grayscale(1) contrast(1.2)'
                              : photoFilter === 'ink'
                              ? 'sepia(0.5) contrast(1.4) brightness(0.9)'
                              : 'none'
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-amber-500">
                        <span className="text-6xl">{theme.avatar}</span>
                        <span className="text-xs text-amber-300 font-mono uppercase tracking-wider">
                          Upload portrait in studio
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="font-serif font-black text-2xl md:text-3xl text-[#3d2514] tracking-widest uppercase mt-1">
                    DEAD OR ALIVE
                  </div>

                  <div className="font-serif font-black text-3xl md:text-4xl text-[#221206] uppercase tracking-wide mt-2">
                    {pirateName}
                  </div>

                  {pirateEpithet && (
                    <div className="italic font-serif font-bold text-sm text-[#5c3a21] mt-0.5">
                      "{pirateEpithet}"
                    </div>
                  )}

                  <div className="font-mono font-black text-2xl md:text-3xl text-[#221206] tracking-tight mt-3">
                    ฿ {formatBounty(calculatedBounty)}-
                  </div>

                  <div className="w-full flex justify-between items-end mt-4 pt-2 border-t border-[#3d2514]/30 text-[9px] text-[#5c3a21] font-sans">
                    <div className="text-left font-mono leading-tight">
                      KONO SAKUHIN HA FICTION DETHUNODE...<br />
                      GRAND LINE OFFICIAL BOUNTY
                    </div>
                    <div className="font-serif font-black text-2xl text-[#3d2514] tracking-widest">
                      MARINE
                    </div>
                  </div>
                </div>
              </div>
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
                All 15 movies are standalone theatrical adventures. Below is their exact placement relative to the anime episodes to ensure zero character, ability, or power spoilers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'One Piece Film: Z (2012)',
                  movieNum: 'Movie 12',
                  placement: 'Watch right after Episode 578 (Post-Fishman Island)',
                  why: 'Widely hailed as the best film in the franchise. Focuses on former Admiral Zephyr and Marine justice.',
                  tier: 'S-Tier'
                },
                {
                  title: 'One Piece Film: Strong World (2009)',
                  movieNum: 'Movie 10',
                  placement: 'Watch after Episode 381 (or after Ep 429 tie-in)',
                  why: 'First film directly written by Eiichiro Oda! Straw Hats don black suits to fight Shiki the Golden Lion.',
                  tier: 'S-Tier'
                },
                {
                  title: 'Baron Omatsuri & Secret Island (2005)',
                  movieNum: 'Movie 6',
                  placement: 'Watch after Episode 224 (before Water 7)',
                  why: 'Directed by Mamoru Hosoda (*Summer Wars*). Dark, psychological thriller exploring crew bonds.',
                  tier: 'S-Tier'
                },
                {
                  title: 'One Piece Film: Red (2022)',
                  movieNum: 'Movie 15',
                  placement: 'Watch after Episode 1030 (Wano Act 3)',
                  why: 'Global phenomenon with vocals by Ado as Uta and Red-Haired Shanks in combat.',
                  tier: 'S-Tier'
                },
                {
                  title: 'One Piece: Stampede (2019)',
                  movieNum: 'Movie 14',
                  placement: 'Watch after Episode 896 (between WCI and Wano)',
                  why: '20th Anniversary festival war uniting Luffy, Law, Sabo, Hancock, Smoker, and Buggy.',
                  tier: 'Must Watch'
                },
                {
                  title: 'One Piece Film: Gold (2016)',
                  movieNum: 'Movie 13',
                  placement: 'Watch after Episode 750 (Post-Dressrosa)',
                  why: 'High-octane casino heist thriller aboard the 10km golden ship Gran Tesoro.',
                  tier: 'Must Watch'
                }
              ].map(m => (
                <div key={m.title} className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {m.movieNum} &bull; {m.tier}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100 mt-1">{m.title}</h4>
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
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 ep/day (Casual)</span>
                  <span>5 eps/day (Steady)</span>
                  <span>15 eps/day (Binge)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Episodes Remaining</div>
                  <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">
                    {pacingStats.remainingEpisodes}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Days to Catch Up</div>
                  <div className="text-2xl font-black text-cyan-400 font-mono mt-0.5">
                    {pacingStats.daysToFinish} Days
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                <div className="font-bold text-sm mb-0.5">Estimated Catch-up Date:</div>
                <div className="text-base font-black font-mono">{pacingStats.completionDateStr}</div>
                <div className="text-[11px] text-emerald-400/80 mt-1">
                  Based on {dailyPace} episodes per day skipping identified fillers.
                </div>
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
                <div className="text-3xl font-black text-amber-400 font-mono">
                  ~{watchTimeStats.fillerHoursSaved} Hours
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Equal to roughly 38 full-length feature films of saved time!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: QUICK TIPS & FILLER RULES */}
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
                  <span><strong>Never Skip G-8 (Episodes 196–206):</strong> Even though it is anime filler, Vice Admiral Jonathan and Navarone Fortress are brilliantly written and fit seamlessly right after Skypiea.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">2.</span>
                  <span><strong>Watch Film: Strong World at Ep 381 or 429:</strong> Strong World introduces Shiki the Golden Lion. Watching Episode 0 (OVA) first provides vital Roger-era lore.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">3.</span>
                  <span><strong>Watch "3D2Y" Special After Ep 516:</strong> It provides the perfect emotional bookend to Marineford before the crew gathers at the Post-Timeskip Sabaody.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">4.</span>
                  <span><strong>Do Not Miss "ONE PIECE FAN LETTER" (2024):</strong> Directed by Megumi Ishitani, this 25-minute special is one of the highest-rated anime episodes in history.</span>
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

      {/* FLOATING ACTION BUTTON (FAB): Jump to Current Arc */}
      {upNextData && (
        <button
          onClick={scrollToActiveArc}
          title={`Jump to ${upNextData.item.title} (Ep ${upNextData.currentEp})`}
          className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 px-4 py-3 rounded-2xl shadow-2xl font-black text-xs flex items-center gap-2 border border-amber-300/40 hover:scale-105 active:scale-95 transition"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>Ep {upNextData.currentEp} &bull; Jump to Arc</span>
        </button>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-rose-500 mb-3" />
            <h3 className="text-lg font-bold text-slate-100">Reset Voyage Progress?</h3>
            <p className="text-xs text-slate-400 mt-2">
              This will reset all checked arcs, episode steppers, and bounty counters back to zero. You can export a JSON backup first if you want to save your progress.
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
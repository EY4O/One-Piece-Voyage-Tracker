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
  ArrowRight,
  SkipForward,
  Lock
} from 'lucide-react';

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

// Canonical Landmark Episode Titles
const EPISODE_TITLES = {
	1: "I'm Luffy! The Man Who Will Become the Pirate King!",
	2: "Great Swordsman Appears! Pirate Hunter Roronoa Zoro",
	3: "Morgan vs. Luffy! Who's This Beautiful Young Girl?",
	4: "Luffy's Past! Red-Haired Shanks Appears",
	5: "A Terrifying Mysterious Power! Captain Buggy, the Clown Pirate!",
	6: "Desperate Situation! Beast Tamer Mohji vs. Luffy!",
	7: "Epic Showdown! Swordsman Zoro vs. Acrobat Cabaji!",
	8: "Who is the Victor? Devil Fruit Power Showdown!",
	9: "The Honorable Liar? Captain Usopp!",
	10: "The Weirdest Guy Ever! Jango the Hypnotist!",
	11: "Expose the Plot! Pirate Butler, Captain Kuro!",
	12: "Clash With the Black Cat Pirates! The Great Battle on the Slope!",
	13: "The Terrifying Duo! Meowban Brothers vs. Zoro!",
	14: "Luffy Back in Action! Miss Kaya's Desperate Resistance!",
	15: "Beat Kuro! Usopp the Man's Tearful Resolve!",
	16: "Protect Kaya! The Usopp Pirates' Great Efforts!",
	17: "Anger Explosion! Kuro vs. Luffy! How It Ends!",
	18: "You're the Weird Creature! Gaimon and His Strange Friends!",
	19: "The Three-Sword Style's Past! Zoro and Kuina's Vow!",
	20: "Famous Cook! Sanji of the Sea Restaurant!",
	21: "Unwelcome Customer! Sanji's Food and Ghin's Debt!",
	22: "The Strongest Pirate Fleet! Commodore Don Krieg!",
	23: "Protect Baratie! The Great Pirate, Red Foot Zeff!",
	24: "Hawk-Eye Mihawk! The Great Swordsman Zoro Falls at Sea!",
	25: "The Deadly Foot Technique Bursts Forth! Sanji vs. the Invincible Pearl!",
	26: "Zeff and Sanji's Dream! The Illusory All Blue!",
	27: "Cool-Headed, Cold-Hearted Demon! Pirate Fleet Chief Commander Ghin!",
	28: "I Won't Die! Fierce Battle, Luffy vs. Krieg!",
	29: "The Conclusion of the Deadly Battle! A Spear of Blind Determination!",
	30: "Set Sail! The Seafaring Cook Sets off With Luffy!",
	31: "The Worst Man in the Eastern Seas! Fish-Man Pirate Arlong!",
	32: "Witch of Cocoyashi Village! Arlong's Female Leader!",
	33: "Usopp Dead?! When Is Luffy Going To Make Landfall?!",
	34: "Everyone's Gathered! Usopp Speaks the Truth About Nami!",
	35: "Untold Past! Female Warrior Bellemere!",
	36: "Survive! Mother Bellemere and Nami's Bond!",
	37: "Luffy Rises! Result of the Broken Promise!",
	38: "Luffy in Big Trouble! Fish-Men vs. the Luffy Pirates!",
	39: "Luffy Submerged! Zoro vs. Hatchan the Octopus!",
	40: "Proud Warriors! Sanji and Usopp's Fierce Battles!",
	41: "Luffy at Full Power! Nami's Determination and the Straw Hat!",
	42: "Explosion! Fish-Man Arlong's Fierce Assault From the Sea!",
	43: "End of the Fish-Man Empire! Nami's My Friend!",
	44: "Setting Out With a Smile! Farewell, Hometown Cocoyashi Village!",
	45: "Bounty! Straw Hat Luffy Becomes Known to the World!",
	46: "Chase Straw Hat! Little Buggy's Big Adventure!",
	47: "The Wait Is Over! The Return of Captain Buggy!",
	48: "The Town of the Beginning and the End! Landfall at Loguetown!",
	49: "Kitetsu III and Yubashiri! Zoro's New Swords and the Woman Sergeant Major!",
	50: "Usopp vs. Daddy the Parent! Showdown at High!",
	51: "Fiery Cooking Battle? Sanji vs. the Beautiful Chef!",
	52: "Buggy's Revenge! The Man Who Smiles on the Execution Platform!",
	53: "The Legend Has Started! Head for the Grand Line!",
	54: "Precursor to a New Adventure! Apis, a Mysterious Girl!",
	55: "Miraculous Creature! Apis' Secret and the Legendary Island!",
	56: "Eric Attacks! Great Escape From Warship Island!",
	57: "A Solitary Island in the Distant Sea! The Legendary Lost Island!",
	58: "Showdown in the Ruins! Tense Zoro vs. Eric!",
	59: "Luffy, Completely Surrounded! Commodore Nelson's Secret Strategy!",
	60: "Through the Sky They Soar! The 1000 Year Legend Lives Again!",
	61: "An Angry Showdown! Cross the Red Line!",
	62: "The First Line of Defense? The Giant Whale Laboon Appears!",
	63: "A Promise Between Men! Luffy and the Whale Vow to Meet Again!",
	64: "A Town That Welcomes Pirates? Setting Foot on Whisky Peak!",
	65: "Explosion! The Three Swords Style! Zoro vs. Baroque Works!",
	66: "All Out Battle! Luffy vs. Zoro, Mysterious Grand Duel!",
	67: "Deliver Princess Vivi! The Luffy Pirates Set Sail!",
	68: "Try Hard, Coby! Coby and Helmeppo's Struggles in the Marines!",
	69: "Coby and Helmeppo's Resolve! Vice-Admiral Garp's Parental Affection",
	70: "An Ancient Island! The Shadow Hiding in Little Garden!",
	71: "Huge Duel! The Giants Dorry and Broggy!",
	72: "Luffy Gets Angry! A Dirty Trick Violates the Sacred Duel!",
	73: "Broggy's Bitter Tears of Victory! The Conclusion of Elbaf!",
	74: "The Devilish Candle! Tears of Regret and Tears of Anger!",
	75: "A Hex on Luffy! Colors Trap!",
	76: "Time to Fight Back! Usopp's Quick Thinking and Fire Star!",
	77: "Farewell Giant Island! Head for Alabasta!",
	78: "Nami's Sick? Beyond the Snow Falling on the Sea!",
	79: "A Raid! The Tin Tyrant and Tin Plate Wapol!",
	80: "An Island Without Doctors? Adventure in a Nameless Land!",
	81: "Are You Happy? The Doctor Called Witch!",
	82: "Dalton's Resolve! Wapol's Corps Lands on the Island!",
	83: "The Island Where Snow Lives! Climb the Drum Rockies!",
	84: "Blue-Nosed Reindeer! Chopper's Secret!",
	85: "An Outcast's Dream! Hiriluk the Quack!",
	86: "Hiriluk's Cherry Blossoms and the Will That Gets Carried On!",
	87: "Fight Wapol's Crew! The Power of the Munch-Munch Fruit!",
	88: "Zoan-Type Devil Fruit! Chopper's Seven-Form Transformation!",
	89: "When the Kingdom's Rule Ends! The Flag of Faith Flies Forever!",
	90: "Hiriluk's Cherry Blossoms! Miracle in the Drum Rockies!",
	91: "Goodbye Drum Island! I'm Going Out to Sea!",
	92: "Alabasta's Hero and a Ballerina on the Ship!",
	93: "Off to the Desert Kingdom! The Rain-Summoning Powder and the Rebel Army!",
	94: "The Heroes' Reunion! His Name Is Fire Fist Ace!",
	95: "Ace and Luffy! Hot Emotions and Brotherly Bonds!",
	96: "Erumalu, the City of Green and the Kung Fu Dugongs!",
	97: "Adventure in the Country of Sand! The Monsters That Live in the Scorching Land!",
	98: "Enter the Desert Pirates! The Men Who Live Freely!",
	99: "False Fortitude! Camu, Rebel Soldier at Heart!",
	100: "Rebel Warrior Koza! The Dream Vowed to Vivi!",
	101: "Showdown in a Heat Haze! Ace vs. the Gallant Scorpion!",
	102: "Ruins and Lost Ways! Vivi, Her Friends and the Country's Form!",
	103: "Spiders Café at 8 O'Clock! The Enemy Leaders Gather!",
	104: "Luffy vs. Vivi! The Tearful Vow To Put Friends on the Line!",
	105: "The Battlefront of Alabasta! Rainbase, the City of Dreams!",
	106: "The Trap of Certain Defeat! Storming Raindinners!",
	107: "Operation Utopia Commences! The Swell of Rebellion Stirs!",
	108: "The Terrifying Banana Gators and Mr. Prince!",
	109: "The Key to a Great Comeback Escape! The Wax-Wax Ball!",
	110: "Merciless Mortal Combat! Luffy vs. Crocodile!",
	111: "Dash for a Miracle! Alabasta Animal Land!",
	112: "Rebel Army vs. Royal Army! Showdown at Alubarna!",
	113: "Alubarna Grieves! The Fierce Captain Karoo!",
	114: "Sworn on a Friend's Dream! The Battle of Molehill, Block 4!",
	115: "Big Opening Day Today! The Copy-Copy Montage!",
	116: "Transformed Into Nami! Bon Clay's Rapid-Fire Ballet Kenpo!",
	117: "Nami's Cyclone Advisory! Clima Takt Burst!",
	118: "Secret Passed Down in the Royal Family! The Ancient Weapon Pluton!",
	119: "Secret of Powerful Swordplay! Ability To Cut Steel and the Rhythm Things Have!",
	120: "The Battle Is Over! Koza Raises the White Flag!",
	121: "Where Vivi's Voice Gets Heard! The Hero Descends!",
	122: "Sand Croc and Water Luffy! The Second Round of the Duel!",
	123: "That Looks Croc-ish! Luffy, Run to the Royal Tomb!",
	124: "The Nightmare Draws Near! This Is the Sand-Sand Clan's Secret Base!",
	125: "Magnificent Wings! My Name Is Pell, Guardian Deity of the Country!",
	126: "I Will Surpass You! Rain Falls in Alabasta!",
	127: "A Farewell to Arms! Pirates and Different Ideas of Justice!",
	128: "The Pirates' Banquet and Operation Escape From Alabasta!",
	129: "It All Started on That Day! Vivi Tells the Story of Her Adventure!",
	130: "Scent of Danger! The Seventh Member Is Nico Robin!",
	131: "The First Patient! The Untold Story of the Rumble Ball!",
	132: "Uprising of the Navigator! For the Unyielding Dream!",
	133: "A Recipe Handed Down! Sanji, the Iron Man of Curry!",
	134: "I Will Make It Bloom! Usopp the Man and the Eight-Foot Shell!",
	135: "The Fabled Pirate Hunter! Zoro, the Wandering Swordsman!",
	136: "Zenny of the Island of Goats and the Pirate Ship in the Mountains!",
	137: "How's Tricks? The Designs of Zenny the Moneylender!",
	138: "Whereabouts of the Island Treasure! Attack of the Zenny Pirates!",
	139: "Legend of the Rainbow Mist! Old Man Henzo of the Luluka Island!",
	140: "Residents of the Land of Eternity! The Pumpkin Pirates!",
	141: "Thoughts of Home! The Pirate Graveyard of No Escape!",
	142: "An Inevitable Melee! Wetton's Schemes and the Rainbow Tower!",
	143: "And so, the Legend Begins! To the Other Side of the Rainbow!",
	144: "Caught Log! The King of Salvagers, Masira!",
	145: "Monsters Appear! Don't Mess With the Whitebeard Pirates!",
	146: "Quit Dreaming! Mock Town, the Town of Ridicule!",
	147: "Distinguished Pirates! A Man Who Talks of Dreams and the King of Undersea Search!",
	148: "Legendary Family! Noland the Liar!",
	149: "Steer for the Clouds! Capture the South Bird!",
	150: "Dreams Don't Come True?! Bellamy vs. the Saruyama Alliance",
	151: "100 Million Man! World's Greatest Power and Pirate Blackbeard",
	152: "Take to the Sky! Ride the Knock-up Stream!",
	153: "Sail the White Sea! The Sky Knight and the Gate in the Clouds!",
	154: "Godland, Skypiea! Angels on a Beach of Clouds",
	155: "The Forbidden Sacred Ground! The Island Where God Lives and Heaven's Judgment!",
	156: "Already Criminals?! Skypiea's Upholder of the Law!",
	157: "Is Escape Possible?!? God's Challenge Is Set in Motion!",
	158: "A Trap on Lovely Street! The Almighty Eneru!",
	159: "Onward Crow! To the Sacrificial Altar!",
	160: "10% Survival Rate! Satori, the Mantra Master!",
	161: "The Ordeal of Spheres! Desperate Struggle in the Lost Forest!",
	162: "Chopper in Danger! Former God vs. Priest Shura!",
	163: "Profound Mystery! Ordeal of String and Ordeal of Love?!?",
	164: "Light the Fire of Shandora! Wyper the Warrior!",
	165: "Jaya, City of Gold in the Sky! Head for God's Shrine!",
	166: "Festival on the Night Before Gold Hunting! Feelings for 'Vearth!'",
	167: "Enter God Eneru! Farewell to the Survivors!",
	168: "A Giant Snake Bares Its Fangs! The Survival Game Begins!",
	169: "The Deadly Reject! War Demon Wyper's Resolve",
	170: "Fierce Mid-Air Battle! Pirate Zoro vs. Warrior Braham",
	171: "The Roaring Burn Bazooka!! Pirate Luffy vs. War Demon Wyper!",
	172: "The Ordeal of Swamp! Chopper vs. Priest Gedatsu!",
	173: "Unbeatable Powers! Eneru's True Form Is Revealed!",
	174: "A Mystical City! The Grand Ruins of Shandora!",
	175: "0% Survival Rate! Chopper vs Ohm, the Sword Wielding Priest",
	176: "Climb Giant Jack! Deadly Combat in the Upper Ruins!",
	177: "The Ordeal of Iron! White Barbed Death Match!",
	178: "Bursting Slash! Zoro vs. Ohm!",
	179: "Collapsing Upper Ruins! The Quintet for the Finale!",
	180: "Showdown in the Ancient Ruins! Sky God Eneru's Goal!",
	181: "Ambition Towards the Endless Vearth! The Ark Maxim!",
	182: "They Finally Clash! Pirate Luffy vs. God Eneru!",
	183: "Maxim Surfaces! Deathpiea Is Activated!",
	184: "Luffy Falls! Eneru's Judgment and Nami's Wish!",
	185: "The Two Awaken! On the Front Lines of the Burning Love Rescue!",
	186: "Capriccio for Despair! The Impending Doom of Sky Island!",
	187: "Led by a Bell's Sound! Tale of the Great Warrior and the Explorer!",
	188: "Free From the Spell! The Great Warrior Sheds Tears!",
	189: "Eternal Friends! The Vowed Bell Echoes Across the Mighty Seas!",
	190: "Angel Island, Obliterated! The Horror of the Raigo's Advent!!",
	191: "Knock Over Giant Jack! Last Hope for Escape!",
	192: "Miracle on Skypiea! The Love Song Heard in the Clouds!",
	193: "The Battle Ends! Proud Fantasia Echoes Far!",
	194: "I Made It Here! The Yarn the Poneglyphs Spin!",
	195: "Off to the Blue Sea!! A Heartfelt Finale!!",
	196: "A State of Emergency Is Issued! A Notorious Pirate Ship Has Infiltrated!",
	197: "Sanji the Cook! Proving His Merit at the Marine Dining Hall!",
	198: "Captured Zoro! Chopper's Emergency Operations!",
	199: "The Marine's Dragnet Closes In! The Second Member Captured!",
	200: "Luffy and Sanji's Daring Rescue Mission!",
	201: "Enter the Hot-Blooded Special Forces! Battle on the Bridge!",
	202: "Breaking Through the Siege! The Going Merry Is Recovered!",
	203: "The Pirate Ship Disappears! Fortress Battle, Round #2!",
	204: "The Gold and Waver Recovery Operations!",
	205: "The One Fell Swoop Plan! Jonathan's Surefire Secret Tactic!",
	206: "Farewell, Marine Fortress! The Last Battle for Escape!",
	207: "Great Adventure in Long Ring Long Land!",
	208: "A Davy Back With the Foxy Pirates!",
	209: "Round 1! One Lap of the Donut Race!",
	210: "Silver Fox Foxy! The Merciless Interference!",
	211: "Round 2! Shoot It Into the Groggy Ring!",
	212: "A Barrage of Red Cards in Groggy Ring!",
	213: "Round 3! The Round-and-Round Roller Race!",
	214: "A Seriously Heated Race! Into the Final Round!",
	215: "Screaming-Hot Bombardment! Pirate Dodgeball!",
	216: "Showdown on the Cliff! Red Light, Green Light!",
	217: "The Captains Square Off! The Final Combat Round!",
	218: "Full-Blast Slow-Slow Onslaught vs. Invulnerable Luffy!",
	219: "Epic, Heated Combat! The Fateful Final Conclusion!",
	220: "Was It Lost? Stolen? Who Are You?",
	221: "A Mysterious Boy With a Horn and Robin's Deduction!",
	222: "Now, Let's Get Back Our Memories! The Pirate Crew Lands on the Island!",
	223: "Zoro Bares His Fangs! A Savage Animal Stands in the Way!",
	224: "The Last Counterattack by the Memory Thief Who Reveals His True Colors!",
	225: "Proud Man! Silver Fox Foxy!",
	226: "The Guy Who's the Closest To Invincible? And the Most Dangerous Man!",
	227: "Navy Headquarters Admiral Aokiji! The Ferocity of an Ultimate Powerhouse!",
	228: "Duel Between Rubber and Ice! Luffy vs. Aokiji!",
	229: "The Dashing Sea Train and the City of Water: Water Seven!",
	230: "Adventure in the City on the Water! Head to the Mammoth Shipbuilding Plant!",
	231: "The Franky Family and Iceburg!",
	232: "Galley-La Company! A Grand Sight: Dock #1!",
	233: "Pirate Abduction Incident! A Pirate Ship That Can Only Await Her End!",
	234: "Rescuing Our Friend! Raid on the Franky House!",
	235: "Big Fight Under the Moon! The Pirate Flag Flutters With Sorrow!",
	236: "Luffy vs. Usopp! Collision of Two Men's Pride!",
	237: "Severe Shock Hits the City of Water! Iceburg Targeted!",
	238: "Gum-Gum Human vs. Fire-Breathing Cyborg!",
	239: "The Straw Hat Pirates Are the Culprits? The Protectors of the City of Water!",
	240: "Eternal Farewell? Nico Robin: The Woman Who Draws Darkness!",
	241: "Capture Robin! The Determination of the Straw Hats!",
	242: "Cannon Fire Is the Signal! CP9 Goes Into Action!",
	243: "CP9 Takes Off Their Masks! Their Shocking True Faces!",
	244: "Secret Bond! Iceburg and Franky!",
	245: "Come Back, Robin! Showdown With CP9!",
	246: "The Straw Hat Pirates Annihilated? The Menace of the Leopard Model!",
	247: "The Man Who Is Loved Even by His Ship! Usopp's Tears!",
	248: "Franky's Past! The Day the Sea Train First Ran",
	249: "Spandam's Scheme! The Day the Sea Train Shook",
	250: "The End of the Legendary Man! The Day the Sea Train Cried!",
	251: "The Truth Behind Her Betrayal! Robin's Sorrowful Decision!",
	252: "The Steam Whistle Forces Friends Apart! The Sea Train Starts To Run",
	253: "Sanji Barges In! Sea Train Battle in the Storm!",
	254: "Nami's Soul Cries Out! Straw Hat Luffy Makes a Comeback!",
	255: "Another Sea Train? Rocketman Charges Forth!",
	256: "Rescue Our Friends! A Bond Among Foes Sworn With Fists!",
	257: "Smash the Wave! Luffy and Zoro Use the Strongest Combo!",
	258: "A Mysterious Man Appears?! His Name Is Sniperking!",
	259: "Showdown Between Cooks! Sanji vs. Ramen Kenpo",
	260: "Rooftop Duel! Franky vs. Nero",
	261: "Clash! Demon-Slasher Zoro vs. Ship-Slasher T-Bone!",
	262: "Scramble Over Robin! A Cunning Plan by Sniperking!!",
	263: "The Judicial Island! Full View of Enies Lobby!",
	264: "Landing Operations Start! Charge in, Straw Hats!",
	265: "Luffy Cuts Through! Big Showdown on the Judicial Island!",
	266: "Battle Against Giants! Open the Second Gate!",
	267: "Find a Way Out! Rocketman Takes Flight!",
	268: "Catch up With Luffy! The Straw Hats' All-Out Battle",
	269: "Robin Betrayed! The Motive of the World Government!",
	270: "Give Robin Back! Luffy vs. Blueno!",
	271: "Don't Stop! Hoist the Counterattack Signal!",
	272: "Almost to Luffy! Gather at the Courthouse Plaza!",
	273: "Everything Is To Protect My Friends! Second Gear Activated!",
	274: "Give Us Your Answer, Robin! The Straw Hats' Outcry!",
	275: "Robin's Past! The Girl Was Called a Devil!",
	276: "Fated Mother and Daughter! The Mother's Name Is Olvia!",
	277: "The Tragedy of Ohara! The Terror of the Buster Call!",
	278: "Say You Want To Live! We Are Your Friends!!",
	279: "Jump Towards the Falls! Luffy's Feelings!",
	280: "The Ways of Men! Zoro's Techniques, Usopp's Dream!",
	281: "A Bond of Friendship Woven by Tears! Nami's World Map!",
	282: "Parting Builds a Man's Character! Sanji and Chopper!",
	283: "Everything Is for Her Friends! Robin in the Darkness!",
	284: "I'm Not Gonna Hand Over the Blueprints! Franky's Decision!",
	285: "Obtain the Five Keys! The Straw Hat Pirates vs. CP9!",
	286: "Devil Fruit Powers! Kaku and Jabra Transform!",
	287: "I Won't Kick Even if It Costs Me My Life! Sanji's Chivalry!",
	288: "Fukurou's Miscalculation! My Cola Is the Water of Life!",
	289: "Zoro Busts Out a New Technique! The Sword's Name Is Sniperking?",
	290: "Uncontrollable! Chopper's Forbidden Rumble!",
	291: "Boss Luffy Returns! Is It a Dream or Reality? Lottery Ruckus!",
	292: "A Big Rice Cake Tossing Race at the Castle! Red Nose's Plot!",
	293: "Bubble Master Kalifa! The Soap Trap Closes in on Nami!",
	294: "Resounding Bad News! The Buster Call Invoked!",
	295: "Five Namis? Nami Strikes Back With Mirages!",
	296: "Nami's Decision! Fire at the Out-of-Control Chopper!",
	297: "Hunter Sanji Makes an Entrance? Elegy for a Lying Wolf!",
	298: "Fiery Kicks! Sanji's Full Course of Foot Techniques!",
	299: "Fierce Sword Attacks! Zoro vs. Kaku, Powerful Sword Fighting Showdown!",
	300: "Demon God Zoro! An Incarnation of Asura Born From Fighting Spirit!",
	301: "Spandam Frightened! The Hero on the Tower of Law!",
	302: "Robin Freed! Luffy vs. Lucci, Showdown Between Leaders!",
	303: "Boss Luffy Is the Culprit? Track Down the Missing Great Cherry Tree!",
	304: "I Can't Protect Anyone Unless I Win! Third Gear Activated!",
	305: "Shivering Past! Dark Justice and Rob Lucci!",
	306: "A Mysterious Mermaid Appears? As Consciousness Fades Away...",
	307: "Cannon Fire Sinks the Island! Franky's Lamentation!",
	308: "Wait for Luffy! Mortal Combat on the Bridge of Hesitation!",
	309: "Fists Full of Emotion! Luffy Unleashes Gatling With All His Might!",
	310: "From the Sea, a Friend Arrives! The Straw Hats Share the Strongest Bond!",
	311: "Everyone Makes a Great Escape! The Road to Victory Is for the Pirates!",
	312: "Thank You, Merry! Snow Falls Over the Parting Sea!",
	313: "Peace Interrupted! A Navy Vice Admiral With a Fist of Love!",
	314: "The Strongest Family? Luffy's Father Revealed!",
	315: "Its Name Is the New World! The Fate of the Grand Line!",
	316: "Shanks Makes a Move! The Linchpin to the Reckless Era!",
	317: "The Girl in Search of Her Yagara! Great Search in the City of Water!",
	318: "Mothers Are Strong! Zoro's Hectic Household Chores!",
	319: "Sanji's Shock! Mysterious Old Man and His Super Yummy Cooking!",
	320: "Everyone Finally Has a Bounty! A Pirate Group Worth Over 600 Million!",
	321: "The King of Animals That Overlooks the Sea! The Dream Ship Magnificently Completed!",
	322: "Goodbye My Dear Underlings! Franky Departs!",
	323: "Departing the City of Water! Usopp Mans up and Brings Closure to the Duel!",
	324: "Wanted Posters Make It Around the World! Celebrations in Their Hometowns as the Ship Moves Forward!",
	325: "The Most Heinous Power! Blackbeard's Darkness Attacks Ace!",
	326: "The Mysterious Band of Pirates! Sunny and the Dangerous Trap!",
	327: "Sunny in a Pinch! Roar, Secret Superspeed Mecha!",
	328: "The Dream Sinking in the New World! The Disillusioned Pirate, Puzzle!",
	329: "The Assassins Attack! The Great Battle on Ice Begins!",
	330: "The Straw Hat's Hard Battles! A Pirate Soul Risking It All for the Flag!",
	331: "Hot Full Throttle! The Twin's Magnetic Power Drawing Near!",
	332: "Mansion of Great Chaos! The Enraged Don and the Captured Crew!",
	333: "The Return of the Phoenix! The Dream of the Pirate Flag Sworn to a Friend!",
	334: "The Red Hot Decisive Battle! Luffy vs. the Scorching Don!",
	335: "Waiting in the New World! Farewell to the Brave Pirates!",
	336: "Chopperman to the Rescue! Protect the TV Station by the Shore!",
	337: "Plunging Into the Devil's Sea! The Mysterious Skeleton Floating in the Fog!",
	338: "The Joy of Seeing People! The Gentleman Skeleton's True Identity!",
	339: "One Unnatural Phenomenon After the Next! Disembarking on Thriller Bark!",
	340: "The Man Called a Genius! Hogback Makes His Appearance!",
	341: "Nami's in a Major Pinch! The Zombie Mansion and the Invisible Man!",
	342: "The Zombie's Secret! Hogback's Nightmarish Laboratory!",
	343: "His Name Is Moria! The Great Shadow-Seizing Pirate's Trap!",
	344: "Feast of the Zombie Song! The Night Raid's Bell Is the Sound of Darkness!",
	345: "A Bunch of Animals? Perona's Wonder Garden!",
	346: "The Vanishing Straw Hat Crew! A Mysterious Swordsman Appears!",
	347: "Chivalry Remains! The Traitorous Zombie Protects Nami",
	348: "Appearing From the Sky! That Man Is the Humming Swordsman!",
	349: "Luffy's Emergency Situation! The Ultimate Shadow's Destination!",
	350: "The Warrior Known as the \"Devil!!\" The Moment of Oars\' Revival",
	351: "Awakening After 500 Years!! Oars Opens His Eyes!!",
	352: "A Belief Worth Begging To Live For!! Brook Defends His Afro",
	353: "A Man\'s Promise Never Dies!! To the Friend Waiting Under the Distant Sky",
	354: "I Swear To Go See Him!! Brook and the Cape of Promise!",
	355: "Food, Nami and Shadows!! Luffy\'s Enraged Counterattack!",
	356: "Usopp\'s the Strongest? Leave Anything Negative to Him!",
	357: "The General Zombies Are Down in a Flash!! Oars Feels Like an Adventure!!",
	358: "Blazing Knight Sanji!! Kick Down the Fake Wedding",
	359: "A Clear-Clear History? Sanji\'s Stolen Dream",
	360: "Save Me, Hero!! My Enemy Is the Immortal Princess",
	361: "Perona Is Terrified!! Usopp and Untruthful Share the Same \"U\"",
	362: "Slashes Dancing on the Roof!! Zoro vs. Ryuma's Showdown",
	363: "Chopper Is Furious!! Hogback's Evil Medical Practices",
	364: "Oars Roars! Come Out, Straw Hat Crew",
	365: "Luffy Is the Enemy! The Ulitmate Zombie vs. the Straw Hat Crew",
	366: "You're Going Down, Absalom!! Nami's Lightning Attack of Friendship!!",
	367: "Knock Him Down!! Special Attack: Straw Hat Docking?",
	368: "The Silent Assault!! The Mysterious Visitor, Tyrant Kuma",
	369: "Oars + Moria! The Most Heinous Combination of Brains and Brawn",
	370: "The Secret Plan to Turn the Tables! Nightmare Luffy Makes His Appearance",
	371: "The Straw Hat Crew Gets Wiped Out! The Shadow-Shadow's Powers in Full Swing",
	372: "The Incredible Battle Starts! Luffy vs. Luffy",
	373: "The End of the Battle Is Nigh! Pound in the Finishing Move",
	374: "Our Bodies Vanish! The Morning Sun Shines on the Nightmarish Island!",
	375: "Not Out of Danger Yet! Orders To Annihilate the Straw Hat Crew",
	376: "It Repels Everything! Kuma's Paw-Paw Power!",
	377: "The Pain of My Crewmates Is My Pain! Zoro\'s Desperate Fight!",
	378: "The Promise From a Distant Day! The Pirates' Song and a Small Whale!",
	379: "Brook's Past! A Sad Farewell With His Cheerful Comrade!",
	380: "Bink's Booze! The Song That Connects the Past With the Present!",
	381: "A New Crewmate! The Musician, Humming Brook!",
	382: "The Slow-Slow Menace! 'Silver Fox' Foxy Returns!",
	383: "The Great Scramble for Treasure! Collapse! Spa Island!",
	384: "Brook's Great Struggle! Is the Path To Becoming a True Comrade Rigorous?",
	385: "Arriving at Halfway Through the Grand Line! The Red Line",
	386: "Hatred of the Straw Hat Crew! Enter Iron Mask Duval",
	387: "The Fated Reunion! Save the Imprisoned Fish-Man",
	388: "Tragedy! The Truth of the Unmasked Duval",
	389: "Explosion! The Sunny's Super Secret Weapon: Gaon Cannon",
	390: "Landing to Get to Fish-Man Island! The Sabaody Archipelago",
	391: "Tyranny! The Rulers of Sabaody, the Celestial Dragons",
	392: "New Rivals Gather! The 11 Supernovas",
	393: "The Target Is Camie! The Looming Clutches of a Professional Kidnapper",
	394: "Rescue Camie! The Archipelago's Lingering Dark History",
	395: "Time Limit! The Human Auction Begins",
	396: "The Fist Explodes! Destroy the Auction",
	397: "Major Panic! Desperate Struggle at the Auction House",
	398: "Admiral Kizaru Takes Action! Sabaody Archipelago Thrown Into Chaos",
	399: "Break Through the Siege! The Navy vs. the Three Captains",
	400: "Roger and Rayleigh! The King of the Pirates and His Right Hand Man",
	401: "No Escape!? Admiral Kizaru's Light Speed Kick!!",
	402: "Overwhelming! The Navy's Fighting Weapons, the Pacifistas",
	403: "An Even Stronger Enemy Appears! The Battle Axe-Carrying Sentomaru",
	404: "Admiral Kizaru's Fierce Assault! The Straw Hats Face Certain Death!",
	405: "Eliminated Friends! The Final Day of the Straw Hat Crew",
	406: "Feudal Era Side Story! Boss Luffy Appears Again",
	407: "Feudal Era Side Story! Defeat Thriller Company's Trap",
	408: "Landing! The All-Female Island, Amazon Lily",
	409: "Hurry Back to Your Friends! The Maiden Island Adventure",
	410: "Everyone Falls in Love! Pirate Empress Hancock",
	411: "The Secret Hidden on Their Backs! Luffy and the Snake Princess Meet",
	412: "Heartless Judgment! Margaret Is Turned to Stone!!",
	413: "A Difficult Fight for Luffy! The Snake Sisters' Haki Power!!",
	414: "All-Out Special Power Battle!! Gum-Gum vs. Snake-Snake",
	415: "Hancock's Confession! The Sisters' Abhorrent Past",
	416: "Saving Ace! The Next Stop: The Great Prison!",
	417: "Love Is a Hurricane! Hancock Madly in Love!",
	418: "The Friends' Whereabouts! The Science of Weather and the Mechanical Island!",
	419: "The Friends' Whereabouts! An Island of Giant Birds and a Pink Paradise!",
	420: "The Friends' Whereabouts! Bridging the Islands and Vicious Vegetations!",
	421: "The Friends' Whereabouts! A Negative Princess and the King of Demons!",
	422: "A Deadly Infiltration! The Underwater Prison Impel Down!",
	423: "A Reunion in Hell?! The Man Who Ate the Chop-Chop Fruit!",
	424: "Break Through the Crimson Hell! Buggy's Chaos-Inducing Plan!",
	425: "The Strongest Man in the Prison! Poison Man Magellan Appears!",
	426: "A Special Presentation Related to the Movie! A Gold Lion's Ambition on the Move!",
	427: "A Special Presentation Related to the Movie! Little East Blue in Danger!",
	428: "A Special Presentation Related to the Movie! The Fierce Onslaught of the Amigo Pirates!",
	429: "A Special Presentation Related to the Movie! Luffy vs. Largo - The Battle Is On!",
	430: "A Warlord in Prison! Jimbei the First Son of the Sea!",
	431: "Chief Jailer Saldeath's Trap! Level 3 - Starvation Hell!",
	432: "The Unleashed Swan! A Reunion With Bon Clay!",
	433: "Warden Magellan's Strategy! Straw Hat Entrapment Completed!",
	434: "All Forces Have Gathered! The Battle on Level 4 - The Burning Heat Hell!",
	435: "Mighty Magellan! Bon Clay Bugs Out!",
	436: "The Showdown Has Come! Luffy's Desperate Last Attack!",
	437: "For His Friend! Bon Clay Goes to the Deadly Rescue!",
	438: "A Paradise in Hell! Impel Down - Level 5.5!",
	439: "Luffy's Treatment Begins! Iva's Miraculous Power!",
	440: "Believe in Miracles! Bon Clay's Cries From the Heart!",
	441: "Luffy Back in Action! Iva Begins the Breakout Plan!!",
	442: "Ace's Convoy Begins! Battle on the Lowest Floor - Level 6!",
	443: "The Ultimate Team Has Formed! Shaking Impel Down!",
	444: "Even More Chaos! Here Comes Blackbeard Teach!",
	445: "The Dangerous Encounter! Blackbeard and Shiryu of the Rain!",
	446: "Refusal to Be Defeated! Serious Hannyabal",
	447: "Jet Pistol of Anger! Luffy vs. Blackbeard!",
	448: "Stop Magellan! Iva's Esoteric Technique Explodes!",
	449: "Magellan's Tricky Move! A Foiled Escaped Plan!",
	450: "The Escapee Team in Trouble! The Forbidden Move: Venom Demon!",
	451: "Come, Final Miracle! Break Through the Gate of Justice!",
	452: "To the Navy Headquarters! Off to Rescue Ace!",
	453: "The Friends' Whereabouts! The Weatheria Report and the Cyborg Animals!",
	454: "The Friends' Whereabouts! A Cheeper of Giant Birds and a Pink Showdown!",
	455: "The Friends' Whereabouts! Revolutionaries and the Gorging Forest's Trap!",
	456: "The Friends' Whereabouts! A Huge Tomb and the Panty Debt!",
	457: "A Special Retrospective Before Marineford! The Vow of the Brotherhood!",
	458: "A Special Retrospective Before Marineford! The Three Navy Admirals Come Together!",
	459: "Ticking Down to the Time of Battle! The Navy's Strongest Lineup in Position!",
	460: "A Vast Fleet Appears! Here Come the Whitebeard Pirates!",
	461: "The Beginning of the War! Ace and Whitebeard's Past!",
	462: "The Force That Could Destroy the World! The Power of the Tremor-Tremor Fruit!",
	463: "An All-Consuming Inferno!! Admiral Akainu's Power!",
	464: "A Descendant of the Beast! Little Oars Jr. - Full Speed Ahead!",
	465: "Justice for the Winners! Sengoku's Strategy in Action!",
	466: "Straw Hat Team Arrives! Tension Grows at the Battlefield",
	467: "Even If It Means Death! Luffy vs. the Navy, the Battle Starts!",
	468: "Hard Battles, One After Another! Devil Fruit Users vs. Devil Fruit Users!",
	469: "Kuma's Transformation! Iva's Blow of Anger!",
	470: "The Great Swordsman Mihawk! Luffy Comes Under the Attack of the Black Sword!",
	471: "The Extermination Strategy in Action! The Power of the Pacifistas!",
	472: "Akainu's Plot! Whitebeard Entrapped!",
	473: "The Encircling Walls Activated! The Whitebeard Pirates Backed Into a Corner!",
	474: "Execution Order Issued! Break Through the Encircling Walls!",
	475: "Moving Into the Final Phase! Whitebeard's Trump Card for Recovery!",
	476: "Luffy at the End of His Tether! An All-Out Battle at the Oris Plaza!",
	477: "The Power That Will Shorten One's Life! Energy Hormone, Redux!",
	478: "To Live up to a Promise! Luffy and Coby Collide!",
	479: "The Scaffold at Last! The Way to Ace Has Opened!",
	480: "Each on Different Paths! Luffy vs. Garp!",
	481: "Ace Rescued! Whitebeard's Final Order!",
	482: "The Power That Can Burn Even Fire! Akainu's Ruthless Pursuit!",
	483: "Looking for the Answer! Fire Fist Ace Dies on the Battlefield!",
	484: "The Navy Headquarters Falls! Whitebeard's Unspeakable Wrath!",
	485: "Ending the Matter! Whitebeard vs. the Blackbeard Pirates!",
	486: "The Show Begins! Blackbeard's Plot Is Revealed!",
	487: "The Insatiable Akainu! Lava Fists Pummel Luffy!",
	488: "The Desperate Scream! Courageous Moments That Will Change the Future",
	489: "Here Comes Shanks! The War of the Best Is Finally Over!",
	490: "Mighty Leaders Face Each Other Down! Heralding the 'New Era!'",
	491: "Landing at the Maiden Island! The Harsh Reality Falls Upon Luffy!",
	492: "The Strongest Tag-Team! Luffy and Toriko's Hard Struggle!",
	493: "Luffy and Ace! The Story of How the Brothers Met!",
	494: "Here Comes Sabo! The Boy at the Gray Terminal!",
	495: "I Won't Run! Ace's Desperate Rescue Operation!",
	496: "To the Sea Someday! The Pledge of the Three Brats!",
	497: "Leaving the Dadan Family for Good? The Kids' Hideout Has Been Built!",
	498: "Luffy Becoming an Apprentice?! A Man Who Fought Against the King of the Pirates!",
	499: "The Battle Against the Big Tiger! Who Is Going to Be Captain?!",
	500: "Freedom Taken Away! The Nobles' Plot Closing in on the Brothers!",
	501: "The Fire Has Been Set! The Gray Terminal in Crisis!",
	502: "Where Can Freedom Be Found? A Sad Departure of a Boy!",
	503: "Take Good Care of Him! A Letter From the Brother!",
	504: "To Live up to the Promise! Departures of Their Own!",
	505: "I Want to See Them! Luffy's Mournful Cry!",
	506: "Straw Hats in Shock! The Bad News Has Reached Them!",
	507: "Reunited With Dark King Rayleigh! Decision Time for Luffy!",
	508: "Back to Our Captain! A Jail Break at the Sky Island and the Incident on the Winter Island!",
	509: "Encounter! The Great Swordsman Mihawk! Zoro's Self-Willed Deadly Struggle!",
	510: "A Disaster for Sanji! The Queen's Return to the Kingdom!",
	511: "Unexpected Relanding! Luffy, to Marineford!",
	512: "With Hopes It Will Reach My Friends! Big News Spreading Fast!",
	513: "Pirates Get On the Move! Astounding New World!",
	514: "Living Through Hell! Sanji's Fight for His Manhood!",
	515: "I Will Get Much, Much Stronger! Zoro's Pledge to His Captain!",
	516: "Luffy's Training Begins! To the Place We Promised in 2 Years!",
	517: "The Beginning of the New Chapter! The Straw Hats Reunited!",
	518: "An Explosive Situation! Luffy vs. Fake Luffy!",
	519: "The Navy Has Set Out! The Straw Hats in Danger!",
	520: "Big Guns Assembled! The Danger of the Fake Straw Hats!",
	521: "The Battle Is On! Show Them What You Got From Training!",
	522: "Everyone Together! Luffy, Setting Out for the New World!",
	523: "A Surprising Fact! The Man Who Guarded the Sunny!",
	524: "Deadly Combat Under the Sea! The Demon of the Ocean Strikes!",
	525: "Lost in the Deep Sea! The Straw Hats Get Separated!",
	526: "Undersea Volcanic Eruption! Drifting to the Fish-Man Island!",
	527: "Landing at the Fish-Man Island! Beautiful Mermaids!",
	528: "Excitement Blow-Out! Sanji's Life Under Threat!",
	529: "The Fish-Man Island Will Be Annihilated?! Sharley's Prophecy!",
	530: "The King of the Fish-Man Island! Neptune, the God of the Sea!",
	531: "Ryugu Palace! Taken by the Shark That They Saved!",
	532: "A Coward and a Crybaby! The Princess in the Hard Shell Tower!",
	533: "It's an Emergency! The Ryugu Palace Is Occupied!",
	534: "The Ryugu Palace in Shock! The Kidnapping of Shirahoshi!",
	535: "Hordy's Onslaught! The Retaliatory Plan Set Into Motion!",
	536: "The Battle in the Ryugu Palace! Zoro vs. Hordy!",
	537: "Keep Shirahoshi Safe! Decken Close Behind!",
	538: "The Straw Hats Defeated?! Hordy Gains Control of the Ryugu Palace!",
	539: "The Haunting Ties! Nami and the Fish-Man Pirates!",
	540: "A Hero Who Freed the Slaves! An Adventurer Tiger!",
	541: "Kizaru Appears! A Trap to Catch Tiger!",
	542: "A Team Is Formed! Save Chopper",
	543: "The Death of the Hero! A Shocking Truth of Tiger!",
	544: "The Sun Pirates Split! Jimbei vs. Arlong!",
	545: "Shaking Fish-Man Island! A Celestial Dragon Drifts In!",
	546: "A Sudden Tragedy! A Gunshot Shuts Down the Future!",
	547: "Back to the Present! Hordy Makes a Move!",
	548: "The Kingdom in Shock! An Order to Execute Neptune Issued!",
	549: "A Rift Opens Up! Luffy vs. Jimbei!",
	550: "Something Has Happened to Hordy! The True Power of the Evil Drug!",
	551: "The Battle Is On! At Conchcorde Plaza!",
	552: "Surprising Confession! The Truth Behind the Assassination of Otohime!",
	553: "Shirahoshi's Tears! Luffy Finally Shows Up!",
	554: "A Great Clash! The Straw Hat Crew vs. 100,000 Enemies",
	555: "Deadly Attacks One After Another! Zoro and Sanji Join the Battle!",
	556: "Unveiled! The Secret Weapons of the Sunny!",
	557: "Iron Pirate! Here Comes General Franky!",
	558: "The Noah Closing In! The Fish-Man Island Facing Destruction!",
	559: "Hurry Up, Luffy! Shirahoshi's Life in Jeopardy!",
	560: "The Fierce Fight Begins! Luffy vs. Hordy!",
	561: "A Massive Confused Fight! The Straw Hats vs. the New Fish-Man Pirates!",
	562: "Luffy Loses the Fight?! Hordy's Long Awaited Revenge!",
	563: "A Shocking Fact! The True Identity of Hordy!",
	564: "Back to Zero! Earnest Wishes for Luffy!",
	565: "Luffy's All-Out Attack! Red Hawk Blasts!",
	566: "Coming to an End! The Final Decisive Battle Against Hordy!",
	567: "Stop, Noah! Desperate Elephant Gatling!",
	568: "To the Future! The Path to the Sun!",
	569: "The Secret Revealed! The Truth About the Ancient Weapon!",
	570: "The Straw Hats Stunned! The New Fleet Admiral of the Navy!",
	571: "She Loves Sweets! Big Mom of the Four Emperors!",
	572: "Many Problems Lie Ahead! A Trap Awaiting in the New World!",
	573: "Finally Time to Go! Goodbye, Fish-Man Island!",
	574: "To the New World! Heading for the Ultimate Sea!",
	575: "Z's Ambition! Lily the Little Giant!",
	576: "Z's Ambition! A Dark and Powerful Army!",
	577: "Z's Ambition! A Great and Desperate Escape Plan!",
	578: "Z's Ambition! Luffy vs. Shuzo!",
	579: "Arriving! A Burning Island - Punk Hazard!",
	580: "A Battle in the Heat! Luffy vs. the Giant Dragon!",
	581: "The Straw Hats Stunned! Enter: A Samurai's Horrifying Severed Head!",
	582: "Startling! The Secret of the Island Is Finally Revealed!",
	583: "Save the Children! The Straw Hats Start to Fight!",
	584: "A Swordplay Showdown! Brook vs. the Mysterious Torso Samurai!",
	585: "The Warlord! Trafalgar Law!",
	586: "In a Real Pinch! Luffy Sinks Into the Ice-Cold Lake!",
	587: "A Collision! Law vs. Vice Admiral Smoker!",
	588: "Meeting Again After Two Years! Luffy and Law!",
	589: "The Worst in the World! A Scientist of Terror - Caesar!",
	590: "History's Strongest Collaboration vs. Glutton of the Sea",
	591: "Chopper's Fury! The Master's Inhumane Experiment!",
	592: "To Annihilate the Straw Hats! Legendary Assassins Descend!",
	593: "Save Nami! Luffy's Fight on the Snow-Capped Mountains!",
	594: "Formed! Luffy and Law's Pirate Alliance!",
	595: "Capture M! The Pirate Alliance's Operation Launches!",
	596: "On the Verge of Annihilation! A Deadly Monster Comes Flying In!",
	597: "An Intense Battle! Caesar Exercises His True Power!",
	598: "A Samurai Who Can Cut Fire! Foxfire Kin'emon!",
	599: "Shocking! The True Identity of the Mystery Man Vergo!",
	600: "Save the Children! The Master's Evil Hands Close In!",
	601: "Shaking up the New World! Caesar's Horrendous Experiment!",
	602: "The Deadliest Weapon of Mass Destruction in History! Shinokuni!",
	603: "Launching the Counter Attack! Luffy and Law's Great Escape!",
	604: "Get to Building R! The Pirate Alliance's Great Advance!",
	605: "Tashigi's Tears! G-5's Desperate Breakthrough Plan!",
	606: "The Treacherous Vice Admiral! Demon Bamboo Vergo!",
	607: "A Fierce Battle Gets Heated! Luffy vs. Caesar!",
	608: "A Mastermind Underground! Doflamingo Makes His Move!",
	609: "Luffy Dies From Exposure?! The Spine-Chilling Snow Woman Monet!",
	610: "Fists Collide! A Battle of the Two Vice Admirals!",
	611: "A Small Dragon! Momonosuke Appears!",
	612: "A Deadly Fight in a Blizzard! The Straw Hats vs. the Snow Woman!",
	613: "Showing Off His Techniques! Zoro's Formidable One-Sword Style!",
	614: "To Save Her Friends! Mocha Runs at the Risk of Her Life!",
	615: "Brownbeard in Grief! Luffy Lands a Furious Blow!",
	616: "A Surprising Outcome! Smoker vs. Vergo!",
	617: "Caesar's Defeat! The Powerful Grizzly Magnum!",
	618: "Raid! An Assassin From Dressrosa!",
	619: "Running Wild! Invincible General Franky!",
	620: "A Critical Situation! Punk Hazard Explodes!",
	621: "Capture Caesar! General Cannon Blasts!",
	622: "A Touching Reunion! Momonosuke and Kin'emon!",
	623: "It's Time to Say Goodbye! Leaving Punk Hazard!",
	624: "The G-5 Wiped Out! Doflamingo's Sudden Attack!",
	625: "Intense! Aokiji vs. Doflamingo!",
	626: "Caesar Goes Missing! The Pirate Alliance Makes a Sortie!",
	627: "Luffy Dies at Sea!? The Pirate Alliance Comes Apart!",
	628: "A Major Turnaround! Luffy's Angry Iron Fist Strikes!",
	629: "Startling! The Big News Shakes up the New World!",
	630: "Explore! A Kingdom of Love and Passion Dressrosa!",
	631: "Full of Enthusiasm! The Corrida Colosseum",
	632: "A Dangerous Love! The Dancer Girl - Violet!",
	633: "A Formidable, Unknown Warrior! Here Comes Lucy!",
	634: "A Pirate Noble! Cavendish!",
	635: "The Fateful Reunion! Bellamy the Hyena!",
	636: "A Super Rookie! Bartolomeo the Cannibal!",
	637: "Big Names Duke It Out! The Heated Block B Battle!",
	638: "A Deadly Blow! The Astonishing King Punch!",
	639: "The Fighting Fish Strike! Across the Deadly Iron Bridge!",
	640: "Explore! Fairies' Island - Green Bit!",
	641: "The Unknown World! The Tontatta Kingdom!",
	642: "The Stratagem of the Century! Doflamingo Makes His Move!",
	643: "Shaking Heaven and Earth! Admiral Fujitora's Power!",
	644: "A Blow of Anger! A Giant vs. Lucy!",
	645: "Destruction Cannon Blasts! Lucy in Trouble!",
	646: "The Legendary Pirate! Don Chinjao!",
	647: "Light and Shadow! Darkness Behind Dressrosa!",
	648: "Making a Sortie! The Legendary Hero Usoland!",
	649: "The Fierce Battle Coming to the End! Lucy vs. Chinjao!",
	650: "Luffy and the Gladiator of Fate - Rebecca!",
	651: "Protect You to the End! Rebecca and the Toy Soldier!",
	652: "The Last - and Bloodiest - Block! Block D Battle Begins!",
	653: "A Decisive Battle! Giolla vs. the Straw Hats!",
	654: "Beautiful Sword! Cavendish of the White Horse!",
	655: "A Big Clash! Sanji vs. Doflamingo",
	656: "Rebecca's Special Attack! Last-Ditch Sword Dance!",
	657: "The Most Violent Fighter! Logan vs. Rebecca!",
	658: "A Big Surprise! The True Identity of the Toy Soldier!",
	659: "A Horrible Past! The Secret of Dressrosa",
	660: "A Nightmare! The Tragic Night of Dressrosa!",
	661: "A Showdown Between the Warlords! Law vs. Doflamingo!",
	662: "Two Great Rivals Meet Each Other! Straw Hat and Heavenly Demon!",
	663: "Luffy Astonished! The Man Who Inherits Ace's Will!",
	664: "Operation SOP Starts! Usoland Charges Forth!",
	665: "A Burning Passion! Rebecca vs. Suleiman!",
	666: "The End of the Match?! A Surprising Result of Block D!",
	667: "The Admiral's Decision! Fujitora vs. Doflamingo!",
	668: "The Final Round Starts! Diamante the Hero Shows Up!",
	669: "A Moving Castle! The Top Executive Pica Rises Up!",
	670: "Dragon Claw Strikes! Lucy's Intimidating Attack!",
	671: "Defeat Sugar! The Army of the Little People Charges!",
	672: "The Last Light of Hope! The Secret of Our Commander!",
	673: "The Rupture Human! Gladius Blows up Big Time!",
	674: "A Liar! Usoland on the Run!",
	675: "A Fateful Encounter! Kyros and King Riku!",
	676: "Operation Failed! Usoland the Hero Dies!?",
	677: "The Legend Is Back! Kyros' All-Out Attack!",
	678: "The Fire Fist Strikes! The Flare-Flare Fruit Power Returns!",
	679: "Dashing Onto the Scene! The Chief of Staff of the Revolutionary Army, Sabo!",
	680: "The Devil's Trap! A Dressrosa Extermination Plan!",
	681: "The 500 Million Berry Man! Target: Usoland!",
	682: "Breaking Through Enemy Lines! Luffy and Zoro Launch the Counter-Attack!",
	683: "With a Rumbling of the Ground! The God of Destruction - Giant Pica Descends!",
	684: "Gathering Into a Powerful Front! Luffy and a Group of Brutal Warriors!",
	685: "Steady Progress! Luffy's Army vs. Pica!",
	686: "A Shocking Confession! Law's Soulful Vow!",
	687: "A Big Collision! Chief of Staff - Sabo vs. Admiral Fujitora!",
	688: "A Desperate Situation! Luffy Gets Caught in a Trap!",
	689: "A Great Escape! Luffy's Tide-Turning Elephant Gun!",
	690: "A United Front! Luffy's Breakthrough to the Victory!",
	691: "The Second Samurai! Evening Shower Kanjuro Appears",
	692: "A Hard-Fought Battle Against Pica! Zoro's Deadly Attack!",
	693: "The Little People's Princess! Captive Mansherry!",
	694: "Invincible! A Gruesome Army of Headcracker Dolls!",
	695: "Risking Their Lives! Luffy Is the Trump Card for Victory!",
	696: "A Tearful Reunion! Rebecca and Kyros!",
	697: "One Shot One Kill! The Man Who Will Save Dressrosa!",
	698: "Anger Erupts! Luffy and Law's Ultimate Stratagem!",
	699: "A Noble Family! The True Identity of Doflamingo!",
	700: "The Ultimate Power! The Secret of the Op-Op Fruit!",
	701: "Sad Memories! Law the Boy From the White Town!",
	702: "A Celestial Dragon! Doffy's Stormy Past",
	703: "A Rocky Road! Law and Corazon's Journey of Life!",
	704: "The Time Is Ticking Down! Seize the Op-Op Fruit!",
	705: "The Moment of Resolution! Corazon's Farewell Smile!",
	706: "Advance, Law! The Kindhearted Man's Final Fight!",
	707: "To Be Free! Law's Injection Shot Blasts!",
	708: "An Intense Battle! Law vs. Doflamingo!",
	709: "A Decisive Battle Against the Executives! Proud Hajrudin!",
	710: "The Battle of Love! The New Leader Sai vs. Baby 5!",
	711: "The Man's Pride! Bellamy's Last Charge!",
	712: "A Strong Wind and a Surge! Hakuba vs. Dellinger!",
	713: "Barrier-Barrier! Homage God Fist Strikes!",
	714: "The Healing Princess! Save Mansherry!",
	715: "The Manly Duel! Señor's Elegy of Love!",
	716: "Stardust of Death! Diamante's Storm of Vicious Attacks!",
	717: "Trueno Bastardo! Kyros' Furious Strike!",
	718: "Moving Across the Ground! The Giant Statue Pica's Surprise Maneuver!",
	719: "A Decisive Battle in Midair! Zoro's New Special Secret Technique Blasts!",
	720: "So Long! Bellamy's Farewell Blow!",
	721: "Law Dies! Luffy's Raging Onslaught!",
	722: "A Blade of Tenacity! The Gamma Knife Counterattack!",
	723: "A Collision of Haki! Luffy vs. Doflamingo!",
	724: "Unassailable! The Stunning Secret of Trebol!",
	725: "Anger Erupts! I Will Take Everything Upon Myself!",
	726: "Fourth Gear! The Phenomenal Bounce-Man!",
	727: "A Massive Counterattack! Doflamingo's Awakening!",
	728: "Luffy! An All-Out Leo Bazooka!",
	729: "Flame Dragon King! Protect Luffy's Life!",
	730: "Tears of Miracles! Mansherry's Fight!",
	731: "As Long as We Breathe! Stop the Deadly Birdcage!",
	732: "Dead or Alive! A Fateful Countdown!",
	733: "Attack on a Celestial! Luffy's King Kong Gun of Anger!",
	734: "To Be Free! Dressrosa's Delight!",
	735: "The Unheard-Of! Admiral Fujitora's Surprising Decision!",
	736: "Sending a Shock Wave! The Worst Generation Goes Into Action!",
	737: "The Birth of the Legend! The Adventures of the Revolutionary Warrior Sabo!",
	738: "The Brothers' Bond! The Untold Story Behind Luffy and Sabo's Reunion!",
	739: "The Strongest Creature! One of the Four Emperors - Kaido, King of the Beasts!",
	740: "Fujitora Takes Action! The Complete Siege of the Straw Hats!",
	741: "A State of Emergency! Rebecca Is Kidnapped!",
	742: "The Bond Between Father and Daughter! Kyros and Rebecca!",
	743: "Men's Pride! Luffy vs. Fujitora, Head-to-Head!",
	744: "No Way Out! Admiral Fujitora's Ruthless Pursuit!",
	745: "Sons' Cups! Straw Hat Fleet Is Formed!",
	746: "The Numerous Rivals Struggle Amongst Themselves! The Raging Monsters of the New World",
	747: "The Silver Fortress! Luffy and Barto's Great Adventure!",
	748: "An Underground Maze! Luffy vs. the Tram Human!",
	749: "The Sword Technique Heats Up! Law and Zoro Finally Appear!",
	750: "A Desperate Situation! Luffy Fights a Battle in Extreme Heat!",
	751: "Curtain-up on a New Adventure! Arriving at the Phantom Island, Zou!",
	752: "The New Warlord! The Legendary Whitebeard's Son Appears!",
	753: "A Deadly Elephant Climb! A Great Adventure on the Back of the Giant Elephant!",
	754: "A Battle Begins! Luffy vs. the Mink Tribe!",
	755: "Garchu! The Straw Hats Reunite!",
	756: "Start to Counterattack! Great Moves by the Twirly Hat Crew!",
	757: "A Threat Descends! The Beast Pirates, Jack!",
	758: "The King of the Day! Duke Dogstorm Appears!",
	759: "The King of the Night! Master Cat Viper Emerges!",
	760: "The Exterminated Capital! The Twirly Hat Crew Arrive!",
	761: "The Time Limit Closes In! The Bond Between the Mink Tribe and the Crew!",
	762: "The Delinquent Comes Home! Emperor Big Mom's Assassins!",
	763: "The Truth Behind the Disappearance! Sanji Gets a Startling Invitation!",
	764: "To My Buds! Sanji's Farewell Note!",
	765: "Let's Go and Meet Master Cat Viper!",
	766: "Luffy's Decision! Sanji on the Brink of Quitting!",
	767: "A Volatile Situation! The Dog and the Cat and the Samurai",
	768: "The Third One! Raizo of the Mist, the Ninja, Appears!",
	769: "A Red Stone! A Guide to the One Piece!",
	770: "The Secret of the Land of Wano! The Kozuki Family and the Poneglyphs!",
	771: "A Vow Between Two Men! Luffy and Kozuki Momonosuke!",
	772: "The Legendary Journey! The Dog and the Cat and the Pirate King!",
	773: "The Nightmare Returns! The Invincible Jack's Fierce Attack!",
	774: "A Battle to Defend Zou! Luffy and Zunesha!",
	775: "Save Zunesha! The Straw Hat's Rescue Operation!",
	776: "Saying Goodbye and Descending From the Elephant! Setting Out to Take Back Sanji!",
	777: "To the Reverie! Princess Vivi and Princess Shirahoshi!",
	778: "To the Reverie! Rebecca and the Sakura Kingdom!",
	779: "Kaido Returns! An Imminent Threat to the Worst Generation!",
	780: "A Hungry Front! Luffy and the Navy Rookies!",
	781: "The Implacable Three! A Big Chase After the Straw Hats!",
	782: "The Devil's Fist! A Show Down! Luffy vs. Grount!",
	783: "Sanji's Homecoming! Into Big Mom's Territory!",
	784: "Zero and Four! Encountering Germa 66!",
	785: "A Deadly Poison Crisis! Luffy and Reiju!",
	786: "Totto Land! Emperor Big Mom Appears!",
	787: "The Emperor's Daughter! Sanji's Fiancée - Pudding!",
	788: "A Massive Attack! Mom's Hunger Pangs!",
	789: "The Capital City Falls?! Big Mom and Jimbei",
	790: "The Emperor's Castle! Arriving at the Whole Cake Island!",
	791: "A Mysterious Forest Full of Candies! Luffy vs. Luffy?!",
	792: "Mom's Assassin! Luffy and the Seducing Woods!",
	793: "A Seafaring Kingdom! Germa's King Judge!",
	794: "A Battle Between Father and Son! Judge vs. Sanji!",
	795: "A Giant Ambition! Big Mom and Caesar!",
	796: "The Land of Souls! Mom's Fatal Ability!",
	797: "A Top Officer! The Sweet 3 General Cracker Appears!",
	798: "An Enemy Worth 800 Million! Luffy vs. Thousand Armed Cracker!",
	799: "An All-Out Duel! Gear Four vs. the Bis-Bis Ability!",
	800: "The First and the Second Join! The Vinsmoke Family",
	801: "The Benefactor's Life! Sanji and Owner Zeff!",
	802: "An Angry Sanji! The Secret of Germa 66!",
	803: "The Past That He Let Go Of! Vinsmoke Sanji!",
	804: "To the East Blue! Sanji's Resolute Departure!",
	805: "A Battle of Limits! Luffy and the Infinite Biscuits!",
	806: "The Power of Satiety! A New Gear Four Form - Tank Man!",
	807: "A Heartbreaking Duel! Luffy vs. Sanji! - Part 1",
	808: "A Heartbreaking Duel! Luffy vs. Sanji! - Part 2",
	809: "A Storm of Revenge! An Enraged Army Comes to Attack!",
	810: "The End of the Adventure! Sanji's Resolute Proposal!",
	811: "I'll Wait Here! Luffy vs. the Enraged Army!",
	812: "Invading the Chateau! Reach the Road Ponegliff!",
	813: "A Fateful Confrontation! Luffy and Big Mom!",
	814: "Shout of the Soul! Brook and Pedro's Lightning Operation!",
	815: "Goodbye! Pudding's Tearful Determination!",
	816: "The History of the Left Eye! Pedro vs. Baron Tamago!",
	817: "Moist Cigarette! The Night Before Sanji's Wedding!",
	818: "The Undaunted Soul! Brook vs. Big Mom!",
	819: "Sora's Wish! Germa's Failure - Sanji!",
	820: "To Reach Sanji! Luffy's Vengeful Hell-Bent Dash!",
	821: "The Chateau in Turmoil! Luffy, to the Rendezvous!",
	822: "Deciding to Say Goodbye! Sanji and His Straw Hat Bento!",
	823: "The Emperor Rolls Over! Rescue Brook Mission!",
	824: "The Rendezvous! Luffy, a One-on-One at His Limit!",
	825: "A Liar! Luffy and Sanji!!",
	826: "Sanji Comes Back! Crash! The Tea Party From Hell!",
	827: "A Secret Meeting! Luffy vs. the Fire Tank Pirates!",
	828: "The Deadly Pact! Luffy & Bege's Allied Forces!",
	829: "Luffy Engages in a Secret Maneuver! The Wedding Full of Conspiracies Starts Soon!",
	830: "The Family Gets Together! The Hellish Tea Party Starts!",
	831: "The Broken Couple! Sanji and Pudding Enter!",
	832: "A Deadly Kiss! The Mission to Assassinate the Emperor Kicks Off!",
	833: "Returning the Sake Cup! The Manly Jimbei Pays His Debt!",
	834: "The Mission Failed?! The Big Mom Pirates Strike Back!",
	835: "Run, Sanji! SOS! Germa 66!",
	836: "Mom's Secret! The Giant's Island Elbaph and a Little Monster!",
	837: "The Birth of Mom! The Day That Carmel Vanished!",
	838: "The Launcher Blasts! The Moment of Big Mom's Assassination!",
	839: "The Evil Army! Transform! Germa 66!",
	840: "Cutting the Father-Son Relationship! Sanji and Judge!",
	841: "Escape From the Tea Party! Luffy vs. Big Mom!",
	842: "The Execution Begins! Luffy's Allied Forces Are Annihilated?!",
	843: "The Chateau Collapses! The Straw Hat's Great Escape Begins!",
	844: "The Spear of Elbaph! Onslaught! The Flying Big Mom!",
	845: "Pudding's Determination! Ablaze! The Seducing Woods!",
	846: "A Lightning Counterattack! Nami and Zeus the Thundercloud!",
	847: "A Coincidental Reunion! Sanji and the Lovestruck Evil Pudding!",
	848: "Save the Sunny! Fighting Bravely! Chopper and Brook!",
	849: "Before the Dawn! Pedro, the Captain of the Guardians!",
	850: "I'll Be Back! Luffy, Deadly Departure!",
	851: "The Man With a Bounty of Billion! The Strongest Sweet General, Katakuri!",
	852: "A Hard Battle Starts! Luffy vs. Katakuri!",
	853: "The Green Room! An Invincible Helmsman, Jimbei!",
	854: "The Threat of the Mole! Luffy's Silent Fight!",
	855: "The End of the Deadly Battle?! Katakuri's Awakening in Anger!",
	856: "The Forbidden Secret! Katakuri's Merienda!",
	857: "Luffy Fights Back! The Invincible Katakuri's Weak Point!",
	858: "Another Crisis! Gear Four vs. Unstoppable Donuts!",
	859: "The Rebellious Daughter, Chiffon! Sanji's Big Plan for Transporting the Cake!",
	860: "A Man's Way of Life! Bege and Luffy's Determination as Captains!",
	861: "The Cake Sank?! Sanji and Bege's Getaway Battle!",
	862: "Sulong! Carrot's Big Mystic Transformation!",
	863: "Break Through! The Straw Hats' Mighty Sea Battle!",
	864: "Finally, the Clash! The Emperor of the Sea vs. the Straw Hats!",
	865: "Dark King's Direct Precepts! The Battle Against Katakuri Turns Around!",
	866: "Finally He Returns! Sanji, the Man Who'll Stop the Emperor of the Sea!",
	867: "Lurking in the Darkness! An Assassin Targeting Luffy!",
	868: "One Man's Determination! Katakuri's Deadly Big Fight!",
	869: "Wake Up! The Color of Observation Able To Top the Strongest!",
	870: "A Fist of Divine Speed! Another Gear Four Application Activated!",
	871: "Finally, It's Over! The Climax of the Intense Fight Against Katakuri!",
	872: "A Desperate Situation! The Iron-Tight Entrapment of Luffy!",
	873: "Pulling Back From the Brink! The Formidable Reinforcements - Germa!",
	874: "The Last Hope! The Sun Pirates Emerge!",
	875: "A Captivating Flavor! Sanji's Cake of Happiness!",
	876: "The Man of Humanity and Justice! Jimbei, a Desperate Massive Ocean Current",
	877: "The Parting Time! Pudding's Last Wish!",
	878: "The World in Shock! The Fifth Emperor of the Sea Arrives!",
	879: "To the Reverie! The Straw Hats' Sworn Allies Come Together!",
	880: "Sabo Goes Into Action! All the Captains of the Revolutionary Army Appear!",
	881: "Going Into Action! The Implacable New Admiral of the Fleet - Sakazuki!",
	882: "The Paramount War! The Inherited Will of the King of the Pirates!",
	883: "One Step Forward for Her Dream! Shirahoshi Goes Out in the Sun!",
	884: "I Miss Him! Vivi and Rebecca's Sentiments!",
	885: "In the Dark Recesses of the Holyland! A Mysterious Giant Straw Hat!",
	886: "The Holyland in Tumult! The Targeted Princess Shirahoshi!",
	887: "An Explosive Situation! Two Emperors of the Sea Going After Luffy!",
	888: "Sabo Enraged! The Tragedy of the Revolutionary Army Officer Kuma!",
	889: "Finally, It Starts! The Conspiracy-Filled Reverie!",
	890: "Marco! The Keeper of Whitebeard's Last Memento!",
	891: "Climbing up a Waterfall! A Great Journey Through the Land of Wano's Sea Zone!",
	892: "The Land of Wano! To the Samurai Country Where Cherry Blossoms Flutter!",
	893: "Otama Appears! Luffy vs. Kaido's Army!",
	894: "He'll Come! The Legend of Ace in the Land of Wano!",
	895: "Side Story! The World's Greatest Bounty Hunter, Cidre!",
	896: "Side Story! Clash! Luffy vs. the King of Carbonation!",
	897: "Save Otama! Straw Hat, Bounding Through the Wasteland!",
	898: "The Headliner! Hawkins the Magician Appears!",
	899: "Defeat Is Inevitable! The Strawman's Fierce Attack!",
	900: "The Greatest Day of My Life! Otama and Her Sweet Red-Bean Soup!",
	901: "Charging Into the Enemy's Territory! Bakura Town - Where Officials Thrive!",
	902: "The Yokozuna Appears! The Invincible Urashima Goes After Okiku!",
	903: "A Climatic Sumo Battle! Straw Hat vs. the Strongest Ever Yokozuna!",
	904: "Luffy Rages! Rescue Otama From Danger!",
	905: "Taking Back Otama! A Fierce Fight Against Holdem!",
	906: "Duel! The Magician and the Surgeon of Death!",
	907: "20th Anniversary Special! Romance Dawn",
	908: "The Coming of the Treasure Ship! Luffytaro Returns the Favor!",
	909: "Mysterious Grave Markers! A Reunion at the Ruins of Oden Castle!",
	910: "A Legendary Samurai! The Man Who Roger Admired!",
	911: "Bringing Down the Emperor of the Sea! A Secret Raid Operation Begins!",
	912: "The Strongest Man in the World! Shutenmaru, the Thieves Brigade Chief!",
	913: "Everyone Is Annihilated! Kaido's Furious Blast Breath!",
	914: "Finally Clashing! The Ferocious Luffy vs. Kaido!",
	915: "Destructive! One Shot, One Kill - Thunder Bagua!",
	916: "A Living Hell! Luffy, Humiliated in the Great Mine!",
	917: "The Holyland in Tumult! Emperor of the Sea Blackbeard Cackles!",
	918: "It's On! The Special Operation To Bring Down Kaido!",
	919: "Rampage! The Prisoners - Luffy and Kid!",
	920: "A Great Sensation! Sanji's Special Soba!",
	921: "Luxurious and Gorgeous! Wano's Most Beautiful Woman - Komurasaki!",
	922: "A Tale of Chivalry! Zoro and Tonoyasu's Little Trip!",
	923: "A State of Emergency! Big Mom Closes In!",
	924: "The Capital in an Uproar! Another Assassin Targets Sanji!",
	925: "Dashing! The Righteous Soba Mask!",
	926: "A Desperate Situation! Orochi's Menacing Oniwabanshu!",
	927: "Pandemonium! The Monster Snake, Shogun Orochi!",
	928: "The Flower Falls! The Final Moment of the Most Beautiful Woman in the Land of Wano!",
	929: "The Bond Between Prisoners! Luffy and Old Man Hyo!",
	930: "A Lead Performer! Queen the Plague Emerges!",
	931: "Climb Up! Luffy's Desperate Escape!",
	932: "Dead or Alive! Queen's Sumo Inferno!",
	933: "Gyukimaru! Zoro Fights a Duel on Bandit's Bridge!",
	934: "A Big Turnover! The Three-Sword Style Overcomes Danger!",
	935: "Zoro, Stunned! The Shocking Identity of the Mysterious Woman!",
	936: "Get the Hang of It! The Land of Wano's Haki - Ryuo!",
	937: "Tonoyasu! Ebisu Town's Most Loved!",
	938: "Shaking the Nation! The Identity of Ushimitsu Kozo the Chivalrous Thief!",
	939: "The Straw Hats Run! Save the Captive Tonoyasu!",
	940: "Zoro's Fury! The Truth About the Smile!",
	941: "Toko's Tears! Orochi's Pitiless Bullets!",
	942: "The Straw Hats Step In! An Uproarious Deadly Battle at the Execution Ground!",
	943: "Luffy's Determination! Win Through the Sumo Inferno!",
	944: "The Storm Has Come! A Raging Big Mom!",
	945: "A Grudge Over Red-bean Soup! Luffy Gets Into a Desperate Situation!",
	946: "Stop the Emperor of the Sea! Queen's Secret Plan!",
	947: "Brutal Ammunition! The Plague Rounds Aim At Luffy!",
	948: "Start Fighting Back! Luffy and the Akazaya Samurai!",
	949: "We're Here To Win! Luffy's Desperate Scream!",
	950: "Warriors' Dream! Luffy's Conquer of Udon!",
	951: "Orochi's Hunting Party! The Ninja Group vs. Zoro!",
	952: "Tension Rises in Onigashima! Two Emperors of the Sea Meet?!",
	953: "Hiyori's Confession! A Reunion at Bandit's Bridge!",
	954: "Its Name Is Enma! Oden's Great Swords!",
	955: "A New Alliance?! Kaido's Army Gathers!",
	956: "Ticking Down to the Great Battle! The Straw Hats Go Into Combat Mode!",
	957: "Big News! An Incident That Will Affect the Seven Warlords!",
	958: "A Legendary Battle! Garp and Roger!",
	959: "The Rendezvous Port! The Land of Wano Act Three Begins!",
	960: "The Number-One Samurai in the Land of Wano! Here Comes Kozuki Oden!",
	961: "Tearfully Swearing Allegiance! Oden and Kin'emon!",
	962: "Changing Destiny! The Whitebeard Pirates Cast Ashore!",
	963: "Oden's Determination! Whitebeard's Test!",
	964: "Whitebeard's Little Brother! Oden's Great Adventure!",
	965: "Crossing Swords! Roger and Whitebeard!",
	966: "Roger's Wish! A New Journey!",
	967: "Devoting His Life! Roger's Adventure!",
	968: "The King of the Pirates Is Born! Arriving at the Last Island!",
	969: "To the Land of Wano! The Roger Pirates Disband!",
	970: "Sad News! The Opening of the Great Pirate Era!",
	971: "Raid! Oden and the Akazaya Nine!",
	972: "The End of the Battle! Oden vs. Kaido!",
	973: "Boiled to Death! Oden's One-hour Struggle!",
	974: "Oden Wouldn't Be Oden if It Wasn't Boiled!",
	975: "The Castle on Fire! The Fate of the Kozuki Clan!",
	976: "Back to the Present Day! 20 Years Later!",
	977: "The Sea Is for Pirates! Raid! To Onigashima!",
	978: "The Worst Generation Charges In! The Battle of the Stormy Sea!",
	979: "Good Luck?! Leader Kin'emon's Plot!",
	980: "A Tearful Promise! The Kidnapped Momonosuke!",
	981: "A New Member! 'First Son of the Sea' Jimbei!",
	982: "Kaido's Trump Card! The Tobi Roppo Appear!",
	983: "The Samurai Warriors' Earnestness! The Straw Hats Land at Onigashima!",
	984: "Luffy Goes Out of Control?! Sneaking Into Kaido's Banquet!",
	985: "Thinking of Otama! Luffy's Furious Strike!",
	986: "Fighting Music! An Ability That Harms Luffy!",
	987: "His Dream Broken?! The Trap That Lures Sanji!",
	988: "Reinforcements Arrive! The Commander of the Whitebeard Pirates!",
	989: "The Pact Between Men! The Fierce Fighting of Brachio Tank!",
	990: "Thunder Bagua! Here Comes Kaido's Son!",
	991: "Enemy or Ally? Luffy and Yamato!",
	992: "Desire To Be Oden! Yamato's Dream!",
	993: "Explosive?! The Handcuffs That Shackle Yamato's Freedom!",
	994: "The Akazaya Face-off! Kikunojo vs. Kanjuro!",
	995: "Raid! Inheriting Oden's Will",
	996: "Onigashima in Tumult! Luffy's All-out War Begins!",
	997: "The Battle Under the Moon! The Berserker, Sulong the Moon Lion!",
	998: "Zeus' Treason?! The Cornered Nami!",
	999: "I'll Protect You! Yamato Meets Momonosuke!",
	1000: "Overwhelming Strength! The Straw Hats Come Together!",
	1001: "A Risky Invitation! A Plot to Eliminate Queen!",
	1002: "A New Rivalry! Nami and Ulti!",
	1003: "A Heroic Blade! Akazaya vs. Kaido, Again Once More!",
	1004: "An Inherited Technique! Unleashing Oden's Secret Swordplay!",
	1005: "The Power of the Ice Oni! A New Version of the Plague Rounds!",
	1006: "I Won't Forgive Him! Chopper's Determination!",
	1007: "Zoro's Pursuit! Ice Oni Tag!",
	1008: "Nami Surrenders?! Ulti's Fierce Headbutt!",
	1009: "Sasaki's Onslaught! Armored Division vs. Yamato!",
	1010: "Eliminate the Ice Oni! Chopper's Fire Trick!",
	1011: "It's Not Okay! The Spider Lures Sanji!",
	1012: "A Turnaround Move! The Flames of Marco the Phoenix!",
	1013: "Yamato's Past! The Man Who Came for an Emperor of the Sea!",
	1014: "Marco's Tears! The Bond of the Whitebeard Pirates!",
	1015: "Straw Hat Luffy! The Man Who Will Become the King of the Pirates!",
	1016: "The Battle of the Monsters! The Three Stubborn Captains!",
	1017: "A Barrage of Powerful Techniques! The Fierce Attacks of the Worst Generation!",
	1018: "Kaido Laughs! The Emperors of the Sea vs. New Generation!",
	1019: "Otama's Secret Plan! Operation Kibi Dango!",
	1020: "Sanji's Scream! An SOS Echoes Over the Island!",
	1021: "Spank Strikes! Sanji's Woman-trouble!",
	1022: "No Regrets! Luffy and Boss, a Master-Disciple Bond!",
	1023: "All Set! Chopperhage Nebulizer!",
	1024: "Oden Appears! The Confused Hearts of the Akazaya Members!",
	1025: "The Worst Generation Gets Wiped Out?! The Emperors' Deadly Attack!",
	1026: "The Supernovas Strike Back! The Mission to Tear Apart the Four Emperors!",
	1027: "Defend Luffy! Zoro and Law's Sword Technique!",
	1028: "Surpass the Emperor of the Sea! Luffy Strikes Back with an Iron Fist!",
	1029: "A Faint Memory! Luffy and Red-Haired's Daughter Uta!",
	1030: "A Pledge for the New Genesis! Luffy and Uta!",
	1031: "Nami Screams! A Deadly Death Race!",
	1032: "The Dawn of the Land of Wano - The All-Out Battle Heats Up!",
	1033: "The Conclusion! Luffy, Accelerating Fist of the Supreme King",
	1034: "Luffy Defeated! The Straw Hats in Jeopardy?!",
	1035: "The Animal Kingdom Pirates Trample Down! The End of the Kozuki Clan!",
	1036: "Fight Against the Dark Night! The Commander-in-Chief of the Land of Wano Sounds Off!",
	1037: "Believe in Luffy! The Alliance's Counterattack Begins!",
	1038: "Nami's Lethal Attack! Otama's Desperate Challenge!",
	1039: "A Dramatic Increase of Allies! Straw Hats Fight Back!",
	1040: "The Pride of a Helmsman? The Enraged Jinbei!",
	1041: "Showdown Battles of the Monsters! Yamato and Franky",
	1042: "The Predator's Trap - Black Maria's Temptation",
	1043: "Slash the Nightmare - Brook Draws His Freezing Sword!",
	1044: "Clutch! A Demon Incarnate, Robin!",
	1045: "A Spell! Kid and Zoro Facing Threats!",
	1046: "Taking a Chance! The Two Arms Go into Battle!",
	1047: "Ascend to the Dawn! A Pink Dragon Gets Agitated",
	1048: "For the Future! Yamato and the Great Swordsmen's Pledge",
	1049: "Luffy Soars! Revenge Against the King of the Beasts",
	1050: "Two Dragons Face Off! Momonosuke's Determination!",
	1051: "A Legend All Over Again! Luffy's Fist Roars in the Sky!",
	1052: "The Situation Has Grown Tense! The End of Onigashima!",
	1053: "Sanji's Mutation? The Two Arms in Crisis!",
	1054: "Death to Your Partner! Killer's Deadly Gamble!",
	1055: "A Shadowy Figure Pulls the Strings! Onigashima in Flames",
	1056: "A Countercharge! Law and Kid's Return-Attack Combination",
	1057: "For Luffy? Sanji and Zoro's Oath",
	1058: "The Onslaught of Kazenbo - Orochi's Evil Clutches Close in",
	1059: "Zoro Faces Adversity - A Monster! King the Wildfire",
	1060: "The Secret of Enma! The Cursed Sword Entrusted to Zoro",
	1061: "The Strike of an Ifrit! Sanji vs. Queen",
	1062: "The Three-Sword Style of the Supreme King! Zoro vs. King",
	1063: "Luffy is on the Move! A Turning Point to a New Era!",
	1064: "Drunken Dragon Bagua! The Lawless Dragon Closing in on Luffy",
	1065: "The Destruction of the Alliance?! Fire up, the Will of the New Generation!",
	1066: "Here Comes the Main Act! Powerful Techniques of Shockwave and Magnetism",
	1067: "To the New Era! Settled! The Determination of the Brats",
	1068: "Moon Princess Echoes! The Final Phase of the Land of Wano!",
	1069: "There is Only One Winner - Luffy vs. Kaido",
	1070: "Luffy is Defeated?! The Determination of those Left Behind!",
	1071: "Luffy's Peak - Attained! Gear Five",
	1072: "The Ridiculous Power! Gear Five in Full Play",
	1073: "No Way Out! A Hellish Scene on Onigashima",
	1074: "I Trust Momo - Luffy's Final Powerful Technique!",
	1075: "20 Years Worth of Prayer! Take Back the Land Wano",
	1076: "The World That Luffy Wants!",
	1077: "The Curtain Falls! The Winner, Straw Hat Luffy!",
	1078: "He Returns! The Shogun of the Land of Wano, Kozuki Momonosuke",
	1079: "The Morning Comes! Luffy and the Others Rest!",
	1080: "A Celebration Banquet! The New Emperors of the Sea!",
	1081: "The World Will Burn! The Onslaught of a Navy Admiral!",
	1082: "The Coming of the New Era! The Red-Haired's Imperial Rage",
	1083: "The World That Moves On! A New Organization, Cross Guild",
	1084: "Time to Depart - The Land of Wano and the Straw Hats",
	1085: "The Last Curtain! Luffy and Momonosuke's Vow",
	1086: "A New Emperor! Buggy the Genius Jester!",
	1087: "The War on the Island of Women! A Case Involving Koby the Hero",
	1088: "Luffy's Dream",
	1089: "Entering a New Chapter! Luffy and Sabo's Paths!",
	1090: "A New Island! Future Island Egghead",
	1091: "Brimming with the Future! An Adventure on the Island of Science!",
	1092: "Bonney's Lamentation! Darkness Lurking on the Future Island",
	1093: "The Winner Takes All! Law vs. Blackbeard!",
	1094: "The Mystery Deepens! Egghead Labophase!",
	1095: "The Brain of a Genius - Six Vegapunks!",
	1096: "A Forbidden Piece of History! A Theory Concerning a Kingdom",
	1097: "The Will of Ohara! The Inherited Research",
	1098: "The Eccentric Dream of a Genius!",
	1099: "Preparations for Interception! Rob Lucci Strikes!",
	1100: "Powers on a Different Level! Luffy vs. Lucci!",
	1101: "The Strongest Form of Humanity! The Seraphim's Powers!",
	1102: "Sinister Schemes! The Operation to Escape Egghead",
	1103: "Turn Back My Father! Bonney's Futile Wish!",
	1104: "A Desperate Situation! The Seraphim's All-out Attack!",
	1105: "A Beautiful Act of Treason! The Spy, Stussy",
	1106: "Trouble Occurs! Seek Dr. Vegapunk!",
	1107: "A Shudder! The Evil Hand Creeping Up on the Laboratory",
	1108: "Incomprehensible! The Seraphim's Rebellion!",
	1109: "A Tough Decision! An Unusual United Front!",
	1110: "Survive! Deadly Combat with the Strongest Form of Humanity!",
	1111: "The Second Ohara! The Mastermind's Ambition!",
	1112: "Clash! Shanks vs. Eustass Kid",
	1113: "Run, Koby! A Desperate Escape Strategy!",
	1114: "For the Beloved Pupil - The Fist of Vice Admiral Garp!",
	1115: "The Navy Surprised! The Navy Headquarters' Former Admiral, Kuzan",
	1116: "Let's Go Get It! Buggy's Big Declaration",
	1117: "Sabo Returns - The Shocking Truth to Be Told!",
	1118: "The Holy Land in Tumult! Sai and Leo's Full-Power Blow!",
	1119: "The Entrusted Message! King Cobra's Resolve",
	1120: "The World Is Shaken! The Ruler's Judgment and the Five Elders' Actions!",
	1121: "Garp and Kuzan - A Master and a Pupil's Beliefs Clash",
	1122: "The Last Lesson! Impact Inherited",
	1123: "The World Shakes! The Straw Hats' Hostage Situation",
	1124: "Completely Surrounded! The Operation to Escape Egghead",
	1125: "A Clash of Two Men's Determination! Kizaru and Sentomaru",
	1126: "Looming Despair! Admiral Kizaru's Depressing Mission",
	1127: "Luffy Vs. Kizaru! A Fierce Kaleidoscopic Battle",
	1128: "The Nightmare Strikes - Godhead of Science & Defense, St. Saturn",
	1129: "Kuma's Past - Better Off Dead in This World",
	1130: "A History Erased! God Valley of Despair",
	1131: "A Fleeting Moment of Happiness - Kumachi and Ginny",
	1132: "A Pledge to Ginny - Kuma Becomes a Father",
	1133: "To Save His Daughter - Kuma the Timid Pacifist",
	1134: "Cruel Fate - Kuma's Decision as a Father",
	1135: "To the Sea Where My Father is! The Future Bonney Chooses",
	1136: "Kuma's Life",
	1137: "I'm Sorry, Dad - Bonney's Tears and Kuma's Fist",
	1138: "Thank You, Dad - Bonney and Kuma's Warm Embrace",
	1139: "Destroy Egghead - The Buster Call is Invoked",
	1140: "An Admired Hero - The Warrior of Liberation Who Saves Bonney",
	1141: "Reliable Reinforcements! Dorry and Brogy Arrive!",
	1142: "Come in, World - Vegapunk's Message",
	1143: "Vegapunk's Secret Plan - A Tense Worldwide Broadcast",
	1144: "The Worst Nightmare - The Five Elders Come Together",
	1145: "Friends Fight Together! Luffy and the Warriors of Elbaph",
	1146: "An Imminent Threat - Stussy and Edison's Resolve",
	1147: "A Stunning Conclusion - Vegapunk's Great Prediction",
	1148: "The Lost History - Joyboy, the First Pirate",
	1149: "The Void Century - A Revelation About a Sinking World",
	1150: "Get the Ship Moving! The Iron Giant Activates",
	1151: "Her and Her Father's Dream! Bonney's Free Future",
	1152: "Her Father and Mother's Legacy! Bonney's Nika Punch",
	1153: "The Upheaval of an Era! The Color of the Supreme King That Leads Luffy",
	1154: "The Truth Behind the Secret Plan - Vegapunk Claims Victory",
	1155: "The Promised Horizon - Off to the Long-Awaited Elbaph!",
	1156: "The Long-sought Elbaph! The Big Reunion Banquet!",
	1157: "Nami in a Fix! An Adventure in Block Kingdom",
	1158: "A Quest in the Land of Mystery! The Secret of the Sun God",
	1159: "Destroy the Miniature Garden - Escape Block Kingdom",
	1160: "An Encounter on a Snowfield - Loki, the Accursed Prince",
	1161: "A Dangerous Deal! Loki of the Underworld and Luffy",
	1162: "A Gargantuan Wave of Emotion - The Dreamlike Scenery of Elbaph",
	1163: "I Want You to Praise Me - The Reunion of Robin and Saul",
	1164: "Saul's Resolve - The Inherited Will of Ohara",
	1165: "A Welcome with Friends' Cups and Intruders Seeking Loki",
	1166: "Encountering Loki - Gunko of the Knights of God",
	1167: "Shamrock Appears - Commander of the Knights of God",
	1168: "Ancient History - The Harley Passed Down by Elbaph",
	1169: "The Legend Lurking in Elbaph - The Identity of the Mountain-Eater",
	1170: "Get the Key! Luffy vs. Scopper Gaban",
	1171: "Elbaph's Heinous Sinner - Loki of the Underworld Freed!?",
	1172: "Monsters Appear in Elbaph - 'What I Fear Most'",
	1173: "A Nightmarish Game - The Dark Plot of the Knights of God",
	1174: "Save the Children! The Elbaph Warriors Rise Up",
	1175: "Elbaph in Flames! Jinbe's Shoulder Throw Explodes!",
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
  // Theme state with localStorage persistence
  const [activeThemeId, setActiveThemeId] = useState(() => {
    return localStorage.getItem('op_tracker_theme') || 'classic';
  });
  const [showThemePicker, setShowThemePicker] = useState(false);

  // Watched items state
  const [watchedIds, setWatchedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('op_tracker_watched');
      return saved ? new Set(JSON.parse(saved)) : new Set(['arc-1', 'arc-2']);
    } catch {
      return new Set(['arc-1', 'arc-2']);
    }
  });

  // Skipped items state (not marked as watched/completed, but skipped in sequence)
  const [skippedIds, setSkippedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('op_tracker_skipped');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Micro-episode sub-progress: stores current absolute episode (e.g. { "arc-34": 585 })
  const [subProgress, setSubProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('op_tracker_subprogress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // User Wanted Poster Customization
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

  // Global Settings & Navigation
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('roadmap');
  const [expandedSagas, setExpandedSagas] = useState(() => new Set(SAGAS_DATA.map(s => s.id)));
  const [spoilerShield, setSpoilerShield] = useState(() => {
    return localStorage.getItem('op_spoiler_shield') !== 'false';
  });
  const [dailyPace, setDailyPace] = useState(3);

  // Modals & Refs
  const [showResetModal, setShowResetModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const fileInputRef = useRef(null);
  const posterCanvasRef = useRef(null);

  const theme = THEMES[activeThemeId] || THEMES.classic;

  // Persist settings
  useEffect(() => {
    localStorage.setItem('op_tracker_theme', activeThemeId);
  }, [activeThemeId]);

  useEffect(() => {
    localStorage.setItem('op_tracker_watched', JSON.stringify(Array.from(watchedIds)));
  }, [watchedIds]);

  useEffect(() => {
    localStorage.setItem('op_tracker_skipped', JSON.stringify(Array.from(skippedIds)));
  }, [skippedIds]);

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

  // Flattened item list in sequential order
  const allItems = useMemo(() => SAGAS_DATA.flatMap(s => s.items), []);

  // Total episode counts
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

  // Cumulative Watch Time Calculations
  const watchTimeStats = useMemo(() => {
    const minutesWatched = watchedEpisodesCount * 23.5;
    const hoursWatched = (minutesWatched / 60).toFixed(1);
    const daysEquivalent = (minutesWatched / (60 * 24)).toFixed(1);

    const skippedFillerEps = allItems
      .filter(item => item.type === 'filler' && (!watchedIds.has(item.id) || skippedIds.has(item.id)))
      .reduce((sum, item) => sum + (item.epCount || 0), 0);
    const fillerHoursSaved = ((skippedFillerEps * 20) / 60).toFixed(1);

    return {
      hoursWatched,
      daysEquivalent,
      fillerHoursSaved
    };
  }, [watchedEpisodesCount, allItems, watchedIds, skippedIds]);

  // Dynamic Bounty Calculation
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

  // Helper for item episode position
  const getItemCurrentEpisode = (item) => {
    if (watchedIds.has(item.id)) {
      return item.endEp || item.epCount;
    }
    if (item.startEp && item.endEp && subProgress[item.id] !== undefined) {
      return subProgress[item.id];
    }
    return null;
  };

  // Crew Unlocked calculation
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

  // Find the active "Up Next" item (skips completed AND explicitly skipped items)
  const upNextData = useMemo(() => {
    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      if (!watchedIds.has(item.id) && !skippedIds.has(item.id)) {
        const parentSaga = SAGAS_DATA.find(s => s.items.some(it => it.id === item.id));
        const isEpBased = Boolean(item.startEp && item.endEp);

        const currentEp = isEpBased
          ? (subProgress[item.id] !== undefined ? subProgress[item.id] : item.startEp)
          : null;

        const episodeTitle = isEpBased
          ? getEpisodeTitle(currentEp, item.title)
          : item.title;

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

  // Stepper logic for setting episode
  const handleSetCurrentEpisode = (item, newEpisode) => {
    if (!item.startEp || !item.endEp) return;

    if (newEpisode >= item.endEp) {
      setWatchedIds(prev => new Set(prev).add(item.id));
      setSkippedIds(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
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

  // Continuous Advancement: Advances +1 ep, or transitions to the next item in the watch order
  const advanceUpNext = () => {
    if (!upNextData) return;
    const { item, isEpBased, currentEp, endEp } = upNextData;

    if (isEpBased) {
      if (currentEp < endEp) {
        // Step within current arc
        handleSetCurrentEpisode(item, currentEp + 1);
        showToast(`Advanced to Episode ${currentEp + 1}!`);
      } else {
        // Completed final episode of arc -> complete arc & advance to next item
        setWatchedIds(prev => new Set(prev).add(item.id));
        setSubProgress(prev => {
          const next = { ...prev };
          delete next[item.id];
          return next;
        });

        const nextIndex = upNextData.index + 1;
        if (nextIndex < allItems.length) {
          const nextItem = allItems[nextIndex];
          showToast(`Completed ${item.title}! Starting ${nextItem.title}.`);
        } else {
          showToast(`Congratulations! You have completed the entire Grand Line voyage!`);
        }
      }
    } else {
      // Movie / OVA / Special: Mark as watched and move on
      setWatchedIds(prev => new Set(prev).add(item.id));
      const nextIndex = upNextData.index + 1;
      if (nextIndex < allItems.length) {
        showToast(`Completed ${item.title}! Starting ${allItems[nextIndex].title}.`);
      }
    }
  };

  // Skip Current Item: Bypasses without marking as completed in the checklist
  const skipUpNext = () => {
    if (!upNextData) return;
    const { item } = upNextData;

    setSkippedIds(prev => new Set(prev).add(item.id));
    setSubProgress(prev => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });

    const nextIndex = upNextData.index + 1;
    if (nextIndex < allItems.length) {
      showToast(`Skipped ${item.title}. Up next: ${allItems[nextIndex].title}`);
    } else {
      showToast(`Skipped ${item.title}.`);
    }
  };

  // Restore skipped items
  const resetSkippedItems = () => {
    setSkippedIds(new Set());
    showToast('Restored all skipped items to the queue.');
  };

  // Smooth scroll to active arc
  const scrollToActiveArc = () => {
    if (!upNextData) return;
    setActiveTab('roadmap');
    if (upNextData.saga) {
      setExpandedSagas(prev => new Set(prev).add(upNextData.saga.id));
    }
    setTimeout(() => {
      const el = document.getElementById(`arc-card-${upNextData.item.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Toggle item completion
  const toggleItem = (item) => {
    setWatchedIds(prev => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
        setSkippedIds(sk => {
          const s = new Set(sk);
          s.delete(item.id);
          return s;
        });
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
      if (next.has(sagaId)) {
        next.delete(sagaId);
      } else {
        next.add(sagaId);
      }
      return next;
    });
  };

  // Handle Photo Upload
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

  // Render & Download Canvas Wanted Poster
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

  // Export Data JSON
  const exportProgressJSON = () => {
    const backupData = {
      version: '2.7',
      exportDate: new Date().toISOString(),
      theme: activeThemeId,
      pirateName,
      pirateEpithet,
      userPhoto,
      watchedIds: Array.from(watchedIds),
      skippedIds: Array.from(skippedIds),
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

  // Import Data JSON
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

  // Generate Shareable Link
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

  // Filtered Sagas
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

  // Pacing Calculator Target Dates
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

      {/* STICKY "UP NEXT / CONTINUE VOYAGE" BAR WITH SEAMLESS CONTINUATION & SKIP */}
      {upNextData && (
        <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/30 px-4 py-2.5 shadow-xl transition">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                {upNextData.item.type === 'movie' ? (
                  <Film className="w-5 h-5 text-amber-400 animate-pulse" />
                ) : (
                  <PlayCircle className="w-5 h-5 text-amber-400 animate-pulse" />
                )}
              </div>

              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {upNextData.isEpBased
                      ? `Up Next • Episode ${upNextData.currentEp}`
                      : `Up Next • ${upNextData.item.type.toUpperCase()}`}
                  </span>
                  <span className="text-xs font-bold text-slate-400 truncate">
                    {upNextData.item.title}
                  </span>
                </div>

                {/* Specific Episode Name Display */}
                <h4 className="text-xs md:text-sm font-black text-slate-100 truncate mt-0.5 flex items-center gap-1.5">
                  {upNextData.isEpBased && (
                    <span className="text-amber-300">Ep {upNextData.currentEp}:</span>
                  )}
                  <span className="italic text-slate-200">"{upNextData.episodeTitle}"</span>
                </h4>
              </div>
            </div>

            {/* Quick Actions: Jump to Arc, Skip Item, & Next Action */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={scrollToActiveArc}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Jump to Arc</span>
              </button>

              {/* Skip Current Arc / Movie Button */}
              <button
                onClick={skipUpNext}
                title="Skip this item in Up Next queue without marking as watched"
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-300 text-xs font-semibold border border-slate-700/80 transition flex items-center gap-1.5"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Skip</span>
              </button>

              {/* Continuous Advance Button */}
              <button
                onClick={advanceUpNext}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 transition flex items-center gap-1"
              >
                {upNextData.isEpBased ? (
                  <>
                    <span>
                      {upNextData.currentEp === upNextData.endEp
                        ? 'Finish Arc & Next'
                        : 'Next Episode (+1)'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>Watch & Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
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

                  {/* Dropdown Menu */}
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
                            c =>
                              c.toLowerCase() === t.id.toLowerCase() ||
                              (t.id === 'robin' && c === 'Nico Robin')
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
                              activeThemeId === t.id
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-300 hover:bg-slate-800/60'
                            }`}
                          >
                            <span className="text-base">{isThemeLocked ? '🔒' : t.avatar}</span>
                            <div className="flex-1 truncate">
                              <div className={`font-bold ${isThemeLocked ? 'filter blur-[3px] select-none' : ''}`}>
                                {isThemeLocked ? 'Locked Member' : t.name}
                              </div>
                            </div>
                            <span
                              className="w-3 h-3 rounded-full border border-white/20"
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
                  const isMasked = spoilerShield && !isRecruited;

                  return (
                    <button
                      key={member.name}
                      onClick={() => {
                        setActiveThemeId(member.id);
                        showToast(`Active Straw Hat: ${member.name}!`);
                      }}
                      title={
                        isMasked
                          ? 'Locked Crew Member (Spoiler Shield Active)'
                          : `Click to activate ${member.name} theme`
                      }
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

          {/* Utility Tools: Share URL, Spoiler Shield, Restore Skips, Backup JSON, Reset */}
          <div className="flex items-center gap-2">
            {skippedIds.size > 0 && (
              <button
                onClick={resetSkippedItems}
                title="Restore skipped items to the Up Next queue"
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

                                      {isSkipped && (
                                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-400/80 border border-amber-500/20">
                                          Skipped in Queue
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
          title={`Jump to ${upNextData.item.title}`}
          className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 px-4 py-3 rounded-2xl shadow-2xl font-black text-xs flex items-center gap-2 border border-amber-300/40 hover:scale-105 active:scale-95 transition"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>
            {upNextData.isEpBased ? `Ep ${upNextData.currentEp} • ` : ''}Jump to Arc
          </span>
        </button>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-rose-500 mb-3" />
            <h3 className="text-lg font-bold text-slate-100">Reset Voyage Progress?</h3>
            <p className="text-xs text-slate-400 mt-2">
              This will reset all checked arcs, episode steppers, skipped items, and bounty counters back to zero. You can export a JSON backup first if you want to save your progress.
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
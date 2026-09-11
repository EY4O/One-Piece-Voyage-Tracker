# Eternal Pose UI modernization

Reviewed against repository commit `3dc7cd14d0e3091c8071b164f63fb5f7f819c329` on September 11, 2026.

## Architecture and state map

`src/OnePieceWatchOrder.jsx` owns the master data, React state, derived values, and state-changing handlers. Its dataset contains 11 saga sections, 68 stops, and 1,241 watch units including movie/special equivalents. The artwork map has 12 saga backgrounds plus three showcases; there are 12 character palettes and 25 achievements. These are the checked-in values, which differ from some README counts.

| System | Existing behavior retained |
| --- | --- |
| Roadmap | Ordered saga/item arrays; canon, mixed, filler, recommended filler, movies, specials, recommendations, episode ranges and One Pace mappings remain in the app. |
| Watched / skipped | Sets of item IDs. Completed and skipped are separate states. Completion clears skip/sub-progress for that item. Skipping clears its sub-progress. |
| Episode progress | Per-item numeric `subProgress`, with existing start/end boundaries and inclusive counting. A value at the end completes the arc. |
| Up Next | First eligible unwatched, unskipped item in dataset order. Canon Purist restricts eligibility to canon/mixed. Independent of search and display filters. |
| Search / filters | Existing matching against title, description, and episode-range text; existing content-type and recommendation filters. |
| Saga operations | Expand/collapse is presentation state. Completing a saga operates on all of its original items, including filtered-out items. |
| Voyage analytics | Existing sums, 23.5-minute watch-unit estimate, filler estimate, proportional bounty rewards, crew unlock conditions, and achievement predicates. |
| Pacing | Remaining watch units divided by daily pace, with the existing date calculation. Pace is included in JSON but is not persisted separately on reload. |
| Theme / backgrounds | Existing palette IDs and artwork references; automatic background follows the queued item's parent saga; manual selection overrides it. |
| Backup | Existing version `3.0` JSON import/export fields and handler logic. |
| Share URLs | README advertises sharing, but this baseline has no share control, query-string writer, or query parser. No new URL format was invented. |
| PWA | `main.jsx` registers auto-updating service worker; Vite PWA manifest/Workbox configuration unchanged. Install banner retains browser/iOS detection and dismissal behavior. |

Persisted keys are unchanged:

- `op_tracker_watched`: JSON array
- `op_tracker_skipped`: JSON array
- `op_tracker_subprogress`: JSON object
- `op_tracker_theme`: palette ID
- `op_header_bg_mode`: `auto` or artwork ID
- `op_compact_view`: boolean string
- `op_canon_purist_mode`: boolean string
- `op_spoiler_shield`: boolean string
- `op_pwa_prompt_dismissed`: banner dismissal string

No migration is needed. Fresh storage still uses the original default completed arcs (`arc-1`, `arc-2`). Empty imported progress starts at episode 1. No watch-order, episode-title, artwork, dependency, or PWA configuration files were changed.

## Audit and design direction

The original header gave four analytics cards and bounty prominent space while relegating the next watch to a small sticky strip. Tabs and icon-only utilities shared one overflowing row. Search could hide the target of Jump to Arc. Compact cards truncated long names and omitted controls found in detailed cards. Completed titles were struck through, and skipped content was faded. Episode fields committed on each keystroke. Spoiler protection used CSS blur with hover interactions, leaving concealed plot text in the accessibility tree. Dialogs were generic containers with no focus management.

The implemented direction is a modern watch-progress dashboard with nautical cues: cinematic existing artwork, navy surfaces, a strong next-watch card, numbered saga headings, and a restrained compass/bounty motif. Themes supply accents rather than separate visual layouts. A small surface/border/radius/button/progress system lives in `index.css`.

Priority decisions:

- **High impact:** next-watch hierarchy; reliable Jump to Arc; saga picker and collapse controls; shared card/episode controls; distinct current/completed/skipped states; deliberate accessible spoiler disclosure.
- **Medium impact:** native dialogs, labeled controls, keyboard focus, mobile targets and overflow handling, consistent theme accents, readable progress/analytics labels, crew/achievement feedback, and install-banner placement.
- **Deferred:** charts, broader data/logic extraction, sharing implementation, image compression, data corrections, and persistence/schema changes.

## Component boundaries

The app still owns business logic. `components/VoyageUI.jsx` contains the header, sticky Up Next, section navigation, progress indicator, spoiler disclosure, and modal shell. `components/ArcCard.jsx` contains the card and shared stepper. Compact and detailed modes use the same controls and callbacks. No component library or dependency was added.

Intentional interaction changes:

- Exact episode entry commits on Enter or blur; intermediate digits no longer update progress. Values are bounded to the existing start-minus-one/end semantics.
- Jump clears search/type filters, opens the current saga, scrolls, and focuses the target card.
- Saga totals now describe the full saga, matching the existing bulk completion action even while filtering.
- Hidden summaries/milestones/crew identities are revealed by explicit buttons instead of hover. Hidden content is not rendered until revealed. Locked theme secondary text no longer leaks character names; Shield can be turned off to explore all themes.
- The Shield also conceals saga overview text. Existing arc names, current episode titles, movie/guide placement text, and manually selectable artwork retain their existing visibility. This is not a claim that every title or image is spoiler-free.
- Skipped cards include individual Restore actions; restore-all remains in Settings.
- The header labels aggregate counts as watch units, because the unchanged formula includes film/special equivalents. Filler statistics are labeled as unwatched/skipped filler rather than implying actual time saved.
- Newly unlocked crew/milestones produce brief announcements. Historical unlocks are not announced on initial load. Toasts no longer bounce or race older dismissal timers.
- Native `<dialog>` handles modal focus and Escape. Settings has a sticky header and in-dialog feedback. Reset still requires the existing explicit confirmation.

## Validation performed

`npm run build` passed, including Vite compilation and Workbox service worker generation. No test/lint scripts exist in the baseline package.

A temporary source-comparison check verified that the master data, theme/artwork maps, achievement definitions, watch-time/bounty/crew formulas, achievement evaluation, queue selection, progress/advance/skip handlers, bulk operations, backup handlers, filters, pacing calculations, and persistence keys match the baseline. A separate execution harness verified version 3.0 export fields, JSON serialization, generated filename, download-anchor invocation, and object-URL cleanup. Those temporary harnesses were removed after use.

Browser smoke checks used the local Vite preview, not production:

| Check | Result |
| --- | --- |
| Initial baseline state | 8 watch units, first two arcs complete, OVA next; displayed successfully. |
| Empty version 3.0 import | Episode 1, zero watch units, zero bounty, one crew member. |
| Returning version 3.0 import | Dressrosa episode 650, 676 watch units, 54%, 264.8 hours, bounty 1,029,788,136, nine crew members, skipped film and Sanji/auto preferences restored. |
| Saved reload | Current episode, completed/skipped state, theme and background survive reload. Daily pace returns to 3, matching baseline behavior. |
| Episode interactions | Up Next +1, card −1, +1, +5, exact entry/Enter, completion at arc end, and displayed progress verified. |
| Completion | Individual completion, full saga completion (100%), and Unmark Saga (0%) verified. Crew/milestone announcement verified. |
| Skip / restore | Sticky Skip, individual Restore to queue, and Settings Reset Skips verified. |
| Search / Jump | Search filtered to Water 7; Jump cleared search, restored current card and focused it. |
| Filters | All: 68 stops; canon: 36; films/specials: 19; filler: 13; must-watch: 45. |
| Canon Purist | Queue moved past optional content; roadmap showed 36 canon/mixed stops. |
| Saga navigation | Collapse all removed cards; choosing Water 7 expanded it, scrolled and focused its section. |
| Compact / detailed | Both views rendered; compact retained progress, stepper, status, and expandable details. |
| Shield | Reveal/hide controls exercised; concealed plots and locked achievement/crew details absent from accessible content until revealed. Toggle-off exposes theme choices. |
| Themes | All 12 theme buttons selected successfully; selected state checked. Gold, green, and blue layouts inspected during testing. |
| Artwork | Auto mode after import, Going Merry showcase, and manual Water 7 selection verified. |
| Supporting sections | Achievements, film guide, pacing, and watch guide opened. Pace slider 3 → 4 updated. |
| Dialogs | Settings selection, native modal state, Escape, focus restoration, reset-dialog opening and Cancel tested. |
| Responsive | Screenshots and page-width checks at 375, 430, 768, 1024, and 1440px. No horizontal page overflow. Mobile cards, compact layout, and settings inspected. Sticky Up Next initially measured 83px on mobile, then increased by 4px for 44px action targets. |
| Console | No warning/error entries during smoke testing. |
| Export browser delivery | Export was invoked, but the in-app browser's download-event wait timed out. Browser file delivery is not claimed as verified. Serialization/handler behavior passed the separate harness. |
| PWA | Production manifest and service worker built successfully. Native installation/iOS prompts and offline device behavior were not exercised. |
| Reduced motion | CSS suppresses animation/transition duration and JS Jump respects the media query. OS-level reduced-motion emulation was not performed. |

Fixtures in `docs/qa/` reproduce the empty and returning-user import checks. The local preview's original progress/theme/Shield/view settings were restored after testing. No production storage was modified. The production URL could not be retrieved through the available web reader, so visual conclusions are based on the checked-out application.

## Final review and remaining opportunities

First-time viewers have a clear starting episode and Shield controls. Returning viewers see their saga, next item, progress and bounty together. Mobile users keep the next action reachable with wrapping stepper controls and visible long card titles; desktop users have two-column detailed cards. Skipped content remains readable and reversible. Presentation changes use the original handlers and stored formats.

Potential follow-up work should be separately scoped:

1. Resolve the documented-but-missing share feature and specify a backward-compatible URL contract if historical formats exist elsewhere.
2. Audit pre-existing content assertions, title spoilers, split episode ranges, initial default progress, and the distinction between current episode and inclusive watched count. These were deliberately preserved.
3. Verify export file delivery in a regular browser and native PWA install/offline behavior on real Android/iOS devices.
4. Optimize large artwork and the approximately 38 MB precache, with a separate offline-compatibility review.
5. Consider persisting daily pace and adding stronger malformed-backup validation as a data-layer change.

Generated directories are ignored by the new `.gitignore`. Previously tracked Vite-cache changes caused by the preview were restored; dependencies were not changed.

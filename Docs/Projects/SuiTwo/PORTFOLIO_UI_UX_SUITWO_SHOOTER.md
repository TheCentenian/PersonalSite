# Portfolio: UI/UX — SuiTwo Market Shooter

This document is the **portfolio overview** for UI/UX work on the **SuiTwo Market Shooter** game. It summarizes design system, layout, components, responsiveness, and outcomes in one place for resume bullets, interviews, and stakeholder summaries.

**For full detail:**

- **UI (what we built):** Design system, layout, components, visuals, file reference, load strategy → **`UI_SUITWO_SHOOTER.md`**
- **UX (why and how it serves users):** Goals, friction, feedback, decision points, progression, tradeoffs → **`UX_SUITWO_SHOOTER.md`**

---

## Key Points: UI/UX in One Place

- **Design system:** Modular CSS with **shared theme** (Sui blue primary, market green success/accent), **desktop and mobile** device-specific modules, **CSS custom properties** for colors/typography/spacing, **class-based architecture** (no inline styles, no JS style injection). **97.7% reduction in `!important`** during refactor; **73% rule reduction** in visibility system after consolidation.

- **User visual experience:** Consistent brand (Sui blue + market green), clear hierarchy (primary vs secondary, labels and prices explicit), immediate feedback (toasts, loading, selection states, achievement popups, game-over/pause overlays), readable typography and spacing, restrained motion (title glow, badge pulse, panel fade-in), and predictable patterns (same buttons/panels/modals everywhere) so the experience is coherent and scannable.

- **Responsive design (key highlight):** Layout is driven by **device type** (PC vs mobile), not by fixed-width media queries. The correct CSS bundle and behavior load based on **device detection**; sizing is **viewport-relative** (`vw`, `vh`, `min(vw, vh)`) so the UI adapts to any screen size. **Mobile:** landscape-optimized, touch targets, single-layer panels; **desktop:** fluid viewport units. **ResponsiveCanvas** and **ViewportManager** keep canvas and UI in sync.

- **Menus & navigation:** Front page overlay; main menu (Play, Store, Leaderboard, Tournaments, How to Play, Settings, Wallet, badge entry); panels (Settings, Instructions, Sound Test, Leaderboard) with consistent overlay behavior. **Menu service** coordinates visibility and panel/modal stacking.

- **Store:** Modal with tabs (Items, Inventory, Game Pass, Tournament Tickets); item cards (icon, name, description, level options, price, badge discount); **one item per type per game** with clear visual states (available / selected / disabled). Inventory and consumable footer (in-game icons). Credits and tickets purchased in advance; **consumption is automatic** on Play—no wallet transaction per run.

- **Leaderboard:** Modal with categories, pagination, score submission flow; local and on-chain data; formatting and feedback.

- **Tournament:** Modal (browse, enter, my tournaments) and **creation wizard** (name, category, schedule, entry fee, rewards, payment) with **gold theme** (#FFD700, #FFC107). **Game canvas gold border** in tournament mode so the run is visually distinct.

- **Badge:** Display in menu and store; modals for mint, tier upgrade, migration; refactored into focused modules (service, utils, display, modals, handlers).

- **How to Play:** Tabbed modal (9 tabs) with accordion sections; narrative and asset references; structure in HOW_TO_PLAY_MODAL_STRUCTURE.md.

- **In-game HUD:** Lives, score, tier, boss HP, force field state, orb level, consumable indicators; game state and lives rendering; loading modal and toasts. **Gameplay visuals (on-canvas):** Background, player, force field (level-based colors: L1 blue, L2 green, L3 gold), enemies, bosses, projectiles, collectibles, effects—same visual language and asset set; full coloration and file refs in UI doc §4.5.

- **Accessibility & usability:** Touch targets and sizing (mobile); panel/modal focus and overlay behavior; explicit feedback; consistent component patterns. No separate WCAG audit; design aims for clarity and consistent interaction.

- **File reference & load strategy:** UI logic in `apps/shooter-game/frontend/src/game/systems/ui/`; CSS in `rendering/responsive/shared/`, `responsive/mobile-modules/`, `responsive/desktop-modules/`, `rendering/ui/`. Menu scripts (~90+) on Enter Game; game scripts (~60+) on Start Game. **Full file list and load order:** `UI_SUITWO_SHOOTER.md` §2 and §8.

---

## What You Can Say (Talking Points)

- Designed and documented a **modular design system** for a market-themed shooter: shared theme (Sui blue + market green), CSS custom properties, class-based layout, and device-specific (desktop/mobile) modules with **major reduction in `!important`** and visibility rules.

- Shaped **user visual experience** around consistent brand and hierarchy, immediate feedback (toasts, loading, selection states, game-over overlays), readable typography and spacing, restrained motion (title glow, badge pulse, panel fade-in), and predictable patterns so the UI feels coherent and scannable. Documented **gameplay visuals** (on-canvas): background, player, enemies, bosses, projectiles, collectibles, force field, effects—same Sui blue / market green language and asset pipeline so in-game view and UI feel like one product.

- Owned **end-to-end store UI/UX**: modal with tabs (Items, Inventory, Game Pass, Tournament Tickets), **one-item-per-type** selection rule with clear visual states, wallet and game pass integration, badge discount visibility, and handoff docs. Designed **credits and tournament tickets** for **low-friction play**: purchase in advance, **automated consumption** (one credit or one ticket per game) so players don’t complete a transaction for every play.

- Made **responsive design a core highlight**: layout is driven by **device type** (PC vs mobile), not by fixed-pixel media queries; sizing is **viewport-relative** (vw, vh, min()) so the UI adapts to any screen size. Shipped device-based CSS loading, viewport scaling, landscape-oriented mobile layout, touch-friendly targets, single-layer panel overlays, and integration with **ViewportManager** and **ResponsiveCanvas**.

- Structured **tournament creation** as a **multi-step wizard** (name, category, schedule, entry fee, rewards, payment) with progress indicator and step validation. Applied a **gold theme** to tournament modal and creation wizard, and a **gold border** on the game canvas in tournament mode, so competitive context is visually distinct from regular play.

- Refactored **badge UI** into focused modules (service, utils, display, modals, mint/upgrade/migration) for clearer flows and maintainability; documented mint/upgrade/migration and verification.

- Defined **How to Play** as a **tabbed modal with accordions** and documented full structure (tabs and sections) for narrative and assets; supported onboarding without a separate tutorial flow.

- Established **consistent interaction patterns**: shared buttons, panels, modals, toasts, and loading states; menu service for overlay coordination; **audio strategy** (UI vs impact sounds) and **Sound Test** panel for tuning and accessibility.

- Delivered **UI/UX documentation** (UI doc, UX doc, handoff docs for store, leaderboard, badge, tournament, CSS) so design intent and rules are preserved across iterations.

---

## Positioning and Scope

- **Scope:** This portfolio covers **UI/UX for the SuiTwo Market Shooter game** (frontend): design system, layout, components, flows, responsive/mobile, accessibility/usability. Backend APIs, contracts, and platform are in the engineering portfolio; product positioning and roadmap are in concept and planning docs.

- **Relationship to other docs:**
  - **UI_SUITWO_SHOOTER.md:** Full UI reference (design system, layout, components, file reference, load strategy).
  - **UX_SUITWO_SHOOTER.md:** Full UX reference (user goals, friction, feedback, decision points, progression, tradeoffs, scope).
  - **PORTFOLIO_SUITWO_SHOOTER.md:** Engineering portfolio (implementation details, APIs, services).
  - **PORTFOLIO_UI_UX_PLATFORM_ADMIN.md:** Platform admin UI. Wallet module and connect flows used by the game are shared; in-game UX for store wallet connection is in scope here.

---

## Related Documentation (Summary)

- **CSS / design system:** `docs/css-modularization/` (status, implementation guides, VISUAL_CONSISTENCY_STRATEGY).
- **Store:** `docs/sui-integration/STORE_UI_IMPLEMENTATION_HANDOFF.md`, `STORE_ITEM_SELECTION_RULES.md`; `docs/refactoring/STORE_REFACTORING_*.md`.
- **Leaderboard:** `docs/sui-integration/LEADERBOARD_*.md`.
- **Tournament:** `docs/monetization-and-systems/TOURNAMENT_CREATION_*.md`, `PLAYER_REWARDS_UI_DESIGN.md`, `REWARD_UI_SYSTEM_DESIGN.md`.
- **Badge:** `docs/badge-service/BADGE_UI_*.md`; `docs/sui-integration/BADGE_MINTING_UX_FLOW.md`.
- **How to Play:** `docs/refactoring/HOW_TO_PLAY_MODAL_STRUCTURE.md`.
- **Audio:** `docs/audio/SOUND_OPTIONS_SUMMARY.md`, `SOUND_OPTIMIZATION_GUIDE.md`.
- **Exhaustive list:** See `UI_SUITWO_SHOOTER.md` §10.

---

*Use this doc for portfolio overview and talking points. For full UI detail see UI_SUITWO_SHOOTER.md; for full UX detail see UX_SUITWO_SHOOTER.md.*

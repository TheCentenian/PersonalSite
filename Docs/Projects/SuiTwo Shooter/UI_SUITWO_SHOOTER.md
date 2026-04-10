# UI — SuiTwo Market Shooter (Full Document)

This document is the **full UI reference** for the SuiTwo Market Shooter game: design system, layout, components, visuals, file reference, responsive approach, and load strategy. It describes **what we built** (look, structure, implementation)—separate from the **UX document** (`UX_SUITWO_SHOOTER.md`), which describes why and how it serves users.

**How to use:** Treat this as the master UI reference. For portfolio summaries and talking points, use `PORTFOLIO_UI_UX_SUITWO_SHOOTER.md`. For user goals, friction, and flows, use `UX_SUITWO_SHOOTER.md`.

---

## 1. Purpose and scope

### 1.1 What this document covers

- **Design system:** Theme, colors, typography, spacing, CSS architecture, tokens, animations.
- **Layout and structure:** Front page, main menu, panels, modals, in-game layout, HUD, gameplay visuals (on-canvas).
- **Components:** Buttons, item cards, tabs, accordions, wizards, feedback (toasts, loading, achievement popup).
- **File reference:** Paths and roles for UI logic, CSS, and rendering.
- **Responsive UI:** Device-based bundles, viewport-relative layout, mobile vs desktop UI.
- **Load strategy and entry points:** What loads when (Enter Game vs Start Game) and global handlers.

### 1.2 What this document does not cover

- **UX rationale** (goals, friction, decision points, tradeoffs): see `UX_SUITWO_SHOOTER.md`.
- **Backend, contracts, or platform:** see engineering portfolio.
- **Platform admin UI:** see `PORTFOLIO_UI_UX_PLATFORM_ADMIN.md`.

### 1.3 Relationship to other docs

- **PORTFOLIO_UI_UX_SUITWO_SHOOTER.md:** High-level overview, key points, talking points; points to this doc and the UX doc for detail.
- **UX_SUITWO_SHOOTER.md:** User goals, flows, feedback, clarity, progression, accessibility scope. Use that for “why”; use this doc for “what’s on screen and how it’s built.”

---

## 2. File reference

Paths are relative to project root unless noted.

**Frontend UI systems (apps/shooter-game/frontend/src/game/systems/ui/):**

- **Menu & coordination:** `menu-service.js`, `menu-system.js`, `ui-initialization.js`, `loading-modal.js`, `loading-manager.js`, `settings-management.js`, `sound-test-system.js`, `toast-notifications.js`.
- **Store:** `store-ui.js`, `store-service.js`, `store-modal.js`, `store-item-selection.js`, `store-item-rendering.js`, `store-item-loader.js`, `store-inventory.js`, `store-inventory-tab.js`, `store-purchase-flow.js`, `store-game-pass-tab.js`, `store-tournament-tickets-tab.js`, `store-wallet-connection.js`, `store-ui-updates.js`, `store-utils.js`.
- **Leaderboard:** `leaderboard-ui.js`, `leaderboard-modal.js`, `leaderboard-service.js`, `leaderboard-score-submission.js`, `leaderboard-local.js`, `leaderboard-pagination.js`, `leaderboard-formatting.js`, `leaderboard-categories.js`, `leaderboard-data.js`.
- **Tournaments:** `tournament-modal.js`, `tournament-creation-modal.js`.
- **Achievements:** `achievement-popup.js`, `achievement-progress.js`.
- **Badge:** `badge-ui.js`, `badge-ui-service.js`, `badge-ui-utils.js`, `badge-ui-display.js`, `badge-ui-modals.js`, `badge-ui-mint.js`, `badge-ui-upgrade.js`, `badge-ui-migration.js`.
- **Game data & wallet:** `game-data-flow-service.js`, `game-data-flow-wallet.js`, `game-data-flow-badge.js`, `game-data-flow-modals.js`, `game-data-flow-loaders.js`, `game-data-flow-ui.js`, `game-data-state.js`, `game-data-flow.js`, `wallet-service.js`, `game-service.js`, `game-pass-service.js`, `game-pass-display.js`, `token-balance-utils.js`, `end-demo-modal.js`.
- **How to Play:** `how-to-play-modal.js`, `how-to-play-content-generator.js`.

**Rendering & CSS (apps/shooter-game/frontend/src/game/rendering/):**

- **Shared (theme & components):** `responsive/shared/shared-theme.css`, `shared-base-styles.css`, `shared-ui-components.css`, `shared-ui-classes.css`, `shared-components.css`, `shared-component-registry.css`, `shared-typography.css`, `shared-responsive.css`, `shared-gameplay.css`, `shared-front-page.css`, `shared-main-menu.css`, `shared-panels.css`, `shared-interactions.css`, `shared-animations.css`, `shared-modal-leaderboard.css`, `shared-panel-settings.css`, `shared-panel-instructions.css`, `shared-panel-sound-test.css`, `shared-achievements.css`.
- **UI feature CSS:** `ui/badge-styles.css`, `ui/tournament-creation-modal.css`, `ui/loading-modal.css`, `ui/how-to-play-modal.css`, `ui/game-pass-styles.css`, `ui/consumable-footer.css`.
- **Viewport & device:** `responsive/viewport-manager.js`, `responsive/canvas-manager.js`, `responsive/mobile-ui.js`, `responsive/viewport-container.css`, `responsive/shared/shared-viewport-container.css`, `responsive/mobile-ui-styles.css`, `responsive/mobile-modules/*.css`, `responsive/desktop-modules/*.css`.
- **In-game UI rendering:** `ui/ui-rendering.js`, `ui/lives-rendering.js`, `ui/game-state-rendering.js`, `ui/life-images.js`.
- **On-canvas rendering:** `background-rendering.js`, `player-rendering.js`, `force-field-rendering.js`, `enemy-rendering.js`, `boss-rendering.js`, `player-projectile-rendering.js`, `enemy-projectile-rendering.js`, `boss-projectile-rendering.js`, `collectibles-rendering.js`, `effects-rendering.js`, `main-rendering.js`; corresponding `*-images.js` and `particle.js`.

**Documentation (docs/):** See §10 Related documentation.

---

## 3. Design system

### 3.1 Theme and color strategy

- **CSS custom properties** in `shared-theme.css`: `--color-primary` (Sui blue #4DA2FF), `--color-secondary`, `--color-accent` / `--color-success` (market green #39ff14), `--text-primary`, `--text-secondary`, `--text-muted`. Used across shared and device-specific modules.
- **Brand:** Sui blue for primary UI (titles, badges, main actions); market green for success, scores, positive feedback. **Tournament context:** gold (#FFD700, #FFC107) for tournament modals, creation wizard, and game canvas border in tournament mode.
- **Animations:** Keyframes in `shared-animations.css` (titleGlow, badgePulse, panelFadeIn, menuFadeIn, etc.); used sparingly for recognition.

#### Design tokens (reference)

**Colors:** `--color-primary: #4DA2FF`; `--color-secondary: #3A7BD5`; `--color-accent: #39ff14`; `--color-success: #39ff14`; `--color-warning: #ff6b6b`. **Text:** `--text-primary: white`; `--text-secondary: #ccc`; `--text-muted: #888`. **Backgrounds:** `--bg-primary` (dark gradient), `--bg-overlay`, `--bg-panel`, `--bg-button-primary`, `--bg-button-accent`. **Borders:** `--border-primary`, `--border-accent`. **Spacing:** `--spacing-xs` through `--spacing-xl`. **Radius:** `--radius-sm` through `--radius-full`. **Shadows:** `--shadow-glow` (market green).

### 3.2 CSS architecture

- **Modularization:** Theme → base → components → features → device-specific. **Desktop** and **mobile** bundles loaded by **device detection** (device-config.js, device-monitoring.js), not by CSS media queries.
- **Class-based:** Visibility and layout by classes; no JavaScript style injection for layout/visibility; no inline styles for structure. **97.7% reduction in `!important`**; **73% rule reduction** in visibility system during refactor.
- **Viewport-relative sizing:** `vw`, `vh`, `min(vw, vh)` for layout and typography so UI scales with visible area without fixed breakpoints.
- **Shared components:** `.btn`, `.menu-btn`, `.panel`, `.modal-base`, etc. in shared-ui-components.css / shared-component-registry.css; device-specific overrides where needed.

### 3.3 Typography and spacing

- **shared-typography.css:** Font sizes and viewport scaling. **Spacing:** Theme variables; **mobile-compact** classes (e.g. `min(1.8vw, 18px)`) for denser areas.

### 3.4 What the user sees (visual experience)

- **Palette:** Sui blue (primary), market green (success/accent), gold (tournament), dark gradients (backgrounds). Text hierarchy: primary / secondary / muted.
- **Feedback:** Toasts, loading modal, selection states (available/selected/disabled), achievement popup, game-over and pause overlays with strong contrast (e.g. red GAME OVER, green score).
- **Motion:** Title glow, badge pulse, panel/menu fade-in; restrained so the UI feels clear and predictable.
- **Consistency:** Same buttons, panels, modals everywhere (menu, store, leaderboard, tournaments, How to Play).

---

## 4. Layout and structure

### 4.1 Front page and main menu

- **Front page:** Overlay in `shared-front-page.css`; “Enter Game” triggers loadMenuScripts() then showMainMenu().
- **Main menu:** `shared-main-menu.css` (and mobile-main-menu.css); gradient text (titleGlow, menuFadeIn); buttons: Play, Store, Leaderboard, Tournaments, How to Play, Settings, Wallet, badge entry; credits/tickets via game-pass-display.js, game-pass-styles.css. **Menu service** (menu-service.js) maps button ids to handlers (showStore, showLeaderboard, etc.) and coordinates overlays.

### 4.2 Panels

- **Shared:** `shared-panels.css`; per-panel: shared-panel-settings.css, shared-panel-instructions.css, shared-panel-sound-test.css. **Single-layer overlay** on mobile; centered; consistent close. Visibility via classes (e.g. `.settings-panel-visible`). Settings (volume, mute) persisted via settings-management.js. Sound Test panel for previewing UI/game sounds.

### 4.3 Modals

- **Base:** Fixed, centered, overlay (bg-overlay), max dimensions (e.g. min(90vw, 90vh)); class-based visibility.
- **Store:** store-modal.js; tabs: Items, Inventory, Game Pass, Tournament Tickets; context open (e.g. showStore('tickets')); wallet prompt when needed.
- **Leaderboard:** leaderboard-modal.js; categories, list, pagination; shared-modal-leaderboard.css.
- **Tournament:** tournament-modal.js (browse, enter, my tournaments, Create); tournament-creation-modal.js (wizard). **Gold theme** (shared-panels.css, tournament-creation-modal.css, game-pass-styles.css).
- **Badge:** badge-ui-modals.js (mint, upgrade, migration).
- **How to Play:** how-to-play-modal.js; 9 tabs, accordions; how-to-play-modal.css; structure in HOW_TO_PLAY_MODAL_STRUCTURE.md.
- **Loading:** loading-modal.js, loading-modal.css; loading-manager.js.
- **End Demo:** end-demo-modal.js.

### 4.4 In-game layout

- **Gameplay area:** shared-gameplay.css, viewport-container.css; **ResponsiveCanvas**, **ViewportManager** keep canvas and UI in sync. **HUD:** ui-rendering.js (#distance, #coins, #status); game-state-rendering.js (score, orb, tier, bosses defeated, force field, coin streak); lives-rendering.js, life-images.js; consumable-footer.css. **Overlays:** renderMenuOverlay, renderGameOverScreen, renderPauseScreen. **Tournament mode:** canvas gold border (desktop-game-ui.css `canvas.tournament-mode`, mobile-game-ui.css).

### 4.5 Gameplay visuals (on-canvas)

Composed by **main-rendering.js**. Assets and rendering: background-rendering.js, background-images.js; player-rendering.js, player-images.js; force-field-rendering.js; enemy-rendering.js, enemy-images.js; boss-rendering.js, boss-images.js; player-projectile-rendering.js, enemy-projectile-rendering.js, boss-projectile-rendering.js, projectile-images.js; collectibles-rendering.js, collectible-images.js; effects-rendering.js, particle.js.

- **Force field:** Level 1 = #4DA2FF, level 2 = #39ff14, level 3 = #FFD700; radial gradient, stroke, pulse; L2 sparkles, L3 orbiting gold particles (force-field-rendering.js).
- **Coloration (other items):** Player orbs: trail `hsl(200 + level*15, 100%, 60%)` (player-projectiles.js, player-projectile-rendering.js). Enemy/boss projectiles: #FF4444 / #FF0000. Enemies: fallback #FF4444, freeze #00FFFF, default #FFFF00; hit #FF0000; health bar green→yellow→red. Bosses: same health bar; enrage bar #FF0000 / #FF8800 / #FFAA00. Collectibles: coin #FFD700, power-up #00FF00, power-down #FF0000; tractor glow rgba(57,255,20,…). Lives: heart #FF0000, stroke #666; extra life #FFD700.

---

## 5. Components

### 5.1 Buttons and controls

- **Shared:** `.btn`, `.menu-btn`, `.enter-game-btn`, `.close-btn`, `.sound-btn` (shared-theme.css, shared-ui-components.css); primary/secondary/danger with theme colors. **Mobile:** Larger touch targets (mobile-interactions.css, mobile-compact).
- **Store level selectors:** store-item-rendering.js; +1/+2/+3 etc.; states: available, selected, disabled (store-item-selection.js).

### 5.2 Item cards and lists

- **Store cards:** Icon/image, name, description, level options, price, badge discount, purchase/select (store-item-rendering.js). **Inventory:** store-inventory-tab.js. **Consumable footer:** consumable-footer.css; icons for tractor beam, slow time, destroy all, boss kill shot. **Leaderboard rows:** Score, rank, address; leaderboard-formatting.js.

### 5.3 Tabs and accordions

- **Tabs:** Store (Items, Inventory, Game Pass, Tournament Tickets); How to Play (9 tabs); Achievement progress. Active state and content switching in shared components. **Accordions:** How to Play sections per tab (how-to-play-modal.css).

### 5.4 Wizards

- **Tournament creation:** tournament-creation-modal.js, tournament-creation-modal.css; steps with progress indicator and validation. **Badge:** Mint, upgrade, migration modals (badge-ui-modals.js, etc.).

### 5.5 Feedback UI

- **Toasts:** toast-notifications.js; success/error/warning/info; non-blocking. **Loading:** loading-modal.js, loading-manager.js; context-specific messages. **Achievement popup:** achievement-popup.js, achievement-progress.js; milestone popup and progress tabs.

---

## 6. Responsive UI

### 6.1 Device detection and bundles

- **Device type** (desktop, tablet, mobile) from user agent, screen, touch (device-config.js, device-monitoring.js). **Desktop** or **mobile** CSS bundle loaded via JS; no “at 768px” breakpoint for bundle choice. **ViewportManager**, **ResponsiveCanvas**; MobileUI.initialize(), TouchInput.initialize() after game scripts load.

### 6.2 Mobile UI

- **Landscape:** mobile-landscape-rotation.css; rotation prompts. **Touch:** mobile-interactions.css; larger targets, tap feedback; no hover-only actions. **Viewport units** for scaling; **mobile-compact** for density. **Single-layer panels.**

### 6.3 Desktop UI

- **Viewport units** for fluid layout. **Hover and focus:** shared-interactions.css and desktop modules.

---

## 7. Accessibility (UI implementation)

- **Touch targets:** Minimum sizes and spacing on mobile; store level buttons and menu buttons sized for tap. **Focus and overlay:** Close buttons and escape where implemented; menu service avoids multiple focus traps. **Sound Test** panel for verifying feedback sounds. (For accessibility scope and rationale, see UX_SUITWO_SHOOTER.md §11.)

---

## 8. Load strategy and entry points

### 8.1 Script load order

- **On “Enter Game”:** loadMenuScripts() loads MENU_SCRIPTS (~90+ files): menu-service, wallet, game-service, store stack, leaderboard stack, tournament stack, how-to-play, badge stack, game-data-flow, loading-modal, toast-notifications, audio. Wallet module from GAME_CONFIG.WALLET_MODULE_URL. After load: initGameAudio(), WalletService.initialize().
- **On “Start Game”:** loadGameScripts() loads GAME_SCRIPTS (~60+ files): game-state, game-loop, initialization, player/bosses/projectiles/collision/tiles/scoring/collectibles/effects, image preloaders, all rendering (background, player, force-field, enemy, boss, projectiles, collectibles, effects, main), ui-rendering, game-state-rendering, lives-rendering, viewport-manager, canvas-manager, mobile-ui, touch-input, consumables. After load: ResponsiveCanvas.initialize, ViewportManager.initialize, TouchInput.initialize, MobileUI.initialize.

### 8.2 Global entry points (window)

- showMainMenu, showSettings, showInstructions, showStore, showStoreInternal, showStoreWalletConnectModal, showLeaderboard, hideLeaderboard, showTournaments, hideTournaments, showTournamentCreation, hideStore, loadMenuScripts, loadGameScripts, loadAllScripts. Menu service maps button ids to these handlers.

---

## 9. Detailed inventories (copy/paste)

### 9.1 Store item catalog (UI)

- **Types/levels (one selection per type per game):** extraLives (1–3), forceField (1–3), orbLevel (1–3), slowTime (1–3), destroyAll, bossKillShot, coinTractorBeam (1–3). Each: name, description, level options, price, badge discount, icon/image (store-item-rendering.js, catalog). Visual states: available, selected, disabled (game.selectedItems).

### 9.2 How to Play: tab and accordion map

- **Tab 1:** Getting Started. **Tab 2:** Character (SuiTwo). **Tab 3:** Enemies (Jeet, Market Maker, Little Bear, Shadow Hand). **Tab 4:** Bosses (Scammer, Market Manipulator, Bear Boss, Shadow Figure). **Tab 5:** Combat & Projectiles. **Tab 6:** Collectibles & Items. **Tab 7:** Premium Store. **Tab 8:** Tournaments. **Tab 9:** Progression & Rewards. Accordion sections per tab; assets in HOW_TO_PLAY_MODAL_STRUCTURE.md.

### 9.3 Tournament creation wizard steps

- Step 1: Name (max 100 chars). Step 2: Category (6). Step 3: Schedule. Step 4: Entry fee (tickets, min 1). Step 5: Rewards (default/custom, cost, badge discount). Step 6: Starting ante. Step 7: Review & payment (SUI/MEWS/USDC).

### 9.4 Badge tiers (UI copy)

- Standard (1–4 games): 0% store, 0% gameplay. Common (5–14): 5% store, 0% gameplay. Uncommon (15–34): 10% store, 5% gameplay. Rare (35–74): 15% store, 10% gameplay. Epic (75–149): 20% store, 15% gameplay. Legendary (150+): 25% store, 20% gameplay.

### 9.5 HUD elements (DOM / logic)

- **Header:** #distance, #coins, #status (ui-rendering.js). **Game state:** score, orb level, tier, bosses defeated, force field, coin streak (game-state-rendering.js). **Lives:** lives-rendering.js, life-images.js. **Consumables:** consumable-footer.css. **Overlays:** renderGameOverScreen, renderPauseScreen, renderMenuOverlay.

---

## 10. Related documentation

- **CSS / design system:** docs/css-modularization/ (CSS_MODULARIZATION_PROJECT_STATUS.md, IMPLEMENTATION_GUIDE, VISUAL_CONSISTENCY_STRATEGY, etc.).
- **Store:** docs/sui-integration/STORE_UI_IMPLEMENTATION_HANDOFF.md, STORE_ITEM_SELECTION_RULES.md; docs/refactoring/STORE_REFACTORING_*.md.
- **Leaderboard:** docs/sui-integration/LEADERBOARD_*.md.
- **Tournament:** docs/monetization-and-systems/TOURNAMENT_CREATION_*.md, PLAYER_REWARDS_UI_DESIGN.md, REWARD_UI_SYSTEM_DESIGN.md.
- **Badge:** docs/badge-service/BADGE_UI_*.md; docs/sui-integration/BADGE_MINTING_UX_FLOW.md.
- **How to Play:** docs/refactoring/HOW_TO_PLAY_MODAL_STRUCTURE.md.
- **Audio:** docs/audio/SOUND_OPTIONS_SUMMARY.md, SOUND_OPTIMIZATION_GUIDE.md.
- **Refactoring / flow:** docs/refactoring/ (MENU_SERVICE_REFACTORING_PLAN.md, GAME_DATA_FLOW_*.md, GAME_OVER_FLOW.md, etc.).

---

*This is the full UI reference for SuiTwo Market Shooter. For overview and talking points see PORTFOLIO_UI_UX_SUITWO_SHOOTER.md; for UX rationale see UX_SUITWO_SHOOTER.md.*

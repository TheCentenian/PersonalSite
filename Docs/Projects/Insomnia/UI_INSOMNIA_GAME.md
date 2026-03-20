# UI — Insomnia Game (Full Master Document)

This document is the **full UI reference** for **Insomnia Game**: design system, theming, layout, UI surfaces, components, states, responsive behavior, accessibility implementation, and file reference. It describes **what is on screen and how it is structured/implemented**, complementing the UX master doc (`Docs/UX_INSOMNIA_GAME.md`).

- For **UX rationale, flows, and decision points**, see `Docs/UX_INSOMNIA_GAME.md`.
- For **portfolio narrative and talking points**, see `Docs/PORTFOLIO_INSOMNIA_GAME.md` (to be authored).

---

## 1. Purpose and scope

### 1.1 What this document covers

- **Design system**: theme tokens, colors, motion, patterns, typography approach, interaction affordances.
- **UI surfaces**: landing/home, game page, header + dropdown, modals (profile/statistics/leaderboard/settings), game over, game pass purchase, and in-game HUD/stats.
- **Core components**: 5×5 grid, grid tiles, start controls, theme toggle, wallet connect surface, modal foundations.
- **State visuals**: active/selected/disabled/loading/error states, focus states, reduced motion, high contrast.
- **Responsive behavior**: mobile-first layout decisions, overflow rules, sizing constraints, touch target policy.
- **Accessibility implementation**: keyboard navigation, focus management, screen reader affordances, contrast and reduced motion support.
- **File reference**: where the UI is implemented in `src/`.

### 1.2 What this document does not cover

- Business logic details for blockchain and backend (service-level): see architecture/service docs.
- Smart contract design: see contract docs.
- UX “why” and tradeoffs: see the UX master document.

---

## 2. UI sitemap (surfaces and navigation)

### 2.1 Top-level surfaces (Next.js routes)

- **Home (`/`)**
  - Purpose: onboarding + positioning + entry to demo/premium.
  - Entry actions: connect wallet, start demo/premium, choose theme.

- **Game (`/game`)**
  - Purpose: the core gameplay surface + the persistent header.
  - Contains: 5×5 grid, session stats (score/time/speed/level), game controls, game over modal.

### 2.2 Global navigation (header dropdown system)

The UI uses a **persistent header** that exposes a **Menu** dropdown and modal-based navigation:

- **Profile modal**
- **Statistics modal**
- **Leaderboard modal**
- **Settings modal**

This is intentionally modal-based to keep the user “in context” (no route changes and no page reload).

---

## 3. File reference (where UI lives)

This is the UI “map” to the codebase so future changes are localized and predictable.

### 3.1 App router and global styles

- `src/app/layout.tsx`: root layout; providers and persistent top-level UI placement.
- `src/app/page.tsx`: home surface.
- `src/app/game/page.tsx` + `src/app/game/GamePageClient.tsx`: game route and client-side behavior.
- `src/app/globals.css`: Tailwind base + global CSS variables + theme patterns + mobile rules + global button resets.

### 3.2 Core components

- `src/components/Header.tsx`: header UI (wallet status + theme + menu trigger).
- `src/components/ProfileDropdown.tsx`: menu trigger + dropdown behavior (opens modals).
- `src/components/Game.tsx`: main game container.
- `src/components/GameGrid.tsx`: 5×5 grid wrapper.
- `src/components/GameControls.tsx`: start/restart and other controls.
- `src/components/GameStats.tsx`: on-screen stats/cards (score/time/level/speed).
- `src/components/GameOverModal.tsx`: game-over summary and CTAs.
- `src/components/GamePassPurchase.tsx`: purchase flow modal/surface.
- `src/components/ThemeToggle.tsx`: theme switching UI.
- `src/components/LoadingSpinner.tsx`: loading indicator.
- `src/components/ErrorBoundary.tsx`: UI fallback on runtime errors.
- `src/components/AccessibilityProvider.tsx`: accessibility mode toggles and behavior.

### 3.3 Modal surfaces (header dropdown)

- `src/components/modals/ProfileModal.tsx`
- `src/components/modals/StatisticsModal.tsx`
- `src/components/modals/LeaderboardModal.tsx`
- `src/components/modals/SettingsModal.tsx`
- `src/components/LazyComponents.tsx`: lazy-load wrappers for modals.

### 3.4 Styling and accessibility

- `src/app/globals.css`: theme tokens, backgrounds, button normalization, mobile constraints.
- `src/styles/accessibility.css`: focus rules, skip link, reduced motion, high contrast, color blindness support patterns, modal focus trap utilities.

---

## 4. Design system (visual language)

### 4.1 Theme tokens (CSS custom properties)

The UI is powered by theme variables defined at `:root` and then changed by theme selection via classes.

Core tokens (from `src/app/globals.css`):

- **Background**: `--color-background`, `--color-background-secondary`
- **Text**: `--color-text`, `--color-text-secondary`
- **Accents**: `--color-accent1`, `--color-accent2`, `--color-accent3`
- **Borders**: `--color-border`, `--color-border-hover`
- **Glow/shadow**: `--color-shadow`, `--color-glow`
- **Effects**: `--glow-intensity`, `--animation-speed`, `--background-pattern`

**UI rule**: components should prefer these tokens (via `var(...)`) over hard-coded colors.

### 4.2 Theme variants (atmospheres)

Themes are implemented as background compositions and overlay patterns:

- `.theme-midnight-neon`: high-energy neon + grid overlay
- `.theme-aurora-nights`: soft aurora gradients + floating effect
- `.theme-neon-sunset`: warm gradients + pulsing glow
- `.theme-cyber-dawn`: scanning cyber pattern

Each theme adds a `::before` overlay layer used for subtle ambience without affecting hit targets (`pointer-events: none`).

### 4.3 Typography

The UI uses system fonts in `body` (platform-friendly).

**Guideline**

- Keep “hero” title readable on small devices (mobile `h1` overrides exist in `globals.css`).
- Prefer short labels and numeric cards for in-game stats to reduce reading load during play.

### 4.4 Motion

Motion is used for:

- “alive” feeling (theme overlays, glows)
- micro-feedback (button active scale on mobile)

**Accessibility rule**: motion must respect reduced motion preferences:

- `src/styles/accessibility.css` disables animations/transitions via `prefers-reduced-motion: reduce`
- There is also a `.reduced-motion` class to force-disable motion.

### 4.5 Interaction affordances (buttons and states)

Global button normalization is defined in `globals.css`:

- Buttons default to transparent background and inherit color.
- `button:focus` uses `outline` based on `--color-accent1`.
- Selected states can be driven by ARIA attributes:
  - `aria-pressed="true"` / `aria-selected="true"` apply `--color-accent3` background with dark text.

**Design intent**: interaction states should be consistent across all controls (menu, modals, game tiles).

---

## 5. Layout and structure

### 5.1 The “no scrollbars” decision

`html, body` are set to `overflow: hidden` in `globals.css`.

**Implication**

- Long content must be handled with **internal scrolling containers** (modals with `max-height` + `overflow-y-auto`), not page scroll.
- This keeps the game surface stable (no accidental scroll during gameplay) but requires careful modal overflow design.

### 5.2 Page-level layout (home vs game)

**Home**

- Presents branding, theme selection, wallet connect, and entry CTAs.
- Must remain readable and tappable on small screens.

**Game**

- Uses a centered layout with the grid as the primary focal point.
- Persistent header remains available for navigation and status.

### 5.3 Grid (5×5) container rules

The grid is the core UI element and must satisfy:

- Stable aspect ratio and tile sizing (no jitter between spawns).
- Touch targets remain ≥ 44px on mobile (enforced broadly by CSS).
- Focus visibility for keyboard navigation (see §9).

Mobile-specific scaling hints exist:

- `.game-grid` and `.game-grid-mobile` apply scaling transforms in small viewports.

### 5.4 Header + menu placement

The header is persistent and should:

- show wallet state and credits (premium),
- expose theme toggle,
- provide a single “Menu” entry point for modals.

---

## 6. Components (spec-level)

This section documents the UI components as **specs**: purpose, structure, states, and behavior.

### 6.1 Header (`Header.tsx`)

**Purpose**

- Persistent status + navigation entry point.

**Recommended visible elements**

- **Menu** button (opens dropdown).
- Wallet connect/status region (address summary, network).
- Credits indicator (premium).
- Theme toggle.

**States**

- Wallet disconnected: show connect CTA, keep premium actions contextual.
- Wallet connected: show address + balances as available.

### 6.2 Menu dropdown (`ProfileDropdown.tsx`)

**Purpose**

- Quick access to modals without route changes.

**Interaction**

- Click “Menu” → dropdown appears.
- Select item → modal opens, dropdown closes.

**States**

- Open/closed.
- Keyboard focus (dropdown items must be reachable and perceivable).

**Implementation notes**

- “Click outside to close” is a required behavior (dropdown and modals).

### 6.3 Modal foundation (shared behavior)

Modals follow these global rules (per implementation doc):

- Backdrop: fixed full-screen overlay with dark scrim (`bg-black bg-opacity-50`).
- Centering: **absolute positioning** + `transform: translate(-50%, -50%)`.
- Sizing: `width: 90%` with `maxWidth` (commonly 400px for smaller modals) and max-height with `overflow-y-auto`.
- Dismiss: click outside closes; internal click stops propagation.

**Z-index policy**

- Modals use high z-index (e.g., `z-[10000]`) to appear above gameplay and header.

### 6.4 Profile modal (`modals/ProfileModal.tsx`)

**Purpose**

- Show identity + premium status at a glance.

**Contents (expected)**

- Wallet address (truncated)
- Balance + network
- GamePass tier + remaining credits
- CTAs: upgrade/add games (contextual)

**States**

- Not connected: show instructions and connect CTA.
- Loading: show spinner and skeleton layout.
- Error: show retry guidance.

### 6.5 Statistics modal (`modals/StatisticsModal.tsx`)

**Purpose**

- Personal performance dashboard (on-chain for premium).

**Primary content**

- Overview cards (Games Played, Best Score, Average Score, Avg Efficiency).
- Detailed cards (Best Clicks, Longest Survival, Avg Clicks).
- Blockchain info (network, address, skill tier, last updated).

**Time formatting**

- Milliseconds → `MM:SS`.

**Refresh**

- Auto refresh after games (documented as ~2s after submission).
- Manual refresh button available.

**States**

- Wallet not connected: connection instructions.
- Loading: progress indicators.
- Error: retry + show cached data if available (React Query caching).

### 6.6 Leaderboard modal (`modals/LeaderboardModal.tsx`)

**Purpose**

- Competitive comparison with multiple categories and skill-tier filtering.

**Required UI elements**

- Category selection (carousel / arrows).
- Tier filter control (cycle tiers).
- Refresh.
- “How rankings work” explanatory section.

**States**

- Loading, empty state, error state, last-updated timestamp.
- Mobile: navigation arrows remain tappable and not clipped.

### 6.7 Settings modal (`modals/SettingsModal.tsx`)

**Purpose**

- Theme selection + game preferences + accessibility options.

**Expected sections**

- Theme selection (with dropdown behavior; click outside closes).
- Accessibility toggles (high contrast, reduced motion, screen reader mode, keyboard navigation).

**Icon rules**

- Icons inherit color; specific section icons can use accent variables (rules exist in `globals.css`).

### 6.8 Theme toggle (`ThemeToggle.tsx`)

**Purpose**

- Switch between the 4 themes.

**Behavior**

- Selecting a theme updates CSS variables and theme class on the app root.
- Theme transition overlay exists (`.theme-transition` / `.theme-transition-overlay`) to soften changes.

**Accessibility**

- Theme options should be keyboard navigable and have clear selected state (ARIA selected/pressed).

### 6.9 Game grid and tiles (`GameGrid.tsx`, `GameGrid` children)

**Purpose**

- The primary interactive surface.

**Tile states**

- Idle: neutral tile.
- Active target: visually distinctive (animation/pulse, accent color).
- Clicked success: immediate feedback (flash/transition).
- Disabled/inert pre-start: wrong clicks do not punish; UI may still show pressed feedback but must not end game.

**Accessibility**

- Grid uses `role="grid"` and tiles are keyboard reachable buttons.
- Focused tile is visually obvious and does not shift layout unpredictably.

### 6.10 Game controls (`GameControls.tsx`)

**Purpose**

- Start game, restart, and any secondary controls.

**Rules**

- Primary action label is consistent (“Start Game”, “Play Again”).
- Disabled state is obvious during transitions (e.g., while ending a session or loading premium services).

### 6.11 Game over modal (`GameOverModal.tsx`)

**Purpose**

- Clearly conclude the session and direct the next action.

**Required content**

- Final score and key performance metrics (time survived, clicks, efficiency).
- Reason for end state (timeout vs wrong click) if available.
- CTA: Play Again; optional: open stats/leaderboard.

**Premium behaviors**

- Submission status: loading → success/error messaging.

### 6.12 GamePass purchase (`GamePassPurchase.tsx`)

**Purpose**

- Upgrade path and credit management.

**Design constraints**

- Keep options simple (tier name, price, games/credits).
- Separate “benefits” explanation from tier selection.
- Modal centering and click-outside-to-close consistent with other modals.

---

## 7. Responsive UI (mobile-first)

### 7.1 Touch targets

The UI enforces minimum touch sizes:

- In `globals.css` for small screens, `button` and `[role="button"]` get minimum dimensions.
- In `accessibility.css`, buttons/links also receive min size on mobile.

**Policy**

- Any new interactive UI must meet the same minimum without relying on pixel-perfect layout.

### 7.2 Mobile layout rules

Mobile-specific adjustments in `globals.css` include:

- scaling the grid down slightly for fit,
- reduced spacing and smaller text utilities,
- modal width constraints (`.mobile-modal`),
- active button press scale feedback.

### 7.3 Overflow and scrolling

Because the page does not scroll, modals must:

- set max height,
- scroll internally,
- keep close affordances visible.

### 7.4 Safe areas and viewport behavior

The project emphasizes safe area handling (notches) and orientation support in architecture/audit docs.

**UI guideline**

- Keep header and primary controls within safe areas.
- Avoid putting critical controls at the extreme top/bottom edges without padding.

---

## 8. Accessibility implementation (UI-level)

This section describes how accessibility is reflected in the UI and CSS (and what to preserve when modifying UI).

### 8.1 Skip link and screen-reader-only content

`src/styles/accessibility.css` provides:

- `.sr-only` utility for visually hidden accessible text.
- `.skip-link` for “skip to content” navigation.

### 8.2 Focus visibility

- Global focus outline uses `--color-accent1`.
- Enhanced focus ring when `.keyboard-navigation` is enabled (thicker outline + box shadow).

### 8.3 Reduced motion

- `prefers-reduced-motion: reduce` disables animations/transitions.
- `.reduced-motion` class forces motion off.

### 8.4 High contrast

- `prefers-contrast: high` overrides key tokens to high-contrast values.
- `.high-contrast` class increases contrast; grid borders become thicker.

### 8.5 Color blindness support

- Active grid tiles include a pattern overlay (repeating linear gradient) to avoid “color-only” meaning.

### 8.6 Modal focus handling

The audit/implementation docs call out focus management; `accessibility.css` includes `.modal-focus-trap` utility scaffolding.

**UI requirement**

- When a modal opens: focus should move into it.
- When it closes: focus returns to the trigger (Menu button or the control that opened it).

---

## 9. Load and performance considerations (UI-facing)

### 9.1 Lazy loading modals

The dropdown system uses lazy loading (`LazyComponents.tsx`) so:

- initial bundle stays smaller,
- modals load only when used.

**UI requirement**

- Suspense fallbacks must be visually consistent (use `LoadingSpinner`).

### 9.2 Avoiding unnecessary reflow during play

Gameplay responsiveness depends on stable layout:

- avoid animations that resize the grid container,
- prefer transforms/opacity for effects,
- keep header updates lightweight (avoid rerender storms).

---

## 10. UI acceptance checklist (quick test list)

### 10.1 Visual and interaction

- [ ] Theme switching updates background + accents with no white “default” UI artifacts.
- [ ] Buttons have consistent hover/focus/active states.
- [ ] Selected states are represented with ARIA (`aria-selected`, `aria-pressed`) where applicable.

### 10.2 Modals and navigation

- [ ] Menu dropdown opens/closes and is keyboard reachable.
- [ ] All modals are perfectly centered on all viewport sizes.
- [ ] Click outside closes dropdown and modals.
- [ ] Modals scroll internally when content is long.
- [ ] Focus is trapped and restored properly.

### 10.3 Mobile

- [ ] Grid remains tappable; no accidental page scroll.
- [ ] Touch targets meet minimum size.
- [ ] Modals fit and remain usable in portrait and landscape.

### 10.4 Accessibility

- [ ] Skip link works.
- [ ] Reduced motion is respected.
- [ ] High contrast mode is supported.
- [ ] Screen reader labels exist for modal titles and key controls.

---

*This is the master UI document for Insomnia Game. It is long by design and intended to be the UI source of truth.*


# UI — Card Battle Game (Full Document)

This document is the **full UI reference** for the **Card Battle Game** project: design system, layout, components, visuals, file reference, responsive approach, and entry/load strategy. It describes **what exists in this repo today** (look, structure, implementation)—separate from a UX narrative (goals/flows/tradeoffs) and a portfolio summary (talking points).

**How to use:** Treat this as the master UI reference. When writing a portfolio version, trim this to what matters most (screens + system + “why it’s built this way”).

---

## 1. Purpose and scope

### 1.1 What this document covers

- **Design system:** Tailwind theme extensions, core palette, typography, spacing, and custom utilities.
- **Layout and structure:** Start screen, in-game layout (player areas, board, log, controls).
- **Components:** Board, cells, cards, player status/hand, log, and common interaction patterns.
- **File reference:** Paths and roles for UI components, hooks, config, and styling.
- **Responsive UI:** Viewport-locked app shell, board zoom-to-fit, and scroll containment.
- **Load strategy and entry points:** Vite entry, app bootstrap, and context provider.

### 1.2 What this document does not cover

- **Game rules and design rationale:** see `docs/game-design/*` (start with `docs/game-design/overview.md` and `docs/game-design/rules.md`).
- **Technical architecture details and reducers/business logic:** see `docs/technical/architecture.md`.
- **Roadmap and planning:** see `docs/development/*` and `docs/project/*`.

### 1.3 Relationship to other docs

- **Architecture**: `docs/technical/architecture.md` (component map, state flow, logic layer).
- **Game design**: `docs/game-design/*` (systems and rule intent that UI surfaces).
- **Development**: `README.md` and `docs/development/setup.md` (run/build/setup).

---

## 2. File reference

Paths are relative to project root unless noted.

### 2.1 UI entry and global styling

- **HTML entry:** `index.html` (root mount node `#root`, title, viewport meta).
- **React entry:** `src/main.tsx` (mounts `<App />` inside `<GameProvider />`, imports global CSS).
- **Global CSS:** `src/styles/index.css`
  - Tailwind layers (`@tailwind base/components/utilities`)
  - App shell constraints (`html, body, #root { height: 100%; overflow: hidden; }`)
  - Custom utilities (`.card-text-*`, `.writing-mode-vertical`) and animation keyframes (`pulse`)
- **Tailwind config:** `tailwind.config.js`
  - Game palette extensions: `game-green`, `game-blue`, `game-red`, `game-yellow`
  - Font family: `font-game`
  - Animations: `fade-in`, `slide-up`, `pulse-slow`
- **PostCSS config:** `postcss.config.js` (Tailwind PostCSS + autoprefixer)

### 2.2 Core UI components

- **Root layout / orchestration:** `src/App.tsx`
  - Start screen vs game screen branching (`gameStarted`)
  - Fullscreen fixed layout shell, gradient backgrounds
  - Top/bottom player status areas, central board, bottom controls with log + “End Turn”
- **Start screen:** `src/components/StartScreen.tsx`
  - Board type selection (Land / Sea / Air)
  - Styled “scenario cards” with distinct theme colors per battle type
- **Board:** `src/components/GameBoard.tsx`
  - Grid rendering for current `board`
  - Zoom-to-fit (initial zoom computed from viewport + board dimensions)
  - Scroll containment detection + zoom controls (+ / reset / -)
- **Cell:** `src/components/GameCell.tsx`
  - Selected / potential move / occupied visuals
  - Inline stats for placed pieces (ATK/DEF/Units/AP)
- **Hand:** `src/components/PlayerHand.tsx`
  - Horizontal card rail with overlap and hover reveal
- **Card rendering:** `src/components/Card.tsx`
  - Template-backed visuals (card background image), text overlays mapped to template regions
  - State styling: playable/selected/current turn vs disabled
- **Player status / resources:** `src/components/PlayerStatus.tsx`
  - Player name, “ACTIVE” turn indicator, resource list, deck count, plus embedded `PlayerHand`
- **Game log:** `src/components/GameLog.tsx`
  - Scrollable action log panel used in the bottom controls bar

### 2.3 Hooks that drive UI behavior

- **Board interaction wrapper:** `src/hooks/useGameBoard.ts` (board + selection + potential moves)
- **Zoom state:** `src/hooks/useZoom.ts` (scale, zoomIn/out/reset/setZoom)
- **Other UI hooks in use by components:**
  - `src/hooks/useBoardInteraction.ts` (cell click handling + selected cell)
  - `src/hooks/useCardDisplay.ts` (hand contents + playability + selection state)
  - `src/hooks/useResourceDisplay.ts` (resource labels + values, deck count)

### 2.4 Game config and types that influence UI

- **Board + unit configs:** `src/config/gameConfig.ts` (`boardConfigs`, `unitCardConfigs`)
- **Core types:** `src/types/game.ts` (Card/Cell/GameState; resources and action types)
- **State provider:** `src/context/GameContext.tsx` (initial state + reducer wiring)

---

## 3. Design system

### 3.1 Theme and color strategy

This UI uses a “**military boardgame**” palette: dark greens for battlefield backdrops, warm browns for panels/frames, and high-contrast yellow/gold for emphasis.

- **Battlefield background:** deep greens (e.g. `#2d5016`, `#1a3d0f`, `#0f2a0a`) appear in `App.tsx`, `StartScreen.tsx`, and `GameBoard.tsx`.
- **Frame / panel chrome:** browns (e.g. `#8b4513`, `rgba(139,69,19,...)`) appear in board frames and control bars.
- **Player identity colors:**
  - Player 1: green (`#4CAF50`, Tailwind `game-green.500`)
  - Player 2: red (`#F44336`, Tailwind `game-red.500`)
- **Highlight:** gold/yellow (`#f4d03f`, `#FFD700`, `#FFC107`) used for title + active turn indicator and callouts.

Tailwind extensions in `tailwind.config.js` provide consistent semantic color scales:
- `game-green`, `game-blue`, `game-red`, `game-yellow`

### 3.2 Typography

- **Global:** `src/styles/index.css` sets the base family (Inter/system stack).
- **Game font:** `tailwind.config.js` defines `font-game` (Segoe UI/Tahoma/Geneva/Verdana).
- **Hierarchy (current implementation):**
  - Start title: large serif-like display styling (implemented via Tailwind + inline style in `StartScreen.tsx`)
  - In-game labels: compact, high-contrast, with constrained layouts (hands, resources, log)

### 3.3 Spacing, sizing, and layout tokens

The UI favors **viewport-relative sizing** with caps to keep the board playable on many screens:

- **Player status areas:** `min(20vh, 160px)` (per player) in `PlayerStatus.tsx`
- **Control bar:** `min(10vh, 80px)` in `App.tsx`
- **Board zoom-to-fit:** computed from viewport and board dimensions in `GameBoard.tsx`
- **Card sizing:** hand cards use container-height (`height: '95%'`) in `Card.tsx`

### 3.4 Custom utilities

`src/styles/index.css` adds:
- `.card-text-*` utility classes to force text colors over template regions.
- `.writing-mode-vertical` for vertical labels (available for future UI).
- `@keyframes pulse` (used for active turn indicator).

---

## 4. Layout and structure

### 4.1 Application shell

The app is intentionally **fullscreen and viewport-locked**:

- `html`, `body`, `#root` are fixed to full height and `overflow: hidden` (`src/styles/index.css`).
- `App.tsx` uses a `fixed inset-0` layout to eliminate page scroll and keep game interactions stable.

### 4.2 Start screen

`StartScreen.tsx` provides the initial selection:
- **Primary call-to-action:** choose a battle type.
- **Three scenario tiles:** Land / Sea / Air, each with distinct accent palette and icon (⚔ / ⚓ / ✈).
- **Backdrop texture:** a subtle SVG dot-grid overlay layered above the gradient background.

### 4.3 In-game layout (main screen)

`App.tsx` composes the in-game UI as:

- **Top:** `PlayerStatus player="Player2"` (hand + resources)
- **Middle:** `GameBoard` (center stage, zoom controls, scroll containment)
- **Bottom:** `PlayerStatus player="Player1"` (hand + resources)
- **Footer controls bar:** `GameLog` + “End Turn” button (or winner banner)

### 4.4 Board presentation

`GameBoard.tsx` renders:
- A bordered board container with scroll enabled only when necessary.
- A framed board “content” panel which scales via `transform: scale(scale)`.
- A CSS grid sized from viewport-derived cell dimensions, using:
  - cell width: `finalCellSize`
  - cell height: `finalCellSize * (4/3)` (card-like aspect)
  - responsive gaps/padding

### 4.5 Zoom controls

Zoom controls are always available and positioned at the right side of the board region:
- `+` zoom in
- `RESET` recalculates the optimal zoom (fit-to-viewport)
- `-` zoom out

The underlying scale state is managed by `useZoom.ts`.

---

## 5. Components

### 5.1 `PlayerStatus`

`PlayerStatus.tsx` is a composite UI:
- Player name + **ACTIVE** turn badge (pulsing)
- Horizontal `PlayerHand`
- Right-side resource list (labels + values) + deck count

### 5.2 `PlayerHand`

`PlayerHand.tsx` renders a horizontal, scrollable “rail” of `Card` components:
- Overlap effect (negative margin) to fit more cards
- Hover expands spacing and lifts the card for readability

### 5.3 `Card`

`Card.tsx` is visually template-driven:
- Uses a background image (currently `'/images/front template crop.png'`)
- Places text in “regions” matching the template’s colored blocks
- Uses `.card-text-*` utilities to ensure readable overlay colors
- State communicates:
  - **selected**: lifted with stronger shadow
  - **playable + current**: player-tinted highlight (green/red)
  - **not current**: muted/disabled look and `cursor-not-allowed`

### 5.4 `GameCell`

`GameCell.tsx` communicates cell state via border styles and overlays:
- **Selected:** green border + glow
- **Potential move:** dashed border + blue highlight dot (pulse)
- **Occupied:** shows unit title + stats (ATK/DEF/Units/AP) and armor/weapon tags

### 5.5 `GameLog`

`GameLog.tsx` is a contained scroll panel:
- Renders `gameLog[]` entries
- Uses visible scrollbar styling and compact typography to fit in footer controls

---

## 6. Responsive UI

### 6.1 Viewport-first constraints (no page scroll)

The UI prioritizes “game-like” stability:
- No body scroll
- Fixed layout regions for player areas + controls
- Board gets remaining space and adapts via zoom-to-fit

### 6.2 Zoom-to-fit board strategy

`GameBoard.tsx` computes initial zoom using:
- viewport width/height
- derived cell sizes (min thresholds for readability)
- reserved height for both player areas and the controls bar

It also recomputes zoom on `resize` and exposes a “reset to optimal” control.

### 6.3 When scrolling is allowed

If scaled board content exceeds its container, the board wrapper toggles to `overflow-auto`; otherwise it stays `overflow-hidden`. This keeps most screens clean while still allowing access to large boards or small viewports.

---

## 7. Accessibility (UI implementation)

Current accessibility characteristics (implementation-driven):

- **Contrast:** primary text is generally high-contrast (white/gold over dark green; dark text over light panels). Template-backed cards rely on explicit text colors via `.card-text-*`.
- **Target size:** major actions (Start options, End Turn, Zoom controls) are large and padded.
- **Keyboard/focus:** there’s no documented focus management yet; interactions are primarily mouse/touch.

If we want to claim accessibility goals formally, this doc should be paired with an accessibility checklist (contrast checks, focus rings, tab order, ARIA for non-semantic clickable divs, and reduced-motion handling).

---

## 8. Load strategy and entry points

- **Entry:** `index.html` loads `src/main.tsx`.
- **Bootstrap:** `src/main.tsx` mounts React and provides `GameProvider`.
- **UI routing:** `App.tsx` branches between:
  - **Start screen** when `gameStarted === false`
  - **Game screen** when `gameStarted === true`

There is no multi-page routing; the UI is a single-screen app with internal state-driven screen changes.

---

## 9. Detailed inventories (copy/paste reference)

### 9.1 Screens and primary regions

- **Start:** battle type selection (Land/Sea/Air)
- **In-game:**
  - Player 2 area (top): name/turn, hand, resources
  - Board area (center): grid + zoom controls
  - Player 1 area (bottom): name/turn, hand, resources
  - Footer: log + end turn / winner indicator

### 9.2 Board types (UI-facing)

Defined in `src/config/gameConfig.ts`:
- **Land Battle:** \(4 \times 3\)
- **Sea Battle:** \(3 \times 4\)
- **Air Battle:** \(3 \times 4\)

### 9.3 Core UI states to represent

- **Turn state:** active player indicator on `PlayerStatus`
- **Selection state:** selected card (hand) and selected cell (board)
- **Move affordance:** potential move cells dashed + blue pulse dot
- **Outcome state:** winner banner replacing “End Turn”
- **Zoom state:** current zoom and reset-to-fit

---

## 10. Related documentation

- **Top-level:** `README.md`
- **Documentation index:** `docs/README.md`
- **Architecture:** `docs/technical/architecture.md`
- **Game overview/rules:** `docs/game-design/overview.md`, `docs/game-design/rules.md`
- **Roadmaps and planning:** `docs/development/*`, `docs/project/*`
- **Note:** `docs/README.md` currently references additional technical/project docs (e.g. components/state/types/config, changelog/roadmap) that are not present in this repo yet; treat the index as aspirational until those files are added.

---

*This is the full UI reference for the Card Battle Game project. Next documents in this “set” are the UX narrative and the portfolio/accomplishments summary.*


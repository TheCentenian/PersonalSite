# Portfolio & Accomplishments: Card Battle Game

This document describes, in explicit and expanded form, what has been built in the **Card Battle Game** application: React/TypeScript frontend, game UI and interaction logic, and the core client-side game systems (movement, combat, resources, turns, and win conditions).

It is intended for portfolio use and communicating scope of work without focusing on product marketing.

**How to use this document:** The content is intentionally detailed so you can trim later. The **Codebase and File Reference** section gives a single place to find paths and module names when you need to keep/drop specifics. Sections **7** and **8** are tuned for applications and interviews; the rest is the full technical and narrative backing.

---

## Key Points: Card Battle Game in One Place

- **Product:** **Card Battle Game** — a turn-based tactical card board game for **two players**.
- **Core gameplay loop:** choose battle type (Skirmish mode) -> deploy units from hand onto a board -> move using action points -> initiate combat -> end turn -> capture territory until victory.
- **Board:** fixed-size tactical grid (MVP uses a 3x4 skirmish layout; code supports multiple board types such as `landBattle`, `seaBattle`, and `airBattle`).
- **Deck + hand:** each player has a deck and draws cards into a hand (current MVP deck builder uses unit card configs).
- **Multi-resource economy:** cards have multi-resource costs (Infantry, Airmen, Seamen, Engineers, Supplies). Resources are generated at the start of each player turn and spent on deployment.
- **Tactical movement:** units can move if they have remaining action points; valid moves are limited by Manhattan distance and unoccupied destination cells.
- **Combat system:** combat resolves using attacker/defender unit stats with armor/weapon effectiveness modifiers and randomized factors; results update units, reduce action points, and are recorded to an in-game log.
- **Win conditions:** the game checks victory by whether a player owns all opponent starting positions (territory ownership).
- **Architecture:** React + TypeScript + Vite frontend; centralized state via `GameContext` + `useReducer`; UI-driven interaction handled by hooks that orchestrate reducer actions and pure utils.
- **Implementation style:** emphasis on readable UX states (selected, potential move, playable vs unplayable cards), and debuggable game behavior via `gameLog`.

---

## Codebase and File Reference

Paths are relative to the project root unless noted.

### Frontend (this repository)

- **Entry + bootstrap:**
  - `index.html` - app mount entry.
  - `src/main.tsx` - renders `<App />` inside `<GameProvider />` and imports global styles.
  - `src/App.tsx` - top-level UI shell: Start Screen vs in-game layout; composes player panels, board, log, and End Turn / winner state.

- **UI components (screens + primitives):**
  - `src/components/StartScreen.tsx` - battle type selection and initial game start.
  - `src/components/GameBoard.tsx` - board grid rendering, zoom-to-fit, zoom controls, scroll containment.
  - `src/components/GameCell.tsx` - cell visuals (empty vs occupied), selection/potential-move affordances.
  - `src/components/PlayerHand.tsx` - horizontally scrollable hand rail.
  - `src/components/Card.tsx` - template-backed card visuals + state styling (selected/playable/unplayable).
  - `src/components/PlayerStatus.tsx` - player identity + ACTIVE badge + embedded `PlayerHand` + resource list.
  - `src/components/GameLog.tsx` - scrollable action log panel.

- **State and reducers:**
  - `src/context/GameContext.tsx` - initial state, `GameProvider`, `useGame()` hook.
  - `src/context/reducers/combinedReducer.ts` - composes board/player/game-flow slices and cross-cutting concerns (win check + turn logging).
  - `src/context/reducers/boardReducer.ts` - board cell updates (place/move/update ownership/end turn reset).
  - `src/context/reducers/playerReducer.ts` - turn progression, resource generation, draw/hand updates, and selected card state.
  - `src/context/reducers/gameReducer.ts` - game started/winner/game log slice and flow reducer.

- **Hooks (UI interaction orchestration):**
  - `src/hooks/useBoardInteraction.ts` - click routing: place card, select unit/cell, move, and initiate combat.
  - `src/hooks/useCardDisplay.ts` - hand display state (playable/unplayable, tooltips, truncated titles).
  - `src/hooks/useCardPlacement.ts` - placement rules: currently starting positions only.
  - `src/hooks/useMovement.ts` - move dispatch + move validity wrapper.
  - `src/hooks/useCombat.ts` - combat dispatch + combat mechanics invocation.
  - `src/hooks/useZoom.ts` - scale state and zoom controls.
  - `src/hooks/useGameBoard.ts` - board access plus potential move calculation.
  - `src/hooks/useCellSelection.ts` - cell selection/deselection rules.
  - (Other UI hooks present in `src/hooks/` are used to support display and interaction.)

- **Game configuration and core types:**
  - `src/types/game.ts` - domain types (BoardType, Player, Card, Cell, GameState, GameAction).
  - `src/config/gameConfig.ts` - battle type board configs and unit card configs used for deck building.
  - `src/config/gameConstants.ts` - constants for action/combat/UI behavior (MVP defaults).

- **Pure utils (game rules + formatting):**
  - `src/utils/board/boardInitialization.ts` - board grid initialization and bounds/adjacency helpers.
  - `src/utils/board/boardUpdateUtils.ts` - pure board update helpers (place/move/reset action points).
  - `src/utils/cards/deckManagement.ts` - deck initialization (from unit card configs), draw/shuffle, and can-play evaluation.
  - `src/utils/movement/movementUtils.ts` - move validity (Manhattan distance, AP gating, bounds, destination occupancy).
  - `src/utils/combatMechanics.ts` - combat damage calculation with armor/weapon effectiveness and randomized factors.
  - `src/utils/gameLogic/turnManagement.ts` - end turn handling helpers.
  - `src/utils/gameLogic/winConditions.ts` - victory evaluation based on territory ownership of starting cells.
  - `src/utils/resources/resourceManagement.ts` - base resource generation and multi-resource spending checks.
  - `src/utils/display/formatters.ts` - card cost formatting, tooltips, truncation, and unit display helpers.

- **Styling:**
  - `src/styles/index.css` - Tailwind layers + custom utilities (card text color helpers, base layout, pulse keyframes).
  - `tailwind.config.js` - game palette extensions and animation keyframes.

- **Static asset references:**
  - `src/components/Card.tsx` references `'/images/front template crop.png'` for card template visuals.
  - Root `images/` exists in the repo; if you want Vite to serve them reliably, consider placing assets under `public/images/` (future work).

---

## 1. Technologies, Tools, and Libraries

### 1.1 Core Framework and Runtime (Frontend)

- **Runtime:** Browser
- **Frontend framework:** React 18 (`react`, `react-dom`)
- **Language:** TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS (with extended game colors and custom animations)
- **State management:** React Context + `useReducer` (custom reducers per slice)

### 1.2 Game logic organization

- Pure rule utilities in `src/utils/*` (combat, movement, win conditions, resource rules)
- UI orchestration in `src/hooks/*` (click routing and dispatch sequencing)
- Visual presentation in `src/components/*`

---

## 2. Architecture and Code Organization

### 2.1 Project boundaries

- This repo is a **single-page frontend** (no separate backend service).
- All gameplay logic runs client-side and is represented in reducer state (`GameState`) and board cell models.

### 2.2 Game systems (Frontend)

- **Core UI shell:** `src/App.tsx`
- **Board system:** `src/components/GameBoard.tsx` + `src/components/GameCell.tsx`
- **Card system:** `src/components/Card.tsx` + `src/hooks/useCardDisplay.ts` + `src/components/PlayerHand.tsx`
- **Interaction system:** `src/hooks/useBoardInteraction.ts` and the specialized hooks:
  - `useCardPlacement.ts`
  - `useCellSelection.ts`
  - `useMovement.ts`
  - `useCombat.ts`
- **State system:** `GameContext.tsx` and reducers in `src/context/reducers/*`

### 2.3 Key data flows

- **Start flow:** `StartScreen.tsx` dispatches `START_GAME` -> reducers initialize board and hand/decks (deck initialization + draw).
- **Turn flow:** user clicks `End Turn` -> `END_TURN` updates board action points + turns occupied -> `combinedReducer` checks win condition and logs base resource gain.
- **Action flow:** user interactions are routed by `useBoardInteraction.ts`:
  - selected card + click board cell => `PLACE_CARD`
  - selected cell + empty cell => `MOVE_PIECE`
  - selected piece + enemy piece => combat -> `UPDATE_BOARD` + log entries

---

## 3. Game Design and Mechanics (Summary)

- **Theme:** tactical “military boardgame” presentation with two-sided identity colors.
- **Board:** grid-based tactics; board dimensions are derived from battle type configuration.
- **Cards:** current MVP deck builder uses `unit` cards from `unitCardConfigs` and enforces multi-resource costs.
- **Resources:** 5-resource model (Infantry/Airmen/Seamen/Engineers/Supplies); base generation depends on `boardType`.
- **Deployment rule (MVP):** cards can be placed only in starting positions for the current player (`useCardPlacement.ts` + `winConditions.getStartingPositions`).
- **Movement rule:** Manhattan distance <= `currentActionPoints`, destination must be empty, and movement consumes action points.
- **Combat rule:** combat uses:
  - attacker/defender stats multiplied by unit counts
  - armor/weapon effectiveness table
  - terrain modifier placeholder (`terrain` param exists in combat util)
  - randomized damage factors
- **Victory rule:** player wins by owning all opponent starting cells (`winConditions.ts`).
- **Feedback:** important outcomes and failures are written into `gameLog` and shown in `GameLog.tsx`.

---

## 4. Milestones and Major Accomplishments

### 4.1 Game loop MVP

- Implemented a full turn-based loop (deploy -> select -> move/attack -> end turn -> win check).
- Added in-game state visibility:
  - current player “ACTIVE” badge (`PlayerStatus.tsx`)
  - resource list and deck count
  - action affordances (selected cell, potential moves)
  - audit trail (`GameLog.tsx`)

### 4.2 Rule systems in code

- **Movement:** AP-gated Manhattan movement with destination occupancy checks (`movementUtils.ts`).
- **Combat:** stat-based combat resolution with armor/weapon effectiveness and randomized damage factors (`combatMechanics.ts`).
- **Economy:** base resource generation per turn and multi-resource spending validation (`resourceManagement.ts`, `deckManagement.ts`, reducer `PLACE_CARD`).
- **Victory:** ownership-based win condition based on starting positions (`winConditions.ts` + reducer cross-cutting logic).

### 4.3 UI scaling + usability

- Implemented zoom-to-fit board scaling in `GameBoard.tsx` based on viewport dimensions.
- Added zoom controls (+ / RESET / -) backed by `useZoom.ts`.
- Kept layout stable by using viewport-locked shell and disabling body scroll (`src/styles/index.css` and `App.tsx`).

---

## 5. Patterns and Practices in Use

- **Reducer slice separation:** `boardReducer`, `playerReducer`, `gameReducer` with a `combinedReducer` for cross-cutting concerns.
- **Pure utilities for rules:** movement/combat/resource/win checks live in `src/utils/*` for testability and reuse.
- **UI orchestration via hooks:** click routing and sequencing is concentrated in `src/hooks/*` instead of inside components.
- **Type-driven models:** `src/types/game.ts` defines the domain objects and action types used across UI, hooks, and reducers.
- **State-driven UI:** UI renders from reducer state (`App.tsx`, board cells, and hand displays).
- **User feedback via log:** most invalid actions and outcomes are recorded in `gameLog` and rendered in the log panel.

---

## 6. Known Limitations and Future Work

This portfolio doc reflects what exists in the current codebase. Important gaps and next steps:

- **Client-side only (no persistence):** game state resets on refresh; no save/load and no multiplayer.
- **Limited card type coverage:** the types define multiple `CardType` values (unit/equipment/tactics/engineering/resource), but the MVP deck builder currently creates cards as `type: 'unit'`.
- **Deployment UX can be more guided:** placement is constrained to starting positions, but the UI does not yet highlight “valid placement targets” when a card is selected (logs explain invalid attempts).
- **Combat/terrain presentation:** combat util supports a `terrain` parameter, but the board currently does not surface terrain effects in UI or dispatch.
- **Accessibility is partial:** current UI uses many clickable `div`s and inline styles; keyboard navigation and ARIA semantics are not documented as complete.
- **Asset serving concern:** card component references `'/images/*'`, but Vite serves static assets from `public/` by default. If `/images` is not under `public/images`, templates may fail in production builds. (Future: move assets into `public/images`.)
- **Testing:** test utilities exist in `src/utils/testing/testUtils.ts`, but no explicit test suite is included in the repo at this time.

---

## 7. What You Can Say About This Work

When promoting yourself or discussing this project, you can accurately say that you built:

- A complete **turn-based tactical card board game** frontend in **React + TypeScript** with a stable fullscreen game shell.
- A centralized game state system using **React Context + reducers**, with separate rule utilities for movement, combat, resources, and win checks.
- A fully interactive board UX:
  - card selection in a hand rail
  - starting-position constrained deployment
  - unit selection with move affordances
  - combat initiation by clicking enemy-occupied cells
  - end-turn ownership updates and a winner state
- A combat system with **armor/weapon effectiveness** and randomized damage, including a structured, readable in-game log.
- A multi-resource economy with **multi-resource card costs**, base resource generation per turn, and spending validation enforced by reducers.
- A responsive board scaling strategy via **zoom-to-fit** and controlled scroll containment.

This document is the explicit, expanded reference for that work.

---

## 8. Positioning for Applications

- **Frontend engineering (game UI):** emphasize viewport-locked layout, selection/affordance UX, and render-first state design.
- **TypeScript architecture:** highlight typed domain models, reducer slice separation, and pure-rule utilities.
- **Gameplay systems:** movement AP gating, stat-based combat, and ownership-based win condition implemented as deterministic utilities (with controlled randomness).
- **Debuggability:** game actions + failures are surfaced in an in-app log so playtesting and reasoning are easier.

Use the **Key Points** and **Codebase and File Reference** to tailor what you mention for each audience (resume vs interview vs stakeholder discussion).


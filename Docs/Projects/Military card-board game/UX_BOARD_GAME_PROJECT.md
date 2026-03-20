# UX — Card Battle Game (Full Document)

This document is the **full UX reference** for the **Card Battle Game** project: user goals, friction reduction, flows, feedback, decision points, learnability, responsiveness, accessibility scope, tradeoffs, and known UX gaps. It complements the UI reference (`docs/UI_BOARD_GAME_PROJECT.md`), which focuses on **what’s on screen and where it lives in the code**.

**How to use:** Treat this as the master UX narrative. Trim by audience (design review, roadmap discussion, portfolio talk track) or by section (e.g. “decision points + feedback only”).

---

## 1. Purpose and scope

### 1.1 What this document covers

- **User goals and outcomes** the current UI supports.
- **Core interaction flows**: start → deploy → select/move → combat → end turn → win.
- **Friction we reduce**: turn clarity, placement constraints, move affordances, and logging.
- **Feedback and trust**: what gets shown/communicated for success, failure, and uncertainty.
- **Learnability**: how rules are made discoverable through constraints and UI states.
- **Responsive behavior**: zoom-to-fit board, scroll containment, viewport-locked layout.
- **Accessibility scope**: what exists, what’s missing, and what a compliance pass would require.
- **Tradeoffs** in the current MVP UI/logic and what’s intentionally out of scope.

### 1.2 What this document does not cover

- **Full visual system details**: see `docs/UI_BOARD_GAME_PROJECT.md`.
- **Deep rules/spec authoring**: see `docs/game-design/*` (starting with `overview.md` and `rules.md`).
- **Implementation architecture**: see `docs/technical/architecture.md`.

### 1.3 Relationship to other docs

- **UI reference:** `docs/UI_BOARD_GAME_PROJECT.md` (screen composition, components, file reference).
- **Game design intent:** `docs/game-design/overview.md`, `docs/game-design/rules.md`, `docs/game-design/walkthrough.md`.
- **Technical architecture:** `docs/technical/architecture.md`.
- **Known issues:** `docs/project/issues.md` (includes UX/accessibility backlog items).

---

## 2. User goals and outcomes

### 2.1 Primary user goals

We design for players who want to:

1. **Start a match quickly** — choose a board type and begin without configuration overhead.
2. **Understand what’s allowed** — where can I deploy, where can I move, when can I attack?
3. **Make tactical decisions** — manage action points, choose fights, and position for territory control.
4. **Track the game state** — whose turn it is, what units exist, what just happened.
5. **Win with clarity** — know what the victory condition is and when it’s been achieved.

### 2.2 Outcomes the current UX enables (implemented)

- **Single-screen, low-friction start:** start screen → pick battle type → game begins (`StartScreen.tsx` → `App.tsx` dispatches `START_GAME`).
- **Constrained deployment:** cards can only be placed on your **starting row** positions; invalid placement yields a log message (`useCardPlacement.ts`).
- **Move discoverability:** selecting your unit makes potential move tiles visually distinct (dashed border + pulse dot) (`GameBoard.tsx` + `GameCell.tsx` + `canMoveTo`).
- **Action point budgeting:** movement range is limited by `currentActionPoints` (Manhattan distance) and combat costs action points (`movementUtils.ts`, `useCombat.ts`).
- **Battle feedback:** combat resolves with a multi-line summary in the log (attacker/defender, effectiveness, units lost) (`useCombat.ts` → `combatMechanics.ts`).
- **Territory win clarity:** win condition is “own all opponent starting cells” (`winConditions.ts`).

### 2.3 Design intent that is documented but may not be fully wired yet

Some of the game-design docs describe future or partially implemented behavior (e.g. richer resource generation phases, multiple card types beyond units, larger boards, full deck-building UX). This UX doc is careful to distinguish:

- **Implemented now** (the app’s current interaction contract)
- **Planned / described** (design intent that may not be reflected in code yet)

---

## 3. Friction we reduce (and how)

### 3.1 “Where can I deploy?” is made explicit by constraint

**Problem:** Free placement creates analysis paralysis and accidental invalid plays.

**Solution (implemented):** Deployment is valid only on your **starting positions** (top row for Player2, bottom row for Player1 across all columns). Attempting to place elsewhere logs a clear message (“Cards can only be placed in starting positions.”).

**Where it lives:** `useCardPlacement.ts`, `winConditions.ts` (`getStartingPositions`).

### 3.2 “Where can I move?” is signposted visually

**Problem:** Movement range is hard to reason about without a strong visual affordance.

**Solution (implemented):** After selecting a unit, potential destinations are visually marked (dashed border and centered pulse dot on empty cells).

**Where it lives:** `useGameBoard.ts` + `useBoardInteraction.ts` + `movementUtils.ts` + `GameCell.tsx`.

### 3.3 “What just happened?” is preserved in the log

**Problem:** Tactical games can feel unfair or confusing without an audit trail.

**Solution (implemented):** Movement and combat write human-readable entries to the log; invalid actions also write explanatory log lines.

**Where it lives:** `useMovement.ts`, `useCombat.ts`, `useCardPlacement.ts`, `GameLog.tsx`.

---

## 4. Core flows (implemented today)

### 4.1 Start a match

1. User lands on **Start Screen**.
2. User selects **Land / Sea / Air**.
3. Game state is initialized and the UI transitions to the in-game layout.

**Where it lives:** `StartScreen.tsx`, `App.tsx`, `GameContext.tsx`, `config/gameConfig.ts`.

### 4.2 Select a card (hand)

1. Player views their hand in their `PlayerStatus` area.
2. If it is their turn, clicking a card selects it.
3. Card selection is used by the placement flow when clicking the board.

**Where it lives:** `PlayerHand.tsx`, `Card.tsx`, `useCardDisplay.ts`, reducer action `SELECT_CARD` (in reducers).

### 4.3 Place a card (deployment)

1. With a selected card, user clicks a cell on the board.
2. If the cell is a valid empty starting position, the card is placed.
3. If invalid, a log entry explains why (wrong location or occupied).

**Where it lives:** `useBoardInteraction.ts` → `useCardPlacement.ts`.

### 4.4 Select a unit and move

1. User clicks a unit they own to select it.
2. Potential moves are highlighted.
3. Clicking an empty highlighted cell moves the unit and logs the move.

**Movement contract (implemented):**
- Destination must be within board bounds.
- Destination must be empty.
- Manhattan distance \(\le\) `currentActionPoints`.

**Where it lives:** `useBoardInteraction.ts`, `useMovement.ts`, `movementUtils.ts`.

### 4.5 Initiate combat

1. User selects one of their units.
2. User clicks an enemy-occupied cell.
3. If combat is allowed, the combat system runs, updates unit counts/AP, and logs the result.
4. If combat is not allowed, the log explains the failure.

**Combat contract (implemented):**
- Attacker and defender must belong to different players.
- Attacker must have at least 1 action point available.
- Combat consumes action points (`COMBAT_ACTION_COST`).

**Where it lives:** `useCombat.ts` → `combatMechanics.ts` + log dispatch.

### 4.6 End turn and ownership progression

1. User clicks **End Turn**.
2. Turn advances.
3. The system evaluates ownership capture rules for cells (based on occupancy duration).

**Ownership capture (implemented in end-turn helper):**
- If a cell has a `card.owner`, has been occupied for more than 1 turn (`turnsOccupied > 1`), and `cell.owner` is not set, the cell owner is updated.

**Where it lives:** `App.tsx` (`handleEndTurn`), `utils/gameLogic/turnManagement.ts`.

### 4.7 Victory

Victory is checked by whether a player owns all of the opponent’s starting cells (top row or bottom row across columns).

**Where it lives:** `utils/gameLogic/winConditions.ts`.

---

## 5. Key decision points (what the UX must make clear)

### 5.1 “Is it my turn?”

**Implemented UI cue:** `PlayerStatus` shows an “ACTIVE” badge for the current player, with pulsing styling.

### 5.2 “Can I play this card?”

**Current behavior:** `useCardDisplay.ts` computes `playable` based on resource availability (`canPlayCard`), but the exact visual affordances of “playable vs unplayable” depend on card rendering states.

**UX requirement:** If resources matter, the UI must clearly show:
- what resources you have
- what a card costs
- why a card is not playable

### 5.3 “Where can I place it?”

**Implemented:** starting-positions-only placement rule. Invalid attempts log a message.

**UX risk:** relying only on logs can be missed; future improvement is a pre-highlight of valid starting cells when a card is selected.

### 5.4 “Where can I move?”

**Implemented:** potential move highlighting on board cells.

### 5.5 “What happened in combat?”

**Implemented:** combat writes a structured, multi-line explanation to the log (effectiveness + losses).

**UX risk:** dense logs in a small panel; future improvement is a modal/tooltip summary or inline floating numbers.

---

## 6. Feedback and trust

### 6.1 Success feedback

- **Movement:** log line confirms destination.
- **Combat:** log block summarizes outcome; defeated units are explicitly called out.
- **Win:** winner message replaces the End Turn control region.

### 6.2 Failure feedback

Failures are currently handled mainly through log messages:
- invalid placement (not a starting cell, occupied cell)
- invalid combat (insufficient action points / invalid target)
- missing attacker/defender safety check

### 6.3 Uncertainty and “what’s happening now?”

There’s no async/network loading in the MVP, so “loading feedback” is not a major concern. The main UX uncertainty is **rules discovery**, which is mitigated via constraints + highlights + log explanations.

---

## 7. Learnability and cognitive load

### 7.1 Constraints as tutorial

Instead of a multi-step tutorial, the MVP relies on:
- limited legal deployment positions
- explicit move affordance
- log feedback on invalid actions

This reduces cognitive load because the player learns by doing, inside a small bounded ruleset.

### 7.2 Terminology and on-screen stat mapping

Unit stats shown on cells (ATK/DEF/Units/AP) help players connect:
- “action points” to how far a unit can move and whether it can fight
- “units” to combat attrition and defeat conditions

### 7.3 Game design docs vs in-app teaching

The repo contains deep design documentation, but the in-app UI does not yet surface:
- a “How to Play” view
- a rules reference panel
- tooltips for key mechanics beyond the card title tooltip

That’s a conscious MVP scope tradeoff: fewer screens, faster iteration.

---

## 8. Responsive and input UX

### 8.1 Viewport-locked layout

The app uses a fixed fullscreen layout and avoids page scrolling to keep board interactions stable (`styles/index.css`, `App.tsx`).

### 8.2 Zoom-to-fit board

The board computes an initial zoom to fit within available viewport space, then recalculates on resize. When the content exceeds the container, scroll is enabled as a fallback.

**Where it lives:** `GameBoard.tsx`, `useZoom.ts`.

### 8.3 Mouse-first interaction (current)

Interactions are primarily click-based:
- click to select card
- click to place
- click to select unit
- click to move/attack

There is not yet a dedicated touch or keyboard interaction model.

---

## 9. Accessibility and inclusion (scope)

### 9.1 What exists

- **High-contrast palette** in most contexts (gold/white over dark green; dark over light panels).
- **Large primary targets** (start buttons, end turn, zoom controls).
- **Text tooltips** exist for cards via the HTML `title` attribute.

### 9.2 What is not yet covered (and should be tracked explicitly)

- **Keyboard navigation** for board and hand.
- **Screen reader semantics** (many clickable elements are `div`s; requires roles/ARIA and focus styles).
- **Reduced motion** handling for pulsing/hover animations.
- **Color-only state encoding** (selected/potential move states rely heavily on color and border style).

`docs/project/issues.md` already tracks accessibility as a medium-priority topic; this doc treats it as in-scope for future UX improvement but not claimed as complete today.

---

## 10. Tradeoffs we made

### 10.1 Minimal screens vs richer guidance

We chose a single start screen + single game screen, with learnability delivered via constraints and highlights rather than adding tutorial panels or multi-step onboarding.

### 10.2 Log-first feedback vs visual combat effects

The log provides transparent outcomes, but it is not as emotionally legible as animations or inline effects. MVP favors correctness + debuggability over spectacle.

### 10.3 “Starting positions only” placement

This significantly reduces early-game complexity and invalid play, but it narrows strategic variety. It’s a strong MVP rule that can be expanded later with additional placement rules and UI affordances.

### 10.4 Zoom-to-fit vs fixed breakpoints

Rather than designing multiple layout breakpoints, the board scales dynamically. The tradeoff is that very small screens may still require scroll or aggressive zoom-out.

---

## 11. UX gaps / next UX improvements (high leverage)

These are UX-oriented improvements that would meaningfully increase clarity without requiring major architecture changes:

- **Placement affordance:** highlight valid starting cells when a card is selected.
- **Move clarity:** show remaining action points more prominently on selected unit; optionally show distance cost to hovered cell.
- **Combat readability:** optional compact combat summary overlay (keep log as the audit trail).
- **Rules access:** a “How to Play” modal or side panel that summarizes core rules and win conditions.
- **Keyboard support:** basic navigation and action bindings (select next unit/card, confirm move/attack, end turn).

---

## 12. File and documentation references

### 12.1 UX-relevant UI code

- **App shell and primary flow:** `src/App.tsx`
- **Start:** `src/components/StartScreen.tsx`
- **Board + zoom:** `src/components/GameBoard.tsx`, `src/hooks/useZoom.ts`
- **Interaction logic:** `src/hooks/useBoardInteraction.ts`, `src/hooks/useMovement.ts`, `src/hooks/useCombat.ts`, `src/hooks/useCardPlacement.ts`
- **Cards and playability:** `src/components/Card.tsx`, `src/hooks/useCardDisplay.ts`, `src/utils/cards/deckManagement.ts`
- **Movement and combat mechanics:** `src/utils/movement/movementUtils.ts`, `src/utils/combatMechanics.ts`
- **Victory and turns:** `src/utils/gameLogic/winConditions.ts`, `src/utils/gameLogic/turnManagement.ts`
- **Feedback surface:** `src/components/GameLog.tsx`

### 12.2 Supporting docs

- `docs/UI_BOARD_GAME_PROJECT.md`
- `docs/technical/architecture.md`
- `docs/game-design/overview.md`
- `docs/game-design/rules.md`
- `docs/game-design/walkthrough.md`
- `docs/project/issues.md`

---

*This is the full UX reference for the Card Battle Game project. Next document in the set is the portfolio/accomplishments summary.*


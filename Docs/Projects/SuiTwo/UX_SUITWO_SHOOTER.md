# UX — SuiTwo Market Shooter (Full Document)

This document is the **full UX reference** for the SuiTwo Market Shooter game: user goals, friction reduction, flows, feedback, decision points, progression, context, learnability, responsiveness, accessibility, tradeoffs, and scope. It is intended to be **exhaustive** so you can tailor it later for one-pagers, stakeholder decks, or interview prep. It complements the **UI/UX portfolio** (`PORTFOLIO_UI_UX_SUITWO_SHOOTER.md`), which focuses on design system, components, and file references.

**How to use:** Treat this as the master UX narrative. Trim by section or by audience (e.g. “friction + feedback only” for product, “goals + tradeoffs” for design reviews).

---

## 1. Purpose and scope

### 1.1 What this document covers

- **User goals and outcomes** we design for.
- **Friction we reduced** and why (credits/tickets, one-per-type, tournament clarity).
- **First-time vs returning** experience and entry paths.
- **Feedback and trust**: success, failure, loading, error recovery.
- **Clarity at decision points**: Play, Store, item consumption, post-game.
- **Progression and motivation**: badge, achievements, in-game HUD.
- **Context and mode clarity**: regular vs tournament, menu vs in-game.
- **Learnability and cognitive load**: rules, wizards, How to Play.
- **Responsive and input UX**: device-based experience, touch, viewport.
- **Accessibility and inclusion**: what we aimed for and what we didn’t do.
- **Tradeoffs we made** and **scope we didn’t cover** (research, metrics).

### 1.2 What this document does not cover

- **Visual design system** (colors, typography, components): see `PORTFOLIO_UI_UX_SUITWO_SHOOTER.md`.
- **Backend, contracts, or platform**: see engineering portfolio and platform docs.
- **Product roadmap or positioning**: see concept and planning docs.
- **Platform admin UX**: see `PORTFOLIO_UI_UX_PLATFORM_ADMIN.md`.

### 1.3 Relationship to other docs

- **PORTFOLIO_UI_UX_SUITWO_SHOOTER.md**: UI/UX work (design system, layout, components, file reference). Use that for “what we built”; use this doc for “why and how it serves users.”
- **Store / leaderboard / badge / tournament handoff docs**: Implementation and validation rules; this doc references them for flow and clarity.
- **HOW_TO_PLAY_MODAL_STRUCTURE.md**: Content and asset structure for How to Play; this doc describes the UX role of that modal.

---

## 2. User goals and outcomes

### 2.1 Primary user goals

We design for users who want to:

1. **Play a run** — Start a game quickly, use credits or tickets without a transaction every time, and focus on gameplay.
2. **Compete** — Enter tournaments, see that a run counts for a tournament (gold border, theme), and check leaderboards.
3. **Collect and equip** — Buy items, see what they own, choose what to use for the next run (one per type), and see active consumables in-game.
4. **Progress** — See badge tier and discounts, milestones and achievements, and in-game progression (score, tier, orb, force field, bosses).
5. **Learn** — Understand controls, enemies, bosses, store, and tournaments without leaving the game (How to Play modal).

Secondary goals: adjust settings and sound, connect wallet, mint or upgrade badge, create tournaments, view rewards. These are supported but not the primary loop.

### 2.2 Outcomes we enable

- **“Play in one click after first setup”** — Credits and tickets are bought in advance; consumption is automatic on Play (one credit or one ticket per game). No wallet prompt or transaction per run.
- **“I always know what I’ve selected for this run”** — One item per type, with clear visual states (available / selected / disabled). Item consumption modal only when there is inventory; otherwise we skip it.
- **“I know when this run counts for a tournament”** — Gold theme in tournament modals and creation wizard; gold border on the game canvas in tournament mode.
- **“I know what I’m buying and what I get”** — Item cards show icon, name, description, level options, price, and badge discount; inventory shows owned items; consumable footer shows active consumables in-game.
- **“I can find rules and content in one place”** — How to Play is a single tabbed modal with accordions; no scattered tooltips or separate tutorial flow.

### 2.3 Assumed user (design intent)

We assume a player who:

- Wants to play a session (one or many runs) with minimal setup after the first time.
- May or may not have a wallet connected at first (demo available without wallet).
- Cares about score, rank, and optionally tournaments and badge benefits.
- Can read labels and follow a small set of rules (one item per type, credits vs tickets).
- May be on desktop or mobile; we tailor layout and input by device, not by fixed breakpoints.

We do **not** assume formal personas or validated segments; this is design intent for prioritization and consistency.

---

## 3. Friction we reduced

### 3.1 Credits and tournament tickets: no transaction per play

**Problem:** Requiring a wallet transaction or confirmation for every single run would make play feel heavy and interrupt the loop.

**Solution:** Credits (regular play) and tournament tickets (tournament play) are **purchased in advance** in the store (Game Pass tab, Tournament Tickets tab, or packs). When the user hits **Play**, one credit or one ticket is **consumed automatically** from their balance. No wallet prompt or signing step per game. The user transacts occasionally to top up; every subsequent play is a single action (Play → optional item consumption if they have inventory → game loads).

**Where it lives:** game-service.js (start game, consume credit/ticket); store-game-pass-tab.js, store-tournament-tickets-tab.js (purchase); game-pass-display.js (show balance in menu). Documented in PORTFOLIO_UI_UX_SUITWO_SHOOTER.md §4.1, §6.3.

### 3.2 One item per type: no invalid combinations

**Problem:** Allowing multiple levels of the same item type (e.g. two different orb levels) could create invalid or confusing builds and unclear feedback.

**Solution:** **One selection per item type per game.** The user picks at most one level per type (e.g. orb level 1, 2, or 3). Level buttons show **available** (clickable), **selected** (highlighted), **disabled** (other levels of same type greyed out). Clicking the selected level again deselects. The rule is visible in the UI so users don’t have to guess. Selection is stored in `game.selectedItems` and used at game start (item-consumption.js, store-item-selection.js).

**Where it lives:** store-item-selection.js, store-item-rendering.js; STORE_ITEM_SELECTION_RULES.md, STORE_UI_IMPLEMENTATION_HANDOFF.md.

### 3.3 Tournament context: always visible when it matters

**Problem:** Users might forget that the current run counts for a tournament, or confuse tournament vs regular play.

**Solution:** **Visual distinction for tournament context.** Tournament modals and creation wizard use a **gold theme** (e.g. #FFD700, #FFC107) for borders, accents, and headings. When the active game is a **tournament run**, the **game canvas** has a **gold border** (desktop: 3px solid #FFD700 with glow; mobile: viewport-relative gold border and shadow). So at a glance the user sees “this run is for a tournament.” Status text (e.g. “Boss Fight!”) and post-game flow (score submission, redirect) reinforce the same.

**Where it lives:** shared-panels.css (tournament gold theme), tournament-creation-modal.css; desktop-game-ui.css (`canvas.tournament-mode`), mobile-game-ui.css (`.mobile-game-canvas.tournament-mode`); game-service.js, leaderboard-score-submission.js (post-game redirect).

### 3.4 Store opened in the right context

**Problem:** User needs tickets but opens the store on the default Items tab and has to hunt for Tournament Tickets.

**Solution:** **Contextual open.** The store can be opened with a context (e.g. `showStore('tickets')`) so it opens directly on the **Tournament Tickets** tab. Used when the user tries to enter a tournament without tickets or when we want to direct them to buy tickets. Same idea can apply for “credits only” or other contexts.

**Where it lives:** store-ui.js, store-service.js (showStore with context); store-modal.js (showStoreInternal, default tab by context).

### 3.5 Item consumption only when relevant

**Problem:** Showing an “choose items for this run” modal when the user has no inventory is unnecessary and can feel like a dead end.

**Solution:** **Item consumption modal is shown only when the user has items in inventory** (from blockchain API). If inventory is empty, we skip the modal and resolve with no items. Loading message updates (“Loading inventory…”, “Preparing item selection…”) so the user knows why there’s a delay. Modal can use tournament gold theme when `isTournamentMode` for consistency.

**Where it lives:** item-consumption.js (showItemConsumptionModal, hasItems check); game-service.js (calls showItemConsumptionModal after loading inventory).

### 3.6 Single-layer panels on mobile

**Problem:** Stacking multiple modals or panels on small screens creates focus and tap confusion.

**Solution:** On mobile we use **single-layer panel** overlays: one panel at a time, centered, smooth open/close. Menu service and modal stacking avoid multiple overlapping focus traps. Documented in PORTFOLIO_UI_UX_SUITWO_SHOOTER.md §5.2.

---

## 4. First-time vs returning experience

### 4.1 First-time path

1. **Front page** — User sees the entry overlay; **Enter Game** (or equivalent) triggers loading menu scripts then `showMainMenu()`.
2. **Main menu** — Play, Store, Leaderboard, Tournaments, How to Play, Settings, Wallet, badge entry, and (once loaded) credits/tickets. User can **Play** without a wallet (demo) or connect and use credits/tickets.
3. **Demo** — If the user has no wallet or no credits, they can still start a run in demo mode. When demo ends, **End Demo** modal (end-demo-modal.js) guides them to connect wallet or open store for credits.
4. **Learning** — **How to Play** is the primary place for rules and content: tabbed modal (Getting Started, Character, Enemies, Bosses, Combat, Collectibles, Store, Tournaments, Progression) with accordion sections. No forced tutorial overlay during the first run; we don’t interrupt play.
5. **Instructions panel** — Optional short instructions or link to How to Play modal depending on implementation.

We do **not** currently enforce a strict “first-time only” wizard (e.g. “Complete these three steps”). The first-time experience is “Enter Game → Menu → Play or explore.” We could add a highlighted path (e.g. Play → demo → Store → connect) in a future iteration if we want a stronger onboarding funnel.

### 4.2 Returning path

- **Menu** — Same layout; credits and tickets visible so the user knows they can play. Badge and discount visible if they have one.
- **Play** — One click (after optional item consumption if inventory exists); no wallet prompt per run.
- **Store** — Reopen anytime; tabs (Items, Inventory, Game Pass, Tournament Tickets) and selection state (or “select for next game” in Inventory) are consistent.
- **Leaderboard / Tournaments** — Same modals and flows; “my tournaments” and category/pagination where applicable.

Returning users benefit from **predictable patterns**: same buttons, panels, modals, and feedback (toasts, loading) so they don’t have to relearn the UI.

### 4.3 Demo vs full

- **Demo:** Available without wallet; play until demo ends.
- **Full:** Wallet connected; credits (regular) or tickets (tournament) consumed on Play. When demo ends, End Demo modal offers connect wallet or open store (showStoreOption when not entered with credits). Game pass and ticket display in menu and store keep balance visible (game-pass-display.js, store-game-pass-tab.js, store-tournament-tickets-tab.js).

---

## 5. Feedback and trust

### 5.1 Success feedback

- **Toasts** — Success type (e.g. purchase complete, score submitted). Non-blocking; user keeps context (toast-notifications.js).
- **Loading → done** — Loading modal shows during async work; when the operation completes, modal is hidden and a toast or next screen confirms success.
- **Selection state** — In the store, selected level is highlighted; user sees immediately what they’ve chosen. Deselect by clicking the same level again.
- **Achievement popup** — When a milestone is achieved, a popup (achievement-popup.js) makes progression visible. Styling (e.g. gold/border) differentiates it from toasts.
- **Game over** — Final score and game-over overlay (e.g. red “GAME OVER”, green score) so outcome is unmistakable (game-state-rendering.js: renderGameOverScreen).

### 5.2 Failure and error feedback

- **Toasts** — Error (and warning) type for failed operations (e.g. transaction failed, network error). Colors and copy distinguish from success (toast-notifications.js: success / error / warning / info).
- **Insufficient balance modal** — When purchase fails due to balance, we show a dedicated modal (showInsufficientBalanceModal in store-purchase-flow.js) with required, balance, shortfall, and token so the user knows exactly what’s missing. Custom message when applicable.
- **Validation in wizards** — Tournament creation wizard validates per step (e.g. end time > start time, entry fee ≥ 1); user can’t proceed until the step is valid, with clear validation feedback.

### 5.3 Uncertainty and loading

- **Loading modal** — Shown during async operations with a **context-specific message** so the user knows what’s happening: e.g. “Loading inventory…”, “Saving score to blockchain…”, “Entering tournament and consuming ticket…”, “Loading store…”, “Refreshing leaderboard…”. Multiple modal IDs used so different flows can show their own loading state (loading-modal.js, loading-manager.js).
- **Disabled states** — Buttons disabled during transactions or when a step is invalid so the user doesn’t double-submit or proceed with invalid data.
- **No silent failures** — We avoid leaving the user with no feedback; either a toast, a modal, or a visible state change (e.g. selection, redirect) follows an action.

### 5.4 Trust and transparency

- **Prices and discount** — Store shows price and badge discount explicitly (store-utils.js, store-item-rendering.js). User sees what they pay and what benefit they get.
- **Balance** — Credits and tickets shown in menu and store; wallet balance or token balance where relevant (game-pass-display.js, store-game-pass-tab.js, store-tournament-tickets-tab.js; token-balance-utils.js).
- **Post-game redirect** — After score submission we can redirect to tournaments or main menu so the user sees the next logical step (e.g. “Enter a tournament” or “Back to menu”) instead of a dead end.

---

## 6. Clarity at decision points

### 6.1 “Can I play?”

- **Menu** shows credits (regular play) and tickets (tournament play) when game pass data is loaded. User sees at a glance whether they can start a run. If they have no credit/ticket and try to play, the flow can direct them to the store (e.g. open Store on tickets tab).
- **Play button** is the single entry to start a game; no separate “confirm transaction” step for consumption—we consume and load.

### 6.2 “What am I taking into this run?”

- **Store (Items tab)** — User selects one level per item type; selection is visible (selected/disabled). Selection persists until game start or they change it.
- **Item consumption modal** — Shown only when the user has inventory. They choose which items to consume for this run (or confirm default). If no inventory, modal is skipped; user goes straight to game load.
- **Consumable footer (in-game)** — Icons/indicators for active consumables (tractor beam, slow time, destroy all, boss kill shot) so during play they see what’s active (consumable-footer.css, consumable system).

### 6.3 “Is this run for a tournament?”

- **Before play** — They chose “Play” (regular) or entered a tournament (tournament run). Tournament entry is explicit in the Tournaments modal (enter with ticket).
- **During play** — **Gold border** on the game canvas and gold-themed HUD/context so they always see “this run counts for the tournament.”
- **After play** — Score submission and redirect (e.g. to tournaments or menu) reinforce that the run was part of the tournament flow.

### 6.4 “What do I do after game over?”

- **Score submission** — Handled by game-service / leaderboard-score-submission. Success/error toast; optional redirect to showTournaments() or showMainMenu() so the next step is clear (e.g. “Enter another tournament” or “Back to menu”).
- **Game over screen** — Shows final score and any call-to-action (e.g. Play Again, Menu) so the user isn’t left wondering what to do next.

### 6.5 “Do I have enough to buy this?”

- **Store** — Price and badge discount shown on the card. Insufficient balance triggers **insufficient balance modal** with required, balance, shortfall, and token (store-purchase-flow.js). User can then top up or cancel.

### 6.6 “Where do I get tickets / credits?”

- **Store** — Game Pass tab (credits), Tournament Tickets tab (tickets). Contextual open (e.g. showStore('tickets')) when we want to send them straight to tickets. Labels and tabs are explicit so users don’t hunt for where to buy.

---

## 7. Progression and motivation

### 7.1 Badge tier and benefits

- **Tiers:** Standard → Common → Uncommon → Rare → Epic → Legendary (games played bands and discount percentages documented in portfolio §0.5). Badge is shown in **menu and store** with tier name and benefits (e.g. store discount %, gameplay discount %).
- **Mint / upgrade / migration** — Modals for first-time mint, tier upgrade, and legacy migration (badge-ui-modals.js, badge-ui-mint.js, badge-ui-upgrade.js, badge-ui-migration.js). Each flow is focused (eligibility, confirm, maybe later for mint; confirm and sign for upgrade). Progression feels tangible because tier and discount are visible everywhere the badge appears.

### 7.2 Milestones and achievements

- **Achievement popup** — When a milestone is achieved (e.g. score, distance, bosses), a popup appears (achievement-popup.js). It’s distinct from toasts (e.g. gold/border styling) so it feels like a “reward moment.”
- **Achievement progress** — Progress tabs and eligibility (achievement-progress.js) so users can see how close they are to the next milestone. Categories align with game stats (score, distance, coins, bosses, etc.). This supports long-term motivation without cluttering the core play loop.

### 7.3 In-game HUD (session progression)

- **Score, orb level, tier, bosses defeated, force field level, coin streak** — All visible in the HUD (game-state-rendering.js, ui-rendering.js). The user sees progression within the run: orb level and force field level use level-based colors (Sui blue, market green, gold) so tier is readable at a glance. Boss HP when a boss is active. Lives from lives-rendering.js. Consumable footer for active consumables. Together this gives a clear “session story” without overwhelming.

### 7.4 Leaderboard and tournaments

- **Leaderboard** — Categories and rank give a sense of standing. “Your rank” highlight (e.g. border/color for the current user’s row) makes it easy to find themselves. Pagination and category switching support exploration.
- **Tournaments** — Enter with ticket; “my tournaments” and tournament leaderboard (showTournamentLeaderboardModal) let users see their competitive context. Creation wizard is for creators; players mostly “browse and enter.”

We don’t currently document a single “progression narrative” (e.g. “from first run to Legendary badge in N steps”); the pieces (badge, achievements, HUD, leaderboard, tournaments) are all present so we can add that story in copy or a future onboarding pass if desired.

---

## 8. Context and mode clarity

### 8.1 Regular vs tournament

- **Visual:** Tournament modals and wizard use gold theme; game canvas in tournament mode has gold border (desktop and mobile). Status text (e.g. “Boss Fight!”) and post-game flow are the same; the gold context is the differentiator.
- **Flow:** User explicitly enters a tournament (select tournament, consume ticket); then the run is a tournament run until game over. No ambiguity about “am I in a tournament run?”

### 8.2 Menu vs in-game

- **Menu overlay** — When the user opens the menu during play (e.g. pause or settings), we show a menu overlay (renderMenuOverlay in game-state-rendering.js). Game is paused or state is clearly “menu open” so they’re not confused about whether inputs affect the run.
- **Pause** — renderPauseScreen makes it obvious the game is paused. Resume and other actions are explicit.

### 8.3 Store tabs

- **Items / Inventory / Game Pass / Tournament Tickets** — Labels are explicit. Items = buy/select for next run; Inventory = owned items, consume/select; Game Pass = credits; Tournament Tickets = tickets. Contextual open (e.g. showStore('tickets')) takes them to the right tab when we direct them from elsewhere.

### 8.4 Modal stacking and focus

- **Menu service** coordinates which panel or modal is visible and helps avoid multiple overlapping focus traps. Single-layer panel on mobile. Close buttons and escape behavior documented in implementation so focus and overlay behavior are predictable.

---

## 9. Learnability and cognitive load

### 9.1 One item per type (Store)

- **Rule:** At most one level per item type per game. The UI enforces this with **selected** and **disabled** states: choosing one level disables the others of that type. The rule is visible, so users don’t have to read documentation to infer it. Reduces cognitive load by making the valid choice set obvious.

### 9.2 Wizard steps (tournament creation)

- **Tournament creation** is broken into steps: name → category → schedule → entry fee → rewards → starting ante → review & payment. Each step has validation; user can’t proceed with invalid data. This avoids one large form and spreads decisions across digestible steps. Progress indicator shows where they are in the flow (tournament-creation-modal.js, tournament-creation-modal.css).

### 9.3 How to Play: one place for content

- **Tabbed modal** with accordions (how-to-play-modal.js, how-to-play-content-generator.js). Tabs: Getting Started, Character, Enemies, Bosses, Combat, Collectibles, Store, Tournaments, Progression. Narrative and asset references live here (HOW_TO_PLAY_MODAL_STRUCTURE.md). Users can scan tabs and expand sections as needed. No separate tutorial overlay during play; we don’t interrupt the first run. Supports learnability without forcing a linear “onboarding wizard.”

### 9.4 Consistent component patterns

- **Buttons, panels, modals** look and behave the same across menu, store, leaderboard, tournaments, How to Play, settings. Once the user learns one flow (e.g. “close is top-right or Escape”), they can predict behavior elsewhere. Reduces cognitive load and supports both new and returning users.

### 9.5 What we assume users learn first vs later

- **First:** Play, Store (and that credits/tickets are consumed on Play). Possibly How to Play if they want rules.
- **Later:** Badge mint/upgrade, tournament creation, achievement progress tabs, leaderboard categories, item consumption modal when they have inventory. We don’t force these up front; the UI is available when they’re ready. If we want a stronger “discovery” path, we could add lightweight prompts or highlights in a future iteration.

---

## 10. Responsive and input UX

### 10.1 Device-based experience (no fixed breakpoints)

- **Device type** (desktop, tablet, mobile) is determined up front (user agent, screen, touch). The **desktop** or **mobile** CSS and behavior load accordingly. We don’t rely on “at 768px switch layout”; we decide by device identity so behavior is predictable and we avoid layout jumps at arbitrary widths. Documented in PORTFOLIO_UI_UX_SUITWO_SHOOTER.md §5.

### 10.2 Viewport-relative layout

- **Sizing** uses viewport units (`vw`, `vh`, `min(vw, vh)`) so layout scales with the visible area. Works across phones, tablets, and desktops without a fixed set of breakpoints. Mobile uses patterns like `min(vw, vh)` for fonts and spacing; **mobile-compact** classes support denser areas. Desktop is also fluid. ResponsiveCanvas and ViewportManager keep canvas and UI in sync on resize and device change.

### 10.3 Touch (mobile)

- **Larger touch targets** and spacing (mobile-interactions.css); tap feedback. No actions that depend only on hover. Buttons and level selectors in the store are sized for tap. Single-layer panels avoid overlapping tap areas. **Sound Test** panel supports verifying feedback sounds for accessibility and tuning.

### 10.4 Landscape (mobile)

- **Mobile layout** is optimized for landscape. mobile-landscape-rotation.css and rotation prompts when needed so the user isn’t stuck in portrait for a game that expects landscape. Worth calling out in any “device requirements” or help copy.

### 10.5 Keyboard and focus (desktop)

- **Escape** to close modals/panels where implemented. Focus order and focus trapping in modals documented in implementation. Hover and focus states in shared-interactions.css and desktop modules. We don’t rely on keyboard for core play (mouse/touch primary); keyboard is for menu/panel navigation and accessibility where supported.

---

## 11. Accessibility and inclusion

### 11.1 What we aimed for

- **Clarity:** Labels, prices, and states are explicit. Buttons and tabs have clear copy (e.g. “Store”, “Inventory”, “Game Pass”, “Tournament Tickets”). Success and error are distinguishable (toasts, modals, colors).
- **Consistency:** Same patterns everywhere so users can predict behavior. Reduces cognitive load and supports users who rely on routine.
- **Explicit feedback:** Toasts, loading states, disabled states, achievement popup. Users are not left wondering whether something worked.
- **Touch and motor:** Touch targets and sizing considered for mobile; single-layer panels; no hover-only critical actions. Sound Test panel helps verify audio feedback.
- **Focus and overlay:** Panels and modals capture focus where appropriate; close and escape documented; menu service helps avoid multiple focus traps.

### 11.2 What we didn’t do (scope)

- **No formal WCAG audit** or accessibility compliance doc. Design aims for clarity and consistent interaction, not a specific WCAG level. This is intentional scope for the current doc; future work could add an audit and remediation plan.
- **Screen readers and keyboard-only:** We don’t document full screen-reader support or comprehensive keyboard navigation for all flows. Focus and semantics exist where implemented; we don’t claim full assistive-tech coverage.
- **Reduced motion / prefers-reduced-motion:** Not explicitly documented or implemented. Animations (title glow, badge pulse, panel fade-in) are restrained but not conditional on user preference. Could be added later if we prioritize it.
- **Color and contrast:** We use Sui blue, market green, gold, and red with sufficient contrast for primary UI; we have not run a formal contrast checker or colorblind-simulation pass. Worth doing if we want to claim accessibility compliance.

Being explicit about this scope helps in “what we’d do next” (e.g. “run WCAG audit and document gaps”) and sets expectations for stakeholders.

---

## 12. Tradeoffs we made

### 12.1 Simplicity vs flexibility (one item per type)

- **Tradeoff:** Limiting to one level per item type per game reduces flexibility (e.g. no “double orb” or multiple force field levels). We accepted this to keep selection understandable and to avoid invalid backend states. The UI makes the rule obvious (selected/disabled), so the tradeoff is “simplicity and clarity over combinatorial flexibility.”

### 12.2 Wallet once vs every run

- **Tradeoff:** Consuming credits/tickets automatically on Play means the user doesn’t confirm each consumption. We prioritized **low friction** over “explicit confirm every time.” The tradeoff is “fewer steps per play, less per-run control.” Balance and visibility in menu and store are how we maintain trust.

### 12.3 No in-game tutorial overlay

- **Tradeoff:** We don’t interrupt the first run with a step-by-step tutorial. How to Play is available in a modal; users can open it when they want. We prioritized **non-interruption** and **one place for content** over “force first-time tutorial.” The tradeoff is “discoverability of rules vs. clean first run.” We could add optional highlights or a short “first time?” path later.

### 12.4 Device type vs responsive breakpoints

- **Tradeoff:** We load desktop or mobile experience by device type, not by viewport width. So a user who resizes from large to small might keep the “desktop” experience until refresh (or we might not switch at all). We accepted this to avoid layout thrashing and to keep behavior predictable. The tradeoff is “stable experience per device vs. continuous layout adaptation on resize.”

### 12.5 Tournament gold theme (distinct but consistent)

- **Tradeoff:** Tournament UI uses gold instead of Sui blue for primary accents so tournament context is unmistakable. We kept the rest of the design system (panels, buttons, typography) so the tradeoff is “context color vs. one single primary color everywhere.” Gold is used only where tournament context matters (modals, wizard, canvas border).

---

## 13. Error recovery and edge cases

### 13.1 Transaction or network failure

- **Feedback:** Error toast and/or insufficient balance modal when applicable. User can retry (e.g. purchase again) or cancel. We don’t leave them with no explanation.
- **State:** After failure, UI state (e.g. store selection, modal) is left in a consistent place so they can correct (e.g. top up balance) and try again without restarting the flow from scratch where possible.

### 13.2 No credits or tickets when trying to play

- **Flow:** When the user has no credit/ticket and tries to play, we can direct them to the store (e.g. showStore('tickets') for tournament). End Demo modal (when demo ends) directs to connect wallet or open store. So “can’t play” has a clear next step: get credits or tickets.

### 13.3 No items in inventory (item consumption)

- **Behavior:** We don’t show the item consumption modal when inventory is empty. We resolve with no items and continue to game load. No dead-end “choose items” with nothing to choose.

### 13.4 Wallet disconnect or data load failure

- **Game data flow** (game-data-flow-modals.js, game-data-flow-service.js) and wallet events (game-data-flow-wallet.js) handle wallet disconnect and data load order. Modals when data is missing (e.g. connect wallet) are part of the flow. Documented in portfolio and refactoring docs (GAME_DATA_FLOW_REFACTORING_*.md). We don’t leave the user on a broken screen without a path (e.g. connect wallet or retry).

### 13.5 Empty states (leaderboard, tournaments, inventory)

- **Leaderboard:** No scores or empty category can show an empty state; we don’t assume data always exists. Pagination and category switching still work.
- **Tournaments:** No active/upcoming tournaments can show an empty list; “Create Tournament” or “My tournaments” remain available where applicable.
- **Inventory:** Empty inventory is handled (no consumption modal); Inventory tab can show “no items” or equivalent so the user knows the state.

We don’t document every empty-state string here; the UX principle is “never leave a list or flow without a clear state (empty, loading, error) and a next step where applicable.”

---

## 14. What we didn’t do (scope and future work)

### 14.1 User research and validation

- This document reflects **design intent and implementation**, not validated user research. We have not run formal usability tests, surveys, or A/B tests cited here. Personas and journey maps are not in scope for this doc. If we add research later, we can document “assumed user” vs “validated segments” and link to findings.

### 14.2 Metrics and success criteria

- We do not define **UX metrics** (e.g. time to first play, completion rate, error rate, satisfaction). Outcomes (§2.2) are qualitative. Future work could add metrics and targets (e.g. “reduce failed purchases due to insufficient balance” or “increase tournament entry after game over redirect”) and tie them to flows in this doc.

### 14.3 Full accessibility compliance

- As in §11.2: no WCAG audit, no formal screen-reader or keyboard-only coverage, no reduced-motion or contrast documentation. Design aims for clarity and consistency; compliance would be a separate pass.

### 14.4 Localization and internationalization

- Copy and labels are in one language (implementation-dependent). We don’t document locale, RTL, or string length constraints for translation. If we localize later, we’d add a section on copy, layout, and formatting.

### 14.5 Advanced onboarding or gamification

- We have How to Play and achievement popups; we don’t have a mandatory onboarding wizard, progress rings, or in-game “quests.” Progression is badge, achievements, leaderboard, and HUD. We could add a more structured “first-time journey” or gamification layer later and document it here.

---

## 15. File and documentation references

### 15.1 Primary UX-related code (high level)

- **Entry and menu:** ui-initialization.js, menu-system.js, menu-service.js, game-service.js.
- **Store and selection:** store-ui.js, store-service.js, store-modal.js, store-item-selection.js, store-item-rendering.js, store-purchase-flow.js, store-game-pass-tab.js, store-tournament-tickets-tab.js, store-inventory-tab.js, store-wallet-connection.js, game-pass-display.js.
- **Item consumption:** item-consumption.js (showItemConsumptionModal); game-service.js (orchestration).
- **Leaderboard and score:** leaderboard-modal.js, leaderboard-ui.js, leaderboard-score-submission.js, leaderboard-data.js, leaderboard-formatting.js, leaderboard-pagination.js, leaderboard-categories.js.
- **Tournaments:** tournament-modal.js, tournament-creation-modal.js; game-service.js, leaderboard-score-submission.js (redirect).
- **Badge:** badge-ui-service.js, badge-ui-modals.js, badge-ui-mint.js, badge-ui-upgrade.js, badge-ui-migration.js, badge-ui-display.js.
- **Feedback:** toast-notifications.js, loading-modal.js, loading-manager.js; achievement-popup.js, achievement-progress.js.
- **How to Play:** how-to-play-modal.js, how-to-play-content-generator.js.
- **End demo and wallet:** end-demo-modal.js, wallet-service.js, game-data-flow-service.js, game-data-flow-modals.js.

Paths are under `apps/shooter-game/frontend/src/game/systems/ui/` (and `systems/store/` for item-consumption). Full file reference is in PORTFOLIO_UI_UX_SUITWO_SHOOTER.md.

### 15.2 Documentation to reference when tailoring

- **PORTFOLIO_UI_UX_SUITWO_SHOOTER.md** — Design system, components, layout, file reference, talking points.
- **STORE_UI_IMPLEMENTATION_HANDOFF.md**, **STORE_ITEM_SELECTION_RULES.md** — Store rules and validation.
- **TOURNAMENT_CREATION_USER_FLOW.md**, **PLAYER_REWARDS_UI_DESIGN.md**, **REWARD_UI_SYSTEM_DESIGN.md** — Tournament and rewards.
- **BADGE_MINTING_UX_FLOW.md**, **BADGE_UI_REFACTORING_FINAL.md** — Badge flows.
- **HOW_TO_PLAY_MODAL_STRUCTURE.md** — How to Play content and assets.
- **GAME_OVER_FLOW.md**, **GAME_DATA_FLOW_REFACTORING_*.md** — Post-game and data loading.

### 15.3 How to tailor this document

- **One-pager:** Use §2 (goals/outcomes), §3 (friction), §5 (feedback), §12 (tradeoffs); drop or shorten the rest.
- **Stakeholder deck:** Lead with §2 and §3; add §6 (decision points) and §7 (progression); keep §14 and §15 short (scope and references).
- **Design review:** Emphasize §3, §6, §9 (learnability), §12; include §11 (accessibility scope) and §13 (errors).
- **Interview prep:** Know §2, §3, §5, §12; be ready to give one example each for “friction we reduced,” “tradeoff we made,” and “clarity at a decision point.”

---

*This is the full UX reference for SuiTwo Market Shooter. Trim by section or audience as needed; the long form is the master.*

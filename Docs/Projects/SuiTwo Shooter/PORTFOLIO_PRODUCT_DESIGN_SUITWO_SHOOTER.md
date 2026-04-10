# Portfolio: Product Design — SuiTwo Market Shooter

Product design lens for the **SuiTwo Market Shooter** experience: what problem the interface solves, how people move through it, and how visual and interaction choices reduce friction. Complements **`PORTFOLIO_UI_UX_SUITWO_SHOOTER.md`** (UI systems) and **`UX_SUITWO_SHOOTER.md`** (full UX narrative).

---

## 1. User problem the interface solves

Players want a **market-themed arcade shooter** they can start quickly, optionally deepen with **wallet, purchases, and competition**, without treating every run like a checkout. The UI addresses: *“How do I play, know what I’m spending, compete, and learn rules—without getting lost in crypto or store complexity?”*

---

## 2. Main user flows and navigation paths

- **Land → Enter Game → Main menu:** Front screen sets expectations (theme, controls hint); **Enter Game** loads the hub and reveals the full menu.
- **Play loop:** **Start Game** (primary) → optional **item consumption** when inventory exists → run → pause / game over → return to menu or **tournament context** when applicable.
- **Economy:** **Store & Inventory** (tabbed: items, inventory, game pass, tournament tickets) ↔ menu stats showing **credits / tickets** so “can I play?” is visible before tapping Play.
- **Social / competition:** **Leaderboard** and **Tournaments** (browse, enter, create) branch from the same hub; post-run flows can tie back to tournaments or menu.
- **Onboarding & tuning:** **How to Play** (dense reference in one place), **Settings**, **Sound Test**; **Connect Wallet** lives in the menu header as a parallel track, not blocking a **demo** path.

---

## 3. Key interaction decisions

- **Primary action = Start Game:** Styled as the main CTA; gating (credits/tickets/demo) resolves in flow rather than hiding the whole experience.
- **Panels and modals** replace separate pages: consistent open/close, **MenuService**-style coordination so overlays don’t fight each other (especially on mobile).
- **Store opens in context** when the user needs a specific tab (e.g. tickets), reducing “wrong tab” hunting.
- **Item choice** uses explicit states (available / selected / disabled) and **one level per item type** so builds stay valid without error messages.
- **Loading and outcomes** use **context-specific messages** and **toasts** so actions (inventory load, score submit, purchase) never feel silent.
- **Tournament mode** is reinforced after entry (e.g. **gold canvas treatment**) so “this run counts” stays mentally sticky.

---

## 4. Visual design decisions

- **Brand read:** **Sui-aligned blues** plus **market “green” accent** on dark gradients; reads as one product from front page through HUD.
- **Hierarchy:** Primary button and title treatments draw the eye first; secondary actions share a **consistent button row** with icons for quick scanning.
- **Typography:** System stack and **viewport-relative sizing** keep type readable across devices without a separate “mobile font story.”
- **Mode signaling:** **Gold theme** for tournament surfaces and in-run framing differentiates **competitive context** from casual play without new navigation chrome.
- **Motion:** Light **glow / pulse / fade-in** on key surfaces—enough for polish, restrained enough for clarity during fast sessions.

---

## 5. Usability and friction reduction

- **Prepaid play:** Credits and tickets are bought in the store; **consumption on Play** avoids a wallet step every run—critical for arcade pacing.
- **Skip empty steps:** Item consumption UI appears **only when inventory warrants it**; otherwise the path stays short.
- **Demo path:** Play without wallet, with a clear **end-of-demo** path toward wallet or store when the product wants conversion.
- **Trust at purchase:** Prices, discounts (e.g. badge), and **balance shortfall** messaging are explicit; leaderboards and claims use visible feedback.
- **Mobile:** **Single-layer overlays**, touch-friendly targets, and **device-based layout** (not arbitrary breakpoints) reduce mis-taps and stacked modals.

---

## 6. How complexity is managed

- **Progressive disclosure:** Rules and depth live in **How to Play** (tabs + accordions) instead of blocking the first run with a forced tutorial.
- **Wizard for creation:** Tournament creation breaks into **steps with validation** rather than one overwhelming form.
- **Separation of concerns in the hub:** Wallet and badge are **secondary surfaces** in the header; the vertical menu keeps **play, learn, compete, and shop** discoverable without one mega-screen.
- **Consistent patterns:** Same modal/panel language across store, leaderboard, and tournaments so learning one surface transfers to others.

---

## Portfolio summary (design thinking)

**Project:** SuiTwo Market Shooter — a browser-based market-themed shooter with optional Web3 economy, store, leaderboards, and tournaments.

**Problem:** Players need a fast, readable loop from “open tab” to “playing,” with optional depth (wallet, purchases, competition) that does not force a transaction or cognitive overload on every run.

**User Flow:** Front page → Enter Game → main menu hub → Start Game (with automatic credit/ticket use) → optional item pick → run → feedback overlays → return to menu or tournament surfaces; parallel paths for Store, Leaderboard, Tournaments, How to Play, Settings, and wallet connect.

**Design Decisions:** Dark gradient shell with Sui-blue and market-green identity; gold for tournament context; primary CTA for play; tabbed store and tabbed reference content; viewport-aware typography and layout; consistent overlay components for all secondary tasks.

**Interaction Behavior:** Contextual store entry, selection states that encode “one per type,” loading copy that matches the operation, toasts for outcomes, and in-run visuals that reinforce tournament mode; mobile favors one focused layer at a time.

**Result:** An interface that reads as a single cohesive game first and a **wallet-aware, competitive product** second—using prepaid balances, contextual navigation, and mode-specific visuals to keep the core loop light while supporting progression, social proof, and monetization without breaking arcade flow.

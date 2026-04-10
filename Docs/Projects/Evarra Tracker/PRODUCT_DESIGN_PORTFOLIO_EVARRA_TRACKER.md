# Evarra Tracker — Product design review & portfolio summary

Design-focused review of the Evarra Tracker web app (goals, wallets, insights). For full UI/UX references, see `UI_EVARRA_TRACKER.md` and `UX_EVARRA_TRACKER.md`.

---

## 1. User problem the interface solves

People who track personal goals and optionally connect crypto wallets need one place to **see progress**, **organize nested work** (parent goals and subgoals), **review wallet context** (holdings and transactions, with Sui as the strongest path today), and **compose a slice of that world for analysis**—without feeling blocked by slow first loads or overwhelmed by power-user surfaces on day one.

---

## 2. Main user flows and navigation paths

- **Auth → work**: Login (inline validation) → success lands on **Tracker** as the default “home loop”; signup and password reset sit alongside login.
- **Primary nav (top bar)**: **Tracker** → **Wallets** → **Goals** → **Insights** → **Settings** (with icons and clear active state on the current route).
- **Tracker**: Search, filter, expand/collapse goal hierarchy, create goals, open goal details (simple vs advanced panel depending on settings).
- **Goals**: Dedicated list/grid management with the same search/filter header pattern; create (basic vs advanced); delete with confirmation.
- **Wallets**: List + **split layout**—select a wallet, details open in a **side panel** with tabs (holdings, transactions); add wallet via dialog; refresh and delete from cards; optional “show all transactions” / sync flows with explicit progress.
- **Insights**: **Three-column** mental model on large screens (available items → selection pool → analysis types placeholder / results); **stacked** on small screens. Drag goals and wallets into the pool, then tokens appear **only when wallets are in the pool**; run analysis into a results area.
- **Settings**: General (including **advanced feature toggles**), appearance (theme), notifications, privacy.

---

## 3. Key interaction decisions

- **Consistent page chrome**: Title + description on the left; search, filters, and primary actions (e.g. Create Goal, Add Wallet) cluster in a shared header pattern so list pages behave predictably.
- **Details without leaving the list**: Wallet (and optionally goal) details use **side panels** and tabs instead of forcing a new page for every drill-down.
- **Insights as explicit composition**: Selection is **visible and editable** (drag in, remove from pool); **Analyze** is gated until there is something to analyze; errors can surface in-context.
- **Trust during slow operations**: Wallet sync uses a **progress dialog** with counts/percent and copy that **allows navigating away** when background work continues; a **service notice** on Wallets sets expectations for cold-start latency so users read slowness as infrastructure, not a broken app.
- **Feedback**: Toasts for successful CRUD and refresh; loading staged for wallet balances; Insights may show a skeleton while client-only drag-and-drop loads; auth gating shows a spinner rather than a half-broken shell.

---

## 4. Visual design decisions

- **System**: Tailwind with **CSS variable–driven** light/dark themes; **Inter** for UI, **monospace** for addresses.
- **Brand accent**: Azure/blue **primary** for links, active nav pill (`primary` background at low opacity), and primary actions; **muted foreground** for secondary copy and hierarchy.
- **Semantics**: Destructive styling for dangerous actions; success/progress cues where completion matters (e.g. sync).
- **Layout density**: Centered container with comfortable padding on “document” pages; **full viewport height** minus nav for Wallets and Insights so panels and internal scroll regions stay stable (important for drag-and-drop and split views).
- **Auth**: **Forced dark** on auth routes for a consistent first impression; journey theme follows user preference after login.

---

## 5. Usability improvements and friction reduction

- **Muscle memory**: Same search/filter/create rhythm across Tracker, Goals, and Wallets reduces relearning.
- **Empty states**: Differentiate “nothing here” from “filters hide everything” so users know what to do next.
- **Progressive disclosure**: **Advanced features** toggles in Settings let beginners stay on simpler grids and panels while experts opt into richer layouts and side panels.
- **Cognitive load on Insights**: Tokens stay **out of the main catalog** until wallets are selected—scoping the problem to “goals + wallets first, then tokens.”
- **Honest latency messaging**: Free-tier / cold-start copy and sync progress **prevent retry loops** and abandoned sessions driven by mistrust.

---

## 6. How complexity is managed

- **Hierarchy with control**: Goal trees expand and collapse so users choose depth of detail.
- **Optional advanced UI**: One product, two comfort levels—complexity is a **preference**, not a forced mode.
- **Background work as first-class**: Long sync is modeled as **work that can continue** while the user moves on, with visible state and recovery paths on failure.
- **Phased Insights**: Analysis types / right column can evolve without breaking the core **select → act → see output** model; client-only DnD trades a brief loading moment for predictable behavior.

---

## Portfolio write-up

**Project:**  
Evarra Tracker — a web app for goal tracking, wallet-connected context (Sui-forward), and a drag-and-drop **Insights** workspace that turns selected goals, wallets, and tokens into an analysis run.

**Problem:**  
Users juggling goals and on-chain context need clarity and continuity: they should resume quickly, understand slow first loads, and build an analysis set without hunting through hidden filters or guessing what will be included.

**User Flow:**  
Sign in → land on **Tracker** for the core tracking loop → use **Goals** when organizing → connect and review **Wallets** in a list + detail panel → compose scope on **Insights** (drag into pool, add tokens when wallets are present, run analysis) → tune experience in **Settings** (theme, advanced UI toggles).

**Design Decisions:**  
Anchor the product on a **repeatable page header** (search, filters, primary action); use **split layouts and side panels** for drill-down without navigation churn; use **primary accent and muted hierarchy** across light/dark; set **explicit expectations** for latency and sync; expose **advanced** layouts only when users opt in.

**Interaction Behavior:**  
Selection and destructive actions are **visible and confirmed** where it matters; loading and sync show **stage and progress**, not silent waits; Insights keeps the **next step** obvious (pool contents → Analyze → results area).

**Result:**  
A coherent system that favors **predictability and trust** over novelty: users always know where they are in the nav, what will be analyzed, and why the app might be slow—so they can stay in flow instead of fighting the interface.

---

*Document version: aligned with current app routes and patterns as reflected in `UX_EVARRA_TRACKER.md` / `UI_EVARRA_TRACKER.md`.*

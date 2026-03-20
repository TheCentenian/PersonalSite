# UX — Evarra Tracker (Full Document)

This document is the **full UX reference** for the Evarra Tracker web app: user goals, flows, friction reduction, decision points, feedback and trust, progressive disclosure via “advanced features,” accessibility scope, and tradeoffs. It complements the **UI document** (`UI_EVARRA_TRACKER.md`), which focuses on visual structure, components, and file references.

**How to use:** Treat this as the master UX narrative. Trim by audience (product, design review, engineering handoff) rather than rewriting.

---

## 1. Purpose and scope

### 1.1 What this document covers

- **User goals/outcomes** this product supports (tracking, planning, observing progress, connecting wallets).
- **Primary flows** (auth → tracker/goals → wallets → insights).
- **Friction reduced** (fast return-to-state, progressive background sync, consistent filter/search patterns).
- **Feedback and trust** (loading, errors, progress, “free tier cold start” expectations).
- **Decision points and clarity** (create vs manage, details in place vs navigate, analyze selection).
- **Progressive disclosure** (beginner vs power-user via advanced feature toggles).
- **Accessibility scope** and what is explicitly not covered yet.
- **Tradeoffs** we made in the current iteration.

### 1.2 What this document does not cover

- Visual design tokens, class names, full component inventory (see `UI_EVARRA_TRACKER.md`).
- Backend / data layer architecture beyond user-facing behavior.
- Product strategy, pricing, positioning, growth funnels, or research findings (not in scope here).

---

## 2. User goals and outcomes

### 2.1 Primary user goals

We design for users who want to:

1. **Track goals over time** — create goals, update progress, and see “where I am” quickly.
2. **Organize complexity** — represent parent goals/subgoals, expand/collapse structure, filter by status/type/coin.
3. **Connect external financial context** — add wallets and review holdings/transactions (currently strongest on Sui).
4. **Get insights from selected context** — choose goals/wallets/tokens to run analysis (current: scaffolding + mock results; future: real pipeline).
5. **Control the experience level** — keep UI simple when learning, but unlock faster/powerful patterns when confident (advanced features toggles).

### 2.2 Outcomes we enable (what “success” looks like)

- **“I can come back and continue quickly.”**
  - Session restoration and cached auth reduce re-entry friction.
- **“I can always find what I’m looking at.”**
  - Consistent page header pattern for search + filters on the core list pages.
- **“I can add a wallet and see progress without blocking my work.”**
  - Progressive sync patterns and explicit “you can navigate away” messaging.
- **“I can build a meaningful selection for analysis.”**
  - Drag-and-drop selection pool that makes the selection state visible and editable.

### 2.3 Assumed user (design intent)

We assume a user who:

- Has a small-to-medium set of goals and wants to monitor progress weekly/daily.
- Sometimes wants more structure (subgoals, hierarchy), but doesn’t want to be forced into complexity.
- May connect one or more wallets and expects wallet data to take time on first load.
- Values clarity and predictability more than novelty or playful UI.

We do **not** assume validated personas; this is design intent to guide consistency.

---

## 3. Primary flows (end-to-end)

### 3.1 Authentication → “start working”

**Intent:** Reduce time-to-first-action after login and keep users oriented.

Flow:

1. User lands on `/login`.
2. Inline validation helps the user correct issues without guessing.
3. If needed, users can switch to:
   - `/signup` to create an account
   - `/reset-password` to request a reset email
   - `/reset-password/[token]` to set a new password
4. On success (login or signup), route transitions to `/tracker` (or a `from` param).
5. Background wallet preload may start after authentication to warm up wallet-related data for the session.

UX properties:

- **Inline errors** provide field-specific guidance (identifier/password).
- **Theme continuity**: auth screen uses consistent dark styling; journey theme is applied after login based on user settings.
- **“Continue” behavior** supports returning users with an already restored session and optionally triggers background preload before navigation.

### 3.2 Tracker as “home”

**Intent:** Keep the “tracking loop” lightweight and central.

Flow:

1. Open `/tracker`.
2. Search and filter to reduce list complexity.
3. Update goal progress / navigate to goal details as needed.
4. Create new goal from the same page.

UX properties:

- Clear empty states differentiate “no goals” from “filters eliminate results.”
- Hierarchy supports “big goal → small steps” thinking without requiring a separate planning tool.

### 3.3 Goals management view

**Intent:** Provide a dedicated surface for goal list management when the user is in “organize” mode.

Flow:

1. Open `/goals`.
2. Filter and browse.
3. Create goals via dynamic forms (basic or advanced).
4. Delete goals with explicit confirmation.

UX properties:

- Destructive actions are gated with a confirm dialog.
- The interface can switch between a simpler and more powerful grid layout based on user preference (advanced features).

### 3.4 Wallets → details → holdings/transactions

**Intent:** Make wallet data feel understandable even when data is slow, partial, or syncing.

Flow:

1. Open `/wallets`.
2. Add wallet or choose existing wallet.
3. View details in a side panel (or toggleable details view).
4. See holdings and transactions (Sui currently most supported).
5. Refresh wallet data when needed.

UX properties:

- **Service expectation setting**: the app explicitly communicates that initial loads may take 30–60 seconds due to a free service tier cold start.
- **Progress visibility**: the app uses stage-based loading indicators for wallet balances and a dedicated sync progress dialog for larger transaction history work.
- **Background continuation**: sync messaging can explicitly say “you can navigate away” to reduce anxiety and prevent users from waiting on a blocking screen.

### 3.5 Insights selection → run analysis → results

**Intent:** Provide a tangible “selection → action → output” mental model for analysis.

Flow:

1. Open `/insights`.
2. Drag goals and wallets into the selection pool.
3. Select tokens contextually (only when wallets are selected).
4. Run analysis and see results in a consistent “results area.”

UX properties:

- **Visible selection state**: the selection pool shows what will be analyzed and supports direct removal.
- **Contextual token discovery**: tokens appear only when relevant to avoid clutter and reduce cognitive load.
- **Clear next step**: the “Analyze” action is disabled until something is selected; errors are surfaced inside the selection pool.

---

## 4. Friction we reduced (and why)

### 4.1 Consistent “search + filter + create” pattern

**Problem:** If each page invents its own header controls, users spend time relearning rather than acting.

**Solution:** A reusable `PageHeader` structure standardizes:

- Where search lives
- Where filters live
- Where “Create/Add” CTAs live

**Result:** Users develop muscle memory; pages feel like variations of one system rather than separate tools.

### 4.2 Progressive disclosure via “advanced features”

**Problem:** Power features can overwhelm first-time users; hiding them permanently blocks expert efficiency.

**Solution:** Settings exposes advanced toggles (goal panel, goal creation, goals grid, wallet panel, account menu). This turns UX complexity into a user preference rather than a one-size-fits-all decision.

**Result:** Beginners can stay on simpler patterns while experts opt into faster flows (side panels, richer grids).

### 4.3 Background sync with explicit reassurance

**Problem:** Long-running sync without context causes mistrust (“is it stuck?”) and encourages repeated retries.

**Solution:** A dedicated sync progress dialog:

- Shows percent and counts
- Estimates time remaining (when available)
- Explicitly states when it’s safe to navigate away

**Result:** Users understand the system’s state and keep moving instead of waiting.

### 4.4 Clear “free tier cold start” expectation setting

**Problem:** If first load is slow with no explanation, users interpret it as broken.

**Solution:** A Wallets page notice explains expected latency and current chain support.

**Result:** More trust; fewer repeated actions; users attribute delay to infrastructure rather than product failure.

---

## 5. Feedback and trust

### 5.1 Success feedback

- Toast confirmations for create/update/delete/refresh actions.
- Visual selection states in Insights selection pool.

### 5.2 Failure and recovery

- Inline validation errors for login reduce “submit → generic error → guess.”
- Wallet and list errors are displayed directly in the list area (not hidden).
- Sync errors show a dedicated failure state with error detail and a “continue anyway” path.

### 5.3 Uncertainty management (loading)

- Wallet balance and wallet data load provide progress visibility (staged loading).
- Insights uses a skeleton for client-only DnD content.
- Journey layout shows an “auth gating spinner” rather than a broken partial page when session is not ready.

---

## 6. Decision points and clarity

### 6.1 “Where should I start?”

- The default post-login landing is `/tracker`, reinforcing it as the “home loop.”

### 6.2 “Do I need advanced panels?”

- Advanced features are opt-in and described in plain language in Settings.
- This ensures users don’t feel forced into side panels or complex layouts before they’re ready.

### 6.3 “What exactly will be analyzed?”

- Insights selection pool makes the selection explicit (list of items + remove affordance).
- Token selection is contextual and not mixed into “available items,” reducing confusion.

### 6.4 “Is the system working while it loads?”

- Sync progress gives explicit visibility, plus reassurance about background work.
- The Wallets notice sets an expectation for first-load latency.

---

## 7. Learnability and cognitive load

### 7.1 Reduce scope on first contact

- Insights avoids showing token lists until wallets exist in the selection, keeping the entry mental model “goals + wallets first.”

### 7.2 Familiar UI primitives

- Cards, tabs, dialogs, side panels are consistent across sections.
- Once users learn the “panel with tabs” pattern (wallet details), they can transfer that understanding elsewhere (goal details).

### 7.3 Hierarchy with control

- Goal trees allow expand/collapse, letting users choose their level of detail rather than forcing everything visible.

---

## 8. Responsive and device UX

Current UX is primarily desktop-friendly, but patterns are responsive:

- Wallet list grids compress from 3 columns → 2 → 1.
- Insights columns collapse to a single-column stack on smaller screens.

Key constraint: some interactions (drag-and-drop) are strongest on desktop; mobile drag behavior is possible but typically requires extra refinement (touch affordances, larger targets).

---

## 9. Accessibility and inclusion (scope)

### 9.1 What we aimed for

- Clear labeling and helper copy (`muted-foreground`) for secondary text.
- Explicit error messaging (form-level + inline).
- Consistent interaction patterns across pages.
- Strong color semantics for destructive vs normal actions.

### 9.2 What we didn’t do (explicit scope)

- No formal WCAG audit or compliance claim in this iteration.
- No documented “keyboard-only” completion guarantee for all flows.
- No explicit reduced-motion support (animations are modest but not preference-gated).

---

## 10. Tradeoffs we made

### 10.1 Dynamic, client-only Insights DnD content

- **Tradeoff:** DnD is reliable and avoids hydration issues by rendering client-only, but delays the interactive UI slightly and shows a skeleton first.
- **Why:** Predictable behavior and fewer edge-case UI bugs were prioritized.

### 10.2 Advanced features as toggles vs one unified UI

- **Tradeoff:** Two “modes” (simple vs advanced) create more variants to maintain.
- **Why:** It allows progressive disclosure and reduces beginner overwhelm.

### 10.3 Wallet sync “continue in background”

- **Tradeoff:** Users may navigate away and later see partial data if they return before sync completes.
- **Why:** It respects user time and treats sync as background work, with explicit progress and messaging to preserve trust.

### 10.4 Explicit “free tier” messaging

- **Tradeoff:** It exposes infrastructure limitations in the product UI.
- **Why:** It prevents “broken product” perception and improves trust during slow starts.

---

## 11. Error recovery and edge cases

### 11.1 No results / empty states

- Goals: distinguishes between “no goals” and “filters hide all goals.”
- Wallets: handles loading, error, and “no wallets match your search or filters.”
- Insights: clear “drag items here” empty selection pool prompt; results area clarifies “run an analysis.”

### 11.2 Partial data availability

- Wallets: chain support is explicit; UI allows adding wallets even if detailed data is not fully supported yet.
- Sync: errors don’t trap the user; they can continue with partial data.

---

## 12. References

- `docs/UI_EVARRA_TRACKER.md`
- `docs/technical/Insights_Page_Implementation_Notes.md`
- `docs/technical/Insights_Page_Phase_2_Implementation_Plan.md`

---

*This is the full UX reference for Evarra Tracker. Trim by audience as needed; the long form is the master.*


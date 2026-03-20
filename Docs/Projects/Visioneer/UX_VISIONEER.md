# UX — Visioneer Studios (Paradigm) (Full Document)

This document is the **full UX reference** for Visioneer Studios / Paradigm in this repository: user goals, friction reduction, flows, feedback semantics, decision points, learnability, and responsiveness. It is intended to be **exhaustive** so you can tailor it later for one-pagers, stakeholder decks, or interview prep.

It complements:
- **UI reference:** `Docs/UI_VISIONEER.md` (design system, layout, components, file reference).
- **Engineering/portfolio scope:** `Docs/PORTFOLIO_VISIONEER.md` (architecture, modules, integrations).

---

## 1. Purpose and scope

### 1.1 What this document covers

- **User goals and outcomes** we design for on the web experience.
- **Friction we reduced** and why (especially around wallet onboarding and testnet setup).
- **First-time vs returning** experience and entry paths.
- **Feedback and trust** (success/error/loading patterns).
- **Clarity at decision points** (connect wallet vs explore pages, faucet onboarding, collections filtering).
- **Learnability and cognitive load** (how users understand navigation and filters).
- **Responsive and input UX** (mobile-friendly navigation and horizontal filter scrolling).
- **Accessibility and inclusion scope** (what we aim for and what we did not claim).
- **Tradeoffs we made** and **scope we didn’t cover** (staged Web3; contract placeholders; no user research or metrics here).

### 1.2 What this document does not cover

- **Visual design system details** (see `Docs/UI_VISIONEER.md`).
- **Backend / contract correctness** (this repo is static + scaffolded Web3; see `TRANSACTIONS.md` and `Docs/PORTFOLIO_VISIONEER.md`).
- **Platform admin UX** (not in scope for this repository).

---

## 2. User goals and outcomes

### 2.1 Primary user goals

Visioneer Studios is designed for users who want to:

1. **Explore the world and vision** quickly (landing, navigation, category entry points).
2. **Find content of interest** without searching (card grids + “Achieve & Collect” collections filters).
3. **Understand what the Web3 layer enables** (staged integration rather than forcing wallet usage everywhere).
4. **Connect a Sui wallet when needed** and see their wallet status.
5. **Get testnet tokens when onboarding** (faucet request) so experimentation can proceed.

Secondary goals (currently scaffolded):
- **Mint, transfer, list, purchase NFTs** after contract IDs/types are configured.
- **Inspect transaction history** and monitor status (skeleton logic exists in `js/transactions.js` and guidance in `TRANSACTIONS.md`).

### 2.2 Outcomes we enable

- **“Explore first, transact later.”** Users can browse the site content without wallet friction; wallet features are staged and surfaced only when enabled.
- **“Wallet setup is short when it matters.”** When Web3 UI is enabled, wallet connect + testnet faucet are direct and guided.
- **“Collections are browsable by category.”** The collections page supports category filtering so users can quickly narrow what they’re trying to find.
- **“Actions feel safe via feedback.”** Wallet operations are wrapped with notifications and loading overlays so users don’t wonder if something happened.

---

## 3. Friction we reduced

### 3.1 Staged Web3 UI: avoid blocking the whole site

**Problem:** For early-stage projects, requiring wallet connection for every page makes exploration feel heavy.

**Solution:** Web3 integration is staged. In `index.html`, a “Web3 section” is explicitly commented out (hidden until ready), while the rest of the site remains fully usable. When enabled, wallet status controls are managed by `SuiManager.updateWalletStatus()` in `js/sui-config.js`.

**Where it lives:** `index.html` (web3 section commented/hidden), `js/app.js` and `js/sui-config.js` (init + status toggling).

### 3.2 Wallet onboarding uses a single obvious action

**Problem:** If wallet connection is unclear, users stall on the “how do I start?” moment.

**Solution:** The site places clear “Connect Wallet” entry points in the header:
- `#connect-wallet` in `index.html`
- `#connect-wallet-large` (wired for testnet controls in `js/app.js`)

Connect logic is centralized inside `SuiManager` so the rest of the UI can rely on consistent state updates.

**Where it lives:** `index.html`, `js/app.js` (`bindWalletEvents()`), `js/sui-config.js` (`connectTestnetWallet()`).

### 3.3 Testnet faucet onboarding after connect

**Problem:** New testnet wallets commonly have zero balance, which prevents further testing and causes confusion.

**Solution:** After selecting testnet and connecting, `SuiManager.connectTestnetWallet()` checks the balance. If balance is zero (or cannot be fetched), it reveals a “Request Testnet Tokens” action. Clicking it triggers `requestTestnetTokens()` which POSTs a faucet request and then refreshes balance.

**Where it lives:** `js/sui-config.js` (`connectTestnetWallet()`, `requestTestnetTokens()`), `FeedbackManager` notifications during the flow.

### 3.4 Collections filtering reduces navigation effort

**Problem:** Without filters, users must visually scan large grids to find specific categories.

**Solution:** The “Achieve & Collect” page implements a category filter. Each card has `data-category`, and filter buttons set an active state and show/hide cards in JS (`pages/collections.html` inline logic and `js/collections.js`).

**Where it lives:** `pages/collections.html`, `js/collections.js`.

---

## 4. First-time vs returning experience

### 4.1 First-time path (most common)

1. **Entry / browse:** Land on `index.html` and explore featured cards + page nav (Our Vision / Live & Explore / etc.).
2. **Discover “Web3 when needed”:** If/when Web3 UI is enabled, users hit “Connect Wallet” rather than being forced into a wallet dialog on first load.
3. **Wallet readiness:** The app reads network/testnet configuration in `js/sui-config.js` and initializes the JSON-RPC provider.
4. **Faucet onboarding:** If balance is low/zero, users request testnet tokens.
5. **Collections exploration:** Navigate to `pages/collections.html` to filter and review category items/achievements.

We intentionally do not enforce a rigid onboarding wizard; the experience is “browse and then connect when you want Web3 features.”

### 4.2 Returning path

- Repeat navigation is predictable because the header/nav stays consistent across pages.
- Returning Web3 users primarily benefit from already knowing “Connect Wallet → check balance → request tokens if needed.”
- Returning collections users benefit from consistent filter UI and active state behavior.

---

## 5. Feedback and trust

### 5.1 Success feedback

- **Toast notifications** for outcomes (connected successfully, tokens requested, purchase success in scaffolded flows).
- **Loading overlay** around async operations so the user understands “work is happening.”

Key UX principle: feedback should be visible, time-bounded, and not block the rest of the page longer than necessary.

**Where it lives:** `js/feedback.js` (`showSuccess`, `showError`, `showLoading`), and call sites in `js/app.js` and `js/sui-config.js`.

### 5.2 Failure and error feedback

- Wallet not installed / not detected: surfaced as an explicit error message in `SuiManager.initialize()` and/or connect handlers.
- Faucet request failures: surfaced as error toasts with generic guidance.
- Transaction failures (scaffolded): error objects are logged and passed into `FeedbackManager.showError()` in areas that wrap action handlers.

**Where it lives:** `js/sui-config.js` (init/connect/faucet), `TRANSACTIONS.md` (best practices and common issues guidance).

### 5.3 Trust signals

- **Explicit balance display** when Web3 UI is enabled (`#balance-display`).
- **Explicit “request tokens” affordance** when balance looks empty.
- **Single source of wallet state** via `StateManager` so the UI doesn’t drift.

---

## 6. Clarity at decision points

### 6.1 “Do I need a wallet now?”

- The site supports exploration without requiring wallet usage at every step.
- When Web3 UI is enabled, wallet requirements become clear through UI toggling driven by `SuiManager.updateWalletStatus()` (connect vs dashboard visibility).

### 6.2 “Why can’t I do the Web3 action yet?”

- If balance is insufficient, the app guides users to request testnet tokens.
- If the wallet API isn’t present (`window.suiWallet` missing), the app tells users they must install a Sui wallet.

### 6.3 “What am I looking at in collections?”

- Each collection card is labeled by category (via `data-category` and visible text).
- Filters provide immediate narrowing so users don’t have to interpret the whole dataset at once.

---

## 7. Progression and motivation

### 7.1 What “progression” means here

Because the site is currently a staged Web3 experience, progression motivation is represented as:

- **Collections growth narrative:** “Achieve & Collect” implies achievements and curated item sets (currently static content, but structured to become on-chain later).
- **Wallet readiness:** onboarding milestones like “connected wallet” and “testnet tokens requested” are tangible step markers.

### 7.2 What the staged Web3 layer enables later

When contract integration is completed (package IDs + object types), progression can be made more “game-like”:
- mint/transfer actions become concrete achievements
- marketplace transactions become milestones

---

## 8. Context and mode clarity

### 8.1 Regular site vs Web3 mode

- “Regular mode” is the full site content (marketing/vision/categories).
- “Web3 mode” is a dashboard-like UI surface toggled based on wallet connection state.

This separation avoids confusing users who only want to browse.

### 8.2 Experimental mode (React/dapp-kit path) vs production path

The repository includes an experimental React/dapp-kit implementation under `js/sui/provider.js` and `js/sui/wallet.js`. The static pages currently operate through the injected `window.suiWallet` style.

UX implication: users should not be exposed to both modes at the same time until it’s clear which UI is authoritative.

---

## 9. Learnability and cognitive load

### 9.1 Navigation is consistent across pages

The same header/nav patterns appear across `index.html` and `pages/*`, which reduces the need to re-learn how to move around.

### 9.2 Filters are understandable by direct manipulation

Collections filtering uses an active state and show/hide behavior so users can “learn by doing.”

### 9.3 Web3 learnability is step-based

Wallet onboarding is broken into:
- connect
- check balance
- request tokens if needed

This avoids dumping wallet jargon upfront.

---

## 10. Responsive and input UX

### 10.1 Mobile navigation and filter controls

CSS includes at least one mobile breakpoint (`max-width: 768px`). Navigation and filter UI adapt for small screens, with filter buttons designed to be horizontally scrollable.

**Where it lives:** `styles/components/_navigation.css` (mobile breakpoint + filter scrolling), `pages/collections.html` (filter markup), `js/collections.js` (behavior).

### 10.2 Touch ergonomics (practical state)

- The filter UI targets are implemented as buttons and should be touch-friendly by default.
- Cards remain clickable links or content blocks depending on page.

When Web3 UI is enabled, loading overlay and toasts improve touch UX by providing immediate feedback after taps.

---

## 11. Accessibility and inclusion

### 11.1 Current accessibility aims

- Uses semantic HTML for navigation (`<nav>`, `<a>`) and primary interactive elements (`<button>`).
- Provides clear feedback for dynamic events via toasts and loading overlay.
- Visual theming supports contrast in the dark theme.

### 11.2 Scope gaps (what we did not claim)

This document does not claim:
- full WCAG compliance
- screen reader perfect support for all dynamic regions
- reduced-motion support as a deliberate setting

These can be added as explicit next work items once the Web3 UI is finalized.

---

## 12. Tradeoffs we made

### 12.1 Staged integration vs “complete product” feel

- **Tradeoff:** Because Web3 functionality is scaffolded and partly placeholder-driven (`YOUR_PACKAGE_ID` etc.), the Web3 UI may not be fully “complete” yet.
- **Why:** It enables iterative buildout without blocking the marketing/site foundation.

### 12.2 Two wallet architecture paths

- **Tradeoff:** There are two approaches present:
  - vanilla injected wallet API (`window.suiWallet`) used by `index.html`
  - React/dapp-kit approach under `js/sui/`
- **Why:** Experimentation while learning wallet standards and UX patterns.
- **UX risk:** If both are exposed, users may see inconsistent connection behaviors. Until standardized, only one should drive the active UI.

### 12.3 Collections filtering code duplication

- **Tradeoff:** `pages/collections.html` includes an inline filter script in addition to `js/collections.js`.
- **Why:** Likely convenience while building.
- **UX risk:** Divergence (different behavior or bugs) if both change independently.

---

## 13. Error recovery and edge cases

### 13.1 Wallet not installed

- Users see an explicit message prompting installation (“Please install a Sui wallet…” or equivalent messaging from `SuiManager.initialize()` / connect handlers).

### 13.2 Faucet failures / balance not updating

- If faucet request fails, the error toast informs users rather than silently failing.
- After faucet request, balance refresh occurs after a short delay; if the update fails, balance display can show “Unable to fetch.”

### 13.3 Contract placeholders / action stubs (scaffolded)

- NFT/marketplace action modules currently include placeholders for contract IDs and generic Move module/function calls.
- UX expectation: these flows should be hidden or disabled until configured; otherwise users will experience action failures without meaningful recovery paths.

### 13.4 Filter UI drift

- With duplicate filter logic, edge cases include:
  - different selectors (`.card` vs `.item-card`)
  - inconsistent hide/show if both scripts run.

---

## 14. What we didn’t do (scope and future work)

### 14.1 No formal research / metrics here

This UX doc reflects implementation intent and observed flows, not validated usability research or measurable UX targets (e.g. “time-to-first-connect”).

### 14.2 Web3 UX completeness

When mint/transfer/list/purchase are made real (real package IDs and object typing), UX should include:
- clear transaction progress states
- better transaction history and “what happened?” pages
- explicit error recovery per transaction type

### 14.3 Accessibility hardening pass

Future work could add:
- focus outlines for interactive elements
- ARIA live regions for toasts/loading
- reduced motion support
- a documented accessibility gap list and remediation plan

---

## 15. File and UX-related references

### 15.1 Primary UX-related code (high level)

- **Site entry + navigation:** `index.html` and shared header markup in pages.
- **Web3 staged onboarding:** `js/app.js`, `js/sui-config.js`
- **State + feedback:** `js/state.js`, `js/feedback.js`
- **UI action builders:** `js/components.js`
- **Collections filter UI:** `pages/collections.html`, `js/collections.js`
- **NFT/marketplace action scaffolding:** `js/nft.js`, `js/marketplace.js`, `js/contracts.js`
- **Transaction best practices:** `TRANSACTIONS.md`

### 15.2 Styling references

- Theme tokens and typography: `styles/base/_variables.css`
- Global layout imports: `styles/main.css`
- Navigation/filter responsiveness: `styles/components/_navigation.css`

---

*This is the full UX reference for Visioneer Studios / Paradigm in this repository. Trim by section or audience as needed; the long form is the master.*


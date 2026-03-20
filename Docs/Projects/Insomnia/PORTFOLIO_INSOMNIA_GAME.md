# Portfolio & Accomplishments: Insomnia Game

This document describes, in explicit and expanded form, what has been built in the **Insomnia Game** application: the frontend game experience, UI system, backend service, Sui blockchain integration, and Move smart contracts. It is intended for **portfolio use** and communicating scope of work—without being marketing copy.

**How to use this document:** This is intentionally **exhaustive** (detailed sections, concrete file paths, module names, data flows, UX/UI decisions, and references). You can trim it later into a one‑pager, resume bullets, or interview talking points.

Related master docs:

- `Docs/UX_INSOMNIA_GAME.md` — UX intent, flows, decision points, acceptance criteria.
- `Docs/UI_INSOMNIA_GAME.md` — UI system, components, states, accessibility implementation.

---

## Key Points: Insomnia Game in One Place

- **Product**: **Insomnia Game** — a **fast-paced clicker/reflex endurance game** on a **5×5 grid**. Players click the active block before it disappears; difficulty ramps every 30 seconds.

- **Onboarding-first loop**: The **first block has no timeout** and wrong clicks are safe until the run starts (clicking the first block). This reduces first-run drop-off for a reflex game.

- **Freemium Web3**:
  - **Demo**: playable without wallet; no on-chain persistence.
  - **Premium**: Sui wallet connected; uses **GamePass** (NFT) with **credits**.

- **Credits & gasless gameplay**:
  - Credits represent “games remaining” and are consumed automatically at the start boundary (documented as consumption on first block click in project status docs).
  - Gameplay transactions are designed for a **gasless player experience** (backend game owner wallet pays gas).

- **Competitive + progression surfaces**:
  - Global **leaderboards** (multiple categories + tier filtering).
  - Player **statistics** (best/average, endurance, clicks, efficiency, skill tier) pulled from chain.
  - Modal-based navigation from a global header: Profile / Statistics / Leaderboard / Settings.

- **Accessibility + mobile-first**:
  - Claimed **WCAG 2.1 AA** compliance in audit docs.
  - 44px minimum touch targets, focus indicators, reduced motion and high contrast support, screen reader affordances.
  - PWA-ready (manifest, icons, offline basics).

- **Stack**:
  - **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS + CSS variables theming.
  - **State + data**: React Context + hooks; React Query caching.
  - **Blockchain**: Sui SDK + dApp kit wallet integration.
  - **Backend**: Node.js/Express service for secure “game owner” operations (credit consumption, score submission).
  - **Contracts**: Sui Move modules for GamePass, ScoreSystem, AdminSystem (and game core logic).

---

## 1. What was built (system-level summary)

### 1.1 The game experience (frontend)

- 5×5 grid gameplay surface with a clear start boundary:
  - “Start Game” shows the first block without a timeout.
  - Clicking the first block begins active play (timeouts and wrong-click rules apply).
  - Progressive difficulty: speed ramps every 30 seconds down to a minimum.
- Real-time player feedback:
  - score, time, speed, difficulty level indicators
  - game-over modal with results and replay CTA
- Theme system:
  - multiple “atmosphere” themes with tokenized accent colors and background patterns
  - theme switching is global and persistent during play

### 1.2 Navigation and UI system

- Persistent header on core surfaces
- “Menu” dropdown exposes modal-based navigation:
  - Profile modal (wallet + pass status)
  - Statistics modal (on-chain stats)
  - Leaderboard modal (global ranks + filtering + “how rankings work”)
  - Settings modal (themes + accessibility options)
- Modal UX characteristics:
  - perfect centering, click-outside-to-close
  - mobile-safe sizing and internal scrolling for overflow
  - theme integration via CSS variables

### 1.3 Web3 and backend “game owner” pattern

- Wallet connection is intentional (no unwanted first-visit auto-connect)
- Read vs write readiness separation (design pattern):
  - read operations can function without wallet connection
  - write operations require wallet or game-owner authority (depending on operation)
- GamePass credits purchased via wallet; gameplay credit consumption is designed to be performed by a backend service so the player is not repeatedly prompted for signatures.

### 1.4 Data integrity and persistence

- On-chain storage for player stats (ScoreSystem) and GamePass status
- Cached reads via hooks and React Query with refresh behavior
- Robust error boundaries + user-friendly error messages and retry affordances

---

## 2. UX and UI accomplishments (what matters to users)

### 2.1 Onboarding and fairness

- **First block safety**: The first block remains visible until clicked; users can explore and misclick without penalty before the run starts.
- **Rule clarity**: The start boundary is unambiguous; only after active play starts do miss conditions apply.
- **Difficulty legibility**: Users can see both the speed time and named difficulty level; transitions occur on predictable 30-second thresholds.

### 2.2 Modal-based navigation (seamless, no route changes)

- “Menu” dropdown + modals allow users to check profile/stats/leaderboard/settings without leaving the game context.
- Click-outside-to-close and consistent centering reduces interaction friction on mobile and desktop.

### 2.3 Theme system quality

- Full token-based theming (CSS variables), theme-specific background patterns, and smooth transitions.
- Mobile-specific adjustments to keep layouts stable and tappable.

### 2.4 Accessibility implementation

Based on audit and CSS rules:

- visible focus indicators and enhanced keyboard navigation mode
- reduced motion support (`prefers-reduced-motion`)
- high contrast support (`prefers-contrast` + class-based toggles)
- color-blindness pattern overlay for active game tiles
- skip link + screen-reader-only utilities

---

## 3. Technical architecture and design decisions

### 3.1 Layering and separation of concerns

The project follows a clean layering approach:

- UI components remain mostly presentational.
- Business logic is pushed to services/hooks/contexts.
- Blockchain interactions are centralized through services and contexts.
- Backend holds privileged operations (game owner wallet) and protects private keys from the client.

### 3.2 SSR safety and hydration stability (Next.js App Router)

- Browser APIs are protected with SSR-safe patterns.
- Lazy-loaded components reduce initial payload and improve perceived performance.

### 3.3 Performance-first patterns

- Web Workers are used for heavy computation where applicable (per project architecture/audit).
- Bundle optimization with code splitting and lazy loading (modals).
- Stable gameplay rendering (avoid layout thrash; internal modal scrolling instead of page scrolling).

### 3.4 Security posture

Documented in audit materials:

- input sanitization and validation
- security headers, CSP, and safe error messaging
- rate limiting for backend APIs
- private key protection (backend-only storage)

---

## 4. Blockchain integration (what is on-chain and why)

### 4.1 GamePass (NFT) and credits

- GamePass exists in Move as the premium access artifact.
- Credits represent remaining paid sessions.
- UX intent: credits are **visible**, **understandable**, and consumed at a consistent boundary.

### 4.2 ScoreSystem and player stats

- Player statistics are stored on-chain to enable persistence and competitive integrity.
- Statistics modal renders:
  - total games, best score, average score
  - best clicks, longest survival, average clicks
  - skill tier and last played

### 4.3 Backend transaction model (“game owner pays gas”)

- A Node/Express backend is responsible for privileged actions and gas payment.
- This enables the core gameplay loop to remain fast (no wallet signing required every session).

---

## 5. Milestones and major accomplishments (high signal)

### 5.1 Core gameplay loop shipped

- Start → first block (safe) → active timed gameplay → game over → replay loop
- Progressive difficulty and real-time stat indicators

### 5.2 Freemium UX shipped

- Demo mode without wallet
- Premium mode with wallet + GamePass
- Conditional CTAs based on wallet connection status

### 5.3 GamePass purchase + “add games” shipped

- Purchase pass tiers and reflect credits in UI
- Add credits to existing pass (credit stacking)
- Real-time updates after transactions

### 5.4 Modal navigation system shipped

- Header dropdown + 4 modals (profile, stats, leaderboard, settings)
- Perfect centering + click outside + responsive overflow handling
- Lazy-loaded modals for performance

### 5.5 Blockchain-integrated statistics shipped

- Stats pulled from chain through services + cached hooks
- Automatic refresh after games; manual refresh available
- Time formatting to human-readable MM:SS

### 5.6 Accessibility + compliance work shipped

- Focus, keyboard navigation, skip link, screen reader utilities
- Reduced motion and high contrast support
- Pattern overlays for color-blind accessibility

---

## 6. Codebase and file reference (Insomnia)

Paths are relative to the project root unless otherwise noted.

### 6.1 Frontend (Next.js App Router)

- Routes and shell:
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
  - `src/app/game/page.tsx`
  - `src/app/game/GamePageClient.tsx`
  - `src/app/globals.css`

- Core components:
  - `src/components/Game.tsx`
  - `src/components/GameGrid.tsx`
  - `src/components/GameControls.tsx`
  - `src/components/GameStats.tsx`
  - `src/components/GameOverModal.tsx`
  - `src/components/GamePassPurchase.tsx`
  - `src/components/Header.tsx`
  - `src/components/ProfileDropdown.tsx`
  - `src/components/ThemeToggle.tsx`
  - `src/components/LoadingSpinner.tsx`
  - `src/components/ErrorBoundary.tsx`
  - `src/components/AccessibilityProvider.tsx`
  - `src/components/LazyComponents.tsx`

- Modals:
  - `src/components/modals/ProfileModal.tsx`
  - `src/components/modals/StatisticsModal.tsx`
  - `src/components/modals/LeaderboardModal.tsx`
  - `src/components/modals/SettingsModal.tsx`

- Hooks / Context / Services:
  - Context: `src/contexts/*` (Wallet, Blockchain, Theme, GamePass, GameMode)
  - Hooks: `src/hooks/*` (cached blockchain data, game state, worker, mobile optimization, SSR safety)
  - Blockchain services: `src/lib/services/blockchain/*`
  - Config: `src/lib/config/*`

- Styles:
  - `src/styles/accessibility.css`

### 6.2 Backend (Express)

- Backend service root:
  - `backend/src/server.js`
  - `backend/src/routes/consumeCredit.js`
  - `backend/src/services/gameOwnerWallet.js`

### 6.3 Smart contracts (Move)

- `contracts/InsomniaGame/Move.toml`
- `contracts/InsomniaGame/sources/admin_system.move`
- `contracts/InsomniaGame/sources/game_pass.move`
- `contracts/InsomniaGame/sources/score_system.move`

---

## 7. What you can say about this work (interview-ready)

You can accurately say that you shipped a modern Web3 game that includes:

- A polished **mobile-first** 5×5 clicker game loop with progressive difficulty and clear fairness boundaries (first block safe).
- A complete **freemium** UX: demo mode without wallet and premium mode backed by Sui GamePass NFTs and credits.
- A **gasless gameplay** pattern where a backend game owner wallet handles privileged transactions so users are not repeatedly prompted to sign.
- A professional **modal navigation system** (Profile/Statistics/Leaderboard/Settings) with lazy loading, responsive overflow, and theme integration.
- **On-chain persistence** for player stats and competitive leaderboards, with caching and refresh mechanisms.
- Strong **accessibility implementation** (focus, keyboard navigation, reduced motion, high contrast, screen reader support) and audit-backed production readiness.

---

## 8. Positioning for applications (how to tailor)

- **Frontend engineering**: emphasize responsive game UI, state management patterns, lazy loading, SSR safety, theming, and accessibility.
- **Full-stack**: emphasize the backend “game owner pays gas” service, API security, and environment separation.
- **Blockchain engineering**: emphasize Move contracts, wallet integration, on-chain stats integrity, and transaction flow design.
- **Product/UX**: emphasize onboarding fairness (first block safe), clarity of rules, performance feedback, and friction reduction in premium loops.

---

## 9. Known limitations and future work (honest scope)

This project has strong foundations and production-readiness work documented, with clear next steps depending on current priorities:

- Expand score submission/reward mechanisms (if any pieces are still in-flight) and align documentation to final behavior.
- Tournament and achievements roadmap (mentioned in project docs) can be layered on top of existing stats/leaderboard primitives.
- Deeper analytics/RUM and A/B testing (architecture-ready per docs).
- Continued mobile/PWA polish (offline strategies, install funnels, push notifications if desired).

---

## 10. Documentation references

- `README.md` — product overview, features, quick start
- `PROJECT_ARCHITECTURE.md` — architectural principles and layering
- `CURRENT_STATUS_SUMMARY.md` — implementation status and milestone list
- `COMPREHENSIVE_AUDIT_REPORT.md` — security/accessibility/performance readiness
- `FILE_SYSTEM_GUIDE.md` — project map
- `HEADER_DROPDOWN_IMPLEMENTATION.md` — modal navigation system details
- `STATISTICS_SYSTEM.md` — stats data model and UI behavior
- `NEXT_STEPS.md` — roadmap and next milestones

---

*This is the exhaustive portfolio master document for Insomnia Game. Trim by audience as needed; keep this as the source of truth.*


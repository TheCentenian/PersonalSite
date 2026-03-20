# Portfolio & Accomplishments: Technical Summary

This document describes, in explicit and expanded form, everything that has been built, integrated, and refined in this codebase. It is intended for self-promotion, portfolio use, and communicating scope of work to clients or employers—without focusing on product-specific marketing.

**How to use this document:** The content is intentionally **fully fleshed out** (detailed sections, concrete file paths, component and function names, codebase references). You can **condense and rewrite** it after all content is in place: shorten sections for a one-page summary, pull bullets for a resume, or keep the long form as a master reference. The **Codebase and File Reference** section gives you a single place to find paths and names when you need to keep or drop specifics. Sections **7** and **8** are tuned for applications and interviews; the rest is the full technical and narrative backing.

---

## Key Points: MVP in One Place

These points are written so you can confirm the document aligns with how you describe the project (e.g. to recruiters, clients, or other tools):

- **MVP stack:** The application is an MVP built with **React**, **Next.js**, **TypeScript**, and a full set of supporting libraries (Tailwind, Radix UI, Zustand, React Hook Form, Zod, Framer Motion, and others). All of these are documented in Section 1.

- **Wallet integration:** The app **connects with wallets** in the sense that users add and manage one or more **wallet addresses**; the system then fetches and displays holdings and transactions for those addresses. Data is read via backend blockchain queries (no wallet SDK in the browser). The architecture supports extending to wallet connection (e.g. browser extension or WalletConnect) and signing flows where needed; the current implementation focuses on address-based tracking and read-only transaction and holdings data.

- **Reading transactions and translating them into human-readable form:** The app **reads on-chain transactions** via the backend and **translates them into human-readable form**. Raw transaction data (events, balance changes, object changes) is processed to determine transaction type (e.g. transfer, swap, stake, unstake, NFT mint/transfer, liquidity deposit/withdraw, lending, contract call), direction (in/out), amounts, and token metadata. The UI displays these as readable rows: type label, token symbol, formatted amount, in/out indication (e.g. color and sign), and metadata (decimals, icons) so users see “what happened” instead of raw hashes and coin types. This translation pipeline is described in Section 5.8 and in the blockchain processing/enrichment logic.

- **Organize and report on them:** Users can **organize** their data via **goals** (with grouping and subgoals), **filters** (by coin, chain, wallet, etc.), **transaction history** per wallet, and **notes** on goals. **Reporting** is supported through goal progress and milestones, transaction history views, and an **Insights** surface (dashboard placeholder for analytics, progress trends, and recommendations). So the app supports both organizing transactions and goals and reporting on progress and activity.

- **Blockchain queries:** The app **performs blockchain queries** server-side. Sui holdings, transactions, and metadata are provided either by the **evarra-backend-service** (separate repo, cloned in the project; can be deployed to Render) or by internal Next.js API routes. The frontend never talks to the chain directly; it calls the app’s API or the backend service. Config is in `lib/config/backend.ts`. See Section 1.7 and Section 5.8.

- **Front-end architecture:** The **front end has a competent architecture**: domain-driven structure, clear separation between UI and business logic, multi-chain-ready data model, and consistent patterns. This is covered in Section 2 (Architecture and Code Organization).

- **Simplicity for new users, complexity for advanced users:** The app **provides options for simplicity for new users and complexity for advanced users**: simple vs advanced goal creation, configurable goal-details panel (static vs slide-in), tier-based feature access, and settings-driven preferences. This is covered in Section 4 (Usability).

- **State management:** The app **provides state management** via Zustand stores (auth, goals, wallets, UI) with persistence, user-scoping, and rehydration. This is covered in Section 1.5 and Section 2.3.

- **Modular for maintainability:** The codebase is **modular for maintainability**: domain boundaries, single-responsibility modules, chain abstraction, component composition, centralized cross-cutting logic, and barrel exports. This is covered in Section 2.5 (Modular Design for Maintainability).

- **Database (MongoDB):** The project **implements MongoDB** in the repo for server-side persistence. Connection: `src/lib/db/mongodb.ts`. Services (e.g. `mongoGoalsService`, `mongoUserService`, `mongoWalletsService`, `mongoCacheService`, `mongoUserSettingsService`, `mongoWalletDataService`) persist goals, users, wallet data, and cache. API routes for goals, wallets, user settings, and auth (login, register, password reset) use these services. Client-side persistence (Zustand + localStorage) coexists for session state. Database work is covered in Section 1.10 and in the Codebase and File Reference.

- **Backend service (evarra-backend-service):** A **separate Node/Express repo** (cloned in the project, in `.gitignore`) is documented to the same level as the frontend. It provides **Express 5**, **@mysten/sui**, **MongoDB**, **bcrypt**, **cors**; routes for **auth**, **goals**, **wallets**, **cache**, and **Sui** (holdings, transactions, metadata); services and utils; connections to Sui mainnet, MongoDB, and the main app via `lib/config/backend.ts`. See Section 1.11 and the Codebase and File Reference (Backend service).

- **Security:** **bcrypt** for passwords, **env-based secrets** (no keys in client), **server-side-only** Sui/RPC, **CORS** and **validation** (Zod, backend checks), **user-scoped data** and JWT/cookie auth. Section 1.12.

- **Deployment and setup:** Main app runs with `npm run dev` / `npm run build` & `start`; deployable to Vercel or Node hosts. Backend deployable to Render. Key **env vars** (MONGODB_URI, USE_BACKEND_SERVICE, RENDER_SERVICE_URL, JWT_SECRET, RESEND_API_KEY, etc.) and local-setup steps are in Section 1.13 and in the Codebase and File Reference (Environment variables).

- **Performance and resilience:** **Code splitting** (Next.js), **caching** (metadata, wallet-data), **pagination** (transactions), **timeouts and retries** (backend config), **loading states** and **error boundaries**. Section 2.8.

- **Known limitations and future work:** **Read-only** wallet data today (no signing, no in-browser wallet connection); **Insights** is a placeholder; backend is **optional**; web-only (no mobile). Natural next steps: signing, wallet connection, more chains, complete Insights, React Native. Section 5.16.

- **Responsive design, logging, and API flows:** Layout uses **Tailwind** responsive breakpoints; **logging** is console-based (frontend and backend logger) with health endpoints; **key data flows** (auth, goals, wallets, holdings/transactions, metadata) are documented in Section 2.10 and in the Codebase and File Reference (Key data flows, Logging and observability). Sections 2.9, 2.10, 3.

If you have not worked on the project in a few months, you can still accurately describe it using this document; the technical content reflects the current codebase and can be updated when you resume work (e.g. signing flows, additional chains, or reporting features).

---

## Codebase and File Reference

This section lists concrete paths, store names, API routes, and key files so that when you condense the document you can keep or drop specific references. All paths are relative to the project root.

**Stores (Zustand, with persistence):**

- `src/lib/store/auth.ts` — `useAuthStore`; persistence key `evarra-auth`; persists `user`.
- `src/lib/store/goals/index.ts` — `useGoalStore`; persistence key `evarra-goals`; persists `goals` (not user); actions from `actions/storeActions.ts`, `actions/parent.ts`, `actions/progress.ts`, `actions/user.ts` (and `formActions` where used).
- `src/lib/store/wallets/index.ts` — wallet store; persistence key `evarra-wallets`; persists wallet list and related data per user.
- `src/lib/store/ui.ts` — UI-only state (e.g. modals); typically not persisted.

**Goal store action files:**

- `src/lib/store/goals/actions/storeActions.ts` — core CRUD and list operations.
- `src/lib/store/goals/actions/parent.ts` — parent/subgoal and grouping.
- `src/lib/store/goals/actions/progress.ts` — progress updates.
- `src/lib/store/goals/actions/formActions.ts` — form-related actions.
- `src/lib/store/goals/actions/user.ts` — user-scoping and setUser.

**Date and cross-cutting utilities:**

- `src/lib/utils/date.ts` — `getNowISO()`, `formatDate(date)`; used for all milestone, goal, and note timestamps and display.

**Database and MongoDB:**

- `src/lib/db/mongodb.ts` — MongoDB connection (MongoClient, connection pooling, `MONGODB_URI` from env).
- `src/lib/services/mongoGoalsService.ts`, `mongoUserService.ts`, `mongoWalletsService.ts`, `mongoCacheService.ts`, `mongoDataService.ts`, `mongoUserSettingsService.ts` — server-side persistence for goals, users, wallets, cache, and settings.
- `src/lib/domains/wallets/services/mongoWalletDataService.ts` — wallet data sync with MongoDB.

**Backend service (evarra-backend-service — separate repo):**

- **Location:** `evarra-backend-service/` (cloned in project root, in `.gitignore`). Separate repo; deployable to Render. Main app connects via `src/lib/config/backend.ts` when `USE_BACKEND_SERVICE` is true.
- **Entry:** `evarra-backend-service/src/index.js` — Express app, CORS, middleware, route mounting, inline SUI handlers (holdings, transactions, metadata), health and root.
- **Framework & runtime:** Node.js, **Express 5.x**. Port from `process.env.PORT` or 3000; production listens on `0.0.0.0`; dev can use HTTPS (server.key/server.cert) or fallback HTTP.
- **Dependencies (package.json):** `@mysten/sui` (^1.35.0), `express` (^5.1.0), `mongodb` (^6.17.0), `bcrypt` (^6.0.0), `cors` (^2.8.5), `dotenv` (^17.0.1); `@types/cors` dev.
- **Routes (all under `/api/`):**
  - **Auth:** `src/routes/auth.js` — POST `/api/auth/register`, `/api/auth/login`; GET `/api/auth/user/:userId`; PUT `/api/auth/user/:userId`; GET `/api/auth/health`. Uses `userService` (MongoDB).
  - **Goals:** `src/routes/goals.js` — POST `/api/goals`, GET `/api/goals/:goalId`, GET `/api/goals/user/:userId`, PUT `/api/goals/:goalId`, DELETE `/api/goals/:goalId`, GET `/api/goals/:goalId/progress`, PUT `/api/goals/:goalId/progress`, GET `/api/goals`, GET `/api/goals/health`. Uses `goalService`.
  - **Wallets:** `src/routes/wallets.js` — POST `/api/wallets`, GET `/api/wallets/user/:userId`, GET `/api/wallets/:walletId`, PUT, DELETE, GET by address/chain, GET `/api/wallets`, GET `/api/wallets/health`. Uses `walletService`.
  - **Cache:** `src/routes/cache.js` — wallet-data and metadata cache (GET/POST/PUT/DELETE as per root endpoint listing). Uses `cacheService`.
  - **SUI (inline in index.js):** GET/POST `/api/sui/holdings` (query/body: `address`, `forceRefresh`); GET/POST `/api/sui/transactions` (`address`, `limit`, `cursor`); POST `/api/sui/metadata` (body: `coinTypes` array). Also exposed via `src/routes/sui.js` (router) if mounted elsewhere.
  - **Health:** GET `/api/health` — returns status, service name, timestamp, version.
- **Services:** `src/services/userService.js` (MongoDBUserService — createUser, authenticateUser, etc.), `src/services/walletService.js` (MongoDBWalletService — CRUD, getUserWallets, getByAddress, getByChain), `src/services/goalService.js`, `src/services/cacheService.js`.
- **Utils:** `src/utils/logger.js`, `src/utils/validation.js` (e.g. `validateAddressByChain` for SUI), `src/utils/errorHandler.js`.
- **Types:** `src/types/wallet.js` / `src/types/wallet.ts` — wallet-related types.
- **Sui logic (in index.js):** `SuiClient` from `@mysten/sui/client`, `getFullnodeUrl('mainnet')`; `fetchSuiHoldings` (getAllBalances, transform to holdings); `fetchSuiTransactions` (queryTransactionBlocks FromAddress + ToAddress, dedupe, sort by timestamp, pagination); `fetchSuiMetadata` (getCoinMetadata per coinType, KNOWN_TOKENS fallback); SUI address validation (`validateSuiAddress`).
- **Connections:** (1) **Sui mainnet** via Sui SDK RPC. (2) **MongoDB** via services (user, wallet, goal, cache). (3) **Main app** — frontend/Next.js calls `BACKEND_ENDPOINTS` from `lib/config/backend.ts` (SUI_HOLDINGS, SUI_TRANSACTIONS, SUI_METADATA, HEALTH); CORS controlled by `CORS_ORIGIN` (e.g. `http://localhost:3000`).
- **Scripts:** `npm run dev`, `npm start` → `node src/index.js`; no build step (JavaScript).

**API routes (Next.js, under `src/app/api/`):**

- **Auth:** `auth/login`, `auth/register`, `auth/forgot-password`, `auth/reset-password-with-token`, `auth/validate-reset-token`, `auth/logout`, `auth/set-cookie`, `auth/clear-cookie`.
- **Goals:** `goals/route.ts`, `goals/[id]/route.ts`, `goals/cleanup/route.ts`, `goals/debug/route.ts`.
- **Wallets:** `wallets/route.ts`, `wallets/[id]/route.ts`.
- **User:** `user/settings/route.ts`.
- **Cache:** `cache/metadata/route.ts`, `cache/wallet-data/route.ts`; `wallet-data/route.ts`, `wallet-data/health/route.ts`.
- **Blockchain:** `holdings/sui/route.ts`, `transactions/sui/route.ts`; plus `holdings/btc`, `holdings/eth`, `holdings/sol`, `holdings/polygon`, `transactions/polygon`, `coins` as applicable.
- **Other:** `health`, `debug`, `test-config`, `email/analytics`, etc.

**Blockchain (Sui) — key files:**

- `src/lib/blockchain/sui/api/fetchHoldings.ts` — fetch holdings via app API.
- `src/lib/blockchain/sui/api/fetchTransactions.ts` — fetch transactions via app API.
- `src/lib/blockchain/sui/enrichTransactions.ts` — `enrichSuiTransactions`, `addSuiTransactionMetadata`; adds metadata and transaction type.
- `src/lib/blockchain/sui/processing/type.ts` — `determineTransactionType(events, balanceChanges, objectChanges, status)`; returns `TransactionType`.
- `src/lib/blockchain/sui/types/transaction.ts` — `TransactionType` union (e.g. transfer, swap, stake, unstake, claim, liquidity_deposit/withdraw, swap_exact_in/out, nft_mint/transfer/burn, lending_*, contract_deploy/call, reward_distribution, other) and `EVENT_PATTERNS`.
- `src/lib/blockchain/sui/utils/metadataManager.ts` — token metadata cache, `getTokenMetadataWithCache`, `getTokenDecimals`, `extractTokenInfoFromCoinType`, etc.
- `src/lib/blockchain/sui/holdingsHelpers.tsx` — Sui-specific rendering for holdings list (e.g. `renderSuiHolding`).
- `src/lib/blockchain/sui/transactionsHelpers.tsx` — Sui-specific rendering for transaction list.

**Domain entry points (barrel exports):**

- `src/lib/domains/goals/index.ts`
- `src/lib/domains/wallets/hooks/index.ts` (search, transactions, management)
- `src/lib/domains/features/index.ts`
- Goal utils: `domains/goals/utils/aggregation/`, `utils/data/`, `utils/milestones/`.

**Feature components (examples):**

- Goals: `components/features/goals/forms/BasicGoalForm.tsx`, `AdvancedGoalForm.tsx`, `CreateGoalForm.tsx`, `GoalForm.tsx`, `SimpleGoalGrid.tsx`, `AdvancedGoalGrid.tsx`; `cards/GoalCard.tsx`, `TrackerGoalCard.tsx`; `panels/GoalDetailsPanel.tsx`, `GoalDetailsPanelContainer.tsx`; `lists/GoalList.tsx`, `GoalTree.tsx`, `GoalHistory.tsx`; `progress/GoalProgress.tsx`, `Milestones.tsx`, `YourProgress.tsx`; `info/GoalOverview.tsx`, `GoalNotes.tsx`, `SubgoalsInfo.tsx`, `ParentGoalInfo.tsx`; `actions/GoalActions.tsx`, `GoalStatusBadge.tsx`; `states/EmptyGoalsState.tsx`.
- Wallets: `AddWalletDialog.tsx`, `WalletCard.tsx`, `WalletForm.tsx`, `WalletDetailsPanel.tsx`, `WalletDetailsPanelContainer.tsx`, `EmptyWalletsState.tsx`; `holdings/HoldingsList.tsx`, `holdings/sui/SuiHoldingsPanel.tsx`; `transactions/TransactionList.tsx`, `TransactionsPanel.tsx`, `transactions/sui/SuiTransactionsPanel.tsx`.
- Settings: `settings/privacy/PrivacySettings.tsx`, `settings/notifications/NotificationSettings.tsx`.

**Config and types:**

- `src/types/goals.ts`, `src/types/users.ts` (or `auth`), `src/types/transactions.ts` — shared types.
- Filter configs: e.g. `goalFilterConfig`, `walletFilterConfig` (dynamic options for coin/chain).

**Responsive design:**

- Tailwind responsive utilities (`sm:`, `md:`, `lg:`, `xl:`) used in layout, components, and pages (goals, wallets, tracker, settings, dialogs, panels). Web-only; no React Native. Section 3 (Design).

**Logging and observability:**

- Frontend: `console.log` (info/debug), `console.error` (errors); toasts and inline messages for users. Backend: logger in `evarra-backend-service/src/index.js` and `src/utils/logger.js` (info, warn, error, debug). Health: `GET /api/health` (main app and backend), optional goals/wallets/auth health routes. Section 2.9.

**Key data flows (API contracts):**

- Auth: login/register/reset → cookie or token, store rehydration. Goals: CRUD via API, store + localStorage, shape in `types/goals.ts`. Wallets: add/list; holdings GET/POST → `{ success, data: { holdings }, metadata }`; transactions GET/POST → `{ success, data: { transactions, nextCursor, hasNextPage }, metadata }`; frontend enriches and displays. Metadata: POST coinTypes → metadata by coin type; client cache. Section 2.10.

**Tests:**

- `src/components/features/goals/tests/GoalForm.test.tsx`, `goal-card.test.tsx`; `navigation/main-nav.test.tsx` (if present). Jest config and Babel presets in package.json / jest config.

**NPM scripts (from package.json):**

- `dev` — next dev
- `build` — next build
- `start` — next start
- `lint` — next lint
- `test` — jest
- `test:watch` — jest --watch
- `test:coverage` — jest --coverage
- `type-check` — tsc --noEmit

**Environment variables (main app):**

- **MONGODB_URI** — required for server-side MongoDB (goals, users, wallets, cache, settings).
- **MONGODB_DATABASE** — optional; default `evarra`.
- **USE_BACKEND_SERVICE**, **RENDER_SERVICE_URL** — optional; use evarra-backend-service for SUI (and optionally auth when USE_BACKEND_AUTH is set).
- **JWT_SECRET** — for JWT-based auth when used.
- **RESEND_API_KEY**, **FROM_EMAIL** — for password-reset email (Resend).
- **ETHERSCAN_API_KEY** — optional; for Ethereum chain.
- **USE_MONGODB_CACHE**, **USE_DATABASE** — optional feature flags. See `lib/config/backend.ts`, `lib/db/mongodb.ts`, and service files for where each is read.

**Environment variables (evarra-backend-service):**

- **PORT** — server port (default 3000).
- **CORS_ORIGIN** — comma-separated allowed origins (e.g. `http://localhost:3000`).
- **MongoDB** — connection URI and database name as used by backend services (auth, goals, wallets, cache).

**Data persistence:** The app uses **client-side persistence** (Zustand persist → localStorage) and **MongoDB** for server-side persistence. MongoDB connection: `src/lib/db/mongodb.ts`; services under `src/lib/services/` and `src/lib/domains/wallets/services/` (mongoGoalsService, mongoUserService, mongoWalletsService, mongoCacheService, etc.) persist goals, users, wallet data, and cache. API routes under `src/app/api/` (goals, wallets, user/settings, auth) use these services. The **evarra-backend-service** folder (separate repo, cloned in project) provides the SUI blockchain API; the app connects to it via `lib/config/backend.ts` (e.g. Render URL) when `USE_BACKEND_SERVICE` is enabled.

---

## 1. Technologies, Tools, and Libraries

### 1.1 Core Framework and Runtime

**Next.js (v15.3.x)** is the application framework. The project uses the App Router exclusively: all routes live under `src/app/`, with route groups for public versus authenticated areas (e.g. `(journey)` for protected pages such as goals, tracker, wallets, insights, settings). Server and client boundaries are respected: blockchain and API logic that must run in Node (such as the Sui SDK) are kept out of the browser and executed via Next.js API routes that proxy to backend services. The codebase may use or have used Next.js middleware for authentication and route protection (e.g. redirecting unauthenticated users from protected paths); the layout for the journey group provides the main shell (navigation, theme provider). The framework relies on Next’s built-in code splitting, loading states, and layout system. The framework is configured for TypeScript, ESLint, and optional bundle analysis via `@next/bundle-analyzer`. Build and dev commands are standard: `npm run dev` (development server), `npm run build` (production build), `npm run start` (production server).

**React (18.2.x)** is used throughout. Components are function components only; hooks are used for state, side effects, and shared logic. The codebase avoids class components and legacy lifecycle methods. React’s concurrent features and strict mode are compatible with the current setup. There is no React Native in this repo; the app is web-only, which is relevant when comparing to mobile-first wallet roles.

**TypeScript (5.3.x)** is used for the entire application: app routes, components, library code, store logic, and tests. Strict typing is enforced. Types and interfaces are centralized where it makes sense: `src/types/` for cross-cutting types (e.g. goals, users, transactions), and domain-specific or chain-specific types next to their domains (e.g. `src/lib/blockchain/sui/types/`). There are no `any` escape hatches in core logic; types are exported from index files and reused across the app. Type checking is run via `npm run type-check` (`tsc --noEmit`) so that the project compiles without emitting files and stays type-safe.

### 1.2 Styling and Theming

**Tailwind CSS (3.4.x)** is the primary styling system. Utility classes are used for layout, spacing, typography, and responsive behavior. The project uses **tailwind-merge** and **class-variance-authority (CVA)** to build component variants without class conflicts and to keep the UI primitives consistent (e.g. button variants, input states). Tailwind plugins in use include `@tailwindcss/forms` and `@tailwindcss/typography` for form controls and long-form content styling. Autoprefixer and PostCSS are part of the build pipeline.

**next-themes** handles theme persistence and application. The app supports light and dark themes only (system theme was removed for consistency). The chosen theme is stored per user (e.g. in the auth or user store) and rehydrated on login so that each user’s preference is restored. Public pages (e.g. login, signup, welcome) use a fixed dark theme; authenticated pages respect the user’s saved preference. Theme is applied without flash and is kept in sync with the theme provider and the persisted store.

**CSS architecture:** Global styles live in `src/styles/globals.css`. Design tokens (e.g. colors, radii, spacing) are aligned with Tailwind and with the Radix UI theme variables where components are customized. Theme-aware components use data attributes or class strategies (e.g. dark: classes or theme CSS variables) so that light and dark modes are consistent across custom and third-party UI. Destructive actions use a dedicated red/destructive token so that delete/remove actions are visually consistent app-wide.

### 1.3 UI Components and Interaction

**Radix UI** is the foundation for accessible primitives. The project uses Radix for: Dialog, Dropdown Menu, Label, Popover, Select, Tabs, and Tooltip. These provide keyboard navigation, focus management, ARIA attributes, and correct behavior for screen readers. All are styled via Tailwind and theme tokens so they match the rest of the app.

**Custom UI layer:** On top of Radix, the codebase defines a full set of theme-aware components: Button, Input, Checkbox, Radio, Switch, Select, Badge, Avatar, and others. Each of these respects the current theme (light/dark), supports focus and hover states, and is used consistently so that forms and controls look and behave the same everywhere.

**Framer Motion (v12)** is used for animations and transitions: modal and panel open/close, list updates, and subtle feedback. Motion is used sparingly to avoid distraction while keeping the interface responsive and clear.

**Lucide React** and **Heroicons** supply icons. Icon usage is consistent in navigation, buttons, and status indicators. Where needed, icons are wrapped with tooltips or aria-labels for accessibility.

**Sonner** is used for toast notifications. Success, error, and informational feedback are shown via toasts so that the user gets clear feedback without blocking the UI.

**cmdk** is used for command-palette or combobox-style interactions where fast search and selection are required.

### 1.4 Forms and Validation

**React Hook Form (v7)** handles all form state: goal creation and editing, wallet addition, settings, and any multi-field flows. The library is used with controlled and uncontrolled inputs as appropriate, and form state is kept local to the form with submission and reset handled explicitly.

**Zod (v3)** is the schema and validation layer. Every form that submits data has a Zod schema defining shape and validation rules. Schemas are reused for type inference so that TypeScript types and runtime validation stay in sync.

**@hookform/resolvers** connects React Hook Form to Zod: the `zodResolver` maps schema validation errors to field-level errors so that the UI can show inline validation messages.

**Positive number and input constraints:** A shared pattern (and reusable component where applicable) enforces non-negative numeric input where the domain requires it, with consistent behavior and error messaging.

### 1.5 State Management

**Zustand (v5.x)** is the only global state library. Multiple stores exist:

- **Auth** (`src/lib/store/auth.ts`): `useAuthStore`; holds current user, loading, error; actions include `login`, `signup`, `logout`, `updateUser`, `setSkillLevel`; persisted under key `evarra-auth` (only `user` is partialized for persistence).
- **Goals** (`src/lib/store/goals/index.ts`): `useGoalStore`; holds goals array, loading, error, userId, user; actions are composed from `createUserActions`, `createGoalActions`, `createProgressActions`, `createParentActions` (from `actions/user.ts`, `storeActions.ts`, `progress.ts`, `parent.ts`); persisted under key `evarra-goals` (goals are persisted; user state is not duplicated in this store for persistence). Form-related actions may live in `formActions.ts`.
- **Wallets** (`src/lib/store/wallets/index.ts`): wallet list, selected wallet, wallet data (holdings/transactions per address), and UI state; persisted under key `evarra-wallets` with partialize so only necessary wallet data is stored.
- **UI** (`src/lib/store/ui.ts`): client-only UI state such as which modal is open or which panel is expanded; typically not persisted.

Store slices are organized by domain and by concern: e.g. `lib/store/goals/actions/` contains `storeActions.ts`, `parent.ts`, `progress.ts`, `formActions.ts`, `user.ts`, so that each file has a clear responsibility.

**Persistence:** Zustand’s `persist` middleware is used for auth, goals, and wallets. Data is stored in `localStorage` under the keys above. Goals are stored in a single list and filtered by the current user’s ID in the UI and in logic, so that each user only sees their own goals. Wallet data is scoped per user. Rehydration is automatic on page load. On login/logout, the app syncs store state with the current user (e.g. via a hook or logic like `useSyncStoresWithAuth`) so that persisted data is attributed to the correct user and no manual “reset” or clear calls are required; this avoids data leakage between users and prevents goals or wallets from appearing under the wrong account.

**No Redux or other global state:** The architecture deliberately avoids Redux or complex middleware. Zustand’s small API and its persistence middleware are sufficient for the current feature set and keep the data flow easy to reason about and debug.

### 1.6 Data and Time

**date-fns (v4.x)** is used for all date formatting and manipulation. The codebase avoids ad-hoc `Date` string handling and scattered `toISOString()` or `toLocaleDateString()` calls. A single module **`src/lib/utils/date.ts`** exposes:

- `getNowISO()` — returns `new Date().toISOString()` for consistent ISO timestamps when creating goals, milestones, or notes.
- `formatDate(date: string | Date)` — returns a human-readable date (e.g. long format: year, month name, day) so that all date displays (milestones, goal details, notes, history) use the same format and timezone behavior.

All milestone, goal, and note creation use `getNowISO` for timestamps; all date displays use `formatDate`. This avoids timezone and format drift and keeps the source of truth in one place so that changing date behavior requires editing only this file.

**UUID (v11.x)** is used to generate stable unique identifiers for entities (e.g. goals, users) where the client is responsible for ID creation and a collision-resistant ID is required.

### 1.7 Blockchain and Backend Integration

**Sui blockchain:** The application integrates with the Sui network for read-only wallet data (holdings and transactions). The **evarra-backend-service** (separate repo, cloned in the project folder; deployable to Render) runs the Sui RPC and metadata logic; the main app’s **Next.js API routes** (e.g. `holdings/sui/route.ts`, `transactions/sui/route.ts`) either proxy to that service or call it via `lib/config/backend.ts` (`BACKEND_ENDPOINTS.SUI_HOLDINGS`, `SUI_TRANSACTIONS`, `SUI_METADATA`). The browser never loads the Sui SDK; the frontend calls the app’s own API or the backend service URL. This keeps the client bundle smaller and avoids CORS and security issues.

**Backend configuration:** `src/lib/config/backend.ts` defines `BACKEND_CONFIG` (e.g. `USE_BACKEND_SERVICE`, `USE_BACKEND_AUTH`, `RENDER_SERVICE_URL`), `BACKEND_ENDPOINTS`, and timeouts. When the backend service is enabled, the app uses it for SUI holdings, transactions, and metadata; otherwise internal API routes handle requests. The **evarra-backend-service** folder (in `.gitignore`) contains the backend repo the app connects to.

**Client-side blockchain code:** Under `src/lib/blockchain/` the code is organized by chain. The **Sui** subfolder (`src/lib/blockchain/sui/`) contains:

- **api:** `fetchHoldings.ts`, `fetchTransactions.ts` — functions that call the Next.js API (e.g. `/api/holdings/sui`, `/api/transactions/sui`), not the RPC directly.
- **processing:** e.g. `type.ts` — `determineTransactionType(events, balanceChanges, objectChanges, status)` and balance/participant analysis so that raw API responses are interpreted into a canonical transaction type and direction (in/out).
- **types:** `transaction.ts` defines the `TransactionType` union (transfer, swap, stake, unstake, claim, liquidity_deposit/withdraw, swap_exact_in/out, nft_mint/transfer/burn, lending_deposit/withdraw/borrow/repay, contract_deploy/call, reward_distribution, other) and event patterns; other type files for tokens, objects, holdings.
- **utils:** `metadataManager.ts` — token metadata fetching, caching (e.g. in localStorage), `getTokenMetadataWithCache`, `getTokenDecimals`, `extractTokenInfoFromCoinType`, refresh and clear; formatting and validation helpers.
- **Enrichment:** `enrichTransactions.ts` — `enrichSuiTransactions` (adds metadata and resolved transaction type to each transaction), `addSuiTransactionMetadata`.
- **UI helpers:** `holdingsHelpers.tsx`, `transactionsHelpers.tsx` — Sui-specific row rendering (e.g. `renderSuiHolding`, transaction row with type, amount, direction, symbol) passed as render props to generic list components.

Token metadata is cached and managed on the client with fallbacks and retry logic so that the UI can show symbols, names, and decimals even when metadata endpoints are slow or temporarily failing.

**Multi-chain readiness:** The data model and UI are designed so that holdings and transactions are represented in a generic shape in the store and in generic list components (e.g. `HoldingsList`, `TransactionList`). Chain-specific rendering is done via render props (e.g. `renderHolding`, `renderTransaction`). Adding another chain later mainly requires new API integration (new route + fetch functions), processing and types for that chain, and a new render helper; the list components and store shape can stay the same.

### 1.8 Testing

**Jest** is the test runner. The project uses **React Testing Library** and **@testing-library/user-event** for component and interaction tests. Tests are colocated with the code they test: e.g. under `src/components/features/goals/tests/` (e.g. `GoalForm.test.tsx`, `goal-card.test.tsx`) or next to components with a `.test.tsx` suffix; navigation tests (e.g. `main-nav.test.tsx`) may live next to the component. The Jest environment is `jsdom` so that DOM and React components can be rendered. Scripts: `npm test` (run once), `npm run test:watch` (watch mode), `npm run test:coverage` (coverage report).

**Babel** is used for Jest to transpile TypeScript and JSX (`@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`). The codebase maintains tests for critical paths: goal forms (creation, validation), goal cards (display, actions), navigation, and shared utilities where behavior must stay stable. Testing utilities may live under `src/lib/test/` if present. The intent is that new features can be developed with clear boundaries and regressions can be caught by tests and type checks.

### 1.9 Developer Experience and Tooling

**ESLint** is configured with `eslint-config-next` so that Next.js and React best practices are enforced. Linting runs via `npm run lint` and can be integrated in CI and locally.

**Husky** is used for Git hooks. The `package.json` config shows a pre-commit hook that runs a precommit script (e.g. lint or type-check) so that certain checks run before each commit.

**Type checking:** `tsc --noEmit` is run via `npm run type-check` to ensure the whole project type-checks without emitting files. The codebase is maintained so that this command passes with no errors and TypeScript stays strict.

**Build and dev scripts:** From `package.json`: `dev` (next dev), `build` (next build), `start` (next start), `lint` (next lint), `test`, `test:watch`, `test:coverage`, `type-check`. No custom eject or custom webpack config is required for the current setup. Optional: `@next/bundle-analyzer` can be used to inspect bundle size if configured in the Next config.

### 1.10 Database (MongoDB)

**MongoDB is implemented in the repo.** The connection lives in **`src/lib/db/mongodb.ts`** (MongoClient, connection pooling, `MONGODB_URI` from `.env.local`). Server-side services use it to persist and read data: **`src/lib/services/mongoGoalsService.ts`**, **mongoUserService.ts**, **mongoWalletsService.ts**, **mongoCacheService.ts**, **mongoDataService.ts**, **mongoUserSettingsService.ts**, and **`src/lib/domains/wallets/services/mongoWalletDataService.ts`**. API routes under `src/app/api/` (goals, wallets, user/settings, auth/login, auth/register, auth/forgot-password, auth/reset-password-with-token, etc.) call these services so that goals, users, wallet data, and cache are stored in MongoDB. The frontend still uses Zustand + localStorage for session state; the canonical or shared data lives in MongoDB. The **evarra-backend-service** folder (separate repo) provides the SUI blockchain API, not the database; the app’s Next.js API and MongoDB services are in the main repo. When describing the project, you can accurately say that it includes **database work with MongoDB** (connection, services, and API routes) for server-side persistence.

### 1.11 Evarra Backend Service (Separate Repo)

The **evarra-backend-service** is a standalone Node.js API (separate GitHub repo, cloned under the main project and listed in `.gitignore`). It is documented here so the portfolio accounts for backend work in the same way as the frontend: technologies, architecture, endpoints, and connections.

**Framework and runtime:** **Express 5.x** is the web framework. The app runs with **Node.js**; entry point is `src/index.js`. There is no build step (plain JavaScript). Scripts: `npm run dev` and `npm start` both run `node src/index.js`. In production (e.g. Render) the server listens on HTTP, port from `process.env.PORT`, binding `0.0.0.0`. In development it can use HTTPS if `server.key` and `server.cert` exist; otherwise it falls back to HTTP.

**Libraries and dependencies:** **@mysten/sui** (v1.35.x) for Sui RPC (SuiClient, getFullnodeUrl, getAllBalances, queryTransactionBlocks, getCoinMetadata). **mongodb** (v6.17.x) for persistence used by auth, goals, wallets, and cache services. **bcrypt** for password hashing in user registration and login. **cors** for configurable allowed origins (`CORS_ORIGIN` env, comma-separated). **dotenv** for environment variables. **express** for routing, JSON body parsing, and middleware.

**Architecture:** Single Express app in `index.js` that mounts route modules and defines SUI endpoints inline. **Route modules:** `src/routes/auth.js`, `src/routes/goals.js`, `src/routes/wallets.js`, `src/routes/cache.js`; optional `src/routes/sui.js` (TypeScript-compiled to .js) for SUI. **Services:** `src/services/userService.js` (MongoDBUserService), `src/services/walletService.js` (MongoDBWalletService), `src/services/goalService.js`, `src/services/cacheService.js` — each encapsulates MongoDB access for that domain. **Utils:** `src/utils/logger.js`, `src/utils/validation.js` (e.g. chain-specific address validation), `src/utils/errorHandler.js`. **Types:** `src/types/wallet.js` (and wallet.ts if present). Middleware: CORS (origin callback from env), `express.json()`. The backend has its own MongoDB connection (in the backend repo’s env) for users, goals, wallets, and cache when those routes are used; the main app (evarra-tracker) also has in-repo MongoDB and can run with or without the backend service.

**API endpoints (all prefixed with `/api/`):** **Health:** GET `/api/health` — service status, version, timestamp. **Auth:** POST `/api/auth/register`, `/api/auth/login`; GET `/api/auth/user/:userId`; PUT `/api/auth/user/:userId`; GET `/api/auth/health`. **Goals:** Full CRUD and progress (POST/GET/PUT/DELETE goals, GET/PUT progress, GET user goals, GET health). **Wallets:** CRUD, GET user wallets, get by address/chain, GET health. **Cache:** Wallet-data and metadata cache (GET/POST/PUT/DELETE as documented in the root `/` response). **Sui:** GET and POST `/api/sui/holdings` (address, optional forceRefresh); GET and POST `/api/sui/transactions` (address, limit, cursor); POST `/api/sui/metadata` (body: `coinTypes` array). Response shape: `{ success, data, metadata }` with service name and timestamp.

**Sui implementation details:** SuiClient is created with `getFullnodeUrl('mainnet')`. Holdings: `getAllBalances({ owner: address })`, then mapped to a common holdings shape (coinType, balance, etc.). Transactions: two parallel `queryTransactionBlocks` calls (filter By FromAddress and ToAddress), results merged and deduplicated by digest, sorted by timestamp (newest first), then limited and paginated (nextCursor, hasNextPage). Metadata: for each coinType, `getCoinMetadata({ coinType })` with a small KNOWN_TOKENS map for SUI and fallbacks; response includes metadata and per-type errors. SUI address validation (e.g. `0x` + 64 hex chars) is applied before RPC calls.

**Connections:** (1) **Sui network:** Read-only RPC to Sui mainnet via the official SDK; no signing or submission. (2) **MongoDB:** Used by user, wallet, goal, and cache services; connection and URI are configured in the backend repo (e.g. env). (3) **Main app (evarra-tracker):** The Next.js app’s `lib/config/backend.ts` defines `BACKEND_ENDPOINTS` (SUI_HOLDINGS, SUI_TRANSACTIONS, SUI_METADATA, HEALTH) using `RENDER_SERVICE_URL` (or env override). When `USE_BACKEND_SERVICE` is true, Next.js API routes (e.g. `holdings/sui/route.ts`, `transactions/sui/route.ts`) proxy requests to these URLs. CORS on the backend allows the main app’s origin (e.g. localhost:3000 or production domain). So the backend is an optional upstream for blockchain and, if `USE_BACKEND_AUTH` is used, for auth; the main app can also run without it using in-repo MongoDB and in-repo Sui logic in Next.js API routes.

**Summary for portfolio:** You can describe the backend as a **Node/Express API** with **Sui integration** (@mysten/sui), **MongoDB** (users, goals, wallets, cache), **REST endpoints** for auth, goals, wallets, cache, and SUI holdings/transactions/metadata, and **clear separation** from the frontend: the frontend never talks to Sui directly; it talks to the Next.js API, which may proxy to this service. Listing components, libraries, architecture, connections, and endpoints here brings the backend in line with how the frontend is documented.

### 1.12 Security

**Authentication and session:** Login and registration are implemented in the main app (Next.js API routes) and optionally in evarra-backend-service. Passwords are hashed with **bcrypt** (backend). Session or auth state is maintained via cookies or client-side auth store (e.g. `auth/set-cookie`, `auth/clear-cookie`); **JWT** is used where implemented (e.g. `lib/domains/auth/validators/jwtValidators.ts`, `JWT_SECRET` from env). User-scoped data (goals, wallets) is filtered by `userId` so that one user cannot see another’s data. Password reset flows use tokens (e.g. `auth/reset-password-with-token`, `auth/validate-reset-token`) so that reset links are time-bound and single-use.

**Secrets and environment:** Sensitive values (MongoDB URI, JWT secret, Resend API key, optional ETHERSCAN_API_KEY) are read from **environment variables** (e.g. `.env.local`); they are not committed or exposed to the client. The Sui SDK and RPC calls run only on the server (Next.js API or backend service), so no chain API keys or heavy SDK are in the browser bundle. **CORS** is configured on the backend (evarra-backend-service) via `CORS_ORIGIN` so that only allowed origins can call the API; the main app typically talks to its own Next.js API (same origin) or to the backend when explicitly configured.

**Validation:** Form input is validated with **Zod** on the client and can be re-validated on the server. Backend routes validate address format (e.g. SUI address validation), required body/query params, and limit ranges (e.g. transaction limit 1–100) to avoid malformed or abusive requests. This reduces injection and bad-data issues.

**Summary for portfolio:** You can say that the app uses **bcrypt** for passwords, **env-based secrets**, **server-side-only** blockchain access, **CORS** and **validation** (Zod, backend checks), and **user-scoped data** so that security is considered from the start.

### 1.13 Deployment, Environment, and Local Setup

**Running the main app:** Development: `npm run dev` (Next.js dev server). Production build: `npm run build` then `npm run start`. The app can be deployed to **Vercel**, **Node.js** hosts, or any platform that supports Next.js. The backend (evarra-backend-service) is a separate Node/Express app deployable to **Render** (or any Node host); the main app connects to it when `USE_BACKEND_SERVICE` is true and `RENDER_SERVICE_URL` is set.

**Environment variables (main app):** Key variables include: **MONGODB_URI** (required for server-side persistence), **MONGODB_DATABASE** (optional, default `evarra`), **USE_BACKEND_SERVICE** (optional, `true` to use evarra-backend-service for SUI), **RENDER_SERVICE_URL** (optional, backend base URL, e.g. `https://evarra-backend-service.onrender.com`), **USE_BACKEND_AUTH** (optional), **JWT_SECRET** (for JWT auth when used), **RESEND_API_KEY** and **FROM_EMAIL** (for password-reset email via Resend), **ETHERSCAN_API_KEY** (optional, for Ethereum), **USE_MONGODB_CACHE** / **USE_DATABASE** (optional feature flags). See `lib/config/backend.ts` and `lib/db/mongodb.ts` for where these are read. A `.env.local` or `.env.example` (if present) lists the variables needed for local runs.

**Environment variables (backend):** In evarra-backend-service: **PORT** (default 3000), **CORS_ORIGIN** (comma-separated allowed origins, e.g. `http://localhost:3000`), **MongoDB connection** (URI and DB name as used by the backend’s services). Backend may use its own `.env` in that repo.

**Local setup in short:** Clone the repo, install dependencies (`npm install`), create `.env.local` with at least `MONGODB_URI` (and optionally backend-related vars if using the external service), run `npm run dev`. To use the backend service locally, run it from `evarra-backend-service/` with its own env and point `RENDER_SERVICE_URL` to `http://localhost:<backend-port>` if desired. This gives recruiters and reviewers a clear picture of how to run and deploy the project.

---

## 2. Architecture and Code Organization

### 2.1 Domain-Driven Structure

The application is organized by **domain** rather than by technical layer alone. Under `src/lib/domains/` the main domains are **goals**, **wallets**, and **features** (and possibly **cryptoMarket** if present). Each domain can have:

- **Actions:** Pure or mostly pure logic for updates and computations. For goals, this includes CRUD, aggregation, grouping, and milestone logic; some of this lives in the store actions (e.g. `lib/store/goals/actions/`) and some in domain modules (e.g. `domains/goals/` with regular, parent, subgoal logic).
- **Hooks:** React hooks that encapsulate data fetching, derived state, or subscription to stores. For wallets: `domains/wallets/hooks/` is split into search (e.g. `useWalletSearch`, `useHoldingsSearch`, `useTransactionSearch`), transactions (e.g. `useEnrichedTransactions`), and management (e.g. `useWalletDelete`). For features: e.g. `useAdvancedFeatures` in the features domain.
- **Utils:** Pure functions for calculations, grouping, or formatting. For goals: `domains/goals/utils/aggregation/` (e.g. grouping, aggregate), `utils/data/` (e.g. getUniqueCoins, duplicate), `utils/milestones/` (milestone generation). For features: settings subdomains (privacy, notifications) with their own settings modules.

Barrel files (`index.ts`) re-export public APIs at each level (e.g. `domains/goals/index.ts`, `domains/goals/utils/index.ts`, `domains/wallets/hooks/index.ts`). The rest of the app imports from the domain entry point (e.g. `@/lib/domains/goals` or `@/lib/domains/wallets/hooks`) rather than from deep paths like `domains/goals/utils/aggregation/grouping`. This keeps refactors local to the domain and makes dependencies explicit.

### 2.2 Blockchain Layer

Under `src/lib/blockchain/` the code is split by chain. The **Sui** subfolder (`src/lib/blockchain/sui/`) contains:

- **api:** `fetchHoldings.ts`, `fetchTransactions.ts` — functions that call the Next.js API (e.g. `/api/holdings/sui?address=...`, `/api/transactions/sui?address=...`), which may proxy to evarra-backend-service or handle requests internally. No RPC calls are made from the browser.
- **processing:** e.g. `processing/type.ts` — `determineTransactionType` and balance/participant analysis; other modules for balance changes, historical data. This keeps the UI free of Sui-specific parsing; the UI consumes a generic transaction shape with type, balanceChanges, and metadata.
- **types:** `types/transaction.ts` (TransactionType, EVENT_PATTERNS), `types/token.ts`, `types/object.ts`, `types/holdings.ts`, etc. Where the app uses generic types (e.g. `GenericTransaction`, `GenericHolding` in `types/transactions.ts` or a base module), Sui-specific types extend or map to those.
- **utils:** `utils/metadataManager.ts` (metadata cache, getTokenMetadataWithCache, getTokenDecimals, extractTokenInfoFromCoinType), validation, formatting, logging, constants (cache keys, known decimals, batch sizes).
- **hooks:** e.g. `hooks/useEnrichedTransactions.ts`, `useSuiHoldingsSearch.ts`, `useSuiTransactionSearch.ts` — React hooks that use the API and processing layer and expose data, loading, and error state to components.
- **Enrichment:** `enrichTransactions.ts` — enriches raw transactions with metadata and resolved transaction type before display.

This structure is intended to be replicated for other chains (e.g. Ethereum, Bitcoin): add a new subfolder under `blockchain/` with api, processing, types, utils, and hooks; the generic list components and store shape can remain unchanged.

### 2.3 Store Structure

Stores live under `src/lib/store/`. They are split by concern:

- **Goals:** Goals list, current goal, filters, and all goal-related actions (create, update, delete, progress, parent/subgoal, grouping). Actions are further split into files (e.g. `storeActions`, `parent`, `progress`, `formActions`, `user`) for clarity.
- **Wallets:** Wallet list, selected wallet, and wallet CRUD. Wallet data is persisted and scoped by user.
- **Auth:** Current user, login state, and methods to set/clear user. Synced with persistence so that the correct user’s data is loaded.
- **UI:** Client-only UI state (e.g. which modal is open, which panel is expanded) that does not need to be persisted.

All stores that persist use the same persistence key strategy and rehydration behavior so that login/logout and multi-user behavior are consistent.

### 2.4 Component Organization

Under `src/components/`:

- **ui/:** Reusable, theme-aware primitives: Button, Input, Checkbox, Radio, Switch, Select, Dialog, Label, Badge, Avatar, Card, Tabs, Tooltip, Popover, Dropdown Menu, etc. These are the building blocks used everywhere and are styled to work in both light and dark themes.

- **features/:** Feature-specific components, grouped by feature and then by role:
  - **goals:** `forms/` (BasicGoalForm, AdvancedGoalForm, CreateGoalForm, GoalForm, SimpleGoalGrid, AdvancedGoalGrid, CreateGoalButton, DuplicateGoalDialog), `cards/` (GoalCard, TrackerGoalCard), `panels/` (GoalDetailsPanel, GoalDetailsPanelContainer), `lists/` (GoalList, GoalTree, GoalHistory), `progress/` (GoalProgress, Milestones, YourProgress), `info/` (GoalOverview, GoalNotes, SubgoalsInfo, ParentGoalInfo), `actions/` (GoalActions, GoalStatusBadge), `states/` (EmptyGoalsState), `config/` (e.g. goalFilterConfig), `tests/` (GoalForm.test, goal-card.test).
  - **wallets:** AddWalletDialog, WalletCard, WalletForm, WalletDetailsPanel, WalletDetailsPanelContainer, EmptyWalletsState; `holdings/` (HoldingsList, SuiHoldingsPanel), `transactions/` (TransactionList, TransactionsPanel, SuiTransactionsPanel).
  - **settings:** privacy/PrivacySettings, notifications/NotificationSettings.
  - **auth:** Login, signup, and auth-related UI as needed.

- **navigation/:** Main nav, user menu (e.g. main-nav, user-nav). Used in the journey layout and in page headers.

- **shared:** Cross-feature components such as PageHeader, LoadingState, error boundaries, SearchAndFilterContainer, FilterForm, ComingSoonNotification. Used across goals, wallets, and insights pages.

Route-specific components can live next to the route in `src/app/(journey)/...` or in `components/features/` depending on reuse. The rule of thumb is: if it’s reused or complex, it lives under `components/` with a clear feature or shared home.

### 2.5 Modular Design for Maintainability

The application is built so that changes are localized and the codebase remains maintainable as it grows.

**Domain boundaries:** Each domain (goals, wallets, features, blockchain) owns its actions, hooks, and utils. Code that touches goals lives under `lib/domains/goals/` or the goals store; wallet logic lives under `lib/domains/wallets/` and the wallet store. There is no cross-domain spaghetti: domains expose a small public API via barrel exports, and the rest of the app depends on that API rather than on internal paths. Adding or changing a feature in one domain rarely requires touching another.

**Single responsibility per module:** Store actions are split into multiple files (e.g. `storeActions`, `parent`, `progress`, `formActions`, `user`) so that each file has one clear purpose. Goal utils are split into aggregation, data helpers, and milestones. Wallet hooks are split into search, transactions, and management. This keeps files short and makes it obvious where to add or fix behavior.

**Chain abstraction:** Holdings and transactions are represented in a generic shape in the store and in shared list components. Chain-specific logic is confined to the blockchain layer and to render helpers (e.g. Sui formatting). Adding a new chain does not require rewriting the list components or the store; only new API integration and a new render prop implementation are needed. The same pattern applies to filters: options for coin/chain can be injected at runtime from live data, so the UI stays generic and maintainable.

**Component composition:** Reusable UI is built from small primitives (buttons, inputs, dialogs) and composed into feature components. Generic list components accept render props for row content, so list behavior (sorting, filtering, empty state) is written once and chain-specific rendering is plugged in. This reduces duplication and keeps the list logic stable when new chains or new display requirements are added.

**Centralized cross-cutting logic:** Date creation and formatting live in one module (`lib/utils/date.ts`); milestone generation and goal-creation rules live in a single place. Changing how dates or milestones work is done in one file, and the rest of the app picks it up. Same for feature flags and tier logic: they live in the features domain so that access control is consistent and easy to update.

**Config and constants:** Filter configurations, tier names, storage keys, and feature matrices are centralized. Changing a label or a tier value is done in one config file rather than by searching the codebase. This avoids drift and makes it clear where to look when tuning behavior.

**Barrel exports and import discipline:** Domains and feature components expose a single entry point (`index.ts`). The app imports from `domains/goals` or `components/features/goals`, not from deep paths. Refactoring internals of a domain does not force widespread import updates, and the public surface of each area is explicit.

Together, these choices make the codebase modular: new developers can work in one domain without mastering the whole app, and changes stay contained with clear boundaries and minimal ripple effects.

### 2.6 App Router and Routes

Under `src/app/`:

- **Public routes:** Login, signup, welcome; **auth** group includes `(auth)/reset-password/page.tsx` and `(auth)/reset-password/[token]/page.tsx` for password reset. These use a fixed dark theme; the login page is always dark regardless of the user’s saved theme.

- **Protected routes:** Grouped under `(journey)`. Pages: goals, tracker, wallets, insights, settings. The journey layout enforces authentication and provides the main shell (navigation, theme provider). After login, the user’s theme preference is applied and persists across sessions.

- **API routes:** Under `src/app/api/`, Next.js route handlers serve auth (login, register, forgot-password, reset-password-with-token, validate-reset-token, logout, set-cookie, clear-cookie), goals (CRUD, cleanup, debug), wallets, user/settings, cache (metadata, wallet-data), wallet-data/health, holdings/transactions for Sui and other chains, health, debug, and email/analytics. Sui holdings and transactions may proxy to **evarra-backend-service** when configured (`lib/config/backend.ts`). The frontend sees a single API surface; the browser talks to the same origin.

Middleware (if enabled) runs on every request and can redirect unauthenticated users away from protected paths so that the client and server agree on “logged in” vs “not logged in.” (A middleware file may be present but disabled; behavior depends on current setup.)

### 2.7 Types and Constants

- **src/types/:** Shared types used across domains and components: e.g. `goals.ts` (Goal, Milestone, and related shapes), `users.ts` or auth types (User, tier, skillLevel), `transactions.ts` (GenericTransaction, balance change shape). Goal and user types are kept in sync with the store and API so that there is a single definition of shape and no drift between lib/goals and types/goals.

- **Constants and config:** Storage keys (e.g. evarra-goals, evarra-wallets, evarra-auth) are defined where the store is created. Feature flags, tier names (free, intermediate, full), and feature matrices live in the features domain or in config files (e.g. goalFilterConfig, walletFilterConfig). Filter configs use dynamic options (e.g. empty arrays for coin/chain) that are injected at runtime from live data, so that adding a new coin or chain does not require editing a long static list. Centralizing these values means changes are made in one place and the codebase does not drift.

### 2.8 Performance and Resilience

**Code splitting and bundle:** Next.js provides automatic code splitting by route; the Sui SDK and heavy RPC logic are not in the client bundle because they run only in API routes or the backend service. This keeps initial load and client JS size manageable.

**Caching:** Token metadata is cached on the client (e.g. `metadataManager.ts`) with retry and refresh so that repeated views do not hammer the metadata API. Server-side cache (e.g. `cache/metadata`, `cache/wallet-data`, mongoCacheService) can store metadata and wallet-data to reduce duplicate RPC or API calls. Optional `USE_MONGODB_CACHE` and backend cache routes support this.

**Pagination and limits:** Transaction lists are paginated (e.g. `limit`, `cursor`); the backend enforces a max limit (e.g. 100) so that single requests do not pull unbounded data. Holdings and transaction fetches can show loading states and progressive messages (e.g. loading thresholds in `backend.ts`) so that users see feedback during slow network or cold starts.

**Timeouts and retries:** Backend config (`lib/config/backend.ts`) defines **BACKEND_TIMEOUT**, **BACKEND_RETRY_ATTEMPTS**, and **BACKEND_RETRY_DELAY** for calls to the external backend service. Sync operations use **SYNC_CONFIG** (e.g. SYNC_TIMEOUT, batch size, rate limit delay) so that long-running or repeated syncs do not overwhelm the API or the UI.

**Error handling:** Failed API or blockchain calls surface user-facing messages (toasts, inline errors) and, where applicable, retry or fallback behavior. Error boundaries catch React component errors and can show fallback UI. Logging (console.error for real errors, console.log for info) supports debugging without exposing internals. Together, these practices improve perceived performance and resilience under slow or failing networks.

### 2.9 Logging and Observability

**Frontend:** The app uses **console.log** for informational or debug messages and **console.error** for real errors so that production debugging is possible without exposing internals to the user. The blockchain layer (e.g. fetch, enrichment, metadata) may log request/response summaries or errors. No third-party analytics or error-tracking SDK is mandated in the doc; the `email/analytics` API route exists for optional analytics or email flows. User-facing feedback is via toasts (Sonner), inline validation, and loading states rather than raw console output.

**Backend (evarra-backend-service):** A small **logger** object in `src/index.js` (and `src/utils/logger.js` where used) provides **info**, **warn**, **error**, and **debug** methods that wrap console so that all backend logs are consistent. Logs include request params (e.g. address, limit), response counts, errors with message/name/stack, and timing or metadata where added. No centralized log aggregation or APM is required for the MVP; logs are suitable for stdout (e.g. Render logs) or file-based inspection.

**Health and readiness:** The main app can expose **health** (e.g. `GET /api/health`) for liveness; the backend exposes **GET /api/health** returning status, service name, timestamp, and version. Optional **wallet-data/health** and backend **auth/health**, **goals/health**, **wallets/health** allow per-service checks. These support deployment and monitoring without adding full observability stacks.

### 2.10 API Contracts and Key Data Flows

**Auth:** Login (POST body: identifier, password) → API validates and returns user (and may set HTTP-only cookie or return token). Register (POST body: username, email, password) → user created, same-origin or backend. Password reset: forgot-password (POST email) → token sent via email; reset-password-with-token (POST token, newPassword) → password updated. Client auth store rehydrates from cookie or persisted user so that refresh keeps the session.

**Goals:** CRUD via Next.js API (POST/GET/PUT/DELETE) with body/params; goals list filtered by userId. Client store (useGoalStore) persists goals to localStorage and syncs with API; store shape matches types in `src/types/goals.ts` (Goal, Milestone, etc.).

**Wallets:** Add wallet (POST or store action with address, label, chain) → validated and stored; list and detail from store and API. Holdings: GET `/api/holdings/sui?address=...` (or POST with body) → backend or internal route returns `{ success, data: { holdings }, metadata }`. Transactions: GET `/api/transactions/sui?address=...&limit=...&cursor=...` → `{ success, data: { transactions, nextCursor, hasNextPage }, metadata }`. Frontend enriches transactions (type, direction, metadata) and displays them in the transaction list.

**Metadata:** POST `/api/sui/metadata` (or app cache route) with body `{ coinTypes: string[] }` → returns token metadata (symbol, name, decimals, icon) per coin type. Client caches results (metadataManager, localStorage or in-memory) and refetches on refresh or when missing.

**Summary:** Request/response shapes are consistent (e.g. `{ success, data, metadata }` for backend SUI); the frontend expects these shapes and maps them into store and UI types. Documenting these flows helps when condensing the doc or explaining the system to others.

---

## 3. Design

The application’s design is intentional and consistent so that it feels coherent, supports clarity and focus, and meets accessibility goals.

**Visual identity and philosophy:** The product is designed with a clear identity: grounded, uplifting, and smart, without hype or clutter. The visual language emphasizes forward motion, elevation, and clarity so that users feel oriented and encouraged rather than overwhelmed. Contrast and character are used deliberately (e.g. accent colors, clear hierarchy) rather than a flat or over-sanitized look. Public and marketing-facing surfaces (e.g. login, welcome) use a consistent dark theme so that the first impression is stable and focused.

**Design tokens and consistency:** Colors, radii, spacing, and typography are aligned with Tailwind and with the theme system. Light and dark themes share the same token structure so that switching themes does not break layout or contrast. Custom UI components (buttons, inputs, checkboxes, switches, dialogs) all use these tokens, so the app looks and feels like one system rather than a mix of styles. Destructive actions (e.g. delete, remove) use a dedicated destructive style (e.g. red border, red button) that is consistent everywhere, so users always recognize a dangerous action.

**Layout and spatial design:** Dialogs (e.g. Add Wallet, Create Goal, Goal Details, Confirm Delete) open lower on the screen (e.g. `top-48`) instead of being vertically centered, so the main navigation and page context remain visible and the dialog feels like a panel rather than a takeover. The header and tab navigation stay visually stable at the top; the dialog bottom rises and falls with content. Tab navigation (e.g. in GoalDetailsPanel — Overview, Milestones, Notes, History) uses a single prominent style across the app: clear active and inactive states, good hit targets, and visual weight that matches the advanced goal panel so that tabs are recognizable in every context. Parent goals use a compact accent-colored circle for the expand/collapse chevron with a tooltip (e.g. “Expand” / “Collapse”), so the control is discoverable without clutter.

**Component design system:** A full set of theme-aware primitives in `components/ui/` (Button, Input, Checkbox, Radio, Switch, Select, Badge, Avatar, Card, Dialog, Tabs, Tooltip, etc.) ensures that every form and control behaves and looks the same in light and dark mode. The PositiveNumberInput (or equivalent) enforces non-negative numeric input where the domain requires it. Focus and hover states are implemented on interactive elements so that keyboard and pointer users get clear feedback. Icons (Lucide, Heroicons) are used consistently in navigation, buttons, and status indicators and are paired with tooltips or aria-labels where needed so that meaning is clear. This system makes it possible to add new screens or flows without inventing new patterns; all goal forms, wallet forms, and settings use the same primitives.

**Accessibility commitment:** The design targets WCAG AA+ and is built to support screen readers and keyboard-only use. Radix UI primitives provide correct ARIA attributes and keyboard behavior; dialogs manage focus and trap focus where appropriate; form controls are labeled and associated correctly. Contrast and text sizing are considered so that content is readable. The layout and interaction patterns aim to be neurodivergent-friendly: predictable structure, clear feedback, and avoidance of unnecessary motion or clutter. Error messages and validation feedback are explicit so that users can correct issues without guessing. This level of attention to accessibility is part of the design from the start, not an afterthought.

**Emotional and cognitive ease:** The product prioritizes UI clarity and emotional ease. Progress and goals are surfaced first; distracting or secondary information is de-emphasized. Language and copy are conversational and supportive where applicable. The design avoids bloat and trading-style noise so that users can focus on their own journey and goals. This design direction is reflected in the information hierarchy, the amount of content on screen, and the way success and progress are communicated.

**Responsive design:** Layout and components are built to work across viewport sizes. **Tailwind** responsive utilities (e.g. `sm:`, `md:`, `lg:`, `xl:`) are used for breakpoint-based layout, spacing, typography, and visibility so that navigation, grids, cards, and forms adapt to small and large screens. Key pages (goals, tracker, wallets, settings) and shared components (dialogs, panels, lists) use these utilities so that the app is usable on desktop and tablet; touch targets and spacing are considered for smaller screens. There is no separate mobile app (React Native); the codebase is web-only with a responsive layout rather than device-specific builds.

---

## 4. Usability: Supporting Beginners and Expert Users

The application is explicitly designed to serve both beginners and expert users without forcing one experience on everyone. Options and complexity are layered so that new users can succeed quickly while power users can access deeper workflows.

**Two goal-creation flows:** Users can create goals via a **simple** flow or an **advanced** flow. The **BasicGoalForm** (or simple goal creation form) supports quick goal setup with minimal fields (e.g. name, target, coin) and is available in both a modal and an embedded context (e.g. SimpleGoalGrid). The **AdvancedGoalForm** (with AdvancedGoalGrid) supports subgoals, grouping, wallet association, and fuller configuration. CreateGoalForm and CreateGoalButton may gate or route to one or the other. Which flow is shown or preferred can be influenced by user tier and by a settings toggle (e.g. in settings: use simple vs advanced goal creation), so that beginners default to the simple path and experts can choose the advanced path. Both flows use the same underlying creation logic (centralized in the goals store and domain: milestones, validation, persistence, userId, timestamps, wallet/parent fields), so behavior is consistent regardless of which form is used.

**Configurable goal-details experience:** The goal details view (GoalDetailsPanel: Overview, Milestones, Notes, History — implemented as GoalOverview, Milestones, GoalNotes, GoalHistory) can be shown in two modes. The default “beginner” mode uses a static sidebar with tabs: everything is in one place and the layout is stable. The “advanced” mode uses a slide-in panel with tabs and navigation arrows so that users can move through multiple goals or sections without losing context. Users choose the mode in settings (e.g. “Use advanced goal panel” or “Advanced goal details panel”), and the choice is persisted per user (e.g. in the auth or settings store). The UI prevents the advanced panel from opening when the user is only interacting with the manual current amount input or the value arrows, so that the panel does not open unintentionally. This way, beginners are not confronted with a complex panel, and experts can opt into the more flexible layout.

**User tier and feature access:** Users have a tier (e.g. free, intermediate, full) and an optional skill level. The feature-access model uses these to show or gate features. Base features (goal tracking, notes, theme, basic progress) are available to everyone. Advanced or optional features (e.g. ecosystem explorer, transaction filters, milestone insights, custom alerts) can be unlocked per feature (piecemeal) or by upgrading tier. The design principle is flexibility over friction: users are not forced into a single path, and unlocked features and data are preserved if they change plan. The UI uses “optional” or “expandable” metaphors rather than “locked” or punitive language so that upgrades feel like choice, not pressure.

**Inline guidance and progressive disclosure:** Where it helps beginners, the app provides inline guidance, tooltips, and clear labels so that users can complete tasks without leaving the screen or reading long docs. Complex or secondary options can be hidden behind “advanced” or “more options” so that the default view stays simple. Real-time feedback (e.g. progress bars and values updating as the user types) helps users understand the effect of their input immediately. Error messages and validation are explicit so that users know what to fix.

**Settings as the control panel:** Theme, advanced panel toggle, and other preferences live in a dedicated settings area. Users can tune their experience in one place. Settings are persisted per user and rehydrated on login, so that each user’s choices (beginner vs advanced layout, light vs dark) are respected across sessions. This makes it possible to support both “I want the simple default” and “I want the full experience” without fragmenting the product into separate apps.

**Consistent patterns across flows:** Whether a user is on the simple or advanced path, core patterns are the same: same tab styling, same dialog behavior, same destructive-action styling, same way to add a wallet or edit a goal. This consistency reduces the learning curve when a user graduates from beginner to expert and makes the codebase easier to maintain because there is one set of patterns rather than two parallel UIs.

Together, these choices make the app usable for both beginners and experts: beginners get a clear, guided path and optional depth; experts get toggles and advanced flows without sacrificing simplicity for those who do not need them.

---

## 5. Milestones and Major Accomplishments

The following sections describe what was built and improved, in an order that reflects progression from foundation to current state. Each item is expanded so that the scope of work is clear.

### 5.1 Project Foundation and Configuration

The project was initialized with Next.js 14 (later upgraded to 15), TypeScript, and Tailwind. ESLint (eslint-config-next), Jest, React Testing Library, @testing-library/user-event, and Husky were configured. The repository structure was established with `src/app`, `src/components`, `src/lib`, `src/types`, and `src/styles`. Babel presets for Jest (env, react, typescript) and Jest config (e.g. jsdom environment) were set up. Documentation was started: README (mission, features, architecture, development guidelines), docs/VISION.md, docs/PROJECT_OVERVIEW.md, CHANGELOG (Keep a Changelog format), and technical docs (routing, refactor plans, audit reports). The app was made runnable via `npm run dev` and buildable for production via `npm run build`. This foundation is what every subsequent feature and refactor builds on.

### 5.2 Authentication and User Model

A full client-side authentication flow was implemented: sign up, login, logout, and “continue as current user.” User data is stored in the auth store and persisted (e.g. in localStorage) so that returning users stay logged in. The user model was extended with timestamps (`createdAt`, `updatedAt`), a `skillLevel` property, and a tier system (e.g. free, intermediate, full) used for feature access. User identification is robust: the app can match by user ID or by username/email so that sessions and persisted data are attributed to the correct user. Login and logout trigger synchronization of all persisted stores so that goals, wallets, and settings are scoped to the active user and no manual reset logic is needed.

### 5.3 Goals: Data Model, Persistence, and CRUD

Goals are the central domain entity. The goals store (`useGoalStore` in `src/lib/store/goals/index.ts`) holds the full list and supports create, read, update, and delete via actions composed from `storeActions`, `parent`, `progress`, and `user`. Goals are persisted to localStorage under the key `evarra-goals`; only the goals array is partialized (user state is not duplicated in this store for persistence). The list is filtered by the current user’s ID in the UI and in logic so that each user only sees their own goals. Persistence and rehydration are handled by Zustand’s persist middleware and by the auth sync logic (e.g. setUser, useSyncStoresWithAuth) so that goals are not lost on refresh or on user switch and so that switching users shows the correct user’s goals. Loading states were added to avoid race conditions when the store rehydrates and the UI reads goals. The goal type and the store’s shape were aligned with a single source of truth in `src/types/goals.ts` and the store types so that TypeScript and runtime behavior are consistent across the app; any mismatch between lib/goals and types/goals was resolved so that property names and shapes match everywhere.

### 5.4 Goals: Hierarchy, Subgoals, and Grouping

Support was added for parent goals and subgoals. A goal can have children (subgoals), and the UI can show a tree or grouped view. Parent goals can aggregate progress from subgoals. When the user groups multiple goals (e.g. by coin), the app can create a parent and attach subgoals, with wallet and other fields propagated correctly to subgoals. Deletion rules were implemented: deleting a parent removes all its subgoals; deleting subgoals until only one remains converts that subgoal back into a standalone goal. Grouping and duplicate-detection logic were refactored to work for both top-level and nested goals so that behavior is consistent and predictable.

### 5.5 Goals: Creation, Forms, and Centralized Logic

Goal creation was streamlined with a simple goal-creation form (BasicGoalForm, available as modal and embedded via SimpleGoalGrid) and toggles between basic and advanced flows based on user settings and tier. The advanced flow (AdvancedGoalForm, AdvancedGoalGrid) supports subgoals, grouping, and wallet association. The goal submit button was refactored for accessibility, loading states, and reuse across both forms. All logic for creating goals, milestones, and subgoals was centralized in the goals store and domain: one place defines how milestones are generated (e.g. in `lib/domains/goals/utils/milestones/` or the store), how progress is computed, and how fields such as `userId`, `status`, timestamps, and wallet/parent relationships are set. This ensures that whether the user creates a goal from the simple or advanced form, or creates a subgoal, the same rules apply and there is no divergent behavior. Modal and dialog behavior, toasts (Sonner), error handling, and focus management were improved so that the creation flow is clear and robust and the user gets immediate feedback on success or validation errors.

### 5.6 Goals: Progress, Milestones, and Display

Progress is computed from current and target values and displayed with progress bars and percentages in GoalProgress, TrackerGoalCard, and goal details. Milestones (e.g. 25%, 50%, 100%) are generated from the goal’s target (via centralized milestone logic in the goals domain) and can be displayed in the goal details panel (Milestones component) and on the progress page (YourProgress). For parent goals, milestones are derived from aggregate progress and use the correct creation date so that parent and subgoal progress stay consistent. All date creation and display were centralized in `src/lib/utils/date.ts`: `getNowISO()` for timestamps when creating milestones, goals, or notes, and `formatDate(date)` for all date displays (milestones, goal details, notes, history). This keeps formatting and timezone behavior consistent and avoids drift. The goal details panel (GoalDetailsPanel) was improved with tabs (Overview, Milestones, Notes, History — GoalOverview, Milestones, GoalNotes, GoalHistory) and optional slide-in panel mode with navigation arrows. The UI prevents the advanced panel from opening when the user is only adjusting the manual current amount or the value arrows, so that interaction is intentional and not surprising.

### 5.7 Wallets: Model, Storage, and UI

Wallet management is fully implemented: users can add and remove wallets. Wallet list and metadata are stored in the global store and persisted per user. The Add Wallet dialog includes validation and clear error messages; the wallets page shows the list, supports search and filter, and handles empty and error states. Wallet data is scoped to the current user so that switching users shows only that user’s wallets. Fallbacks (e.g. for BTC balances via Blockchain.info without an API key) were added where applicable so that the app keeps working when a primary API is unavailable.

### 5.8 Wallets: Holdings and Transactions (Sui)

For Sui, the app fetches holdings and transactions via evarra-backend-service or internal Next.js API routes. Holdings include all coins and NFTs for an address, with pagination and metadata. Transactions are fetched, normalized, and enriched (e.g. with balance change direction and participant info). The frontend uses generic list components and chain-specific render helpers (e.g. Sui holdings and transaction rows) so that the same list component can support other chains later. Token metadata (symbol, name, decimals, icon) is fetched and cached on the client with retry and refresh logic. Decimals for display are taken from metadata so that SUI and other tokens format correctly. Transaction list shows in/out direction and color (e.g. green for in, red for out) based on backend-provided direction. The architecture is documented so that adding another chain follows the same pattern: backend endpoint, client API call, processing, and render helper.

**Reading transactions and translating them into human-readable form:** Raw chain data (events, balance changes, object changes) is processed by a dedicated pipeline. A transaction-type layer (`determineTransactionType`) classifies each transaction into a human-meaningful type (e.g. transfer, swap, stake, unstake, claim, liquidity deposit/withdraw, NFT mint/transfer/burn, lending deposit/withdraw/borrow/repay, contract deploy/call, or other). Balance changes are analyzed for direction (incoming vs outgoing) and attached to the transaction so the UI can show “in” or “out” with the correct sign and color. Enrichment adds token metadata (symbol, name, decimals) so amounts are displayed in readable form (e.g. “1.5 SUI” instead of a raw coin type and integer amount). The transaction list and detail views render this enriched data so users see what happened in plain language and numbers, not raw hashes or RPC payloads.

**Organizing and reporting on transactions:** Users organize activity by **wallet** (each wallet has its own holdings and transaction history), by **goals** (goals can be grouped and linked to coins or wallets), and by **filters** (coin, chain, search). Transaction history is available per wallet with optional filtering. **Reporting** is supported through goal progress and milestones (how much progress toward a target), transaction history as a chronological report of activity, and an **Insights** page (dashboard placeholder for analytics, progress trends, and recommendations). So the app both organizes transactions and provides reporting surfaces for progress and activity.

### 5.9 Theme and User Preferences

Light and dark themes are supported and persisted per user. The login page always uses a dark theme for a consistent first impression; after login, the user’s saved theme is applied and persists across sessions. Theme changes in settings update both the UI and the stored preference. System theme option was removed to keep behavior simple and consistent. Theme is applied without flash and is synced with the theme provider and the store. All custom UI components (inputs, checkboxes, radios, switches, buttons, etc.) were made theme-aware so that they look correct in both themes and respect contrast and focus states.

### 5.10 Settings and Feature Access

A settings area was implemented with options such as theme toggle and advanced goal panel toggle. Account menu and dropdowns were improved with click-outside behavior and keyboard navigation. Feature access is driven by user tier (free, intermediate, full) and by feature flags so that certain features can be gated or unlocked per user. The feature matrix and hooks (e.g. `useAdvancedFeatures`) are organized under the features domain. Privacy and notification settings were added as separate sub-areas with their own components and domain logic.

### 5.11 UI Consistency, Accessibility, and Dialogs

All form inputs were standardized to use the theme-aware components. Checkbox, Radio, and Switch components were added or updated for theme support and accessibility. The avatar component was fixed to show initials in all themes. A reusable click-outside hook was implemented and used for dropdowns so that menus close when the user clicks outside. Destructive actions (e.g. delete goal, remove wallet) use a consistent destructive dialog style (e.g. red border, red button) across the app. Dialogs were repositioned to open lower on the screen (e.g. `top-48`) so that the header and tabs stay visible and the dialog content is easier to scan. Tab navigation was unified to a single prominent style with clear active/inactive states and keyboard/screen reader support. Tooltips were added for interactive icons and controls (e.g. expand/collapse chevron). Focus and hover states were improved across interactive elements. ARIA and dialog accessibility (e.g. `aria-describedby`) were fixed so that screen readers and keyboard users can use the app reliably. The goal details chevron was placed in a compact accent-colored circle with a tooltip for discoverability.

### 5.12 Dialog and Form State Management

Dialog and form state were refactored to use explicit, React-compliant patterns. Each major dialog (Goals creation/edit, Progress update, Add Wallet, Confirm Delete, etc.) has a dedicated form manager or state hook (e.g. `useFormManager` or equivalent per-dialog state) so that open/close and submit state are predictable and do not rely on fragile global or implicit state. Dialogs and forms use explicit open/close state and reset on close so that reopening a dialog does not show stale data. This fixed issues where dialogs would not open or close correctly, where form state could get out of sync, and where the Add Wallet dialog or login flow would freeze or get stuck. The login page and Add Wallet dialog now open and close reliably and no longer block the UI.

### 5.13 Backend and API Architecture

All blockchain and heavy API work was moved off the client. Sui RPC and metadata are handled by evarra-backend-service (or internal Next.js API routes when the backend service is not used). Next.js API routes under `src/app/api/` either proxy client requests to the backend service or handle them internally so that the browser only talks to the same origin. CORS and security are handled in one place. Logging and error handling were standardized: real errors use `console.error`, and informational logs use `console.log`. Error responses from the backend are handled in the frontend with user-friendly messages and retry where appropriate. The only backend entry point from the frontend is the Next.js API (or the configured backend service URL).

### 5.14 Codebase Restructure and Maintainability

A large refactor established the current domain-driven and multi-chain-ready structure. Goals components were reorganized under `components/features/goals/` into subdirectories by role: forms (BasicGoalForm, AdvancedGoalForm, CreateGoalForm, GoalForm, SimpleGoalGrid, AdvancedGoalGrid, CreateGoalButton, DuplicateGoalDialog), cards (GoalCard, TrackerGoalCard), panels (GoalDetailsPanel, GoalDetailsPanelContainer), lists (GoalList, GoalTree, GoalHistory), progress (GoalProgress, Milestones, YourProgress), info (GoalOverview, GoalNotes, SubgoalsInfo, ParentGoalInfo), actions (GoalActions, GoalStatusBadge), states (EmptyGoalsState), config (goalFilterConfig), tests (GoalForm.test, goal-card.test). Wallet hooks under `lib/domains/wallets/hooks/` were split by purpose: search (useWalletSearch, useHoldingsSearch, useTransactionSearch), transactions (useEnrichedTransactions), management (useWalletDelete). Goal utils under `lib/domains/goals/utils/` were split by concern: aggregation (grouping, aggregate), data (getUniqueCoins, duplicate), milestones. Settings and features domains were organized with barrel exports and clear boundaries (e.g. features/settings/privacy, features/settings/notifications). Legacy fetch files (e.g. monolithic fetchSUI, fetchBTC) and duplicate type definitions (e.g. SuiToken export conflicts) were removed. Imports were updated to use barrel exports and consistent paths (e.g. `@/lib/domains/goals`). TypeScript and the build were fixed so that the project compiles with no errors and all exports resolve. The audit (e.g. CODEBASE_AUDIT_REPORT_v2.md) and refactor plan (REFACTOR_PLAN.md) documents were updated to reflect the current architecture and to guide future changes.

### 5.15 Testing and Quality

Tests were added and maintained for critical flows: goal forms, goal cards, navigation, and shared utilities. Jest and React Testing Library are used with a consistent pattern (e.g. colocated test files, user-event for interactions). Type checking is part of the workflow. Linting runs on the codebase. The project is in a state where new features can be developed with clear boundaries and where regressions can be caught by tests and type checks.

### 5.16 Known Limitations and Future Work

**Current scope:** The app focuses on **read-only** wallet data: users add addresses and view holdings and transactions. There is **no in-browser wallet connection** (e.g. Sui wallet extension, WalletConnect) and **no signing** of transactions; the architecture is designed so that these can be added later (e.g. new hooks, signing flows, and UI). The **Insights** surface is a placeholder for analytics and recommendations; goal progress and transaction history provide reporting today.

**Optional backend:** The main app can run **with or without** evarra-backend-service. When the backend is not used, Next.js API routes and in-repo Sui logic (if implemented there) serve holdings and transactions. When it is used, the app proxies to the backend for SUI (and optionally auth). So the “backend” is an optional deployment choice, not a hard dependency for development or a minimal production deploy.

**Platform and scale:** The app is **web-only** (no React Native or mobile app). It is built as an MVP: sufficient for demonstrating full-stack and wallet-related work, with room to add more chains, complete Insights, add signing, or target mobile in the future.

**What to add next (for interviews and roadmap):** You can cite as natural next steps: **signing flows** and **wallet connection** (browser extension or WalletConnect), **additional chains** (same pattern: route, fetch, processing, render helper), **completing the Insights** dashboard (analytics, trends, recommendations), **React Native** or a mobile build if the role cares, and **GraphQL** or more structured API contracts if the team uses them. Stating limitations and future work clearly shows prioritization and product thinking, not just implementation.

---

## 6. Patterns and Practices in Use

- **Single source of truth:** Types (e.g. `src/types/goals.ts`, `src/types/transactions.ts`), constants (storage keys, tier names), and key logic (e.g. `src/lib/utils/date.ts` for all date creation and display, centralized goal-creation and milestone logic in the goals domain/store) are centralized so that changes propagate correctly and there is no drift between “lib” and “types” or between different screens.

- **Persistence and user scope:** All persisted data is keyed or filtered by user. Goals are stored under one key (`evarra-goals`) and filtered by `userId`; wallet and auth stores use keys like `evarra-wallets` and `evarra-auth` and partialize only the necessary slice. On login/logout, store sync (e.g. useSyncStoresWithAuth) ensures the correct user’s data is shown and no manual reset calls are needed. This keeps multi-user support consistent and prevents data leakage between users.

- **Separation of concerns:** UI components (in `components/`) render and handle events; domain logic (CRUD, aggregation, grouping, milestone rules) lives in `lib/domains/` and in store actions; blockchain details (fetch, enrich, type detection) live in `lib/blockchain/`; the store handles state and persistence. The UI does not contain Sui-specific parsing; it consumes generic transaction and holding shapes.

- **Render props for chain-specific UI:** Generic list components (HoldingsList, TransactionList) accept a render prop (e.g. `renderHolding`, `renderTransaction`) so that list behavior (sorting, filtering, empty state) is implemented once and chain-specific row rendering (e.g. Sui holdings/transactions) is plugged in. This keeps the list components stable when adding new chains.

- **Accessibility:** Radix primitives provide ARIA and keyboard behavior; dialogs manage focus and trap focus where appropriate; form controls are labeled and associated; tooltips and aria-labels are used for icons and controls (e.g. expand/collapse chevron); destructive dialogs have clear focus management. The app is built to be usable with keyboard and screen readers and to avoid unnecessary motion or clutter.

- **Error handling:** API and async operations surface errors to the user via toasts (Sonner) or inline validation messages. Error boundaries catch component errors and can show fallback UI. Logging (e.g. in the blockchain layer) supports debugging; real errors use console.error and informational logs use console.log so that production debugging is manageable without exposing internals to the user.

- **Progressive enhancement:** The app assumes JavaScript is enabled. Theme and critical data (goals, wallets, auth) are rehydrated from persistence after load so that the first paint and post-load experience are consistent and the user sees their data without a full refetch on every visit.

---

## 7. What You Can Say About This Work

When promoting yourself or discussing this project, you can accurately say that you (with AI assistance) have:

- Delivered an **MVP** built with **React**, **Next.js**, **TypeScript**, and a full set of supporting libraries (Tailwind, Radix, Zustand, React Hook Form, Zod, and others).
- Built and maintained a **Next.js 15** application with **TypeScript**, **Tailwind**, **Zustand**, and **React Hook Form + Zod**.
- Implemented **wallet integration** that lets users add and track wallet addresses and **read transactions and holdings** (read-only via backend blockchain queries); architecture supports extending to wallet connection and signing where needed.
- **Read on-chain transactions** and **translated them into human-readable form**: transaction-type classification (transfer, swap, stake, NFT, liquidity, lending, etc.), balance in/out, token metadata (symbol, decimals), and formatted amounts in the UI.
- Enabled users to **organize and report** on activity via goals (with grouping and subgoals), filters, transaction history per wallet, and an Insights surface for progress and analytics.
- Performed **blockchain queries** server-side (Sui RPC for holdings, transactions, metadata) via **evarra-backend-service** or **Next.js API routes**, with no chain SDK in the browser.
- Designed and implemented a **domain-driven** and **multi-chain-ready** front-end architecture with clear separation between UI, domain logic, and blockchain integration.
- Integrated **Sui blockchain** read-only (holdings and transactions) via **evarra-backend-service** or **Next.js API routes**, with no blockchain SDK in the browser.
- Delivered a full **authentication and user model** with persistence, multi-user scoping, and tier-based feature access.
- Implemented a **goals** system with hierarchy (parent/subgoal), grouping, progress, milestones, and centralized creation and date logic.
- Built **wallet management** with per-user persistence, validation, and Sui holdings/transactions UI with metadata caching and generic list components.
- Standardized **theme (light/dark)**, **theme-aware components**, and **accessibility** (Radix, ARIA, keyboard, focus, tooltips).
- Refactored **dialog and form state**, **store persistence**, and **rehydration** so that login/logout and multi-user behavior are correct and predictable.
- Documented **architecture**, **changelog**, **refactor plans**, and **audits** so that the codebase and decisions are understandable to others.
- Used **Jest** and **React Testing Library** for tests and maintained **TypeScript** and **ESLint** so that the codebase stays type-safe and lint-clean.
- Applied a consistent **design system** (tokens, component library, WCAG-oriented accessibility, layout and dialog patterns) and **usability** aimed at both **beginners and expert users** (simple vs advanced goal flows, configurable goal panel, tier-based feature access, settings-driven preferences).
- Kept the codebase **modular and maintainable** via domain boundaries, single-responsibility modules, chain abstraction, component composition, centralized cross-cutting logic, and barrel exports.
- Included **MongoDB** for server-side persistence in the uploaded evarra tracker (database work as part of the project).

This document is the explicit, expanded reference for that work.

---

## 8. Positioning for Applications (e.g. Wallet / Frontend Roles)

This section reflects advice from discussions about using this project when applying to roles such as **Senior Frontend Engineer (Slush Wallet)** at Mysten Labs or similar wallet/product frontend positions in the Sui ecosystem. It helps you present the MVP in a way that aligns with what those teams care about.

### Why This Project Maps Well to Wallet and Crypto Frontend Roles

- **Blockchain usability and transaction clarity:** Many wallet and crypto product roles explicitly care about the tension between “transparency” (showing what’s on-chain) and “human comprehension” (making it understandable). This app addresses that directly: it reads raw transactions and translates them into human-readable form (type, direction, amounts, token metadata) so users see what happened instead of hashes and opaque calls. That is the same class of UX problem wallet teams work on.

- **Sui ecosystem:** The app integrates with the **Sui** chain (holdings, transactions, metadata via backend queries). For companies like Mysten Labs (who build Sui), having built something that uses Sui, understands object-based data, and displays assets and transactions is a strong differentiator compared to generic frontend candidates.

- **Wallet integration:** The app connects with wallets in the sense of managing wallet addresses and reading their activity; the architecture supports extending to in-browser wallet connection and signing. Being able to talk concretely about wallet data, transaction display, and (if you add or have it) signing flows is a credibility signal for wallet teams.

- **Architecture language:** The project demonstrates “design for stability and long-term investment”: modular architecture, state management, maintainability, and user complexity tiers (simplicity for new users, complexity for advanced users). That matches the language senior frontend engineers use and what hiring managers look for.

### How to Position Yourself

- **Avoid:** Describing yourself only as a “frontend developer” or “React developer.”
- **Prefer:** **Engineer focused on blockchain usability and transaction clarity** (or similar). Emphasize that you build interfaces that make on-chain activity understandable and actionable for users.

### One-Liners for Applications and Cover Letters

You can use a short sentence like one of these when summarizing the project (adjust for accuracy—e.g. include “signing” only if you have it in this or another codebase):

- **Emphasis on translation and usability:**  
  “Built a React/Next.js application that integrates with Sui wallets, reads on-chain transactions, and translates raw blockchain activity into human-readable reports to improve transparency and usability for non-technical users.”

- **Emphasis on full stack and architecture:**  
  “Built a React/Next.js/TypeScript MVP that connects wallet addresses to the Sui chain, performs blockchain queries server-side, translates transactions into human-readable form, and provides organization and reporting—with a modular front-end architecture, state management, and options for both simple and advanced user flows.”

Use the **Key Points** section (above) and **Section 7** to stay accurate; add “signing” explicitly only if your implementation includes it.

### Story to Polish Before Applying

When preparing your MVP story (for the application, portfolio, or interview), structure it around these five areas. This document gives you the content for each:

1. **Problem you solved:** Making on-chain transactions and holdings understandable and organizable for users; balancing transparency with comprehension. (Sections 4, 5.8, Key Points.)
2. **Architecture:** Domain-driven structure, multi-chain-ready data model, separation of UI / domain / blockchain, state management, modularity. (Sections 2, 2.5, 5.14.)
3. **Wallet integration:** How users add and track wallet addresses; how the app reads holdings and transactions (and, if applicable, signing). (Sections 1.7, 5.7, 5.8, Key Points.)
4. **Transaction interpretation logic:** How raw chain data becomes human-readable (type classification, balance in/out, metadata, formatting). (Section 5.8, `enrichTransactions`, `determineTransactionType`, transaction types in codebase.)
5. **UX philosophy:** Simplicity for new users and complexity for advanced users; design system; accessibility; clarity and emotional ease. (Sections 3, 4.)

### What to Prepare When Applying

Web3 and wallet teams often favor demonstrated work. When applying, have ready:

- **GitHub repo** (or link to the codebase) so they can see structure and patterns.
- **Screenshots** of the app: transaction list (human-readable rows), wallet/holdings views, goal/progress UI, settings or advanced/simple flows.
- **Short demo description:** One paragraph that hits: stack (React, Next.js, TypeScript), Sui integration, reading/translating transactions, organizing and reporting, and architecture (modular, state management, beginner/advanced options).
- **Architecture overview:** This document (or a one-page summary drawn from Sections 1–2 and 2.5) so you can point to “how it’s built for stability and maintainability.”

If you can, also highlight in the repo or README: **Sui transactions** (enrichment in `enrichTransactions.ts`, type determination in `processing/type.ts`, display in `transactionsHelpers.tsx` and `TransactionList`), **wallet integration** (address management in the wallet store, Add Wallet dialog, data flow from API to store to WalletDetailsPanel and holdings/transactions panels), and **query examples** (how the app calls `/api/holdings/sui` and `/api/transactions/sui`, what the backend returns, and how the frontend enriches and displays it). That gives reviewers concrete evidence of your blockchain and wallet-related work.

**Evidence you can point to in interviews:** When asked about “translating transactions to human-readable form,” you can point to: (1) the transaction type system in `src/lib/blockchain/sui/types/transaction.ts` (TransactionType union and event patterns), (2) `determineTransactionType` in `processing/type.ts` that maps raw events and balance changes to a single type, (3) `enrichSuiTransactions` that attaches metadata and the resolved type, and (4) the transaction list UI that displays type label, token symbol, formatted amount, and in/out direction and color. When asked about “architecture for maintainability,” you can point to: (1) domain folders under `lib/domains/` with clear boundaries and barrel exports, (2) store actions split by concern (storeActions, parent, progress, formActions, user), (3) generic list components with render props so that adding a new chain does not require rewriting the list, and (4) centralized date and milestone logic in one place. When asked about “simplicity for new users and complexity for advanced,” you can point to BasicGoalForm vs AdvancedGoalForm, the settings toggle for the advanced goal panel, and the tier/feature-access model.

**Likely interview topics:** Be prepared to discuss: how you decided to keep the Sui SDK out of the browser (security, CORS, bundle size) and use a backend proxy; how you structured the transaction enrichment pipeline (fetch → normalize → enrich with metadata and type → display); how you handle multi-user data and persistence (keys, partialize, rehydration, sync on login/logout); and how you would add another chain (new API route, new fetch + processing + types + render helper, same store and list components). You can also discuss trade-offs you made (e.g. localStorage vs server persistence, client-side auth vs server sessions) and what you would do differently or add next (e.g. signing flows, React Native, GraphQL if the role uses it).

This section is intended to stay consistent with the rest of the document while giving you a direct link from “what I built” to “how I present it for wallet and crypto frontend roles,” with enough concrete references that you can condense or expand as needed when preparing for a specific application or interview.

# Portfolio & Accomplishments: Aqueduct Platform

This document describes, in explicit and expanded form, what has been built in the **Aqueduct Platform**: shared infrastructure on Sui that apps and games consume via APIs. It is intended for portfolio use and communicating scope of work—without focusing on product-specific marketing.

**How to use this document:** The content is intentionally **exhaustively documented** (detailed sections, concrete file paths, API routes, service and function names, env vars, data flows) so you can trim later. You can **condense and rewrite** for a one-page summary, resume bullets, or keep the long form as a master reference. The **Codebase and File Reference** section gives a single place to find paths and names when you need to keep or drop specifics. Sections **7** and **8** are tuned for applications and interviews; the rest is the full technical and narrative backing.

**Relationship to apps:** The platform is a **separate entity** from any single app (e.g. SuiTwo Market Shooter). **Apps define** (what items, events, milestones, rewards); the **platform executes** (purchases, consume, enter, submit, distribute). The platform never holds app/game private keys; it **builds** transactions and apps/games **sign and submit**. See [PORTFOLIO_SUITWO_SHOOTER.md](../SuiTwo Shooter/PORTFOLIO_SUITWO_SHOOTER.md) for the shooter app.

---

## Key Points: Aqueduct Platform in One Place

- **Product:** **Aqueduct Platform** — shared infrastructure on **Sui** designed as **SaaS**. Multiple tenants (ecosystems/apps) consume the same deployment. Not a game or end-user product; apps use it for game pass, store, events, tournaments (Regatta), milestones (Sustain: Rain), stats, vaults (Glacier), NFTs (Shipyard), Insignia (wallet-scoped player records), config, and transaction services (Channel).

- **Principle:** **Apps define; platform takes action.** The platform does not define product rules, pack offerings, milestone conditions, or event semantics. Apps define what they want; the platform executes, stores definitions on-chain when needed, and provides shared infra. Apps own the “what”; platform owns the “how.”

- **Build-and-sign:** For any operation requiring the app’s or game’s wallet, the platform **builds** (returns unsigned transaction); the app or game **signs and submits**. The platform never holds app/game private keys. Some endpoints support **execute** (platform signs) only when the platform owns the capability.

- **Auth:** **Corridor** = app-scoped auth. Identity from **CorridorCap** or **CorridorAdminCap** (API key + capability object ID in header/query); ecosystem_id and app_id come from the cap. **Harbor Master** = platform operator only (e.g. health, verify-wallet, wallet-reserves, ecosystems, migrate); auth via same-origin or X-Admin-Wallet. **No-defaults policy:** no implicit API key or ecosystem; all must be explicit for multi-tenancy.

- **Core modules (brand → purpose):** **Chart** (ecosystem registry, app directory, handle→ID); **Helm** (app behavior config, feature flags, knobs); **Conduit** (API layer); **Corridor** (auth only); **Estuary** (identity, wallet connect, optional entitlements grant/revoke); **Waterline** (entitlement/usage gate; v1 always OK); **Station** (events: create, enter, submit); **Regatta** (competition: create, enter, submit-score, payout); **Terminal** (commerce: purchase from Stockroom); **Channel** (generic Sui token transfers: build, estimate, batch, execute); **Sustain** (distribution: single path for tokens, items, credits; Rain = milestones/Regatta/achievements); **Reservoir** (balances and items: credits, tickets, merge); **Glacier** (locked vaults: add, release-distribute); **Shipyard** (NFTs: mint, upgrade, merge, transfer policies); **Hydroscope** (stats, leaderboard); **Gauge** (price discovery: token USD); **Aquifer** (definition storage: key→value, app-defined); **Insignia** (wallet-scoped key–value bytes; semantics app-defined); **Sonar** (read-only chain query proxy); **Harbor Master** (platform ops); **Buoy** (liveness); **Water Quality** (readiness/safety).

- **Services at a glance:** Game Pass (credits, tickets, packs, consume, purchase-pack); Store (Provisions = item definitions, Stockroom = purchasable offers; Terminal purchase, inventory, consume, merge); Events (Station: time-bounded, participants, submissions); Regatta (enter with ticket, submit-score, leaderboard, payout via Sustain); Milestones (Sustain: Rain — evaluate, claim, claimed); Sustain (build-distribute; distribute disabled); Stats (Hydroscope: update, read by address); Insignia (wallet-scoped records via `/api/insignia`); Config (network, RPC, wallet module URL); Tokens (balance by address); Vaults (Glacier: create, add, release-distribute, payouts); Admin (credits/tickets, inventory, verify-wallet, wallet-reserves, ecosystems, vaults); Health; Gauge; Channel (tx build, estimate, batch, execute).

- **Contracts:** **Modular Sui Move** packages; all **generic** (opaque payloads, app-defined keys and semantics). Deploy order: **core** (chart_registry, chart, harbor_master) → **station** → **regatta** → **reservoir**, **provisions**, **terminal**, **glacier**, **sustain**, **helm**, **hydroscope**, **shipyard**, **aquifer**, **insignia**, **anchor**, **exchange**, **barometer**, **estuary**, **stockroom** as per dependency graph. Game contracts (e.g. suitwo_game) depend on platform packages; platform does not encode any specific game.

- **Backend:** **Next.js** (App Router) with **TypeScript**. Single API surface under `app/api/`: corridor, chart, helm, estuary, channel, station, regatta, reservoir, terminal, provisions, glacier, sustain, hydroscope, aquifer, insignia, shipyard, gauge, anchor, exchange, barometer, buoy, water-quality, sonar, admin, harbor-master. Lib: services (ecosystem-registry, chart, helm, station, regatta, reservoir, terminal, glacier, sustain, milestones, shipyard, insignia, entitlement, waterline, channel/transaction-helpers, locked-vault), Sui client, water-quality, corridor auth.

- **Deployment:** Platform backend deployable independently; contracts deployed in order (see deployment docs). **Do not edit .env** for deployment IDs; record package/object IDs in the appropriate DEPLOYMENT_IDS or deployment summary file (see workspace rules). Apps (e.g. shooter-game backend) point to platform API URL and use Corridor for app-scoped calls.

- **No separate database:** All event, participant, leaderboard, and app data is stored **on Sui** (smart contracts). Backend reads directly from chain via Sui RPC (or Sonar proxy). API keys and ecosystem config live in env (or minimal key-value); no MongoDB or SQL for platform data.

- **Environment variables:** Per-ecosystem API key (`ECOSYSTEM_<id>_API_KEY`); admin wallet **address** only (`ECOSYSTEM_<id>_ADMIN_WALLET` — game holds key, platform never pays); Terminal store, Reservoir system, EcosystemAppRegistry, Chart, app IDs, capability object IDs; `SUI_NETWORK`, `SUI_RPC_URL`; network suffix `_TESTNET`/`_MAINNET`. No default API key or ecosystem; every ecosystem must be explicitly configured.

- **Tide (scheduler):** Backend service that runs scheduled jobs: move events from upcoming→active, active→past, and trigger distribution (e.g. Regatta payout). `lib/services/tide/` — tide-runner, upcoming-to-active-executor, move-to-past-executor, distribution-executor, tide-config, get-chain-timestamp. Admin route: `POST /api/admin/tide/run`.

- **Anchor:** Session and claim submission for trusted results and anti-replay. Regatta submit-score uses **Anchor + Station**: one tx submits claim then Station consumes it for the event. APIs: sessions, claims, claims/[claimId], verify. Hydroscope participants/[address]/anchor-summary and participants/[address]/claims use Anchor-derived data.

- **Competition types:** Regatta supports competition-type abstraction (`lib/services/station/regatta/competition-types/` — base, all-vs-all, types). Submission payload is app-defined JSON; contract does not fix field names (e.g. score, coins).

- **Response shapes:** Build endpoints return unsigned transaction (e.g. `transactionBytes` base64, or `channelBuildParams`) for app/game to sign and submit. Sustain distribute returns 410 (disabled); build-distribute is primary. Gauge returns token USD values; Sonar returns chain query results (getObject, getDynamicFields, etc.).

- **Modular for maintainability:** Service-per-module under `lib/services/`; corridor auth and request context centralized; batch-handlers for Channel batch; platform validators and errors in shared modules. Ecosystem-only config (no app_id-only Chart/Helm); all app-scoped routes require Corridor.

- **Known limitations and future work:** Logbook (audit trail), Lighthouse (advisory alerts), Dock (not started); Anchor and Barometer/Exchange event schemas partial; Water Quality signals can be extended. Sustain Dew/Mist, Marina, Workshop, Charter, Arbiter, Levee, Beacon are future or parked. See PLATFORM_BUILD_OUT_REMAINING.md.

If you have not worked on the platform in a few months, you can still accurately describe it using this document; the technical content reflects the current codebase and can be updated when you resume work.

---

## Codebase and File Reference

Paths are relative to the project root. The platform lives under **`Aqueduct Platform/`**.

**Backend (Aqueduct Platform/backend/):**

- **Framework:** Next.js (App Router); TypeScript. Entry and API under `app/api/`. Port from env or 3000.

**API routes (exhaustive list; all under `Aqueduct Platform/backend/app/api/`):**

- **Corridor:** `corridor/route.ts` — GET Corridor index (describes Corridor, lists which routes require it).
- **Chart:** `chart/resolve-app/route.ts`, `chart/resolve-ecosystem/route.ts` — handle → ID resolution; require Corridor.
- **Helm:** `helm/route.ts` — app/ecosystem config (get/set/remove); Corridor.
- **Estuary:** `estuary/connect/route.ts` (wallet connect config), `estuary/[address]/route.ts`, `estuary/check/route.ts`, `estuary/grant/route.ts`, `estuary/revoke/route.ts` — grant/revoke require CorridorAdminCap or Harbor Master.
- **Channel:** `channel/route.ts` (tx catalog/capabilities), `channel/estimate/route.ts`, `channel/batch/route.ts`, `channel/execute/route.ts` — build, estimate, batch, execute; platform never signs.
- **Station:** `station/route.ts` (list/create events), `station/past/route.ts`, `station/[id]/route.ts`, `station/[id]/submit/route.ts`, `station/[id]/submissions/route.ts` — events; Corridor required.
- **Regatta:** `regatta/create/route.ts`, `regatta/enter/route.ts`, `regatta/submit-score/route.ts`, `regatta/default-sustain-config/route.ts`, `regatta/gas-payment-address/route.ts` — enter and submit-score are build-only; Corridor.
- **Reservoir:** `reservoir/[address]/route.ts`, `reservoir/holdings/[address]/route.ts`, `reservoir/balance/add/route.ts`, `reservoir/balance/set/route.ts`, `reservoir/balance/remove/route.ts`, `reservoir/balance/consume/route.ts`, `reservoir/items/consume/route.ts`, `reservoir/merge/route.ts`, `reservoir/ticket-units/[address]/route.ts`, `reservoir/status/route.ts`.
- **Terminal:** `terminal/purchase/route.ts`, `terminal/purchase-product/route.ts`, `terminal/transaction/[digest]/route.ts`.
- **Provisions:** `provisions/admin/catalog/build/route.ts` — build unsigned tx for catalog; app signs.
- **Glacier:** `glacier/vaults/route.ts`, `glacier/[vaultId]/route.ts`, `glacier/[vaultId]/add/route.ts`, `glacier/[vaultId]/release-distribute/route.ts`, `glacier/[vaultId]/payouts/route.ts`.
- **Sustain:** `sustain/evaluate/route.ts`, `sustain/claim/route.ts`, `sustain/claimed/route.ts`, `sustain/build-issue/route.ts`, `sustain/build-distribute/route.ts`, `sustain/distribute/route.ts` (410 disabled), `sustain/events/[id]/prepare-distribution/route.ts`, `sustain/events/[id]/mark-distribution-complete/route.ts`.
- **Hydroscope:** `hydroscope/[address]/route.ts`, `hydroscope/update/route.ts`, `hydroscope/leaderboard/route.ts`, `hydroscope/participants/[address]/claims/route.ts`, `hydroscope/participants/[address]/anchor-summary/route.ts`.
- **Aquifer:** `aquifer/route.ts`, `aquifer/definitions/route.ts`, `aquifer/definitions/[key]/route.ts` — definition storage read/set via Channel.
- **Insignia:** `insignia/route.ts` — wallet-scoped key/value records on insignia_registry; payload semantics app-defined; Corridor like other app-scoped routes.
- **Shipyard:** `shipyard/mint/route.ts`, `shipyard/upgrade/route.ts`, `shipyard/burn/route.ts`, `shipyard/merge/route.ts`, `shipyard/merge/recipes/route.ts`, `shipyard/merge/complete/route.ts`, `shipyard/transfer-policies/route.ts`, `shipyard/has-badge/route.ts`, `shipyard/kiosk/[id]/route.ts`, `shipyard/[objectId]/image/route.ts` (public read-only).
- **Gauge:** `gauge/route.ts` — token USD prices; Corridor.
- **Anchor:** `anchor/sessions/route.ts`, `anchor/claims/route.ts`, `anchor/claims/[claimId]/route.ts`, `anchor/verify/route.ts`.
- **Exchange / Barometer:** `exchange/route.ts`, `exchange/[id]/submit/route.ts`; `barometer/route.ts`, `barometer/[id]/submit/route.ts` — Station extensions (submit re-exports).
- **Stockroom:** `stockroom/offers/route.ts`.
- **Sonar:** `sonar/route.ts` — POST chain query (getObject, getDynamicFields, getTransactionBlock, etc.); `sonar/balance/[address]/route.ts` — balance read (query `?coinType=...`).
- **Ops:** `buoy/route.ts` (liveness), `water-quality/route.ts` (readiness).
- **Admin:** `admin/reservoir/list-players/route.ts`, `admin/tide/run/route.ts` — Corridor or as documented.
- **Harbor Master:** `harbor-master/` — health, verify-wallet, wallet-reserves, ecosystems, migrate-ecosystem-data; auth via same-origin or X-Admin-Wallet.

**Lib (Aqueduct Platform/backend/lib/):**

- **Auth:** `auth/auth.ts` — auth helpers; `auth/request-context-async.ts` — async request context. `services/corridor/context/corridor-context.ts` — Corridor context (getRequestContextAsync, getCorridorCapabilityObjectIdFromRequest, getEcosystemAppRegistryId from config).
- **Config:** `config/ecosystem-registry.ts`, `config/api-base-url.ts`; `ecosystem-registry.ts` — ecosystem config (getEcosystemConfig, ECOSYSTEM_* env).
- **API:** `api/api-handler.ts` — API handler utilities; `api/station-create.ts` — station create API.
- **Services (per module):** `services/chart/chart-service.ts` — Chart (resolve-app, resolve-ecosystem). `services/helm/helm-service.ts` — Helm (EcosystemAppConfigRegistry, set/remove_config_ecosystem). `services/station/station-service.ts` — Station events. `services/station/regatta/regatta-extension-service.ts` — Regatta (create, enter, submit-score; uses Anchor + Station). `services/station/regatta/types.ts`, `index.ts`, `competition-types/base.ts`, `all-vs-all.ts`, `types.ts`. `services/station/event-distribution-helper.ts`. `services/reservoir/reservoir-service.ts` — Reservoir (balance, items, merge). `services/terminal/terminal-service.ts` — Terminal (purchase, consume). `services/glacier/glacier-service.ts` — Glacier (vaults). `services/sustain/distribution/sustain-distribution.ts` — Sustain distribution (buildDistributeRewards, build-issue). `services/channel/service/channel-service.ts` — Channel (build, execute). `services/channel/transaction/transaction-helpers.ts` — transaction building. `services/channel/batch/batch-handlers.ts` — batch operation handlers. `services/hydroscope/service/hydroscope-service.ts`, `hydroscope-build.ts`, `chain-read/hydroscope-stats-chain.ts`, `chain-read/hydroscope-anchor-read.ts`, `index.ts`. `services/shipyard/shipyard-service.ts`, `shipyard-merge.ts`. `services/provisions/build/provisions-build.ts`, `catalog/provisions-catalog.ts`. `services/stockroom/stockroom-build.ts`, `stockroom-offers.ts`. `services/aquifer/aquifer-service.ts`, `chain-read/aquifer-chain-read.ts`. `services/insignia/insignia-service.ts`. `services/gauge/gauge-service.ts`; `services/price-converter/price-converter.ts`. `services/water-quality/water-quality-service.ts`. `services/estuary/balance/balance-checker.ts`, `wallet/admin-wallet-service.ts`. `services/anchor/anchor-service.ts`. `services/sonar/sonar-service.ts`, `chain-read-helpers.ts`, `discover-wallets/discover-wallets-helper.ts`. `services/harbor-master/harbor-master-service.ts` — verifyHarborMasterAccess. `services/tide/tide-runner.ts`, `upcoming-to-active-executor.ts`, `move-to-past-executor.ts`, `distribution-executor.ts`, `tide-config.ts`, `get-chain-timestamp.ts`, `index.ts`. `services/migration/migration-service/index.ts`, `tournament-migration.ts`, `stats-migration.ts`, `inventory-migration.ts`. `services/platform/errors/platform-errors.ts`, `validators/platform-validators.ts`.

**Environment variables (platform backend):**

- **Auth:** `ECOSYSTEM_<id>_API_KEY` — per-ecosystem API key (required; no default).
- **Game pays (rewards):** `ECOSYSTEM_<id>_ADMIN_WALLET` — admin wallet **address** only (game holds key; platform never pays).
- **Terminal:** `ECOSYSTEM_<id>_TERMINAL_STORE_OBJECT_ID` (required); optional `_TERMINAL_STORE_*` package.
- **Reservoir:** `ECOSYSTEM_<id>_RESERVOIR_SYSTEM_OBJECT_ID` (required).
- **Registry:** `ECOSYSTEM_APP_REGISTRY_OBJECT_ID` or per-ecosystem `ECOSYSTEM_<id>_APP_REGISTRY_OBJECT_ID`; `ECOSYSTEM_<id>_APP_IDS` (comma-separated); `ECOSYSTEM_<id>_APP_<appId>_CAPABILITY_OBJECT_ID`. `ECOSYSTEM_CHART_OBJECT_ID` for Chart handle resolution.
- **Sui:** `SUI_NETWORK` (testnet/mainnet), `SUI_RPC_URL` (optional). Use `_TESTNET` or `_MAINNET` suffix for network-specific overrides.
- **Contract IDs:** Platform package, Regatta extension, Station, Reservoir, Glacier, etc. — record in DEPLOYMENT_IDS or deployment summary; do not edit .env for deployment IDs per workspace rules.

**Logging and observability:**

- Backend: console or logger for info, warn, error; request/response logging where added. Health: `GET /api/buoy` (liveness), `GET /api/water-quality` (readiness), `GET /api/admin/health` (Harbor Master). No mandated APM; logs suitable for stdout or deployment logs.

**Key data flows (API contracts):**

- **Corridor:** Every app-scoped request sends API key + `X-Corridor-Capability-Object-Id` (or query); ecosystem_id and app_id derived from cap. CONFIG_MISSING if missing.
- **Build flows:** Build endpoints (e.g. sustain/build-distribute, provisions/admin/catalog/build, regatta/enter, regatta/submit-score) return unsigned tx or channelBuildParams; app/game signs and submits; optional `POST /api/channel/execute` with signed tx.
- **Reservoir:** GET holdings/[address] → per-player balance and inventory; balance add/set/remove/consume, items consume, merge (recipe-based); merge then channel/execute.
- **Sustain Rain:** POST evaluate (definitionKey, address, stats) → eligible milestones; POST claim → build payout tx; GET claimed → list claimed IDs.
- **Regatta:** create → Station event + Regatta config; enter → consume ticket + station::enter; submit-score → Anchor claim + station::submit_claim_and_record_tournament_score.
- **Glacier:** add → add funds to vault; prepare-distribution (Sustain) → vaultReleaseParams; release-distribute → build or execute release_distribute; GET payouts → history.

**Contracts (Aqueduct Platform/contracts/):**

- **Packages (sources under each package):** **core** — `chart_registry.move`, `chart.move`, `harbor_master.move`. **station** — `station.move`. **regatta** — `regatta.move`. **reservoir** — `reservoir.move`. **provisions** — `provisions.move`. **terminal** — `terminal_store.move`. **glacier** — `glacier.move`. **sustain** — `sustain.move`. **helm** — `helm.move`. **hydroscope** — `hydroscope.move`. **shipyard** — `Shipyard.move`. **aquifer** — `aquifer.move`. **insignia** — `insignia_registry.move`. **anchor** — `anchor.move`. **exchange** — `exchange.move`. **barometer** — `barometer.move`. **estuary** — `estuary.move`. **stockroom** — `stockroom.move`. **publish_bundle** — `bundle.move` (if present).
- **Source paths (sources/ per package):** `contracts/core/sources/` (chart_registry.move, chart.move, harbor_master.move), `contracts/station/sources/station.move`, `contracts/regatta/sources/regatta.move`, `contracts/reservoir/sources/reservoir.move`, `contracts/provisions/sources/provisions.move`, `contracts/terminal/sources/terminal_store.move`, `contracts/glacier/sources/glacier.move`, `contracts/sustain/sources/sustain.move`, `contracts/helm/sources/helm.move`, `contracts/hydroscope/sources/hydroscope.move`, `contracts/shipyard/sources/Shipyard.move`, `contracts/aquifer/sources/aquifer.move`, `contracts/insignia/sources/insignia_registry.move`, `contracts/anchor/sources/anchor.move`, `contracts/exchange/sources/exchange.move`, `contracts/barometer/sources/barometer.move`, `contracts/estuary/sources/estuary.move`, `contracts/stockroom/sources/stockroom.move`, `contracts/publish_bundle/sources/bundle.move`. Build output in each package’s `build/` (e.g. build/aqueduct_core/sources/).
- **Deploy order:** See `contracts/README.md` and deployment docs (e.g. platform first, then regatta/extensions). Game contracts in `apps/shooter-game/contracts/` depend on platform.
- **Design:** All modules **generic** (opaque payloads, app-defined keys); see `contracts/platform/docs/PLATFORM_GENERIC_VS_GAME_SPECIFIC.md` (or equivalent under contracts).

**Documentation:**

- **Platform docs:** `docs/platform/` — README, services (PLATFORM_SERVICES_LIST.md, APP_FACING_PLATFORM_SERVICES.md), architecture, events, tournaments, deployment, migration, planning.
- **Platform Documentation (bundle):** `docs/Platform Documentation/` — overview, concepts (build-and-sign-flow, roadmap), services, integration, glossary.
- **In repo:** `Aqueduct Platform/ARCHITECTURE.md`, `Aqueduct Platform/Product Naming.md`, `Aqueduct Platform/docs/PLATFORM_BUILD_OUT_REMAINING.md`; `Aqueduct Platform/backend/PLATFORM_SETUP.md`, `SERVICES_AUDIT_LIST.md`.

**Wallet module (shared):**

- Shared wallet integration used by apps (e.g. shooter-game frontend) may live under `wallet-module/` at repo root or under platform; frontend loads wallet module URL from config. Platform provides `GET /api/estuary/connect` for wallet connect config.

---

## 1. Technologies, Tools, and Libraries

### 1.1 Core Framework and Runtime

**Next.js** (App Router) is the platform backend framework. All routes live under `Aqueduct Platform/backend/app/api/`, grouped by Aqueduct module (corridor, chart, helm, estuary, channel, station, regatta, reservoir, terminal, provisions, glacier, sustain, hydroscope, aquifer, insignia, shipyard, gauge, anchor, exchange, barometer, stockroom, sonar, buoy, water-quality, admin, harbor-master). The backend is API-only: no server-rendered pages for end users; layout and root exist for Next.js. Build and dev: `npm run dev` (development), `npm run build` then `npm run start` (production). Port from env or default 3000.

**TypeScript** is used throughout the backend: route handlers, lib services, config, validators. Strict typing; types and interfaces live next to services or in shared platform types. No `any` escape hatches in core paths. Type checking via `tsc` (or Next build).

### 1.2 Auth and Request Context

**Corridor** is the app-scoped auth model. Identity is derived **only** from the Corridor cap: every request must send the ecosystem’s API key and `X-Corridor-Capability-Object-Id` (or `X-Corridor-Admin-Capability-Object-Id`) in header or query. The platform does **not** accept `X-Ecosystem-Id` or `X-App-Id` for identity; ecosystem_id and app_id come from the cap (resolved via Chart/EcosystemAppRegistry). Implementation: `lib/services/corridor/context/corridor-context.ts` (getRequestContextAsync, getCorridorCapabilityObjectIdFromRequest); `lib/auth/request-context-async.ts`; `lib/auth/auth.ts`. Routes that read or write app data require Corridor; request rejected with CONFIG_MISSING if capability or registry missing.

**Harbor Master** is platform-operator auth. Routes under `/api/harbor-master/*` (health, verify-wallet, wallet-reserves, ecosystems, migrate-ecosystem-data) use `verifyHarborMasterAccess`: same-origin or `X-Admin-Wallet` matching platform admin. Implemented in `lib/services/harbor-master/harbor-master-service.ts`. Estuary grant/revoke accept **either** CorridorAdminCap **or** Harbor Master.

**Estuary** (identity, entitlements): `GET /api/estuary/connect` (wallet connect config for app frontends); `GET /api/estuary/[address]`, `POST /api/estuary/check` for entitlement check; `POST /api/estuary/grant`, `POST /api/estuary/revoke` for grant/revoke (CorridorAdminCap or Harbor Master). Entitlement service and balance checker in `lib/services/estuary/`.

### 1.3 Sui and Chain Integration

The platform **reads and writes** Sui via **@mysten/sui** (or equivalent) in the backend. All chain access is server-side: no Sui SDK in app frontends; apps call the platform API. The platform **builds** transactions (Channel, batch-handlers, per-service build logic) and returns unsigned tx to the app/game; the platform **never** holds app/game private keys. When the platform owns a capability (e.g. shared admin cap), it may **execute** (sign and submit); for per-app capabilities, only **build** is supported. Sonar (`/api/sonar`, `sonar/balance/[address]`) provides a read-only chain query proxy so app backends can use getObject, getDynamicFields, getTransactionBlock, waitForTransaction, devInspectTransactionBlock through the platform when configured.

### 1.4 No Database (On-Chain Storage)

The platform **does not use a separate database** (no MongoDB, PostgreSQL, etc.) for event data, participants, leaderboards, or app state. All such data is stored **on Sui** in smart contracts (Station, Reservoir, Hydroscope, Aquifer, Insignia, etc.). The backend reads from chain via Sui RPC (or Sonar). **Exception:** API keys and ecosystem configuration are stored in **environment variables** (or in-memory/minimal key-value); see Section 1.7 and Codebase (Environment variables).

### 1.5 Smart Contracts (Sui Move)

**Sui Move** packages under `Aqueduct Platform/contracts/`: **core** (chart_registry.move, chart.move, harbor_master.move); **station** (station.move); **regatta** (regatta.move); **reservoir** (reservoir.move); **provisions** (provisions.move); **terminal** (terminal_store.move); **glacier** (glacier.move); **sustain** (sustain.move); **helm** (helm.move); **hydroscope** (hydroscope.move); **shipyard** (Shipyard.move); **aquifer** (aquifer.move); **insignia** (insignia_registry.move); **anchor** (anchor.move); **exchange** (exchange.move); **barometer** (barometer.move); **estuary** (estuary.move); **stockroom** (stockroom.move); **publish_bundle** (bundle.move). All modules are **generic**: opaque payloads (vector<u8>, app-defined JSON), app-scoped identity (ecosystem_id, app_id); no game-specific types in contracts. Deploy in dependency order (see contracts/README.md, DEPLOYMENT_SUMMARY.md). **Do not edit .env** for deployment IDs; record in DEPLOYMENT_IDS or deployment summary per workspace rules.

### 1.6 Deployment and Environment

Platform backend is deployable to **Node.js** hosts or **Vercel** (API routes). Contracts are deployed to Sui testnet or mainnet in order (core → station → regatta → …). **Environment variables:** See Codebase and File Reference (Environment variables). Key groups: per-ecosystem API key and admin wallet address; Terminal store and Reservoir system object IDs; EcosystemAppRegistry and Chart; app IDs and capability object IDs; SUI_NETWORK, SUI_RPC_URL; network suffix _TESTNET/_MAINNET. No default API key or ecosystem. Local setup: copy env template, set required vars, `npm run dev` in backend. Apps (e.g. shooter-game backend) set PLATFORM_API_URL and use Corridor (API key + capability object ID) for app-scoped calls.

### 1.7 Security

**No app/game keys on platform:** App and game private keys are never on the platform. For writes that require the app/game wallet, the platform exposes **build** endpoints only; the app/game signs and submits. **Execute** (platform signs) only when the platform owns the capability. **Env-based secrets:** API keys, RPC URL, and contract IDs from env; no secrets in client or in repo. **Validation:** Request validation (platform-validators, Zod or equivalent) for params and body; CONFIG_MISSING and 4xx for missing or invalid auth/config. **Corridor and Harbor Master separation:** App-scoped data requires Corridor; platform ops require Harbor Master so tenant and operator are distinct.

### 1.8 Logging and Observability

**Backend:** Console or logger (info, warn, error) for request summaries, errors, and debug. No mandated third-party APM or log aggregation; logs are suitable for stdout (e.g. Vercel/Render logs) or file inspection. **Health and readiness:** `GET /api/buoy` — liveness (service up, no dependency checks). `GET /api/water-quality` — readiness and safety (pH, turbidity, temperature, pressure; clarity index and read/write allowance). `GET /api/admin/health` — Harbor Master health. These support load balancers and monitoring without a full observability stack.

### 1.9 Performance and Resilience

**Code splitting:** Next.js route-based splitting. **No DB round-trips** for event/participant data (reads from chain). **Channel batch:** Multiple operations can be combined into one or fewer transactions via `POST /api/channel/batch`. **Timeouts and retries:** Sui RPC and external calls can use configurable timeouts; retry logic where implemented. **Water Quality:** Readiness checks can gate or advise on RPC latency and service health so callers can avoid unhealthy states.

### 1.10 Tide (Scheduler) and Migration

**Tide** is the platform scheduler: `lib/services/tide/tide-runner.ts`, `upcoming-to-active-executor.ts`, `move-to-past-executor.ts`, `distribution-executor.ts`, `tide-config.ts`, `get-chain-timestamp.ts`. Jobs: move events from upcoming→active, active→past; trigger distribution (e.g. Regatta payout). Admin triggers via `POST /api/admin/tide/run`. **Migration:** `lib/services/migration/migration-service/` — tournament-migration, stats-migration, inventory-migration for one-time or phased data migration from legacy to platform layout.

---

## 2. Architecture and Code Organization

### 2.1 Define vs Execute

- **Apps define:** Packs, milestones, event types, item definitions, reward structures, config keys, stat keys. Definitions stored on-chain (e.g. Aquifer, Helm, Stockroom, Provisions) or passed in API payloads.
- **Platform executes:** Purchase, consume, enter event, submit score, distribute rewards, add/remove balance, merge items, release vault. Platform builds transactions (or executes only when it owns capability); app/game signs and submits when their wallet is required.

### 2.2 Module Mapping (Brand → Code)

| Brand | On-chain | Backend | API area |
|-------|----------|---------|----------|
| Chart | chart_registry, chart | ecosystem-registry, chart-service | /api/chart/* |
| Helm | helm | helm-service | /api/helm |
| Conduit | — | Next.js | /api/* |
| Corridor | Chart (caps) | getRequestContextAsync, getCorridorCapabilityObjectIdFromRequest | GET /api/corridor |
| Estuary | — | entitlement-service | /api/estuary/* |
| Waterline | — | waterline-service | (gates other services) |
| Station | station | station-service | /api/station/* |
| Regatta | regatta | regatta-extension-service | /api/regatta/*, /api/tournaments/* |
| Terminal | terminal_store, reservoir | terminal-service, reservoir-service | /api/terminal/*, /api/reservoir/* |
| Channel | — | channel-service, transaction-helpers | /api/channel/* |
| Sustain | sustain | sustain-distribution-service | /api/sustain/* |
| Rain | sustain | milestones-service | /api/sustain/evaluate, claim, claimed |
| Reservoir | reservoir | ReservoirService | /api/reservoir/* |
| Glacier | glacier | LockedVaultService | /api/glacier/* |
| Shipyard | shipyard | shipyard-service | /api/shipyard/* |
| Hydroscope | hydroscope | stats-storage | /api/hydroscope/* |
| Gauge | — | price-converter | /api/gauge |
| Aquifer | aquifer | aquifer-chain-read | /api/aquifer/* |
| Insignia | insignia_registry | insignia-service | /api/insignia |
| Sonar | — | chain proxy | /api/sonar |
| Harbor Master | — | verifyHarborMasterAccess | /api/harbor-master/* |
| Buoy | — | — | /api/buoy |
| Water Quality | — | water-quality | /api/water-quality |

### 2.3 Access Model

- **Ecosystem** = **read scope** only. The platform uses ecosystem_id (and app_id) to know *which* data to read from shared contracts (config, catalog, inventory, stats, etc.). There is no “ecosystem wallet” for writes.
- **Write access** and **signer/gas** belong to the **apps and games** that use the data. They hold the capability (e.g. CorridorCap, AppCapability) and the signer wallet; the platform only **executes** (builds the transaction; when configured with the app’s wallet, the app signs and submits). So: ecosystem = which slice of data to read; writes = the app/game that owns the capability and pays gas.

### 2.4 Request Context and Corridor Flow

Request context is established in middleware or route handlers: read API key and `X-Corridor-Capability-Object-Id` (or Admin); resolve ecosystem_id and app_id from the cap (Chart/EcosystemAppRegistry); load ecosystem config (Terminal store, Reservoir, registry IDs) from `lib/config/ecosystem-registry.ts` and `lib/ecosystem-registry.ts`. All app-scoped routes then use this context for chain reads and build params. If capability or registry is missing, respond with CONFIG_MISSING. GET `/api/corridor` returns an index describing Corridor and listing which routes require it.

### 2.5 Route and Service Organization

**Routes** are grouped by Aqueduct module under `app/api/<module>/`. Each module has one or more route files (e.g. sustain/evaluate, sustain/claim, sustain/claimed). Shared behavior (auth, validation) is centralized in auth and api-handler. **Services** live under `lib/services/<module>/`: one primary service file per module (e.g. station-service.ts, reservoir-service.ts), with submodules for chain-read, batch, or build (e.g. channel/batch/batch-handlers.ts, sustain/distribution/sustain-distribution.ts). Regatta extends Station (regatta-extension-service, competition-types). No game logic in platform; all modules are app-agnostic and keyed by ecosystem_id and app_id.

### 2.6 Types and Validators

Shared types and validators: `lib/services/platform/validators/platform-validators.ts`; `lib/services/platform/errors/platform-errors.ts`. Request body and query validation (Zod or equivalent) at route level; CONFIG_MISSING and 4xx for auth/config; platform-errors for consistent error shapes. Regatta and Station use `lib/services/station/regatta/types.ts` and competition-types for submission payload and ranking.

### 2.7 Key Data Flows and API Contracts

- **Build-and-sign:** Build endpoints return `transactionBytes` (base64) or `channelBuildParams`; app/game decodes, signs with its wallet, submits to chain. Optionally app calls `POST /api/channel/execute` with signed tx. Sustain distribute (POST) returns 410 (disabled); use build-distribute.
- **Reservoir:** GET reservoir/[address] or reservoir/holdings/[address] → balance and inventory for address (with Corridor). Balance add/set/remove/consume and items consume via routes; merge returns build params then channel/execute.
- **Sustain Rain:** POST evaluate (definitionKey, address, stats from Hydroscope) → list of eligible milestones; POST claim → build payout tx for app to sign; GET claimed → claimed milestone IDs.
- **Regatta:** create → build Station event + Regatta config (game signs). enter → build consume ticket + station::enter (client signs). submit-score → build Anchor claim + station::submit_claim_and_record_tournament_score (one tx; client signs).
- **Glacier:** add → build add_to_vault; prepare-distribution (Sustain) → vaultReleaseParams for event; release-distribute → build or execute release_distribute; GET payouts → payout history.
- **Insignia:** Wallet-scoped records on insignia_registry; `/api/insignia` and insignia-service; opaque payloads with app-defined meaning; same multi-tenant keys (ecosystem_id, app_id) as other modules.

### 2.8 No-Defaults and Multi-Tenancy

The platform has **no implicit defaults** for API keys, ecosystems, or app config. Every ecosystem must have its own `ECOSYSTEM_<id>_API_KEY`; there is no default API_KEY. Admin and app-facing routes require explicit ecosystem (and cap); no fallback to a “first” or “default” ecosystem. This ensures multi-tenancy and prevents cross-ecosystem data access. Config uses only ecosystem-scoped registry and store IDs (EcosystemAppRegistry, EcosystemAppConfigRegistry); no app_id-only Chart/Helm in code (see SERVICES_AUDIT_LIST.md).

---

## 3. Services Summary (Plain English and Technical Detail)

1. **Game Pass (Reservoir)** — Credits and tickets; packs; consume credit; purchase pack; admin add/remove/set. On-chain: reservoir.move (per-player balances, ticket units). API: reservoir/[address], reservoir/holdings/[address], reservoir/balance/*, reservoir/ticket-units/[address], reservoir/status; Terminal purchase-pack. Admin: balance add/set/remove; list-players, discover-wallets via admin or Sonar.

2. **Store (Terminal, Provisions, Stockroom)** — **Provisions** = item definitions only (supply list, metadata, recipes, categories). **Stockroom** = purchasable offers (SKUs, pricing, limits, pack composition). **Terminal** = commerce engine: purchase, purchase-product; reads Stockroom; calls Channel for payment; Sustain authorizes issuance; Reservoir stores result. Inventory and consume: reservoir items consume; terminal/transaction/[digest]. Merge: reservoir/merge (recipe-based); then channel/execute. Admin catalog build: provisions/admin/catalog/build (returns unsigned tx; app signs).

3. **Events (Station)** — Time-bounded events with participants and submissions. Create (station/route POST), list (station/route GET, station/past), get (station/[id]), enter (station/[id]/enter build), submit (station/[id]/submit — via Anchor claim for Regatta). Event types: tournament (0), challenge (1), competition (2), season (3), custom (4). entry_data and submission_data are opaque (app-defined). Station consumes Anchor claims for submit (submit_claim_and_record_to_station, submit_station_for_user_corridor_via_claim).

4. **Regatta** — Competition mode (Station extension). create (Regatta create_tournament_event), enter (consume ticket + station::enter; build-only), submit-score (Anchor claim + station::submit_claim_and_record_tournament_score; build-only), default-sustain-config (get/set), gas-payment-address. Ticket consumed from Reservoir; submission payload app-defined. Payout via Sustain (prepare-distribution, release-distribute when vault linked).

5. **Milestones (Sustain: Rain)** — Progress goals (e.g. “play 5 games”) that unlock claimable payout. Definitions in Aquifer (app-defined key→value). Evaluate: POST sustain/evaluate (definitionKey, address; uses Hydroscope stats). Claim: POST sustain/claim → build payout tx; app signs. Claimed: GET sustain/claimed. All distribution runs through Sustain (single path).

6. **Sustain (distribution)** — Single distribution system. build-issue, build-distribute (primary; returns unsigned tx for app to sign). distribute (POST) disabled (410). Events: prepare-distribution (event id) → leaderboard, vaultReleaseParams; mark-distribution-complete. Idempotency and audit in sustain-distribution service. RewardEntry: recipient, token type/amount, items, credits; optional source for audit.

7. **Stats (Hydroscope)** — Key-value stats per player; leaderboard; participants claims and anchor-summary. On-chain: hydroscope.move (set/max/add by key). API: hydroscope/[address], hydroscope/update, hydroscope/leaderboard, hydroscope/participants/[address]/claims, hydroscope/participants/[address]/anchor-summary. Stats and leaderboard used by Rain evaluate and Regatta ranking.

8. **Config** — Helm: GET/POST /api/helm (app/ecosystem behavior config; key-value). Runtime config for app frontends (network, RPC, wallet module URL) may be served from config module or estuary/connect.

9. **Tokens** — Balance by address: GET sonar/balance/[address] (query coinType). Gauge: GET /api/gauge — token USD values (SUI, MEWS, USDC) for ticket value, store, rewards. Corridor required for Gauge.

10. **Vaults (Glacier)** — Locked on-chain vaults. Create (app admin signs create_glacier_vault). Add: POST glacier/[vaultId]/add. Release: prepare-distribution (Sustain) then POST glacier/[vaultId]/release-distribute (build or execute). GET glacier/[vaultId]/payouts (history). GET glacier/vaults (list; admin). Deposit deadline and unlock_at_ms control when adds stop and when release is allowed.

11. **Admin** — App-scoped: reservoir list-players, tide/run (scheduler), provisions catalog build. Harbor Master (platform ops): health, verify-wallet, wallet-reserves, ecosystems, migrate-ecosystem-data. Estuary grant/revoke: CorridorAdminCap or Harbor Master.

12. **Health** — GET /api/buoy (liveness). GET /api/water-quality (readiness; clarity index, read/write allowance). GET /api/admin/health (Harbor Master).

13. **Gauge** — GET /api/gauge; token USD prices; Corridor required.

14. **Channel** — Tx catalog GET /api/channel; estimate POST channel/estimate; batch POST channel/batch; execute POST channel/execute. Platform never signs; build endpoints return unsigned tx; app/game signs and submits.

15. **Aquifer** — Definition storage (key→value; opaque). GET aquifer/definitions, GET aquifer/definitions/[key]. Set/remove via Channel build (CorridorAdminCap). Used by Rain (milestone definitions), Shipyard (badge tier definitions), etc.

16. **Insignia** — Wallet-scoped store (`insignia_registry.move`) for app-defined keys and byte values. API: `/api/insignia` (insignia-service). Mutations follow build-and-sign with Corridor like other app-scoped modules.

17. **Shipyard** — NFTs: mint, upgrade, burn, merge, recipes, merge/complete, transfer-policies, has-badge, kiosk/[id], [objectId]/image (public). Corridor required except image.

18. **Anchor** — Sessions, claims, claims/[claimId], verify. Regatta submit-score uses Anchor claim + Station in one tx.

19. **Sonar** — Read-only chain proxy: POST sonar (getObject, getDynamicFields, getTransactionBlock, waitForTransaction, devInspectTransactionBlock). GET sonar/balance/[address]. Enables platform-mediated reads when configured.

---

## 4. Milestones and Major Accomplishments

### 4.1 Core Platform

- **Conduit, Corridor, Chart, Helm:** API layer, app-scoped auth (Corridor caps), ecosystem registry, app config (behavior knobs, feature flags).
- **Estuary, Waterline:** Identity/wallet connect config; optional entitlements (grant/revoke); usage gate (v1 always OK).

### 4.2 Commerce and Value

- **Channel:** Generic Sui token transfer flow (build, estimate, batch, execute); platform never signs.
- **Terminal, Provisions, Stockroom:** Purchase flow (Terminal reads Stockroom); item definitions (Provisions); purchasable offers (Stockroom).
- **Reservoir:** Balances and items; add/set/remove/consume; merge (recipe-based); ticket-units, holdings, status.

### 4.3 Events and Regatta

- **Station:** Events (create, enter, submit); opaque entry_data and submission_data.
- **Regatta:** Tournament extension (create, enter, submit-score); default-sustain-config; gas-payment-address; payout via Sustain.

### 4.4 Distribution and Storage

- **Sustain:** Single distribution path; build-issue, build-distribute; evaluate/claim/claimed (Rain); events prepare-distribution, mark-distribution-complete.
- **Glacier:** Locked vaults; add, release-distribute, payouts; list vaults.

### 4.5 Assets and Progression

- **Shipyard:** Mint, upgrade, burn, merge, recipes, transfer policies, has-badge, kiosk, image.
- **Aquifer:** Definition storage (key→value); definitions list and by key.
- **Insignia:** insignia package / insignia_registry — wallet-scoped records; keys and bytes opaque to platform; app defines meaning.
- **Hydroscope:** Stats by address, update, leaderboard, participants claims.

### 4.6 Ops and Admin

- **Gauge, Sonar, Buoy, Water Quality:** Price discovery (gauge-service, price-converter); chain query proxy (sonar-service, chain-read-helpers); liveness (buoy); readiness (water-quality-service). Gauge requires Corridor; Sonar balance and POST sonar for app backends.
- **Anchor:** Sessions, claims, verify (anchor-service); Regatta submit-score consumes Anchor claim in one tx with Station.
- **Exchange, Barometer:** Station extensions (exchange.move, barometer.move); route re-exports for submit; event schemas partial (polls/surveys, auctions/bids).
- **Harbor Master:** Platform ops (harbor-master-service, verifyHarborMasterAccess); health, verify-wallet, wallet-reserves, ecosystems, migrate-ecosystem-data.
- **Admin:** App-scoped admin under /api/admin (reservoir list-players, tide/run) with Corridor; no app/game keys on platform.

### 4.7 Tide and Migration

- **Tide:** Scheduler for event lifecycle (upcoming→active, active→past) and distribution triggers; get-chain-timestamp for chain time; distribution-executor for payouts. Admin trigger: POST /api/admin/tide/run.
- **Migration:** Migration-service for tournament, stats, and inventory migration from legacy to platform layout; used for one-time or phased cutover.

### 4.8 Ecosystem-Only Config and Audit

- **Ecosystem-only:** All config and registry usage is ecosystem-scoped (EcosystemAppRegistry, EcosystemAppConfigRegistry); no CHART_APP_REGISTRY_OBJECT_ID or app_id-only Chart/Helm in code. SERVICES_AUDIT_LIST.md documents every service and route checked. Station uses its own event registry (app_id → event registry ID) for events; that is not Chart’s AppRegistry.

---

## 5. Patterns and Practices in Use

- **Build-and-sign everywhere:** For any operation requiring the app’s or game’s wallet, the platform exposes a **build** endpoint and returns an unsigned transaction; the app/game signs and submits. The platform never holds app/game private keys. Execute (platform signs) only when the platform owns the capability. Documented in docs/Platform Documentation/concepts/build-and-sign-flow.md.

- **Opaque payloads:** Contracts use vector<u8> or generic tables for app data (entry_data, submission_data, config values, stat keys, item keys); the app defines schema and meaning. No fixed field names (e.g. score, coins) in platform contracts; Regatta submission_data is app-defined JSON.

- **No-defaults policy:** No implicit API key or ecosystem ID. Every ecosystem has its own ECOSYSTEM_<id>_API_KEY; requests must send cap and key explicitly. Prevents cross-ecosystem data access and supports multi-tenancy.

- **Single distribution path (Sustain):** All reward and payout flows (Regatta, milestones, achievements, airdrops) go through Sustain; idempotency and audit in one place. Rain = evaluate/claim/claimed + definitions in Aquifer + stats from Hydroscope.

- **Service-per-module:** Each Aqueduct module has a dedicated service under lib/services/<module>/; routes call into these services. Shared behavior (auth, validation, errors) in auth/, platform/validators, platform/errors. Batch and build logic in channel/batch, sustain/distribution, etc.

- **Corridor at the gateway:** All app-scoped routes require Corridor (API key + capability object ID); ecosystem_id and app_id derived from cap only. CONFIG_MISSING when missing. Harbor Master for platform-only routes.

- **Generic contracts:** All platform Move modules are generic (opaque payloads, app-scoped identity); no game-specific types. Verified in contracts docs (PLATFORM_GENERIC_VS_GAME_SPECIFIC.md). Game contracts (e.g. suitwo_game) depend on platform; platform does not depend on any game.

---

## 6. Known Limitations and Future Work

**Current scope:** Platform is **SaaS** for multiple apps; no end-user UI (admin page may exist). **No separate database** for event/participant data (all on-chain). **Distribute (execute)** is disabled (410); build-distribute is the only path. **Anchor and Barometer/Exchange** event schemas are partial (structured poll/survey, bid/offer support to be completed). **Water Quality** signals (turbidity, temperature, pressure) can be extended with real metrics (RPC latency, rate limits).

**Not started / future:** **Logbook** (audit trail, execution trace); **Lighthouse** (advisory alerts, non-blocking warnings); **Dock** (not started). **Sustain Dew/Mist**, **Marina**, **Workshop**, **Charter**, **Arbiter**, **Levee**, **Beacon** are future or parked. **Dispatch** (outbound job queue, retries, rate limits) not started. See Aqueduct Platform/docs/PLATFORM_BUILD_OUT_REMAINING.md.

**What to add next (for roadmap):** Full Anchor alignment with ANCHOR_DESIGN; Barometer/Exchange submission and resolution schemas; Water Quality real signals; Logbook and Lighthouse; rate limiting and killswitch; config and feature flags (full); in-app notifications (inbox). Stating limitations and future work clearly shows prioritization and product thinking.

---

## 7. What You Can Say About This Work

When promoting yourself or discussing this project, you can accurately say that you (with your team or AI assistance) have:

- Designed and built **Aqueduct Platform**: **shared infrastructure on Sui** as **SaaS** for multiple apps/ecosystems; **apps define, platform executes**; **build-and-sign** pattern throughout; no app/game keys on platform.
- Delivered **modular API surface**: Game Pass (Reservoir), Store (Terminal, Provisions, Stockroom), Events (Station), Regatta (tournaments), Milestones (Sustain: Rain), Sustain (distribution), Reservoir (balances/items/merge), Glacier (vaults), Shipyard (NFTs), Hydroscope (stats), Gauge (prices), Aquifer (definitions), Insignia (wallet-scoped player records), Channel (tx build/estimate/batch/execute), Anchor, Sonar, Config, Admin, Health.
- Implemented **Corridor** (app-scoped auth via caps, identity from cap only) and **Harbor Master** (platform ops); **no-defaults** policy for multi-tenancy; **ecosystem-only** config (no app_id-only Chart/Helm).
- Wrote and deployed **generic Sui Move** contracts: core (chart_registry, chart, harbor_master), station, regatta, reservoir, provisions, terminal, glacier, sustain, helm, hydroscope, shipyard, aquifer, insignia, anchor, exchange, barometer, estuary, stockroom — all **opaque payloads**, app-defined keys and semantics.
- Built **Tide** (scheduler for event lifecycle and distribution), **Anchor** (sessions and claims for Regatta submit-score), and **migration** services for cutover from legacy to platform.
- Architected for **multi-tenant SaaS**: clear separation between read scope (ecosystem) and write/signer (app/game); single distribution path (Sustain); service-per-module backend; exhaustive documentation for trim-later use.

This document is the explicit, expanded reference for that work.

---

## 8. Positioning for Applications

- **Blockchain infra / SaaS:** Emphasize shared layer on Sui, multi-tenant, app-agnostic contracts and APIs; apps define, platform executes; no database (on-chain storage).
- **Security and auth:** Build-and-sign, no app keys on platform, Corridor and Harbor Master separation, no-defaults policy.
- **Full-stack platform:** Next.js backend, many Move packages, clear service boundaries, exhaustive Codebase and File Reference and sections 1–6 for trimming later.

Use the **Key Points** and **Codebase and File Reference** to keep or drop specifics; condense Section 7 for resume or one-pagers.

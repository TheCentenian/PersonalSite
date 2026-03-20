# Portfolio & Accomplishments: SuiTwo Market Shooter

This document describes, in explicit and expanded form, what has been built in the **SuiTwo Market Shooter** application: game frontend, backend API, Sui blockchain integration, and smart contracts. It is intended for portfolio use and communicating scope of work—without focusing on product-specific marketing.

**How to use this document:** The content is intentionally **exhaustively documented** (detailed sections, concrete file paths, API routes, service and module names, env vars, data flows) so you can trim later. You can **condense and rewrite** for a one-page summary, resume bullets, or keep the long form as a master reference. The **Codebase and File Reference** section gives a single place to find paths and names when you need to keep or drop specifics. Sections **7** and **8** are tuned for applications and interviews; the rest is the full technical and narrative backing.

**Relationship to platform:** SuiTwo Market Shooter is **one app**. The **Aqueduct Platform** (shared infrastructure—wallet, events, game pass, tournaments, provisions) is a **separate entity** documented in its own portfolio file. This document covers only the shooter game product.

---

## Key Points: SuiTwo Shooter in One Place

- **Product:** **SuiTwo Market Shooter** — market-themed auto-fire shooter on **Sui**. Player controls SuiTwo, fighting bearish forces (enemies and bosses) on a scrolling market chart. Four difficulty tiers, 10-level orb progression, desktop and mobile. Scores and progression are **verified on-chain**.

- **Stack:** **Frontend:** vanilla JavaScript game (canvas/rendering, systems, UI), served via custom dev server or Vercel; **Backend:** Next.js API (TypeScript); **Contracts:** Sui Move (suitwo_game package; platform contracts used for game_pass, events, tournaments, provisions). Wallet integration via shared wallet module.

- **Wallet & identity:** Players **connect a Sui wallet** for identity; used for leaderboard, store, achievements, tournaments, game pass, and badge. Demo mode available without wallet. Optional token gatekeeping (e.g. minimum $MEWS balance) for full access.

- **Verified scores & leaderboard:** Scores are **submitted via the backend**; backend builds and signs score-submission transactions. Contract enforces **MIN_DISTANCE** and **MIN_SCORE**; session IDs prevent duplicate submissions. Leaderboard and player stats are **on-chain** (PlayerStats: total_games, best_score, best_distance, best_coins, best_bosses_defeated, best_enemies_defeated, best_coin_streak, etc.).

- **Credits & tickets:** **Credits** are used **only for playing the regular game** (one credit per full game). **Tickets** are used **only for tournaments** (one ticket per game in a tournament). Credits are **not** used in the store; store purchases use a separate payment method.

- **Store & inventory:** Premium store (extra lives, force field start, orb level, tractor beam, slow time, destroy all, boss kill shot); item catalog on-chain (platform provisions); purchase and consume flows; **badge tier grants store and gameplay discounts**; item merging (e.g. 3× L1 → 1× L2) with badge discount on merge cost.

- **Achievements & milestones:** Progression milestones reward **credits** and **items**; categories (games played, score, distance, coins, bosses, enemies, streak, leaderboard); backend/platform evaluates stats and returns eligible milestones; **claim via signed transaction**; achievement_system records claims (no double-claim).

- **Badge (soulbound NFT):** Dynamic NFT that **evolves with play**; **non-transferable (soulbound)**. Tiers: Starter → Common → Uncommon → Rare → Epic → Legendary. Benefits: **store discount**, **gameplay discount**, **cheaper tournament tickets**. Core differentiator.

- **Tournaments:** Time-limited, category-specific; **top 3+ rewarded with tokens**; rewards customizable; **creators earn a creator reward** from entry fees when the event ends. Create, enter, submit score, leaderboard, distribute rewards; ticket values can vary (e.g. badge discount).

- **Game pass:** Credits and tickets held on game pass; consume-credit and start-game flows; admin tools for credits/tickets; integration with platform game_pass module.

- **Architecture:** **Frontend** (game loop, systems, rendering, UI, wallet/store/tournament/achievement panels) in `apps/shooter-game/frontend/`. **Backend** (Next.js API: scores, leaderboard, store, inventory, achievements, tournaments, game-pass, badges, config, admin, platform proxy) in `apps/shooter-game/backend/`. **Contracts** (suitwo_game Move: score_submission, achievement_system, badge_system, game_config, mews, tournaments; platform supplies provisions, events, game_pass). **Platform** is separate (see Aqueduct Platform portfolio).

- **Security:** Anti-cheat (min distance/score on-chain, digest verification, backend validation); wallet-signed actions for score submit, store purchase, achievement claim, tournament entry; admin and config behind appropriate checks.

- **Deployment:** Frontend on Vercel (or custom server on port 8000); backend on Vercel API or Node (port 3000); wallet module as UMD bundle. Contract deployment IDs in `apps/shooter-game/contracts/suitwo_game/DEPLOYMENT_IDS_NEW.md` (do not edit .env; record there).

- **Environment variables:** Backend: `PLATFORM_BACKEND_URL`, `API_BASE_URL`, `APP_ID`, `ECOSYSTEM_ID`, per-ecosystem `ECOSYSTEM_<id>_API_KEY`, `CORRIDOR_CAPABILITY_OBJECT_ID_*`, `CORRIDOR_ADMIN_CAP_OBJECT_ID_*`, `SUI_NETWORK`, `SUI_RPC_URL`, `GAME_WALLET_PRIVATE_KEY`, token config (`MEWS_TOKEN_TYPE_ID_*`, `MIN_TOKEN_BALANCE`), Terminal/Premium Store admin cap, MEWS treasury/package if minting, `PORT`, `CORS_ORIGIN`, `JWT_SECRET`. See `apps/shooter-game/backend/env-template.md`. Frontend: no secrets; backend URL and wallet module URL from meta tags or config.

- **Scripts:** Root: `npm run dev` (frontend server, port 8000), `npm run dev:all` (backend + frontend + wallet module), `npm run build:frontend` (production build, copies platform config). Backend: `npm run dev`, `npm run build`, `npm run start` (port from env, e.g. 3001). Frontend auto-detects localhost for API and wallet module URLs.

- **Backend builds, player signs:** Score submit, store purchase, achievement claim, tournament entry — backend builds transaction (or gets build from platform); frontend/wallet signs and submits. Backend holds **game admin** key for catalog/admin operations; never holds player keys.

- **Key data flows:** Score: frontend sends replay/session → backend validates (MIN_DISTANCE, MIN_SCORE, digest) → backend builds score-submit tx → player signs → on-chain PlayerStats update. Store: catalog from platform/Provisions; purchase/consume via backend + platform Channel; inventory per address. Achievements: backend/platform evaluates stats → eligible milestones → claim builds tx → player signs. Tournaments: create/enter/submit-score/distribute via backend and platform Regatta/Station.

- **Logging and observability:** Frontend: console and toasts for errors/feedback. Backend: `lib/services/platform/logging/platform-logger.ts`; API handler and services log where added. Config and health: `GET /api/config` (runtime config for frontend); admin and platform health as implemented. No mandated APM; logs suitable for deployment stdout.

- **Modular for maintainability:** Frontend: systems (core, consumables, collectibles, store), UI services per feature (store, leaderboard, tournament, achievement, badge, game-data flow). Backend: services per domain (badge, tournament, achievements/milestones, store/catalog, wallet/transaction-helpers, rewards, platform client); shared api-handler, auth, request-context, validators.

- **Known limitations and future work:** Game contract (suitwo_game) is bypassed for deployment per workspace rules (platform deployment only); score_submission, achievement_system, badge_system, game_config, tournaments may live in game package or platform. Boss burn / token economy (design). Natural next steps: full mobile polish, additional tournament types, expanded badge benefits, analytics.

If you have not worked on the project in a few months, you can still accurately describe it using this document; the technical content reflects the current codebase and can be updated when you resume work.

---

## Codebase and File Reference

Paths are relative to the project root unless noted.

**Frontend (apps/shooter-game/frontend/):**

- **Entry:** `index.html` — game entry; loads config, wallet module, game bundle.
- **Game core:** `src/game/main.js` — game bootstrap; `src/game/systems/core/game-initialization.js`, `game-state.js`, `game-state-manager.js`, `game-lifecycle.js`, `game-update.js`, `lazy-loader.js` — core loop and state.
- **Systems:** `src/game/systems/` — `consumables/` (consumable-system.js, destroy-all.js), `collectibles/collectibles.js`, `store/item-consumption.js`.
- **UI / services:** `src/game/systems/ui/` — `game-service.js`, `game-pass-service.js`, `menu-service.js`, `menu-system.js`, `wallet-service.js`, `store-service.js`, `store-modal.js`, `store-inventory.js`, `store-inventory-tab.js`, `store-purchase-flow.js`, `store-item-loader.js`, `store-game-pass-tab.js`, `store-tournament-tickets-tab.js`, `store-wallet-connection.js`, `store-ui.js`, `store-ui-updates.js`, `store-item-selection.js`, `store-item-rendering.js`, `store-utils.js`; `leaderboard-system.js`, `leaderboard-service.js`, `leaderboard-ui.js`, `leaderboard-modal.js`, `leaderboard-score-submission.js`, `leaderboard-local.js`, `leaderboard-pagination.js`; `achievement-progress.js`; `tournament-modal.js`, `tournament-creation-modal.js`; `badge-ui.js`, `badge-ui-mint.js`, `badge-ui-modals.js`, `badge-ui-utils.js`; `game-data-flow-wallet.js`, `game-data-flow-badge.js`, `game-data-flow-service.js`, `game-data-flow-modals.js`, `game-data-flow-loaders.js`, `game-data-state.js`; `loading-modal.js`, `loading-manager.js`; `how-to-play-content-generator.js`; `token-balance-utils.js`, `toast-notifications.js`, `settings-management.js`, `sound-test-system.js`, `ui-initialization.js`.
- **Blockchain (frontend):** `src/game/blockchain/score-submission.js`, `badge-service.js`, `replay-recorder.js`.
- **Rendering:** `src/game/rendering/` — `main-rendering.js`, `player/player-rendering.js`; rendering and asset registry elsewhere under `src/game/`.
- **Audio:** `src/game/audio/audio-manager.js`, `audio/utils/audio-sample-config.js`, `audio-sample-loader.js`.
- **Config:** `src/config/` — app-specific contract and API config; platform config loaded from platform or copied during build.

**Backend (apps/shooter-game/backend/):**

- **Framework:** Next.js (App Router); `app/api/` for API routes.
- **Scores:** `app/api/scores/submit/route.ts`, `app/api/scores/verify/route.ts`, `app/api/scores/verify/[digest]/route.ts`, `app/api/scores/trace/[address]/route.ts`, `app/api/scores/migrate/route.ts`.
- **Leaderboard:** `app/api/leaderboard/route.ts`.
- **Store:** `app/api/store/items/route.ts`, `app/api/store/purchase/route.ts`, `app/api/store/consume/route.ts`, `app/api/store/merge/route.ts`, `app/api/store/inventory/[address]/route.ts`, `app/api/store/transaction/[digest]/route.ts`, `app/api/store/verify-prices/route.ts`, `app/api/store/clear-price-cache/route.ts`, `app/api/store/migrate/route.ts`; admin: `app/api/store/admin/catalog/route.ts`, `app/api/store/admin/catalog/[itemId]/route.ts`, `app/api/store/admin/catalog/[itemId]/levels/[level]/route.ts`, `app/api/store/admin/catalog/initialize/route.ts`, `app/api/store/admin/register-catalog/route.ts`, `app/api/store/admin/add-items/route.ts`.
- **Inventory:** `app/api/inventory/[address]/route.ts`, `app/api/inventory/consume/route.ts`; admin: `app/api/admin/inventory/add-items/route.ts`, `app/api/admin/inventory/remove-items/route.ts`, `app/api/admin/inventory/discover-wallets/route.ts`.
- **Achievements:** `app/api/achievements/check/route.ts`, `app/api/achievements/claim/route.ts`, `app/api/achievements/progress/route.ts`.
- **Milestones:** `app/api/milestones/config/route.ts`, `app/api/milestones/definitions/route.ts`; admin: `app/api/admin/milestones/route.ts`, `app/api/admin/milestones/initialize/route.ts`, `app/api/admin/milestones/clear/route.ts`, `app/api/admin/milestones/migrate/route.ts`, `app/api/admin/milestones/discover-wallets/route.ts`, `app/api/admin/milestones/users/[address]/route.ts`, `app/api/admin/milestones/users/[address]/clear-claims/route.ts`, `app/api/admin/milestones/users/[address]/unclaim/route.ts`.
- **Tournaments:** `app/api/tournaments/route.ts`, `app/api/tournaments/[id]/route.ts`, `app/api/tournaments/[id]/leaderboard/route.ts`, `app/api/tournaments/[id]/submit-score/route.ts`, `app/api/tournaments/[id]/distribute-rewards/route.ts`, `app/api/tournaments/[id]/distribute-creator-reward/route.ts`, `app/api/tournaments/create/route.ts`, `app/api/tournaments/enter/route.ts`, `app/api/tournaments/notify-created/route.ts`, `app/api/tournaments/past/route.ts`, `app/api/tournaments/my-tournaments/route.ts`, `app/api/tournaments/calculate-reward-cost/route.ts`, `app/api/tournaments/creator/[address]/rewards/route.ts`, `app/api/tournaments/create-anchor-session/route.ts`, `app/api/tournaments/migrate/route.ts`; admin: `app/api/admin/tournaments/create/route.ts`, `app/api/admin/tournaments/[id]/edit/route.ts`, `app/api/admin/tournaments/[id]/delete/route.ts`, `app/api/admin/tournaments/[id]/force-delete/route.ts`, `app/api/admin/tournaments/[id]/distribute-rewards/route.ts`, `app/api/admin/tournaments/distribute-by-event/route.ts`, `app/api/admin/tournaments/list-players/route.ts`, `app/api/admin/tournaments/add-tickets/route.ts`, `app/api/admin/tournaments/remove-ticket/route.ts`, `app/api/admin/tournaments/fix-tickets/route.ts`, `app/api/admin/tournaments/scheduler/route.ts`, `app/api/admin/tournaments/move-upcoming-to-active/route.ts`, `app/api/admin/tournaments/move-to-past/route.ts`, `app/api/admin/tournaments/ticket-info/route.ts`, `app/api/admin/tournaments/default-sustain-config/route.ts`, `app/api/admin/tournaments/default-sustain-config/initialize/route.ts`; legacy: `app/api/admin/legacy/tournaments/query-old-tickets/route.ts`.
- **Game pass:** `app/api/game-pass/start-game/route.ts`, `app/api/game-pass/consume-credit/route.ts`, `app/api/game-pass/[address]/route.ts`, `app/api/game-pass/purchase-pack/route.ts`, `app/api/game-pass/migrate/route.ts`; admin: `app/api/admin/game-pass/credits/add/route.ts`, `app/api/admin/game-pass/credits/remove/route.ts`, `app/api/admin/game-pass/credits/set/route.ts`, `app/api/admin/game-pass/tickets/add/route.ts`, `app/api/admin/game-pass/tickets/remove/route.ts`, `app/api/admin/game-pass/discover-wallets/route.ts`, `app/api/admin/game-pass/list-players/route.ts`, `app/api/admin/game-pass/verify-capability/route.ts`, `app/api/admin/game-pass/fix-tickets/route.ts`.
- **Badges:** `app/api/badges/[address]/route.ts`, `app/api/badges/[address]/check-upgrade/route.ts`, `app/api/badges/mint/route.ts`, `app/api/badges/upgrade/route.ts`; admin: `app/api/admin/badges/discover-wallets/route.ts`.
- **Game config:** `app/api/game-config/route.ts`, `app/api/game-config/admin/route.ts`, `app/api/game-config/admin/threshold/route.ts`, `app/api/game-config/admin/single-game/route.ts`, `app/api/game-config/admin/ticket-bundle/route.ts`, `app/api/game-config/admin/pack/route.ts`, `app/api/game-config/admin/initialize/badges/route.ts`, `app/api/game-config/admin/initialize/credits/route.ts`, `app/api/game-config/admin/initialize/ticket-bundles/route.ts`.
- **Stats:** `app/api/stats/[address]/route.ts`; admin: `app/api/admin/stats/discover-wallets/route.ts`.
- **Platform proxy:** `app/api/platform/config/route.ts`, `app/api/platform/tx/route.ts`, `app/api/platform/tx/execute/route.ts`, `app/api/platform/tx/estimate/route.ts`, `app/api/platform/tx/batch/route.ts`, `app/api/platform/stats/update/route.ts`, `app/api/platform/stats/[address]/route.ts`, `app/api/platform/milestones/evaluate/route.ts`, `app/api/platform/tokens/balance/[address]/route.ts`.
- **Config & admin:** `app/api/config/route.ts`; `app/api/admin/verify-wallet/route.ts`, `app/api/admin/wallet-reserves/route.ts`, `app/api/admin/vaults/route.ts`, `app/api/admin/vaults/[vaultId]/route.ts`, `app/api/admin/vaults/[vaultId]/payouts/route.ts`, `app/api/admin/credits/list-players/route.ts`, `app/api/admin/add-items/route.ts`.
**Backend lib (apps/shooter-game/backend/lib/):**

- **API and auth:** `api/api-handler.ts` — API handler utilities; `api/request-context.ts` — request context; `auth.ts` — auth helpers; `cors.ts` — CORS.
- **Platform integration:** `services/platform/client/platform-client.ts` — platform API client; `services/platform/app-config/platform-app-config.ts` — app config from platform; `services/platform/errors/platform-errors.ts`, `services/platform/validators/platform-validators.ts`; `services/platform/logging/platform-logger.ts`.
- **Config:** `services/config/game-config/game-config-service.ts`; `services/config/base-url/api-base-url.ts`.
- **Badge:** `services/badge/core/badge-service.ts`, `utilities/badge-utilities.ts`, `images/badge-images.ts`, `validation/badge-image-validator.ts`, `reconciliation/badge-reconciliation.ts`, `retry/badge-retry-queue.ts`, `cache/badge-request-cache.ts`, `cache/badge-image-cache.ts`.
- **Tournament:** `services/tournament/core/tournament-service.ts`, `cost/reward-cost-calculator.ts`, `creator/creator-reward-service.ts`, `rewards-config/default-rewards-config.ts`, `default-rewards-constants.ts`.
- **Achievements:** `services/achievements/core/achievement-service.ts`, `milestones/milestones-service.ts`, `level/milestone-level-manager.ts`.
- **Store:** `services/store/catalog/provisions-service.ts`, `provisions.ts`, `item-catalog.ts`, `catalog-order.ts`.
- **Wallet:** `services/wallet/admin/admin-wallet-service.ts`, `transaction-helpers/transaction-helpers.ts`, `payments/payment-transaction-builder.ts`, `balance/balance-checker.ts`.
- **Payments:** `services/payments/converter/price-converter.ts`.
- **Rewards:** `services/rewards/executor/rewards-platform-executor.ts`, `core/rewards-service.ts`, `batch/batch-reward-distribution.ts`.
- **Validation (score):** `services/validation/score/score-submit-guard.ts`, `score-validation.ts`, `replay-scorer.ts`, `replay-schema.ts`.
- **Migration:** `services/migration/migration-api-client.ts`.

**Environment variables (shooter-game backend):**

- **Platform:** `PLATFORM_BACKEND_URL`, `API_BASE_URL`; `APP_ID`, `ECOSYSTEM_ID`; `ECOSYSTEM_<id>_API_KEY` (per-ecosystem); `CORRIDOR_CAPABILITY_OBJECT_ID_*`, `CORRIDOR_ADMIN_CAP_OBJECT_ID_*`.
- **Sui:** `SUI_NETWORK`, `SUI_RPC_URL`, `SUI_*_RPC_URL`, `SUI_GAS_BUDGET`.
- **Admin:** `GAME_WALLET_PRIVATE_KEY` (game admin signs store/admin tx).
- **Token gatekeeping:** `MEWS_TOKEN_TYPE_ID_*`, `USDC_TOKEN_TYPE_ID_*`, `MIN_TOKEN_BALANCE`.
- **Terminal/Store:** `PREMIUM_STORE_ADMIN_CAPABILITY_OBJECT_ID_*` (or Terminal brand vars).
- **MEWS (if game mints):** `MEWS_TREASURY_CAP_OBJECT_ID_*`, `MEWS_PACKAGE_ID_*`.
- **Server:** `PORT`, `NODE_ENV`, `CORS_ORIGIN`, `NEXT_PUBLIC_API_BASE_URL`, `JWT_SECRET`. See `apps/shooter-game/backend/env-template.md`. **Do not edit .env** for deployment IDs; record in `DEPLOYMENT_IDS_NEW.md` per workspace rules.

**Key data flows (API contracts):**

- **Score submit:** Frontend sends session/replay → POST scores/submit → backend validates (MIN_DISTANCE, MIN_SCORE, digest, replay-scorer) → backend builds score-submit tx (or platform) → returns for player sign → on-chain PlayerStats and session registry update. Verify: scores/verify, scores/verify/[digest]; trace: scores/trace/[address].
- **Leaderboard:** GET leaderboard → backend/platform returns ranked list from on-chain or cached stats.
- **Store:** Catalog from platform Provisions; GET store/items; POST store/purchase (backend + platform Channel); POST store/consume, store/merge; GET store/inventory/[address], store/transaction/[digest]. Admin: catalog CRUD, add-items (game signs).
- **Achievements:** GET achievements/check, achievements/progress; POST achievements/claim (backend/platform builds tx, player signs). Milestones: config, definitions; admin initialize/clear/migrate, users/[address].
- **Tournaments:** Create, enter, submit-score, leaderboard, distribute-rewards, distribute-creator-reward; admin create/edit/delete, tickets, scheduler, default-sustain-config. Platform Regatta/Station under the hood.
- **Game pass:** start-game, consume-credit, [address], purchase-pack; admin credits/tickets.
- **Badges:** [address], check-upgrade, mint, upgrade; admin discover-wallets. Platform Shipyard for mint/upgrade.
- **Config:** GET config (runtime for frontend); game-config routes for thresholds, ticket-bundle, pack, initialize.

**Logging and observability:** Backend: platform-logger and console where used; api-handler and services log errors and key steps. Frontend: console and toasts. Config: GET /api/config. Health: as implemented (platform or backend health endpoints).

**Contracts (apps/shooter-game/contracts/suitwo_game/):**

- **Package:** suitwo_game (Sui Move). Game-specific modules; platform (aqueduct_platform) supplies shared modules (provisions, events, game_pass, tournaments).
- **Game modules (suitwo_game):** score_submission (score verification, PlayerStats, session registry), achievement_system (milestone definitions, claim tracking), badge_system (badge mint/update, tier progression), game_config (config and thresholds), mews (token type / economy), tournaments (creation, entry, leaderboards, rewards). **Note:** Per workspace rules, game contract is bypassed for deployment (platform deployment only); module list reflects design.
- **Source paths:** `sources/mews.move` (in-repo game source); other modules may be in same package or platform — see platform docs and build output. Build: `build/suitwo_game/sources/`.
- **Platform (separate):** provisions (item catalog), events, game_pass, Regatta/Station — see Aqueduct Platform portfolio.
- **Deployment:** `DEPLOYMENT_IDS_NEW.md` for package/object IDs (do not edit .env); `README.md`, `DEPLOYMENT.md` for deploy steps.

**Scripts and config:**

- **Root:** `npm run dev` (frontend server, port 8000), `npm run dev:all` (backend + frontend + wallet module), `npm run build:frontend` (production build, copies platform config).
- **Backend:** `apps/shooter-game/backend/` — `npm run dev`, `npm run build`, `npm run start` (port from env, e.g. 3001).
- **Frontend config:** Meta tags for `backend-url`, `wallet-module-url`; auto localhost detection when on localhost; `src/config/` app-specific.

---

## 1. Technologies, Tools, and Libraries

### 1.1 Core Framework and Runtime (Frontend)

**Runtime:** Browser; vanilla **JavaScript** (no React/Vue in game core). Entry: `index.html` loads config, wallet module, and game bundle. Game bootstrap in `src/game/main.js`. **Structure:** Systems under `src/game/systems/` — core (game-initialization, game-state, game-state-manager, game-lifecycle, game-update, lazy-loader), consumables (consumable-system, destroy-all), collectibles, store (item-consumption). UI under `src/game/systems/ui/`: game-service, game-pass-service, menu-service, menu-system, wallet-service, store-* (modal, inventory, tabs, purchase-flow, item-loader, wallet-connection, utils), leaderboard-* (system, service, ui, modal, score-submission, local, pagination), achievement-progress, tournament-modal, tournament-creation-modal, badge-ui*, game-data-flow-* (wallet, badge, service, modals, loaders, state), loading-modal, loading-manager, how-to-play-content-generator, token-balance-utils, toast-notifications, settings-management, sound-test-system, ui-initialization. **Rendering:** `src/game/rendering/` (main-rendering, player-rendering); **Audio:** `src/game/audio/` (audio-manager, sample config/loader). **Blockchain (frontend):** `src/game/blockchain/score-submission.js`, `badge-service.js`, `replay-recorder.js`. Config from `src/config/` and platform; meta tags for backend-url, wallet-module-url; auto localhost detection.

### 1.2 Wallet and Build-and-Sign Flow

**Wallet:** Connection and signing use the **shared wallet module** (platform). Frontend calls wallet module for connect, disconnect, sign transaction. **Backend builds, player signs:** For score submit, store purchase, achievement claim, tournament entry — backend (or platform) builds the transaction and returns it for the **player’s wallet** to sign and submit. Backend holds **game admin** key only for catalog/admin operations (e.g. add-items, initialize); it never holds player private keys. Frontend receives unsigned tx (or build params), prompts wallet to sign, then submits to chain or via backend execute where applicable.

### 1.3 Backend

**Next.js** (App Router) with **TypeScript**. All game API routes under `apps/shooter-game/backend/app/api/`: scores (submit, verify, verify/[digest], trace/[address], migrate), leaderboard, store (items, purchase, consume, merge, inventory/[address], transaction/[digest], verify-prices, clear-price-cache, migrate; admin catalog and add-items), inventory ([address], consume; admin add/remove/discover), achievements (check, claim, progress), milestones (config, definitions; admin route, initialize, clear, migrate, discover-wallets, users/[address] CRUD), tournaments (full CRUD, enter, leaderboard, submit-score, distribute-rewards, distribute-creator-reward, create-anchor-session, migrate; admin create/edit/delete, list-players, tickets, scheduler, move-upcoming/move-to-past, ticket-info, default-sustain-config), game-pass (start-game, consume-credit, [address], purchase-pack, migrate; admin credits/tickets, discover, list-players, verify-capability, fix-tickets), badges ([address], check-upgrade, mint, upgrade; admin discover-wallets), game-config (route, admin threshold/single-game/ticket-bundle/pack, initialize badges/credits/ticket-bundles), stats ([address]; admin discover-wallets), platform proxy (config, tx execute/estimate/batch, stats update/[address], milestones evaluate, tokens balance/[address]), config, admin (verify-wallet, wallet-reserves, vaults, credits list-players, add-items). **Lib:** See Codebase and File Reference (Backend lib). Backend uses **platform client** for catalog, Regatta, Reservoir, Sustain, etc.; builds and signs with game admin wallet where required; validates score (replay-scorer, MIN_DISTANCE, MIN_SCORE) and returns player-sign flows for score/store/achievement/tournament.

### 1.4 Smart Contracts

**Sui Move.** Game package **suitwo_game** (apps/shooter-game/contracts/suitwo_game/): score_submission, achievement_system, badge_system, game_config, mews, tournaments (module list reflects design; in-repo source: sources/mews.move; others may be in package or platform). **Platform** package (aqueduct_platform): provisions (item catalog), game_pass, events, Regatta/Station. Deploy with `deploy.js` from contracts folder; IDs in `DEPLOYMENT_IDS_NEW.md`. Per workspace rules, game contract is bypassed for deployment (platform deployment only).

### 1.5 Deployment and Environment

**Frontend:** Served from `apps/shooter-game/frontend/`; production build: `npm run build:frontend` (copies platform config). Deploy to **Vercel** or custom server (port 8000). **Backend:** Next.js deploy to Vercel (API routes) or Node (port from env, e.g. 3001). **Wallet module:** UMD bundle from platform wallet-module; served from frontend or CDN. **Environment:** Backend env vars — see Codebase (Environment variables) and `apps/shooter-game/backend/env-template.md`. No secrets in frontend; contract IDs and deployment outputs recorded in `DEPLOYMENT_IDS_NEW.md` (do not edit .env for deployment IDs).

### 1.6 Security

**Anti-cheat:** Score submission enforces MIN_DISTANCE and MIN_SCORE on-chain; session IDs prevent duplicate submissions; digest verification; backend validation (score-submit-guard, score-validation, replay-scorer). **Wallet-signed actions:** Score submit, store purchase, achievement claim, tournament entry require player wallet to sign; backend never holds player keys. **Admin:** Game admin wallet for catalog and admin operations; admin routes and config behind appropriate checks. **Env-based secrets:** Game admin private key, API keys, platform corridor caps from env; no secrets in frontend.

### 1.7 Logging and Observability

**Frontend:** Console and toasts for errors and user feedback; no server-side logging in game bundle. **Backend:** `lib/services/platform/logging/platform-logger.ts`; api-handler and services log where added. **Config:** GET /api/config returns runtime config for frontend (network, API URL, wallet module URL, etc.). Health endpoints as implemented (backend or platform). No mandated APM; logs suitable for deployment stdout.

### 1.8 Performance and Resilience

**Frontend:** Canvas and game loop tuned for 60fps; lazy loading (lazy-loader); responsive layout and touch for mobile. **Backend:** Platform client and Sui calls with timeouts/retries where configured; validation and guards before building transactions. **Loading states:** Loading-modal, loading-manager, and per-feature loaders in UI. **Caching:** Badge cache (badge-request-cache, badge-image-cache); price and catalog caching where implemented.

### 1.9 Platform Integration

Game backend calls **platform** for: config (Helm), catalog (Provisions/Terminal), Regatta (tournaments create/enter/submit-score/distribute), Reservoir (game pass, credits, tickets), Sustain (milestones evaluate/claim, distribution), Shipyard (badge has-badge, mint, upgrade), Channel (tx build/execute/estimate/batch), Hydroscope (stats), Glacier (vaults). Platform client and app-config in `lib/services/platform/`. Corridor caps and ecosystem API key required for platform routes; see env-template.

### 1.10 Admin UI

Backend includes **admin app** under `app/admin/`: tabs for game config, items, tournaments, badges, milestones, migration, stats, game pass, vaults, wallet reserves, etc. Admin uses game admin wallet and corridor admin cap where needed; wallet discovery and verification utilities. See Codebase for admin route list.

---

## 2. Architecture and Code Organization

### 2.1 Shooter App Boundaries

- **Frontend:** Self-contained under `apps/shooter-game/frontend/`. Game code in `src/game/` (main, systems, rendering, audio, blockchain); config in `src/config/`. Depends on platform only for wallet module and config (URLs, contracts).
- **Backend:** Self-contained under `apps/shooter-game/backend/`. API routes by domain (scores, store, achievements, tournaments, etc.); lib/services for Sui and platform integration; admin app under `app/admin/` for game config, items, tournaments, badges, migration, etc.
- **Contracts:** Game-specific Move in `apps/shooter-game/contracts/suitwo_game/`; platform contracts (provisions, game_pass, events) in Aqueduct Platform repo/folder.

### 2.2 Game Systems (Frontend)

- **Core:** State, lifecycle, update loop, initialization, lazy loading — single responsibility per file.
- **Consumables:** In-run consumables (destroy all, etc.) and store item consumption at start and in-run.
- **Collectibles:** Coins, power-ups, power-downs; orb level cap and tier progression.
- **UI / services:** Game service, game-pass service, menu, wallet, store (modal, inventory, purchase, tabs), leaderboard (system, service, UI, score submission), tournaments (modals, creation), achievements (progress), badge (UI, mint, modals), game-data flow (wallet, badge, loaders, state), loading, how-to-play, toasts, settings, sound test.

### 2.3 Backend API Organization

Routes grouped by feature: **scores** (submit, verify, trace, migrate), **leaderboard**, **store** (items, purchase, consume, merge, inventory, admin catalog), **inventory** (per-address, consume, admin), **achievements** (check, claim, progress), **milestones** (config, definitions, admin CRUD and migrate), **tournaments** (CRUD, enter, leaderboard, submit-score, distribute, creator reward, admin), **game-pass** (start-game, consume-credit, purchase-pack, admin credits/tickets), **badges** (by address, mint, upgrade, admin), **game-config** (read, admin threshold/single-game/ticket-bundle/pack, initialize), **stats**, **platform** (config, tx execute/estimate/batch, stats, milestones evaluate, tokens balance). **Admin** routes for wallet verification, vaults, credits list, add-items, etc. Shared **api-handler** and **services** in lib.

### 2.4 Security and Anti-Cheat

**On-chain:** Score submission enforces MIN_DISTANCE and MIN_SCORE; session IDs prevent duplicate submissions; digest verification. **Backend:** Validation (score-submit-guard, score-validation, replay-scorer), rate limiting and checks before building transactions. **Wallet:** Score submit, store purchase, achievement claim, tournament entry require wallet-signed transactions. Admin and config protected by appropriate auth/checks.

### 2.5 Key Data Flows (Summary)

- **Score:** Frontend sends session/replay → backend validates (MIN_DISTANCE, MIN_SCORE, digest) → backend builds score-submit tx → player signs → on-chain PlayerStats and session registry. Verify and trace routes for debugging and migration.
- **Store:** Catalog from platform Provisions; purchase and consume via backend + platform Channel; inventory and transaction status per address; merge with badge discount. Admin: catalog CRUD, add-items (game admin signs).
- **Achievements:** Backend/platform evaluates stats (Hydroscope/on-chain) → eligible milestones → claim builds tx → player signs; progress and claimed tracked on-chain.
- **Tournaments:** Create (game admin or platform), enter (ticket consumed), submit-score (Anchor + Station flow), leaderboard, distribute-rewards and distribute-creator-reward; platform Regatta/Station and Sustain under the hood.
- **Game pass:** Credits (consume for regular game), tickets (consume for tournament game); start-game, consume-credit, purchase-pack; admin credits/tickets.
- **Badges:** Query by address, check-upgrade, mint (first-time), upgrade (tier); platform Shipyard; store and ticket discounts applied by tier.

### 2.6 Route and Service Organization

**Routes** are grouped by feature under `app/api/`: scores, leaderboard, store, inventory, achievements, milestones, tournaments, game-pass, badges, game-config, stats, platform/*, config, admin/*. Shared **api-handler**, **request-context**, **auth**, **cors** in lib. **Services** per domain: badge (core, utilities, images, validation, reconciliation, retry, cache), tournament (core, cost, creator, rewards-config), achievements (core, milestones, level), store (catalog, provisions), wallet (admin, transaction-helpers, payments, balance), payments (converter), rewards (executor, core, batch), validation (score), platform (client, app-config, errors, validators, logging), config (game-config, base-url), migration (migration-api-client).

### 2.7 Types and Validation

Backend uses TypeScript throughout; request body and query validation (Zod or equivalent) at route level. **Replay schema** (replay-schema.ts) for score submission; **score-validation** and **replay-scorer** for anti-cheat. **Platform validators** (platform-validators.ts) for platform-bound requests. Types and interfaces next to services or in shared modules.

### 2.8 Frontend State and Game Data Flow

Frontend has **no global store** (no Zustand/Redux); game state lives in game-state and game-state-manager; UI state in menu-system and per-feature modules (store, leaderboard, tournament, achievement, badge). **Game-data flow** (game-data-flow-wallet, game-data-flow-badge, game-data-flow-service, game-data-flow-loaders, game-data-state) coordinates wallet and badge data for store discount, ticket eligibility, and display. Config loaded at startup; backend URL and wallet module URL from meta tags or build-time config.

---

## 3. Game Design and Mechanics (Summary)

- **Theme:** Market-themed shooter; enemies and bosses represent bearish forces. **Enemies:** Jeet (T1), Market Maker (T2), Little Bear (T3), Shadow Hand (T4). **Bosses:** Scammer (T1), Market Manipulator (T2), Bear (T3), Shadow Figure (T4). Projectiles and visuals (e.g. red candle for enemy shots) reflect chart elements; scrolling background and lane dividers.
- **Flow:** Connect wallet (or demo) → use credits to play regular game (one credit per game) / tickets for tournaments (one ticket per game in tournament) → earn credits and items from achievements → level up badge (tiers: Starter → Common → Uncommon → Rare → Epic → Legendary) → enter/create tournaments → top 3+ and creators earn.
- **Mechanics:** **Movement:** 3-lane vertical layout; player on left; mouse or touch. **Combat:** Auto-fire; orb level 1–10 (damage/size/fire interval scale; power cap per run = starting orb + 2, recalculated on tier advance). **Tiers:** 1–4 by bosses defeated; tier affects enemy mix and boss difficulty. **Collectibles:** Coins (10 pts), power-ups (green, +1 orb), power-downs (red, −1 orb). **Lives:** Start 3 (or with store Extra Lives); one hit = one life. **Force field:** Activated by coin streak (Level 1 and 2); blocks projectiles. **Consumables:** Store/achievement items — extra lives, force field start, orb level start, tractor beam, slow time, destroy all, boss kill shot. **Scoring:** Enemies (15×tier to 80), boss (50/hit, 5000×tier on kill), coins 10, power-ups 25; distance/speed-based; anti-cheat on submit (MIN_DISTANCE, MIN_SCORE).
- **Game states and UI:** Front page, main menu, in-game HUD (score, lives, tier, boss HP, force field, coin streak, orb level), pause (P), game over, boss warning. Menus: settings (audio, graphics, controls), leaderboard, wallet, store, tournaments, achievements, How to Play (tabbed). **Responsive:** Desktop (mouse, keyboard); mobile (touch, landscape preferred).
- **Audio:** Web Audio API; procedural SFX (shoot, hit, collect, boss, force field, UI); music with dynamic switch for boss fights.
- **Economy:** Credits (regular game only; not used in store). Tickets (tournaments only). Store (separate payment; badge tier = store and gameplay discount, cheaper tickets). Creator reward from tournament entry fees (boost model). Badge: store discount up to 25%, gameplay discount up to 20%, cheaper tickets.

---

## 4. Milestones and Major Accomplishments

### 4.1 Game Foundation

- Full game loop, state, and lifecycle; player, enemies, bosses, projectiles, collision, scoring, tiers, collectibles, lives, force field.
- Orb level system (1–10, power/size/interval); consumables and store item consumption at start and in-run.
- Rendering and audio; responsive layout; desktop and mobile support.

### 4.2 Sui Integration

- Wallet connection (shared module); score submission with backend-built transactions; on-chain verification (MIN_DISTANCE, MIN_SCORE, session IDs).
- PlayerStats on-chain; leaderboard and stats API; token gatekeeping and demo mode.

### 4.3 Store and Inventory

- Premium store (catalog from platform provisions); purchase and consume flows; inventory per address; item merging with badge discount; admin catalog and item management.

### 4.4 Achievements and Badges

- Milestone definitions and evaluation; claim via signed transaction; progress and claim tracking on-chain.
- Badge mint and upgrade; soulbound dynamic NFT; tier-based store and gameplay discounts and cheaper tickets.

### 4.5 Tournaments and Game Pass

- Tournament create, enter, submit score, leaderboard, distribute rewards, creator reward; admin tools and scheduling.
- Game pass: credits and tickets; start-game and consume-credit; purchase pack; admin credits/tickets.

### 4.6 Backend and Admin

- Full Next.js API surface for all features; platform proxy for tx and stats; admin UI for config, items, tournaments, badges, migration, vaults, wallet discovery.

### 4.7 Score Validation and Replay

- Replay recorder (frontend) and replay-scorer, replay-schema, score-validation, score-submit-guard (backend) for anti-cheat; MIN_DISTANCE and MIN_SCORE enforced on-chain; session IDs prevent duplicate submissions; digest verification and trace routes for auditing.

### 4.8 Platform and Game Boundary

- Game backend uses platform for catalog, Regatta, Reservoir, Sustain, Shipyard, Channel, Hydroscope, Helm, Glacier; game-specific logic (score submission, achievement definitions, badge tier rules, game config) in game backend and game contracts where deployed. Clear separation: platform = shared infra; game = product and rules.

---

## 5. Patterns and Practices in Use

- **Backend builds, player signs:** Score submit, store purchase, achievement claim, tournament entry — backend (or platform) builds the transaction; player wallet signs and submits. Backend holds only game admin key for catalog/admin; never player keys.
- **Single source of truth for config:** Backend env and platform app-config; frontend loads config at startup (meta tags or GET /api/config). Contract IDs in DEPLOYMENT_IDS_NEW.md; do not edit .env for deployment IDs per workspace rules.
- **Service-per-domain:** Backend lib organized by domain (badge, tournament, achievements, store, wallet, rewards, validation, platform, config, migration); shared api-handler, auth, request-context. Frontend: systems (core, consumables, collectibles, store), UI services per feature.
- **Anti-cheat and validation:** Replay and session data validated before building score tx; MIN_DISTANCE, MIN_SCORE, digest, session ID on-chain; replay-scorer and score-submit-guard in backend.
- **Economy clarity:** Credits = regular game only; tickets = tournaments only; store uses separate payment; badge tier applies to store, gameplay, and ticket price; creator reward from entry fees documented.
- **Platform as dependency:** Game backend depends on platform (client, app-config, Corridor); frontend depends on wallet module and config; game contracts may depend on platform packages (provisions, game_pass, events).

---

## 6. Known Limitations and Future Work

**Current scope:** **Game contract (suitwo_game)** is bypassed for deployment per workspace rules (platform deployment only); score_submission, achievement_system, badge_system, game_config, tournaments design is documented; in-repo source includes mews.move. **Demo mode** for players without wallet or token balance; optional token gatekeeping (MIN_TOKEN_BALANCE). **Web-only** (responsive; no native mobile app). **Boss burn** (deflationary token burn per boss tier) is design only; activation depends on deployment config.

**What to add next (for roadmap):** Full game contract deployment when in scope; boss burn activation; additional tournament types or categories; expanded badge benefits or visuals; in-app analytics and retention metrics; rate limiting and killswitch for score/store/tournament; full mobile polish or native build. Stating limitations and future work clearly shows prioritization and product thinking.

---

## 7. What You Can Say About This Work

When promoting yourself or discussing this project, you can accurately say that you (with your team or AI assistance) have:

- Shipped **SuiTwo Market Shooter**: market-themed shooter on **Sui** with **verified on-chain scores**, **leaderboard**, and **player stats**; **backend builds, player signs** for score, store, achievements, tournaments.
- Implemented **wallet integration** (shared wallet module), **score submission** (backend-built, contract-verified, replay validation, MIN_DISTANCE/MIN_SCORE), **token gatekeeping**, and **demo mode**.
- Built **premium store** and **inventory** (platform catalog, purchase/consume, item merging, **badge discounts**); **game pass** (credits, tickets, start-game, consume-credit, purchase-pack).
- Delivered **achievements/milestones** (credits and items, claim on-chain via platform Sustain) and **soulbound badge** (tiers, store/gameplay discounts, cheaper tickets; platform Shipyard).
- Implemented **tournaments** (create, enter, submit-score, leaderboard, distribute rewards, **creator reward** from entry fees) via platform Regatta/Station; admin tools and scheduling.
- Architected **frontend** (vanilla JS game loop, systems, rendering, audio, UI services for store/leaderboard/tournament/achievement/badge/game-data flow) and **backend** (Next.js API, services per domain, platform client, admin UI).
- Wrote and integrated **Sui Move** game contracts (suitwo_game: score_submission, achievement_system, badge_system, game_config, mews, tournaments) and used **platform** contracts (provisions, game_pass, events, Regatta).
- Designed for **security and anti-cheat** (on-chain checks, digest verification, replay-scorer, session IDs) and **clear economy** (credits for game only, tickets for tournaments, badge benefits, creator reward).

This document is the explicit, expanded reference for that work.

---

## 8. Positioning for Applications

- **Blockchain gaming:** Emphasize verified scores, on-chain stats, soulbound badge, tournament rewards on Sui, and backend-builds-player-signs flow.
- **Full-stack:** Frontend (game + UI), backend (Next.js API, services, platform integration), and Move contracts in one product.
- **Economy design:** Credits vs tickets, store vs game, badge discounts, creator rewards — clear and documented; platform as shared infra.

Use the **Key Points** and **Codebase and File Reference** to keep or drop specifics; condense Section 7 for resume or one-pagers.

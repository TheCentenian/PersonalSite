# Portfolio & Accomplishments: Visioneer Studios (Paradigm)

This document describes, in explicit and expanded form, what has been built in the **Visioneer Studios** application in this repository: a multi-page web experience, shared UI/state utilities, and an in-progress Sui wallet + transaction layer (testnet-first). It is intended for portfolio use and communicating scope of work—without focusing on product-specific marketing.

**How to use this document:** The content is intentionally **exhaustively documented** (detailed sections, concrete file paths, scripts, module names, and data flows) so you can trim later. You can condense it into resume bullets or keep the long form as a master reference. The **Codebase and File Reference** section is the single place to grab paths and names quickly.

**Relationship to other work:** This is not the SuiTwo Shooter codebase. This repository is **Visioneer/Paradigm**: a website + evolving Web3 layer intended to support a creator/collections/marketplace direction on **Sui**.

---

## Key Points: Visioneer in One Place

- **Product:** **Visioneer Studios / Paradigm** — a multi-page web experience (“Our Vision”, “Environments”, “Factories”, “Manufacturing”, “Design Studios”, “Games”, “Collections”) with an intentionally staged rollout of Web3 features (wallet, balance, NFTs, marketplace, transactions).

- **Stack:** **Frontend:** static HTML/CSS/vanilla JS. **Web3:** Sui wallet integration via `window.suiWallet` plus Sui JSON-RPC provider usage; additional experimental implementation using **@mysten/dapp-kit** + **@tanstack/react-query** exists under `js/sui/`. **Dev server:** `http-server` with HTTPS.

- **Primary runtime model:** There is no backend/API in this repo; the app runs as static assets served locally (or hostable on any static host). Web3 actions talk to wallet + RPC / faucet endpoints directly.

- **Wallet & identity (current):** Identity is the connected **Sui wallet address**. The “connect wallet” flow is encapsulated in `SuiManager` and wired to `#connect-wallet` and `#connect-wallet-large`.

- **Network focus (current):** Testnet-first. `SuiManager` selects `testnet` via `window.suiWallet.selectNetwork('testnet')` and uses testnet fullnode + faucet endpoints.

- **Faucet support:** Includes a “Request Testnet Tokens” action calling the Sui faucet `FixedAmountRequest` flow; after a delay, balance is refreshed.

- **State & UI architecture:** Lightweight in-browser state container (`StateManager`) + UI feedback layer (`FeedbackManager`) + UI builders (`SuiComponents`) composed into an `App` object.

- **NFTs / marketplace direction (scaffolded):** Modules exist for mint/transfer/query NFTs and marketplace list/purchase/listings, but currently contain placeholders like `YOUR_PACKAGE_ID` and generic Move calls. This documents the intended shape.

- **Security headers (hosting config):** `js/sui/security-config.js` exports security headers including CSP `default-src 'self'` (tight default; will require updates when enabling external scripts/features).

- **Deployment & local dev:** `npm run dev` starts an HTTPS static server on port **3000** (`cert.pem`, `key.pem` expected). This is suitable for local testing with wallet extensions that prefer secure contexts.

---

## Codebase and File Reference

Paths are relative to the project root unless noted.

**Frontend (static site):**

- **Primary entry:** `index.html` — main landing (“Welcome | Visioneer Studios”), top navigation to `pages/*.html`, and script includes for state, UI components, Sui manager, and app bootstrap.
- **Additional landing/alt page:** `Home.html` — a separate landing/marketing-style page (also includes a wallet connect button in the header).
- **Styling:** `styles/main.css` plus partials under `styles/base/`, `styles/components/`, `styles/layout/`, `styles/utilities/`.

**App bootstrap & core managers (vanilla JS):**

- **App composition:** `js/app.js` — constructs:
  - `StateManager` (from `js/state.js`)
  - `FeedbackManager` (from `js/feedback.js`)
  - `SuiManager` (from `js/sui-config.js`)
  - `SuiComponents` (from `js/components.js`)
  - binds wallet/testnet events
- **State:** `js/state.js` — `StateManager` with nested state keys (e.g. `wallet.address`) and a subscribe/notify model.
- **Feedback:** `js/feedback.js` — `FeedbackManager` notifications + loading overlay.
- **UI builders:** `js/components.js` — UI element factories:
  - `createNFTCard(nft)` (transfer + list actions)
  - `createMarketplaceItem(listing)` (purchase action)
  - `createTransactionItem(tx)`

**Sui integration (vanilla JS path used by `index.html`):**

- **Sui manager + testnet endpoints:** `js/sui-config.js`
  - `SUI_CONFIG.testnet`: `nodeUrl`, `faucetUrl`, `explorerUrl`
  - `SuiManager.initialize()` checks `window.suiWallet` and creates a JSON-RPC provider
  - `connectTestnetWallet()` selects testnet, connects wallet, optionally prompts faucet usage
  - `requestTestnetTokens()` POSTs to faucet using `FixedAmountRequest`
  - `getBalance()` fetches balance and updates DOM
- **Transaction notes:** `TRANSACTIONS.md` — transaction flow guidance (gas budget strategy, serialization, retry ideas, error handling patterns).

**Feature stubs (directional; requires real contract IDs and object types):**

- **NFT operations:** `js/nft.js` — mint/transfer/getOwnedNFTs via `window.suiWallet.executeMoveCall` / `getObjects` (placeholders for types and `YOUR_PACKAGE_ID`).
- **Marketplace:** `js/marketplace.js` — list/purchase/getListings (placeholders for `YOUR_PACKAGE_ID` and listing type filter).
- **Contracts helper:** `js/contracts.js` — generic execute/query helper stubs (placeholders).
- **Transactions helper:** `js/transactions.js` — skeleton for history/monitoring using `window.suiWallet.*` calls.
- **Collections UI filtering:** `js/collections.js` — UI filter buttons for `.item-card` by category (non-chain).

**Experimental React / dapp-kit path (not wired into `index.html`):**

- **Network config + connection test:** `js/sui/config.js` — devnet fullnode + `testConnection()` using JSON-RPC `sui_getChainIdentifier`.
- **React provider wrapper:** `js/sui/provider.js` — `SuiClientProvider`, `WalletProvider`, `createNetworkConfig`, React Query client, renders `WalletConnection`.
- **React wallet component:** `js/sui/wallet.js` — `WalletConnection` using `@mysten/dapp-kit` `ConnectButton` + `useCurrentAccount`.
- **Alt versioned files:** `js/sui/*1.5.js` — version snapshots of the same concepts.

**Scripts & dev server:**

- `package.json`:
  - **Name:** `visioneer`
  - **Dev:** `npm run dev` → `http-server . -p 3000 --cors -S -C cert.pem -K key.pem`

---

## 1. Technologies, Tools, and Libraries

### 1.1 Core Framework and Runtime (Frontend)

**Runtime:** Browser; static HTML/CSS and vanilla JavaScript. Primary site entry is `index.html` with page navigation to `pages/*.html` and shared JS modules under `js/`.

### 1.2 Wallet and Transaction Flow (Current Implementation)

**Wallet API shape:** The current implementation expects a wallet injected as `window.suiWallet` (extension-style). The connection flow is:

- User clicks `#connect-wallet` or `#connect-wallet-large`
- `App.bindWalletEvents()` calls `SuiManager.connectTestnetWallet()`
- `SuiManager.connectTestnetWallet()`:
  - selects testnet (`window.suiWallet.selectNetwork('testnet')`)
  - connects (`window.suiWallet.connect()`)
  - stores address in `StateManager` (`wallet.address`)
  - updates UI via `updateWalletStatus()`
  - if balance is zero, reveals faucet button

**Balance:** `SuiManager.getBalance()` calls provider `getBalance({ owner: address })` and updates `#balance-display`.

**Faucet:** `SuiManager.requestTestnetTokens()` POSTs a `FixedAmountRequest` to the testnet faucet and refreshes balance after ~3s.

### 1.3 Web3 Feature Surface (Scaffolded)

- **NFT lifecycle (stub):** `js/nft.js` outlines mint/transfer/getOwnedNFTs via Move calls.
- **Marketplace (stub):** `js/marketplace.js` outlines list/purchase/listings retrieval.
- **Contracts helper (stub):** `js/contracts.js` outlines generic execute/query helpers.
- **Transactions (notes + stub):** `TRANSACTIONS.md` documents best practices; `js/transactions.js` sketches history/status polling.

These modules currently use placeholders such as `YOUR_PACKAGE_ID` and generic object filters; completing them requires actual contract deployment IDs and concrete object type strings.

### 1.4 Libraries Present in `package.json`

- `@mysten/sui` and `@mysten/sui.js` (Sui client tooling)
- `@mysten/dapp-kit` (wallet connection + providers; used in the experimental React path)
- `@tanstack/react-query` (used in the experimental React path)
- `qrcode.react` (dependency present; not currently referenced by the static pages)

### 1.5 Local Development / Serving

The app is served as static files using `http-server` over HTTPS (port 3000). HTTPS is important for secure-context features and smoother wallet-extension behavior.

### 1.6 Security and Hardening (Current)

`js/sui/security-config.js` defines security headers (XFO deny, nosniff, XSS protection) and a strict CSP `default-src 'self'`. When enabling external scripts (e.g. remote SDKs, explorers, analytics), CSP will need to be updated intentionally.

---

## 2. Architecture and Code Organization

### 2.1 Frontend Boundaries

- **Site pages:** HTML under root `index.html` and `pages/`.
- **Shared JS modules:** Under `js/`, feature-oriented and framework-free.
- **Sui integration (vanilla path):** `js/sui-config.js` provides a `SuiManager` consumed by `App`.
- **Sui integration (React path):** `js/sui/*` includes a separate dapp-kit architecture not currently wired to the static page build.

### 2.2 State, Feedback, and UI Composition

- `StateManager` is a minimal nested-key state store with subscriptions.
- `FeedbackManager` centralizes toasts/notifications + loading overlays.
- `SuiComponents` builds UI blocks for NFTs, marketplace listings, and transactions and wires button actions to the corresponding handler modules.

### 2.3 Key Data Flows (Current)

- **Wallet connect + UI toggle:** Click connect → `connectTestnetWallet` → store `wallet.address` → `updateWalletStatus` updates DOM and toggles `#web3-connect` / `#web3-dashboard`.
- **Balance refresh:** Wallet connected → provider `getBalance` → update `#balance-display`.
- **Faucet request:** Click request tokens → POST faucet request → delayed refresh via `updateWalletStatus()`.

---

## 3. Product Direction (Summary)

Visioneer Studios positions as a creator ecosystem spanning:

- **Live & Explore / Build & Create / Style & Customize / Play & Compete**
- **Achieve & Collect** as the on-chain assets and collections layer

The current repository has implemented the site structure and the beginning of a testnet Sui integration; the on-chain asset and marketplace actions are scaffolded for future completion.

---

## 4. Milestones and Major Accomplishments

### 4.1 Website and Navigation Foundation

- Multi-page site with consistent navigation and card-based category entry points (`index.html`, `Home.html`, `styles/*`).

### 4.2 App Core Utilities

- State container (`StateManager`), user feedback system (`FeedbackManager`), and UI component factories (`SuiComponents`) for a maintainable feature buildout.

### 4.3 Sui Wallet + Testnet Onboarding

- Wallet detection and connection flow (`SuiManager`), testnet selection, balance readout, and faucet request flow.

### 4.4 NFT / Marketplace / Contract Action Scaffolding

- Directional modules for NFT mint/transfer/query and marketplace list/purchase/listings, ready to be wired to real deployed Move packages.

### 4.5 Alternate dapp-kit Architecture (Exploration)

- A separate React/dapp-kit implementation path under `js/sui/` demonstrating a more scalable wallet/provider architecture using Sui Client Provider and React Query.

---

## 5. Patterns and Practices in Use

- **Composable managers:** `App` composes state + feedback + Sui manager + UI components.
- **UI feedback first:** All wallet operations are wrapped in loading overlays and errors surface via a centralized notification system.
- **Testnet-first onboarding:** Wallet connection assumes testnet and includes faucet support for new wallets.
- **Explicit “stub vs real” separation:** Modules that require contract IDs intentionally keep placeholders (`YOUR_PACKAGE_ID`) to make integration points obvious.

---

## 6. Known Limitations and Future Work

**Current limitations:**

- Web3 dashboard in `index.html` is currently commented out; wiring and UI polish for the on-chain dashboard is pending.
- NFT/marketplace/contract modules contain placeholders (package IDs, object types) and cannot execute meaningfully until Move packages are deployed and IDs are configured.
- Wallet integration assumes an injected `window.suiWallet` API; compatibility and standards alignment may require adopting wallet-standard/dapp-kit end-to-end.

**Next steps:**

- Choose a single wallet architecture (vanilla injected wallet vs dapp-kit) and standardize.
- Add a configuration source of truth for network + package IDs (per-network).
- Implement NFT gallery (owned objects), marketplace listings, and transaction history UI backed by real chain queries.
- Update CSP intentionally to allow required external resources while keeping a secure baseline.

---

## 7. What You Can Say About This Work

You can accurately say that you (and your team) have:

- Built **Visioneer Studios / Paradigm** as a structured, multi-page web experience with a clear product direction for creators, collections, and play.
- Implemented a maintainable frontend architecture with **state management**, **user feedback**, and **feature-oriented UI components**.
- Integrated a **Sui testnet wallet flow** including network selection, balance display, and **faucet onboarding**.
- Scaffolded the core Web3 primitives for the roadmap: **NFT mint/transfer/query**, **marketplace list/purchase**, and **contract execution/query** patterns.
- Explored a more scalable Web3 architecture using **@mysten/dapp-kit** and **React Query** as an alternative implementation path.

---

## 8. Positioning for Applications

- **Web3 / Blockchain:** Emphasize testnet-first wallet onboarding, RPC + faucet flows, and the planned NFT + marketplace architecture.
- **Frontend engineering:** Emphasize composable managers, state subscriptions, and UX feedback patterns without a heavy framework dependency.
- **Product buildout:** Emphasize a staged rollout strategy: strong web foundation first, then incremental enablement of on-chain features with clear integration points.


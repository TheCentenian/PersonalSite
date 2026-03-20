# Portfolio & Accomplishments: Paradigm Wallet (Sui Wallet)

This document describes, in explicit form, what has been built in the **Paradigm Wallet** codebase (a Sui wallet-style web app): wallet connection, network switching, balance and faucet helpers, send/receive flows, and transaction history UI. It is intended for portfolio use and communicating scope of work—without product marketing.

**How to use this document:** This is intentionally **over-documented** (feature scope, concrete file paths, module names, and data flows) so you can trim later into a one-pager or resume bullets. The **Codebase and File Reference** section is the “lookup table” for where things live.

---

## Key Points: Paradigm Wallet in One Place

- **Product:** **Paradigm Wallet** — a lightweight **Sui wallet web UI** for connecting a Sui wallet, switching networks, checking balances, requesting faucet funds (non-mainnet), sending SUI, receiving SUI (address + QR), and viewing transaction history.

- **Stack:** **React + Vite** (`react`, `vite`) with **Mysten dApp Kit** (`@mysten/dapp-kit`) and **Sui SDK** (`@mysten/sui.js`). Data fetching and caching via **TanStack React Query** (`@tanstack/react-query`). UI notifications via `react-hot-toast`. Receive screen QR via `qrcode.react`.

- **Networks:** Supports `devnet`, `testnet`, `mainnet`. Default is **devnet**; network preference is stored in `localStorage` and applied at startup.

- **Wallet connection:** Uses dApp Kit’s `WalletProvider` and `ConnectButton` for connect UX. Screens gate themselves with a reusable “connect your wallet” prompt.

- **Core features shipped:**
  - **Wallet status** (address, network, balance polling) plus faucet helpers for devnet/testnet.
  - **Send SUI** transaction flow using `useSignAndExecuteTransaction` and `TransactionBlock`.
  - **Receive SUI** screen with copy-to-clipboard and QR code that includes network metadata.
  - **Transaction history** that merges sent + received transaction blocks, dedupes by digest, and classifies direction/type.
  - **Settings** stored in `localStorage` (theme, default network, address display, notifications, confirmations, gas preference).

- **Architecture:** Single-page React app with feature components under `src/components/` and state providers under `src/contexts/`. Styling is organized under `src/styles/` (base/layout/components/utilities) and bundled via `src/styles/main.css`.

---

## Codebase and File Reference

Paths are relative to the project root unless noted.

### App composition and providers

- **App shell:** `src/App.jsx`
  - Renders `Header`, tabbed main content, and `Footer`.
  - Tab content includes `WalletStatus`, `SendTransaction`, `ReceiveTokens`, `TransactionHistory`, `Settings`.
  - Wraps content with `SuiClientProvider` + `WalletProvider` + `NetworkProvider` + `SettingsProvider`.
- **React mount and query + wallet providers:** `src/main.jsx`
  - `QueryClientProvider` (React Query)
  - `SuiClientProvider` + `WalletProvider`
  - `TransactionProvider`

### Contexts (shared app state)

- **Network selection and readiness:** `src/contexts/NetworkContext.jsx`
  - Persists preferred network via `localStorage` key `preferred-network`
  - Orchestrates initialization and readiness flags (`isInitialized`, `isNetworkReady`)
  - Calls `selectNetwork` from dApp Kit client context
- **Transaction status tracking:** `src/contexts/TransactionContext.jsx`
  - Tracks a `Map` of pending transactions by digest
  - Provides helpers to add/update/remove and emits toast notifications on success/failure
- **User settings:** `src/contexts/SettingsContext.jsx`
  - Persists settings via `localStorage` key `wallet_settings`
  - Applies `data-theme` to `document.documentElement` for theme switching

### Feature components

- **Header + network + connect:** `src/components/Header.jsx`
  - Displays title, `NetworkSwitcher`, `ConnectButton`, and settings shortcut
- **Footer nav (mobile-friendly tabs):** `src/components/Footer.jsx`
- **Network switching UX + connection check:** `src/components/NetworkSwitcher.jsx`
  - Uses `useNetwork()` to call `setNetwork()`
  - Verifies RPC connectivity via `getLatestCheckpointSequenceNumber`
- **Wallet status + faucet helpers:** `src/components/WalletStatus.jsx`
  - Polls balance (`getBalance`) every 5 seconds via `useSuiClientQuery`
  - Faucet button for non-mainnet (devnet direct POST; testnet via Discord instructions)
  - Copy address + address formatting hook
- **Send SUI:** `src/components/SendTransaction.jsx`
  - Builds a `TransactionBlock`, splits coins from gas, transfers to recipient, sets gas budget
  - Executes with `useSignAndExecuteTransaction`
  - Uses explicit step-by-step status text for debugging and user feedback
- **Receive SUI (address + QR):** `src/components/ReceiveTokens.jsx`
  - Copy address to clipboard
  - QR code includes `{ address, network }` payload
- **Transaction history:** `src/components/TransactionHistory.jsx`
  - Queries sent (`FromAddress`) and received (`ToAddress`) tx blocks
  - Merges and dedupes by `digest`, sorts by `timestampMs`
  - Attempts to infer type (Sent/Received/Faucet/Other) and amount from programmable transaction commands/effects
- **Connect gate:** `src/components/WalletConnectPrompt.jsx`
- **Settings screen:** `src/components/Settings.jsx`

### Styling

- **Entry stylesheet:** `src/styles/main.css` (imports base/layout/component utility CSS)
- **Style modules:** `src/styles/base/`, `src/styles/layout/`, `src/styles/components/`, `src/styles/utilities/`

### Historical variants

The repo includes multiple “versioned” files (e.g. `App1.5.jsx`, `main1.7.jsx`, `vite.config1.6.js`, and `src/styles/*1.7.css`, `*1.8.css`) plus an `Archive/` folder. The active app appears to use the non-suffixed files (`src/App.jsx`, `src/main.jsx`, current `src/components/*`).

---

## 1. Technologies, Tools, and Libraries

### 1.1 Frontend framework and tooling

- **React 18 + Vite**: app runtime + build (`react`, `react-dom`, `vite`)
- **ESLint**: linting via `eslint.config.js`

### 1.2 Sui integration

- **Mysten dApp Kit** (`@mysten/dapp-kit`):
  - `SuiClientProvider`, `WalletProvider`, `ConnectButton`
  - Hooks used across features: `useCurrentAccount`, `useSuiClient`, `useSuiClientQuery`, `useSuiClientContext`, `useSignAndExecuteTransaction`
- **Sui SDK** (`@mysten/sui.js`):
  - `getFullnodeUrl` (in `src/App.jsx`)
  - `TransactionBlock` for constructing transactions (in `src/components/SendTransaction.jsx`)

### 1.3 Data fetching and caching

- **TanStack React Query** (`@tanstack/react-query`): caching/polling and query lifecycle (`QueryClientProvider`, `useSuiClientQuery`).

### 1.4 UI utilities

- **Toasts:** `react-hot-toast` used in `TransactionContext` to notify about tx completion/failure.
- **QR:** `qrcode.react` for Receive screen.

---

## 2. Architecture and Code Organization

### 2.1 Provider layering

The app uses a small set of providers:

- **Sui client + wallet providers** to enable connection, signing, and RPC queries
- **Network provider** to persist network selection and expose readiness flags (guards feature screens until network is ready)
- **Settings provider** to persist user preferences and apply theme
- **Transaction provider** to track pending tx digests and show toast-based feedback

### 2.2 Feature boundaries

Each primary feature is a component, backed by shared contexts:

- **Wallet**: `WalletStatus.jsx` (balance, faucet)
- **Send**: `SendTransaction.jsx` (build and execute tx)
- **Receive**: `ReceiveTokens.jsx` (copy + QR)
- **History**: `TransactionHistory.jsx` (query + classify + display)
- **Settings**: `Settings.jsx` (persisted UX preferences)

---

## 3. Key Data Flows (User + Chain)

### 3.1 Network initialization and switching

- On load, `NetworkContext` reads `preferred-network` from `localStorage` (default `devnet`) and calls `selectNetwork(...)`.
- Screens read `isInitialized` and `isNetworkReady` to avoid showing transaction forms before the client is usable.
- `NetworkSwitcher` performs a lightweight “connected” check by calling `getLatestCheckpointSequenceNumber`.

### 3.2 Wallet connect gating

- Screens that require a wallet (`WalletStatus`, `SendTransaction`, `ReceiveTokens`, `TransactionHistory`) show `WalletConnectPrompt` when `useCurrentAccount()` is null.

### 3.3 Send SUI transaction

High-level flow (as implemented in `SendTransaction.jsx`):

- Validate wallet + recipient format and amount.
- Convert \(SUI \rightarrow MIST\) using \(1 SUI = 1{,}000{,}000{,}000\) MIST.
- Query current balance and reference gas price.
- Build a `TransactionBlock`:
  - `setSender(account.address)`
  - `splitCoins(txb.gas, [amountMist])`
  - `transferObjects([coin], recipient)`
  - set gas budget and epoch-based expiration
- Execute via `useSignAndExecuteTransaction().mutateAsync({ transaction: txb, options })`.

### 3.4 Transaction history aggregation

High-level flow (as implemented in `TransactionHistory.jsx`):

- Query tx blocks for:
  - **Sent**: `FromAddress: account.address`
  - **Received**: `ToAddress: account.address`
- Merge lists, dedupe by `digest`, sort by `timestampMs`.
- Infer type (Sent/Received/Faucet/Other) from programmable transaction commands and effects.
- Link to explorer using `https://suiexplorer.com/...?...network=<currentNetwork>`.

---

## 4. What You Can Say About This Work

You can accurately say that you:

- Built a **React + Vite** Sui wallet-style web app using **Mysten dApp Kit** and **Sui SDK**.
- Implemented **network switching** with persisted preference, readiness gating, and connection verification.
- Implemented **wallet connect UX** and gated feature screens behind wallet connection.
- Implemented **Send SUI** with `TransactionBlock` construction and wallet signing/execution via dApp Kit.
- Implemented **Receive SUI** with copy-to-clipboard and **QR code** including address + network context.
- Implemented **transaction history** by aggregating sent/received tx blocks, deduping, sorting, and linking to Sui Explorer.
- Added **settings persistence** and **theme switching** via `localStorage` and `data-theme`.

---

## 5. Known Limitations and Future Work

- **README is generic:** Root `README.md` is still the Vite template and doesn’t describe the app’s actual features or setup.
- **Debug logging:** Several components contain heavy console logging intended for troubleshooting; consider gating behind an environment flag for production.
- **Transaction serialization nuance:** `SendTransaction.jsx` contains notes about serialized transactions vs objects; ensure the execution path matches the target dApp Kit version’s expectations.
- **History parsing:** Deriving “amount” and “type” from programmable transactions is heuristic; consider adding clearer parsing based on balance changes or events when available.
- **Accessibility and UX polish:** Confirm consistent focus behavior, button states, and empty/loading/error states across features.


# UX — Paradigm Wallet (Full Document)

This document is the **full UX reference** for the Paradigm Wallet web app (Sui wallet): user goals, friction reduction, flows, feedback, decision points, clarity, learnability, responsive/input UX, and accessibility scope. It is intended to be **exhaustive** so you can tailor it later for a one-pager, stakeholder deck, or interview prep.

It complements the **UI reference** (`UI_PARADIGM_WALLET.md`), which focuses on the design system, component structure, and file reference. This document focuses on **why** and **how it serves users**.

**How to use:** Treat this as the master UX narrative. Trim by section or audience (e.g. “friction + feedback only” for product, “goals + tradeoffs” for design reviews).

---

## 1. Purpose and scope

### 1.1 What this document covers

- **User goals and outcomes** we designed for.
- **Friction we reduced** (network setup, wallet connect gating, persistent preferences, low ceremony sending).
- **First-time vs returning experience** and entry paths.
- **Feedback and trust**: success/failure feedback, loading/skeleton states, error messages.
- **Clarity at decision points**: “can I do this now?”, “am I on the right network?”, “what’s pending/sent/received?”, “where do I find settings?”
- **Learnability and cognitive load** (simple nav + clear screen labels).
- **Responsive and input UX** (mobile-friendly nav and stacked content at small widths).
- **Accessibility and inclusion scope** (what’s handled in the implementation vs what’s not claimed).

### 1.2 What this document does not cover

- **Visual design system** (colors, typography, CSS class map): see `UI_PARADIGM_WALLET.md`.
- **Backend/RPC/chain execution details** beyond what impacts UX: see `PORTFOLIO_PARADIGM_WALLET.md`.
- **Production UX testing/metrics**: not present in the repo documentation; this reflects design intent and current implementation.

### 1.3 Relationship to other docs

- `PORTFOLIO_PARADIGM_WALLET.md`: engineering scope, stack, file map, and key data flows.
- `UI_PARADIGM_WALLET.md`: components, CSS architecture, and visual behavior.
- `TRANSACTIONS1.5.md`: transaction implementation notes (where present).

---

## 2. User goals and outcomes

### 2.1 Primary user goals

We design for users who want to:

1. **Connect a wallet** quickly and clearly, with no ambiguity about what they need to do next.
2. **Select the correct network** (devnet/testnet/mainnet) and avoid silent “wrong network” confusion.
3. **Check balance** and understand it in the currently selected network context.
4. **Send SUI** with a guided, step-wise UX and understandable errors when something goes wrong.
5. **Receive SUI** with an easy-to-copy address and a QR option that includes network context.
6. **Audit their activity** using a unified transaction history (sent + received) with filters and explorer links.
7. **Customize personal preferences** (default network, theme, address formatting, notifications, gas preference).

### 2.2 Outcomes we enable

- **“I can start using the app immediately.”** The tabbed navigation exposes clear screens (`Wallet`, `Send`, `Receive`, `History`, `Settings`), and screens gate themselves with `WalletConnectPrompt` until a wallet is connected.
- **“I always know which network I’m using.”** `NetworkContext` applies a persisted preference and `NetworkSwitcher` shows a connection status dot; `WalletStatus` and explorer links use the current network.
- **“Sending is understandable even when errors happen.”** `SendTransaction` updates a user-facing `status` string as it progresses through validation, gas/epoch fetch, transaction build, and execution.
- **“I can share my address safely.”** Receive screen QR encodes `{ address, network }`, and the address is copyable.
- **“History is easier to scan.”** `TransactionHistory` merges sent + received lists, dedupes by `digest`, and provides filter buttons (`all`, `sent`, `received`) and a `View on Explorer` link.

---

## 3. Friction we reduced

### 3.1 Network setup and “wrong RPC” risk

**Problem:** Users often forget which network they are connected to or have to reconfigure settings every time.

**Solution:** Network selection is persisted and applied at startup in `src/contexts/NetworkContext.jsx` using `localStorage` key `preferred-network`. The app also tracks `isInitialized` and `isNetworkReady` so feature screens can show loading instead of failing unpredictably.

Where it lives:

- `src/contexts/NetworkContext.jsx` for initialization and `isInitialized`/`isNetworkReady`.
- `src/components/NetworkSwitcher.jsx` for visible network selection and connection check via `getLatestCheckpointSequenceNumber()`.
- `src/components/WalletStatus.jsx` for network-aware faucet visibility and balance polling.

### 3.2 Wallet connect gating (no broken screens)

**Problem:** If a user tries to use send/receive/history without connecting, the UI could error or show blank data.

**Solution:** Each wallet-required screen checks `useCurrentAccount()` and shows `WalletConnectPrompt` when there is no account:

- `src/components/WalletStatus.jsx`
- `src/components/SendTransaction.jsx`
- `src/components/ReceiveTokens.jsx`
- `src/components/TransactionHistory.jsx`

Where it lives:

- `src/components/WalletConnectPrompt.jsx` provides the connect UX via dApp Kit’s `ConnectButton`.

### 3.3 Persistent personal preferences (low ceremony)

**Problem:** Re-entering preferences like theme, address formatting, and default network adds repetitive friction.

**Solution:** `SettingsContext` persists preferences in `localStorage` under `wallet_settings` and applies theme via `document.documentElement.setAttribute('data-theme', settings.theme)`.

Where it lives:

- `src/contexts/SettingsContext.jsx`
- `src/components/Settings.jsx`
- `src/hooks/useAddressFormat.js` (address display formatting)

### 3.4 “Send” has progressive status and disabled inputs

**Problem:** Transaction execution can take time; users need transparency and should not be able to double-submit.

**Solution:** `SendTransaction`:

- disables inputs/buttons while submitting (`isSubmitting`),
- shows step-based `status` text during the transaction flow,
- maps known error patterns into user-friendly messages via `getReadableError`.

Where it lives:

- `src/components/SendTransaction.jsx`

---

## 4. First-time vs returning experience

### 4.1 First-time path

1. **Open app:** `src/main.jsx` sets up providers and default network (devnet) for the dApp Kit client.
2. **See Wallet tab by default:** `App.jsx` renders `WalletStatus`.
3. **Connect prompt appears if needed:** `WalletStatus` shows `WalletConnectPrompt` when `useCurrentAccount()` is null.
4. **Network preference behavior:** `NetworkContext` reads `preferred-network` (defaulting to `devnet`) and calls `selectNetwork(...)`.
5. **Learn the loop quickly:** Users can copy their address on Receive, send on Send, and view past transactions on History.

### 4.2 Returning path

- **Preferences persist:** theme, default network, address format, and notification toggles persist in `localStorage` via `SettingsContext`.
- **Network persists:** users return to their last chosen network via `preferred-network`.
- **Gating becomes frictionless:** once a wallet is connected, the app renders feature screens with live balance polling and responsive UI state.

---

## 5. Feedback and trust

### 5.1 Success feedback

- **Transaction lifecycle feedback:** `TransactionContext` maintains a `Map` of pending transactions by digest and triggers `toast.success` or `toast.error` when status changes (depending on how mutation lifecycle is wired in the current code).
- **In-flow send feedback:** `SendTransaction` uses a visible `status` string such as “Step 1/10” through “Executing transaction...” and then “✅ Transaction successful!”.
- **Copy feedback:** Copy buttons show temporary ✓ feedback:
  - Address copy in `WalletStatus` and `ReceiveTokens`.
  - Counterparty/address copy in `TransactionHistory`.

### 5.2 Failure and error feedback

`SendTransaction` is explicitly designed for readable failure modes:

- it catches errors and sets `status` to `❌ Error: ...`,
- it uses `getReadableError(error)` to convert low-level error text into clearer categories (insufficient balance, invalid address, user rejection, network error, etc.).

Where it lives:

- `src/components/SendTransaction.jsx`

### 5.3 Loading and uncertainty handling

- **Network readiness gating:** `SendTransaction` returns `LoadingPrompt` until `isInitialized` and `isNetworkReady` are true.
- **WalletStatus balance loading:** balance query uses `useSuiClientQuery` with `refetchInterval: 5000` and shows a skeleton (`LoadingSkeleton`) while loading.
- **Transaction history loading:** `TransactionHistory` uses `isLoading` to display skeleton placeholders (`TransactionSkeleton`).

Where it lives:

- `src/components/LoadingPrompt.jsx`
- `src/components/WalletStatus.jsx`
- `src/components/TransactionHistory.jsx`

---

## 6. Clarity at decision points

### 6.1 “Can I do this right now?”

- Send/Receive/History: if the wallet is not connected, the app shows `WalletConnectPrompt`.
- Send: if the network is not ready, the app shows `LoadingPrompt`.

### 6.2 “Am I on the correct network?”

- The network selector is visible in the header (`NetworkSwitcher`).
- `WalletStatus` shows a devnet faucet button only when `currentNetwork === 'devnet'`.
- `ReceiveTokens` QR payload includes network context so a recipient can verify they are interacting with the intended network.

### 6.3 “What happened to my transaction?”

- `TransactionHistory` merges sent + received transaction blocks and attempts to classify direction/type.
- Transaction rows include a status indicator (via `StatusIndicator`) based on:
  - pending transaction map in `TransactionContext` (when present),
  - and/or transaction effects status when available.
- Each row links out to Sui Explorer with network parameterization (`getExplorerUrl`).

Where it lives:

- `src/components/TransactionHistory.jsx`
- `src/components/TransactionHistory.jsx` for explorer linking

### 6.4 “Where are my preferences?”

- Settings are under a dedicated tab in `TabNavigation` and also accessible via the header icon button.

---

## 7. Progression and motivation

This app is not a game loop; motivation is mostly about utility and confidence. Progression here means “moving from basic usage to self-sufficiency.”

### 7.1 Learnable path across screens

- Wallet status provides initial confidence (address, balance, faucet where applicable).
- Send and Receive reinforce core actions that users repeat.
- History provides the “proof loop” and encourages exploration (filters + explorer links).
- Settings allow users to tune the UX to their preferences over time.

### 7.2 Motivation via trust primitives

- Explorer links reduce uncertainty: users can verify transaction details externally.
- Network awareness reduces the risk of “I sent on the wrong network.”

---

## 8. Context and mode clarity

### 8.1 Regular mode vs network mode

The primary “mode” in this app is the selected network:

- UI content and explorer links are tied to `currentNetwork`.
- Receive QR embeds `{ address, network }`.
- Balance polling and faucet availability follow `currentNetwork`.

### 8.2 Menu vs in-screen routing

Unlike the Suitwo game UI, this wallet app uses:

- tab navigation (`activeTab` in `App.jsx`),
- and full-screen-ish replacements of tab content (no stacked modals for core flows).

---

## 9. Learnability and cognitive load

### 9.1 Clear screen naming

Screens are explicit and minimal:

- “Wallet Status”
- “Send SUI”
- “Receive SUI”
- “Transaction History”
- “Settings”

This reduces the need for tooltips or hidden navigation.

Where it lives:

- `src/components/*`

### 9.2 Transaction steps reduce intimidation

`SendTransaction` uses a user-facing step progression (Step 1/10 ... Step 7/10) to make long-running actions feel structured and predictable.

### 9.3 Avoiding dead ends

- If a user has no wallet connected, they are guided to connect instead of failing.
- If network is not ready, they see loading rather than erroring.

---

## 10. Responsive and input UX

### 10.1 Responsive layout

The CSS uses breakpoint media queries (not device detection bundles):

- Header and layout center on small screens (at `max-width: 768px`).
- Settings controls stack at `max-width: 640px`.

### 10.2 Inputs and focus behavior

- Inputs and selects use consistent styling from `src/styles/components/_forms.css` and are disabled during submission (`SendTransaction`) to prevent accidental double actions.
- Copy actions are one-click with immediate ✓ feedback.

### 10.3 Mobile navigation

Footer navigation uses `Footer.jsx` with clear buttons for the primary screens (Wallet/Send/Receive/History). Settings is accessed via header icon or tab.

---

## 11. Accessibility and inclusion (scope)

### 11.1 What’s aimed for

- **Visible state and feedback:** status dots in `NetworkSwitcher`, error handling in `SendTransaction`, skeleton and loading states.
- **Readable hierarchy:** consistent `.page-title` and `.content-section` patterns.
- **Form labeling:** Settings uses `<label>` for options.

### 11.2 What is not claimed in scope

- This repo does not include a formal WCAG audit or documented accessibility compliance target.
- Advanced keyboard navigation details (focus traps, ARIA patterns beyond native controls) are not explicitly documented.
- Reduced motion / prefers-reduced-motion behavior is not documented (animations exist in CSS but are currently commented/limited).

---

## 12. Tradeoffs we made

### 12.1 Simple UX navigation over complex workflows

This wallet app prefers minimal, discoverable flows (tabs + screen gating) rather than advanced routing or step wizards.

### 12.2 Transaction history classification is heuristic

`TransactionHistory` attempts to classify txs by inspecting programmable transaction commands and effects. This reduces friction (no extra user input) but can be wrong in edge cases.

### 12.3 Faucet UX differs by network

Devnet uses a direct faucet POST.
Testnet uses a “join Discord + post a faucet command” approach, which is pragmatic but not fully integrated.

---

## 13. Error recovery and edge cases

### 13.1 Network init failure fallback

If `NetworkContext` fails to initialize a saved network, it attempts `devnet` as fallback. Users get a more resilient first-time load.

### 13.2 Transaction execution errors

`SendTransaction` catches errors and:

- sets a readable status message,
- disables submission during execution,
- restores UI to a safe state in `finally`.

### 13.3 Missing account / missing data

- Missing wallet: connect prompt.
- Missing data during loading: skeleton/loading prompt.
- History with no transactions: shows “No transactions found.”

---

## 14. What we didn’t do (scope and future work)

### 14.1 Metrics and experimentation

No UX metrics (task success rate, time-to-first-send, error frequency) are tracked/documented here.

### 14.2 Stronger history correctness guarantees

Future improvements could include more deterministic parsing (events/balance deltas) rather than heuristics for “Sent/Received/Faucet.”

### 14.3 Production logging hygiene

Several components contain debug logging intended for development; future work could gate logs behind environment flags.

---

## 15. File and documentation references

### 15.1 Primary UX-related implementation (high level)

- Entry, routing, and layout: `src/App.jsx`, `src/main.jsx`
- Wallet gating prompt: `src/components/WalletConnectPrompt.jsx`
- Network UX and readiness: `src/contexts/NetworkContext.jsx`, `src/components/NetworkSwitcher.jsx`
- Wallet UX: `src/components/WalletStatus.jsx`
- Send UX: `src/components/SendTransaction.jsx`
- Receive UX: `src/components/ReceiveTokens.jsx`
- History UX: `src/components/TransactionHistory.jsx`
- Settings UX: `src/components/Settings.jsx`, `src/contexts/SettingsContext.jsx`
- Address formatting: `src/hooks/useAddressFormat.js`, `src/utils/formatters.js`
- Pending tx feedback: `src/contexts/TransactionContext.jsx`

### 15.2 Documentation to reference when tailoring

- `PORTFOLIO_PARADIGM_WALLET.md` for scope and engineering mapping.
- `UI_PARADIGM_WALLET.md` for component and CSS reference.

---

*This is the full UX reference for Paradigm Wallet. For overview and scope see `PORTFOLIO_PARADIGM_WALLET.md`; for UI implementation details see `UI_PARADIGM_WALLET.md`.*


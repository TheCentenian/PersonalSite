# UI — Paradigm Wallet (Full Document)

This document is the **full UI reference** for the Paradigm Wallet (Sui wallet) web app: design system, layout, components, file reference, and responsive approach. It describes **what we built** (look, structure, implementation)—separate from the **UX document** (`UX_PARADIGM_WALLET.md`), which describes why and how it serves users.

**How to use:** Treat this as the master UI reference. For portfolio and scope, use `PORTFOLIO_PARADIGM_WALLET.md`. For user goals, flows, and friction, use `UX_PARADIGM_WALLET.md`.

---

## 1. Purpose and scope

### 1.1 What this document covers

- **Design system:** Theme (dark/light), colors, typography, spacing, CSS architecture, tokens, gradients.
- **Layout and structure:** App shell, header, main content, footer, tabbed content, page-level containers.
- **Components:** Buttons, forms, wallet/status blocks, transaction list, receive (address + QR), settings panels, navigation tabs, copy buttons, loading states.
- **File reference:** Paths and roles for React components and CSS modules.
- **Responsive UI:** Breakpoints, mobile-friendly footer nav and layout.

### 1.2 What this document does not cover

- **UX rationale** (goals, friction, decision points, tradeoffs): see `UX_PARADIGM_WALLET.md`.
- **Backend, RPC, or chain logic:** see `PORTFOLIO_PARADIGM_WALLET.md`.

### 1.3 Relationship to other docs

- **PORTFOLIO_PARADIGM_WALLET.md:** Technical scope, stack, file map, data flows.
- **UX_PARADIGM_WALLET.md:** User goals, feedback, clarity, accessibility scope. Use that for “why”; use this doc for “what’s on screen and how it’s built.”

---

## 2. File reference

Paths are relative to the project root unless noted.

### 2.1 React components (UI logic)

**App shell and layout:**

- `src/App.jsx` — Root layout: `Header`, main content (tab content), `Footer`; wraps with `SuiClientProvider`, `WalletProvider`, `NetworkProvider`, `SettingsProvider`.
- `src/components/Header.jsx` — Title (“Sui Wallet”), `NetworkSwitcher`, `ConnectButton`, settings icon button.
- `src/components/Footer.jsx` — Bottom nav: Wallet, Send, Receive, History (no Settings in footer; settings via header).
- `src/components/TabNavigation.jsx` — Tab bar (Wallet, Send, Receive, History, Settings); uses `.tab-navigation`, `.tab-button`, `.tab-button.active`.

**Feature screens (page-level):**

- `src/components/WalletStatus.jsx` — Balance, network badge, address (with copy), faucet buttons; uses `.page-container`, `.page-title`, `.content-section`, `.gradient-text`, `.network-badge`, `.copy-button`.
- `src/components/SendTransaction.jsx` — Recipient and amount inputs, Send/Clear buttons, step status; uses `.page-container`, `.page-title`, `.content-section`, `.form-input`, `.action-buttons`, `.button-primary`, `.button-secondary`.
- `src/components/ReceiveTokens.jsx` — Address display, copy, Show/Hide QR; uses `.page-container`, `.page-title`, `.address-container`, `.qr-container`, `.qr-code`, `.network-warning`.
- `src/components/TransactionHistory.jsx` — Filter (all/sent/received), transaction list, status indicators, explorer links; uses `.page-container`, `.page-title`, `.filter-buttons`, `.transaction-item`, `.tx-type`, `.status-indicator`, `.status-dot`, `.copy-button`.
- `src/components/Settings.jsx` — Network, theme, currency, wallet, notifications, transaction settings; uses `.page-container`, `.page-title`, `.content-section`, `.settings-option`, `.form-input`.

**Shared / gating:**

- `src/components/WalletConnectPrompt.jsx` — “Connect your wallet” message and `ConnectButton`; uses `.page-container`, `.page-title`.
- `src/components/LoadingPrompt.jsx` — Loading state for a feature (e.g. Send before network ready); uses `.page-container`, `.page-title`.
- `src/components/NetworkSwitcher.jsx` — Network select + connection status dot; inline styles plus shared layout; status colors (connected/checking/error) in JS.

### 2.2 Styles (CSS)

**Entry and base:**

- `src/styles/main.css` — Main stylesheet; imports base, layout, components, utilities (see list below).
- `src/styles/base/_variables.css` — Theme tokens: spacing, radius, font, accent colors (`--accent-purple`, `--accent-blue`, `--accent-green`), `--border-gradient`; dark/light theme via `[data-theme="dark"]` / `[data-theme="light"]` (`--primary-color`, `--bg-darker`, `--bg-card`, `--text-light`, `--text-muted`, `--border-color`); slate scale, gradients, font sizes, shadows.
- `src/styles/base/_reset.css` — Base resets (if present).
- `src/styles/base/_typography.css` — `body`, headings, `.text-gradient`, `.text-muted`, code/pre; responsive font sizes at 768px.

**Layout:**

- `src/styles/layout/_container.css` — `.container`, `.app`, `.main-content`, `.wallet-section` (gradient border mask), `.content-section` (gradient border), `#root`; responsive padding.
- `src/styles/layout/_header.css` — `.header`, `.header-content`, `.header-actions`, `.network-selector` (with gradient border), `.network-status`, `.status-dot`, `.settings-button`; responsive grid at 768px.
- `src/styles/layout/_footer.css` — `.footer`, `.footer-nav`, `.nav-button`, `.nav-button.active` (gradient underline); responsive at 768px.

**Components:**

- `src/styles/components/_buttons.css` — `.button-primary`, `.button-secondary`, `.button-icon`, `.copy-button`, `.nav-button`, `.filter-buttons`, `.action-buttons`, `.faucet-button`, `.sui-connect-button`, `.settings-icon`.
- `src/styles/components/_forms.css` — `input`, `select`, `textarea`, checkbox accent, `.form-input` (in _cards), error states for send form.
- `src/styles/components/_wallet.css` — `.wallet-status`, `.account-info`, `.network-badge`, `.balance`, `.faucet-button`; dark mode via `prefers-color-scheme`.
- `src/styles/components/_transactions.css` — `.transaction-item`, `.tx-type-status`, `.status-indicator`, `.status-dot`, `.tx-type.pending`, `.transaction-item.pending/failed`, `.send-transaction`, `.wallet-info`.
- `src/styles/components/_settings.css` — `.settings-container`, `.settings-section`, `.settings-option`, form controls; responsive at 640px.
- `src/styles/components/_receive.css` — `.receive-tokens`, `.address-container`, `.qr-container`, `.qr-code`, `.network-warning`.

**Additional component CSS (used by components but not imported in main.css):**

- `src/styles/components/_cards.css` — `.card`, `.page-container`, `.page-title`, `.content-section`, `.form-input`, `.button`; card grid and feature-card styles.
- `src/styles/components/_navigation.css` — `.tab-navigation`, `.tab-button`, `.tab-button.active`, `.tab-content`, `.filter-buttons`; responsive and dark mode.
- `src/styles/components/_gradients.css` — `.gradient-text` (border-gradient clip), `.loading-skeleton` (shimmer), `.progress-bar`.

**Utilities:**

- `src/styles/utilities/_animations.css` — Keyframes and animation classes are currently commented out; `.animate-fade-in` is referenced in `App.jsx` but may be no-op if not defined elsewhere.
- `src/styles/utilities/_helpers.css` — `.text-center`, `.hidden`.

**Note:** The app entry imports `src/styles/main.css`. If `.page-container`, `.page-title`, `.tab-navigation`, `.tab-button`, or `.gradient-text` are not present in the imported chain, add `_cards.css`, `_navigation.css`, or `_gradients.css` to `main.css` as needed for full styling.

---

## 3. Design system

### 3.1 Theme and color strategy

- **CSS custom properties** in `_variables.css`:
  - **Accents (theme-independent):** `--accent-purple: #663399`, `--accent-blue: #4169E1`, `--accent-green: #2E8B57`; `--accent-color` defaults to purple; `--secondary-color` to blue; `--success-color` to green.
  - **Border gradient:** `--border-gradient` linear gradient (purple → blue → green) used for header/footer edges, wallet-section border, content-section border, nav-button active underline, and gradient text.
- **Dark theme (default):** `[data-theme="dark"]`: `--primary-color: #1a1a1a`, `--bg-darker: #242424`, `--bg-card: #2a2a2a`, `--text-light: #ffffff`, `--text-muted: #888888`, `--border-color: #333333`.
- **Light theme:** `[data-theme="light"]`: light backgrounds and inverted text colors.
- **Theme application:** `SettingsContext` sets `document.documentElement.setAttribute('data-theme', settings.theme)`; user choice persisted in `localStorage` (`wallet_settings`).

### 3.2 Design tokens (reference)

**Spacing:** `--spacing-xs` (0.25rem) through `--spacing-xl` (8rem). **Radius:** `--border-radius: 8px`. **Transition:** `--transition-speed: 0.2s`. **Font:** `--font-primary` (Inter, system-ui, …), `--font-secondary`, `--font-mono` (Fira Code). **Font sizes:** `--font-size-small`, `--font-size-base`, `--font-size-large`, `--font-size-h3`, `--font-size-h2`, `--font-size-h1`. **Shadows:** `--shadow-soft`, `--shadow-medium`. **Slate scale:** `--slate-50` … `--slate-900`. **Gradients:** `--gradient-primary`, `--gradient-success`.

### 3.3 CSS architecture

- **Modularization:** Single entry `main.css` → base (variables, reset, typography) → layout (container, header, footer) → components (buttons, forms, wallet, transactions, settings, receive) → utilities (animations, helpers).
- **Class-based:** Layout and visibility by classes; no reliance on inline styles for structure. Component-level CSS files per feature area.
- **Responsive:** Media queries at 768px (and 640px for settings); footer and header stack or center on small screens. No device-detection-based bundle switching; one CSS bundle.

### 3.4 Typography and spacing

- **Body and headings:** Defined in `_typography.css`; body uses `var(--text-light)` and `var(--font-primary)`; headings use `var(--text-light)` and scaled sizes; at 768px body and heading sizes reduce.
- **Special:** `.text-gradient` (gradient clip on title text); `.text-muted`, `.text-light`; code/pre use `var(--font-mono)` and `var(--bg-darker)`.
- **Spacing:** Content sections use `padding: 16px` and `margin-bottom: 16px`; spacing variables used in layout and components.

### 3.5 What the user sees (visual experience)

- **Palette:** Purple/blue/green gradient accents; dark backgrounds by default; clear text hierarchy (text-light vs text-muted).
- **Feedback:** Toasts (react-hot-toast) for transaction success/failure; loading states (LoadingPrompt, skeleton in WalletStatus); status dots (green/yellow/red) in NetworkSwitcher and TransactionHistory; copy-button state (✓/📋).
- **Consistency:** Same `.page-container` + `.page-title` pattern on Wallet, Send, Receive, History, Settings; same `.content-section`, `.button-primary`, `.button-secondary`, `.form-input` across forms; gradient borders on header, footer, wallet-section, content-section.

---

## 4. Layout and structure

### 4.1 App shell

- **Structure:** `#root` → `.app` (max-width 800px, margin auto) → `Header` → `main.main-content` → `.container` → `.wallet-section.card` → `.tab-content` (feature component) → `Footer`.
- **Header:** Fixed-width area; left: title “Sui Wallet” (gradient text); right: NetworkSwitcher, ConnectButton, settings icon. Gradient line under header.
- **Main content:** Scrollable; single column; wallet-section has gradient border effect (mask) and contains the active tab content.
- **Footer:** Full-width; gradient line above; nav buttons (Wallet, Send, Receive, History) with active state underline.

### 4.2 Tab system

- **Tabs:** `TabNavigation` (in App, above content) provides Wallet | Send | Receive | History | Settings. Active tab controlled by `activeTab` state in App; `renderTabContent()` switches between `WalletStatus`, `SendTransaction`, `ReceiveTokens`, `TransactionHistory`, `Settings`.
- **Footer:** Duplicates Wallet, Send, Receive, History only; Settings is reached via header icon.
- **Classes:** `.tab-navigation`, `.tab-button`, `.tab-button.active`, `.tab-content` (in _navigation.css).

### 4.3 Page-level layout (feature screens)

- Each feature screen is wrapped in `.page-container` with a `.page-title` (e.g. “Wallet Status”, “Send SUI”, “Receive SUI”, “Transaction History”, “Settings”).
- Content grouped in `.content-section` blocks (card-like, gradient border in container layout).
- Forms use `.form-input`; actions use `.action-buttons` or `.filter-buttons` with `.button-primary` / `.button-secondary`.

### 4.4 No modals or overlays

- The app does not use modal overlays for primary flows; connect prompt and loading are full-page or in-place replacements (e.g. WalletConnectPrompt or LoadingPrompt instead of tab content when wallet is disconnected or network not ready).

---

## 5. Components

### 5.1 Buttons and controls

- **Primary:** `.button-primary` — gradient background, light text; hover lift; disabled opacity.
- **Secondary:** `.button-secondary` — dark background, border; hover border/accent; `.button-secondary.active` for filter active state.
- **Icon:** `.button-icon`, `.settings-button` (24×24), `.copy-button` (copy/✓).
- **Nav:** `.nav-button` in footer; `.nav-button.active` with gradient underline.
- **Filters:** `.filter-buttons` with multiple `.button-secondary`; active state for all/sent/received.
- **Faucet:** `.faucet-button` (secondary color, used in WalletStatus).
- **Connect:** dApp Kit `ConnectButton`; optional override `.sui-connect-button` in _buttons.css.

### 5.2 Forms

- **Inputs:** `input`, `select`, `textarea` — dark background, border, rounded; `.form-input` for full-width consistent padding. Checkbox with `accent-color: var(--accent-color)`.
- **Error:** `.send-transaction input.error`, `.error-message` (red border and text) for Send flow.

### 5.3 Wallet and status

- **WalletStatus:** Network badge (`.network-badge`), address with copy (`.address`, `.copy-button`), balance (`.gradient-text`), faucet buttons.
- **NetworkSwitcher:** `<select>` for network; status dot + text (connected/checking/error); inline styles for status dot color.

### 5.4 Transaction list

- **Transaction item:** `.transaction-item` — `.tx-header` (type + date), `.tx-type-status` (`.tx-type.sent/received/pending` + `.status-indicator`), `.tx-details` (digest, counterparty, amount, explorer link).
- **Status:** `.status-indicator`, `.status-dot` (color by status), `.status-text`; `.transaction-item.pending` / `.transaction-item.failed` for state styling.
- **Skeleton:** Loading state with skeleton placeholders (e.g. TransactionSkeleton in TransactionHistory).

### 5.5 Receive and QR

- **Address:** `.address-container` with `code` and copy button.
- **QR:** `.qr-container`, `.qr-code` (white background), `.network-warning` text for network context.

### 5.6 Settings

- **Sections:** `.settings-option` rows (label + control); selects and checkboxes; grouped under `.content-section` with h3 headings (Network, Display, Wallet, Notifications, Transaction Settings).

### 5.7 Feedback

- **Toasts:** react-hot-toast (success/error) from TransactionContext.
- **Loading:** LoadingPrompt component; skeleton in WalletStatus and TransactionHistory.
- **Copy:** Temporary “✓” after copy; no separate toast for copy.

---

## 6. Responsive UI

### 6.1 Breakpoints

- **768px:** Header grid becomes single column, centered; footer nav can stack; container and wallet-section padding reduced; typography scale-down.
- **640px:** Settings options stack (label above control), controls full width.
- **prefers-color-scheme:** Wallet and navigation components have dark-mode overrides where specified (e.g. tab-button, wallet-status).

### 6.2 Touch and mobile

- Footer nav is button-based and suitable for touch; filter buttons and primary/secondary buttons have adequate padding. No separate mobile-only CSS bundle; same layout with responsive adjustments.

---

## 7. Accessibility (UI implementation)

- **Labels:** Form sections use `<label>` and headings; network select has `htmlFor="network"`.
- **Focus:** Standard focus on inputs and buttons; no custom focus trap or skip links documented.
- **Status:** Status dot and text provide visible state; error messages and toasts give feedback. (For accessibility scope and rationale, see UX doc when created.)

---

## 8. Load and entry (relevant to UI)

- **Entry:** `index.html` loads `main.jsx`; `App.jsx` imports `./styles/main.css`. No lazy-loaded CSS bundles; one React tree and one main CSS bundle.
- **Theme:** Applied on mount via SettingsContext reading `localStorage` and setting `data-theme`.
- **Network:** NetworkContext initializes and sets network from `localStorage`; feature components wait for `isInitialized` / `isNetworkReady` before showing forms (or show LoadingPrompt).

---

## 9. Detailed inventories (copy/paste)

### 9.1 Page containers and titles (by screen)

- **Wallet Status:** `.page-container` → `.page-title` “Wallet Status” → `.content-section` (network, address, balance, faucet).
- **Send SUI:** `.page-container` → “Send SUI” → content-section (connected, balance) → form (recipient, amount, Send/Clear) → status text.
- **Receive SUI:** `.page-container` → “Receive SUI” → address-container (code + copy) → Show/Hide QR → `.qr-container` + `.network-warning`.
- **Transaction History:** `.page-container` → “Transaction History” → `.filter-buttons` (all/sent/received) → `.transactions-list` (`.transaction-item` per tx).
- **Settings:** `.page-container` → “Settings” → multiple `.content-section` with `.settings-option` (Network, Display, Wallet, Notifications, Transaction Settings).

### 9.2 Tab IDs and labels

- `wallet` — Wallet  
- `send` — Send  
- `receive` — Receive  
- `history` — History  
- `settings` — Settings  

### 9.3 Transaction history UI elements (DOM / logic)

- **Per row:** `.tx-header` (`.tx-type-status` + `.tx-date`), `.tx-details` (digest, counterparty with copy/explorer, amount, “View on Explorer” link).  
- **Status:** `.status-indicator` (`.status-dot` + `.status-text` + optional `.error-icon`).  
- **Types:** `.tx-type.sent`, `.tx-type.received`, `.tx-type.pending`; “Faucet” shown as “Received (Faucet)” where applicable.

---

## 10. Related documentation

- **Portfolio:** `docs/PORTFOLIO_PARADIGM_WALLET.md` — stack, architecture, file map, data flows.
- **UX:** `docs/UX_PARADIGM_WALLET.md` — user goals, friction, feedback, clarity, accessibility scope (when created).
- **Transactions:** `docs/TRANSACTIONS1.5.md` — transaction implementation notes (if present).

---

*This is the full UI reference for Paradigm Wallet. For overview and scope see PORTFOLIO_PARADIGM_WALLET.md; for UX rationale see UX_PARADIGM_WALLET.md.*

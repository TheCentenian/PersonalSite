# UI — Visioneer Studios (Paradigm) (Full Document)

This document is the **full UI reference** for the Visioneer Studios / Paradigm site in this repository: design system, layout, components, visuals, file reference, responsive approach, and load strategy. It describes **what is built** (look, structure, implementation).

**How to use:** Treat this as the master UI reference. If you want a shorter portfolio-facing version, pull only the **Key UI Points**, **File reference**, and the **Components** inventory.

---

## 1. Purpose and scope

### 1.1 What this document covers

- **Design system:** Theme, colors, typography, spacing, CSS architecture, and reuse patterns.
- **Layout and structure:** Global header/navigation, local nav (filters), page layouts, card grids, and footer.
- **Components:** Buttons, cards, filter controls, feedback UI (notifications/loading overlay), and “staged” Web3 dashboard UI.
- **File reference:** Paths and roles for HTML pages, JS UI logic, and CSS.
- **Responsive UI:** Mobile behaviors and breakpoints currently implemented in CSS.
- **Load strategy and entry points:** What scripts load where, and how the site bootstraps.

### 1.2 What this document does not cover

- **Web3/contract correctness** (real package IDs, object types, and production-ready wallet APIs). Those are tracked in the engineering/portfolio doc and transaction notes.
- **UX rationale** (why the UI is structured this way, user journeys, and friction analysis). If needed, we can create a parallel `UX_VISIONEER.md` matching the SuiTwo pattern.

---

## 2. File reference

Paths are relative to project root unless noted.

### 2.1 Pages and structure

- **Primary entry:** `index.html` — “Welcome | Visioneer Studios”. Includes global header/nav, hero, featured cards, and the JS app bootstrap (`new App().initialize()`).
- **Alternate landing (older/marketing):** `Home.html` — “PARADIGM - Interactive Entertainment Evolution” with a sectioned landing layout.
- **Site pages:** `pages/`
  - `pages/our-vision.html`
  - `pages/environments.html`
  - `pages/factories.html`
  - `pages/manufacturing.html`
  - `pages/design-studios.html`
  - `pages/games.html`
  - `pages/collections.html` (includes filter UI + collection card grid)
  - `pages/future.html` (placeholder content page)

### 2.2 CSS and design tokens

- **Entrypoint:** `styles/main.css` — imports modular CSS partials by category.
- **Design tokens / theme variables:** `styles/base/_variables.css` — `:root` variables for brand palette, gradients, typography, spacing, shadow, radius, transitions.
- **Reset and typography:** `styles/base/_reset.css`, `styles/base/_typography.css`.
- **Layout:** `styles/layout/_grid.css`, `styles/layout/_header.css`, `styles/layout/_sections.css`, `styles/layout/_footer.css`.
- **Components:** `styles/components/_cards.css`, `styles/components/_buttons.css`, `styles/components/_navigation.css`, `styles/components/_filters.css`.
- **Utilities:** `styles/utilities/_animations.css`, `styles/utilities/_helpers.css`.

### 2.3 UI logic and components (JavaScript)

**App bootstrap and coordination:**

- `js/app.js` — constructs and wires:
  - `StateManager` (`js/state.js`)
  - `FeedbackManager` (`js/feedback.js`)
  - `SuiManager` (`js/sui-config.js`)
  - `SuiComponents` (`js/components.js`)
  - event bindings for connect wallet + testnet faucet controls

**State, feedback, UI builders:**

- `js/state.js` — `StateManager` (nested keys like `wallet.address`, subscribe/notify listeners).
- `js/feedback.js` — `FeedbackManager` (toast notifications + loading overlay).
- `js/components.js` — `SuiComponents` UI factories:
  - `createNFTCard(nft)` (Transfer / List buttons)
  - `createMarketplaceItem(listing)` (Purchase button)
  - `createTransactionItem(tx)` (type/amount/status/time row)

**Collections page UI:**

- `js/collections.js` — filter button behavior for `.item-card` / (page uses `.card`) by category; toggles `.active` and shows/hides cards.

**Web3 integration UI toggling (staged):**

- `js/sui-config.js` — `SuiManager.updateWalletStatus()` updates:
  - `#wallet-status`
  - `#balance-display`
  - toggles `#web3-connect` vs `#web3-dashboard` visibility classes (when that section is enabled in HTML)

---

## 3. Design system

### 3.1 Theme and color strategy

Design tokens are declared in `styles/base/_variables.css` and used across all partials.

- **Primary:** `--primary-color: #2B2D42` (deep blue-grey)
- **Secondary:** `--secondary-color: #6C63FF` (electric purple)
- **Accent:** `--accent-color: #00BFB2` (turquoise)
- **Text:** `--text-light: #FFFFFF`, `--text-dark: #1A1A1A`
- **Gradients:** `--gradient-primary`, `--play-gradient`, `--sphere-gradient`
- **Surfaces:** `--bg-transparent` for semi-transparent header/overlays

The UI uses a dark, high-contrast base with gradient accents for calls-to-action and section emphasis.

### 3.2 CSS architecture

- **Modular partials:** `styles/main.css` imports a consistent hierarchy:
  - base → layout → components → utilities
- **Class-based layout:** Pages share reusable class names: `.header`, `.container`, `.nav`, `.hero`, `.card-grid`, `.card`, `.footer`, and local-nav/filter classes.
- **Responsiveness via media queries:** At least one global breakpoint is used in `styles/components/_navigation.css` (`@media (max-width: 768px)`), hiding certain nav UI and adapting filter scrolling.

### 3.3 Typography and spacing

Typography and spacing are tokenized:

- **Fonts:** `--font-primary` / `--font-secondary` / `--font-mono`
- **Sizes:** `--font-size-small/body/large/h1/h2/h3`
- **Spacing scale:** `--spacing-xs` → `--spacing-xl`

### 3.4 Visual consistency (what the user sees)

- **Global header + brand lockup:** “Visioneer Studios” logo wordmark style repeated across pages.
- **Cards as the dominant content unit:** Featured navigation and collections are represented as card grids with consistent styling.
- **Local navigation for category filtering:** `pages/collections.html` uses a sticky-ish local area (`.local-nav`) for quick category switching.
- **Feedback UI (when enabled):** Toast notifications and blocking loading overlay for wallet operations (via `FeedbackManager`).

---

## 4. Layout and structure

### 4.1 Global header and primary navigation

Implemented across pages as:

- `.header` wrapping `.top-bar` containing `.logo` and `.nav`
- `.nav` links to the primary site areas (Our Vision, Live & Explore, Process & Refine, Build & Create, Style & Customize, Play & Compete, Achieve & Collect)

### 4.2 Local navigation (collections filters)

On `pages/collections.html`:

- `.local-nav` contains `.filter-buttons` with `.filter-btn` items.
- Filter actions show/hide cards by `data-category`.
- Mobile behavior: filters can scroll horizontally (navigation CSS sets overflow-x on `.filter-buttons`).

### 4.3 Page sections (hero + content blocks)

Common structure:

- `.spacer` then `.hero` section for page title + subtitle.
- Content sections follow with a `.container`, `h2`, `.section-intro`, and a `.card-grid`.

### 4.4 Footer

Footer uses a consistent `.footer` layout with brand + copyright.

---

## 5. Components

### 5.1 Buttons and controls

- **Nav links:** `.nav a` with hover opacity transition.
- **Filter buttons:** `.filter-btn` with `.active` state (toggle driven by JS).
- **CTA buttons:** `.cta-button` appears in `index.html` and `Home.html` (styling in `styles/components/_buttons.css`).

### 5.2 Cards and grids

- **Card grid:** `.card-grid` used for featured content and for collections.
- **Card:** `.card` used as either a link card (`<a class="card">`) or content card (`<div class="card">`).
- **Collections taxonomy:** Each card on `pages/collections.html` is tagged with `data-category` to support filtering.

### 5.3 Feedback UI

Implemented in `js/feedback.js`:

- **Notifications (toasts):** `.feedback-container` with `.notification` children; includes a close button and auto-dismiss.
- **Loading overlay:** `.loading-overlay` with spinner and message, returned as a cleanup function.

### 5.4 Web3 UI components (staged / in-progress)

The intended UI model (present but currently commented out in `index.html`) includes:

- **Connect prompt:** `#web3-connect` with a connect button (`#connect-wallet-large`)
- **Dashboard container:** `#web3-dashboard` with sections for wallet status, balance display, faucet actions, NFTs, and transactions

The DOM update logic and toggling are already implemented in `SuiManager.updateWalletStatus()`; enabling the HTML block surfaces the UI.

---

## 6. Responsive UI

### 6.1 Current breakpoint strategy

- Navigation CSS defines a mobile breakpoint at `max-width: 768px`.
- On mobile:
  - Certain nav menu UI is hidden (`.nav-menu` rule exists; ensure actual markup matches or clean up if unused).
  - Filter buttons become horizontally scrollable (`overflow-x: auto`) for long category lists.

### 6.2 Touch and mobile ergonomics (current state)

- Filter buttons are designed to be tappable and horizontally scrollable.
- Cards and links remain large target elements (grid-based).

---

## 7. Accessibility (UI implementation)

Current implementation is primarily visual and layout-focused.

- **Readable contrast:** dark base + light text and bright accents.
- **Keyboard/focus:** Links and buttons are native elements; explicit focus styles depend on CSS defaults unless defined in `_buttons.css` / `_navigation.css`.
- **Dismissible notifications:** Toasts include a close button; also auto-dismiss.

If accessibility scope becomes a goal, the next UI step is to add clear focus outlines, ARIA for dynamic regions (toasts), and reduced-motion support via `prefers-reduced-motion`.

---

## 8. Load strategy and entry points

### 8.1 Script load order (current `index.html`)

`index.html` includes (in order):

- `js/sui-config.js` (defines `SuiManager`)
- `js/feedback.js` (`FeedbackManager`)
- `js/state.js` (`StateManager`)
- `js/components.js` (`SuiComponents`)
- `js/app.js` (`App`, binds handlers and initializes on DOMContentLoaded)

Then a DOMContentLoaded handler constructs `new App()` and calls `app.initialize()` to perform wallet detection and status update.

### 8.2 Page-specific scripts

- `pages/collections.html` includes `../js/collections.js` and also contains an inline DOMContentLoaded filter handler (duplicate behavior with `collections.js`). Consolidating to a single source of truth is recommended to avoid drift.

---

## 9. Detailed inventories (copy/paste)

### 9.1 Primary navigation entries

- Our Vision
- Live & Explore
- Process & Refine
- Build & Create
- Style & Customize
- Play & Compete
- Achieve & Collect

### 9.2 Collections categories (UI)

From `pages/collections.html` filter buttons:

- All
- Characters
- Fashion
- Buildings
- Furniture
- Vehicles
- Raw Materials
- Components
- Achievements

### 9.3 Feedback UI surface

- Toast types: `info`, `success`, `error` (based on `FeedbackManager.showMessage` usage).
- Blocking operations: wallet connect and faucet request show a loading overlay with context text.

---

## 10. Related documentation

- `Docs/PORTFOLIO_VISIONEER.md` — full engineering/portfolio scope for this repository.
- `TRANSACTIONS.md` — transaction flow notes, common issues, and best practices.

---

*This is the full UI reference for Visioneer Studios / Paradigm in this repository.*


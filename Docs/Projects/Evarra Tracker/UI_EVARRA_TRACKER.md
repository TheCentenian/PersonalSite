# UI — Evarra Tracker (Full Document)

This document is the **full UI reference** for the Evarra Tracker web app: design system, layout, components, visual structure, route/page breakdown, responsive approach, and load strategy. It describes **what is built** (what’s on screen and how it is composed)—separate from the **UX document** (`UX_EVARRA_TRACKER.md`), which describes user goals, flows, feedback, and tradeoffs.

**How to use:** Treat this as the master UI reference. Use `UX_EVARRA_TRACKER.md` for rationale and flow decisions.

---

## 1. Purpose and scope

### 1.1 What this document covers

- **Design system**: Theme tokens, colors, typography, spacing, Tailwind + CSS variables, dark mode.
- **Layout and structure**: App shells (auth vs journey), top navigation, page containers and panels.
- **Feature UI**: Tracker, Goals, Wallets, Insights, Settings, Auth.
- **Components**: Shared primitives (Button/Card/Tabs/Dialog/etc.), feature components (goal cards, wallet cards, insights DnD).
- **Feedback UI**: Toasts, spinners, loading skeletons, error states, progress indicators.
- **File reference**: Concrete file paths for where UI is implemented.

### 1.2 What this document does not cover

- **UX rationale**: Why flows behave this way, user goals, tradeoffs (see `UX_EVARRA_TRACKER.md`).
- **Backend implementation details** (MongoDB, sync engines, blockchain adapters) beyond what is visible in UI.

### 1.3 Relationship to other docs

- `docs/UX_EVARRA_TRACKER.md`: full UX narrative and flows.
- `docs/technical/Insights_Page_Implementation_Notes.md`: deep dive on Insights drag/drop layout decisions and scroll constraints.
- `docs/technical/Insights_Page_Phase_2_Implementation_Plan.md`: planned “Analysis Types” right column UI.

---

## 2. File reference (UI surface map)

Paths are relative to repo root.

### 2.1 App entry, shells, and global styling

- **Root layout**: `src/app/layout.tsx`
  - Fonts (Inter + Roboto Mono)
  - Global providers: tooltips, error boundary, wallet services provider, client-only wrapper, sonner `Toaster`
  - Global CSS import: `src/styles/globals.css`
- **Auth shell (forced dark)**: `src/app/(auth)/layout.tsx`
- **Journey shell (authenticated app)**: `src/app/(journey)/layout.tsx`
  - Top nav: `src/components/navigation/main-nav.tsx`
  - User menu: `src/components/navigation/user-nav.tsx`
  - Global destructive confirm dialog: `src/components/ui/ConfirmDialog.tsx`

### 2.2 Routes (pages)

Journey routes:

- **Tracker**: `src/app/(journey)/tracker/page.tsx`
- **Goals**: `src/app/(journey)/goals/page.tsx`
- **Wallets**: `src/app/(journey)/wallets/page.tsx`
- **Insights**: `src/app/(journey)/insights/page.tsx`
- **Settings**: `src/app/(journey)/settings/page.tsx`

Auth routes:

- **Login**: `src/app/(auth)/login/page.tsx` (orchestration hook: `src/app/(auth)/login/useLoginForm.ts`)
- **Signup**: `src/app/(auth)/signup/page.tsx`
- **Reset password (request link)**: `src/app/(auth)/reset-password/page.tsx`
- **Reset password (set new password)**: `src/app/(auth)/reset-password/[token]/page.tsx`

### 2.3 Shared layout/UI components

- **Top navigation**: `src/components/navigation/main-nav.tsx`
- **Page header + filters**:
  - `src/components/shared/PageHeader.tsx`
  - `src/components/shared/SearchAndFilterContainer` (referenced)
  - `src/components/shared/FilterForm` (referenced)
- **Common UI primitives** (non-exhaustive):
  - `src/components/ui/button.tsx` (variants, sizes, loading spinner)
  - `src/components/ui/card.tsx`
  - `src/components/ui/tabs.tsx`
  - `src/components/ui/dialog.tsx`
  - `src/components/ui/select.tsx`
  - `src/components/ui/alert.tsx`
  - `src/components/ui/progress.tsx`
  - `src/components/ui/tooltip.tsx`
  - `src/components/ui/side-panel.tsx` (used for details panels)
  - `src/components/ui/skeleton.tsx`

### 2.4 Feature UI component clusters

Goals / tracker feature UI:

- **Feature exports**: `src/components/features/goals/*` (imported heavily by tracker/goals pages)
- **Forms**: `src/components/features/goals/forms/*` (basic vs advanced)
- **Goal details panel containers**: `src/components/features/goals/*Panel*` (referenced)
- **Goal tree / grids**: `GoalTree`, `AdvancedGoalGrid`, `SimpleGoalGrid` (referenced by pages)

Wallets feature UI:

- `src/components/features/wallets/WalletCard.tsx`
- `src/components/features/wallets/AddWalletDialog.tsx`
- `src/components/features/wallets/DynamicWalletDetailsPanelContainer.tsx`
- `src/components/features/wallets/WalletDetailsPanel.tsx`
- `src/components/features/wallets/DataSyncProgress.tsx`
- Holdings:
  - `src/components/features/wallets/holdings/*`
  - `src/components/features/wallets/holdings/sui/SuiHoldingsPanel.tsx`
- Transactions:
  - `src/components/features/wallets/transactions/*`
  - `src/components/features/wallets/transactions/sui/SuiTransactionsPanel.tsx`

Insights feature UI:

- **Entry**: `src/components/features/insights/DynamicInsightsContent.tsx` (client-only dynamic import)
- **Layout**: `src/components/features/insights/InsightsLayout.tsx`
- Left column (available items): `AvailableItemsContainer.tsx`
- Center column (selection + run): `SelectionPool.tsx`
- Token section (contextual): `TokenSelectionSection.tsx`, `TokenCard.tsx`, `SelectAllCard.tsx`
- DnD primitives: `DraggableItem.tsx`, `DroppableZone.tsx`

### 2.5 State stores that drive UI

- **Auth store**: `src/lib/store/auth.ts`
- **Wallet store**: `src/lib/store/wallets.ts`
- **Insights store**: `src/lib/store/insights/index.ts`
- **Goals store**: `src/lib/store/goals` (referenced by pages; see repo)
- **Transactions store**: `src/lib/store/transactions.ts` (referenced by wallets feature; see repo)
- **UI confirm dialog store**: `src/lib/store/ui` (referenced in goals page; see repo)

---

## 3. Design system

### 3.1 Theme and color strategy (Tailwind + CSS variables)

The app uses **Tailwind** configured with **CSS variable-driven HSL tokens** so light/dark themes are consistent across primitives.

- **Global tokens**: `src/styles/globals.css`
  - `:root` defines light theme tokens: `--background`, `--foreground`, `--card`, `--primary`, `--muted`, `--border`, `--ring`, etc.
  - `html.dark` overrides for dark theme.
- **Tailwind mapping**: `tailwind.config.ts`
  - Colors like `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, etc. are mapped via `hsl(var(--...))`.
  - Extended palettes: `primary.{50..950}`, plus semantic palettes `success`, `warning`, `error`.

**Primary brand color** is an azure/blue (Tailwind `primary` scale), used for:

- Top nav active states (`bg-primary/10`), links, and primary actions.
- Focus rings (`--ring`).

**Semantic colors** are used for:

- Error/destructive states (`--destructive`, `text-destructive`, `bg-destructive/10`).
- Progress/success iconography (wallet sync completion icon uses green).

### 3.2 Typography

- Fonts:
  - **Inter** for UI (`src/app/layout.tsx`)
  - **Roboto Mono** for monospace / addresses (`font-mono` usage in wallet address fields)
- Common hierarchy:
  - Page titles: `text-2xl` to `text-3xl font-bold`
  - Section headings: `text-base` / `text-xl font-semibold`
  - Helper copy: `text-muted-foreground`

### 3.3 Spacing, container, and layout density

- `tailwind.config.ts` defines a centered `container` with `2rem` padding and `2xl` max at 1400px.
- Pages commonly use:
  - `container mx-auto py-6 space-y-6` for “document-style” pages (Tracker/Goals/Settings).
  - `h-screen` / `h-[calc(100vh-64px)]` layouts where a nav header is present and panels need fixed viewport behavior (Wallets/Insights).

### 3.4 Dark mode

- App uses `next-themes` and sets dark mode via the `class` strategy.
- **Auth layout forces dark** (`src/app/(auth)/layout.tsx`) to keep login visually consistent.
- Journey layout fetches and applies user theme preference from `/api/user/settings` (`src/app/(journey)/layout.tsx`).

### 3.5 Motion

- Tailwind animations defined: `fade-in`, `slide-in` in `tailwind.config.ts`.
- Loading states primarily use:
  - Spinners (`animate-spin`)
  - Skeleton/pulse placeholders (`animate-pulse`)

---

## 4. App shells and global layout

### 4.1 Root layout

`src/app/layout.tsx` establishes global providers and ensures UI primitives behave consistently:

- Tooltip provider for consistent hover/help patterns.
- Error boundary wrapping the application for crash resilience.
- `ClientOnly` wrapper to avoid hydration pitfalls in client-only components.
- `WalletServicesProvider` to centralize wallet-related services in the app runtime.
- `sonner` toaster for feedback.

### 4.2 Auth shell (forced dark)

`src/app/(auth)/layout.tsx`:

- Enforces dark theme for authentication pages.
- Shows a full-screen spinner while auth store reports loading.

### 4.3 Journey shell (authenticated app)

`src/app/(journey)/layout.tsx`:

- Enforces authentication gating (redirects to `/login` when not authenticated).
- Applies theme based on user settings API.
- Renders the top navigation (`MainNav`) and `UserNav`.
- Provides a global destructive confirm dialog instance.

### 4.4 Top navigation

`src/components/navigation/main-nav.tsx`:

- Fixed top nav bar with brand link (“Evarra”) and route tabs:
  - Tracker, Wallets, Goals, Insights, Settings
- Active route style: `text-primary bg-primary/10 font-bold shadow-sm`.
- Right side slot supports extra controls (includes `CompactStartupIndicator`).

---

## 5. Page-by-page UI breakdown

### 5.1 Tracker (`/tracker`)

`src/app/(journey)/tracker/page.tsx` is the “power” version of goal tracking:

- **Header**: `PageHeader` with search + dynamic filters + “Create Goal”
- **Tabs**: static tab list (`tracker`, `milestones`, `notes`, `history`) used for content segmentation (implementation referenced in imports)
- **Goal tree**: `GoalTree` shows hierarchical goals/subgoals with expand/collapse
- **Empty states**:
  - “No goals match your filters” vs “Empty goals state” depending on whether filters/search are active
- **Creation UI**:
  - Basic creation may render embedded form block (non-modal)
  - Advanced creation uses modal/drawer components
- **Details UI**:
  - `GoalDetailsPanelContainer` renders either advanced slide-in or simpler details (feature toggled)

Key UI patterns:

- Strong emphasis on filterable lists with consistent `PageHeader`.
- Conditional complexity via “advanced features” settings.

### 5.2 Goals (`/goals`)

`src/app/(journey)/goals/page.tsx` is a dedicated goals management view:

- Same `PageHeader` filter/search pattern.
- Supports two visual layouts:
  - **Advanced grid** (`AdvancedGoalGrid`) vs **simple grid** (`SimpleGoalGrid`) toggled by advanced features.
- Creation forms are dynamically imported (basic/advanced forms) for performance.
- Deletion uses global confirm dialog store, plus toast feedback.

### 5.3 Wallets (`/wallets`)

`src/app/(journey)/wallets/page.tsx` is a split-screen experience:

- **Left**: wallet list (grid of cards) with `PageHeader` and an “Add Wallet” CTA.
- **Right**: details panel container (`DynamicWalletDetailsPanelContainer`) with slide-in panel behavior (depending on advanced setting).

Wallet list UI:

- `WalletCard` shows:
  - Label (title)
  - Truncated address in monospace
  - Chain name (capitalized)
  - Main token balance (or loading stage / error)
  - Action row: view details (in non-advanced mode), refresh, delete

Wallet details UI:

- `WalletDetailsPanel` renders inside `SidePanel`:
  - Tabs via `WalletTabs`
  - Header via `WalletHeader`
  - Content via `WalletContent` (holdings + transactions tabs, etc.)
  - Prev/next navigation buttons when multiple wallets visible

Sync/progress UI:

- `DataSyncProgress` is a dialog-based progress modal:
  - Shows progress bar, estimated time remaining, and a clear “you can navigate away” info card when background sync is allowed.
  - Error mode switches to “Sync Failed” with recovery (continue anyway / retry behavior provided by caller).

Important page copy:

- A development/service notice banner communicates “free service tier cold start” latency and current chain support (Sui holdings/transactions).

### 5.4 Insights (`/insights`)

Route: `src/app/(journey)/insights/page.tsx`

- Layout:
  - A `PageHeader` area at top (currently with no active filters)
  - Main content is `DynamicInsightsContent` which dynamically loads the full DnD UI client-side

Core insights UI (`InsightsLayout.tsx`):

- 3-column layout on desktop (`lg:grid-cols-3`), stacked on smaller screens.
- Left column: `AvailableItemsContainer` (goals + wallets only)
- Center column: `SelectionPool` (selected items + “Analyze” action)
- Right column: placeholder “Analysis Types” panel (Phase 2 planned)
- Bottom row: results section with `isAnalyzing`, `error`, and mock `analysisResults` list rendering

Drag and Drop:

- Uses `@dnd-kit/core` with global `DragOverlay` so dragged cards float above columns without clipping.
- Droppable zones:
  - `available-items-zone`
  - `selection-pool`
  - `token-selection-pool`

Token UI:

- Tokens do **not** appear in the left column; they appear contextually beneath the selection pool when wallets are selected.
- “Select All” is modeled as a special draggable type and clears individual token selections when added.

Layout constraints:

- Uses fixed height strategies (`max-h-[250px]` for the selection pool card) and internal scroll so results stay visible (see `docs/technical/Insights_Page_Implementation_Notes.md`).

### 5.5 Settings (`/settings`)

`src/app/(journey)/settings/page.tsx`:

- Tabbed settings surface: General, Appearance, Notifications, Privacy.
- General tab includes toggles for “advanced features” (power-user UI behaviors):
  - Advanced goal details panel
  - Advanced goal creation
  - Advanced account menu
  - Advanced goals grid
  - Advanced wallet details panel
- Appearance tab includes a theme selector that:
  - Applies theme immediately via `next-themes`
  - Persists theme to `/api/user/settings` (PUT)

### 5.6 Login (`/login`)

`src/app/(auth)/login/useLoginForm.ts` handles the login form’s UI state orchestration:

- `react-hook-form` + `zod` validation for inline errors.
- Uses auth store login method, then navigates to `/tracker` (or `from` query param).
- Applies theme from user object after login (if present), then journey layout re-syncs theme from API.
- Provides “Continue” behavior that preloads wallets for the current user in the background before navigating.

---

## 6. Components (common patterns)

### 6.1 Buttons

`src/components/ui/button.tsx`:

- Variants: `default`, `outline`, `ghost`, `destructive`, `link`, plus `primary`, `secondary`.
- Sizes: `sm`, `md`, `lg`.
- `loading` prop disables and shows an inline spinner.

### 6.2 Cards, panels, and side panels

- `Card` primitives (`src/components/ui/card.tsx`) are the foundational “surface” element.
- Side panels are used for “details” surfaces without navigating away (wallet details; goal details depending on setting).

### 6.3 Tabs and dialogs

- Tabs used heavily on Settings and within details panels.
- Dialogs used for “Add wallet” and progress modals (sync).

### 6.4 Filtering UI

`PageHeader` + `SearchAndFilterContainer` establishes a consistent pattern:

- Page title + optional description on left.
- Search and filters cluster on right.
- Optional create button and extra actions.

---

## 7. Feedback UI (loading, errors, success)

### 7.1 Global toasts

- Uses `sonner` toaster (`<Toaster />` in `src/app/layout.tsx`).
- Pages use `toast.success` / `toast.error` for create/delete/refresh confirmation.

### 7.2 Loading states

Patterns used across the app:

- **Page-level**: “Loading …” text, spinners, or placeholder content.
- **Component-level**:
  - Wallet balance uses progressive loading stages and a compact stage indicator (`WalletCard.tsx`).
  - Insights uses a dynamic import skeleton (`DynamicInsightsContent.tsx`).

### 7.3 Error states

- Inline errors in forms (login) via field-level error wiring.
- List errors (wallets page) shown in full-width “Error loading …” slot.
- Sync modal has explicit “Sync Failed” state with error details.

---

## 8. Responsive UI

### 8.1 Navigation + container responsiveness

- Top nav uses max-width container (`max-w-7xl`) and collapses naturally via spacing (`space-x-*`).
- Most pages use Tailwind responsive grid and spacing (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3` on wallets).

### 8.2 Panel/viewport constraints

- Wallets page uses a split layout with its own scroll area in the list (`overflow-y-auto`) and a separate details panel.
- Insights uses viewport-height calculations and internal scrolling to avoid “page scroll while dragging.”

---

## 9. Load strategy and entry points (UI-facing)

### 9.1 Auth gating and hydration strategy

- Journey shell redirects to `/login` if not authenticated.
- `ClientOnly` wrappers protect components that depend on browser-only APIs.

### 9.2 Performance-oriented dynamic imports

- Insights layout is dynamically imported with `ssr: false` to keep the route stable and avoid server/client mismatch for DnD.
- Goal creation forms are dynamically imported on Goals page to reduce initial bundle cost.

---

## 10. Related documentation

- `docs/UX_EVARRA_TRACKER.md`
- `docs/technical/Insights_Page_Implementation_Notes.md`
- `docs/technical/Insights_Page_Phase_2_Implementation_Plan.md`

---

*This is the full UI reference for Evarra Tracker. For the UX narrative and rationale, see `UX_EVARRA_TRACKER.md`.*


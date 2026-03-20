# UI — Paper Games / Visioneer Studios (Full Document)

This document is the **full UI reference** for the Paper Games (Visioneer Studios) application: design system, layout, components, visuals, file reference, and responsive approach. It describes **what we built** (look, structure, implementation)—separate from the **UX document** (`UX_PAPER_GAMES.md`), which describes why and how it serves users.

**How to use:** Treat this as the master UI reference. For portfolio summaries and talking points, use `PORTFOLIO_PAPER_GAMES.md`. For user goals, friction, and flows, use `UX_PAPER_GAMES.md`.

---

## 1. Purpose and scope

### 1.1 What this document covers

- **Design system:** Theme, colors, typography, spacing, CSS architecture (Tailwind, globals.css).
- **Layout and structure:** Root layout, nav, home page, art editor page, toolbar and canvas.
- **Components:** Buttons, cards, wallet button, toolstrip, color/opacity/size controls, canvas container.
- **File reference:** Paths and roles for app, components, and styles.
- **Responsive UI:** Container-relative canvas, viewport-based layout.

### 1.2 What this document does not cover

- **UX rationale** (goals, friction, decision points, tradeoffs): see `UX_PAPER_GAMES.md`.
- **Backend, contracts, or platform:** see portfolio doc.
- **Future routes** (Create, Games, Marketplace): not yet implemented.

### 1.3 Relationship to other docs

- **PORTFOLIO_PAPER_GAMES.md:** Technical scope, stack, codebase reference, accomplishments; points to this doc and the UX doc for UI/UX detail.
- **UX_PAPER_GAMES.md:** User goals, flows, feedback, clarity, accessibility scope. Use that for “why”; use this doc for “what’s on screen and how it’s built.”

---

## 2. File reference

Paths are relative to project root unless noted.

**App (src/app/):**

- **Layout:** `layout.tsx` — root layout; Inter font, SuiProvider, nav bar (brand “Visioneer Studios”, links: Home, Create, Games, Art Editor, Marketplace), WalletConnect in header, main content area. `globals.css` — Tailwind base/components/utilities; :root (--background, --foreground); dark mode override. `metadata.ts` — title, description.
- **Pages:** `page.tsx` — home: hero (headline, subtext), three feature cards (Puzzles, Caption Contests, Interactive Art link), Get Started block with WalletConnect. `art/page.tsx` — art editor page: heading “Interactive Art Editor”, ArtEditor component.

**Components (src/components/):**

- **ArtEditor.tsx:** Toolstrip (tool buttons, color inputs, opacity/brush size sliders, undo/redo, grid toggle and size); canvas container (`#konva-container`); Konva Stage/Layer/Transformer and shapes. Tool buttons use Tailwind (rounded, bg-blue-100 when selected, hover). Color inputs (type="color"), range inputs, checkboxes; labels and layout with flex/gap.
- **WalletConnect.tsx:** Connect / disconnect button; address display (truncated); “Connecting...” and “Install Sui Wallet” states. Buttons: rounded-full, bg-blue-600 / bg-green-600 when connected, hover states.
- **SuiProvider.tsx:** Wrapper only; no visible UI.

**Rendering and canvas:**

- **Konva (ArtEditor):** Stage and Layer created imperatively and attached to `#konva-container`. Drawing: Line, Rect, Circle, Image (flood fill). Transformer: anchors and border (anchorStroke #00a1ff, anchorFill #ffffff, borderStroke #00a1ff, borderDash). Grid: Line shapes on grid layer (stroke rgba(0,0,0,0.1)). Canvas area: white background, border border-gray-200, rounded, aspect ratio 4:3; dimensions from container (max 1200×0.75 of width).

**Styling:**

- **Tailwind:** Used throughout (layout.tsx, page.tsx, art/page.tsx, ArtEditor, WalletConnect). No custom theme in tailwind.config.js (theme.extend empty). Common patterns: max-w-7xl mx-auto px-4, flex, grid, text-gray-900/500, bg-white, shadow-sm, rounded-lg, etc.
- **globals.css:** :root --background #ffffff, --foreground #171717; dark (prefers-color-scheme) --background #0a0a0a, --foreground #ededed. body uses var(--background), var(--foreground).

---

## 3. Design system

### 3.1 Theme and color strategy

- **CSS variables** in `globals.css`: `--background`, `--foreground` for light/dark. **Tailwind** for most UI: gray scale (gray-900, gray-500, gray-600), blue (blue-600, blue-500) for primary actions and links, green (green-600, green-700) for connected wallet state.
- **Brand:** “Visioneer Studios” in nav; headline “Paper-Based NFT Games” with blue-600 accent. Primary actions (Connect, tool emphasis) use blue; success state (wallet connected) uses green.
- **Art editor:** Tool strip: white bg, shadow, rounded; selected tool bg-blue-100 text-blue-600. Canvas: white background, gray border. Transformer: #00a1ff for anchors and border. No dedicated animation keyframes in current CSS.

#### Design tokens (reference)

**From code:** **Text:** gray-900 (headings), gray-500 (secondary), gray-600 (labels). **Primary:** blue-600, blue-500 (buttons, links). **Success:** green-600, green-700 (connected wallet). **Backgrounds:** white (cards, toolbar, canvas), gray-100 (hover). **Borders:** border-gray-200 (canvas). **Konva:** anchorStroke/anchorFill #00a1ff/#ffffff. **Root:** --background, --foreground (see globals.css).

### 3.2 CSS architecture

- **Tailwind utility-first:** Layout and appearance via Tailwind classes in JSX. No separate component CSS files; globals.css for base and variables only.
- **No design tokens file:** Colors and spacing are Tailwind defaults plus globals.css variables. No BEM or CSS modules in current scope.
- **Responsive:** Tailwind responsive prefixes (sm:, lg:) where used (e.g. home grid sm:grid-cols-2 lg:grid-cols-3, padding sm:px-6 lg:px-8). Art editor canvas sized by container and aspect ratio.

### 3.3 Typography and spacing

- **Font:** Inter from next/font/google, applied via layout (antialiased). **Sizes:** text-4xl/5xl/6xl (hero), text-3xl (art page title, Get Started), text-lg (card titles, nav), text-base/sm (body, labels). **Spacing:** Tailwind spacing scale (mt-2, mt-4, gap-4, p-4, etc.); max-w-7xl and max-w-md/max-w-3xl for content width.

### 3.4 What the user sees (visual experience)

- **Palette:** White/gray backgrounds, blue primary, green for success (wallet). Text hierarchy: gray-900 for primary, gray-500 for secondary.
- **Feedback:** Button states (hover, disabled when Connecting); selected tool highlight (blue-100/blue-600); wallet button turns green when connected.
- **Consistency:** Same nav and button style across home and art page; toolbar and canvas clearly separated on art page.

---

## 4. Layout and structure

### 4.1 Root layout and navigation

- **Layout:** `layout.tsx`: min-h-screen flex flex-col; nav at top (bg-white shadow-sm border-b), max-w-7xl mx-auto, h-16; brand “Visioneer Studios” left; links (Home, Create, Games, Art Editor, Marketplace) center-left; WalletConnect right. Main: flex-1 for content.
- **Nav links:** Home → `/`, Create → `/create`, Games → `/games`, Art Editor → `/art`, Marketplace → `/marketplace`. Styling: text-sm font-medium, text-gray-900 (Home) or text-gray-500 hover:text-gray-900.

### 4.2 Home page

- **Hero:** Centered block; headline two lines (“Create and Play with” / “Paper-Based NFT Games” with blue-600 on second); subtext gray-500 max-w-md/max-w-3xl. **Cards:** grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3, gap-12; each card: icon in blue-500 rounded box, title (text-lg font-medium), description (text-base text-gray-500). Third card links to `/art` (“Interactive Art”). **Get Started:** Heading “Get Started”, short copy, WalletConnect component.

### 4.3 Art Editor page

- **Page:** container mx-auto py-8; h1 “Interactive Art Editor” (text-3xl font-bold mb-8 text-center); ArtEditor below.
- **ArtEditor layout:** p-4 wrapper; toolbar (mb-4 flex flex-wrap items-center gap-4): tool buttons, color/opacity/size controls, undo/redo, grid toggle and size; then canvas container (bg-white rounded-lg shadow-lg p-2, inner div #konva-container with border and aspect ratio 4:3).

### 4.4 Art Editor toolbar and canvas

- **Toolstrip:** Tool buttons in a row (flex, gap-2, bg-white rounded-lg shadow p-2); each button: p-2 rounded, selected state bg-blue-100 text-blue-600. **Colors:** Fill and stroke color inputs (type="color"); for bucket tool: “Use Gradient” checkbox and two gradient color inputs. **Opacity:** range 0–100%, label “Opacity: X%”. **Size:** range 1–50px, label “Size: Xpx”. **Undo/Redo:** buttons (↩️ / ↪️), disabled when at history bounds. **Grid:** “Show Grid” checkbox and “Grid: Xpx” range (disabled when grid off). **Canvas:** div #konva-container; Konva Stage/Layer mounted here; white background, border border-gray-200 rounded; dimensions from containerRef (max 1200 width, height = width * 0.75).

### 4.5 Canvas visuals (Konva)

- **Drawing:** Brush/eraser as Line (stroke, lineCap round, lineJoin round); line/rectangle/circle as Line/Rect/Circle with stroke and optional fill. Eraser: globalCompositeOperation destination-out, stroke #ffffff. **Flood fill:** Optional linear gradient (drag direction); result drawn as Image shape. **Transformer:** Blue dashed border and corner anchors; resize and rotate (rotation snaps). **Grid:** Vertical and horizontal Line shapes, stroke rgba(0,0,0,0.1), gridSize step.

---

## 5. Components

### 5.1 Buttons and controls

- **Nav and home:** Anchor tags and inline-flex for nav links; WalletConnect renders a single button (Connect / address / Install Sui Wallet). **WalletConnect:** rounded-full, bg-blue-600 hover:bg-blue-700 (connect); bg-green-600 hover:bg-green-700 (connected); disabled during “Connecting...”.
- **Art editor:** Tool buttons (icon + optional title); color inputs (type="color"); range inputs for opacity, brush size, grid size; checkboxes for gradient and show grid. All use Tailwind (rounded, hover, disabled).

### 5.2 Cards and lists

- **Home cards:** Three feature cards; icon box (h-12 w-12 rounded-md bg-blue-500 text-white); title and description; one card has link to /art (text-blue-600 hover:text-blue-800).

### 5.3 Toolstrip and form elements

- **Toolstrip:** Grouped visually (tools | colors/size | undo/redo | grid). Labels (text-sm text-gray-600) above or beside inputs. No tabs or accordions in current UI.

### 5.4 Feedback UI

- **Wallet:** “Connecting...” in button when isConnecting; green button and truncated address when connected. **Art editor:** Selected tool highlight; disabled undo/redo at history limits. No toasts or modals in current scope.

---

## 6. Responsive UI

### 6.1 Layout and viewport

- **Tailwind breakpoints:** sm and lg used on home (grid, padding). No device-specific bundles; single CSS.
- **Art editor:** Canvas dimensions from containerRef (offsetWidth, offsetHeight); width = min(1200, container - 8), height = width * 0.75; resize listener updates dimensions. Container is full width within parent (p-4), so canvas scales with viewport.

### 6.2 Touch and pointer

- **Konva:** mousedown/touchstart, mousemove/touchmove, mouseup/touchend; window-level mouseup/touchend for drawing release. Art editor supports both mouse and touch. No separate mobile toolbar layout.

### 6.3 No dedicated mobile layout

- Single layout for all screen sizes; Tailwind responsive classes and flexible canvas. No landscape-only or rotation prompts.

---

## 7. Accessibility (UI implementation)

- **Labels:** Art editor controls have label elements or title attributes (e.g. “Fill Color”, “Stroke Color”, “Undo”). **Buttons:** Tool names via title; WalletConnect states clear from copy. **Focus and contrast:** Default browser focus; Tailwind hover states. No documented focus trap or keyboard shortcuts for canvas. (For accessibility scope and rationale, see UX_PAPER_GAMES.md.)

---

## 8. Load strategy and entry points

### 8.1 Next.js and client components

- **Layout and pages:** Root layout and home page are server-rendered by default; layout.tsx and page.tsx use 'use client' where specified (layout.tsx is 'use client'). Art page and ArtEditor are client ('use client' in art/page.tsx and ArtEditor.tsx). WalletConnect and SuiProvider are client.
- **Scripts:** Next.js bundles and code-splits; no explicit script load order. Konva and react-konva load with ArtEditor when user navigates to /art.

### 8.2 No global entry points

- No window.* entry points; navigation via Next.js Link/href. Wallet initialization in WalletConnect useEffect; Konva stage creation in ArtEditor useEffect (when container and dimensions ready).

---

## 9. Detailed inventories (copy/paste)

### 9.1 Art editor tools (UI)

- **Tools:** select (👆 Select), brush (🖌️ Brush), bucket (🪣 Fill), eraser (⌫ Eraser), line (📏 Line), rectangle (⬜ Rectangle), circle (⭕ Circle). One active at a time; selected tool has bg-blue-100 text-blue-600.

### 9.2 Art editor controls (UI)

- **Colors:** Fill (color input), Stroke (color input, overlaid small). **Bucket only:** “Use Gradient” checkbox; Gradient start/end color inputs. **Opacity:** range 0–100%, label “Opacity: X%”. **Size:** range 1–50px, label “Size: Xpx”. **History:** Undo (↩️), Redo (↪️). **Grid:** “Show Grid” checkbox; “Grid: Xpx” range (5–50), disabled when grid off.

### 9.3 Home page sections

- **Hero:** Headline, subtext. **Cards:** Puzzles (icon, “Puzzles”, “Create and play with interactive paper puzzles”); Caption Contests (icon, “Caption Contests”, “Engage in fun caption contests with the community”); Interactive Art (icon, link to /art, “Interactive Art”, “Create color-by-number and matching games”). **Get Started:** “Get Started” heading, one line of copy, WalletConnect.

### 9.4 Nav items

- **Brand:** Visioneer Studios. **Links:** Home, Create, Games, Art Editor, Marketplace. **Right:** WalletConnect (button or address).

---

## 10. Related documentation

- **PORTFOLIO_PAPER_GAMES.md** — Stack, codebase, accomplishments, positioning.
- **UX_PAPER_GAMES.md** — User goals, flows, feedback, clarity, accessibility scope, tradeoffs.

---

*This is the full UI reference for Paper Games / Visioneer Studios. For overview and talking points see PORTFOLIO_PAPER_GAMES.md; for UX rationale see UX_PAPER_GAMES.md.*

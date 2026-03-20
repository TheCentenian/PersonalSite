# Portfolio & Accomplishments: Paper Games (Visioneer Studios)

This document describes, in explicit and expanded form, what has been built in the **Paper Games** application (Visioneer Studios): frontend, Sui wallet integration, and interactive art editor. It is intended for portfolio use and communicating scope of work—without focusing on product-specific marketing.

**How to use this document:** The content is intentionally **exhaustively documented** (detailed sections, concrete file paths, component and module names, data flows) so you can trim later. You can **condense and rewrite** for a one-page summary, resume bullets, or keep the long form as a master reference. The **Codebase and File Reference** section gives a single place to find paths and names when you need to keep or drop specifics. Sections **7** and **8** are tuned for applications and interviews; the rest is the full technical and narrative backing.

**Relationship to platform:** Paper Games is **one app** (MVP for Web3 studios). It is a **Next.js** frontend with Sui wallet integration and an in-app art editor; it does not currently include a separate backend API or smart contracts. This document covers only the Paper Games product.

---

## Key Points: Paper Games in One Place

- **Product:** **Paper Games (Visioneer Studios)** — MVP for Web3 studios. Users can **create and play** with paper-based NFT game concepts: **Puzzles**, **Caption Contests**, and **Interactive Art**. Home page presents the value proposition; **Art Editor** (`/art`) provides a full canvas-based drawing tool (brush, shapes, fill, gradient, select/transform, undo/redo, grid). **Sui wallet** connection for identity and future minting/on-chain flows.

- **Stack:** **Frontend:** Next.js 14 (App Router), React 18, TypeScript; Tailwind CSS; **Canvas:** Konva + react-konva for the art editor; **Wallet:** @mysten/sui, @mysten/wallet-standard; **UI:** Radix UI (dialog, dropdown, tabs), Heroicons, TanStack React Query (available). No separate backend or contracts in current scope.

- **Wallet & identity:** Users **connect a Sui wallet** (Sui Wallet or Ethos detected via wallet-standard). Connect / disconnect and address display in nav and Get Started section. Wallet state is used for future minting and game ownership; no on-chain score or leaderboard in current build.

- **Art Editor:** Full drawing canvas: **tools** (select, brush, fill/bucket, eraser, line, rectangle, circle); **stroke and fill** colors; **opacity** and **brush size**; **gradient fill** (bucket tool with linear gradient by drag); **undo/redo** (history of stage JSON); **grid** (toggle, configurable size); **selection and transform** (Konva Transformer: resize, rotate, snap). Canvas is responsive (container-based width, aspect ratio 4:3). Touch and mouse supported via Konva events.

- **Architecture:** **App:** Next.js under `src/app/` (page.tsx home, layout.tsx root with nav and SuiProvider, art/page.tsx art editor route, globals.css, metadata.ts). **Components:** `src/components/` — ArtEditor.tsx (Konva stage, tools, history, transformer), WalletConnect.tsx (wallet-standard connect/disconnect, address display), SuiProvider.tsx (Sui client for mainnet; wraps app). **Styling:** Tailwind; CSS variables in globals.css for light/dark (background, foreground).

- **Navigation and routes:** **Home** (`/`): hero, three game-type cards (Puzzles, Caption Contests, Interactive Art link to `/art`), Get Started with WalletConnect. **Art Editor** (`/art`): title and ArtEditor component. Layout nav: Home, Create, Games, Art Editor, Marketplace (Create/Games/Marketplace are placeholders for future routes).

- **Environment and deployment:** No backend env vars in scope. Next.js `npm run dev`, `npm run build`, `npm run start`. Vercel or Node suitable for deployment. Sui RPC uses mainnet fullnode from @mysten/sui by default.

- **Key data flows:** **Wallet:** getWallets() → detect Sui/Ethos wallet → connect → account in state; display address; disconnect clears account. **Art Editor:** Tool and color state in React; drawing creates Konva shapes on layer; history stores stage.toJSON(); undo/redo replace stage from history; transformer attaches to selected shape for resize/rotate.

- **Modular for maintainability:** Single app; components separated (ArtEditor, WalletConnect, SuiProvider). Art editor state (tools, colors, history, grid) and Konva refs (stage, layer, transformer) kept in one component with clear effect and handler boundaries.

- **Known limitations and future work:** No backend API, no smart contracts, no minting or NFT flows yet. Create, Games, and Marketplace routes are linked but not implemented. Puzzles and Caption Contests are described on home only. Natural next steps: backend for auth/sessions, Sui Move contracts for minting paper-game NFTs, implement Puzzles and Caption Contests, marketplace and discovery.

If you have not worked on the project in a few months, you can still accurately describe it using this document; the technical content reflects the current codebase and can be updated when you resume work.

---

## Codebase and File Reference

Paths are relative to the project root unless noted.

**App (src/app/):**

- **Entry and layout:** `layout.tsx` — root layout; Inter font, SuiProvider, nav (Visioneer Studios, Home, Create, Games, Art Editor, Marketplace), WalletConnect in header, main content area. `page.tsx` — home page: hero (“Create and Play with Paper-Based NFT Games”), three cards (Puzzles, Caption Contests, Interactive Art with link to `/art`), Get Started section with WalletConnect.
- **Routes:** `art/page.tsx` — Art Editor page; title “Interactive Art Editor” and ArtEditor component.
- **Global styles and metadata:** `globals.css` — Tailwind directives; :root (--background, --foreground); prefers-color-scheme dark override. `metadata.ts` — Next.js metadata: title “Visioneer Studios”, description “Create, mint, and play with paper-based NFT assets”.

**Components (src/components/):**

- **ArtEditor.tsx:** Konva-based art editor. State: dimensions, selectedTool (select | brush | eraser | line | rectangle | circle | bucket), strokeColor, fillColor, opacity, useGradient, gradientColor1/2, brushSize, isDrawing, history, historyStep, showGrid, gridSize. Refs: containerRef, stageRef, layerRef, currentShapeRef, transformerRef, startPosRef. Tools: select (handleSelect, transformer), brush/eraser/line/rectangle/circle (Konva Line/Rect/Circle), bucket (floodFill with optional linear gradient). History: saveToHistory (stage.toJSON()), undo/redo (restore stage from history). Grid: optional grid layer, configurable gridSize. Transformer: Konva Transformer for selected shape (resize, rotate, snap). Responsive: container width/height, aspect ratio 4:3. Touch and mouse via Konva mousedown/touchstart, mousemove/touchmove, mouseup/touchend.
- **WalletConnect.tsx:** Wallet-standard getWallets(); detect Sui or Ethos wallet; connect/disconnect; display truncated address; “Install Sui Wallet” if none found (link to sui.io/download). State: wallet, account, isConnecting.
- **SuiProvider.tsx:** Wraps children; creates SuiClient with getFullnodeUrl('mainnet'). Used for future Sui RPC calls (e.g. balance, transactions).

**Configuration and dependencies:**

- **package.json:** next 14.1.0, react 18, typescript 5; @mysten/sui, @mysten/wallet-standard; konva, react-konva; @radix-ui/react-dialog, dropdown-menu, tabs; @tanstack/react-query; tailwindcss; @heroicons/react. Scripts: dev, build, start, lint.
- **Tailwind:** tailwind.config.js, postcss.config.js; no custom theme documented in this reference.
- **No backend or contracts** in repo; no env template for backend.

---

## 1. Technologies, Tools, and Libraries

### 1.1 Core Framework and Runtime (Frontend)

**Runtime:** Browser; **Next.js 14** (App Router) with **React 18** and **TypeScript**. Entry: root layout and page components. **Structure:** App under `src/app/` (layout, page, art/page, globals.css, metadata); components under `src/components/` (ArtEditor, WalletConnect, SuiProvider). **Styling:** Tailwind CSS; globals.css for base and CSS variables.

### 1.2 Wallet Integration

**Wallet:** @mysten/wallet-standard getWallets(); detection of Sui or Ethos wallet by name; connect via standard:connect; account state for address display; standard:events for change subscription. **Sui client:** @mysten/sui SuiClient with getFullnodeUrl('mainnet') in SuiProvider for future RPC use. No transaction building or signing in current scope.

### 1.3 Canvas and Art Editor

**Konva** and **react-konva** for canvas. Stage and Layer created imperatively (useRef + new StageType/LayerType) and mounted to container div; drawing uses Konva Line, Rect, Circle, Image (for flood-fill result). **Transformer** for selection (resize, rotate, anchors). **Flood fill:** Canvas 2D getImageData/putImageData; optional linear gradient from drag vector. **History:** stage.toJSON(); undo/redo by restoring from history array. **Tools:** select, brush, eraser, line, rectangle, circle, bucket (fill/gradient).

### 1.4 UI and Design

**Tailwind** for layout and components (nav, cards, buttons, form controls). **Radix UI** (dialog, dropdown-menu, tabs) available for future modals and tabs. **Heroicons** available. No dedicated design-system doc in repo; colors and spacing via Tailwind classes and globals.css variables.

### 1.5 Deployment and Environment

**Build:** Next.js `npm run build`; output for Node or Vercel. **Scripts:** `npm run dev` (dev server), `npm run start` (production). No backend; no required env vars for current frontend-only scope. Sui RPC URL is default mainnet from SDK.

### 1.6 Security and Data

**Wallet:** Connection and disconnect only; no private keys in app. **Art editor:** State and history are in-memory; no persistence or upload in current scope. No auth or session backend.

### 1.7 Logging and Observability

**Console:** Wallet and ArtEditor log where added (e.g. selection, transformer). No centralized logger or APM. No backend to log.

### 1.8 Performance and Resilience

**Art editor:** Container-based resize; history limited by array length (no cap documented). **Wallet:** Single wallet detection; no retry or fallback chain documented. **Loading:** isConnecting state and disabled button during connect.

---

## 2. Architecture and Code Organization

### 2.1 App Boundaries

- **Frontend:** Single Next.js app under `src/`. App router for pages; shared layout (nav, SuiProvider, WalletConnect). No server-side API routes in current scope; no separate backend repo.
- **Components:** Reusable UI in `src/components/`. ArtEditor is self-contained (state, Konva, tools, history). WalletConnect and SuiProvider are thin wrappers for wallet and Sui client.

### 2.2 Page and Route Organization

- **Home:** Marketing and discovery; three game types; CTA to connect wallet.
- **Art Editor:** Single page with ArtEditor; no sub-routes. Create, Games, Marketplace linked in nav but not implemented.

### 2.3 State and Data Flow

- **Wallet:** WalletConnect holds wallet and account state; layout renders it in nav; home also renders WalletConnect in Get Started. No global store (no Zustand/Redux); local component state.
- **Art editor:** All state in ArtEditor (tools, colors, history, grid). No persistence; refresh clears canvas.

### 2.4 Types and Validation

TypeScript throughout. Tool type union; Konva types from konva and react-konva. No Zod or request validation (no API).

---

## 3. Product Design and Features (Summary)

- **Positioning:** Visioneer Studios — “Create and Play with Paper-Based NFT Games.” MVP for Web3 studios: puzzles, caption contests, interactive art.
- **Home:** Hero; three cards (Puzzles, Caption Contests, Interactive Art → /art); Get Started with wallet connect.
- **Art Editor:** Canvas with toolstrip (select, brush, fill, eraser, line, rectangle, circle); color (stroke, fill, gradient for bucket), opacity, brush size; undo/redo; grid toggle and size; selection and transform. Responsive canvas; touch and mouse.
- **Navigation:** Brand + Home, Create, Games, Art Editor, Marketplace; wallet button in header.
- **Future:** Backend, contracts, minting, Puzzles and Caption Contests flows, marketplace.

---

## 4. Milestones and Major Accomplishments

### 4.1 Foundation

- Next.js app with layout, home page, and navigation; Tailwind and global styles; metadata.

### 4.2 Sui Wallet Integration

- Wallet-standard detection and connect/disconnect; address display; SuiProvider with mainnet client for future use.

### 4.3 Interactive Art Editor

- Full Konva-based editor: multiple tools, colors, gradient fill, undo/redo, grid, selection and transform; responsive and pointer events.

### 4.4 Product Framing

- Visioneer Studios branding; three game-type cards and Art Editor route; placeholder nav for Create, Games, Marketplace.

---

## 5. Patterns and Practices in Use

- **Component-scoped state:** No global store; wallet and art state in their components.
- **Imperative Konva:** Stage and Layer created and stored in refs; shapes added in event handlers; transformer attached on select.
- **History for undo/redo:** Serialize stage to JSON; restore on undo/redo.
- **Wallet-standard API:** Use getWallets() and standard:connect / standard:events for compatibility with Sui wallets.

---

## 6. Known Limitations and Future Work

**Current scope:** **Frontend only;** no backend API, no smart contracts, no minting or NFT flows. **Routes:** Create, Games, Marketplace are nav links only. **Puzzles** and **Caption Contests** are home-page copy only. **Art:** No save/load or export (e.g. image download, IPFS) in this reference. **Wallet:** Connect and display only; no transactions.

**What to add next (for roadmap):** Backend for users/sessions; Sui Move contracts for paper-game NFTs; mint flow from art editor; Puzzles and Caption Contests pages and mechanics; marketplace and discovery; art persistence and export. Stating limitations and future work clearly shows prioritization and product thinking.

---

## 7. What You Can Say About This Work

When promoting yourself or discussing this project, you can accurately say that you (with your team or AI assistance) have:

- Shipped **Paper Games (Visioneer Studios)** MVP: Next.js frontend for **paper-based NFT game concepts** with **Sui wallet** connection and an **interactive art editor**.
- Implemented **wallet integration** (wallet-standard, Sui/Ethos detection, connect/disconnect, address display) and **Sui client** setup for mainnet.
- Built an **art editor** with **Konva/react-konva**: brush, shapes, flood fill with optional gradient, select/transform (resize, rotate), undo/redo, grid; responsive canvas and touch support.
- Structured the app with **App Router**, **layout and nav**, and **component separation** (ArtEditor, WalletConnect, SuiProvider); prepared for **Puzzles**, **Caption Contests**, and **Marketplace** as next features.
- Used **TypeScript**, **Tailwind**, and **Radix UI** for type safety and UI consistency; designed for future backend and on-chain minting.

This document is the explicit, expanded reference for that work.

---

## 8. Positioning for Applications

- **Web3 / NFT:** Emphasize paper-based game concept, Sui wallet integration, and art-creation flow as foundation for minting and ownership.
- **Full-stack readiness:** Frontend complete; mention “backend and contracts planned” or “MVP frontend for Web3 studios.”
- **Product scope:** Clear MVP boundaries (home, art editor, wallet) and roadmap (puzzles, caption contests, marketplace, minting).

Use the **Key Points** and **Codebase and File Reference** to keep or drop specifics; condense Section 7 for resume or one-pagers.

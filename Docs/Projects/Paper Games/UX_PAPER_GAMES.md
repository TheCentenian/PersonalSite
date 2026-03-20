# UX — Paper Games / Visioneer Studios (Full Document)

This document is the **full UX reference** for the Paper Games (Visioneer Studios) application: user goals, friction reduction, flows, feedback, decision points, learnability, responsiveness, accessibility, tradeoffs, and scope. It is intended to be **exhaustive** so you can tailor it later for one-pagers, stakeholder decks, or interview prep. It complements **PORTFOLIO_PAPER_GAMES.md** (technical scope) and **UI_PAPER_GAMES.md** (design system and components).

**How to use:** Treat this as the master UX narrative. Trim by section or by audience (e.g. “goals + friction only” for product, “tradeoffs” for design reviews).

---

## 1. Purpose and scope

### 1.1 What this document covers

- **User goals and outcomes** we design for.
- **Friction we reduced** and why (e.g. single-step entry to art, clear nav).
- **First-time vs returning** experience and entry paths.
- **Feedback and trust:** success, loading, error recovery.
- **Clarity at decision points:** Home vs Art Editor, tool choice, wallet.
- **Learnability and cognitive load:** toolstrip, controls, no mandatory tutorial.
- **Responsive and input UX:** pointer and touch on canvas; single layout.
- **Accessibility and inclusion:** what we aimed for and what we didn’t do.
- **Tradeoffs we made** and **scope we didn’t cover**.

### 1.2 What this document does not cover

- **Visual design system** (colors, typography, components): see `UI_PAPER_GAMES.md`.
- **Backend, contracts, or platform:** see portfolio doc.
- **Product roadmap or positioning:** see concept and planning docs.
- **Future routes** (Create, Games, Marketplace): not yet implemented.

### 1.3 Relationship to other docs

- **PORTFOLIO_PAPER_GAMES.md:** Technical scope, stack, codebase. Use for “what exists in code.”
- **UI_PAPER_GAMES.md:** Layout, components, file reference. Use for “what’s on screen and how it’s built”; use this doc for “why and how it serves users.”

---

## 2. User goals and outcomes

### 2.1 Primary user goals

We design for users who want to:

1. **Discover the product** — Understand what Paper Games / Visioneer Studios is (paper-based NFT game concepts: puzzles, caption contests, interactive art) and how to get started.
2. **Create art** — Use a canvas with familiar tools (draw, shapes, fill, erase, select/transform) without leaving the app.
3. **Connect wallet** — Link a Sui wallet for identity and future minting/ownership, with minimal steps (one click when wallet is available).
4. **Navigate clearly** — Move between home and art editor; know where Create, Games, and Marketplace will live (nav in place for future).

Secondary goals: adjust tools and colors, undo/redo, use grid for alignment. These are supported in the art editor but not the primary loop.

### 2.2 Outcomes we enable

- **“I know what this app is and where to go”** — Home hero and three cards spell out value; Art Editor is one click away (/art or “Interactive Art” card). Nav is consistent across pages.
- **“I can start drawing quickly”** — Art Editor loads with default tool (brush) and visible toolbar; no account or project setup required. Canvas is ready on page load.
- **“I can connect my wallet when I’m ready”** — Wallet is in nav and in Get Started; connect and disconnect are one action; address is shown when connected so users see success.
- **“I can correct mistakes”** — Undo/redo and eraser; selection and transform for moving/resizing. No destructive “clear all” without history.

### 2.3 Assumed user (design intent)

We assume a user who:

- Wants to explore paper-based game concepts and try the art editor.
- May or may not connect a wallet on first visit (wallet optional for art creation).
- Can use pointer or touch on a canvas and understand basic tools (brush, shapes, fill).
- May be on desktop or mobile; we use a single responsive layout and pointer/touch on canvas.

We do **not** assume formal personas or validated segments; this is design intent for prioritization and consistency.

---

## 3. Friction we reduced

### 3.1 Single-step entry to art

**Problem:** Requiring sign-up or project creation before drawing would delay the core “create” experience.

**Solution:** **Art Editor is directly reachable** from home (card link to /art) and from nav. No login or “create project” step. User lands on /art and can draw immediately with default tool and colors. Wallet is optional for creation in current scope.

**Where it lives:** Home page card link to `/art`; nav “Art Editor” → `/art`; art/page.tsx renders ArtEditor without gates. PORTFOLIO_PAPER_GAMES.md, UI_PAPER_GAMES.md §4.3.

### 3.2 Clear navigation and value proposition

**Problem:** Users might not understand what the app does or where to go next.

**Solution:** **Home hero** states “Create and Play with Paper-Based NFT Games” and lists three types (Puzzles, Caption Contests, Interactive Art). **Nav** is always visible (Home, Create, Games, Art Editor, Marketplace) so users see structure. **Get Started** focuses on one action (connect wallet). Placeholder routes (Create, Games, Marketplace) set expectations for future content.

**Where it lives:** layout.tsx (nav), page.tsx (hero, cards, Get Started). UI_PAPER_GAMES.md §4.1, §4.2.

### 3.3 Wallet connect without blocking

**Problem:** Forcing wallet connection before any use could turn away users who want to explore first.

**Solution:** **Wallet is optional** for browsing and art creation. Connect is available in nav and Get Started but not required to open home or art editor. When user connects, state is visible (green button, address); disconnect is one click. “Install Sui Wallet” directs to download when no wallet is detected.

**Where it lives:** WalletConnect.tsx (connect/disconnect, states); layout and home both show WalletConnect. No gate before / or /art.

### 3.4 Tool and control visibility

**Problem:** Hidden or nested tools would slow down creation and discovery.

**Solution:** **All art tools and main controls are in one toolbar** (tools, colors, opacity, size, undo/redo, grid). No tabs or modals for core tools; selected tool is highlighted so the user always knows the current mode. Gradient option appears only when bucket tool is selected to avoid clutter.

**Where it lives:** ArtEditor.tsx (toolstrip layout, selectedTool state, conditional gradient UI). UI_PAPER_GAMES.md §4.4, §5.3.

---

## 4. First-time vs returning experience

### 4.1 First-time path

1. **Home** — User sees hero and three cards; can read value prop and click “Interactive Art” or nav “Art Editor” to reach /art.
2. **Art Editor** — Page loads with title and ArtEditor; default tool is brush; user can draw immediately or switch tools. No onboarding wizard or forced tutorial.
3. **Wallet (optional)** — User can connect from nav or Get Started; “Install Sui Wallet” if no wallet detected. No requirement to connect to use the editor.
4. **Placeholder links** — Create, Games, Marketplace are in nav; users may click and hit 404 until those routes exist. We accept this as MVP scope; copy or future routes can clarify “coming soon.”

We do **not** currently enforce a first-time tutorial or guided path. The first-time experience is “land on home → go to Art Editor or connect wallet as desired.”

### 4.2 Returning path

- **Home** — Same layout; same cards and Get Started. Wallet state persists for session (connect/disconnect within session only; no persisted login in current scope).
- **Art Editor** — Same toolbar and canvas; **state is not persisted** (refresh clears canvas and history). Returning users get a fresh canvas each visit unless we add save/load later.
- **Nav** — Same links; behavior consistent.

Returning users benefit from **predictable layout** and **same entry points**; they do not yet benefit from saved art or account-specific state.

### 4.3 No account vs wallet

- **No wallet:** User can use home and art editor fully; only wallet-gated flows (e.g. future minting) would be unavailable.
- **Wallet connected:** Address visible; ready for future flows (mint, ownership). No difference in editor capabilities in current build.

---

## 5. Feedback and trust

### 5.1 Success feedback

- **Wallet connected** — Button turns green and shows truncated address so the user sees connection succeeded.
- **Tool selection** — Selected tool is highlighted (e.g. blue background) so the user sees current mode.
- **Drawing** — Shapes appear immediately on canvas; no delay. Transformer appears when a shape is selected so the user sees selection and can resize/rotate.

### 5.2 Failure and error feedback

- **Wallet** — If connect fails, no persistent error toast in current scope; user can retry. “Connecting...” prevents double-submit. Console may log errors for debugging.
- **Art editor** — No explicit error states for drawing (e.g. canvas full); undo/redo and eraser are the main recovery. If Konva or history fail, we don’t yet show a user-facing message.

### 5.3 Uncertainty and loading

- **Connecting** — “Connecting...” in wallet button and disabled state so the user knows a request is in progress.
- **Art editor** — No loading overlay; canvas and toolbar render with page. History and stage init are synchronous from user perspective.
- **No silent failures** — We avoid leaving the user with no feedback for wallet connect (success = green + address; failure = can retry). Art editor has no async submit in current scope.

### 5.4 Trust and transparency

- **Address display** — Truncated address when connected so the user can confirm which wallet is linked.
- **Clear actions** — “Connect …” / “Install Sui Wallet” / address + disconnect; labels are explicit. No hidden or automatic wallet actions.

---

## 6. Clarity at decision points

### 6.1 “What is this and what can I do?”

- **Home** — Hero and three cards describe product and link to Art Editor. Get Started tells user to connect wallet to “start creating and playing.”
- **Nav** — Home, Create, Games, Art Editor, Marketplace give a clear map; Art Editor is the only implemented secondary route.

### 6.2 “Where do I create?”

- **From home** — “Interactive Art” card or “Art Editor” in nav → /art. Single step.
- **From art page** — “Home” in nav to return; no “save” or “project” choice in current scope.

### 6.3 “Which tool am I using?”

- **Toolbar** — One tool active; selected tool is visually highlighted. Labels/titles on buttons (e.g. “Brush”, “Fill”). Bucket-specific options (gradient) only when bucket is selected.

### 6.4 “How do I connect my wallet?”

- **Nav or Get Started** — One button: “Connect [Wallet]” or “Install Sui Wallet.” After connect: green button with address; same button used to disconnect. No extra steps or modals in current flow.

### 6.5 “What happens to my art?”

- **Current behavior** — Art is in-memory only; refresh or navigate away clears it. No save/load or export in scope. We don’t promise persistence; future work can add export or project save and set expectations in copy.

---

## 7. Learnability and cognitive load

### 7.1 Toolstrip and controls

- **Single toolbar** — Tools, colors, opacity, size, undo/redo, grid in one place. User can scan left to right. Gradient appears only for bucket to keep default view simple.
- **Familiar metaphors** — Brush, eraser, line, rectangle, circle, fill; icons and labels support recognition. Select + transformer for move/resize/rotate follows common editor patterns.

### 7.2 No mandatory tutorial

- **How to use** — No step-by-step overlay or forced tour. User can explore tools by selection and use. If we add a “How to use the editor” or tooltips later, we can document them here.
- **Consistent patterns** — Same nav and button styles across pages so once the user learns one screen, the rest is predictable.

### 7.3 What we assume users learn first vs later

- **First:** Home → Art Editor or Connect wallet; basic draw with brush.
- **Later:** Other tools (shapes, fill, gradient), undo/redo, grid, select/transform. We don’t force order; the toolbar is always available.

---

## 8. Responsive and input UX

### 8.1 Single layout

- **One layout** for all screen sizes; Tailwind responsive classes (e.g. home grid, padding). No device-specific bundles or separate mobile UI.
- **Canvas** — Sized from container (max width 1200, aspect ratio 4:3); scales with viewport. Resize listener keeps dimensions in sync.

### 8.2 Pointer and touch

- **Konva** — mousedown/touchstart, mousemove/touchmove, mouseup/touchend; window-level release so drawing ends even if pointer leaves canvas. Art editor works with both mouse and touch.
- **Buttons and inputs** — Standard click/tap; no hover-only critical actions. Touch targets are default button and input sizes (no documented minimum size audit).

### 8.3 Keyboard and focus

- **No documented keyboard shortcuts** for tools or undo/redo. Focus follows default tab order. Escape and focus trapping not documented for art editor modals (none in current scope). For accessibility scope see §11.

---

## 9. Accessibility and inclusion

### 9.1 What we aimed for

- **Clarity:** Labels on controls (e.g. “Opacity”, “Size”, “Show Grid”); button titles for tools. Wallet states are explicit (Connect, Connecting, address, Install Sui Wallet).
- **Consistency:** Same nav and primary actions across pages; same button and toolbar patterns.
- **Explicit feedback:** Wallet state change (green + address); selected tool highlight; disabled states (undo/redo at bounds, Connecting).

### 9.2 What we didn’t do (scope)

- **No formal WCAG audit** or accessibility compliance doc. Design aims for clarity and consistent interaction, not a specific WCAG level.
- **Screen readers and keyboard-only:** We don’t document full screen-reader support or keyboard navigation for canvas or all controls. Focus and semantics exist where implemented; we don’t claim full assistive-tech coverage.
- **Reduced motion / prefers-reduced-motion:** Not documented or implemented.
- **Color and contrast:** Tailwind and globals.css used; we have not run a formal contrast checker. Worth doing if we want to claim accessibility compliance.

Being explicit about this scope helps in “what we’d do next” (e.g. “run WCAG audit and document gaps”) and sets expectations for stakeholders.

---

## 10. Tradeoffs we made

### 10.1 No save/load vs simplicity

- **Tradeoff:** We don’t persist or export art so we avoid project management, file format, and storage. We accepted **simplicity and fast entry** over “your work is saved.” The tradeoff is “clear for MVP; add save/export when we prioritize it.”

### 10.2 Wallet optional vs future gating

- **Tradeoff:** Wallet is optional so users can try the app without connecting. Future minting or ownership will likely require wallet; we can add gates then. The tradeoff is “lower barrier now, add gating when we have on-chain features.”

### 10.3 No onboarding vs exploration

- **Tradeoff:** We don’t interrupt with a tutorial. Users explore tools on their own. We prioritized **non-interruption** over “guided first use.” The tradeoff is “discoverability of features vs. clean first visit.” We could add optional “How to use” or tooltips later.

### 10.4 Placeholder nav links vs clarity

- **Tradeoff:** Create, Games, and Marketplace are in nav but not implemented. Users may hit 404. We accepted **consistent nav structure** and “coming soon” expectation over hiding links. The tradeoff is “clear information architecture vs. only linking to existing pages.”

### 10.5 Single layout vs device-optimized

- **Tradeoff:** One layout for all devices; no dedicated mobile or tablet layout. We accepted **simplicity and one code path** over device-specific UX. The tradeoff is “works everywhere vs. optimized per device.”

---

## 11. Error recovery and edge cases

### 11.1 Wallet connect failure

- **Feedback:** No toast in current scope; user can retry. “Connecting...” prevents double-click. We don’t leave the user with no indication; they see the button return to “Connect” or “Install Sui Wallet” if no account.

### 11.2 No wallet installed

- **Flow:** “Install Sui Wallet” button; link to sui.io/download. Clear next step.

### 11.3 Art editor: refresh or navigate away

- **Behavior:** Canvas and history are lost. No recovery except to redraw. We don’t promise persistence; future save/export would address this.

### 11.4 Placeholder routes (Create, Games, Marketplace)

- **Behavior:** 404 or empty page until implemented. Users who click from nav see whatever Next.js serves for missing routes. We accept this as MVP; copy or maintenance page can clarify “coming soon.”

### 11.5 Empty states

- **Canvas:** Starts empty; no “no content” message needed. **Wallet:** “Connect” or “Install Sui Wallet” is the empty state. We don’t have list or feed empty states in current scope.

---

## 12. What we didn’t do (scope and future work)

### 12.1 User research and validation

- This document reflects **design intent and implementation**, not validated user research. We have not run formal usability tests or surveys cited here. If we add research later, we can document “assumed user” vs “validated segments” and link to findings.

### 12.2 Metrics and success criteria

- We do not define **UX metrics** (e.g. time to first draw, connect rate, return visits). Outcomes (§2.2) are qualitative. Future work could add metrics and targets and tie them to flows in this doc.

### 12.3 Full accessibility compliance

- As in §9.2: no WCAG audit, no formal screen-reader or keyboard-only coverage. Design aims for clarity and consistency; compliance would be a separate pass.

### 12.4 Localization and internationalization

- Copy and labels are in one language. We don’t document locale, RTL, or string length for translation. If we localize later, we’d add a section on copy and layout.

### 12.5 Save, export, and projects

- No save/load, export image, or project list. Art is session-only. Future work can add persistence and export and document expectations here.

---

## 13. File and documentation references

### 13.1 Primary UX-related code (high level)

- **Entry and nav:** layout.tsx (nav, WalletConnect placement), page.tsx (home structure, cards, Get Started).
- **Art editor:** ArtEditor.tsx (tools, controls, canvas, history, selection); art/page.tsx (page wrapper).
- **Wallet:** WalletConnect.tsx (connect, disconnect, states, address display).

Paths: `src/app/`, `src/components/`. Full file reference is in UI_PAPER_GAMES.md and PORTFOLIO_PAPER_GAMES.md.

### 13.2 Documentation to reference when tailoring

- **PORTFOLIO_PAPER_GAMES.md** — Stack, codebase, accomplishments, positioning.
- **UI_PAPER_GAMES.md** — Design system, layout, components, file reference.

### 13.3 How to tailor this document

- **One-pager:** Use §2 (goals/outcomes), §3 (friction), §5 (feedback), §10 (tradeoffs); drop or shorten the rest.
- **Stakeholder deck:** Lead with §2 and §3; add §6 (decision points) and §7 (learnability); keep §12 and §13 short.
- **Design review:** Emphasize §3, §6, §7, §10; include §9 (accessibility scope) and §11 (errors).
- **Interview prep:** Know §2, §3, §5, §10; be ready to give one example each for “friction we reduced,” “tradeoff we made,” and “clarity at a decision point.”

---

*This is the full UX reference for Paper Games / Visioneer Studios. Trim by section or audience as needed; the long form is the master.*

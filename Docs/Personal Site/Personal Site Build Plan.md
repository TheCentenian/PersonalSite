# Personal Site — Step-by-Step Build Plan

Based on **Personal Site/Website.md**, **Career and Overview/** docs, **Resumes/Vetted/**, and **Projects/** docs. The site currently features three projects (Aqueduct, Evarra Tracker, SuiTwo); additional project docs exist for **Evarra Tracker** (UI/UX), **Military card-board game**, **Paradigm Wallet**, and **Insomnia**—see **Docs/README.md** for the full list and use when adding or expanding project pages. Adjust order or scope as you like.

---

## Purpose (why this site exists)

The site is an **engineering profile** in service of a concrete goal:

- **Audience:** The Sui community—especially people who are influential (founders, technical leads, ecosystem drivers) and can offer a **job** or a **collaboration** where you earn income.
- **Goal:** Promote yourself so that when they look you up or get your link, they see what you’ve built, how you think, and that you’re open to roles and paid work in the ecosystem.
- **Why engineering tone:** That audience respects substance: clear explanations, architecture, shipped systems. The site should feel like a builder’s portfolio so it attracts the right kind of opportunity—not generic marketing.

Every page and every piece of copy should pass the test: *Does this help influential Sui people see me as someone they’d hire or collaborate with?*

**Target roles and positioning:** See **Personal Site/Role Positioning and Messaging.md** (distilled from your ChatGPT conversation). It lists the role types that fit your stack (Web3 product architect, game economy / game infra, wallet product engineering, protocol-adjacent), how to phrase your positioning (“blockchain usability and transaction clarity,” systems thinker), and what to highlight per project so the site speaks to the right readers.

---

## Principles (from your docs)

- **Tone:** Engineering portfolio, not marketing. Clear explanations, diagrams, technical thinking. Less hype, more substance. (Serves the purpose above.)
- **Identity:** **The Centenian** as headline/brand; **Built by Luis Centeno** in footer. Real name present but secondary.
- **Stack:** Next.js, TypeScript, Tailwind. Host on Vercel. Domain later (e.g. thecentenian.dev, centenian.xyz).
- **Content sources:** Vetted resumes = source of truth for About/facts. PORTFOLIO_* docs = source of truth for project scope. Older project .md files and Web3 resumes = unvetted; cross-check or condense from PORTFOLIO_*.
- **Open to work:** Signal clearly (e.g. About and/or Contact) that you’re open to roles and collaborations in the Sui ecosystem—so influential visitors know they can reach out.

---

## Phase 1: Foundation

### Step 1.1 — Create the project
- [ ] New Next.js app (App Router), TypeScript, Tailwind, ESLint.
- [ ] Project in this workspace (e.g. `site/` or repo root).
- [ ] Git init (optional but recommended).
- [ ] Verify: `npm run dev` runs, Tailwind works.

### Step 1.2 — Global layout and design system
- [ ] Root layout: semantic HTML, viewport, one global nav.
- [ ] Typography: pick a clear, readable font (e.g. system stack or one Google font).
- [ ] Colors: simple palette (e.g. dark or light base; one accent). Keep it minimal.
- [ ] Nav: Home | Projects | Architecture | About | Contact (match Website.md).
- [ ] Footer: “Built by Luis Centeno” + optional small links (GitHub, X).

### Step 1.3 — Home page (first slice)
- [ ] Hero: **The Centenian** / tagline (e.g. “Web3 Infrastructure Builder” or “Exploring decentralized systems on Sui”).
- [ ] Short paragraph: systems design focus, blockchain usability, modular architecture (from Website.md).
- [ ] Optional: very short “Selected projects” teaser (titles + links). No need for full content yet.
- [ ] No photo; optional logo or geometric avatar later.

---

## Phase 2: Core pages (content)

### Step 2.1 — About (Web3-focused, resume-accurate)
- [ ] **Focus:** Web3 / Sui only. Voice aligned with X profile and posts (ecosystem builder, product architect, systems thinker; experimental apps, blockchain UX, asset ownership, event-driven systems).
- [ ] **Facts (from vetted resumes only):**
  - **Current:** Product Owner & Project Manager — Independent/Freelance Web3 Initiatives | **2024 — Present**. AI, Web3, and Emerging Tech projects (portfolio tracker, liquidity automation, blockchain-integrated game prototypes; Next.js, React, TypeScript, Sui).
  - **Education:** M.S., Information Technology — Southern New Hampshire University. B.A., Communication (Business Administration Minor) — University of New Hampshire.
  - **Prior (one line for credibility):** Service Delivery Manager, Retail Business Services (Ahold Delhaize), Jan 2018 — Aug 2024; enterprise IT leadership, incident response, cross-functional coordination.
- [ ] **Narrative:** Lead with who you are in Web3 (X bio); “over the past year and a half” focused on learning and building in Sui; many ideas → prototypes and MVPs; soon sharing more complete systems. Keep prior career to one short sentence; no need for Puerto Rico or lengthy backstory unless you want it.
- [ ] **Content guide:** See **Personal Site/About Page Content Direction.md** (X bio, post snippets, resume facts, draft wording).
- [ ] Optional: link to full resume (PDF) if you host it.

### Step 2.2 — Contact
- [ ] Email (prefer dedicated Web3: e.g. contact@centeno.dev).
- [ ] GitHub, X (Twitter), LinkedIn optional.
- [ ] No home address; location at most “United States” or “Remote” (privacy).
- [ ] Optional short line: “Open to roles and collaborations in the Sui ecosystem” so the signal is clear next to how to reach you.

### Step 2.3 — Projects (one page per project)
Use the **PORTFOLIO_*** docs as the single source of truth; condense for the web.

- [ ] **Aqueduct Platform**
  - Source: `PORTFOLIO_AQUEDUCT_PLATFORM.md` — Key Points, Sections 7 & 8 for “what you can say” and positioning.
  - Content: What it is (shared infra on Sui, SaaS, apps define / platform executes), build-and-sign, no app keys on platform; list main modules/capabilities in plain language.
  - Optional: one architecture or module diagram (even simple); link to GitHub if public.

- [ ] **Evarra Tracker**
  - Source: `Projects/Evarra Tracker/PORTFOLIO_AND_ACCOMPLISHMENTS.md` — Key Points, technical summary.
  - Content: Goals + wallets + transaction translation (readable activity), backend for persistence and history; tech stack (React, Next.js, TypeScript, Sui, MongoDB if relevant).
  - Optional: screenshot of UI; link to GitHub if public.

- [ ] **SuiTwo Market Shooter**
  - Source: `Projects/SuiTwo/PORTFOLIO_SUITWO_SHOOTER.md` — Key Points, Sections 7 & 8.
  - Additional sources (for UI/UX or narrative angle): `Projects/SuiTwo/PORTFOLIO_UI_UX_SUITWO_SHOOTER.md` (talking points, design system, responsive highlight); `Projects/SuiTwo/SuiTwo Market Shooter Revised.md` (design goals, interface architecture, responsive narrative). Full UI/UX detail in `Projects/SuiTwo/UI_SUITWO_SHOOTER.md` and `Projects/SuiTwo/UX_SUITWO_SHOOTER.md` if needed.
  - Content: Market-themed shooter on Sui; verified scores, leaderboard, store, soulbound badge, tournaments, game pass; backend builds / player signs.
  - Optional: screenshot or short video; link to playable build and GitHub if public.

For each project page: title, 1–2 short paragraphs, 3–5 bullet highlights, optional diagram/screenshot, optional GitHub link. No need to duplicate the full PORTFOLIO_* text.

### Step 2.4 — Architecture (where you shine)
- [ ] Source: PORTFOLIO docs + Website.md (“Aqueduct module diagrams, system flow, Evarra Tracker flow”).
- [ ] Content: One or two high-level diagrams or descriptions:
  - Aqueduct: apps → platform (Conduit/Corridor, Chart, Helm, Station, Regatta, Terminal, Sustain, etc.) and “apps define, platform executes.”
  - Evarra Tracker: wallet/goals → backend/Sui → translation → UI (optional diagram).
  - SuiTwo: game ↔ backend ↔ platform (optional).
- [ ] Prefer diagrams (Mermaid, Excalidraw export, or simple SVG) over long prose. Engineers like visuals.

---

## Phase 3: Polish and deploy

### Step 3.1 — Copy and consistency
- [ ] Cross-check About vs vetted resumes (names, dates, titles).
- [ ] Ensure project names everywhere: **Aqueduct Platform**, **Evarra Tracker**, **SuiTwo Market Shooter**.
- [ ] Spell-check and one read-through for tone (clear, no hype).

### Step 3.2 — Responsive and performance
- [ ] Nav and layout work on mobile (hamburger or stacked nav).
- [ ] Images (if any): sensible size/format; lazy-load if many.
- [ ] Run Lighthouse (or similar) and fix critical issues.

### Step 3.3 — Deploy
- [ ] Connect repo to Vercel (or deploy from CLI).
- [ ] Set env vars if any (e.g. contact form or analytics — optional).
- [ ] Test production URL; test all links (internal, GitHub, X, email).

### Step 3.4 — Domain (when ready)
- [ ] Buy domain (e.g. thecentenian.dev, centenian.xyz) and point to Vercel.
- [ ] Optional: redirect www → apex or vice versa.

---

## Phase 4: Optional later

- [ ] **Sui Research Notes:** Separate page with short articles (e.g. Sui object architecture, modular Web3 platforms, transaction readability). Add 1–2 when you have them; no need for launch.
- [ ] **Blog or “Thinking”:** If you want to add essays later, add a route and list; keep initial site small.
- [ ] **Resume PDF:** Host a one-pager (e.g. /resume) linking to PDF; update when vetted resume changes.
- [ ] **Contact form:** Optional (e.g. Resend, Formspree); otherwise mailto: is enough to start.

---

## Suggested order of work

1. **Phase 1** (Steps 1.1 → 1.3): Project + layout + Home. Get something live in the browser.
2. **Phase 2** (Steps 2.1 → 2.4): About, Contact, then the three project pages, then Architecture. You can do About and Contact in parallel with one project page.
3. **Phase 3** (Steps 3.1 → 3.4): Copy pass, responsive check, deploy, then domain.
4. **Phase 4:** Only after the core site is live and you’re happy with it.

---

## File and content reference

| Need | Source |
|------|--------|
| Docs folder structure and content map | Docs/README.md |
| Site structure, tone, identity | Personal Site/Website.md |
| About / bio / facts | Resumes/Vetted/ (UNH Resume, Resume expanded) |
| Aqueduct scope and wording | Projects/Aqueduct/PORTFOLIO_AQUEDUCT_PLATFORM.md (Key Points, §7, §8) |
| Evarra Tracker scope and wording | Projects/Evarra Tracker/PORTFOLIO_AND_ACCOMPLISHMENTS.md (Key Points) |
| Evarra Tracker UI/UX full detail | Projects/Evarra Tracker/UI_EVARRA_TRACKER.md, UX_EVARRA_TRACKER.md |
| SuiTwo scope and wording | Projects/SuiTwo/PORTFOLIO_SUITWO_SHOOTER.md (Key Points, §7, §8) |
| SuiTwo UI/UX overview and talking points | Projects/SuiTwo/PORTFOLIO_UI_UX_SUITWO_SHOOTER.md |
| SuiTwo UI/UX full detail | Projects/SuiTwo/UI_SUITWO_SHOOTER.md, Projects/SuiTwo/UX_SUITWO_SHOOTER.md |
| SuiTwo narrative / design overview | Projects/SuiTwo/SuiTwo Market Shooter Revised.md |
| Architecture narrative | Personal Site/Website.md + “Key Points” and architecture sections in each PORTFOLIO_* |
| Contact / privacy | Personal Site/Website.md (Contact, Privacy) |
| Additional projects (docs ready) | Projects/Military card-board game/, Paradigm Wallet/, Insomnia/ (each: PORTFOLIO_* + UI_* + UX_*); see Docs/README.md |

---

## Checklist summary

- [ ] Next.js + TypeScript + Tailwind project created and running
- [ ] Layout, nav, footer, design system
- [ ] Home page (The Centenian + short intro)
- [ ] About (from vetted resumes)
- [ ] Contact (email, GitHub, X)
- [ ] Project page: Aqueduct Platform
- [ ] Project page: Evarra Tracker
- [ ] Project page: SuiTwo Market Shooter
- [ ] Architecture page (diagrams + short narrative)
- [ ] Copy and consistency pass
- [ ] Responsive and basic performance check
- [ ] Deploy to Vercel
- [ ] Domain (when ready)
- [ ] Optional: Sui Research Notes, resume PDF, contact form
- [ ] Optional: Additional project pages (Military card-board game, Paradigm Wallet, Insomnia) when you want to feature them; Evarra Design and UX section when ready

You can tick off steps in this doc as we go. When you’re ready, we can start with **Step 1.1** (create the Next.js project) and then do layout and Home.

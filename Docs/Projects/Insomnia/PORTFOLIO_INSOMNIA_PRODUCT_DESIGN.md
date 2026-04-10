# Portfolio — Insomnia: Product & Interface Design

A design-thinking summary of **Insomnia** (Web3 endurance reflex game). For implementation scope and stack, see `Docs/PORTFOLIO_INSOMNIA_GAME.md`; for UX/UI systems detail, see `Docs/UX_INSOMNIA_GAME.md` and `Docs/UI_INSOMNIA_GAME.md`.

---

## Design lens (quick map)

1. **User problem** — Players want a **fast, fair reflex challenge** they can try **without crypto setup**, with an **optional path** to compete, persist progress, and customize the experience on mobile.
2. **Main flows** — **Home** (positioning → demo vs premium) → **`/game`** (start → first safe block → timed play → game over) → **header Menu** (Profile / Statistics / Leaderboard / Settings) without leaving the play context.
3. **Key interactions** — **Start** reveals a forgiving first target; **first click** commits to full rules; **wrong clicks** are harmless until then; **Menu** opens **modals** (not new routes) for secondary tasks; **landing** routes demo via query param and premium via wallet + `/game`.
4. **Visual design** — **Tokenized neon/cyber palette** (accent1/2/3 on dark ground), **gradient hero title**, **card-style** demo/premium choices, **centered grid** as focal point, **system typography** for performance and familiarity, **atmospheric themes** (background layers + non-interactive overlays).
5. **Usability / friction** — **No wallet for demo**, **no auto-connect**, **no timeout on first block**, **stable viewport** (no page scroll during play), **large touch targets**, **accessibility modes** (reduced motion, high contrast, keyboard/screen-reader support), **lazy-loaded modals** to keep initial load light.
6. **Complexity management** — **Progressive strictness** (learn → commit → compete); **secondary features in modals**; **stats and leaderboard** behind one Menu; **freemium split** explained in plain bullets on the landing cards.

---

## Portfolio write-up

**Project:**  
Insomnia — a mobile-first **5×5 reflex endurance game** with a **demo** mode and a **premium** layer on Sui (wallet, credits, on-chain stats, leaderboards). The interface prioritizes **immediate play** and **legible difficulty**, with Web3 as an **upgrade path**, not a gate to the core loop.

**Problem:**  
Reflex games often punish users before they understand the rules; Web3 games often force **wallet friction** before fun. The product needed to **prove the loop in seconds**, then let motivated players **opt in** to persistence, competition, and identity—without losing **trust** or **clarity** about what is saved on-chain.

**User Flow:**  
Land on **home** with clear positioning (“Web3 Endurance Challenge”) and two paths: **Free Demo** → `/game?mode=demo` (full loop, local outcome only) or **Premium** → connect wallet → `/game` (credits, submission, stats). In-session, users **Start Game**, see a **stationary first target**, click to begin **timed rounds** with **escalating speed**, then hit **Game Over** with summary and **Play Again**. Global needs (**profile, stats, leaderboard, settings**) route through a **persistent header Menu** as **overlays**, keeping users oriented on the game surface.

**Design Decisions:**  
**Visual hierarchy** separates **hero brand** from **action cards** (demo vs premium use distinct accent emphasis). **CSS-variable themes** unify color, border, and glow so the same components read as one product across **four atmospheres**. **Layout** centers the grid and caps width for thumb reach; **no document scroll** avoids accidental gesture conflict during play. **Typography** stays utilitarian (short labels, numeric stats) so cognitive load stays on reaction time, not reading.

**Interaction Behavior:**  
**Clicks** on the grid are **safe for exploration** until the first target is hit; after that, **misses and wrong taps end the run**—a deliberate **two-phase contract**. **Navigation** favors **modals** over route churn for **Profile, Statistics, Leaderboard, Settings**, preserving context and supporting quick **dismiss** (backdrop / outside click). **Landing** uses **links** for play and a **wallet connect** affordance when premium is selected but disconnected.

**Result:**  
An experience that reads as **arcade-first**: try instantly, understand through doing, then deepen with **stats, ranks, and personalization** when the player chooses. Complexity is **staged** (gentle onboarding → strict skill test → optional social/progression surfaces), aligning **product goals** with **perceived fairness** and **lower drop-off** at first contact.

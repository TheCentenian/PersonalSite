export type ProductDesignPortfolio = {
  project: string;
  problem: string;
  userFlow: string;
  designDecisions: string;
  interactionBehavior: string;
  result: string;
};

export type ProductDesignCase = {
  slug: string;
  title: string;
  subtitle: string;
  teaser: string;
  projectHref: string;
  userProblem: string;
  flows: string[];
  interactions: string[];
  visualDesign: string[];
  usability: string[];
  complexity: string[];
  portfolio: ProductDesignPortfolio;
};

export const productDesignCases: ProductDesignCase[] = [
  {
    slug: "evarra-tracker",
    title: "Evarra Tracker",
    subtitle: "Goals, wallets, and an Insights workspace—design thinking overview.",
    teaser:
      "One place for progress, nested goals, wallet context, and composed analysis—with trust and progressive disclosure.",
    projectHref: "/projects/evarra-tracker",
    userProblem:
      "People who track personal goals and optionally connect crypto wallets need one place to see progress, organize nested work (parent goals and subgoals), review wallet context (holdings and transactions, with Sui as the strongest path today), and compose a slice of that world for analysis—without feeling blocked by slow first loads or overwhelmed by power-user surfaces on day one.",
    flows: [
      "Auth → work: Login (inline validation) → success lands on Tracker as the default home loop; signup and password reset sit alongside login.",
      "Primary nav (top bar): Tracker → Wallets → Goals → Insights → Settings (with icons and clear active state on the current route).",
      "Tracker: Search, filter, expand/collapse goal hierarchy, create goals, open goal details (simple vs advanced panel depending on settings).",
      "Goals: Dedicated list/grid management with the same search/filter header pattern; create (basic vs advanced); delete with confirmation.",
      "Wallets: List + split layout—select a wallet, details open in a side panel with tabs (holdings, transactions); add wallet via dialog; refresh and delete from cards; optional show-all transactions / sync flows with explicit progress.",
      "Insights: Three-column mental model on large screens (available items → selection pool → analysis types placeholder / results); stacked on small screens. Drag goals and wallets into the pool; tokens appear only when wallets are in the pool; run analysis into a results area.",
      "Settings: General (including advanced feature toggles), appearance (theme), notifications, privacy.",
    ],
    interactions: [
      "Consistent page chrome: Title + description on the left; search, filters, and primary actions cluster in a shared header pattern so list pages behave predictably.",
      "Details without leaving the list: Wallet (and optionally goal) details use side panels and tabs instead of forcing a new page for every drill-down.",
      "Insights as explicit composition: Selection is visible and editable (drag in, remove from pool); Analyze is gated until there is something to analyze; errors can surface in-context.",
      "Trust during slow operations: Wallet sync uses a progress dialog with counts/percent and copy that allows navigating away when background work continues; a service notice on Wallets sets expectations for cold-start latency.",
      "Feedback: Toasts for successful CRUD and refresh; loading staged for wallet balances; Insights may show a skeleton while client-only drag-and-drop loads; auth gating shows a spinner rather than a half-broken shell.",
    ],
    visualDesign: [
      "System: Tailwind with CSS variable–driven light/dark themes; Inter for UI, monospace for addresses.",
      "Brand accent: Azure/blue primary for links, active nav pill, and primary actions; muted foreground for secondary copy and hierarchy.",
      "Semantics: Destructive styling for dangerous actions; success/progress cues where completion matters (e.g. sync).",
      "Layout density: Centered container with comfortable padding on document pages; full viewport height minus nav for Wallets and Insights so panels and internal scroll regions stay stable (important for drag-and-drop and split views).",
      "Auth: Forced dark on auth routes for a consistent first impression; journey theme follows user preference after login.",
    ],
    usability: [
      "Muscle memory: Same search/filter/create rhythm across Tracker, Goals, and Wallets reduces relearning.",
      "Empty states: Differentiate “nothing here” from “filters hide everything” so users know what to do next.",
      "Progressive disclosure: Advanced feature toggles in Settings let beginners stay on simpler grids and panels while experts opt into richer layouts.",
      "Cognitive load on Insights: Tokens stay out of the main catalog until wallets are selected—scoping the problem to goals + wallets first, then tokens.",
      "Honest latency messaging: Free-tier / cold-start copy and sync progress prevent retry loops and abandoned sessions driven by mistrust.",
    ],
    complexity: [
      "Hierarchy with control: Goal trees expand and collapse so users choose depth of detail.",
      "Optional advanced UI: One product, two comfort levels—complexity is a preference, not a forced mode.",
      "Background work as first-class: Long sync is modeled as work that can continue while the user moves on, with visible state and recovery paths on failure.",
      "Phased Insights: Analysis types / right column can evolve without breaking the core select → act → see output model; client-only DnD trades a brief loading moment for predictable behavior.",
    ],
    portfolio: {
      project:
        "Evarra Tracker — a web app for goal tracking, wallet-connected context (Sui-forward), and a drag-and-drop Insights workspace that turns selected goals, wallets, and tokens into an analysis run.",
      problem:
        "Users juggling goals and on-chain context need clarity and continuity: they should resume quickly, understand slow first loads, and build an analysis set without hunting through hidden filters or guessing what will be included.",
      userFlow:
        "Sign in → land on Tracker for the core tracking loop → use Goals when organizing → connect and review Wallets in a list + detail panel → compose scope on Insights (drag into pool, add tokens when wallets are present, run analysis) → tune experience in Settings (theme, advanced UI toggles).",
      designDecisions:
        "Anchor the product on a repeatable page header (search, filters, primary action); use split layouts and side panels for drill-down without navigation churn; use primary accent and muted hierarchy across light/dark; set explicit expectations for latency and sync; expose advanced layouts only when users opt in.",
      interactionBehavior:
        "Selection and destructive actions are visible and confirmed where it matters; loading and sync show stage and progress, not silent waits; Insights keeps the next step obvious (pool contents → Analyze → results area).",
      result:
        "A coherent system that favors predictability and trust over novelty: users always know where they are in the nav, what will be analyzed, and why the app might be slow—so they can stay in flow instead of fighting the interface.",
    },
  },
  {
    slug: "insomnia",
    title: "Insomnia",
    subtitle: "Web3 endurance reflex game—demo-first, wallet as an upgrade path.",
    teaser:
      "Prove the loop in seconds, then opt into persistence and competition—fair rules, modals over route churn, neon atmosphere on a stable play surface.",
    projectHref: "/projects/insomnia",
    userProblem:
      "Players want a fast, fair reflex challenge they can try without crypto setup, with an optional path to compete, persist progress, and customize the experience on mobile. Reflex games often punish users before they understand the rules; Web3 games often force wallet friction before fun.",
    flows: [
      "Home: Positioning and choice of demo vs premium path.",
      "/game: Start → first safe block → timed play → game over; header Menu for Profile, Statistics, Leaderboard, Settings without leaving play context.",
      "Demo: Free Demo → /game?mode=demo — full loop, local outcome only.",
      "Premium: Connect wallet → /game — credits, submission, stats on-chain.",
    ],
    interactions: [
      "Start reveals a forgiving first target; first click commits to full rules; wrong clicks are harmless until then.",
      "Menu opens modals (not new routes) for secondary tasks.",
      "Landing routes demo via query param and premium via wallet + /game.",
      "Clicks on the grid are safe for exploration until the first target is hit; after that, misses and wrong taps end the run—a two-phase contract.",
      "Navigation favors modals over route churn for Profile, Statistics, Leaderboard, Settings, preserving context and quick dismiss (backdrop / outside click).",
      "Landing uses links for play and a wallet connect affordance when premium is selected but disconnected.",
    ],
    visualDesign: [
      "Tokenized neon/cyber palette (accent1/2/3 on dark ground), gradient hero title, card-style demo/premium choices.",
      "Centered grid as focal point; system typography for performance and familiarity.",
      "Atmospheric themes: background layers + non-interactive overlays.",
      "CSS-variable themes unify color, border, and glow across four atmospheres.",
      "Layout centers the grid and caps width for thumb reach; no document scroll during play.",
    ],
    usability: [
      "No wallet for demo; no auto-connect; no timeout on first block.",
      "Stable viewport (no page scroll during play); large touch targets.",
      "Accessibility: reduced motion, high contrast, keyboard and screen-reader support.",
      "Lazy-loaded modals keep initial load light.",
      "Freemium split explained in plain bullets on the landing cards.",
    ],
    complexity: [
      "Progressive strictness: learn → commit → compete.",
      "Secondary features in modals; stats and leaderboard behind one Menu.",
      "Complexity is staged: gentle onboarding → strict skill test → optional social/progression surfaces.",
    ],
    portfolio: {
      project:
        "Insomnia — a mobile-first 5×5 reflex endurance game with a demo mode and a premium layer on Sui (wallet, credits, on-chain stats, leaderboards). The interface prioritizes immediate play and legible difficulty, with Web3 as an upgrade path, not a gate to the core loop.",
      problem:
        "Reflex games often punish users before they understand the rules; Web3 games often force wallet friction before fun. The product needed to prove the loop in seconds, then let motivated players opt in to persistence, competition, and identity—without losing trust or clarity about what is saved on-chain.",
      userFlow:
        "Land on home with clear positioning and two paths: Free Demo → /game?mode=demo or Premium → connect wallet → /game. In-session: Start Game, stationary first target, timed rounds with escalating speed, Game Over with summary and Play Again. Global needs route through a persistent header Menu as overlays, keeping users oriented on the game surface.",
      designDecisions:
        "Visual hierarchy separates hero brand from action cards (demo vs premium use distinct accent emphasis). CSS-variable themes unify the product across four atmospheres. Layout centers the grid and caps width; no document scroll avoids gesture conflict during play. Typography stays utilitarian so cognitive load stays on reaction time, not reading.",
      interactionBehavior:
        "Clicks are safe for exploration until the first target is hit; after that, misses and wrong taps end the run. Navigation favors modals over route churn for Profile, Statistics, Leaderboard, Settings. Landing uses links for play and wallet connect when premium is selected but disconnected.",
      result:
        "An experience that reads as arcade-first: try instantly, understand through doing, then deepen with stats, ranks, and personalization when the player chooses. Complexity is staged, aligning product goals with perceived fairness and lower drop-off at first contact.",
    },
  },
  {
    slug: "sui-two-shooter",
    title: "SuiTwo Market Shooter",
    subtitle: "Market-themed arcade shooter with optional Web3 economy and competition.",
    teaser:
      "Play-first hub, prepaid balances, overlays instead of page sprawl, and gold framing when a run counts for tournaments.",
    projectHref: "/projects/suitwo",
    userProblem:
      "Players want a market-themed arcade shooter they can start quickly, optionally deepen with wallet, purchases, and competition, without treating every run like checkout. The UI answers: How do I play, know what I’m spending, compete, and learn rules—without getting lost in crypto or store complexity?",
    flows: [
      "Land → Enter Game → main menu: Front screen sets expectations (theme, controls hint); Enter Game loads the hub and reveals the full menu.",
      "Play loop: Start Game (primary) → optional item consumption when inventory exists → run → pause / game over → return to menu or tournament context when applicable.",
      "Economy: Store & Inventory (tabbed: items, inventory, game pass, tournament tickets) ↔ menu stats showing credits / tickets so “can I play?” is visible before tapping Play.",
      "Social / competition: Leaderboard and Tournaments (browse, enter, create) branch from the same hub; post-run flows can tie back to tournaments or menu.",
      "Onboarding & tuning: How to Play (dense reference in one place), Settings, Sound Test; Connect Wallet lives in the menu header as a parallel track, not blocking a demo path.",
    ],
    interactions: [
      "Primary action = Start Game: styled as the main CTA; gating (credits/tickets/demo) resolves in flow rather than hiding the whole experience.",
      "Panels and modals replace separate pages: consistent open/close; overlay coordination so surfaces don’t fight each other (especially on mobile).",
      "Store opens in context when the user needs a specific tab (e.g. tickets), reducing wrong-tab hunting.",
      "Item choice uses explicit states (available / selected / disabled) and one level per item type so builds stay valid without error messages.",
      "Loading and outcomes use context-specific messages and toasts so actions never feel silent.",
      "Tournament mode is reinforced after entry (e.g. gold canvas treatment) so “this run counts” stays mentally sticky.",
    ],
    visualDesign: [
      "Brand read: Sui-aligned blues plus market “green” accent on dark gradients; reads as one product from front page through HUD.",
      "Hierarchy: Primary button and title treatments draw the eye first; secondary actions share a consistent button row with icons for quick scanning.",
      "Typography: System stack and viewport-relative sizing keep type readable across devices without a separate mobile font story.",
      "Mode signaling: Gold theme for tournament surfaces and in-run framing differentiates competitive context from casual play without new navigation chrome.",
      "Motion: Light glow / pulse / fade-in on key surfaces—enough for polish, restrained enough for clarity during fast sessions.",
    ],
    usability: [
      "Prepaid play: Credits and tickets are bought in the store; consumption on Play avoids a wallet step every run—critical for arcade pacing.",
      "Skip empty steps: Item consumption UI appears only when inventory warrants it; otherwise the path stays short.",
      "Demo path: Play without wallet, with a clear end-of-demo path toward wallet or store when the product wants conversion.",
      "Trust at purchase: Prices, discounts (e.g. badge), and balance shortfall messaging are explicit; leaderboards and claims use visible feedback.",
      "Mobile: Single-layer overlays, touch-friendly targets, and device-based layout reduce mis-taps and stacked modals.",
    ],
    complexity: [
      "Progressive disclosure: Rules and depth live in How to Play (tabs + accordions) instead of blocking the first run with a forced tutorial.",
      "Wizard for creation: Tournament creation breaks into steps with validation rather than one overwhelming form.",
      "Separation of concerns in the hub: Wallet and badge are secondary surfaces in the header; the vertical menu keeps play, learn, compete, and shop discoverable without one mega-screen.",
      "Consistent patterns: Same modal/panel language across store, leaderboard, and tournaments so learning one surface transfers to others.",
    ],
    portfolio: {
      project:
        "SuiTwo Market Shooter — a browser-based market-themed shooter with optional Web3 economy, store, leaderboards, and tournaments.",
      problem:
        "Players need a fast, readable loop from open tab to playing, with optional depth (wallet, purchases, competition) that does not force a transaction or cognitive overload on every run.",
      userFlow:
        "Front page → Enter Game → main menu hub → Start Game (with automatic credit/ticket use) → optional item pick → run → feedback overlays → return to menu or tournament surfaces; parallel paths for Store, Leaderboard, Tournaments, How to Play, Settings, and wallet connect.",
      designDecisions:
        "Dark gradient shell with Sui-blue and market-green identity; gold for tournament context; primary CTA for play; tabbed store and tabbed reference content; viewport-aware typography and layout; consistent overlay components for all secondary tasks.",
      interactionBehavior:
        "Contextual store entry, selection states that encode one per type, loading copy that matches the operation, toasts for outcomes, and in-run visuals that reinforce tournament mode; mobile favors one focused layer at a time.",
      result:
        "An interface that reads as a single cohesive game first and a wallet-aware, competitive product second—using prepaid balances, contextual navigation, and mode-specific visuals to keep the core loop light while supporting progression, social proof, and monetization without breaking arcade flow.",
    },
  },
];

export const productDesignSlugs = productDesignCases.map((c) => c.slug);

export function getProductDesignCase(slug: string): ProductDesignCase | undefined {
  return productDesignCases.find((c) => c.slug === slug);
}

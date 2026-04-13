import Link from "next/link";
import { FlowBlock } from "@/components/ContentBlocks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture",
  description: "System design and flow across projects: structure, modules, and end-to-end build patterns.",
};

function DesignBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-slate-300 dark:border-slate-600 bg-slate-50/80 dark:bg-slate-800/50 p-4">
      <span className="inline-block rounded-full bg-slate-200/80 dark:bg-slate-700/80 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
        Design
      </span>
      <div className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

const listClass = "list-none space-y-2 [&>li]:pl-4 [&>li]:relative [&>li]:before:content-[''] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.45em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-slate-400 dark:[&>li]:before:bg-slate-500";

export default function ArchitecturePage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Architecture
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          System design and flow for each project.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {/* Evarra */}
        <section
          className="opacity-0 animate-fade-in-up rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden"
          style={{ animationDelay: "80ms" }}
        >
          <div className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Evarra Tracker
              </h2>
              <Link
                href="/projects/evarra-tracker"
                className="group text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
              >
                View project
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Translating complex blockchain transaction data into human-readable information. Users add wallets, define and track goals, run analytics. Backend provides persistence and history.
            </p>
            <div className="mt-5 space-y-4">
              <DesignBlock>
                <ul className={listClass}>
                  <li><strong className="text-slate-900 dark:text-slate-100">Translation pipeline:</strong> Backend fetches on-chain data; classifies types (transfer, swap, stake, NFT, liquidity, lending, etc.), direction (in/out), attaches token metadata for UI.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Core features:</strong> Wallets, Goals, and Reporting are primary product features.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Search and filters:</strong> Search and filter functions are built into Wallets, Goals, and Reporting workflows; users can narrow and sort transactions, holdings, and goal activity.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Goals:</strong> Users create goals; may be grouped under a parent. Tracking scoped to one or more wallets or manual data.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Insights (planned):</strong> Select goals/wallets, then tokens, then basic analytics (e.g. largest transfer, count); time range configurable; advanced analytics later.</li>
                </ul>
              </DesignBlock>
              <FlowBlock>
                <p>Users add wallet addresses in the app. The backend fetches transactions and holdings from chain (or store), normalizes and enriches them.</p>
                <p>The frontend displays rows by type, symbol, amount, and direction—so on-chain activity is readable instead of raw hashes and coin types.</p>
              </FlowBlock>
            </div>
          </div>
        </section>

        {/* Aqueduct */}
        <section
          className="opacity-0 animate-fade-in-up rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden"
          style={{ animationDelay: "160ms" }}
        >
          <div className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Aqueduct SaaS Platform
              </h2>
              <Link
                href="/projects/aqueduct"
                className="group text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
              >
                View project
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Shared infrastructure on Sui, multi-tenant: ecosystems and apps consume the same deployment. All state is on-chain; no separate database.
            </p>
            <div className="mt-5 space-y-4">
              <DesignBlock>
                <ul className={listClass}>
                  <li><strong className="text-slate-900 dark:text-slate-100">Model:</strong> Apps define catalogs, participation flows, distribution rules, and NFT collections; the platform executes.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Event services:</strong> Station handles generic events (create, enter, submit). Regatta adds tournaments on top; all-vs-all competition is what runs in production today, with more shapes planned. Barometer (polls/surveys, Station type 8) and Exchange (auctions, type 9) are planned extensions on the same model.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Commerce and catalogs:</strong> Catalog definitions and commerce offers; platform executes purchase from catalog.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Balances, distribution, vaults:</strong> Balances and units (merge, consume). Distribution for milestones, payouts; vaults lock assets and release per app-defined rules.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">NFT operations:</strong> Apps define collections; platform executes mint, upgrade, burn, merge. Transfer policies app-defined.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Identity and entitlements:</strong> Wallet connect, identity resolution, entitlements (grant/revoke). App-scoped auth.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Player records (Insignia):</strong> Apps attach small key–value payloads per wallet; the platform stores them scoped to ecosystem and app while semantics stay with the app.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Transaction operations:</strong> Platform builds, estimates, batches, executes. Registry and app config on-chain; resolves ecosystem and app directory and handle→ID.</li>
                </ul>
              </DesignBlock>
              <FlowBlock>
                <p>Apps define catalogs, participation flows, distribution rules, and NFT collections; the platform executes.</p>
                <p>An app or game calls the platform API with app-scoped auth.</p>
                <p>The platform reads and writes state on-chain and executes—building and running transactions as needed.</p>
              </FlowBlock>
            </div>
          </div>
        </section>

        {/* SuiTwo Market Shooter (SuiTwo Shooter docs folder) */}
        <section
          className="opacity-0 animate-fade-in-up rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden"
          style={{ animationDelay: "240ms" }}
        >
          <div className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                SuiTwo Market Shooter
              </h2>
              <Link
                href="/projects/suitwo"
                className="group text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
              >
                View project
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Market-themed shooter on Sui. Players connect a wallet; scores and progression verified on-chain. Leaderboard, store, soulbound badge, tournaments, game pass. Backend builds transactions; players sign and submit.
            </p>
            <div className="mt-5 space-y-4">
              <DesignBlock>
                <ul className={listClass}>
                  <li><strong className="text-slate-900 dark:text-slate-100">Frontend and backend:</strong> Game frontend talks to Next.js game backend; modular UI, responsive (desktop and mobile). Backend uses platform for catalogs, events, competitions, balances (game pass), distribution, NFT (badge), and Insignia when the game keeps extra player state on the platform. Game-specific logic (score verification, achievements, badge tiers) in game backend and Move contracts.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Tournaments:</strong> Create tournaments; players enter and submit scores. Pools may have creator ante; ticket values added on entry. Thresholds met → creators and winners earn. Platform handles lifecycle (create, enter, submit-score, payout); game defines rules and scoring.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Store:</strong> Consumables, credits, tournament tickets. Game backend and platform handle catalog, inventory, transaction build; wallet signs and submits.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Soulbound badges:</strong> Non-transferable NFT that evolves; tier (Starter–Legendary) sets discounts on store, gameplay, tickets. Platform does mint/upgrade; game defines tier rules.</li>
                </ul>
              </DesignBlock>
              <FlowBlock>
                <p>Player action (submit score, purchase, claim achievement, enter tournament) goes to the game backend.</p>
                <p>Backend calls the platform API to build the transaction, then returns an unsigned payload to the frontend. The player’s wallet signs and submits.</p>
              </FlowBlock>
            </div>
          </div>
        </section>

        {/* Insomnia */}
        <section
          className="opacity-0 animate-fade-in-up rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden"
          style={{ animationDelay: "320ms" }}
        >
          <div className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Insomnia Game
              </h2>
              <Link
                href="/projects/insomnia"
                className="group text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
              >
                View project
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Reflex game on a 5×5 grid; difficulty ramps over time.
              <span className="block">Freemium: demo without wallet, or wallet + GamePass.</span>
              <span className="block">Play with less friction: credits you purchase cover the in-game transaction costs, so you don't have to approve every transaction before play.</span>
            </p>
            <div className="mt-5 space-y-4">
              <DesignBlock>
                <ul className={listClass}>
                  <li>Next.js 15, React 19, TypeScript, Tailwind frontend; Node/Express backend; Sui Move (GamePass, ScoreSystem, AdminSystem).</li>
                  <li>First block no timeout; credits at start boundary. Leaderboards and stats (endurance, clicks, efficiency, skill tier) from chain. Profile, Statistics, Leaderboard, Settings via modals. WCAG 2.1 AA, PWA-ready.</li>
                </ul>
              </DesignBlock>
              <FlowBlock>
                <p>Demo mode runs client-only—no backend.</p>
                <p>With a wallet, the game calls the backend to build and sponsor transactions; scores and progression are recorded on-chain.</p>
              </FlowBlock>
            </div>
          </div>
        </section>

        {/* Military */}
        <section
          className="opacity-0 animate-fade-in-up rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden"
          style={{ animationDelay: "400ms" }}
        >
          <div className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Military Card-Board Game
              </h2>
              <Link
                href="/projects/military-board-game"
                className="group text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
              >
                View project
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Two-player tactical card/board game: deploy from hand, move, combat, capture territory. Multi-resource economy; playable vs unplayable card states.
            </p>
            <div className="mt-5 space-y-4">
              <DesignBlock>
                <ul className={listClass}>
                  <li>React + TypeScript + Vite; GameContext and useReducer; hooks for board, placement, movement, combat. Start screen (battle type); board with zoom; cell selection and potential moves; hand; card states (selected, playable, unplayable); player status and action log. Viewport-locked layout.</li>
                </ul>
              </DesignBlock>
              <FlowBlock>
                <p>Single-session; all state lives in the client.</p>
                <p>Skirmish: deploy on the starting row, move by Manhattan distance, resolve combat with modifiers. Win by capturing all opponent starting positions. Rules are discoverable through constraints and UI feedback.</p>
              </FlowBlock>
            </div>
          </div>
        </section>

        {/* Paper Games */}
        <section
          className="opacity-0 animate-fade-in-up rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden"
          style={{ animationDelay: "480ms" }}
        >
          <div className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Paper Games
              </h2>
              <Link
                href="/projects/paper-games"
                className="group text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
              >
                View project
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Early development. Paper-based NFT game concepts (puzzles, caption contests, interactive art). Only the design canvas (art editor) has been built so far, and it is not complete. Next.js frontend, Konva canvas, Sui wallet connection; no backend or contracts yet.
            </p>
            <div className="mt-5 space-y-4">
              <DesignBlock>
                <ul className={listClass}>
                  <li><strong className="text-slate-900 dark:text-slate-100">Stack:</strong> Next.js (App Router), React, TypeScript, Tailwind; Konva + react-konva for canvas; @mysten/sui and wallet-standard for Sui wallet. No backend or contracts.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Current scope:</strong> Nav (Home, Art Editor, placeholders for Create/Games/Marketplace); home hero and cards; Art Editor route with Konva stage, toolstrip (select, brush, fill, eraser, shapes), colors, undo/redo, grid, transformer. WalletConnect in header. Canvas in progress, not complete.</li>
                </ul>
              </DesignBlock>
              <FlowBlock>
                <p>Static frontend only. The user opens home or the Art Editor; wallet is optional.</p>
                <p>Art editor state (tools, history) is in-memory—no persistence yet. Next steps: complete the canvas, then add backend, contracts, and game flows.</p>
              </FlowBlock>
            </div>
          </div>
        </section>

        {/* Paradigm */}
        <section
          className="opacity-0 animate-fade-in-up rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden"
          style={{ animationDelay: "560ms" }}
        >
          <div className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Paradigm Wallet
              </h2>
              <Link
                href="/projects/paradigm-wallet"
                className="group text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
              >
                View project
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Lightweight Sui wallet web UI: connect, switch networks, balance, send/receive (copy and QR), history. Theme and network preference in localStorage.
            </p>
            <div className="mt-5 space-y-4">
              <DesignBlock>
                <ul className={listClass}>
                  <li>React + Vite, dApp Kit, Sui SDK, TanStack React Query, react-hot-toast. NetworkContext, TransactionContext, SettingsContext; theme and default network in localStorage.</li>
                  <li>Tabs: Wallet, Send, Receive, History, Settings. Send via TransactionBlock and useSignAndExecuteTransaction; receive with copy and QR (network metadata); history merged and deduped by digest.</li>
                </ul>
              </DesignBlock>
              <FlowBlock>
                <p>User connects via dApp Kit; the app reads balance and history from chain.</p>
                <p>Send: enter amount and recipient, app builds the transaction, user signs and submits. Receive: show address and QR. All state is client-side; there is no backend.</p>
              </FlowBlock>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "640ms" }}>
        <Link
          href="/projects"
          className="link-accent link-underline inline-flex items-center text-sm font-medium gap-1 group"
        >
          View projects
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </div>
  );
}

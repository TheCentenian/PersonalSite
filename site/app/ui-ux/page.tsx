import Link from "next/link";

function UiBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-slate-300 dark:border-slate-600 bg-slate-50/80 dark:bg-slate-800/50 p-4">
      <span className="inline-block rounded-full bg-slate-200/80 dark:bg-slate-700/80 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
        UI
      </span>
      <p className="sr-only">What we built: structure, components, and visual design.</p>
      {children}
    </div>
  );
}

function UxBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-emerald-400/70 dark:border-emerald-500/60 bg-emerald-50/40 dark:bg-emerald-950/30 p-4">
      <span className="inline-block rounded-full bg-emerald-200/80 dark:bg-emerald-800/50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
        UX
      </span>
      <p className="sr-only">Why and how it serves users: goals, flows, and outcomes.</p>
      {children}
    </div>
  );
}

function ProjectCard({
  title,
  href,
  delay,
  highlight,
  uiContent,
  uxContent,
}: {
  title: string;
  href: string;
  delay: string;
  highlight?: React.ReactNode;
  uiContent: React.ReactNode;
  uxContent: React.ReactNode;
}) {
  return (
    <section
      className="opacity-0 animate-fade-in-up rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden"
      style={{ animationDelay: delay }}
    >
      <div className="p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
            {title}
          </h2>
          <Link
            href={href}
            className="group text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
          >
            View project
            <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        {highlight && (
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {highlight}
          </p>
        )}
        <div className="mt-6 space-y-5">
          <UiBlock>
            <ul className="mt-3 space-y-2.5 text-slate-600 dark:text-slate-400 list-none text-sm leading-relaxed [&>li]:pl-4 [&>li]:relative [&>li]:before:content-[''] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.45em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-slate-400 dark:[&>li]:before:bg-slate-500">
              {uiContent}
            </ul>
          </UiBlock>
          <UxBlock>
            <ul className="mt-3 space-y-2.5 text-slate-600 dark:text-slate-400 list-none text-sm leading-relaxed [&>li]:pl-4 [&>li]:relative [&>li]:before:content-[''] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.45em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-emerald-500 dark:[&>li]:before:bg-emerald-400">
              {uxContent}
            </ul>
          </UxBlock>
        </div>
      </div>
    </section>
  );
}

export default function UiUxPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          UI and UX
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Design and user experience for each project.
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          <strong className="text-slate-700 dark:text-slate-300">UI</strong> is what we built—structure, components, and visual design.{" "}
          <strong className="text-slate-700 dark:text-slate-300">UX</strong> is why and how it serves users—goals, flows, and outcomes.
        </p>
      </div>

      <div className="mt-12 space-y-10">
        <ProjectCard
          title="Evarra Tracker"
          href="/projects/evarra-tracker"
          delay="80ms"
          uiContent={
            <>
              <li>Design system: theme tokens, Tailwind and CSS variables, dark mode. App shells (auth vs journey), top nav, page containers and panels.</li>
              <li>Feature UI for Wallets, Goals, Reporting, Insights, Settings, Auth. Shared and feature components (goal cards, wallet cards, insights drag-and-drop).</li>
              <li>Feedback: toasts, spinners, loading skeletons, error states. Search and filters are built into Wallets, Goals, and Reporting workflows.</li>
            </>
          }
          uxContent={
            <>
              <li><strong className="text-slate-900 dark:text-slate-100">Outcomes:</strong> “I can come back and continue quickly”; “I can always find what I’m looking at”; “I can add a wallet and see progress without blocking”; “I can build a meaningful selection for analysis.”</li>
              <li><strong className="text-slate-900 dark:text-slate-100">Flows:</strong> Auth to tracker with inline validation; tracker as home with clear empty states and hierarchy; goals management with simple flows for beginners and advanced options for power users, via progressive disclosure.</li>
            </>
          }
        />

        <ProjectCard
          title="SuiTwo Market Shooter"
          href="/projects/suitwo"
          delay="160ms"
          uiContent={
            <>
              <li>Responsive, device-aware layout (desktop vs mobile) with viewport-relative sizing.</li>
              <li>Modular theme (Sui blue, market green, gold for tournament); restrained motion; consistent buttons, panels, and modals.</li>
              <li>Store modal with tabs; tournament creation wizard; How to Play tabbed modal; in-game HUD and consumable footer.</li>
              <li>Toasts, loading modal, achievement popup, game-over overlay.</li>
            </>
          }
          uxContent={
            <>
              <li><strong className="text-slate-900 dark:text-slate-100">Low-friction play:</strong> Credits and tickets in advance; consumption automatic on Play. First-time: enter and explore; returning: one-click play.</li>
              <li><strong className="text-slate-900 dark:text-slate-100">Clarity:</strong> “Can I play?”, “what am I taking?”, “what next?” answered without extra steps. Store opens on the right tab when needed; item selection only when the user has inventory.</li>
              <li><strong className="text-slate-900 dark:text-slate-100">Feedback and trust:</strong> Context-specific loading, explicit balance and shortfall on failed purchase, step validation in tournament wizard. Tournament context always visible (gold theme and canvas border).</li>
            </>
          }
        />

        <ProjectCard
          title="Insomnia Game"
          href="/projects/insomnia"
          delay="240ms"
          uiContent={
            <>
              <li>5×5 grid; start screen (first block no timeout); real-time HUD (score, time, speed, difficulty); game-over modal with results and replay.</li>
              <li>Theme system with tokenized accents and background patterns. Modal-based navigation: Profile, Statistics, Leaderboard, Settings.</li>
              <li>Mobile-first layout, 44px minimum touch targets, focus indicators, reduced motion and high contrast. PWA-ready.</li>
            </>
          }
          uxContent={
            <>
              <li><strong className="text-slate-900 dark:text-slate-100">Entry and fairness:</strong> Demo without wallet; first block has no timeout so users orient. Wrong clicks safe until active play; then rules strict and consistent. Skill clarity (score, time, clicks, efficiency, difficulty).</li>
              <li><strong className="text-slate-900 dark:text-slate-100">Outcomes:</strong> “I can try without committing”; “when I go fast, rules are fair”; “I know how hard it is right now.” Freemium (demo + GamePass/credits), gasless play; leaderboards and stats from chain. WCAG 2.1 AA; mobile-first.</li>
            </>
          }
        />

        <ProjectCard
          title="Military Card-Board Game"
          href="/projects/military-board-game"
          delay="320ms"
          uiContent={
            <>
              <li>Start screen (battle type selection); game board grid with zoom-to-fit and zoom controls; cell visuals (selection and potential-move affordances).</li>
              <li>Horizontally scrollable hand; card component (selected, playable, unplayable); player status (identity, active badge, hand, resources); scrollable action log.</li>
              <li>Viewport-locked layout and scroll containment. Readable states: selected unit, potential move tiles, playable vs unplayable cards.</li>
            </>
          }
          uxContent={
            <>
              <li><strong className="text-slate-900 dark:text-slate-100">Goals:</strong> Start a match quickly; understand what’s allowed (where to deploy, move, attack); make tactical decisions; track game state; win with clarity.</li>
              <li><strong className="text-slate-900 dark:text-slate-100">Friction reduction:</strong> Single-screen start; constrained deployment (starting row only); potential moves shown when unit selected; combat feedback in the action log; territory win condition explicit. Rules discoverable through constraints and UI states.</li>
            </>
          }
        />

        <ProjectCard
          title="Paper Games"
          href="/projects/paper-games"
          delay="360ms"
          uiContent={
            <>
              <li>Early development: Next.js frontend with nav (Home, Art Editor, placeholders for Create/Games/Marketplace). Design canvas (Konva): toolstrip (select, brush, fill, eraser, shapes), colors, opacity, brush size, undo/redo, grid, selection/transform. WalletConnect in header. Canvas not yet complete.</li>
            </>
          }
          uxContent={
            <>
              <li><strong className="text-slate-900 dark:text-slate-100">Status:</strong> Early development; only the design canvas has been built, and it is not complete.</li>
              <li><strong className="text-slate-900 dark:text-slate-100">Outcomes (intended):</strong> “I know what this is and where to go”; “I can start drawing quickly”; “I can connect wallet when ready.” Single-step entry to art editor; wallet optional; toolstrip visible. Full flows and polish to come.</li>
            </>
          }
        />

        <ProjectCard
          title="Paradigm Wallet"
          href="/projects/paradigm-wallet"
          delay="440ms"
          uiContent={
            <>
              <li>Tabbed navigation (Wallet, Send, Receive, History, Settings). Header with network switcher and connect button; wallet status (address, network, balance).</li>
              <li>Send form and receive screen (copy, QR with network metadata); transaction history with filter buttons and explorer links; settings screen. Reusable connect prompt. Theme and network preference persisted.</li>
            </>
          }
          uxContent={
            <>
              <li><strong className="text-slate-900 dark:text-slate-100">Goals:</strong> Connect wallet clearly; select the correct network; check balance; send and receive SUI with guided steps and understandable errors; audit activity; customize preferences.</li>
              <li><strong className="text-slate-900 dark:text-slate-100">Clarity:</strong> Screens gate with connect prompt until wallet connected. User always knows which network. Send flow shows status through validation, build, and execution; receive QR encodes address and network. History merged and deduped.</li>
            </>
          }
        />
      </div>

      <div className="mt-14 opacity-0 animate-fade-in-up" style={{ animationDelay: "520ms" }}>
        <Link href="/projects" className="link-accent link-underline inline-flex items-center text-sm font-medium gap-1 group">
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span> Projects
        </Link>
      </div>
    </div>
  );
}

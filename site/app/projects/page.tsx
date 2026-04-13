import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of projects carried through design and engineering—focused on blockchain usability, transaction clarity, and modular systems on Sui.",
};

const projects = [
  {
    slug: "evarra-tracker",
    name: "Evarra Tracker",
    summary:
      "Turn complexity into clarity. We translate raw blockchain transaction data into human-readable information so you can see what actually happened, track goals, and make sense of your activity. Add any wallet, define goals, and run analytics without decoding hashes.",
    status: "MVP released",
    update: "MVP released without analytics; analytics is being developed in the local environment.",
    href: "/projects/evarra-tracker",
    liveUrl: "https://evarra-tracker.vercel.app/",
  },
  {
    slug: "aqueduct",
    name: "Aqueduct SaaS Platform",
    summary:
      "Accelerates your development. Shared infrastructure on Sui lets you focus on your app and your users. Events, commerce, distribution, and identity are built in so you can ship faster and lean on proven building blocks instead of reinventing them.",
    status: "In use",
    update: "Platform in use; SuiTwo Market Shooter is being wired to it for testing and integration.",
    href: "/projects/aqueduct",
  },
  {
    slug: "suitwo",
    name: "SuiTwo Market Shooter",
    summary:
      "Battle, compete, and earn. A market-themed shooter where players climb leaderboards, unlock rewards, and create or join tournaments. Creators and winners both earn when the stakes are met. Low-friction play and clear feedback keep the focus on the game.",
    status: "Complete",
    update: "Game is complete; currently wiring to Aqueduct platform for testing and integration.",
    href: "/projects/suitwo",
    liveUrl: "https://sui-two-shooter.vercel.app/",
    liveNote: "Playable alpha—core gameplay only; leaderboard, store, and tournaments still wiring to Aqueduct.",
  },
  {
    slug: "insomnia",
    name: "Insomnia Game",
    summary:
      "Jump in, then level up. A reflex game you can try instantly with no wallet required. The first move gives you time to orient; when you are ready, compete on leaderboards and track your progress. Built for accessibility and fair, consistent rules.",
    status: "Built, unreleased",
    update: "MVP build on testnet.",
    href: "/projects/insomnia",
    liveUrl: "https://insomnia-blue.vercel.app/",
    liveNote:
      "MVP on testnet. Best in Chrome. Mobile end not built yet; grid fits mobile vertically.",
  },
  {
    slug: "military-board-game",
    name: "Military Card-Board Game",
    summary:
      "Tactical depth, clear rules. A two-player card and board game that puts strategy and readability first. Deploy units, manage resources, and capture territory in a single session. The UI makes valid moves and combat outcomes obvious so you can think ahead.",
    status: "In build",
    update: "Still in the build phase; skirmish mode and core mechanics in progress.",
    href: "/projects/military-board-game",
  },
  {
    slug: "paper-games",
    name: "Paper Games",
    summary:
      "Paper-based NFT game concepts: create and play with puzzles, caption contests, and interactive art. Early development—only the design canvas has been built so far, and it is not yet complete.",
    status: "Early development",
    update: "Design canvas (art editor) in progress; no backend, contracts, or game mechanics yet. Project name TBD.",
    href: "/projects/paper-games",
  },
  {
    slug: "paradigm-wallet",
    name: "Paradigm Wallet",
    summary:
      "Send and receive without the guesswork. A lightweight Sui wallet experience that keeps network, balance, and history clear. You always know which network you are on, what you sent or received, and where to find settings. Simple, focused, and in your control.",
    status: "No longer in development",
    update: "Reference implementation completed; no current development.",
    href: "/projects/paradigm-wallet",
  },
];

export default function ProjectsPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Projects
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          A selection of projects. Each began as an idea or concept and was
          carried through design and engineering.
        </p>
      </div>
      <ul className="mt-12 space-y-6">
        {projects.map(({ name, summary, status, update, href, liveUrl, liveNote }, i) => (
          <li
            key={href}
            className="relative opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${120 + i * 80}ms` }}
          >
            <div className="group p-5 -mx-2 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:shadow-lg hover:shadow-emerald-500/5 dark:hover:shadow-emerald-400/5 hover:-translate-y-0.5 transition-all duration-300 ease-out">
              {liveUrl && liveNote ? (
                <div className="flex flex-col gap-4">
                  {/* Top container: title + summary */}
                  <Link href={href} className="block">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                        {name}
                      </h2>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {status}
                      </span>
                    </div>
                    <p className="mt-1.5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {summary}
                    </p>
                  </Link>

                  {/* Bottom containers: update+read-more (left) and button+note (right) */}
                  <div className="flex items-end gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="mt-2 text-slate-500 dark:text-slate-400 text-xs leading-relaxed italic">
                        {update}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <Link
                          href={href}
                          className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 gap-1 group-hover:gap-2 transition-all duration-200"
                        >
                          Read more
                          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-col justify-end items-end gap-1 shrink-0">
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
                      >
                        Open app ↗
                      </a>
                      <span className="text-xs text-slate-500 dark:text-slate-400 max-w-[220px] text-right leading-snug">
                        {liveNote}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-stretch gap-4">
                  <Link href={href} className="block flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                        {name}
                      </h2>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {status}
                      </span>
                    </div>
                    <p className="mt-1.5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {summary}
                    </p>
                    <p className="mt-2 text-slate-500 dark:text-slate-400 text-xs leading-relaxed italic">
                      {update}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 gap-1 group-hover:gap-2 transition-all duration-200">
                        Read more
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {liveUrl && !liveNote && (
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
                >
                  Open app ↗
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

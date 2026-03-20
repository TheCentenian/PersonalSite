import Link from "next/link";
import { ProjectPageHeader } from "@/components/ProjectPageHeader";
import {
  DesignBlock,
  FlowBlock,
  UiBlock,
  UxBlock,
  listClass,
  sectionCardClass,
} from "@/components/ContentBlocks";

export default function InsomniaPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <ProjectPageHeader
        title="Insomnia Game"
        subtitle="Fast-paced 5×5 clicker/reflex endurance game on Sui"
        status="Built, unreleased"
        links={[{ href: "/ui-ux", label: "UI and UX Design" }]}
        liveUrl="https://insomnia-blue.vercel.app/"
        liveLabel="Play game"
        liveAsButton
      />

      <p
        className="mt-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed opacity-0 animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        A reflex game on a 5×5 grid: players click the active block before it disappears; difficulty ramps every 30 seconds. The first block has no timeout so new players can start without pressure.
        <span className="block">Freemium Web3: playable in demo mode without a wallet, or with wallet and GamePass credits.</span>
        <span className="block">Play with less friction: credits you purchase cover the in-game transaction costs, so you don't have to approve every transaction before play.</span>
      </p>

      <p
        className="mt-6 text-slate-500 dark:text-slate-400 text-sm leading-relaxed opacity-0 animate-fade-in-up border-l-2 border-slate-300 dark:border-slate-600 pl-3"
        style={{ animationDelay: "160ms" }}
      >
        Current build is an MVP on testnet. It works best in Chrome. Mobile end is not built yet, but the
        design is reactive and the 5×5 grid fits mobile in a vertical orientation.
      </p>

      <div className="mt-10 space-y-8">
        <section
          className={`opacity-0 animate-fade-in-up ${sectionCardClass}`}
          style={{ animationDelay: "180ms" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Design & flow
            </h2>
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

        <section
          className={`opacity-0 animate-fade-in-up ${sectionCardClass}`}
          style={{ animationDelay: "260ms" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              UI and UX
            </h2>
            <div className="mt-5 space-y-4">
              <UiBlock>
                <ul className={listClass}>
                  <li>5×5 grid, start screen (first block no timeout), HUD (score, time, speed, difficulty), game-over modal.</li>
                  <li>Theme system with tokenized accents and backgrounds. Modal navigation: Profile, Statistics, Leaderboard, Settings.</li>
                  <li>44px touch targets, focus indicators, reduced motion and high contrast; PWA-ready.</li>
                </ul>
              </UiBlock>
              <UxBlock>
                <ul className={listClass}>
                  <li><strong className="text-slate-900 dark:text-slate-100">Entry and fairness:</strong> Demo without wallet; first block has no timeout so users orient. Wrong clicks safe until active play; then rules strict and consistent. Skill clarity (score, time, clicks, efficiency, difficulty).</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Outcomes:</strong> “I can try without committing”; “when I go fast, rules are fair”; “I know how hard it is right now.” Freemium (demo + GamePass/credits), gasless play; leaderboards and stats from chain.</li>
                </ul>
              </UxBlock>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "340ms" }}>
        <Link href="/projects" className="link-accent link-underline inline-flex items-center text-sm font-medium gap-1 group">
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span> View all projects
        </Link>
      </div>
    </div>
  );
}

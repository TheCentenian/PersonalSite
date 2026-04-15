import Link from "next/link";
import { ProjectPageHeader } from "@/components/ProjectPageHeader";
import {
  DesignBlock,
  FlowBlock,
  ProductDesignBlock,
  UiBlock,
  UxBlock,
  listClass,
  sectionCardClass,
} from "@/components/ContentBlocks";

export default function SuiTwoShooterPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <ProjectPageHeader
        title="SuiTwo Market Shooter"
        subtitle="Blockchain-integrated game on Sui"
        status="Complete"
        links={[
          { href: "/architecture", label: "Architecture Design" },
          { href: "/ui-ux", label: "UI/UX Design" },
          { href: "/product-design/sui-two-shooter", label: "Product Design" },
        ]}
        liveLinks={[
          {
            href: "https://sui-two-shooter-frontend-sui-integr.vercel.app/",
            label: "Play (testnet upgrade)",
            variant: "primary",
          },
          {
            href: "https://sui-two-shooter.vercel.app/",
            label: "Play (alpha)",
            variant: "secondary",
          },
        ]}
      />

      <p
        className="mt-6 text-slate-500 dark:text-slate-400 text-sm leading-relaxed opacity-0 animate-fade-in-up border-l-2 border-slate-300 dark:border-slate-600 pl-3"
        style={{ animationDelay: "100ms" }}
      >
        Two builds available: <strong className="text-slate-700 dark:text-slate-200">Testnet upgrade (newest)</strong> and{" "}
        <strong className="text-slate-700 dark:text-slate-200">Alpha (legacy)</strong>. Use the testnet upgrade unless you are comparing behavior.
      </p>

      <p
        className="mt-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed opacity-0 animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        SuiTwo Market Shooter is a market-themed auto-fire shooter on Sui. Players connect a wallet; scores and progression are verified on-chain. The game includes a leaderboard, premium store, soulbound badge that evolves with play, tournaments with rewards, and game pass (credits and tickets). Backend builds transactions; players sign and submit. The project explores how blockchain-enabled assets and rewards integrate with gameplay while keeping strong usability and clear feedback.
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
                  <li><strong className="text-slate-900 dark:text-slate-100">Frontend and backend:</strong> Game frontend talks to Next.js game backend; modular UI, responsive (desktop and mobile). Backend uses platform for catalogs, events, competitions, balances (game pass), distribution, NFT (badge). Game-specific logic in game backend and Move contracts.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Verified on-chain:</strong> Score submission enforces MIN_DISTANCE and MIN_SCORE on-chain; session IDs prevent duplicate submissions. PlayerStats and leaderboard on-chain.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Badge & economy:</strong> Soulbound NFT badge with tiers (Starter → Legendary); store and gameplay discounts. Credits for playing, tickets for tournaments; creator rewards from tournament entry fees.</li>
                </ul>
              </DesignBlock>
              <FlowBlock>
                <p>Player action (submit score, purchase, claim achievement, enter tournament) goes to the game backend.</p>
                <p>Backend calls the platform API to build the transaction, then returns an unsigned payload to the frontend. The player’s wallet signs and submits.</p>
              </FlowBlock>
            </div>
          </div>
        </section>

        <section
          className={`opacity-0 animate-fade-in-up ${sectionCardClass}`}
          style={{ animationDelay: "240ms" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Product Design
            </h2>
            <div className="mt-5">
              <ProductDesignBlock>
                <ul className={listClass}>
                  <li>
                    <strong className="text-slate-900 dark:text-slate-100">Problem:</strong> Get from “open tab” to playing fast, with optional wallet,
                    store, and tournaments that never feel like a checkout on every run.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-slate-100">Navigation:</strong> Front screen → hub menu;{" "}
                    <strong className="text-slate-900 dark:text-slate-100">Start Game</strong> as the primary CTA; tabbed Store &amp; Inventory; Leaderboard
                    and Tournaments from the same hub; How to Play holds depth without blocking the first session.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-slate-100">Decisions:</strong> Credits and tickets prepaid and consumed on Play; panels
                    and modals instead of page sprawl; store opens on the right tab when context demands it; gold framing makes tournament runs mentally
                    distinct from casual play.
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  <Link
                    href="/product-design/sui-two-shooter"
                    className="font-medium text-sky-800 dark:text-sky-300 link-underline hover:text-sky-900 dark:hover:text-sky-200"
                  >
                    Full product design case →
                  </Link>
                </p>
              </ProductDesignBlock>
            </div>
          </div>
        </section>

        <section
          className={`opacity-0 animate-fade-in-up ${sectionCardClass}`}
          style={{ animationDelay: "300ms" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              UI/UX
            </h2>
            <div className="mt-5 space-y-4">
              <UiBlock>
                <ul className={listClass}>
                  <li>Responsive, device-aware layout (desktop vs mobile) with viewport-relative sizing. Modular theme (Sui blue, market green, gold for tournament); restrained motion; consistent buttons, panels, and modals.</li>
                  <li>Store tabs, tournament wizard, How to Play tabbed modal; gold theme and canvas border in tournament mode. Toasts, loading modal, achievement popup, game-over overlay.</li>
                </ul>
              </UiBlock>
              <UxBlock>
                <ul className={listClass}>
                  <li><strong className="text-slate-900 dark:text-slate-100">Low-friction play:</strong> Credits and tickets in advance; consumption automatic on Play. First-time: enter and explore; returning: one-click play and predictable patterns.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Clarity at decision points:</strong> “Can I play?”, “what am I taking?”, “what next after game over?” answered without extra steps. Store opens on the right tab when needed; item selection only when the user has inventory.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Feedback and trust:</strong> Context-specific loading, explicit balance and shortfall on failed purchase, step validation in tournament wizard. Tournament context always visible (gold theme and canvas border).</li>
                </ul>
              </UxBlock>
            </div>
          </div>
        </section>

        <section
          className={`opacity-0 animate-fade-in-up ${sectionCardClass}`}
          style={{ animationDelay: "380ms" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Stack
            </h2>
            <ul className={`mt-3 ${listClass}`}>
              <li>Vanilla JS game frontend, Next.js backend (TypeScript), Sui Move game contracts (score_submission, achievement_system, badge_system, tournaments). Uses Aqueduct Platform for catalogs, events, Regatta, Reservoir, Sustain, Shipyard, Insignia.</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "460ms" }}>
        <Link href="/projects" className="link-accent link-underline inline-flex items-center text-sm font-medium gap-1 group">
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span> View all projects
        </Link>
      </div>
    </div>
  );
}

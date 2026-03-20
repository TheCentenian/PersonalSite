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

export default function EvarraTrackerPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <ProjectPageHeader
        title="Evarra Tracker"
        subtitle="Translating complex blockchain transaction data into easily consumable, human-readable information."
        status="MVP released"
        links={[
          { href: "/architecture", label: "Architecture Design" },
          { href: "/ui-ux", label: "UI and UX Design" },
        ]}
        liveUrl="https://evarra-tracker.vercel.app/"
        liveLabel="Try the app"
        liveAsButton
      />

      <p
        className="mt-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed opacity-0 animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        The main focus of Evarra Tracker is translating complex blockchain transaction data into easily consumable, human-readable information. Raw on-chain activity becomes clear transactions and holdings: type, direction, amounts, and token metadata instead of hashes and coin types. Add any wallet, define goals, and run analytics without decoding hashes.
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
                  <li><strong className="text-slate-900 dark:text-slate-100">Translation pipeline:</strong> Backend fetches on-chain data; classifies types (transfer, swap, stake, NFT, etc.), direction (in/out), attaches token metadata for UI.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Core features:</strong> Wallets, Goals, and Reporting are primary product features.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Search and filters:</strong> Search and filter functions are built into Wallets, Goals, and Reporting workflows to narrow, sort, and organize data.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Wallet support:</strong> Users add wallet addresses to view holdings and transactions; addresses need not be under the user’s control.</li>
                </ul>
              </DesignBlock>
              <FlowBlock>
                <p>Users add wallet addresses in the app. The backend fetches transactions and holdings from chain (or store), normalizes and enriches them.</p>
                <p>The frontend displays rows by type, symbol, amount, and direction—so on-chain activity is readable instead of raw hashes and coin types.</p>
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
                  <li>Design system (theme tokens, Tailwind and CSS variables, dark mode); app shells (auth vs journey), top nav, page containers and panels.</li>
                  <li>Feature UI for Wallets, Goals, Reporting, Insights, Settings, Auth. Shared and feature components; toasts, spinners, loading skeletons, error states.</li>
                  <li>Consistent page header pattern: search and filters are built into Wallets, Goals, and Reporting workflows.</li>
                </ul>
              </UiBlock>
              <UxBlock>
                <ul className={listClass}>
                  <li><strong className="text-slate-900 dark:text-slate-100">Outcomes:</strong> Come back and continue quickly (session restoration, cached auth); find what you need via search and filters; add a wallet and see progress without blocking (progressive sync); build a selection for analysis (drag-and-drop selection pool).</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Flows and clarity:</strong> Auth to tracker with inline validation; tracker as home with empty states and goal hierarchy; goals management with simple flows for beginners and advanced options for power users, via progressive disclosure.</li>
                </ul>
              </UxBlock>
            </div>
          </div>
        </section>

        <section
          className={`opacity-0 animate-fade-in-up ${sectionCardClass}`}
          style={{ animationDelay: "340ms" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Key points
            </h2>
            <ul className={`mt-3 ${listClass}`}>
              <li><strong className="text-slate-900 dark:text-slate-100">Stack:</strong> React, Next.js, TypeScript, Tailwind, Zustand, Node/Express, Sui, MongoDB. Domain-driven frontend, modular for maintainability.</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "420ms" }}>
        <Link href="/projects" className="link-accent link-underline inline-flex items-center text-sm font-medium gap-1 group">
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span> View all projects
        </Link>
      </div>
    </div>
  );
}

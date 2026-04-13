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

export default function ParadigmWalletPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <ProjectPageHeader
        title="Paradigm Wallet"
        subtitle="Lightweight Sui wallet web UI"
        status="No longer in development"
        links={[{ href: "/ui-ux", label: "UI/UX Design" }]}
      />

      <p
        className="mt-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed opacity-0 animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        A Sui wallet-style web app for connecting a wallet, switching networks (devnet, testnet, mainnet), checking balances, requesting faucet funds on non-mainnet, sending and receiving SUI (with copy and QR), and viewing transaction history. Network preference and settings are persisted in localStorage.
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

        <section
          className={`opacity-0 animate-fade-in-up ${sectionCardClass}`}
          style={{ animationDelay: "260ms" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              UI/UX
            </h2>
            <div className="mt-5 space-y-4">
              <UiBlock>
                <ul className={listClass}>
                  <li>Tabbed navigation (Wallet, Send, Receive, History, Settings). Header with network switcher and connect button; wallet status.</li>
                  <li>Send form and receive screen (copy, QR with network metadata); transaction history with filter buttons and explorer links; settings screen. Reusable connect prompt. Theme and network preference persisted.</li>
                </ul>
              </UiBlock>
              <UxBlock>
                <ul className={listClass}>
                  <li><strong className="text-slate-900 dark:text-slate-100">Goals:</strong> Connect wallet clearly; select the correct network; check balance; send and receive SUI with guided steps and understandable errors; audit activity; customize preferences.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Clarity:</strong> Screens gate with connect prompt until wallet connected. User always knows which network. Send flow shows status through validation, build, and execution; receive QR encodes address and network. History merged and deduped.</li>
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

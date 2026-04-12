import Link from "next/link";
import { ProjectPageHeader } from "@/components/ProjectPageHeader";
import {
  DesignBlock,
  FlowBlock,
  listClass,
  sectionCardClass,
} from "@/components/ContentBlocks";

export default function AqueductPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <ProjectPageHeader
        title="Aqueduct SaaS Platform"
        subtitle="Shared infrastructure on Sui"
        status="In use"
        links={[{ href: "/architecture", label: "Architecture Design" }]}
      />

      <p
        className="mt-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed opacity-0 animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        Aqueduct is shared infrastructure on Sui designed as SaaS. Multiple tenants (ecosystems and apps) consume the same deployment. Apps define catalogs, participation flows, distribution rules, and NFT collections. The platform provides event services, commerce, vaults, transaction operations, distribution, NFT operations, identity and wallet connect, entitlements, balances, Insignia for wallet-scoped player records, and aggregation.
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
                  <li><strong className="text-slate-900 dark:text-slate-100">Definition and execution:</strong> Apps define catalogs, participation flows, distribution rules, and NFT collections; the platform builds and executes transactions.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Stack:</strong> Next.js backend (TypeScript), modular Sui Move contracts, no separate database. Event and app data are stored on-chain.</li>
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

        <section
          className={`opacity-0 animate-fade-in-up ${sectionCardClass}`}
          style={{ animationDelay: "260ms" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Core modules
            </h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Module</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400 divide-y divide-slate-200 dark:divide-slate-700">
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Chart</td><td className="px-4 py-2.5">Ecosystem and app registry, directory, handle resolution</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Helm</td><td className="px-4 py-2.5">App behavior config, feature flags</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Corridor</td><td className="px-4 py-2.5">App-scoped auth</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Estuary</td><td className="px-4 py-2.5">Identity, wallet connect, entitlements</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Station</td><td className="px-4 py-2.5">Event services (create, enter, submit)</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Regatta</td><td className="px-4 py-2.5">Competitions (enter, submit-score, payout)</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Provisions</td><td className="px-4 py-2.5">Catalog definitions</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Stockroom</td><td className="px-4 py-2.5">Commerce offers, purchasable inventory</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Terminal</td><td className="px-4 py-2.5">Commerce (purchase from catalog)</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Channel</td><td className="px-4 py-2.5">Transaction operations (build, estimate, batch, execute)</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Sustain</td><td className="px-4 py-2.5">Distribution (tokens, items, credits)</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Reservoir</td><td className="px-4 py-2.5">Balances, units, merge</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Glacier</td><td className="px-4 py-2.5">Vaults (add, release, distribute)</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Shipyard</td><td className="px-4 py-2.5">Apps define NFT collections; platform executes NFT operations</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Hydroscope</td><td className="px-4 py-2.5">Aggregation, rankings</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Aquifer</td><td className="px-4 py-2.5">Definition storage (key-value)</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Insignia</td><td className="px-4 py-2.5">Wallet-scoped player records; app-defined keys and payloads</td></tr>
                  <tr><td className="px-4 py-2.5 font-medium text-slate-900 dark:text-slate-100">Sonar</td><td className="px-4 py-2.5">Read-only chain query proxy</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section
          className={`opacity-0 animate-fade-in-up ${sectionCardClass}`}
          style={{ animationDelay: "320ms" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Architecture diagram
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Module groups and flows (interactive viewer from diagrams.net).{" "}
              <a
                href="/aqueduct-architecture-diagram.html"
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent link-underline font-medium"
              >
                Open full page
              </a>
            </p>
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-white shadow-sm">
              <iframe
                title="Aqueduct platform architecture diagram"
                src="/aqueduct-architecture-diagram.html"
                className="w-full h-[min(85vh,920px)] border-0 bg-white [color-scheme:light]"
                loading="lazy"
              />
            </div>
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

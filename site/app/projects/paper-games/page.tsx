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

export default function PaperGamesPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <ProjectPageHeader
        title="Paper Games"
        subtitle="Paper-based NFT game concepts — early development (project name TBD)"
        status="Early development"
        links={[{ href: "/ui-ux", label: "UI and UX Design" }]}
      />

      <p
        className="mt-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed opacity-0 animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        Paper Games is in early development. The goal is an app where users create and play with paper-based NFT game concepts (puzzles, caption contests, interactive art). So far only the design canvas (art editor) has been built, and it is not yet complete. The canvas provides drawing tools, colors, and basic interaction; Sui wallet connection is in place for future identity and minting. No backend, contracts, or game mechanics are implemented yet.
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
                  <li>Next.js frontend with nav (Home, Create, Games, Art Editor, Marketplace); home has hero and cards for game types; Art Editor route hosts the canvas.</li>
                  <li>Design canvas: Konva-based stage with toolstrip (select, brush, fill, eraser, shapes), stroke/fill colors, opacity, brush size, undo/redo, optional grid, selection and transform. WalletConnect in header. Create, Games, and Marketplace are placeholders.</li>
                </ul>
              </UiBlock>
              <UxBlock>
                <ul className={listClass}>
                  <li><strong className="text-slate-900 dark:text-slate-100">Status:</strong> Early development; only the design canvas has been built, and it is not complete.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Outcomes (intended):</strong> “I know what this is and where to go”; “I can start drawing quickly”; “I can connect wallet when ready.” Single-step entry to art editor; wallet optional; toolstrip visible. Full flows and polish to come.</li>
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

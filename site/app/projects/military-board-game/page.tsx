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

export default function MilitaryBoardGamePage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <ProjectPageHeader
        title="Military Card-Board Game"
        subtitle="Turn-based tactical card/board game for two players"
        status="In build"
        links={[{ href: "/ui-ux", label: "UI and UX Design" }]}
      />

      <p
        className="mt-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed opacity-0 animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        A two-player tactical game where each player deploys units from hand onto a fixed-size grid, moves using action points, initiates combat with attacker/defender resolution, and captures territory until victory. The game uses a multi-resource economy (Infantry, Airmen, Seamen, Engineers, Supplies) and deck-and-hand mechanics with clear playable versus unplayable card states.
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
                  <li>React + TypeScript + Vite; GameContext and useReducer; hooks for board, placement, movement, combat.</li>
                  <li>Start screen (battle type); board with zoom; cell selection and potential moves; hand; card states (selected, playable, unplayable); player status and action log. Viewport-locked layout.</li>
                </ul>
              </DesignBlock>
              <FlowBlock>
                <p>Single-session; all state lives in the client.</p>
                <p>Skirmish: deploy on the starting row, move by Manhattan distance, resolve combat with modifiers. Win by capturing all opponent starting positions. Rules are discoverable through constraints and UI feedback.</p>
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
                  <li>Start screen, game board grid (zoom-to-fit, zoom controls), cell visuals (selection and potential-move affordances), scrollable hand, card component (selected, playable, unplayable), player status, action log.</li>
                  <li>Readable states: selected unit, potential move tiles, playable vs unplayable cards. Viewport-locked layout and scroll containment.</li>
                </ul>
              </UiBlock>
              <UxBlock>
                <ul className={listClass}>
                  <li><strong className="text-slate-900 dark:text-slate-100">Goals:</strong> Start a match quickly; understand what’s allowed (where to deploy, move, attack); make tactical decisions; track game state; win with clarity.</li>
                  <li><strong className="text-slate-900 dark:text-slate-100">Friction reduction:</strong> Single-screen start; constrained deployment (starting row only); potential moves shown when unit selected; combat feedback in the action log; territory win condition explicit. Rules discoverable through constraints and UI states.</li>
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

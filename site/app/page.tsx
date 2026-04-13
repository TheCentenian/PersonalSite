import Link from "next/link";

const projects = [
  { name: "Evarra Tracker", slug: "evarra-tracker", line: ["Complex blockchain data, human-readable.", "Add wallets, define goals, run analytics."] },
  { name: "Aqueduct SaaS Platform", slug: "aqueduct", line: ["Shared backend infrastructure on Sui.", "Builders focus on their app.", "The platform handles the rest."] },
  { name: "SuiTwo Market Shooter", slug: "suitwo", line: ["Battle Market Forces.", "Create your own tournaments.", "Join the leaderboards."] },
];

export default function HomePage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          The Centenian
        </h1>
        <p className="mt-2 text-xl text-emerald-600 dark:text-emerald-400 font-medium">
          Web3 Product Engineer
        </p>
      </div>
      <p
        className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed opacity-0 animate-fade-in-up"
        style={{ animationDelay: "80ms" }}
      >
        I build end-to-end products and modular systems that make blockchain usable—transaction clarity, digital asset ownership, and event-driven apps.
        Over the past year and a half I’ve shipped one MVP and have three projects in testing—built solo across product direction, UI/UX, full-stack apps, wallet and signing flows, and smart-contract-level systems.
      </p>

      <section className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-700 opacity-0 animate-fade-in-up" style={{ animationDelay: "140ms" }}>
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          A few select projects
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3 sm:items-stretch">
          {projects.map(({ name, slug, line }, i) => (
            <li key={slug} className="min-h-0 flex">
              <Link
                href={`/projects/${slug}`}
                className="flex flex-col w-full min-h-full p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/30 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-white dark:hover:bg-slate-800/50 transition-all duration-200 group"
              >
                <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors shrink-0">
                  {name}
                </span>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 flex-1 min-h-0">
                  {Array.isArray(line)
                    ? line.map((l, j) => <span key={j} className="block">{l}</span>)
                    : line}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link
            href="/projects"
            className="link-accent link-underline text-sm font-medium gap-1 group inline-flex items-center"
          >
            Project information
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </p>
      </section>

      <p
        className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm opacity-0 animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        Open to roles and collaborations in the Sui ecosystem.{" "}
        <Link href="/contact" className="link-accent link-underline">
          Get in touch
        </Link>
        .
      </p>
    </div>
  );
}

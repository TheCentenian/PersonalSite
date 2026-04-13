import Link from "next/link";
import { productDesignCases } from "@/data/productDesignCases";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Design",
  description:
    "Design-thinking write-ups: product problems, flows, tradeoffs, and how complexity is managed.",
};

export default function ProductDesignIndexPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Product Design</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Design-thinking write-ups: problems, flows, interaction and visual choices, and how complexity is managed—
          separate from UI systems detail and engineering architecture.
        </p>
      </div>

      <ul className="mt-12 space-y-6">
        {productDesignCases.map(({ slug, title, teaser, projectHref }, i) => (
          <li
            key={slug}
            className="relative opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${120 + i * 80}ms` }}
          >
            <div className="group p-5 -mx-2 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm hover:border-sky-300 dark:hover:border-sky-600 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:shadow-lg hover:shadow-sky-500/5 dark:hover:shadow-sky-400/5 hover:-translate-y-0.5 transition-all duration-300 ease-out">
              <Link href={`/product-design/${slug}`} className="block">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors duration-200">
                    {title}
                  </h2>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                    Read case
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{teaser}</p>
              </Link>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
                <Link
                  href={projectHref}
                  className="font-medium text-sky-700 dark:text-sky-300 hover:underline underline-offset-2"
                >
                  Project overview →
                </Link>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14 opacity-0 animate-fade-in-up" style={{ animationDelay: "420ms" }}>
        <Link href="/projects" className="link-accent link-underline inline-flex items-center text-sm font-medium gap-1 group">
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span> Projects
        </Link>
      </div>
    </div>
  );
}

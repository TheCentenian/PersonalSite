import Link from "next/link";

type ProductDesignPageHeaderProps = {
  title: string;
  subtitle?: string;
  projectHref: string;
  projectLabel?: string;
};

export function ProductDesignPageHeader({
  title,
  subtitle,
  projectHref,
  projectLabel = "View project",
}: ProductDesignPageHeaderProps) {
  return (
    <>
      <Link
        href="/product-design"
        className="link-accent link-underline inline-flex items-center gap-1 text-sm mb-6 group opacity-0 animate-fade-in-up"
        style={{ animationDelay: "0ms" }}
      >
        <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span>{" "}
        Product Design
      </Link>
      <header
        className="opacity-0 animate-fade-in-up rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm p-5 sm:p-6"
        style={{ animationDelay: "60ms" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h1>
          <Link
            href={projectHref}
            className="group/pj text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors shrink-0"
          >
            {projectLabel}
            <span className="inline-block transition-transform group-hover/pj:translate-x-0.5">→</span>
          </Link>
        </div>
        {subtitle && (
          <p className="mt-2 text-sky-700 dark:text-sky-300 text-sm font-medium leading-relaxed">{subtitle}</p>
        )}
      </header>
    </>
  );
}

import Link from "next/link";

type HeaderLink = {
  href: string;
  label: string;
};

type ProjectPageHeaderProps = {
  title: string;
  subtitle: string;
  status: string;
  links?: HeaderLink[];
  liveUrl?: string;
  liveLabel?: string;
  liveAsButton?: boolean;
};

export function ProjectPageHeader({
  title,
  subtitle,
  status,
  links = [],
  liveUrl,
  liveLabel = "Open app",
  liveAsButton = false,
}: ProjectPageHeaderProps) {
  return (
    <>
      <Link
        href="/projects"
        className="link-accent link-underline inline-flex items-center gap-1 text-sm mb-6 group opacity-0 animate-fade-in-up"
        style={{ animationDelay: "0ms" }}
      >
        <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span> Projects
      </Link>
      <header
        className="opacity-0 animate-fade-in-up rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm p-5 sm:p-6"
        style={{ animationDelay: "60ms" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h1>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider rounded-full border border-slate-300 dark:border-slate-600 px-2.5 py-1">
            {status}
          </span>
        </div>
        <p className="mt-2 text-emerald-600 dark:text-emerald-400 font-medium">{subtitle}</p>
        {(links.length > 0 || liveUrl) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="link-accent link-underline inline-flex items-center text-sm font-medium gap-1 group"
              >
                {label}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            ))}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  liveAsButton
                    ? "ml-auto inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
                    : "ml-auto inline-flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                }
              >
                {liveLabel}
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        )}
      </header>
    </>
  );
}

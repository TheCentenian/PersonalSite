export const listClass =
  "list-none space-y-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed [&>li]:pl-4 [&>li]:relative [&>li]:before:content-[''] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.45em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-slate-400 dark:[&>li]:before:bg-slate-500";

export const listClassEmerald =
  "list-none space-y-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed [&>li]:pl-4 [&>li]:relative [&>li]:before:content-[''] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.45em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-emerald-500 dark:[&>li]:before:bg-emerald-400";

function Block({
  children,
  label,
  borderClass,
  bgClass,
  pillClass,
}: {
  children: React.ReactNode;
  label: string;
  borderClass: string;
  bgClass: string;
  pillClass: string;
}) {
  return (
    <div className={`rounded-lg border-l-4 ${borderClass} ${bgClass} p-4`}>
      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${pillClass}`}>
        {label}
      </span>
      <div className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function DesignBlock({ children }: { children: React.ReactNode }) {
  return (
    <Block
      label="Design"
      borderClass="border-slate-300 dark:border-slate-600"
      bgClass="bg-slate-50/80 dark:bg-slate-800/50"
      pillClass="bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300"
    >
      {children}
    </Block>
  );
}

export function FlowBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-emerald-400/70 dark:border-emerald-500/60 bg-emerald-50/40 dark:bg-emerald-950/30 p-4">
      <span className="inline-block rounded-full bg-emerald-200/80 dark:bg-emerald-800/50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:text-emerald-200 uppercase tracking-wider">
        Flow
      </span>
      <div className="mt-3 max-w-prose text-slate-600 dark:text-slate-400 text-sm leading-7 [&>p+p]:mt-3 [&>ul]:mt-3 [&>ul]:space-y-1.5">
        {children}
      </div>
    </div>
  );
}

export function UiBlock({ children }: { children: React.ReactNode }) {
  return (
    <Block
      label="UI"
      borderClass="border-slate-300 dark:border-slate-600"
      bgClass="bg-slate-50/80 dark:bg-slate-800/50"
      pillClass="bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300"
    >
      {children}
    </Block>
  );
}

export function UxBlock({ children }: { children: React.ReactNode }) {
  return (
    <Block
      label="UX"
      borderClass="border-emerald-400/70 dark:border-emerald-500/60"
      bgClass="bg-emerald-50/40 dark:bg-emerald-950/30"
      pillClass="bg-emerald-200/80 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-200"
    >
      {children}
    </Block>
  );
}

export const sectionCardClass =
  "rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Open to roles and collaborations in the Sui ecosystem.",
};

export default function ContactPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Contact
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Open to roles and collaborations in the Sui ecosystem.
        </p>
      </div>
      <div
        className="mt-10 grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-2 text-slate-600 dark:text-slate-400 opacity-0 animate-fade-in-up"
        style={{ animationDelay: "80ms" }}
      >
        <span className="font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">Email:</span>
        <a href="mailto:TheCentenian@gmail.com" className="link-accent link-underline inline-block justify-self-start">
          TheCentenian@gmail.com
        </a>

        <span className="font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">GitHub:</span>
        <div className="leading-snug justify-self-start">
          <a
            href="https://github.com/TheCentenian"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent link-underline inline-block"
          >
            TheCentenian
          </a>
          <br />
          <a
            href="https://github.com/suitwoonsui"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent link-underline inline-block"
          >
            SuiTwo On Sui
          </a>
        </div>

        <span className="font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">X (Twitter):</span>
        <a
          href="https://x.com/TheCentenian"
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent link-underline inline-block justify-self-start"
        >
          @TheCentenian
        </a>
      </div>
    </div>
  );
}

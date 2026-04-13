"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
];

const designLinks = [
  { href: "/architecture", label: "Architecture" },
  { href: "/ui-ux", label: "UI/UX" },
  { href: "/product-design", label: "Product Design" },
];

const endLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const linkClass =
  "link-underline text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium transition-colors duration-200";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="relative z-20 h-[8vh] min-h-[8vh] flex shrink-0 items-center border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <nav
        className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2"
        aria-label="Main"
      >
        <Link
          href="/"
          className="font-semibold text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 py-1"
          onClick={() => setMobileOpen(false)}
        >
          The Centenian
        </Link>

        {/* Desktop / tablet: fewer top-level items; design docs grouped */}
        <ul className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-1">
          {primaryLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={linkClass}>
                {label}
              </Link>
            </li>
          ))}
          <li className="relative">
            <details className="group/drop">
              <summary
                className={`${linkClass} cursor-pointer list-none inline-flex items-center gap-1 [&::-webkit-details-marker]:hidden`}
              >
                Design
                <span className="text-slate-400 dark:text-slate-500 text-xs transition-transform group-open/drop:rotate-180">
                  ▾
                </span>
              </summary>
              <ul
                className="absolute left-0 top-full z-30 mt-1 min-w-[11.5rem] rounded-lg border border-slate-200/90 dark:border-slate-600/90 bg-white/95 dark:bg-slate-900/95 py-1.5 shadow-lg backdrop-blur-sm"
                role="list"
              >
                {designLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          {endLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={linkClass}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile sheet */}
      {mobileOpen && (
        <>
          <button
            type="button"
            className="md:hidden fixed inset-0 top-[8vh] z-10 bg-slate-900/20 dark:bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="mobile-nav-panel"
            className="md:hidden absolute left-0 right-0 top-full z-20 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg"
          >
            <ul className="max-w-3xl mx-auto px-4 sm:px-6 py-4 space-y-1">
              {primaryLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Design
                </p>
                <ul className="space-y-0.5 border-l-2 border-slate-200 dark:border-slate-600 ml-3 pl-3">
                  {designLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block rounded-lg py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {endLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}

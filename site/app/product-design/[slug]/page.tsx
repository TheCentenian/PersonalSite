import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDesignPageHeader } from "@/components/ProductDesignPageHeader";
import { listClass, sectionCardClass } from "@/components/ContentBlocks";
import {
  getProductDesignCase,
  productDesignSlugs,
} from "@/data/productDesignCases";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productDesignSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getProductDesignCase(slug);
  if (!c) return { title: "Product Design" };
  return {
    title: `${c.title} (Product Design)`,
    description: c.subtitle ?? "Product design case study: problem, flows, and design decisions.",
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h2>
      <div className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

export default async function ProductDesignCasePage({ params }: Props) {
  const { slug } = await params;
  const c = getProductDesignCase(slug);
  if (!c) notFound();

  const { portfolio: p } = c;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <ProductDesignPageHeader title={c.title} subtitle={c.subtitle} projectHref={c.projectHref} />

      <div className="mt-10 space-y-8">
        <div
          className={`opacity-0 animate-fade-in-up ${sectionCardClass}`}
          style={{ animationDelay: "120ms" }}
        >
          <div className="p-6 space-y-8">
            <Section title="1. User problem the interface solves">
              <p>{c.userProblem}</p>
            </Section>
            <Section title="2. Main user flows and navigation paths">
              <ul className={listClass}>
                {c.flows.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>
            <Section title="3. Key interaction decisions">
              <ul className={listClass}>
                {c.interactions.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>
            <Section title="4. Visual design decisions">
              <ul className={listClass}>
                {c.visualDesign.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>
            <Section title="5. Usability improvements and friction reduction">
              <ul className={listClass}>
                {c.usability.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>
            <Section title="6. How complexity is managed">
              <ul className={listClass}>
                {c.complexity.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>
          </div>
        </div>

        <section
          className={`opacity-0 animate-fade-in-up rounded-xl border border-sky-200/90 dark:border-sky-800/80 bg-sky-50/90 dark:bg-sky-950/40 backdrop-blur-sm overflow-hidden`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Portfolio summary
            </h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-sky-800/90 dark:text-sky-300/90">
              Concise design-thinking format
            </p>
            <dl className="mt-6 space-y-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {(
                [
                  ["Project", p.project],
                  ["Problem", p.problem],
                  ["User flow", p.userFlow],
                  ["Design decisions", p.designDecisions],
                  ["Interaction behavior", p.interactionBehavior],
                  ["Result", p.result],
                ] as const
              ).map(([label, text]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-sky-900 dark:text-sky-200">
                    {label}
                  </dt>
                  <dd className="mt-1.5">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "280ms" }}>
        <Link href="/product-design" className="link-accent link-underline inline-flex items-center text-sm font-medium gap-1 group">
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span> All product
          design
        </Link>
        <Link href="/ui-ux" className="link-accent link-underline inline-flex items-center text-sm font-medium gap-1 group">
          UI/UX systems
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </div>
  );
}

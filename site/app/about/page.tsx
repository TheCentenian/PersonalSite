import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-sky-50 dark:bg-teal-950/90 h-full min-h-0 overflow-y-auto">
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          About
        </h1>
      </div>
      <div className="mt-8 space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p className="opacity-0 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
          Sui ecosystem builder, product architect, and systems thinker. Work
          centers on experimental apps around blockchain UX, asset ownership, and
          event-driven systems.
        </p>
        <p className="opacity-0 animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          Over the past year and a half, the focus has been learning and building
          within the Sui ecosystem. Many ideas became prototypes and MVPs:
          modular platform infrastructure (Aqueduct), goal and transaction-analytics
          tools (Evarra Tracker: translating complex blockchain data into human-readable form), and a blockchain-integrated game (SuiTwo Market
          Shooter). This site highlights some of the more complete systems built
          in that time.
        </p>
        <p className="opacity-0 animate-fade-in-up" style={{ animationDelay: "180ms" }}>
          Background includes an M.S. in Information Technology (Southern New
          Hampshire University) and a B.A. in Communication (University of New
          Hampshire). Before Web3, experience included leading enterprise IT
          service delivery and major incident response as Service Delivery
          Manager at Retail Business Services (2018–2024).
        </p>
        <p className="opacity-0 animate-fade-in-up" style={{ animationDelay: "240ms" }}>
          Open to roles and collaborations in the Sui ecosystem, whether
          full-time, contract, or project-based. Building on Sui and looking for a product
          architect or systems-minded builder?{" "}
          <Link href="/contact" className="link-accent link-underline">
            Reach out
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

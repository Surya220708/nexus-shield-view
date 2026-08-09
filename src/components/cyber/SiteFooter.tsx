import { Link } from "@tanstack/react-router";
import { BrandMark } from "./SiteNav";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Threat Intelligence", to: "/threat-intelligence" },
      { label: "Analytics", to: "/analytics" },
      { label: "Architecture", to: "/architecture" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", to: "/architecture" },
      { label: "Reports", to: "/analytics" },
      { label: "Security", to: "/compliance" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "About", to: "/architecture" },
      { label: "Technology", to: "/ai-detection" },
      { label: "Contact", to: "/architecture" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/8 bg-background">
      <div className="absolute inset-x-0 top-0 rule-glow" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))] lg:px-8">
        <div className="max-w-sm">
          <BrandMark />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            AI-powered cybersecurity for the modern enterprise.
          </p>
          <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-muted-foreground/70 uppercase">
            All metrics, indicators and incidents shown are fictional demo data created for an
            academic presentation.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-mono text-[10px] tracking-[0.22em] text-cyan uppercase">
              {col.title}
            </h3>
            <ul className="mt-4 grid gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 lg:px-8">
          <p className="font-mono text-[11px] text-muted-foreground">
            © 2026 CyberShield 360 — Academic Project Demonstration
          </p>
          <p className="font-mono text-[11px] text-muted-foreground/70">
            Frontend-only demo · No live monitoring
          </p>
        </div>
      </div>
    </footer>
  );
}

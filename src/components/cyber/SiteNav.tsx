import { Link } from "@tanstack/react-router";
import { Menu, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { StatusDot } from "./primitives";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/ai-detection", label: "AI Detection" },
  { to: "/threat-intelligence", label: "Threat Intel" },
  { to: "/incidents", label: "Incidents" },
  { to: "/analytics", label: "Analytics" },
  { to: "/architecture", label: "Architecture" },
] as const;

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-cyan/30 bg-cyan/10">
        <Shield className="h-4.5 w-4.5 text-cyan" strokeWidth={2.2} />
        <span className="absolute inset-0 rounded-xl bg-cyan/20 blur-md" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-bold tracking-[0.14em]">CYBERSHIELD</span>
        <span className="block font-mono text-[9px] tracking-[0.34em] text-cyan">360 PLATFORM</span>
      </span>
    </span>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/8 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 lg:px-8">
        <Link to="/" className="min-w-0">
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground data-[status=active]:bg-cyan/10 data-[status=active]:text-cyan"
            >
              {l.label}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-white/10" />
          <span className="flex items-center gap-2 rounded-full border border-safe/25 bg-safe/8 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-safe uppercase">
            <StatusDot tone="safe" />
            Operational
          </span>
          <Link
            to="/dashboard"
            className="ml-2 rounded-lg border border-cyan/40 bg-cyan/12 px-4 py-2 text-[13px] font-semibold text-cyan transition-all hover:bg-cyan/20 hover:shadow-[0_0_24px_-6px_var(--cyan)]"
          >
            Launch SOC
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-foreground lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/8 bg-background/95 px-5 py-3 backdrop-blur-xl lg:hidden">
          <div className="grid gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 data-[status=active]:bg-cyan/10 data-[status=active]:text-cyan"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

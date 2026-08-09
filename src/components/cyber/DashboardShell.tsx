import { Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bell,
  Bug,
  Command,
  FileBarChart,
  Globe2,
  LayoutGrid,
  Menu,
  Network,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Users,
  Laptop,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ALERTS, SOC_STATUS, TICKER_EVENTS } from "@/lib/mock-data";
import { GridBackdrop } from "./CyberBackground";
import { BrandMark } from "./SiteNav";
import { SeverityBadge, StatusDot, type Tone, toneText } from "./primitives";

export const SOC_NAV = [
  { to: "/dashboard", label: "Overview", icon: LayoutGrid },
  { to: "/ai-detection", label: "Threat Detection", icon: ShieldAlert },
  { to: "/threat-intelligence", label: "Threat Intelligence", icon: Globe2 },
  { to: "/incidents", label: "Incidents", icon: Activity },
  { to: "/network", label: "Network", icon: Network },
  { to: "/endpoints", label: "Endpoints", icon: Laptop },
  { to: "/behavior", label: "User Behavior", icon: Users },
  { to: "/vulnerabilities", label: "Vulnerabilities", icon: Bug },
  { to: "/compliance", label: "Compliance", icon: ShieldCheck },
  { to: "/analytics", label: "Reports", icon: FileBarChart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function StatusStrip() {
  const toneMap: Record<string, Tone> = {
    safe: "safe",
    warn: "warn",
    critical: "critical",
    cyan: "cyan",
  };
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/6 sm:grid-cols-3 xl:grid-cols-5">
      {SOC_STATUS.map((s) => {
        const tone = toneMap[s.tone] ?? "cyan";
        return (
          <div key={s.label} className="bg-background/85 px-4 py-3">
            <div className="flex items-center gap-2">
              <StatusDot tone={tone} />
              <p className="truncate font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                {s.label}
              </p>
            </div>
            <p className={cn("mt-1.5 font-display text-xl font-semibold", toneText[tone])}>
              {s.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function EventTicker() {
  const items = [...TICKER_EVENTS, ...TICKER_EVENTS];
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/8 bg-background/60">
      <div className="absolute inset-y-0 left-0 z-10 flex items-center gap-2 bg-background/95 px-3 font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">
        <StatusDot tone="cyan" /> Live
      </div>
      <div className="ticker-track flex w-max gap-10 py-2.5 pl-24 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="font-mono text-[11px] text-muted-foreground">
            <span className="mr-2 text-cyan/70">▸</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function AlertPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-14 right-0 z-50 w-[min(22rem,calc(100vw-2rem))] glass rounded-2xl p-1">
      <div className="flex items-center justify-between px-4 py-3">
        <p className="font-display text-sm font-semibold">Alert Center</p>
        <button onClick={onClose} aria-label="Close alerts" className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto px-2 pb-2">
        {ALERTS.map((a) => (
          <div
            key={a.title}
            className="rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
          >
            <div className="flex items-center justify-between gap-2">
              <SeverityBadge severity={a.severity} />
              <span className="font-mono text-[10px] text-muted-foreground">{a.ago}</span>
            </div>
            <p className="mt-2 text-sm leading-snug">{a.title}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{a.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    if (!open) setQ("");
  }, [open]);
  if (!open) return null;
  const results = SOC_NAV.filter((n) => n.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center bg-background/80 px-4 pt-28 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass w-full max-w-lg rounded-2xl p-2 fade-in-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/8 px-3 py-3">
          <Search className="h-4 w-4 text-cyan" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search modules, incidents, assets…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-white/12 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>
        <div className="max-h-72 overflow-y-auto py-2">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">No modules match.</p>
          ) : (
            results.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-cyan/10 hover:text-foreground"
              >
                <r.icon className="h-4 w-4 text-cyan" />
                {r.label}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function DashboardShell({
  title,
  subtitle,
  children,
  showStatus = true,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  showStatus?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <GridBackdrop />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <div className="relative mx-auto flex max-w-[112rem] gap-6 px-4 py-5 lg:px-6">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-90 w-64 shrink-0 border-r border-white/8 bg-background/95 px-3 py-5 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] lg:translate-x-0 lg:rounded-2xl lg:border lg:bg-background/60",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-2">
            <Link to="/">
              <BrandMark />
            </Link>
            <button
              className="text-muted-foreground lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="mt-6 grid gap-1 overflow-y-auto pb-4">
            {SOC_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground data-[status=active]:border data-[status=active]:border-cyan/25 data-[status=active]:bg-cyan/10 data-[status=active]:text-cyan"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto hidden rounded-xl border border-white/8 bg-white/4 p-3 lg:block">
            <div className="flex items-center gap-2">
              <StatusDot tone="safe" />
              <p className="font-mono text-[10px] tracking-[0.16em] text-safe uppercase">
                All systems nominal
              </p>
            </div>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              Demo environment · v4.2
            </p>
          </div>
        </aside>

        {sidebarOpen ? (
          <div
            className="fixed inset-0 z-80 bg-background/70 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        {/* Main */}
        <main className="min-w-0 flex-1 pb-16">
          <header className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div className="min-w-0">
                <h1 className="truncate font-display text-xl font-semibold sm:text-2xl">{title}</h1>
                <p className="truncate font-mono text-[11px] tracking-[0.16em] text-cyan uppercase">
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => setPaletteOpen(true)}
                className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-cyan/30 hover:text-foreground md:flex"
              >
                <Command className="h-3.5 w-3.5" />
                Command
                <kbd className="rounded border border-white/12 px-1 font-mono text-[10px]">⌘K</kbd>
              </button>
              <button
                onClick={() => setAlertsOpen((v) => !v)}
                className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-cyan/30"
                aria-label="Alerts"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-critical pulse-dot" />
              </button>
              {alertsOpen ? <AlertPanel onClose={() => setAlertsOpen(false)} /> : null}
            </div>
          </header>

          {showStatus ? (
            <div className="mt-5 grid gap-3">
              <StatusStrip />
              <EventTicker />
            </div>
          ) : null}

          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

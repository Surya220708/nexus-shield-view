import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpDown, Globe2, Search } from "lucide-react";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import {
  AnimatedCounter,
  DemoNotice,
  GlassCard,
  MeterBar,
  PanelHeader,
  Reveal,
  SectionHeading,
  SeverityBadge,
  StatusDot,
  type Tone,
} from "@/components/cyber/primitives";
import { INTEL_CATEGORIES, INTEL_FEED, REGIONS, type IntelRow } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/threat-intelligence")({
  head: () => ({
    meta: [
      { title: "Global Threat Intelligence — CyberShield 360" },
      {
        name: "description",
        content:
          "Regional indicator distribution, intelligence categories and a searchable threat intelligence feed of fictional demo indicators.",
      },
      { property: "og:title", content: "Global Threat Intelligence — CyberShield 360" },
      {
        property: "og:description",
        content: "Correlated indicators, campaigns and emerging threats across five world regions.",
      },
    ],
  }),
  component: IntelPage,
});

const toneRing: Record<Tone, string> = {
  cyan: "border-cyan/40 text-cyan",
  neon: "border-neon/40 text-neon",
  safe: "border-safe/40 text-safe",
  warn: "border-warn/40 text-warn",
  critical: "border-critical/45 text-critical",
  violet: "border-violet/40 text-violet",
};

function WorldMap() {
  const max = Math.max(...REGIONS.map((r) => r.indicators));
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/8 bg-background/50">
      <div className="absolute inset-0 grid-scroll opacity-30" aria-hidden />
      {/* stylized landmass blobs */}
      <svg viewBox="0 0 100 56" className="absolute inset-0 h-full w-full" aria-hidden>
        <g fill="var(--cyan)" fillOpacity="0.08" stroke="var(--cyan)" strokeOpacity="0.18" strokeWidth="0.22">
          <path d="M10 14 q8-6 18-3 t10 8 -6 10 -4 8 -10 2 -9-9z" />
          <path d="M27 34 q6 2 6 8 t-2 10 -6-2 -3-9z" />
          <path d="M44 12 q9-5 16-1 t4 8 -8 4 -9 1 -5-6z" />
          <path d="M46 24 q7-2 10 4 t-2 10 -8 1 -5-7z" />
          <path d="M62 14 q14-6 24 2 t6 12 -10 8 -12-2 -8-8z" />
          <path d="M78 36 q8 1 9 7 t-6 6 -7-5z" />
        </g>
        {REGIONS.map((r) =>
          REGIONS.filter((o) => o.name !== r.name).map((o) => (
            <line
              key={`${r.name}-${o.name}`}
              x1={r.x}
              y1={r.y * 0.56}
              x2={o.x}
              y2={o.y * 0.56}
              stroke="var(--cyan)"
              strokeOpacity="0.1"
              strokeWidth="0.15"
            />
          )),
        )}
        {REGIONS.slice(0, 4).map((r, i) => {
          const next = REGIONS[(i + 1) % REGIONS.length]!;
          return (
            <line
              key={`flow-${r.name}`}
              x1={r.x}
              y1={r.y * 0.56}
              x2={next.x}
              y2={next.y * 0.56}
              stroke="var(--warn)"
              strokeOpacity="0.5"
              strokeWidth="0.25"
              className="dash-flow-slow"
            />
          );
        })}
      </svg>

      {REGIONS.map((r) => (
        <div
          key={r.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${r.x}%`, top: `${r.y}%` }}
        >
          <span className="relative flex items-center justify-center">
            <span
              className={cn(
                "absolute rounded-full opacity-25 blur-sm",
                r.tone === "critical" ? "bg-critical" : r.tone === "warn" ? "bg-warn" : r.tone === "safe" ? "bg-safe" : "bg-cyan",
              )}
              style={{
                width: `${18 + (r.indicators / max) * 34}px`,
                height: `${18 + (r.indicators / max) * 34}px`,
              }}
            />
            <StatusDot tone={r.tone} className="h-2.5 w-2.5" />
          </span>
          <div className="mt-2 -translate-x-1/2 rounded-lg border border-white/10 bg-background/85 px-2 py-1 text-center backdrop-blur-md">
            <p className="font-mono text-[9px] tracking-[0.1em] whitespace-nowrap text-muted-foreground uppercase">
              {r.name}
            </p>
            <p className="font-display text-xs font-semibold">{r.indicators.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

type SortKey = "threat" | "severity" | "confidence" | "status";
const SEV_ORDER: Record<string, number> = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
const PAGE_SIZE = 5;

function IntelPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "severity", dir: -1 });
  const [page, setPage] = useState(0);

  const rows = useMemo(() => {
    const filtered = INTEL_FEED.filter((r) =>
      `${r.threat} ${r.category} ${r.status}`.toLowerCase().includes(query.toLowerCase()),
    );
    const sorted = [...filtered].sort((a, b) => {
      const key = sort.key;
      const av: string | number = key === "severity" ? SEV_ORDER[a.severity]! : (a[key] as string | number);
      const bv: string | number = key === "severity" ? SEV_ORDER[b.severity]! : (b[key] as string | number);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * sort.dir;
      return String(av).localeCompare(String(bv)) * sort.dir;
    });
    return sorted;
  }, [query, sort]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const visible = rows.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  const toggleSort = (key: SortKey) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === -1 ? 1 : -1 }));

  const statusTone: Record<IntelRow["status"], Tone> = {
    Active: "critical",
    Monitoring: "warn",
    Blocked: "safe",
    Contained: "cyan",
  };

  return (
    <DashboardShell title="Global Threat Intelligence" subtitle="Indicator Correlation & Feeds">
      <div className="grid gap-6">
        <SectionHeading
          eyebrow="Intelligence Layer"
          title={
            <>
              Global <span className="text-gradient">Threat Intelligence</span>
            </>
          }
          description="Regional indicator volumes and campaign context enrich every local detection before it reaches an analyst. All indicators below are fictional and used for demonstration only."
        />

        <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
          <GlassCard glowTone="cyan">
            <PanelHeader
              icon={<Globe2 className="h-4 w-4" />}
              title="Indicator Distribution"
              subtitle="Fictional indicator volumes by region"
            />
            <div className="p-5">
              <WorldMap />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-display text-base font-semibold">Regional Breakdown</h3>
            <div className="mt-5 grid gap-4">
              {REGIONS.map((r) => (
                <div key={r.name}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{r.name}</span>
                    <span className="font-mono font-semibold">
                      <AnimatedCounter value={r.indicators} /> indicators
                    </span>
                  </div>
                  <MeterBar value={(r.indicators / 1742) * 100} tone={r.tone} className="mt-2" />
                </div>
              ))}
            </div>
            <DemoNotice className="mt-6" />
          </GlassCard>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {INTEL_CATEGORIES.map((c, i) => (
            <Reveal key={c.label} delay={i * 60}>
              <GlassCard hover glowTone="neon" className="h-full p-5">
                <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {c.label}
                </p>
                <p className="mt-3 font-display text-2xl font-semibold text-cyan">
                  <AnimatedCounter value={c.value} />
                </p>
                <p
                  className={cn(
                    "mt-1 font-mono text-[11px]",
                    c.delta.startsWith("-") ? "text-safe" : "text-warn",
                  )}
                >
                  {c.delta} vs last week
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <GlassCard>
          <PanelHeader
            title="Threat Intelligence Feed"
            subtitle="Sortable, searchable · fictional indicators"
            actions={
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-3 py-1.5">
                <Search className="h-3.5 w-3.5 text-cyan" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(0);
                  }}
                  placeholder="Search feed…"
                  className="w-36 bg-transparent text-xs outline-none placeholder:text-muted-foreground sm:w-48"
                />
              </div>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] text-left">
              <thead>
                <tr className="border-b border-white/8">
                  {([
                    ["threat", "Threat"],
                    ["category", "Category"],
                    ["severity", "Severity"],
                    ["confidence", "Confidence"],
                    ["source", "Source"],
                    ["status", "Status"],
                  ] as const).map(([key, label]) => {
                    const sortable = ["threat", "severity", "confidence", "status"].includes(key);
                    return (
                      <th key={key} className="px-5 py-3">
                        <button
                          disabled={!sortable}
                          onClick={() => sortable && toggleSort(key as SortKey)}
                          className={cn(
                            "flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase",
                            sortable && "transition-colors hover:text-cyan",
                          )}
                        >
                          {label}
                          {sortable ? <ArrowUpDown className="h-3 w-3" /> : null}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.threat} className="border-b border-white/5 transition-colors hover:bg-white/4">
                    <td className="px-5 py-3.5 text-sm font-medium">{r.threat}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{r.category}</td>
                    <td className="px-5 py-3.5">
                      <SeverityBadge severity={r.severity} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{r.confidence}%</span>
                        <MeterBar value={r.confidence} tone="cyan" className="w-16" />
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-muted-foreground">
                      {r.source}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          "rounded-md border bg-white/4 px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] uppercase",
                          toneRing[statusTone[r.status]],
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                      No indicators match “{query}”.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5">
            <p className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
              Page {current + 1} of {pages} · {rows.length} indicators
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(0, current - 1))}
                disabled={current === 0}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(pages - 1, current + 1))}
                disabled={current >= pages - 1}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardShell>
  );
}

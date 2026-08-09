import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpDown, Bug } from "lucide-react";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import { AXIS, ChartTooltip, GRID_STROKE } from "@/components/cyber/chart-kit";
import {
  AnimatedCounter,
  DemoNotice,
  GlassCard,
  MeterBar,
  PanelHeader,
  SectionHeading,
  SeverityBadge,
  toneText,
  type Tone,
} from "@/components/cyber/primitives";
import { RISK_EXPOSURE, VULNERABILITIES, VULN_STATS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vulnerabilities")({
  head: () => ({
    meta: [
      { title: "Vulnerability Overview — CyberShield 360" },
      {
        name: "description",
        content:
          "Severity distribution, prioritized findings and enterprise risk exposure across assets in the demo environment.",
      },
      { property: "og:title", content: "Vulnerability Overview — CyberShield 360" },
      {
        property: "og:description",
        content: "Risk-ranked findings and remediation progress by exposure area.",
      },
    ],
  }),
  component: VulnPage,
});

const SEV_ORDER: Record<string, number> = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };

function VulnPage() {
  const [sortKey, setSortKey] = useState<"risk" | "severity" | "asset">("risk");
  const [dir, setDir] = useState<1 | -1>(-1);
  const [statusFilter, setStatusFilter] = useState("All");

  const rows = useMemo(() => {
    const filtered = VULNERABILITIES.filter(
      (v) => statusFilter === "All" || v.status === statusFilter,
    );
    return [...filtered].sort((a, b) => {
      if (sortKey === "asset") return a.asset.localeCompare(b.asset) * dir;
      if (sortKey === "severity") return (SEV_ORDER[a.severity]! - SEV_ORDER[b.severity]!) * dir;
      return (a.risk - b.risk) * dir;
    });
  }, [sortKey, dir, statusFilter]);

  const toggle = (key: typeof sortKey) => {
    if (key === sortKey) setDir((d) => (d === 1 ? -1 : 1));
    else {
      setSortKey(key);
      setDir(-1);
    }
  };

  return (
    <DashboardShell title="Vulnerability Management" subtitle="Exposure & Remediation Tracking">
      <div className="grid gap-6">
        <SectionHeading
          eyebrow="Exposure Layer"
          title={
            <>
              Vulnerability <span className="text-gradient">Overview</span>
            </>
          }
          description="Findings are ranked by exploitability, asset criticality and observed threat activity so remediation effort follows real risk."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {VULN_STATS.map((s) => (
            <GlassCard key={s.label} hover glowTone={s.tone as Tone} className="p-5">
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                {s.label}
              </p>
              <p className={cn("mt-3 font-display text-4xl font-semibold", toneText[s.tone as Tone])}>
                <AnimatedCounter value={s.value} />
              </p>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_1.4fr]">
          <GlassCard glowTone="violet">
            <PanelHeader title="Enterprise Risk Exposure" subtitle="Open exposure vs remediated, by area" />
            <div className="h-[320px] px-2 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={RISK_EXPOSURE}
                  layout="vertical"
                  margin={{ top: 8, right: 20, left: 12, bottom: 0 }}
                >
                  <CartesianGrid stroke={GRID_STROKE} horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} tick={AXIS} />
                  <YAxis
                    type="category"
                    dataKey="area"
                    tickLine={false}
                    axisLine={false}
                    tick={AXIS}
                    width={86}
                  />
                  <Tooltip content={<ChartTooltip unit="%" />} cursor={{ fill: "oklch(1 0 0 / 4%)" }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", paddingTop: 8 }} />
                  <Bar dataKey="exposure" name="Open exposure" stackId="a" fill="var(--critical)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="remediated" name="Remediated" stackId="a" fill="var(--safe)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard>
            <PanelHeader
              icon={<Bug className="h-4 w-4" />}
              title="Prioritized Findings"
              subtitle="Sortable vulnerability register"
              actions={
                <div className="flex flex-wrap gap-1">
                  {["All", "Open", "Remediation", "Verified", "Accepted"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={cn(
                        "rounded-md border px-2 py-1 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors",
                        statusFilter === s
                          ? "border-cyan/40 bg-cyan/12 text-cyan"
                          : "border-white/10 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] text-left">
                <thead>
                  <tr className="border-b border-white/8">
                    {([
                      ["asset", "Asset"],
                      ["vulnerability", "Vulnerability"],
                      ["severity", "Severity"],
                      ["risk", "Risk"],
                      ["status", "Status"],
                    ] as const).map(([key, label]) => {
                      const sortable = key === "asset" || key === "severity" || key === "risk";
                      return (
                        <th key={key} className="px-5 py-3">
                          <button
                            disabled={!sortable}
                            onClick={() => sortable && toggle(key as typeof sortKey)}
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
                  {rows.map((v) => (
                    <tr
                      key={`${v.asset}-${v.vulnerability}`}
                      className="border-b border-white/5 transition-colors hover:bg-white/4"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium">{v.asset}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{v.vulnerability}</td>
                      <td className="px-5 py-3.5">
                        <SeverityBadge severity={v.severity} />
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="w-7 font-mono text-xs">{v.risk.toFixed(1)}</span>
                          <MeterBar
                            value={v.risk * 10}
                            tone={v.risk >= 9 ? "critical" : v.risk >= 7 ? "warn" : "cyan"}
                            className="w-16"
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[11px] text-muted-foreground">
                        {v.status}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-sm text-muted-foreground">
                        No findings with this status.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        <DemoNotice />
      </div>
    </DashboardShell>
  );
}

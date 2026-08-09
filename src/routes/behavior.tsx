import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpDown, Users } from "lucide-react";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import { AXIS, ChartTooltip, GRID_STROKE } from "@/components/cyber/chart-kit";
import {
  DemoNotice,
  GlassCard,
  MeterBar,
  MetricTile,
  PanelHeader,
  SectionHeading,
} from "@/components/cyber/primitives";
import { BEHAVIOR_SIGNALS, BEHAVIOR_TREND, UEBA_USERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/behavior")({
  head: () => ({
    meta: [
      { title: "User & Entity Behavior Analytics — CyberShield 360" },
      {
        name: "description",
        content:
          "Behavioral risk scoring across fictional user accounts, with anomaly trends and signal breakdowns for insider risk demonstration.",
      },
      { property: "og:title", content: "User & Entity Behavior Analytics — CyberShield 360" },
      {
        property: "og:description",
        content: "Per-identity baselines, anomaly trends and risk-ranked review queues.",
      },
    ],
  }),
  component: BehaviorPage,
});

const STATUS_STYLE = {
  Safe: "border-safe/35 bg-safe/10 text-safe",
  Review: "border-warn/35 bg-warn/10 text-warn",
  "High Risk": "border-critical/40 bg-critical/12 text-critical",
} as const;

function BehaviorPage() {
  const [sortDesc, setSortDesc] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"All" | "Safe" | "Review" | "High Risk">("All");

  const rows = useMemo(() => {
    const filtered = UEBA_USERS.filter((u) => statusFilter === "All" || u.status === statusFilter);
    return [...filtered].sort((a, b) => (sortDesc ? b.risk - a.risk : a.risk - b.risk));
  }, [sortDesc, statusFilter]);

  return (
    <DashboardShell title="User Behavior Analytics" subtitle="Identity & Insider Risk">
      <div className="grid gap-6">
        <SectionHeading
          eyebrow="Behavioral Layer"
          title={
            <>
              User &amp; Entity <span className="text-gradient">Behavior Analytics</span>
            </>
          }
          description="Each identity is measured against its own learned baseline. Deviations in login, access and session behavior raise the entity risk score. All accounts shown are fictional."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricTile label="Monitored Identities" value="12,481" tone="cyan" />
          <MetricTile label="Anomalies (7d)" value="160" tone="warn" />
          <MetricTile label="High Risk Users" value="02" tone="critical" />
          <MetricTile label="Baseline Coverage" value="98.6%" tone="safe" />
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <GlassCard glowTone="neon">
            <PanelHeader title="Behavioral Signal Weighting" subtitle="Contribution to entity risk" />
            <div className="h-[300px] px-2 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={BEHAVIOR_SIGNALS} outerRadius="72%">
                  <PolarGrid stroke={GRID_STROKE} />
                  <PolarAngleAxis dataKey="signal" tick={{ ...AXIS, fontSize: 10 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Radar
                    name="Signal weight"
                    dataKey="value"
                    stroke="var(--cyan)"
                    fill="var(--cyan)"
                    fillOpacity={0.25}
                    animationDuration={1200}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard glowTone="warn">
            <PanelHeader title="Anomaly Trend" subtitle="Detected anomalies vs baseline expectation" />
            <div className="h-[300px] px-2 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BEHAVIOR_TREND} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                  <CartesianGrid stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={AXIS} />
                  <YAxis tickLine={false} axisLine={false} tick={AXIS} width={44} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "oklch(1 0 0 / 4%)" }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", paddingTop: 8 }} />
                  <Bar dataKey="anomalies" name="Anomalies" fill="var(--warn)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="baseline" name="Baseline" fill="var(--cyan)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <PanelHeader
            icon={<Users className="h-4 w-4" />}
            title="Entity Risk Queue"
            subtitle="Fictional accounts ranked by behavioral risk"
            actions={
              <div className="flex flex-wrap gap-1">
                {(["All", "Safe", "Review", "High Risk"] as const).map((s) => (
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
            <table className="w-full min-w-[44rem] text-left">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    User
                  </th>
                  <th className="px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Department
                  </th>
                  <th className="px-5 py-3">
                    <button
                      onClick={() => setSortDesc((v) => !v)}
                      className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-cyan"
                    >
                      Risk Score <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Behavior
                  </th>
                  <th className="px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => (
                  <tr key={u.user} className="border-b border-white/5 transition-colors hover:bg-white/4">
                    <td className="px-5 py-3.5 font-mono text-[12px]">{u.user}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{u.department}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 font-mono text-xs">{u.risk}</span>
                        <MeterBar
                          value={u.risk}
                          tone={u.risk > 75 ? "critical" : u.risk > 50 ? "warn" : "safe"}
                          className="w-20"
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{u.behavior}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          "rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] uppercase",
                          STATUS_STYLE[u.status],
                        )}
                      >
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <DemoNotice />
      </div>
    </DashboardShell>
  );
}

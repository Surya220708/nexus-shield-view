import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo, useState } from "react";
import { Activity, Cpu, Radar, ShieldAlert, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import { CopilotPanel } from "@/components/cyber/CopilotPanel";
import { AXIS, ChartTooltip, GRID_STROKE } from "@/components/cyber/chart-kit";
import {
  DemoNotice,
  GlassCard,
  MeterBar,
  PanelHeader,
  RiskRing,
  SeverityBadge,
  StatusDot,
  toneText,
  type Tone,
} from "@/components/cyber/primitives";
import { EVENT_TIMELINE, RECENT_THREATS, RISK_BREAKDOWN, SECURITY_METRICS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Security Operations Center — CyberShield 360" },
      {
        name: "description",
        content:
          "Live-style SOC dashboard with real-time security events, AI risk assessment and recent threat activity across the demo enterprise estate.",
      },
      { property: "og:title", content: "CyberShield 360 Security Operations Center" },
      {
        property: "og:description",
        content: "Real-time security events, AI risk scoring and threat triage in one console.",
      },
    ],
  }),
  component: DashboardPage,
});

const SEVERITIES = ["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const;
const VIEWS = ["Events", "Suspicious", "Critical"] as const;

function DashboardPage() {
  const [filter, setFilter] = useState<(typeof SEVERITIES)[number]>("ALL");
  const [view, setView] = useState<(typeof VIEWS)[number]>("Events");

  const threats = useMemo(
    () => (filter === "ALL" ? RECENT_THREATS : RECENT_THREATS.filter((t) => t.severity === filter)),
    [filter],
  );

  const series =
    view === "Events"
      ? [
          { key: "normal", name: "Normal events", color: "var(--cyan)" },
          { key: "suspicious", name: "Suspicious events", color: "var(--warn)" },
          { key: "critical", name: "Critical events", color: "var(--critical)" },
        ]
      : view === "Suspicious"
        ? [{ key: "suspicious", name: "Suspicious events", color: "var(--warn)" }]
        : [{ key: "critical", name: "Critical events", color: "var(--critical)" }];

  return (
    <DashboardShell title="CYBERSHIELD 360" subtitle="Security Operations Center">
      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        {/* CENTER */}
        <div className="grid gap-5">
          <GlassCard glowTone="cyan">
            <PanelHeader
              icon={<Activity className="h-4 w-4" />}
              title="Real-Time Security Events"
              subtitle="Rolling 24-hour telemetry window · simulated"
              actions={
                <div className="flex rounded-lg border border-white/10 bg-white/4 p-0.5">
                  {VIEWS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={cn(
                        "rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors",
                        view === v ? "bg-cyan/16 text-cyan" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="h-[320px] px-2 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={EVENT_TIMELINE} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
                  <defs>
                    {series.map((s) => (
                      <linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={s.color} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} tick={AXIS} />
                  <YAxis tickLine={false} axisLine={false} tick={AXIS} width={44} />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--cyan)", strokeOpacity: 0.25 }} />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", paddingTop: 8 }}
                  />
                  {series.map((s) => (
                    <Area
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      name={s.name}
                      stroke={s.color}
                      strokeWidth={2}
                      fill={`url(#g-${s.key})`}
                      animationDuration={1200}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { label: "Threats Detected", value: SECURITY_METRICS.threatsDetected.toLocaleString(), tone: "cyan" as Tone, icon: Radar },
              { label: "Open Incidents", value: String(SECURITY_METRICS.incidents - SECURITY_METRICS.resolvedIncidents), tone: "warn" as Tone, icon: ShieldAlert },
              { label: "AI Confidence", value: `${SECURITY_METRICS.aiConfidence}%`, tone: "safe" as Tone, icon: Cpu },
            ].map((m) => (
              <GlassCard key={m.label} hover glowTone={m.tone} className="p-5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    {m.label}
                  </p>
                  <m.icon className={cn("h-4 w-4", toneText[m.tone])} />
                </div>
                <p className={cn("mt-3 font-display text-3xl font-semibold", toneText[m.tone])}>
                  {m.value}
                </p>
              </GlassCard>
            ))}
          </div>

          <GlassCard>
            <PanelHeader
              icon={<ShieldAlert className="h-4 w-4" />}
              title="Recent Threats"
              subtitle="Filtered analyst queue"
              actions={
                <div className="flex flex-wrap gap-1">
                  {SEVERITIES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilter(s)}
                      className={cn(
                        "rounded-md border px-2 py-1 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors",
                        filter === s
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
            <div className="divide-y divide-white/6">
              {threats.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-muted-foreground">
                  No threats match this severity filter.
                </p>
              ) : (
                threats.map((t) => (
                  <div
                    key={t.name}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-white/4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{t.name}</p>
                      <p className="mt-0.5 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                        {t.vector} · detected {t.ago}
                      </p>
                    </div>
                    <SeverityBadge severity={t.severity} />
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>

        {/* RIGHT */}
        <div className="grid content-start gap-5">
          <GlassCard glowTone="safe" className="p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan" />
              <h3 className="font-display text-base font-semibold">AI Risk Assessment</h3>
            </div>
            <div className="mt-6 flex justify-center">
              <RiskRing value={23} label="/ 100" caption="Low Risk" />
            </div>
            <div className="mt-7 grid gap-4">
              {RISK_BREAKDOWN.map((r) => {
                const tone: Tone = r.value > 60 ? "critical" : r.value > 35 ? "warn" : "safe";
                return (
                  <div key={r.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{r.label}</span>
                      <span className="font-mono font-semibold">{r.value}</span>
                    </div>
                    <MeterBar value={r.value} tone={tone} className="mt-2" />
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-3 py-2.5">
              <StatusDot tone="safe" />
              <p className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                Score recalculated every 60s
              </p>
            </div>
          </GlassCard>

          <CopilotPanel compact />
          <DemoNotice />
        </div>
      </div>
    </DashboardShell>
  );
}

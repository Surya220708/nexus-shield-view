import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import { AXIS, CHART_COLORS, ChartTooltip, GRID_STROKE } from "@/components/cyber/chart-kit";
import {
  DemoNotice,
  GlassCard,
  MetricTile,
  PanelHeader,
  SectionHeading,
} from "@/components/cyber/primitives";
import {
  ATTACK_CATEGORIES,
  DETECTION_PERFORMANCE,
  EVENT_TIMELINE,
  RISK_BREAKDOWN,
  THREAT_TRENDS,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Security Analytics & Reports — CyberShield 360" },
      {
        name: "description",
        content:
          "Threat trends, incident volumes, risk distribution, attack categories and detection performance reporting for the demo environment.",
      },
      { property: "og:title", content: "Security Analytics — CyberShield 360" },
      {
        property: "og:description",
        content: "Executive-ready charts covering trends, risk distribution and response performance.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const RANGES = ["7D", "30D", "6M"] as const;

function AnalyticsPage() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("6M");

  return (
    <DashboardShell title="Security Analytics" subtitle="Trends, Performance & Reporting">
      <div className="grid gap-6">
        <SectionHeading
          eyebrow="Analytics Layer"
          title={
            <>
              Program <span className="text-gradient">Performance Analytics</span>
            </>
          }
          description="Trend reporting across detection, response and exposure so security leadership can evidence program improvement."
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricTile label="Threats (6m)" value="6,214" tone="cyan" />
            <MetricTile label="Incidents (6m)" value="206" tone="neon" />
            <MetricTile label="Mean Time To Respond" value="4m 18s" tone="safe" hint="-42% vs January" />
            <MetricTile label="Detection Precision" value="96.8%" tone="violet" />
          </div>
        </div>

        <div className="flex justify-end">
          <div className="flex rounded-lg border border-white/10 bg-white/4 p-0.5">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-md px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors",
                  range === r ? "bg-cyan/16 text-cyan" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <GlassCard glowTone="cyan">
            <PanelHeader title="Threat & Incident Trends" subtitle={`Range: ${range} · simulated`} />
            <div className="h-[300px] px-2 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={THREAT_TRENDS} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                  <CartesianGrid stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={AXIS} />
                  <YAxis tickLine={false} axisLine={false} tick={AXIS} width={44} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", paddingTop: 8 }} />
                  <Line type="monotone" dataKey="threats" name="Threats detected" stroke="var(--cyan)" strokeWidth={2.4} dot={false} />
                  <Line type="monotone" dataKey="incidents" name="Incidents opened" stroke="var(--warn)" strokeWidth={2.4} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard glowTone="violet">
            <PanelHeader title="Attack Categories" subtitle="Share of detections by category" />
            <div className="h-[300px] px-2 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ATTACK_CATEGORIES}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="55%"
                    outerRadius="80%"
                    paddingAngle={3}
                    stroke="none"
                  >
                    {ATTACK_CATEGORIES.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip unit="%" />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard glowTone="warn">
            <PanelHeader title="Risk Distribution" subtitle="Composite risk by domain" />
            <div className="h-[300px] px-2 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={RISK_BREAKDOWN} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                  <CartesianGrid stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ ...AXIS, fontSize: 9 }} />
                  <YAxis tickLine={false} axisLine={false} tick={AXIS} width={44} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "oklch(1 0 0 / 4%)" }} />
                  <Bar dataKey="value" name="Risk score" radius={[6, 6, 0, 0]}>
                    {RISK_BREAKDOWN.map((r, i) => (
                      <Cell
                        key={i}
                        fill={r.value > 40 ? "var(--warn)" : r.value > 25 ? "var(--cyan)" : "var(--safe)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard glowTone="safe">
            <PanelHeader title="Detection Performance" subtitle="Precision, recall and response time" />
            <div className="h-[300px] px-2 py-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DETECTION_PERFORMANCE} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="p-precision" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--safe)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--safe)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="p-recall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={GRID_STROKE} vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={AXIS} />
                  <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tick={AXIS} width={44} />
                  <Tooltip content={<ChartTooltip unit="%" />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", paddingTop: 8 }} />
                  <Area type="monotone" dataKey="precision" name="Precision" stroke="var(--safe)" strokeWidth={2} fill="url(#p-precision)" />
                  <Area type="monotone" dataKey="recall" name="Recall" stroke="var(--cyan)" strokeWidth={2} fill="url(#p-recall)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        <GlassCard glowTone="neon">
          <PanelHeader title="Event Volume Profile" subtitle="Aggregate 24-hour event distribution" />
          <div className="h-[260px] px-2 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EVENT_TIMELINE} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="a-normal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--neon)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={AXIS} />
                <YAxis tickLine={false} axisLine={false} tick={AXIS} width={44} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="normal" name="Events" stroke="var(--neon)" strokeWidth={2} fill="url(#a-normal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <DemoNotice />
      </div>
    </DashboardShell>
  );
}

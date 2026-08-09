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
import { Network as NetworkIcon, Waves } from "lucide-react";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import { AXIS, ChartTooltip, GRID_STROKE } from "@/components/cyber/chart-kit";
import {
  DemoNotice,
  GlassCard,
  MeterBar,
  MetricTile,
  PanelHeader,
  SectionHeading,
  type Tone,
} from "@/components/cyber/primitives";
import { NETWORK_SEGMENTS, NETWORK_STATS, NETWORK_TRAFFIC } from "@/lib/mock-data";

export const Route = createFileRoute("/network")({
  head: () => ({
    meta: [
      { title: "Network Monitoring — CyberShield 360" },
      {
        name: "description",
        content:
          "Enterprise network monitoring view with topology visualization, traffic analysis and per-segment health for the demo environment.",
      },
      { property: "og:title", content: "Network Monitoring — CyberShield 360" },
      {
        property: "og:description",
        content: "Topology, bandwidth and suspicious connection visibility across the estate.",
      },
    ],
  }),
  component: NetworkPage,
});

const TOPOLOGY = [
  { id: "internet", label: "Internet", x: 8, y: 50, tone: "warn" },
  { id: "firewall", label: "Firewall", x: 26, y: 50, tone: "critical" },
  { id: "cloud", label: "Cloud", x: 46, y: 18, tone: "neon" },
  { id: "web", label: "Web Servers", x: 46, y: 50, tone: "cyan" },
  { id: "app", label: "App Servers", x: 68, y: 34, tone: "cyan" },
  { id: "db", label: "Database", x: 88, y: 50, tone: "violet" },
  { id: "endpoints", label: "Endpoints", x: 46, y: 82, tone: "safe" },
] as const;

const EDGES: [string, string][] = [
  ["internet", "firewall"],
  ["firewall", "web"],
  ["firewall", "cloud"],
  ["firewall", "endpoints"],
  ["web", "app"],
  ["cloud", "app"],
  ["app", "db"],
  ["endpoints", "app"],
];

const toneColor: Record<string, string> = {
  cyan: "var(--cyan)",
  neon: "var(--neon)",
  safe: "var(--safe)",
  warn: "var(--warn)",
  critical: "var(--critical)",
  violet: "var(--violet)",
};

function Topology() {
  const pos = (id: string) => TOPOLOGY.find((n) => n.id === id)!;
  return (
    <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-white/8 bg-background/50">
      <div className="absolute inset-0 grid-scroll opacity-25" aria-hidden />
      <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full" aria-hidden>
        {EDGES.map(([a, b]) => {
          const from = pos(a);
          const to = pos(b);
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={from.x}
                y1={from.y / 2}
                x2={to.x}
                y2={to.y / 2}
                stroke="var(--cyan)"
                strokeOpacity="0.18"
                strokeWidth="0.35"
              />
              <line
                x1={from.x}
                y1={from.y / 2}
                x2={to.x}
                y2={to.y / 2}
                className="dash-flow"
                stroke="var(--cyan)"
                strokeOpacity="0.8"
                strokeWidth="0.45"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>
      {TOPOLOGY.map((n) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span
            className="mx-auto grid h-10 w-10 place-items-center rounded-xl border bg-background/85 backdrop-blur-md"
            style={{
              borderColor: `color-mix(in oklab, ${toneColor[n.tone]} 45%, transparent)`,
              boxShadow: `0 0 22px -8px ${toneColor[n.tone]}`,
            }}
          >
            <span
              className="h-2 w-2 rounded-full pulse-dot"
              style={{ background: toneColor[n.tone] }}
            />
          </span>
          <p className="mt-1.5 font-mono text-[9px] tracking-[0.12em] whitespace-nowrap text-muted-foreground uppercase">
            {n.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function NetworkPage() {
  return (
    <DashboardShell title="Network Monitoring" subtitle="Traffic, Topology & Segment Health">
      <div className="grid gap-6">
        <SectionHeading
          eyebrow="Network Layer"
          title={
            <>
              Enterprise <span className="text-gradient">Network Visibility</span>
            </>
          }
          description="Continuous flow analysis across perimeter, data center, cloud interconnect and remote segments."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {NETWORK_STATS.map((s) => (
            <MetricTile key={s.label} label={s.label} value={s.value} tone={s.tone as Tone} />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
          <GlassCard glowTone="cyan">
            <PanelHeader
              icon={<NetworkIcon className="h-4 w-4" />}
              title="Network Topology"
              subtitle="Animated flow between monitored zones"
            />
            <div className="p-5">
              <Topology />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-display text-base font-semibold">Segment Health</h3>
            <div className="mt-5 grid gap-4">
              {NETWORK_SEGMENTS.map((s) => (
                <div key={s.name}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs">
                    <span className="truncate text-muted-foreground">
                      {s.name} · {s.devices} devices
                    </span>
                    <span className="font-mono font-semibold">{s.health}%</span>
                  </div>
                  <MeterBar
                    value={s.health}
                    tone={s.health > 98.5 ? "safe" : s.health > 97 ? "cyan" : "warn"}
                    className="mt-2"
                  />
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                    {s.alerts} open alerts
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <GlassCard glowTone="neon">
          <PanelHeader
            icon={<Waves className="h-4 w-4" />}
            title="Network Traffic Analysis"
            subtitle="Inbound, outbound and suspicious flows (Gbps, simulated)"
          />
          <div className="h-[300px] px-2 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={NETWORK_TRAFFIC} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
                <defs>
                  {[
                    ["inbound", "var(--cyan)"],
                    ["outbound", "var(--neon)"],
                    ["suspicious", "var(--critical)"],
                  ].map(([k, c]) => (
                    <linearGradient key={k} id={`n-${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={c} stopOpacity={0.02} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={AXIS} />
                <YAxis tickLine={false} axisLine={false} tick={AXIS} width={44} />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--cyan)", strokeOpacity: 0.2 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", paddingTop: 8 }} />
                <Area type="monotone" dataKey="inbound" name="Inbound traffic" stroke="var(--cyan)" strokeWidth={2} fill="url(#n-inbound)" />
                <Area type="monotone" dataKey="outbound" name="Outbound traffic" stroke="var(--neon)" strokeWidth={2} fill="url(#n-outbound)" />
                <Area type="monotone" dataKey="suspicious" name="Suspicious traffic" stroke="var(--critical)" strokeWidth={2} fill="url(#n-suspicious)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <DemoNotice />
      </div>
    </DashboardShell>
  );
}

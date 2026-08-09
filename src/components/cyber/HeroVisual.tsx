import { Cloud, Database, Fingerprint, Laptop, Network, Radar, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NODES = [
  { label: "Cloud", icon: Cloud, angle: -90, tone: "cyan" },
  { label: "Endpoint", icon: Laptop, angle: -30, tone: "neon" },
  { label: "Network", icon: Network, angle: 30, tone: "safe" },
  { label: "Identity", icon: Fingerprint, angle: 90, tone: "violet" },
  { label: "Database", icon: Database, angle: 150, tone: "warn" },
  { label: "Threat Intel", icon: Radar, angle: 210, tone: "critical" },
] as const;

const FLOAT_LABELS = [
  { text: "AI ANALYSIS", className: "left-[2%] top-[14%]", delay: "0s" },
  { text: "THREAT INTEL", className: "right-[1%] top-[24%]", delay: "1.1s" },
  { text: "BEHAVIOR ANALYTICS", className: "left-[0%] bottom-[20%]", delay: "2.2s" },
  { text: "RISK ENGINE", className: "right-[3%] bottom-[12%]", delay: "0.6s" },
  { text: "24/7 MONITORING", className: "left-1/2 -translate-x-1/2 bottom-[1%]", delay: "1.7s" },
];

const toneColor: Record<string, string> = {
  cyan: "var(--cyan)",
  neon: "var(--neon)",
  safe: "var(--safe)",
  violet: "var(--violet)",
  warn: "var(--warn)",
  critical: "var(--critical)",
};

export function HeroVisual({ className }: { className?: string }) {
  const R = 38; // orbit radius in %
  return (
    <div className={cn("relative aspect-square w-full max-w-[34rem]", className)}>
      {/* soft aura */}
      <div className="absolute inset-[12%] rounded-full bg-cyan/10 blur-[70px]" aria-hidden />
      <div className="absolute inset-[26%] rounded-full bg-neon/14 blur-[60px]" aria-hidden />

      {/* orbit rings */}
      <div
        className="spin-slow absolute inset-[8%] rounded-full border border-dashed border-cyan/20"
        aria-hidden
      />
      <div
        className="spin-reverse absolute inset-[20%] rounded-full border border-white/8"
        aria-hidden
      />
      <div className="absolute inset-[32%] rounded-full border border-neon/15" aria-hidden />

      {/* connection lines */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        {NODES.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 50 + R * Math.cos(rad);
          const y = 50 + R * Math.sin(rad);
          return (
            <g key={n.label}>
              <line
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={toneColor[n.tone]}
                strokeOpacity="0.22"
                strokeWidth="0.4"
              />
              <line
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                className="dash-flow"
                stroke={toneColor[n.tone]}
                strokeOpacity="0.85"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
            </g>
          );
        })}
        {NODES.map((n, i) => {
          const next = NODES[(i + 1) % NODES.length]!;
          const a = (n.angle * Math.PI) / 180;
          const b = (next.angle * Math.PI) / 180;
          return (
            <path
              key={`arc-${n.label}`}
              d={`M ${50 + R * Math.cos(a)} ${50 + R * Math.sin(a)} Q 50 50 ${50 + R * Math.cos(b)} ${50 + R * Math.sin(b)}`}
              fill="none"
              stroke="var(--cyan)"
              strokeOpacity="0.12"
              strokeWidth="0.3"
            />
          );
        })}
      </svg>

      {/* core */}
      <div className="absolute top-1/2 left-1/2 flex h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[28%] border border-cyan/35 bg-background/70 backdrop-blur-xl">
        <span className="absolute inset-0 rounded-[28%] bg-cyan/12 blur-xl" aria-hidden />
        <ShieldCheck className="relative h-1/3 w-1/3 text-cyan" strokeWidth={1.6} />
        <span className="relative mt-1 font-mono text-[8px] tracking-[0.2em] text-cyan/90 sm:text-[9px]">
          AI CORE
        </span>
        <span
          className="scan-line absolute inset-x-2 top-0 h-8 bg-gradient-to-b from-cyan/25 to-transparent"
          aria-hidden
        />
      </div>

      {/* nodes */}
      {NODES.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const left = 50 + R * Math.cos(rad);
        const top = 50 + R * Math.sin(rad);
        return (
          <div
            key={n.label}
            className="float-slow absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${i * 0.6}s` }}
          >
            <div
              className="grid h-12 w-12 place-items-center rounded-2xl border bg-background/80 backdrop-blur-md sm:h-14 sm:w-14"
              style={{
                borderColor: `color-mix(in oklab, ${toneColor[n.tone]} 40%, transparent)`,
                boxShadow: `0 0 26px -10px ${toneColor[n.tone]}`,
              }}
            >
              <n.icon className="h-5 w-5" style={{ color: toneColor[n.tone] }} strokeWidth={1.8} />
            </div>
            <span className="mt-1.5 block text-center font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
              {n.label}
            </span>
          </div>
        );
      })}

      {/* floating labels */}
      {FLOAT_LABELS.map((l) => (
        <span
          key={l.text}
          className={cn(
            "float-slow absolute rounded-full border border-white/10 bg-background/70 px-2.5 py-1 font-mono text-[8.5px] tracking-[0.18em] text-muted-foreground backdrop-blur-md sm:text-[9.5px]",
            l.className,
          )}
          style={{ animationDelay: l.delay }}
        >
          {l.text}
        </span>
      ))}
    </div>
  );
}

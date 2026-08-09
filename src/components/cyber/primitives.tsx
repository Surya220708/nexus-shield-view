import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- tones ---------- */

export type Tone = "cyan" | "neon" | "safe" | "warn" | "critical" | "violet";

export const toneText: Record<Tone, string> = {
  cyan: "text-cyan",
  neon: "text-neon",
  safe: "text-safe",
  warn: "text-warn",
  critical: "text-critical",
  violet: "text-violet",
};

export const toneBg: Record<Tone, string> = {
  cyan: "bg-cyan",
  neon: "bg-neon",
  safe: "bg-safe",
  warn: "bg-warn",
  critical: "bg-critical",
  violet: "bg-violet",
};

export const severityTone: Record<string, Tone> = {
  CRITICAL: "critical",
  HIGH: "warn",
  MEDIUM: "cyan",
  LOW: "safe",
};

/* ---------- reveal on scroll ---------- */

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-out", className)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(22px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- glass card ---------- */

export function GlassCard({
  children,
  className,
  hover = false,
  glowTone,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glowTone?: Tone;
}) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl",
        hover && "glass-hover",
        className,
      )}
    >
      {glowTone ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full opacity-[0.10] blur-3xl",
            toneBg[glowTone],
          )}
        />
      ) : null}
      {children}
    </div>
  );
}

/* ---------- eyebrow / section heading ---------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/8 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.22em] text-cyan uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-3xl text-3xl font-semibold text-balance sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ---------- status dot ---------- */

export function StatusDot({ tone = "safe", className }: { tone?: Tone; className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2 shrink-0", className)}>
      <span className={cn("absolute inset-0 rounded-full pulse-dot", toneBg[tone])} />
      <span className={cn("absolute inset-0 rounded-full opacity-40 blur-[3px]", toneBg[tone])} />
    </span>
  );
}

/* ---------- severity badge ---------- */

export function SeverityBadge({ severity, className }: { severity: string; className?: string }) {
  const tone = severityTone[severity.toUpperCase()] ?? "cyan";
  const ring: Record<Tone, string> = {
    cyan: "border-cyan/35 bg-cyan/10 text-cyan",
    neon: "border-neon/35 bg-neon/10 text-neon",
    safe: "border-safe/35 bg-safe/10 text-safe",
    warn: "border-warn/35 bg-warn/10 text-warn",
    critical: "border-critical/40 bg-critical/12 text-critical",
    violet: "border-violet/35 bg-violet/10 text-violet",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase",
        ring[tone],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", toneBg[tone])} />
      {severity}
    </span>
  );
}

/* ---------- animated counter ---------- */

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1500,
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!shown) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, value, duration]);

  return (
    <span ref={ref} className={cn("font-display tabular-nums", className)}>
      {prefix}
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ---------- metric tile ---------- */

export function MetricTile({
  label,
  value,
  tone = "cyan",
  hint,
  icon,
  className,
}: {
  label: string;
  value: ReactNode;
  tone?: Tone;
  hint?: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <GlassCard hover glowTone={tone} className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          {label}
        </p>
        {icon ? <span className={cn("opacity-80", toneText[tone])}>{icon}</span> : null}
      </div>
      <div className={cn("mt-3 font-display text-3xl font-semibold", toneText[tone])}>{value}</div>
      {hint ? <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p> : null}
    </GlassCard>
  );
}

/* ---------- progress bar ---------- */

export function MeterBar({
  value,
  tone = "cyan",
  className,
}: {
  value: number;
  tone?: Tone;
  className?: string;
}) {
  const { ref, shown } = useReveal();
  return (
    <div ref={ref} className={cn("h-1.5 w-full overflow-hidden rounded-full bg-white/8", className)}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-1000 ease-out", toneBg[tone])}
        style={{ width: shown ? `${Math.min(value, 100)}%` : "0%" }}
      />
    </div>
  );
}

/* ---------- risk ring ---------- */

export function RiskRing({
  value,
  max = 100,
  size = 176,
  label,
  caption,
  tone,
}: {
  value: number;
  max?: number;
  size?: number;
  label?: string;
  caption?: string;
  tone?: Tone;
}) {
  const { ref, shown } = useReveal();
  const pct = Math.min(value / max, 1);
  const resolvedTone: Tone = tone ?? (pct > 0.7 ? "critical" : pct > 0.4 ? "warn" : "safe");
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const colorVar = `var(--${resolvedTone === "safe" ? "safe" : resolvedTone === "warn" ? "warn" : resolvedTone === "critical" ? "critical" : resolvedTone})`;

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="oklch(1 0 0 / 8%)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colorVar}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={shown ? circ * (1 - pct) : circ}
          style={{
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,0.84,0.44,1)",
            filter: `drop-shadow(0 0 10px color-mix(in oklab, ${colorVar} 60%, transparent))`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-display text-4xl font-semibold", toneText[resolvedTone])}>
          {value}
        </span>
        {label ? (
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            {label}
          </span>
        ) : null}
      </div>
      {caption ? (
        <span
          className={cn(
            "mt-3 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase",
            resolvedTone === "safe" && "border-safe/35 bg-safe/10 text-safe",
            resolvedTone === "warn" && "border-warn/35 bg-warn/10 text-warn",
            resolvedTone === "critical" && "border-critical/35 bg-critical/10 text-critical",
            resolvedTone === "cyan" && "border-cyan/35 bg-cyan/10 text-cyan",
          )}
        >
          {caption}
        </span>
      ) : null}
    </div>
  );
}

/* ---------- panel header ---------- */

export function PanelHeader({
  title,
  subtitle,
  actions,
  icon,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/8 px-5 py-4">
      <div className="flex min-w-0 items-start gap-3">
        {icon ? (
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-cyan/25 bg-cyan/10 text-cyan">
            {icon}
          </span>
        ) : null}
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold">{title}</h3>
          {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/* ---------- demo data notice ---------- */

export function DemoNotice({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] tracking-[0.14em] text-muted-foreground/70 uppercase",
        className,
      )}
    >
      Simulated demo data — academic project, no live telemetry
    </p>
  );
}

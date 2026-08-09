import type { ReactNode } from "react";

export const AXIS = {
  stroke: "oklch(0.71 0.024 254)",
  fontSize: 11,
  fontFamily: "var(--font-mono)",
};

export const GRID_STROKE = "oklch(1 0 0 / 7%)";

export function ChartTooltip({
  active,
  payload,
  label,
  unit = "",
}: {
  active?: boolean;
  payload?: { name?: ReactNode; value?: number | string; color?: string }[];
  label?: ReactNode;
  unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2.5">
      <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </p>
      <div className="mt-1.5 grid gap-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: p.color ?? "var(--cyan)" }}
            />
            <span className="text-muted-foreground">{p.name}</span>
            <span className="ml-auto font-mono font-semibold">
              {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const CHART_COLORS = [
  "var(--cyan)",
  "var(--neon)",
  "var(--safe)",
  "var(--warn)",
  "var(--critical)",
  "var(--violet)",
];

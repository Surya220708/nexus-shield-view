import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Bell, Palette, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import {
  DemoNotice,
  GlassCard,
  PanelHeader,
  SectionHeading,
} from "@/components/cyber/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Platform Settings — CyberShield 360" },
      {
        name: "description",
        content:
          "Demo settings surface for alerting thresholds, notification routing and console preferences in the CyberShield 360 prototype.",
      },
      { property: "og:title", content: "Platform Settings — CyberShield 360" },
      {
        property: "og:description",
        content: "Configure demo alerting thresholds, notifications and console preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

const TOGGLES = [
  { key: "critical", label: "Critical alert push", desc: "Notify on-call analyst immediately", on: true },
  { key: "digest", label: "Daily risk digest", desc: "Summary of posture change each morning", on: true },
  { key: "auto", label: "Automated containment", desc: "Isolate endpoints on high-confidence detections", on: true },
  { key: "beta", label: "Beta detection models", desc: "Include experimental models in scoring", on: false },
  { key: "motion", label: "Reduced console motion", desc: "Minimise dashboard animation", on: false },
];

function SettingsPage() {
  const [state, setState] = useState(
    Object.fromEntries(TOGGLES.map((t) => [t.key, t.on])) as Record<string, boolean>,
  );
  const [threshold, setThreshold] = useState(65);

  return (
    <DashboardShell title="Platform Settings" subtitle="Console & Alerting Preferences" showStatus={false}>
      <div className="grid gap-6">
        <SectionHeading
          eyebrow="Configuration"
          title={
            <>
              Console <span className="text-gradient">Preferences</span>
            </>
          }
          description="These controls demonstrate the settings experience. Changes affect local UI state only."
        />

        <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
          <GlassCard glowTone="cyan">
            <PanelHeader
              icon={<Bell className="h-4 w-4" />}
              title="Alerting & Automation"
              subtitle="Simulated toggles"
            />
            <div className="divide-y divide-white/6">
              {TOGGLES.map((t) => (
                <div key={t.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{t.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={state[t.key]}
                    onClick={() => {
                      setState((s) => ({ ...s, [t.key]: !s[t.key] }));
                      toast.success(`${t.label} ${state[t.key] ? "disabled" : "enabled"}`, {
                        description: "Simulated preference — nothing is persisted.",
                      });
                    }}
                    className={cn(
                      "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
                      state[t.key] ? "border-cyan/50 bg-cyan/25" : "border-white/12 bg-white/6",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-4.5 w-4.5 rounded-full transition-all",
                        state[t.key] ? "left-[1.4rem] bg-cyan" : "left-0.5 bg-muted-foreground",
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="grid content-start gap-5">
            <GlassCard glowTone="warn" className="p-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-warn" />
                <h3 className="font-display text-base font-semibold">Alert Risk Threshold</h3>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Entities scoring above this value are escalated to the analyst queue.
              </p>
              <p className="mt-5 font-display text-4xl font-semibold text-warn">{threshold}</p>
              <input
                type="range"
                min={10}
                max={95}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="mt-4 w-full accent-[var(--warn)]"
              />
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-cyan" />
                <h3 className="font-display text-base font-semibold">Console Theme</h3>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                CyberShield 360 ships with a single dark SOC theme tuned for low-light operations
                centers.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-cyan/25 bg-cyan/8 px-3 py-2.5">
                <ShieldCheck className="h-4 w-4 text-cyan" />
                <span className="font-mono text-[11px] tracking-[0.12em] text-cyan uppercase">
                  Midnight Operations · Active
                </span>
              </div>
              <DemoNotice className="mt-5" />
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import {
  DemoNotice,
  GlassCard,
  PanelHeader,
  Reveal,
  RiskRing,
  SectionHeading,
} from "@/components/cyber/primitives";
import { CONTROLS, FRAMEWORKS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance Center — CyberShield 360" },
      {
        name: "description",
        content:
          "Framework alignment for ISO 27001, NIST CSF, GDPR and SOC 2 with control implementation status and an overall compliance score.",
      },
      { property: "og:title", content: "Compliance Center — CyberShield 360" },
      {
        property: "og:description",
        content: "Framework scores, control coverage and review status in one governance view.",
      },
    ],
  }),
  component: CompliancePage,
});

function CompliancePage() {
  return (
    <DashboardShell title="Compliance Center" subtitle="Framework Alignment & Controls">
      <div className="grid gap-6">
        <SectionHeading
          eyebrow="Governance Layer"
          title={
            <>
              Continuous <span className="text-gradient">Compliance Posture</span>
            </>
          }
          description="Control evidence is mapped automatically to each framework so governance reporting reflects the live security program."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FRAMEWORKS.map((f, i) => (
            <Reveal key={f.name} delay={i * 80}>
              <GlassCard hover glowTone={f.score >= 92 ? "safe" : "cyan"} className="h-full p-6">
                <div className="flex flex-col items-center text-center">
                  <RiskRing
                    value={f.score}
                    size={132}
                    label="% aligned"
                    tone={f.score >= 92 ? "safe" : "cyan"}
                  />
                  <h3 className="mt-4 font-display text-base font-semibold">{f.name}</h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {f.controls}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{f.score}% Compliant</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <GlassCard>
            <PanelHeader
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Security Controls"
              subtitle="Implementation status across the control set"
            />
            <div className="grid gap-px bg-white/6 sm:grid-cols-2">
              {CONTROLS.map((c) => {
                const ok = c.state === "Implemented";
                return (
                  <div key={c.name} className="bg-background/85 px-5 py-4 transition-colors hover:bg-white/4">
                    <div className="flex items-center gap-2.5">
                      {ok ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-safe" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-warn" />
                      )}
                      <p className="truncate text-sm font-medium">{c.name}</p>
                      <span
                        className={cn(
                          "ml-auto shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] uppercase",
                          ok
                            ? "border-safe/35 bg-safe/10 text-safe"
                            : "border-warn/35 bg-warn/10 text-warn",
                        )}
                      >
                        {c.state}
                      </span>
                    </div>
                    <p className="mt-1.5 pl-6.5 text-xs text-muted-foreground">{c.note}</p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard glowTone="safe" className="flex flex-col items-center justify-center p-8 text-center">
            <RiskRing value={91} size={196} label="% overall" tone="safe" />
            <h3 className="mt-6 font-display text-lg font-semibold">Overall Security Compliance</h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Weighted across all four frameworks and the current control evidence set.
            </p>
            <DemoNotice className="mt-6" />
          </GlassCard>
        </div>
      </div>
    </DashboardShell>
  );
}

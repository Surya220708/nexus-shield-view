import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ClipboardList, Eye, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import {
  DemoNotice,
  GlassCard,
  MeterBar,
  PanelHeader,
  Reveal,
  SectionHeading,
  SeverityBadge,
  StatusDot,
} from "@/components/cyber/primitives";
import { INCIDENTS, IR_WORKFLOW, type Incident } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/incidents")({
  head: () => ({
    meta: [
      { title: "Security Incident Response — CyberShield 360" },
      {
        name: "description",
        content:
          "Incident response workspace with a detection-to-resolution workflow, prioritized incident cards and analyst action states.",
      },
      { property: "og:title", content: "Security Incident Response — CyberShield 360" },
      {
        property: "og:description",
        content: "Track containment, investigation and recovery across prioritized demo incidents.",
      },
    ],
  }),
  component: IncidentsPage,
});

function IncidentModal({ incident, onClose }: { incident: Incident; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-background/85 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl fade-in-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-white/8 px-6 py-5">
          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-[0.2em] text-cyan">{incident.id}</p>
            <h3 className="mt-1 font-display text-lg font-semibold">{incident.title}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground">
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        <div className="grid gap-6 px-6 py-6">
          <div className="flex flex-wrap items-center gap-3">
            <SeverityBadge severity={incident.severity} />
            <span className="rounded-md border border-white/10 bg-white/4 px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase">
              {incident.status}
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">{incident.opened}</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{incident.summary}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/8 bg-white/3 p-4">
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                Risk score
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-warn">{incident.risk}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/3 p-4">
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                Assigned analyst
              </p>
              <p className="mt-1 text-sm font-medium">{incident.analyst}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/3 p-4">
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                Stage
              </p>
              <p className="mt-1 text-sm font-medium">{IR_WORKFLOW[incident.stage]}</p>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">Investigation timeline</h4>
            <div className="mt-3 grid gap-3">
              {incident.timeline.map((t) => (
                <div key={t.time} className="flex gap-3">
                  <span className="font-mono text-[11px] text-cyan">{t.time}</span>
                  <span className="text-sm text-muted-foreground">{t.entry}</span>
                </div>
              ))}
            </div>
          </div>
          <DemoNotice />
        </div>
      </div>
    </div>
  );
}

function IncidentsPage() {
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(INCIDENTS.map((i) => [i.id, i.status])),
  );
  const [selected, setSelected] = useState<Incident | null>(null);
  const [filter, setFilter] = useState<"ALL" | "CRITICAL" | "HIGH" | "MEDIUM">("ALL");

  const list = INCIDENTS.filter((i) => filter === "ALL" || i.severity === filter);

  const act = (incident: Incident, action: "Investigate" | "Resolve") => {
    setStatuses((s) => ({ ...s, [incident.id]: action === "Resolve" ? "Resolved" : "Investigating" }));
    toast.success(
      action === "Resolve"
        ? `${incident.id} marked as resolved`
        : `${incident.id} moved to investigation`,
      { description: "Simulated UI state change — no backend action performed." },
    );
  };

  return (
    <DashboardShell title="Incident Response" subtitle="Detection to Resolution Workflow">
      {selected ? <IncidentModal incident={selected} onClose={() => setSelected(null)} /> : null}

      <div className="grid gap-6">
        <SectionHeading
          eyebrow="Response Operations"
          title={
            <>
              Security <span className="text-gradient">Incident Response</span>
            </>
          }
          description="Every detection follows a consistent lifecycle, from first signal through containment to verified recovery."
        />

        <GlassCard glowTone="warn">
          <PanelHeader
            icon={<ClipboardList className="h-4 w-4" />}
            title="Response Workflow"
            subtitle="Standard operating lifecycle"
          />
          <div className="flex flex-wrap items-center gap-2 px-5 py-6">
            {IR_WORKFLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={cn(
                    "rounded-xl border px-3.5 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors",
                    i <= 3
                      ? "border-cyan/35 bg-cyan/10 text-cyan"
                      : "border-white/10 bg-white/3 text-muted-foreground",
                  )}
                >
                  {step}
                </div>
                {i < IR_WORKFLOW.length - 1 ? (
                  <span className="hidden h-px w-6 bg-gradient-to-r from-cyan/60 to-transparent sm:block" />
                ) : null}
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="flex flex-wrap gap-2">
          {(["ALL", "CRITICAL", "HIGH", "MEDIUM"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors",
                filter === f
                  ? "border-cyan/40 bg-cyan/12 text-cyan"
                  : "border-white/10 text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {list.map((incident, i) => {
            const status = statuses[incident.id] ?? incident.status;
            const resolved = status === "Resolved";
            return (
              <Reveal key={incident.id} delay={i * 70}>
                <GlassCard hover glowTone={resolved ? "safe" : "warn"} className="h-full p-6">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] tracking-[0.2em] text-cyan">{incident.id}</p>
                      <h3 className="mt-1 truncate font-display text-base font-semibold">
                        {incident.title}
                      </h3>
                      <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                        {incident.opened} · {incident.analyst}
                      </p>
                    </div>
                    <SeverityBadge severity={incident.severity} />
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{incident.summary}</p>

                  <div className="mt-5 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <StatusDot tone={resolved ? "safe" : "warn"} />
                      {status}
                    </span>
                    <span className="font-mono">Risk {incident.risk}</span>
                  </div>
                  <MeterBar
                    value={incident.risk}
                    tone={resolved ? "safe" : incident.risk > 80 ? "critical" : "warn"}
                    className="mt-2"
                  />

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      onClick={() => act(incident, "Investigate")}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-cyan/35 bg-cyan/10 px-3 py-1.5 text-xs font-medium text-cyan transition-colors hover:bg-cyan/18"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" /> Investigate
                    </button>
                    <button
                      onClick={() => setSelected(incident)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/4 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/8"
                    >
                      <Eye className="h-3.5 w-3.5" /> View Details
                    </button>
                    <button
                      onClick={() => act(incident, "Resolve")}
                      disabled={resolved}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-safe/35 bg-safe/10 px-3 py-1.5 text-xs font-medium text-safe transition-colors hover:bg-safe/18 disabled:opacity-40"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Mark Resolved
                    </button>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <DemoNotice />
      </div>
    </DashboardShell>
  );
}

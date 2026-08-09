import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Binary, Brain, Cpu, GitBranch, Layers, Radar, ShieldAlert } from "lucide-react";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import {
  AnimatedCounter,
  DemoNotice,
  GlassCard,
  MeterBar,
  PanelHeader,
  Reveal,
  SectionHeading,
  StatusDot,
} from "@/components/cyber/primitives";
import { AI_CAPABILITIES, AI_CONFIDENCE, AI_PIPELINE } from "@/lib/mock-data";

export const Route = createFileRoute("/ai-detection")({
  head: () => ({
    meta: [
      { title: "AI Threat Detection — CyberShield 360" },
      {
        name: "description",
        content:
          "Machine learning pipeline that analyzes security events, behavioral patterns and system activity to surface anomalies rule-based systems miss.",
      },
      { property: "og:title", content: "AI-Powered Threat Detection — CyberShield 360" },
      {
        property: "og:description",
        content: "Behavioral models, correlation and risk scoring across the detection pipeline.",
      },
    ],
  }),
  component: AiDetectionPage,
});

const CAP_ICONS = [Brain, Cpu, Radar, GitBranch, ShieldAlert, Layers];

function AiDetectionPage() {
  return (
    <DashboardShell title="AI Threat Detection" subtitle="Machine Learning Analytics Engine">
      <div className="grid gap-6">
        <SectionHeading
          eyebrow="Detection Intelligence"
          title={
            <>
              <span className="text-gradient">AI-Powered</span> Threat Detection
            </>
          }
          description="Machine learning continuously analyzes security events, behavior patterns, and system activity to identify anomalies that traditional rule-based systems may miss."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {AI_CAPABILITIES.map((c, i) => {
            const Icon = CAP_ICONS[i] ?? Brain;
            return (
              <Reveal key={c.title} delay={i * 60}>
                <GlassCard hover glowTone={i % 2 === 0 ? "neon" : "cyan"} className="h-full p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-neon/25 bg-neon/10 text-neon">
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/4 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                      {c.metric}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <GlassCard glowTone="violet">
            <PanelHeader
              icon={<Binary className="h-4 w-4" />}
              title="AI THREAT ANALYSIS ENGINE"
              subtitle="Event-to-alert processing pipeline"
              actions={
                <span className="flex items-center gap-2 rounded-full border border-safe/25 bg-safe/8 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-safe uppercase">
                  <StatusDot tone="safe" /> Streaming
                </span>
              }
            />
            <div className="relative px-5 py-6">
              <span
                className="absolute top-10 bottom-10 left-[2.15rem] w-px bg-gradient-to-b from-cyan/60 via-neon/40 to-violet/50"
                aria-hidden
              />
              <div className="grid gap-3">
                {AI_PIPELINE.map((p, i) => (
                  <Reveal key={p.step} delay={i * 70}>
                    <div className="relative flex items-start gap-4">
                      <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan/35 bg-background font-mono text-[10px] text-cyan">
                        {String(i + 1).padStart(2, "0")}
                        <span className="absolute inset-0 rounded-full bg-cyan/15 blur-md" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1 rounded-xl border border-white/8 bg-white/3 px-4 py-3 transition-colors hover:border-cyan/25 hover:bg-cyan/6">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                          <p className="truncate font-display text-sm font-semibold">{p.step}</p>
                          <span className="shrink-0 font-mono text-[10px] text-cyan">{p.value}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{p.detail}</p>
                      </div>
                    </div>
                    {i < AI_PIPELINE.length - 1 ? (
                      <div className="ml-[0.9rem] py-1 text-cyan/50">
                        <ArrowDown className="h-3.5 w-3.5" />
                      </div>
                    ) : null}
                  </Reveal>
                ))}
              </div>
            </div>
          </GlassCard>

          <div className="grid content-start gap-5">
            <GlassCard glowTone="cyan" className="p-6">
              <h3 className="font-display text-base font-semibold">Model Confidence</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Rolling accuracy across the active model ensemble.
              </p>
              <div className="mt-6 grid gap-5">
                {AI_CONFIDENCE.map((c) => (
                  <div key={c.label}>
                    <div className="flex items-end justify-between">
                      <span className="text-sm text-muted-foreground">{c.label}</span>
                      <span className="font-display text-xl font-semibold text-cyan">
                        <AnimatedCounter value={c.value} decimals={1} suffix="%" />
                      </span>
                    </div>
                    <MeterBar value={c.value} tone="cyan" className="mt-2" />
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-display text-base font-semibold">Engine Telemetry</h3>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { label: "Models Active", value: "12" },
                  { label: "Features Scored", value: "418" },
                  { label: "Inference Latency", value: "0.8s" },
                  { label: "Alert Reduction", value: "18:1" },
                ].map((t) => (
                  <div key={t.label} className="rounded-xl border border-white/8 bg-white/3 p-4">
                    <p className="font-display text-xl font-semibold text-neon">{t.value}</p>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                      {t.label}
                    </p>
                  </div>
                ))}
              </div>
              <DemoNotice className="mt-5" />
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

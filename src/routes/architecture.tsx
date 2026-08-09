import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, Cpu, Layers, Radar, ShieldCheck } from "lucide-react";
import { SiteNav } from "@/components/cyber/SiteNav";
import { SiteFooter } from "@/components/cyber/SiteFooter";
import { FloatingCopilot } from "@/components/cyber/CopilotPanel";
import { GridBackdrop } from "@/components/cyber/CyberBackground";
import {
  DemoNotice,
  Eyebrow,
  GlassCard,
  Reveal,
  SectionHeading,
} from "@/components/cyber/primitives";
import { ARCHITECTURE_LAYERS, COMPANY } from "@/lib/mock-data";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "System Architecture — CyberShield 360" },
      {
        name: "description",
        content:
          "How CyberShield 360 collects enterprise telemetry, applies AI analytics, correlates signals and drives the SOC dashboard, response and reporting layers.",
      },
      { property: "og:title", content: "CyberShield 360 Architecture" },
      {
        property: "og:description",
        content: "Data collection through AI analytics, correlation, response and reporting.",
      },
    ],
  }),
  component: ArchitecturePage,
});

const STACK = [
  { label: "Frontend", value: "React 19 · TypeScript · Tailwind CSS" },
  { label: "Visualization", value: "Recharts · custom SVG topology" },
  { label: "Design System", value: "Semantic oklch tokens · glass surfaces" },
  { label: "Data", value: "Static mock datasets · no backend services" },
];

function ArchitecturePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SiteNav />
      <FloatingCopilot />

      <section className="relative">
        <GridBackdrop />
        <div className="relative mx-auto max-w-7xl px-5 pt-14 pb-10 lg:px-8">
          <SectionHeading
            eyebrow="System Design"
            title={
              <>
                CyberShield 360 <span className="text-gradient">Architecture</span>
              </>
            }
            description="A layered pipeline: enterprise telemetry is collected, streamed, analyzed by the AI engine, correlated into incidents, then surfaced for response and reporting."
          />
          <DemoNotice className="mt-5" />
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-5xl px-5 pb-16 lg:px-8">
          <div className="grid gap-2">
            {ARCHITECTURE_LAYERS.map((layer, i) => (
              <Reveal key={layer.title} delay={i * 60}>
                <GlassCard
                  hover
                  glowTone={i === 3 ? "violet" : i % 2 === 0 ? "cyan" : "neon"}
                  className="p-6"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">
                        Layer {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold">{layer.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{layer.note}</p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
                      {i === 3 ? (
                        <Cpu className="h-5 w-5" />
                      ) : i === 4 ? (
                        <Radar className="h-5 w-5" />
                      ) : i >= 6 ? (
                        <ShieldCheck className="h-5 w-5" />
                      ) : (
                        <Layers className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {layer.nodes.map((n) => (
                      <span
                        key={n}
                        className="rounded-lg border border-white/10 bg-white/4 px-3 py-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors hover:border-cyan/30 hover:text-cyan"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </GlassCard>
                {i < ARCHITECTURE_LAYERS.length - 1 ? (
                  <div className="flex justify-center py-1.5 text-cyan/50">
                    <ArrowDown className="h-4 w-4" />
                  </div>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/8 bg-surface/25">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow>About the Project</Eyebrow>
            <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
              An academic demonstration of an enterprise security platform
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              CyberShield 360 is a frontend-only prototype built to communicate how an AI-driven
              security operations platform is structured and how analysts would experience it. Every
              metric, indicator, incident and identity shown across the platform is fictional demo
              data. The project performs no monitoring, scanning, detection or offensive security
              activity of any kind.
            </p>
            <div className="mt-6 grid gap-3">
              {STACK.map((s) => (
                <div
                  key={s.label}
                  className="grid grid-cols-[minmax(0,8rem)_1fr] gap-4 rounded-xl border border-white/8 bg-white/3 px-4 py-3"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-cyan uppercase">
                    {s.label}
                  </span>
                  <span className="text-sm text-muted-foreground">{s.value}</span>
                </div>
              ))}
            </div>
            <Link
              to="/dashboard"
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-cyan/45 bg-cyan/14 px-5 py-3 text-sm font-semibold text-cyan transition-all hover:bg-cyan/22"
            >
              Open the SOC Dashboard
            </Link>
          </div>

          <GlassCard glowTone="neon" className="p-7">
            <h3 className="font-display text-lg font-semibold">Modelled Environment</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The demo dataset represents a mid-to-large enterprise estate.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "Endpoints", value: COMPANY.endpoints.toLocaleString() },
                { label: "Cloud Resources", value: COMPANY.cloudResources.toLocaleString() },
                { label: "Network Devices", value: COMPANY.networkDevices.toLocaleString() },
                { label: "Users", value: COMPANY.users.toLocaleString() },
                { label: "Security Policies", value: COMPANY.policies.toLocaleString() },
                { label: "Detection Models", value: "12" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/8 bg-white/3 p-4">
                  <p className="font-display text-xl font-semibold text-cyan">{s.value}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <DemoNotice className="mt-6" />
          </GlassCard>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

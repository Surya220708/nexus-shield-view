import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Activity,
  BarChart3,
  Bot,
  Boxes,
  Eye,
  Gauge,
  Globe2,
  Layers,
  Radar,
  ShieldCheck,
  Timer,
  Users,
  Zap,
} from "lucide-react";
import { CyberBackground } from "@/components/cyber/CyberBackground";
import { HeroVisual } from "@/components/cyber/HeroVisual";
import { SiteNav } from "@/components/cyber/SiteNav";
import { SiteFooter } from "@/components/cyber/SiteFooter";
import { FloatingCopilot } from "@/components/cyber/CopilotPanel";
import {
  AnimatedCounter,
  DemoNotice,
  Eyebrow,
  GlassCard,
  Reveal,
  SectionHeading,
  StatusDot,
} from "@/components/cyber/primitives";
import { COMPANY, HERO_STATS, PLATFORM_FEATURES, SECURITY_METRICS, WHY_POINTS } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberShield 360 — AI Enterprise Cybersecurity Monitoring" },
      {
        name: "description",
        content:
          "CyberShield 360 is a demo AI-powered enterprise cybersecurity monitoring and threat intelligence platform with a full SOC dashboard experience.",
      },
      { property: "og:title", content: "CyberShield 360 — AI Cybersecurity Platform" },
      {
        property: "og:description",
        content:
          "Detect threats, understand risk and respond faster with unified AI-driven visibility across the enterprise.",
      },
    ],
  }),
  component: Home,
});

const FEATURE_ICONS = [Radar, Eye, Globe2, Users, Zap, BarChart3];
const WHY_ICONS = [Layers, Bot, Globe2, Gauge, Timer, Boxes];

function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SiteNav />
      <FloatingCopilot />

      {/* HERO */}
      <section className="relative">
        <CyberBackground />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pt-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pt-20 lg:pb-28">
          <div className="rise-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-safe/25 bg-safe/8 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-safe uppercase">
              <StatusDot tone="safe" /> System Status: Operational
            </span>

            <h1 className="mt-6 font-display text-[clamp(2.6rem,8vw,5.1rem)] leading-[0.95] font-bold tracking-[-0.03em]">
              <span className="text-gradient">CYBERSHIELD</span>
              <span className="ml-3 text-foreground/90">360</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-snug font-medium text-foreground/85 sm:text-xl">
              AI-Powered Enterprise Cybersecurity Monitoring &amp; Threat Intelligence
            </p>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Detect threats. Understand risk. Respond faster. CyberShield 360 uses artificial
              intelligence, behavioral analytics, and threat intelligence to provide unified
              visibility across modern enterprise environments.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl border border-cyan/45 bg-cyan/14 px-5 py-3 text-sm font-semibold text-cyan transition-all hover:bg-cyan/22 hover:shadow-[0_0_40px_-10px_var(--cyan)]"
              >
                Explore Security Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/architecture"
                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/4 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-white/25 hover:bg-white/8"
              >
                View System Architecture
              </Link>
            </div>

            <DemoNotice className="mt-6" />
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroVisual className="fade-in-soft" />
          </div>
        </div>

        {/* HERO STATS */}
        <div className="relative mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-24">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/6 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="group h-full bg-background/85 px-6 py-7 transition-colors hover:bg-cyan/6">
                  <p className="font-display text-4xl font-bold text-gradient">
                    <AnimatedCounter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENVIRONMENT SNAPSHOT */}
      <section className="relative border-y border-white/8 bg-surface/30">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
            <div>
              <Eyebrow>Demo Environment</Eyebrow>
              <p className="mt-3 font-display text-xl font-semibold">{COMPANY.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { label: "Endpoints", value: COMPANY.endpoints },
                { label: "Cloud Resources", value: COMPANY.cloudResources },
                { label: "Network Devices", value: COMPANY.networkDevices },
                { label: "Users", value: COMPANY.users },
                { label: "Security Policies", value: COMPANY.policies },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-semibold text-cyan">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Platform Capabilities"
            title={
              <>
                Everything a modern SOC needs,{" "}
                <span className="text-gradient">in one intelligent platform</span>
              </>
            }
            description="Six integrated capability areas cover the full detection-to-response lifecycle across endpoints, identities, network and cloud."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_FEATURES.map((f, i) => {
              const Icon = FEATURE_ICONS[i] ?? ShieldCheck;
              return (
                <Reveal key={f.title} delay={i * 70}>
                  <GlassCard hover glowTone={i % 2 === 0 ? "cyan" : "neon"} className="h-full p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                    <span className="mt-5 block h-px w-full rule-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </GlassCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* METRICS BAND */}
      <section className="relative border-y border-white/8">
        <div className="absolute inset-0 grid-scroll opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <SectionHeading
              eyebrow="Program Metrics"
              title={<>Measurable outcomes from the demo environment</>}
              description="Representative figures produced by the simulated detection engine over the last 30 days."
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { label: "Threats Detected", value: SECURITY_METRICS.threatsDetected, tone: "text-cyan" },
                { label: "Incidents", value: SECURITY_METRICS.incidents, tone: "text-neon" },
                { label: "Critical Incidents", value: SECURITY_METRICS.criticalIncidents, tone: "text-critical" },
                { label: "Resolved Incidents", value: SECURITY_METRICS.resolvedIncidents, tone: "text-safe" },
              ].map((m) => (
                <GlassCard key={m.label} hover className="p-5">
                  <p className={`font-display text-3xl font-semibold ${m.tone}`}>
                    <AnimatedCounter value={m.value} />
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {m.label}
                  </p>
                </GlassCard>
              ))}
              <GlassCard hover className="p-5">
                <p className="font-display text-3xl font-semibold text-warn">
                  {SECURITY_METRICS.avgResponse}
                </p>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  Avg Response Time
                </p>
              </GlassCard>
              <GlassCard hover className="p-5">
                <p className="font-display text-3xl font-semibold text-violet">
                  <AnimatedCounter value={SECURITY_METRICS.aiConfidence} decimals={1} suffix="%" />
                </p>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  AI Detection Confidence
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading
            align="center"
            eyebrow="Why CyberShield 360"
            title={
              <>
                One Platform. <span className="text-gradient">Complete Visibility.</span>
              </>
            }
            description="Consolidating detection, intelligence and response removes the blind spots created by fragmented security tooling."
            className="mx-auto items-center"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_POINTS.map((w, i) => {
              const Icon = WHY_ICONS[i] ?? ShieldCheck;
              return (
                <Reveal key={w.title} delay={i * 60}>
                  <div className="group flex h-full gap-4 rounded-2xl border border-white/8 bg-white/3 p-5 transition-all hover:-translate-y-1 hover:border-cyan/30 hover:bg-cyan/6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-background/60 text-cyan">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold">{w.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
          <GlassCard glowTone="neon" className="overflow-hidden px-6 py-14 text-center sm:px-14">
            <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
            <div className="relative">
              <Eyebrow>Live Demonstration</Eyebrow>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-semibold text-balance sm:text-4xl">
                See, understand, prioritize and respond — from a single{" "}
                <span className="text-gradient">security operations console</span>
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan/45 bg-cyan/14 px-5 py-3 text-sm font-semibold text-cyan transition-all hover:bg-cyan/22"
                >
                  Open the SOC Dashboard <Activity className="h-4 w-4" />
                </Link>
                <Link
                  to="/threat-intelligence"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/4 px-5 py-3 text-sm font-semibold transition-all hover:border-white/25 hover:bg-white/8"
                >
                  Global Threat Intelligence <Globe2 className="h-4 w-4" />
                </Link>
              </div>
              <DemoNotice className="mt-8" />
            </div>
          </GlassCard>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

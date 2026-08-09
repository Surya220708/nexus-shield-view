import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Laptop, Search, Server, Smartphone } from "lucide-react";
import { DashboardShell } from "@/components/cyber/DashboardShell";
import {
  DemoNotice,
  GlassCard,
  MeterBar,
  MetricTile,
  PanelHeader,
  SectionHeading,
  SeverityBadge,
} from "@/components/cyber/primitives";
import { COMPANY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/endpoints")({
  head: () => ({
    meta: [
      { title: "Endpoint Protection — CyberShield 360" },
      {
        name: "description",
        content:
          "Endpoint fleet coverage, agent health and per-device posture across workstations, servers and mobile devices in the demo estate.",
      },
      { property: "og:title", content: "Endpoint Protection — CyberShield 360" },
      {
        property: "og:description",
        content: "Agent coverage, posture scores and isolated devices at a glance.",
      },
    ],
  }),
  component: EndpointsPage,
});

const DEVICES = [
  { id: "Endpoint-042", type: "Workstation", os: "Windows 11", posture: 42, state: "Isolated", severity: "CRITICAL" },
  { id: "SRV-DB-01", type: "Server", os: "Ubuntu 24.04", posture: 78, state: "Monitored", severity: "HIGH" },
  { id: "Endpoint-118", type: "Workstation", os: "macOS 15", posture: 94, state: "Healthy", severity: "LOW" },
  { id: "SRV-APP-04", type: "Server", os: "Ubuntu 24.04", posture: 88, state: "Healthy", severity: "LOW" },
  { id: "MOB-2210", type: "Mobile", os: "Android 15", posture: 66, state: "Review", severity: "MEDIUM" },
  { id: "Endpoint-307", type: "Workstation", os: "Windows 11", posture: 91, state: "Healthy", severity: "LOW" },
  { id: "SRV-WEB-02", type: "Server", os: "RHEL 9", posture: 71, state: "Review", severity: "MEDIUM" },
  { id: "MOB-1184", type: "Mobile", os: "iOS 19", posture: 96, state: "Healthy", severity: "LOW" },
];

const TYPES = ["All", "Workstation", "Server", "Mobile"] as const;
const TYPE_ICON = { Workstation: Laptop, Server: Server, Mobile: Smartphone };

function EndpointsPage() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [query, setQuery] = useState("");

  const rows = DEVICES.filter(
    (d) =>
      (type === "All" || d.type === type) &&
      `${d.id} ${d.os} ${d.state}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <DashboardShell title="Endpoint Protection" subtitle="Fleet Coverage & Device Posture">
      <div className="grid gap-6">
        <SectionHeading
          eyebrow="Endpoint Layer"
          title={
            <>
              Protected <span className="text-gradient">Device Fleet</span>
            </>
          }
          description="Agent telemetry from every managed workstation, server and mobile device feeds the behavioral detection engine."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricTile label="Managed Endpoints" value={COMPANY.endpoints.toLocaleString()} tone="cyan" />
          <MetricTile label="Agent Coverage" value="99.2%" tone="safe" hint="24 devices pending enrollment" />
          <MetricTile label="Devices Under Review" value="14" tone="warn" />
          <MetricTile label="Isolated Devices" value="01" tone="critical" hint="Endpoint-042 · INC-002" />
        </div>

        <GlassCard>
          <PanelHeader
            icon={<Laptop className="h-4 w-4" />}
            title="Device Inventory"
            subtitle="Filterable sample of the managed fleet"
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex rounded-lg border border-white/10 bg-white/4 p-0.5">
                  {TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={cn(
                        "rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors",
                        type === t ? "bg-cyan/16 text-cyan" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-3 py-1.5">
                  <Search className="h-3.5 w-3.5 text-cyan" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search devices…"
                    className="w-32 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] text-left">
              <thead>
                <tr className="border-b border-white/8">
                  {["Device", "Type", "Operating System", "Posture", "Risk", "State"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => {
                  const Icon = TYPE_ICON[d.type as keyof typeof TYPE_ICON];
                  return (
                    <tr key={d.id} className="border-b border-white/5 transition-colors hover:bg-white/4">
                      <td className="px-5 py-3.5 text-sm font-medium">{d.id}</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon className="h-3.5 w-3.5 text-cyan" /> {d.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[11px] text-muted-foreground">{d.os}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">{d.posture}</span>
                          <MeterBar
                            value={d.posture}
                            tone={d.posture > 85 ? "safe" : d.posture > 65 ? "warn" : "critical"}
                            className="w-16"
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <SeverityBadge severity={d.severity} />
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[11px] text-muted-foreground">{d.state}</td>
                    </tr>
                  );
                })}
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                      No devices match the current filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <DemoNotice />
      </div>
    </DashboardShell>
  );
}

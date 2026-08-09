// All values below are FICTIONAL DEMO DATA for an academic presentation.
// No real telemetry, threat feeds, or customer data is represented here.

export const COMPANY = {
  name: "CyberShield Enterprise",
  endpoints: 2847,
  cloudResources: 184,
  networkDevices: 326,
  users: 12481,
  policies: 48,
};

export const SECURITY_METRICS = {
  threatsDetected: 1284,
  incidents: 42,
  criticalIncidents: 6,
  resolvedIncidents: 36,
  avgResponse: "4m 18s",
  aiConfidence: 96.8,
};

export const HERO_STATS = [
  { value: 24, suffix: "/7", label: "Continuous Monitoring", decimals: 0 },
  { value: 99.7, suffix: "%", label: "Detection Accuracy", decimals: 1 },
  { value: 12.4, suffix: "K", label: "Events Analyzed", decimals: 1 },
  { value: 0.8, suffix: "s", label: "Average Alert Processing", decimals: 1 },
];

export const SOC_STATUS = [
  { label: "System Health", value: "98.7%", tone: "safe" as const },
  { label: "Active Threats", value: "07", tone: "warn" as const },
  { label: "Critical Alerts", value: "02", tone: "critical" as const },
  { label: "Events / Min", value: "1,842", tone: "cyan" as const },
  { label: "AI Risk Score", value: "23/100", tone: "safe" as const },
];

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export const EVENT_TIMELINE = [
  { time: "00:00", normal: 820, suspicious: 62, critical: 4 },
  { time: "02:00", normal: 640, suspicious: 48, critical: 2 },
  { time: "04:00", normal: 520, suspicious: 39, critical: 1 },
  { time: "06:00", normal: 910, suspicious: 71, critical: 3 },
  { time: "08:00", normal: 1480, suspicious: 128, critical: 6 },
  { time: "10:00", normal: 1720, suspicious: 164, critical: 9 },
  { time: "12:00", normal: 1842, suspicious: 148, critical: 7 },
  { time: "14:00", normal: 1690, suspicious: 173, critical: 11 },
  { time: "16:00", normal: 1540, suspicious: 132, critical: 5 },
  { time: "18:00", normal: 1280, suspicious: 96, critical: 4 },
  { time: "20:00", normal: 1040, suspicious: 84, critical: 3 },
  { time: "22:00", normal: 880, suspicious: 66, critical: 2 },
];

export const RISK_BREAKDOWN = [
  { label: "Network Risk", value: 26 },
  { label: "Endpoint Risk", value: 34 },
  { label: "Identity Risk", value: 41 },
  { label: "Cloud Risk", value: 18 },
  { label: "Data Risk", value: 12 },
];

export const RECENT_THREATS = [
  { name: "Phishing Attempt", severity: "MEDIUM" as Severity, ago: "2 min ago", vector: "Email Gateway" },
  { name: "Suspicious Login", severity: "HIGH" as Severity, ago: "5 min ago", vector: "Identity Provider" },
  { name: "Malware Signature", severity: "CRITICAL" as Severity, ago: "8 min ago", vector: "Endpoint-042" },
  { name: "Abnormal Network Traffic", severity: "MEDIUM" as Severity, ago: "12 min ago", vector: "Core Switch 02" },
  { name: "Privilege Escalation Attempt", severity: "HIGH" as Severity, ago: "19 min ago", vector: "Directory Service" },
  { name: "New Endpoint Connected", severity: "LOW" as Severity, ago: "24 min ago", vector: "Branch VLAN" },
];

export const TICKER_EVENTS = [
  "AI engine reclassified 12 low-signal alerts as benign",
  "Behavioral baseline refreshed for 2,847 endpoints",
  "Threat intel sync complete — 4,633 indicators",
  "INC-002 moved to containment by analyst R. Mehta",
  "Cloud posture scan finished — 184 resources evaluated",
  "Detection model v4.2 confidence at 96.8%",
];

export const AI_CAPABILITIES = [
  {
    title: "Behavioral Anomaly Detection",
    body: "Baselines every identity, endpoint and workload, then flags deviations from learned normal activity.",
    metric: "2.4M baselines",
  },
  {
    title: "Machine Learning Classification",
    body: "Ensemble models score each event stream against known malicious behavior families.",
    metric: "v4.2 model",
  },
  {
    title: "Predictive Risk Analysis",
    body: "Forecasts which assets are most likely to be targeted next based on exposure and activity.",
    metric: "7-day horizon",
  },
  {
    title: "Automated Correlation",
    body: "Stitches thousands of weak signals into a single high-fidelity incident narrative.",
    metric: "18:1 reduction",
  },
  {
    title: "Zero-Day Detection Concept",
    body: "Signature-independent analysis surfaces novel techniques before intel feeds catch up.",
    metric: "Heuristic layer",
  },
  {
    title: "Threat Classification",
    body: "Maps detections to tactic and technique categories for faster analyst triage.",
    metric: "142 techniques",
  },
];

export const AI_PIPELINE = [
  { step: "Security Events", detail: "Telemetry ingested from endpoints, cloud and network", value: "1,842 / min" },
  { step: "Data Processing", detail: "Normalization, enrichment and deduplication", value: "99.4% parsed" },
  { step: "Feature Extraction", detail: "418 behavioral and contextual features computed", value: "418 features" },
  { step: "ML Analysis", detail: "Ensemble inference across detection models", value: "12 models" },
  { step: "Behavioral Correlation", detail: "Cross-entity linking of related weak signals", value: "18:1 merge" },
  { step: "Risk Scoring", detail: "Composite risk assigned per entity and incident", value: "0–100 scale" },
  { step: "Security Alert", detail: "Prioritized alert routed to the SOC queue", value: "0.8s latency" },
];

export const AI_CONFIDENCE = [
  { label: "Threat Classification", value: 98.2 },
  { label: "Behavioral Analysis", value: 94.7 },
  { label: "Anomaly Detection", value: 96.1 },
];

export const REGIONS = [
  { name: "North America", indicators: 1248, x: 22, y: 36, tone: "warn" as const },
  { name: "Europe", indicators: 986, x: 49, y: 30, tone: "cyan" as const },
  { name: "Asia", indicators: 1742, x: 71, y: 40, tone: "critical" as const },
  { name: "Middle East", indicators: 438, x: 58, y: 46, tone: "warn" as const },
  { name: "Africa", indicators: 219, x: 50, y: 58, tone: "safe" as const },
];

export const INTEL_CATEGORIES = [
  { label: "Malware Indicators", value: 1863, delta: "+4.2%" },
  { label: "Phishing Campaigns", value: 742, delta: "+7.8%" },
  { label: "Suspicious IPs", value: 2914, delta: "-1.4%" },
  { label: "Malicious Domains", value: 1128, delta: "+2.6%" },
  { label: "Emerging Threats", value: 96, delta: "+11.3%" },
];

export type IntelRow = {
  threat: string;
  category: string;
  severity: Severity;
  confidence: number;
  source: string;
  status: "Active" | "Monitoring" | "Blocked" | "Contained";
};

export const INTEL_FEED: IntelRow[] = [
  { threat: "Credential Phishing", category: "Phishing", severity: "HIGH", confidence: 96, source: "Threat Intelligence Feed", status: "Active" },
  { threat: "Ransomware Campaign", category: "Ransomware", severity: "CRITICAL", confidence: 94, source: "Threat Intelligence Feed", status: "Monitoring" },
  { threat: "Suspicious Domain", category: "Malicious Domain", severity: "MEDIUM", confidence: 89, source: "Threat Intelligence Feed", status: "Blocked" },
  { threat: "Botnet Beacon Pattern", category: "Command & Control", severity: "HIGH", confidence: 91, source: "Behavioral Model", status: "Contained" },
  { threat: "Credential Stuffing Wave", category: "Identity Attack", severity: "MEDIUM", confidence: 87, source: "Identity Analytics", status: "Monitoring" },
  { threat: "Supply Chain Advisory", category: "Emerging Threat", severity: "HIGH", confidence: 82, source: "Threat Intelligence Feed", status: "Active" },
  { threat: "Legacy Protocol Abuse", category: "Lateral Movement", severity: "LOW", confidence: 74, source: "Network Analytics", status: "Blocked" },
  { threat: "Data Exfiltration Pattern", category: "Exfiltration", severity: "CRITICAL", confidence: 93, source: "Behavioral Model", status: "Contained" },
];

export const IR_WORKFLOW = [
  "Detection",
  "Analysis",
  "Prioritization",
  "Containment",
  "Investigation",
  "Recovery",
  "Resolved",
];

export type Incident = {
  id: string;
  title: string;
  severity: Severity;
  status: string;
  stage: number;
  risk: number;
  analyst: string;
  opened: string;
  summary: string;
  timeline: { time: string; entry: string }[];
};

export const INCIDENTS: Incident[] = [
  {
    id: "INC-001",
    title: "Suspicious Authentication Activity",
    severity: "HIGH",
    status: "Investigating",
    stage: 4,
    risk: 78,
    analyst: "R. Mehta",
    opened: "Today · 09:42",
    summary:
      "Multiple failed authentication attempts followed by a successful login from an unrecognized geography for a finance department account.",
    timeline: [
      { time: "09:42", entry: "Detection raised by identity analytics model" },
      { time: "09:44", entry: "Correlated with 14 failed attempts in 6 minutes" },
      { time: "09:51", entry: "Session flagged, step-up verification requested" },
      { time: "10:06", entry: "Analyst investigation opened" },
    ],
  },
  {
    id: "INC-002",
    title: "Potential Malware Activity",
    severity: "CRITICAL",
    status: "Containment",
    stage: 3,
    risk: 91,
    analyst: "A. Fernandes",
    opened: "Today · 08:15",
    summary:
      "Endpoint-042 exhibited process behavior consistent with a known malware family, including unusual persistence and outbound beaconing.",
    timeline: [
      { time: "08:15", entry: "Behavioral signature match on Endpoint-042" },
      { time: "08:17", entry: "Automated isolation policy applied" },
      { time: "08:31", entry: "Memory artifacts queued for analysis" },
      { time: "09:02", entry: "Containment confirmed, blast radius scoped to 1 host" },
    ],
  },
  {
    id: "INC-003",
    title: "Abnormal Data Transfer",
    severity: "MEDIUM",
    status: "Monitoring",
    stage: 2,
    risk: 54,
    analyst: "K. Iyer",
    opened: "Yesterday · 22:48",
    summary:
      "A service account transferred 4.2× its typical daily volume to an approved but rarely used cloud storage destination.",
    timeline: [
      { time: "22:48", entry: "Volume anomaly detected against 30-day baseline" },
      { time: "22:55", entry: "Destination verified as sanctioned resource" },
      { time: "23:20", entry: "Watchlist monitoring enabled for 72 hours" },
    ],
  },
  {
    id: "INC-004",
    title: "Unusual Privileged Account Usage",
    severity: "HIGH",
    status: "Analysis",
    stage: 1,
    risk: 72,
    analyst: "S. Kapoor",
    opened: "Yesterday · 17:04",
    summary:
      "An administrative account performed configuration changes outside its normal maintenance window and role pattern.",
    timeline: [
      { time: "17:04", entry: "Privilege anomaly raised by UEBA model" },
      { time: "17:22", entry: "Change records requested from asset owner" },
    ],
  },
];

export const NETWORK_STATS = [
  { label: "Network Health", value: "98.4%", tone: "safe" as const },
  { label: "Bandwidth Usage", value: "64%", tone: "cyan" as const },
  { label: "Active Connections", value: "2,841", tone: "neon" as const },
  { label: "Suspicious Connections", value: "17", tone: "warn" as const },
];

export const NETWORK_TRAFFIC = [
  { time: "00:00", inbound: 420, outbound: 260, suspicious: 12 },
  { time: "03:00", inbound: 310, outbound: 190, suspicious: 8 },
  { time: "06:00", inbound: 520, outbound: 340, suspicious: 14 },
  { time: "09:00", inbound: 880, outbound: 610, suspicious: 26 },
  { time: "12:00", inbound: 960, outbound: 720, suspicious: 31 },
  { time: "15:00", inbound: 910, outbound: 690, suspicious: 22 },
  { time: "18:00", inbound: 740, outbound: 520, suspicious: 17 },
  { time: "21:00", inbound: 560, outbound: 380, suspicious: 11 },
];

export const NETWORK_SEGMENTS = [
  { name: "Perimeter", devices: 24, health: 99.1, alerts: 2 },
  { name: "Core Switching", devices: 46, health: 98.7, alerts: 1 },
  { name: "Data Center", devices: 88, health: 97.9, alerts: 5 },
  { name: "Cloud Interconnect", devices: 62, health: 98.8, alerts: 3 },
  { name: "Branch / Remote", devices: 106, health: 96.4, alerts: 6 },
];

export type UserRow = {
  user: string;
  department: string;
  risk: number;
  behavior: string;
  status: "Safe" | "Review" | "High Risk";
};

export const UEBA_USERS: UserRow[] = [
  { user: "alex@example.com", department: "Engineering", risk: 12, behavior: "Normal", status: "Safe" },
  { user: "user02@example.com", department: "Finance", risk: 67, behavior: "Unusual Login Pattern", status: "Review" },
  { user: "user03@example.com", department: "Operations", risk: 84, behavior: "Abnormal Data Access", status: "High Risk" },
  { user: "user04@example.com", department: "Sales", risk: 23, behavior: "Normal", status: "Safe" },
  { user: "user05@example.com", department: "IT Admin", risk: 71, behavior: "Off-hours Privilege Use", status: "Review" },
  { user: "user06@example.com", department: "Legal", risk: 18, behavior: "Normal", status: "Safe" },
  { user: "user07@example.com", department: "Support", risk: 58, behavior: "New Location Access", status: "Review" },
  { user: "user08@example.com", department: "Engineering", risk: 89, behavior: "Bulk Repository Export", status: "High Risk" },
];

export const BEHAVIOR_SIGNALS = [
  { signal: "Login Anomalies", value: 62 },
  { signal: "Data Access", value: 48 },
  { signal: "Privilege Changes", value: 34 },
  { signal: "Location Changes", value: 55 },
  { signal: "Session Behavior", value: 41 },
];

export const BEHAVIOR_TREND = [
  { day: "Mon", anomalies: 18, baseline: 12 },
  { day: "Tue", anomalies: 22, baseline: 13 },
  { day: "Wed", anomalies: 31, baseline: 14 },
  { day: "Thu", anomalies: 26, baseline: 13 },
  { day: "Fri", anomalies: 38, baseline: 15 },
  { day: "Sat", anomalies: 14, baseline: 9 },
  { day: "Sun", anomalies: 11, baseline: 8 },
];

export const VULN_STATS = [
  { label: "Critical", value: 6, tone: "critical" as const },
  { label: "High", value: 21, tone: "warn" as const },
  { label: "Medium", value: 48, tone: "cyan" as const },
  { label: "Low", value: 73, tone: "safe" as const },
];

export type VulnRow = {
  asset: string;
  vulnerability: string;
  severity: Severity;
  risk: number;
  status: "Open" | "Remediation" | "Verified" | "Accepted";
};

export const VULNERABILITIES: VulnRow[] = [
  { asset: "Web Server", vulnerability: "Outdated Component", severity: "HIGH", risk: 8.6, status: "Open" },
  { asset: "Database Server", vulnerability: "Configuration Issue", severity: "CRITICAL", risk: 9.1, status: "Open" },
  { asset: "Endpoint-042", vulnerability: "Security Update Missing", severity: "MEDIUM", risk: 5.4, status: "Remediation" },
  { asset: "Cloud Storage Bucket", vulnerability: "Overly Broad Access Policy", severity: "HIGH", risk: 7.9, status: "Remediation" },
  { asset: "VPN Gateway", vulnerability: "Weak Cipher Suite Enabled", severity: "MEDIUM", risk: 6.1, status: "Open" },
  { asset: "Build Server", vulnerability: "Unrotated Service Credential", severity: "CRITICAL", risk: 9.4, status: "Open" },
  { asset: "Print Service", vulnerability: "Legacy Protocol Enabled", severity: "LOW", risk: 3.2, status: "Accepted" },
  { asset: "HR Application", vulnerability: "Missing Security Header", severity: "LOW", risk: 2.8, status: "Verified" },
];

export const RISK_EXPOSURE = [
  { area: "Cloud", exposure: 62, remediated: 38 },
  { area: "Endpoints", exposure: 48, remediated: 52 },
  { area: "Network", exposure: 35, remediated: 65 },
  { area: "Identity", exposure: 57, remediated: 43 },
  { area: "Applications", exposure: 44, remediated: 56 },
];

export const FRAMEWORKS = [
  { name: "ISO 27001", score: 92, controls: "114 controls" },
  { name: "NIST CSF", score: 88, controls: "5 functions" },
  { name: "GDPR", score: 94, controls: "Data protection" },
  { name: "SOC 2", score: 91, controls: "5 criteria" },
];

export const CONTROLS = [
  { name: "Access Control", state: "Implemented" as const, note: "MFA enforced across 98% of identities" },
  { name: "Incident Response", state: "Implemented" as const, note: "Runbooks reviewed this quarter" },
  { name: "Data Protection", state: "Implemented" as const, note: "Encryption at rest and in transit" },
  { name: "Monitoring", state: "Implemented" as const, note: "Continuous telemetry across all zones" },
  { name: "Risk Assessment", state: "Needs Review" as const, note: "Annual review window approaching" },
  { name: "Vendor Management", state: "Implemented" as const, note: "42 third parties assessed" },
];

export const THREAT_TRENDS = [
  { month: "Jan", threats: 820, incidents: 28 },
  { month: "Feb", threats: 910, incidents: 31 },
  { month: "Mar", threats: 1040, incidents: 36 },
  { month: "Apr", threats: 980, incidents: 30 },
  { month: "May", threats: 1180, incidents: 39 },
  { month: "Jun", threats: 1284, incidents: 42 },
];

export const ATTACK_CATEGORIES = [
  { name: "Phishing", value: 34 },
  { name: "Malware", value: 22 },
  { name: "Identity Attacks", value: 18 },
  { name: "Misconfiguration", value: 15 },
  { name: "Insider Risk", value: 11 },
];

export const DETECTION_PERFORMANCE = [
  { month: "Jan", precision: 92.4, recall: 88.1, responseMin: 7.4 },
  { month: "Feb", precision: 93.1, recall: 89.6, responseMin: 6.9 },
  { month: "Mar", precision: 94.6, recall: 91.2, responseMin: 6.1 },
  { month: "Apr", precision: 95.2, recall: 92.8, responseMin: 5.5 },
  { month: "May", precision: 96.1, recall: 93.9, responseMin: 4.9 },
  { month: "Jun", precision: 96.8, recall: 94.7, responseMin: 4.3 },
];

export const ALERTS = [
  { severity: "CRITICAL" as Severity, title: "Potential ransomware behavior detected", source: "Endpoint-042", ago: "3 min ago" },
  { severity: "HIGH" as Severity, title: "Unusual privileged account activity", source: "Directory Service", ago: "11 min ago" },
  { severity: "MEDIUM" as Severity, title: "Suspicious network traffic observed", source: "Core Switch 02", ago: "26 min ago" },
  { severity: "LOW" as Severity, title: "New endpoint connected", source: "Branch VLAN", ago: "48 min ago" },
  { severity: "HIGH" as Severity, title: "Impossible travel login pattern", source: "Identity Provider", ago: "1 hr ago" },
  { severity: "MEDIUM" as Severity, title: "Cloud storage policy drift detected", source: "Cloud Posture", ago: "2 hr ago" },
];

export const PLATFORM_FEATURES = [
  { title: "AI Threat Detection", body: "Models trained on behavioral telemetry surface threats that static rules miss." },
  { title: "Continuous Monitoring", body: "Round-the-clock visibility across endpoints, identities, network and cloud." },
  { title: "Threat Intelligence", body: "Global indicator context enriches every detection before an analyst sees it." },
  { title: "Behavior Analytics", body: "Per-entity baselines expose insider risk and compromised account patterns." },
  { title: "Automated Response", body: "Guided containment playbooks compress the time between alert and action." },
  { title: "Security Analytics", body: "Executive-ready reporting on posture, trends and program effectiveness." },
];

export const WHY_POINTS = [
  { title: "Unified Monitoring", body: "One console for every signal source in the enterprise estate." },
  { title: "AI-Powered Detection", body: "Behavioral models that adapt as your environment changes." },
  { title: "Real-Time Intelligence", body: "Indicators correlated with local telemetry the moment they arrive." },
  { title: "Risk-Based Prioritization", body: "Analysts always work the highest-impact item first." },
  { title: "Faster Response", body: "Automated correlation removes hours of manual triage." },
  { title: "Enterprise Scalability", body: "Designed for multi-region estates with tens of thousands of identities." },
];

export const ARCHITECTURE_LAYERS = [
  {
    title: "Enterprise Environment",
    nodes: ["Endpoints", "Cloud Assets", "Network"],
    note: "Telemetry sources across the estate",
  },
  { title: "Data Collection", nodes: ["Collectors & Agents"], note: "Normalized, enriched, deduplicated" },
  { title: "Security Event Stream", nodes: ["Streaming Pipeline"], note: "1,842 events per minute (demo)" },
  { title: "AI / ML Analytics Engine", nodes: ["Model Ensemble"], note: "12 detection models, v4.2" },
  {
    title: "Analysis Layer",
    nodes: ["Anomaly Detection", "Threat Intel", "Risk Analysis"],
    note: "Parallel evaluation paths",
  },
  { title: "Correlation Engine", nodes: ["Signal Fusion"], note: "18:1 alert reduction" },
  { title: "Security Dashboard", nodes: ["SOC Console"], note: "Unified analyst workspace" },
  { title: "Incident Response", nodes: ["Playbooks & Workflow"], note: "Guided containment" },
  { title: "Reporting", nodes: ["Compliance & Executive"], note: "Posture and program metrics" },
];

export const COPILOT_SCRIPT = [
  {
    role: "ai" as const,
    text: "I detected an unusual authentication pattern involving multiple login attempts from a new location.",
  },
  { role: "analyst" as const, text: "Show me the risk assessment." },
  {
    role: "ai" as const,
    text: "Current risk: HIGH.\nPrimary contributing factors:\n• Unusual login behavior\n• Multiple failed authentication attempts\n• New geographic pattern",
  },
];

export const COPILOT_RESPONSES: Record<string, string> = {
  "Analyze Incident":
    "INC-001 analysis complete.\n• 14 failed authentications in 6 minutes\n• Successful login from an unrecognized geography\n• Account belongs to the finance department\nRecommended next step: force session revocation and step-up verification.",
  "Explain Risk":
    "The risk score of 78 is driven by identity signals.\n• Behavior deviation: 4.1σ from the user baseline\n• Asset sensitivity: finance systems in scope\n• Threat intel overlap: source range seen in credential-stuffing activity",
  "Summarize Threat":
    "Summary: a likely credential-based intrusion attempt against a single privileged finance identity. No lateral movement observed. Containment actions have limited the blast radius to one session.",
  "View Recommendations":
    "Recommendations:\n1. Revoke active sessions for the affected identity\n2. Require step-up verification for the next 24 hours\n3. Review conditional access policy for this geography\n4. Add the source range to the monitoring watchlist",
};

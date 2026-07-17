import type { Concept } from "../types";

function cc(
  code: string,
  name: string,
  definition: string,
  group: string,
  related: string[] = ["it-cmf-overview", "it-cmf-critical-capabilities"],
): Concept {
  return {
    id: `cc-${code.toLowerCase()}`,
    title: `${code} — ${name}`,
    topicId: "itcmf",
    summary: definition,
    detail: {
      definition: `${name} (${code}): ${definition}`,
      components: [`Acronym: ${code}`, `Group: ${group}`, `Framework: IT-CMF Critical Capability`],
      examTraps: [
        `Trigger: ${name.toLowerCase()} → ${code}`,
        "Do not confuse this Critical Capability with an IT-CMF macro-capability.",
      ],
    },
    related,
  };
}

export const itcmfConcepts: Concept[] = [
  {
    id: "it-cmf-critical-capabilities",
    title: "IT-CMF Critical Capabilities (all 36)",
    topicId: "itcmf",
    summary: "36 Critical Capabilities are actionable IT management practices assessed for maturity.",
    detail: {
      definition:
        "Each CC has a focused scope (e.g. BAR for benefits, TCO for lifecycle cost). Macros group many CCs; a CC is not a macro.",
      components: [
        "Strategy & planning: SP, BP, CAM, DSM, EAM, BPM, CFP",
        "People & knowledge: PAM, UTM, KAM, PDP, ISM",
        "Innovation & R&D: RDE, IM, UED",
        "Impact & value: EIM, RM, BAR",
        "Portfolio & projects: PM, PPP, PPM",
        "Investments & budget: AA, FF, BGM, BOP, TCO",
        "Services & delivery: SRP, SD, TIM, SRC, SAI",
        "Governance & suppliers: ITG, ODP, REM, SUM, GIT",
      ],
      examTraps: ["Memorize acronym ↔ one-line purpose pairs.", "Macro ≠ Critical Capability."],
    },
    related: ["it-cmf-overview", "it-cmf-macro-capabilities", "it-cmf-maturity-levels"],
  },

  // Strategy & planning
  cc("SP", "Strategic Planning", "Long-term IS/IT strategic planning.", "Strategy & planning", [
    "it-cmf-critical-capabilities",
    "sisp-process",
  ]),
  cc("BP", "Business Planning", "Aligning IT with business planning cycles.", "Strategy & planning"),
  cc(
    "CAM",
    "Capability Assessment Management",
    "Assessing IT and organizational capabilities.",
    "Strategy & planning",
  ),
  cc(
    "DSM",
    "Demand and Supply Management",
    "Balancing demand for IT with supply capacity.",
    "Strategy & planning",
  ),
  cc(
    "EAM",
    "Enterprise Architecture Management",
    "Managing interdependencies across the IT landscape.",
    "Strategy & planning",
    ["it-cmf-critical-capabilities", "strategic-alignment-model"],
  ),
  cc(
    "BPM",
    "Business Process Management",
    "Improving business processes enabled by IT.",
    "Strategy & planning",
  ),
  cc(
    "CFP",
    "Capacity Forecasting and Planning",
    "Forecasting and planning IT capacity.",
    "Strategy & planning",
  ),

  // People & knowledge
  cc("PAM", "People Asset Management", "Workforce skills and human-capital practices.", "People & knowledge", [
    "it-cmf-critical-capabilities",
    "it-governance",
  ]),
  cc(
    "UTM",
    "User Training Management",
    "Training users for effective system adoption.",
    "People & knowledge",
  ),
  cc(
    "KAM",
    "Knowledge Asset Management",
    "Managing organizational knowledge assets.",
    "People & knowledge",
  ),
  cc(
    "PDP",
    "Personal Data Protection",
    "Privacy and personal data compliance.",
    "People & knowledge",
  ),
  cc(
    "ISM",
    "Information Security Management",
    "Protecting information assets and security posture.",
    "People & knowledge",
  ),

  // Innovation & R&D
  cc(
    "RDE",
    "Research, Development and Engineering",
    "R&D and engineering for future IT capabilities.",
    "Innovation & R&D",
  ),
  cc("IM", "Innovation Management", "Managing the innovation pipeline for IT.", "Innovation & R&D", [
    "it-cmf-critical-capabilities",
    "schumpeter-innovation",
  ]),
  cc(
    "UED",
    "User Experience Design",
    "Designing usable, valuable user experiences.",
    "Innovation & R&D",
  ),

  // Impact & value
  cc(
    "EIM",
    "Enterprise Information Management",
    "Governing data and information as enterprise assets.",
    "Impact & value",
  ),
  cc("RM", "Risk Management", "Identifying and mitigating IT-related risks.", "Impact & value"),
  cc(
    "BAR",
    "Benefits Assessment and Realization",
    "Assessing and realizing benefits from IT-enabled change.",
    "Impact & value",
    ["it-cmf-critical-capabilities", "benefits-realization", "investment-appraisal"],
  ),

  // Portfolio & projects
  cc("PM", "Portfolio Management", "Managing the IS/IT application portfolio.", "Portfolio & projects", [
    "it-cmf-critical-capabilities",
    "mcfarlan-matrix",
  ]),
  cc(
    "PPP",
    "Portfolio Planning and Prioritization",
    "Prioritizing projects within the portfolio.",
    "Portfolio & projects",
  ),
  cc(
    "PPM",
    "Programme and Project Management",
    "Delivering programmes and projects on time and budget.",
    "Portfolio & projects",
  ),

  // Investments & budget
  cc(
    "AA",
    "Accounting and Allocation",
    "Allocating IT costs and charging business units.",
    "Investments & budget",
  ),
  cc(
    "FF",
    "Funding and Financing",
    "Securing funding and financing for IT initiatives.",
    "Investments & budget",
  ),
  cc("BGM", "Budget Management", "Planning and controlling the IT budget.", "Investments & budget"),
  cc(
    "BOP",
    "Budget Oversight and Performance Analysis",
    "Oversight and performance analysis of IT spending.",
    "Investments & budget",
  ),
  cc("TCO", "Total Cost of Ownership", "Full lifecycle cost of IT assets.", "Investments & budget", [
    "it-cmf-critical-capabilities",
    "tco",
    "investment-appraisal",
  ]),

  // Services & delivery
  cc(
    "SRP",
    "Service Provisioning",
    "Service catalogue, SLAs, and operational IT services.",
    "Services & delivery",
    ["it-cmf-critical-capabilities", "itil-lifecycle"],
  ),
  cc(
    "SD",
    "Solutions Delivery",
    "Building IT solutions that meet business needs.",
    "Services & delivery",
  ),
  cc(
    "TIM",
    "Technical Infrastructure Management",
    "Stable hardware, software, and network infrastructure.",
    "Services & delivery",
  ),
  cc("SRC", "Sourcing", "Make-or-buy and supplier strategy for IT.", "Services & delivery", [
    "it-cmf-critical-capabilities",
    "sourcing-models",
  ]),
  cc(
    "SAI",
    "Service Analytics and Intelligence",
    "Analytics linking IT service performance to business.",
    "Services & delivery",
  ),

  // Governance & suppliers
  cc(
    "ITG",
    "IT Leadership and Governance",
    "IT leadership, decision rights, and governance alignment.",
    "Governance & suppliers",
    ["it-cmf-critical-capabilities", "it-governance", "cobit-governance-vs-management"],
  ),
  cc(
    "ODP",
    "Organization Design and Planning",
    "Structuring the IS function and professional roles.",
    "Governance & suppliers",
  ),
  cc(
    "REM",
    "Relationship Management",
    "Managing stakeholder and business relationships for IT.",
    "Governance & suppliers",
  ),
  cc(
    "SUM",
    "Supplier Management",
    "Managing supplier performance and relationships.",
    "Governance & suppliers",
    ["it-cmf-critical-capabilities", "outsourcing-risks"],
  ),
  cc(
    "GIT",
    "Green Information Technology",
    "Environmentally sustainable IT practices.",
    "Governance & suppliers",
  ),
];

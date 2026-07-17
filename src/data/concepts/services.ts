import type { Concept } from "../types";

export const servicesConcepts: Concept[] = [
  {
    id: "itil-lifecycle",
    title: "ITIL V3 Service Lifecycle",
    topicId: "services",
    summary: "ITIL V3 manages services through five lifecycle phases.",
    detail: {
      components: [
        "Service Strategy",
        "Service Design",
        "Service Transition",
        "Service Operation",
        "Continual Service Improvement",
      ],
      comparisons: [
        { left: "Service desk", right: "Function", note: "It supports processes but is not itself a process." },
      ],
      examTraps: ["ITIL V3 has five phases, not four.", "CSI is the final lifecycle phase."],
    },
    visual: {
      kind: "cycle",
      items: ["Strategy", "Design", "Transition", "Operation", "CSI"],
    },
    related: ["service-management", "sourcing-models"],
  },
  {
    id: "outsourcing-risks",
    title: "Outsourcing Risks and Retained Capabilities",
    topicId: "services",
    summary:
      "Outsourcing can provide expertise and flexibility but needs retained control and vendor-management capability.",
    detail: {
      components: ["Hidden costs", "Loss of control", "Vendor lock-in", "Brain drain", "Poor vendor management"],
      examples: [
        "Backsourcing may follow vendor underperformance or when IT becomes strategically important.",
      ],
      examTraps: ["Outsourcing does not remove accountability for IT outcomes."],
    },
    related: ["sourcing-models", "it-governance"],
  },
  {
    id: "sourcing-models",
    title: "IS/IT Sourcing Models",
    topicId: "services",
    summary: "Sourcing decisions vary by provider structure, pricing, contract duration and relationship.",
    detail: {
      components: [
        "Grouping: sole supplier, prime contractor, best-of-breed, panel",
        "Pricing: fixed price, unit pricing, cost-plus",
        "Duration: single-term, rollover, evergreen",
        "Relationships: arms-length, value-add, co-sourced, equity",
      ],
      examTraps: [
        "Evergreen means no fixed expiry/automatic continuation; it is not a one-off contract.",
        "Best-of-breed increases specialist choice but creates integration overhead.",
      ],
    },
    related: ["outsourcing-risks", "itil-lifecycle"],
  },
  {
    id: "service-management",
    title: "IS/IT Service Management",
    topicId: "services",
    summary: "Service management designs, delivers and improves services that sustain business value.",
    detail: {
      components: [
        "Front office: customer-facing applications and value-enabling services",
        "Back office: operational and infrastructure services",
        "Project phase: decide, execute and deploy",
        "Service phase: deliver, improve and innovate",
      ],
      examTraps: ["Services are intangible and must be managed for value, not only technical uptime."],
    },
    related: ["itil-lifecycle", "outsourcing-risks"],
  },
];

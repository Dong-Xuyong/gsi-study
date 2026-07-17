import type { Concept } from "../types";

export const strategyConcepts: Concept[] = [
  {
    id: "mintzberg-5ps",
    title: "Mintzberg's Five Ps of Strategy",
    topicId: "strategy",
    summary: "Strategy can be understood as Plan, Pattern, Position, Perspective and Ploy.",
    detail: {
      components: [
        "Plan: intended course",
        "Pattern: consistency in actions",
        "Position: place in the market",
        "Perspective: shared organizational worldview",
        "Ploy: tactical maneuver against rivals",
      ],
      comparisons: [
        { left: "Deliberate strategy", right: "Emergent strategy", note: "Realized strategy may contain both." },
      ],
      examTraps: ["Portfolio, process and policy are not Mintzberg's Ps."],
    },
    visual: {
      kind: "chips",
      items: ["Plan", "Pattern", "Position", "Perspective", "Ploy"],
    },
    related: ["resource-based-view", "porter-five-forces"],
  },
  {
    id: "resource-based-view",
    title: "Resource-Based View (VRIN)",
    topicId: "strategy",
    summary: "Sustained advantage rests on resources that are valuable, rare, inimitable and non-substitutable.",
    detail: {
      components: ["Valuable", "Rare", "Inimitable", "Non-substitutable"],
      examples: [
        "Embedded IS/IT management skills, relationships and routines are harder to copy than hardware.",
      ],
      examTraps: ["Commodity hardware or software rarely satisfies VRIN by itself."],
    },
    visual: {
      kind: "chips",
      items: ["Valuable", "Rare", "Inimitable", "Non-substitutable"],
    },
    related: ["competitive-advantage-is", "it-enabler-vs-is-advantage"],
  },
  {
    id: "porter-five-forces",
    title: "Porter's Five Forces",
    topicId: "strategy",
    summary: "Analyzes industry attractiveness and the pressures that shape profitability.",
    detail: {
      components: [
        "Rivalry among existing competitors",
        "Buyer bargaining power",
        "Supplier bargaining power",
        "Threat of new entrants",
        "Threat of substitutes",
      ],
      examples: ["A platform can lower search costs but may also increase buyer power."],
      examTraps: ["Complementors are important in practice but are not one of Porter's original five forces."],
    },
    visual: {
      kind: "radial",
      center: "Rivalry",
      items: ["Entrants", "Buyers", "Substitutes", "Suppliers"],
    },
    related: ["pestle", "value-chain"],
  },
  {
    id: "pestle",
    title: "PESTLE Analysis",
    topicId: "strategy",
    summary: "Scans macro-environmental forces affecting strategy.",
    detail: {
      components: ["Political", "Economic", "Sociological", "Technological", "Legal", "Environmental"],
      examTraps: ["PESTLE examines the macro environment; Five Forces examines industry competition."],
    },
    visual: {
      kind: "chips",
      items: ["Political", "Economic", "Social", "Technological", "Legal", "Environmental"],
    },
    related: ["porter-five-forces", "digital-disruption"],
  },
  {
    id: "value-chain",
    title: "Value Chain and Value Configurations",
    topicId: "strategy",
    summary: "Maps how activities create value and where IS/IT can improve or reshape them.",
    detail: {
      components: [
        "Internal chain: primary and support activities",
        "Industry chain: inter-firm information flows",
        "Value shop: problem solving",
        "Value network: mediated exchanges between participants",
      ],
      examples: ["Uber is a value network; a consultancy resembles a value shop."],
      examTraps: ["A platform is not best analyzed as a simple linear value chain."],
    },
    visual: {
      kind: "chain",
      support: ["Firm infra", "HR", "Technology", "Procurement"],
      primary: ["Inbound", "Operations", "Outbound", "Marketing", "Service"],
    },
    related: ["competitive-advantage-is", "porter-five-forces"],
  },
  {
    id: "bowman-strategy-clock",
    title: "Bowman's Strategy Clock",
    topicId: "strategy",
    summary: "Relates perceived value to price to identify competitive positions.",
    detail: {
      components: [
        "Low price/low value",
        "Low price",
        "Hybrid",
        "Differentiation",
        "Focused differentiation",
        "Risky strategies",
      ],
      examTraps: ["Hybrid combines a reasonable price with differentiation; it is not simply the lowest price."],
    },
    visual: {
      kind: "clock",
      items: [
        { label: "Low price / low value", short: "Low/Low" },
        { label: "Low price", short: "Low price" },
        { label: "Hybrid", short: "Hybrid" },
        { label: "Differentiation", short: "Diff." },
        { label: "Focused differentiation", short: "Focused" },
        { label: "Risky / failure zone", short: "Risky" },
      ],
    },
    related: ["porter-five-forces", "competitive-advantage-is"],
  },
  {
    id: "competitive-advantage-is",
    title: "IS/IT and Competitive Advantage",
    topicId: "strategy",
    summary:
      "IS/IT creates advantage only when combined with organizational change, capabilities and strategic fit.",
    detail: {
      components: [
        "Align: support business needs",
        "Shape: create opportunities",
        "Impact: build advantage",
        "Redefine: alter competitive positions",
        "Disrupt: change rules",
      ],
      examples: ["Information-enabled personalization can differentiate a service."],
      examTraps: ["Advantage can be emergent and temporary; IT spending does not guarantee it."],
    },
    related: ["resource-based-view", "it-enabler-vs-is-advantage", "digital-disruption"],
  },
];

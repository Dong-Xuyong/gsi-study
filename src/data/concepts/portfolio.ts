import type { Concept } from "../types";

export const portfolioConcepts: Concept[] = [
  {
    id: "mcfarlan-portfolio-lifecycle",
    title: "McFarlan Portfolio Lifecycle",
    topicId: "portfolio",
    summary:
      "Successful applications generally mature from opportunity to strategic use, operational dependence and support.",
    detail: {
      components: [
        "High Potential → Strategic → Key Operational → Support",
        "Enhancement rate tends to decrease over the lifecycle",
        "Quadrant crossings may require rebuilding",
      ],
      examTraps: [
        "This is the expected lifecycle path; it is not Support → Strategic.",
        "The grid classifies business contribution, not technology category.",
      ],
    },
    visual: {
      kind: "flow",
      items: ["High Potential", "Strategic", "Key Operational", "Support"],
    },
    related: ["mcfarlan-matrix", "exploration-exploitation"],
  },
  {
    id: "portfolio-management-strategies",
    title: "Portfolio Management Strategies",
    topicId: "portfolio",
    summary: "Different quadrants can call for different management policies.",
    detail: {
      components: [
        "Centrally planned for strategic coordination",
        "Leading edge for high-potential experimentation",
        "Free market for user-led support solutions",
        "Monopoly for key operational utilities",
        "Scarce resource for strict cost control",
      ],
      examTraps: ["Most organizations combine strategies; no single approach fits all applications."],
    },
    related: ["mcfarlan-matrix", "it-governance"],
  },
];

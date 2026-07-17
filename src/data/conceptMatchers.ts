export type ConceptMatcher = {
  pattern: RegExp;
  conceptId: string;
};

// Labels should be normalized (trimmed and de-emojified) before matching.
export const conceptMatchers: ConceptMatcher[] = [
  { pattern: /mcfarlan/i, conceptId: "mcfarlan-matrix" },
  { pattern: /sullivan|infusion.*diffusion/i, conceptId: "sullivan-matrix" },
  { pattern: /traditional.*reframed|co-evolution|reconfiguration|renewal/i, conceptId: "traditional-vs-reframed-quests" },
  { pattern: /it enabler|information advantage|is advantage/i, conceptId: "it-enabler-vs-is-advantage" },
  { pattern: /it.?cmf.*macro|macro.capabilit/i, conceptId: "it-cmf-macro-capabilities" },
  { pattern: /it.?cmf.*maturity|maturity levels/i, conceptId: "it-cmf-maturity-levels" },
  { pattern: /it.?cmf/i, conceptId: "it-cmf-overview" },
  { pattern: /mintzberg|five ps|5 ps/i, conceptId: "mintzberg-5ps" },
  { pattern: /resource.based|vrin/i, conceptId: "resource-based-view" },
  { pattern: /porter.*five|5 forces/i, conceptId: "porter-five-forces" },
  { pattern: /pestle/i, conceptId: "pestle" },
  { pattern: /value chain/i, conceptId: "value-chain" },
  { pattern: /sisp|strategic information systems planning/i, conceptId: "sisp-process" },
  { pattern: /henderson|venkatraman|strategic alignment model|\bsam\b/i, conceptId: "strategic-alignment-model" },
  { pattern: /luftman|alignment maturity/i, conceptId: "luftman-alignment" },
  { pattern: /schumpeter/i, conceptId: "schumpeter-innovation" },
  { pattern: /exploration.*exploitation|ambidexterity/i, conceptId: "exploration-exploitation" },
  { pattern: /competitive advantage/i, conceptId: "competitive-advantage-is" },
  { pattern: /portfolio lifecycle|high potential.*strategic.*key operational/i, conceptId: "mcfarlan-portfolio-lifecycle" },
  { pattern: /investment appraisal|npv|irr|payback|roi/i, conceptId: "investment-appraisal" },
  { pattern: /benefits.*realization|\bbar\b/i, conceptId: "benefits-realization" },
  { pattern: /total cost of ownership|\btco\b/i, conceptId: "tco" },
  { pattern: /praxis/i, conceptId: "praxis-overview" },
  { pattern: /preponderant realities|modelo das realidades|\bmrp\b/i, conceptId: "modelo-realidades-preponderantes" },
  { pattern: /bowman.*clock|strategy clock/i, conceptId: "bowman-strategy-clock" },
  { pattern: /itil|service lifecycle/i, conceptId: "itil-lifecycle" },
  { pattern: /outsourc.*risk|backsourc/i, conceptId: "outsourcing-risks" },
  { pattern: /sourcing models|best.of.breed|prime contractor|evergreen/i, conceptId: "sourcing-models" },
  { pattern: /governance.*management|edm.*apo/i, conceptId: "cobit-governance-vs-management" },
  { pattern: /\bedm\b|evaluate.*direct.*monitor/i, conceptId: "cobit-edm" },
  { pattern: /\bapo\b|\bbai\b|\bdss\b|\bmea\b/i, conceptId: "cobit-management-domains" },
  { pattern: /it governance|decision rights|weill.*ross/i, conceptId: "it-governance" },
  { pattern: /digital native|digital immigrant|martec/i, conceptId: "digital-natives-vs-immigrants" },
  { pattern: /digital disruption|digital transformation/i, conceptId: "digital-disruption" },
  { pattern: /quatro tempos|four times|automation.*information.*transformation/i, conceptId: "quatro-tempos-gsi" },
];

export const matchConceptId = (label: string): string | undefined =>
  conceptMatchers.find(({ pattern }) => pattern.test(label))?.conceptId;

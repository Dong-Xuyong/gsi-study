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
  { pattern: /critical capacit/i, conceptId: "it-cmf-critical-capabilities" },
  { pattern: /it.?cmf/i, conceptId: "it-cmf-overview" },
  // IT-CMF Critical Capability acronyms (keep before looser patterns)
  { pattern: /\bAA\b|accounting and allocation/i, conceptId: "cc-aa" },
  { pattern: /\bBAR\b|benefits assessment/i, conceptId: "cc-bar" },
  { pattern: /\bBGM\b|budget management/i, conceptId: "cc-bgm" },
  { pattern: /\bBOP\b|budget oversight/i, conceptId: "cc-bop" },
  { pattern: /\bBP\b|business planning/i, conceptId: "cc-bp" },
  { pattern: /\bBPM\b|business process management/i, conceptId: "cc-bpm" },
  { pattern: /\bCAM\b|capability assessment/i, conceptId: "cc-cam" },
  { pattern: /\bCFP\b|capacity forecasting/i, conceptId: "cc-cfp" },
  { pattern: /\bDSM\b|demand and supply/i, conceptId: "cc-dsm" },
  { pattern: /\bEAM\b|enterprise architecture/i, conceptId: "cc-eam" },
  { pattern: /\bEIM\b|enterprise information management/i, conceptId: "cc-eim" },
  { pattern: /\bFF\b|funding and financing/i, conceptId: "cc-ff" },
  { pattern: /\bGIT\b|green information technology/i, conceptId: "cc-git" },
  { pattern: /\bIM\b|innovation management/i, conceptId: "cc-im" },
  { pattern: /\bISM\b|information security management/i, conceptId: "cc-ism" },
  { pattern: /\bITG\b|it leadership and governance/i, conceptId: "cc-itg" },
  { pattern: /\bKAM\b|knowledge asset management/i, conceptId: "cc-kam" },
  { pattern: /\bODP\b|organization design and planning/i, conceptId: "cc-odp" },
  { pattern: /\bPAM\b|people asset management/i, conceptId: "cc-pam" },
  { pattern: /\bPDP\b|personal data protection/i, conceptId: "cc-pdp" },
  { pattern: /\bPPP\b|portfolio planning and prioritization/i, conceptId: "cc-ppp" },
  { pattern: /\bPPM\b|programme and project management/i, conceptId: "cc-ppm" },
  { pattern: /\bPM\b|portfolio management/i, conceptId: "cc-pm" },
  { pattern: /\bRDE\b|research, development and engineering/i, conceptId: "cc-rde" },
  { pattern: /\bREM\b|relationship management/i, conceptId: "cc-rem" },
  { pattern: /\bRM\b|risk management/i, conceptId: "cc-rm" },
  { pattern: /\bSD\b|solutions delivery/i, conceptId: "cc-sd" },
  { pattern: /\bSP\b|strategic planning/i, conceptId: "cc-sp" },
  { pattern: /\bSRC\b|\bsourcing\b/i, conceptId: "cc-src" },
  { pattern: /\bSAI\b|service analytics/i, conceptId: "cc-sai" },
  { pattern: /\bSRP\b|service provisioning/i, conceptId: "cc-srp" },
  { pattern: /\bSUM\b|supplier management/i, conceptId: "cc-sum" },
  { pattern: /\bTIM\b|technical infrastructure/i, conceptId: "cc-tim" },
  { pattern: /\bTCO\b|total cost of ownership/i, conceptId: "cc-tco" },
  { pattern: /\bUED\b|user experience design/i, conceptId: "cc-ued" },
  { pattern: /\bUTM\b|user training management/i, conceptId: "cc-utm" },
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
  { pattern: /benefits.*realization/i, conceptId: "cc-bar" },
  { pattern: /total cost of ownership/i, conceptId: "cc-tco" },
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

function normalizeLabel(label: string): string {
  return label
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘‛′`]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export const matchConceptId = (label: string): string | undefined => {
  const normalized = normalizeLabel(label);
  return conceptMatchers.find(({ pattern }) => pattern.test(normalized) || pattern.test(label))
    ?.conceptId;
};

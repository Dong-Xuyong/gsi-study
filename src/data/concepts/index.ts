import type { Concept } from "../types";
import { alignmentConcepts } from "./alignment";
import { impactConcepts } from "./impact";
import { innovationConcepts } from "./innovation";
import { introductionConcepts } from "./introduction";
import { investmentsConcepts } from "./investments";
import { itcmfConcepts } from "./itcmf";
import { nativesConcepts } from "./natives";
import { portfolioConcepts } from "./portfolio";
import { praxisConcepts } from "./praxis";
import { processConcepts } from "./process";
import { servicesConcepts } from "./services";
import { strategyConcepts } from "./strategy";
import { governanceConcepts } from "./governance";

export const concepts: Concept[] = [
  ...introductionConcepts, ...strategyConcepts, ...processConcepts,
  ...alignmentConcepts, ...innovationConcepts, ...impactConcepts,
  ...portfolioConcepts, ...investmentsConcepts, ...praxisConcepts,
  ...servicesConcepts, ...governanceConcepts, ...nativesConcepts, ...itcmfConcepts,
];

export const conceptsById: Record<string, Concept> = Object.fromEntries(
  concepts.map((concept) => [concept.id, concept]),
);

export {
  alignmentConcepts, impactConcepts, innovationConcepts, introductionConcepts,
  investmentsConcepts, itcmfConcepts, nativesConcepts, portfolioConcepts,
  praxisConcepts, processConcepts, servicesConcepts, strategyConcepts, governanceConcepts,
};
export type { Concept, TopicId } from "../types";

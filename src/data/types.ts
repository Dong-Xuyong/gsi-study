export type TopicId =
  | "introduction"
  | "strategy"
  | "process"
  | "alignment"
  | "innovation"
  | "impact"
  | "portfolio"
  | "investments"
  | "praxis"
  | "services"
  | "governance"
  | "natives";

export type MindNode = {
  id: string;
  label: string;
  children?: MindNode[];
  conceptId?: string;
};

export type Concept = {
  id: string;
  title: string;
  topicId: TopicId;
  summary: string;
  detail: {
    definition?: string;
    components?: string[];
    comparisons?: { left: string; right: string; note?: string }[];
    examples?: string[];
    examTraps?: string[];
  };
  related: string[];
};

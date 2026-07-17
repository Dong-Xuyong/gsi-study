export type TopicId =
  | "introduction"
  | "itcmf"
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

/** Top-left, top-right, bottom-left, bottom-right */
export type MatrixCell = {
  label: string;
  hint?: string;
};

export type ConceptVisual =
  | {
      kind: "matrix2x2";
      xLow: string;
      xHigh: string;
      yLow: string;
      yHigh: string;
      cells: [MatrixCell, MatrixCell, MatrixCell, MatrixCell];
    }
  | {
      kind: "radial";
      center: string;
      items: string[];
    }
  | {
      kind: "clock";
      items: { label: string; short?: string }[];
    }
  | {
      kind: "chain";
      primary: string[];
      support?: string[];
    }
  | {
      kind: "chips";
      items: string[];
    }
  | {
      kind: "layers";
      layers: { title: string; subtitle?: string; items?: string[]; tone?: "gov" | "mgmt" }[];
    }
  | {
      kind: "cycle";
      items: string[];
    }
  | {
      kind: "flow";
      items: string[];
    }
  | {
      kind: "compareColumns";
      leftTitle: string;
      rightTitle: string;
      rows: { left: string; right: string }[];
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
  /** Optional framework diagram shown above the text sections */
  visual?: ConceptVisual;
  related: string[];
};

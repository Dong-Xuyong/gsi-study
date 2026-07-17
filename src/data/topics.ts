import type { TopicId } from "./types";

export const topics: {
  id: TopicId;
  code: string;
  title: string;
  questions: number;
  weight: "high" | "medium" | "low";
  treeFile: TopicId;
}[] = [
  { id: "introduction", code: "T01", title: "Introduction", questions: 3, weight: "high", treeFile: "introduction" },
  { id: "strategy", code: "T02", title: "IS/IT Strategy", questions: 2, weight: "medium", treeFile: "strategy" },
  { id: "process", code: "T03", title: "Strategy Process", questions: 1, weight: "low", treeFile: "process" },
  { id: "alignment", code: "T04", title: "Alignment", questions: 1, weight: "low", treeFile: "alignment" },
  { id: "innovation", code: "T05", title: "Innovation", questions: 1, weight: "low", treeFile: "innovation" },
  { id: "impact", code: "T06", title: "Impact", questions: 1, weight: "low", treeFile: "impact" },
  { id: "portfolio", code: "T07", title: "Portfolio", questions: 1, weight: "low", treeFile: "portfolio" },
  { id: "investments", code: "T08", title: "Investments", questions: 1, weight: "low", treeFile: "investments" },
  { id: "praxis", code: "T09", title: "PRAXIS", questions: 1, weight: "low", treeFile: "praxis" },
  { id: "services", code: "T10", title: "IS/IT Services", questions: 3, weight: "high", treeFile: "services" },
  { id: "governance", code: "T11", title: "Governance", questions: 3, weight: "high", treeFile: "governance" },
  { id: "natives", code: "T12", title: "Digital Natives", questions: 1, weight: "low", treeFile: "natives" },
];

/** IT-CMF adds three Introduction-topic questions to the study set. */
export const IT_CMF_QUESTIONS = 3;

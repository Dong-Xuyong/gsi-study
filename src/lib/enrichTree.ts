import { matchConceptId } from "../data/conceptMatchers";
import type { MindNode } from "../data/types";

export function enrichTree(node: MindNode): MindNode {
  const conceptId = node.conceptId ?? matchConceptId(node.label);
  const children = node.children?.map(enrichTree);
  return {
    ...node,
    ...(conceptId ? { conceptId } : {}),
    ...(children ? { children } : {}),
  };
}

export function flattenTree(node: MindNode, depth = 0): Array<MindNode & { depth: number }> {
  const self = [{ ...node, depth }];
  const kids = node.children?.flatMap((child) => flattenTree(child, depth + 1)) ?? [];
  return [...self, ...kids];
}

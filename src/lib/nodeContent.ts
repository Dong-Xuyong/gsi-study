import { conceptsById } from "../data/concepts";
import type { Concept, MindNode, TopicId } from "../data/types";

function collectBranchPoints(node: MindNode, limit = 12): string[] {
  const points: string[] = [];
  const walk = (n: MindNode, depth: number) => {
    if (points.length >= limit) return;
    if (depth > 0) points.push(n.label);
    for (const child of n.children ?? []) walk(child, depth + 1);
  };
  walk(node, 0);
  return points;
}

/** Prefer curated concept; otherwise build a useful study card from the mind-map branch. */
export function resolveNodeContent(
  node: MindNode,
  topicId: TopicId,
): { concept: Concept; curated: boolean } {
  if (node.conceptId && conceptsById[node.conceptId]) {
    return { concept: conceptsById[node.conceptId], curated: true };
  }

  const branch = collectBranchPoints(node);
  const concept: Concept = {
    id: node.id,
    title: node.label,
    topicId,
    summary:
      branch.length > 0
        ? `Branch from the ${topicId} mind map with ${branch.length} linked points below.`
        : `Study point from the ${topicId} mind map.`,
    detail: {
      definition: `Part of the ${topicId.replace(/-/g, " ")} topic map. Expand siblings on the canvas or review the points in this branch.`,
      components: branch.length ? branch : undefined,
      examTraps:
        branch.length === 0
          ? ["Leaf nodes are often definitions or examples — connect them back to the parent framework."]
          : undefined,
    },
    related: [],
  };

  return { concept, curated: false };
}

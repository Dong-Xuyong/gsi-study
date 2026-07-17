import { Graph, layout } from "@dagrejs/dagre";
import type { Edge, Node } from "@xyflow/react";
import type { MindNode } from "../data/types";

const NODE_WIDTH = 196;
const NODE_HEIGHT = 56;

export type MindMapNodeData = {
  label: string;
  conceptId?: string;
  hasChildren: boolean;
  expanded: boolean;
  depth: number;
};

function collectVisible(
  node: MindNode,
  expandedIds: Set<string>,
  depth = 0,
): Array<{ node: MindNode; depth: number }> {
  const rows = [{ node, depth }];
  if (!node.children?.length) return rows;
  if (!expandedIds.has(node.id)) return rows;
  for (const child of node.children) {
    rows.push(...collectVisible(child, expandedIds, depth + 1));
  }
  return rows;
}

export function buildFlowElements(
  root: MindNode,
  expandedIds: Set<string>,
  selectedId?: string | null,
): { nodes: Node<MindMapNodeData>[]; edges: Edge[] } {
  const visible = collectVisible(root, expandedIds);
  const g = new Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR", nodesep: 28, ranksep: 64, marginx: 24, marginy: 24 });

  for (const { node } of visible) {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  }

  for (const { node } of visible) {
    if (!node.children?.length || !expandedIds.has(node.id)) continue;
    for (const child of node.children) {
      if (g.hasNode(child.id)) g.setEdge(node.id, child.id);
    }
  }

  layout(g);

  const nodes: Node<MindMapNodeData>[] = visible.map(({ node, depth }) => {
    const pos = g.node(node.id);
    return {
      id: node.id,
      type: "mind",
      position: {
        x: (pos?.x ?? 0) - NODE_WIDTH / 2,
        y: (pos?.y ?? 0) - NODE_HEIGHT / 2,
      },
      data: {
        label: node.label,
        conceptId: node.conceptId,
        hasChildren: Boolean(node.children?.length),
        expanded: expandedIds.has(node.id),
        depth,
      },
      selected: selectedId === node.id,
      style: { width: NODE_WIDTH, height: NODE_HEIGHT },
    };
  });

  const edges: Edge[] = [];
  for (const { node } of visible) {
    if (!node.children?.length || !expandedIds.has(node.id)) continue;
    for (const child of node.children) {
      if (!g.hasNode(child.id)) continue;
      edges.push({
        id: `${node.id}->${child.id}`,
        source: node.id,
        target: child.id,
        type: "smoothstep",
        style: { stroke: "var(--line)", strokeWidth: 1.5 },
      });
    }
  }

  return { nodes, edges };
}

/** Expand root and first two levels for an initial readable phone view. */
export function defaultExpandedIds(root: MindNode, maxDepth = 1): Set<string> {
  const ids = new Set<string>();

  function walk(node: MindNode, depth: number) {
    if (depth > maxDepth) return;
    if (node.children?.length) ids.add(node.id);
    for (const child of node.children ?? []) walk(child, depth + 1);
  }

  walk(root, 0);
  return ids;
}

import { Graph, layout } from "@dagrejs/dagre";
import type { Edge, Node } from "@xyflow/react";
import type { MindNode } from "../data/types";

const NODE_WIDTH = 188;
const NODE_HEIGHT = 52;

export type MindMapNodeData = {
  label: string;
  conceptId?: string;
  hasChildren: boolean;
  expanded: boolean;
  depth: number;
  nodeId: string;
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

export function findPathIds(root: MindNode, targetId: string): string[] | null {
  if (root.id === targetId) return [root.id];
  for (const child of root.children ?? []) {
    const sub = findPathIds(child, targetId);
    if (sub) return [root.id, ...sub];
  }
  return null;
}

/** Keep only the path to `nodeId` expanded so one branch stays readable on a phone. */
export function pathExpandedIds(root: MindNode, nodeId: string): Set<string> {
  const path = findPathIds(root, nodeId);
  if (!path?.length) return defaultExpandedIds(root);
  return new Set(path);
}

export function buildFlowElements(
  root: MindNode,
  expandedIds: Set<string>,
  selectedId?: string | null,
): { nodes: Node<MindMapNodeData>[]; edges: Edge[] } {
  const visible = collectVisible(root, expandedIds);
  const g = new Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR", nodesep: 22, ranksep: 56, marginx: 20, marginy: 20 });

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
        nodeId: node.id,
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

/** Expand only the root so phones start with topic + first-level branches. */
export function defaultExpandedIds(root: MindNode): Set<string> {
  const ids = new Set<string>();
  if (root.children?.length) ids.add(root.id);
  return ids;
}

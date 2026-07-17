import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useMemo, useCallback, useState } from "react";
import { enrichTree } from "../lib/enrichTree";
import { buildFlowElements, defaultExpandedIds } from "../lib/layoutMindMap";
import type { MindNode, TopicId } from "../data/types";
import { MindNode as MindNodeView } from "./MindNode";

const nodeTypes: NodeTypes = { mind: MindNodeView };

type InnerProps = {
  topicId: TopicId;
  root: MindNode;
  selectedNodeId: string | null;
  onSelectNode: (node: MindNode) => void;
};

function MindMapInner({ topicId, root, selectedNodeId, onSelectNode }: InnerProps) {
  const enriched = useMemo(() => enrichTree(root), [root]);
  const [expandedIds, setExpandedIds] = useState(() => defaultExpandedIds(enriched, 1));
  const { fitView } = useReactFlow();

  useEffect(() => {
    setExpandedIds(defaultExpandedIds(enriched, 1));
  }, [topicId, enriched]);

  const { nodes, edges } = useMemo(
    () => buildFlowElements(enriched, expandedIds, selectedNodeId),
    [enriched, expandedIds, selectedNodeId],
  );

  useEffect(() => {
    const t = window.setTimeout(() => fitView({ padding: 0.2, duration: 280 }), 40);
    return () => window.clearTimeout(t);
  }, [topicId, expandedIds, fitView]);

  const findNode = useCallback(
    (id: string): MindNode | undefined => {
      const stack = [enriched];
      while (stack.length) {
        const n = stack.pop()!;
        if (n.id === id) return n;
        if (n.children) stack.push(...n.children);
      }
      return undefined;
    },
    [enriched],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      minZoom={0.25}
      maxZoom={1.6}
      panOnScroll
      zoomOnPinch
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable
      proOptions={{ hideAttribution: true }}
      onNodeClick={(_, node) => {
        const mind = findNode(node.id);
        if (!mind) return;
        if (mind.children?.length) {
          setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(mind.id)) next.delete(mind.id);
            else next.add(mind.id);
            return next;
          });
        }
        onSelectNode(mind);
      }}
    >
      <Background gap={22} size={1} color="var(--grid)" />
      <Controls showInteractive={false} />
      <MiniMap
        pannable
        zoomable
        nodeColor={() => "var(--accent-soft)"}
        maskColor="color-mix(in srgb, var(--ink) 35%, transparent)"
      />
    </ReactFlow>
  );
}

type Props = InnerProps;

export function MindMapCanvas(props: Props) {
  return (
    <div className="map-shell">
      <ReactFlowProvider>
        <MindMapInner {...props} />
      </ReactFlowProvider>
    </div>
  );
}

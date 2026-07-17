import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  type Edge,
  type Node,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useMemo, useCallback, useState } from "react";
import { enrichTree } from "../lib/enrichTree";
import { buildFlowElements, defaultExpandedIds, type MindMapNodeData } from "../lib/layoutMindMap";
import type { MindNode, TopicId } from "../data/types";
import { MindNode as MindNodeView } from "./MindNode";
import { NodeActivateContext } from "./NodeActivateContext";

const nodeTypes: NodeTypes = { mind: MindNodeView };

type FlowNode = Node<MindMapNodeData>;

type InnerProps = {
  topicId: TopicId;
  root: MindNode;
  selectedNodeId: string | null;
  onSelectNode: (node: MindNode) => void;
};

function MindMapInner({ topicId, root, selectedNodeId, onSelectNode }: InnerProps) {
  const enriched = useMemo(() => enrichTree(root), [root]);
  const [expandedIds, setExpandedIds] = useState(() => defaultExpandedIds(enriched, 1));
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { fitView } = useReactFlow();

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

  const activateNode = useCallback(
    (id: string) => {
      const mind = findNode(id);
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
    },
    [findNode, onSelectNode],
  );

  useEffect(() => {
    setExpandedIds(defaultExpandedIds(enriched, 1));
  }, [topicId, enriched]);

  useEffect(() => {
    const built = buildFlowElements(enriched, expandedIds, selectedNodeId);
    setNodes(built.nodes);
    setEdges(built.edges);
  }, [enriched, expandedIds, selectedNodeId, setNodes, setEdges]);

  useEffect(() => {
    const t = window.setTimeout(() => fitView({ padding: 0.18, duration: 280 }), 60);
    return () => window.clearTimeout(t);
  }, [topicId, expandedIds, fitView]);

  return (
    <NodeActivateContext.Provider value={activateNode}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.8}
        panOnScroll
        zoomOnPinch
        panOnDrag
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        proOptions={{ hideAttribution: true }}
        onNodeClick={(_, node) => activateNode(node.id)}
      >
        <Background gap={22} size={1} color="var(--grid)" />
        <Controls showInteractive={false} />
        <MiniMap pannable zoomable nodeColor={() => "#c6e3df"} maskColor="rgba(20, 32, 41, 0.35)" />
      </ReactFlow>
    </NodeActivateContext.Provider>
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

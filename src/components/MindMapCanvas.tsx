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
import {
  buildFlowElements,
  defaultExpandedIds,
  pathExpandedIds,
  type MindMapNodeData,
} from "../lib/layoutMindMap";
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

function useIsNarrow(maxWidth = 899) {
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && window.matchMedia(`(max-width: ${maxWidth}px)`).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const onChange = () => setNarrow(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [maxWidth]);

  return narrow;
}

function MindMapInner({ topicId, root, selectedNodeId, onSelectNode }: InnerProps) {
  const enriched = useMemo(() => enrichTree(root), [root]);
  const [expandedIds, setExpandedIds] = useState(() => defaultExpandedIds(enriched));
  const [focusIds, setFocusIds] = useState<string[]>(() =>
    [enriched.id, ...(enriched.children?.map((c) => c.id) ?? [])],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { fitView } = useReactFlow();
  const narrow = useIsNarrow();

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
          if (prev.has(mind.id)) {
            // Collapse this branch; keep ancestors so siblings stay visible.
            const next = pathExpandedIds(enriched, mind.id);
            next.delete(mind.id);
            if (next.size === 0 && enriched.children?.length) next.add(enriched.id);
            const parentId = [...next].at(-1) ?? enriched.id;
            const parent = findNode(parentId) ?? enriched;
            setFocusIds([parent.id, ...(parent.children?.map((c) => c.id) ?? [])]);
            return next;
          }

          // Expand only the path to this node (accordion) so other branches collapse.
          setFocusIds([mind.id, ...(mind.children?.map((c) => c.id) ?? [])]);
          return pathExpandedIds(enriched, mind.id);
        });
      }

      onSelectNode(mind);
    },
    [enriched, findNode, onSelectNode],
  );

  useEffect(() => {
    setExpandedIds(defaultExpandedIds(enriched));
    setFocusIds([enriched.id, ...(enriched.children?.map((c) => c.id) ?? [])]);
  }, [topicId, enriched]);

  useEffect(() => {
    const built = buildFlowElements(enriched, expandedIds, selectedNodeId);
    setNodes(built.nodes);
    setEdges(built.edges);
  }, [enriched, expandedIds, selectedNodeId, setNodes, setEdges]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      fitView({
        nodes: focusIds.map((id) => ({ id })),
        padding: narrow ? 0.24 : 0.18,
        duration: 280,
        // Keep labels readable on phones instead of shrinking to fit every sibling.
        maxZoom: narrow ? 0.95 : 1.15,
        minZoom: narrow ? 0.55 : 0.35,
      });
    }, 80);
    return () => window.clearTimeout(t);
  }, [topicId, expandedIds, focusIds, fitView, narrow]);

  return (
    <NodeActivateContext.Provider value={activateNode}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={narrow ? 0.5 : 0.25}
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
        {!narrow ? (
          <MiniMap pannable zoomable nodeColor={() => "#c6e3df"} maskColor="rgba(20, 32, 41, 0.35)" />
        ) : null}
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

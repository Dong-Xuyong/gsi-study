import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { MindMapNodeData } from "../lib/layoutMindMap";

type MindFlowNode = Node<MindMapNodeData, "mind">;

export function MindNode({ data, selected }: NodeProps<MindFlowNode>) {
  const enriched = Boolean(data.conceptId);

  return (
    <div
      className={[
        "mind-node",
        selected ? "mind-node--selected" : "",
        enriched ? "mind-node--enriched" : "",
        `mind-node--d${Math.min(data.depth, 3)}`,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Handle type="target" position={Position.Left} className="mind-handle" />
      <div className="mind-node__label">{data.label}</div>
      {data.hasChildren ? (
        <span className="mind-node__badge" aria-hidden>
          {data.expanded ? "−" : "+"}
        </span>
      ) : null}
      {enriched ? <span className="mind-node__dot" title="Has study notes" /> : null}
      <Handle type="source" position={Position.Right} className="mind-handle" />
    </div>
  );
}

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { MindMapNodeData } from "../lib/layoutMindMap";
import { useNodeActivate } from "./NodeActivateContext";

type MindFlowNode = Node<MindMapNodeData, "mind">;

export function MindNode({ data, selected }: NodeProps<MindFlowNode>) {
  const activate = useNodeActivate();
  const enriched = Boolean(data.conceptId);

  return (
    <button
      type="button"
      className={[
        "mind-node",
        selected ? "mind-node--selected" : "",
        enriched ? "mind-node--enriched" : "",
        `mind-node--d${Math.min(data.depth, 3)}`,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        activate(data.nodeId);
      }}
    >
      <Handle type="target" position={Position.Left} className="mind-handle" isConnectable={false} />
      <span className="mind-node__label">{data.label}</span>
      {data.hasChildren ? (
        <span className="mind-node__badge" aria-hidden>
          {data.expanded ? "−" : "+"}
        </span>
      ) : null}
      {enriched ? <span className="mind-node__dot" title="Has study notes" /> : null}
      <Handle type="source" position={Position.Right} className="mind-handle" isConnectable={false} />
    </button>
  );
}

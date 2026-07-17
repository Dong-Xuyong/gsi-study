import { createContext, useContext } from "react";

export const NodeActivateContext = createContext<(id: string) => void>(() => {});

export function useNodeActivate() {
  return useContext(NodeActivateContext);
}

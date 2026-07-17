import alignment from "./alignment.json";
import governance from "./governance.json";
import impact from "./impact.json";
import innovation from "./innovation.json";
import introduction from "./introduction.json";
import investments from "./investments.json";
import natives from "./natives.json";
import portfolio from "./portfolio.json";
import praxis from "./praxis.json";
import process from "./process.json";
import services from "./services.json";
import strategy from "./strategy.json";
import type { MindNode, TopicId } from "../types";

export const trees: Record<TopicId, MindNode> = {
  introduction,
  strategy,
  process,
  alignment,
  innovation,
  impact,
  portfolio,
  investments,
  praxis,
  services,
  governance,
  natives,
};

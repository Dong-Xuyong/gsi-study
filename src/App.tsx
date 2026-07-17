import { useMemo, useState } from "react";
import { ConceptSheet } from "./components/ConceptSheet";
import { MindMapCanvas } from "./components/MindMapCanvas";
import { SearchBar } from "./components/SearchBar";
import { TopicHub } from "./components/TopicHub";
import { conceptsById } from "./data/concepts";
import { topics } from "./data/topics";
import { trees } from "./data/trees";
import type { Concept, MindNode, TopicId } from "./data/types";
import "./App.css";

type View = "hub" | "map";

export default function App() {
  const [view, setView] = useState<View>("hub");
  const [topicId, setTopicId] = useState<TopicId | null>(null);
  const [selectedNode, setSelectedNode] = useState<MindNode | null>(null);
  const [sheetConceptId, setSheetConceptId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const topic = useMemo(
    () => (topicId ? topics.find((t) => t.id === topicId) : undefined),
    [topicId],
  );

  const openTopic = (id: TopicId) => {
    setTopicId(id);
    setView("map");
    setSelectedNode(null);
    setSheetConceptId(null);
    setSheetOpen(false);
  };

  const openConcept = (concept: Concept) => {
    setTopicId(concept.topicId);
    setView("map");
    setSheetConceptId(concept.id);
    setSelectedNode(null);
    setSheetOpen(true);
  };

  const openRelated = (id: string) => {
    const related = conceptsById[id];
    if (!related) return;
    setTopicId(related.topicId);
    setSheetConceptId(related.id);
    setSheetOpen(true);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-left">
          {view === "map" ? (
            <button
              type="button"
              className="text-btn"
              onClick={() => {
                setView("hub");
                setSheetOpen(false);
              }}
            >
              ← Topics
            </button>
          ) : (
            <span className="topbar-brand">GSI Study</span>
          )}
          {view === "map" && topic ? (
            <div className="topbar-topic">
              <span>{topic.code}</span>
              <strong>{topic.title}</strong>
            </div>
          ) : null}
        </div>
        <SearchBar onSelect={openConcept} />
      </header>

      <main className="main">
        {view === "hub" || !topicId ? (
          <TopicHub onOpenTopic={openTopic} />
        ) : (
          <MindMapCanvas
            topicId={topicId}
            root={trees[topicId]}
            selectedNodeId={selectedNode?.id ?? null}
            onSelectNode={(node) => {
              setSelectedNode(node);
              setSheetConceptId(node.conceptId ?? null);
              setSheetOpen(true);
            }}
          />
        )}
      </main>

      <ConceptSheet
        open={sheetOpen}
        conceptId={sheetConceptId}
        fallbackLabel={selectedNode?.label}
        onClose={() => setSheetOpen(false)}
        onOpenRelated={openRelated}
      />
    </div>
  );
}

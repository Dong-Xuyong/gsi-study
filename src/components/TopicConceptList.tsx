import { concepts } from "../data/concepts";
import type { Concept, TopicId } from "../data/types";

type Props = {
  topicId: TopicId;
  onOpen: (concept: Concept) => void;
};

export function TopicConceptList({ topicId, onOpen }: Props) {
  const items = concepts.filter((c) => c.topicId === topicId);

  if (items.length === 0) {
    return (
      <div className="concept-rail">
        <p className="concept-rail__empty">Tap any map node to open its branch notes.</p>
      </div>
    );
  }

  return (
    <div className="concept-rail">
      <p className="concept-rail__title">Key concepts · {items.length}</p>
      <ul className="concept-rail__list">
        {items.map((concept) => (
          <li key={concept.id}>
            <button type="button" className="concept-rail__item" onClick={() => onOpen(concept)}>
              <strong>{concept.title}</strong>
              <span>{concept.summary}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

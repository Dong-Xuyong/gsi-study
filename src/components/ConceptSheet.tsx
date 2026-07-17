import type { ReactNode } from "react";
import { conceptsById } from "../data/concepts";
import type { Concept } from "../data/types";

type Props = {
  conceptId: string | null;
  fallbackLabel?: string;
  open: boolean;
  onClose: () => void;
  onOpenRelated: (id: string) => void;
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="sheet-section">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function ConceptBody({ concept, onOpenRelated }: { concept: Concept; onOpenRelated: (id: string) => void }) {
  const { detail } = concept;
  return (
    <>
      <p className="sheet-summary">{concept.summary}</p>
      {detail.definition ? (
        <Section title="Definition">
          <p>{detail.definition}</p>
        </Section>
      ) : null}
      {detail.components?.length ? (
        <Section title="Components">
          <ul>
            {detail.components.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      ) : null}
      {detail.comparisons?.length ? (
        <Section title="Compare">
          <div className="compare-list">
            {detail.comparisons.map((row) => (
              <div className="compare-row" key={`${row.left}-${row.right}`}>
                <div>
                  <strong>{row.left}</strong>
                  <span aria-hidden> → </span>
                  <strong>{row.right}</strong>
                </div>
                {row.note ? <p>{row.note}</p> : null}
              </div>
            ))}
          </div>
        </Section>
      ) : null}
      {detail.examples?.length ? (
        <Section title="Examples">
          <ul>
            {detail.examples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      ) : null}
      {detail.examTraps?.length ? (
        <Section title="Exam traps">
          <ul className="exam-traps">
            {detail.examTraps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      ) : null}
      {concept.related.length ? (
        <Section title="Related">
          <div className="related-chips">
            {concept.related.map((id) => {
              const related = conceptsById[id];
              if (!related) return null;
              return (
                <button key={id} type="button" className="chip" onClick={() => onOpenRelated(id)}>
                  {related.title}
                </button>
              );
            })}
          </div>
        </Section>
      ) : null}
    </>
  );
}

export function ConceptSheet({ conceptId, fallbackLabel, open, onClose, onOpenRelated }: Props) {
  const concept = conceptId ? conceptsById[conceptId] : undefined;

  return (
    <div className={`sheet ${open ? "sheet--open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!open}>
      <button type="button" className="sheet-backdrop" aria-label="Close concept panel" onClick={onClose} />
      <aside className="sheet-panel">
        <header className="sheet-header">
          <div>
            <p className="sheet-kicker">{concept ? "Concept" : "Node"}</p>
            <h2>{concept?.title ?? fallbackLabel ?? "Concept"}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <div className="sheet-body">
          {concept ? (
            <ConceptBody concept={concept} onOpenRelated={onOpenRelated} />
          ) : (
            <p className="sheet-summary">
              Outline node from the topic mind map. Expand branches on the map, or open a highlighted
              node for a full study card.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

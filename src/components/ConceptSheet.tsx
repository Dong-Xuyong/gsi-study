import type { ReactNode } from "react";
import { conceptsById } from "../data/concepts";
import type { Concept } from "../data/types";

type Props = {
  concept: Concept | null;
  curated: boolean;
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

function ConceptBody({
  concept,
  curated,
  onOpenRelated,
}: {
  concept: Concept;
  curated: boolean;
  onOpenRelated: (id: string) => void;
}) {
  const { detail } = concept;
  return (
    <>
      <p className={`sheet-badge ${curated ? "sheet-badge--curated" : ""}`}>
        {curated ? "Exam concept card" : "Mind-map branch"}
      </p>
      <p className="sheet-summary">{concept.summary}</p>
      {detail.definition ? (
        <Section title="Definition">
          <p>{detail.definition}</p>
        </Section>
      ) : null}
      {detail.components?.length ? (
        <Section title={curated ? "Components" : "In this branch"}>
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

export function ConceptSheet({ concept, curated, open, onClose, onOpenRelated }: Props) {
  if (!open) return null;

  return (
    <div className="sheet sheet--open" role="dialog" aria-modal="true">
      <button type="button" className="sheet-backdrop" aria-label="Close concept panel" onClick={onClose} />
      <aside className="sheet-panel">
        <header className="sheet-header">
          <div>
            <p className="sheet-kicker">{curated ? "Concept" : "Map node"}</p>
            <h2>{concept?.title ?? "Concept"}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <div className="sheet-body">
          {concept ? (
            <ConceptBody concept={concept} curated={curated} onOpenRelated={onOpenRelated} />
          ) : (
            <p className="sheet-summary">Select a node on the mind map to study it.</p>
          )}
        </div>
      </aside>
    </div>
  );
}

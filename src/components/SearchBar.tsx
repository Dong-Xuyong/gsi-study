import { useMemo, useState } from "react";
import { concepts } from "../data/concepts";
import type { Concept, TopicId } from "../data/types";
import { topics } from "../data/topics";

type Props = {
  onSelect: (concept: Concept) => void;
};

export function SearchBar({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return concepts
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.id.includes(q),
      )
      .slice(0, 8);
  }, [query]);

  const topicTitle = (id: TopicId) => topics.find((t) => t.id === id)?.title ?? id;

  return (
    <div className="search">
      <label className="search-label" htmlFor="concept-search">
        Search concepts
      </label>
      <input
        id="concept-search"
        className="search-input"
        type="search"
        placeholder="McFarlan, COBIT, ITIL…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 150);
        }}
        autoComplete="off"
      />
      {open && results.length > 0 ? (
        <ul className="search-results">
          {results.map((concept) => (
            <li key={concept.id}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect(concept);
                  setQuery("");
                  setOpen(false);
                }}
              >
                <span>{concept.title}</span>
                <small>{topicTitle(concept.topicId)}</small>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

import { IT_CMF_QUESTIONS, topics } from "../data/topics";
import type { TopicId } from "../data/types";

type Props = {
  onOpenTopic: (id: TopicId) => void;
};

export function TopicHub({ onOpenTopic }: Props) {
  const totalQs = topics.reduce((sum, t) => sum + t.questions, 0) + IT_CMF_QUESTIONS;

  return (
    <div className="hub">
      <header className="hub-hero">
        <p className="hub-brand">GSI</p>
        <h1>Mind map study</h1>
        <p className="hub-lead">
          Navigate the 12 course topics. Tap a node for exam-ready concept notes. Prioritize
          high-weight units ({totalQs} written questions).
        </p>
      </header>

      <div className="hub-note">
        <strong>IT-CMF</strong> adds {IT_CMF_QUESTIONS} questions — covered with Introduction &amp;
        capability cards.
      </div>

      <ul className="topic-grid">
        {topics.map((topic) => (
          <li key={topic.id}>
            <button
              type="button"
              className={`topic-card topic-card--${topic.weight}`}
              onClick={() => onOpenTopic(topic.id)}
            >
              <span className="topic-code">{topic.code}</span>
              <span className="topic-title">{topic.title}</span>
              <span className="topic-meta">
                {topic.questions}q · {topic.weight}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

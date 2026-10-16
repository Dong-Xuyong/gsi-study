import { topics } from "../data/topics";
import type { TopicId } from "../data/types";

type Props = {
  onOpenTopic: (id: TopicId) => void;
};

export function TopicHub({ onOpenTopic }: Props) {
  const totalQs = topics.reduce((sum, t) => sum + t.questions, 0);

  return (
    <div className="hub dx-main">
      <div className="dx-card hub-intro">
        <p className="hub-lead">
          Navigate course topics and all 36 IT-CMF Critical Capabilities. Prioritize high-weight
          units ({totalQs} written questions).
        </p>
        <p className="hub-note">
          Open <strong>IT-CMF</strong> for every Critical Capability definition (AA, BAR, TCO, SRP…).
        </p>
      </div>

      <ul className="topic-grid">
        {topics.map((topic) => (
          <li key={topic.id}>
            <button
              type="button"
              className={`topic-card dx-card topic-card--${topic.weight}`}
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

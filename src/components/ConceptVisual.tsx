import type { ReactNode } from "react";
import type { ConceptVisual as Visual } from "../data/types";

type Props = {
  visual: Visual;
  title: string;
};

function Matrix2x2({ visual }: { visual: Extract<Visual, { kind: "matrix2x2" }> }) {
  const [tl, tr, bl, br] = visual.cells;
  return (
    <div className="viz viz-matrix" role="img" aria-label="2 by 2 matrix diagram">
      <div className="viz-matrix__y-high">{visual.yHigh}</div>
      <div className="viz-matrix__grid-wrap">
        <div className="viz-matrix__x-low">{visual.xLow}</div>
        <div className="viz-matrix__grid">
          <div className="viz-matrix__cell">
            <strong>{tl.label}</strong>
            {tl.hint ? <span>{tl.hint}</span> : null}
          </div>
          <div className="viz-matrix__cell">
            <strong>{tr.label}</strong>
            {tr.hint ? <span>{tr.hint}</span> : null}
          </div>
          <div className="viz-matrix__cell">
            <strong>{bl.label}</strong>
            {bl.hint ? <span>{bl.hint}</span> : null}
          </div>
          <div className="viz-matrix__cell">
            <strong>{br.label}</strong>
            {br.hint ? <span>{br.hint}</span> : null}
          </div>
        </div>
        <div className="viz-matrix__x-high">{visual.xHigh}</div>
      </div>
      <div className="viz-matrix__y-low">{visual.yLow}</div>
    </div>
  );
}

function Radial({ visual }: { visual: Extract<Visual, { kind: "radial" }> }) {
  const n = visual.items.length;
  const cx = 160;
  const cy = 150;
  const r = 96;
  return (
    <div className="viz viz-radial" role="img" aria-label="Radial forces diagram">
      <svg viewBox="0 0 320 300" className="viz-svg">
        {visual.items.map((item, i) => {
          const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          return (
            <g key={item}>
              <line x1={cx} y1={cy} x2={x} y2={y} className="viz-radial__spoke" />
              <circle cx={x} cy={y} r="34" className="viz-radial__node" />
              <foreignObject x={x - 40} y={y - 22} width="80" height="44">
                <div className="viz-radial__label">{item}</div>
              </foreignObject>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="42" className="viz-radial__center" />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="viz-radial__center-text">
          {visual.center}
        </text>
      </svg>
    </div>
  );
}

function Clock({ visual }: { visual: Extract<Visual, { kind: "clock" }> }) {
  const n = visual.items.length;
  const cx = 150;
  const cy = 150;
  const r = 108;
  return (
    <div className="viz viz-clock" role="img" aria-label="Strategy clock diagram">
      <svg viewBox="0 0 300 300" className="viz-svg">
        <circle cx={cx} cy={cy} r={r} className="viz-clock__ring" />
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} className="viz-clock__axis" />
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} className="viz-clock__axis" />
        <text x={cx + r - 8} y={cy - 8} className="viz-clock__axis-label" textAnchor="end">
          Price →
        </text>
        <text x={cx + 8} y={cy - r + 14} className="viz-clock__axis-label">
          Value ↑
        </text>
        {visual.items.map((item, i) => {
          // Spread around upper-right through lower-left like Bowman's clock positions 1–8
          const t = (i / Math.max(n - 1, 1)) * 1.15 * Math.PI - 0.15 * Math.PI;
          const x = cx + Math.cos(t) * (r - 28);
          const y = cy - Math.sin(t) * (r - 28);
          return (
            <g key={item.label}>
              <circle cx={x} cy={y} r="16" className="viz-clock__dot" />
              <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" className="viz-clock__num">
                {i + 1}
              </text>
              <text
                x={x + (x < cx ? -18 : 18)}
                y={y}
                textAnchor={x < cx ? "end" : "start"}
                dominantBaseline="middle"
                className="viz-clock__label"
              >
                {item.short ?? item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <ol className="viz-clock__legend">
        {visual.items.map((item, i) => (
          <li key={item.label}>
            <span>{i + 1}</span>
            {item.label}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Chain({ visual }: { visual: Extract<Visual, { kind: "chain" }> }) {
  return (
    <div className="viz viz-chain" role="img" aria-label="Value chain diagram">
      {visual.support?.length ? (
        <div className="viz-chain__support">
          <p className="viz-chain__caption">Support</p>
          <div className="viz-chain__support-row">
            {visual.support.map((item) => (
              <div key={item} className="viz-chain__box viz-chain__box--support">
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <p className="viz-chain__caption">Primary</p>
      <div className="viz-chain__primary">
        {visual.primary.map((item, i) => (
          <div key={item} className="viz-chain__step">
            <div className="viz-chain__box">{item}</div>
            {i < visual.primary.length - 1 ? <span className="viz-chain__arrow" aria-hidden>→</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Chips({ visual }: { visual: Extract<Visual, { kind: "chips" }> }) {
  return (
    <div className="viz viz-chips" role="img" aria-label="Component diagram">
      {visual.items.map((item) => (
        <div key={item} className="viz-chip">
          {item}
        </div>
      ))}
    </div>
  );
}

function Layers({ visual }: { visual: Extract<Visual, { kind: "layers" }> }) {
  return (
    <div className="viz viz-layers" role="img" aria-label="Layered domains diagram">
      {visual.layers.map((layer) => (
        <div
          key={layer.title}
          className={`viz-layer ${layer.tone ? `viz-layer--${layer.tone}` : ""}`}
        >
          <div className="viz-layer__head">
            <strong>{layer.title}</strong>
            {layer.subtitle ? <span>{layer.subtitle}</span> : null}
          </div>
          {layer.items?.length ? (
            <div className="viz-layer__items">
              {layer.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Cycle({ visual }: { visual: Extract<Visual, { kind: "cycle" }> }) {
  const n = visual.items.length;
  const cx = 150;
  const cy = 140;
  const r = 88;
  return (
    <div className="viz viz-cycle" role="img" aria-label="Lifecycle cycle diagram">
      <svg viewBox="0 0 300 280" className="viz-svg">
        <circle cx={cx} cy={cy} r={r} className="viz-cycle__ring" fill="none" />
        {visual.items.map((item, i) => {
          const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          return (
            <g key={item}>
              <circle cx={x} cy={y} r="28" className="viz-cycle__node" />
              <foreignObject x={x - 36} y={y - 20} width="72" height="40">
                <div className="viz-cycle__label">{item}</div>
              </foreignObject>
            </g>
          );
        })}
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="viz-cycle__center">
          Lifecycle
        </text>
      </svg>
    </div>
  );
}

function Flow({ visual }: { visual: Extract<Visual, { kind: "flow" }> }) {
  return (
    <div className="viz viz-flow" role="img" aria-label="Lifecycle flow diagram">
      {visual.items.map((item, i) => (
        <div key={item} className="viz-flow__step">
          <div className="viz-flow__box">
            <span className="viz-flow__num">{i + 1}</span>
            {item}
          </div>
          {i < visual.items.length - 1 ? <span className="viz-flow__arrow" aria-hidden>→</span> : null}
        </div>
      ))}
    </div>
  );
}

function CompareColumns({ visual }: { visual: Extract<Visual, { kind: "compareColumns" }> }) {
  return (
    <div className="viz viz-compare" role="img" aria-label="Side by side comparison diagram">
      <div className="viz-compare__head">
        <strong>{visual.leftTitle}</strong>
        <strong>{visual.rightTitle}</strong>
      </div>
      {visual.rows.map((row) => (
        <div className="viz-compare__row" key={`${row.left}-${row.right}`}>
          <span>{row.left}</span>
          <span aria-hidden className="viz-compare__arrow">
            →
          </span>
          <span>{row.right}</span>
        </div>
      ))}
    </div>
  );
}

export function ConceptVisualView({ visual, title }: Props) {
  let body: ReactNode;
  switch (visual.kind) {
    case "matrix2x2":
      body = <Matrix2x2 visual={visual} />;
      break;
    case "radial":
      body = <Radial visual={visual} />;
      break;
    case "clock":
      body = <Clock visual={visual} />;
      break;
    case "chain":
      body = <Chain visual={visual} />;
      break;
    case "chips":
      body = <Chips visual={visual} />;
      break;
    case "layers":
      body = <Layers visual={visual} />;
      break;
    case "cycle":
      body = <Cycle visual={visual} />;
      break;
    case "flow":
      body = <Flow visual={visual} />;
      break;
    case "compareColumns":
      body = <CompareColumns visual={visual} />;
      break;
    default:
      body = null;
  }

  if (!body) return null;

  return (
    <section className="sheet-section sheet-section--visual">
      <h3>Visual</h3>
      <div className="viz-frame" aria-label={`${title} diagram`}>
        {body}
      </div>
    </section>
  );
}

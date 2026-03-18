"use client";

import type { BubbleCard } from "@/content/schema";

import { useLanguage } from "@/components/language-provider";

type VisualMode = "card" | "detail" | "hero" | "compact";

interface MathConceptVisualProps {
  card: BubbleCard;
  mode?: VisualMode;
  className?: string;
}

function getVisualKind(card: BubbleCard) {
  const fingerprint = [
    card.unit,
    card.topic,
    card.name,
    card.chapter,
    ...card.tags,
  ]
    .join(" ")
    .toLowerCase();

  if (fingerprint.includes("polar")) return "polar";
  if (
    fingerprint.includes("matrix") ||
    fingerprint.includes("determinant") ||
    fingerprint.includes("eigen") ||
    fingerprint.includes("diagonalization") ||
    fingerprint.includes("row reduction") ||
    fingerprint.includes("linear algebra")
  ) {
    return "matrix";
  }
  if (
    fingerprint.includes("probability") ||
    fingerprint.includes("random") ||
    fingerprint.includes("bayes") ||
    fingerprint.includes("expectation") ||
    fingerprint.includes("variance") ||
    fingerprint.includes("counting") ||
    fingerprint.includes("combination") ||
    fingerprint.includes("permutation")
  ) {
    return "probability";
  }
  if (
    fingerprint.includes("proof") ||
    fingerprint.includes("logic") ||
    fingerprint.includes("quantifier") ||
    fingerprint.includes("subset") ||
    fingerprint.includes("induction") ||
    fingerprint.includes("equivalence") ||
    fingerprint.includes("group") ||
    fingerprint.includes("subgroup") ||
    fingerprint.includes("homomorphism") ||
    fingerprint.includes("analysis") ||
    fingerprint.includes("epsilon") ||
    fingerprint.includes("cauchy") ||
    fingerprint.includes("supremum")
  ) {
    return "logic";
  }
  if (fingerprint.includes("series") || fingerprint.includes("sequence"))
    return "series";
  if (
    fingerprint.includes("vector") ||
    fingerprint.includes("line integral") ||
    fingerprint.includes("surface") ||
    fingerprint.includes("divergence") ||
    fingerprint.includes("curl") ||
    fingerprint.includes("stokes")
  ) {
    return "vector";
  }
  if (
    fingerprint.includes("partial") ||
    fingerprint.includes("lagrange") ||
    fingerprint.includes("multivariable") ||
    fingerprint.includes("gradient")
  ) {
    return "contour";
  }
  if (
    fingerprint.includes("differential equation") ||
    fingerprint.includes("direction field") ||
    fingerprint.includes("population") ||
    fingerprint.includes("related rates") ||
    fingerprint.includes("ode") ||
    fingerprint.includes("laplace")
  ) {
    return "field";
  }
  if (
    fingerprint.includes("integral") ||
    fingerprint.includes("area") ||
    fingerprint.includes("volume") ||
    fingerprint.includes("washer") ||
    fingerprint.includes("shell")
  ) {
    return "integral";
  }
  if (
    fingerprint.includes("derivative") ||
    fingerprint.includes("chain rule") ||
    fingerprint.includes("product rule") ||
    fingerprint.includes("quotient rule") ||
    fingerprint.includes("slope")
  ) {
    return "derivative";
  }
  if (fingerprint.includes("limit") || fingerprint.includes("continuity")) {
    return "limit";
  }

  return card.course === "Multivariable Calculus" ? "vector" : "derivative";
}

function joinClassNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(" ");
}

function SparkBars() {
  const heights = [54, 42, 36, 27, 22, 17, 14, 10];

  return (
    <>
      {heights.map((height, index) => (
        <rect
          key={height}
          x={44 + index * 24}
          y={152 - height}
          width="14"
          height={height}
          rx="7"
          fill={index % 2 === 0 ? "#78c8ff" : "#ffd2ae"}
          fillOpacity="0.88"
        />
      ))}
      <path
        d="M 36 92 C 74 72, 116 62, 154 76 S 228 118, 284 54"
        fill="none"
        stroke="#0f6ea6"
        strokeLinecap="round"
        strokeWidth="3"
        strokeDasharray="4 8"
      />
    </>
  );
}

function DirectionField() {
  const segments = [];

  for (let x = 44; x <= 276; x += 30) {
    for (let y = 46; y <= 156; y += 24) {
      const tilt = ((x + y) % 60) - 30;
      const x1 = x - 8;
      const x2 = x + 8;
      const y1 = y + tilt / 10;
      const y2 = y - tilt / 10;

      segments.push(
        <line
          key={`${x}-${y}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#0f6ea6"
          strokeLinecap="round"
          strokeWidth="2.6"
        />,
      );
    }
  }

  return <>{segments}</>;
}

function VectorField() {
  const arrows = [];

  for (let x = 54; x <= 266; x += 42) {
    for (let y = 50; y <= 150; y += 28) {
      const dx = 8 + ((y / 28) % 2) * 5;
      const dy = x < 160 ? -5 : 5;

      arrows.push(
        <g key={`${x}-${y}`}>
          <line
            x1={x}
            y1={y}
            x2={x + dx}
            y2={y + dy}
            stroke="#0f6ea6"
            strokeLinecap="round"
            strokeWidth="2.8"
          />
          <path
            d={`M ${x + dx - 6} ${y + dy - 4} L ${x + dx} ${y + dy} L ${x + dx - 7} ${y + dy + 4}`}
            fill="none"
            stroke="#0f6ea6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
          />
        </g>,
      );
    }
  }

  return <>{arrows}</>;
}

function LogicFlow() {
  return (
    <>
      <rect x="42" y="44" width="76" height="42" rx="16" fill="#ffffff" stroke="#78c8ff" strokeWidth="2.4" />
      <rect x="124" y="118" width="86" height="42" rx="16" fill="#ffffff" stroke="#78c8ff" strokeWidth="2.4" />
      <rect x="218" y="44" width="60" height="42" rx="16" fill="#ffffff" stroke="#ffd2ae" strokeWidth="2.4" />
      <path d="M 118 64 C 144 64, 152 88, 164 118" fill="none" stroke="#0f6ea6" strokeWidth="3" />
      <path d="M 202 118 C 216 94, 226 78, 238 68" fill="none" stroke="#0f6ea6" strokeWidth="3" />
      <path d="M 162 48 L 186 48" fill="none" stroke="#ff9e57" strokeWidth="3" strokeDasharray="6 7" />
    </>
  );
}

function ProbabilityTree() {
  return (
    <>
      <circle cx="62" cy="98" r="7" fill="#0f6ea6" />
      <line x1="68" y1="98" x2="138" y2="58" stroke="#0f6ea6" strokeWidth="3" />
      <line x1="68" y1="98" x2="138" y2="138" stroke="#0f6ea6" strokeWidth="3" />
      <line x1="144" y1="58" x2="232" y2="38" stroke="#0f6ea6" strokeWidth="3" />
      <line x1="144" y1="58" x2="232" y2="82" stroke="#0f6ea6" strokeWidth="3" />
      <line x1="144" y1="138" x2="232" y2="116" stroke="#0f6ea6" strokeWidth="3" />
      <line x1="144" y1="138" x2="232" y2="158" stroke="#0f6ea6" strokeWidth="3" />
      {[38, 82, 116, 158].map((y) => (
        <circle key={y} cx="238" cy={y} r="6" fill="#78c8ff" />
      ))}
      <text x="102" y="54" fill="#ff9e57" fontSize="14" fontWeight="700">
        p
      </text>
      <text x="102" y="144" fill="#ff9e57" fontSize="14" fontWeight="700">
        1-p
      </text>
    </>
  );
}

function MatrixGrid() {
  const cells = [];
  const tones = ["#78c8ff", "#d8f1ff", "#ffd2ae", "#ffffff"];

  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      cells.push(
        <rect
          key={`${row}-${column}`}
          x={84 + column * 42}
          y={48 + row * 32}
          width="28"
          height="20"
          rx="7"
          fill={tones[(row + column) % tones.length]}
          stroke="#0f6ea6"
          strokeOpacity="0.28"
          strokeWidth="1.6"
        />,
      );
    }
  }

  return (
    <>
      <path
        d="M 66 42 C 54 64, 54 136, 66 158"
        fill="none"
        stroke="#0f6ea6"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 248 42 C 260 64, 260 136, 248 158"
        fill="none"
        stroke="#0f6ea6"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {cells}
      <path
        d="M 210 64 L 246 64"
        fill="none"
        stroke="#ff9e57"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 236 54 L 246 64 L 236 74"
        fill="none"
        stroke="#ff9e57"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function renderVisual(kind: string) {
  switch (kind) {
    case "limit":
      return (
        <>
          <line
            x1="188"
            y1="24"
            x2="188"
            y2="176"
            stroke="#ff9e57"
            strokeDasharray="6 8"
            strokeWidth="2.5"
          />
          <path
            d="M 34 146 C 74 138, 118 102, 160 54 S 194 28, 184 36"
            fill="none"
            stroke="#0f6ea6"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d="M 194 36 C 212 54, 226 86, 244 126 S 270 158, 288 166"
            fill="none"
            stroke="#0f6ea6"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <circle cx="188" cy="34" r="6" fill="#ffffff" stroke="#ff9e57" strokeWidth="2" />
        </>
      );
    case "derivative":
      return (
        <>
          <path
            d="M 28 146 C 62 92, 92 84, 126 116 S 186 166, 236 114 S 272 74, 292 54"
            fill="none"
            stroke="#0f6ea6"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <line
            x1="118"
            y1="112"
            x2="222"
            y2="76"
            stroke="#ff9e57"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <circle cx="154" cy="100" r="7" fill="#78c8ff" stroke="#ffffff" strokeWidth="3" />
        </>
      );
    case "integral":
      return (
        <>
          <path
            d="M 32 152 C 78 132, 114 72, 164 86 S 240 150, 292 70"
            fill="none"
            stroke="#0f6ea6"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d="M 46 152 L 46 134 C 82 118, 114 76, 154 88 S 214 146, 244 110 L 244 152 Z"
            fill="#78c8ff"
            fillOpacity="0.34"
            stroke="#78c8ff"
            strokeOpacity="0.75"
            strokeWidth="2"
          />
          <line x1="46" y1="152" x2="244" y2="152" stroke="#0f6ea6" strokeWidth="2.5" />
        </>
      );
    case "series":
      return <SparkBars />;
    case "logic":
      return <LogicFlow />;
    case "matrix":
      return <MatrixGrid />;
    case "polar":
      return (
        <>
          <circle cx="160" cy="100" r="10" fill="#0f6ea6" fillOpacity="0.14" />
          <path
            d="M 160 100
               C 166 96, 176 96, 180 104
               C 186 116, 174 128, 156 128
               C 132 128, 120 100, 130 78
               C 144 48, 188 42, 214 68
               C 248 102, 230 156, 170 168"
            fill="none"
            stroke="#0f6ea6"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <line x1="160" y1="100" x2="246" y2="80" stroke="#ff9e57" strokeWidth="2.8" />
          <circle cx="246" cy="80" r="6" fill="#ffd2ae" stroke="#ff9e57" strokeWidth="2" />
        </>
      );
    case "contour":
      return (
        <>
          <ellipse
            cx="164"
            cy="104"
            rx="112"
            ry="48"
            fill="none"
            stroke="#0f6ea6"
            strokeOpacity="0.3"
            strokeWidth="2.4"
          />
          <ellipse
            cx="164"
            cy="104"
            rx="84"
            ry="36"
            fill="none"
            stroke="#0f6ea6"
            strokeOpacity="0.42"
            strokeWidth="2.4"
          />
          <ellipse
            cx="164"
            cy="104"
            rx="54"
            ry="22"
            fill="none"
            stroke="#0f6ea6"
            strokeOpacity="0.55"
            strokeWidth="2.4"
          />
          <line x1="118" y1="136" x2="198" y2="74" stroke="#ff9e57" strokeWidth="3" />
          <circle cx="198" cy="74" r="8" fill="#78c8ff" stroke="#ffffff" strokeWidth="3" />
        </>
      );
    case "field":
      return <DirectionField />;
    case "probability":
      return <ProbabilityTree />;
    case "vector":
    default:
      return <VectorField />;
  }
}

export function MathConceptVisual({
  card,
  mode = "card",
  className,
}: MathConceptVisualProps) {
  const { courseLabel } = useLanguage();
  const kind = getVisualKind(card);
  const heightClass =
    mode === "hero"
      ? "h-72"
      : mode === "detail"
        ? "h-64"
        : mode === "compact"
          ? "h-24"
          : "h-36";

  return (
    <div
      className={joinClassNames(
        "bubble-stage bubble-shadow relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(233,246,255,0.78)_62%,rgba(255,239,224,0.85))]",
        heightClass,
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_74%)]" />
      <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute -bottom-8 left-8 h-20 w-20 rounded-full bg-sky-200/40 blur-2xl" />

      <svg
        viewBox="0 0 320 200"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <g opacity="0.38">
          {[40, 80, 120, 160].map((y) => (
            <line
              key={`y-${y}`}
              x1="20"
              y1={y}
              x2="300"
              y2={y}
              stroke="#7eaed4"
              strokeWidth="1"
            />
          ))}
          {[60, 110, 160, 210, 260].map((x) => (
            <line
              key={`x-${x}`}
              x1={x}
              y1="20"
              x2={x}
              y2="180"
              stroke="#7eaed4"
              strokeWidth="1"
            />
          ))}
        </g>
        <line x1="24" y1="154" x2="296" y2="154" stroke="#aacbe6" strokeWidth="1.8" />
        <line x1="48" y1="20" x2="48" y2="176" stroke="#aacbe6" strokeWidth="1.8" />
        {renderVisual(kind)}
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <div className="rounded-full border border-white/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
          {card.unit}
        </div>
        <div className="rounded-full border border-white/70 bg-white/75 px-3 py-1 text-[11px] font-medium text-slate-700">
          {card.courseCode ?? courseLabel(card.course)}
        </div>
      </div>
    </div>
  );
}

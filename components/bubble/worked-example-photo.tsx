"use client";

import Image from "next/image";

import { useLanguage } from "@/components/language-provider";
import { MathConceptVisual } from "@/components/math-concept-visual";
import type { BubbleCard } from "@/content/schema";
import { getPatternTokens, getTechniqueLabel } from "@/lib/recognition";

interface WorkedExamplePhotoProps {
  card: BubbleCard;
  problem?: string;
  solveEntry?: string;
  setup?: string;
  steps?: string[];
  answer?: string;
  caption?: string;
}

interface ExampleLayout {
  setup: string;
  steps: string[];
  answer: string;
  sideClue: string;
}

const photoCopy = {
  en: {
    setup: "Setup",
    answerLane: "Answer lane",
    shapeClue: "Shape clue",
    patternChips: "Pattern chips",
  },
  es: {
    setup: "Planteamiento",
    answerLane: "Línea de respuesta",
    shapeClue: "Pista de forma",
    patternChips: "Pistas de patrón",
  },
  zh: {
    setup: "列式",
    answerLane: "答案线",
    shapeClue: "题型线索",
    patternChips: "题型碎片",
  },
} as const;

function getBackground(card: BubbleCard) {
  const courseCode = card.courseCode ?? "";
  const fingerprint = [card.unit, card.topic, card.name, ...card.tags]
    .join(" ")
    .toLowerCase();

  if (
    courseCode === "MATH 13" ||
    courseCode === "MATH 120A" ||
    courseCode === "MATH 140A" ||
    fingerprint.includes("proof") ||
    fingerprint.includes("logic") ||
    fingerprint.includes("analysis")
  ) {
    return "/images/worked-examples/notebook-warm.png";
  }

  if (
    courseCode === "MATH 3A" ||
    courseCode === "MATH 121A" ||
    courseCode === "MATH 130A" ||
    courseCode === "MATH 130B" ||
    fingerprint.includes("matrix") ||
    fingerprint.includes("vector") ||
    fingerprint.includes("probability")
  ) {
    return "/images/worked-examples/clipboard-grid.png";
  }

  return "/images/worked-examples/notebook-blue.png";
}

function trimLine(text: string | undefined, fallback: string) {
  const cleaned = text?.replace(/\s+/g, " ").trim();
  return cleaned && cleaned.length > 0 ? cleaned : fallback;
}

function getTemplate(card: BubbleCard, solveEntry: string): ExampleLayout {
  const fingerprint = [card.id, card.unit, card.topic, card.name, ...card.tags]
    .join(" ")
    .toLowerCase();

  if (card.id === "analysis140a-supremum") {
    return {
      setup: "s = sup A  means  upper bound + least",
      steps: ["show every a in A satisfies a ≤ s", "take any ε > 0", "find a point of A above s - ε"],
      answer: "least upper bound = 2-part proof",
      sideClue: "The epsilon part proves you cannot lower s and still keep an upper bound.",
    };
  }

  if (fingerprint.includes("completeness")) {
    return {
      setup: "A ≠ ∅ and bounded above",
      steps: ["check the two hypotheses", "invoke completeness", "let s = sup A and keep proving"],
      answer: "nonempty + bounded above -> sup exists",
      sideClue: "Completeness is an existence tool, not an algebra trick.",
    };
  }

  if (fingerprint.includes("cauchy")) {
    return {
      setup: "m,n ≥ N  =>  |a_n - a_m| < ε",
      steps: ["start with a tail-to-tail difference", "make both indices large", "shrink the difference below ε"],
      answer: "tail terms bunch together",
      sideClue: "Cauchy proofs compare late terms to each other, not to a guessed limit.",
    };
  }

  if (fingerprint.includes("line integral")) {
    return {
      setup: "C: r(t),  dr = r'(t) dt",
      steps: ["parameterize the curve", "rewrite everything in t", "integrate over the interval"],
      answer: "No parameter -> no line integral",
      sideClue: "Decide first whether the integral is over a curve, region, or surface.",
    };
  }

  if (fingerprint.includes("surface integral") || fingerprint.includes("parametric surface")) {
    return {
      setup: "S: r(u,v),  dS from r_u × r_v",
      steps: ["describe the surface clearly", "build the normal/area factor", "turn it into a double integral"],
      answer: "surface first, integral second",
      sideClue: "Flux needs a normal vector, not just an area element.",
    };
  }

  if (fingerprint.includes("divergence") || fingerprint.includes("stokes") || fingerprint.includes("gauss")) {
    return {
      setup: "match the geometry to the theorem",
      steps: ["closed surface -> Gauss", "boundary curve of a surface -> Stokes", "closed plane loop -> Green"],
      answer: "geometry tells the theorem",
      sideClue: "Name the object first: curve, closed curve, surface, or closed surface.",
    };
  }

  if (fingerprint.includes("bayes")) {
    return {
      setup: "P(A|B) = P(B|A)P(A) / P(B)",
      steps: ["name what you want", "flip to the easier direction", "divide by the evidence"],
      answer: "posterior = likelihood × prior / evidence",
      sideClue: "Bayes updates the old belief after seeing new information.",
    };
  }

  return {
    setup: trimLine(card.looksLike, "spot the shape first"),
    steps: [
      trimLine(solveEntry, "write the solve structure first"),
      trimLine(card.quickExample?.move, "push the setup into a cleaner form"),
      trimLine(card.rememberThis, "check the takeaway before moving on"),
    ],
    answer: trimLine(getTechniqueLabel(card), card.name),
    sideClue: trimLine(card.watchOutFor, "Watch the common trap."),
  };
}

export function WorkedExamplePhoto({
  card,
  problem: problemOverride,
  solveEntry: solveEntryOverride,
  setup,
  steps,
  answer,
  caption,
}: WorkedExamplePhotoProps) {
  const { locale, t } = useLanguage();
  const ui = photoCopy[locale] ?? photoCopy.en;
  const problem = problemOverride ?? card.quickExample?.problem ?? card.looksLike;
  const solveEntry = solveEntryOverride ?? card.quickExample?.move ?? card.doThis;
  const template = getTemplate(card, solveEntry);
  const workedSetup = trimLine(setup, template.setup);
  const workedSteps = (steps?.length ? steps : template.steps)
    .map((step) => trimLine(step, ""))
    .filter(Boolean)
    .slice(0, 3);
  const workedAnswer = trimLine(answer, template.answer);
  const chips = getPatternTokens(card).slice(0, 3);

  return (
    <div className="relative overflow-hidden rounded-[1.85rem] border border-[color:var(--line)] bg-slate-100">
      <div className="relative aspect-[5/6] sm:aspect-[4/3] lg:aspect-[16/10]">
        <Image
          src={getBackground(card)}
          alt={`${card.name} worked example background`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 48vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_50%,rgba(15,23,42,0.08))]" />

        <div className="absolute inset-[4%] grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(15rem,0.75fr)]">
          <div className="rounded-[1.45rem] border border-white/80 bg-white/80 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-[3px] sm:rounded-[1.7rem] sm:p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                  {t("problemCue")}
                </p>
                <p
                  className="mt-2 text-[clamp(1rem,2.7vw,1.65rem)] leading-[1.15] text-slate-900"
                  style={{ fontFamily: "var(--font-caveat)" }}
                >
                  {problem}
                </p>
              </div>
              <div className="hidden rounded-full bg-slate-950 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:block">
                {caption ?? card.name}
              </div>
            </div>

            <div className="mt-3 rounded-[1.2rem] border border-sky-100 bg-sky-50/92 px-3 py-3 sm:mt-4 sm:rounded-[1.4rem] sm:px-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                {ui.setup}
              </p>
              <p
                className="mt-2 text-[clamp(0.92rem,2vw,1.35rem)] leading-[1.2] text-slate-900"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                {workedSetup}
              </p>
            </div>

            <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
              {workedSteps.map((step, index) => (
                <div
                  key={`${step}-${index}`}
                  className="flex gap-3 rounded-[1.1rem] border border-[color:var(--line)] bg-white/92 px-3 py-3 sm:rounded-[1.25rem] sm:px-4"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700 sm:h-7 sm:w-7 sm:text-sm">
                    {index + 1}
                  </div>
                  <p
                    className="text-[clamp(0.9rem,1.6vw,1.2rem)] leading-[1.25] text-slate-900"
                    style={{ fontFamily: "var(--font-caveat)" }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-[1.2rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(214,255,232,0.72),rgba(255,255,255,0.96))] px-3 py-3 sm:mt-4 sm:rounded-[1.35rem] sm:px-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {ui.answerLane}
              </p>
              <p
                className="mt-2 text-[clamp(0.92rem,1.7vw,1.24rem)] leading-[1.2] text-slate-900"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                {workedAnswer}
              </p>
            </div>

            <div className="mt-3 rounded-full bg-slate-950 px-3 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:hidden">
              {caption ?? card.name}
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4">
            <div className="rounded-[1.35rem] border border-white/80 bg-white/74 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-[3px] sm:rounded-[1.6rem]">
              <MathConceptVisual card={card} mode="compact" className="h-24 sm:h-32" />
            </div>

            <div className="rounded-[1.25rem] border border-amber-100 bg-amber-50/90 px-3 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.1)] sm:rounded-[1.45rem] sm:px-4 sm:py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                {ui.shapeClue}
              </p>
              <p
                className="mt-2 text-[clamp(0.9rem,1.35vw,1.12rem)] leading-[1.22] text-slate-900"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                {template.sideClue}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-white/80 bg-white/74 px-3 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.1)] sm:rounded-[1.45rem] sm:px-4 sm:py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                {ui.patternChips}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                {chips.map((chip, index) => (
                  <span
                    key={`${chip}-${index}`}
                    className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1.5 font-mono text-[11px] text-sky-950 sm:px-3 sm:text-xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

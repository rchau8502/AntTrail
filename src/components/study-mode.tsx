"use client";

import { useState } from "react";

import type { BubbleCard, Unit } from "@/content/schema";
import { units } from "@/lib/bubble";

interface StudyModeProps {
  cards: BubbleCard[];
}

export function StudyMode({ cards }: StudyModeProps) {
  const [unitFilter, setUnitFilter] = useState<"All" | Unit>("All");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const filteredCards =
    unitFilter === "All"
      ? cards
      : cards.filter((card) => card.unit === unitFilter);

  const currentCard = filteredCards[index] ?? filteredCards[0];

  if (!currentCard) {
    return null;
  }

  function move(delta: number) {
    const nextIndex = (index + delta + filteredCards.length) % filteredCards.length;
    setIndex(nextIndex);
    setRevealed(false);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 shadow-[var(--shadow)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              Study Mode
            </p>
            <h1 className="font-display text-4xl text-slate-900 sm:text-5xl">
              Flip one bubble at a time.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              See the concept name first. Try to recall the pattern and move.
              Reveal only when you are ready.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={unitFilter}
              onChange={(event) =>
                {
                  setUnitFilter(event.target.value as "All" | Unit);
                  setIndex(0);
                  setRevealed(false);
                }
              }
              className="rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">All units</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <div className="rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-[color:var(--muted)]">
              {index + 1} / {filteredCards.length}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-6 shadow-[var(--shadow)] sm:p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          <span>{currentCard.unit}</span>
          <span className="rounded-full bg-sky-100 px-3 py-1 tracking-normal">
            {currentCard.difficulty}
          </span>
        </div>

        <div className="mt-6 rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,249,255,0.92))] p-6 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--muted)]">
            Front
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
            {currentCard.name}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            {currentCard.memoryHook}
          </p>

          {!revealed ? (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
            >
              Reveal the bubble
            </button>
          ) : (
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {[
                ["Use it when", currentCard.useItWhen],
                ["Looks like", currentCard.looksLike],
                ["Do this", currentCard.doThis],
                ["Think of it as", currentCard.thinkOfItAs],
                ["Watch out for", currentCard.watchOutFor],
                ["Remember this", currentCard.rememberThis],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-4"
                >
                  <p className="text-sm font-semibold text-sky-700">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
                </div>
              ))}

              <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-sky-50 p-4 lg:col-span-2">
                <p className="text-sm font-semibold text-sky-700">
                  Typical problem shapes
                </p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {currentCard.typicalProblemShapes.map((shape) => (
                    <div
                      key={shape}
                      className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-sm leading-6 text-slate-700"
                    >
                      {shape}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => move(-1)}
              className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
            >
              Next
            </button>
          </div>
          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            className="rounded-full bg-sky-100 px-5 py-3 text-sm font-semibold text-sky-950 transition hover:bg-sky-200"
          >
            {revealed ? "Hide details" : "Reveal details"}
          </button>
        </div>
      </section>
    </div>
  );
}

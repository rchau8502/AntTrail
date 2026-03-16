"use client";

import { useState } from "react";

import type { BubbleCard } from "@/content/schema";

interface QuizItem {
  id: string;
  unit: string;
  prompt: string;
  answer: string;
  options: string[];
  hint: string;
}

function seededNumber(seed: string) {
  return [...seed].reduce((total, char) => total + char.charCodeAt(0), 0);
}

function rotate<T>(items: T[], offset: number) {
  if (items.length === 0) {
    return items;
  }

  const safeOffset = offset % items.length;
  return items.slice(safeOffset).concat(items.slice(0, safeOffset));
}

function buildQuizItems(cards: BubbleCard[]): QuizItem[] {
  return cards.map((card) => {
    const sameUnitPool = cards.filter(
      (candidate) => candidate.unit === card.unit && candidate.id !== card.id,
    );
    const fallbackPool = cards.filter((candidate) => candidate.id !== card.id);
    const pool = sameUnitPool.length >= 3 ? sameUnitPool : fallbackPool;
    const offset = seededNumber(card.id);
    const distractors = rotate(pool, offset).slice(0, 3).map((item) => item.name);
    const options = rotate([card.name, ...distractors], offset + 1);

    return {
      id: card.id,
      unit: card.unit,
      prompt: card.quickExample?.problem ?? card.typicalProblemShapes[0],
      answer: card.name,
      options,
      hint: card.memoryHook,
    };
  });
}

interface RecognitionQuizProps {
  cards: BubbleCard[];
}

export function RecognitionQuiz({ cards }: RecognitionQuizProps) {
  const quizItems = buildQuizItems(cards);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const currentItem = quizItems[index];
  const finished = index >= quizItems.length;

  if (!currentItem && !finished) {
    return null;
  }

  function choose(option: string) {
    if (selected) {
      return;
    }

    setSelected(option);

    if (option === currentItem.answer) {
      setScore((value) => value + 1);
    }
  }

  function next() {
    setSelected(null);
    setIndex((value) => value + 1);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 shadow-[var(--shadow)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              Recognition Quiz
            </p>
            <h1 className="font-display text-4xl text-slate-900 sm:text-5xl">
              Pick the move before you solve.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              This is a pattern test, not a grind test. Read the shape, call the
              technique, move on.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/80 px-5 py-4 text-sm text-[color:var(--muted)]">
            Score: <span className="font-semibold text-slate-900">{score}</span>
            {!finished && (
              <>
                {" "}
                / <span className="font-semibold text-slate-900">{index}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {finished ? (
        <section className="rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-8 text-center shadow-[var(--shadow)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Session complete
          </p>
          <h2 className="mt-4 font-display text-4xl text-slate-900">
            {score} / {quizItems.length}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[color:var(--muted)]">
            Misses are useful here. The goal is to spot the trigger words and
            shapes faster on the next pass.
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
          >
            Run it again
          </button>
        </section>
      ) : (
        <section className="rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-6 shadow-[var(--shadow)] sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            <span>{currentItem.unit}</span>
            <span>
              Question {index + 1} of {quizItems.length}
            </span>
          </div>
          <div className="mt-6 rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,251,255,0.92))] p-6">
            <p className="text-sm font-semibold text-[color:var(--muted)]">
              Which technique applies first?
            </p>
            <p className="mt-4 text-xl leading-8 text-slate-900 sm:text-2xl">
              {currentItem.prompt}
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {currentItem.options.map((option) => {
              const isCorrect = option === currentItem.answer;
              const isSelected = option === selected;

              let tone =
                "border-[color:var(--line)] bg-white hover:border-sky-200";

              if (selected && isCorrect) {
                tone = "border-emerald-200 bg-emerald-50";
              } else if (selected && isSelected && !isCorrect) {
                tone = "border-rose-200 bg-rose-50";
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(option)}
                  className={`rounded-[1.5rem] border p-5 text-left text-sm font-semibold text-slate-900 transition ${tone}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="mt-6 rounded-[1.75rem] border border-[color:var(--line)] bg-sky-50/80 p-5">
              <p className="text-sm font-semibold text-slate-900">
                {selected === currentItem.answer ? "Correct." : "Try again next round."}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Best call: <span className="font-semibold text-slate-900">{currentItem.answer}</span>.{" "}
                Hook: {currentItem.hint}
              </p>
              <button
                type="button"
                onClick={next}
                className="mt-4 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
              >
                Next question
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

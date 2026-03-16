"use client";

import { useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { localizeCards } from "@/content/localization";
import type { BubbleCard, Unit } from "@/content/schema";
import { getCourseOptions, getUnitOptions } from "@/lib/bubble";
import { getRecognitionPrompt } from "@/lib/recognition";

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
      prompt: getRecognitionPrompt(card),
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
  const { locale, t } = useLanguage();
  const [courseFilter, setCourseFilter] = useState<"All" | string>("All");
  const [unitFilter, setUnitFilter] = useState<"All" | Unit>("All");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const localizedCards = useMemo(() => localizeCards(cards, locale), [cards, locale]);
  const courseOptions = getCourseOptions(localizedCards);

  const courseScopedCards =
    courseFilter === "All"
      ? localizedCards
      : localizedCards.filter((card) => card.course === courseFilter);
  const filteredCards =
    unitFilter === "All"
      ? courseScopedCards
      : courseScopedCards.filter((card) => card.unit === unitFilter);
  const unitOptions = getUnitOptions(courseScopedCards);
  const quizItems = buildQuizItems(filteredCards);

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

  function resetSession() {
    setIndex(0);
    setSelected(null);
    setScore(0);
  }

  return (
    <div className="space-y-8">
      <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              {t("recognitionQuiz")}
            </p>
            <h1 className="font-display text-4xl text-slate-900 sm:text-5xl">
              {t("pickMoveBeforeSolve")}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              {t("quizDescription")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={courseFilter}
              onChange={(event) => {
                setCourseFilter(event.target.value);
                setUnitFilter("All");
                resetSession();
              }}
              className="rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">{t("allCourses")}</option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <select
              value={unitFilter}
              onChange={(event) => {
                setUnitFilter(event.target.value as "All" | Unit);
                resetSession();
              }}
              className="rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">{t("allUnits")}</option>
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/80 px-5 py-4 text-sm text-[color:var(--muted)]">
              {t("score")}:{" "}
              <span className="font-semibold text-slate-900">{score}</span>
              {!finished && (
                <>
                  {" "}
                  / <span className="font-semibold text-slate-900">{index}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {quizItems.length === 0 ? (
        <section className="bubble-shadow rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-8 text-center">
          <p className="text-base text-[color:var(--muted)]">
            {t("noQuizCards")}
          </p>
        </section>
      ) : finished ? (
        <section className="bubble-shadow rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            {t("sessionComplete")}
          </p>
          <h2 className="mt-4 font-display text-4xl text-slate-900">
            {score} / {quizItems.length}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[color:var(--muted)]">
            {t("missesHelp")}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
          >
            {t("runItAgain")}
          </button>
        </section>
      ) : (
        <section className="bubble-shadow rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            <span>{filteredCards[index]?.course}</span>
            <span>{currentItem.unit}</span>
            <span>
              {index + 1} / {quizItems.length}
            </span>
          </div>
          <div className="mt-6 rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,251,255,0.92))] p-6">
            <p className="text-sm font-semibold text-[color:var(--muted)]">
              {t("whichTechniqueApplies")}
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
                {selected === currentItem.answer
                  ? t("correct")
                  : t("tryAgainNextRound")}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {t("bestCall")}:{" "}
                <span className="font-semibold text-slate-900">
                  {currentItem.answer}
                </span>
                . {t("hook")}: {currentItem.hint}
              </p>
              <button
                type="button"
                onClick={next}
                className="mt-4 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
              >
                {t("nextQuestion")}
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { localizeCards } from "@/content/localization";
import { MathConceptVisual } from "@/components/math-concept-visual";
import type { BubbleCard, Unit } from "@/content/schema";
import { getCourseOptions, getUnitOptions } from "@/lib/bubble";
import { getPatternTokens, getRecognitionPrompt } from "@/lib/recognition";

interface StudyModeProps {
  cards: BubbleCard[];
}

export function StudyMode({ cards }: StudyModeProps) {
  const { difficultyLabel, locale, t } = useLanguage();
  const [courseFilter, setCourseFilter] = useState<"All" | string>("All");
  const [unitFilter, setUnitFilter] = useState<"All" | Unit>("All");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
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
      <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              {t("studyMode")}
            </p>
            <h1 className="font-display text-4xl text-slate-900 sm:text-5xl">
              {t("flipOneBubble")}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              {t("studyDescription")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={courseFilter}
              onChange={(event) => {
                setCourseFilter(event.target.value);
                setUnitFilter("All");
                setIndex(0);
                setRevealed(false);
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
                setIndex(0);
                setRevealed(false);
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
            <div className="rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-[color:var(--muted)]">
              {index + 1} / {filteredCards.length}
            </div>
          </div>
        </div>
      </section>

      <section className="bubble-shadow rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          <span>{currentCard.course}</span>
          <span>{currentCard.unit}</span>
          <span className="rounded-full bg-sky-100 px-3 py-1 tracking-normal">
            {difficultyLabel(currentCard.difficulty)}
          </span>
        </div>

        <div className="mt-6 rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,249,255,0.92))] p-6 sm:p-8">
          <MathConceptVisual card={currentCard} mode="card" />
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--muted)]">
            {t("front")}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
            {currentCard.name}
          </h2>
          <div className="mt-5 rounded-[1.55rem] bg-slate-950 px-5 py-5 text-sky-50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
              Problem cue
            </p>
            <p className="mt-3 font-mono text-[1.02rem] leading-8">
              {getRecognitionPrompt(currentCard)}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {getPatternTokens(currentCard).map((token) => (
              <span
                key={token}
                className="rounded-full border border-sky-100 bg-sky-50 px-3 py-2 font-mono text-sm text-sky-950"
              >
                {token}
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            {currentCard.memoryHook}
          </p>

          {!revealed ? (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
            >
              {t("revealBubble")}
            </button>
          ) : (
            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,20rem)]">
              <div className="grid gap-4">
                <div className="rounded-[1.5rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(214,255,232,0.76),rgba(255,255,255,0.96))] p-4">
                  <p className="text-sm font-semibold text-sky-700">
                    {t("firstMove")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">
                    {currentCard.doThis}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-4">
                  <p className="text-sm font-semibold text-sky-700">
                    {t("useItWhen")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {currentCard.useItWhen}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-4">
                  <p className="text-sm font-semibold text-sky-700">
                    {t("thinkOfItAs")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {currentCard.thinkOfItAs}
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.5rem] border border-rose-100 bg-rose-50/70 p-4">
                  <p className="text-sm font-semibold text-rose-600">
                    {t("trap")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {currentCard.watchOutFor}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-sky-50 p-4">
                  <p className="text-sm font-semibold text-sky-700">
                    {t("typicalProblemShapes")}
                  </p>
                  <div className="mt-3 grid gap-3">
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

                <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-4">
                  <p className="text-sm font-semibold text-sky-700">
                    {t("rememberThis")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {currentCard.rememberThis}
                  </p>
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
              {t("previous")}
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
            >
              {t("next")}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            className="rounded-full bg-sky-100 px-5 py-3 text-sm font-semibold text-sky-950 transition hover:bg-sky-200"
          >
            {revealed ? t("hideDetails") : t("revealDetails")}
          </button>
        </div>
      </section>
    </div>
  );
}

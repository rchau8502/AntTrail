"use client";

import { useEffect, useMemo, useState } from "react";

import { WorkedExamplePhoto } from "@/components/worked-example-photo";
import { useLanguage } from "@/components/language-provider";
import { localizeCards } from "@/content/localization";
import type { BubbleCard, Unit } from "@/content/schema";
import { buildBubblegumDrill } from "@/lib/bubblegum";
import {
  getCourseDisplayLabel,
  getCourseOptions,
  getUnitOptions,
} from "@/lib/course-catalog";
import type { Locale } from "@/lib/i18n";
import { getRecognitionPrompt, getTechniqueLabel } from "@/lib/recognition";

interface QuizItem {
  id: string;
  unit: string;
  courseCode?: string;
  prompt: string;
  answer: string;
  options: string[];
  hint: string;
  topic: string;
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

function uniqueTechniqueOptions(
  pool: BubbleCard[],
  answer: string,
  locale: Locale,
  offset: number,
  excluded: string[] = [],
) {
  const labels = [...excluded];
  const freshLabels: string[] = [];

  for (const candidate of rotate(pool, offset)) {
    const label = getTechniqueLabel(candidate, locale);

    if (label === answer || labels.includes(label)) {
      continue;
    }

    labels.push(label);
    freshLabels.push(label);

    if (freshLabels.length === 3) {
      break;
    }
  }

  return freshLabels;
}

function buildQuizItems(cards: BubbleCard[], locale: Locale): QuizItem[] {
  return cards.map((card) => {
    const sameUnitPool = cards.filter(
      (candidate) => candidate.unit === card.unit && candidate.id !== card.id,
    );
    const fallbackPool = cards.filter((candidate) => candidate.id !== card.id);
    const offset = seededNumber(card.id);
    const answer = getTechniqueLabel(card, locale);
    const distractors = uniqueTechniqueOptions(
      sameUnitPool,
      answer,
      locale,
      offset,
    );
    const fallbackDistractors =
      distractors.length >= 3
        ? distractors
        : [
            ...distractors,
            ...uniqueTechniqueOptions(
              fallbackPool,
              answer,
              locale,
              offset + distractors.length + 1,
              distractors,
            ),
          ].slice(0, 3);
    const options = rotate([answer, ...fallbackDistractors], offset + 1);

    return {
      id: card.id,
      unit: card.unit,
      courseCode: card.courseCode,
      prompt: getRecognitionPrompt(card),
      answer,
      options,
      hint: card.memoryHook,
      topic: card.name,
    };
  });
}

interface RecognitionQuizProps {
  cards: BubbleCard[];
  initialCardId?: string;
}

function isOptionalCard(card: BubbleCard) {
  const chapterText = card.chapter.toLowerCase();
  const unitText = card.unit.toLowerCase();

  return (
    chapterText.includes("later / optional") ||
    unitText.includes("later / optional") ||
    chapterText.includes("optional") ||
    unitText.includes("optional") ||
    card.chapter.includes("后续 / 可选") ||
    card.unit.includes("后续 / 可选")
  );
}

const quizCopy = {
  en: {
    eyebrow: "Recall lane",
    title: "Use Quiz for fast recognition checks, not for full review.",
    description:
      "Quiz should be short and sharp. Read the cue, choose the matching technique, then check whether the topic really belongs to the move you picked.",
    currentCheck: "Current check",
    answerReview: "Answer review",
    whyThisAnswer: "Why this answer fits",
    nextStep: "If you miss it",
    results: "Session result",
    restart: "Run another recall pass",
  },
  es: {
    eyebrow: "Carril de recuerdo",
    title: "Usa Quiz para chequeos rapidos de reconocimiento, no para repaso completo.",
    description:
      "Quiz debe ser corto y preciso. Lee la pista, elige la tecnica correcta y luego comprueba si el tema de verdad encaja con ese movimiento.",
    currentCheck: "Chequeo actual",
    answerReview: "Revision de respuesta",
    whyThisAnswer: "Por que encaja esta respuesta",
    nextStep: "Si fallas",
    results: "Resultado de sesion",
    restart: "Haz otra pasada de recuerdo",
  },
  zh: {
    eyebrow: "回忆通道",
    title: "Quiz 用来做快速识别检查，不是完整复习。",
    description:
      "Quiz 应该短而利落。先读题型线索，再选匹配的方法，然后确认这个主题为什么属于这个方法。",
    currentCheck: "当前检查",
    answerReview: "答案复盘",
    whyThisAnswer: "为什么这个答案对",
    nextStep: "如果做错了",
    results: "本轮结果",
    restart: "再做一轮回忆",
  },
} as const;

export function RecognitionQuiz({ cards, initialCardId }: RecognitionQuizProps) {
  const { locale, t } = useLanguage();
  const ui = quizCopy[locale] ?? quizCopy.en;
  const [courseFilter, setCourseFilter] = useState<"All" | string>("All");
  const [unitFilter, setUnitFilter] = useState<"All" | Unit>("All");
  const [coreOnly, setCoreOnly] = useState(true);
  const [index, setIndex] = useState(0);
  const [focusId, setFocusId] = useState<string | null>(initialCardId ?? null);
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
  const visibleCards = coreOnly
    ? filteredCards.filter((card) => !isOptionalCard(card))
    : filteredCards;
  const unitOptions = getUnitOptions(courseScopedCards);
  const quizItems = buildQuizItems(visibleCards, locale);

  const currentItem = quizItems[index];
  const currentCard = visibleCards[index];
  const finished = index >= quizItems.length;
  const quizDrill =
    currentCard ? buildBubblegumDrill(currentCard, locale, "quiz", 0) : undefined;

  useEffect(() => {
    if (!focusId) {
      return;
    }

    const focusCard = localizedCards.find((card) => card.id === focusId);

    if (!focusCard) {
      setFocusId(null);
      return;
    }

    if (courseFilter !== focusCard.course) {
      setCourseFilter(focusCard.course);
      setUnitFilter(focusCard.unit as Unit);
      resetSession();
      return;
    }

    if (unitFilter !== focusCard.unit) {
      setUnitFilter(focusCard.unit as Unit);
      resetSession();
      return;
    }

    const focusedIndex = visibleCards.findIndex((card) => card.id === focusId);

    if (focusedIndex >= 0) {
      setIndex(focusedIndex);
      setFocusId(null);
    }
  }, [courseFilter, focusId, localizedCards, unitFilter, visibleCards]);

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
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,32rem)] xl:items-end">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              {ui.eyebrow}
            </p>
            <h1 className="font-display text-4xl text-slate-900 sm:text-5xl">
              {ui.title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              {ui.description}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={courseFilter}
              onChange={(event) => {
                setCourseFilter(event.target.value);
                setUnitFilter("All");
                resetSession();
              }}
              className="w-full min-w-0 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">{t("allCourses")}</option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {getCourseDisplayLabel(course, locale)}
                </option>
              ))}
            </select>
            <select
              value={unitFilter}
              onChange={(event) => {
                setUnitFilter(event.target.value as "All" | Unit);
                resetSession();
              }}
              className="w-full min-w-0 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">{t("allUnits")}</option>
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-slate-900 sm:col-span-2 xl:justify-self-start">
              <input
                type="checkbox"
                checked={coreOnly}
                onChange={(event) => {
                  setCoreOnly(event.target.checked);
                  resetSession();
                }}
                className="h-4 w-4 rounded border-[color:var(--line)] text-sky-700"
              />
              <span>{t("currentSyllabusOnly")}</span>
            </label>
            <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/80 px-5 py-4 text-sm text-[color:var(--muted)] sm:col-span-2 xl:justify-self-start">
              {t("score")}: <span className="font-semibold text-slate-900">{score}</span>
              {!finished ? (
                <>
                  {" "}
                  · {index + 1} / <span className="font-semibold text-slate-900">{quizItems.length}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {quizItems.length === 0 ? (
        <section className="bubble-shadow rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-8 text-center">
          <p className="text-base text-[color:var(--muted)]">{t("noQuizCards")}</p>
        </section>
      ) : finished ? (
        <section className="bubble-shadow rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            {ui.results}
          </p>
          <h2 className="mt-4 font-display text-4xl text-slate-900">
            {score} / {quizItems.length}
          </h2>
          <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
            {score === quizItems.length ? t("sessionComplete") : t("studyThenRetry")}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-sky-900 hover:!text-white"
          >
            {ui.restart}
          </button>
        </section>
      ) : (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,24rem)]">
          <div className="bubble-shadow rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              <span>{ui.currentCheck}</span>
              <span>{currentItem.unit}</span>
              {currentItem.courseCode ? <span>{currentItem.courseCode}</span> : null}
            </div>

            <div className="mt-6 rounded-[1.75rem] bg-slate-950 px-5 py-5 text-sky-50">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
                {t("problemCue")}
              </p>
              <p className="mt-3 font-mono text-[1rem] leading-8">{currentItem.prompt}</p>
            </div>

            <div className="mt-6 grid gap-3">
              {currentItem.options.map((option) => {
                const isCorrect = option === currentItem.answer;
                const isChosen = option === selected;
                const resolved = selected
                  ? isCorrect
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : isChosen
                      ? "border-rose-300 bg-rose-50 text-rose-900"
                      : "border-[color:var(--line)] bg-white text-slate-700"
                  : "border-[color:var(--line)] bg-white text-slate-900 hover:border-sky-200";

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => choose(option)}
                    className={`rounded-[1.4rem] border px-4 py-4 text-left text-sm font-semibold leading-6 transition ${resolved}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selected ? (
              <div className="mt-6 space-y-4">
                <div className="rounded-[1.55rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {ui.answerReview}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-900">
                    <span className="font-semibold">{currentItem.topic}:</span> {currentItem.answer}
                  </p>
                  <div className="mt-4 rounded-[1.2rem] border border-sky-100 bg-white px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {ui.whyThisAnswer}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{quizDrill?.whyFits}</p>
                  </div>
                  <div className="mt-4 rounded-[1.2rem] border border-rose-100 bg-rose-50/70 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
                      {ui.nextStep}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {selected === currentItem.answer ? currentCard?.rememberThis : currentCard?.doThis}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-sky-900 hover:!text-white"
                  >
                    {t("next")}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="space-y-4">
            <section className="bubble-shadow rounded-[1.85rem] border border-[color:var(--line)] bg-white/92 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                {t("memoryHook")}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{currentItem.hint}</p>
            </section>

            {currentCard && quizDrill ? (
              <section className="bubble-shadow rounded-[1.85rem] border border-[color:var(--line)] bg-white/92 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {t("studyThis")}
                </p>
                <div className="mt-4">
                  <WorkedExamplePhoto
                    card={currentCard}
                    problem={quizDrill.prompt}
                    firstMove={quizDrill.firstStep}
                    setup={quizDrill.setup}
                    steps={quizDrill.fullPath}
                    answer={quizDrill.answer}
                    caption={`${currentCard.name} · Quiz`}
                  />
                </div>
              </section>
            ) : null}
          </aside>
        </section>
      )}
    </div>
  );
}

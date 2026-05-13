"use client";

import { useEffect, useMemo, useState } from "react";

import { MathConceptVisual } from "@/components/math-concept-visual";
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
import {
  BUBBLE_PROGRESS_EVENT,
  getBubblegumPrimaryMissType,
  getBubblegumPriorityScore,
  getBubblegumStudyState,
  getBubblegumTopicProgressMap,
  type BubblegumMissType,
  type BubblegumTopicProgress,
} from "@/lib/progress";
import {
  getPatternTokens,
  getRecognitionPrompt,
  getTechniqueLabel,
} from "@/lib/recognition";

interface StudyModeProps {
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

const studyCopy = {
  en: {
    eyebrow: "Study workspace",
    title: "Review one topic with enough structure to actually learn it.",
    description:
      "Study Mode is the main review surface. Pick a course, stay inside one unit, and work through the topic signal, the review move, the trap, and one starter drill before you move on.",
    currentFocus: "Current focus",
    reviewNow: "Review now",
    whyThisTopic: "Why this topic matters",
    mistakeToAvoid: "Mistake to avoid",
    starterDrill: "Starter drill",
    workedSupport: "Worked support",
    topicSignals: "Topic signals",
    sessionList: "Session list",
    sessionHelp:
      "Use this list to stay inside one review block instead of bouncing around the whole site.",
    progress: "Session progress",
    primaryTag: "Main review move",
    referenceCard: "Reference card",
    solveSupport: "Solve support",
    recognitionSupport: "Recognition support",
    setupSupport: "Setup support",
    executionSupport: "Execution support",
    proofSupport: "Proof support",
    repair: "Repair",
    review: "Review",
    stable: "Stable",
    fresh: "New",
  },
  es: {
    eyebrow: "Espacio de estudio",
    title: "Repasa un tema con suficiente estructura para aprenderlo de verdad.",
    description:
      "Modo de estudio es la superficie principal de repaso. Elige un curso, mantente en una unidad y trabaja la senal del problema, el enfoque de repaso, la trampa y un ejercicio inicial antes de pasar al siguiente.",
    currentFocus: "Enfoque actual",
    reviewNow: "Repasa ahora",
    whyThisTopic: "Por que importa este tema",
    mistakeToAvoid: "Error a evitar",
    starterDrill: "Ejercicio inicial",
    workedSupport: "Apoyo resuelto",
    topicSignals: "Senales del tema",
    sessionList: "Lista de sesion",
    sessionHelp:
      "Usa esta lista para quedarte dentro de un bloque de repaso en lugar de saltar por todo el sitio.",
    progress: "Progreso de sesion",
    primaryTag: "Movimiento principal",
    referenceCard: "Ficha de referencia",
    solveSupport: "Apoyo para resolver",
    recognitionSupport: "Apoyo de reconocimiento",
    setupSupport: "Apoyo de planteamiento",
    executionSupport: "Apoyo de ejecucion",
    proofSupport: "Apoyo de prueba",
    repair: "Reparar",
    review: "Repasar",
    stable: "Estable",
    fresh: "Nuevo",
  },
  zh: {
    eyebrow: "学习工作区",
    title: "一次只复习一个主题，但结构要足够完整。",
    description:
      "Study Mode 是主要复习页面。先选课程，再锁定单元，然后依次看题型信号、复习重点、常见陷阱和一个起步练习，再进入下一个主题。",
    currentFocus: "当前重点",
    reviewNow: "现在先复习",
    whyThisTopic: "这个主题为什么重要",
    mistakeToAvoid: "要避开的错误",
    starterDrill: "起步练习",
    workedSupport: "参考解法",
    topicSignals: "题型信号",
    sessionList: "本轮列表",
    sessionHelp: "用这个列表把复习限制在一个小范围内，不要在整站里来回跳。",
    progress: "本轮进度",
    primaryTag: "核心复习动作",
    referenceCard: "参考卡片",
    solveSupport: "解题支持",
    recognitionSupport: "识别支持",
    setupSupport: "起手支持",
    executionSupport: "执行支持",
    proofSupport: "证明支持",
    repair: "补弱",
    review: "复习",
    stable: "稳定",
    fresh: "新主题",
  },
} as const;

export function StudyMode({ cards, initialCardId }: StudyModeProps) {
  const { difficultyLabel, locale, t } = useLanguage();
  const ui = studyCopy[locale] ?? studyCopy.en;
  const [courseFilter, setCourseFilter] = useState<"All" | string>("All");
  const [unitFilter, setUnitFilter] = useState<"All" | Unit>("All");
  const [coreOnly, setCoreOnly] = useState(true);
  const [index, setIndex] = useState(0);
  const [focusId, setFocusId] = useState<string | null>(initialCardId ?? null);
  const [progressMap, setProgressMap] = useState<Record<string, BubblegumTopicProgress>>({});
  const localizedCards = useMemo(() => localizeCards(cards, locale), [cards, locale]);
  const courseOptions = getCourseOptions(localizedCards);

  useEffect(() => {
    const sync = () => {
      setProgressMap(getBubblegumTopicProgressMap());
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(BUBBLE_PROGRESS_EVENT, sync as EventListener);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(BUBBLE_PROGRESS_EVENT, sync as EventListener);
    };
  }, []);

  const courseScopedCards =
    courseFilter === "All"
      ? localizedCards
      : localizedCards.filter((card) => card.course === courseFilter);
  const filteredCards =
    unitFilter === "All"
      ? courseScopedCards
      : courseScopedCards.filter((card) => card.unit === unitFilter);
  const visibleCards = (coreOnly
    ? filteredCards.filter((card) => !isOptionalCard(card))
    : filteredCards).sort((left, right) => {
      const leftProgress = progressMap[left.id] ?? { gotIt: 0, missedIt: 0 };
      const rightProgress = progressMap[right.id] ?? { gotIt: 0, missedIt: 0 };
      const priorityDiff =
        getBubblegumPriorityScore(rightProgress) -
        getBubblegumPriorityScore(leftProgress);

      return priorityDiff || left.order - right.order;
    });
  const unitOptions = getUnitOptions(courseScopedCards);
  const currentCard = visibleCards[index] ?? visibleCards[0];

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
      setIndex(0);
      return;
    }

    if (unitFilter !== focusCard.unit) {
      setUnitFilter(focusCard.unit as Unit);
      setIndex(0);
      return;
    }

    const focusedIndex = visibleCards.findIndex((card) => card.id === focusId);

    if (focusedIndex >= 0) {
      setIndex(focusedIndex);
      setFocusId(null);
    }
  }, [courseFilter, focusId, localizedCards, unitFilter, visibleCards]);

  if (!currentCard) {
    return null;
  }

  const studyDrill = buildBubblegumDrill(currentCard, locale, "warmup", 0);
  const nearbyCards = visibleCards.slice(Math.max(0, index - 2), index + 5);
  const currentMissType = getBubblegumPrimaryMissType(
    progressMap[currentCard.id] ?? { gotIt: 0, missedIt: 0 },
  );

  function stateLabel(cardId: string) {
    const state = getBubblegumStudyState(
      progressMap[cardId] ?? { gotIt: 0, missedIt: 0 },
    );

    if (state === "repair") return ui.repair;
    if (state === "review") return ui.review;
    if (state === "stable") return ui.stable;
    return ui.fresh;
  }

  function move(delta: number) {
    const nextIndex = (index + delta + visibleCards.length) % visibleCards.length;
    setIndex(nextIndex);
  }

  function getSolveSupport(type: BubblegumMissType | undefined) {
    if (type === "recognition") {
      return {
        title: ui.recognitionSupport,
        body: currentCard.looksLike,
      };
    }

    if (type === "setup") {
      return {
        title: ui.setupSupport,
        body: studyDrill.setup,
      };
    }

    if (type === "execution") {
      return {
        title: ui.executionSupport,
        body: studyDrill.fullPath[0] ?? studyDrill.firstStep,
      };
    }

    if (type === "proof") {
      return {
        title: ui.proofSupport,
        body: `${currentCard.useItWhen}. ${currentCard.thinkOfItAs}`,
      };
    }

    return {
      title: ui.solveSupport,
      body: `${studyDrill.firstStep}. ${studyDrill.setup}`,
    };
  }

  const solveSupport = getSolveSupport(currentMissType);

  return (
    <div className="space-y-8">
      <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 sm:p-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] xl:items-end">
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
                setIndex(0);
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
                setIndex(0);
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
            <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-slate-900 sm:col-span-2">
              <input
                type="checkbox"
                checked={coreOnly}
                onChange={(event) => {
                  setCoreOnly(event.target.checked);
                  setIndex(0);
                }}
                className="h-4 w-4 rounded border-[color:var(--line)] text-sky-700"
              />
              <span>{t("currentSyllabusOnly")}</span>
            </label>
            <div className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-[color:var(--muted)]">
              {ui.progress}: {index + 1} / {visibleCards.length}
            </div>
            <div className="rounded-2xl border border-[color:var(--line)] bg-sky-50 px-4 py-3 text-sm text-sky-950">
              {ui.primaryTag}: {getTechniqueLabel(currentCard, locale)}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(17rem,20rem)_minmax(0,1fr)]">
        <aside className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            {ui.sessionList}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
            {ui.sessionHelp}
          </p>
          <div className="mt-5 space-y-3">
            {nearbyCards.map((card) => {
              const selected = card.id === currentCard.id;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setIndex(visibleCards.findIndex((item) => item.id === card.id))}
                  className={`w-full rounded-[1.4rem] border px-4 py-4 text-left transition ${
                    selected
                      ? "border-sky-200 bg-sky-50"
                      : "border-[color:var(--line)] bg-[color:var(--surface)] hover:border-sky-200 hover:bg-white"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {card.unit}
                  </p>
                  <h2 className="mt-2 text-base font-semibold text-slate-900">{card.name}</h2>
                  <div className="mt-2 inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                    {stateLabel(card.id)}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {getTechniqueLabel(card, locale)}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="bubble-shadow rounded-[2.25rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            <span>{ui.currentFocus}</span>
            <span>{getCourseDisplayLabel(currentCard.course, locale)}</span>
            <span>{currentCard.unit}</span>
            <span className="rounded-full bg-sky-100 px-3 py-1 tracking-normal">
              {difficultyLabel(currentCard.difficulty)}
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,24rem)]">
            <div className="space-y-5">
              <div className="rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,249,255,0.92))] p-6">
                <MathConceptVisual card={currentCard} mode="card" />
                <h2 className="mt-4 font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
                  {currentCard.name}
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                  {currentCard.memoryHook}
                </p>
              </div>

              <div className="rounded-[1.6rem] bg-slate-950 px-5 py-5 text-sky-50">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
                  {t("problemCue")}
                </p>
                <p className="mt-3 font-mono text-[1rem] leading-8">
                  {getRecognitionPrompt(currentCard)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {getPatternTokens(currentCard).map((token, index) => (
                    <span
                      key={`${token}-${index}`}
                      className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-2 font-mono text-xs text-sky-100"
                    >
                      {token}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.5rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(214,255,232,0.76),rgba(255,255,255,0.96))] p-4">
                  <p className="text-sm font-semibold text-emerald-800">{ui.reviewNow}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">{studyDrill.firstStep}</p>
                </div>
                <div className="rounded-[1.5rem] border border-rose-100 bg-rose-50/70 p-4">
                  <p className="text-sm font-semibold text-rose-600">{ui.mistakeToAvoid}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{currentCard.watchOutFor}</p>
                </div>
                <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-4">
                  <p className="text-sm font-semibold text-sky-700">{ui.whyThisTopic}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{currentCard.useItWhen}</p>
                </div>
                <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-4">
                  <p className="text-sm font-semibold text-sky-700">{t("thinkOfItAs")}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{currentCard.thinkOfItAs}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50/80 p-4">
                <p className="text-sm font-semibold text-sky-700">{solveSupport.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-800">{solveSupport.body}</p>
              </div>

              <details className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4" open>
                <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 [&::-webkit-details-marker]:hidden">
                  {ui.workedSupport}
                </summary>
                <div className="mt-4">
                  <WorkedExamplePhoto
                    card={currentCard}
                    problem={studyDrill.prompt}
                    solveEntry={studyDrill.firstStep}
                    setup={studyDrill.setup}
                    steps={studyDrill.fullPath}
                    answer={studyDrill.answer}
                    caption={`${currentCard.name} · Warm-up`}
                  />
                </div>
              </details>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {ui.starterDrill}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-800">{studyDrill.prompt}</p>
                <div className="mt-4 rounded-2xl border border-sky-100 bg-white px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {ui.reviewNow}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{studyDrill.firstStep}</p>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {ui.topicSignals}
                </p>
                <div className="mt-3 grid gap-3">
                  {currentCard.typicalProblemShapes.map((shape, index) => (
                    <div
                      key={`${shape}-${index}`}
                      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-sm leading-6 text-slate-700"
                    >
                      {shape}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {ui.referenceCard}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{currentCard.rememberThis}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            <div className="grid grid-cols-2 gap-3 sm:flex">
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
            <div className="rounded-full bg-sky-100 px-5 py-3 text-sm font-semibold text-sky-950">
              {getTechniqueLabel(currentCard, locale)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

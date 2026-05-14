"use client";

import Link from "next/link";
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
  recordBubblegumAttempt,
  type BubblegumMissType,
  type BubblegumTopicProgress,
} from "@/lib/progress";
import { getPatternTokens, getRecognitionPrompt, getTechniqueLabel } from "@/lib/recognition";

interface StudyModeProps {
  cards: BubbleCard[];
  initialCardId?: string;
}

function isOptionalCard(card: BubbleCard) {
  const chapterText = card.chapter.toLowerCase();
  const unitText = card.unit.toLowerCase();

  return (
    chapterText.includes("later / optional") ||
    chapterText.includes("optional") ||
    unitText.includes("later / optional") ||
    unitText.includes("optional") ||
    card.chapter.includes("后续 / 可选") ||
    card.unit.includes("后续 / 可选")
  );
}

const copy = {
  en: {
    eyebrow: "Study workspace",
    title: "Attempt first. Reveal only what you need. Then explain why it works.",
    description:
      "This is the main learning loop: retrieve the structure, compare against the correct path, diagnose the miss, and decide whether the topic is stable or still needs repair.",
    dueQueue: "Due queue",
    dueHelp:
      "Topics are ranked by repair and review pressure, so the next card should deserve your attention.",
    attemptFirst: "Attempt first",
    revealLadder: "Reveal ladder",
    explainIt: "Explain it back",
    diagnosis: "Current diagnosis",
    selfCheck: "Self-check",
    markSolved: "I could solve this",
    sendToRepair: "Send to repair",
    openRepair: "Open Bubblegum",
    openRecall: "Run recall check",
    setup: "Setup",
    fullPath: "Full path",
    answer: "Answer",
    whyFits: "Why this fits",
    explainPrompt: "Say why this method fits before you move on.",
    explanationCue: "Explain this to yourself",
    solvedNote: "Marked as review progress.",
    repairNote: "Marked for repair on this device.",
    repair: "repair",
    review: "review",
    stable: "stable",
    fresh: "new",
    recognition: "recognition",
    setupMiss: "setup",
    execution: "execution",
    proof: "proof",
    noCards: "No cards match the current filter set.",
  },
  es: {
    eyebrow: "Espacio de estudio",
    title: "Primero intenta. Revela solo lo que necesites. Luego explica por qué funciona.",
    description:
      "Este es el bucle principal: recuperar la estructura, compararla con el camino correcto, diagnosticar el fallo y decidir si el tema ya está estable o todavía necesita reparación.",
    dueQueue: "Cola prioritaria",
    dueHelp:
      "Los temas se ordenan por presión de repaso y reparación, así que la siguiente tarjeta debería merecer tu atención.",
    attemptFirst: "Intenta primero",
    revealLadder: "Escalera de revelado",
    explainIt: "Explícatelo",
    diagnosis: "Diagnóstico actual",
    selfCheck: "Autochequeo",
    markSolved: "Sí lo podía resolver",
    sendToRepair: "Mandar a reparación",
    openRepair: "Abrir Bubblegum",
    openRecall: "Hacer chequeo de recuerdo",
    setup: "Planteamiento",
    fullPath: "Camino completo",
    answer: "Respuesta",
    whyFits: "Por qué encaja",
    explainPrompt: "Di por qué este método encaja antes de pasar al siguiente tema.",
    explanationCue: "Explícate esto",
    solvedNote: "Marcado como progreso de repaso.",
    repairNote: "Marcado para reparación en este dispositivo.",
    repair: "reparar",
    review: "repasar",
    stable: "estable",
    fresh: "nuevo",
    recognition: "reconocimiento",
    setupMiss: "planteamiento",
    execution: "ejecución",
    proof: "prueba",
    noCards: "No hay tarjetas con este filtro.",
  },
  zh: {
    eyebrow: "学习工作区",
    title: "先自己做。只展开需要的帮助。然后说清楚为什么这样做。",
    description:
      "这里是主要学习循环：先回忆结构，再和正确路径对照，判断自己错在什么地方，最后决定这个主题是稳定了还是还要补弱。",
    dueQueue: "优先队列",
    dueHelp: "主题按补弱和复习压力排序，所以下一个应该是现在最值得盯住的内容。",
    attemptFirst: "先尝试",
    revealLadder: "展开梯子",
    explainIt: "自己讲一遍",
    diagnosis: "当前诊断",
    selfCheck: "自查",
    markSolved: "我能做出来",
    sendToRepair: "送去补弱",
    openRepair: "打开 Bubblegum",
    openRecall: "做回忆检查",
    setup: "设定",
    fullPath: "完整路径",
    answer: "答案",
    whyFits: "为什么适用",
    explainPrompt: "在进入下一个主题前，先说清楚为什么这里该用这个方法。",
    explanationCue: "这样给自己解释",
    solvedNote: "已记为复习进展。",
    repairNote: "已记为本设备上的补弱主题。",
    repair: "补弱",
    review: "复习",
    stable: "稳定",
    fresh: "新主题",
    recognition: "识别",
    setupMiss: "起手设定",
    execution: "执行",
    proof: "证明结构",
    noCards: "当前筛选下没有卡片。",
  },
} as const;

export function StudyMode({ cards, initialCardId }: StudyModeProps) {
  const { locale } = useLanguage();
  const ui = copy[locale] ?? copy.en;
  const [courseFilter, setCourseFilter] = useState<"All" | string>("All");
  const [unitFilter, setUnitFilter] = useState<"All" | Unit>("All");
  const [coreOnly, setCoreOnly] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(initialCardId ?? null);
  const [progressMap, setProgressMap] = useState<Record<string, BubblegumTopicProgress>>({});
  const [showSetup, setShowSetup] = useState(false);
  const [showPath, setShowPath] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [statusNote, setStatusNote] = useState<string | null>(null);
  const localizedCards = useMemo(() => localizeCards(cards, locale), [cards, locale]);

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

  const courseOptions = getCourseOptions(localizedCards);
  const courseScoped =
    courseFilter === "All"
      ? localizedCards
      : localizedCards.filter((card) => card.course === courseFilter);
  const unitOptions = getUnitOptions(courseScoped);
  const unitScoped =
    unitFilter === "All" ? courseScoped : courseScoped.filter((card) => card.unit === unitFilter);
  const visibleCards = [...(coreOnly ? unitScoped.filter((card) => !isOptionalCard(card)) : unitScoped)].sort(
    (left, right) => {
      const leftProgress = progressMap[left.id] ?? { gotIt: 0, missedIt: 0 };
      const rightProgress = progressMap[right.id] ?? { gotIt: 0, missedIt: 0 };
      const priorityDiff =
        getBubblegumPriorityScore(rightProgress) - getBubblegumPriorityScore(leftProgress);

      return priorityDiff || left.order - right.order;
    },
  );

  useEffect(() => {
    if (!selectedId && visibleCards[0]) {
      setSelectedId(visibleCards[0].id);
      return;
    }

    if (selectedId && !visibleCards.some((card) => card.id === selectedId)) {
      setSelectedId(visibleCards[0]?.id ?? null);
    }
  }, [selectedId, visibleCards]);

  const currentCard = visibleCards.find((card) => card.id === selectedId) ?? visibleCards[0];

  useEffect(() => {
    setShowSetup(false);
    setShowPath(false);
    setShowAnswer(false);
    setShowWhy(false);
    setStatusNote(null);
  }, [currentCard?.id]);

  if (!currentCard) {
    return (
      <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/92 p-8 text-center text-[color:var(--muted)]">
        {ui.noCards}
      </section>
    );
  }

  const drill = buildBubblegumDrill(currentCard, locale, "warmup", 0);
  const progress = progressMap[currentCard.id] ?? { gotIt: 0, missedIt: 0 };
  const missType = getBubblegumPrimaryMissType(progress);

  function stateLabel(cardId: string) {
    const state = getBubblegumStudyState(progressMap[cardId] ?? { gotIt: 0, missedIt: 0 });

    if (state === "repair") return ui.repair;
    if (state === "review") return ui.review;
    if (state === "stable") return ui.stable;
    return ui.fresh;
  }

  function missLabel(type: BubblegumMissType | null) {
    if (type === "recognition") return ui.recognition;
    if (type === "setup") return ui.setupMiss;
    if (type === "execution") return ui.execution;
    if (type === "proof") return ui.proof;
    return null;
  }

  function markSolved() {
    recordBubblegumAttempt(currentCard.id, "gotIt");
    setStatusNote(ui.solvedNote);
  }

  function markRepair() {
    recordBubblegumAttempt(currentCard.id, "missedIt", missType ?? "setup");
    setStatusNote(ui.repairNote);
  }

  return (
    <div className="space-y-8">
      <section className="paper-panel bubble-shadow rounded-[2.2rem] border border-[color:var(--line)] p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:items-end">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white/82 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#4156d8]">
              {ui.eyebrow}
            </p>
            <h1 className="ink-title font-display text-4xl text-slate-950 sm:text-5xl">
              {ui.title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              {ui.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
              className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">All courses</option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {getCourseDisplayLabel(course, locale)}
                </option>
              ))}
            </select>
            <select
              value={unitFilter}
              onChange={(event) => setUnitFilter(event.target.value as "All" | Unit)}
              className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">All units</option>
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
                onChange={(event) => setCoreOnly(event.target.checked)}
                className="h-4 w-4"
              />
              <span>Current syllabus only</span>
            </label>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="bubble-shadow rounded-[1.9rem] border border-[color:var(--line)] bg-white/92 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
            {ui.dueQueue}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{ui.dueHelp}</p>
          <div className="mt-5 space-y-3">
            {visibleCards.slice(0, 9).map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setSelectedId(card.id)}
                className={`w-full rounded-[1.35rem] border px-4 py-4 text-left transition ${
                  card.id === currentCard.id
                    ? "border-[#8da2ff] bg-[#eef1ff]"
                    : "border-[color:var(--line)] bg-[color:var(--surface)] hover:border-[#8da2ff]"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                  {getCourseDisplayLabel(card.course, locale, { includeCode: false })}
                </p>
                <h2 className="mt-2 text-base font-semibold text-slate-950">{card.name}</h2>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  {getTechniqueLabel(card, locale)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                    {stateLabel(card.id)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <article className="bubble-shadow rounded-[2.1rem] border border-[color:var(--line)] bg-white/94 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,22rem)]">
            <div className="space-y-5">
              <div className="rounded-[1.85rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,241,255,0.9))] p-5">
                <MathConceptVisual card={currentCard} mode="card" />
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                  <span>{getCourseDisplayLabel(currentCard.course, locale)}</span>
                  <span>{currentCard.unit}</span>
                  {missLabel(missType) ? (
                    <span className="rounded-full bg-white px-3 py-1 tracking-normal text-slate-700">
                      {ui.diagnosis}: {missLabel(missType)}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-4 font-display text-4xl leading-tight text-slate-950">
                  {currentCard.name}
                </h2>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  {currentCard.memoryHook}
                </p>
              </div>

              <div className="rounded-[1.7rem] bg-slate-950 px-5 py-5 text-sky-50">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
                  {ui.attemptFirst}
                </p>
                <p className="mt-3 font-mono text-[0.98rem] leading-8">
                  {getRecognitionPrompt(currentCard)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {getPatternTokens(currentCard).slice(0, 4).map((token, index) => (
                    <span
                      key={`${token}-${index}`}
                      className="rounded-full border border-sky-300/25 bg-sky-400/10 px-3 py-2 font-mono text-xs text-sky-100"
                    >
                      {token}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-[#f8fbff] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                  {ui.revealLadder}
                </p>
                <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
                  <button
                    type="button"
                    onClick={() => setShowSetup((value) => !value)}
                    className="rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-slate-900"
                  >
                    {ui.setup}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPath((value) => !value)}
                    className="rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-slate-900"
                  >
                    {ui.fullPath}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAnswer((value) => !value)}
                    className="rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-slate-900"
                  >
                    {ui.answer}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWhy((value) => !value)}
                    className="rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-slate-900"
                  >
                    {ui.whyFits}
                  </button>
                </div>

                <div className="mt-4 grid gap-4">
                  {showSetup ? (
                    <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                        {ui.setup}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-800">{drill.setup}</p>
                    </div>
                  ) : null}
                  {showPath ? (
                    <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                        {ui.fullPath}
                      </p>
                      <ol className="mt-3 grid gap-2">
                        {drill.fullPath.map((step, index) => (
                          <li
                            key={`${step}-${index}`}
                            className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2 text-sm leading-6 text-slate-800"
                          >
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                  {showAnswer ? (
                    <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                        {ui.answer}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-800">{drill.answer}</p>
                    </div>
                  ) : null}
                  {showWhy ? (
                    <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                        {ui.whyFits}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-800">{drill.whyFits}</p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="diagnostic-panel rounded-[1.6rem] border border-[color:var(--line)] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                  {ui.explainIt}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-900">{ui.explainPrompt}</p>
                <div className="mt-4 rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                    {ui.explanationCue}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">
                    {drill.nextLookFor}
                  </p>
                </div>
                <div className="mt-4 rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                    {ui.selfCheck}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">{drill.selfCheck}</p>
                </div>
              </div>

              <WorkedExamplePhoto
                card={currentCard}
                problem={drill.prompt}
                solveEntry={drill.firstStep}
                setup={drill.setup}
                steps={drill.fullPath}
                answer={drill.answer}
                caption={`${currentCard.name} · Warm-up`}
              />
            </div>

            <aside className="space-y-4">
              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                  Method
                </p>
                <p className="mt-3 text-xl font-semibold text-slate-950">
                  {getTechniqueLabel(currentCard, locale)}
                </p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {currentCard.useItWhen}
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                  Solve structure
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-800">{drill.firstStep}</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {currentCard.watchOutFor}
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white p-5">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={markSolved}
                    className="flex-1 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
                  >
                    {ui.markSolved}
                  </button>
                  <button
                    type="button"
                    onClick={markRepair}
                    className="flex-1 rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-slate-900"
                  >
                    {ui.sendToRepair}
                  </button>
                </div>
                {statusNote ? (
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{statusNote}</p>
                ) : null}
              </div>

              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white p-5">
                <div className="grid gap-3">
                  <Link
                    href={`/bubblegum/${currentCard.id}`}
                    className="rounded-full bg-[#4156d8] px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    {ui.openRepair}
                  </Link>
                  <Link
                    href={`/quiz?focus=${currentCard.id}`}
                    className="rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900"
                  >
                    {ui.openRecall}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </section>
    </div>
  );
}

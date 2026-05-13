"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { WorkedExamplePhoto } from "@/components/worked-example-photo";
import { localizeCard } from "@/content/localization";
import type { BubbleCard } from "@/content/schema";
import { getCourseDisplayLabel } from "@/lib/course-catalog";
import { buildBubblegumDrill, type BubblegumLevel } from "@/lib/bubblegum";
import {
  BUBBLE_PROGRESS_EVENT,
  getBubblegumPrimaryMissType,
  getBubblegumTopicProgress,
  recordBubblegumAttempt,
  isBubblegumTopicMastered,
  setBubblegumTopicMastered,
  type BubblegumMissType,
} from "@/lib/progress";

interface BubblegumModeProps {
  card: BubbleCard;
}

type Outcome = "gotIt" | "missedIt";

function softnessLabel(level: number) {
  return "●".repeat(level) + "○".repeat(Math.max(0, 5 - level));
}

const levelOrder: BubblegumLevel[] = ["warmup", "quiz", "midterm", "final"];

const bubblegumCopy = {
  en: {
    warmup: "Warm-up",
    quiz: "Quiz style",
    midterm: "Midterm style",
    final: "Final style",
    actualProblem: "Actual problem",
    whyFits: "Why this fits",
    notationHelp: "Notation help",
    revealTechnique: "Reveal technique",
    revealSolveEntry: "Reveal solve entry",
    revealSetup: "Reveal setup",
    revealPath: "Reveal full path",
    revealAnswer: "Reveal answer",
    solutionPath: "Solution path",
    answer: "Answer",
    commonMiss: "Common miss",
    selfCheck: "Self-check",
    missedBecause: "Why you likely missed it",
    missTypePrompt: "What kind of miss was it?",
    recognition: "I did not recognize it",
    setupMiss: "I knew the topic but not the setup",
    execution: "I set it up but lost the execution",
    proof: "I knew the idea but not the proof structure",
    nextLookFor: "Next time look for this",
    recoveryPlan: "Recovery plan",
    recoveryDrill: "Micro-drill",
    recoveryChecklist: "Do this next",
    recognitionPlan: "Recognition reset",
    setupPlan: "Setup reset",
    executionPlan: "Execution reset",
    proofPlan: "Proof reset",
    gotIt: "I got it",
    missedIt: "I missed it",
    chewAnother: "Chew another problem",
    tryItFirst:
      "Treat this like a real quiz or midterm prompt. Work it out first, then reveal as much help as you need.",
    gotItHelp: "Good. Keep the steps tight and try the next variation.",
    missedItHelp: "Use the path below, then chew one more problem from the same set.",
  },
  es: {
    warmup: "Calentamiento",
    quiz: "Estilo quiz",
    midterm: "Estilo parcial",
    final: "Estilo final",
    actualProblem: "Problema real",
    whyFits: "Por que va aqui",
    notationHelp: "Ayuda de notacion",
    revealTechnique: "Mostrar tecnica",
    revealSolveEntry: "Mostrar entrada de resolucion",
    revealSetup: "Mostrar planteamiento",
    revealPath: "Mostrar camino completo",
    revealAnswer: "Mostrar respuesta",
    solutionPath: "Camino de solucion",
    answer: "Respuesta",
    commonMiss: "Error tipico",
    selfCheck: "Autochequeo",
    missedBecause: "Por que probablemente fallaste",
    missTypePrompt: "Que tipo de fallo fue?",
    recognition: "No reconoci el patron",
    setupMiss: "Reconoci el tema pero no el planteamiento",
    execution: "Plantee bien pero falle la ejecucion",
    proof: "Sabia la idea pero no la estructura de la prueba",
    nextLookFor: "La proxima vez busca esto",
    recoveryPlan: "Plan de recuperacion",
    recoveryDrill: "Micropractica",
    recoveryChecklist: "Haz esto ahora",
    recognitionPlan: "Reinicio de reconocimiento",
    setupPlan: "Reinicio de planteamiento",
    executionPlan: "Reinicio de ejecucion",
    proofPlan: "Reinicio de prueba",
    gotIt: "Lo saque",
    missedIt: "Lo falle",
    chewAnother: "Masticar otro problema",
    tryItFirst:
      "Tratalo como un quiz, parcial o final real. Intentalo primero y revela ayuda solo cuando la necesites.",
    gotItHelp: "Bien. Mantén los pasos limpios y pasa a otra variacion.",
    missedItHelp: "Usa el camino de solucion y luego mastica otra variacion del mismo tema.",
  },
  zh: {
    warmup: "热身题型",
    quiz: "小测题型",
    midterm: "期中题型",
    final: "期末题型",
    actualProblem: "真实题目",
    whyFits: "为什么是这类题",
    notationHelp: "符号提示",
    revealTechnique: "显示方法",
    revealSolveEntry: "显示解题入口",
    revealSetup: "显示列式",
    revealPath: "显示完整思路",
    revealAnswer: "显示答案",
    solutionPath: "解题路径",
    answer: "答案",
    commonMiss: "常见失误",
    selfCheck: "自查",
    missedBecause: "这次为什么容易错",
    missTypePrompt: "这次错在什么地方？",
    recognition: "我没有先认出题型",
    setupMiss: "我知道主题，但不会起手设定",
    execution: "我会列式，但中间算崩了",
    proof: "我懂想法，但不会组织证明",
    nextLookFor: "下次先看这个",
    recoveryPlan: "补救计划",
    recoveryDrill: "微型练习",
    recoveryChecklist: "接下来这样做",
    recognitionPlan: "识别重置",
    setupPlan: "起手重置",
    executionPlan: "执行重置",
    proofPlan: "证明重置",
    gotIt: "我做出来了",
    missedIt: "我没做出来",
    chewAnother: "再嚼一题",
    tryItFirst: "把它当成真的小测、期中或期末题。先自己做，再按需要一点点展开提示。",
    gotItHelp: "很好。继续把步骤压紧，再做下一题。",
    missedItHelp: "先顺着下面的解题路径过一遍，再嚼同主题的下一题。",
  },
} as const;

export function BubblegumMode({ card }: BubblegumModeProps) {
  const { locale, t } = useLanguage();
  const localizedCard = useMemo(() => localizeCard(card, locale), [card, locale]);
  const ui = bubblegumCopy[locale] ?? bubblegumCopy.en;

  const [level, setLevel] = useState<BubblegumLevel>("quiz");
  const [variant, setVariant] = useState(0);
  const [chews, setChews] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mastered, setMastered] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [showTechnique, setShowTechnique] = useState(false);
  const [showStep, setShowStep] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [showPath, setShowPath] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [pendingMiss, setPendingMiss] = useState(false);
  const [missType, setMissType] = useState<BubblegumMissType | null>(null);

  useEffect(() => {
    const sync = () => {
      setMastered(isBubblegumTopicMastered(card.id));
      const progress = getBubblegumTopicProgress(card.id);
      setMissType(progress.lastMissType ?? getBubblegumPrimaryMissType(progress) ?? null);
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(BUBBLE_PROGRESS_EVENT, sync as EventListener);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(BUBBLE_PROGRESS_EVENT, sync as EventListener);
    };
  }, [card.id]);

  const drill = useMemo(
    () => buildBubblegumDrill(localizedCard, locale, level, variant),
    [localizedCard, locale, level, variant],
  );
  const softness = Math.max(1, Math.min(5, Math.floor((chews + streak) / 2) + 1));
  const readyToSpit = softness >= 5 && streak >= 3;

  function resetRevealState() {
    setOutcome(null);
    setShowTechnique(false);
    setShowStep(false);
    setShowSetup(false);
    setShowPath(false);
    setShowAnswer(false);
    setPendingMiss(false);
  }

  function changeLevel(nextLevel: BubblegumLevel) {
    setLevel(nextLevel);
    setVariant(0);
    resetRevealState();
  }

  function nextVariation() {
    setVariant((value) => value + 1);
    resetRevealState();
  }

  function finishRecord(nextOutcome: Outcome, selectedMissType?: BubblegumMissType) {
    if (outcome) {
      return;
    }

    setOutcome(nextOutcome);
    setChews((value) => value + 1);
    setShowTechnique(true);
    setShowStep(true);
    setShowSetup(true);
    setShowPath(true);
    setShowAnswer(true);
    recordBubblegumAttempt(card.id, nextOutcome, selectedMissType);

    if (nextOutcome === "gotIt") {
      setStreak((value) => value + 1);
      return;
    }

    setStreak(0);
  }

  function record(nextOutcome: Outcome) {
    if (nextOutcome === "missedIt") {
      setPendingMiss(true);
      setOutcome("missedIt");
      setShowTechnique(true);
      setShowStep(true);
      setShowSetup(true);
      setShowPath(true);
      setShowAnswer(true);
      return;
    }

    finishRecord(nextOutcome);
  }

  function recordMissType(selectedMissType: BubblegumMissType) {
    if (!pendingMiss) {
      return;
    }

    setMissType(selectedMissType);
    setPendingMiss(false);
    setChews((value) => value + 1);
    setStreak(0);
    recordBubblegumAttempt(card.id, "missedIt", selectedMissType);
  }

  function getMissAdvice(type: BubblegumMissType | null) {
    if (type === "recognition") {
      return drill.nextLookFor;
    }

    if (type === "setup") {
      return drill.firstStep;
    }

    if (type === "execution") {
      return drill.setup;
    }

    if (type === "proof") {
      return drill.fullPath[0] ?? drill.firstStep;
    }

    return drill.nextLookFor;
  }

  function getRecoveryPlan(type: BubblegumMissType | null) {
    if (type === "recognition") {
      return {
        title: ui.recognitionPlan,
        body: drill.nextLookFor,
        drill: localizedCard.looksLike,
        checklist: [
          localizedCard.looksLike,
          drill.technique,
          drill.firstStep,
        ],
      };
    }

    if (type === "setup") {
      return {
        title: ui.setupPlan,
        body: drill.firstStep,
        drill: drill.setup,
        checklist: [
          drill.technique,
          drill.firstStep,
          drill.setup,
        ],
      };
    }

    if (type === "execution") {
      return {
        title: ui.executionPlan,
        body: drill.setup,
        drill: drill.fullPath[0] ?? drill.firstStep,
        checklist: [
          drill.setup,
          drill.fullPath[0] ?? drill.firstStep,
          drill.selfCheck,
        ],
      };
    }

    if (type === "proof") {
      return {
        title: ui.proofPlan,
        body: drill.fullPath[0] ?? drill.firstStep,
        drill: localizedCard.useItWhen,
        checklist: [
          localizedCard.useItWhen,
          drill.fullPath[0] ?? drill.firstStep,
          drill.fullPath[1] ?? drill.selfCheck,
        ],
      };
    }

    return {
      title: ui.recoveryPlan,
      body: drill.nextLookFor,
      drill: drill.firstStep,
      checklist: [drill.firstStep, drill.setup, drill.selfCheck],
    };
  }

  function spitItOut() {
    setBubblegumTopicMastered(card.id, true);
    setMastered(true);
  }

  const recoveryPlan = getRecoveryPlan(missType);

  return (
    <div className="space-y-8">
      <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(255,229,239,0.88)_58%,rgba(255,245,251,0.96))] p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
              Bubblegum
            </p>
            <h1 className="font-display text-4xl text-slate-900 sm:text-5xl">
              {t("bubblegumTitle")}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              {ui.tryItFirst}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
              <span>{getCourseDisplayLabel(localizedCard.course, locale)}</span>
              <span>{localizedCard.unit}</span>
              <span>{localizedCard.name}</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/80 bg-white/85 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {t("chewCount")}
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{chews}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/80 bg-white/85 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {t("streak")}
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{streak}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/80 bg-white/85 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {t("softness")}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-[0.24em] text-rose-600">
                {softnessLabel(softness)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
          <Link
            href={`/topics/${card.id}`}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-rose-200"
          >
            {t("backToBubble")}
          </Link>
          {mastered ? (
            <span className="rounded-full bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700">
              {t("bubblegumMastered")}
            </span>
          ) : null}
        </div>
      </section>

      <section className="bubble-shadow rounded-[2.2rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          {levelOrder.map((option) => {
            const active = option === level;

            return (
              <button
                key={option}
                type="button"
                onClick={() => changeLevel(option)}
                className={`inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-rose-600 text-white"
                    : "border border-[color:var(--line)] bg-white text-slate-900 hover:border-rose-200"
                }`}
              >
                {ui[option]}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[1.85rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,244,248,0.94))] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
            {ui.actualProblem}
          </p>
          <p className="mt-4 text-xl leading-8 text-slate-900 sm:text-2xl">
            {drill.prompt}
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-sky-50/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              {ui.whyFits}
            </p>
            <p className="mt-3 text-base leading-7 text-slate-900">{drill.whyFits}</p>
          </div>

          {drill.notationHelp.length > 0 ? (
            <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-amber-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                {ui.notationHelp}
              </p>
              <div className="mt-3 space-y-3 text-sm leading-6 text-slate-900">
                {drill.notationHelp.map((item, index) => (
                  <p key={`${item}-${index}`}>{item}</p>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
          <button
            type="button"
            onClick={() => setShowTechnique(true)}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-rose-200"
          >
            {ui.revealTechnique}
          </button>
          <button
            type="button"
            onClick={() => setShowStep(true)}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-rose-200"
          >
            {ui.revealSolveEntry}
          </button>
          <button
            type="button"
            onClick={() => setShowSetup(true)}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-rose-200"
          >
            {ui.revealSetup}
          </button>
          <button
            type="button"
            onClick={() => setShowPath(true)}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-rose-200"
          >
            {ui.revealPath}
          </button>
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-rose-200"
          >
            {ui.revealAnswer}
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {showTechnique ? (
            <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-rose-50/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
                {t("techniqueToTry")}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-900">{drill.technique}</p>
            </div>
          ) : null}

          {showStep ? (
            <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-emerald-50/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {t("solveEntry")}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-900">{drill.firstStep}</p>
            </div>
          ) : null}

          {showSetup ? (
            <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-sky-50/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                {ui.revealSetup}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-900">{drill.setup}</p>
            </div>
          ) : null}

          <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              {ui.commonMiss}
            </p>
            <p className="mt-3 text-base leading-7 text-slate-900">{drill.commonMiss}</p>
          </div>
        </div>

        {showPath || showAnswer ? (
          <div className="mt-6 space-y-4">
            {showPath ? (
              <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
                  {ui.solutionPath}
                </p>
                <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-900">
                  {drill.fullPath.map((step, index) => (
                    <li key={`${step}-${index}`} className="rounded-2xl bg-white px-4 py-3">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {showAnswer ? (
              <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50/70 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">
                  {ui.answer}
                </p>
                <p className="mt-3 text-base leading-7 text-slate-900">{drill.answer}</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  <span className="font-semibold text-slate-900">{ui.selfCheck}:</span>{" "}
                  {drill.selfCheck}
                </p>
              </div>
            ) : null}

            {outcome === "missedIt" ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50/80 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
                    {ui.missedBecause}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-800">{drill.missedBecause}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-800">
                    <span className="font-semibold text-slate-900">{ui.nextLookFor}:</span>{" "}
                    {getMissAdvice(missType)}
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-sky-200 bg-sky-50/80 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {recoveryPlan.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-800">
                    {recoveryPlan.body}
                  </p>
                  <div className="mt-4 rounded-[1.2rem] border border-sky-100 bg-white px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {ui.recoveryDrill}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-900">
                      {recoveryPlan.drill}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {ui.recoveryChecklist}
                    </p>
                    <div className="mt-3 grid gap-2">
                      {recoveryPlan.checklist.map((item, index) => (
                        <div
                          key={`${item}-${index}`}
                          className="rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm leading-6 text-slate-800"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <WorkedExamplePhoto
              card={localizedCard}
              problem={drill.prompt}
              solveEntry={drill.firstStep}
              setup={drill.setup}
              steps={drill.fullPath}
              answer={drill.answer}
              caption={`${localizedCard.name} · ${ui[level]}`}
            />
          </div>
        ) : null}

        <div className="mt-6 rounded-[1.75rem] border border-[color:var(--line)] bg-white/80 p-5">
          <p className="text-sm leading-6 text-[color:var(--muted)]">{ui.tryItFirst}</p>
          <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={() => record("gotIt")}
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              {ui.gotIt}
            </button>
            <button
              type="button"
              onClick={() => record("missedIt")}
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              {ui.missedIt}
            </button>
          </div>

          {pendingMiss ? (
            <div className="mt-4 rounded-[1.4rem] border border-amber-200 bg-amber-50/80 p-4">
              <p className="text-sm font-semibold text-amber-800">{ui.missTypePrompt}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => recordMissType("recognition")}
                  className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 transition hover:border-amber-300"
                >
                  {ui.recognition}
                </button>
                <button
                  type="button"
                  onClick={() => recordMissType("setup")}
                  className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 transition hover:border-amber-300"
                >
                  {ui.setupMiss}
                </button>
                <button
                  type="button"
                  onClick={() => recordMissType("execution")}
                  className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 transition hover:border-amber-300"
                >
                  {ui.execution}
                </button>
                <button
                  type="button"
                  onClick={() => recordMissType("proof")}
                  className="rounded-[1rem] border border-[color:var(--line)] bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 transition hover:border-amber-300"
                >
                  {ui.proof}
                </button>
              </div>
            </div>
          ) : null}

          {outcome ? (
            <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
              {outcome === "gotIt" ? ui.gotItHelp : ui.missedItHelp}
            </p>
          ) : null}
        </div>

        {mastered ? (
          <div className="mt-6 rounded-[1.75rem] border border-rose-200 bg-rose-50/70 p-5">
            <p className="text-sm font-semibold text-rose-700">{t("bubblegumMastered")}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              {t("bubblegumMasteredHelp")}
            </p>
          </div>
        ) : readyToSpit ? (
          <div className="mt-6 rounded-[1.75rem] border border-rose-200 bg-rose-50/70 p-5">
            <p className="text-sm font-semibold text-rose-700">{t("bubblegumReady")}</p>
            <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
              <button
                type="button"
                onClick={spitItOut}
                className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                {t("spitItOut")}
              </button>
              <button
                type="button"
                onClick={nextVariation}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-rose-200"
              >
                {ui.chewAnother}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={nextVariation}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-rose-700 hover:!text-white sm:w-auto"
          >
            {ui.chewAnother}
          </button>
        )}
      </section>
    </div>
  );
}

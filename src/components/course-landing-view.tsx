"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { localizeCard, localizeCourse } from "@/content/localization";
import type { CourseContent } from "@/content/schema";
import { buildBubblegumDrill } from "@/lib/bubblegum";
import { getCourseDisplayLabel } from "@/lib/course-catalog";
import {
  BUBBLE_PROGRESS_EVENT,
  getBubblegumPrimaryMissType,
  getBubblegumStudyState,
  getBubblegumTopicProgressMap,
  type BubblegumTopicProgress,
} from "@/lib/progress";
import { getGuideCards, type CourseGuide } from "@/lib/course-guides";

interface CourseLandingViewProps {
  course: CourseContent;
  guide?: CourseGuide;
}

const copy = {
  en: {
    examFrame: "Exam frame",
    solveFocus: "Solve focus",
    startToday: "Start here today",
    startTodayHelp:
      "If you have not started this course review yet, do these cards first in order.",
    mostTested: "Most tested patterns",
    mostTestedHelp:
      "These are the patterns most worth being able to recognize cold.",
    weakTopics: "Your weak topics",
    weakTopicsHelp:
      "These come from Bubblegum misses on this device. Use them as your recovery list.",
    noWeakTopics:
      "No weak topics recorded here yet. Misses from Bubblegum will show up here automatically.",
    recoveryLoop: "Recovery loop",
    recoveryBody:
      "When you freeze: read the cue, review the core pattern, then drill until the hesitation disappears.",
    courseMap: "Course map",
    courseMapHelp:
      "Use the core route first. Use the later cards only after the core path starts to feel stable.",
    coreRoute: "Core route",
    laterRoute: "Later / optional",
    openTopic: "Open topic",
    openDrill: "Open drill",
    openQuiz: "Open quiz",
    openStudy: "Open study mode",
    openMemory: "Open memory hooks",
    playbook: "Course plan",
    playbookSteps: [
      "1. Read the exam frame so you know what this class is testing.",
      "2. Use the solve focus to decide what structure to review before you start solving.",
      "3. Work the starter cards, then the most-tested cards, then the weak-topic repair loop.",
    ],
    missedCount: "misses",
    gotCount: "got it",
    starterDrill: "Starter drill",
    reviewPlan: "Review plan",
    reviewPlanBody:
      "This page should tell you what to study first, what to recognize fast, and what to repair before your next exam.",
    courseWorkspace: "Course workspace",
    repair: "repair",
    review: "review",
    stable: "stable",
    fresh: "new",
    missReason: "weak because",
    recognition: "recognition",
    setup: "setup",
    execution: "execution",
    proof: "proof",
  },
  es: {
    examFrame: "Marco de examen",
    solveFocus: "Enfoque de resolucion",
    startToday: "Empieza aqui hoy",
    startTodayHelp:
      "Si aun no has empezado a repasar este curso, haz primero estas tarjetas en orden.",
    mostTested: "Patrones mas examinados",
    mostTestedHelp:
      "Estos son los patrones que mas conviene reconocer sin pensar demasiado.",
    weakTopics: "Tus temas flojos",
    weakTopicsHelp:
      "Esto sale de tus fallos en Bubblegum en este dispositivo. Usalo como lista de recuperacion.",
    noWeakTopics:
      "Todavia no hay temas flojos guardados aqui. Los fallos de Bubblegum apareceran aqui solos.",
    recoveryLoop: "Bucle de recuperacion",
    recoveryBody:
      "Cuando te bloquees: lee la pista, repasa el patron central y luego repite hasta que desaparezca la duda.",
    courseMap: "Mapa del curso",
    courseMapHelp:
      "Haz primero la ruta central. Deja las tarjetas posteriores para despues de estabilizar la base.",
    coreRoute: "Ruta central",
    laterRoute: "Posterior / opcional",
    openTopic: "Abrir tema",
    openDrill: "Abrir practica",
    openQuiz: "Abrir quiz",
    openStudy: "Abrir modo estudio",
    openMemory: "Abrir ganchos",
    playbook: "Plan del curso",
    playbookSteps: [
      "1. Lee el marco de examen para saber que pone a prueba esta clase.",
      "2. Usa el enfoque de resolucion para decidir que estructura repasar antes de empezar a resolver.",
      "3. Haz las tarjetas iniciales, luego las mas examinadas y despues el bucle de reparacion.",
    ],
    missedCount: "fallos",
    gotCount: "aciertos",
    starterDrill: "Practica inicial",
    reviewPlan: "Plan de repaso",
    reviewPlanBody:
      "Esta pagina debe decirte que estudiar primero, que reconocer rapido y que reparar antes del proximo examen.",
    courseWorkspace: "Espacio del curso",
    repair: "reparar",
    review: "repasar",
    stable: "estable",
    fresh: "nuevo",
    missReason: "flojo por",
    recognition: "reconocimiento",
    setup: "planteamiento",
    execution: "ejecucion",
    proof: "prueba",
  },
  zh: {
    examFrame: "考试框架",
    solveFocus: "解题重点",
    startToday: "今天先做这里",
    startTodayHelp: "如果你还没开始复习这门课，就先按顺序做这些卡片。",
    mostTested: "最常考的模式",
    mostTestedHelp: "这些模式最值得练到一眼就能认出来。",
    weakTopics: "你的薄弱主题",
    weakTopicsHelp: "这里来自这台设备上的 Bubblegum 错题记录，可直接当补救清单。",
    noWeakTopics: "这里还没有记录薄弱主题。Bubblegum 的错题会自动出现在这里。",
    recoveryLoop: "补救循环",
    recoveryBody:
      "一旦卡住：先读题目线索，先回到核心模式，再反复练到不再犹豫。",
    courseMap: "课程路线",
    courseMapHelp: "先走核心路线。等核心稳定以后，再去做后面的扩展卡片。",
    coreRoute: "核心路线",
    laterRoute: "后续 / 可选",
    openTopic: "打开主题",
    openDrill: "打开练习",
    openQuiz: "打开测验",
    openStudy: "打开学习模式",
    openMemory: "打开记忆钩子",
    playbook: "课程计划",
    playbookSteps: [
      "1. 先读考试框架，知道这门课到底在考什么。",
      "2. 先按解题重点决定先复习哪种结构，再开始自己做题。",
      "3. 先做起步卡，再做常考卡，最后进入补弱循环。",
    ],
    missedCount: "错题次数",
    gotCount: "做对次数",
    starterDrill: "起步练习",
    reviewPlan: "复习计划",
    reviewPlanBody:
      "这页应该直接告诉你先学什么、要快速识别什么、以及下次考试前要补什么。",
    courseWorkspace: "课程工作区",
    repair: "补弱",
    review: "复习",
    stable: "稳定",
    fresh: "新主题",
    missReason: "薄弱原因",
    recognition: "识别",
    setup: "起手设定",
    execution: "执行",
    proof: "证明结构",
  },
} as const;

function isOptionalCard(chapter: string, unit: string) {
  const chapterText = chapter.toLowerCase();
  const unitText = unit.toLowerCase();

  return (
    chapterText.includes("later / optional") ||
    chapterText.includes("optional") ||
    unitText.includes("later / optional") ||
    unitText.includes("optional") ||
    chapter.includes("Later / Optional") ||
    unit.includes("Later / Optional") ||
    chapter.includes("后续 / 可选") ||
    unit.includes("后续 / 可选") ||
    chapter.includes("opcionales") ||
    unit.includes("opcionales")
  );
}

export function CourseLandingView({ course, guide }: CourseLandingViewProps) {
  const { locale } = useLanguage();
  const ui = copy[locale] ?? copy.en;
  const [progressMap, setProgressMap] = useState<Record<string, BubblegumTopicProgress>>({});

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

  const localizedCourse = useMemo(() => localizeCourse(course, locale), [course, locale]);
  const starterCards = useMemo(
    () =>
      guide
        ? getGuideCards(guide.starterIds).map((card) => localizeCard(card, locale))
        : localizedCourse.cards.slice(0, 4),
    [guide, locale, localizedCourse.cards],
  );
  const mostTested = useMemo(
    () =>
      guide
        ? getGuideCards(guide.mostTestedIds).map((card) => localizeCard(card, locale))
        : localizedCourse.cards.slice(0, 6),
    [guide, locale, localizedCourse.cards],
  );
  const coreCards = useMemo(
    () => localizedCourse.cards.filter((card) => !isOptionalCard(card.chapter, card.unit)),
    [localizedCourse.cards],
  );
  const laterCards = useMemo(
    () => localizedCourse.cards.filter((card) => isOptionalCard(card.chapter, card.unit)),
    [localizedCourse.cards],
  );
  const weakTopics = useMemo(
    () =>
      localizedCourse.cards
        .map((card) => ({
          card,
          progress: progressMap[card.id] ?? { gotIt: 0, missedIt: 0 },
        }))
        .filter(({ progress }) => progress.missedIt > 0)
        .sort(
          (left, right) =>
            right.progress.missedIt - left.progress.missedIt ||
            left.progress.gotIt - right.progress.gotIt,
        )
        .slice(0, 4),
    [localizedCourse.cards, progressMap],
  );

  const drillSeed = starterCards[0] ? buildBubblegumDrill(starterCards[0], locale, "warmup", 0) : null;

  function stateLabel(cardId: string) {
    const state = getBubblegumStudyState(
      progressMap[cardId] ?? { gotIt: 0, missedIt: 0 },
    );

    if (state === "repair") return ui.repair;
    if (state === "review") return ui.review;
    if (state === "stable") return ui.stable;
    return ui.fresh;
  }

  function missTypeLabel(progress: BubblegumTopicProgress) {
    const type = getBubblegumPrimaryMissType(progress);

    if (!type) {
      return null;
    }

    if (type === "recognition") return ui.recognition;
    if (type === "setup") return ui.setup;
    if (type === "execution") return ui.execution;
    return ui.proof;
  }

  return (
    <div className="space-y-8">
      <section className="paper-panel bubble-shadow rounded-[2rem] border border-[color:var(--line)] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,22rem)]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              {course.courseCodes?.map((code) => (
                <span
                  key={code}
                  className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3725]"
                >
                  {code}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#8b3725]">
                {ui.courseWorkspace}
              </p>
              <h1 className="ink-title font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
                {getCourseDisplayLabel(course.title, locale)}
              </h1>
              <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
                {localizedCourse.shortDescription}
              </p>
            </div>

            {guide ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/92 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                    {ui.examFrame}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-800">
                    {guide.overview[locale] ?? guide.overview.en}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[#fffdfa] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                    {ui.solveFocus}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-800">
                    {guide.survivalAdvice[locale] ?? guide.survivalAdvice.en}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Link
                href="/study"
                className="rounded-full bg-[#2a2d33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f2227]"
              >
                {ui.openStudy}
              </Link>
              <Link
                href="/quiz"
                className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-[#c77964]"
              >
                {ui.openQuiz}
              </Link>
              <Link
                href="/memory-hooks"
                className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-[#c77964]"
              >
                {ui.openMemory}
              </Link>
            </div>
          </div>

          <aside className="space-y-4 rounded-[1.75rem] border border-[color:var(--line)] bg-[rgba(255,252,248,0.92)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
              {ui.reviewPlan}
            </p>
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              {ui.reviewPlanBody}
            </p>
            <div className="grid gap-3">
              {ui.playbookSteps.map((step) => (
                <div
                  key={step}
                  className="rounded-[1.2rem] border border-[color:var(--line)] bg-white px-4 py-3 text-sm leading-6 text-slate-800"
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-[#fff7f2] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                {ui.recoveryLoop}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-800">
                {ui.recoveryBody}
              </p>
            </div>
            {drillSeed ? (
              <Link
                href={`/bubblegum/${starterCards[0].id}`}
                className="block rounded-[1.2rem] border border-[#d7b6ad] bg-white px-4 py-4 transition hover:border-[#c77964]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                  {ui.starterDrill}
                </p>
                <p className="mt-2 font-semibold text-slate-900">{starterCards[0].name}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  {drillSeed.prompt}
                </p>
              </Link>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
        <div className="space-y-6">
          <section className="bubble-shadow rounded-[1.85rem] border border-[color:var(--line)] bg-white/92 p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                  {ui.startToday}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                  {starterCards.length} cards to get traction fast
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">
                {ui.startTodayHelp}
              </p>
            </div>

            <div className="mt-5 grid gap-4">
              {starterCards.map((card, index) => {
                const preview = buildBubblegumDrill(card, locale, "warmup", 0);

                return (
                  <div
                    key={card.id}
                    className="paper-panel rounded-[1.5rem] border border-[color:var(--line)] p-5"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b3725]">
                        Step {index + 1}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                        {card.chapter}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                      {card.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                      {preview.prompt}
                    </p>
                    <div className="mt-4 rounded-[1.15rem] border border-[color:var(--line)] bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b3725]">
                        {ui.solveFocus}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-900">
                        {preview.firstStep}
                      </p>
                    </div>
                    <div className="mt-3 inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                      {stateLabel(card.id)}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href={`/topics/${card.id}`}
                        className="rounded-full border border-[color:var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[#c77964]"
                      >
                        {ui.openTopic}
                      </Link>
                      <Link
                        href={`/bubblegum/${card.id}`}
                        className="rounded-full bg-[#8b3725] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#702b1c]"
                      >
                        {ui.openDrill}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bubble-shadow rounded-[1.85rem] border border-[color:var(--line)] bg-white/92 p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                  {ui.mostTested}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                  Patterns worth recognizing cold
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">
                {ui.mostTestedHelp}
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {mostTested.map((card) => {
                const preview = buildBubblegumDrill(card, locale, "warmup", 0);

                return (
                  <div
                    key={card.id}
                    className="rounded-[1.4rem] border border-[color:var(--line)] bg-[rgba(255,252,248,0.92)] p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b3725]">
                      {preview.technique}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">
                      {card.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                      {preview.whyFits}
                    </p>
                    <div className="mt-3 inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                      {stateLabel(card.id)}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href={`/topics/${card.id}`}
                        className="rounded-full border border-[color:var(--line)] bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-[#c77964]"
                      >
                        {ui.openTopic}
                      </Link>
                      <Link
                        href={`/bubblegum/${card.id}`}
                        className="rounded-full border border-[#d7b6ad] bg-[#fff7f2] px-4 py-2 text-sm font-semibold text-[#8b3725] transition hover:border-[#c77964]"
                      >
                        {ui.openDrill}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bubble-shadow rounded-[1.85rem] border border-[color:var(--line)] bg-white/92 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
              {ui.weakTopics}
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              {ui.weakTopicsHelp}
            </p>
            <div className="mt-5 grid gap-3">
              {weakTopics.length === 0 ? (
                <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-[rgba(255,252,248,0.92)] px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                  {ui.noWeakTopics}
                </div>
              ) : (
                weakTopics.map(({ card, progress }) => {
                  const preview = buildBubblegumDrill(card, locale, "warmup", 0);
                  const missType = missTypeLabel(progress);

                  return (
                    <Link
                      key={card.id}
                      href={`/bubblegum/${card.id}`}
                      className="rounded-[1.35rem] border border-[color:var(--line)] bg-[rgba(255,247,242,0.92)] px-4 py-4 transition hover:border-[#c77964]"
                    >
                      <p className="font-semibold text-slate-900">{card.name}</p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                        {preview.firstStep}
                      </p>
                      {missType ? (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b3725]">
                          {ui.missReason}: {missType}
                        </p>
                      ) : null}
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b3725]">
                        <span>{progress.missedIt} {ui.missedCount}</span>
                        <span>•</span>
                        <span>{progress.gotIt} {ui.gotCount}</span>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </section>

          <section className="bubble-shadow rounded-[1.85rem] border border-[color:var(--line)] bg-white/92 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
              {ui.courseMap}
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              {ui.courseMapHelp}
            </p>

            <div className="mt-5 grid gap-5">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b3725]">
                  {ui.coreRoute}
                </p>
                {coreCards.slice(0, 7).map((card) => (
                  <Link
                    key={card.id}
                    href={`/topics/${card.id}`}
                    className="block rounded-[1.2rem] border border-[color:var(--line)] bg-[rgba(255,252,248,0.92)] px-4 py-3 transition hover:border-[#c77964]"
                  >
                    <p className="font-semibold text-slate-900">{card.name}</p>
                    <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                      {card.chapter}
                    </p>
                  </Link>
                ))}
              </div>

              {laterCards.length ? (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                    {ui.laterRoute}
                  </p>
                  {laterCards.slice(0, 4).map((card) => (
                    <Link
                      key={card.id}
                      href={`/topics/${card.id}`}
                      className="block rounded-[1.2rem] border border-amber-200 bg-amber-50/70 px-4 py-3 transition hover:border-amber-300"
                    >
                      <p className="font-semibold text-slate-900">{card.name}</p>
                      <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                        {card.chapter}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

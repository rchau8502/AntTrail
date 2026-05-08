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
    firstMove: "First move",
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
      "When you freeze: read the cue, do the first line on paper, then drill until the hesitation disappears.",
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
    playbook: "How to use this page",
    playbookSteps: [
      "1. Read the exam frame and identify the kind of problem you are holding.",
      "2. Use the first move exactly as written before you try to improvise.",
      "3. Work the starter cards, then the most-tested cards, then your weak topics.",
    ],
    missedCount: "misses",
    gotCount: "got it",
  },
  es: {
    examFrame: "Marco de examen",
    firstMove: "Primer movimiento",
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
      "Cuando te bloquees: lee la pista, escribe la primera linea en papel y luego repite hasta que desaparezca la duda.",
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
    playbook: "Como usar esta pagina",
    playbookSteps: [
      "1. Lee el marco de examen e identifica que tipo de problema tienes delante.",
      "2. Usa el primer movimiento exactamente como esta escrito antes de improvisar.",
      "3. Haz las tarjetas iniciales, luego las mas examinadas y despues tus temas flojos.",
    ],
    missedCount: "fallos",
    gotCount: "aciertos",
  },
  zh: {
    examFrame: "考试框架",
    firstMove: "第一步",
    startToday: "今天先做这里",
    startTodayHelp: "如果你还没开始复习这门课，就先按顺序做这些卡片。",
    mostTested: "最常考的模式",
    mostTestedHelp: "这些模式最值得练到一眼就能认出来。",
    weakTopics: "你的薄弱主题",
    weakTopicsHelp: "这里来自这台设备上的 Bubblegum 错题记录，可直接当补救清单。",
    noWeakTopics: "这里还没有记录薄弱主题。Bubblegum 的错题会自动出现在这里。",
    recoveryLoop: "补救循环",
    recoveryBody:
      "一旦卡住：先读题目线索，先写第一行，再反复练到不再犹豫。",
    courseMap: "课程路线",
    courseMapHelp: "先走核心路线。等核心稳定以后，再去做后面的扩展卡片。",
    coreRoute: "核心路线",
    laterRoute: "后续 / 可选",
    openTopic: "打开主题",
    openDrill: "打开练习",
    openQuiz: "打开测验",
    openStudy: "打开学习模式",
    openMemory: "打开记忆钩子",
    playbook: "怎么用这页",
    playbookSteps: [
      "1. 先读考试框架，判断你手里的题属于哪一类。",
      "2. 先按写好的第一步去做，再考虑自己发挥。",
      "3. 先做起步卡，再做常考卡，最后回到你的薄弱主题。",
    ],
    missedCount: "错题次数",
    gotCount: "做对次数",
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
                    {ui.firstMove}
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
              {ui.playbook}
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
                  First drill
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
                        {ui.firstMove}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-900">
                        {preview.firstStep}
                      </p>
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

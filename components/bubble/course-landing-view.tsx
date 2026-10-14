"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { localizeCard, localizeCourse } from "@/content/localization";
import type { CourseContent } from "@/content/schema";
import { buildBubblegumDrill } from "@/lib/bubblegum";
import { getCourseDisplayLabel } from "@/lib/course-catalog";
import { getGuideCards, type CourseGuide } from "@/lib/course-guides";
import {
  BUBBLE_PROGRESS_EVENT,
  getBubblegumPrimaryMissType,
  getBubblegumPriorityScore,
  getBubblegumStudyState,
  getBubblegumTopicProgressMap,
  type BubblegumTopicProgress,
} from "@/lib/progress";

interface CourseLandingViewProps {
  course: CourseContent;
  guide?: CourseGuide;
}

function isOptionalCard(card: { chapter: string; unit: string }) {
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
    command: "Course command center",
    examFrame: "Exam frame",
    solveFocus: "Solve focus",
    dueToday: "Due today",
    dueHelp: "These cards are where review or repair pressure is already building.",
    commonMisses: "Common misses",
    commonMissesHelp: "This list comes from your local Bubble history on this device.",
    mixedRecall: "Mixed recall",
    mixedRecallHelp: "These are the patterns worth recognizing cold in this course.",
    corePath: "Core path",
    corePathHelp: "Use the main route first. Touch optional material later.",
    repair: "repair",
    review: "review",
    stable: "stable",
    fresh: "new",
    recognition: "recognition",
    setup: "setup",
    execution: "execution",
    proof: "proof",
    openStudy: "Open in Study",
    openRepair: "Open in Bubblegum",
    openRecall: "Open in Quiz",
  },
  es: {
    command: "Centro de mando del curso",
    examFrame: "Marco de examen",
    solveFocus: "Enfoque de resolución",
    dueToday: "Para hoy",
    dueHelp: "Estas tarjetas son donde ya se está acumulando presión de repaso o reparación.",
    commonMisses: "Fallos comunes",
    commonMissesHelp: "Esta lista sale de tu historial local de Bubble en este dispositivo.",
    mixedRecall: "Recuerdo mezclado",
    mixedRecallHelp: "Estos son los patrones que conviene reconocer en frío en este curso.",
    corePath: "Ruta central",
    corePathHelp: "Haz primero la ruta principal. Lo opcional puede esperar.",
    repair: "reparar",
    review: "repasar",
    stable: "estable",
    fresh: "nuevo",
    recognition: "reconocimiento",
    setup: "planteamiento",
    execution: "ejecución",
    proof: "prueba",
    openStudy: "Abrir en Study",
    openRepair: "Abrir en Bubblegum",
    openRecall: "Abrir en Quiz",
  },
  zh: {
    command: "课程指挥台",
    examFrame: "考试框架",
    solveFocus: "解题重点",
    dueToday: "今天该盯住的内容",
    dueHelp: "这些卡片已经开始积累复习或补弱压力。",
    commonMisses: "常见失误",
    commonMissesHelp: "这份列表来自当前设备上的 Bubble 本地记录。",
    mixedRecall: "混合回忆",
    mixedRecallHelp: "这些是这门课最值得练到一眼认出的模式。",
    corePath: "核心路线",
    corePathHelp: "先走主线，选修内容以后再碰。",
    repair: "补弱",
    review: "复习",
    stable: "稳定",
    fresh: "新主题",
    recognition: "识别",
    setup: "起手设定",
    execution: "执行",
    proof: "证明结构",
    openStudy: "在 Study 中打开",
    openRepair: "在 Bubblegum 中打开",
    openRecall: "在 Quiz 中打开",
  },
} as const;

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
  const starterCards = guide
    ? getGuideCards(guide.starterIds).map((card) => localizeCard(card, locale))
    : localizedCourse.cards.slice(0, 4);

  const rankedCards = [...localizedCourse.cards].sort((left, right) => {
    const leftProgress = progressMap[left.id] ?? { gotIt: 0, missedIt: 0 };
    const rightProgress = progressMap[right.id] ?? { gotIt: 0, missedIt: 0 };
    const priorityDiff =
      getBubblegumPriorityScore(rightProgress) - getBubblegumPriorityScore(leftProgress);

    return priorityDiff || left.order - right.order;
  });

  const dueCards = rankedCards.slice(0, 4);
  const weakCards = rankedCards.filter((card) => (progressMap[card.id]?.missedIt ?? 0) > 0).slice(0, 4);
  const coreCards = localizedCourse.cards.filter((card) => !isOptionalCard(card)).slice(0, 6);

  function stateLabel(cardId: string) {
    const state = getBubblegumStudyState(progressMap[cardId] ?? { gotIt: 0, missedIt: 0 });

    if (state === "repair") return ui.repair;
    if (state === "review") return ui.review;
    if (state === "stable") return ui.stable;
    return ui.fresh;
  }

  function missLabel(cardId: string) {
    const type = getBubblegumPrimaryMissType(progressMap[cardId] ?? { gotIt: 0, missedIt: 0 });

    if (type === "recognition") return ui.recognition;
    if (type === "setup") return ui.setup;
    if (type === "execution") return ui.execution;
    if (type === "proof") return ui.proof;
    return null;
  }

  return (
    <div className="space-y-8">
      <section className="paper-panel bubble-shadow rounded-[2.2rem] border border-[color:var(--line)] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_22rem]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              {course.courseCodes?.map((code) => (
                <span
                  key={code}
                  className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]"
                >
                  {code}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#4156d8]">
                {ui.command}
              </p>
              <h1 className="ink-title font-display text-4xl text-slate-950 sm:text-5xl">
                {getCourseDisplayLabel(course.title, locale)}
              </h1>
              <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
                {localizedCourse.shortDescription}
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.45rem] border border-[color:var(--line)] bg-white/92 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                  {ui.examFrame}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-800">
                  {guide?.overview[locale] ?? guide?.overview.en ?? localizedCourse.shortDescription}
                </p>
              </div>
              <div className="rounded-[1.45rem] border border-[color:var(--line)] bg-white/92 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                  {ui.solveFocus}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-800">
                  {guide?.survivalAdvice[locale] ?? guide?.survivalAdvice.en ?? localizedCourse.shortDescription}
                </p>
              </div>
            </div>
          </div>

          <aside className="diagnostic-panel rounded-[1.8rem] border border-[color:var(--line)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
              {ui.mixedRecall}
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{ui.mixedRecallHelp}</p>
            <div className="mt-4 grid gap-3">
              {starterCards.map((card) => {
                const drill = buildBubblegumDrill(card, locale, "quiz", 0);

                return (
                  <Link
                    key={card.id}
                    href={`/quiz?focus=${card.id}`}
                    className="rounded-[1.2rem] border border-[color:var(--line)] bg-white px-4 py-4 transition hover:border-[#8da2ff]"
                  >
                    <p className="text-sm font-semibold text-slate-950">{card.name}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                      {drill.prompt}
                    </p>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="bubble-shadow rounded-[1.9rem] border border-[color:var(--line)] bg-white/94 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
            {ui.dueToday}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{ui.dueHelp}</p>
          <div className="mt-5 grid gap-4">
            {dueCards.map((card) => {
              const drill = buildBubblegumDrill(card, locale, "warmup", 0);

              return (
                <div
                  key={card.id}
                  className="rounded-[1.3rem] border border-[color:var(--line)] bg-[#f8fbff] px-4 py-4"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                      {stateLabel(card.id)}
                    </span>
                    {missLabel(card.id) ? (
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                        {missLabel(card.id)}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-slate-950">{card.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-800">{drill.firstStep}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/study?focus=${card.id}`}
                      className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      {ui.openStudy}
                    </Link>
                    <Link
                      href={`/bubblegum/${card.id}`}
                      className="rounded-full border border-[color:var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-slate-900"
                    >
                      {ui.openRepair}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bubble-shadow rounded-[1.9rem] border border-[color:var(--line)] bg-white/94 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
            {ui.commonMisses}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{ui.commonMissesHelp}</p>
          <div className="mt-5 grid gap-4">
            {(weakCards.length ? weakCards : coreCards).map((card) => {
              const drill = buildBubblegumDrill(card, locale, "quiz", 0);

              return (
                <div
                  key={card.id}
                  className="rounded-[1.3rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4"
                >
                  <p className="text-sm font-semibold text-slate-950">{card.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{drill.prompt}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/quiz?focus=${card.id}`}
                      className="rounded-full bg-[#4156d8] px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      {ui.openRecall}
                    </Link>
                    <Link
                      href={`/topics/${card.id}`}
                      className="rounded-full border border-[color:var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-slate-900"
                    >
                      Open topic
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bubble-shadow rounded-[1.9rem] border border-[color:var(--line)] bg-white/94 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
          {ui.corePath}
        </p>
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{ui.corePathHelp}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coreCards.map((card) => {
            const drill = buildBubblegumDrill(card, locale, "warmup", 0);

            return (
              <Link
                key={card.id}
                href={`/topics/${card.id}`}
                className="rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 transition hover:-translate-y-1 hover:border-[#8da2ff]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4156d8]">
                  {card.chapter}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">{card.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-800">{drill.firstStep}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

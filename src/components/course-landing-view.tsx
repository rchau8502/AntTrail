"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { localizeCard, localizeCourse } from "@/content/localization";
import type { CourseContent } from "@/content/schema";
import { getCourseDisplayLabel } from "@/lib/bubble";
import { buildBubblegumDrill } from "@/lib/bubblegum";
import { getGuideCards, type CourseGuide } from "@/lib/course-guides";
import {
  BUBBLE_PROGRESS_EVENT,
  getBubblegumTopicProgressMap,
  type BubblegumTopicProgress,
} from "@/lib/progress";

interface CourseLandingViewProps {
  course: CourseContent;
  guide?: CourseGuide;
}

const copy = {
  en: {
    mostTested: "Most tested patterns",
    starterShelf: "Starter shelf",
    weakTopics: "Your weak topics here",
    weakHelp: "Local-only tracking from Bubblegum misses on this device.",
    drillNow: "Open Bubblegum",
    studyCard: "Open Bubble",
    missedCount: "misses",
    gotCount: "got it",
    noWeakTopics: "No weak topics recorded here yet. Start Bubblegum on this course and misses will show up here.",
  },
  es: {
    mostTested: "Patrones mas examinados",
    starterShelf: "Estantes para empezar",
    weakTopics: "Tus temas flojos aqui",
    weakHelp: "Seguimiento local solo en este dispositivo segun tus fallos en Bubblegum.",
    drillNow: "Abrir Bubblegum",
    studyCard: "Abrir Bubble",
    missedCount: "fallos",
    gotCount: "aciertos",
    noWeakTopics: "Todavia no hay temas flojos guardados aqui. Empieza Bubblegum en este curso y los fallos apareceran aqui.",
  },
  zh: {
    mostTested: "最常考的模式",
    starterShelf: "起步书架",
    weakTopics: "你这里最弱的主题",
    weakHelp: "这里只记录这台设备上的 Bubblegum 失误。",
    drillNow: "打开 Bubblegum",
    studyCard: "打开 Bubble",
    missedCount: "错题次数",
    gotCount: "做对次数",
    noWeakTopics: "这里还没有记录到薄弱主题。先做这门课的 Bubblegum，错题就会出现在这里。",
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
  const mostTested = useMemo(
    () => (guide ? getGuideCards(guide.mostTestedIds).map((card) => localizeCard(card, locale)) : []),
    [guide, locale],
  );
  const starterShelf = useMemo(
    () => (guide ? getGuideCards(guide.starterIds).map((card) => localizeCard(card, locale)) : localizedCourse.cards.slice(0, 4)),
    [guide, localizedCourse.cards, locale],
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
        .slice(0, 5),
    [localizedCourse.cards, progressMap],
  );

  return (
    <div className="space-y-8">
      <section className="bubble-shadow rounded-[2.2rem] border border-[color:var(--line)] bg-[linear-gradient(140deg,rgba(255,255,255,0.98),rgba(235,247,255,0.86)_55%,rgba(255,240,244,0.95))] p-8 sm:p-10">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            {course.courseCodes?.map((code) => (
              <span
                key={code}
                className="rounded-full border border-white/80 bg-white/80 px-3 py-1"
              >
                {code}
              </span>
            ))}
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
              {getCourseDisplayLabel(course.title, locale)}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              {localizedCourse.shortDescription}
            </p>
          </div>
          {guide ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white/80 p-5">
                <p className="text-sm font-semibold text-sky-700">
                  {guide.overview[locale] ?? guide.overview.en}
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white/80 p-5 text-sm leading-6 text-slate-700">
                {guide.survivalAdvice[locale] ?? guide.survivalAdvice.en}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            {ui.mostTested}
          </p>
          <div className="mt-5 grid gap-4">
            {mostTested.map((card) => {
              const preview = buildBubblegumDrill(card, locale, "warmup", 0);

              return (
                <div
                  key={card.id}
                  className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {card.unit}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">{card.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {preview.whyFits}
                  </p>
                  <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-slate-900">
                    {preview.prompt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/topics/${card.id}`}
                      className="rounded-full border border-[color:var(--line)] bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
                    >
                      {ui.studyCard}
                    </Link>
                    <Link
                      href={`/bubblegum/${card.id}`}
                      className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                    >
                      {ui.drillNow}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              {ui.starterShelf}
            </p>
            <div className="mt-4 grid gap-3">
              {starterShelf.map((card) => (
                <Link
                  key={card.id}
                  href={`/topics/${card.id}`}
                  className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-4 transition hover:border-sky-200"
                >
                  <p className="font-semibold text-slate-900">{card.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {card.memoryHook}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
              {ui.weakTopics}
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              {ui.weakHelp}
            </p>
            <div className="mt-4 grid gap-3">
              {weakTopics.length === 0 ? (
                <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                  {ui.noWeakTopics}
                </div>
              ) : (
                weakTopics.map(({ card, progress }) => (
                  <Link
                    key={card.id}
                    href={`/bubblegum/${card.id}`}
                    className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-4 transition hover:border-rose-200"
                  >
                    <p className="font-semibold text-slate-900">{card.name}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                      {buildBubblegumDrill(card, locale, "warmup", 0).technique}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-rose-700">
                      <span>{progress.missedIt} {ui.missedCount}</span>
                      <span>•</span>
                      <span>{progress.gotIt} {ui.gotCount}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

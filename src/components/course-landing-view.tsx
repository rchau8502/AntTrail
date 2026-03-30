"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { localizeCard, localizeCourse } from "@/content/localization";
import type { CourseContent } from "@/content/schema";
import { getCourseDisplayLabel } from "@/lib/course-catalog";
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
    corePath: "Current syllabus path",
    optionalExtras: "Later / optional extras",
    sectionChecklist: "Section checklist",
    sectionChecklistHelp: "Use this to see what Bubble covers in order. It is a strong companion, not a guarantee of full mastery by itself.",
    whatBubbleTeaches: "What Bubble teaches well",
    whatBubbleNeeds: "What still needs class and homework",
    teachesHelp: "Recognition, first moves, common traps, and the fastest exam patterns.",
    needsHelp: "Long proofs, full derivations, algebra endurance, and the weird edge cases your professor may still test.",
    coreHelp: "Start here if you want the class path before extra review.",
    optionalHelp: "Useful for preview or stretch work, but not the first shelf to study.",
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
    corePath: "Ruta actual del curso",
    optionalExtras: "Extras posteriores u opcionales",
    sectionChecklist: "Checklist de secciones",
    sectionChecklistHelp: "Usa esto para ver que cubre Bubble y en que orden. Es un gran acompanante, pero no garantiza dominio total por si solo.",
    whatBubbleTeaches: "Lo que Bubble ensena bien",
    whatBubbleNeeds: "Lo que todavia necesita clase y tarea",
    teachesHelp: "Reconocimiento, primer movimiento, trampas comunes y los patrones de examen mas frecuentes.",
    needsHelp: "Pruebas largas, derivaciones completas, aguante algebraico y los casos raros que tu profesor aun puede evaluar.",
    coreHelp: "Empieza aqui si quieres seguir el camino real de la clase antes del repaso extra.",
    optionalHelp: "Sirve para adelantar o profundizar, pero no es la primera estanteria para estudiar.",
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
    corePath: "当前课表主线",
    optionalExtras: "后续 / 可选扩展",
    sectionChecklist: "章节清单",
    sectionChecklistHelp: "用这个看 Bubble 按什么顺序覆盖了哪些内容。它是很强的学习搭档，但单靠它并不能保证完全掌握。",
    whatBubbleTeaches: "Bubble 最擅长教什么",
    whatBubbleNeeds: "哪些仍然需要上课和作业",
    teachesHelp: "题型识别、第一步、常见陷阱，以及最常考的模式。",
    needsHelp: "长证明、完整推导、硬算耐力，以及老师可能还是会考的边角情况。",
    coreHelp: "如果你想先按真实课程顺序学，就从这里开始。",
    optionalHelp: "这些适合提前预习或额外拉伸，但不该先学。",
    weakTopics: "你这里最弱的主题",
    weakHelp: "这里只记录这台设备上的 Bubblegum 失误。",
    drillNow: "打开 Bubblegum",
    studyCard: "打开 Bubble",
    missedCount: "错题次数",
    gotCount: "做对次数",
    noWeakTopics: "这里还没有记录到薄弱主题。先做这门课的 Bubblegum，错题就会出现在这里。",
  },
} as const;

function isOptionalCard(chapter: string, unit: string) {
  const chapterText = chapter.toLowerCase();
  const unitText = unit.toLowerCase();

  return (
    chapterText.includes("later / optional") ||
    chapterText.includes("later / optional".replaceAll(" ", "")) ||
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
  const coreCards = useMemo(
    () => localizedCourse.cards.filter((card) => !isOptionalCard(card.chapter, card.unit)),
    [localizedCourse.cards],
  );
  const optionalCards = useMemo(
    () => localizedCourse.cards.filter((card) => isOptionalCard(card.chapter, card.unit)),
    [localizedCourse.cards],
  );
  const mostTested = useMemo(
    () => (guide ? getGuideCards(guide.mostTestedIds).map((card) => localizeCard(card, locale)) : []),
    [guide, locale],
  );
  const starterShelf = useMemo(
    () => (guide ? getGuideCards(guide.starterIds).map((card) => localizeCard(card, locale)) : coreCards.slice(0, 4)),
    [guide, coreCards, locale],
  );
  const corePath = useMemo(() => coreCards.slice(0, 8), [coreCards]);
  const optionalShelf = useMemo(() => optionalCards.slice(0, 6), [optionalCards]);
  const sectionChecklist = useMemo(() => {
    const groups = new Map<
      string,
      { chapter: string; count: number; optional: boolean }
    >();

    for (const card of localizedCourse.cards) {
      const existing = groups.get(card.chapter);

      if (existing) {
        existing.count += 1;
        continue;
      }

      groups.set(card.chapter, {
        chapter: card.chapter,
        count: 1,
        optional: isOptionalCard(card.chapter, card.unit),
      });
    }

    return [...groups.values()];
  }, [localizedCourse.cards]);
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
      <section className="bubble-shadow rounded-[2.2rem] border border-[color:var(--line)] bg-[linear-gradient(140deg,rgba(255,255,255,0.98),rgba(235,247,255,0.86)_55%,rgba(255,240,244,0.95))] p-5 sm:p-10">
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
              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white/80 p-4 sm:p-5">
                <p className="text-sm font-semibold text-sky-700">
                  {guide.overview[locale] ?? guide.overview.en}
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-white/80 p-4 text-sm leading-6 text-slate-700 sm:p-5">
                {guide.survivalAdvice[locale] ?? guide.survivalAdvice.en}
              </div>
            </div>
          ) : null}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.6rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(214,255,232,0.76),rgba(255,255,255,0.96))] p-4 sm:p-5">
              <p className="text-sm font-semibold text-emerald-700">
                {ui.whatBubbleTeaches}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {ui.teachesHelp}
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-amber-200 bg-amber-50/80 p-4 sm:p-5">
              <p className="text-sm font-semibold text-amber-700">
                {ui.whatBubbleNeeds}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {ui.needsHelp}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-5 sm:p-8">
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
                  <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
                    <Link
                      href={`/topics/${card.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
                    >
                      {ui.studyCard}
                    </Link>
                    <Link
                      href={`/bubblegum/${card.id}`}
                      className="inline-flex items-center justify-center rounded-full bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
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
          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              {ui.sectionChecklist}
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              {ui.sectionChecklistHelp}
            </p>
            <div className="mt-4 grid gap-3">
              {sectionChecklist.map((item) => (
                <div
                  key={item.chapter}
                  className={`rounded-[1.5rem] border px-4 py-4 ${
                    item.optional
                      ? "border-amber-200 bg-amber-50/80"
                      : "border-[color:var(--line)] bg-[color:var(--surface-strong)]"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.chapter}
                    </p>
                    <span className="rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-5 sm:p-6">
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

          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              {ui.corePath}
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{ui.coreHelp}</p>
            <div className="mt-4 grid gap-3">
              {corePath.map((card) => (
                <Link
                  key={card.id}
                  href={`/topics/${card.id}`}
                  className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-4 transition hover:border-sky-200"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
                    {card.chapter}
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">{card.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {buildBubblegumDrill(card, locale, "warmup", 0).technique}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {optionalShelf.length ? (
            <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
                {ui.optionalExtras}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{ui.optionalHelp}</p>
              <div className="mt-4 grid gap-3">
                {optionalShelf.map((card) => (
                  <Link
                    key={card.id}
                    href={`/topics/${card.id}`}
                    className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-4 transition hover:border-amber-200"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                      {card.chapter}
                    </p>
                    <p className="mt-2 font-semibold text-slate-900">{card.name}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                      {card.memoryHook}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-5 sm:p-6">
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

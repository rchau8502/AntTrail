"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { localizeCards } from "@/content/localization";
import type { BubbleCard } from "@/content/schema";
import { buildBubblegumDrill } from "@/lib/bubblegum";
import { getCourseDisplayLabel, getCourseOptions } from "@/lib/course-catalog";
import {
  BUBBLE_PROGRESS_EVENT,
  getBubblegumPrimaryMissType,
  getBubblegumPriorityScore,
  getBubblegumStudyState,
  getBubblegumTopicProgressMap,
  isBubblegumTopicMastered,
  type BubblegumTopicProgress,
} from "@/lib/progress";
import { getTechniqueLabel } from "@/lib/recognition";

interface BubblegumHubProps {
  cards: BubbleCard[];
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
    eyebrow: "Repair loop",
    title: "Bubblegum is where misses get turned into targeted repetition.",
    description:
      "Use this after Study, Quiz, homework, or office hours. The point is not to browse. The point is to isolate the exact topics that are still costing you points.",
    repairNow: "Repair now",
    repairHelp:
      "These are the topics with the highest repair pressure on this device.",
    allDrills: "All drills",
    allHelp:
      "This list stays searchable, but the weakest topics should rise automatically.",
    repair: "repair",
    review: "review",
    stable: "stable",
    fresh: "new",
    misses: "misses",
    recognition: "recognition",
    setup: "setup",
    execution: "execution",
    proof: "proof",
    noWeak: "No weak topics tracked yet. Miss a topic in Study or Quiz and it will show up here.",
  },
  es: {
    eyebrow: "Bucle de reparación",
    title: "Bubblegum es donde los fallos se convierten en repetición dirigida.",
    description:
      "Úsalo después de Study, Quiz, tarea u horas de oficina. La idea no es navegar. La idea es aislar los temas exactos que todavía te cuestan puntos.",
    repairNow: "Reparar ahora",
    repairHelp:
      "Estos son los temas con mayor presión de reparación en este dispositivo.",
    allDrills: "Todas las prácticas",
    allHelp:
      "La lista sigue siendo buscable, pero los temas más débiles deben subir solos.",
    repair: "reparar",
    review: "repasar",
    stable: "estable",
    fresh: "nuevo",
    misses: "fallos",
    recognition: "reconocimiento",
    setup: "planteamiento",
    execution: "ejecución",
    proof: "prueba",
    noWeak: "Todavía no hay temas flojos aquí. Falla un tema en Study o Quiz y aparecerá aquí.",
  },
  zh: {
    eyebrow: "补弱循环",
    title: "Bubblegum 是把失误变成定向重复训练的地方。",
    description:
      "在 Study、Quiz、作业或答疑之后用它。重点不是浏览，而是把还在丢分的主题单独拎出来。",
    repairNow: "现在补弱",
    repairHelp: "这些是当前设备上补弱压力最高的主题。",
    allDrills: "全部训练",
    allHelp: "这份列表仍然可搜索，但最弱的主题应该自动排在前面。",
    repair: "补弱",
    review: "复习",
    stable: "稳定",
    fresh: "新主题",
    misses: "错题次数",
    recognition: "识别",
    setup: "起手设定",
    execution: "执行",
    proof: "证明结构",
    noWeak: "这里还没有薄弱主题。在 Study 或 Quiz 里错一次，它就会出现在这里。",
  },
} as const;

export function BubblegumHub({ cards }: BubblegumHubProps) {
  const { locale } = useLanguage();
  const ui = copy[locale] ?? copy.en;
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<"All" | string>("All");
  const [coreOnly, setCoreOnly] = useState(true);
  const [progressMap, setProgressMap] = useState<Record<string, BubblegumTopicProgress>>({});
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
  const filteredCards = localizedCards
    .filter((card) => (courseFilter === "All" ? true : card.course === courseFilter))
    .filter((card) => (coreOnly ? !isOptionalCard(card) : true))
    .filter((card) => {
      if (!query.trim()) return true;
      const fingerprint = [
        card.name,
        card.topic,
        card.unit,
        card.rememberThis,
        card.memoryHook,
        card.looksLike,
        card.doThis,
        getTechniqueLabel(card, locale),
      ]
        .join(" ")
        .toLowerCase();
      return fingerprint.includes(query.trim().toLowerCase());
    })
    .sort((left, right) => {
      const leftProgress = progressMap[left.id] ?? { gotIt: 0, missedIt: 0 };
      const rightProgress = progressMap[right.id] ?? { gotIt: 0, missedIt: 0 };
      const priorityDiff =
        getBubblegumPriorityScore(rightProgress) - getBubblegumPriorityScore(leftProgress);

      return priorityDiff || left.order - right.order;
    });

  const weakCards = filteredCards.filter((card) => (progressMap[card.id]?.missedIt ?? 0) > 0).slice(0, 6);

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
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics, methods, cues..."
              className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none sm:col-span-2"
            />
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
            <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-slate-900">
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

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="bubble-shadow rounded-[1.9rem] border border-[color:var(--line)] bg-white/94 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
            {ui.repairNow}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{ui.repairHelp}</p>
          <div className="mt-5 grid gap-4">
            {weakCards.length === 0 ? (
              <div className="rounded-[1.3rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                {ui.noWeak}
              </div>
            ) : (
              weakCards.map((card) => {
                const preview = buildBubblegumDrill(card, locale, "warmup", 0);
                const misses = progressMap[card.id]?.missedIt ?? 0;
                const missReason = missLabel(card.id);

                return (
                  <Link
                    key={card.id}
                    href={`/bubblegum/${card.id}`}
                    className="rounded-[1.4rem] border border-[color:var(--line)] bg-[#f8fbff] px-4 py-4 transition hover:border-[#8da2ff]"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                        {getCourseDisplayLabel(card.course, locale, { includeCode: false })}
                      </span>
                      <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                        {stateLabel(card.id)}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold text-slate-950">{card.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                      {getTechniqueLabel(card, locale)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">{preview.firstStep}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                      <span className="rounded-full bg-white px-3 py-1 text-slate-700">
                        {misses} {ui.misses}
                      </span>
                      {missReason ? (
                        <span className="rounded-full bg-white px-3 py-1 text-slate-700">
                          {missReason}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        <div className="bubble-shadow rounded-[1.9rem] border border-[color:var(--line)] bg-white/94 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
            {ui.allDrills}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{ui.allHelp}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {filteredCards.map((card) => {
              const preview = buildBubblegumDrill(card, locale, "warmup", 0);
              const mastered = isBubblegumTopicMastered(card.id);

              return (
                <Link
                  key={card.id}
                  href={`/bubblegum/${card.id}`}
                  className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 transition hover:-translate-y-1 hover:border-[#8da2ff]"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4156d8]">
                      {getCourseDisplayLabel(card.course, locale, { includeCode: false })}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                      {stateLabel(card.id)}
                    </span>
                    {mastered ? (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                        done
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-slate-950">{card.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                    {preview.prompt}
                  </p>
                  <div className="mt-4 rounded-[1.15rem] border border-[color:var(--line)] bg-white px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                      Solve entry
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">{preview.firstStep}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

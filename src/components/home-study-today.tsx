"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { localizeCards } from "@/content/localization";
import type { BubbleCard } from "@/content/schema";
import { getCourseDisplayLabel } from "@/lib/course-catalog";
import {
  BUBBLE_PROGRESS_EVENT,
  getBubblegumPrimaryMissType,
  getBubblegumPriorityScore,
  getBubblegumStudyState,
  getBubblegumTopicProgressMap,
  type BubblegumMissType,
  type BubblegumTopicProgress,
} from "@/lib/progress";
import { getTechniqueLabel } from "@/lib/recognition";

interface HomeStudyTodayProps {
  cards: BubbleCard[];
}

const todayCopy = {
  en: {
    eyebrow: "Study today",
    title: "Bubble should tell you what deserves attention right now.",
    description:
      "This panel uses your local study history to surface the topics that most need repair or review before your next quiz or exam.",
    repairNow: "Repair now",
    reviewNext: "Review next",
    noRepair:
      "No active repair topics yet. Misses from Bubblegum will rise here automatically.",
    noReview:
      "No review topics yet. As you work through drills, Bubble will start separating review from repair.",
    openDrill: "Open drill",
    openTopic: "Open topic",
    repair: "repair",
    review: "review",
    stable: "stable",
    fresh: "new",
    missReason: "weak because",
    recognition: "recognition",
    setup: "setup",
    execution: "execution",
    proof: "proof",
    todayPlan: "Today's plan",
    todayPlanHelp:
      "This is the highest-value study block Bubble can assemble from your current progress on this device.",
    repairBlock: "Repair block",
    reviewBlock: "Review block",
    recallBlock: "Recall block",
    noPlanYet:
      "No tracked work yet. Start with Study or Bubblegum once, and Bubble will build a better plan here.",
    openStudy: "Open study",
    openQuiz: "Open quiz",
  },
  es: {
    eyebrow: "Estudia hoy",
    title: "Bubble debe decirte que merece atencion ahora mismo.",
    description:
      "Este panel usa tu historial local para sacar los temas que mas necesitan reparacion o repaso antes del proximo quiz o examen.",
    repairNow: "Repara ahora",
    reviewNext: "Repasa despues",
    noRepair:
      "Aun no hay temas de reparacion activos. Los fallos de Bubblegum subiran aqui solos.",
    noReview:
      "Aun no hay temas de repaso. Cuando trabajes mas ejercicios, Bubble separara mejor repaso y reparacion.",
    openDrill: "Abrir practica",
    openTopic: "Abrir tema",
    repair: "reparar",
    review: "repasar",
    stable: "estable",
    fresh: "nuevo",
    missReason: "flojo por",
    recognition: "reconocimiento",
    setup: "planteamiento",
    execution: "ejecucion",
    proof: "prueba",
    todayPlan: "Plan de hoy",
    todayPlanHelp:
      "Este es el bloque de estudio mas valioso que Bubble puede armar con tu progreso actual en este dispositivo.",
    repairBlock: "Bloque de reparacion",
    reviewBlock: "Bloque de repaso",
    recallBlock: "Bloque de recuerdo",
    noPlanYet:
      "Aun no hay trabajo registrado. Usa Study o Bubblegum una vez y Bubble armara un plan mejor aqui.",
    openStudy: "Abrir estudio",
    openQuiz: "Abrir quiz",
  },
  zh: {
    eyebrow: "今天学什么",
    title: "Bubble 应该直接告诉你现在最该盯住什么。",
    description:
      "这个面板会根据你本地的学习记录，优先显示最需要补弱或复习的主题。",
    repairNow: "现在补弱",
    reviewNext: "接着复习",
    noRepair: "目前还没有补弱主题。Bubblegum 的错题之后会自动出现在这里。",
    noReview: "目前还没有复习主题。继续做题后，Bubble 会把复习和补弱分开。",
    openDrill: "打开练习",
    openTopic: "打开主题",
    repair: "补弱",
    review: "复习",
    stable: "稳定",
    fresh: "新主题",
    missReason: "薄弱原因",
    recognition: "识别",
    setup: "起手设定",
    execution: "执行",
    proof: "证明结构",
    todayPlan: "今日计划",
    todayPlanHelp: "这是 Bubble 根据你当前本地进度拼出的最高价值学习块。",
    repairBlock: "补弱块",
    reviewBlock: "复习块",
    recallBlock: "回忆块",
    noPlanYet: "目前还没有记录。先用一次 Study 或 Bubblegum，Bubble 才能在这里给出更好的计划。",
    openStudy: "打开学习",
    openQuiz: "打开测验",
  },
} as const;

export function HomeStudyToday({ cards }: HomeStudyTodayProps) {
  const { locale } = useLanguage();
  const ui = todayCopy[locale] ?? todayCopy.en;
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

  const rankedCards = useMemo(
    () =>
      [...localizedCards].sort((left, right) => {
        const leftProgress = progressMap[left.id] ?? { gotIt: 0, missedIt: 0 };
        const rightProgress = progressMap[right.id] ?? { gotIt: 0, missedIt: 0 };
        const priorityDiff =
          getBubblegumPriorityScore(rightProgress) -
          getBubblegumPriorityScore(leftProgress);

        return priorityDiff || left.order - right.order;
      }),
    [localizedCards, progressMap],
  );

  const repairCards = rankedCards
    .filter((card) =>
      getBubblegumStudyState(progressMap[card.id] ?? { gotIt: 0, missedIt: 0 }) ===
      "repair",
    )
    .slice(0, 3);

  const reviewCards = rankedCards
    .filter((card) =>
      getBubblegumStudyState(progressMap[card.id] ?? { gotIt: 0, missedIt: 0 }) ===
      "review",
    )
    .slice(0, 3);
  const recallCards = rankedCards
    .filter((card) =>
      getBubblegumStudyState(progressMap[card.id] ?? { gotIt: 0, missedIt: 0 }) ===
      "stable",
    )
    .slice(0, 1);
  const repairPlanCards = repairCards.slice(0, 2);
  const reviewPlanCard = reviewCards[0];
  const recallPlanCard = recallCards[0];
  const hasPlan = repairPlanCards.length > 0 || reviewPlanCard || recallPlanCard;

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
    <section className="paper-panel bubble-shadow rounded-[2rem] border border-[color:var(--line)] p-6 sm:p-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
            {ui.eyebrow}
          </p>
          <h2 className="ink-title mt-2 font-display text-4xl text-slate-900">
            {ui.title}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
          {ui.description}
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[1.7rem] border border-rose-200 bg-[linear-gradient(180deg,rgba(255,244,246,0.96),rgba(255,255,255,0.98))] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
            {ui.repairNow}
          </p>
          <div className="mt-4 grid gap-3">
            {repairCards.length === 0 ? (
              <div className="rounded-[1.3rem] border border-rose-100 bg-white px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                {ui.noRepair}
              </div>
            ) : (
              repairCards.map((card) => {
                const progress = progressMap[card.id] ?? { gotIt: 0, missedIt: 0 };
                const missType = missTypeLabel(progress);

                return (
                  <div
                    key={card.id}
                    className="rounded-[1.35rem] border border-rose-100 bg-white px-4 py-4"
                  >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-600">
                      {getCourseDisplayLabel(card.course, locale, { includeCode: false })}
                    </span>
                    <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                      {stateLabel(card.id)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{card.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {getTechniqueLabel(card, locale)}
                  </p>
                  {missType ? (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">
                      {ui.missReason}: {missType}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/bubblegum/${card.id}`}
                      className="rounded-full bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
                    >
                      {ui.openDrill}
                    </Link>
                    <Link
                      href={`/topics/${card.id}`}
                      className="rounded-full border border-[color:var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[#c77964]"
                    >
                      {ui.openTopic}
                    </Link>
                  </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-[1.7rem] border border-sky-200 bg-[linear-gradient(180deg,rgba(241,249,255,0.96),rgba(255,255,255,0.98))] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            {ui.reviewNext}
          </p>
          <div className="mt-4 grid gap-3">
            {reviewCards.length === 0 ? (
              <div className="rounded-[1.3rem] border border-sky-100 bg-white px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                {ui.noReview}
              </div>
            ) : (
              reviewCards.map((card) => {
                const progress = progressMap[card.id] ?? { gotIt: 0, missedIt: 0 };
                const missType = missTypeLabel(progress);

                return (
                  <div
                    key={card.id}
                    className="rounded-[1.35rem] border border-sky-100 bg-white px-4 py-4"
                  >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                      {getCourseDisplayLabel(card.course, locale, { includeCode: false })}
                    </span>
                    <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                      {stateLabel(card.id)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{card.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {getTechniqueLabel(card, locale)}
                  </p>
                  {missType ? (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                      {ui.missReason}: {missType}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/topics/${card.id}`}
                      className="rounded-full border border-[color:var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[#c77964]"
                    >
                      {ui.openTopic}
                    </Link>
                    <Link
                      href="/study"
                      className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-900 transition hover:border-sky-300"
                    >
                      Study
                    </Link>
                  </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[1.85rem] border border-[color:var(--line)] bg-[rgba(255,252,248,0.92)] p-5">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
              {ui.todayPlan}
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              {ui.todayPlanHelp}
            </p>
          </div>
        </div>

        {!hasPlan ? (
          <div className="mt-4 rounded-[1.3rem] border border-[color:var(--line)] bg-white px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
            {ui.noPlanYet}
          </div>
        ) : (
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.4rem] border border-rose-100 bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-600">
                {ui.repairBlock}
              </p>
              <div className="mt-3 grid gap-3">
                {repairPlanCards.length === 0 ? (
                  <p className="text-sm leading-6 text-[color:var(--muted)]">{ui.noRepair}</p>
                ) : (
                  repairPlanCards.map((card) => {
                    const progress = progressMap[card.id] ?? { gotIt: 0, missedIt: 0 };
                    const missType = missTypeLabel(progress);

                    return (
                      <div key={card.id} className="rounded-[1rem] border border-rose-100 bg-rose-50/60 px-3 py-3">
                        <p className="font-semibold text-slate-900">{card.name}</p>
                        {missType ? (
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-rose-700">
                            {ui.missReason}: {missType}
                          </p>
                        ) : null}
                      </div>
                    );
                  })
                )}
              </div>
              {repairPlanCards.length > 0 ? (
                <Link
                  href={`/bubblegum/${repairPlanCards[0].id}`}
                  className="mt-4 inline-flex rounded-full bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  {ui.openDrill}
                </Link>
              ) : null}
            </div>

            <div className="rounded-[1.4rem] border border-sky-100 bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                {ui.reviewBlock}
              </p>
              {reviewPlanCard ? (
                <>
                  <div className="mt-3 rounded-[1rem] border border-sky-100 bg-sky-50/60 px-3 py-3">
                    <p className="font-semibold text-slate-900">{reviewPlanCard.name}</p>
                    <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                      {getTechniqueLabel(reviewPlanCard, locale)}
                    </p>
                  </div>
                  <Link
                    href={`/study?focus=${reviewPlanCard.id}`}
                    className="mt-4 inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-900 transition hover:border-sky-300"
                  >
                    {ui.openStudy}
                  </Link>
                </>
              ) : (
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{ui.noReview}</p>
              )}
            </div>

            <div className="rounded-[1.4rem] border border-emerald-100 bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                {ui.recallBlock}
              </p>
              {recallPlanCard ? (
                <>
                  <div className="mt-3 rounded-[1rem] border border-emerald-100 bg-emerald-50/60 px-3 py-3">
                    <p className="font-semibold text-slate-900">{recallPlanCard.name}</p>
                    <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                      {getTechniqueLabel(recallPlanCard, locale)}
                    </p>
                  </div>
                  <Link
                    href={`/quiz?focus=${recallPlanCard.id}`}
                    className="mt-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-900 transition hover:border-emerald-300"
                  >
                    {ui.openQuiz}
                  </Link>
                </>
              ) : (
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {ui.noReview}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

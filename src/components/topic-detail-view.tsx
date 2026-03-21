"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { MathConceptVisual } from "@/components/math-concept-visual";
import { WorkedExamplePhoto } from "@/components/worked-example-photo";
import { localizeCard } from "@/content/localization";
import type { BubbleCard } from "@/content/schema";
import { getCourseDisplayLabel } from "@/lib/bubble";
import { buildBubblegumDrill } from "@/lib/bubblegum";
import {
  BUBBLE_PROGRESS_EVENT,
  isBubblegumTopicMastered,
} from "@/lib/progress";
import {
  getPatternTokens,
  getRecognitionPrompt,
  getTechniqueLabel,
} from "@/lib/recognition";

interface TopicDetailViewProps {
  card: BubbleCard;
  relatedCards: BubbleCard[];
  previous?: BubbleCard;
  next?: BubbleCard;
}

const supportSections: Array<{
  labelKey:
    | "useItWhen"
    | "thinkOfItAs"
    | "watchOutFor"
    | "rememberThis";
  valueKey:
    | "useItWhen"
    | "thinkOfItAs"
    | "watchOutFor"
    | "rememberThis";
}> = [
  { labelKey: "useItWhen", valueKey: "useItWhen" },
  { labelKey: "thinkOfItAs", valueKey: "thinkOfItAs" },
  { labelKey: "watchOutFor", valueKey: "watchOutFor" },
  { labelKey: "rememberThis", valueKey: "rememberThis" },
];

const teachingCopy = {
  en: {
    learnThisTopic: "Learn this topic",
    oneLineIdea: "One-line idea",
    tinyStarter: "Tiny starter",
    notationHelp: "Notation help",
    easyToHardPath: "Easy to hard path",
    nextAfterThis: "Next after this",
    bubblegumNote: "Bubblegum starts with warm-up, then moves to quiz, midterm, and final-style practice.",
    warmup: "Warm-up",
    quiz: "Quiz",
    midterm: "Midterm",
    final: "Final",
  },
  es: {
    learnThisTopic: "Aprende este tema",
    oneLineIdea: "Idea en una linea",
    tinyStarter: "Mini arranque",
    notationHelp: "Ayuda de notacion",
    easyToHardPath: "Ruta de facil a dificil",
    nextAfterThis: "Lo que sigue",
    bubblegumNote: "Bubblegum empieza con calentamiento y luego pasa a practica estilo quiz, parcial y final.",
    warmup: "Calentamiento",
    quiz: "Quiz",
    midterm: "Parcial",
    final: "Final",
  },
  zh: {
    learnThisTopic: "学这个主题",
    oneLineIdea: "一句话先懂",
    tinyStarter: "最小起步题",
    notationHelp: "符号提示",
    easyToHardPath: "从易到难",
    nextAfterThis: "接下来练什么",
    bubblegumNote: "Bubblegum 会先从热身开始，再进入小测、期中、期末风格练习。",
    warmup: "热身",
    quiz: "小测",
    midterm: "期中",
    final: "期末",
  },
} as const;

function getPrimerLine(
  locale: keyof typeof teachingCopy,
  card: BubbleCard,
  technique: string,
) {
  if (locale === "es") {
    return `${card.name} aparece cuando ${card.useItWhen}. La jugada base es ${technique}.`;
  }

  if (locale === "zh") {
    return `${card.name} 会在 ${card.useItWhen} 时出现。基础做法先用 ${technique}。`;
  }

  return `${card.name} shows up when ${card.useItWhen}. The base move is ${technique}.`;
}

export function TopicDetailView({
  card,
  relatedCards,
  previous,
  next,
}: TopicDetailViewProps) {
  const { difficultyLabel, locale, t } = useLanguage();
  const localizedCard = localizeCard(card, locale);
  const teach = teachingCopy[locale] ?? teachingCopy.en;
  const [bubblegumMastered, setBubblegumMastered] = useState(false);
  const localizedRelatedCards = relatedCards.map((item) => localizeCard(item, locale));
  const localizedPrevious = previous ? localizeCard(previous, locale) : undefined;
  const localizedNext = next ? localizeCard(next, locale) : undefined;
  const localizedRecognitionPrompt = getRecognitionPrompt(localizedCard);
  const localizedPatternTokens = getPatternTokens(localizedCard);
  const localizedTechniqueLabel = getTechniqueLabel(localizedCard, locale);
  const warmupDrill = buildBubblegumDrill(localizedCard, locale, "warmup", 0);
  const quizDrill = buildBubblegumDrill(localizedCard, locale, "quiz", 0);
  const midtermDrill = buildBubblegumDrill(localizedCard, locale, "midterm", 0);
  const finalDrill = buildBubblegumDrill(localizedCard, locale, "final", 0);
  const primerLine = getPrimerLine(locale, localizedCard, localizedTechniqueLabel);

  useEffect(() => {
    const sync = () => {
      setBubblegumMastered(isBubblegumTopicMastered(card.id));
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(BUBBLE_PROGRESS_EVENT, sync as EventListener);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(BUBBLE_PROGRESS_EVENT, sync as EventListener);
    };
  }, [card.id]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_22rem]">
        <article className="space-y-6">
          <div className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              <Link href="/topics" className="hover:text-sky-900">
                {t("navTopics")}
              </Link>
              <span>•</span>
              <span>{getCourseDisplayLabel(localizedCard.course, locale)}</span>
              <span>•</span>
              <span>{localizedCard.unit}</span>
              <span className="rounded-full bg-sky-100 px-3 py-1 tracking-normal">
                {difficultyLabel(localizedCard.difficulty)}
              </span>
            </div>

            <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,24rem)]">
              <div>
                <h1 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
                  {localizedCard.name}
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                  {localizedCard.memoryHook}
                </p>
              </div>
              <MathConceptVisual card={localizedCard} mode="detail" />
            </div>

            <section className="mt-6 rounded-[1.75rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,251,255,0.94))] p-5 lg:hidden">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                {t("quickScan")}
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-[1.35rem] bg-slate-950 px-4 py-4 text-sky-50">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300/80">
                    {t("problemCue")}
                  </p>
                  <p className="mt-2 font-mono text-sm leading-7">
                    {localizedRecognitionPrompt}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.35rem] border border-sky-100 bg-sky-50/90 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {t("techniqueToTry")}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                      {localizedTechniqueLabel}
                    </p>
                  </div>

                  <div className="rounded-[1.35rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(214,255,232,0.7),rgba(255,255,255,0.96))] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {t("firstMove")}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">
                      {localizedCard.doThis}
                    </p>
                  </div>

                  <div className="rounded-[1.35rem] border border-rose-100 bg-rose-50/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
                      {t("trap")}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">
                      {localizedCard.watchOutFor}
                    </p>
                  </div>

                  <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {t("rememberThis")}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">
                      {localizedCard.rememberThis}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-[1.85rem] border border-[color:var(--line)] bg-[linear-gradient(140deg,rgba(255,255,255,0.98),rgba(255,247,251,0.94))] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
                  {teach.learnThisTopic}
                </p>
                <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                  {teach.easyToHardPath}
                </span>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <div className="space-y-4">
                  <div className="rounded-[1.55rem] border border-[color:var(--line)] bg-white/90 p-5">
                    <p className="text-sm font-semibold text-rose-600">{teach.oneLineIdea}</p>
                    <p className="mt-3 text-base leading-7 text-slate-900">{primerLine}</p>
                  </div>

                  <div className="rounded-[1.55rem] border border-sky-100 bg-sky-50/90 p-5">
                    <p className="text-sm font-semibold text-sky-700">{t("whyThisFits")}</p>
                    <p className="mt-3 text-base leading-7 text-slate-900">{warmupDrill.whyFits}</p>
                  </div>

                  {warmupDrill.notationHelp.length > 0 ? (
                    <div className="rounded-[1.55rem] border border-amber-100 bg-amber-50/90 p-5">
                      <p className="text-sm font-semibold text-amber-700">{teach.notationHelp}</p>
                      <div className="mt-3 space-y-3 text-sm leading-6 text-slate-800">
                        {warmupDrill.notationHelp.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.55rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(214,255,232,0.7),rgba(255,255,255,0.96))] p-5">
                    <p className="text-sm font-semibold text-emerald-700">{teach.tinyStarter}</p>
                    <p className="mt-3 text-base font-semibold leading-7 text-slate-900">
                      {warmupDrill.prompt}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-700">
                      <span className="font-semibold text-slate-900">{t("firstMove")}:</span>{" "}
                      {warmupDrill.firstStep}
                    </p>
                  </div>

                  <div className="rounded-[1.55rem] border border-[color:var(--line)] bg-white/90 p-5">
                    <p className="text-sm font-semibold text-sky-700">{teach.nextAfterThis}</p>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-slate-800">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="font-semibold text-slate-900">{teach.warmup}:</span> {warmupDrill.prompt}
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="font-semibold text-slate-900">{teach.quiz}:</span> {quizDrill.prompt}
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="font-semibold text-slate-900">{teach.midterm}:</span> {midtermDrill.prompt}
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="font-semibold text-slate-900">{teach.final}:</span> {finalDrill.prompt}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,22rem)]">
              <section className="rounded-[1.85rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,249,255,0.94))] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {t("recognitionBoard")}
                  </p>
                  <span className="rounded-full border border-[color:var(--line)] bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                    {t("spotTheShapeFirst")}
                  </span>
                </div>

                <div className="mt-4 rounded-[1.6rem] border border-sky-100 bg-slate-950 px-5 py-5 text-left text-[1.05rem] leading-8 text-sky-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:text-[1.2rem]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
                    {t("problemLikeCue")}
                  </p>
                  <p className="mt-3 font-mono text-balance">
                    {localizedRecognitionPrompt}
                  </p>
                </div>

                <div className="mt-4 grid gap-4">
                  <div className="rounded-[1.55rem] border border-sky-100 bg-sky-50/90 p-5">
                    <p className="text-sm font-semibold text-sky-700">
                      {t("techniqueToTry")}
                    </p>
                    <p className="mt-3 text-base font-semibold leading-7 text-slate-900">
                      {localizedTechniqueLabel}
                    </p>
                  </div>

                  <div className="rounded-[1.55rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(214,255,232,0.7),rgba(255,255,255,0.94))] p-5">
                    <p className="text-sm font-semibold text-sky-700">
                      {t("firstMove")}
                    </p>
                    <p className="mt-3 text-base leading-7 text-slate-800">
                      {localizedCard.doThis}
                    </p>
                  </div>

                  <div className="rounded-[1.55rem] border border-[color:var(--line)] bg-white/90 p-5">
                    <p className="text-sm font-semibold text-sky-700">
                      {t("looksLike")}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {localizedPatternTokens.map((token) => (
                        <span
                          key={token}
                          className="max-w-full whitespace-normal break-words rounded-[1rem] border border-sky-100 bg-sky-50 px-3 py-2 font-mono text-sm text-sky-950"
                        >
                          {token}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <div className="grid gap-4">
                <section className="rounded-[1.75rem] border border-rose-100 bg-[linear-gradient(180deg,rgba(255,240,240,0.95),rgba(255,255,255,0.96))] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
                    {t("trap")}
                  </p>
                  <p className="mt-3 text-base leading-7 text-slate-800">
                      {localizedCard.watchOutFor}
                    </p>
                  </section>

                <section className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/90 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {t("keepInMind")}
                  </p>
                    <p className="mt-3 text-base leading-7 text-slate-800">
                    {localizedCard.useItWhen}
                    </p>
                  <div className="mt-4 rounded-[1.35rem] bg-sky-50/80 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {t("memoryHook")}
                    </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {localizedCard.rememberThis}
                      </p>
                    </div>
                  </section>
              </div>
            </div>
          </div>

          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {t("problemShapes")}
                </p>
                <div className="mt-4 grid gap-3">
                  {localizedCard.typicalProblemShapes.map((shape, index) => (
                    <div
                      key={shape}
                      className="rounded-[1.5rem] border border-[color:var(--line)] bg-sky-50/80 px-5 py-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                        {t("shape")} {index + 1}
                      </p>
                      <p className="mt-3 text-base leading-7 text-slate-800">
                        {shape}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {t("tryThisShape")}
                </p>
                <WorkedExamplePhoto card={localizedCard} />
              </div>
            </div>
          </section>

          <details className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 sm:p-8">
            <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 [&::-webkit-details-marker]:hidden">
              {t("moreSupport")}
            </summary>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {supportSections.map(({ labelKey, valueKey }) => (
                <section
                  key={labelKey}
                  className="rounded-[1.75rem] border border-[color:var(--line)] bg-white p-5"
                >
                  <p className="text-sm font-semibold text-sky-700">
                    {t(labelKey)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {localizedCard[valueKey]}
                  </p>
                </section>
              ))}
            </div>
          </details>

          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                {t("recognitionChecks")}
              </p>
              <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                {t("askWhatRuleFitsFirst")}
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {localizedCard.miniDrill.map((item, index) => (
                <div
                  key={item.prompt}
                  className="rounded-[1.75rem] border border-[color:var(--line)] bg-white p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {t("check")} {index + 1}
                  </p>
                  <p className="mt-3 text-base font-semibold leading-7 text-slate-900">
                    {item.prompt}
                  </p>
                  <p className="mt-4 rounded-[1.3rem] bg-sky-50/80 px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(255,229,239,0.82)_58%,rgba(255,245,251,0.96))] p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="inline-flex rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
                  Bubblegum
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {t("openBubblegum")}
                </p>
                <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                  {localizedCard.name} drills are always available here. {teach.bubblegumNote}
                  {bubblegumMastered ? ` • ${t("bubblegumMastered")}` : ""}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/bubblegum/${card.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  {t("openBubblegum")}
                </Link>
              </div>
            </div>
          </section>

          <section className="bubble-shadow flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6">
            <div className="flex flex-wrap gap-3">
              {localizedPrevious ? (
                <Link
                  href={`/topics/${localizedPrevious.id}`}
                  className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
                >
                  ← {localizedPrevious.name}
                </Link>
              ) : null}
              {localizedNext ? (
                <Link
                  href={`/topics/${localizedNext.id}`}
                  className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
                >
                  {localizedNext.name} →
                </Link>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/study"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-sky-900 hover:!text-white"
              >
                {t("studyThis")}
              </Link>
              <Link
                href="/quiz"
                className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
              >
                {t("quizMode")}
              </Link>
            </div>
          </section>
        </article>

        <aside className="space-y-6">
          <MathConceptVisual card={localizedCard} mode="detail" />

          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              {t("cardData")}
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3">
                  {getCourseDisplayLabel(localizedCard.course, locale)}
                </div>
              <div className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3">
                {localizedCard.chapter}
              </div>
              <div className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3">
                {localizedCard.topic}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs text-[color:var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              {t("relatedIn")} {localizedCard.unit}
            </p>
            <div className="mt-4 grid gap-3">
              {localizedRelatedCards.map((related) => (
                <Link
                  key={related.id}
                  href={`/topics/${related.id}`}
                  className="rounded-[1.5rem] border border-[color:var(--line)] bg-white px-4 py-4 transition hover:border-sky-200"
                >
                  <p className="font-semibold text-slate-900">{related.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {related.memoryHook}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

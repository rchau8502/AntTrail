"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { WorkedExamplePhoto } from "@/components/worked-example-photo";
import { localizeCard } from "@/content/localization";
import type { BubbleCard } from "@/content/schema";
import { getCourseDisplayLabel } from "@/lib/bubble";
import { BUBBLE_PROGRESS_EVENT, isBubbleTopicComplete, isBubblegumTopicMastered, setBubblegumTopicMastered } from "@/lib/progress";
import { getPatternTokens, getRecognitionPrompt, getTechniqueLabel } from "@/lib/recognition";

interface BubblegumQuestion {
  kind: "technique" | "firstMove" | "trap" | "pattern" | "memory" | "metaphor";
  prompt: string;
  answer: string;
  options: string[];
  note: string;
}

interface BubblegumModeProps {
  card: BubbleCard;
}

function firstChunk(text: string) {
  return text
    .split(/\s*(?:,|;|\.| then | and then | after that | luego | despues | después | y luego |，|；|。|然后|再)\s*/i)[0]
    .trim();
}

function uniqueOptions(answer: string, extras: string[]) {
  const seen = new Set<string>();
  const items: string[] = [];

  for (const value of [answer, ...extras]) {
    const cleaned = value.trim();

    if (!cleaned || seen.has(cleaned)) {
      continue;
    }

    seen.add(cleaned);
    items.push(cleaned);
  }

  return items;
}

function rotate<T>(items: T[], offset: number) {
  if (items.length === 0) {
    return items;
  }

  const safeOffset = offset % items.length;
  return items.slice(safeOffset).concat(items.slice(0, safeOffset));
}

function buildBubblegumQuestion(card: BubbleCard, locale: ReturnType<typeof useLanguage>["locale"], round: number): BubblegumQuestion {
  const technique = getTechniqueLabel(card, locale);
  const firstMove = firstChunk(card.doThis) || card.doThis;
  const trap = card.watchOutFor;
  const remember = card.rememberThis;
  const metaphor = card.thinkOfItAs;
  const shapes = card.typicalProblemShapes;
  const patternTokens = getPatternTokens(card);
  const cue = getRecognitionPrompt(card);
  const sampleShape = shapes[round % Math.max(shapes.length, 1)] ?? cue;
  const clue = patternTokens[round % Math.max(patternTokens.length, 1)] ?? card.looksLike;
  const type = round % 6;

  if (type === 0) {
    const options = rotate(
      uniqueOptions(technique, [firstMove, trap, remember, metaphor]).slice(0, 4),
      round + 1,
    );

    return {
      kind: "technique",
      prompt: sampleShape,
      answer: technique,
      options,
      note: remember,
    };
  }

  if (type === 1) {
    const options = rotate(
      uniqueOptions(firstMove, [technique, trap, remember, metaphor]).slice(0, 4),
      round + 2,
    );

    return {
      kind: "firstMove",
      prompt: cue,
      answer: firstMove,
      options,
      note: remember,
    };
  }

  if (type === 2) {
    const options = rotate(
      uniqueOptions(trap, [firstMove, remember, technique, metaphor]).slice(0, 4),
      round + 3,
    );

    return {
      kind: "trap",
      prompt: sampleShape,
      answer: trap,
      options,
      note: trap,
    };
  }

  if (type === 3) {
    const options = rotate(
      uniqueOptions(clue, [remember, trap, technique, firstMove]).slice(0, 4),
      round + 4,
    );

    return {
      kind: "pattern",
      prompt: card.name,
      answer: clue,
      options,
      note: technique,
    };
  }

  if (type === 4) {
    const options = rotate(
      uniqueOptions(remember, [metaphor, trap, firstMove, technique]).slice(0, 4),
      round + 5,
    );

    return {
      kind: "memory",
      prompt: cue,
      answer: remember,
      options,
      note: technique,
    };
  }

  const options = rotate(
    uniqueOptions(metaphor, [remember, firstMove, trap, technique]).slice(0, 4),
    round + 6,
  );

  return {
    kind: "metaphor",
    prompt: card.name,
    answer: metaphor,
    options,
    note: remember,
  };
}

function softnessLabel(level: number) {
  return "●".repeat(level) + "○".repeat(Math.max(0, 5 - level));
}

function getBubblegumFeedback(
  question: BubblegumQuestion,
  locale: ReturnType<typeof useLanguage>["locale"],
  selected: string,
) {
  const correct = selected === question.answer;

  const messages = {
    en: {
      fit: {
        technique: `This cue points to ${question.answer}.`,
        firstMove: `This is the first clean move: ${question.answer}.`,
        trap: "That is the main mistake to avoid here.",
        pattern: "That is the shape clue to recognize first.",
        memory: "That is the short line worth keeping in your head.",
        metaphor: "That picture is the quickest way to remember the topic.",
      },
      miss: {
        technique: `That option is a move, but this shape points to ${question.answer}.`,
        firstMove: `That is not the first step. Start with ${question.answer}.`,
        trap: `That is not the usual miss here. The common trap is ${question.answer}.`,
        pattern: `That clue does not match the main shape here. Look for ${question.answer}.`,
        memory: `That line is not the key takeaway here. Keep ${question.answer}.`,
        metaphor: `That image is not the best memory cue here. Use ${question.answer}.`,
      },
    },
    es: {
      fit: {
        technique: `Esta pista apunta a ${question.answer}.`,
        firstMove: `Este es el primer paso limpio: ${question.answer}.`,
        trap: "Ese es el error típico que conviene evitar aquí.",
        pattern: "Esa es la forma que conviene reconocer primero.",
        memory: "Esa es la frase corta que vale la pena guardar.",
        metaphor: "Esa imagen es la forma más rápida de recordarlo.",
      },
      miss: {
        technique: `Esa opción nombra una técnica, pero esta forma apunta a ${question.answer}.`,
        firstMove: `Esa no es la primera jugada. Empieza con ${question.answer}.`,
        trap: `Ese no es el error típico aquí. La trampa común es ${question.answer}.`,
        pattern: `Esa pista no coincide con la forma principal. Busca ${question.answer}.`,
        memory: `Esa frase no es la idea clave aquí. Quédate con ${question.answer}.`,
        metaphor: `Esa imagen no es la mejor pista de memoria aquí. Usa ${question.answer}.`,
      },
    },
    zh: {
      fit: {
        technique: `这道题型先指向 ${question.answer}。`,
        firstMove: `这里最干净的第一步就是：${question.answer}。`,
        trap: "这就是这里最常见的坑。",
        pattern: "这就是你该先认出来的题型线索。",
        memory: "这句才是最值得先记住的短句。",
        metaphor: "这个比喻是最快的记忆图像。",
      },
      miss: {
        technique: `你选的也是一种方法，但这道题型更明显地指向 ${question.answer}。`,
        firstMove: `这不是第一步，应该先从 ${question.answer} 开始。`,
        trap: `这不是这里最常见的失误，真正的坑是 ${question.answer}。`,
        pattern: `这条线索和主题型不匹配，先抓 ${question.answer}。`,
        memory: `这句不是这里最核心的记忆点，先记 ${question.answer}。`,
        metaphor: `这个比喻不够贴切，先用 ${question.answer} 来记。`,
      },
    },
  } as const;

  const bundle = messages[locale] ?? messages.en;
  return correct ? bundle.fit[question.kind] : bundle.miss[question.kind];
}

export function BubblegumMode({ card }: BubblegumModeProps) {
  const { locale, t } = useLanguage();
  const localizedCard = useMemo(() => localizeCard(card, locale), [card, locale]);
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [chews, setChews] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bubbleComplete, setBubbleComplete] = useState(false);
  const [mastered, setMastered] = useState(false);

  useEffect(() => {
    const sync = () => {
      setBubbleComplete(isBubbleTopicComplete(card.id));
      setMastered(isBubblegumTopicMastered(card.id));
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(BUBBLE_PROGRESS_EVENT, sync as EventListener);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(BUBBLE_PROGRESS_EVENT, sync as EventListener);
    };
  }, [card.id]);

  const question = useMemo(
    () => buildBubblegumQuestion(localizedCard, locale, round),
    [localizedCard, locale, round],
  );
  const softness = Math.max(1, Math.min(5, Math.floor((chews + streak) / 2) + 1));
  const readyToSpit = softness >= 5 && streak >= 3;

  function choose(option: string) {
    if (selected) {
      return;
    }

    setSelected(option);
    setChews((value) => value + 1);

    if (option === question.answer) {
      setStreak((value) => value + 1);
    } else {
      setStreak(0);
    }
  }

  function nextVariation() {
    setSelected(null);
    setRound((value) => value + 1);
  }

  function spitItOut() {
    setBubblegumTopicMastered(card.id, true);
    setMastered(true);
  }

  const promptLabels = {
    technique: t("whichTechniqueApplies"),
    firstMove: t("firstMove"),
    trap: t("trap"),
    pattern: t("looksLike"),
    memory: t("memoryHook"),
    metaphor: t("thinkOfItAs"),
  } as const;
  const feedback = selected
    ? getBubblegumFeedback(question, locale, selected)
    : null;

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
              {t("bubblegumDescription")}
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

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/topics/${card.id}`}
            className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-rose-200"
          >
            {t("backToBubble")}
          </Link>
          <span
            className={`rounded-full px-4 py-3 text-sm font-semibold ${
              bubbleComplete
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {bubbleComplete ? t("bubblegumUnlocked") : t("bubblegumLocked")}
          </span>
          {mastered ? (
            <span className="rounded-full bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700">
              {t("bubblegumMastered")}
            </span>
          ) : null}
        </div>
      </section>

      <section className="bubble-shadow rounded-[2.2rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
        <div className="rounded-[1.85rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,244,248,0.94))] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
            {promptLabels[question.kind]}
          </p>
          <p className="mt-4 text-xl leading-8 text-slate-900 sm:text-2xl">
            {question.prompt}
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {question.options.map((option) => {
            const isCorrect = option === question.answer;
            const isSelected = option === selected;
            let tone = "border-[color:var(--line)] bg-white hover:border-rose-200";

            if (selected && isCorrect) {
              tone = "border-emerald-200 bg-emerald-50";
            } else if (selected && isSelected && !isCorrect) {
              tone = "border-rose-200 bg-rose-50";
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                className={`rounded-[1.5rem] border p-5 text-left text-sm font-semibold text-slate-900 transition ${tone}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-rose-50/70 p-5">
              <p className="text-sm font-semibold text-slate-900">
                {selected === question.answer ? t("correct") : t("tryAgainNextRound")}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                <span className="font-semibold text-slate-900">
                  {selected === question.answer ? t("whyThisFits") : t("whyThatMisses")}:
                </span>{" "}
                {feedback}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {t("bestCall")}:{" "}
                <span className="font-semibold text-slate-900">{question.answer}</span>.{" "}
                {t("hook")}: {question.note}
              </p>
            </div>

            <WorkedExamplePhoto card={localizedCard} />

            {mastered ? (
              <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50/70 p-5">
                <p className="text-sm font-semibold text-rose-700">
                  {t("bubblegumMastered")}
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  {t("bubblegumMasteredHelp")}
                </p>
              </div>
            ) : readyToSpit ? (
              <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50/70 p-5">
                <p className="text-sm font-semibold text-rose-700">
                  {t("bubblegumReady")}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
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
                    className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-rose-200"
                  >
                    {t("keepChewing")}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={nextVariation}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-rose-700 hover:!text-white"
              >
                {t("chewNext")}
              </button>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}

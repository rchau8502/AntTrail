"use client";

import Image from "next/image";

import type { BubbleCard } from "@/content/schema";
import { useLanguage } from "@/components/language-provider";

interface WorkedExamplePhotoProps {
  card: BubbleCard;
}

function getBackground(card: BubbleCard) {
  const courseCode = card.courseCode ?? "";
  const fingerprint = [card.unit, card.topic, card.name, ...card.tags]
    .join(" ")
    .toLowerCase();

  if (
    courseCode === "MATH 13" ||
    courseCode === "MATH 120A" ||
    courseCode === "MATH 140A" ||
    fingerprint.includes("proof") ||
    fingerprint.includes("logic") ||
    fingerprint.includes("analysis")
  ) {
    return "/images/worked-examples/notebook-warm.png";
  }

  if (
    courseCode === "MATH 3A" ||
    courseCode === "MATH 121A" ||
    courseCode === "MATH 130A" ||
    courseCode === "MATH 130B" ||
    fingerprint.includes("matrix") ||
    fingerprint.includes("vector") ||
    fingerprint.includes("probability")
  ) {
    return "/images/worked-examples/clipboard-grid.png";
  }

  return "/images/worked-examples/notebook-blue.png";
}

export function WorkedExamplePhoto({ card }: WorkedExamplePhotoProps) {
  const { t } = useLanguage();
  const problem = card.quickExample?.problem ?? card.looksLike;
  const firstMove = card.quickExample?.move ?? card.doThis;

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--line)] bg-slate-100">
      <div className="relative aspect-[3/2]">
        <Image
          src={getBackground(card)}
          alt={`${card.name} worked example background`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />

        <div className="absolute inset-x-[9%] top-[10%] bottom-[10%] flex flex-col">
          <div className="max-w-[66%] rounded-2xl bg-white/72 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-[2px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
              {t("problemCue")}
            </p>
            <p
              className="mt-2 text-[clamp(1.3rem,2vw,1.9rem)] leading-[1.12] text-slate-900"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              {problem}
            </p>
          </div>

          <div className="mt-5 max-w-[62%] rounded-2xl bg-white/68 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-[2px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
              {t("firstMove")}
            </p>
            <p
              className="mt-2 text-[clamp(1.15rem,1.8vw,1.6rem)] leading-[1.12] text-slate-900"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              {firstMove}
            </p>
          </div>

          <div className="mt-auto self-end rounded-full bg-slate-900/78 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            {card.name}
          </div>
        </div>
      </div>
    </div>
  );
}

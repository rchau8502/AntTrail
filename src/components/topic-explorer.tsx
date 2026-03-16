"use client";

import Link from "next/link";
import { useState } from "react";

import { MathConceptVisual } from "@/components/math-concept-visual";
import type { BubbleCard, Difficulty, Unit } from "@/content/schema";
import {
  courseTitles,
  difficulties,
  getChapterOptions,
  getCourseOptions,
  getUnitOptions,
} from "@/lib/bubble";
import { getPatternTokens, getRecognitionPrompt } from "@/lib/recognition";

interface TopicExplorerProps {
  cards: BubbleCard[];
}

export function TopicExplorer({ cards }: TopicExplorerProps) {
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<"All" | string>("All");
  const [unitFilter, setUnitFilter] = useState<"All" | Unit>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<"All" | Difficulty>(
    "All",
  );
  const [chapterFilter, setChapterFilter] = useState<"All" | string>("All");

  const courseScopedCards =
    courseFilter === "All"
      ? cards
      : cards.filter((card) => card.course === courseFilter);
  const unitOptions = getUnitOptions(courseScopedCards);
  const chapterOptions = getChapterOptions(courseScopedCards);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCards = cards.filter((card) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [
        card.name,
        card.topic,
        card.memoryHook,
        card.useItWhen,
        ...card.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesCourse = courseFilter === "All" || card.course === courseFilter;
    const matchesUnit = unitFilter === "All" || card.unit === unitFilter;
    const matchesDifficulty =
      difficultyFilter === "All" || card.difficulty === difficultyFilter;
    const matchesChapter =
      chapterFilter === "All" || card.chapter === chapterFilter;

    return (
      matchesQuery &&
      matchesCourse &&
      matchesUnit &&
      matchesDifficulty &&
      matchesChapter
    );
  });

  const groupedCards = getCourseOptions(filteredCards).map((course) => ({
    course,
    cards: filteredCards.filter((card) => card.course === course),
  }));

  return (
    <div className="space-y-8">
      <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 sm:p-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
          <div className="space-y-3">
            <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              Topic Dashboard
            </p>
            <h1 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
              Find the rule fast.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              Search by pattern, filter by chapter or difficulty, and scan each
              card like a quick study sheet instead of a textbook chapter.
            </p>
          </div>

          <div className="grid gap-3 rounded-[1.75rem] border border-[color:var(--line)] bg-white/75 p-4">
            <p className="text-sm font-semibold text-slate-900">
              Quick filters
            </p>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search chain rule, slope, limits..."
              className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-300"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <select
                value={courseFilter}
                onChange={(event) => {
                  setCourseFilter(event.target.value);
                  setUnitFilter("All");
                  setChapterFilter("All");
                }}
                className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="All">All courses</option>
                {courseTitles.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              <select
                value={unitFilter}
                onChange={(event) =>
                  setUnitFilter(event.target.value as "All" | Unit)
                }
                className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="All">All units</option>
                {unitOptions.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>

              <select
                value={difficultyFilter}
                onChange={(event) =>
                  setDifficultyFilter(
                    event.target.value as "All" | Difficulty,
                  )
                }
                className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="All">All difficulty</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>

              <select
                value={chapterFilter}
                onChange={(event) =>
                  setChapterFilter(event.target.value)
                }
                className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="All">All chapters</option>
                {chapterOptions.map((chapter) => (
                  <option key={chapter} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-[color:var(--muted)]">
              {filteredCards.length} card
              {filteredCards.length === 1 ? "" : "s"} ready to scan
            </p>
          </div>
        </div>
      </section>

      {groupedCards.map(({ course, cards: courseCards }) => (
        <section key={course} className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                {course}
              </p>
              <h2 className="font-display text-3xl text-slate-900">
                {courseCards.length} topics
              </h2>
            </div>
          </div>

          {courseCards.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-[color:var(--line-strong)] bg-white/60 p-6 text-sm text-[color:var(--muted)]">
              No cards match this filter set.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {courseCards.map((card) => (
                <Link
                  key={card.id}
                  href={`/topics/${card.id}`}
                  className="bubble-shadow group rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    <span>{card.unit}</span>
                    <span>{card.chapter}</span>
                    <span className="rounded-full bg-sky-100 px-2 py-1 tracking-normal">
                      {card.difficulty}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">
                    {card.name}
                  </h3>
                  <div className="mt-4">
                    <MathConceptVisual card={card} mode="card" />
                  </div>
                  <div className="mt-4 rounded-[1.35rem] bg-slate-950 px-4 py-4 text-sky-50">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300/80">
                      Problem cue
                    </p>
                    <p className="mt-2 font-mono text-sm leading-7">
                      {getRecognitionPrompt(card)}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {getPatternTokens(card).map((token) => (
                      <span
                        key={token}
                        className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 font-mono text-xs text-sky-950"
                      >
                        {token}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 rounded-[1.4rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(214,255,232,0.76),rgba(255,255,255,0.96))] px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                      First move
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">
                      {card.doThis}
                    </p>
                  </div>
                  <div className="mt-4 rounded-[1.35rem] border border-rose-100 bg-rose-50/70 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-600">
                      Trap
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {card.watchOutFor}
                    </p>
                  </div>
                  <div className="mt-4 rounded-2xl bg-sky-50/80 px-4 py-3 text-sm font-medium text-sky-950">
                    {card.memoryHook}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-[color:var(--muted)]">
                    {card.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[color:var(--line)] px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-900 transition group-hover:text-sky-700">
                    Open bubble →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

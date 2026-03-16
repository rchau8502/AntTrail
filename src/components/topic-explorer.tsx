"use client";

import Link from "next/link";
import { useState } from "react";

import type { BubbleCard, Difficulty, Unit } from "@/content/schema";
import { chapters, difficulties, units } from "@/lib/bubble";

interface TopicExplorerProps {
  cards: BubbleCard[];
}

export function TopicExplorer({ cards }: TopicExplorerProps) {
  const [query, setQuery] = useState("");
  const [unitFilter, setUnitFilter] = useState<"All" | Unit>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<"All" | Difficulty>(
    "All",
  );
  const [chapterFilter, setChapterFilter] =
    useState<"All" | (typeof chapters)[number]>("All");

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

    const matchesUnit = unitFilter === "All" || card.unit === unitFilter;
    const matchesDifficulty =
      difficultyFilter === "All" || card.difficulty === difficultyFilter;
    const matchesChapter =
      chapterFilter === "All" || card.chapter === chapterFilter;

    return matchesQuery && matchesUnit && matchesDifficulty && matchesChapter;
  });

  const groupedCards = units.map((unit) => ({
    unit,
    cards: filteredCards.filter((card) => card.unit === unit),
  }));

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 shadow-[var(--shadow)] sm:p-8">
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
                value={unitFilter}
                onChange={(event) =>
                  setUnitFilter(event.target.value as "All" | Unit)
                }
                className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="All">All units</option>
                {units.map((unit) => (
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
                  setChapterFilter(
                    event.target.value as "All" | (typeof chapters)[number],
                  )
                }
                className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="All">All chapters</option>
                {chapters.map((chapter) => (
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

      {groupedCards.map(({ unit, cards: unitCards }) => (
        <section key={unit} className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                {unit}
              </p>
              <h2 className="font-display text-3xl text-slate-900">
                {unitCards.length} topics
              </h2>
            </div>
          </div>

          {unitCards.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-[color:var(--line-strong)] bg-white/60 p-6 text-sm text-[color:var(--muted)]">
              No cards match this filter set.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {unitCards.map((card) => (
                <Link
                  key={card.id}
                  href={`/topics/${card.id}`}
                  className="group rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    <span>{card.chapter}</span>
                    <span className="rounded-full bg-sky-100 px-2 py-1 tracking-normal">
                      {card.difficulty}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">
                    {card.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {card.useItWhen}
                  </p>
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

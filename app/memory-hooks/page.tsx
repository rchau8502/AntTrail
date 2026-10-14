"use client";

import Link from "next/link";

import { useLanguage } from "@/components/language-provider";
import { localizeCards } from "@/content/localization";
import { SiteHeader } from "@/components/site-header";
import {
  allCards,
  getCourseDisplayLabel,
  groupCardsByCourse,
  groupCardsByUnit,
} from "@/lib/bubble";

export default function MemoryHooksPage() {
  const { locale, t } = useLanguage();
  const courses = groupCardsByCourse(localizeCards(allCards, locale));

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 sm:p-8">
          <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
            {t("memoryHookView")}
          </p>
          <h1 className="mt-4 font-display text-4xl text-slate-900 sm:text-5xl">
            {t("fullPageCramSheet")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
            {t("memoryHookDescription")}
          </p>
        </section>

        <div className="mt-8 grid gap-8">
          {courses.map((course) => (
            <section key={course.course} className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {getCourseDisplayLabel(course.course, locale)}
                </p>
                <h2 className="mt-2 font-display text-3xl text-slate-900">
                  {course.cards.length} {t("memoryHooks")}
                </h2>
              </div>
              <div className="space-y-6">
                {groupCardsByUnit(course.cards).map((group) => (
                  <div key={group.unit} className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      {group.unit}
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {group.cards.map((card) => (
                        <Link
                          key={card.id}
                          href={`/topics/${card.id}`}
                          className="bubble-shadow rounded-[1.75rem] border border-[color:var(--line)] bg-white/90 p-5 transition hover:-translate-y-1"
                        >
                          {card.courseCode ? (
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                              {card.courseCode}
                            </p>
                          ) : null}
                          <p className="text-sm font-semibold text-slate-900">
                            {card.name}
                          </p>
                          <p className="mt-3 text-lg leading-7 text-sky-950">
                            {card.memoryHook}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

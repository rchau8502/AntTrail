"use client";

import Link from "next/link";
import { useMemo } from "react";

import { useLanguage } from "@/components/language-provider";
import {
  courseCatalog,
  getCourseDisplayLabel,
  getLocalizedCourseSummaries,
} from "@/lib/course-catalog";

interface CoursePathwaysProps {
  selectedCourse?: string;
  onSelectCourse?: (course: string | "All") => void;
}

export function CoursePathways({
  selectedCourse = "All",
  onSelectCourse,
}: CoursePathwaysProps) {
  const { locale, t } = useLanguage();
  const localizedCourses = useMemo(
    () => getLocalizedCourseSummaries(locale),
    [locale],
  );

  return (
    <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(234,246,255,0.84))] p-6 sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="inline-flex rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
            {t("coursePathways")}
          </p>
          <div className="space-y-2">
            <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">
              {t("pickCourseFirst")}
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              {t("coursePathwaysDescription")}
            </p>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white/85 px-4 py-4 text-sm leading-6 text-slate-700 lg:max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            {t("professorLens")}
          </p>
          <p className="mt-2">{t("professorLensBody")}</p>
        </div>
      </div>

      <div className="mt-6 sm:hidden">
        <div className="-mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-2">
          {onSelectCourse ? (
            <button
              type="button"
              onClick={() => onSelectCourse("All")}
              className={`min-w-[18rem] snap-start rounded-[1.75rem] border p-5 text-left transition ${
                selectedCourse === "All"
                  ? "border-sky-200 bg-sky-50/90"
                  : "border-[color:var(--line)] bg-white/85 hover:border-sky-200 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-slate-900">{t("allCourses")}</p>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  {courseCatalog.length}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {t("allCoursesDescription")}
              </p>
            </button>
          ) : (
            <Link
              href="/topics"
              className="min-w-[18rem] snap-start rounded-[1.75rem] border border-[color:var(--line)] bg-white/85 p-5 text-left transition hover:border-sky-200 hover:bg-white"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-slate-900">{t("allCourses")}</p>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  {courseCatalog.length}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {t("allCoursesDescription")}
              </p>
            </Link>
          )}

          {localizedCourses.map((course) => {
            const primaryCode = course.courseCodes?.[0];
            const isSelected = selectedCourse === course.title;
            const cardClasses = `min-w-[18rem] snap-start rounded-[1.75rem] border p-5 text-left transition ${
              isSelected
                ? "border-sky-200 bg-sky-50/90"
                : "border-[color:var(--line)] bg-white/85 hover:border-sky-200 hover:bg-white"
            }`;

            const content = (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  {primaryCode ? (
                    <span className="rounded-full border border-sky-100 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                      {primaryCode}
                    </span>
                  ) : null}
                  <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                    {course.cardCount} {t("cardsWord")}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {getCourseDisplayLabel(course.title, locale, {
                    includeCode: false,
                  })}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {course.shortDescription}
                </p>
              </>
            );

            if (onSelectCourse) {
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => onSelectCourse(isSelected ? "All" : course.title)}
                  className={cardClasses}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link key={course.id} href={`/courses/${course.id}`} className={cardClasses}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-3">
        {onSelectCourse ? (
          <button
            type="button"
            onClick={() => onSelectCourse("All")}
            className={`rounded-[1.75rem] border p-5 text-left transition ${
              selectedCourse === "All"
                ? "border-sky-200 bg-sky-50/90"
                : "border-[color:var(--line)] bg-white/85 hover:border-sky-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-slate-900">{t("allCourses")}</p>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                {courseCatalog.length}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              {t("allCoursesDescription")}
            </p>
          </button>
        ) : (
          <Link
            href="/topics"
            className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/85 p-5 text-left transition hover:border-sky-200 hover:bg-white"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-slate-900">{t("allCourses")}</p>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                {courseCatalog.length}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              {t("allCoursesDescription")}
            </p>
          </Link>
        )}

        {localizedCourses.map((course) => {
          const primaryCode = course.courseCodes?.[0];
          const isSelected = selectedCourse === course.title;
          const cardClasses = `rounded-[1.75rem] border p-5 text-left transition ${
            isSelected
              ? "border-sky-200 bg-sky-50/90"
              : "border-[color:var(--line)] bg-white/85 hover:border-sky-200 hover:bg-white"
          }`;

          const content = (
            <>
              <div className="flex flex-wrap items-center gap-2">
                {primaryCode ? (
                  <span className="rounded-full border border-sky-100 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                    {primaryCode}
                  </span>
                ) : null}
                <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                  {course.cardCount} {t("cardsWord")}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {getCourseDisplayLabel(course.title, locale, {
                  includeCode: false,
                })}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {course.shortDescription}
              </p>
            </>
          );

          if (onSelectCourse) {
            return (
              <button
                key={course.id}
                type="button"
                onClick={() => onSelectCourse(isSelected ? "All" : course.title)}
                className={cardClasses}
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={course.id} href={`/courses/${course.id}`} className={cardClasses}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

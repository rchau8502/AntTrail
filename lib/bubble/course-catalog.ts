import type { BubbleCard } from "@/content/schema";
import { analysisOneCourse } from "@/content/analysis-1";
import { linearAlgebraOneCourse } from "@/content/linear-algebra-1";
import { multivariableCalculusTwoCourse } from "@/content/multivariable-calculus-2";
import { probabilityCourse } from "@/content/probability";
import { esCourseContent } from "@/content/translations/es";
import { zhCourseContent } from "@/content/translations/zh";
import { defaultLocale, type Locale, translateCourseTitle } from "@/lib/i18n";

export interface CourseSummary {
  id: string;
  title: string;
  courseCodes?: string[];
  aliases?: string[];
  shortDescription: string;
  cardCount: number;
  unitCount: number;
}

const localizedCourseContent = {
  es: esCourseContent,
  zh: zhCourseContent,
} as const;

export const courseCatalog: CourseSummary[] = [
  {
    id: probabilityCourse.id,
    title: probabilityCourse.title,
    courseCodes: probabilityCourse.courseCodes,
    aliases: probabilityCourse.aliases,
    shortDescription: probabilityCourse.shortDescription,
    cardCount: probabilityCourse.cards.length,
    unitCount: probabilityCourse.units.length,
  },
  {
    id: analysisOneCourse.id,
    title: analysisOneCourse.title,
    courseCodes: analysisOneCourse.courseCodes,
    aliases: analysisOneCourse.aliases,
    shortDescription: analysisOneCourse.shortDescription,
    cardCount: analysisOneCourse.cards.length,
    unitCount: analysisOneCourse.units.length,
  },
  {
    id: linearAlgebraOneCourse.id,
    title: linearAlgebraOneCourse.title,
    courseCodes: linearAlgebraOneCourse.courseCodes,
    aliases: linearAlgebraOneCourse.aliases,
    shortDescription: linearAlgebraOneCourse.shortDescription,
    cardCount: linearAlgebraOneCourse.cards.length,
    unitCount: linearAlgebraOneCourse.units.length,
  },
  {
    id: multivariableCalculusTwoCourse.id,
    title: multivariableCalculusTwoCourse.title,
    courseCodes: multivariableCalculusTwoCourse.courseCodes,
    aliases: multivariableCalculusTwoCourse.aliases,
    shortDescription: multivariableCalculusTwoCourse.shortDescription,
    cardCount: multivariableCalculusTwoCourse.cards.length,
    unitCount: multivariableCalculusTwoCourse.units.length,
  },
];

function unique<T>(items: T[]) {
  return [...new Set(items)];
}

export function getCourseSummaryByTitle(title: string) {
  return courseCatalog.find((course) => course.title === title);
}

export function getCourseSummaryById(id: string) {
  return courseCatalog.find((course) => course.id === id);
}

export function getCourseCodes(title: string) {
  return getCourseSummaryByTitle(title)?.courseCodes ?? [];
}

export function getPrimaryCourseCode(title: string) {
  return getCourseCodes(title)[0];
}

export function getCourseAliases(title: string) {
  return getCourseSummaryByTitle(title)?.aliases ?? [];
}

export function getCourseDisplayLabel(
  title: string,
  locale: Locale,
  options?: { includeCode?: boolean },
) {
  const label = translateCourseTitle(locale, title);
  const courseCode = getPrimaryCourseCode(title);

  if (options?.includeCode === false || !courseCode) {
    return label;
  }

  return `${courseCode}: ${label}`;
}

export function getLocalizedCourseSummaries(locale: Locale) {
  if (locale === defaultLocale) {
    return courseCatalog;
  }

  const localizedCourses =
    localizedCourseContent[locale as keyof typeof localizedCourseContent];

  return courseCatalog.map((course) => {
    const localized = localizedCourses?.[course.id];

    if (!localized) {
      return course;
    }

    return {
      ...course,
      title: localized.title,
      shortDescription: localized.shortDescription,
    };
  });
}

export function getCourseOptions(cards: BubbleCard[]) {
  return unique(cards.map((card) => card.course));
}

export function getUnitOptions(cards: BubbleCard[]) {
  return unique(cards.map((card) => card.unit));
}

export function getChapterOptions(cards: BubbleCard[]) {
  return unique(cards.map((card) => card.chapter));
}

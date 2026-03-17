import type { BubbleCard, CourseContent, MiniDrillItem, QuickExample } from "@/content/schema";
import { esCardContent, esCourseContent } from "@/content/translations/es";
import { zhCardContent, zhCourseContent } from "@/content/translations/zh";
import { defaultLocale, type Locale } from "@/lib/i18n";

interface LocalizedCardContent {
  course: string;
  chapter: string;
  unit: string;
  topic: string;
  name: string;
  useItWhen: string;
  looksLike: string;
  doThis: string;
  thinkOfItAs: string;
  watchOutFor: string;
  rememberThis: string;
  quickExample?: QuickExample;
  typicalProblemShapes: string[];
  miniDrill: MiniDrillItem[];
  memoryHook: string;
}

interface LocalizedCourseText {
  title: string;
  shortDescription: string;
  units: string[];
  chapters: string[];
}

const localizedContent: Partial<
  Record<
    Locale,
    {
      cards: Record<string, LocalizedCardContent>;
      courses: Record<string, LocalizedCourseText>;
    }
  >
> = {
  es: {
    cards: esCardContent,
    courses: esCourseContent,
  },
  zh: {
    cards: zhCardContent,
    courses: zhCourseContent,
  },
};

export function localizeCard(card: BubbleCard, locale: Locale) {
  if (locale === defaultLocale) {
    return card;
  }

  const localizedCard = localizedContent[locale]?.cards[card.id];

  if (!localizedCard) {
    return card;
  }

  return {
    ...card,
    ...localizedCard,
  };
}

export function localizeCards(cards: BubbleCard[], locale: Locale) {
  if (locale === defaultLocale) {
    return cards;
  }

  return cards.map((card) => localizeCard(card, locale));
}

export function localizeCourse(course: CourseContent, locale: Locale) {
  if (locale === defaultLocale) {
    return course;
  }

  const localizedCourse = localizedContent[locale]?.courses[course.id];

  if (!localizedCourse) {
    return course;
  }

  return {
    ...course,
    ...localizedCourse,
  };
}

export function localizeCourses(courses: CourseContent[], locale: Locale) {
  if (locale === defaultLocale) {
    return courses;
  }

  return courses.map((course) => localizeCourse(course, locale));
}

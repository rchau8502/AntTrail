import type { BubbleCard, CourseContent, LocalizedCardContent, LocalizedCourseText } from "@/content/schema";
import { esCardContent, esCourseContent } from "@/content/translations/es";
import { zhCardContent, zhCourseContent } from "@/content/translations/zh";
import { defaultLocale, type Locale } from "@/lib/i18n";

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
    // Keep the internal course key canonical so filters/grouping never split
    // into mixed English and localized buckets.
    course: card.course,
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

import type { BubbleCard } from "@/content/schema";
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
    id: "calc-1",
    title: "Single-Variable Calculus I",
    courseCodes: ["MATH 2A"],
    aliases: ["Calculus I", "Single Variable Calculus 1"],
    shortDescription:
      "Stewart-style single-variable calculus review for limits, differentiation, graph shape, and first integrals.",
    cardCount: 50,
    unitCount: 5,
  },
  {
    id: "calc-2",
    title: "Single-Variable Calculus II",
    courseCodes: ["MATH 2B"],
    aliases: ["Calculus II", "Single Variable Calculus 2"],
    shortDescription:
      "Stewart-style second-course calculus with integration techniques, applications, differential equations, parametric and polar curves, and series.",
    cardCount: 58,
    unitCount: 5,
  },
  {
    id: "calc-3",
    title: "Multivariable Calculus I",
    courseCodes: ["MATH 2D"],
    aliases: ["Calculus III", "Multivariable Calculus"],
    shortDescription:
      "Winter 2026 MATH 2D aligned to the suggested UCI flow: Sections 10.1-10.3, 12.1-12.6, 13.1-13.3 (light on curvature), 14.1-14.8, and 15.1-15.3.",
    cardCount: 50,
    unitCount: 6,
  },
  {
    id: "multivariable-calculus-2",
    title: "Multivariable Calculus II",
    courseCodes: ["MATH 2E"],
    aliases: ["Vector Calculus", "Multivariable Calculus 2"],
    shortDescription:
      "MATH 2E aligned to a Stewart-style vector-calculus flow: quick review of 13.1-13.3, then Sections 16.1-16.9.",
    cardCount: 11,
    unitCount: 4,
  },
  {
    id: "linear-algebra",
    title: "Introduction to Linear Algebra",
    courseCodes: ["MATH 3A"],
    aliases: ["Linear Algebra"],
    shortDescription:
      "Textbook-aligned MATH 3A with systems, matrices, determinants, vector spaces, inner product spaces, and eigen ideas.",
    cardCount: 43,
    unitCount: 6,
  },
  {
    id: "intro-proof",
    title: "Introduction to Abstract Mathematics",
    courseCodes: ["MATH 13"],
    aliases: ["Intro to Proof", "Abstract Math"],
    shortDescription:
      "Logic, proof patterns, sets, induction, and abstract-math writing basics.",
    cardCount: 44,
    unitCount: 7,
  },
  {
    id: "probability",
    title: "Probability I",
    courseCodes: ["MATH 130A"],
    aliases: ["Probability"],
    shortDescription:
      "Counting, conditional probability, random variables, and expectation.",
    cardCount: 50,
    unitCount: 6,
  },
  {
    id: "differential-equations",
    title: "Elementary Differential Equations",
    courseCodes: ["MATH 3D"],
    aliases: ["Differential Equations", "ODEs"],
    shortDescription:
      "UCI-style first differential equations with pattern-first method selection.",
    cardCount: 7,
    unitCount: 3,
  },
  {
    id: "abstract-algebra-1",
    title: "Introduction to Abstract Algebra: Groups",
    courseCodes: ["MATH 120A"],
    aliases: ["Abstract Algebra I", "Groups", "Group Theory"],
    shortDescription:
      "UCI-style first group theory with recognition-first subgroup and homomorphism patterns.",
    cardCount: 6,
    unitCount: 3,
  },
  {
    id: "linear-algebra-1",
    title: "Linear Algebra I",
    courseCodes: ["MATH 121A"],
    aliases: ["Proof-Based Linear Algebra"],
    shortDescription:
      "Proof-first vector spaces, span, bases, and linear maps aligned to UCI 121A.",
    cardCount: 11,
    unitCount: 3,
  },
  {
    id: "probability-2",
    title: "Probability II",
    courseCodes: ["MATH 130B"],
    aliases: ["Advanced Probability"],
    shortDescription:
      "Joint distributions, conditioning, transforms, and asymptotic patterns for UCI 130B.",
    cardCount: 7,
    unitCount: 3,
  },
  {
    id: "analysis-1",
    title: "Elementary Analysis I",
    courseCodes: ["MATH 140A"],
    aliases: ["Analysis I", "Real Analysis I"],
    shortDescription:
      "Ross-style elementary analysis for MATH 140A, centered on completeness, sequences, continuity, series, and uniform convergence.",
    cardCount: 22,
    unitCount: 5,
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

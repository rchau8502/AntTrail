import { calcOneCourse } from "@/content/calc1";
import { calcThreeCourse } from "@/content/calc3";
import { calcTwoCourse } from "@/content/calc2";
import { linearAlgebraCourse } from "@/content/linear-algebra";
import { probabilityCourse } from "@/content/probability";
import { proofCourse } from "@/content/proof";
import type { BubbleCard, Difficulty, Unit } from "@/content/schema";
import { difficulties } from "@/content/schema";

export const courses = [
  calcOneCourse,
  calcTwoCourse,
  calcThreeCourse,
  linearAlgebraCourse,
  proofCourse,
  probabilityCourse,
];
export const allCards = courses.flatMap((course, courseIndex) =>
  [...course.cards]
    .sort((left, right) => left.order - right.order)
    .map((card, index) => ({
      ...card,
      order: courseIndex * 1000 + index + 1,
    })),
);

export const courseTitles = courses.map((course) => course.title);

function unique<T>(items: T[]) {
  return [...new Set(items)];
}

export function getCardById(id: string) {
  return allCards.find((card) => card.id === id);
}

export function getCourseByTitle(title: string) {
  return courses.find((course) => course.title === title);
}

export function getRelatedCards(id: string) {
  const current = getCardById(id);

  if (!current) {
    return [];
  }

  return allCards
    .filter(
      (card) =>
        card.course === current.course &&
        card.unit === current.unit &&
        card.id !== id,
    )
    .slice(0, 4);
}

export function groupCardsByUnit(cards: BubbleCard[]) {
  return getUnitOptions(cards).map((unit) => ({
    unit,
    cards: cards.filter((card) => card.unit === unit),
  }));
}

export function groupCardsByCourse(cards: BubbleCard[]) {
  return getCourseOptions(cards).map((course) => ({
    course,
    cards: cards.filter((card) => card.course === course),
  }));
}

export function getCourseCards(course: string) {
  return allCards.filter((card) => card.course === course);
}

export function getUnitOptions(cards: BubbleCard[] = allCards): Unit[] {
  return unique(cards.map((card) => card.unit));
}

export function getCourseOptions(cards: BubbleCard[] = allCards) {
  return unique(cards.map((card) => card.course));
}

export function getChapterOptions(cards: BubbleCard[] = allCards) {
  return unique(cards.map((card) => card.chapter));
}

export function getUnitCount(unit: Unit) {
  return allCards.filter((card) => card.unit === unit).length;
}

export function getDifficultyCount(difficulty: Difficulty) {
  return allCards.filter((card) => card.difficulty === difficulty).length;
}

export function getAdjacentCards(id: string) {
  const current = getCardById(id);

  if (!current) {
    return { previous: undefined, next: undefined };
  }

  const courseCards = getCourseCards(current.course);
  const index = courseCards.findIndex((card) => card.id === id);

  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: courseCards[index - 1],
    next: courseCards[index + 1],
  };
}

export function getDashboardStats() {
  return {
    totalCards: allCards.length,
    courses: courses.length,
    units: unique(allCards.map((card) => `${card.course}:${card.unit}`)).length,
    chapters: unique(allCards.map((card) => `${card.course}:${card.chapter}`))
      .length,
    starterCards: getDifficultyCount("Starter"),
  };
}

export { difficulties };

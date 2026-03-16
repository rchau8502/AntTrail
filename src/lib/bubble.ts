import { calcOneCourse } from "@/content/calc1";
import type { BubbleCard, Difficulty, Unit } from "@/content/schema";
import { difficulties, units } from "@/content/schema";

export const chapters = [
  "Chapter 1",
  "Chapter 2",
  "Chapter 3",
  "Chapter 4",
] as const;

export const courses = [calcOneCourse];
export const calcOneCards = [...calcOneCourse.cards].sort(
  (left, right) => left.order - right.order,
);

export function getCardById(id: string) {
  return calcOneCards.find((card) => card.id === id);
}

export function getCardsByUnit(unit: Unit) {
  return calcOneCards.filter((card) => card.unit === unit);
}

export function getRelatedCards(id: string) {
  const current = getCardById(id);

  if (!current) {
    return [];
  }

  return calcOneCards
    .filter((card) => card.unit === current.unit && card.id !== id)
    .slice(0, 4);
}

export function groupCardsByUnit(cards: BubbleCard[]) {
  return units.map((unit) => ({
    unit,
    cards: cards.filter((card) => card.unit === unit),
  }));
}

export function getUnitCount(unit: Unit) {
  return calcOneCards.filter((card) => card.unit === unit).length;
}

export function getDifficultyCount(difficulty: Difficulty) {
  return calcOneCards.filter((card) => card.difficulty === difficulty).length;
}

export function getAdjacentCards(id: string) {
  const index = calcOneCards.findIndex((card) => card.id === id);

  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: calcOneCards[index - 1],
    next: calcOneCards[index + 1],
  };
}

export function getDashboardStats() {
  return {
    totalCards: calcOneCards.length,
    units: units.length,
    chapters: chapters.length,
    starterCards: getDifficultyCount("Starter"),
  };
}

export { difficulties, units };

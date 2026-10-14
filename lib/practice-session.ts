import type { BubbleCard, Unit } from "@/content/schema";

export interface PracticeFilters {
  courseFilter: string;
  unitFilter: Unit;
  coreOnly: boolean;
}

export function isOptionalCard(card: Pick<BubbleCard, "chapter" | "unit">) {
  return [card.chapter, card.unit].some((text) =>
    /optional|opcional|可选/i.test(text),
  );
}

export function getInitialPracticeFilters(
  cards: BubbleCard[],
  focusId?: string | null,
): PracticeFilters {
  const focusCard = cards.find((card) => card.id === focusId);

  return {
    courseFilter: focusCard?.course ?? "All",
    unitFilter: focusCard?.unit ?? "All",
    coreOnly: !focusCard || !isOptionalCard(focusCard),
  };
}

export function getPracticeSessionCards(
  cards: BubbleCard[],
  filters: PracticeFilters,
  focusId?: string | null,
) {
  const visibleCards = cards.filter(
    (card) =>
      (filters.courseFilter === "All" || card.course === filters.courseFilter) &&
      (filters.unitFilter === "All" || card.unit === filters.unitFilter) &&
      (!filters.coreOnly || !isOptionalCard(card)),
  );
  const focusedIndex = visibleCards.findIndex((card) => card.id === focusId);

  if (focusedIndex <= 0) {
    return visibleCards;
  }

  // Start at the requested topic without counting unvisited, earlier cards as misses.
  return visibleCards.slice(focusedIndex).concat(visibleCards.slice(0, focusedIndex));
}

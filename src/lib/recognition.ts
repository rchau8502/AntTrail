import type { BubbleCard } from "@/content/schema";

export function getRecognitionPrompt(card: BubbleCard) {
  return card.quickExample?.problem ?? card.typicalProblemShapes[0] ?? card.looksLike;
}

export function getPatternTokens(card: BubbleCard) {
  return card.looksLike
    .replace(/^something like\s+/i, "")
    .replace(/^like\s+/i, "")
    .split(/\s+or\s+|,\s*/)
    .map((token) => token.trim())
    .filter(Boolean)
    .slice(0, 5);
}

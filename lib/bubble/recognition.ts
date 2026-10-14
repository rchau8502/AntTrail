import type { BubbleCard } from "@/content/schema";
import { defaultLocale, type Locale } from "@/lib/i18n";

interface LocalizedTechnique {
  en: string;
  es: string;
  zh: string;
}

const techniqueOverrides: Record<string, LocalizedTechnique> = {
  "prob-bayes": {
    en: "use Bayes' formula",
    es: "usa la formula de Bayes",
    zh: "用贝叶斯公式",
  },
};

function splitFirstMove(text: string) {
  return text
    .split(
      /\s*(?:,|;|\.| then | and then | after that | luego | despues | después | y luego |，|；|。|然后|再)\s*/i,
    )[0]
    .trim();
}

function cleanTechniqueLabel(text: string) {
  return text
    .replace(/^first\s+/i, "")
    .replace(/^start by\s+/i, "")
    .replace(/^begin by\s+/i, "")
    .replace(/^first:\s*/i, "")
    .replace(/\s+/g, " ")
    .replace(/[,:;.\s]+$/g, "")
    .trim();
}

export function getRecognitionPrompt(card: BubbleCard) {
  return card.quickExample?.problem ?? card.typicalProblemShapes[0] ?? card.looksLike;
}

export function getTechniqueLabel(
  card: BubbleCard,
  locale: Locale = defaultLocale,
) {
  const override = techniqueOverrides[card.id];

  if (override) {
    return override[locale];
  }

  const summarizedMove = cleanTechniqueLabel(splitFirstMove(card.doThis));

  if (summarizedMove.length > 0 && summarizedMove.length <= 80) {
    return summarizedMove;
  }

  return card.name;
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

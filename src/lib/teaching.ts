import type { BubbleCard } from "@/content/schema";
import type { Locale } from "@/lib/i18n";

interface TeachingScaffold {
  whatItMeans: string;
  whyThisMove: string;
}

function buildMeaning(card: BubbleCard, locale: Locale) {
  if (locale === "en" && card.whatItMeans) {
    return card.whatItMeans;
  }

  if (locale === "es") {
    return `${card.name} es la idea o patron que aparece cuando ${card.useItWhen}. Normalmente se ve como ${card.looksLike}.`;
  }

  if (locale === "zh") {
    return `${card.name} 指的就是这种题型或想法：当 ${card.useItWhen} 时会出现，常见长相是 ${card.looksLike}。`;
  }

  return `${card.name} is the idea or pattern behind problems where ${card.useItWhen}. It usually looks like ${card.looksLike}.`;
}

function buildWhy(card: BubbleCard, locale: Locale) {
  if (locale === "en" && card.whyThisMove) {
    return card.whyThisMove;
  }

  if (locale === "es") {
    return `Este movimiento encaja porque estos problemas tienen esa forma. Empezar con "${card.doThis}" te pone en la estructura correcta y evita el error comun de ${card.watchOutFor}.`;
  }

  if (locale === "zh") {
    return `这样做是因为这类题本来就是这个结构。先做“${card.doThis}”能把题目带到正确轨道上，也能避开常见错误：${card.watchOutFor}。`;
  }

  return `This move fits because these problems have that shape. Starting with "${card.doThis}" puts you on the right structure and helps you avoid the common mistake of ${card.watchOutFor}.`;
}

export function getTeachingScaffold(
  card: BubbleCard,
  locale: Locale,
): TeachingScaffold {
  return {
    whatItMeans: buildMeaning(card, locale),
    whyThisMove: buildWhy(card, locale),
  };
}

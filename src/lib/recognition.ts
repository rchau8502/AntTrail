import type { BubbleCard } from "@/content/schema";
import { defaultLocale, type Locale } from "@/lib/i18n";

interface LocalizedTechnique {
  en: string;
  es: string;
  zh: string;
}

const techniqueOverrides: Record<string, LocalizedTechnique> = {
  "intuitive-limit": {
    en: "read the left/right target",
    es: "lee el valor al que se acerca",
    zh: "看左右靠近的目标值",
  },
  "direct-substitution": {
    en: "plug in directly",
    es: "sustituye directo",
    zh: "直接代入",
  },
  "factoring-0-0": {
    en: "factor, then cancel",
    es: "factoriza y cancela",
    zh: "因式分解再约掉",
  },
  rationalizing: {
    en: "multiply by the conjugate",
    es: "multiplica por el conjugado",
    zh: "乘共轭",
  },
  "continuity": {
    en: "check the 3 continuity checks",
    es: "revisa las 3 condiciones de continuidad",
    zh: "检查连续的 3 个条件",
  },
  "product-rule": {
    en: "use the product rule",
    es: "usa la regla del producto",
    zh: "用乘法法则",
  },
  "quotient-rule": {
    en: "use the quotient rule",
    es: "usa la regla del cociente",
    zh: "用商法则",
  },
  "chain-rule": {
    en: "use outside-inside",
    es: "usa afuera-adentro",
    zh: "先外后内",
  },
  "u-substitution": {
    en: "use u-substitution",
    es: "usa sustitucion u",
    zh: "用 u 代换",
  },
  "calc2-integration-by-parts": {
    en: "use integration by parts",
    es: "usa integracion por partes",
    zh: "用分部积分",
  },
  "calc2-trig-substitution": {
    en: "use trig substitution",
    es: "usa sustitucion trigonometrica",
    zh: "用三角代换",
  },
  "calc2-lhopitals-rule": {
    en: "use L'Hospital's Rule",
    es: "usa la regla de l'Hospital",
    zh: "用洛必达法则",
  },
  "proof-direct": {
    en: "use direct proof",
    es: "usa prueba directa",
    zh: "用直接证明",
  },
  "proof-contrapositive": {
    en: "use contrapositive",
    es: "usa contraposicion",
    zh: "用逆否命题证明",
  },
  "proof-contradiction": {
    en: "use contradiction",
    es: "usa contradiccion",
    zh: "用反证法",
  },
  "proof-induction": {
    en: "use induction",
    es: "usa induccion",
    zh: "用数学归纳法",
  },
  "proof-strong-induction": {
    en: "use strong induction",
    es: "usa induccion fuerte",
    zh: "用强归纳法",
  },
  "proof-counterexample": {
    en: "give a counterexample",
    es: "da un contraejemplo",
    zh: "给反例",
  },
  "proof-cases": {
    en: "split into cases",
    es: "separa en casos",
    zh: "分情况讨论",
  },
  "proof-biconditional": {
    en: "prove both directions",
    es: "prueba las dos direcciones",
    zh: "证明两个方向",
  },
  "proof-equivalence-relations": {
    en: "run reflexive / symmetric / transitive",
    es: "haz reflexiva / simetrica / transitiva",
    zh: "检查自反 / 对称 / 传递",
  },
  "proof-partial-orders": {
    en: "check reflexive / antisymmetric / transitive",
    es: "revisa reflexiva / antisimetrica / transitiva",
    zh: "检查自反 / 反对称 / 传递",
  },
  "proof-total-orders": {
    en: "add the comparability check",
    es: "agrega la comparabilidad",
    zh: "再加可比性检查",
  },
  "la-row-reduction": {
    en: "row reduce",
    es: "haz reduccion por filas",
    zh: "做行化简",
  },
  "la-eigenvalues-eigenvectors": {
    en: "solve det(A - lambda I) = 0",
    es: "resuelve det(A - lambda I) = 0",
    zh: "解 det(A - lambda I) = 0",
  },
  "la-eigenspace": {
    en: "solve (A - lambda I)x = 0",
    es: "resuelve (A - lambda I)x = 0",
    zh: "解 (A - lambda I)x = 0",
  },
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

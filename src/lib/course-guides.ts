import { getCardById, getCourseById } from "@/lib/bubble";
import type { CourseContent } from "@/content/schema";

interface LocalizedText {
  en: string;
  es: string;
  zh: string;
}

export interface CourseGuide {
  overview: LocalizedText;
  survivalAdvice: LocalizedText;
  mostTestedIds: string[];
  starterIds: string[];
}

export const courseGuides: Partial<Record<string, CourseGuide>> = {
  "intro-proof": {
    overview: {
      en: "This course is about proof writing, logic, and knowing which proof pattern actually fits the statement in front of you.",
      es: "Este curso trata de escribir pruebas, usar logica y reconocer que patron de prueba encaja con el enunciado.",
      zh: "这门课核心是写证明、用逻辑，并判断眼前命题最适合哪种证明套路。",
    },
    survivalAdvice: {
      en: "Most students do better when they identify the proof method before touching details: direct, contrapositive, contradiction, induction, or counterexample.",
      es: "La mayoria mejora cuando identifica el metodo de prueba antes de tocar los detalles: directa, contraposicion, contradiccion, induccion o contraejemplo.",
      zh: "大多数学生一旦先认出证明方法，再去做细节，就会顺很多：直接证明、逆否、反证、归纳、反例。",
    },
    mostTestedIds: [
      "proof-direct",
      "proof-contrapositive",
      "proof-contradiction",
      "proof-induction",
      "proof-equivalence-relations",
    ],
    starterIds: [
      "proof-what-counts",
      "proof-definitions",
      "proof-counterexample",
    ],
  },
  "linear-algebra": {
    overview: {
      en: "This course is about systems, matrices, subspaces, dependence, and recognizing what structure the matrix is telling you.",
      es: "Este curso trata de sistemas, matrices, subespacios, dependencia y de leer que estructura te esta diciendo la matriz.",
      zh: "这门课核心是方程组、矩阵、子空间、线性相关，以及读懂矩阵在告诉你什么结构。",
    },
    survivalAdvice: {
      en: "The biggest skill is not memorizing words. It is knowing whether to row reduce, run the subspace test, check dependence, or solve an eigen equation.",
      es: "La habilidad mas importante no es memorizar palabras, sino saber si toca reduccion por filas, prueba de subespacio, dependencia o ecuacion de eigen.",
      zh: "最重要的不是背名词，而是看出现在该做行化简、子空间检验、线性相关判断，还是特征值方程。",
    },
    mostTestedIds: [
      "la-linear-systems",
      "la-row-reduction",
      "la-subspace-test",
      "la-linear-independence",
      "la-eigenvalues-eigenvectors",
    ],
    starterIds: [
      "la-augmented-matrix",
      "la-pivots-free-variables",
      "la-rank",
    ],
  },
  probability: {
    overview: {
      en: "This course is about counting, conditional thinking, expectation, and choosing the right probability model before you compute.",
      es: "Este curso trata de conteo, condicionamiento, esperanza y elegir el modelo de probabilidad correcto antes de calcular.",
      zh: "这门课核心是计数、条件概率、期望，以及在计算前先认对概率模型。",
    },
    survivalAdvice: {
      en: "Students usually get stuck when they do not know whether a problem is counting, conditional probability, Bayes, expectation, or independence.",
      es: "Los estudiantes suelen atascarse cuando no saben si el problema es de conteo, probabilidad condicional, Bayes, esperanza o independencia.",
      zh: "学生最容易卡住的地方，是分不清这题到底该当作计数、条件概率、贝叶斯、期望，还是独立性来做。",
    },
    mostTestedIds: [
      "prob-combinations",
      "prob-conditional",
      "prob-bayes",
      "prob-expected-value",
      "prob-independence",
    ],
    starterIds: [
      "probability",
      "prob-permutations",
      "prob-total-probability",
    ],
  },
  "analysis-1": {
    overview: {
      en: "This course is proof-based calculus with real definitions: supremum, sequence limits, continuity, and completeness-style arguments.",
      es: "Este curso es calculo con pruebas y definiciones reales: supremo, limites de sucesiones, continuidad y argumentos de completitud.",
      zh: "这门课是证明版微积分：上确界、数列极限、连续性，以及完备性风格的论证。",
    },
    survivalAdvice: {
      en: "The hardest part is usually not the theorem. It is knowing which proof pattern to start with: epsilon-N, epsilon-delta, contradiction, monotone+bdd, or Cauchy.",
      es: "La parte mas dura suele no ser el teorema sino saber con que patron empezar: epsilon-N, epsilon-delta, contradiccion, monotona+acotada o Cauchy.",
      zh: "最难的往往不是定理本身，而是不知道该从哪种证明模板下手：epsilon-N、epsilon-delta、反证、单调有界，还是 Cauchy。",
    },
    mostTestedIds: [
      "analysis140a-supremum",
      "analysis140a-sequence-limit",
      "analysis140a-continuity",
      "analysis140a-cauchy",
      "analysis140a-monotone-bounded",
    ],
    starterIds: [
      "analysis140a-contradiction",
      "analysis140a-subsequence-test",
      "analysis140a-ivt",
    ],
  },
};

export function getCourseGuide(courseId: string) {
  return courseGuides[courseId];
}

export function getGuideCards(ids: string[]) {
  return ids
    .map((id) => getCardById(id))
    .filter((card): card is NonNullable<typeof card> => Boolean(card));
}

export function getGuidedCourse(id: string): CourseContent | undefined {
  return getCourseById(id);
}

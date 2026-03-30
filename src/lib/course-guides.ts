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
  "calc-1": {
    overview: {
      en: "This course is Stewart-style single-variable calculus: limits, derivatives, graph shape, and the first integral moves that show up on quizzes fast.",
      es: "Este curso es calculo de una variable al estilo Stewart: limites, derivadas, forma de graficas y los primeros movimientos de integracion que aparecen rapido en quizzes.",
      zh: "这门课是 Stewart 风格的单变量微积分：极限、导数、图形分析，以及考试里最先出现的积分基本动作。",
    },
    survivalAdvice: {
      en: "Most students do better when they stop asking what chapter this is from and ask what move starts the problem: plug in, use limit laws, take a derivative, use the chain rule, or read the graph shape.",
      es: "La mayoria mejora cuando deja de preguntar de que capitulo viene la pregunta y empieza por el movimiento correcto: sustituir, usar leyes de limites, derivar, aplicar la regla de la cadena o leer la forma de la grafica.",
      zh: "大多数学生一旦不再先想“这是哪一章”，而是先认出“第一步该做什么”，就会顺很多：直接代入、用极限定律、求导、链式法则，还是读图形形状。",
    },
    mostTestedIds: [
      "tangent-velocity-problems",
      "limit-laws",
      "chain-rule",
      "mean-value-theorem",
      "precise-limit-definition",
    ],
    starterIds: [
      "intuitive-limit",
      "direct-substitution",
      "derivative-as-function",
      "tangent-velocity-problems",
    ],
  },
  "calc-2": {
    overview: {
      en: "This course is second-semester single-variable calculus: integration techniques, differential equations, polar curves, and series tests.",
      es: "Este curso es calculo de una variable de segundo semestre: tecnicas de integracion, ecuaciones diferenciales, curvas polares y criterios de series.",
      zh: "这门课是第二学期单变量微积分：积分技巧、微分方程、极坐标曲线和级数判别。",
    },
    survivalAdvice: {
      en: "The biggest win is choosing the right technique early: integration by parts, partial fractions, separable equations, polar area, or the right series test.",
      es: "La mayor ganancia esta en elegir pronto la tecnica correcta: integracion por partes, fracciones parciales, ecuaciones separables, area polar o el criterio de series adecuado.",
      zh: "这门课最关键的是尽快认出技巧：分部积分、部分分式、可分离方程、极坐标面积，还是该用哪种级数判别。",
    },
    mostTestedIds: [
      "calc2-integration-by-parts",
      "calc2-partial-fractions",
      "calc2-separable-equations",
      "calc2-polar-area",
      "calc2-ratio-test",
    ],
    starterIds: [
      "calc2-integration-strategy",
      "calc2-improper-integrals",
      "calc2-sequences",
    ],
  },
  "calc-3": {
    overview: {
      en: "This course is multivariable calculus: 3D geometry, partial derivatives, multiple integrals, and recognizing surfaces fast.",
      es: "Este curso es calculo multivariable: geometria 3D, derivadas parciales, integrales multiples y reconocimiento rapido de superficies.",
      zh: "这门课是多元微积分：三维几何、偏导数、多重积分，以及快速识别曲面。",
    },
    survivalAdvice: {
      en: "The biggest win is naming the object before doing algebra: point, vector, plane, surface, gradient, or double integral setup.",
      es: "La mayor ventaja es nombrar el objeto antes del algebra: punto, vector, plano, superficie, gradiente o montaje de integral doble.",
      zh: "最关键的是先认出对象，再做计算：点、向量、平面、曲面、梯度，还是二重积分设定。",
    },
    mostTestedIds: [
      "calc3-planes",
      "calc3-quadric-surfaces",
      "calc3-partial-derivatives",
      "calc3-gradient",
      "calc3-double-integrals",
      "calc3-lagrange-multipliers",
    ],
    starterIds: [
      "calc3-3d-points",
      "calc3-vectors",
      "calc3-dot-product",
      "calc3-planes",
    ],
  },
  "multivariable-calculus-2": {
    overview: {
      en: "This course is UCI-style MATH 2E: vector-valued motion, line and surface integrals, conservative fields, and the big vector-calculus theorems.",
      es: "Este curso es MATH 2E al estilo UCI: movimiento vectorial, integrales de linea y de superficie, campos conservativos y los grandes teoremas de calculo vectorial.",
      zh: "这门课是 UCI 风格的 MATH 2E：向量值运动、线积分、曲面积分、保守场，以及向量分析的大定理。",
    },
    survivalAdvice: {
      en: "Students usually improve fastest when they ask what geometry they are integrating over first: curve, surface, closed surface, or enclosed region.",
      es: "Los estudiantes suelen mejorar mas rapido cuando primero preguntan sobre que geometria estan integrando: curva, superficie, superficie cerrada o region encerrada.",
      zh: "学生往往只要先问清楚“积分对象是什么几何体”，进步就会很快：曲线、曲面、闭曲面，还是包围区域。",
    },
    mostTestedIds: [
      "math2e-line-integrals",
      "math2e-conservative-fields",
      "math2e-greens-theorem",
      "math2e-surface-integrals",
      "math2e-divergence-curl",
      "math2e-stokes-gauss",
    ],
    starterIds: [
      "math2e-vector-functions",
      "math2e-arc-length-curvature",
      "math2e-line-integrals",
    ],
  },
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
      en: "This course is Ross-style elementary analysis: completeness, sequence proofs, continuity, series, and uniform convergence.",
      es: "Este curso es analisis elemental al estilo Ross: completitud, pruebas con sucesiones, continuidad, series y convergencia uniforme.",
      zh: "这门课是 Ross 风格的初等分析：完备性、数列证明、连续性、级数和一致收敛。",
    },
    survivalAdvice: {
      en: "The hard part is usually choosing the right proof pattern fast: completeness, epsilon-N, monotone+bdd, Cauchy, series-test match, epsilon-delta, or sequential continuity.",
      es: "La parte dura suele ser elegir rapido el patron correcto: completitud, epsilon-N, monotona+acotada, Cauchy, criterio de series, epsilon-delta o continuidad secuencial.",
      zh: "最难的通常不是定理本身，而是尽快认出该用哪种套路：完备性、epsilon-N、单调有界、Cauchy、级数判别、epsilon-delta，还是序列连续。",
    },
    mostTestedIds: [
      "analysis140a-supremum",
      "analysis140a-sequence-limit",
      "analysis140a-monotone-bounded",
      "analysis140a-series-tests",
      "analysis140a-continuity",
      "analysis140a-cauchy",
      "analysis140a-uniform-convergence",
    ],
    starterIds: [
      "analysis140a-induction",
      "analysis140a-completeness",
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

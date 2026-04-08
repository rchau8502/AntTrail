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
      en: "This MATH 2D flow starts with Sections 10.1-10.3, then moves through 12.1-12.6, 13.1-13.3, 14.1-14.8, and stops the core at 15.3.",
      es: "Este flujo de MATH 2D empieza con las secciones 10.1-10.3, luego pasa por 12.1-12.6, 13.1-13.3, 14.1-14.8 y cierra el nucleo en 15.3.",
      zh: "这版 MATH 2D 按真实课表走：先 10.1-10.3，再到 12.1-12.6、13.1-13.3、14.1-14.8，核心内容停在 15.3。",
    },
    survivalAdvice: {
      en: "The biggest win is to name the section-style move first: parametric, polar, plane, quadric surface, partial derivative, gradient, Lagrange, or double-integral setup.",
      es: "La mayor ventaja es nombrar primero el movimiento de la seccion: parametrico, polar, plano, superficie cuadrica, derivada parcial, gradiente, Lagrange o montaje de integral doble.",
      zh: "最关键的是先认出这题属于哪种 section-style 动作：参数、极坐标、平面、二次曲面、偏导、梯度、拉格朗日，还是二重积分设定。",
    },
    mostTestedIds: [
      "calc3-parametric-calculus",
      "calc3-polar-coordinates",
      "calc3-planes",
      "calc3-quadric-surfaces",
      "calc3-partial-derivatives",
      "calc3-gradient",
      "calc3-lagrange-multipliers",
      "calc3-iterated-integrals",
    ],
    starterIds: [
      "calc3-parametric-equations",
      "calc3-parametric-calculus",
      "calc3-polar-coordinates",
      "calc3-3d-points",
      "calc3-vectors",
      "calc3-planes"
    ],
  },
  "multivariable-calculus-2": {
    overview: {
      en: "This MATH 2E flow uses a quick 13.1-13.3 review, then moves through Sections 16.1-16.9: vector fields, line integrals, surface integrals, and the big theorems.",
      es: "Este flujo de MATH 2E hace un repaso rapido de 13.1-13.3 y luego pasa por las secciones 16.1-16.9: campos vectoriales, integrales de linea, integrales de superficie y los grandes teoremas.",
      zh: "这版 MATH 2E 先快速复习 13.1-13.3，然后按 16.1-16.9 走：向量场、线积分、曲面积分和几条大定理。",
    },
    survivalAdvice: {
      en: "Students improve fastest when they name the geometry first: curve, closed loop, surface, closed surface, or region. That tells you line integral, Green, surface integral, Stokes, or Gauss.",
      es: "Los estudiantes mejoran mas rapido cuando primero nombran la geometria: curva, lazo cerrado, superficie, superficie cerrada o region. Eso te dice si toca integral de linea, Green, integral de superficie, Stokes o Gauss.",
      zh: "学生只要先叫出几何对象，进步就会快很多：曲线、闭合回路、曲面、闭曲面，还是区域。这样就知道该用线积分、Green、曲面积分、Stokes，还是 Gauss。",
    },
    mostTestedIds: [
      "math2e-line-integrals",
      "math2e-conservative-fields",
      "math2e-ftc-line-integrals",
      "math2e-greens-theorem",
      "math2e-parametric-surfaces",
      "math2e-surface-integrals",
      "math2e-divergence-curl",
      "math2e-stokes-gauss",
    ],
    starterIds: [
      "math2e-vector-functions",
      "math2e-motion-in-space",
      "math2e-line-integrals",
      "math2e-divergence-curl",
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
      en: "This course starts with sample spaces, events, and counting, then builds conditional probability, random variables, named distributions, and expectation/variance.",
      es: "Este curso empieza con espacios muestrales, eventos y conteo, y luego construye probabilidad condicional, variables aleatorias, distribuciones nombradas y esperanza/varianza.",
      zh: "这门课先学样本空间、事件和计数，再建立条件概率、随机变量、常见分布，以及期望/方差。",
    },
    survivalAdvice: {
      en: "Students usually get stuck before formulas: they miss the sample space, the event language, or the bridge from counting stories into the right distribution model.",
      es: "Los estudiantes suelen atascarse antes de las formulas: pierden el espacio muestral, el lenguaje de eventos o el puente entre historias de conteo y el modelo de distribucion correcto.",
      zh: "学生最容易卡住的地方，其实还没到公式：样本空间没认清、事件语言没翻对，或者不会把计数故事接到正确的分布模型上。",
    },
    mostTestedIds: [
      "prob-equally-likely",
      "prob-event-algebra",
      "prob-complement-rule",
      "prob-inclusion-exclusion",
      "prob-combinations",
      "prob-conditional",
      "prob-total-probability",
      "prob-bayes",
      "prob-independence",
      "prob-pmf-cdf",
      "prob-expected-value",
      "prob-variance",
      "prob-indicator",
      "prob-covariance-correlation",
      "prob-distributions",
      "prob-hypergeometric",
      "prob-memoryless",
      "prob-normal-approximation",
      "prob-poisson-approximation",
      "prob-binomial",
      "prob-lln",
      "prob-clt",
      "prob-geometric",
      "prob-poisson",
    ],
    starterIds: [
      "prob-sample-space",
      "prob-events",
      "prob-event-algebra",
      "prob-disjoint-events",
      "prob-complement-rule",
      "prob-equally-likely",
      "prob-axioms",
      "prob-conditional",
      "prob-random-variable",
      "prob-pmf-cdf",
      "prob-expected-value",
      "prob-variance",
      "prob-bernoulli-pattern",
      "prob-binomial",
      "prob-geometric",
      "prob-hypergeometric",
      "prob-permutations",
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

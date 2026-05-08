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
  "multivariable-calculus-2": {
    overview: {
      en: "On exams, first identify the geometry: curve, closed loop, surface, closed surface, or region. That tells you whether to use line integrals, Green, surface integrals, Stokes, or Gauss.",
      es: "En examen, primero identifica la geometria: curva, lazo cerrado, superficie, superficie cerrada o region. Eso te dice si usar integrales de linea, Green, integrales de superficie, Stokes o Gauss.",
      zh: "考试时先认出几何对象：曲线、闭合回路、曲面、闭曲面，还是区域。这样就知道该用线积分、Green、曲面积分、Stokes，还是 Gauss。",
    },
    survivalAdvice: {
      en: "For a line integral, parameterize the curve first. For a conservative field, write the potential first. For a flux problem, check orientation and the theorem before expanding algebra.",
      es: "Para una integral de linea, parametriza la curva primero. Para un campo conservativo, escribe primero el potencial. Para flujo, revisa orientacion y teorema antes de expandir algebra.",
      zh: "做线积分先参数化曲线；做保守场先写势函数；做通量题先看方向和定理，再展开代数。",
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
  "linear-algebra-1": {
    overview: {
      en: "On exams, decide first whether the job is row reduction, a subspace test, span, independence, basis, or a linear map. Then write the matching setup immediately.",
      es: "En examen, decide primero si toca reduccion por filas, prueba de subespacio, span, independencia, base o una transformacion lineal. Luego escribe el montaje correcto de inmediato.",
      zh: "考试时先判断这题是行化简、子空间检验、张成、线性相关、基底，还是线性映射。然后立刻写对应的设定。",
    },
    survivalAdvice: {
      en: "Matrix in front of you? Row reduce first unless the question is about determinant or inverse. Claimed subspace? Test zero, addition, and scaling. Span or independence? Write the general linear combination and force the coefficients.",
      es: "¿Hay una matriz? Reduce por filas primero salvo que pidan determinante o inversa. ¿Dicen que es subespacio? Prueba cero, suma y escala. ¿Span o independencia? Escribe la combinacion lineal general y fuerza los coeficientes.",
      zh: "看到矩阵？先行化简，除非题目是行列式或逆矩阵。看到所谓子空间？先检验零向量、加法和数乘。看到张成或线性相关？先写一般线性组合，再逼出系数。",
    },
    mostTestedIds: [
      "la121a-subspace-test",
      "la121a-span",
      "la121a-independence",
      "la121a-basis",
      "la121a-kernel-image",
      "la121a-rank-nullity",
      "la121a-matrix-of-map",
      "la121a-change-of-basis",
    ],
    starterIds: [
      "la121a-subspace-test",
      "la121a-span",
      "la121a-independence",
      "la121a-linear-map",
    ],
  },
  probability: {
    overview: {
      en: "On exams, start by writing the sample space, naming the event, and checking whether the problem is counting, conditioning, or expectation/variance.",
      es: "En examen, empieza escribiendo el espacio muestral, nombrando el evento y viendo si la pregunta es de conteo, condicionamiento o esperanza/varianza.",
      zh: "考试时先写样本空间、命名事件，再判断这是计数、条件概率，还是期望/方差题。",
    },
    survivalAdvice: {
      en: "Cards, coins, bins, tests, or counts mean: write the counting model first. Conditional or given that means: write the conditional setup first. A named random variable means: write its distribution first, then compute.",
      es: "Cartas, monedas, cajas, pruebas o conteos significan: escribe primero el modelo de conteo. Condicional o dado que significa: escribe primero el montaje condicional. Una variable aleatoria nombrada significa: escribe primero su distribucion y luego calcula.",
      zh: "卡片、硬币、盒子、测试或计数，先写计数模型；出现条件概率或“在给定……下”，先写条件设定；如果题目命名随机变量，先写它的分布，再去计算。",
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
      en: "On exams, decide first whether the problem is a finite limit, an infinite limit, a sequence proof, a series test, or a continuity proof. That choice determines the whole proof shape.",
      es: "En examen, decide primero si la pregunta es de limite finito, limite infinito, prueba con sucesiones, criterio de series o continuidad. Esa decision fija toda la forma de la prueba.",
      zh: "考试时先判断这是有限极限、无穷极限、数列证明、级数判别，还是连续性证明。这个选择会决定整份证明的形状。",
    },
    survivalAdvice: {
      en: "For sequence limits, write epsilon first and solve for N. For infinity, write M first and solve for N. For proofs, start with the definition or theorem trigger, not with general talk.",
      es: "Para sucesiones, escribe epsilon primero y despeja N. Para infinito, escribe M primero y despeja N. Para pruebas, empieza con la definicion o el disparador del teorema, no con explicacion general.",
      zh: "数列极限先写 epsilon，再解 N；趋于无穷先写 M，再解 N。做证明时先写定义或定理触发条件，不要先讲一堆泛话。",
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

import type { BubbleCard } from "@/content/schema";
import type { Locale } from "@/lib/i18n";
import { getTechniqueLabel } from "@/lib/recognition";

export type BubblegumLevel = "quiz" | "midterm" | "final";

export interface BubblegumDrill {
  level: BubblegumLevel;
  prompt: string;
  technique: string;
  firstStep: string;
  setup: string;
  fullPath: string[];
  answer: string;
  commonMiss: string;
  selfCheck: string;
}

interface LocalizedText {
  en: string;
  es: string;
  zh: string;
}

interface DrillSeed {
  prompt: string;
  firstStep: string;
  setup: string;
  fullPath: string[];
  answer: string;
  selfCheck: string;
}

function text(locale: Locale, value: LocalizedText) {
  return value[locale] ?? value.en;
}

function signature(card: BubbleCard) {
  return [
    card.id,
    card.courseCode,
    card.course,
    card.unit,
    card.topic,
    card.name,
    card.chapter,
    ...card.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function pick(level: BubblegumLevel, variant: number, groups: Record<BubblegumLevel, DrillSeed[]>) {
  const options = groups[level];
  return options[variant % options.length];
}

function solveWord(locale: Locale) {
  return text(locale, {
    en: "Solve",
    es: "Resuelve",
    zh: "解",
  });
}

function findWord(locale: Locale) {
  return text(locale, {
    en: "Find",
    es: "Halla",
    zh: "求",
  });
}

function evaluateWord(locale: Locale) {
  return text(locale, {
    en: "Evaluate",
    es: "Evalua",
    zh: "求",
  });
}

function proveWord(locale: Locale) {
  return text(locale, {
    en: "Prove",
    es: "Demuestra",
    zh: "证明",
  });
}

function identifyWord(locale: Locale) {
  return text(locale, {
    en: "Identify",
    es: "Identifica",
    zh: "判断",
  });
}

function workThis(locale: Locale, body: string, verb: "solve" | "find" | "evaluate" | "prove" | "identify" = "solve") {
  const label =
    verb === "find"
      ? findWord(locale)
      : verb === "evaluate"
        ? evaluateWord(locale)
        : verb === "prove"
          ? proveWord(locale)
          : verb === "identify"
            ? identifyWord(locale)
            : solveWord(locale);

  return locale === "zh" ? `${label}：${body}` : `${label}: ${body}`;
}

function fallbackDrill(card: BubbleCard, locale: Locale): DrillSeed {
  const quickProblem = card.quickExample?.problem ?? card.typicalProblemShapes[0] ?? card.looksLike;
  const quickMove = card.quickExample?.move ?? card.doThis;

  return {
    prompt: workThis(locale, quickProblem, "solve"),
    firstStep: quickMove,
    setup: card.doThis,
    fullPath: [
      quickMove,
      card.rememberThis,
      text(locale, {
        en: `Watch the trap: ${card.watchOutFor}.`,
        es: `Cuidado con la trampa: ${card.watchOutFor}.`,
        zh: `注意这个坑：${card.watchOutFor}。`,
      }),
    ],
    answer: quickMove,
    selfCheck: card.memoryHook,
  };
}

function directSubstitution(locale: Locale, level: BubblegumLevel, variant: number): DrillSeed {
  return pick(level, variant, {
    quiz: [
      {
        prompt: workThis(locale, "lim_{x→2} (x^2 + 3x - 1)", "evaluate"),
        firstStep: "Plug in x = 2.",
        setup: "Direct substitution stays legal here.",
        fullPath: ["2^2 + 3(2) - 1 = 4 + 6 - 1", "= 9"],
        answer: "9",
        selfCheck: "No break, just plug.",
      },
    ],
    midterm: [
      {
        prompt: workThis(locale, "lim_{x→-1} (2x^3 - x + 4)", "evaluate"),
        firstStep: "Substitute x = -1 right away.",
        setup: "This is a polynomial, so the limit equals the function value.",
        fullPath: ["2(-1)^3 - (-1) + 4", "= -2 + 1 + 4", "= 3"],
        answer: "3",
        selfCheck: "Polynomial at a finite point means direct plug.",
      },
    ],
    final: [
      {
        prompt: workThis(locale, "lim_{x→3} (x^2 - 5x + 1)/(x + 1)", "evaluate"),
        firstStep: "Check the denominator at x = 3; it is not zero.",
        setup: "Since the denominator stays nonzero, direct substitution still works.",
        fullPath: ["(3^2 - 5(3) + 1)/(3 + 1)", "= (9 - 15 + 1)/4", "= -5/4"],
        answer: "-5/4",
        selfCheck: "A fraction is still a direct-plug problem if the bottom does not die.",
      },
    ],
  });
}

function factoringLimit(locale: Locale, level: BubblegumLevel, variant: number): DrillSeed {
  return pick(level, variant, {
    quiz: [
      {
        prompt: workThis(locale, "lim_{x→2} (x^2 - 4)/(x - 2)", "evaluate"),
        firstStep: "Factor the top as (x - 2)(x + 2).",
        setup: "Cancel the common factor before you plug in.",
        fullPath: ["(x^2 - 4)/(x - 2) = (x - 2)(x + 2)/(x - 2)", "= x + 2", "Now plug in x = 2 to get 4"],
        answer: "4",
        selfCheck: "0/0 means simplify first.",
      },
    ],
    midterm: [
      {
        prompt: workThis(locale, "lim_{x→1} (x^2 - 1)/(x - 1)", "evaluate"),
        firstStep: "Factor x^2 - 1.",
        setup: "Use the difference of squares and then cancel.",
        fullPath: ["(x^2 - 1)/(x - 1) = (x - 1)(x + 1)/(x - 1)", "= x + 1", "At x = 1 the limit is 2"],
        answer: "2",
        selfCheck: "Factor, cancel, then plug.",
      },
    ],
    final: [
      {
        prompt: workThis(locale, "lim_{x→3} (x^2 - 5x + 6)/(x - 3)", "evaluate"),
        firstStep: "Factor the numerator into (x - 2)(x - 3).",
        setup: "Remove the common x - 3 first.",
        fullPath: ["(x^2 - 5x + 6)/(x - 3) = (x - 2)(x - 3)/(x - 3)", "= x - 2", "At x = 3 the limit is 1"],
        answer: "1",
        selfCheck: "If 0/0 appears, hunt for a hidden factor.",
      },
    ],
  });
}

function chainRule(locale: Locale, level: BubblegumLevel, variant: number): DrillSeed {
  return pick(level, variant, {
    quiz: [
      {
        prompt: workThis(locale, "y = (3x^2 + 1)^5", "find"),
        firstStep: "Differentiate the outside first: 5(3x^2 + 1)^4.",
        setup: "Keep the inside, then multiply by the derivative of the inside.",
        fullPath: ["d/dx[(3x^2 + 1)^5] = 5(3x^2 + 1)^4 · d/dx(3x^2 + 1)", "= 5(3x^2 + 1)^4 · 6x", "= 30x(3x^2 + 1)^4"],
        answer: "30x(3x^2 + 1)^4",
        selfCheck: "Outside first, inside next.",
      },
    ],
    midterm: [
      {
        prompt: workThis(locale, "y = sin(x^3 - 2x)", "find"),
        firstStep: "Differentiate the outside sin first.",
        setup: "cos(inside) times the derivative of the inside.",
        fullPath: ["y' = cos(x^3 - 2x) · d/dx(x^3 - 2x)", "= cos(x^3 - 2x)(3x^2 - 2)"],
        answer: "cos(x^3 - 2x)(3x^2 - 2)",
        selfCheck: "Do not forget the inside derivative.",
      },
    ],
    final: [
      {
        prompt: workThis(locale, "y = e^{(x^2 + 1)^3}", "find"),
        firstStep: "Differentiate the outside e^(...) first.",
        setup: "This is a chain inside a chain.",
        fullPath: ["y' = e^{(x^2 + 1)^3} · d/dx[(x^2 + 1)^3]", "= e^{(x^2 + 1)^3} · 3(x^2 + 1)^2 · 2x", "= 6x(x^2 + 1)^2 e^{(x^2 + 1)^3}"],
        answer: "6x(x^2 + 1)^2 e^{(x^2 + 1)^3}",
        selfCheck: "Peel nested layers one by one.",
      },
    ],
  });
}

function integrationByParts(locale: Locale, level: BubblegumLevel, variant: number): DrillSeed {
  return pick(level, variant, {
    quiz: [
      {
        prompt: workThis(locale, "∫ x e^x dx", "evaluate"),
        firstStep: "Choose u = x and dv = e^x dx.",
        setup: "Use ∫u dv = uv - ∫v du.",
        fullPath: ["u = x, du = dx, v = e^x", "∫ x e^x dx = x e^x - ∫ e^x dx", "= x e^x - e^x + C"],
        answer: "e^x(x - 1) + C",
        selfCheck: "Choose one part to shrink when you differentiate it.",
      },
    ],
    midterm: [
      {
        prompt: workThis(locale, "∫ x cos x dx", "evaluate"),
        firstStep: "Set u = x and dv = cos x dx.",
        setup: "Differentiate the polynomial; integrate the trig piece.",
        fullPath: ["u = x, du = dx, v = sin x", "∫ x cos x dx = x sin x - ∫ sin x dx", "= x sin x + cos x + C"],
        answer: "x sin x + cos x + C",
        selfCheck: "LIATE usually points to the right u choice.",
      },
    ],
    final: [
      {
        prompt: workThis(locale, "∫ x^2 e^x dx", "evaluate"),
        firstStep: "Use integration by parts with u = x^2 and dv = e^x dx.",
        setup: "This one needs parts twice or tabular parts.",
        fullPath: ["First pass: x^2 e^x - ∫ 2x e^x dx", "Second pass on ∫ 2x e^x dx gives 2x e^x - 2e^x", "Combine to get e^x(x^2 - 2x + 2) + C"],
        answer: "e^x(x^2 - 2x + 2) + C",
        selfCheck: "If the polynomial still survives, run parts again.",
      },
    ],
  });
}

function proofEquivalence(locale: Locale, level: BubblegumLevel, variant: number): DrillSeed {
  return pick(level, variant, {
    quiz: [
      {
        prompt: workThis(locale, text(locale, {
          en: "on Z define a ~ b iff 3 divides (a - b). Prove ~ is an equivalence relation",
          es: "en Z define a ~ b si y solo si 3 divide (a - b). Demuestra que ~ es una relacion de equivalencia",
          zh: "在 Z 上定义 a ~ b 当且仅当 3 | (a - b)。证明 ~ 是等价关系",
        }), "prove"),
        firstStep: "Write the three targets: x~x, x~y => y~x, and x~y with y~z => x~z.",
        setup: "Run reflexive, symmetric, and transitive one by one.",
        fullPath: ["Reflexive: 3 divides x - x = 0", "Symmetric: if 3 | (x - y), then 3 | -(x - y) = y - x", "Transitive: if 3 | (x - y) and 3 | (y - z), then 3 | [(x - y) + (y - z)] = x - z"],
        answer: "Yes. The relation is reflexive, symmetric, and transitive.",
        selfCheck: "x~x, flip, chain.",
      },
    ],
    midterm: [
      {
        prompt: workThis(locale, text(locale, {
          en: "on R define x ~ y iff x - y is an integer. Prove ~ is an equivalence relation",
          es: "en R define x ~ y si y solo si x - y es un entero. Demuestra que ~ es una relacion de equivalencia",
          zh: "在 R 上定义 x ~ y 当且仅当 x - y 是整数。证明 ~ 是等价关系",
        }), "prove"),
        firstStep: "Start with the reflexive check x - x = 0.",
        setup: "Then flip the difference for symmetry and add differences for transitivity.",
        fullPath: ["Reflexive: x - x = 0 is an integer", "Symmetric: if x - y is an integer, then y - x = -(x - y) is too", "Transitive: if x - y and y - z are integers, then x - z is their sum"],
        answer: "It is an equivalence relation.",
        selfCheck: "The three checks should look almost mechanical.",
      },
    ],
    final: [
      {
        prompt: workThis(locale, text(locale, {
          en: "on Z define a ~ b iff a and b have the same parity. Prove ~ is an equivalence relation",
          es: "en Z define a ~ b si y solo si a y b tienen la misma paridad. Demuestra que ~ es una relacion de equivalencia",
          zh: "在 Z 上定义 a ~ b 当且仅当 a 与 b 同奇偶。证明 ~ 是等价关系",
        }), "prove"),
        firstStep: "Translate same parity into 'a - b is even'.",
        setup: "That turns the proof into the standard three-check pattern.",
        fullPath: ["Reflexive: a - a = 0 is even", "Symmetric: if a - b is even then b - a is even", "Transitive: even + even stays even, so (a - b) + (b - c) = a - c is even"],
        answer: "Same parity defines an equivalence relation.",
        selfCheck: "Rewrite the relation in a usable algebra form first.",
      },
    ],
  });
}

function proofMethod(locale: Locale, level: BubblegumLevel, variant: number, sig: string): DrillSeed | null {
  if (sig.includes("contrapositive")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, text(locale, {
            en: "if n^2 is even, then n is even",
            es: "si n^2 es par, entonces n es par",
            zh: "若 n^2 是偶数，则 n 是偶数",
          }), "prove"),
          firstStep: "Switch to the contrapositive: if n is odd, then n^2 is odd.",
          setup: "Prove the odd statement directly instead of wrestling with the original form.",
          fullPath: ["Assume n = 2k + 1", "Then n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1", "So n^2 is odd, which proves the contrapositive"],
          answer: "Therefore if n^2 is even, n must be even.",
          selfCheck: "Flip and negate when the direct route looks ugly.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, text(locale, {
            en: "if ab is odd, then both a and b are odd",
            es: "si ab es impar, entonces a y b son impares",
            zh: "若 ab 是奇数，则 a 与 b 都是奇数",
          }), "prove"),
          firstStep: "Use the contrapositive: if a or b is even, then ab is even.",
          setup: "A product with one even factor is automatically even.",
          fullPath: ["Assume a is even or b is even", "Then write the even factor as 2k", "The product becomes 2(k·other factor), so ab is even"],
          answer: "Hence ab odd forces both factors to be odd.",
          selfCheck: "When the original claim talks about 'if ... then ...', try the easier backwards-negated route.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, text(locale, {
            en: "if x^2 + y^2 = 0 for real x, y, then x = y = 0",
            es: "si x^2 + y^2 = 0 para reales x, y, entonces x = y = 0",
            zh: "若实数 x, y 满足 x^2 + y^2 = 0，则 x = y = 0",
          }), "prove"),
          firstStep: "Use the contrapositive idea: if one variable is nonzero, the sum cannot stay zero.",
          setup: "Squares of real numbers are nonnegative.",
          fullPath: ["If x ≠ 0 then x^2 > 0, and similarly for y", "A sum of nonnegative terms can be 0 only if both terms are 0", "So x^2 = 0 and y^2 = 0, hence x = y = 0"],
          answer: "The only real solution is x = y = 0.",
          selfCheck: "Turn the statement into the cleaner condition you actually know how to prove.",
        },
      ],
    });
  }

  if (sig.includes("contradiction")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, text(locale, {
            en: "sqrt(2) is irrational",
            es: "sqrt(2) es irracional",
            zh: "√2 是无理数",
          }), "prove"),
          firstStep: "Assume the opposite: sqrt(2) = a/b in lowest terms.",
          setup: "Push the assumption until both a and b come out even.",
          fullPath: ["From 2 = a^2 / b^2 get a^2 = 2b^2, so a is even", "Write a = 2k and substitute back to get b even too", "That contradicts lowest terms"],
          answer: "So sqrt(2) cannot be rational.",
          selfCheck: "Assume the opposite and force a contradiction.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, text(locale, {
            en: "there is no smallest positive real number",
            es: "no existe el menor numero real positivo",
            zh: "不存在最小的正实数",
          }), "prove"),
          firstStep: "Assume there is a smallest positive real number r.",
          setup: "Cut it in half and compare.",
          fullPath: ["Take r/2", "It is still positive", "But r/2 < r, contradicting minimality"],
          answer: "Therefore no smallest positive real number exists.",
          selfCheck: "The contradiction often comes from constructing a smaller counterexample.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, text(locale, {
            en: "there are infinitely many primes",
            es: "hay infinitos numeros primos",
            zh: "素数有无穷多个",
          }), "prove"),
          firstStep: "Assume there are only finitely many primes p1,...,pn.",
          setup: "Build N = p1p2...pn + 1.",
          fullPath: ["Every listed prime leaves remainder 1 when dividing N", "So none of them divides N", "Either N is prime or has a prime factor not on the list"],
          answer: "That contradicts finiteness, so there are infinitely many primes.",
          selfCheck: "Assume the finite list is complete, then build an escape number.",
        },
      ],
    });
  }

  if (sig.includes("induction")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, text(locale, {
            en: "1 + 2 + ... + n = n(n + 1)/2",
            es: "1 + 2 + ... + n = n(n + 1)/2",
            zh: "1 + 2 + ... + n = n(n + 1)/2",
          }), "prove"),
          firstStep: "Do the base case n = 1 first.",
          setup: "Then assume the formula for n = k and prove it for k + 1.",
          fullPath: ["Base case: 1 = 1(2)/2", "Inductive step: assume 1 + ... + k = k(k + 1)/2", "Add k + 1 to both sides and simplify to (k + 1)(k + 2)/2"],
          answer: "The identity holds for all n >= 1.",
          selfCheck: "Base case, assume k, prove k + 1.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, text(locale, {
            en: "2^n >= n + 1 for all n >= 0",
            es: "2^n >= n + 1 para todo n >= 0",
            zh: "对所有 n >= 0，有 2^n >= n + 1",
          }), "prove"),
          firstStep: "Check n = 0, then assume 2^k >= k + 1.",
          setup: "Multiply the induction hypothesis by 2 and compare to k + 2.",
          fullPath: ["Base case: 1 >= 1", "Assume 2^k >= k + 1", "Then 2^{k+1} = 2·2^k >= 2k + 2 >= k + 2"],
          answer: "So 2^n >= n + 1 for all n >= 0.",
          selfCheck: "Use the k-case exactly where the k+1 line needs it.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, text(locale, {
            en: "7 divides 8^n - 1 for every n >= 1",
            es: "7 divide 8^n - 1 para todo n >= 1",
            zh: "对每个 n >= 1，7 | (8^n - 1)",
          }), "prove"),
          firstStep: "Start with n = 1, then assume 8^k - 1 is divisible by 7.",
          setup: "Rewrite 8^{k+1} - 1 as 8(8^k - 1) + 7.",
          fullPath: ["Base case: 8 - 1 = 7", "Inductive step: 8^{k+1} - 1 = 8(8^k - 1) + 7", "Both terms are divisible by 7"],
          answer: "Thus 7 divides 8^n - 1 for all n >= 1.",
          selfCheck: "Try to rewrite the k+1 expression so the k-case appears inside it.",
        },
      ],
    });
  }

  if (sig.includes("counterexample")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, text(locale, {
            en: "disprove: every prime number is odd",
            es: "refuta: todo numero primo es impar",
            zh: "反驳：每个素数都是奇数",
          }), "prove"),
          firstStep: "Look for the smallest legal exception.",
          setup: "A single valid counterexample kills a universal claim.",
          fullPath: ["Take 2", "2 is prime", "2 is even, so the statement is false"],
          answer: "Counterexample: 2.",
          selfCheck: "One real exception is enough.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, text(locale, {
            en: "disprove: every continuous function is differentiable",
            es: "refuta: toda funcion continua es diferenciable",
            zh: "反驳：每个连续函数都可导",
          }), "prove"),
          firstStep: "Pick a classic corner example.",
          setup: "Use f(x) = |x| at x = 0.",
          fullPath: ["|x| is continuous everywhere", "At x = 0 the left derivative is -1 and the right derivative is 1", "So it is not differentiable there"],
          answer: "Counterexample: f(x) = |x|.",
          selfCheck: "The counterexample must satisfy the setup and break the conclusion.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, text(locale, {
            en: "disprove: if ab = 0, then a = 0 and b = 0",
            es: "refuta: si ab = 0, entonces a = 0 y b = 0",
            zh: "反驳：若 ab = 0，则 a = 0 且 b = 0",
          }), "prove"),
          firstStep: "Pick one factor zero and the other nonzero.",
          setup: "You only need one legal pair.",
          fullPath: ["Take a = 0, b = 5", "Then ab = 0", "But b is not 0, so the statement fails"],
          answer: "Counterexample: (a, b) = (0, 5).",
          selfCheck: "Universal claim? Find one case that breaks it.",
        },
      ],
    });
  }

  return null;
}

function linearAlgebra(locale: Locale, level: BubblegumLevel, variant: number, sig: string): DrillSeed | null {
  if (sig.includes("linear systems") || sig.includes("system")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "{ x + y = 5, 2x - y = 1 }", "solve"),
          firstStep: "Line up the variables and solve the system together.",
          setup: "Add the equations to kill y.",
          fullPath: ["(x + y) + (2x - y) = 6 gives 3x = 6", "So x = 2", "Then y = 3"],
          answer: "(x, y) = (2, 3)",
          selfCheck: "Shared variables means one shared problem.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "{ x + y + z = 4, 2x - y + z = 1, x + 3y - z = 8 }", "solve"),
          firstStep: "Write the augmented matrix and row reduce.",
          setup: "Use elimination or RREF, not three disconnected solves.",
          fullPath: ["Start with [[1,1,1|4],[2,-1,1|1],[1,3,-1|8]]", "Row reduce to solve for pivots", "The solution is x = 1, y = 2, z = 1"],
          answer: "(x, y, z) = (1, 2, 1)",
          selfCheck: "System first, variables later.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "{ x + y + z = 2, 2x + 2y + 2z = 4, x - y + z = 0 }", "solve"),
          firstStep: "Check whether one row is already a multiple of another.",
          setup: "This system is really about consistency and free variables.",
          fullPath: ["The second equation is 2 times the first", "Use the first and third equations to get y = 1 and x + z = 1", "There are infinitely many solutions: (x, y, z) = (1 - t, 1, t)"],
          answer: "Infinitely many solutions: (1 - t, 1, t)",
          selfCheck: "Repeated equations often mean a free variable is hiding.",
        },
      ],
    });
  }

  if (sig.includes("augmented matrix")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "x + 2y = 5, 3x - y = 4", "find"),
          firstStep: "Strip the variables and keep the coefficient and constant columns.",
          setup: "Order variables the same in every equation.",
          fullPath: ["Coefficients are [1,2] and [3,-1]", "Constants are 5 and 4", "So the augmented matrix is [[1,2|5],[3,-1|4]]"],
          answer: "[[1, 2 | 5], [3, -1 | 4]]",
          selfCheck: "Numbers only, answers on the right.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "x - y + 2z = 3, 2x + z = 1, y - z = 4", "find"),
          firstStep: "Insert zeroes for missing variables before building the matrix.",
          setup: "Keep the column order x, y, z.",
          fullPath: [
            "Rows: [1,-1,2|3], [2,0,1|1], [0,1,-1|4]",
            "Missing y in the second equation becomes 0",
            "This gives the augmented matrix",
          ],
          answer: "[[1, -1, 2 | 3], [2, 0, 1 | 1], [0, 1, -1 | 4]]",
          selfCheck: "Missing variable? Put in a zero column entry.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "3x - 2y + z = 7, y + 4z = 5, x - z = 2", "find"),
          firstStep: "Choose a fixed variable order before writing any row.",
          setup: "Use x, y, z across every row.",
          fullPath: [
            "Rows become [3,-2,1|7], [0,1,4|5], [1,0,-1|2]",
            "The zeroes matter as much as the visible coefficients",
            "Write the final augmented matrix",
          ],
          answer: "[[3, -2, 1 | 7], [0, 1, 4 | 5], [1, 0, -1 | 2]]",
          selfCheck: "Same column order in every row, no exceptions.",
        },
      ],
    });
  }

  if (sig.includes("row reduction") || sig.includes("rref") || sig.includes("row reduce")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "[[1, 2 | 5], [3, 4 | 11]] -> RREF", "solve"),
          firstStep: "Use R2 <- R2 - 3R1 first.",
          setup: "Clear below the first pivot before scaling.",
          fullPath: ["R2 becomes [0,-2|-4]", "Scale R2 by -1/2 to get [0,1|2]", "Clear above to get [[1,0|1],[0,1|2]]"],
          answer: "RREF = [[1, 0 | 1], [0, 1 | 2]]",
          selfCheck: "Pivot, clear below, scale, clear above.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "[[1, 1, 1 | 3], [2, 1, -1 | 2], [1, -1, 2 | 2]] -> RREF", "solve"),
          firstStep: "Use the first row to clear the x-column entries below it.",
          setup: "Work pivot by pivot instead of random row moves.",
          fullPath: ["R2 <- R2 - 2R1, R3 <- R3 - R1", "Continue until pivots step across the matrix", "The final RREF gives x = 1, y = 1, z = 1"],
          answer: "RREF leads to (x, y, z) = (1, 1, 1)",
          selfCheck: "Row operations should aim at the next pivot, not just move numbers around.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "[[1, 2, 1 | 4], [2, 4, 2 | 8], [1, 1, 0 | 2]] -> RREF", "solve"),
          firstStep: "Notice the second row is 2 times the first before you start.",
          setup: "One dependent row means the matrix may finish with a free variable or repeated information.",
          fullPath: ["Use the first and third rows to create pivots", "The dependent second row collapses to zero", "The system is still consistent and gives a free variable relation"],
          answer: "RREF shows one free variable and infinitely many solutions.",
          selfCheck: "Repeated rows change the structure of the solution set.",
        },
      ],
    });
  }

  if (sig.includes("eigen")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "A = [[2, 0], [0, 5]]. Find the eigenvalues", "find"),
          firstStep: "Solve det(A - λI) = 0.",
          setup: "For a diagonal matrix, the diagonal entries are the eigenvalues.",
          fullPath: ["det([[2 - λ, 0], [0, 5 - λ]]) = (2 - λ)(5 - λ)", "Set equal to 0", "So λ = 2 or λ = 5"],
          answer: "Eigenvalues: 2, 5",
          selfCheck: "Eigenvalues come from det(A - λI) = 0.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "A = [[4, 1], [0, 2]]. Find the eigenvalues", "find"),
          firstStep: "Write det(A - λI).",
          setup: "This upper triangular matrix still gives eigenvalues from the diagonal after det expansion.",
          fullPath: ["det([[4 - λ, 1], [0, 2 - λ]]) = (4 - λ)(2 - λ)", "Set equal to 0", "So λ = 4, 2"],
          answer: "Eigenvalues: 4, 2",
          selfCheck: "Triangular matrix? Diagonal entries are your eigenvalues.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "A = [[3, 1], [1, 3]]. Find one eigenvector for λ = 4", "find"),
          firstStep: "Solve (A - 4I)x = 0.",
          setup: "Turn the eigenvalue into a homogeneous system.",
          fullPath: ["A - 4I = [[-1, 1], [1, -1]]", "The system gives y = x", "A valid eigenvector is [1, 1]^T"],
          answer: "One eigenvector is [1, 1]^T",
          selfCheck: "Eigenvector question means solve a homogeneous system.",
        },
      ],
    });
  }

  return null;
}

function probability(locale: Locale, level: BubblegumLevel, variant: number, sig: string): DrillSeed | null {
  if (sig.includes("bayes")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "P(D)=0.01, P(+|D)=0.9, P(+|D^c)=0.05. Find P(D|+).", "find"),
          firstStep: "Write Bayes: P(D|+) = P(+|D)P(D) / P(+).",
          setup: "Compute P(+) from the true-positive and false-positive paths.",
          fullPath: ["P(+) = 0.9(0.01) + 0.05(0.99) = 0.0585", "P(D|+) = 0.9(0.01)/0.0585", "≈ 0.154"],
          answer: "P(D|+) ≈ 0.154",
          selfCheck: "Posterior = desired path over all positive paths.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "A factory has machines A and B making 60% and 40% of items. Defect rates are 2% and 5%. Find P(B|defect).", "find"),
          firstStep: "Use Bayes with B as the hidden cause and defect as the observed event.",
          setup: "Find total defect probability first.",
          fullPath: ["P(defect) = 0.6(0.02) + 0.4(0.05) = 0.032", "P(B|defect) = 0.4(0.05)/0.032", "= 0.625"],
          answer: "0.625",
          selfCheck: "Bayes flips condition direction, but the denominator collects all paths.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "Three boxes are chosen with probabilities 0.5, 0.3, 0.2. Red-ball probabilities are 0.2, 0.5, 0.8. Find P(box 3 | red).", "find"),
          firstStep: "Use total probability for P(red), then Bayes.",
          setup: "Weight each red chance by the box-selection chance.",
          fullPath: ["P(red)=0.5(0.2)+0.3(0.5)+0.2(0.8)=0.41", "P(box 3 | red)=0.2(0.8)/0.41", "≈ 0.390"],
          answer: "≈ 0.390",
          selfCheck: "The posterior numerator is one path; the denominator is every path to red.",
        },
      ],
    });
  }

  if (sig.includes("conditional")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "A deck card is face card or heart. Find P(face | heart).", "find"),
          firstStep: "Use P(face ∩ heart) / P(heart).",
          setup: "Count only hearts in the denominator.",
          fullPath: ["There are 13 hearts", "Among them, J, Q, K are face cards, so 3 hearts are face cards", "P(face | heart) = 3/13"],
          answer: "3/13",
          selfCheck: "Conditioning shrinks the sample space first.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "Roll two dice. Find P(sum = 8 | first die is even).", "find"),
          firstStep: "Restrict the sample space to rolls with even first die.",
          setup: "There are 18 such ordered outcomes.",
          fullPath: ["First die even: 3 choices, second die any: 6 choices, so 18 outcomes", "To get sum 8 with first die even: (2,6), (4,4), (6,2)", "Probability = 3/18 = 1/6"],
          answer: "1/6",
          selfCheck: "Condition first, then count inside the smaller world.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "Choose two cards without replacement. Find P(second is ace | first is ace).", "find"),
          firstStep: "After one ace is gone, reset the deck counts.",
          setup: "The condition makes the second draw a 51-card draw with 3 aces left.",
          fullPath: ["Given first is ace, 51 cards remain", "Aces left = 3", "P(second ace | first ace) = 3/51 = 1/17"],
          answer: "1/17",
          selfCheck: "Conditioning updates the counts before you compute anything else.",
        },
      ],
    });
  }

  if (sig.includes("expectation")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "X takes values 0, 1, 2 with probabilities 0.2, 0.5, 0.3. Find E[X].", "find"),
          firstStep: "Multiply each value by its probability and add.",
          setup: "Expectation is a weighted average.",
          fullPath: ["E[X] = 0(0.2) + 1(0.5) + 2(0.3)", "= 0 + 0.5 + 0.6", "= 1.1"],
          answer: "1.1",
          selfCheck: "Expected value = value times weight, added up.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "A game pays $5 with probability 0.4 and loses $2 with probability 0.6. Find the expected value.", "find"),
          firstStep: "Treat losses as negative payoffs.",
          setup: "Weight each payoff by its probability.",
          fullPath: ["E = 5(0.4) + (-2)(0.6)", "= 2 - 1.2", "= 0.8"],
          answer: "$0.80",
          selfCheck: "Do not drop the negative sign on losses.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "X ~ Binomial(n = 5, p = 0.3). Find E[X].", "find"),
          firstStep: "Use the shortcut E[X] = np.",
          setup: "Binomial expectation does not need the whole table.",
          fullPath: ["E[X] = np", "= 5(0.3)", "= 1.5"],
          answer: "1.5",
          selfCheck: "Binomial mean is one of the cleanest shortcuts in probability.",
        },
      ],
    });
  }

  return null;
}

function multivariable(locale: Locale, level: BubblegumLevel, variant: number, sig: string): DrillSeed | null {
  if (sig.includes("surface") || sig.includes("quadric") || sig.includes("cylinder")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "x^2/4 + y^2/9 + z^2/16 = 1", "identify"),
          firstStep: "Compare it to the standard quadric forms.",
          setup: "All three squared variables added and equal to 1 means ellipsoid.",
          fullPath: ["Positive squared x, y, z terms", "Each variable is scaled by a denominator", "This is an ellipsoid"],
          answer: "Ellipsoid",
          selfCheck: "All plus signs with = 1 usually means ellipsoid.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "z = x^2 + y^2", "identify"),
          firstStep: "Notice one variable is isolated and the other two are squared with the same sign.",
          setup: "That is the bowl shape.",
          fullPath: ["Horizontal traces are circles", "Vertical traces are parabolas", "This is an elliptic paraboloid opening upward"],
          answer: "Elliptic paraboloid",
          selfCheck: "One isolated variable and a sum of squares gives the bowl.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "y = x^2 - z^2", "identify"),
          firstStep: "Look at the plus/minus mix in the squared terms.",
          setup: "One plus and one minus means saddle-type behavior.",
          fullPath: ["Cross-sections in x are upward parabolas", "Cross-sections in z are downward parabolas", "This is a hyperbolic paraboloid"],
          answer: "Hyperbolic paraboloid",
          selfCheck: "Mixed signs usually mean saddle.",
        },
      ],
    });
  }

  if (sig.includes("polar") || sig.includes("double integral") || sig.includes("multiple integrals")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "∫∫_R (x^2 + y^2) dA over the disk x^2 + y^2 ≤ 4", "solve"),
          firstStep: "Switch to polar coordinates.",
          setup: "Use x^2 + y^2 = r^2 and dA = r dr dθ.",
          fullPath: ["Integral becomes ∫_{0}^{2π} ∫_{0}^{2} r^2 · r dr dθ", "= ∫_{0}^{2π} ∫_{0}^{2} r^3 dr dθ", "= 8π"],
          answer: "8π",
          selfCheck: "Circle region wants polar, and dA picks up an extra r.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "∫∫_R (x + y) dA over 0 ≤ x ≤ 1, 0 ≤ y ≤ 2", "solve"),
          firstStep: "Use a rectangular double integral with constant bounds.",
          setup: "Integrate one variable at a time.",
          fullPath: ["∫_{0}^{1} ∫_{0}^{2} (x + y) dy dx", "= ∫_{0}^{1} [xy + y^2/2]_{0}^{2} dx", "= ∫_{0}^{1} (2x + 2) dx = 3"],
          answer: "3",
          selfCheck: "Box region means straight rectangular bounds.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "∫∫∫_E 1 dV over 0 ≤ z ≤ 3, x^2 + y^2 ≤ 4", "solve"),
          firstStep: "Recognize volume of a cylinder or integrate in cylindrical coordinates.",
          setup: "Cylinder radius 2 and height 3.",
          fullPath: ["Volume = base area × height", "= π(2^2)(3)", "= 12π"],
          answer: "12π",
          selfCheck: "Sometimes the fastest triple integral is really a volume formula.",
        },
      ],
    });
  }

  return null;
}

function derivativeOrIntegral(locale: Locale, level: BubblegumLevel, variant: number, sig: string): DrillSeed | null {
  if (sig.includes("product rule")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "y = x^2 sin x", "find"),
          firstStep: "Use f'g + fg'.",
          setup: "Differentiate each factor once.",
          fullPath: ["y' = (2x)sin x + x^2 cos x"],
          answer: "2x sin x + x^2 cos x",
          selfCheck: "Differentiate one, keep one; then switch.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "y = (x^3 - 1)e^x", "find"),
          firstStep: "Use product rule on the two changing factors.",
          setup: "Derivative of x^3 - 1 is 3x^2, derivative of e^x is e^x.",
          fullPath: ["y' = 3x^2 e^x + (x^3 - 1)e^x", "= e^x(3x^2 + x^3 - 1)"],
          answer: "e^x(x^3 + 3x^2 - 1)",
          selfCheck: "Both changing means both terms appear.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "y = x^2 ln x", "find"),
          firstStep: "Product rule still applies: polynomial times log.",
          setup: "Differentiate x^2 and ln x separately.",
          fullPath: ["y' = 2x ln x + x^2(1/x)", "= 2x ln x + x"],
          answer: "2x ln x + x",
          selfCheck: "Do not let a log hide the fact that both factors change.",
        },
      ],
    });
  }

  if (sig.includes("quotient rule")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "y = (x^2 + 1)/(x - 1)", "find"),
          firstStep: "Use low d-high minus high d-low over low squared.",
          setup: "Differentiate top and bottom separately first.",
          fullPath: ["y' = ((2x)(x - 1) - (x^2 + 1)(1))/(x - 1)^2", "= (x^2 - 2x - 1)/(x - 1)^2"],
          answer: "(x^2 - 2x - 1)/(x - 1)^2",
          selfCheck: "Bottom squared stays downstairs.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "y = sin x / x^2", "find"),
          firstStep: "Quotient rule with top = sin x and bottom = x^2.",
          setup: "Differentiate the top and the bottom before you combine.",
          fullPath: ["y' = (x^2 cos x - sin x · 2x)/x^4", "= (x cos x - 2 sin x)/x^3"],
          answer: "(x cos x - 2 sin x)/x^3",
          selfCheck: "Low d-high minus high d-low, all over low squared.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "y = e^x/(1 + x^2)", "find"),
          firstStep: "Apply quotient rule, then factor e^x if helpful.",
          setup: "The denominator derivative is 2x.",
          fullPath: ["y' = (e^x(1 + x^2) - e^x(2x))/(1 + x^2)^2", "= e^x(1 + x^2 - 2x)/(1 + x^2)^2"],
          answer: "e^x(1 + x^2 - 2x)/(1 + x^2)^2",
          selfCheck: "Quotient rule first, cleanup second.",
        },
      ],
    });
  }

  if (sig.includes("implicit")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "x^2 + y^2 = 25. Find dy/dx.", "find"),
          firstStep: "Differentiate both sides with respect to x.",
          setup: "Remember y is a function of x, so y^2 needs chain rule.",
          fullPath: ["2x + 2y y' = 0", "2y y' = -2x", "y' = -x/y"],
          answer: "-x/y",
          selfCheck: "Differentiate every y-term with a y' attached.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "x^3 + y^3 = 6xy. Find dy/dx.", "find"),
          firstStep: "Differentiate each term with respect to x.",
          setup: "Use product rule on 6xy.",
          fullPath: ["3x^2 + 3y^2 y' = 6(x y' + y)", "Collect y' terms: (3y^2 - 6x)y' = 6y - 3x^2", "y' = (6y - 3x^2)/(3y^2 - 6x)"],
          answer: "(6y - 3x^2)/(3y^2 - 6x)",
          selfCheck: "Implicit differentiation is just chain rule with hidden y(x).",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "e^{xy} + x = y. Find dy/dx.", "find"),
          firstStep: "Differentiate e^(xy) with chain rule and product rule inside.",
          setup: "d/dx(xy) = x y' + y.",
          fullPath: ["e^{xy}(x y' + y) + 1 = y'", "Group y' terms: (e^{xy}x - 1)y' = -e^{xy}y - 1", "y' = (-e^{xy}y - 1)/(e^{xy}x - 1)"],
          answer: "(-e^{xy}y - 1)/(e^{xy}x - 1)",
          selfCheck: "Hidden products inside exponents still need product rule.",
        },
      ],
    });
  }

  if (sig.includes("optimization")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "A rectangle has perimeter 40. Find the maximum area.", "solve"),
          firstStep: "Write area in one variable using the perimeter constraint.",
          setup: "If 2x + 2y = 40, then y = 20 - x and A = x(20 - x).",
          fullPath: ["A(x) = 20x - x^2", "A'(x) = 20 - 2x = 0 gives x = 10", "Then y = 10 and max area = 100"],
          answer: "Maximum area = 100 at a 10 by 10 square",
          selfCheck: "Write one variable, then optimize.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "An open-top box is made from a 12 by 12 square by cutting equal corners. Find the cut size that maximizes volume.", "solve"),
          firstStep: "Let x be the cut size and write V(x).",
          setup: "Volume = x(12 - 2x)^2.",
          fullPath: ["V(x) = x(12 - 2x)^2", "Differentiate and solve V'(x) = 0", "The interior critical point that works is x = 2"],
          answer: "Cut out squares of side 2",
          selfCheck: "Optimization always starts with one clean formula in one variable.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "A cylinder has fixed volume 100π. Find the radius that minimizes surface area.", "solve"),
          firstStep: "Use the volume constraint to write h in terms of r.",
          setup: "With πr^2 h = 100π, you get h = 100/r^2.",
          fullPath: ["Surface area S = 2πr^2 + 2πrh = 2πr^2 + 200π/r", "Differentiate: S' = 4πr - 200π/r^2", "Set equal to 0 to get r^3 = 50, so r = cuberoot(50)"],
          answer: "r = cuberoot(50)",
          selfCheck: "Constraint first, derivative second.",
        },
      ],
    });
  }

  if (sig.includes("u-substitution") || sig.includes("u-sub")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "∫ 2x cos(x^2) dx", "evaluate"),
          firstStep: "Let u = x^2.",
          setup: "Then du = 2x dx, which is already present.",
          fullPath: ["∫ 2x cos(x^2) dx = ∫ cos(u) du", "= sin(u) + C", "= sin(x^2) + C"],
          answer: "sin(x^2) + C",
          selfCheck: "Inside function plus its derivative means u-sub.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "∫ x/(x^2 + 4) dx", "evaluate"),
          firstStep: "Set u = x^2 + 4.",
          setup: "du = 2x dx, so pull out a 1/2.",
          fullPath: ["∫ x/(x^2 + 4) dx = (1/2)∫ du/u", "= (1/2) ln|u| + C", "= (1/2) ln(x^2 + 4) + C"],
          answer: "(1/2) ln(x^2 + 4) + C",
          selfCheck: "Inside and derivative nearby means substitute.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "∫ x(x^2 + 1)^5 dx", "evaluate"),
          firstStep: "Choose u = x^2 + 1.",
          setup: "Then du = 2x dx and the integral becomes a power rule integral.",
          fullPath: ["∫ x(x^2 + 1)^5 dx = (1/2)∫ u^5 du", "= u^6/12 + C", "= (x^2 + 1)^6/12 + C"],
          answer: "(x^2 + 1)^6/12 + C",
          selfCheck: "u-sub turns a messy outside-inside integral into a plain power rule.",
        },
      ],
    });
  }

  return null;
}

export function buildBubblegumDrill(
  card: BubbleCard,
  locale: Locale,
  level: BubblegumLevel,
  variant: number,
): BubblegumDrill {
  const sig = signature(card);
  const technique = getTechniqueLabel(card, locale);

  const seed =
    (sig.includes("direct-substitution") && directSubstitution(locale, level, variant)) ||
    (sig.includes("factoring") && factoringLimit(locale, level, variant)) ||
    (sig.includes("rationalizing") &&
      pick(level, variant, {
        quiz: [
          {
            prompt: workThis(locale, "lim_{x→0} (√(x + 9) - 3)/x", "evaluate"),
            firstStep: "Multiply by the conjugate.",
            setup: "Use √(x + 9) + 3 over itself to clear the radical subtraction.",
            fullPath: ["[(√(x + 9) - 3)/x] · [(√(x + 9) + 3)/(√(x + 9) + 3)]", "= 1/(√(x + 9) + 3)", "At x = 0 the limit is 1/6"],
            answer: "1/6",
            selfCheck: "Radical minus radical often wants the conjugate.",
          },
        ],
        midterm: [
          {
            prompt: workThis(locale, "lim_{x→4} (√x - 2)/(x - 4)", "evaluate"),
            firstStep: "Use the conjugate √x + 2.",
            setup: "Rationalize first, then cancel x - 4.",
            fullPath: ["(√x - 2)(√x + 2) = x - 4", "The fraction becomes 1/(√x + 2)", "At x = 4 the limit is 1/4"],
            answer: "1/4",
            selfCheck: "Conjugate turns the radical difference into a clean factor.",
          },
        ],
        final: [
          {
            prompt: workThis(locale, "lim_{x→0} (1 - cos x)/x^2", "evaluate"),
            firstStep: "Multiply by the conjugate-style partner 1 + cos x.",
            setup: "Use (1 - cos x)(1 + cos x) = 1 - cos^2 x = sin^2 x.",
            fullPath: ["(1 - cos x)/x^2 = sin^2 x / [x^2(1 + cos x)]", "= (sin x / x)^2 · 1/(1 + cos x)", "The limit is 1/2"],
            answer: "1/2",
            selfCheck: "Rationalizing is not only for square roots; use algebraic partners when they clean the expression.",
          },
        ],
      })) ||
    (sig.includes("l'hospital") && pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "lim_{x→0} (e^x - 1)/x", "evaluate"),
          firstStep: "Check that direct substitution gives 0/0, then differentiate top and bottom.",
          setup: "L'Hospital applies because the form is indeterminate.",
          fullPath: ["d/dx(e^x - 1) = e^x and d/dx(x) = 1", "The limit becomes lim_{x→0} e^x", "= 1"],
          answer: "1",
          selfCheck: "Only use L'Hospital after confirming 0/0 or ∞/∞.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "lim_{x→∞} ln x / x", "evaluate"),
          firstStep: "Recognize the ∞/∞ form and apply L'Hospital.",
          setup: "Differentiate top and bottom once.",
          fullPath: ["The limit becomes lim_{x→∞} (1/x)/1", "= lim_{x→∞} 1/x", "= 0"],
          answer: "0",
          selfCheck: "∞/∞ lets you differentiate top and bottom together.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "lim_{x→0} (sin x - x)/x^3", "evaluate"),
          firstStep: "This is 0/0, so L'Hospital may need to be used more than once.",
          setup: "Differentiate until the form stops being indeterminate.",
          fullPath: ["After one pass: (cos x - 1)/(3x^2)", "After two passes: (-sin x)/(6x)", "After three passes: (-cos x)/6 -> -1/6"],
          answer: "-1/6",
          selfCheck: "Some L'Hospital problems chew through several rounds.",
        },
      ],
    })) ||
    proofMethod(locale, level, variant, sig) ||
    (sig.includes("equivalence relation") && proofEquivalence(locale, level, variant)) ||
    linearAlgebra(locale, level, variant, sig) ||
    probability(locale, level, variant, sig) ||
    multivariable(locale, level, variant, sig) ||
    (sig.includes("chain rule") && chainRule(locale, level, variant)) ||
    (sig.includes("integration by parts") && integrationByParts(locale, level, variant)) ||
    derivativeOrIntegral(locale, level, variant, sig) ||
    fallbackDrill(card, locale);

  return {
    level,
    prompt: seed.prompt,
    technique,
    firstStep: seed.firstStep,
    setup: seed.setup,
    fullPath: seed.fullPath,
    answer: seed.answer,
    commonMiss: card.watchOutFor,
    selfCheck: seed.selfCheck,
  };
}

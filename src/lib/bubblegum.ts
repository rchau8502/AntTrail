import type { BubbleCard } from "@/content/schema";
import type { Locale } from "@/lib/i18n";
import {
  getPatternTokens,
  getRecognitionPrompt,
  getTechniqueLabel,
} from "@/lib/recognition";

export type BubblegumLevel = "warmup" | "quiz" | "midterm" | "final";
type ExamLevel = Exclude<BubblegumLevel, "warmup">;

export interface BubblegumDrill {
  level: BubblegumLevel;
  prompt: string;
  technique: string;
  whyFits: string;
  notationHelp: string[];
  missedBecause: string;
  nextLookFor: string;
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
  whyFits?: string;
  notationHelp?: string[];
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

function pick(level: ExamLevel, variant: number, groups: Record<ExamLevel, DrillSeed[]>) {
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

function firstChunk(text: string) {
  return text
    .split(/\s*(?:,|;|\.| then | and then | after that |，|；|。|然后|再)\s*/i)[0]
    .trim();
}

function guessVerb(sig: string): "solve" | "find" | "evaluate" | "prove" | "identify" {
  if (
    sig.includes("proof") ||
    sig.includes("equivalence") ||
    sig.includes("contrapositive") ||
    sig.includes("contradiction") ||
    sig.includes("induction")
  ) {
    return "prove";
  }

  if (sig.includes("limit") || sig.includes("integral")) {
    return "evaluate";
  }

  if (sig.includes("surface") || sig.includes("quadric") || sig.includes("cylinder")) {
    return "identify";
  }

  if (
    sig.includes("derivative") ||
    sig.includes("chain rule") ||
    sig.includes("product rule") ||
    sig.includes("quotient rule") ||
    sig.includes("bayes") ||
    sig.includes("eigen")
  ) {
    return "find";
  }

  return "solve";
}

function buildWhyFits(card: BubbleCard, locale: Locale, technique: string) {
  const sig = signature(card);

  if (sig.includes("equivalence relation")) {
    return text(locale, {
      en: "This belongs here because the relation must pass three checks: reflexive, symmetric, and transitive.",
      es: "Esto va aqui porque la relacion tiene que pasar tres chequeos: reflexiva, simetrica y transitiva.",
      zh: "这题属于这里，因为一个关系要过三关：自反、对称、传递。",
    });
  }

  if (sig.includes("contrapositive")) {
    return text(locale, {
      en: "This fits contrapositive because the original statement is cleaner after you flip and negate it.",
      es: "Esto encaja con contraposicion porque el enunciado se vuelve mas limpio al voltearlo y negarlo.",
      zh: "这题适合逆否证明，因为把命题翻过去再否定后会更好做。",
    });
  }

  if (sig.includes("contradiction")) {
    return text(locale, {
      en: "This fits contradiction because you can assume the opposite and force an impossible outcome.",
      es: "Esto encaja con contradiccion porque puedes suponer lo contrario y llegar a algo imposible.",
      zh: "这题适合反证法，因为先假设相反结论，再把它逼到矛盾。",
    });
  }

  if (sig.includes("bayes") || sig.includes("conditional")) {
    return text(locale, {
      en: "This fits because the question gives one condition and asks you to reverse or restrict the probability after that condition.",
      es: "Esto encaja porque la pregunta te da una condicion y luego te pide restringir o invertir la probabilidad dentro de esa condicion.",
      zh: "这题属于这里，因为题目先给了条件，再问条件下的概率，或者反过来追原因。",
    });
  }

  if (sig.includes("linear systems") || sig.includes("row reduction") || sig.includes("augmented matrix")) {
    return text(locale, {
      en: "This fits because several equations or rows are tied to the same variables, so you solve the whole system together.",
      es: "Esto encaja porque varias ecuaciones o filas comparten las mismas variables, asi que se resuelve todo el sistema junto.",
      zh: "这题属于这里，因为多行方程绑着同一组未知数，所以要把整个系统一起处理。",
    });
  }

  if (sig.includes("chain rule")) {
    return text(locale, {
      en: "This fits chain rule because one function is stuffed inside another and both layers change.",
      es: "Esto encaja con regla de la cadena porque una funcion esta metida dentro de otra y cambian las dos capas.",
      zh: "这题适合链式法则，因为一个函数塞在另一个函数里面，两层都在变。",
    });
  }

  if (sig.includes("direct-substitution")) {
    return text(locale, {
      en: "This fits direct substitution because plugging in the target value does not break the expression.",
      es: "Esto encaja con sustitucion directa porque al meter el valor objetivo la expresion no se rompe.",
      zh: "这题适合直接代入，因为把目标值代进去后表达式不会坏掉。",
    });
  }

  if (sig.includes("factoring")) {
    return text(locale, {
      en: "This fits factoring because plugging in first gives 0/0, so there is a hidden factor to expose.",
      es: "Esto encaja con factorizacion porque al sustituir primero sale 0/0, asi que hay un factor escondido.",
      zh: "这题适合因式分解，因为先代入会得到 0/0，说明里面藏着公因子。",
    });
  }

  if (sig.includes("surface") || sig.includes("quadric") || sig.includes("cylinder")) {
    return text(locale, {
      en: "This fits surface recognition because the whole job is to match the equation shape to the standard graph family.",
      es: "Esto encaja con reconocimiento de superficies porque todo el trabajo es emparejar la forma de la ecuacion con una familia grafica conocida.",
      zh: "这题属于曲面识别，因为核心任务就是把方程形状对上标准图形家族。",
    });
  }

  return text(locale, {
    en: `This belongs here because the usual move is ${technique} and the shape matches ${card.looksLike}.`,
    es: `Esto va aqui porque la jugada usual es ${technique} y la forma coincide con ${card.looksLike}.`,
    zh: `这题属于这里，因为常用方法是 ${technique}，而题型长得像 ${card.looksLike}。`,
  });
}

function buildNotationHelp(card: BubbleCard, locale: Locale) {
  const sig = signature(card);

  if (sig.includes("equivalence relation")) {
    return [
      text(locale, {
        en: "~ means 'is related to'.",
        es: "~ significa 'esta relacionado con'.",
        zh: "~ 表示“有这种关系”。",
      }),
      text(locale, {
        en: "Reflexive = x~x, symmetric = x~y => y~x, transitive = x~y and y~z => x~z.",
        es: "Reflexiva = x~x, simetrica = x~y => y~x, transitiva = x~y y y~z => x~z.",
        zh: "自反 = x~x，对称 = x~y => y~x，传递 = x~y 且 y~z => x~z。",
      }),
    ];
  }

  if (sig.includes("contrapositive")) {
    return [
      text(locale, {
        en: "Contrapositive of 'if P then Q' is 'if not Q then not P'.",
        es: "La contraposicion de 'si P entonces Q' es 'si no Q entonces no P'.",
        zh: "“若 P 则 Q”的逆否命题是“若非 Q 则非 P”。",
      }),
    ];
  }

  if (sig.includes("bayes") || sig.includes("conditional")) {
    return [
      text(locale, {
        en: "P(A|B) means probability of A given that B already happened.",
        es: "P(A|B) significa probabilidad de A dado que B ya ocurrio.",
        zh: "P(A|B) 表示“在 B 已发生的条件下，A 的概率”。",
      }),
    ];
  }

  if (sig.includes("linear systems") || sig.includes("augmented matrix")) {
    return [
      text(locale, {
        en: "[A|b] means coefficient matrix on the left, constants on the right.",
        es: "[A|b] significa coeficientes a la izquierda y constantes a la derecha.",
        zh: "[A|b] 表示左边是系数，右边是常数列。",
      }),
    ];
  }

  if (sig.includes("row reduction")) {
    return [
      text(locale, {
        en: "RREF means reduced row echelon form.",
        es: "RREF significa forma escalonada reducida por filas.",
        zh: "RREF 表示“最简行阶梯形”。",
      }),
    ];
  }

  if (sig.includes("bayes") || sig.includes("probability")) {
    return [
      text(locale, {
        en: "Write hidden-cause probability in the numerator and all successful paths in the denominator.",
        es: "Pon la causa escondida en el numerador y todos los caminos exitosos en el denominador.",
        zh: "分子写你真正想要的那条路径，分母写所有能到达该结果的路径。",
      }),
    ];
  }

  if (sig.includes("limit")) {
    return [
      text(locale, {
        en: "lim_{x→a} asks what the output heads toward as x gets close to a.",
        es: "lim_{x→a} pregunta a que valor se acerca la salida cuando x se acerca a a.",
        zh: "lim_{x→a} 问的是 x 靠近 a 时，输出往哪里靠。",
      }),
    ];
  }

  return [];
}

function buildMissedBecause(card: BubbleCard, locale: Locale, technique: string) {
  const cue = getRecognitionPrompt(card);

  return text(locale, {
    en: `If you missed this, the usual reason is that the cue "${cue}" did not get linked to ${technique} soon enough.`,
    es: `Si fallaste aqui, la razon usual es que la pista "${cue}" no se conecto a tiempo con ${technique}.`,
    zh: `如果这里做错，常见原因是没有及时把题目提示“${cue}”和 ${technique} 连起来。`,
  });
}

function buildNextLookFor(card: BubbleCard, locale: Locale) {
  const tokens = getPatternTokens(card);
  const pattern = tokens.length > 0 ? tokens.join(", ") : card.looksLike;

  return text(locale, {
    en: `Next time, look for these trigger clues first: ${pattern}.`,
    es: `La proxima vez, busca primero estas pistas disparadoras: ${pattern}.`,
    zh: `下次先抓这些触发线索：${pattern}。`,
  });
}

function buildWarmupDrill(card: BubbleCard, locale: Locale, technique: string): BubblegumDrill {
  const sig = signature(card);
  const problem = card.quickExample?.problem ?? card.typicalProblemShapes[0] ?? card.looksLike;
  const firstStep = card.quickExample?.move ?? firstChunk(card.doThis) ?? card.doThis;

  return {
    level: "warmup",
    prompt: workThis(locale, problem, guessVerb(sig)),
    technique,
    whyFits: buildWhyFits(card, locale, technique),
    notationHelp: buildNotationHelp(card, locale),
    missedBecause: buildMissedBecause(card, locale, technique),
    nextLookFor: buildNextLookFor(card, locale),
    firstStep,
    setup: text(locale, {
      en: `Start with the friendliest version of ${card.name}.`,
      es: `Empieza con la version mas amable de ${card.name}.`,
      zh: `先从 ${card.name} 最友好的版本开始。`,
    }),
    fullPath: [
      firstStep,
      card.quickExample?.move ?? card.doThis,
      card.rememberThis,
    ],
    answer: card.quickExample?.move ?? firstStep,
    commonMiss: card.watchOutFor,
    selfCheck: card.memoryHook,
  };
}

function proofPractice(locale: Locale, level: ExamLevel, variant: number, sig: string): DrillSeed | null {
  if (sig.includes("proof-direct")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, text(locale, {
            en: "if n is even, then n^2 is even",
            es: "si n es par, entonces n^2 es par",
            zh: "若 n 是偶数，则 n^2 是偶数",
          }), "prove"),
          firstStep: "Start from the hypothesis and write n = 2k.",
          setup: "Direct proof works because the definition pushes straight to the conclusion.",
          fullPath: ["Assume n = 2k", "Then n^2 = (2k)^2 = 4k^2 = 2(2k^2)", "So n^2 is even"],
          answer: "The statement is proved directly.",
          selfCheck: "Assume P, reach Q.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, text(locale, {
            en: "if a and b are divisible by 3, then a + b is divisible by 3",
            es: "si a y b son divisibles por 3, entonces a + b es divisible por 3",
            zh: "若 a 和 b 都能被 3 整除，则 a + b 也能被 3 整除",
          }), "prove"),
          firstStep: "Write a = 3m and b = 3n.",
          setup: "Use the divisibility definition directly.",
          fullPath: ["Assume a = 3m and b = 3n", "Then a + b = 3m + 3n = 3(m + n)", "So a + b is divisible by 3"],
          answer: "The sum is divisible by 3.",
          selfCheck: "Definition first, algebra second.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, text(locale, {
            en: "if A ⊆ B and B ⊆ C, then A ⊆ C",
            es: "si A ⊆ B y B ⊆ C, entonces A ⊆ C",
            zh: "若 A ⊆ B 且 B ⊆ C，则 A ⊆ C",
          }), "prove"),
          firstStep: "Take an arbitrary x in A.",
          setup: "Subset proofs are direct element-chasing.",
          fullPath: ["Let x ∈ A", "Since A ⊆ B, we get x ∈ B", "Since B ⊆ C, we get x ∈ C, so A ⊆ C"],
          answer: "Therefore A ⊆ C.",
          selfCheck: "Subset proof = pick an element and chase it.",
        },
      ],
    });
  }

  if (sig.includes("proof-induction")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "1 + 2 + ... + n = n(n + 1)/2", "prove"),
          firstStep: "Do the base case n = 1.",
          setup: "Then assume the statement for k and prove it for k + 1.",
          fullPath: ["Base case: 1 = 1(2)/2", "Induction hypothesis: 1+...+k = k(k+1)/2", "Add k+1 and simplify to get (k+1)(k+2)/2"],
          answer: "The formula holds for all n >= 1.",
          selfCheck: "Base, assume k, prove k+1.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "2^n >= n + 1 for all n >= 0", "prove"),
          firstStep: "Check n = 0, then assume the claim at n = k.",
          setup: "Use the induction hypothesis inside the k+1 line.",
          fullPath: ["Base case: 1 >= 1", "Assume 2^k >= k+1", "Then 2^{k+1} = 2·2^k >= 2k+2 >= k+2"],
          answer: "So the claim holds for every n >= 0.",
          selfCheck: "The k-case must appear inside the k+1 work.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "7 divides 8^n - 1 for all n >= 1", "prove"),
          firstStep: "Use n = 1 as the base case and rewrite the k+1 line to show 8^k - 1 inside it.",
          setup: "Induction works best when the new expression contains the old one.",
          fullPath: ["Base case: 8 - 1 = 7", "Assume 7 | (8^k - 1)", "Then 8^{k+1} - 1 = 8(8^k - 1) + 7, so it is divisible by 7"],
          answer: "Hence 7 divides 8^n - 1 for all n >= 1.",
          selfCheck: "Rewrite k+1 until the induction hypothesis shows up.",
        },
      ],
    });
  }

  if (sig.includes("proof-counterexample")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, text(locale, {
            en: "disprove: every prime is odd",
            es: "refuta: todo primo es impar",
            zh: "反驳：每个素数都是奇数",
          }), "prove"),
          firstStep: "Look for one legal exception.",
          setup: "A single real counterexample is enough.",
          fullPath: ["Take 2", "2 is prime", "2 is not odd, so the claim fails"],
          answer: "Counterexample: 2.",
          selfCheck: "One valid exception kills a universal claim.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, text(locale, {
            en: "disprove: every continuous function is differentiable",
            es: "refuta: toda funcion continua es diferenciable",
            zh: "反驳：每个连续函数都可导",
          }), "prove"),
          firstStep: "Pick a classic corner function.",
          setup: "The best counterexample fits the assumptions but breaks the conclusion.",
          fullPath: ["Use f(x)=|x|", "It is continuous everywhere", "At x=0 the one-sided derivatives disagree, so it is not differentiable"],
          answer: "Counterexample: f(x)=|x|.",
          selfCheck: "The counterexample must satisfy the setup exactly.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, text(locale, {
            en: "disprove: if ab = 0, then a = 0 and b = 0",
            es: "refuta: si ab = 0, entonces a = 0 y b = 0",
            zh: "反驳：若 ab = 0，则 a = 0 且 b = 0",
          }), "prove"),
          firstStep: "Make one factor zero and the other factor nonzero.",
          setup: "You only need one legal pair.",
          fullPath: ["Take a = 0 and b = 5", "Then ab = 0", "But b ≠ 0, so the statement is false"],
          answer: "Counterexample: (0, 5).",
          selfCheck: "Universal statement? One broken case is enough.",
        },
      ],
    });
  }

  return null;
}

function analysisPractice(locale: Locale, level: ExamLevel, variant: number, sig: string): DrillSeed | null {
  if (sig.includes("analysis140a-supremum")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "A = {x in R : x < 2}. Show that sup A = 2.", "prove"),
          firstStep: "Do the two supremum checks: upper bound, then least upper bound.",
          setup: "Supremum proofs always split into those two parts.",
          fullPath: ["Every x in A satisfies x < 2, so 2 is an upper bound", "Take any epsilon > 0; then 2 - epsilon/2 is still in A", "So no smaller number can be an upper bound"],
          answer: "Therefore sup A = 2.",
          selfCheck: "Supremum = upper bound plus leastness.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "B = {1 - 1/n : n in N}. Show that sup B = 1.", "prove"),
          firstStep: "Show 1 bounds the set, then get arbitrarily close from below.",
          setup: "Use the epsilon version of leastness.",
          fullPath: ["1 - 1/n < 1 for every n, so 1 is an upper bound", "Given epsilon > 0, choose n > 1/epsilon", "Then 1 - 1/n > 1 - epsilon, so 1 is the least upper bound"],
          answer: "sup B = 1.",
          selfCheck: "To prove leastness, get within epsilon from below.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "If s = sup A and epsilon > 0, show there exists a in A with s - epsilon < a <= s.", "prove"),
          firstStep: "Argue by contradiction from the definition of least upper bound.",
          setup: "If no such a existed, s - epsilon would already be an upper bound.",
          fullPath: ["Assume no element of A is bigger than s - epsilon", "Then every a in A satisfies a <= s - epsilon", "So s - epsilon is an upper bound, contradicting that s is the least upper bound"],
          answer: "Such an a must exist.",
          selfCheck: "Least upper bound means you cannot slide the ceiling lower.",
        },
      ],
    });
  }

  if (sig.includes("analysis140a-sequence-limit")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "Prove that 1/n -> 0.", "prove"),
          firstStep: "Start with epsilon > 0 and solve 1/n < epsilon.",
          setup: "Sequence limit proofs turn the target into an N-condition.",
          fullPath: ["Need 1/n < epsilon", "Choose N > 1/epsilon", "Then n >= N implies 1/n <= 1/N < epsilon"],
          answer: "Therefore 1/n -> 0.",
          selfCheck: "Given epsilon, solve for N.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "Prove that (2n+1)/n -> 2.", "prove"),
          firstStep: "Rewrite the difference from 2 before choosing N.",
          setup: "|(2n+1)/n - 2| simplifies to 1/n.",
          fullPath: ["|(2n+1)/n - 2| = |1/n|", "Need 1/n < epsilon", "Choose N > 1/epsilon"],
          answer: "So (2n+1)/n converges to 2.",
          selfCheck: "Simplify |a_n - L| before touching N.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "Prove that (3n-4)/(n+2) -> 3.", "prove"),
          firstStep: "Compute |(3n-4)/(n+2) - 3| first.",
          setup: "Turn the abstract limit statement into a clean inequality in n.",
          fullPath: ["|(3n-4)/(n+2) - 3| = |(-10)/(n+2)|", "Need 10/(n+2) < epsilon", "Choose N > 10/epsilon"],
          answer: "Hence the sequence converges to 3.",
          selfCheck: "Always simplify the absolute difference first.",
        },
      ],
    });
  }

  if (sig.includes("analysis140a-continuity")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "Prove f(x)=2x is continuous at a.", "prove"),
          firstStep: "Start from |2x - 2a| < epsilon.",
          setup: "Work backward to choose a delta.",
          fullPath: ["|2x - 2a| = 2|x-a|", "Want 2|x-a| < epsilon", "Choose delta = epsilon/2"],
          answer: "delta = epsilon/2 works.",
          selfCheck: "Epsilon asks, delta answers.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "Prove f(x)=x^2 is continuous at a.", "prove"),
          firstStep: "Factor |x^2-a^2| into |x-a||x+a|.",
          setup: "Control the extra |x+a| term by first forcing x to stay near a.",
          fullPath: ["Assume |x-a| < 1 so |x+a| <= |x-a| + 2|a| < 1 + 2|a|", "Then |x^2-a^2| < |x-a|(1+2|a|)", "Choose delta = min(1, epsilon/(1+2|a|))"],
          answer: "delta = min(1, epsilon/(1+2|a|)) works.",
          selfCheck: "When extra factors appear, first box x into a small neighborhood.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "Prove f(x)=1/x is continuous at a != 0.", "prove"),
          firstStep: "Write |1/x - 1/a| as |x-a| / |ax|.",
          setup: "You must keep x away from 0 before choosing the final delta.",
          fullPath: ["Force |x-a| < |a|/2, then |x| > |a|/2", "So |ax| > |a|^2/2", "Then choose delta = min(|a|/2, epsilon|a|^2/2)"],
          answer: "A suitable delta is min(|a|/2, epsilon|a|^2/2).",
          selfCheck: "Continuity of fractions needs a denominator safety fence first.",
        },
      ],
    });
  }

  if (sig.includes("analysis140a-cauchy")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "What must you show to prove a sequence is Cauchy?", "prove"),
          firstStep: "Write the tail-to-tail goal |a_n - a_m| < epsilon.",
          setup: "Cauchy proofs compare late terms to each other, not to a known limit.",
          fullPath: ["Start with epsilon > 0", "Choose N so m,n >= N force the tail difference small", "State the required inequality explicitly"],
          answer: "Show that for every epsilon > 0, there exists N so m,n >= N implies |a_n-a_m| < epsilon.",
          selfCheck: "Cauchy means late terms bunch together.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "Show that a_n = 1/n is Cauchy.", "prove"),
          firstStep: "Bound |1/n - 1/m| by something easier, like 1/n + 1/m.",
          setup: "Then make both terms small when n and m are large.",
          fullPath: ["Assume m,n >= N", "|1/n - 1/m| <= 1/n + 1/m <= 2/N", "Choose N > 2/epsilon"],
          answer: "So 1/n is Cauchy.",
          selfCheck: "For Cauchy, find an easy bound on the tail difference.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "If a_n converges, explain why it is Cauchy.", "prove"),
          firstStep: "Compare both a_n and a_m to the same limit L.",
          setup: "Use the triangle inequality.",
          fullPath: ["Given epsilon > 0, choose N so n >= N implies |a_n-L| < epsilon/2", "Then for m,n >= N, |a_n-a_m| <= |a_n-L| + |a_m-L|", "< epsilon/2 + epsilon/2 = epsilon"],
          answer: "Every convergent sequence is Cauchy.",
          selfCheck: "One common anchor point can control two tail terms at once.",
        },
      ],
    });
  }

  return null;
}

function linearAlgebraPractice(locale: Locale, level: ExamLevel, variant: number, sig: string): DrillSeed | null {
  if (sig.includes("la-subspace-test")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "W = {(x,y): x+y=0}. Is W a subspace of R^2?", "prove"),
          firstStep: "Check zero vector, closure under addition, and closure under scalar multiplication.",
          setup: "Subspace test is always the same three checks.",
          fullPath: ["(0,0) satisfies x+y=0", "If x1+y1=0 and x2+y2=0, then (x1+x2)+(y1+y2)=0", "If x+y=0, then c x + c y = c(x+y)=0"],
          answer: "Yes, W is a subspace.",
          selfCheck: "Zero, add, scale.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "W = {(x,y): x+y=1}. Is W a subspace of R^2?", "prove"),
          firstStep: "Check the zero vector first.",
          setup: "Failing the zero-vector check kills the subspace immediately.",
          fullPath: ["(0,0) does not satisfy x+y=1", "So W does not contain the zero vector", "Therefore W is not a subspace"],
          answer: "No, W is not a subspace.",
          selfCheck: "If zero is missing, stop there.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "W = {(x,y,z): x-2y+z=0}. Is W a subspace of R^3?", "prove"),
          firstStep: "Run the three closure checks.",
          setup: "Linear equations equal to 0 usually pass the subspace test.",
          fullPath: ["Zero vector works", "Addition preserves the equation", "Scalar multiplication preserves the equation"], 
          answer: "Yes, W is a subspace of R^3.",
          selfCheck: "Homogeneous linear conditions usually signal subspace.",
        },
      ],
    });
  }

  if (sig.includes("la-linear-independence")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "Are (1,0) and (0,1) linearly independent?", "prove"),
          firstStep: "Set c1(1,0)+c2(0,1)=(0,0) and solve.",
          setup: "Independence means only the trivial combination gives zero.",
          fullPath: ["c1=0 and c2=0", "Only the trivial solution works", "So the vectors are independent"],
          answer: "Yes, they are linearly independent.",
          selfCheck: "Independent means no nontrivial zero combination.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "Are (1,2) and (2,4) linearly independent?", "prove"),
          firstStep: "Look for whether one vector is a scalar multiple of the other.",
          setup: "Scalar multiples are automatically dependent.",
          fullPath: ["(2,4)=2(1,2)", "So one vector brings no new direction", "Therefore the set is linearly dependent"],
          answer: "No, they are dependent.",
          selfCheck: "Multiple of another vector means dependent.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "Decide whether {(1,0,1),(0,1,1),(1,1,2)} is linearly independent.", "prove"),
          firstStep: "Check whether one vector is already a combination of the others.",
          setup: "If v3 = v1 + v2, the set is dependent.",
          fullPath: ["(1,1,2) = (1,0,1) + (0,1,1)", "So one vector is redundant", "Hence the set is dependent"],
          answer: "The set is linearly dependent.",
          selfCheck: "Redundant vector = dependence.",
        },
      ],
    });
  }

  return null;
}

function probabilityPractice(locale: Locale, level: ExamLevel, variant: number, sig: string): DrillSeed | null {
  if (sig.includes("prob-combinations")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "How many ways can you choose 3 students from 8?", "find"),
          firstStep: "Use a combination because order does not matter.",
          setup: "This is choose, not arrange.",
          fullPath: ["C(8,3) = 8!/(3!5!)", "= 56"],
          answer: "56",
          selfCheck: "Choosing a group means combinations.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "A committee of 4 is chosen from 10 people. How many committees are possible?", "find"),
          firstStep: "Use C(10,4).",
          setup: "Committees ignore order.",
          fullPath: ["C(10,4)=10!/(4!6!)", "=210"],
          answer: "210",
          selfCheck: "Committee = combination.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "From 6 women and 5 men, how many 4-person groups contain exactly 2 women?", "find"),
          firstStep: "Split the counting by category: choose women and choose men.",
          setup: "Exactly 2 women means 2 women and 2 men.",
          fullPath: ["Choose 2 women: C(6,2)=15", "Choose 2 men: C(5,2)=10", "Multiply: 15·10 = 150"],
          answer: "150",
          selfCheck: "Exact-category counting usually means choose each category separately, then multiply.",
        },
      ],
    });
  }

  if (sig.includes("prob-independence")) {
    return pick(level, variant, {
      quiz: [
        {
          prompt: workThis(locale, "If P(A)=0.5, P(B)=0.4, and P(A∩B)=0.2, are A and B independent?", "find"),
          firstStep: "Compare P(A∩B) to P(A)P(B).",
          setup: "Independence means product rule exactly.",
          fullPath: ["P(A)P(B)=0.5·0.4=0.2", "This matches P(A∩B)", "So A and B are independent"],
          answer: "Yes, A and B are independent.",
          selfCheck: "Independent means intersection equals product.",
        },
      ],
      midterm: [
        {
          prompt: workThis(locale, "A fair coin is flipped twice. Are 'first flip is H' and 'second flip is H' independent?", "find"),
          firstStep: "Check whether one event changes the probability of the other.",
          setup: "Separate flips should not affect each other.",
          fullPath: ["P(first H)=1/2 and P(second H)=1/2", "P(both H)=1/4", "Since 1/4=(1/2)(1/2), the events are independent"],
          answer: "Yes, they are independent.",
          selfCheck: "If one event does not change the other, independence is plausible.",
        },
      ],
      final: [
        {
          prompt: workThis(locale, "A card is drawn from a deck. Are A='card is a heart' and B='card is a face card' independent?", "find"),
          firstStep: "Compute P(A), P(B), and P(A∩B).",
          setup: "Compare the intersection to the product.",
          fullPath: ["P(A)=13/52=1/4", "P(B)=12/52=3/13, and P(A∩B)=3/52", "Since (1/4)(3/13)=3/52, the events are independent"],
          answer: "Yes, they are independent.",
          selfCheck: "Count the overlap, then compare to the product.",
        },
      ],
    });
  }

  return null;
}

function directSubstitution(locale: Locale, level: ExamLevel, variant: number): DrillSeed {
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

function factoringLimit(locale: Locale, level: ExamLevel, variant: number): DrillSeed {
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

function chainRule(locale: Locale, level: ExamLevel, variant: number): DrillSeed {
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

function integrationByParts(locale: Locale, level: ExamLevel, variant: number): DrillSeed {
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

function proofEquivalence(locale: Locale, level: ExamLevel, variant: number): DrillSeed {
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

function proofMethod(locale: Locale, level: ExamLevel, variant: number, sig: string): DrillSeed | null {
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

function linearAlgebra(locale: Locale, level: ExamLevel, variant: number, sig: string): DrillSeed | null {
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

function probability(locale: Locale, level: ExamLevel, variant: number, sig: string): DrillSeed | null {
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

function multivariable(locale: Locale, level: ExamLevel, variant: number, sig: string): DrillSeed | null {
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

function derivativeOrIntegral(locale: Locale, level: ExamLevel, variant: number, sig: string): DrillSeed | null {
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

  if (level === "warmup") {
    return buildWarmupDrill(card, locale, technique);
  }

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
    proofPractice(locale, level, variant, sig) ||
    (sig.includes("equivalence relation") && proofEquivalence(locale, level, variant)) ||
    linearAlgebra(locale, level, variant, sig) ||
    linearAlgebraPractice(locale, level, variant, sig) ||
    probability(locale, level, variant, sig) ||
    probabilityPractice(locale, level, variant, sig) ||
    analysisPractice(locale, level, variant, sig) ||
    multivariable(locale, level, variant, sig) ||
    (sig.includes("chain rule") && chainRule(locale, level, variant)) ||
    (sig.includes("integration by parts") && integrationByParts(locale, level, variant)) ||
    derivativeOrIntegral(locale, level, variant, sig) ||
    fallbackDrill(card, locale);

  return {
    level,
    prompt: seed.prompt,
    technique,
    whyFits: seed.whyFits ?? buildWhyFits(card, locale, technique),
    notationHelp: seed.notationHelp ?? buildNotationHelp(card, locale),
    missedBecause: buildMissedBecause(card, locale, technique),
    nextLookFor: buildNextLookFor(card, locale),
    firstStep: seed.firstStep,
    setup: seed.setup,
    fullPath: seed.fullPath,
    answer: seed.answer,
    commonMiss: card.watchOutFor,
    selfCheck: seed.selfCheck,
  };
}

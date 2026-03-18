import type { BubbleCard, CourseContent } from "@/content/schema";

function makeAnalysisCard(
  card: Omit<BubbleCard, "subject" | "course" | "courseCode">,
): BubbleCard {
  return {
    subject: "Mathematics",
    course: "Analysis I",
    courseCode: "MATH 140A",
    ...card,
  };
}

export const analysisOneCourse: CourseContent = {
  id: "analysis-1",
  subject: "Mathematics",
  title: "Analysis I",
  institution: "UCI",
  courseCodes: ["MATH 140A"],
  aliases: ["Real Analysis I"],
  shortDescription:
    "UCI-style proof-based real analysis with sequence, epsilon, and completeness patterns.",
  units: ["Real Number Structure", "Sequences and Limits", "Continuity and Proofs"],
  chapters: [
    "Chapter 1: Real Number Structure",
    "Chapter 2: Sequences and Limits",
    "Chapter 3: Continuity and Core Proofs",
  ],
  cards: [
    makeAnalysisCard({
      id: "analysis140a-supremum",
      chapter: "Chapter 1: Real Number Structure",
      unit: "Real Number Structure",
      topic: "Supremum and infimum",
      name: "Supremum Pattern",
      order: 1,
      useItWhen: "a problem asks for least upper bound or greatest lower bound",
      looksLike: "sup A, inf A, upper bound, lower bound",
      doThis: "prove two parts: it is a bound, and anything smaller fails",
      thinkOfItAs: "top fence with no lower fence above it",
      watchOutFor: "showing it is an upper bound but not the least one",
      rememberThis: "supremum proofs are always two checks",
      quickExample: {
        problem: "How do you prove s = sup A?",
        move: "Show s bounds A from above, then show any smaller number fails.",
      },
      typicalProblemShapes: [
        "A bounded set with a candidate least upper bound",
        "An epsilon-style proof that values get arbitrarily close to sup A",
      ],
      miniDrill: [
        {
          prompt: "What are the two parts of a supremum proof?",
          answer: "Upper-bound check and leastness check.",
        },
        {
          prompt: "What does the leastness check usually look like?",
          answer: "For every epsilon > 0, some point of A is above s - epsilon.",
        },
      ],
      memoryHook: "Bound it, then squeeze from below.",
      tags: ["analysis", "supremum", "math140a"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-sequence-limit",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "Sequence convergence",
      name: "Sequence Convergence Proof",
      order: 2,
      useItWhen: "you need to prove a_n tends to L",
      looksLike: "for every epsilon > 0 there exists N",
      doThis: "start with epsilon, solve |a_n - L| < epsilon, then choose N",
      thinkOfItAs: "turn the target into an N-threshold",
      watchOutFor: "writing the epsilon definition without actually choosing an N",
      rememberThis: "epsilon proof means solve for N",
      quickExample: {
        problem: "How do you prove a_n -> L?",
        move: "Take epsilon > 0 and solve the inequality for n.",
      },
      typicalProblemShapes: [
        "A direct epsilon-N limit proof",
        "A sequence with a simple formula like 1/n or (2n+1)/n",
      ],
      miniDrill: [
        {
          prompt: "What is the core algebra move in an epsilon-N proof?",
          answer: "Rewrite |a_n - L| < epsilon into a condition on n.",
        },
        {
          prompt: "What does N depend on?",
          answer: "Epsilon.",
        },
      ],
      memoryHook: "Given epsilon, solve for N.",
      tags: ["analysis", "sequences", "epsilon"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-monotone-bounded",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "Monotone convergence",
      name: "Monotone + Bounded",
      order: 3,
      useItWhen: "a sequence is monotone and you want convergence fast",
      looksLike: "increasing and bounded above, or decreasing and bounded below",
      doThis: "state monotone plus bounded, then point to monotone convergence",
      thinkOfItAs: "if it moves one way and cannot escape, it must settle",
      watchOutFor: "showing monotone but forgetting the bound",
      rememberThis: "monotone and bounded means convergent",
      quickExample: {
        problem: "What technique fits first for an increasing bounded sequence?",
        move: "Use monotone convergence.",
      },
      typicalProblemShapes: [
        "Recursive sequences shown to increase and stay below a ceiling",
        "A proof asking whether a sequence converges without finding the exact limit yet",
      ],
      miniDrill: [
        {
          prompt: "What second ingredient must monotonicity pair with?",
          answer: "A bound in the right direction.",
        },
        {
          prompt: "Does bounded alone imply convergence?",
          answer: "No.",
        },
      ],
      memoryHook: "One-way motion plus a fence means convergence.",
      tags: ["analysis", "monotone", "bounded"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-cauchy",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "Cauchy sequences",
      name: "Cauchy Sequence Pattern",
      order: 4,
      useItWhen: "you want an internal convergence test without naming the limit first",
      looksLike: "for every epsilon > 0 there exists N so m, n >= N implies |a_n - a_m| < epsilon",
      doThis: "compare late terms to each other instead of guessing the limit",
      thinkOfItAs: "the tail of the sequence bunches together",
      watchOutFor: "trying to prove Cauchy by already assuming the limit exists",
      rememberThis: "Cauchy means late terms get arbitrarily close to each other",
      quickExample: {
        problem: "What is the first move in a Cauchy proof?",
        move: "Start with |a_n - a_m| and make the tail small.",
      },
      typicalProblemShapes: [
        "A completeness proof in R",
        "A sequence where the limit is not obvious but tail differences are manageable",
      ],
      miniDrill: [
        {
          prompt: "What variables appear in a Cauchy definition?",
          answer: "Both m and n.",
        },
        {
          prompt: "What is the mental picture of a Cauchy tail?",
          answer: "The terms bunch together.",
        },
      ],
      memoryHook: "No limit in sight? Compare tail to tail.",
      tags: ["analysis", "cauchy", "completeness"],
      difficulty: "Standard",
    }),
    makeAnalysisCard({
      id: "analysis140a-continuity",
      chapter: "Chapter 3: Continuity and Core Proofs",
      unit: "Continuity and Proofs",
      topic: "Continuity at a point",
      name: "Epsilon-Delta Continuity",
      order: 5,
      useItWhen: "you must prove f is continuous at a point with definitions",
      looksLike: "for every epsilon there exists delta",
      doThis: "start from |f(x) - f(a)| < epsilon and solve backwards for a delta condition",
      thinkOfItAs: "delta controls x so epsilon controls y",
      watchOutFor: "picking delta before seeing what the algebra asks for",
      rememberThis: "continuity proof means build delta from epsilon",
      quickExample: {
        problem: "How do you start a continuity proof at a?",
        move: "Write |f(x) - f(a)| < epsilon and work backward.",
      },
      typicalProblemShapes: [
        "A direct definition proof for polynomials or simple rational functions",
        "A pointwise continuity proof where you need an explicit delta",
      ],
      miniDrill: [
        {
          prompt: "What inequality do you solve backward from?",
          answer: "|f(x) - f(a)| < epsilon.",
        },
        {
          prompt: "What is the point of delta?",
          answer: "It controls how close x must stay to a.",
        },
      ],
      memoryHook: "Epsilon asks. Delta answers.",
      tags: ["analysis", "continuity", "epsilon-delta"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-contradiction",
      chapter: "Chapter 3: Continuity and Core Proofs",
      unit: "Continuity and Proofs",
      topic: "Contradiction in analysis",
      name: "Contradiction Pattern in Analysis",
      order: 6,
      useItWhen: "a direct epsilon proof gets ugly and the negation has a cleaner shape",
      looksLike: "assume not, build a bad sequence, force a clash",
      doThis: "negate the target carefully, then manufacture the object that breaks it",
      thinkOfItAs: "analysis contradiction often means build the failure sequence",
      watchOutFor: "using contradiction without writing the correct negation first",
      rememberThis: "the wrong negation ruins the whole proof",
      quickExample: {
        problem: "What often gets built in an analysis contradiction proof?",
        move: "A sequence that witnesses failure over and over.",
      },
      typicalProblemShapes: [
        "Proofs about boundedness, continuity, or uniqueness",
        "Statements where failure naturally produces a bad sequence",
      ],
      miniDrill: [
        {
          prompt: "What should come before the contradiction construction?",
          answer: "The exact negation of the statement.",
        },
        {
          prompt: "What is a very common contradiction gadget in analysis?",
          answer: "A bad sequence.",
        },
      ],
      memoryHook: "Negate cleanly, then build the failure.",
      tags: ["analysis", "contradiction", "proofs"],
      difficulty: "Standard",
    }),
    makeAnalysisCard({
      id: "analysis140a-bolzano-weierstrass",
      chapter: "Chapter 3: Continuity and Core Proofs",
      unit: "Continuity and Proofs",
      topic: "Bolzano-Weierstrass",
      name: "Bounded Sequence -> Convergent Subsequence",
      order: 7,
      useItWhen: "a bounded sequence appears and you need some convergence, not full convergence",
      looksLike: "bounded sequence, extract a subsequence",
      doThis: "stop trying to prove the whole sequence converges and extract a convergent subsequence instead",
      thinkOfItAs: "even messy bounded data has a calm strand hidden inside",
      watchOutFor: "mistaking subsequence convergence for full sequence convergence",
      rememberThis: "bounded sequence guarantees a good subsequence, not always the whole sequence",
      quickExample: {
        problem: "What technique fits first when a bounded sequence refuses to converge?",
        move: "Use Bolzano-Weierstrass to extract a convergent subsequence.",
      },
      typicalProblemShapes: [
        "A bounded sequence with oscillation",
        "Compactness-style arguments in early analysis",
      ],
      miniDrill: [
        {
          prompt: "What does boundedness buy you here?",
          answer: "A convergent subsequence.",
        },
        {
          prompt: "Does it force the full sequence to converge?",
          answer: "No.",
        },
      ],
      memoryHook: "Bounded chaos still hides a convergent thread.",
      tags: ["analysis", "subsequences", "compactness"],
      difficulty: "Standard",
    }),
  ],
};

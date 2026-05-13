import type { BubbleCard, CourseContent } from "@/content/schema";

function makeAnalysisCard(
  card: Omit<BubbleCard, "subject" | "course" | "courseCode">,
): BubbleCard {
  return {
    subject: "Mathematics",
    course: "Elementary Analysis I",
    courseCode: "MATH 140A",
    ...card,
  };
}

export const analysisOneCourse: CourseContent = {
  id: "analysis-1",
  subject: "Mathematics",
  title: "Elementary Analysis I",
  institution: "UCI",
  courseCodes: ["MATH 140A"],
  aliases: ["Analysis I", "Real Analysis I"],
  shortDescription:
    "Ross-style elementary analysis for MATH 140A, centered on completeness, sequences, continuity, series, and uniform convergence.",
  units: [
    "Foundations of the Real Numbers",
    "Sequences and Limits",
    "Series",
    "Continuity and Function Limits",
    "Uniform Convergence",
  ],
  chapters: [
    "Chapter 1: Foundations of the Real Numbers",
    "Chapter 2: Sequences and Limits",
    "Chapter 3: Series",
    "Chapter 4: Continuity and Function Limits",
    "Chapter 5: Uniform Convergence",
  ],
  cards: [
    makeAnalysisCard({
      id: "analysis140a-induction",
      chapter: "Chapter 1: Foundations of the Real Numbers",
      unit: "Foundations of the Real Numbers",
      topic: "Induction",
      name: "Induction Setup",
      order: 1,
      useItWhen: "the statement depends on n and must hold for every natural number",
      whatItMeans:
        "Induction proves the first case, then proves the next case from the current one.",
      looksLike: "for all n in N, recursive formulas, sums, inequalities",
      doThis: "start at n = 1, check the base case, assume n, then push it to n+1",
      thinkOfItAs: "prove one domino falls, then show the fall keeps going",
      watchOutFor: "using the statement for n+1 before you prove it",
      rememberThis: "base case first, step second",
      quickExample: {
        problem: "How do you prove a statement for every n in N?",
        move: "Do the base case, then prove n implies n+1.",
      },
      typicalProblemShapes: [
        "Sums or inequalities indexed by n",
        "A recursively defined sequence with a property to prove for all n",
      ],
      miniDrill: [
        {
          prompt: "What are the two required parts of induction?",
          answer: "Base case and inductive step.",
        },
        {
          prompt: "What does the inductive step usually start with?",
          answer: "Assume the statement holds for n.",
        },
      ],
      memoryHook: "Base case first, step second.",
      tags: ["analysis", "induction", "math140a"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-rational-irrational",
      chapter: "Chapter 1: Foundations of the Real Numbers",
      unit: "Foundations of the Real Numbers",
      topic: "Rationals and irrationals",
      name: "Rational vs Irrational Proof",
      order: 2,
      useItWhen: "you must show a number is not rational or compare Q and R",
      looksLike: "assume x = p/q, gcd(p,q)=1, parity or divisibility clash",
      doThis: "write the number as p/q in lowest terms, then look for a parity or divisibility clash",
      thinkOfItAs: "turn the fraction into a contradiction trap",
      watchOutFor: "forgetting to start with lowest terms",
      rememberThis: "lowest terms first, then force the clash",
      quickExample: {
        problem: "How do you prove sqrt(2) is irrational?",
        move: "Assume sqrt(2)=p/q in lowest terms and force both p and q even.",
      },
      typicalProblemShapes: [
        "Classic irrationality proofs like sqrt(2)",
        "Proofs that a set contains irrational numbers between rationals",
      ],
      miniDrill: [
        {
          prompt: "Why do you say p/q is in lowest terms first?",
          answer: "So getting both even gives a contradiction.",
        },
        {
          prompt: "What proof method usually drives irrationality proofs?",
          answer: "Contradiction.",
        },
      ],
      memoryHook: "Lowest terms first, then break it.",
      tags: ["analysis", "irrational", "contradiction"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-supremum",
      chapter: "Chapter 1: Foundations of the Real Numbers",
      unit: "Foundations of the Real Numbers",
      topic: "Supremum and infimum",
      name: "Supremum Pattern",
      order: 3,
      useItWhen: "a problem asks for least upper bound or greatest lower bound",
      whatItMeans:
        "The supremum of a set is the smallest number that still lies above every point in the set. It can sit outside the set; it just has to be the tightest top bound.",
      looksLike: "sup A, inf A, upper bound, lower bound",
      doThis: "show s bounds the set from above, then show any smaller number fails to be a bound",
      whyThisMove:
        "That proof pattern is just the definition unpacked. 'Supremum' means 'least upper bound', so you must prove both pieces: upper bound first, then leastness.",
      thinkOfItAs: "build the top fence, then prove it cannot move down",
      watchOutFor: "stopping after the upper-bound check",
      rememberThis: "bound it first, then squeeze it from below",
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
      memoryHook: "Upper bound first, then leastness.",
      tags: ["analysis", "supremum", "math140a"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-completeness",
      chapter: "Chapter 1: Foundations of the Real Numbers",
      unit: "Foundations of the Real Numbers",
      topic: "Completeness axiom",
      name: "Completeness Trigger",
      order: 4,
      useItWhen: "a nonempty set is bounded above and the proof needs a least upper bound",
      whatItMeans:
        "Completeness says the real numbers do not have missing least-upper-bound holes. If a set is nonempty and bounded above, its supremum exists in R.",
      looksLike: "nonempty set, bounded above, sup A exists",
      doThis: "check nonempty and bounded above, then invoke completeness to get a supremum",
      whyThisMove:
        "You use completeness when the hard part is existence. Once the set satisfies the two hypotheses, completeness gives you a supremum to work with for the rest of the proof.",
      thinkOfItAs: "R fills every least-upper-bound gap",
      watchOutFor: "calling completeness before you verify both hypotheses",
      rememberThis: "nonempty and bounded above -> sup exists",
      quickExample: {
        problem: "When can you invoke completeness in R?",
        move: "When the set is nonempty and bounded above.",
      },
      typicalProblemShapes: [
        "A set built from all lower or upper candidates",
        "Proofs that define s = sup A and then work from that choice",
      ],
      miniDrill: [
        {
          prompt: "What are the two trigger hypotheses for completeness?",
          answer: "Nonempty and bounded above.",
        },
        {
          prompt: "What object does completeness hand you?",
          answer: "A least upper bound.",
        },
      ],
      memoryHook: "Check the hypotheses, then claim the sup.",
      tags: ["analysis", "completeness", "supremum"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-nested-intervals",
      chapter: "Chapter 1: Foundations of the Real Numbers",
      unit: "Foundations of the Real Numbers",
      topic: "Nested interval property",
      name: "Nested Intervals",
      order: 5,
      useItWhen: "closed intervals keep shrinking inside each other",
      looksLike: "[a1, b1] contains [a2, b2] contains [a3, b3]",
      doThis: "check the intervals are closed and nested, then use completeness to trap a common point",
      thinkOfItAs: "keep shrinking the hallway until one point remains trapped",
      watchOutFor: "assuming the intersection is a whole interval when the lengths go to zero",
      rememberThis: "closed nested intervals share a point",
      quickExample: {
        problem: "What does the nested interval property guarantee?",
        move: "At least one common point in all the intervals.",
      },
      typicalProblemShapes: [
        "A sequence of shrinking closed intervals",
        "Completeness arguments that trap a number by upper and lower bounds",
      ],
      miniDrill: [
        {
          prompt: "What kind of intervals does this property want?",
          answer: "Closed intervals nested inside each other.",
        },
        {
          prompt: "What extra fact gives a unique point instead of just a nonempty intersection?",
          answer: "The lengths go to zero.",
        },
      ],
      memoryHook: "Closed and nested means a point survives.",
      tags: ["analysis", "nested-intervals", "completeness"],
      difficulty: "Standard",
    }),
    makeAnalysisCard({
      id: "analysis140a-sequence-limit",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "Sequence convergence",
      name: "Sequence Convergence Proof",
      order: 6,
      useItWhen: "the question says prove a_n -> L",
      whatItMeans: "Finite sequence limits use epsilon-N: make the tail stay inside any epsilon band.",
      looksLike: "for every epsilon > 0 there exists N",
      doThis: "start with epsilon > 0, turn |a_n - L| < epsilon into a condition on n, then choose N",
      whyThisMove:
        "The definition tells you exactly what to prove: for each epsilon, find an N so the tail stays inside the epsilon band.",
      thinkOfItAs: "given epsilon, build the tail cutoff",
      watchOutFor: "writing the epsilon statement without actually solving for N",
      rememberThis: "finite sequence limit = epsilon-N, solve for N",
      quickExample: {
        problem: "How do you prove a_n -> L?",
        move: "Pick epsilon > 0, solve for n, and then state the N that works.",
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
      memoryHook: "Finite target means epsilon first, N second.",
      tags: ["analysis", "sequences", "epsilon"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-limit-laws",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "Limit laws for sequences",
      name: "Sequence Limit Laws",
      order: 7,
      useItWhen:
        "the sequence breaks into smaller pieces whose limits you already know",
      whatItMeans:
        "Limit laws let you compute the limit piece by piece instead of from scratch.",
      looksLike: "a_n + b_n, a_n b_n, a_n / b_n",
      doThis:
        "split the expression into pieces with known limits, then apply the law that matches the operation",
      thinkOfItAs: "handle each piece first, then combine the answers",
      watchOutFor: "using the quotient law when the denominator limit is zero",
      rememberThis: "split first, then combine by law",
      quickExample: {
        problem: "How do you handle (2n+1)/n in analysis style?",
        move: "Split it into 2 + 1/n and use limit laws.",
      },
      typicalProblemShapes: [
        "A rational expression in n that can be split into simple pieces",
        "A proof that builds from already-known sequence limits",
      ],
      miniDrill: [
        {
          prompt: "What should you check before using the quotient law?",
          answer: "The denominator limit is not zero.",
        },
        {
          prompt: "What solve structure helps on a messy algebraic sequence?",
          answer: "Break it into simpler convergent pieces.",
        },
      ],
      memoryHook: "Split the pieces, then combine.",
      tags: ["analysis", "limits", "sequence-laws"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-infinite-sequence-limits",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "Limits to infinity",
      name: "Sequence to Infinity",
      order: 8,
      useItWhen: "the question says a_n -> infinity or a_n -> -infinity",
      whatItMeans: "Infinite sequence limits use M: beat every bound instead of squeezing into an epsilon band.",
      looksLike: "a_n -> infinity, a_n -> -infinity",
      doThis: "start with M, then solve a_n > M or a_n < -M for an N that works",
      thinkOfItAs: "every bound gets beaten eventually",
      watchOutFor: "using epsilon-N language when the limit is infinite",
      rememberThis: "infinite sequence limit = M, then N",
      quickExample: {
        problem: "How do you prove a_n -> infinity?",
        move: "Given M, solve a_n > M for n and name the N that works.",
      },
      typicalProblemShapes: [
        "Polynomial or recursive sequences that keep growing",
        "A proof that the tail eventually passes every target height",
      ],
      miniDrill: [
        {
          prompt: "What variable replaces epsilon here?",
          answer: "M.",
        },
        {
          prompt: "What inequality do you solve in an infinity proof?",
          answer: "a_n > M, or a_n < M for negative infinity.",
        },
      ],
      memoryHook: "Infinite target means M first, N second.",
      tags: ["analysis", "infinity", "sequences"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-monotone-bounded",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "Monotone convergence",
      name: "Monotone + Bounded",
      order: 9,
      useItWhen: "the question asks whether a one-way sequence converges",
      whatItMeans:
        "Monotone means the sequence only moves one way. Bounded means it cannot escape forever in that direction.",
      looksLike: "increasing and bounded above, or decreasing and bounded below",
      doThis:
        "prove the right monotonicity, prove the matching bound, then invoke monotone convergence",
      whyThisMove:
        "Once you know the sequence cannot turn around and cannot escape, the limit has to exist.",
      thinkOfItAs: "one-way motion trapped by a fence must settle",
      watchOutFor: "proving monotone without a bound",
      rememberThis: "one-way + bound = convergence",
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
      memoryHook: "Monotone plus bounded means settle.",
      tags: ["analysis", "monotone", "bounded"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-cauchy",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "Cauchy sequences",
      name: "Cauchy Sequence Pattern",
      order: 10,
      useItWhen: "the question says prove the sequence is Cauchy",
      whatItMeans:
        "A Cauchy sequence means the tail terms get arbitrarily close to each other, even before you know what the limit is.",
      looksLike:
        "for every epsilon > 0 there exists N so m, n >= N implies |a_n - a_m| < epsilon",
      doThis: "write |a_n - a_m| < epsilon, then make the tail small for all m, n >= N",
      whyThisMove:
        "That is the definition. A Cauchy proof has to control tail-to-tail distance |a_n-a_m| directly, because the whole point is to avoid assuming the limit first.",
      thinkOfItAs: "the tail bunches together before you name the limit",
      watchOutFor: "trying to prove Cauchy by already assuming the limit exists",
      rememberThis: "Cauchy means compare two late terms directly",
      quickExample: {
        problem: "What solve structure starts a Cauchy proof?",
        move: "Start with |a_n - a_m| and force it below epsilon.",
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
      memoryHook: "No limit needed yet, just tail-to-tail control.",
      tags: ["analysis", "cauchy", "completeness"],
      difficulty: "Standard",
    }),
    makeAnalysisCard({
      id: "analysis140a-bolzano-weierstrass",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "Bolzano-Weierstrass",
      name: "Bounded Sequence -> Convergent Subsequence",
      order: 11,
      useItWhen:
        "a bounded sequence keeps wobbling and you only need a convergent subsequence",
      whatItMeans:
        "Every bounded sequence in R has at least one convergent subsequence.",
      looksLike: "bounded sequence, extract a subsequence",
      doThis:
        "bisect the bounded interval and keep the half containing infinitely many terms, then extract the convergent subsequence",
      thinkOfItAs: "pull one calm strand out of bounded chaos",
      watchOutFor: "mistaking subsequence convergence for full sequence convergence",
      rememberThis:
        "bounded sequence guarantees a good subsequence, not always the whole sequence",
      quickExample: {
        problem:
          "What technique fits first when a bounded sequence refuses to converge?",
        move: "Keep bisecting the interval until a subsequence is trapped.",
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
      memoryHook: "Bounded wobble still gives one convergent subsequence.",
      tags: ["analysis", "subsequences", "compactness"],
      difficulty: "Standard",
    }),
    makeAnalysisCard({
      id: "analysis140a-subsequence-test",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "Subsequence test for divergence",
      name: "Subsequence Test",
      order: 12,
      useItWhen: "you want to prove a sequence does not converge",
      looksLike: "two subsequences head to different limits",
      whatItMeans:
        "If two subsequences have different limits, the original sequence cannot converge.",
      doThis:
        "split into two easy subsequences, usually even and odd, and show they limit to different values",
      thinkOfItAs: "if two tails disagree, the full sequence cannot settle",
      watchOutFor:
        "using two random subsequences that do not actually approach different limits",
      rememberThis: "different subsequence limits kill convergence",
      quickExample: {
        problem: "How do you quickly prove (-1)^n does not converge?",
        move: "Use even and odd subsequences.",
      },
      typicalProblemShapes: [
        "Oscillating sequences",
        "A divergence proof where the full sequence keeps switching behavior",
      ],
      miniDrill: [
        {
          prompt: "What is the fastest divergence pattern here?",
          answer: "Two subsequences with different limits.",
        },
        {
          prompt: "What famous sequence is the classic example?",
          answer: "(-1)^n.",
        },
      ],
      memoryHook: "Even tail, odd tail, different limits.",
      tags: ["analysis", "subsequences", "divergence"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-limsup-liminf",
      chapter: "Chapter 2: Sequences and Limits",
      unit: "Sequences and Limits",
      topic: "limsup and liminf",
      name: "limsup / liminf Pattern",
      order: 13,
      useItWhen:
        "a sequence oscillates and the question asks for long-run ceiling or floor",
      whatItMeans:
        "limsup is the tail's eventual ceiling; liminf is the tail's eventual floor.",
      looksLike: "limsup a_n, liminf a_n, tail suprema, tail infima",
      doThis:
        "form the tail sets A_n = {a_k : k >= n}, take sup A_n and inf A_n, and if the question is concrete, split into even and odd subsequences first",
      thinkOfItAs: "limsup tracks the upper tail ceiling; liminf tracks the lower tail floor",
      watchOutFor: "mixing up one-time spikes with values that keep returning in the tail",
      rememberThis: "limsup and liminf are tail behaviors, not first-term behavior",
      quickExample: {
        problem: "What do limsup and liminf measure?",
        move: "The highest and lowest long-run tail values from the tail sets.",
      },
      typicalProblemShapes: [
        "Oscillating sequences with several cluster values",
        "A problem asking for long-run upper and lower limits instead of one limit",
      ],
      miniDrill: [
        {
          prompt: "What does limsup watch?",
          answer: "The top value the tail keeps getting near.",
        },
        {
          prompt: "What happens if limsup equals liminf?",
          answer: "The sequence converges to that common value.",
        },
      ],
      memoryHook: "Tail ceiling and tail floor.",
      tags: ["analysis", "limsup", "liminf"],
      difficulty: "Stretch",
    }),
    makeAnalysisCard({
      id: "analysis140a-series",
      chapter: "Chapter 3: Series",
      unit: "Series",
      topic: "Series as partial sums",
      name: "Series First Move",
      order: 14,
      useItWhen: "you see an infinite sum and need the base solve structure",
      looksLike: "sum a_n, partial sums s_n, geometric series, p-series",
      doThis: "define the partial sums s_n immediately and check whether s_n converges",
      thinkOfItAs: "a series is a sequence of running totals",
      watchOutFor: "treating sum a_n like one algebraic object instead of a limit of partial sums",
      rememberThis: "series = partial sums first",
      quickExample: {
        problem: "What solve structure starts an infinite series problem?",
        move: "Think about the sequence of partial sums.",
      },
      typicalProblemShapes: [
        "A convergence question for sum a_n",
        "A geometric or p-series recognition problem",
      ],
      miniDrill: [
        {
          prompt: "What sequence belongs to a series?",
          answer: "Its partial sums.",
        },
        {
          prompt: "What is the fastest easy pattern to recognize in series?",
          answer: "Geometric and p-series.",
        },
      ],
      memoryHook: "Partial sums first.",
      tags: ["analysis", "series", "partial-sums"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-series-tests",
      chapter: "Chapter 3: Series",
      unit: "Series",
      topic: "Series convergence tests",
      name: "Series Test Match",
      order: 15,
      useItWhen:
        "the series is not obviously geometric or telescoping and you need the next test",
      whatItMeans:
        "The sign pattern and growth rate usually tell you which test to try first.",
      looksLike: "positive terms, alternating signs, nth roots, ratio shape, comparison shape",
      doThis:
        "if terms are positive, try comparison, ratio, root, or integral; if they alternate, try the alternating-series test; if they telescope, rewrite and cancel",
      thinkOfItAs: "use a small decision tree instead of guessing",
      watchOutFor: "jumping to a fancy test before checking the basic pattern",
      rememberThis: "shape first, test second",
      quickExample: {
        problem: "What solve structure starts a positive-term series?",
        move: "Ask whether comparison, ratio, root, or integral fits the shape.",
      },
      typicalProblemShapes: [
        "A positive-term series with polynomial or exponential pieces",
        "An alternating series where you need monotone decrease and term-to-zero",
      ],
      miniDrill: [
        {
          prompt: "What test often fits n-th powers or factorial/exponential shapes?",
          answer: "Root or ratio style tests.",
        },
        {
          prompt: "What must you check on an alternating series right away?",
          answer: "Terms decrease in size and go to zero.",
        },
      ],
      memoryHook: "Shape first, test second.",
      tags: ["analysis", "series", "tests"],
      difficulty: "Standard",
    }),
    makeAnalysisCard({
      id: "analysis140a-continuity",
      chapter: "Chapter 4: Continuity and Function Limits",
      unit: "Continuity and Function Limits",
      topic: "Continuity at a point",
      name: "Epsilon-Delta Continuity",
      order: 16,
      useItWhen: "the problem says prove continuity at a point",
      looksLike: "for every epsilon there exists delta",
      doThis:
        "start with |f(x) - f(a)| < epsilon, factor or estimate it, and solve backward for delta",
      thinkOfItAs: "epsilon sets the output target and delta restricts the input",
      watchOutFor: "choosing delta before you see the algebra",
      rememberThis: "continuity proof = solve backward for delta",
      quickExample: {
        problem: "How do you start a continuity proof at a?",
        move: "Write |f(x) - f(a)| < epsilon and work backward for delta.",
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
      memoryHook: "Epsilon first, delta second.",
      tags: ["analysis", "continuity", "epsilon-delta"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-sequential-continuity",
      chapter: "Chapter 4: Continuity and Function Limits",
      unit: "Continuity and Function Limits",
      topic: "Sequential continuity",
      name: "Sequential Continuity Test",
      order: 17,
      useItWhen: "you can test continuity by sending sequences into the point",
      looksLike: "x_n -> a implies f(x_n) -> f(a)",
      whatItMeans:
        "Continuity at a means every sequence that lands on a stays aligned after applying f.",
      doThis: "take an arbitrary sequence x_n -> a and push it through f",
      thinkOfItAs: "continuity means the limit survives the function",
      watchOutFor: "using a special sequence when the proof needs an arbitrary one",
      rememberThis: "x_n -> a should force f(x_n) -> f(a)",
      quickExample: {
        problem: "What is the sequence version of continuity at a?",
        move: "Take any x_n -> a and show f(x_n) -> f(a).",
      },
      typicalProblemShapes: [
        "A proof that continuity follows from a sequence criterion",
        "A discontinuity proof using one bad sequence",
      ],
      miniDrill: [
        {
          prompt: "What kind of sequence starts the proof?",
          answer: "An arbitrary sequence converging to a.",
        },
        {
          prompt: "What does one bad sequence prove?",
          answer: "Discontinuity.",
        },
      ],
      memoryHook: "Any convergent sequence goes through.",
      tags: ["analysis", "sequential-continuity", "continuity"],
      difficulty: "Standard",
    }),
    makeAnalysisCard({
      id: "analysis140a-ivt",
      chapter: "Chapter 4: Continuity and Function Limits",
      unit: "Continuity and Function Limits",
      topic: "Intermediate Value Theorem",
      name: "IVT Recognition",
      order: 18,
      useItWhen: "a continuous function changes sign on an interval",
      looksLike: "f(a) < 0 < f(b) or values on both sides of a target",
      doThis: "check continuity on the interval first, then trap the missing value with IVT",
      thinkOfItAs: "a continuous graph cannot jump over the value you need",
      watchOutFor: "using IVT without continuity on the full interval",
      rememberThis: "continuous crossing means the middle value is hit",
      quickExample: {
        problem:
          "f(a) is negative and f(b) is positive. What theorem should you test first?",
        move: "The Intermediate Value Theorem.",
      },
      typicalProblemShapes: [
        "Existence of a root from opposite signs",
        "A value-between-two-values question for a continuous function",
      ],
      miniDrill: [
        {
          prompt: "What is the must-have hypothesis for IVT?",
          answer: "Continuity on the interval.",
        },
        {
          prompt: "What does opposite sign usually buy you?",
          answer: "A root somewhere in between.",
        },
      ],
      memoryHook: "Sign change plus continuity gives a hit.",
      tags: ["analysis", "ivt", "continuity"],
      difficulty: "Starter",
    }),
    makeAnalysisCard({
      id: "analysis140a-uniform-continuity",
      chapter: "Chapter 4: Continuity and Function Limits",
      unit: "Continuity and Function Limits",
      topic: "Uniform continuity",
      name: "Uniform Continuity Trigger",
      order: 19,
      useItWhen: "one delta must work for every point in the domain",
      looksLike: "same delta for all x and y, continuous on [a,b]",
      doThis:
        "look for one global delta, and on [a,b] be ready to invoke Heine-Cantor",
      thinkOfItAs: "one delta covers the whole set",
      watchOutFor: "hiding point dependence inside delta",
      rememberThis: "uniform = one delta for everyone",
      quickExample: {
        problem: "How is uniform continuity different from ordinary continuity?",
        move: "The delta cannot depend on the point.",
      },
      typicalProblemShapes: [
        "A proof that continuity on [a,b] is stronger than pointwise continuity",
        "A question asking whether Cauchy inputs stay Cauchy after applying f",
      ],
      miniDrill: [
        {
          prompt: "What changes in the delta condition here?",
          answer: "Delta works for all points at once.",
        },
        {
          prompt: "What theorem often solves this on a closed interval?",
          answer: "Heine-Cantor.",
        },
      ],
      memoryHook: "One delta for all points.",
      tags: ["analysis", "uniform-continuity", "heine-cantor"],
      difficulty: "Standard",
    }),
    makeAnalysisCard({
      id: "analysis140a-function-limits",
      chapter: "Chapter 4: Continuity and Function Limits",
      unit: "Continuity and Function Limits",
      topic: "Limits of functions",
      name: "Function Limit Proof",
      order: 20,
      useItWhen: "you see lim f(x) = L or lim f(x) = infinity and need the definition proof",
      whatItMeans:
        "Finite targets use epsilon-delta. Infinite targets use M and force the output past every bound.",
      looksLike: "lim x->a f(x) = L, epsilon-delta, or lim x->a f(x) = infinity",
      doThis:
        "check finite versus infinite first, then either bound |f(x)-L| with epsilon or force f(x) past M and solve backward for delta",
      thinkOfItAs: "finite limits ask for closeness, infinite limits ask for escape",
      watchOutFor: "using epsilon-delta language when the target is infinite",
      rememberThis: "finite uses epsilon, infinite uses M",
      quickExample: {
        problem: "What is the first check in a limit proof?",
        move: "Decide whether the target is finite or infinite, then choose epsilon or M.",
      },
      typicalProblemShapes: [
        "A finite limit proof with epsilon-delta",
        "An infinite limit proof where the output must exceed every bound",
      ],
      miniDrill: [
        {
          prompt: "What proof language belongs to a finite target?",
          answer: "Epsilon-delta.",
        },
        {
          prompt: "What proof language belongs to an infinite target?",
          answer: "M and a bound-passing inequality.",
        },
      ],
      memoryHook: "Finite is epsilon; infinite is M.",
      tags: ["analysis", "function-limits", "continuity"],
      difficulty: "Standard",
    }),
    makeAnalysisCard({
      id: "analysis140a-contradiction",
      chapter: "Chapter 4: Continuity and Function Limits",
      unit: "Continuity and Function Limits",
      topic: "Contradiction in analysis",
      name: "Contradiction Pattern in Analysis",
      order: 21,
      useItWhen: "the negation is easier to work with than the statement itself",
      whatItMeans:
        "You prove the statement by assuming the opposite and forcing an impossible outcome.",
      looksLike: "assume not, build a bad sequence, force a clash",
      doThis: "write the negation first, then build the sequence or estimate that breaks it",
      thinkOfItAs: "negate, then force the failure",
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
      memoryHook: "Negation first, clash second.",
      tags: ["analysis", "contradiction", "proofs"],
      difficulty: "Standard",
    }),
    makeAnalysisCard({
      id: "analysis140a-uniform-convergence",
      chapter: "Chapter 5: Uniform Convergence",
      unit: "Uniform Convergence",
      topic: "Uniform convergence",
      name: "Uniform Convergence Check",
      order: 22,
      useItWhen:
        "a sequence or series of functions converges and you must know whether it is uniform",
      whatItMeans:
        "Uniform convergence means one N works for the whole graph, not a different N for each x.",
      looksLike: "sup |f_n - f|, uniform in x, exchange limit and continuity questions",
      doThis:
        "look for one N that works for every x, usually by bounding sup |f_n - f|",
      thinkOfItAs: "the whole graph settles together",
      watchOutFor: "proving pointwise convergence and calling it uniform",
      rememberThis: "uniform = one N for the whole graph",
      quickExample: {
        problem: "What is the first clue that convergence should be uniform?",
        move: "Look for one bound that controls all x at the same time.",
      },
      typicalProblemShapes: [
        "A sequence of functions with an x-independent bound",
        "A problem asking whether continuity survives taking the limit",
      ],
      miniDrill: [
        {
          prompt: "What is the key phrase in the definition of uniform convergence?",
          answer: "For all x, with one N working for all of them.",
        },
        {
          prompt: "What common mistake do students make here?",
          answer: "Confusing pointwise convergence with uniform convergence.",
        },
      ],
      memoryHook: "One N controls every x.",
      tags: ["analysis", "uniform-convergence", "functions"],
      difficulty: "Stretch",
    }),
  ],
};

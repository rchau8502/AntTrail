import type { BubbleCard, CourseContent } from "@/content/schema";

function makeLAOneCard(
  card: Omit<BubbleCard, "subject" | "course" | "courseCode">,
): BubbleCard {
  return {
    subject: "Mathematics",
    course: "Linear Algebra I",
    courseCode: "MATH 121A",
    ...card,
  };
}

export const linearAlgebraOneCourse: CourseContent = {
  id: "linear-algebra-1",
  subject: "Mathematics",
  title: "Linear Algebra I",
  institution: "UCI",
  courseCodes: ["MATH 121A"],
  aliases: ["Proof-Based Linear Algebra"],
  shortDescription:
    "Proof-first vector spaces, span, bases, and linear maps aligned to UCI 121A.",
  units: ["Vector Spaces", "Basis and Dimension", "Linear Maps"],
  chapters: [
    "Chapter 1: Vector Spaces",
    "Chapter 2: Basis and Dimension",
    "Chapter 3: Linear Maps",
  ],
  cards: [
    makeLAOneCard({
      id: "la121a-subspace-test",
      chapter: "Chapter 1: Vector Spaces",
      unit: "Vector Spaces",
      topic: "Subspace test",
      name: "Subspace Test",
      order: 1,
      useItWhen: "you need to prove a set is a subspace",
      looksLike: "W subset V and prove W is a subspace",
      doThis: "check zero vector, addition, and scalar multiplication",
      thinkOfItAs: "three locks before the set counts as a space inside the space",
      watchOutFor: "checking only closure under addition and forgetting scalar closure",
      rememberThis: "subspace = zero, add, scale",
      quickExample: {
        problem: "What technique fits first when a problem asks whether W is a subspace?",
        move: "Run the three-part subspace test.",
      },
      typicalProblemShapes: [
        "A subset described by equations like x + y + z = 0",
        "A set of functions or polynomials claimed to be a subspace",
      ],
      miniDrill: [
        {
          prompt: "What vector must always be in a subspace?",
          answer: "The zero vector.",
        },
        {
          prompt: "What easy closure check gets skipped a lot?",
          answer: "Scalar multiplication.",
        },
      ],
      memoryHook: "Zero, add, scale.",
      tags: ["linear-algebra", "subspace", "math121a"],
      difficulty: "Starter",
    }),
    makeLAOneCard({
      id: "la121a-span",
      chapter: "Chapter 1: Vector Spaces",
      unit: "Vector Spaces",
      topic: "Span",
      name: "Span Pattern",
      order: 2,
      useItWhen: "you are asking what vectors can be built from a list",
      looksLike: "span(v1, v2, ...), linear combination",
      doThis: "write a general linear combination and match coefficients",
      thinkOfItAs: "all reachable points from the given building blocks",
      watchOutFor: "plugging one example instead of writing the full general combination",
      rememberThis: "span means all linear combinations",
      quickExample: {
        problem: "How do you show b is in span(v1, v2)?",
        move: "Set b = a1 v1 + a2 v2 and solve for the coefficients.",
      },
      typicalProblemShapes: [
        "A membership question in span(v1, ..., vn)",
        "A geometric line or plane described through linear combinations",
      ],
      miniDrill: [
        {
          prompt: "What phrase should immediately trigger span?",
          answer: "Linear combination.",
        },
        {
          prompt: "How do you test whether b is not in the span?",
          answer: "Set up the coefficient system and show it has no solution.",
        },
      ],
      memoryHook: "Span = everything you can build linearly.",
      tags: ["linear-algebra", "span", "linear-combination"],
      difficulty: "Starter",
    }),
    makeLAOneCard({
      id: "la121a-independence",
      chapter: "Chapter 2: Basis and Dimension",
      unit: "Basis and Dimension",
      topic: "Linear independence",
      name: "Linear Independence Check",
      order: 3,
      useItWhen: "you need to show a list has no hidden redundancy",
      looksLike: "c1v1 + ... + cnvn = 0",
      doThis: "set the combination equal to zero and force all coefficients to zero",
      thinkOfItAs: "no vector in the list can be rebuilt from the others",
      watchOutFor: "testing one convenient combination instead of the general one",
      rememberThis: "independent means only the trivial zero combo works",
      quickExample: {
        problem: "What setup proves vectors are linearly independent?",
        move: "Start from c1v1 + ... + cnvn = 0.",
      },
      typicalProblemShapes: [
        "A proof that a list of vectors or functions is independent",
        "A basis check where independence is one half of the job",
      ],
      miniDrill: [
        {
          prompt: "What coefficients should survive in an independent set?",
          answer: "Only all zeros.",
        },
        {
          prompt: "What does one nontrivial zero combination prove?",
          answer: "Dependence.",
        },
      ],
      memoryHook: "Zero combo only.",
      tags: ["linear-algebra", "independence", "basis"],
      difficulty: "Starter",
    }),
    makeLAOneCard({
      id: "la121a-basis",
      chapter: "Chapter 2: Basis and Dimension",
      unit: "Basis and Dimension",
      topic: "Basis",
      name: "Basis Check",
      order: 4,
      useItWhen: "a list is supposed to be the right building set for a space",
      looksLike: "prove S is a basis for V",
      doThis: "prove independence and spanning separately",
      thinkOfItAs: "not too small, not too redundant",
      watchOutFor: "showing only one half and calling it a basis",
      rememberThis: "basis = spans + independent",
      quickExample: {
        problem: "What are the two checks for a basis?",
        move: "Show the set spans the space and is linearly independent.",
      },
      typicalProblemShapes: [
        "A candidate basis for P_n, R^n, or a subspace",
        "A proof asking whether a set is a basis or just spanning",
      ],
      miniDrill: [
        {
          prompt: "If a set spans but is dependent, is it a basis?",
          answer: "No.",
        },
        {
          prompt: "If a set is independent but does not span, is it a basis?",
          answer: "No.",
        },
      ],
      memoryHook: "Basis = enough, but not too much.",
      tags: ["linear-algebra", "basis", "dimension"],
      difficulty: "Starter",
    }),
    makeLAOneCard({
      id: "la121a-dimension",
      chapter: "Chapter 2: Basis and Dimension",
      unit: "Basis and Dimension",
      topic: "Dimension",
      name: "Dimension Count",
      order: 5,
      useItWhen: "you want the size of a basis or to compare spaces",
      looksLike: "dim V, dim W, basis with n vectors",
      doThis: "find a basis and count its vectors",
      thinkOfItAs: "how many directions the space really needs",
      watchOutFor: "counting a generating set that is not actually a basis",
      rememberThis: "dimension counts basis vectors, not random vectors",
      quickExample: {
        problem: "How do you get the dimension of a subspace?",
        move: "Find a basis first, then count it.",
      },
      typicalProblemShapes: [
        "Questions about dimension of solution spaces or polynomial spaces",
        "A proof using one basis size to compare spaces",
      ],
      miniDrill: [
        {
          prompt: "What must you have before you can count dimension safely?",
          answer: "A basis.",
        },
        {
          prompt: "Can two bases of the same space have different sizes?",
          answer: "No.",
        },
      ],
      memoryHook: "Dimension counts the basis, not the clutter.",
      tags: ["linear-algebra", "dimension", "basis"],
      difficulty: "Standard",
    }),
    makeLAOneCard({
      id: "la121a-linear-map",
      chapter: "Chapter 3: Linear Maps",
      unit: "Linear Maps",
      topic: "Linear maps",
      name: "Linear Map Check",
      order: 6,
      useItWhen: "a function between vector spaces is supposed to be linear",
      looksLike: "T(u + v) = T(u) + T(v), T(cv) = cT(v)",
      doThis: "check additivity and scalar compatibility on arbitrary inputs",
      thinkOfItAs: "the map respects vector-space structure",
      watchOutFor: "checking only one test value instead of the actual rules",
      rememberThis: "linear maps preserve add and scale",
      quickExample: {
        problem: "How do you prove T is linear?",
        move: "Show T(u + v) = T(u) + T(v) and T(cv) = cT(v).",
      },
      typicalProblemShapes: [
        "A function on vectors, polynomials, or matrices claimed to be linear",
        "Kernel and image questions built from T",
      ],
      miniDrill: [
        {
          prompt: "What are the two defining checks for linearity?",
          answer: "Addition and scalar multiplication.",
        },
        {
          prompt: "What special vector must every linear map send 0 to?",
          answer: "0.",
        },
      ],
      memoryHook: "Linear maps keep add and scale alive.",
      tags: ["linear-algebra", "linear-map", "kernel"],
      difficulty: "Starter",
    }),
    makeLAOneCard({
      id: "la121a-kernel-image",
      chapter: "Chapter 3: Linear Maps",
      unit: "Linear Maps",
      topic: "Kernel and image",
      name: "Kernel vs Image",
      order: 7,
      useItWhen: "you need the inputs that vanish or the outputs that appear",
      looksLike: "ker T, im T, null space, range",
      doThis: "solve T(v) = 0 for the kernel and describe all T(v) for the image",
      thinkOfItAs: "kernel asks what disappears; image asks what shows up",
      watchOutFor: "mixing up domain-side objects with codomain-side objects",
      rememberThis: "kernel lives in the input space, image lives in the output space",
      quickExample: {
        problem: "What is the first move to find ker T?",
        move: "Set T(v) = 0 and solve.",
      },
      typicalProblemShapes: [
        "Matrix transformations asking for null space and range",
        "Rank-nullity setup questions",
      ],
      miniDrill: [
        {
          prompt: "Where does ker T live?",
          answer: "In the domain.",
        },
        {
          prompt: "Where does im T live?",
          answer: "In the codomain.",
        },
      ],
      memoryHook: "Kernel disappears. Image appears.",
      tags: ["linear-algebra", "kernel", "image"],
      difficulty: "Standard",
    }),
  ],
};

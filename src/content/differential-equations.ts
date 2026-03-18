import type { BubbleCard, CourseContent } from "@/content/schema";

function makeDiffEqCard(
  card: Omit<BubbleCard, "subject" | "course" | "courseCode">,
): BubbleCard {
  return {
    subject: "Mathematics",
    course: "Elementary Differential Equations",
    courseCode: "MATH 3D",
    ...card,
  };
}

export const differentialEquationsCourse: CourseContent = {
  id: "differential-equations",
  subject: "Mathematics",
  title: "Elementary Differential Equations",
  institution: "UCI",
  courseCodes: ["MATH 3D"],
  aliases: ["Differential Equations", "ODEs"],
  shortDescription:
    "UCI-style first differential equations with pattern-first method selection.",
  units: [
    "First-Order Equations",
    "Second-Order Linear Equations",
    "Laplace and Systems",
  ],
  chapters: [
    "Chapter 1: First-Order Equations",
    "Chapter 2: Second-Order Linear Equations",
    "Chapter 3: Laplace Transforms and Systems",
  ],
  cards: [
    makeDiffEqCard({
      id: "diffeq-separable",
      chapter: "Chapter 1: First-Order Equations",
      unit: "First-Order Equations",
      topic: "Separable equations",
      name: "Separable ODE",
      order: 1,
      useItWhen: "you can move all y stuff to one side and all x stuff to the other",
      looksLike: "y' = g(x)h(y) or dy/dx = x(y+1)",
      doThis: "separate, integrate both sides, then solve for the constant if needed",
      thinkOfItAs: "unmixing x and y before integrating",
      watchOutFor: "forgetting special constant solutions when h(y) = 0",
      rememberThis: "if x and y can split, separate first",
      quickExample: {
        problem: "y' = x y. What technique fits first?",
        move: "Separate: dy/y = x dx.",
      },
      typicalProblemShapes: [
        "y' written as a product of an x part and a y part",
        "dy/dx where variables can be split into opposite sides",
      ],
      miniDrill: [
        {
          prompt: "If y' = (x^2)(1 + y), what is the first move?",
          answer: "Put dy/(1 + y) on one side and x^2 dx on the other.",
        },
        {
          prompt: "What easy thing gets missed after separating?",
          answer: "Constant solutions from the factor you divided by.",
        },
      ],
      memoryHook: "Can it split? Separate it.",
      tags: ["ode", "separable", "math3d"],
      difficulty: "Starter",
    }),
    makeDiffEqCard({
      id: "diffeq-linear-first-order",
      chapter: "Chapter 1: First-Order Equations",
      unit: "First-Order Equations",
      topic: "Linear first-order equations",
      name: "Linear First-Order ODE",
      order: 2,
      useItWhen: "the equation matches y' + p(x)y = q(x)",
      looksLike: "y' + 3y = x or y' - (2/x)y = sin x",
      doThis: "put it in standard form, find the integrating factor, then multiply through",
      thinkOfItAs: "one magic multiplier makes the left side collapse",
      watchOutFor: "calling something linear before isolating y' and checking the form",
      rememberThis: "standard form, then integrating factor",
      quickExample: {
        problem: "y' + 2y = e^x. What technique fits first?",
        move: "Use the integrating factor for a linear first-order ODE.",
      },
      typicalProblemShapes: [
        "y' plus a coefficient times y equals something",
        "A first-order ODE that is not cleanly separable but is linear in y",
      ],
      miniDrill: [
        {
          prompt: "What form are you hunting for first?",
          answer: "y' + p(x)y = q(x).",
        },
        {
          prompt: "What comes right after standard form?",
          answer: "Build the integrating factor.",
        },
      ],
      memoryHook: "Linear in y? Multiply to unlock.",
      tags: ["ode", "integrating-factor", "math3d"],
      difficulty: "Starter",
    }),
    makeDiffEqCard({
      id: "diffeq-exact",
      chapter: "Chapter 1: First-Order Equations",
      unit: "First-Order Equations",
      topic: "Exact equations",
      name: "Exact Equation",
      order: 3,
      useItWhen: "the equation looks like M dx + N dy = 0",
      looksLike: "(2xy + 1)dx + (x^2 + 3y^2)dy = 0",
      doThis: "check M_y = N_x, then find the potential function",
      thinkOfItAs: "rebuilding the hidden master function",
      watchOutFor: "integrating M and forgetting the missing y-piece",
      rememberThis: "exact means both pieces came from one parent function",
      quickExample: {
        problem: "M dx + N dy = 0 with matching cross-partials. What technique fits first?",
        move: "Treat it as exact and recover the potential function.",
      },
      typicalProblemShapes: [
        "An equation already written in differential form",
        "A first-order ODE where cross-partials match cleanly",
      ],
      miniDrill: [
        {
          prompt: "What test do you run first?",
          answer: "Compare M_y and N_x.",
        },
        {
          prompt: "What is the end product of an exact-equation solve?",
          answer: "A level-curve equation F(x, y) = C.",
        },
      ],
      memoryHook: "Cross-partials match? Hunt the parent.",
      tags: ["ode", "exact", "math3d"],
      difficulty: "Standard",
    }),
    makeDiffEqCard({
      id: "diffeq-second-order-homogeneous",
      chapter: "Chapter 2: Second-Order Linear Equations",
      unit: "Second-Order Linear Equations",
      topic: "Second-order linear homogeneous equations",
      name: "Second-Order Homogeneous",
      order: 4,
      useItWhen: "you see ay'' + by' + cy = 0 with constant coefficients",
      looksLike: "y'' - 5y' + 6y = 0",
      doThis: "write the characteristic equation, solve for roots, then build the matching template",
      thinkOfItAs: "translate the ODE into an algebra root problem",
      watchOutFor: "using the same solution form for repeated and complex roots",
      rememberThis: "roots choose the solution shape",
      quickExample: {
        problem: "y'' - 3y' + 2y = 0. What technique fits first?",
        move: "Use the characteristic equation r^2 - 3r + 2 = 0.",
      },
      typicalProblemShapes: [
        "Constant-coefficient y'', y', y equation equal to zero",
        "A problem asking for the general solution of a homogeneous ODE",
      ],
      miniDrill: [
        {
          prompt: "What do repeated roots force you to add?",
          answer: "An extra x factor.",
        },
        {
          prompt: "What do complex roots give you?",
          answer: "Exponentials times sine and cosine.",
        },
      ],
      memoryHook: "Characteristic roots decide the costume.",
      tags: ["ode", "second-order", "characteristic-equation"],
      difficulty: "Starter",
    }),
    makeDiffEqCard({
      id: "diffeq-undetermined-coefficients",
      chapter: "Chapter 2: Second-Order Linear Equations",
      unit: "Second-Order Linear Equations",
      topic: "Undetermined coefficients",
      name: "Undetermined Coefficients",
      order: 5,
      useItWhen: "the forcing term is a nice polynomial, exponential, sine, cosine, or a product of those",
      looksLike: "y'' + y = sin x or y'' - y = e^x",
      doThis: "guess the right trial shape, adjust for overlap, then solve for constants",
      thinkOfItAs: "match the forcing term with a smart costume",
      watchOutFor: "forgetting to multiply by x when your guess copies the homogeneous solution",
      rememberThis: "guess the shape, then fix overlap",
      quickExample: {
        problem: "y'' + y = cos x. What technique fits first?",
        move: "Use undetermined coefficients with a trig trial.",
      },
      typicalProblemShapes: [
        "A constant-coefficient nonhomogeneous ODE with simple forcing",
        "A forcing term made of exponentials, trig, or polynomials",
      ],
      miniDrill: [
        {
          prompt: "When do you multiply the trial by x?",
          answer: "When it overlaps the homogeneous solution.",
        },
        {
          prompt: "Is this method good for ln x or tan x forcing?",
          answer: "No. The forcing needs to be one of the standard guessable types.",
        },
      ],
      memoryHook: "Guess the shape. Fix collisions.",
      tags: ["ode", "undetermined-coefficients", "math3d"],
      difficulty: "Standard",
    }),
    makeDiffEqCard({
      id: "diffeq-laplace",
      chapter: "Chapter 3: Laplace Transforms and Systems",
      unit: "Laplace and Systems",
      topic: "Laplace transforms",
      name: "Laplace Transform Start",
      order: 6,
      useItWhen: "initial conditions are built in and the forcing is piecewise or messy",
      looksLike: "y'' + y = u(t-pi) or a problem says use Laplace",
      doThis: "transform the ODE, solve the algebra equation in s, then invert",
      thinkOfItAs: "turn derivatives into algebra for a while",
      watchOutFor: "dropping the initial-condition terms after transforming y' or y''",
      rememberThis: "Laplace trades calculus for algebra",
      quickExample: {
        problem: "A piecewise forcing term appears with initial conditions. What technique fits first?",
        move: "Use Laplace transforms.",
      },
      typicalProblemShapes: [
        "Initial-value problem with step functions or impulses",
        "An ODE where transform tables are expected",
      ],
      miniDrill: [
        {
          prompt: "What is the biggest Laplace bookkeeping trap?",
          answer: "Forgetting the initial-condition terms.",
        },
        {
          prompt: "Why do students use Laplace at all?",
          answer: "It turns the differential equation into an algebra problem in s.",
        },
      ],
      memoryHook: "Messy forcing? Switch to s.",
      tags: ["ode", "laplace", "math3d"],
      difficulty: "Standard",
    }),
    makeDiffEqCard({
      id: "diffeq-systems-eigen",
      chapter: "Chapter 3: Laplace Transforms and Systems",
      unit: "Laplace and Systems",
      topic: "Linear systems with eigenvalues",
      name: "Systems via Eigenvalues",
      order: 7,
      useItWhen: "you have x' = Ax or a first-order linear system",
      looksLike: "x' = Ax with a 2x2 matrix",
      doThis: "find eigenvalues and eigenvectors, then build the system solution from the modes",
      thinkOfItAs: "let the matrix reveal its natural motions",
      watchOutFor: "mixing scalar ODE rules with matrix-system rules",
      rememberThis: "systems follow eigen-modes",
      quickExample: {
        problem: "x' = Ax for a constant matrix A. What technique fits first?",
        move: "Use eigenvalues and eigenvectors.",
      },
      typicalProblemShapes: [
        "A 2x2 or 3x3 linear system in vector form",
        "A stability question tied to matrix eigenvalues",
      ],
      miniDrill: [
        {
          prompt: "What tells you the growth or decay mode in x' = Ax?",
          answer: "The eigenvalues.",
        },
        {
          prompt: "What vector travels with each exponential mode?",
          answer: "Its eigenvector.",
        },
      ],
      memoryHook: "Matrix system? Ask the eigenvalues.",
      tags: ["ode", "systems", "eigenvalues"],
      difficulty: "Standard",
    }),
  ],
};

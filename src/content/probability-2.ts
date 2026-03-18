import type { BubbleCard, CourseContent } from "@/content/schema";

function makeProbTwoCard(
  card: Omit<BubbleCard, "subject" | "course" | "courseCode">,
): BubbleCard {
  return {
    subject: "Mathematics",
    course: "Probability II",
    courseCode: "MATH 130B",
    ...card,
  };
}

export const probabilityTwoCourse: CourseContent = {
  id: "probability-2",
  subject: "Mathematics",
  title: "Probability II",
  institution: "UCI",
  courseCodes: ["MATH 130B"],
  aliases: ["Advanced Probability"],
  shortDescription:
    "Joint distributions, conditioning, transforms, and asymptotic patterns for UCI 130B.",
  units: ["Joint Distributions", "Conditioning and Dependence", "Transforms and Limits"],
  chapters: [
    "Chapter 1: Joint Distributions",
    "Chapter 2: Conditioning and Dependence",
    "Chapter 3: Transforms and Limits",
  ],
  cards: [
    makeProbTwoCard({
      id: "prob2-joint-density",
      chapter: "Chapter 1: Joint Distributions",
      unit: "Joint Distributions",
      topic: "Joint density or pmf",
      name: "Joint Distribution Start",
      order: 1,
      useItWhen: "two random variables are being tracked together",
      looksLike: "f(x, y), p(x, y), support region in the xy-plane",
      doThis: "find the support first, then integrate or sum over the right region",
      thinkOfItAs: "probability now lives on a map, not a line",
      watchOutFor: "integrating outside the support region",
      rememberThis: "joint problems start with the region",
      quickExample: {
        problem: "A density is given for (X, Y). What is the first move?",
        move: "Draw or describe the support region first.",
      },
      typicalProblemShapes: [
        "A piecewise density in x and y",
        "Probability over a triangle, strip, or rectangle in the plane",
      ],
      miniDrill: [
        {
          prompt: "What gets found before any integral in a joint-density problem?",
          answer: "The support region.",
        },
        {
          prompt: "What is the big geometric trap?",
          answer: "Using the wrong bounds.",
        },
      ],
      memoryHook: "Two variables means draw the region.",
      tags: ["probability", "joint", "math130b"],
      difficulty: "Starter",
    }),
    makeProbTwoCard({
      id: "prob2-marginal",
      chapter: "Chapter 1: Joint Distributions",
      unit: "Joint Distributions",
      topic: "Marginal distributions",
      name: "Marginal Distribution",
      order: 2,
      useItWhen: "you only want X or only want Y from a joint law",
      looksLike: "f_X(x) or p_X(x) from f(x, y) or p(x, y)",
      doThis: "sum or integrate out the other variable over the support",
      thinkOfItAs: "collapse the joint picture onto one axis",
      watchOutFor: "using full-line bounds when the support only allows part of the line",
      rememberThis: "marginal = integrate or sum the other variable away",
      quickExample: {
        problem: "How do you get f_X(x) from f(x, y)?",
        move: "Integrate out y over the allowed region.",
      },
      typicalProblemShapes: [
        "A joint law followed by 'find the marginal of X'",
        "A support region where y-bounds depend on x",
      ],
      miniDrill: [
        {
          prompt: "What variable disappears when you compute f_X(x)?",
          answer: "y.",
        },
        {
          prompt: "What must the bounds respect?",
          answer: "The support region.",
        },
      ],
      memoryHook: "Marginal means wash one variable out.",
      tags: ["probability", "marginal", "joint"],
      difficulty: "Starter",
    }),
    makeProbTwoCard({
      id: "prob2-conditional-density",
      chapter: "Chapter 2: Conditioning and Dependence",
      unit: "Conditioning and Dependence",
      topic: "Conditional densities and pmfs",
      name: "Conditional Distribution",
      order: 3,
      useItWhen: "you know one variable and want the new law of the other",
      looksLike: "f_{X|Y}(x|y) or P(X=x|Y=y)",
      doThis: "use joint over marginal and keep the conditioning value fixed",
      thinkOfItAs: "slice the joint picture at the known value and renormalize",
      watchOutFor: "forgetting the denominator or treating the conditioned value like a variable again",
      rememberThis: "conditional = joint divided by the matching marginal",
      quickExample: {
        problem: "What technique fits first for f_{X|Y}(x|y)?",
        move: "Use joint over marginal.",
      },
      typicalProblemShapes: [
        "A joint law followed by 'find the conditional distribution'",
        "A question where one variable is given exactly",
      ],
      miniDrill: [
        {
          prompt: "What sits in the denominator of a conditional density?",
          answer: "The marginal for the conditioned variable.",
        },
        {
          prompt: "What happens to y inside f_{X|Y}(x|y)?",
          answer: "Treat it as fixed.",
        },
      ],
      memoryHook: "Condition, slice, divide.",
      tags: ["probability", "conditional", "math130b"],
      difficulty: "Starter",
    }),
    makeProbTwoCard({
      id: "prob2-independence-test",
      chapter: "Chapter 2: Conditioning and Dependence",
      unit: "Conditioning and Dependence",
      topic: "Testing independence",
      name: "Independence Test",
      order: 4,
      useItWhen: "you need to decide whether two random variables interact",
      looksLike: "f(x, y) ?= f_X(x)f_Y(y) or p(x, y) ?= p_X(x)p_Y(y)",
      doThis: "compute marginals and test whether the joint factors",
      thinkOfItAs: "if the picture splits cleanly, the variables ignore each other",
      watchOutFor: "declaring independence from zero covariance alone",
      rememberThis: "independence means the joint factors",
      quickExample: {
        problem: "What technique fits first when asked if X and Y are independent?",
        move: "Check whether the joint equals product of marginals.",
      },
      typicalProblemShapes: [
        "A joint law with an independence question",
        "A covariance value tempting you to conclude too much",
      ],
      miniDrill: [
        {
          prompt: "What identity proves independence for densities?",
          answer: "f(x, y) = f_X(x)f_Y(y).",
        },
        {
          prompt: "Does zero covariance always prove independence?",
          answer: "No.",
        },
      ],
      memoryHook: "Independent means factor, not vibes.",
      tags: ["probability", "independence", "covariance"],
      difficulty: "Starter",
    }),
    makeProbTwoCard({
      id: "prob2-covariance-correlation",
      chapter: "Chapter 2: Conditioning and Dependence",
      unit: "Conditioning and Dependence",
      topic: "Covariance and correlation",
      name: "Covariance vs Correlation",
      order: 5,
      useItWhen: "you need a quick measure of linear dependence",
      looksLike: "Cov(X, Y), rho(X, Y), E[XY] - E[X]E[Y]",
      doThis: "compute covariance first, then divide by the standard deviations for correlation",
      thinkOfItAs: "covariance is raw tilt; correlation is scaled tilt",
      watchOutFor: "mixing up units or thinking correlation sees nonlinear dependence perfectly",
      rememberThis: "correlation is normalized covariance",
      quickExample: {
        problem: "How do you get correlation once covariance is known?",
        move: "Divide by sigma_X sigma_Y.",
      },
      typicalProblemShapes: [
        "A problem asking for dependence size on a standard scale",
        "Moments E[X], E[Y], and E[XY] already available",
      ],
      miniDrill: [
        {
          prompt: "What moment combo gives covariance?",
          answer: "E[XY] - E[X]E[Y].",
        },
        {
          prompt: "What does correlation add on top of covariance?",
          answer: "Scaling by both standard deviations.",
        },
      ],
      memoryHook: "Cov is raw. Corr is scaled.",
      tags: ["probability", "covariance", "correlation"],
      difficulty: "Standard",
    }),
    makeProbTwoCard({
      id: "prob2-mgf",
      chapter: "Chapter 3: Transforms and Limits",
      unit: "Transforms and Limits",
      topic: "Moment generating functions",
      name: "MGF Pattern",
      order: 6,
      useItWhen: "you want moments or the distribution of a sum of independent variables",
      looksLike: "M_X(t), M_{X+Y}(t), derivatives at 0",
      doThis: "write the mgf, multiply for independent sums, or differentiate at 0 for moments",
      thinkOfItAs: "a probability fingerprint that is easy to multiply",
      watchOutFor: "using mgfs where they do not exist around 0",
      rememberThis: "mgfs multiply over independent sums",
      quickExample: {
        problem: "How do you get the mgf of X + Y when X and Y are independent?",
        move: "Multiply the two mgfs.",
      },
      typicalProblemShapes: [
        "A sum of independent random variables",
        "A problem asking for mean or variance from a transform",
      ],
      miniDrill: [
        {
          prompt: "What point gives moments from derivatives?",
          answer: "t = 0.",
        },
        {
          prompt: "What is the big sum trick for mgfs?",
          answer: "Independent sums turn into products.",
        },
      ],
      memoryHook: "Independent sum? Multiply the mgfs.",
      tags: ["probability", "mgf", "transforms"],
      difficulty: "Standard",
    }),
    makeProbTwoCard({
      id: "prob2-clt-standardize",
      chapter: "Chapter 3: Transforms and Limits",
      unit: "Transforms and Limits",
      topic: "Central limit theorem setup",
      name: "CLT Standardize First",
      order: 7,
      useItWhen: "a sum or sample mean of many independent variables appears",
      looksLike: "S_n, Xbar, large n, approximate probability",
      doThis: "center, divide by the standard deviation, then use normal tables",
      thinkOfItAs: "turn the ugly sum into a z-score question",
      watchOutFor: "forgetting the sqrt(n) in the sample-mean scale",
      rememberThis: "CLT starts by standardizing",
      quickExample: {
        problem: "What technique fits first for a large-n sample mean probability?",
        move: "Standardize and use the normal approximation.",
      },
      typicalProblemShapes: [
        "Large sample mean or sum probability questions",
        "A problem asking for an approximation rather than an exact law",
      ],
      miniDrill: [
        {
          prompt: "What does the CLT usually send you to?",
          answer: "A standard normal z-score.",
        },
        {
          prompt: "What scale belongs to Xbar?",
          answer: "sigma / sqrt(n).",
        },
      ],
      memoryHook: "Large n? Standardize, then normal.",
      tags: ["probability", "clt", "normal-approximation"],
      difficulty: "Standard",
    }),
  ],
};

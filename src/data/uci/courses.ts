import { Course } from '../../academic-engine/types'

export const UCI_CS_MATH_COURSES: Course[] = [
  // --- Information and Computer Sciences ---
  {
    id: 'ICS_31',
    code: 'ICS 31',
    title: 'Introduction to Programming I',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Fundamental concepts of computer software design and construction using Python. Variables, expressions, statements, control flow, functions, and elementary data structures.',
    prerequisiteText: 'None. Placement exam recommended for students without prior coding experience.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Alfarooque, A.', 'Hermans, F.'] },
      { term: 'Winter', year: 2027, confidence: 'EXPECTED' },
      { term: 'Spring', year: 2027, confidence: 'LIKELY' }
    ]
  },
  {
    id: 'ICS_32',
    code: 'ICS 32',
    title: 'Programming with Software Libraries',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Construction of larger programs using libraries and modern software engineering techniques. APIs, network communication, user interfaces, recursion, and object-oriented programming.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'ICS 31',
      minGrade: 'C'
    },
    prerequisiteText: 'ICS 31 with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED', instructors: ['Thornton, A.'] },
      { term: 'Spring', year: 2027, confidence: 'EXPECTED' }
    ]
  },
  {
    id: 'ICS_33',
    code: 'ICS 33',
    title: 'Intermediate Programming',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Intermediate-level software development topics: object-oriented design patterns, testing, performance profiling, functional idioms, generators, decorators, and operator overloading.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'ICS 32',
      minGrade: 'C'
    },
    prerequisiteText: 'ICS 32 with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Pattis, R.'] },
      { term: 'Winter', year: 2027, confidence: 'EXPECTED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ICS_45C',
    code: 'ICS 45C',
    title: 'Programming in C/C++ as a Second Language',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Syntax and idioms of C and C++. Pointers, memory allocation, RAII, copy/move semantics, templates, STL containers, and low-level debugging tools.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'ICS 33',
      minGrade: 'C'
    },
    prerequisiteText: 'ICS 33 with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Thornton, A.'] },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'EXPECTED' }
    ]
  },
  {
    id: 'ICS_46',
    code: 'ICS 46',
    title: 'Data Structure Implementation and Analysis',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'In-depth implementation and asymptotic analysis of core data structures: trees, hash tables, heaps, graphs, balanced trees, and sorting algorithms in C++.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        {
          type: 'course',
          courseId: 'ICS 45C',
          minGrade: 'C'
        },
        {
          type: 'or',
          children: [
            { type: 'course', courseId: 'MATH 2B', minGrade: 'C' },
            { type: 'course', courseId: 'STATS 67', minGrade: 'C' }
          ]
        }
      ]
    },
    prerequisiteText: 'ICS 45C with grade of C or better AND (MATH 2B OR STATS 67 with grade of C or better)',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED', instructors: ['Shindler, M.'] },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CS_161',
    code: 'CS 161',
    title: 'Design and Analysis of Algorithms',
    department: 'COMPSCI',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Design of efficient algorithms with proofs of correctness. Divide-and-conquer, greedy techniques, dynamic programming, network flow, NP-completeness, and approximation algorithms.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        {
          type: 'course',
          courseId: 'ICS 46',
          minGrade: 'C'
        },
        {
          type: 'or',
          children: [
            { type: 'course', courseId: 'MATH 2B', minGrade: 'C' },
            { type: 'course', courseId: 'MATH 2D', minGrade: 'C' }
          ]
        },
        {
          type: 'or',
          children: [
            { type: 'course', courseId: 'STATS 67', minGrade: 'C' },
            { type: 'course', courseId: 'STATS 7', minGrade: 'C' }
          ]
        }
      ]
    },
    prerequisiteText:
      'ICS 46 with grade of C or better AND (MATH 2B OR MATH 2D with grade of C or better) AND (STATS 67 OR STATS 7 with grade of C or better)',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Hirschberg, D.'] },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'EXPECTED' }
    ]
  },

  // --- Mathematics ---
  {
    id: 'MATH_2A',
    code: 'MATH 2A',
    title: 'Single-Variable Calculus I',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Differential calculus of functions of one variable: limits, continuity, derivatives, differentiation techniques, optimization, related rates, and Mean Value Theorem.',
    prerequisiteExpression: {
      type: 'custom',
      description: 'Satisfactory score on ALEKS Calculus Placement Exam (80%+) or credit for MATH 1B',
      satisfiedByDefault: true
    },
    prerequisiteText: 'ALEKS Placement score (80%+) or MATH 1B',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_2B',
    code: 'MATH 2B',
    title: 'Single-Variable Calculus II',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Integral calculus of functions of one variable: Fundamental Theorem of Calculus, techniques of integration, applications, improper integrals, sequences, and infinite series.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'MATH 2A',
      minGrade: 'C'
    },
    prerequisiteText: 'MATH 2A with a grade of C or better (or AP Calculus AB score of 4 or 5)',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_2D',
    code: 'MATH 2D',
    title: 'Multivariable Calculus I',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Calculus of functions of several variables: vectors, lines, planes, curves in space, partial derivatives, directional derivatives, gradient vectors, Lagrange multipliers, and double integrals.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'MATH 2B',
      minGrade: 'C'
    },
    prerequisiteText: 'MATH 2B with a grade of C or better (or AP Calculus BC score of 4 or 5)',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_3A',
    code: 'MATH 3A',
    title: 'Introduction to Linear Algebra',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Systems of linear equations, matrices, determinants, vector spaces, subspaces, linear independence, dimension, linear transformations, eigenvalues, and eigenvectors.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'MATH 2B',
      minGrade: 'C'
    },
    prerequisiteText: 'MATH 2B with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_13',
    code: 'MATH 13',
    title: 'Introduction to Abstract Mathematics',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Transition to advanced mathematics with emphasis on writing rigorous mathematical proofs. Propositional logic, quantifiers, set theory, functions, relations, equivalence classes, and induction.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'MATH 2B',
      minGrade: 'C'
    },
    prerequisiteText: 'MATH 2B with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_105A',
    code: 'MATH 105A',
    title: 'Numerical Analysis I',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Numerical solutions of nonlinear equations, interpolation, numerical differentiation and integration, initial value problems for ordinary differential equations, error analysis, and scientific computing.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'MATH 3A', minGrade: 'C' },
        {
          type: 'or',
          children: [
            { type: 'course', courseId: 'MATH 2D', minGrade: 'C' },
            { type: 'course', courseId: 'MATH 3A', minGrade: 'C' }
          ]
        },
        {
          type: 'or',
          children: [
            { type: 'course', courseId: 'ICS 31', minGrade: 'C' },
            { type: 'course', courseId: 'ENGRMAE 10', minGrade: 'C' }
          ]
        }
      ]
    },
    prerequisiteText: 'MATH 3A AND (MATH 2D OR MATH 3A) AND (ICS 31 OR ENGRMAE 10)',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Komarova, N.'] },
      { term: 'Winter', year: 2027, confidence: 'LIKELY' }
    ]
  },
  {
    id: 'MATH_140A',
    code: 'MATH 140A',
    title: 'Elementary Analysis I',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Rigorous foundation of real analysis: construction and topology of the real numbers, metric spaces, sequences, Cauchy sequences, completeness, Bolzano-Weierstrass theorem, limits, and continuity.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'MATH 13', minGrade: 'C' },
        { type: 'course', courseId: 'MATH 3A', minGrade: 'C' },
        { type: 'course', courseId: 'MATH 2D', minGrade: 'C' }
      ]
    },
    prerequisiteText: 'MATH 13 AND MATH 3A AND MATH 2D with grades of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Smith, P.'] },
      { term: 'Winter', year: 2027, confidence: 'EXPECTED' }
    ]
  },
  {
    id: 'STATS_67',
    code: 'STATS 67',
    title: 'Introduction to Probability and Statistics for Computer Science',
    department: 'STATS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Probability, random variables, probability distributions, joint distributions, expectations, Markov chains, sampling distributions, hypothesis testing, confidence intervals, and regression.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'MATH 2B',
      minGrade: 'C'
    },
    prerequisiteText: 'MATH 2B with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  }
]

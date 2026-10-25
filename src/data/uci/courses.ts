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
      { term: 'Spring', year: 2027, confidence: 'LIKELY' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
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
      { term: 'Spring', year: 2027, confidence: 'EXPECTED' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
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
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
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
      { term: 'Spring', year: 2027, confidence: 'EXPECTED' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
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
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
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
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
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
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
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
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
    ]
  },
  {
    id: 'IN4MATX_43',
    code: 'IN4MATX 43',
    title: 'Introduction to Software Engineering',
    department: 'INFORMATICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Concepts, methods, and current practice of software engineering. Large-scale software architectures, version control, agile methodologies, requirements elicitation, design patterns, and automated testing.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'ICS 32',
      minGrade: 'C'
    },
    prerequisiteText: 'ICS 32 with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Ziv, H.'] },
      { term: 'Winter', year: 2027, confidence: 'EXPECTED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ICS_6B',
    code: 'I&C SCI 6B',
    title: 'Boolean Algebra and Logic',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Relations, sets, functions, propositional logic, predicate calculus, digital circuit design, Boolean algebras, induction, and recurrence relations.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Gassko, I.'] },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
    ]
  },
  {
    id: 'ICS_6D',
    code: 'I&C SCI 6D',
    title: 'Discrete Mathematics for Computer Science',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Combinatorics, probability, graph theory, trees, Eulerian and Hamiltonian paths, finite-state machines, regular expressions, and formal grammars.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'I&C SCI 6B',
      minGrade: 'C'
    },
    prerequisiteText: 'I&C SCI 6B with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED', instructors: ['Jarecki, S.'] },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
    ]
  },
  {
    id: 'ICS_51',
    code: 'I&C SCI 51',
    title: 'Introductory Computer Organization',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Machine instruction sets, assembly programming, processors, arithmetic logic units, pipelining, memory hierarchy, cache organization, and I/O devices.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'ICS 32', minGrade: 'C' },
        { type: 'course', courseId: 'I&C SCI 6B', minGrade: 'C' }
      ]
    },
    prerequisiteText: 'ICS 32 AND I&C SCI 6B with grades of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Nicolau, A.'] },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Summer', year: 2027, confidence: 'EXPECTED' }
    ]
  },
  {
    id: 'COMPSCI_121',
    code: 'COMPSCI 121',
    title: 'Information Retrieval',
    department: 'COMPSCI',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Design of text search engines, web crawlers, inverted index construction, vector space ranking, PageRank, link analysis, and evaluation benchmarks.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'ICS 46',
      minGrade: 'C'
    },
    prerequisiteText: 'ICS 46 with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'EXPECTED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED', instructors: ['Lopes, C.'] },
      { term: 'Spring', year: 2027, confidence: 'EXPECTED' }
    ]
  },
  {
    id: 'COMPSCI_141',
    code: 'COMPSCI 141',
    title: 'Concepts in Programming Languages',
    department: 'COMPSCI',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Underlying principles of programming language design and paradigms: syntax, scoping, type systems, memory management, closures, concurrency, and formal semantics.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'ICS 46',
      minGrade: 'C'
    },
    prerequisiteText: 'ICS 46 with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Klefstad, R.'] },
      { term: 'Winter', year: 2027, confidence: 'EXPECTED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COMPSCI_143A',
    code: 'COMPSCI 143A',
    title: 'Principles of Operating Systems',
    department: 'COMPSCI',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Fundamental mechanisms of modern operating systems: processes, threads, synchronization primitives, deadlocks, virtual memory, paging, file systems, and device management.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'ICS 46',
      minGrade: 'C'
    },
    prerequisiteText: 'ICS 46 with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Bic, L.'] },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COMPSCI_152',
    code: 'COMPSCI 152',
    title: 'Computer Systems Architecture',
    department: 'COMPSCI',
    units: 4,
    catalogYear: '2026-27',
    description:
      'High-performance processor design, superscalar execution, branch prediction, hardware cache hierarchies, multi-core memory consistency, and vector processing.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'ICS 46',
      minGrade: 'C'
    },
    prerequisiteText: 'ICS 46 with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'EXPECTED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED', instructors: ['Veidenbaum, A.'] },
      { term: 'Spring', year: 2027, confidence: 'EXPECTED' }
    ]
  },
  {
    id: 'COMPSCI_171',
    code: 'COMPSCI 171',
    title: 'Introduction to Artificial Intelligence',
    department: 'COMPSCI',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Fundamental principles of artificial intelligence: heuristic search (A*), adversarial games, constraint satisfaction, probabilistic reasoning, Bayes networks, and reinforcement learning.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'ICS 46', minGrade: 'C' },
        { type: 'course', courseId: 'STATS 67', minGrade: 'C' }
      ]
    },
    prerequisiteText: 'ICS 46 AND STATS 67 with grades of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Lathrop, R.'] },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COMPSCI_178',
    code: 'COMPSCI 178',
    title: 'Machine Learning and Data-Mining',
    department: 'COMPSCI',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Mathematical foundations of machine learning: linear and logistic regression, neural networks, support vector machines, decision trees, kernel methods, overfitting, regularization, and clustering.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'ICS 46', minGrade: 'C' },
        { type: 'course', courseId: 'MATH 3A', minGrade: 'C' },
        { type: 'course', courseId: 'STATS 67', minGrade: 'C' }
      ]
    },
    prerequisiteText: 'ICS 46 AND MATH 3A AND STATS 67 with grades of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'EXPECTED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED', instructors: ['Ihler, A.'] },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ICS_139W',
    code: 'I&C SCI 139W',
    title: 'Critical Writing on Information Technology',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Principles of professional and technical written communication in computing. Writing technical proposals, design specifications, and research reports. Satisfies the Upper-Division Writing Requirement.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'ICS 45C', minGrade: 'C' },
        { type: 'class_standing', minStanding: 'Junior' }
      ]
    },
    prerequisiteText: 'ICS 45C with a grade of C or better, and Junior or Senior standing',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Kay, D.'] },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Summer', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'WRITING_39B',
    code: 'WRITING 39B',
    title: 'Critical Reading and Rhetoric',
    department: 'WRITING',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Rhetorical analysis, academic argumentation, textual synthesis, and revision. Satisfies the first course of the lower-division writing requirement.',
    prerequisiteText: 'Entry Level Writing Requirement satisfied.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'WRITING_39C',
    code: 'WRITING 39C',
    title: 'Argument and Research',
    department: 'WRITING',
    units: 4,
    catalogYear: '2026-27',
    description:
      'In-depth research methodologies, finding and evaluating scholarly sources, and composing long-form researched arguments. Satisfies the second course of the lower-division writing requirement.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'WRITING 39B',
      minGrade: 'C'
    },
    prerequisiteText: 'WRITING 39B with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  // --- Discrete Math & Foundations (ICS) ---
  {
    id: 'ICS_6B',
    code: 'ICS 6B',
    title: 'Boolean Logic and Discrete Structures',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Relations, functions, propositional and predicate logic, Boolean algebra and digital circuits, sets, and counting principles.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Gassko, I.'] },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ICS_6D',
    code: 'ICS 6D',
    title: 'Discrete Mathematics for Computer Science',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Mathematical induction, recurrences, finite automata and regular expressions, graphs and trees, elementary probability, and algorithmic analysis.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'ICS 6B',
      minGrade: 'C'
    },
    prerequisiteText: 'ICS 6B with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED', instructors: ['Jarecki, S.'] },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  // --- Software Engineering Core (IN4MATX) ---
  {
    id: 'IN4MATX_113',
    code: 'IN4MATX 113',
    title: 'Requirements Analysis and Engineering',
    department: 'IN4MATX',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Elicitation, modeling, specification, and validation of software system requirements. User stories, use cases, domain analysis, and requirements traceability.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'IN4MATX 43',
      minGrade: 'C'
    },
    prerequisiteText: 'IN4MATX 43 with a grade of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['van der Hoek, A.'] },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'IN4MATX_115',
    code: 'IN4MATX 115',
    title: 'Software Testing, Analysis, and Quality Assurance',
    department: 'IN4MATX',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Verification and validation techniques: unit testing, integration testing, system testing, code coverage, test automation frameworks, and static code analysis.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'IN4MATX 43',
      minGrade: 'C'
    },
    prerequisiteText: 'IN4MATX 43 with a grade of C or better',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'IN4MATX_121',
    code: 'IN4MATX 121',
    title: 'Software Design: Applications',
    department: 'IN4MATX',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Architecture patterns, microservices, component composition, MVC, API design, and user-centered interactive application design.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'IN4MATX 43', minGrade: 'C' },
        { type: 'course', courseId: 'ICS 33', minGrade: 'C' }
      ]
    },
    prerequisiteText: 'IN4MATX 43 AND ICS 33 with grades of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED', instructors: ['Ziv, H.'] },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'IN4MATX_122',
    code: 'IN4MATX 122',
    title: 'Software Design: Structure and Implementation',
    department: 'IN4MATX',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Detailed object-oriented software design, Gang of Four design patterns, SOLID principles, refactoring legacy codebases, and maintainability metrics.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'IN4MATX 43', minGrade: 'C' },
        { type: 'course', courseId: 'ICS 45C', minGrade: 'C' }
      ]
    },
    prerequisiteText: 'IN4MATX 43 AND ICS 45C with grades of C or better',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'IN4MATX_191A',
    code: 'IN4MATX 191A',
    title: 'Senior Design Project I',
    department: 'IN4MATX',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Capstone software development project for external industry sponsors: project scoping, client interaction, architectural specification, and sprint milestones.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'IN4MATX 113', minGrade: 'C' },
        { type: 'course', courseId: 'IN4MATX 121', minGrade: 'C' },
        { type: 'course', courseId: 'I&C SCI 139W', minGrade: 'C' }
      ]
    },
    prerequisiteText: 'IN4MATX 113, IN4MATX 121, and I&C SCI 139W with grades of C or better',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED', instructors: ['Hermans, F.'] }
    ]
  },
  {
    id: 'IN4MATX_191B',
    code: 'IN4MATX 191B',
    title: 'Senior Design Project II',
    department: 'IN4MATX',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Second quarter of capstone: completion, deployment, testing, performance tuning, and final client presentation of the working software product.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'IN4MATX 191A',
      minGrade: 'C'
    },
    prerequisiteText: 'IN4MATX 191A with a grade of C or better',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED', instructors: ['Hermans, F.'] }
    ]
  },
  // --- Advanced Statistics Core (STATS) ---
  {
    id: 'STATS_120A',
    code: 'STATS 120A',
    title: 'Introduction to Probability and Statistics I',
    department: 'STATS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Probability spaces, random variables, discrete and continuous distributions, joint distributions, expectations, variance, and transformations.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'MATH 2A', minGrade: 'C' },
        { type: 'course', courseId: 'MATH 2B', minGrade: 'C' }
      ]
    },
    prerequisiteText: 'MATH 2A AND MATH 2B with grades of C or better',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'STATS_120B',
    code: 'STATS 120B',
    title: 'Introduction to Probability and Statistics II',
    department: 'STATS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Point and interval estimation, maximum likelihood, properties of estimators, hypothesis testing, likelihood ratio tests, and confidence intervals.',
    prerequisiteExpression: {
      type: 'and',
      children: [
        { type: 'course', courseId: 'STATS 120A', minGrade: 'C' },
        { type: 'course', courseId: 'MATH 3A', minGrade: 'C' }
      ]
    },
    prerequisiteText: 'STATS 120A AND MATH 3A with grades of C or better',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'STATS_120C',
    code: 'STATS 120C',
    title: 'Introduction to Probability and Statistics III',
    department: 'STATS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Linear regression, analysis of variance (ANOVA), model diagnostics, nonparametric methods, and categorical data analysis.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'STATS 120B',
      minGrade: 'C'
    },
    prerequisiteText: 'STATS 120B with a grade of C or better',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  // --- Computer Engineering & Hardware Core (EECS) ---
  {
    id: 'EECS_31',
    code: 'EECS 31',
    title: 'Introduction to Digital Systems',
    department: 'EECS',
    units: 4,
    catalogYear: '2026-27',
    description:
      'Digital devices, Boolean algebra, logic gates, combinational circuit synthesis, flip-flops, registers, counters, sequential circuit design, and finite state machines.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_31L',
    code: 'EECS 31L',
    title: 'Introduction to Digital Logic Laboratory',
    department: 'EECS',
    units: 3,
    catalogYear: '2026-27',
    description:
      'Laboratory experiments in digital logic design using VHDL/Verilog and FPGA prototyping hardware boards.',
    prerequisiteExpression: {
      type: 'course',
      courseId: 'EECS 31',
      minGrade: 'C'
    },
    prerequisiteText: 'EECS 31 (may be taken concurrently)',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },

  // =========================================================================
  // Biological Sciences & Chemistry
  // =========================================================================
  {
    id: 'BIO_SCI_93',
    code: 'BIO SCI 93',
    title: 'From DNA to Organisms',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Cell biology, molecular biology, and genetics foundations.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_94',
    code: 'BIO SCI 94',
    title: 'From Organisms to Ecosystems',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Evolution, ecology, biodiversity, and physiology across biological systems.',
    prerequisiteText: 'BIO SCI 93 with C or better.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_97',
    code: 'BIO SCI 97',
    title: 'Genetics',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Mendelian principles, gene expression, and genomic analysis.',
    prerequisiteText: 'BIO SCI 94 and CHEM 1A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_98',
    code: 'BIO SCI 98',
    title: 'Biochemistry',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Structure and function of proteins, nucleic acids, lipids, and metabolic pathways.',
    prerequisiteText: 'BIO SCI 97 and CHEM 51A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_99',
    code: 'BIO SCI 99',
    title: 'Molecular Biology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Advanced molecular genetics, replication, transcription, and regulation.',
    prerequisiteText: 'BIO SCI 98.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_100',
    code: 'BIO SCI 100',
    title: 'Scientific Writing',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Scientific communication, writing experimental research papers, and bioethics.',
    prerequisiteText: 'BIO SCI 99.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHEM_1A',
    code: 'CHEM 1A',
    title: 'General Chemistry I',
    department: 'CHEM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Atomic structure, periodic table, chemical bonding, gases, and stoichiometry.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHEM_1B',
    code: 'CHEM 1B',
    title: 'General Chemistry II',
    department: 'CHEM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Chemical thermodynamics, equilibrium, acids and bases, and electrochemistry.',
    prerequisiteText: 'CHEM 1A with C- or better.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHEM_1C',
    code: 'CHEM 1C',
    title: 'General Chemistry III',
    department: 'CHEM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Kinetics, coordination chemistry, and nuclear chemistry.',
    prerequisiteText: 'CHEM 1B with C- or better.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHEM_51A',
    code: 'CHEM 51A',
    title: 'Organic Chemistry I',
    department: 'CHEM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Structure, bonding, stereochemistry, and reactions of carbon compounds.',
    prerequisiteText: 'CHEM 1C with C- or better.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },

  // =========================================================================
  // Physics & Engineering
  // =========================================================================
  {
    id: 'PHYSICS_7C',
    code: 'PHYSICS 7C',
    title: 'Classical Physics: Mechanics',
    department: 'PHYSICS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Newtonian mechanics, work and energy, conservation laws, oscillations, and gravitation.',
    prerequisiteText: 'MATH 2A with C or better.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHYSICS_7D',
    code: 'PHYSICS 7D',
    title: 'Classical Physics: Electricity & Magnetism',
    department: 'PHYSICS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Electrostatics, Gauss law, circuits, magnetic fields, induction, and Maxwell equations.',
    prerequisiteText: 'PHYSICS 7C and MATH 2B.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHYSICS_7E',
    code: 'PHYSICS 7E',
    title: 'Classical Physics: Waves, Fluids, and Optics',
    department: 'PHYSICS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Fluid mechanics, wave motion, sound, geometric and wave optics, and thermal physics.',
    prerequisiteText: 'PHYSICS 7C and MATH 2B.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHYSICS_3A',
    code: 'PHYSICS 3A',
    title: 'Basic Physics I',
    department: 'PHYSICS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Non-calculus physics covering mechanics, fluids, and heat for life sciences.',
    prerequisiteText: 'MATH 2A or MATH 5A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_10',
    code: 'ENGRMAE 10',
    title: 'Introduction to Engineering Computations',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Engineering computational techniques and MATLAB programming.',
    prerequisiteText: 'MATH 2A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_30',
    code: 'ENGRMAE 30',
    title: 'Statics',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Force systems, equilibrium, trusses, friction, centroids, and moments of inertia.',
    prerequisiteText: 'PHYSICS 7C and MATH 2D.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },

  // =========================================================================
  // Economics & Management
  // =========================================================================
  {
    id: 'ECON_20A',
    code: 'ECON 20A',
    title: 'Basic Economics I (Microeconomics)',
    department: 'ECON',
    units: 4,
    catalogYear: '2026-27',
    description: 'Supply and demand, market structures, price elasticity, and consumer theory.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ECON_20B',
    code: 'ECON 20B',
    title: 'Basic Economics II (Macroeconomics)',
    department: 'ECON',
    units: 4,
    catalogYear: '2026-27',
    description: 'National income, aggregate demand and supply, inflation, and monetary/fiscal policy.',
    prerequisiteText: 'ECON 20A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ECON_100A',
    code: 'ECON 100A',
    title: 'Intermediate Economics I',
    department: 'ECON',
    units: 4,
    catalogYear: '2026-27',
    description: 'Theory of resource allocation, consumer behavior, and production functions.',
    prerequisiteText: 'ECON 20A and MATH 2A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MGMT_1',
    code: 'MGMT 1',
    title: 'Introduction to Business Management',
    department: 'MGMT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Foundations of business enterprises, marketing, ethics, and strategic planning.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MGMT_30A',
    code: 'MGMT 30A',
    title: 'Principles of Accounting I',
    department: 'MGMT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Financial accounting theory and recording of business transactions.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MGMT_30B',
    code: 'MGMT 30B',
    title: 'Principles of Accounting II',
    department: 'MGMT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Managerial accounting concepts, cost behavior, budgeting, and performance metrics.',
    prerequisiteText: 'MGMT 30A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },

  // =========================================================================
  // Social Sciences & Humanities Core
  // =========================================================================
  {
    id: 'PSYCH_9A',
    code: 'PSYCH 9A',
    title: 'Psychology Fundamentals I',
    department: 'PSYCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Brain structure, perception, consciousness, and neurological foundations.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'POL_SCI_21A',
    code: 'POL SCI 21A',
    title: 'Introduction to American Government',
    department: 'POL SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Constitutional basis of American government, branches of power, and civil liberties.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCIOL_1',
    code: 'SOCIOL 1',
    title: 'Introduction to Sociology',
    department: 'SOCIOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Basic sociological concepts, culture, socialization, social inequality, and institutions.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCECOL_10',
    code: 'SOCECOL 10',
    title: 'Social Ecology Fundamentals',
    department: 'SOCECOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Interdisciplinary study of environments, human behavior, policy, and social issues.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGLISH_8',
    code: 'ENGLISH 8',
    title: 'Reading and Writing About Literature',
    department: 'ENGLISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Literary analysis, critical close reading, and interpretive essays.',
    prerequisiteText: 'Satisfactory completion of lower-division writing.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHILOS_1',
    code: 'PHILOS 1',
    title: 'Introduction to Philosophy',
    department: 'PHILOS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Classic philosophical dilemmas concerning existence, knowledge, free will, and morality.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DRAMA_10',
    code: 'DRAMA 10',
    title: 'Introduction to Theatre',
    department: 'DRAMA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Appreciation of dramatic literature, stagecraft, directing, and acting history.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_1A',
    code: 'ART 1A',
    title: 'Art History Survey: Prehistory to Gothic',
    department: 'ART',
    units: 4,
    catalogYear: '2026-27',
    description: 'Visual culture and architectural monuments of the Western world.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PUBHLTH_1',
    code: 'PUBHLTH 1',
    title: 'Principles of Public Health',
    department: 'PUBHLTH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Public health principles, epidemiology, biostatistics, and disease prevention.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EDUC_50',
    code: 'EDUC 50',
    title: 'Foundations of Education',
    department: 'EDUC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Historical, sociological, and philosophical foundations of American public education.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_3D',
    code: 'MATH 3D',
    title: 'Elementary Differential Equations',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Linear ordinary differential equations, series solutions, Laplace transforms, and linear systems.',
    prerequisiteText: 'MATH 2D and MATH 3A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ICS_45J',
    code: 'ICS 45J',
    title: 'Programming in Java as a Second Language',
    department: 'ICS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Core concepts of Java for students who already know another programming language: objects, inheritance, exceptions, GUI, collections, and I/O.',
    prerequisiteText: 'ICS 33 or equivalent.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ECON_122A',
    code: 'ECON 122A',
    title: 'Introduction to Econometrics I',
    department: 'ECON',
    units: 4,
    catalogYear: '2026-27',
    description: 'Statistical estimation of economic models, ordinary least squares regression, hypothesis testing, and specification analysis.',
    prerequisiteText: 'ECON 20A, ECON 20B, and STATS 67.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_159A',
    code: 'EECS 159A',
    title: 'Senior Design Project I',
    department: 'EECS',
    units: 3,
    catalogYear: '2026-27',
    description: 'First quarter of team capstone design in electrical or computer engineering. Problem specification, feasibility, schematic capture.',
    prerequisiteText: 'Senior standing in EECS.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_159B',
    code: 'EECS 159B',
    title: 'Senior Design Project II',
    department: 'EECS',
    units: 3,
    catalogYear: '2026-27',
    description: 'Second quarter of team capstone design in electrical or computer engineering. PCB fabrication, testing, design review.',
    prerequisiteText: 'EECS 159A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_52',
    code: 'ENGRMAE 52',
    title: 'Computer-Aided Design and Graphics',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Parametric 3D solid modeling, engineering drafting standards, tolerances, and assembly kinematics.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_80',
    code: 'ENGRMAE 80',
    title: 'Dynamics',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Kinematics and kinetics of particles and rigid bodies. Newton\'s laws, impulse-momentum, and work-energy principles.',
    prerequisiteText: 'ENGRMAE 30 and MATH 2D.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_106',
    code: 'ENGRMAE 106',
    title: 'Mechanical Systems Laboratory',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Experimental verification of mechanical systems, transducers, strain gages, and digital data acquisition.',
    prerequisiteText: 'ENGRMAE 150.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_112',
    code: 'ENGRMAE 112',
    title: 'Propulsion and Power Systems',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Thermodynamics of propulsion engines, turbojets, turbofans, and rocket propulsion mechanics.',
    prerequisiteText: 'ENGRMAE 130A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_120',
    code: 'ENGRMAE 120',
    title: 'Heat and Mass Transfer',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Conduction, convection, and radiation heat transfer. Thermal resistance networks and heat exchangers.',
    prerequisiteText: 'ENGRMAE 130A and MATH 3D.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_130A',
    code: 'ENGRMAE 130A',
    title: 'Introduction to Fluid Mechanics',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Fluid properties, statics, Bernoulli equation, control volume momentum, Navier-Stokes fundamentals.',
    prerequisiteText: 'MATH 2D and PHYSICS 7C.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_150',
    code: 'ENGRMAE 150',
    title: 'Mechanics of Materials',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Stress and strain relationships, axial loading, torsion, bending moments, transverse shear, and beam deflection.',
    prerequisiteText: 'ENGRMAE 30 and MATH 2D.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_188',
    code: 'ENGRMAE 188',
    title: 'Engineering Design Project I',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'First quarter of senior capstone design team project. Proposal, conceptual design, engineering specifications.',
    prerequisiteText: 'Senior standing in MAE.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_189',
    code: 'ENGRMAE 189',
    title: 'Engineering Design Project II',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Final quarter of senior capstone design project. Prototype fabrication, functional testing, final presentation.',
    prerequisiteText: 'ENGRMAE 188.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_136',
    code: 'ENGRMAE 136',
    title: 'Aerodynamics',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Subsonic and supersonic aerodynamics, airfoil theory, finite wings, induced drag, and shock waves.',
    prerequisiteText: 'ENGRMAE 130A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_158',
    code: 'ENGRMAE 158',
    title: 'Aircraft Performance',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Steady level flight, climb, glide, range and endurance, takeoff and landing performance.',
    prerequisiteText: 'ENGRMAE 136.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRMAE_159',
    code: 'ENGRMAE 159',
    title: 'Aircraft Design',
    department: 'ENGRMAE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Conceptual aircraft sizing, structural layout, flight stability, control surfaces, and regulatory constraints.',
    prerequisiteText: 'ENGRMAE 158.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_10',
    code: 'EECS 10',
    title: 'Computational Methods in Electrical and Computer Engineering',
    department: 'EECS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Structured programming in C for electrical engineering applications, memory manipulation, and numeric methods.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_70A',
    code: 'EECS 70A',
    title: 'Network Analysis I',
    department: 'EECS',
    units: 4,
    catalogYear: '2026-27',
    description: 'DC and AC linear circuit analysis, Kirchhoff laws, node/mesh analysis, Thevenin/Norton equivalents, op-amps.',
    prerequisiteText: 'MATH 2D and PHYSICS 7D.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_70B',
    code: 'EECS 70B',
    title: 'Network Analysis II',
    department: 'EECS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Laplace transforms, frequency response, Bode plots, Fourier series, two-port networks, passive/active filter design.',
    prerequisiteText: 'EECS 70A and MATH 3D.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_150',
    code: 'EECS 150',
    title: 'Advanced Systems Electronics',
    department: 'EECS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Semiconductor device modeling, BJT/MOSFET differential amplifiers, feedback topologies, stability compensation.',
    prerequisiteText: 'EECS 70B.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_160A',
    code: 'EECS 160A',
    title: 'Electromagnetic Field Waves',
    department: 'EECS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Maxwell\'s equations, plane wave propagation, reflection and transmission at boundaries, transmission lines.',
    prerequisiteText: 'EECS 70A and MATH 3D.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_170A',
    code: 'EECS 170A',
    title: 'Electronics I',
    department: 'EECS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Physics of semiconductor devices, pn junctions, Schottky barriers, diode circuits, MOS capacitors.',
    prerequisiteText: 'EECS 70A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_170B',
    code: 'EECS 170B',
    title: 'Electronics II',
    department: 'EECS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Bipolar and field-effect transistor circuit design, small-signal models, frequency response.',
    prerequisiteText: 'EECS 170A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EECS_180A',
    code: 'EECS 180A',
    title: 'Engineering Applied Optics',
    department: 'EECS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Geometrical and wave optics, interference, diffraction, lasers, fiber optics, and photon detectors.',
    prerequisiteText: 'EECS 160A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BME_1',
    code: 'BME 1',
    title: 'Introduction to Biomedical Engineering',
    department: 'BME',
    units: 4,
    catalogYear: '2026-27',
    description: 'Overview of biomedical engineering disciplines: bioinstrumentation, biomaterials, biomechanics, cellular engineering.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BME_110A',
    code: 'BME 110A',
    title: 'Biomechanics I',
    department: 'BME',
    units: 4,
    catalogYear: '2026-27',
    description: 'Statics and dynamics of the human musculoskeletal system, continuum mechanics, stress analysis of tissues.',
    prerequisiteText: 'MATH 2D and PHYSICS 7C.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BME_120',
    code: 'BME 120',
    title: 'Sensory and Motor Systems',
    department: 'BME',
    units: 4,
    catalogYear: '2026-27',
    description: 'Engineering models of visual, auditory, and motor control physiological feedback loops.',
    prerequisiteText: 'BME 1.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BME_130',
    code: 'BME 130',
    title: 'Biomedical Signals and Systems',
    department: 'BME',
    units: 4,
    catalogYear: '2026-27',
    description: 'Continuous and discrete signals, biosignal acquisition (ECG, EEG, EMG), Fourier transforms, digital filters.',
    prerequisiteText: 'MATH 3D.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BME_140',
    code: 'BME 140',
    title: 'Bioinstrumentation',
    department: 'BME',
    units: 4,
    catalogYear: '2026-27',
    description: 'Transducers, biosensors, operational amplifier circuits, electrical safety, clinical telemetry.',
    prerequisiteText: 'BME 130.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BME_180A',
    code: 'BME 180A',
    title: 'Biomedical Engineering Senior Design I',
    department: 'BME',
    units: 3,
    catalogYear: '2026-27',
    description: 'Needs assessment, regulatory FDA pathways, design controls, risk management, and prototyping.',
    prerequisiteText: 'Senior standing in BME.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BME_180B',
    code: 'BME 180B',
    title: 'Biomedical Engineering Senior Design II',
    department: 'BME',
    units: 3,
    catalogYear: '2026-27',
    description: 'Implementation, iterative benchtop testing, verification protocols.',
    prerequisiteText: 'BME 180A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BME_180C',
    code: 'BME 180C',
    title: 'Biomedical Engineering Senior Design III',
    department: 'BME',
    units: 3,
    catalogYear: '2026-27',
    description: 'Final medical device validation, design freeze, clinical symposium presentation.',
    prerequisiteText: 'BME 180B.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRCEE_121',
    code: 'ENGRCEE 121',
    title: 'Transportation Systems Engineering',
    department: 'ENGRCEE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Traffic flow theory, geometric roadway design, signalized intersections, and transit logistics.',
    prerequisiteText: 'MATH 2B.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRCEE_130',
    code: 'ENGRCEE 130',
    title: 'Structural Analysis',
    department: 'ENGRCEE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Determinate and indeterminate structures, moment-area method, virtual work, stiffness matrix methods.',
    prerequisiteText: 'ENGRMAE 150.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRCEE_150',
    code: 'ENGRCEE 150',
    title: 'Mechanics of Materials',
    department: 'ENGRCEE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Civil engineering elasticity, beam bending, column buckling, and shear flow.',
    prerequisiteText: 'ENGRMAE 30.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRCEE_160',
    code: 'ENGRCEE 160',
    title: 'Environmental Engineering Process Principles',
    department: 'ENGRCEE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Mass balances, water quality parameters, chemical equilibria in natural aqueous systems.',
    prerequisiteText: 'CHEM 1B.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRCEE_181A',
    code: 'ENGRCEE 181A',
    title: 'Civil Engineering Senior Design I',
    department: 'ENGRCEE',
    units: 3,
    catalogYear: '2026-27',
    description: 'Comprehensive design project covering geotechnical, structural, water, and environmental constraints.',
    prerequisiteText: 'Senior standing in CEE.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGRCEE_181B',
    code: 'ENGRCEE 181B',
    title: 'Civil Engineering Senior Design II',
    department: 'ENGRCEE',
    units: 3,
    catalogYear: '2026-27',
    description: 'Final civil engineering design drawings, specifications, cost estimation, environmental impact reports.',
    prerequisiteText: 'ENGRCEE 181A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CBE_110',
    code: 'CBE 110',
    title: 'Reaction Engineering and Chemical Kinetics',
    department: 'CBE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Homogeneous and heterogeneous reaction kinetics, batch, CSTR, and plug-flow reactor design.',
    prerequisiteText: 'MATH 3D and CHEM 1C.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CBE_120A',
    code: 'CBE 120A',
    title: 'Transport Modeling I: Momentum Transfer',
    department: 'CBE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Viscous flow, differential balances, boundary layer theory, pipe networks, turbulent flow.',
    prerequisiteText: 'MATH 3D.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CBE_130A',
    code: 'CBE 130A',
    title: 'Separation Processes',
    department: 'CBE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Phase equilibria, distillation, liquid-liquid extraction, gas absorption, membrane separations.',
    prerequisiteText: 'CBE 110.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CBE_140A',
    code: 'CBE 140A',
    title: 'Chemical Engineering Thermodynamics',
    department: 'CBE',
    units: 4,
    catalogYear: '2026-27',
    description: 'First and second laws of thermodynamics, equations of state, fugacity, chemical reaction equilibria.',
    prerequisiteText: 'MATH 2D.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CBE_160',
    code: 'CBE 160',
    title: 'Chemical Engineering Laboratory I',
    department: 'CBE',
    units: 3,
    catalogYear: '2026-27',
    description: 'Pilot scale experimentation in fluid flow, heat exchangers, and chemical reactor dynamics.',
    prerequisiteText: 'CBE 120A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CBE_161',
    code: 'CBE 161',
    title: 'Chemical Engineering Laboratory II',
    department: 'CBE',
    units: 3,
    catalogYear: '2026-27',
    description: 'Distillation columns, membrane separators, and process safety protocol evaluation.',
    prerequisiteText: 'CBE 160.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MSE_141',
    code: 'MSE 141',
    title: 'Mechanical Properties of Materials',
    department: 'MSE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Dislocation mechanics, strengthening mechanisms, fracture, fatigue, and creep in metals and ceramics.',
    prerequisiteText: 'PHYSICS 7C.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MSE_151',
    code: 'MSE 151',
    title: 'Polymer Science and Engineering',
    department: 'MSE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Polymer synthesis, molar mass distribution, viscoelasticity, glass transition, and polymer processing.',
    prerequisiteText: 'CHEM 1B.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MSE_155',
    code: 'MSE 155',
    title: 'Electronic and Photonic Materials',
    department: 'MSE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Band theory, dielectric, magnetic, optical, and superconducting properties of solid-state materials.',
    prerequisiteText: 'PHYSICS 7D.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MSE_164',
    code: 'MSE 164',
    title: 'Materials Characterization Techniques',
    department: 'MSE',
    units: 4,
    catalogYear: '2026-27',
    description: 'X-ray diffraction (XRD), scanning electron microscopy (SEM), TEM, and spectroscopy.',
    prerequisiteText: 'MSE 141.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENVE_114',
    code: 'ENVE 114',
    title: 'Water Resources and Water Quality',
    department: 'ENVE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Hydrologic cycle, surface water runoff, groundwater hydraulics, and municipal water purification systems.',
    prerequisiteText: 'CHEM 1B.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENVE_130',
    code: 'ENVE 130',
    title: 'Air Pollution Physics and Chemistry',
    department: 'ENVE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Atmospheric dispersion modeling, aerosol dynamics, criteria pollutant formation, and industrial emission scrubbers.',
    prerequisiteText: 'CHEM 1C.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENVE_162',
    code: 'ENVE 162',
    title: 'Hazardous Waste Engineering and Remediation',
    department: 'ENVE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Fate and transport of subsurface contaminants, bioremediation, phytoremediation, and landfill containment design.',
    prerequisiteText: 'ENVE 114.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'IN4MATX_131',
    code: 'IN4MATX 131',
    title: 'Human-Computer Interaction',
    department: 'IN4MATX',
    units: 4,
    catalogYear: '2026-27',
    description: 'Usability principles, heuristic evaluation, wireframing, cognitive walkthroughs, and user-centered design loops.',
    prerequisiteText: 'IN4MATX 43.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'IN4MATX_143',
    code: 'IN4MATX 143',
    title: 'Information Visualization',
    department: 'IN4MATX',
    units: 4,
    catalogYear: '2026-27',
    description: 'Perceptual foundations of data visualization, dashboard architectures, visual encoding techniques.',
    prerequisiteText: 'ICS 33.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'IN4MATX_151',
    code: 'IN4MATX 151',
    title: 'Project Management',
    department: 'IN4MATX',
    units: 4,
    catalogYear: '2026-27',
    description: 'Agile and Scrum methodologies, velocity estimation, project governance, and stakeholder alignment.',
    prerequisiteText: 'IN4MATX 43.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'IN4MATX_161',
    code: 'IN4MATX 161',
    title: 'Social Analysis of Computing',
    department: 'IN4MATX',
    units: 4,
    catalogYear: '2026-27',
    description: 'Socio-technical systems, digital divide, algorithmic bias, privacy regulations, and ethical AI deployment.',
    prerequisiteText: 'Satisfactory completion of lower-division writing.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GDIM_25',
    code: 'GDIM 25',
    title: 'Games and Society',
    department: 'GDIM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Cultural, political, and artistic dimensions of video games as interactive mass media.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GDIM_31',
    code: 'GDIM 31',
    title: 'Game Prototyping and Mechanics',
    department: 'GDIM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Rapid paper and digital prototyping, core gameplay loops, state management, and playtesting feedback.',
    prerequisiteText: 'ICS 31.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GDIM_41',
    code: 'GDIM 41',
    title: 'Game Production Pipeline',
    department: 'GDIM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Cross-functional game team roles, asset pipelines, version control with Git LFS, milestone schedules.',
    prerequisiteText: 'GDIM 31.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GDIM_161',
    code: 'GDIM 161',
    title: 'Multiplayer Game Systems',
    department: 'GDIM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Client-server synchronization, lag compensation, lobby matchmaking, authoritative physics architectures.',
    prerequisiteText: 'ICS 46.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GDIM_167',
    code: 'GDIM 167',
    title: 'Narrative Design in Games',
    department: 'GDIM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Branching narrative engines, environmental storytelling, ludonarrative harmony, and dialogue node trees.',
    prerequisiteText: 'GDIM 25.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GDIM_168',
    code: 'GDIM 168',
    title: 'Game Capstone Project I',
    department: 'GDIM',
    units: 4,
    catalogYear: '2026-27',
    description: 'First phase of senior studio game production. Vertical slice prototype, art bible, engine architecture.',
    prerequisiteText: 'Senior standing in GDIM.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GDIM_169',
    code: 'GDIM 169',
    title: 'Game Capstone Project II',
    department: 'GDIM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Beta hardening, playtesting telemetry, storefront submission, final public showcase build.',
    prerequisiteText: 'GDIM 168.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CS_113',
    code: 'CS 113',
    title: 'Computer Game Development',
    department: 'COMPSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Real-time 3D game engine programming, shader graphs, scene graphs, spatial audio, and input managers.',
    prerequisiteText: 'ICS 46.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHYSICS_111A',
    code: 'PHYSICS 111A',
    title: 'Field Theory and Electrodynamics I',
    department: 'PHYSICS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Electrostatics, Laplace\'s equation, boundary-value problems, dielectric media, and magnetic vector potentials.',
    prerequisiteText: 'PHYSICS 7D and MATH 2D.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHYSICS_112A',
    code: 'PHYSICS 112A',
    title: 'Mathematical Physics I',
    department: 'PHYSICS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Complex variables, residue calculus, Fourier and Laplace transforms, orthogonal function expansions.',
    prerequisiteText: 'MATH 3D.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHYSICS_113A',
    code: 'PHYSICS 113A',
    title: 'Classical Mechanics I',
    department: 'PHYSICS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Lagrangian and Hamiltonian mechanics, central force motion, rigid body rotations, small oscillations.',
    prerequisiteText: 'PHYSICS 7C and MATH 3D.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHYSICS_115A',
    code: 'PHYSICS 115A',
    title: 'Quantum Mechanics I',
    department: 'PHYSICS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Wave mechanics, Schrodinger equation in 1D and 3D, harmonic oscillator, angular momentum, hydrogen atom.',
    prerequisiteText: 'PHYSICS 112A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHYSICS_120',
    code: 'PHYSICS 120',
    title: 'Electronics for Scientists',
    department: 'PHYSICS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Analog instrumentation circuits, operational amplifiers, lock-in detection, and ADC/DAC interfacing.',
    prerequisiteText: 'PHYSICS 7D.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHEM_51B',
    code: 'CHEM 51B',
    title: 'Organic Chemistry II',
    department: 'CHEM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Aromatic substitutions, carbonyl additions and condensations, NMR/IR spectroscopy elucidations.',
    prerequisiteText: 'CHEM 51A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHEM_51C',
    code: 'CHEM 51C',
    title: 'Organic Chemistry III',
    department: 'CHEM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Carboxylic acid derivatives, amine synthesis, pericyclic reactions, polymers, and biomolecules.',
    prerequisiteText: 'CHEM 51B.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHEM_107',
    code: 'CHEM 107',
    title: 'Inorganic Chemistry',
    department: 'CHEM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Crystal field theory, transition metal coordination complexes, organometallics, and bioinorganic chemistry.',
    prerequisiteText: 'CHEM 1C.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHEM_131A',
    code: 'CHEM 131A',
    title: 'Physical Chemistry: Thermodynamics',
    department: 'CHEM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Statistical thermodynamics, chemical potential, phase diagrams, electrochemistry, and non-ideal solutions.',
    prerequisiteText: 'MATH 2D and PHYSICS 7D.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHEM_131B',
    code: 'CHEM 131B',
    title: 'Physical Chemistry: Quantum Mechanics',
    department: 'CHEM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Postulates of quantum chemistry, molecular orbital theory, rotational and vibrational spectroscopy.',
    prerequisiteText: 'CHEM 131A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHEM_152',
    code: 'CHEM 152',
    title: 'Advanced Organic Chemistry',
    department: 'CHEM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Asymmetric organic synthesis, retrosynthetic analysis, transition metal catalyzed cross-coupling.',
    prerequisiteText: 'CHEM 51C.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EARTHSS_1',
    code: 'EARTHSS 1',
    title: 'Introduction to Earth System Science',
    department: 'EARTHSS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Integrated physical and chemical cycles of the geosphere, hydrosphere, atmosphere, and biosphere.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EARTHSS_51',
    code: 'EARTHSS 51',
    title: 'Land and Oceans',
    department: 'EARTHSS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Geomorphology, plate tectonics, coastal processes, ocean salinity distribution, and thermohaline circulation.',
    prerequisiteText: 'EARTHSS 1.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EARTHSS_53',
    code: 'EARTHSS 53',
    title: 'Atmosphere and Climate',
    department: 'EARTHSS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Atmospheric thermodynamics, planetary boundary layer, radiation balance, Coriolis effect, global wind patterns.',
    prerequisiteText: 'MATH 2A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EARTHSS_55',
    code: 'EARTHSS 55',
    title: 'Earth\'s Biogeochemical Cycles',
    department: 'EARTHSS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Global carbon, nitrogen, phosphorus, and sulfur cycles across geological eras and modern anthropogenic forcing.',
    prerequisiteText: 'CHEM 1A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EARTHSS_114',
    code: 'EARTHSS 114',
    title: 'Global Climate Change',
    department: 'EARTHSS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Paleoclimate proxies, climate sensitivity, radiative forcing, feedback loops, and IPCC projection models.',
    prerequisiteText: 'EARTHSS 53.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EARTHSS_124',
    code: 'EARTHSS 124',
    title: 'Oceanography',
    department: 'EARTHSS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Physical, chemical, and biological oceanography, marine ecosystems, ocean acidification, and carbon sequestration.',
    prerequisiteText: 'EARTHSS 51.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EARTHSS_144',
    code: 'EARTHSS 144',
    title: 'Atmospheric Chemistry',
    department: 'EARTHSS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Tropospheric ozone, stratospheric ozone depletion, greenhouse gas lifespans, and urban photochemical smog.',
    prerequisiteText: 'CHEM 1C.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_D103',
    code: 'BIO SCI D103',
    title: 'Cell Biology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Organelle ultrastructure, vesicular trafficking, cytoskeletal dynamics, and signal transduction cascades.',
    prerequisiteText: 'BIO SCI 99.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_D104',
    code: 'BIO SCI D104',
    title: 'Developmental Biology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Embryogenesis, morphogen gradients, axis determination, organogenesis, and homeotic gene regulation.',
    prerequisiteText: 'BIO SCI D103.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_D145',
    code: 'BIO SCI D145',
    title: 'Stem Cell Biology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Pluripotency, induced pluripotent stem cells (iPSCs), niche microenvironments, and regenerative therapeutics.',
    prerequisiteText: 'BIO SCI D103.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_E106',
    code: 'BIO SCI E106',
    title: 'Ecology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Population dynamics, community competition and mutualism, trophic webs, and ecosystem nutrient flux.',
    prerequisiteText: 'BIO SCI 94.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_E115',
    code: 'BIO SCI E115',
    title: 'Evolution',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Phylogenetic reconstruction, natural selection, genetic drift, speciation, and molecular clock methods.',
    prerequisiteText: 'BIO SCI 97.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_E138',
    code: 'BIO SCI E138',
    title: 'Conservation Biology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Biodiversity hotspots, habitat fragmentation, endangered species survival plans, and ecosystem resilience.',
    prerequisiteText: 'BIO SCI E106.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_M114',
    code: 'BIO SCI M114',
    title: 'Advanced Biochemistry',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Enzyme kinetics, allosteric regulation, metabolic integration, and protein structural conformations.',
    prerequisiteText: 'BIO SCI 98.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_M116',
    code: 'BIO SCI M116',
    title: 'Molecular Biology of Gene Expression',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Transcriptional initiation, chromatin remodeling, alternative splicing, and translational control.',
    prerequisiteText: 'BIO SCI 99.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_M118',
    code: 'BIO SCI M118',
    title: 'Molecular Biology Core Laboratory',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Recombinant DNA methods, CRISPR gene editing assays, Western blotting, and qPCR analysis.',
    prerequisiteText: 'BIO SCI 99.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_M121',
    code: 'BIO SCI M121',
    title: 'Immunology with Hematology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Innate and adaptive immune defenses, V(D)J recombination, major histocompatibility complex (MHC), and auto-immunity.',
    prerequisiteText: 'BIO SCI 99.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_M122',
    code: 'BIO SCI M122',
    title: 'General Microbiology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Bacterial physiology, bacterial pathogenesis, antibiotic resistance mechanisms, and microbial ecology.',
    prerequisiteText: 'BIO SCI 98.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_M124',
    code: 'BIO SCI M124',
    title: 'Virology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Viral taxonomy, entry mechanisms, replication cycles of RNA/DNA viruses, and antiviral therapeutics.',
    prerequisiteText: 'BIO SCI 99.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_N110',
    code: 'BIO SCI N110',
    title: 'Neurobiology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Resting membrane potential, action potential propagation, synaptic transmission, and neural circuit plasticity.',
    prerequisiteText: 'BIO SCI 93.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_N115',
    code: 'BIO SCI N115',
    title: 'Cognitive Neuroscience',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Neural basis of human perception, memory formation, language acquisition, and executive decision-making.',
    prerequisiteText: 'BIO SCI N110.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_N120',
    code: 'BIO SCI N120',
    title: 'Neural Systems and Circuitry',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Visual cortex hierarchies, auditory tuning curves, basal ganglia motor loops, and cerebellar control.',
    prerequisiteText: 'BIO SCI N110.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_N152',
    code: 'BIO SCI N152',
    title: 'Developmental Neurobiology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Neural tube induction, neurogenesis, axon guidance cues, synapse pruning, and critical developmental windows.',
    prerequisiteText: 'BIO SCI N110.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MGMT_101',
    code: 'MGMT 101',
    title: 'Management and Organization',
    department: 'MGMT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Leadership strategies, organizational structures, motivation theory, and corporate cultural transformation.',
    prerequisiteText: 'MGMT 1.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MGMT_102',
    code: 'MGMT 102',
    title: 'Managing Organizational Behavior',
    department: 'MGMT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Team dynamics, conflict negotiation, managerial decision heuristics, and ethical workplace leadership.',
    prerequisiteText: 'MGMT 1.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MGMT_105',
    code: 'MGMT 105',
    title: 'Marketing Management',
    department: 'MGMT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Market segmentation, positioning, consumer behavior, brand equity, pricing strategies, and omnichannel marketing.',
    prerequisiteText: 'ECON 20A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MGMT_107',
    code: 'MGMT 107',
    title: 'Information Technology in Management',
    department: 'MGMT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Enterprise resource planning (ERP), digital transformation, cloud infrastructures, and analytics-driven operations.',
    prerequisiteText: 'MGMT 1.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MGMT_109',
    code: 'MGMT 109',
    title: 'Operations Management',
    department: 'MGMT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Supply chain optimization, inventory control models, total quality management, and queuing theory.',
    prerequisiteText: 'MATH 2A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MGMT_110',
    code: 'MGMT 110',
    title: 'Corporate Finance',
    department: 'MGMT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Discounted cash flow, capital budgeting, CAPM, cost of capital, dividend policy, and valuation modeling.',
    prerequisiteText: 'MGMT 30A and MATH 2A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MGMT_190',
    code: 'MGMT 190',
    title: 'Strategic Management Capstone',
    department: 'MGMT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Competitive analysis, Porter\'s five forces, business model innovation, mergers and acquisitions case studies.',
    prerequisiteText: 'Senior standing in Business Administration.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ECON_100B',
    code: 'ECON 100B',
    title: 'Intermediate Macroeconomics',
    department: 'ECON',
    units: 4,
    catalogYear: '2026-27',
    description: 'National income determination, IS-LM framework, monetary and fiscal policy, inflation, and growth models.',
    prerequisiteText: 'ECON 20A and ECON 20B and MATH 2A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ECON_100C',
    code: 'ECON 100C',
    title: 'Intermediate Economics III: Advanced Micro',
    department: 'ECON',
    units: 4,
    catalogYear: '2026-27',
    description: 'General equilibrium theory, welfare economics, externalities, public goods, and asymmetric information.',
    prerequisiteText: 'ECON 100A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ECON_122B',
    code: 'ECON 122B',
    title: 'Introduction to Econometrics II',
    department: 'ECON',
    units: 4,
    catalogYear: '2026-27',
    description: 'Multiple regression, heteroskedasticity, instrumental variables, panel data, and time-series forecasting.',
    prerequisiteText: 'ECON 122A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ECON_134A',
    code: 'ECON 134A',
    title: 'Corporate Finance',
    department: 'ECON',
    units: 4,
    catalogYear: '2026-27',
    description: 'Asset pricing, portfolio theory, capital asset pricing model, options, and market efficiency.',
    prerequisiteText: 'ECON 100A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ECON_135',
    code: 'ECON 135',
    title: 'Business Forecasting',
    department: 'ECON',
    units: 4,
    catalogYear: '2026-27',
    description: 'ARIMA models, seasonal decomposition, exponential smoothing, and business cycle prediction.',
    prerequisiteText: 'ECON 122A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'POL_SCI_41A',
    code: 'POL SCI 41A',
    title: 'Introduction to International Relations',
    department: 'POL SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Theories of interstate conflict, diplomacy, international law, non-state actors, and international trade.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'POL_SCI_51A',
    code: 'POL SCI 51A',
    title: 'Introduction to Politics Around the World',
    department: 'POL SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comparative politics, regime types, parliamentary vs presidential systems, and democratization.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'POL_SCI_71A',
    code: 'POL SCI 71A',
    title: 'Introduction to Law and Politics',
    department: 'POL SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Judicial review, court procedures, jurisprudence, civil rights, and statutory interpretation.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'POL_SCI_120A',
    code: 'POL SCI 120A',
    title: 'American Political Institutions',
    department: 'POL SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Congressional committees, executive power, regulatory agencies, and the judicial branch in the US.',
    prerequisiteText: 'POL SCI 21A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'POL_SCI_140A',
    code: 'POL SCI 140A',
    title: 'International Security and War',
    department: 'POL SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Nuclear deterrence, asymmetric warfare, cyberwarfare, military alliances, and defense strategies.',
    prerequisiteText: 'POL SCI 41A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'POL_SCI_171A',
    code: 'POL SCI 171A',
    title: 'American Constitutional Law',
    department: 'POL SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Supreme Court jurisprudence, separation of powers, Commerce Clause, and federalism doctrines.',
    prerequisiteText: 'POL SCI 71A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYCH_9B',
    code: 'PSYCH 9B',
    title: 'Psychology Fundamentals II',
    department: 'PSYCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Learning, cognitive representations, memory, language, and intelligence assessment.',
    prerequisiteText: 'PSYCH 9A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYCH_9C',
    code: 'PSYCH 9C',
    title: 'Psychology Fundamentals III',
    department: 'PSYCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Social psychology, developmental stages, personality theory, and psychological disorders.',
    prerequisiteText: 'PSYCH 9B.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYCH_112A',
    code: 'PSYCH 112A',
    title: 'Experimental Psychology',
    department: 'PSYCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Design of psychological experiments, factorial designs, statistical hypothesis testing, and laboratory ethics.',
    prerequisiteText: 'PSYCH 9C.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYCH_112B',
    code: 'PSYCH 112B',
    title: 'Research Methods in Psychology',
    department: 'PSYCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Correlational research, quasi-experiments, observational protocols, survey methodology, and APA writing.',
    prerequisiteText: 'PSYCH 112A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYCH_120A',
    code: 'PSYCH 120A',
    title: 'Cognitive Psychology',
    department: 'PSYCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Attention, mental imagery, concept formation, problem solving, reasoning, and decision-making.',
    prerequisiteText: 'PSYCH 9B.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYCH_130A',
    code: 'PSYCH 130A',
    title: 'Perception and Sensory Processes',
    department: 'PSYCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Psychophysics, visual pathways, color perception, spatial depth perception, and auditory pitch processing.',
    prerequisiteText: 'PSYCH 9A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYCH_140A',
    code: 'PSYCH 140A',
    title: 'Social Psychology',
    department: 'PSYCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Attribution theory, cognitive dissonance, conformity, prejudice and stereotyping, and prosocial behavior.',
    prerequisiteText: 'PSYCH 9C.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COGS_106P',
    code: 'COGS 106P',
    title: 'Programming for Cognitive Science',
    department: 'COGS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Scientific Python for behavioral experiments, reaction time collection, data cleaning, and statistical modeling.',
    prerequisiteText: 'ICS 31.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COGS_107P',
    code: 'COGS 107P',
    title: 'Computational Neuroscience',
    department: 'COGS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Integrate-and-fire neuron models, Hodgkin-Huxley equations, synaptic plasticity algorithms, and neural coding.',
    prerequisiteText: 'MATH 2D and COGS 106P.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COGS_108P',
    code: 'COGS 108P',
    title: 'Neural Networks and Deep Learning',
    department: 'COGS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Multi-layer perceptrons, backpropagation, recurrent neural networks, transformers, and cognitive architecture models.',
    prerequisiteText: 'COGS 106P and MATH 3A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCIOL_2',
    code: 'SOCIOL 2',
    title: 'Social Problems',
    department: 'SOCIOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Structural analysis of poverty, racism, gender violence, healthcare disparities, and mass incarceration.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCIOL_3',
    code: 'SOCIOL 3',
    title: 'Social Psychology',
    department: 'SOCIOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Symbolic interactionism, identity formation, collective behavior, social roles, and deviance.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCIOL_110',
    code: 'SOCIOL 110',
    title: 'Classical Sociological Theory',
    department: 'SOCIOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Foundational texts of Marx, Weber, Durkheim, and Du Bois on capitalism, bureaucracy, and modernity.',
    prerequisiteText: 'SOCIOL 1.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCIOL_120',
    code: 'SOCIOL 120',
    title: 'Sociological Research Methods',
    department: 'SOCIOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Quantitative survey design, interview techniques, participant observation, and statistical cross-tabulation.',
    prerequisiteText: 'SOCIOL 1.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCIOL_180A',
    code: 'SOCIOL 180A',
    title: 'Senior Research Seminar',
    department: 'SOCIOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Independent empirical research project, literature review, data synthesis, and capstone presentation.',
    prerequisiteText: 'SOCIOL 120.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ANTHRO_2A',
    code: 'ANTHRO 2A',
    title: 'Introduction to Sociocultural Anthropology',
    department: 'ANTHRO',
    units: 4,
    catalogYear: '2026-27',
    description: 'Cultural relativism, kinship systems, economic rituals, religious belief systems, and globalization.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ANTHRO_2B',
    code: 'ANTHRO 2B',
    title: 'Introduction to Biological Anthropology',
    department: 'ANTHRO',
    units: 4,
    catalogYear: '2026-27',
    description: 'Hominin fossil record, primate behavior, human genetic adaptation, and evolutionary morphology.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ANTHRO_2C',
    code: 'ANTHRO 2C',
    title: 'Introduction to Archaeology',
    department: 'ANTHRO',
    units: 4,
    catalogYear: '2026-27',
    description: 'Excavation techniques, stratigraphy, radiocarbon dating, ancient settlement patterns, and material culture.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ANTHRO_2D',
    code: 'ANTHRO 2D',
    title: 'Introduction to Language and Culture',
    department: 'ANTHRO',
    units: 4,
    catalogYear: '2026-27',
    description: 'Linguistic anthropology, sociolinguistics, speech communities, multilingualism, and language revitalization.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ANTHRO_100A',
    code: 'ANTHRO 100A',
    title: 'History of Anthropological Theory',
    department: 'ANTHRO',
    units: 4,
    catalogYear: '2026-27',
    description: 'Evolutionism, functionalism, structuralism, post-colonial critiques, and feminist anthropology.',
    prerequisiteText: 'ANTHRO 2A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ANTHRO_100B',
    code: 'ANTHRO 100B',
    title: 'Ethnographic Field Methods',
    department: 'ANTHRO',
    units: 4,
    catalogYear: '2026-27',
    description: 'Participant observation, field notes, ethnographic interviewing, reflexivity, and research ethics.',
    prerequisiteText: 'ANTHRO 100A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ANTHRO_180A',
    code: 'ANTHRO 180A',
    title: 'Senior Anthropological Seminar',
    department: 'ANTHRO',
    units: 4,
    catalogYear: '2026-27',
    description: 'Senior thesis seminar on contemporary anthropological debates and original ethnographic monographs.',
    prerequisiteText: 'ANTHRO 100B.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'INTL_ST_1',
    code: 'INTL ST 1',
    title: 'Introduction to Global Issues',
    department: 'INTL ST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Global migration, transnational corporations, climate justice, human rights treaties, and geopolitical multipolarity.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'INTL_ST_11',
    code: 'INTL ST 11',
    title: 'Global Economy and Development',
    department: 'INTL ST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Bretton Woods institutions, structural adjustment, trade liberalization, microfinance, and global wealth inequality.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'INTL_ST_101',
    code: 'INTL ST 101',
    title: 'Global Security in the 21st Century',
    department: 'INTL ST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Non-traditional security threats: pandemics, cyber espionage, water scarcity, and resource conflicts.',
    prerequisiteText: 'INTL ST 1.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'INTL_ST_102',
    code: 'INTL ST 102',
    title: 'Global Governance and Human Rights',
    department: 'INTL ST',
    units: 4,
    catalogYear: '2026-27',
    description: 'United Nations mechanisms, International Criminal Court, humanitarian intervention norms, and refugee law.',
    prerequisiteText: 'INTL ST 1.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'INTL_ST_183A',
    code: 'INTL ST 183A',
    title: 'Senior Seminar in International Studies',
    department: 'INTL ST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Integrative capstone research project examining a specific regional or global political dilemma.',
    prerequisiteText: 'Senior standing in International Studies.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCECOL_13',
    code: 'SOCECOL 13',
    title: 'Statistical Analysis in Social Ecology',
    department: 'SOCECOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Descriptive and inferential statistics applied to ecological and behavioral data, ANOVA, and linear regression.',
    prerequisiteText: 'MATH 2A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCECOL_15',
    code: 'SOCECOL 15',
    title: 'Research Design',
    department: 'SOCECOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Interdisciplinary inquiry, measurement validity, sampling frames, and field observation protocols.',
    prerequisiteText: 'SOCECOL 10.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCECOL_194W',
    code: 'SOCECOL 194W',
    title: 'Naturalistic Field Research',
    department: 'SOCECOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Community-based research, field observation, qualitative analysis, and upper-division writing intensive seminar.',
    prerequisiteText: 'SOCECOL 10 and lower-division writing.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SOCECOL_195',
    code: 'SOCECOL 195',
    title: 'Field Study Practicum',
    department: 'SOCECOL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Mandatory experiential education placement at an approved Southern California civic or criminal justice agency.',
    prerequisiteText: 'SOCECOL 10 and junior standing.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CRIM_LAW_C7',
    code: 'CRIM/LAW C7',
    title: 'Introduction to Criminology, Law and Society',
    department: 'CLS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Theories of crime etiology, deterrence, criminal justice institutions, law enforcement, and corrections.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CRIM_LAW_C10',
    code: 'CRIM/LAW C10',
    title: 'Crime and Justice in America',
    department: 'CLS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Adjudication processes, bail reform, plea bargaining, sentencing disparities, and prison overpopulation.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CRIM_LAW_C100',
    code: 'CRIM/LAW C100',
    title: 'Advanced Criminological Theory',
    department: 'CLS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Biological, psychological, and sociological theories of deviant behavior, labeling theory, and strain theories.',
    prerequisiteText: 'CRIM/LAW C7.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CRIM_LAW_C101',
    code: 'CRIM/LAW C101',
    title: 'American Law and Society',
    department: 'CLS',
    units: 4,
    catalogYear: '2026-27',
    description: 'The rule of law, legal consciousness, civil litigation, dispute resolution, and socio-legal changes.',
    prerequisiteText: 'CRIM/LAW C7.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CRIM_LAW_C106',
    code: 'CRIM/LAW C106',
    title: 'Crime and Public Policy',
    department: 'CLS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Evidence-based crime prevention, gun control policies, community policing models, and recidivism reduction.',
    prerequisiteText: 'CRIM/LAW C7.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYC_SCI_9A',
    code: 'PSYC SCI 9A',
    title: 'Psychology Fundamentals: Brain and Mind',
    department: 'PSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Neuroscience, sensation, perception, learning, and consciousness in social context.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYC_SCI_9B',
    code: 'PSYC SCI 9B',
    title: 'Psychology Fundamentals: Personality and Society',
    department: 'PSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Social development, emotional regulation, personality constructs, and group dynamics.',
    prerequisiteText: 'PSYC SCI 9A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYC_SCI_11A',
    code: 'PSYC SCI 11A',
    title: 'Psychology and Crime',
    department: 'PSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Forensic psychology, eyewitness testimony, interrogation methods, and psychopathologies of offending.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYC_SCI_102C',
    code: 'PSYC SCI 102C',
    title: 'Abnormal Psychology',
    department: 'PSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'DSM-5 diagnostic criteria for mood, anxiety, psychotic, and personality disorders.',
    prerequisiteText: 'PSYC SCI 9B.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYC_SCI_115D',
    code: 'PSYC SCI 115D',
    title: 'Health Psychology',
    department: 'PSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Biopsychosocial model, stress neuroendocrinology, pain management, and behavioral medicine interventions.',
    prerequisiteText: 'PSYC SCI 9B.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PSYC_SCI_120D',
    code: 'PSYC SCI 120D',
    title: 'Developmental Psychology',
    department: 'PSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Lifespan human development, attachment styles, cognitive transitions, and healthy aging.',
    prerequisiteText: 'PSYC SCI 9B.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'UPPP_4',
    code: 'UPPP 4',
    title: 'Introduction to Urban Studies',
    department: 'UPPP',
    units: 4,
    catalogYear: '2026-27',
    description: 'Historical evolution of metropolitan regions, suburbanization, gentrification, and spatial segregation.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'UPPP_8',
    code: 'UPPP 8',
    title: 'Environmental Analysis and Design',
    department: 'UPPP',
    units: 4,
    catalogYear: '2026-27',
    description: 'Sustainable city planning, GIS spatial modeling, park systems, and transit-oriented development.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'UPPP_100',
    code: 'UPPP 100',
    title: 'Special Topics in Urban Planning',
    department: 'UPPP',
    units: 4,
    catalogYear: '2026-27',
    description: 'Housing affordability policy, climate resilience planning, and municipal zoning reforms.',
    prerequisiteText: 'UPPP 4.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'UPPP_102',
    code: 'UPPP 102',
    title: 'Urban Policy and Governance',
    department: 'UPPP',
    units: 4,
    catalogYear: '2026-27',
    description: 'City councils, regional planning councils, public-private partnerships, and urban municipal finance.',
    prerequisiteText: 'UPPP 4.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'UPPP_115',
    code: 'UPPP 115',
    title: 'Sustainable Cities and Infrastructure',
    department: 'UPPP',
    units: 4,
    catalogYear: '2026-27',
    description: 'Renewable energy microgrids, urban stormwater management, waste diversion, and active transportation networks.',
    prerequisiteText: 'UPPP 8.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGLISH_10',
    code: 'ENGLISH 10',
    title: 'Introduction to Literary Craft',
    department: 'ENGLISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Techniques of fiction, poetry, and creative nonfiction; narrative voice, meter, figurative language.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGLISH_28A',
    code: 'ENGLISH 28A',
    title: 'Poetic Forms and Traditions',
    department: 'ENGLISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Sonnets, villanelles, free verse, ballad meters, and contemporary spoken word poetics.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGLISH_100',
    code: 'ENGLISH 100',
    title: 'Critical Theory and Methods',
    department: 'ENGLISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Psychoanalysis, post-structuralism, post-colonial theory, ecocriticism, and queer literary theory.',
    prerequisiteText: 'ENGLISH 8.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGLISH_101W',
    code: 'ENGLISH 101W',
    title: 'Advanced Literary Writing',
    department: 'ENGLISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Advanced workshop in essayistic argumentation and stylistic rhetoric with upper-division writing credit.',
    prerequisiteText: 'Satisfactory completion of lower-division writing.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGLISH_102A',
    code: 'ENGLISH 102A',
    title: 'British Literature Survey',
    department: 'ENGLISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Chaucer, Shakespeare, Milton, Romantic poets, and Victorian novelists in historical context.',
    prerequisiteText: 'ENGLISH 8.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ENGLISH_103',
    code: 'ENGLISH 103',
    title: 'American Literature Survey',
    department: 'ENGLISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Transcendentalism, Harlem Renaissance, modernism, and contemporary American multicultural fiction.',
    prerequisiteText: 'ENGLISH 8.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'HISTORY_21A',
    code: 'HISTORY 21A',
    title: 'World History to 1500',
    department: 'HISTORY',
    units: 4,
    catalogYear: '2026-27',
    description: 'Early river valley civilizations, classical empires, Silk Road exchanges, and Afro-Eurasian trade networks.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'HISTORY_21B',
    code: 'HISTORY 21B',
    title: 'World History from 1500',
    department: 'HISTORY',
    units: 4,
    catalogYear: '2026-27',
    description: 'Columbian exchange, Atlantic slave trade, Industrial Revolution, imperialism, world wars, and decolonization.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'HISTORY_70A',
    code: 'HISTORY 70A',
    title: 'Early American History',
    department: 'HISTORY',
    units: 4,
    catalogYear: '2026-27',
    description: 'Colonial America, the American Revolution, constitutional formation, slavery, and the Civil War.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'HISTORY_100W',
    code: 'HISTORY 100W',
    title: 'Historical Methods and Writing',
    department: 'HISTORY',
    units: 4,
    catalogYear: '2026-27',
    description: 'Historiography, archival primary source criticism, historical citation systems, and research composition.',
    prerequisiteText: 'Satisfactory completion of lower-division writing.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'HISTORY_102',
    code: 'HISTORY 102',
    title: 'Historical Perspectives',
    department: 'HISTORY',
    units: 4,
    catalogYear: '2026-27',
    description: 'Thematic analysis of social movements, state-building, religious conversions, or intellectual history.',
    prerequisiteText: 'HISTORY 21B.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'HISTORY_190',
    code: 'HISTORY 190',
    title: 'Senior Colloquium in History',
    department: 'HISTORY',
    units: 4,
    catalogYear: '2026-27',
    description: 'Capstone research thesis seminar based on original archival documents and secondary literature synthesis.',
    prerequisiteText: 'HISTORY 100W.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHILOS_2',
    code: 'PHILOS 2',
    title: 'Puzzles and Paradoxes',
    department: 'PHILOS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Zeno\'s paradoxes, prisoner\'s dilemma, sorites paradox, Russell\'s paradox, and philosophical logic.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHILOS_4',
    code: 'PHILOS 4',
    title: 'Introduction to Ethics',
    department: 'PHILOS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Utilitarianism, Kantian deontology, Aristotle\'s virtue ethics, moral relativism, and contemporary applied ethics.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHILOS_10',
    code: 'PHILOS 10',
    title: 'Introduction to Inductive Logic',
    department: 'PHILOS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Probability calculus, Bayesian confirmation theory, scientific induction, and causal inference fallacies.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHILOS_101',
    code: 'PHILOS 101',
    title: 'History of Ancient Philosophy',
    department: 'PHILOS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Pre-Socratics, Plato\'s dialogues (Republic, Meno, Phaedo), and Aristotle\'s Metaphysics and Nicomachean Ethics.',
    prerequisiteText: 'PHILOS 1.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHILOS_102',
    code: 'PHILOS 102',
    title: 'History of Modern Philosophy',
    department: 'PHILOS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Descartes, Spinoza, Leibniz, Locke, Berkeley, Hume, and Kant\'s critical philosophy.',
    prerequisiteText: 'PHILOS 1.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHILOS_103',
    code: 'PHILOS 103',
    title: 'Metaphysics',
    department: 'PHILOS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Ontology, modality, identity through time, free will and determinism, causality, and realism vs anti-realism.',
    prerequisiteText: 'PHILOS 1.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHILOS_104',
    code: 'PHILOS 104',
    title: 'Epistemology',
    department: 'PHILOS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Theories of epistemic justification, Gettier problems, skepticism, foundationalism, and reliabilism.',
    prerequisiteText: 'PHILOS 1.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LIT_JRN_20',
    code: 'LIT JRN 20',
    title: 'Introduction to Literary Journalism',
    department: 'LIT JRN',
    units: 4,
    catalogYear: '2026-27',
    description: 'History and techniques of immersion reporting, fact-based storytelling, and literary essay craft.',
    prerequisiteText: 'Satisfactory completion of lower-division writing.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LIT_JRN_21',
    code: 'LIT JRN 21',
    title: 'Reporting and Interviewing',
    department: 'LIT JRN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Newsroom interviewing strategies, public records searches, FOIA requests, and ethnographic field observation.',
    prerequisiteText: 'LIT JRN 20.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LIT_JRN_100',
    code: 'LIT JRN 100',
    title: 'Advanced Reporting Workshop',
    department: 'LIT JRN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Investigative reporting methods, long-form narrative structure, source verification, and publication ethics.',
    prerequisiteText: 'LIT JRN 21.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LIT_JRN_101A',
    code: 'LIT JRN 101A',
    title: 'Narrative Writing I',
    department: 'LIT JRN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Intensive drafting and workshop revision of narrative journalism feature articles.',
    prerequisiteText: 'LIT JRN 100.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LIT_JRN_101B',
    code: 'LIT JRN 101B',
    title: 'Narrative Writing II',
    department: 'LIT JRN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Senior portfolio compilation, editing, and submission to professional print/digital journalism outlets.',
    prerequisiteText: 'LIT JRN 101A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_HIST_40A',
    code: 'ART HIST 40A',
    title: 'Ancient Mediterranean Art',
    department: 'ART HIST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Art, architecture, and visual archaeology of ancient Egypt, Greece, Etruria, and the Roman Empire.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_HIST_55',
    code: 'ART HIST 55',
    title: 'Modern and Contemporary Art',
    department: 'ART HIST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Impressionism to pop art, minimalism, performance art, conceptual art, and global contemporary biennales.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_HIST_100',
    code: 'ART HIST 100',
    title: 'Art Historical Methodologies',
    department: 'ART HIST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Formalism, iconography, semiotics, Marxist art history, feminist critiques, and postcolonial visual culture.',
    prerequisiteText: 'ART 1A or ART HIST 55.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_HIST_110',
    code: 'ART HIST 110',
    title: 'Curatorial Practices and Museums',
    department: 'ART HIST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Exhibition design, provenance research, museum ethics, conservation, and institutional critique.',
    prerequisiteText: 'ART HIST 100.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_HIST_190W',
    code: 'ART HIST 190W',
    title: 'Senior Thesis in Art History',
    department: 'ART HIST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Advanced research thesis seminar examining original museum artifacts or visual archives with writing credit.',
    prerequisiteText: 'ART HIST 100 and lower-division writing.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COM_LIT_60A',
    code: 'COM LIT 60A',
    title: 'World Literature: Antiquity',
    department: 'COM LIT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Epic of Gilgamesh, Homer, Mahabharata, Confucius, and Virgil in comparative cultural perspective.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COM_LIT_60B',
    code: 'COM LIT 60B',
    title: 'World Literature: Renaissance to Enlightenment',
    department: 'COM LIT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Dante, 1001 Nights, Journey to the West, Cervantes, and Voltaire in translation.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COM_LIT_60C',
    code: 'COM LIT 60C',
    title: 'World Literature: Modern and Global',
    department: 'COM LIT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Dostoevsky, Lu Xun, Garcia Marquez, Achebe, and Murakami examined through translation studies.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COM_LIT_100A',
    code: 'COM LIT 100A',
    title: 'Comparative Literary Theory',
    department: 'COM LIT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Theories of world literature, cosmopolitanism, untranslatability, and transnational genres.',
    prerequisiteText: 'COM LIT 60A or 60B or 60C.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COM_LIT_100B',
    code: 'COM LIT 100B',
    title: 'Cross-Cultural Narrative',
    department: 'COM LIT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comparative study of myths, folktales, adaptations, and postcolonial re-writings across languages.',
    prerequisiteText: 'COM LIT 100A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'COM_LIT_190',
    code: 'COM LIT 190',
    title: 'Senior Capstone in Comparative Literature',
    department: 'COM LIT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Independent comparative thesis comparing texts from at least two distinct linguistic/national traditions.',
    prerequisiteText: 'Senior standing in Comparative Literature.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GLOBAL_1',
    code: 'GLOBAL 1',
    title: 'Introduction to Global Systems',
    department: 'GLOBAL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Historical rise of global capitalism, trade routes, imperial networks, and global citizenship.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GLOBAL_2',
    code: 'GLOBAL 2',
    title: 'Contemporary Global Cultures',
    department: 'GLOBAL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Global media landscapes, transnational diasporas, hybrid cultural identities, and cultural imperialism debates.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GLOBAL_101',
    code: 'GLOBAL 101',
    title: 'Global Cultural Dynamics',
    department: 'GLOBAL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Cultural globalization, UNESCO heritage preservation, linguistic diversity, and indigenous rights.',
    prerequisiteText: 'GLOBAL 1.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GLOBAL_102',
    code: 'GLOBAL 102',
    title: 'Transnational Geopolitics',
    department: 'GLOBAL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Borders, statelessness, global migration routes, humanitarian crises, and global public health governance.',
    prerequisiteText: 'GLOBAL 1.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GLOBAL_190',
    code: 'GLOBAL 190',
    title: 'Senior Thesis in Global Cultures',
    department: 'GLOBAL',
    units: 4,
    catalogYear: '2026-27',
    description: 'Original interdisciplinary research thesis examining a transnational cultural or institutional phenomenon.',
    prerequisiteText: 'Senior standing in Global Cultures.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EDUC_30',
    code: 'EDUC 30',
    title: 'Children and Families in School Contexts',
    department: 'EDUC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Socio-ecological models of child development, family-school partnerships, and community resource ecosystems.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EDUC_100',
    code: 'EDUC 100',
    title: 'Critical Issues in Education',
    department: 'EDUC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Achievement gaps, standardized testing policies, school vouchers, charter schools, and educational funding equity.',
    prerequisiteText: 'EDUC 50.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EDUC_124',
    code: 'EDUC 124',
    title: 'Learning Technologies and Innovation',
    department: 'EDUC',
    units: 4,
    catalogYear: '2026-27',
    description: 'EdTech platforms, AI in adaptive learning, gamification in education, and digital literacy in K-12.',
    prerequisiteText: 'EDUC 50.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EDUC_150',
    code: 'EDUC 150',
    title: 'Educational Policy and Practice',
    department: 'EDUC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Federal and state education legislation, Title I, IDEA special education mandates, and district administration.',
    prerequisiteText: 'EDUC 100.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EDUC_160',
    code: 'EDUC 160',
    title: 'Multicultural Education and Social Justice',
    department: 'EDUC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Culturally responsive pedagogy, bilingual education, dual-language immersion, and equity in diverse classrooms.',
    prerequisiteText: 'EDUC 50.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EDUC_198',
    code: 'EDUC 198',
    title: 'Directed Practicum in Education',
    department: 'EDUC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Supervised fieldwork placement in K-12 classrooms or educational non-profit community learning centers.',
    prerequisiteText: 'EDUC 100.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'NUR_SCI_110',
    code: 'NUR SCI 110',
    title: 'Pathophysiology',
    department: 'NUR SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Mechanisms of disease, cellular adaptation, immune dysfunction, cardiopulmonary and renal pathologies.',
    prerequisiteText: 'BIO SCI 93 and CHEM 1A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'NUR_SCI_116',
    code: 'NUR SCI 116',
    title: 'Pharmacology in Nursing Practice',
    department: 'NUR SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Pharmacodynamics, adverse drug events, dose calculation, antimicrobial stewardship, and cardiovascular medications.',
    prerequisiteText: 'NUR SCI 110.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'NUR_SCI_120',
    code: 'NUR SCI 120',
    title: 'Health Assessment and Clinical Skills',
    department: 'NUR SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Head-to-toe physical assessment techniques, vital signs monitoring, aseptic technique, and nursing diagnostics.',
    prerequisiteText: 'NUR SCI 110.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'NUR_SCI_130',
    code: 'NUR SCI 130',
    title: 'Adult and Older Adult Health Care',
    department: 'NUR SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Evidence-based nursing management of chronic medical-surgical disorders in adult and geriatric populations.',
    prerequisiteText: 'NUR SCI 120.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'NUR_SCI_140',
    code: 'NUR SCI 140',
    title: 'Nursing Leadership and Healthcare Systems',
    department: 'NUR SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Patient safety protocols, quality improvement, interprofessional clinical collaboration, and nursing informatics.',
    prerequisiteText: 'NUR SCI 130.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'NUR_SCI_170',
    code: 'NUR SCI 170',
    title: 'Clinical Practicum I',
    department: 'NUR SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Direct inpatient clinical rotations at UCI Medical Center hospital wards under licensed preceptor supervision.',
    prerequisiteText: 'NUR SCI 120.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'NUR_SCI_175',
    code: 'NUR SCI 175',
    title: 'Clinical Practicum II',
    department: 'NUR SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Advanced medical-surgical and critical care clinical immersion with patient management responsibility.',
    prerequisiteText: 'NUR SCI 170.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHRMSCI_1',
    code: 'PHRMSCI 1',
    title: 'Introduction to Pharmaceutical Sciences',
    department: 'PHRMSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Overview of drug discovery, lead optimization, high-throughput screening, FDA approval phases, and clinical trials.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHRMSCI_120',
    code: 'PHRMSCI 120',
    title: 'Human Physiology and Pharmacology',
    department: 'PHRMSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Organ system physiology, autonomic nervous system pharmacology, and therapeutic drug mechanisms.',
    prerequisiteText: 'BIO SCI 99.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHRMSCI_170',
    code: 'PHRMSCI 170',
    title: 'Biopharmaceutics and Pharmacokinetics',
    department: 'PHRMSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'ADME (absorption, distribution, metabolism, elimination), compartment models, bioavailability, and dosage design.',
    prerequisiteText: 'MATH 2B and CHEM 51C.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHRMSCI_171',
    code: 'PHRMSCI 171',
    title: 'Pharmacogenomics and Drug Development',
    department: 'PHRMSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Genetic polymorphisms in cytochrome P450 enzymes, personalized medicine, and targeted oncology therapeutics.',
    prerequisiteText: 'PHRMSCI 170.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PHRMSCI_177',
    code: 'PHRMSCI 177',
    title: 'Medicinal Chemistry Principles',
    department: 'PHRMSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Structure-activity relationships (SAR), bioisosteres, enzyme inhibitors, and computer-aided molecular docking.',
    prerequisiteText: 'CHEM 51C.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PUBHLTH_2',
    code: 'PUBHLTH 2',
    title: 'Global Health',
    department: 'PUBHLTH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Burden of disease, maternal/child mortality, vaccine-preventable illnesses, and WHO sustainable development goals.',
    prerequisiteText: 'PUBHLTH 1.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PUBHLTH_70',
    code: 'PUBHLTH 70',
    title: 'Environmental Health Sciences',
    department: 'PUBHLTH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Toxicology, occupational exposures, food safety, waterborne diseases, and environmental justice.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PUBHLTH_101',
    code: 'PUBHLTH 101',
    title: 'Introduction to Epidemiology',
    department: 'PUBHLTH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Disease outbreak investigation, incidence and prevalence metrics, cohort studies, and case-control studies.',
    prerequisiteText: 'STATS 67 and PUBHLTH 1.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PUBHLTH_102',
    code: 'PUBHLTH 102',
    title: 'Advanced Biostatistics for Public Health',
    department: 'PUBHLTH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Survival analysis, logistic regression, odds ratios, and statistical analysis of epidemiological cohorts.',
    prerequisiteText: 'PUBHLTH 101.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PUBHLTH_122',
    code: 'PUBHLTH 122',
    title: 'Health Policy and Management',
    department: 'PUBHLTH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Affordable Care Act, Medicaid/Medicare administration, health insurance economics, and hospital management.',
    prerequisiteText: 'PUBHLTH 1.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PUBHLTH_135',
    code: 'PUBHLTH 135',
    title: 'Chronic Disease Epidemiology',
    department: 'PUBHLTH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Cardiovascular disease, diabetes, obesity, cancer registries, and population-level lifestyle interventions.',
    prerequisiteText: 'PUBHLTH 101.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PUBHLTH_144',
    code: 'PUBHLTH 144',
    title: 'Behavioral Sciences in Public Health',
    department: 'PUBHLTH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Health belief model, theory of planned behavior, community health promotion campaigns, and stigma mitigation.',
    prerequisiteText: 'PUBHLTH 1.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PUBHLTH_150',
    code: 'PUBHLTH 150',
    title: 'Public Health Ethics and Law',
    department: 'PUBHLTH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Quarantine powers, contact tracing civil liberties, vaccine mandates, and human subject protections.',
    prerequisiteText: 'PUBHLTH 1.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'PUBHLTH_195W',
    code: 'PUBHLTH 195W',
    title: 'Public Health Practicum and Capstone',
    department: 'PUBHLTH',
    units: 4,
    catalogYear: '2026-27',
    description: '100-hour community agency internship, public health policy brief drafting, and capstone presentation.',
    prerequisiteText: 'PUBHLTH 101 and upper-division standing.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DRAMA_30A',
    code: 'DRAMA 30A',
    title: 'Acting Fundamentals I',
    department: 'DRAMA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Stanislavski method, voice and speech resonance, scene analysis, and physical stage presence.',
    prerequisiteText: 'DRAMA 10.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DRAMA_40A',
    code: 'DRAMA 40A',
    title: 'Stagecraft and Production',
    department: 'DRAMA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Scenery construction, theatrical rigging, lighting board programming, and stage management.',
    prerequisiteText: 'DRAMA 10.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DRAMA_50A',
    code: 'DRAMA 50A',
    title: 'Theatrical Design Principles',
    department: 'DRAMA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Scenic design, costume rendering, color temperature in stage lighting, and soundscape design.',
    prerequisiteText: 'DRAMA 10.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DRAMA_100',
    code: 'DRAMA 100',
    title: 'Dramatic Analysis and Dramaturgy',
    department: 'DRAMA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Close reading of classical and modern plays, production history, and dramaturgical production packets.',
    prerequisiteText: 'DRAMA 10.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DRAMA_101',
    code: 'DRAMA 101',
    title: 'Production Performance and Rehearsal',
    department: 'DRAMA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Credit for active rehearsal and performance in official Claire Trevor School of the Arts mainstage productions.',
    prerequisiteText: 'Audition or interview approval.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DRAMA_120A',
    code: 'DRAMA 120A',
    title: 'Advanced Acting Workshop',
    department: 'DRAMA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Shakespearean verse speaking, Chekhovian realism, period movement styles, and monologue audition mastery.',
    prerequisiteText: 'DRAMA 30A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DRAMA_130',
    code: 'DRAMA 130',
    title: 'Directing for the Stage',
    department: 'DRAMA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Director\'s concept, ground plan blocking, actor coaching, technical rehearsal integration.',
    prerequisiteText: 'DRAMA 100.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DRAMA_140',
    code: 'DRAMA 140',
    title: 'Theatre History Survey',
    department: 'DRAMA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Ancient Greek tragedy, Commedia dell\'Arte, Elizabethan theatre, Brechtian epic theatre, and modern avant-garde.',
    prerequisiteText: 'DRAMA 10.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_9A',
    code: 'ART 9A',
    title: 'Visual Art Concepts: 2D Design',
    department: 'ART',
    units: 4,
    catalogYear: '2026-27',
    description: 'Color theory, compositional balance, line quality, tonal value, and mixed media drawing.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_9B',
    code: 'ART 9B',
    title: 'Visual Art Concepts: 3D Sculpture',
    department: 'ART',
    units: 4,
    catalogYear: '2026-27',
    description: 'Spatial form, material gravity, woodshop and metal fabrication, plaster casting, and site-specific installations.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_12A',
    code: 'ART 12A',
    title: 'Contemporary Art Practice',
    department: 'ART',
    units: 4,
    catalogYear: '2026-27',
    description: 'Studio exploration across painting, digital media, photography, and social practice art forms.',
    prerequisiteText: 'ART 9A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_100',
    code: 'ART 100',
    title: 'Advanced Interdisciplinary Studio',
    department: 'ART',
    units: 4,
    catalogYear: '2026-27',
    description: 'Independent studio body of work, individual critiques, group artist presentations, and portfolio development.',
    prerequisiteText: 'ART 12A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_106A',
    code: 'ART 106A',
    title: 'Digital Photography and Media',
    department: 'ART',
    units: 4,
    catalogYear: '2026-27',
    description: 'Digital camera mechanics, RAW workflow, color-calibrated printing, and critical photographic semiotics.',
    prerequisiteText: 'ART 9A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_150',
    code: 'ART 150',
    title: 'Experimental Video and Moving Image',
    department: 'ART',
    units: 4,
    catalogYear: '2026-27',
    description: 'Single-channel video art, projection mapping, nonlinear editing, Foley audio design, and gallery installations.',
    prerequisiteText: 'ART 100.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ART_190',
    code: 'ART 190',
    title: 'Senior Art Exhibition Seminar',
    department: 'ART',
    units: 4,
    catalogYear: '2026-27',
    description: 'Culminating senior exhibition in the University Art Gallery, artist statement authoring, and curatorial installation.',
    prerequisiteText: 'Senior standing in Art.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MUSIC_16A',
    code: 'MUSIC 16A',
    title: 'Musicianship and Harmony I',
    department: 'MUSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Diatonic harmony, voice leading, chord progressions, sight-singing in solfege, and melodic dictation.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MUSIC_16B',
    code: 'MUSIC 16B',
    title: 'Musicianship and Harmony II',
    department: 'MUSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Secondary dominants, modulation techniques, two-part counterpoint, and keyboard harmony realization.',
    prerequisiteText: 'MUSIC 16A.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MUSIC_16C',
    code: 'MUSIC 16C',
    title: 'Musicianship and Harmony III',
    department: 'MUSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Chromatic harmony, Neapolitan chords, augmented sixth chords, and harmonic analysis of Classical forms.',
    prerequisiteText: 'MUSIC 16B.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MUSIC_51',
    code: 'MUSIC 51',
    title: 'Introduction to Music Technology',
    department: 'MUSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Digital audio workstations (DAWs), MIDI sequencing, subtractive synthesis, spatial mixing, and audio mastering.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MUSIC_100',
    code: 'MUSIC 100',
    title: 'Music History and World Cultures',
    department: 'MUSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Survey of Western art music from Gregorian chant through 20th-century modernism and global musical traditions.',
    prerequisiteText: 'MUSIC 16B.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MUSIC_140A',
    code: 'MUSIC 140A',
    title: 'Advanced Music Theory: Form and Analysis',
    department: 'MUSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Sonata-allegro form, rondo forms, variation sets, and Schenkerian linear analysis.',
    prerequisiteText: 'MUSIC 16C.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MUSIC_140B',
    code: 'MUSIC 140B',
    title: 'Orchestration and Arranging',
    department: 'MUSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Instrumental ranges, timbral blending, acoustic balance, string and wind arranging, full score preparation.',
    prerequisiteText: 'MUSIC 140A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MUSIC_160',
    code: 'MUSIC 160',
    title: 'University Concert Ensemble',
    department: 'MUSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Credit for active performance in UCI Symphony Orchestra, Wind Ensemble, Concert Choir, or Jazz Orchestra.',
    prerequisiteText: 'Audition required.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DANCE_60A',
    code: 'DANCE 60A',
    title: 'Ballet Technique I',
    department: 'DANCE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Barre exercises, centre practice, pirouettes, adagio, allegro, and classical ballet alignment.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DANCE_70A',
    code: 'DANCE 70A',
    title: 'Modern Dance Technique I',
    department: 'DANCE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Contraction and release, floor work, fall and recovery, weight transfer, and rhythmic phrasing.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DANCE_80A',
    code: 'DANCE 80A',
    title: 'Jazz Dance Technique I',
    department: 'DANCE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Syncopated rhythms, isolations, turns, leaps, and contemporary commercial jazz choreography.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DANCE_90A',
    code: 'DANCE 90A',
    title: 'Choreography and Movement Composition',
    department: 'DANCE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Spatial design, temporal dynamics, movement motifs, spatial symmetry, and choreographic drafting.',
    prerequisiteText: 'DANCE 60A or 70A.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DANCE_100',
    code: 'DANCE 100',
    title: 'Dance History Survey',
    department: 'DANCE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Court ballet, Romantic era, Diaghilev\'s Ballets Russes, American modern pioneers, and postmodern dance.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DANCE_160A',
    code: 'DANCE 160A',
    title: 'Advanced Dance Performance',
    department: 'DANCE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Rehearsal and performance in faculty or guest artist choreographed dance concert productions.',
    prerequisiteText: 'Audition required.',
    offerings: [
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' },
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DANCE_170A',
    code: 'DANCE 170A',
    title: 'Movement Analysis and Kinesiology',
    department: 'DANCE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Skeletal biomechanics, muscular action in dance, injury prevention, and somatic alignment practices.',
    prerequisiteText: 'DANCE 60A.',
    offerings: [
      { term: 'Spring', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'AFAM_100A',
    code: 'AFAM 100A',
    title: 'Black Critical Theory and Thought',
    department: 'AFAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Black Critical Theory and Thought covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division AFAM requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'AFAM_102',
    code: 'AFAM 102',
    title: 'African American Literature',
    department: 'AFAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in African American Literature covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division AFAM requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'AFAM_190',
    code: 'AFAM 190',
    title: 'Senior Colloquium in African American Studies',
    department: 'AFAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Colloquium in African American Studies covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division AFAM requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'AFAM_40A',
    code: 'AFAM 40A',
    title: 'African American Histories I: Slavery to Reconstruction',
    department: 'AFAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in African American Histories I: Slavery to Reconstruction covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'AFAM_40B',
    code: 'AFAM 40B',
    title: 'African American Histories II: Jim Crow to Civil Rights',
    department: 'AFAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in African American Histories II: Jim Crow to Civil Rights covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ASIANAM_100W',
    code: 'ASIANAM 100W',
    title: 'Research Methods in Asian American Studies',
    department: 'ASIANAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Research Methods in Asian American Studies covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division ASIANAM requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ASIANAM_130',
    code: 'ASIANAM 130',
    title: 'Asian American Gender and Sexuality',
    department: 'ASIANAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Asian American Gender and Sexuality covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division ASIANAM requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ASIANAM_190',
    code: 'ASIANAM 190',
    title: 'Senior Thesis in Asian American Studies',
    department: 'ASIANAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Thesis in Asian American Studies covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division ASIANAM requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ASIANAM_50',
    code: 'ASIANAM 50',
    title: 'Asian American Histories: Transpacific Migrations',
    department: 'ASIANAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Asian American Histories: Transpacific Migrations covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ASIANAM_51',
    code: 'ASIANAM 51',
    title: 'Asian American Communities and Labor',
    department: 'ASIANAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Asian American Communities and Labor covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ASIANAM_52',
    code: 'ASIANAM 52',
    title: 'Asian American Media and Cultural Politics',
    department: 'ASIANAM',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Asian American Media and Cultural Politics covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_D170',
    code: 'BIO SCI D170',
    title: 'Applied Human Anatomy with Laboratory',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Applied Human Anatomy with Laboratory covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division BIO SCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_E109',
    code: 'BIO SCI E109',
    title: 'Human Physiology',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Human Physiology covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division BIO SCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_E136',
    code: 'BIO SCI E136',
    title: 'Exercise Physiology and Human Movement',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Exercise Physiology and Human Movement covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division BIO SCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_E155',
    code: 'BIO SCI E155',
    title: 'Biomechanics and Human Locomotion',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Biomechanics and Human Locomotion covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division BIO SCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_E179',
    code: 'BIO SCI E179',
    title: 'Sports Nutrition and Metabolism',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Sports Nutrition and Metabolism covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division BIO SCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_M123',
    code: 'BIO SCI M123',
    title: 'Genomics and Bioinformatics',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Genomics and Bioinformatics covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division BIO SCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'BIO_SCI_M124A',
    code: 'BIO SCI M124A',
    title: 'Molecular Virology and Diagnostics',
    department: 'BIO SCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Molecular Virology and Diagnostics covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division BIO SCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHC_LAT_101',
    code: 'CHC/LAT 101',
    title: 'Immigration and the Law',
    department: 'CHC/LAT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Immigration and the Law covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division CHC/LAT requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHC_LAT_150',
    code: 'CHC/LAT 150',
    title: 'Chicanx/Latinx Education Equity',
    department: 'CHC/LAT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Chicanx/Latinx Education Equity covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division CHC/LAT requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHC_LAT_180',
    code: 'CHC/LAT 180',
    title: 'Senior Capstone Seminar in Chicano/Latino Studies',
    department: 'CHC/LAT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Capstone Seminar in Chicano/Latino Studies covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division CHC/LAT requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHC_LAT_61',
    code: 'CHC/LAT 61',
    title: 'Introduction to Chicano/Latino Studies',
    department: 'CHC/LAT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Introduction to Chicano/Latino Studies covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHC_LAT_62',
    code: 'CHC/LAT 62',
    title: 'Chicana/o and Latina/o Histories and Borders',
    department: 'CHC/LAT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Chicana/o and Latina/o Histories and Borders covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHC_LAT_63',
    code: 'CHC/LAT 63',
    title: 'Chicano/Latino Contemporary Social Issues',
    department: 'CHC/LAT',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Chicano/Latino Contemporary Social Issues covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHINESE_100A',
    code: 'CHINESE 100A',
    title: 'Advanced Chinese: Composition and Discourse',
    department: 'CHINESE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Advanced Chinese: Composition and Discourse covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division CHINESE requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHINESE_100B',
    code: 'CHINESE 100B',
    title: 'Advanced Chinese: Media and Society',
    department: 'CHINESE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Advanced Chinese: Media and Society covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division CHINESE requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHINESE_115',
    code: 'CHINESE 115',
    title: 'Introduction to Classical Chinese',
    department: 'CHINESE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Introduction to Classical Chinese covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division CHINESE requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHINESE_2A',
    code: 'CHINESE 2A',
    title: 'Intermediate Chinese I',
    department: 'CHINESE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Chinese I covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHINESE_2B',
    code: 'CHINESE 2B',
    title: 'Intermediate Chinese II',
    department: 'CHINESE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Chinese II covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CHINESE_2C',
    code: 'CHINESE 2C',
    title: 'Intermediate Chinese III',
    department: 'CHINESE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Chinese III covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CLASSIC_110',
    code: 'CLASSIC 110',
    title: 'Classical Epics in Translation',
    department: 'CLASSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Classical Epics in Translation covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division CLASSIC requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CLASSIC_120',
    code: 'CLASSIC 120',
    title: 'Ancient Historians: Herodotus and Thucydides',
    department: 'CLASSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Ancient Historians: Herodotus and Thucydides covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division CLASSIC requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CLASSIC_190',
    code: 'CLASSIC 190',
    title: 'Senior Thesis in Classical Civilizations',
    department: 'CLASSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Thesis in Classical Civilizations covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division CLASSIC requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CLASSIC_36A',
    code: 'CLASSIC 36A',
    title: 'Classical Mythology and Heroic Epics',
    department: 'CLASSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Classical Mythology and Heroic Epics covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CLASSIC_36B',
    code: 'CLASSIC 36B',
    title: 'Ancient Greece: Bronze Age to Alexander',
    department: 'CLASSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Ancient Greece: Bronze Age to Alexander covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'CLASSIC_36C',
    code: 'CLASSIC 36C',
    title: 'Ancient Rome: Republic to Empire',
    department: 'CLASSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Ancient Rome: Republic to Empire covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DANCE_190',
    code: 'DANCE 190',
    title: 'Senior Choreographic Thesis',
    department: 'DANCE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Choreographic Thesis covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division DANCE requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'DRAMA_190',
    code: 'DRAMA 190',
    title: 'Senior Showcase in Music Theatre',
    department: 'DRAMA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Showcase in Music Theatre covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division DRAMA requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EARTHSS_170',
    code: 'EARTHSS 170',
    title: 'Environmental Field Methods and Instrumentation',
    department: 'EARTHSS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Environmental Field Methods and Instrumentation covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division EARTHSS requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EAST_ASIAN_110',
    code: 'EAST ASIAN 110',
    title: 'Modern East Asian Literature and Cinema',
    department: 'EAST ASIAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Modern East Asian Literature and Cinema covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division EAST ASIAN requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EAST_ASIAN_120',
    code: 'EAST ASIAN 120',
    title: 'Popular Culture in East Asia',
    department: 'EAST ASIAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Popular Culture in East Asia covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division EAST ASIAN requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EAST_ASIAN_190',
    code: 'EAST ASIAN 190',
    title: 'Senior Colloquium in East Asian Studies',
    department: 'EAST ASIAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Colloquium in East Asian Studies covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division EAST ASIAN requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EAST_ASIAN_20',
    code: 'EAST ASIAN 20',
    title: 'Civilizations of East Asia: Pre-modern',
    department: 'EAST ASIAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Civilizations of East Asia: Pre-modern covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EAST_ASIAN_21',
    code: 'EAST ASIAN 21',
    title: 'Civilizations of East Asia: Modern Transitions',
    department: 'EAST ASIAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Civilizations of East Asia: Modern Transitions covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'ECON_145L',
    code: 'ECON 145L',
    title: 'Game Theory and Strategic Decisions',
    department: 'ECON',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Game Theory and Strategic Decisions covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division ECON requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EURO_ST_101',
    code: 'EURO ST 101',
    title: 'European Political and Economic Integration',
    department: 'EURO ST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in European Political and Economic Integration covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division EURO ST requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EURO_ST_102',
    code: 'EURO ST 102',
    title: 'Cultural Identity in Post-War Europe',
    department: 'EURO ST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Cultural Identity in Post-War Europe covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division EURO ST requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'EURO_ST_190',
    code: 'EURO ST 190',
    title: 'Senior Thesis in European Studies',
    department: 'EURO ST',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Thesis in European Studies covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division EURO ST requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FLM_MDA_101A',
    code: 'FLM&MDA 101A',
    title: 'History of Film Theory',
    department: 'FLM&MDA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in History of Film Theory covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division FLM&MDA requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FLM_MDA_110',
    code: 'FLM&MDA 110',
    title: 'Film Authorship and Auteurs',
    department: 'FLM&MDA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Film Authorship and Auteurs covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division FLM&MDA requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FLM_MDA_130',
    code: 'FLM&MDA 130',
    title: 'Global Television Cultures',
    department: 'FLM&MDA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Global Television Cultures covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division FLM&MDA requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FLM_MDA_160',
    code: 'FLM&MDA 160',
    title: 'Digital Media and Society',
    department: 'FLM&MDA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Digital Media and Society covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division FLM&MDA requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FLM_MDA_85A',
    code: 'FLM&MDA 85A',
    title: 'Film and Visual Culture: History to 1945',
    department: 'FLM&MDA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Film and Visual Culture: History to 1945 covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FLM_MDA_85B',
    code: 'FLM&MDA 85B',
    title: 'Film and Visual Culture: 1945 to Present',
    department: 'FLM&MDA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Film and Visual Culture: 1945 to Present covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FLM_MDA_85C',
    code: 'FLM&MDA 85C',
    title: 'Media Aesthetics and Digital Screen Cultures',
    department: 'FLM&MDA',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Media Aesthetics and Digital Screen Cultures covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FRENCH_101A',
    code: 'FRENCH 101A',
    title: 'Advanced French Grammar and Composition',
    department: 'FRENCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Advanced French Grammar and Composition covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division FRENCH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FRENCH_101B',
    code: 'FRENCH 101B',
    title: 'Introduction to French Literary Analysis',
    department: 'FRENCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Introduction to French Literary Analysis covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division FRENCH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FRENCH_115',
    code: 'FRENCH 115',
    title: 'Francophone Literature and Thought',
    department: 'FRENCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Francophone Literature and Thought covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division FRENCH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FRENCH_2A',
    code: 'FRENCH 2A',
    title: 'Intermediate French I',
    department: 'FRENCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate French I covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FRENCH_2B',
    code: 'FRENCH 2B',
    title: 'Intermediate French II',
    department: 'FRENCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate French II covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'FRENCH_2C',
    code: 'FRENCH 2C',
    title: 'Intermediate French III',
    department: 'FRENCH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate French III covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GEN_SEX_100A',
    code: 'GEN&SEX 100A',
    title: 'Feminist Epistemologies and Methodologies',
    department: 'GEN&SEX',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Feminist Epistemologies and Methodologies covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division GEN&SEX requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GEN_SEX_100B',
    code: 'GEN&SEX 100B',
    title: 'Queer Theory and Critical Intersectionality',
    department: 'GEN&SEX',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Queer Theory and Critical Intersectionality covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division GEN&SEX requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GEN_SEX_190',
    code: 'GEN&SEX 190',
    title: 'Senior Seminar in Gender and Sexuality Studies',
    department: 'GEN&SEX',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Seminar in Gender and Sexuality Studies covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division GEN&SEX requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GEN_SEX_50A',
    code: 'GEN&SEX 50A',
    title: 'Gender and Power in Transnational Contexts',
    department: 'GEN&SEX',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Gender and Power in Transnational Contexts covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GEN_SEX_50B',
    code: 'GEN&SEX 50B',
    title: 'Queer Histories and Cultures',
    department: 'GEN&SEX',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Queer Histories and Cultures covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GERMAN_101',
    code: 'GERMAN 101',
    title: 'German Literary Movements',
    department: 'GERMAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in German Literary Movements covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division GERMAN requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GERMAN_102',
    code: 'GERMAN 102',
    title: 'German Cinema and Visual Culture',
    department: 'GERMAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in German Cinema and Visual Culture covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division GERMAN requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GERMAN_115',
    code: 'GERMAN 115',
    title: 'German Intellectual Thought from Kant to Habermas',
    department: 'GERMAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in German Intellectual Thought from Kant to Habermas covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division GERMAN requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GERMAN_2A',
    code: 'GERMAN 2A',
    title: 'Intermediate German I',
    department: 'GERMAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate German I covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GERMAN_2B',
    code: 'GERMAN 2B',
    title: 'Intermediate German II',
    department: 'GERMAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate German II covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'GERMAN_2C',
    code: 'GERMAN 2C',
    title: 'Intermediate German III',
    department: 'GERMAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate German III covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'JAPANSE_100A',
    code: 'JAPANSE 100A',
    title: 'Advanced Japanese: Grammar and Composition',
    department: 'JAPANSE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Advanced Japanese: Grammar and Composition covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division JAPANSE requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'JAPANSE_100B',
    code: 'JAPANSE 100B',
    title: 'Advanced Japanese: Reading and Discussion',
    department: 'JAPANSE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Advanced Japanese: Reading and Discussion covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division JAPANSE requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'JAPANSE_115',
    code: 'JAPANSE 115',
    title: 'Masterpieces of Japanese Literature',
    department: 'JAPANSE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Masterpieces of Japanese Literature covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division JAPANSE requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'JAPANSE_2A',
    code: 'JAPANSE 2A',
    title: 'Intermediate Japanese I',
    department: 'JAPANSE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Japanese I covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'JAPANSE_2B',
    code: 'JAPANSE 2B',
    title: 'Intermediate Japanese II',
    department: 'JAPANSE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Japanese II covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'JAPANSE_2C',
    code: 'JAPANSE 2C',
    title: 'Intermediate Japanese III',
    department: 'JAPANSE',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Japanese III covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'KOREAN_100A',
    code: 'KOREAN 100A',
    title: 'Advanced Korean: Reading and Writing',
    department: 'KOREAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Advanced Korean: Reading and Writing covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division KOREAN requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'KOREAN_100B',
    code: 'KOREAN 100B',
    title: 'Advanced Korean: Media and Society',
    department: 'KOREAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Advanced Korean: Media and Society covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division KOREAN requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'KOREAN_120',
    code: 'KOREAN 120',
    title: 'Modern Korean Literature and Culture',
    department: 'KOREAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Modern Korean Literature and Culture covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division KOREAN requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'KOREAN_2A',
    code: 'KOREAN 2A',
    title: 'Intermediate Korean I',
    department: 'KOREAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Korean I covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'KOREAN_2B',
    code: 'KOREAN 2B',
    title: 'Intermediate Korean II',
    department: 'KOREAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Korean II covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'KOREAN_2C',
    code: 'KOREAN 2C',
    title: 'Intermediate Korean III',
    department: 'KOREAN',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Korean III covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LSCI_10',
    code: 'LSCI 10',
    title: 'Introduction to Phonetics and Phonology',
    department: 'LSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Introduction to Phonetics and Phonology covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LSCI_111',
    code: 'LSCI 111',
    title: 'Syntactic Theory',
    department: 'LSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Syntactic Theory covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division LSCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LSCI_121',
    code: 'LSCI 121',
    title: 'Formal Semantics',
    department: 'LSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Formal Semantics covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division LSCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LSCI_141',
    code: 'LSCI 141',
    title: 'Phonological Analysis',
    department: 'LSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Phonological Analysis covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division LSCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LSCI_165',
    code: 'LSCI 165',
    title: 'Computational Linguistics and Natural Language Processing',
    department: 'LSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Computational Linguistics and Natural Language Processing covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division LSCI requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'LSCI_3',
    code: 'LSCI 3',
    title: 'Introduction to Linguistics',
    department: 'LSCI',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Introduction to Linguistics covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_112A',
    code: 'MATH 112A',
    title: 'Introduction to Partial Differential Equations',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Introduction to Partial Differential Equations covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division MATH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_113A',
    code: 'MATH 113A',
    title: 'Mathematical Modeling in Biology I',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Mathematical Modeling in Biology I covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division MATH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_113B',
    code: 'MATH 113B',
    title: 'Mathematical Modeling in Biology II',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Mathematical Modeling in Biology II covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division MATH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_115',
    code: 'MATH 115',
    title: 'Introduction to Complex Analysis',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Introduction to Complex Analysis covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division MATH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_120A',
    code: 'MATH 120A',
    title: 'Abstract Algebra I: Group Theory',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Abstract Algebra I: Group Theory covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division MATH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_130A',
    code: 'MATH 130A',
    title: 'Classical and Modern Geometries',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Classical and Modern Geometries covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division MATH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MATH_161',
    code: 'MATH 161',
    title: 'Modern Mathematics for Secondary Education',
    department: 'MATH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Modern Mathematics for Secondary Education covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division MATH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'MUSIC_190',
    code: 'MUSIC 190',
    title: 'Senior Solo Recital',
    department: 'MUSIC',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Solo Recital covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division MUSIC requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'REL_STD_100',
    code: 'REL STD 100',
    title: 'Theories of Religion in Society',
    department: 'REL STD',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Theories of Religion in Society covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division REL STD requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'REL_STD_110',
    code: 'REL STD 110',
    title: 'Scriptural Interpretation and Hermeneutics',
    department: 'REL STD',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Scriptural Interpretation and Hermeneutics covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division REL STD requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'REL_STD_190',
    code: 'REL STD 190',
    title: 'Senior Capstone Seminar in Religious Studies',
    department: 'REL STD',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Senior Capstone Seminar in Religious Studies covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division REL STD requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'REL_STD_5A',
    code: 'REL STD 5A',
    title: 'World Religions: Judaism, Christianity, Islam',
    department: 'REL STD',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in World Religions: Judaism, Christianity, Islam covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'REL_STD_5B',
    code: 'REL STD 5B',
    title: 'World Religions: Hinduism, Buddhism, Daoism',
    department: 'REL STD',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in World Religions: Hinduism, Buddhism, Daoism covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'REL_STD_5C',
    code: 'REL STD 5C',
    title: 'Indigenous and Contemporary Religious Movements',
    department: 'REL STD',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Indigenous and Contemporary Religious Movements covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPANISH_101A',
    code: 'SPANISH 101A',
    title: 'Advanced Spanish Writing Workshop',
    department: 'SPANISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Advanced Spanish Writing Workshop covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division SPANISH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPANISH_101B',
    code: 'SPANISH 101B',
    title: 'Introduction to Hispanic Literary Criticism',
    department: 'SPANISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Introduction to Hispanic Literary Criticism covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division SPANISH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPANISH_110',
    code: 'SPANISH 110',
    title: 'Introduction to Spanish Linguistics',
    department: 'SPANISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Introduction to Spanish Linguistics covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division SPANISH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPANISH_113',
    code: 'SPANISH 113',
    title: 'Survey of Latin American Literatures',
    department: 'SPANISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Survey of Latin American Literatures covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division SPANISH requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPANISH_2A',
    code: 'SPANISH 2A',
    title: 'Intermediate Spanish I',
    department: 'SPANISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Spanish I covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPANISH_2B',
    code: 'SPANISH 2B',
    title: 'Intermediate Spanish II',
    department: 'SPANISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Spanish II covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPANISH_2C',
    code: 'SPANISH 2C',
    title: 'Intermediate Spanish III',
    department: 'SPANISH',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Intermediate Spanish III covering fundamental principles and applications.',
    prerequisiteText: 'None.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPPS_110',
    code: 'SPPS 110',
    title: 'Introduction to Social Policy Analysis',
    department: 'SPPS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Introduction to Social Policy Analysis covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division SPPS requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPPS_115',
    code: 'SPPS 115',
    title: 'Leadership in Public Service',
    department: 'SPPS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Leadership in Public Service covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division SPPS requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPPS_195A',
    code: 'SPPS 195A',
    title: 'Public Service Internship Practicum I',
    department: 'SPPS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Public Service Internship Practicum I covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division SPPS requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  },
  {
    id: 'SPPS_195B',
    code: 'SPPS 195B',
    title: 'Public Service Internship Practicum II',
    department: 'SPPS',
    units: 4,
    catalogYear: '2026-27',
    description: 'Comprehensive coursework in Public Service Internship Practicum II covering fundamental principles and applications.',
    prerequisiteText: 'Prerequisite: Completion of lower-division SPPS requirements.',
    offerings: [
      { term: 'Fall', year: 2026, confidence: 'CONFIRMED' },
      { term: 'Winter', year: 2027, confidence: 'CONFIRMED' }
    ]
  }
]

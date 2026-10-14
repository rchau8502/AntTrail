/**
 * ScholarStack Course-to-Course Articulation & Major Preparation Engine
 * Maps California Community College (CCC) coursework to UC & CSU destination campus requirements.
 */

export interface TargetMajorRequirement {
  id: string
  category:
    | 'calculus'
    | 'calculus_2'
    | 'multivariable'
    | 'linear_algebra'
    | 'diff_equations'
    | 'discrete_math'
    | 'programming_intro'
    | 'programming_intermediate'
    | 'data_structures'
    | 'computer_architecture'
    | 'physics_mechanics'
    | 'physics_em'
    | 'chemistry'
    | 'biology'
    | 'microeconomics'
    | 'macroeconomics'
    | 'accounting_financial'
    | 'accounting_managerial'
    | 'business_law'
    | 'statistics'
    | 'general_education'
  name: string
  targetCourseCode: string
  targetCourseTitle: string
  units: number
  isCritical: boolean // Required for competitive transfer admission
  description: string
  cIdEquivalent?: string
}

export interface CourseArticulationMatch {
  originCourseCode: string
  originCourseTitle: string
  originUnits: number
  originGrade?: string
  originTerm?: string
  targetCampus: string
  targetMajor: string
  targetCourseCode: string
  targetCourseTitle: string
  targetUnits: number
  fulfillsRequirementId?: string
  fulfillsRequirementName: string
  requirementType: 'major_prep_critical' | 'major_prep_elective' | 'ge_foundation' | 'general_elective'
  cIdCode?: string
  notes: string
  isArticulated: boolean
}

export interface MajorPreparationAudit {
  targetCampus: string
  targetMajor: string
  totalRequirements: number
  satisfiedCount: number
  plannedCount: number
  missingCount: number
  completionPercentage: number
  requirements: Array<{
    requirement: TargetMajorRequirement
    status: 'satisfied' | 'planned' | 'missing'
    matchedCourse?: {
      code: string
      title: string
      grade?: string
      term?: string
    }
  }>
  articulatedCourses: CourseArticulationMatch[]
  recommendations: string[]
}

// Major Preparation Definitions by Destination Campus & Major
export const CAMPUS_MAJOR_REQUIREMENTS: Record<string, Record<string, TargetMajorRequirement[]>> = {
  'UC Berkeley': {
    'Computer Science': [
      {
        id: 'calc_1',
        category: 'calculus',
        name: 'Calculus I',
        targetCourseCode: 'MATH 1A',
        targetCourseTitle: 'Calculus',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 210',
        description: 'Single variable differential and integral calculus.'
      },
      {
        id: 'calc_2',
        category: 'calculus_2',
        name: 'Calculus II',
        targetCourseCode: 'MATH 1B',
        targetCourseTitle: 'Calculus',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 220',
        description: 'Techniques of integration, series, and differential equations.'
      },
      {
        id: 'multi_calc',
        category: 'multivariable',
        name: 'Multivariable Calculus',
        targetCourseCode: 'MATH 53',
        targetCourseTitle: 'Multivariable Calculus',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 230',
        description: 'Vectors, partial derivatives, and multiple integrals.'
      },
      {
        id: 'lin_alg_diff',
        category: 'linear_algebra',
        name: 'Linear Algebra & Diff Equations',
        targetCourseCode: 'MATH 54',
        targetCourseTitle: 'Linear Algebra and Differential Equations',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 250',
        description: 'Matrices, vector spaces, and differential systems.'
      },
      {
        id: 'prog_intro',
        category: 'programming_intro',
        name: 'Structure & Interpretation of Computer Programs',
        targetCourseCode: 'COMPSCI 61A',
        targetCourseTitle: 'Structure & Interpretation of Computer Programs',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 122',
        description: 'Fundamental programming abstractions and functional programming.'
      },
      {
        id: 'data_struct',
        category: 'data_structures',
        name: 'Data Structures',
        targetCourseCode: 'COMPSCI 61B',
        targetCourseTitle: 'Data Structures',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 132',
        description: 'Fundamental data structures, search trees, graphs, and algorithmic complexity.'
      },
      {
        id: 'mach_struct',
        category: 'computer_architecture',
        name: 'Machine Structures',
        targetCourseCode: 'COMPSCI 61C',
        targetCourseTitle: 'Great Ideas in Computer Architecture (Machine Structures)',
        units: 4,
        isCritical: false,
        cIdEquivalent: 'C-ID COMP 142',
        description: 'Hardware/software interface, instruction sets, pipelining, and memory hierarchies.'
      },
      {
        id: 'discrete_math',
        category: 'discrete_math',
        name: 'Discrete Math & Probability',
        targetCourseCode: 'COMPSCI 70',
        targetCourseTitle: 'Discrete Mathematics and Probability Theory',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 152',
        description: 'Mathematical induction, graph theory, modular arithmetic, and probability.'
      }
    ],
    Mathematics: [
      {
        id: 'calc_1',
        category: 'calculus',
        name: 'Calculus I',
        targetCourseCode: 'MATH 1A',
        targetCourseTitle: 'Calculus',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 210',
        description: 'Differential and integral calculus.'
      },
      {
        id: 'calc_2',
        category: 'calculus_2',
        name: 'Calculus II',
        targetCourseCode: 'MATH 1B',
        targetCourseTitle: 'Calculus',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 220',
        description: 'Integration methods, infinite sequences, and series.'
      },
      {
        id: 'multi_calc',
        category: 'multivariable',
        name: 'Multivariable Calculus',
        targetCourseCode: 'MATH 53',
        targetCourseTitle: 'Multivariable Calculus',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 230',
        description: 'Vector calculus and Green/Stokes theorems.'
      },
      {
        id: 'lin_alg_diff',
        category: 'linear_algebra',
        name: 'Linear Algebra and Differential Equations',
        targetCourseCode: 'MATH 54',
        targetCourseTitle: 'Linear Algebra & Diff Equations',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 250',
        description: 'Linear equations, eigenvalues, and linear differential equations.'
      }
    ],
    'Data Science': [
      {
        id: 'calc_1',
        category: 'calculus',
        name: 'Calculus I',
        targetCourseCode: 'MATH 1A',
        targetCourseTitle: 'Calculus',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 210',
        description: 'Differential and integral calculus.'
      },
      {
        id: 'calc_2',
        category: 'calculus_2',
        name: 'Calculus II',
        targetCourseCode: 'MATH 1B',
        targetCourseTitle: 'Calculus',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 220',
        description: 'Advanced integration and series.'
      },
      {
        id: 'lin_alg',
        category: 'linear_algebra',
        name: 'Linear Algebra',
        targetCourseCode: 'MATH 54',
        targetCourseTitle: 'Linear Algebra',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 250',
        description: 'Matrix computations and inner product spaces.'
      },
      {
        id: 'data_intro',
        category: 'programming_intro',
        name: 'Foundations of Data Science',
        targetCourseCode: 'DATA C8',
        targetCourseTitle: 'Foundations of Data Science',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 122',
        description: 'Computational thinking and statistical inference.'
      },
      {
        id: 'data_struct',
        category: 'data_structures',
        name: 'Data Structures',
        targetCourseCode: 'COMPSCI 61B',
        targetCourseTitle: 'Data Structures',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 132',
        description: 'Object-oriented programming and algorithmic data structures.'
      }
    ]
  },
  UCLA: {
    'Computer Science': [
      {
        id: 'calc_1',
        category: 'calculus',
        name: 'Differential and Integral Calculus I',
        targetCourseCode: 'MATH 31A',
        targetCourseTitle: 'Differential and Integral Calculus',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 210',
        description: 'Limits, derivatives, and introduction to integration.'
      },
      {
        id: 'calc_2',
        category: 'calculus_2',
        name: 'Calculus II',
        targetCourseCode: 'MATH 31B',
        targetCourseTitle: 'Integration and Infinite Series',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 220',
        description: 'Transcendental functions and Taylor series.'
      },
      {
        id: 'multi_calc',
        category: 'multivariable',
        name: 'Multivariable Calculus',
        targetCourseCode: 'MATH 32A',
        targetCourseTitle: 'Calculus of Several Variables',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 230',
        description: 'Curves, surfaces, and partial derivatives.'
      },
      {
        id: 'lin_alg',
        category: 'linear_algebra',
        name: 'Linear Algebra',
        targetCourseCode: 'MATH 33A',
        targetCourseTitle: 'Linear Algebra and Applications',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 250',
        description: 'Vector spaces, determinants, and linear transformations.'
      },
      {
        id: 'diff_eq',
        category: 'diff_equations',
        name: 'Differential Equations',
        targetCourseCode: 'MATH 33B',
        targetCourseTitle: 'Differential Equations',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 240',
        description: 'Ordinary differential equations with applications.'
      },
      {
        id: 'prog_intro',
        category: 'programming_intro',
        name: 'Introduction to Computer Science I',
        targetCourseCode: 'COM SCI 31',
        targetCourseTitle: 'Introduction to Computer Science I',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 122',
        description: 'C++ programming, abstraction, and algorithms.'
      },
      {
        id: 'data_struct',
        category: 'data_structures',
        name: 'Introduction to Computer Science II (Data Structures)',
        targetCourseCode: 'COM SCI 32',
        targetCourseTitle: 'Introduction to Computer Science II',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 132',
        description: 'Data structures, recursion, dynamic memory, and C++ OOP.'
      },
      {
        id: 'phys_1',
        category: 'physics_mechanics',
        name: 'Physics: Mechanics',
        targetCourseCode: 'PHYSICS 1A',
        targetCourseTitle: 'Physics for Scientists and Engineers: Mechanics',
        units: 5,
        isCritical: true,
        cIdEquivalent: 'C-ID PHYS 205',
        description: 'Calculus-based Newtonian kinematics and dynamics.'
      },
      {
        id: 'phys_2',
        category: 'physics_em',
        name: 'Physics: Electricity and Magnetism',
        targetCourseCode: 'PHYSICS 1B',
        targetCourseTitle: 'Physics for Scientists and Engineers: Oscillations and E&M',
        units: 5,
        isCritical: true,
        cIdEquivalent: 'C-ID PHYS 210',
        description: 'Electrostatics, DC/AC circuits, and magnetism.'
      }
    ],
    Economics: [
      {
        id: 'calc_1',
        category: 'calculus',
        name: 'Calculus for Life Science / Economics',
        targetCourseCode: 'MATH 31A',
        targetCourseTitle: 'Differential and Integral Calculus',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 210',
        description: 'Calculus foundations.'
      },
      {
        id: 'calc_2',
        category: 'calculus_2',
        name: 'Calculus II',
        targetCourseCode: 'MATH 31B',
        targetCourseTitle: 'Integration and Infinite Series',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 220',
        description: 'Integral calculus and optimization.'
      },
      {
        id: 'micro_econ',
        category: 'microeconomics',
        name: 'Principles of Economics (Microeconomics)',
        targetCourseCode: 'ECON 1',
        targetCourseTitle: 'Principles of Economics (Microeconomics)',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID ECON 202',
        description: 'Supply, demand, market structures, and pricing.'
      },
      {
        id: 'macro_econ',
        category: 'macroeconomics',
        name: 'Principles of Economics (Macroeconomics)',
        targetCourseCode: 'ECON 2',
        targetCourseTitle: 'Principles of Economics (Macroeconomics)',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID ECON 201',
        description: 'Aggregate output, inflation, unemployment, and monetary policy.'
      },
      {
        id: 'stat',
        category: 'statistics',
        name: 'Statistics for Economists',
        targetCourseCode: 'ECON 41',
        targetCourseTitle: 'Statistics for Economists',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 110',
        description: 'Probability, hypothesis testing, and regression.'
      }
    ]
  },
  'UC Irvine': {
    'Computer Science': [
      {
        id: 'calc_1',
        category: 'calculus',
        name: 'Calculus I',
        targetCourseCode: 'MATH 2A',
        targetCourseTitle: 'Calculus I',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 210',
        description: 'Differential calculus and optimization.'
      },
      {
        id: 'calc_2',
        category: 'calculus_2',
        name: 'Calculus II',
        targetCourseCode: 'MATH 2B',
        targetCourseTitle: 'Calculus II',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 220',
        description: 'Integration methods and infinite series.'
      },
      {
        id: 'multi_calc',
        category: 'multivariable',
        name: 'Multivariable Calculus',
        targetCourseCode: 'MATH 2D',
        targetCourseTitle: 'Multivariable Calculus I',
        units: 4,
        isCritical: false,
        cIdEquivalent: 'C-ID MATH 230',
        description: 'Vectors and partial derivatives.'
      },
      {
        id: 'lin_alg',
        category: 'linear_algebra',
        name: 'Introduction to Linear Algebra',
        targetCourseCode: 'MATH 3A',
        targetCourseTitle: 'Introduction to Linear Algebra',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 250',
        description: 'Systems of equations, matrices, and linear transformations.'
      },
      {
        id: 'prog_1',
        category: 'programming_intro',
        name: 'Introduction to Programming',
        targetCourseCode: 'I&C SCI 31',
        targetCourseTitle: 'Introduction to Programming',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 122',
        description: 'Programming fundamentals in Python.'
      },
      {
        id: 'prog_2',
        category: 'programming_intermediate',
        name: 'Programming with Software Libraries',
        targetCourseCode: 'I&C SCI 32',
        targetCourseTitle: 'Programming with Software Libraries',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 122',
        description: 'Intermediate programming and standard libraries.'
      },
      {
        id: 'data_struct',
        category: 'data_structures',
        name: 'Intermediate Programming & Data Structures',
        targetCourseCode: 'I&C SCI 33',
        targetCourseTitle: 'Intermediate Programming',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 132',
        description: 'Data structures, testing, and algorithmic performance.'
      },
      {
        id: 'discrete_math',
        category: 'discrete_math',
        name: 'Discrete Mathematics',
        targetCourseCode: 'I&C SCI 6B',
        targetCourseTitle: 'Boolean Logic and Discrete Structures',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 152',
        description: 'Logic, sets, relations, and combinatorics.'
      }
    ],
    'Business Administration': [
      {
        id: 'calc_1',
        category: 'calculus',
        name: 'Calculus for Economics & Business',
        targetCourseCode: 'MATH 2A',
        targetCourseTitle: 'Calculus I',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 210',
        description: 'Differential calculus.'
      },
      {
        id: 'calc_2',
        category: 'calculus_2',
        name: 'Calculus II',
        targetCourseCode: 'MATH 2B',
        targetCourseTitle: 'Calculus II',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 220',
        description: 'Integral calculus.'
      },
      {
        id: 'micro_econ',
        category: 'microeconomics',
        name: 'Introduction to Economics: Microeconomics',
        targetCourseCode: 'ECON 20A',
        targetCourseTitle: 'Basic Economics I',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID ECON 202',
        description: 'Microeconomics principles.'
      },
      {
        id: 'macro_econ',
        category: 'macroeconomics',
        name: 'Introduction to Economics: Macroeconomics',
        targetCourseCode: 'ECON 20B',
        targetCourseTitle: 'Basic Economics II',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID ECON 201',
        description: 'Macroeconomics principles.'
      },
      {
        id: 'acct_fin',
        category: 'accounting_financial',
        name: 'Financial Accounting',
        targetCourseCode: 'MGMT 30A',
        targetCourseTitle: 'Principles of Accounting I',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID ACCT 110',
        description: 'Financial statement analysis and reporting.'
      },
      {
        id: 'acct_mgr',
        category: 'accounting_managerial',
        name: 'Managerial Accounting',
        targetCourseCode: 'MGMT 30B',
        targetCourseTitle: 'Principles of Accounting II',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID ACCT 120',
        description: 'Managerial cost analysis and budgeting.'
      }
    ]
  },
  'UC San Diego': {
    'Computer Science': [
      {
        id: 'calc_1',
        category: 'calculus',
        name: 'Calculus I',
        targetCourseCode: 'MATH 20A',
        targetCourseTitle: 'Calculus for Science and Engineering',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 210',
        description: 'Foundations of differential calculus.'
      },
      {
        id: 'calc_2',
        category: 'calculus_2',
        name: 'Calculus II',
        targetCourseCode: 'MATH 20B',
        targetCourseTitle: 'Calculus for Science and Engineering',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 220',
        description: 'Integration and Taylor series.'
      },
      {
        id: 'multi_calc',
        category: 'multivariable',
        name: 'Multivariable Calculus',
        targetCourseCode: 'MATH 20C',
        targetCourseTitle: 'Calculus and Analytic Geometry',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 230',
        description: 'Vector calculus and multiple integrals.'
      },
      {
        id: 'lin_alg',
        category: 'linear_algebra',
        name: 'Linear Algebra',
        targetCourseCode: 'MATH 18',
        targetCourseTitle: 'Linear Algebra',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 250',
        description: 'Matrix algebra, determinants, and vector spaces.'
      },
      {
        id: 'prog_intro',
        category: 'programming_intro',
        name: 'Introduction to Computer Science (Java)',
        targetCourseCode: 'CSE 11',
        targetCourseTitle: 'Introduction to Computer Science and Object-Oriented: Java',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 122',
        description: 'Accelerated introduction to object-oriented programming.'
      },
      {
        id: 'data_struct',
        category: 'data_structures',
        name: 'Basic Data Structures and Object-Oriented Design',
        targetCourseCode: 'CSE 12',
        targetCourseTitle: 'Basic Data Structures and Object-Oriented Design',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 132',
        description: 'Linked lists, trees, hash tables, and algorithm runtime.'
      },
      {
        id: 'discrete_math',
        category: 'discrete_math',
        name: 'Mathematics for Algorithms and Systems',
        targetCourseCode: 'CSE 20',
        targetCourseTitle: 'Discrete Mathematics',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 152',
        description: 'Discrete mathematics for computer science.'
      }
    ]
  },
  'Cal Poly San Luis Obispo': {
    'Computer Science': [
      {
        id: 'calc_1',
        category: 'calculus',
        name: 'Calculus I',
        targetCourseCode: 'MATH 141',
        targetCourseTitle: 'Calculus I',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 210',
        description: 'Differential calculus.'
      },
      {
        id: 'calc_2',
        category: 'calculus_2',
        name: 'Calculus II',
        targetCourseCode: 'MATH 142',
        targetCourseTitle: 'Calculus II',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 220',
        description: 'Integral calculus and series.'
      },
      {
        id: 'multi_calc',
        category: 'multivariable',
        name: 'Calculus III',
        targetCourseCode: 'MATH 143',
        targetCourseTitle: 'Calculus III',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 230',
        description: 'Multivariable calculus.'
      },
      {
        id: 'lin_alg',
        category: 'linear_algebra',
        name: 'Linear Analysis I',
        targetCourseCode: 'MATH 244',
        targetCourseTitle: 'Linear Analysis I',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 250',
        description: 'Linear algebra and differential equations.'
      },
      {
        id: 'prog_intro',
        category: 'programming_intro',
        name: 'Fundamentals of Computer Science',
        targetCourseCode: 'CSC 101',
        targetCourseTitle: 'Fundamentals of Computer Science',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 122',
        description: 'Introductory problem solving and programming.'
      },
      {
        id: 'data_struct',
        category: 'data_structures',
        name: 'Data Structures',
        targetCourseCode: 'CSC 202',
        targetCourseTitle: 'Data Structures',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 132',
        description: 'Abstract data types, stacks, queues, and trees.'
      },
      {
        id: 'phys_1',
        category: 'physics_mechanics',
        name: 'College Physics I',
        targetCourseCode: 'PHYS 141',
        targetCourseTitle: 'General Physics I',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID PHYS 205',
        description: 'Calculus-based Newtonian physics.'
      }
    ]
  },
  'San Jose State University': {
    'Computer Science': [
      {
        id: 'calc_1',
        category: 'calculus',
        name: 'Calculus I',
        targetCourseCode: 'MATH 30',
        targetCourseTitle: 'Calculus I',
        units: 3,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 210',
        description: 'Differential calculus.'
      },
      {
        id: 'calc_2',
        category: 'calculus_2',
        name: 'Calculus II',
        targetCourseCode: 'MATH 31',
        targetCourseTitle: 'Calculus II',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID MATH 220',
        description: 'Integral calculus and series.'
      },
      {
        id: 'discrete_math',
        category: 'discrete_math',
        name: 'Discrete Mathematics',
        targetCourseCode: 'MATH 42',
        targetCourseTitle: 'Discrete Mathematics',
        units: 3,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 152',
        description: 'Logic and combinatorics.'
      },
      {
        id: 'prog_intro',
        category: 'programming_intro',
        name: 'Introduction to Programming',
        targetCourseCode: 'CS 46A',
        targetCourseTitle: 'Introduction to Programming',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 122',
        description: 'Object-oriented programming in Java.'
      },
      {
        id: 'data_struct',
        category: 'data_structures',
        name: 'Data Structures and Algorithms',
        targetCourseCode: 'CS 46B',
        targetCourseTitle: 'Introduction to Data Structures',
        units: 4,
        isCritical: true,
        cIdEquivalent: 'C-ID COMP 132',
        description: 'Trees, heaps, sorting algorithms, and complexity.'
      }
    ]
  }
}

// Fallback Generic Major Preparation when campus-specific matrix is not hardcoded
export function getGenericMajorRequirements(major: string): TargetMajorRequirement[] {
  switch (major) {
    case 'Computer Science':
    case 'Data Science':
      return [
        {
          id: 'calc_1',
          category: 'calculus',
          name: 'Calculus I',
          targetCourseCode: 'MATH 1',
          targetCourseTitle: 'Calculus I',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID MATH 210',
          description: 'Single variable calculus.'
        },
        {
          id: 'calc_2',
          category: 'calculus_2',
          name: 'Calculus II',
          targetCourseCode: 'MATH 2',
          targetCourseTitle: 'Calculus II',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID MATH 220',
          description: 'Integral calculus and series.'
        },
        {
          id: 'lin_alg',
          category: 'linear_algebra',
          name: 'Linear Algebra',
          targetCourseCode: 'MATH 3',
          targetCourseTitle: 'Linear Algebra',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID MATH 250',
          description: 'Linear algebra and matrix operations.'
        },
        {
          id: 'prog_intro',
          category: 'programming_intro',
          name: 'Computer Programming I',
          targetCourseCode: 'CS 1',
          targetCourseTitle: 'Computer Programming I',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID COMP 122',
          description: 'Foundational programming in C++, Java, or Python.'
        },
        {
          id: 'data_struct',
          category: 'data_structures',
          name: 'Data Structures',
          targetCourseCode: 'CS 2',
          targetCourseTitle: 'Data Structures and Algorithms',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID COMP 132',
          description: 'Data structures and complexity.'
        },
        {
          id: 'discrete_math',
          category: 'discrete_math',
          name: 'Discrete Structures',
          targetCourseCode: 'CS 3',
          targetCourseTitle: 'Discrete Structures',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID COMP 152',
          description: 'Discrete mathematics for computing.'
        }
      ]
    case 'Mechanical Engineering':
    case 'Electrical Engineering':
    case 'Civil Engineering':
      return [
        {
          id: 'calc_1',
          category: 'calculus',
          name: 'Calculus I',
          targetCourseCode: 'MATH 1',
          targetCourseTitle: 'Calculus I',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID MATH 210',
          description: 'Calculus I.'
        },
        {
          id: 'calc_2',
          category: 'calculus_2',
          name: 'Calculus II',
          targetCourseCode: 'MATH 2',
          targetCourseTitle: 'Calculus II',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID MATH 220',
          description: 'Calculus II.'
        },
        {
          id: 'multi_calc',
          category: 'multivariable',
          name: 'Multivariable Calculus',
          targetCourseCode: 'MATH 3',
          targetCourseTitle: 'Multivariable Calculus',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID MATH 230',
          description: 'Multivariable calculus.'
        },
        {
          id: 'diff_eq',
          category: 'diff_equations',
          name: 'Differential Equations',
          targetCourseCode: 'MATH 4',
          targetCourseTitle: 'Differential Equations',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID MATH 240',
          description: 'Differential equations.'
        },
        {
          id: 'phys_1',
          category: 'physics_mechanics',
          name: 'Physics: Mechanics',
          targetCourseCode: 'PHYS 1',
          targetCourseTitle: 'Physics for Scientists: Mechanics',
          units: 5,
          isCritical: true,
          cIdEquivalent: 'C-ID PHYS 205',
          description: 'Calculus-based mechanics.'
        },
        {
          id: 'phys_2',
          category: 'physics_em',
          name: 'Physics: Electricity & Magnetism',
          targetCourseCode: 'PHYS 2',
          targetCourseTitle: 'Physics for Scientists: E&M',
          units: 5,
          isCritical: true,
          cIdEquivalent: 'C-ID PHYS 210',
          description: 'Calculus-based electricity and magnetism.'
        },
        {
          id: 'chem_1',
          category: 'chemistry',
          name: 'General Chemistry I',
          targetCourseCode: 'CHEM 1',
          targetCourseTitle: 'General Chemistry I',
          units: 5,
          isCritical: true,
          cIdEquivalent: 'C-ID CHEM 110',
          description: 'General chemistry with laboratory.'
        }
      ]
    case 'Business Administration':
    case 'Economics':
      return [
        {
          id: 'calc_1',
          category: 'calculus',
          name: 'Calculus for Business / Single Variable',
          targetCourseCode: 'MATH 1',
          targetCourseTitle: 'Calculus I',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID MATH 210',
          description: 'Calculus with applications.'
        },
        {
          id: 'stat',
          category: 'statistics',
          name: 'Introductory Statistics',
          targetCourseCode: 'STAT 1',
          targetCourseTitle: 'Introduction to Statistics',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID MATH 110',
          description: 'Elementary probability and statistics.'
        },
        {
          id: 'micro_econ',
          category: 'microeconomics',
          name: 'Principles of Microeconomics',
          targetCourseCode: 'ECON 1',
          targetCourseTitle: 'Principles of Microeconomics',
          units: 3,
          isCritical: true,
          cIdEquivalent: 'C-ID ECON 202',
          description: 'Microeconomics.'
        },
        {
          id: 'macro_econ',
          category: 'macroeconomics',
          name: 'Principles of Macroeconomics',
          targetCourseCode: 'ECON 2',
          targetCourseTitle: 'Principles of Macroeconomics',
          units: 3,
          isCritical: true,
          cIdEquivalent: 'C-ID ECON 201',
          description: 'Macroeconomics.'
        },
        {
          id: 'acct_fin',
          category: 'accounting_financial',
          name: 'Financial Accounting',
          targetCourseCode: 'ACCT 1',
          targetCourseTitle: 'Financial Accounting',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID ACCT 110',
          description: 'Financial reporting and accounting principles.'
        },
        {
          id: 'acct_mgr',
          category: 'accounting_managerial',
          name: 'Managerial Accounting',
          targetCourseCode: 'ACCT 2',
          targetCourseTitle: 'Managerial Accounting',
          units: 4,
          isCritical: false,
          cIdEquivalent: 'C-ID ACCT 120',
          description: 'Cost accounting and planning.'
        }
      ]
    case 'Biology':
    case 'Psychology':
    default:
      return [
        {
          id: 'calc_1',
          category: 'calculus',
          name: 'Calculus or Statistics',
          targetCourseCode: 'MATH 1',
          targetCourseTitle: 'Calculus or Statistics',
          units: 4,
          isCritical: true,
          cIdEquivalent: 'C-ID MATH 110',
          description: 'Quantitative foundation.'
        },
        {
          id: 'chem_1',
          category: 'chemistry',
          name: 'General Chemistry I',
          targetCourseCode: 'CHEM 1',
          targetCourseTitle: 'General Chemistry I',
          units: 5,
          isCritical: true,
          cIdEquivalent: 'C-ID CHEM 110',
          description: 'General chemistry with laboratory.'
        },
        {
          id: 'bio_1',
          category: 'biology',
          name: 'General Biology I',
          targetCourseCode: 'BIOL 1',
          targetCourseTitle: 'General Biology I',
          units: 5,
          isCritical: true,
          cIdEquivalent: 'C-ID BIOL 190',
          description: 'Cell and molecular biology with lab.'
        }
      ]
  }
}

/**
 * Intelligent course classifier to identify which canonical requirement
 * a California Community College course code matches.
 */
export function classifyCccCourse(courseCode: string, courseTitle?: string): TargetMajorRequirement['category'] | 'ge_writing' | 'ge_oral_comm' | 'ge_critical_thinking' | 'general' {
  const code = courseCode.toUpperCase().replace(/\s+/g, ' ').trim()
  const title = (courseTitle || '').toUpperCase().trim()

  // 1. Calculus & Advanced Math
  if (code.match(/\b(MATH|MATHEMATICS)\b/)) {
    // Multivariable / Calc III
    if (/\b(MULTIVARIABLE|CALCULUS (III|3))\b/.test(title) || code.match(/\b(3|1C|2C|2D|3C|230|32|143|5C|290|53)\b/)) {
      return 'multivariable'
    }
    // Differential Equations
    if (title.includes('DIFFERENTIAL EQUATION') || code.match(/\b(4B|240|33B)\b/)) {
      return 'diff_equations'
    }
    // Linear Algebra
    if (title.includes('LINEAR ALGEBRA') || code.match(/\b(3A|4A|250|33A|18|54|244)\b/)) {
      return 'linear_algebra'
    }
    // Calculus II
    if (/\bCALCULUS (II|2)\b/.test(title) || code.match(/\b(2|1B|2B|3B|220|31|142|5B|191|151)\b/)) {
      return 'calculus_2'
    }
    // Calculus I
    if (/\bCALCULUS (I|1)\b/.test(title) || (title.includes('CALCULUS') && !/\b(II|III|2|3)\b/.test(title)) || code.match(/\b(1|1A|2A|3A|210|30|141|5A|190|150)\b/)) {
      return 'calculus'
    }
    // Statistics
    if (title.includes('STATISTICS') || title.includes('PROBABILITY') || code.match(/\b(STAT|STATS|STATISTICS|10|110)\b/)) {
      return 'statistics'
    }
  }

  // 2. Computer Science / Programming
  if (code.match(/\b(CS|CIS|COMPSC|COMSC|CSE|COMP|ICS|PROG)\b/)) {
    if (title.includes('DISCRETE') || code.match(/\b(42|6B|6D|70|152|20)\b/)) {
      return 'discrete_math'
    }
    if (title.includes('DATA STRUCTURE') || title.includes('METHODOLOGY II') || title.includes('INTERMEDIATE PROGRAMMING') || code.match(/\b(2|132|1B|61B|32|33|46B|202|22C|36)\b/)) {
      return 'data_structures'
    }
    if (title.includes('ARCHITECTURE') || title.includes('ORGANIZATION') || title.includes('MACHINE') || code.match(/\b(3|142|61C|51|21)\b/)) {
      return 'computer_architecture'
    }
    if (title.includes('PROGRAMMING') || title.includes('COMPUTER SCIENCE') || title.includes('METHODOLOGY I') || code.match(/\b(1|10|11|122|1A|31|46A|101|22A|22B|35)\b/)) {
      return 'programming_intro'
    }
  }

  // 3. Physics
  if (code.match(/\b(PHYS|PHYSICS)\b/)) {
    if (title.includes('MECHANICS') || code.match(/\b(1A|4A|205|141|1|40)\b/)) {
      return 'physics_mechanics'
    }
    if (title.includes('ELECTRIC') || title.includes('MAGNET') || code.match(/\b(1B|4B|210|142|2|41)\b/)) {
      return 'physics_em'
    }
  }

  // 4. Chemistry & Biology
  if (code.match(/\b(CHEM|CHEMISTRY)\b/)) {
    return 'chemistry'
  }
  if (code.match(/\b(BIO|BIOL|BIOLOGY)\b/)) {
    return 'biology'
  }

  // 5. Economics & Business
  if (code.match(/\b(ECON|ECONOMICS)\b/)) {
    if (title.includes('MICRO') || code.match(/\b(1|1A|20A|202|102)\b/)) {
      return 'microeconomics'
    }
    if (title.includes('MACRO') || code.match(/\b(2|1B|20B|201|101)\b/)) {
      return 'macroeconomics'
    }
  }
  if (code.match(/\b(ACCT|ACCOUNTING)\b/)) {
    if (title.includes('FINANCIAL') || code.match(/\b(1|1A|110|30A|101)\b/)) {
      return 'accounting_financial'
    }
    if (title.includes('MANAGERIAL') || code.match(/\b(2|1B|120|30B|102)\b/)) {
      return 'accounting_managerial'
    }
  }

  // 6. General Education Foundations
  if (code.match(/\b(COMM|SPEECH)\b/)) {
    return 'ge_oral_comm'
  }
  if (code.match(/\b(ENGL|ENGLISH|WRIT)\b/)) {
    if (title.includes('CRITICAL') || code.match(/\b(1B|1C|2|7|105)\b/)) {
      return 'ge_critical_thinking'
    }
    return 'ge_writing'
  }

  return 'general'
}

/**
 * Audit course articulation and major preparation against destination university requirements.
 */
export function auditCourseArticulation(params: {
  targetCampus: string
  targetMajor: string
  courses: Array<{
    code: string
    title?: string
    units?: number
    grade?: string
    term?: string
  }>
}): MajorPreparationAudit {
  const { targetCampus, targetMajor, courses } = params

  const campusReqs = CAMPUS_MAJOR_REQUIREMENTS[targetCampus]?.[targetMajor]
  const requirementsList = campusReqs || getGenericMajorRequirements(targetMajor)

  const articulatedCourses: CourseArticulationMatch[] = []
  const satisfiedRequirementIds = new Set<string>()
  const plannedRequirementIds = new Set<string>()

  // Audit each course
  courses.forEach((course) => {
    const category = classifyCccCourse(course.code, course.title)
    const isPlanned =
      !course.grade ||
      ['IP', 'PL', 'IN PROGRESS', 'PLANNED', '--'].includes(course.grade.toUpperCase().trim())

    // Find if it fulfills a major preparation requirement
    const matchedReq = requirementsList.find(
      (req) => req.category === category && !satisfiedRequirementIds.has(req.id)
    )

    if (matchedReq) {
      if (isPlanned) {
        plannedRequirementIds.add(matchedReq.id)
      } else {
        satisfiedRequirementIds.add(matchedReq.id)
        plannedRequirementIds.delete(matchedReq.id)
      }

      articulatedCourses.push({
        originCourseCode: course.code,
        originCourseTitle: course.title || matchedReq.name,
        originUnits: course.units || 4,
        originGrade: course.grade,
        originTerm: course.term,
        targetCampus,
        targetMajor,
        targetCourseCode: matchedReq.targetCourseCode,
        targetCourseTitle: matchedReq.targetCourseTitle,
        targetUnits: matchedReq.units,
        fulfillsRequirementId: matchedReq.id,
        fulfillsRequirementName: matchedReq.name,
        requirementType: matchedReq.isCritical ? 'major_prep_critical' : 'major_prep_elective',
        cIdCode: matchedReq.cIdEquivalent,
        notes: `Direct articulation: satisfies ${targetCampus} ${matchedReq.targetCourseCode} (${matchedReq.targetCourseTitle}).`,
        isArticulated: true
      })
    } else {
      // General Education or elective articulation
      let fulfillsName = 'Transferable General Elective'
      let reqType: CourseArticulationMatch['requirementType'] = 'general_elective'

      if (category === 'ge_writing') {
        fulfillsName = 'UC/CSU Written Communication (English Composition)'
        reqType = 'ge_foundation'
      } else if (category === 'ge_critical_thinking') {
        fulfillsName = 'Critical Thinking & Advanced Composition'
        reqType = 'ge_foundation'
      } else if (category === 'ge_oral_comm') {
        fulfillsName = 'CSU Golden Four (A1 Oral Communication)'
        reqType = 'ge_foundation'
      } else if (category === 'statistics' || category === 'calculus') {
        fulfillsName = 'Quantitative Reasoning Foundation'
        reqType = 'ge_foundation'
      }

      articulatedCourses.push({
        originCourseCode: course.code,
        originCourseTitle: course.title || fulfillsName,
        originUnits: course.units || 3,
        originGrade: course.grade,
        originTerm: course.term,
        targetCampus,
        targetMajor,
        targetCourseCode: `${targetCampus.split(' ')[0]} Elective`,
        targetCourseTitle: fulfillsName,
        targetUnits: course.units || 3,
        fulfillsRequirementName: fulfillsName,
        requirementType: reqType,
        notes: `Transferable toward 60-unit threshold and general education breadth.`,
        isArticulated: true
      })
    }
  })

  // Build requirement status list
  const requirementsStatus = requirementsList.map((req) => {
    const isSatisfied = satisfiedRequirementIds.has(req.id)
    const isPlanned = plannedRequirementIds.has(req.id)

    const matchingCourse = articulatedCourses.find((c) => c.fulfillsRequirementId === req.id)

    return {
      requirement: req,
      status: (isSatisfied ? 'satisfied' : isPlanned ? 'planned' : 'missing') as 'satisfied' | 'planned' | 'missing',
      matchedCourse: matchingCourse
        ? {
            code: matchingCourse.originCourseCode,
            title: matchingCourse.originCourseTitle,
            grade: matchingCourse.originGrade,
            term: matchingCourse.originTerm
          }
        : undefined
    }
  })

  const satisfiedCount = satisfiedRequirementIds.size
  const plannedCount = plannedRequirementIds.size
  const missingCount = requirementsList.length - satisfiedCount - plannedCount
  const completionPercentage = Math.round((satisfiedCount / requirementsList.length) * 100)

  // Generate actionable recommendations
  const recommendations: string[] = []
  const missingCritical = requirementsStatus.filter((r) => r.status === 'missing' && r.requirement.isCritical)

  if (missingCritical.length > 0) {
    recommendations.push(
      `Priority prerequisite gap: You are missing ${missingCritical.map((r) => r.requirement.name).join(', ')} required for ${targetCampus} ${targetMajor}. Plan these in your upcoming term.`
    )
  }

  if (completionPercentage >= 75) {
    recommendations.push(
      `Strong major prep positioning: You have completed ${completionPercentage}% of lower-division major requirements for ${targetCampus} ${targetMajor}.`
    )
  } else {
    recommendations.push(
      `To maximize admissions competitiveness, complete at least 70% of major preparation courses prior to the spring term before transfer.`
    )
  }

  recommendations.push(
    `Verify official articulation agreement agreements on ASSIST.org for ${targetCampus} and your community college.`
  )

  return {
    targetCampus,
    targetMajor,
    totalRequirements: requirementsList.length,
    satisfiedCount,
    plannedCount,
    missingCount,
    completionPercentage,
    requirements: requirementsStatus,
    articulatedCourses,
    recommendations
  }
}

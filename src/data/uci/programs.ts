import { DegreeProgram } from '../../academic-engine/types'

export const UCI_DEGREE_PROGRAMS: DegreeProgram[] = [
  // =========================================================================
  // Computer Science B.S. (Donald Bren School of ICS)
  // =========================================================================
  {
    id: 'CS_BS_2026',
    name: 'Computer Science B.S.',
    catalogYear: '2026-27',
    school: 'Donald Bren School of Information and Computer Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'cs_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Lower-Division Core Requirements',
        requirements: [
          {
            id: 'cs_intro_prog',
            name: 'Introductory Programming Sequence',
            description: 'Complete Python fundamentals through intermediate software design.',
            type: 'ALL_OF',
            courses: ['ICS 31', 'ICS 32', 'ICS 33']
          },
          {
            id: 'cs_data_structures',
            name: 'C++ & Data Structures Core',
            description: 'Intermediate programming and algorithm design in C++.',
            type: 'ALL_OF',
            courses: ['ICS 45C', 'ICS 46']
          },
          {
            id: 'cs_math_foundations',
            name: 'Calculus & Linear Algebra Foundations',
            description: 'Differential calculus, integral calculus, and linear algebra.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 3A']
          },
          {
            id: 'cs_stats',
            name: 'Statistics Requirement',
            description: 'Probability and statistics for computer science.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 1,
            courses: ['STATS 67', 'MATH 130A']
          }
        ]
      },
      {
        id: 'cs_upper_div',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Core Requirements',
        requirements: [
          {
            id: 'cs_algorithms',
            name: 'Design and Analysis of Algorithms',
            description: 'Formal algorithm complexity, graph algorithms, dynamic programming, and NP-completeness.',
            type: 'ALL_OF',
            courses: ['CS 161']
          },
          {
            id: 'cs_advanced_math',
            name: 'Upper-Division Mathematical Foundations',
            description: 'Select at least one upper-division course in analysis, proofs, or applied mathematics.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 1,
            courses: ['MATH 13', 'MATH 105A']
          }
        ]
      },
      {
        id: 'cs_electives',
        category: 'MAJOR_ELECTIVES',
        name: 'Upper-Division Major Electives',
        requirements: [
          {
            id: 'cs_track_electives',
            name: 'Computer Science Track Electives',
            description: 'Complete at least 2 courses from advanced ICS/CS electives.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 2,
            courses: ['IN4MATX 43', 'CS 161', 'MATH 105A']
          }
        ]
      },
      {
        id: 'cs_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'cs_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'cs_min_upper_div_units',
            name: '60 Upper-Division Units Minimum',
            description: 'At least 60 units must be completed in upper-division courses (numbered 100-199).',
            type: 'MIN_UPPER_DIV_UNITS',
            targetCount: 60
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Mathematics B.S. (School of Physical Sciences)
  // =========================================================================
  {
    id: 'MATH_BS_2026',
    name: 'Mathematics B.S.',
    catalogYear: '2026-27',
    school: 'School of Physical Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'math_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Lower-Division Mathematics Core',
        requirements: [
          {
            id: 'math_calc_series',
            name: 'Calculus and Multivariable Calculus',
            description: 'Single-variable differential and integral calculus, and multivariable calculus.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D']
          },
          {
            id: 'math_linear_proofs',
            name: 'Linear Algebra & Introduction to Abstract Mathematics',
            description: 'Matrix algebra, vector spaces, logic, sets, and rigorous mathematical proofs.',
            type: 'ALL_OF',
            courses: ['MATH 3A', 'MATH 13']
          },
          {
            id: 'math_computation',
            name: 'Computational Requirement',
            description: 'At least one introductory programming course.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 1,
            courses: ['ICS 31']
          }
        ]
      },
      {
        id: 'math_upper_div',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Core Requirements',
        requirements: [
          {
            id: 'math_real_analysis',
            name: 'Elementary Analysis I',
            description: 'Rigorous development of real numbers, continuity, limits, and differentiation.',
            type: 'ALL_OF',
            courses: ['MATH 140A']
          },
          {
            id: 'math_numerical_analysis',
            name: 'Numerical Analysis or Advanced Computing',
            description: 'Methods for solving linear/nonlinear equations, interpolation, and numerical calculus.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 1,
            courses: ['MATH 105A']
          }
        ]
      },
      {
        id: 'math_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'math_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'math_min_upper_div_units',
            name: '60 Upper-Division Units Minimum',
            description: 'At least 60 units must be completed in upper-division courses (numbered 100-199).',
            type: 'MIN_UPPER_DIV_UNITS',
            targetCount: 60
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Software Engineering B.S. (Donald Bren School of ICS)
  // =========================================================================
  {
    id: 'SE_BS_2026',
    name: 'Software Engineering B.S.',
    catalogYear: '2026-27',
    school: 'Donald Bren School of Information and Computer Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'se_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Lower-Division Core Requirements',
        requirements: [
          {
            id: 'se_intro_prog',
            name: 'Introductory Programming Sequence',
            description: 'Fundamental Python programming sequence.',
            type: 'ALL_OF',
            courses: ['ICS 31', 'ICS 32', 'ICS 33']
          },
          {
            id: 'se_data_structures',
            name: 'C++ & Data Structures Core',
            description: 'Object-oriented programming and algorithmic data structures.',
            type: 'ALL_OF',
            courses: ['ICS 45C', 'ICS 46']
          },
          {
            id: 'se_intro_se',
            name: 'Software Engineering Fundamentals',
            description: 'Software development lifecycle, version control, and design concepts.',
            type: 'ALL_OF',
            courses: ['IN4MATX 43']
          },
          {
            id: 'se_discrete_math',
            name: 'Discrete Mathematics',
            description: 'Boolean algebra, logic, combinatorics, and discrete structures.',
            type: 'ALL_OF',
            courses: ['ICS 6B', 'ICS 6D']
          },
          {
            id: 'se_math_stats',
            name: 'Mathematics & Statistics',
            description: 'Calculus and statistics for computer science.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'STATS 67']
          }
        ]
      },
      {
        id: 'se_upper_div',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Core Requirements',
        requirements: [
          {
            id: 'se_core_swe',
            name: 'Software Engineering Methodology',
            description: 'Requirements engineering, software testing/QA, and software architecture.',
            type: 'ALL_OF',
            courses: ['IN4MATX 113', 'IN4MATX 115', 'IN4MATX 121', 'IN4MATX 122']
          },
          {
            id: 'se_algorithms',
            name: 'Design and Analysis of Algorithms',
            description: 'Formal algorithms and complexity analysis.',
            type: 'ALL_OF',
            courses: ['CS 161']
          },
          {
            id: 'se_writing',
            name: 'Upper-Division Technical Writing',
            description: 'Critical professional writing in computing.',
            type: 'ALL_OF',
            courses: ['I&C SCI 139W']
          }
        ]
      },
      {
        id: 'se_capstone',
        category: 'UPPER_DIVISION',
        name: 'Senior Design Capstone',
        requirements: [
          {
            id: 'se_capstone_seq',
            name: 'Senior Design Project I & II',
            description: 'Two-quarter industry capstone software engineering development project.',
            type: 'ALL_OF',
            courses: ['IN4MATX 191A', 'IN4MATX 191B']
          }
        ]
      },
      {
        id: 'se_electives',
        category: 'MAJOR_ELECTIVES',
        name: 'Major Electives',
        requirements: [
          {
            id: 'se_tech_electives',
            name: 'Software Electives',
            description: 'Complete at least 2 courses in advanced computing and intelligence.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 2,
            courses: ['COMPSCI 121', 'COMPSCI 141', 'COMPSCI 171', 'COMPSCI 178']
          }
        ]
      },
      {
        id: 'se_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'se_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'se_min_upper_div_units',
            name: '60 Upper-Division Units Minimum',
            description: 'At least 60 units must be completed in upper-division courses (numbered 100-199).',
            type: 'MIN_UPPER_DIV_UNITS',
            targetCount: 60
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Data Science B.S. (Donald Bren School of ICS)
  // =========================================================================
  {
    id: 'DS_BS_2026',
    name: 'Data Science B.S.',
    catalogYear: '2026-27',
    school: 'Donald Bren School of Information and Computer Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'ds_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Lower-Division Core Requirements',
        requirements: [
          {
            id: 'ds_intro_prog',
            name: 'Introductory Programming Sequence',
            description: 'Python fundamentals through intermediate software design.',
            type: 'ALL_OF',
            courses: ['ICS 31', 'ICS 32', 'ICS 33']
          },
          {
            id: 'ds_data_structures',
            name: 'C++ & Data Structures Core',
            description: 'Intermediate programming and data structures.',
            type: 'ALL_OF',
            courses: ['ICS 45C', 'ICS 46']
          },
          {
            id: 'ds_math_foundations',
            name: 'Calculus & Linear Algebra Foundations',
            description: 'Single-variable and multivariable calculus, and linear algebra.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A']
          },
          {
            id: 'ds_stats_intro',
            name: 'Introduction to Probability and Statistics',
            description: 'Applied statistical reasoning and probability.',
            type: 'ALL_OF',
            courses: ['STATS 67']
          }
        ]
      },
      {
        id: 'ds_upper_div',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Core Requirements',
        requirements: [
          {
            id: 'ds_prob_stats_seq',
            name: 'Theory of Probability & Statistics Sequence',
            description: 'Three-quarter rigorous statistical theory sequence.',
            type: 'ALL_OF',
            courses: ['STATS 120A', 'STATS 120B', 'STATS 120C']
          },
          {
            id: 'ds_algorithms',
            name: 'Design and Analysis of Algorithms',
            description: 'Algorithm complexity and graph/optimization algorithms.',
            type: 'ALL_OF',
            courses: ['CS 161']
          },
          {
            id: 'ds_machine_learning',
            name: 'Machine Learning and Data Mining',
            description: 'Supervised and unsupervised statistical machine learning.',
            type: 'ALL_OF',
            courses: ['COMPSCI 178']
          },
          {
            id: 'ds_writing',
            name: 'Technical Writing Requirement',
            description: 'Upper-division technical writing in information sciences.',
            type: 'ALL_OF',
            courses: ['I&C SCI 139W']
          }
        ]
      },
      {
        id: 'ds_electives',
        category: 'MAJOR_ELECTIVES',
        name: 'Data Science Electives',
        requirements: [
          {
            id: 'ds_applied_electives',
            name: 'Applied Machine Learning & Computing Electives',
            description: 'Select at least 2 courses from AI, Information Retrieval, or Advanced Math.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 2,
            courses: ['COMPSCI 121', 'COMPSCI 171', 'MATH 105A', 'MATH 140A']
          }
        ]
      },
      {
        id: 'ds_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'ds_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'ds_min_upper_div_units',
            name: '60 Upper-Division Units Minimum',
            description: 'At least 60 units must be completed in upper-division courses (numbered 100-199).',
            type: 'MIN_UPPER_DIV_UNITS',
            targetCount: 60
          }
        ]
      }
    ]
  },

  // =========================================================================
  // Computer Engineering B.S. (The Henry Samueli School of Engineering)
  // =========================================================================
  {
    id: 'CPE_BS_2026',
    name: 'Computer Engineering B.S.',
    catalogYear: '2026-27',
    school: 'The Henry Samueli School of Engineering',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'cpe_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Lower-Division Engineering Core',
        requirements: [
          {
            id: 'cpe_intro_prog',
            name: 'Programming & Data Structures',
            description: 'Foundations of programming and algorithmic data structures.',
            type: 'ALL_OF',
            courses: ['ICS 31', 'ICS 32', 'ICS 45C', 'ICS 46']
          },
          {
            id: 'cpe_math',
            name: 'Mathematics Foundations',
            description: 'Calculus, multivariable calculus, and linear algebra.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A']
          },
          {
            id: 'cpe_digital_logic',
            name: 'Digital Systems & Laboratory',
            description: 'Introduction to digital systems and logic design lab.',
            type: 'ALL_OF',
            courses: ['EECS 31', 'EECS 31L']
          }
        ]
      },
      {
        id: 'cpe_upper_div',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Core Requirements',
        requirements: [
          {
            id: 'cpe_arch_algo',
            name: 'Computer Systems Architecture & Algorithms',
            description: 'Hardware computer systems architecture and design/analysis of algorithms.',
            type: 'ALL_OF',
            courses: ['COMPSCI 152', 'CS 161']
          },
          {
            id: 'cpe_writing',
            name: 'Technical Writing',
            description: 'Upper-division technical writing.',
            type: 'ALL_OF',
            courses: ['I&C SCI 139W']
          }
        ]
      },
      {
        id: 'cpe_electives',
        category: 'MAJOR_ELECTIVES',
        name: 'Engineering Electives',
        requirements: [
          {
            id: 'cpe_tech_electives',
            name: 'Technical Engineering Electives',
            description: 'Complete at least 2 courses from advanced programming, AI, or statistics.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 2,
            courses: ['COMPSCI 141', 'COMPSCI 171', 'STATS 67']
          }
        ]
      },
      {
        id: 'cpe_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'cpe_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'cpe_min_upper_div_units',
            name: '60 Upper-Division Units Minimum',
            description: 'At least 60 units must be completed in upper-division courses (numbered 100-199).',
            type: 'MIN_UPPER_DIV_UNITS',
            targetCount: 60
          }
        ]
      }
    ]
  }
]

export function getDegreeProgramById(id: string): DegreeProgram | undefined {
  return UCI_DEGREE_PROGRAMS.find((p) => p.id === id)
}

export function getDegreeProgramByName(name: string): DegreeProgram | undefined {
  return UCI_DEGREE_PROGRAMS.find(
    (p) => p.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(p.name.toLowerCase())
  )
}

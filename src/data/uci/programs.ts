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

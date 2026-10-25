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
  },

  // =========================================================================
  // Informatics B.S. (Donald Bren School of Information and Computer Sciences)
  // =========================================================================
  {
    id: 'INFORMATICS_BS_2026',
    name: 'Informatics B.S.',
    catalogYear: '2026-27',
    school: 'Donald Bren School of Information and Computer Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'inf_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Lower-Division Core',
        requirements: [
          {
            id: 'inf_intro_prog',
            name: 'Introductory Programming Sequence',
            description: 'Python foundations and intermediate software design.',
            type: 'ALL_OF',
            courses: ['ICS 31', 'ICS 32', 'ICS 33']
          },
          {
            id: 'inf_core_lower',
            name: 'Informatics Foundations',
            description: 'Java programming and software engineering concepts.',
            type: 'ALL_OF',
            courses: ['ICS 45J', 'IN4MATX 43']
          }
        ]
      },
      {
        id: 'inf_upper_div',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Core',
        requirements: [
          {
            id: 'inf_core_upper',
            name: 'Informatics Core Requirements',
            description: 'User experience, requirements analysis, and system architecture.',
            type: 'ALL_OF',
            courses: ['IN4MATX 113', 'IN4MATX 121', 'IN4MATX 131', 'IN4MATX 151', 'IN4MATX 161']
          }
        ]
      },
      {
        id: 'inf_capstone',
        category: 'UPPER_DIVISION',
        name: 'Senior Capstone Project',
        requirements: [
          {
            id: 'inf_capstone_seq',
            name: 'Senior Design Capstone',
            description: 'Two-quarter client-sponsored project.',
            type: 'ALL_OF',
            courses: ['IN4MATX 191A', 'IN4MATX 191B']
          }
        ]
      },
      {
        id: 'inf_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'inf_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'inf_min_upper_div_units',
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
  // Game Design and Interactive Media B.S. (Donald Bren School of Information and Computer Sciences)
  // =========================================================================
  {
    id: 'GDIM_BS_2026',
    name: 'Game Design and Interactive Media B.S.',
    catalogYear: '2026-27',
    school: 'Donald Bren School of Information and Computer Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'gdim_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Lower-Division Game Design Core',
        requirements: [
          {
            id: 'gdim_prog',
            name: 'Programming Sequence',
            description: 'Complete introductory programming.',
            type: 'ALL_OF',
            courses: ['ICS 31', 'ICS 32', 'ICS 33']
          },
          {
            id: 'gdim_design_core',
            name: 'Game Foundations',
            description: 'Game mechanics, society, and production.',
            type: 'ALL_OF',
            courses: ['GDIM 25', 'GDIM 31', 'GDIM 41']
          }
        ]
      },
      {
        id: 'gdim_upper_div',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Game Systems',
        requirements: [
          {
            id: 'gdim_systems',
            name: 'Game Architecture & Narrative',
            description: 'Multiplayer networks, storytelling, and 3D engines.',
            type: 'ALL_OF',
            courses: ['GDIM 161', 'GDIM 167', 'CS 113']
          }
        ]
      },
      {
        id: 'gdim_capstone',
        category: 'UPPER_DIVISION',
        name: 'Game Studio Capstone',
        requirements: [
          {
            id: 'gdim_capstone_seq',
            name: 'Senior Game Studio Project',
            description: 'Two-quarter game development capstone.',
            type: 'ALL_OF',
            courses: ['GDIM 168', 'GDIM 169']
          }
        ]
      },
      {
        id: 'gdim_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'gdim_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'gdim_min_upper_div_units',
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
  // Business Information Management B.S. (Donald Bren School of Information and Computer Sciences)
  // =========================================================================
  {
    id: 'BIM_BS_2026',
    name: 'Business Information Management B.S.',
    catalogYear: '2026-27',
    school: 'Donald Bren School of Information and Computer Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'bim_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Lower-Division Business & CS Core',
        requirements: [
          {
            id: 'bim_prog',
            name: 'Computing Foundations',
            description: 'Programming sequence in Python.',
            type: 'ALL_OF',
            courses: ['ICS 31', 'ICS 32', 'ICS 33']
          },
          {
            id: 'bim_econ_acct',
            name: 'Economics & Accounting',
            description: 'Micro/macro economics and financial/managerial accounting.',
            type: 'ALL_OF',
            courses: ['ECON 20A', 'ECON 20B', 'MGMT 30A', 'MGMT 30B']
          }
        ]
      },
      {
        id: 'bim_upper_div',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Systems & Management',
        requirements: [
          {
            id: 'bim_mgmt_core',
            name: 'Information Management Core',
            description: 'Requirements, data visualization, and organizational behavior.',
            type: 'ALL_OF',
            courses: ['IN4MATX 113', 'IN4MATX 143', 'MGMT 102', 'MGMT 105']
          }
        ]
      },
      {
        id: 'bim_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'bim_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'bim_min_upper_div_units',
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
  // Mechanical Engineering B.S. (The Henry Samueli School of Engineering)
  // =========================================================================
  {
    id: 'MECH_ENGR_BS_2026',
    name: 'Mechanical Engineering B.S.',
    catalogYear: '2026-27',
    school: 'The Henry Samueli School of Engineering',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'me_math_phys',
        category: 'LOWER_DIVISION',
        name: 'Mathematics & Physical Foundations',
        requirements: [
          {
            id: 'me_math',
            name: 'Calculus & Differential Equations',
            description: 'Calculus and differential equations series.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A', 'MATH 3D']
          },
          {
            id: 'me_phys_chem',
            name: 'Physics & Chemistry Core',
            description: 'Classical mechanics, electricity, and general chemistry.',
            type: 'ALL_OF',
            courses: ['PHYSICS 7C', 'PHYSICS 7D', 'CHEM 1A']
          }
        ]
      },
      {
        id: 'me_lower_engr',
        category: 'LOWER_DIVISION',
        name: 'Lower-Division Engineering',
        requirements: [
          {
            id: 'me_statics_cad',
            name: 'Engineering Mechanics & CAD',
            description: 'Statics, dynamics, and 3D modeling.',
            type: 'ALL_OF',
            courses: ['ENGRMAE 10', 'ENGRMAE 30', 'ENGRMAE 52', 'ENGRMAE 80']
          }
        ]
      },
      {
        id: 'me_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Mechanical Core',
        requirements: [
          {
            id: 'me_thermo_fluids',
            name: 'Thermo-Fluids & Materials',
            description: 'Fluid mechanics, heat transfer, materials, and lab.',
            type: 'ALL_OF',
            courses: ['ENGRMAE 106', 'ENGRMAE 120', 'ENGRMAE 130A', 'ENGRMAE 150']
          }
        ]
      },
      {
        id: 'me_senior_design',
        category: 'UPPER_DIVISION',
        name: 'Senior Design Capstone',
        requirements: [
          {
            id: 'me_capstone_seq',
            name: 'Mechanical Engineering Design Project',
            description: 'Two-quarter capstone design sequence.',
            type: 'ALL_OF',
            courses: ['ENGRMAE 188', 'ENGRMAE 189']
          }
        ]
      },
      {
        id: 'me_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'me_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'me_min_upper_div_units',
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
  // Electrical Engineering B.S. (The Henry Samueli School of Engineering)
  // =========================================================================
  {
    id: 'EE_BS_2026',
    name: 'Electrical Engineering B.S.',
    catalogYear: '2026-27',
    school: 'The Henry Samueli School of Engineering',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'ee_math_sci',
        category: 'LOWER_DIVISION',
        name: 'Mathematics & Physics Core',
        requirements: [
          {
            id: 'ee_math',
            name: 'Engineering Mathematics',
            description: 'Full calculus, linear algebra, and differential equations.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A', 'MATH 3D']
          },
          {
            id: 'ee_phys',
            name: 'Physics Series',
            description: 'Classical mechanics and electromagnetism.',
            type: 'ALL_OF',
            courses: ['PHYSICS 7C', 'PHYSICS 7D']
          }
        ]
      },
      {
        id: 'ee_lower_core',
        category: 'LOWER_DIVISION',
        name: 'Circuits & Programming',
        requirements: [
          {
            id: 'ee_circuits',
            name: 'Linear Circuit Analysis & Digital Logic',
            description: 'Circuit analysis, C programming, and digital logic.',
            type: 'ALL_OF',
            courses: ['EECS 10', 'EECS 31', 'EECS 31L', 'EECS 70A', 'EECS 70B']
          }
        ]
      },
      {
        id: 'ee_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Electronics & Fields',
        requirements: [
          {
            id: 'ee_fields_semi',
            name: 'Electromagnetics & Semiconductor Devices',
            description: 'Waves, semiconductors, and electronic design.',
            type: 'ALL_OF',
            courses: ['EECS 150', 'EECS 160A', 'EECS 170A', 'EECS 170B', 'EECS 180A']
          }
        ]
      },
      {
        id: 'ee_capstone',
        category: 'UPPER_DIVISION',
        name: 'Senior Design Project',
        requirements: [
          {
            id: 'ee_capstone_seq',
            name: 'EE Senior Design',
            description: 'Team project capstone.',
            type: 'ALL_OF',
            courses: ['EECS 159A', 'EECS 159B']
          }
        ]
      },
      {
        id: 'ee_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'ee_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'ee_min_upper_div_units',
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
  // Aerospace Engineering B.S. (The Henry Samueli School of Engineering)
  // =========================================================================
  {
    id: 'AERO_ENGR_BS_2026',
    name: 'Aerospace Engineering B.S.',
    catalogYear: '2026-27',
    school: 'The Henry Samueli School of Engineering',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'aero_math_sci',
        category: 'LOWER_DIVISION',
        name: 'Math, Physics & Chemistry',
        requirements: [
          {
            id: 'aero_math',
            name: 'Calculus & Differential Equations',
            description: 'Calculus series through differential equations.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A', 'MATH 3D']
          },
          {
            id: 'aero_sci',
            name: 'Physics & Chemistry',
            description: 'Mechanics, electromagnetism, and chemistry.',
            type: 'ALL_OF',
            courses: ['PHYSICS 7C', 'PHYSICS 7D', 'CHEM 1A']
          }
        ]
      },
      {
        id: 'aero_lower_core',
        category: 'LOWER_DIVISION',
        name: 'Engineering Mechanics',
        requirements: [
          {
            id: 'aero_mechanics',
            name: 'Statics and Dynamics',
            description: 'Engineering statics and dynamics.',
            type: 'ALL_OF',
            courses: ['ENGRMAE 10', 'ENGRMAE 30', 'ENGRMAE 80']
          }
        ]
      },
      {
        id: 'aero_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Flight Mechanics & Aerodynamics',
        requirements: [
          {
            id: 'aero_aero_prop',
            name: 'Aerodynamics and Aircraft Systems',
            description: 'Fluid mechanics, aerodynamics, aircraft performance, and design.',
            type: 'ALL_OF',
            courses: ['ENGRMAE 130A', 'ENGRMAE 136', 'ENGRMAE 150', 'ENGRMAE 158', 'ENGRMAE 159']
          }
        ]
      },
      {
        id: 'aero_capstone',
        category: 'UPPER_DIVISION',
        name: 'Senior Capstone Design',
        requirements: [
          {
            id: 'aero_capstone_seq',
            name: 'Aerospace Design Project',
            description: 'Two-quarter capstone design sequence.',
            type: 'ALL_OF',
            courses: ['ENGRMAE 188', 'ENGRMAE 189']
          }
        ]
      },
      {
        id: 'aero_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'aero_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'aero_min_upper_div_units',
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
  // Biomedical Engineering B.S. (The Henry Samueli School of Engineering)
  // =========================================================================
  {
    id: 'BME_BS_2026',
    name: 'Biomedical Engineering B.S.',
    catalogYear: '2026-27',
    school: 'The Henry Samueli School of Engineering',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'bme_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Math, Science & Biology Core',
        requirements: [
          {
            id: 'bme_math_phys',
            name: 'Mathematics & Physics',
            description: 'Calculus and physics sequence.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'PHYSICS 7C', 'PHYSICS 7D']
          },
          {
            id: 'bme_chem_bio',
            name: 'Chemistry & Biology',
            description: 'General chemistry and cellular biology.',
            type: 'ALL_OF',
            courses: ['CHEM 1A', 'CHEM 1B', 'BIO SCI 93']
          }
        ]
      },
      {
        id: 'bme_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Biomedical Systems & Signals',
        requirements: [
          {
            id: 'bme_systems',
            name: 'Biomechanics & Bioinstrumentation',
            description: 'Sensory systems, biomechanics, biomedical signals, and instrumentation.',
            type: 'ALL_OF',
            courses: ['BME 110A', 'BME 120', 'BME 130', 'BME 140']
          }
        ]
      },
      {
        id: 'bme_capstone',
        category: 'UPPER_DIVISION',
        name: 'Senior Design Capstone',
        requirements: [
          {
            id: 'bme_capstone_seq',
            name: 'Medical Device Design Series',
            description: 'Three-quarter senior project.',
            type: 'ALL_OF',
            courses: ['BME 180A', 'BME 180B', 'BME 180C']
          }
        ]
      },
      {
        id: 'bme_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'bme_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'bme_min_upper_div_units',
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
  // Civil Engineering B.S. (The Henry Samueli School of Engineering)
  // =========================================================================
  {
    id: 'CIVIL_ENGR_BS_2026',
    name: 'Civil Engineering B.S.',
    catalogYear: '2026-27',
    school: 'The Henry Samueli School of Engineering',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'cee_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Math & Physical Sciences',
        requirements: [
          {
            id: 'cee_math',
            name: 'Calculus & Linear Algebra',
            description: 'Calculus and matrix theory.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A']
          },
          {
            id: 'cee_phys_chem',
            name: 'Physics & Chemistry',
            description: 'Physics mechanics, electricity, and chemistry.',
            type: 'ALL_OF',
            courses: ['PHYSICS 7C', 'PHYSICS 7D', 'CHEM 1A']
          }
        ]
      },
      {
        id: 'cee_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Structural & Environmental Core',
        requirements: [
          {
            id: 'cee_structures',
            name: 'Mechanics and Infrastructure',
            description: 'Transportation, structural analysis, materials, and environmental engineering.',
            type: 'ALL_OF',
            courses: ['ENGRCEE 121', 'ENGRCEE 130', 'ENGRCEE 150', 'ENGRCEE 160']
          }
        ]
      },
      {
        id: 'cee_capstone',
        category: 'UPPER_DIVISION',
        name: 'Senior Capstone Design',
        requirements: [
          {
            id: 'cee_capstone_seq',
            name: 'Civil Engineering Senior Design',
            description: 'Comprehensive civil engineering design.',
            type: 'ALL_OF',
            courses: ['ENGRCEE 181A', 'ENGRCEE 181B']
          }
        ]
      },
      {
        id: 'cee_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'cee_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'cee_min_upper_div_units',
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
  // Chemical Engineering B.S. (The Henry Samueli School of Engineering)
  // =========================================================================
  {
    id: 'CHEM_ENGR_BS_2026',
    name: 'Chemical Engineering B.S.',
    catalogYear: '2026-27',
    school: 'The Henry Samueli School of Engineering',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'cbe_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Math, Chemistry & Physics',
        requirements: [
          {
            id: 'cbe_math',
            name: 'Calculus & Multivariable Calculus',
            description: 'Calculus series.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D']
          },
          {
            id: 'cbe_chem',
            name: 'General Chemistry Series',
            description: 'Three-quarter chemistry foundation.',
            type: 'ALL_OF',
            courses: ['CHEM 1A', 'CHEM 1B', 'CHEM 1C']
          },
          {
            id: 'cbe_phys',
            name: 'Physics',
            description: 'Physics mechanics and electromagnetism.',
            type: 'ALL_OF',
            courses: ['PHYSICS 7C', 'PHYSICS 7D']
          }
        ]
      },
      {
        id: 'cbe_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Kinetics, Transport & Thermodynamics',
        requirements: [
          {
            id: 'cbe_transport',
            name: 'Reaction & Transport Processes',
            description: 'Kinetics, fluid transport, separation processes, and thermodynamics.',
            type: 'ALL_OF',
            courses: ['CBE 110', 'CBE 120A', 'CBE 130A', 'CBE 140A']
          }
        ]
      },
      {
        id: 'cbe_lab',
        category: 'UPPER_DIVISION',
        name: 'Unit Operations Laboratory',
        requirements: [
          {
            id: 'cbe_lab_seq',
            name: 'Chemical Engineering Laboratory',
            description: 'Pilot-scale experimental operations.',
            type: 'ALL_OF',
            courses: ['CBE 160', 'CBE 161']
          }
        ]
      },
      {
        id: 'cbe_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'cbe_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'cbe_min_upper_div_units',
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
  // Materials Science and Engineering B.S. (The Henry Samueli School of Engineering)
  // =========================================================================
  {
    id: 'MSE_BS_2026',
    name: 'Materials Science and Engineering B.S.',
    catalogYear: '2026-27',
    school: 'The Henry Samueli School of Engineering',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'mse_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Math, Physics & Chemistry Foundations',
        requirements: [
          {
            id: 'mse_math',
            name: 'Calculus Series',
            description: 'Differential, integral, and multivariable calculus.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D']
          },
          {
            id: 'mse_phys_chem',
            name: 'Physics & Chemistry Core',
            description: 'Physics and general chemistry.',
            type: 'ALL_OF',
            courses: ['PHYSICS 7C', 'PHYSICS 7D', 'CHEM 1A', 'CHEM 1B']
          }
        ]
      },
      {
        id: 'mse_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Materials Properties & Characterization',
        requirements: [
          {
            id: 'mse_core_topics',
            name: 'Materials Structure & Characterization',
            description: 'Mechanical properties, polymers, electronic materials, and characterization.',
            type: 'ALL_OF',
            courses: ['MSE 141', 'MSE 151', 'MSE 155', 'MSE 164']
          }
        ]
      },
      {
        id: 'mse_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'mse_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'mse_min_upper_div_units',
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
  // Environmental Engineering B.S. (The Henry Samueli School of Engineering)
  // =========================================================================
  {
    id: 'ENVR_ENGR_BS_2026',
    name: 'Environmental Engineering B.S.',
    catalogYear: '2026-27',
    school: 'The Henry Samueli School of Engineering',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'enve_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Math, Science & Ecology',
        requirements: [
          {
            id: 'enve_math',
            name: 'Calculus Series',
            description: 'Calculus series.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D']
          },
          {
            id: 'enve_sci',
            name: 'Chemistry, Physics & Biology',
            description: 'Foundational science for environmental systems.',
            type: 'ALL_OF',
            courses: ['CHEM 1A', 'CHEM 1B', 'PHYSICS 7C', 'BIO SCI 94']
          }
        ]
      },
      {
        id: 'enve_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Water, Air & Waste Systems',
        requirements: [
          {
            id: 'enve_systems',
            name: 'Environmental Processes',
            description: 'Water quality, air pollution, remediation, and environmental engineering.',
            type: 'ALL_OF',
            courses: ['ENVE 114', 'ENVE 130', 'ENVE 162', 'ENGRCEE 160']
          }
        ]
      },
      {
        id: 'enve_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'enve_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'enve_min_upper_div_units',
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
  // Physics B.S. (School of Physical Sciences)
  // =========================================================================
  {
    id: 'PHYSICS_BS_2026',
    name: 'Physics B.S.',
    catalogYear: '2026-27',
    school: 'School of Physical Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'physics_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Classical Physics & Mathematics',
        requirements: [
          {
            id: 'physics_calc',
            name: 'Mathematics Sequence',
            description: 'Complete calculus and differential equations.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A', 'MATH 3D']
          },
          {
            id: 'physics_core_series',
            name: 'Classical Physics Sequence',
            description: 'Mechanics, electricity/magnetism, and waves/optics.',
            type: 'ALL_OF',
            courses: ['PHYSICS 7C', 'PHYSICS 7D', 'PHYSICS 7E']
          }
        ]
      },
      {
        id: 'physics_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Theoretical Physics Core',
        requirements: [
          {
            id: 'physics_theory',
            name: 'Core Theoretical Mechanics & Fields',
            description: 'Electrodynamics, mathematical methods, classical mechanics, and quantum mechanics.',
            type: 'ALL_OF',
            courses: ['PHYSICS 111A', 'PHYSICS 112A', 'PHYSICS 113A', 'PHYSICS 115A']
          }
        ]
      },
      {
        id: 'physics_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'physics_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'physics_min_upper_div_units',
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
  // Applied Physics B.S. (School of Physical Sciences)
  // =========================================================================
  {
    id: 'APPL_PHYS_BS_2026',
    name: 'Applied Physics B.S.',
    catalogYear: '2026-27',
    school: 'School of Physical Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'appl_phys_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Foundational Physics & Math',
        requirements: [
          {
            id: 'appl_phys_math',
            name: 'Calculus Series',
            description: 'Calculus and linear algebra.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A']
          },
          {
            id: 'appl_phys_series',
            name: 'Physics Series',
            description: 'Classical mechanics, electricity, and waves.',
            type: 'ALL_OF',
            courses: ['PHYSICS 7C', 'PHYSICS 7D', 'PHYSICS 7E']
          }
        ]
      },
      {
        id: 'appl_phys_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Applied Physics Core',
        requirements: [
          {
            id: 'appl_phys_applied',
            name: 'Instrumentation & Quantum Core',
            description: 'Electrodynamics, mathematical physics, quantum, and scientific electronics.',
            type: 'ALL_OF',
            courses: ['PHYSICS 111A', 'PHYSICS 112A', 'PHYSICS 115A', 'PHYSICS 120']
          }
        ]
      },
      {
        id: 'appl_phys_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'appl_phys_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'appl_phys_min_upper_div_units',
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
  // Chemistry B.S. (School of Physical Sciences)
  // =========================================================================
  {
    id: 'CHEMISTRY_BS_2026',
    name: 'Chemistry B.S.',
    catalogYear: '2026-27',
    school: 'School of Physical Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'chem_lower_div',
        category: 'LOWER_DIVISION',
        name: 'General Chemistry & Physics',
        requirements: [
          {
            id: 'chem_gen_chem',
            name: 'General Chemistry Series',
            description: 'Three quarters of general chemistry.',
            type: 'ALL_OF',
            courses: ['CHEM 1A', 'CHEM 1B', 'CHEM 1C']
          },
          {
            id: 'chem_math_phys',
            name: 'Math & Physics Foundations',
            description: 'Calculus and physics mechanics/electromagnetism.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'PHYSICS 7C', 'PHYSICS 7D']
          }
        ]
      },
      {
        id: 'chem_organic_sec',
        category: 'LOWER_DIVISION',
        name: 'Organic Chemistry Core',
        requirements: [
          {
            id: 'chem_organic_series',
            name: 'Organic Chemistry Lecture Series',
            description: 'Three quarters of organic chemistry.',
            type: 'ALL_OF',
            courses: ['CHEM 51A', 'CHEM 51B', 'CHEM 51C']
          }
        ]
      },
      {
        id: 'chem_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Inorganic & Physical Chemistry',
        requirements: [
          {
            id: 'chem_upper_reqs',
            name: 'Inorganic, Physical & Advanced Organic',
            description: 'Inorganic chemistry, physical chemistry, and advanced synthesis.',
            type: 'ALL_OF',
            courses: ['CHEM 107', 'CHEM 131A', 'CHEM 131B', 'CHEM 152']
          }
        ]
      },
      {
        id: 'chem_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'chem_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'chem_min_upper_div_units',
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
  // Earth System Science B.S. (School of Physical Sciences)
  // =========================================================================
  {
    id: 'EARTHSS_BS_2026',
    name: 'Earth System Science B.S.',
    catalogYear: '2026-27',
    school: 'School of Physical Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'earthss_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Earth System & Physical Foundations',
        requirements: [
          {
            id: 'earthss_intro',
            name: 'Earth System Core',
            description: 'Introduction to Earth system, lands, atmosphere, and cycles.',
            type: 'ALL_OF',
            courses: ['EARTHSS 1', 'EARTHSS 51', 'EARTHSS 53', 'EARTHSS 55']
          },
          {
            id: 'earthss_math_chem',
            name: 'Math & Chemistry',
            description: 'Calculus and general chemistry.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'CHEM 1A']
          }
        ]
      },
      {
        id: 'earthss_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Climate, Ocean & Atmosphere',
        requirements: [
          {
            id: 'earthss_upper_reqs',
            name: 'Global Climate & Ocean Systems',
            description: 'Climate change, oceanography, and atmospheric chemistry.',
            type: 'ALL_OF',
            courses: ['EARTHSS 114', 'EARTHSS 124', 'EARTHSS 144']
          }
        ]
      },
      {
        id: 'earthss_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'earthss_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'earthss_min_upper_div_units',
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
  // Biological Sciences B.S. (School of Biological Sciences)
  // =========================================================================
  {
    id: 'BIO_SCI_BS_2026',
    name: 'Biological Sciences B.S.',
    catalogYear: '2026-27',
    school: 'School of Biological Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'bio_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Biological Sciences Core',
        requirements: [
          {
            id: 'bio_intro_seq',
            name: 'General Biology Series',
            description: 'DNA to organisms, ecology, genetics, and biochemistry.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 94', 'BIO SCI 97', 'BIO SCI 98', 'BIO SCI 99', 'BIO SCI 100']
          }
        ]
      },
      {
        id: 'bio_chem_math',
        category: 'LOWER_DIVISION',
        name: 'Chemistry & Mathematics Core',
        requirements: [
          {
            id: 'bio_chem',
            name: 'General & Organic Chemistry',
            description: 'General chemistry and organic chemistry.',
            type: 'ALL_OF',
            courses: ['CHEM 1A', 'CHEM 1B', 'CHEM 1C', 'CHEM 51A']
          },
          {
            id: 'bio_math',
            name: 'Calculus',
            description: 'Calculus series.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B']
          }
        ]
      },
      {
        id: 'bio_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Biology Requirements',
        requirements: [
          {
            id: 'bio_breadth',
            name: 'Biological Breadth Core',
            description: 'Cell biology, ecology, microbiology, and neurobiology.',
            type: 'ALL_OF',
            courses: ['BIO SCI D103', 'BIO SCI E106', 'BIO SCI M122', 'BIO SCI N110']
          }
        ]
      },
      {
        id: 'bio_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'bio_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'bio_min_upper_div_units',
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
  // Biochemistry and Molecular Biology B.S. (School of Biological Sciences)
  // =========================================================================
  {
    id: 'BIOCHEM_BS_2026',
    name: 'Biochemistry and Molecular Biology B.S.',
    catalogYear: '2026-27',
    school: 'School of Biological Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'biochem_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Biology & Chemistry Foundations',
        requirements: [
          {
            id: 'biochem_bio',
            name: 'Biology Series',
            description: 'General biology sequence.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 94', 'BIO SCI 97', 'BIO SCI 98', 'BIO SCI 99']
          },
          {
            id: 'biochem_chem',
            name: 'Chemistry Series',
            description: 'General chemistry and organic chemistry.',
            type: 'ALL_OF',
            courses: ['CHEM 1A', 'CHEM 1B', 'CHEM 1C', 'CHEM 51A']
          }
        ]
      },
      {
        id: 'biochem_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Molecular & Cellular Biochemistry',
        requirements: [
          {
            id: 'biochem_upper_reqs',
            name: 'Biochemistry and Molecular Biology Core',
            description: 'Advanced biochemistry, gene expression, molecular lab, and microbiology.',
            type: 'ALL_OF',
            courses: ['BIO SCI M114', 'BIO SCI M116', 'BIO SCI M118', 'BIO SCI M122']
          }
        ]
      },
      {
        id: 'biochem_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'biochem_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'biochem_min_upper_div_units',
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
  // Neurobiology B.S. (School of Biological Sciences)
  // =========================================================================
  {
    id: 'NEUROBIO_BS_2026',
    name: 'Neurobiology B.S.',
    catalogYear: '2026-27',
    school: 'School of Biological Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'neuro_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Biology & Chemistry Foundations',
        requirements: [
          {
            id: 'neuro_bio',
            name: 'Biology Sequence',
            description: 'DNA, ecosystems, genetics, and biochemistry.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 94', 'BIO SCI 97', 'BIO SCI 98']
          },
          {
            id: 'neuro_chem_math',
            name: 'Chemistry & Calculus',
            description: 'General chemistry and calculus.',
            type: 'ALL_OF',
            courses: ['CHEM 1A', 'CHEM 1B', 'MATH 2A', 'MATH 2B']
          }
        ]
      },
      {
        id: 'neuro_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Neurobiology Core',
        requirements: [
          {
            id: 'neuro_upper_reqs',
            name: 'Neural Systems & Circuits',
            description: 'Neurobiology, cognitive neuroscience, neural systems, and developmental neurobiology.',
            type: 'ALL_OF',
            courses: ['BIO SCI N110', 'BIO SCI N115', 'BIO SCI N120', 'BIO SCI N152']
          }
        ]
      },
      {
        id: 'neuro_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'neuro_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'neuro_min_upper_div_units',
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
  // Developmental and Cell Biology B.S. (School of Biological Sciences)
  // =========================================================================
  {
    id: 'DEV_CELL_BIO_BS_2026',
    name: 'Developmental and Cell Biology B.S.',
    catalogYear: '2026-27',
    school: 'School of Biological Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'devcell_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Biology & Chemistry Core',
        requirements: [
          {
            id: 'devcell_bio',
            name: 'Core Biology',
            description: 'DNA, ecosystems, genetics, and biochemistry.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 94', 'BIO SCI 97', 'BIO SCI 98']
          },
          {
            id: 'devcell_chem',
            name: 'Chemistry',
            description: 'General chemistry and organic chemistry.',
            type: 'ALL_OF',
            courses: ['CHEM 1A', 'CHEM 1B', 'CHEM 51A']
          }
        ]
      },
      {
        id: 'devcell_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Cellular & Developmental Core',
        requirements: [
          {
            id: 'devcell_upper_reqs',
            name: 'Cell, Development & Stem Cells',
            description: 'Cell biology, developmental biology, and stem cell biology.',
            type: 'ALL_OF',
            courses: ['BIO SCI D103', 'BIO SCI D104', 'BIO SCI D145']
          }
        ]
      },
      {
        id: 'devcell_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'devcell_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'devcell_min_upper_div_units',
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
  // Microbiology and Immunology B.S. (School of Biological Sciences)
  // =========================================================================
  {
    id: 'MICROBIO_BS_2026',
    name: 'Microbiology and Immunology B.S.',
    catalogYear: '2026-27',
    school: 'School of Biological Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'micro_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Biological & Chemical Core',
        requirements: [
          {
            id: 'micro_bio',
            name: 'Biology Series',
            description: 'General biology sequence.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 94', 'BIO SCI 97', 'BIO SCI 98']
          },
          {
            id: 'micro_chem',
            name: 'Chemistry Series',
            description: 'General chemistry and organic chemistry.',
            type: 'ALL_OF',
            courses: ['CHEM 1A', 'CHEM 1B', 'CHEM 51A']
          }
        ]
      },
      {
        id: 'micro_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Microbiology, Virology & Immunology',
        requirements: [
          {
            id: 'micro_upper_reqs',
            name: 'Pathogenesis & Immunity',
            description: 'Immunology, microbiology, and virology.',
            type: 'ALL_OF',
            courses: ['BIO SCI M121', 'BIO SCI M122', 'BIO SCI M124']
          }
        ]
      },
      {
        id: 'micro_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'micro_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'micro_min_upper_div_units',
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
  // Ecology and Evolutionary Biology B.S. (School of Biological Sciences)
  // =========================================================================
  {
    id: 'EEB_BS_2026',
    name: 'Ecology and Evolutionary Biology B.S.',
    catalogYear: '2026-27',
    school: 'School of Biological Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'eeb_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Biological & Mathematical Core',
        requirements: [
          {
            id: 'eeb_bio',
            name: 'General Biology',
            description: 'DNA, ecosystems, genetics, and biochemistry.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 94', 'BIO SCI 97', 'BIO SCI 98']
          },
          {
            id: 'eeb_math',
            name: 'Calculus',
            description: 'Calculus sequence.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B']
          }
        ]
      },
      {
        id: 'eeb_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Ecology, Evolution & Conservation',
        requirements: [
          {
            id: 'eeb_upper_reqs',
            name: 'Ecological Systems',
            description: 'Ecology, evolution, and conservation biology.',
            type: 'ALL_OF',
            courses: ['BIO SCI E106', 'BIO SCI E115', 'BIO SCI E138']
          }
        ]
      },
      {
        id: 'eeb_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'eeb_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'eeb_min_upper_div_units',
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
  // Business Administration B.A. (The Paul Merage School of Business)
  // =========================================================================
  {
    id: 'BUS_ADMIN_BA_2026',
    name: 'Business Administration B.A.',
    catalogYear: '2026-27',
    school: 'The Paul Merage School of Business',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'bus_admin_lower',
        category: 'LOWER_DIVISION',
        name: 'Lower-Division Business Core',
        requirements: [
          {
            id: 'bus_admin_foundations',
            name: 'Business, Economics & Accounting',
            description: 'Management intro, accounting, and micro/macro economics.',
            type: 'ALL_OF',
            courses: ['MGMT 1', 'MGMT 30A', 'MGMT 30B', 'ECON 20A', 'ECON 20B', 'MATH 2A']
          }
        ]
      },
      {
        id: 'bus_admin_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Business Core',
        requirements: [
          {
            id: 'bus_admin_mgmt_core',
            name: 'Management Functional Core',
            description: 'Management, organizational behavior, marketing, IT, operations, and finance.',
            type: 'ALL_OF',
            courses: ['MGMT 101', 'MGMT 102', 'MGMT 105', 'MGMT 107', 'MGMT 109', 'MGMT 110']
          }
        ]
      },
      {
        id: 'bus_admin_capstone',
        category: 'UPPER_DIVISION',
        name: 'Strategic Management Capstone',
        requirements: [
          {
            id: 'bus_admin_capstone_req',
            name: 'Senior Capstone',
            description: 'Strategic management case studies.',
            type: 'ALL_OF',
            courses: ['MGMT 190']
          }
        ]
      },
      {
        id: 'bus_admin_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'bus_admin_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'bus_admin_min_upper_div_units',
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
  // Economics B.A. (School of Social Sciences)
  // =========================================================================
  {
    id: 'ECON_BA_2026',
    name: 'Economics B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'econ_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Economics, Math & Statistics',
        requirements: [
          {
            id: 'econ_intro',
            name: 'Micro, Macro & Math',
            description: 'Microeconomics, macroeconomics, calculus, and statistics.',
            type: 'ALL_OF',
            courses: ['ECON 20A', 'ECON 20B', 'MATH 2A', 'MATH 2B', 'STATS 67']
          }
        ]
      },
      {
        id: 'econ_intermediate',
        category: 'UPPER_DIVISION',
        name: 'Intermediate Economic Theory',
        requirements: [
          {
            id: 'econ_theory',
            name: 'Micro and Macro Analysis',
            description: 'Intermediate micro and macro economics.',
            type: 'ALL_OF',
            courses: ['ECON 100A', 'ECON 100B', 'ECON 100C']
          }
        ]
      },
      {
        id: 'econ_econometrics',
        category: 'UPPER_DIVISION',
        name: 'Econometric Analysis',
        requirements: [
          {
            id: 'econ_metrics',
            name: 'Econometrics Sequence',
            description: 'Applied econometrics and regression analysis.',
            type: 'ALL_OF',
            courses: ['ECON 122A', 'ECON 122B']
          }
        ]
      },
      {
        id: 'econ_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'econ_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'econ_min_upper_div_units',
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
  // Business Economics B.A. (School of Social Sciences)
  // =========================================================================
  {
    id: 'BUS_ECON_BA_2026',
    name: 'Business Economics B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'bus_econ_lower',
        category: 'LOWER_DIVISION',
        name: 'Economics, Accounting & Math',
        requirements: [
          {
            id: 'bus_econ_foundations',
            name: 'Micro, Macro, Accounting & Calculus',
            description: 'Intro economics, financial/managerial accounting, and math.',
            type: 'ALL_OF',
            courses: ['ECON 20A', 'ECON 20B', 'MGMT 30A', 'MGMT 30B', 'MATH 2A', 'STATS 67']
          }
        ]
      },
      {
        id: 'bus_econ_core',
        category: 'UPPER_DIVISION',
        name: 'Intermediate Economics & Corporate Finance',
        requirements: [
          {
            id: 'bus_econ_upper_reqs',
            name: 'Business Economic Analysis',
            description: 'Intermediate micro, macro, econometrics, corporate finance, and forecasting.',
            type: 'ALL_OF',
            courses: ['ECON 100A', 'ECON 100B', 'ECON 122A', 'ECON 134A', 'ECON 135']
          }
        ]
      },
      {
        id: 'bus_econ_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'bus_econ_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'bus_econ_min_upper_div_units',
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
  // Political Science B.A. (School of Social Sciences)
  // =========================================================================
  {
    id: 'POL_SCI_BA_2026',
    name: 'Political Science B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'pol_sci_lower',
        category: 'LOWER_DIVISION',
        name: 'Introduction to Political Science',
        requirements: [
          {
            id: 'pol_sci_intro',
            name: 'Subfields of Political Science',
            description: 'American government, international relations, comparative politics, and law.',
            type: 'ALL_OF',
            courses: ['POL SCI 21A', 'POL SCI 41A', 'POL SCI 51A', 'POL SCI 71A']
          }
        ]
      },
      {
        id: 'pol_sci_upper',
        category: 'UPPER_DIVISION',
        name: 'Upper-Division Political Science Core',
        requirements: [
          {
            id: 'pol_sci_upper_reqs',
            name: 'Institutions, Security & Constitutional Law',
            description: 'American institutions, international security, and constitutional law.',
            type: 'ALL_OF',
            courses: ['POL SCI 120A', 'POL SCI 140A', 'POL SCI 171A']
          }
        ]
      },
      {
        id: 'pol_sci_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'pol_sci_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'pol_sci_min_upper_div_units',
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
  // Psychology B.A. (School of Social Sciences)
  // =========================================================================
  {
    id: 'PSYCH_BA_2026',
    name: 'Psychology B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'psych_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Psychological Fundamentals & Math',
        requirements: [
          {
            id: 'psych_fundamentals',
            name: 'Psychology Sequence',
            description: 'Three quarters of fundamental psychology and calculus.',
            type: 'ALL_OF',
            courses: ['PSYCH 9A', 'PSYCH 9B', 'PSYCH 9C', 'MATH 2A']
          }
        ]
      },
      {
        id: 'psych_methods',
        category: 'UPPER_DIVISION',
        name: 'Experimental Methodology',
        requirements: [
          {
            id: 'psych_methods_req',
            name: 'Research Methods Sequence',
            description: 'Experimental psychology and research design.',
            type: 'ALL_OF',
            courses: ['PSYCH 112A', 'PSYCH 112B']
          }
        ]
      },
      {
        id: 'psych_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Core Psychological Domains',
        requirements: [
          {
            id: 'psych_domains',
            name: 'Cognition, Sensation & Social Psychology',
            description: 'Cognitive psychology, sensation/perception, and social psychology.',
            type: 'ALL_OF',
            courses: ['PSYCH 120A', 'PSYCH 130A', 'PSYCH 140A']
          }
        ]
      },
      {
        id: 'psych_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'psych_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'psych_min_upper_div_units',
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
  // Sociology B.A. (School of Social Sciences)
  // =========================================================================
  {
    id: 'SOCIOL_BA_2026',
    name: 'Sociology B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'sociol_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Introduction to Sociology',
        requirements: [
          {
            id: 'sociol_intro',
            name: 'Sociological Foundations',
            description: 'Intro sociology, social problems, and social psychology.',
            type: 'ALL_OF',
            courses: ['SOCIOL 1', 'SOCIOL 2', 'SOCIOL 3']
          }
        ]
      },
      {
        id: 'sociol_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Theory & Methodology Core',
        requirements: [
          {
            id: 'sociol_theory_methods',
            name: 'Classical Theory & Research Seminar',
            description: 'Sociological theory, research methods, and senior seminar.',
            type: 'ALL_OF',
            courses: ['SOCIOL 110', 'SOCIOL 120', 'SOCIOL 180A']
          }
        ]
      },
      {
        id: 'sociol_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'sociol_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'sociol_min_upper_div_units',
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
  // Anthropology B.A. (School of Social Sciences)
  // =========================================================================
  {
    id: 'ANTHRO_BA_2026',
    name: 'Anthropology B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'anthro_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Four Fields of Anthropology',
        requirements: [
          {
            id: 'anthro_four_fields',
            name: 'Introductory Anthropology',
            description: 'Sociocultural, biological, archaeology, and linguistic anthropology.',
            type: 'ALL_OF',
            courses: ['ANTHRO 2A', 'ANTHRO 2B', 'ANTHRO 2C', 'ANTHRO 2D']
          }
        ]
      },
      {
        id: 'anthro_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Theory & Ethnographic Methods',
        requirements: [
          {
            id: 'anthro_theory_methods',
            name: 'Anthropological Theory & Ethnography',
            description: 'History of theory, ethnographic field methods, and senior seminar.',
            type: 'ALL_OF',
            courses: ['ANTHRO 100A', 'ANTHRO 100B', 'ANTHRO 180A']
          }
        ]
      },
      {
        id: 'anthro_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'anthro_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'anthro_min_upper_div_units',
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
  // International Studies B.A. (School of Social Sciences)
  // =========================================================================
  {
    id: 'INTL_STUDIES_BA_2026',
    name: 'International Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'intl_studies_lower',
        category: 'LOWER_DIVISION',
        name: 'Global Foundations',
        requirements: [
          {
            id: 'intl_studies_intro',
            name: 'Global Issues & Economics',
            description: 'Global issues, global economy, microeconomics, and comparative politics.',
            type: 'ALL_OF',
            courses: ['INTL ST 1', 'INTL ST 11', 'ECON 20A', 'POL SCI 51A']
          }
        ]
      },
      {
        id: 'intl_studies_upper',
        category: 'UPPER_DIVISION',
        name: 'Security, Governance & Senior Seminar',
        requirements: [
          {
            id: 'intl_studies_core',
            name: 'Global Governance',
            description: 'Global security, human rights governance, and senior seminar.',
            type: 'ALL_OF',
            courses: ['INTL ST 101', 'INTL ST 102', 'INTL ST 183A']
          }
        ]
      },
      {
        id: 'intl_studies_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'intl_studies_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'intl_studies_min_upper_div_units',
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
  // Cognitive Sciences B.S. (School of Social Sciences)
  // =========================================================================
  {
    id: 'COGS_BS_2026',
    name: 'Cognitive Sciences B.S.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'cogs_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Psychology, Programming & Math',
        requirements: [
          {
            id: 'cogs_foundations',
            name: 'Foundational Behavioral Science',
            description: 'Psychology, Python programming, calculus, and linear algebra.',
            type: 'ALL_OF',
            courses: ['PSYCH 9A', 'PSYCH 9B', 'ICS 31', 'ICS 32', 'MATH 2A', 'MATH 2B', 'MATH 3A']
          }
        ]
      },
      {
        id: 'cogs_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Computational Cognitive Modeling',
        requirements: [
          {
            id: 'cogs_modeling',
            name: 'Neural Networks & Modeling',
            description: 'Programming for cognitive science, computational neuroscience, neural nets, and experimental psychology.',
            type: 'ALL_OF',
            courses: ['COGS 106P', 'COGS 107P', 'COGS 108P', 'PSYCH 112A']
          }
        ]
      },
      {
        id: 'cogs_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'cogs_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'cogs_min_upper_div_units',
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
  // Criminology, Law and Society B.A. (School of Social Ecology)
  // =========================================================================
  {
    id: 'CRIM_LAW_BA_2026',
    name: 'Criminology, Law and Society B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Ecology',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'crim_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Social Ecology & Criminal Justice',
        requirements: [
          {
            id: 'crim_intro',
            name: 'Criminology Foundations',
            description: 'Social ecology fundamentals, introduction to criminology, and crime and justice.',
            type: 'ALL_OF',
            courses: ['SOCECOL 10', 'CRIM/LAW C7', 'CRIM/LAW C10']
          }
        ]
      },
      {
        id: 'crim_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Criminological Theory & Legal Systems',
        requirements: [
          {
            id: 'crim_core',
            name: 'Advanced Criminology & Policy',
            description: 'Advanced theory, law and society, and crime policy.',
            type: 'ALL_OF',
            courses: ['CRIM/LAW C100', 'CRIM/LAW C101', 'CRIM/LAW C106']
          }
        ]
      },
      {
        id: 'crim_field_study',
        category: 'UPPER_DIVISION',
        name: 'Social Ecology Field Study',
        requirements: [
          {
            id: 'crim_practicum',
            name: 'Experiential Field Placement',
            description: 'Mandatory agency internship placement.',
            type: 'ALL_OF',
            courses: ['SOCECOL 195']
          }
        ]
      },
      {
        id: 'crim_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'crim_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'crim_min_upper_div_units',
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
  // Psychological Science B.A. (School of Social Ecology)
  // =========================================================================
  {
    id: 'PSYCH_SCI_BA_2026',
    name: 'Psychological Science B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Ecology',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'psych_sci_lower',
        category: 'LOWER_DIVISION',
        name: 'Social Ecology & Psychological Science',
        requirements: [
          {
            id: 'psych_sci_intro',
            name: 'Psychology Foundations',
            description: 'Social ecology, brain/mind, personality, and psychology and crime.',
            type: 'ALL_OF',
            courses: ['SOCECOL 10', 'PSYC SCI 9A', 'PSYC SCI 9B', 'PSYC SCI 11A']
          }
        ]
      },
      {
        id: 'psych_sci_upper',
        category: 'UPPER_DIVISION',
        name: 'Abnormal, Health & Developmental',
        requirements: [
          {
            id: 'psych_sci_core',
            name: 'Clinical & Health Applications',
            description: 'Abnormal psychology, health psychology, and lifespan development.',
            type: 'ALL_OF',
            courses: ['PSYC SCI 102C', 'PSYC SCI 115D', 'PSYC SCI 120D']
          }
        ]
      },
      {
        id: 'psych_sci_field_study',
        category: 'UPPER_DIVISION',
        name: 'Field Study Practicum',
        requirements: [
          {
            id: 'psych_sci_practicum',
            name: 'Field Placement',
            description: 'Mandatory clinical/community internship placement.',
            type: 'ALL_OF',
            courses: ['SOCECOL 195']
          }
        ]
      },
      {
        id: 'psych_sci_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'psych_sci_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'psych_sci_min_upper_div_units',
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
  // Urban Studies B.A. (School of Social Ecology)
  // =========================================================================
  {
    id: 'URBAN_STUDIES_BA_2026',
    name: 'Urban Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Ecology',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'urban_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Urban Planning Foundations',
        requirements: [
          {
            id: 'urban_intro',
            name: 'City & Environmental Design',
            description: 'Social ecology, urban studies intro, and environmental design.',
            type: 'ALL_OF',
            courses: ['SOCECOL 10', 'UPPP 4', 'UPPP 8']
          }
        ]
      },
      {
        id: 'urban_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Urban Policy & Sustainability',
        requirements: [
          {
            id: 'urban_policy',
            name: 'Policy, Governance & Green Cities',
            description: 'Urban topics, municipal policy, and sustainable infrastructure.',
            type: 'ALL_OF',
            courses: ['UPPP 100', 'UPPP 102', 'UPPP 115']
          }
        ]
      },
      {
        id: 'urban_field_study',
        category: 'UPPER_DIVISION',
        name: 'Field Study Practicum',
        requirements: [
          {
            id: 'urban_practicum',
            name: 'Civic Agency Placement',
            description: 'Field placement in municipal planning.',
            type: 'ALL_OF',
            courses: ['SOCECOL 195']
          }
        ]
      },
      {
        id: 'urban_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'urban_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'urban_min_upper_div_units',
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
  // Social Ecology B.A. (School of Social Ecology)
  // =========================================================================
  {
    id: 'SOCECOL_BA_2026',
    name: 'Social Ecology B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Ecology',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'socecol_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Social Ecology Core',
        requirements: [
          {
            id: 'socecol_intro',
            name: 'Foundations & Statistics',
            description: 'Social ecology fundamentals, statistics, and research design.',
            type: 'ALL_OF',
            courses: ['SOCECOL 10', 'SOCECOL 13', 'SOCECOL 15']
          }
        ]
      },
      {
        id: 'socecol_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Advanced Research & Field Study',
        requirements: [
          {
            id: 'socecol_research',
            name: 'Naturalistic Research & Field Placement',
            description: 'Field research writing and experiential field study.',
            type: 'ALL_OF',
            courses: ['SOCECOL 194W', 'SOCECOL 195']
          }
        ]
      },
      {
        id: 'socecol_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'socecol_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'socecol_min_upper_div_units',
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
  // English B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'ENGLISH_BA_2026',
    name: 'English B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'english_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Introductory Literary Craft',
        requirements: [
          {
            id: 'english_intro',
            name: 'Reading, Craft & Poetics',
            description: 'Literary reading, craft, and poetic traditions.',
            type: 'ALL_OF',
            courses: ['ENGLISH 8', 'ENGLISH 10', 'ENGLISH 28A']
          }
        ]
      },
      {
        id: 'english_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Critical Theory & Literary Traditions',
        requirements: [
          {
            id: 'english_traditions',
            name: 'Theory, Writing & Surveys',
            description: 'Critical theory, advanced writing, British survey, and American survey.',
            type: 'ALL_OF',
            courses: ['ENGLISH 100', 'ENGLISH 101W', 'ENGLISH 102A', 'ENGLISH 103']
          }
        ]
      },
      {
        id: 'english_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'english_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'english_min_upper_div_units',
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
  // History B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'HISTORY_BA_2026',
    name: 'History B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'history_lower_div',
        category: 'LOWER_DIVISION',
        name: 'World & American History',
        requirements: [
          {
            id: 'history_intro',
            name: 'World & Early American History',
            description: 'World history to 1500, world history from 1500, and early America.',
            type: 'ALL_OF',
            courses: ['HISTORY 21A', 'HISTORY 21B', 'HISTORY 70A']
          }
        ]
      },
      {
        id: 'history_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Historiography & Senior Colloquium',
        requirements: [
          {
            id: 'history_methods',
            name: 'Historical Methods & Capstone',
            description: 'Methods and writing, historical perspectives, and senior colloquium.',
            type: 'ALL_OF',
            courses: ['HISTORY 100W', 'HISTORY 102', 'HISTORY 190']
          }
        ]
      },
      {
        id: 'history_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'history_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'history_min_upper_div_units',
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
  // Philosophy B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'PHILOSOPHY_BA_2026',
    name: 'Philosophy B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'philos_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Foundational Philosophy & Logic',
        requirements: [
          {
            id: 'philos_intro',
            name: 'Philosophy, Paradoxes, Ethics & Logic',
            description: 'Intro philosophy, puzzles, ethics, and inductive logic.',
            type: 'ALL_OF',
            courses: ['PHILOS 1', 'PHILOS 2', 'PHILOS 4', 'PHILOS 10']
          }
        ]
      },
      {
        id: 'philos_upper_core',
        category: 'UPPER_DIVISION',
        name: 'History of Philosophy, Metaphysics & Epistemology',
        requirements: [
          {
            id: 'philos_core',
            name: 'Ancient, Modern, Metaphysics & Epistemology',
            description: 'Ancient philosophy, modern philosophy, metaphysics, and epistemology.',
            type: 'ALL_OF',
            courses: ['PHILOS 101', 'PHILOS 102', 'PHILOS 103', 'PHILOS 104']
          }
        ]
      },
      {
        id: 'philos_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'philos_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'philos_min_upper_div_units',
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
  // Literary Journalism B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'LIT_JOURN_BA_2026',
    name: 'Literary Journalism B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'lit_journ_lower',
        category: 'LOWER_DIVISION',
        name: 'Journalism Foundations',
        requirements: [
          {
            id: 'lit_journ_intro',
            name: 'Literary Journalism & Reporting',
            description: 'Intro literary journalism and reporting/interviewing.',
            type: 'ALL_OF',
            courses: ['LIT JRN 20', 'LIT JRN 21']
          }
        ]
      },
      {
        id: 'lit_journ_upper',
        category: 'UPPER_DIVISION',
        name: 'Advanced Reporting & Narrative Portfolio',
        requirements: [
          {
            id: 'lit_journ_portfolio',
            name: 'Reporting Workshop & Narrative Writing',
            description: 'Advanced reporting and two-quarter narrative writing series.',
            type: 'ALL_OF',
            courses: ['LIT JRN 100', 'LIT JRN 101A', 'LIT JRN 101B']
          }
        ]
      },
      {
        id: 'lit_journ_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'lit_journ_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'lit_journ_min_upper_div_units',
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
  // Art History B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'ART_HIST_BA_2026',
    name: 'Art History B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'art_hist_lower',
        category: 'LOWER_DIVISION',
        name: 'Art Historical Surveys',
        requirements: [
          {
            id: 'art_hist_intro',
            name: 'Prehistory, Ancient & Modern Art',
            description: 'Western survey, ancient Mediterranean art, and modern art.',
            type: 'ALL_OF',
            courses: ['ART 1A', 'ART HIST 40A', 'ART HIST 55']
          }
        ]
      },
      {
        id: 'art_hist_upper',
        category: 'UPPER_DIVISION',
        name: 'Methodologies, Curating & Senior Thesis',
        requirements: [
          {
            id: 'art_hist_core',
            name: 'Art History Methods & Thesis',
            description: 'Art historical methodologies, curatorial practices, and senior thesis.',
            type: 'ALL_OF',
            courses: ['ART HIST 100', 'ART HIST 110', 'ART HIST 190W']
          }
        ]
      },
      {
        id: 'art_hist_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'art_hist_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'art_hist_min_upper_div_units',
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
  // Comparative Literature B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'COMP_LIT_BA_2026',
    name: 'Comparative Literature B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'comp_lit_lower',
        category: 'LOWER_DIVISION',
        name: 'World Literature Traditions',
        requirements: [
          {
            id: 'comp_lit_intro',
            name: 'Antiquity, Renaissance & Modern World Literature',
            description: 'Three-part survey of world literature in translation.',
            type: 'ALL_OF',
            courses: ['COM LIT 60A', 'COM LIT 60B', 'COM LIT 60C']
          }
        ]
      },
      {
        id: 'comp_lit_upper',
        category: 'UPPER_DIVISION',
        name: 'Comparative Theory & Cross-Cultural Narrative',
        requirements: [
          {
            id: 'comp_lit_core',
            name: 'Comparative Literary Theory & Capstone',
            description: 'Comparative theory, cross-cultural narrative, and senior capstone.',
            type: 'ALL_OF',
            courses: ['COM LIT 100A', 'COM LIT 100B', 'COM LIT 190']
          }
        ]
      },
      {
        id: 'comp_lit_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'comp_lit_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'comp_lit_min_upper_div_units',
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
  // Global Cultures B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'GLOBAL_CULT_BA_2026',
    name: 'Global Cultures B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'global_cult_lower',
        category: 'LOWER_DIVISION',
        name: 'Global Systems & World History',
        requirements: [
          {
            id: 'global_cult_intro',
            name: 'Global Systems & Cultures',
            description: 'Global systems, contemporary cultures, and world history.',
            type: 'ALL_OF',
            courses: ['GLOBAL 1', 'GLOBAL 2', 'HISTORY 21A']
          }
        ]
      },
      {
        id: 'global_cult_upper',
        category: 'UPPER_DIVISION',
        name: 'Cultural Dynamics & Senior Thesis',
        requirements: [
          {
            id: 'global_cult_core',
            name: 'Dynamics, Geopolitics & Thesis',
            description: 'Cultural dynamics, transnational geopolitics, and senior thesis.',
            type: 'ALL_OF',
            courses: ['GLOBAL 101', 'GLOBAL 102', 'GLOBAL 190']
          }
        ]
      },
      {
        id: 'global_cult_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'global_cult_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'global_cult_min_upper_div_units',
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
  // Education Sciences B.A. (School of Education)
  // =========================================================================
  {
    id: 'EDUC_SCI_BA_2026',
    name: 'Education Sciences B.A.',
    catalogYear: '2026-27',
    school: 'School of Education',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'educ_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Education & Social Foundations',
        requirements: [
          {
            id: 'educ_intro',
            name: 'Foundations & Family Contexts',
            description: 'Foundations of education, child development, and social ecology.',
            type: 'ALL_OF',
            courses: ['EDUC 50', 'EDUC 30', 'SOCECOL 10']
          }
        ]
      },
      {
        id: 'educ_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Policy, Learning Tech & Justice',
        requirements: [
          {
            id: 'educ_core_topics',
            name: 'Education Policy & Multicultural Contexts',
            description: 'Critical issues, learning technologies, policy, and multicultural education.',
            type: 'ALL_OF',
            courses: ['EDUC 100', 'EDUC 124', 'EDUC 150', 'EDUC 160']
          }
        ]
      },
      {
        id: 'educ_practicum',
        category: 'UPPER_DIVISION',
        name: 'Directed Practicum',
        requirements: [
          {
            id: 'educ_fieldwork',
            name: 'Classroom Fieldwork Practicum',
            description: 'Supervised educational fieldwork.',
            type: 'ALL_OF',
            courses: ['EDUC 198']
          }
        ]
      },
      {
        id: 'educ_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'educ_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'educ_min_upper_div_units',
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
  // Nursing Science B.S. (Sue & Bill Gross School of Nursing)
  // =========================================================================
  {
    id: 'NUR_SCI_BS_2026',
    name: 'Nursing Science B.S.',
    catalogYear: '2026-27',
    school: 'Sue & Bill Gross School of Nursing',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'nur_sci_lower',
        category: 'LOWER_DIVISION',
        name: 'Pre-Nursing Science Core',
        requirements: [
          {
            id: 'nur_sci_prep',
            name: 'Biology, Chemistry & Statistics',
            description: 'Cellular biology, genetics, general chemistry, organic chemistry, and statistics.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 97', 'CHEM 1A', 'CHEM 1B', 'CHEM 51A', 'STATS 67']
          }
        ]
      },
      {
        id: 'nur_sci_upper',
        category: 'UPPER_DIVISION',
        name: 'Nursing Theory & Health Assessment',
        requirements: [
          {
            id: 'nur_sci_core',
            name: 'Pathophysiology & Pharmacology',
            description: 'Pathophysiology, pharmacology, health assessment, adult care, and leadership.',
            type: 'ALL_OF',
            courses: ['NUR SCI 110', 'NUR SCI 116', 'NUR SCI 120', 'NUR SCI 130', 'NUR SCI 140']
          }
        ]
      },
      {
        id: 'nur_sci_practicum',
        category: 'UPPER_DIVISION',
        name: 'Hospital Clinical Practicum',
        requirements: [
          {
            id: 'nur_sci_rotations',
            name: 'Inpatient Clinical Rotations',
            description: 'Direct hospital rotations I and II at UCI Medical Center.',
            type: 'ALL_OF',
            courses: ['NUR SCI 170', 'NUR SCI 175']
          }
        ]
      },
      {
        id: 'nur_sci_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'nur_sci_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'nur_sci_min_upper_div_units',
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
  // Pharmaceutical Sciences B.S. (School of Pharmacy and Pharmaceutical Sciences)
  // =========================================================================
  {
    id: 'PHARM_SCI_BS_2026',
    name: 'Pharmaceutical Sciences B.S.',
    catalogYear: '2026-27',
    school: 'School of Pharmacy and Pharmaceutical Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'pharm_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Biology, Chemistry, Math & Physics',
        requirements: [
          {
            id: 'pharm_bio_chem',
            name: 'Biology & Chemistry Foundations',
            description: 'General biology, general chemistry, calculus, and physics.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 94', 'CHEM 1A', 'CHEM 1B', 'CHEM 1C', 'MATH 2A', 'MATH 2B', 'PHYSICS 7C']
          }
        ]
      },
      {
        id: 'pharm_organic',
        category: 'LOWER_DIVISION',
        name: 'Organic Chemistry Core',
        requirements: [
          {
            id: 'pharm_org_chem',
            name: 'Organic Chemistry Series',
            description: 'Three quarters of organic chemistry.',
            type: 'ALL_OF',
            courses: ['CHEM 51A', 'CHEM 51B', 'CHEM 51C']
          }
        ]
      },
      {
        id: 'pharm_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Pharmacokinetics & Drug Design',
        requirements: [
          {
            id: 'pharm_core_upper',
            name: 'Biopharmaceutics, Pharmacogenomics & Med Chem',
            description: 'Drug intro, physiology/pharmacology, pharmacokinetics, pharmacogenomics, and medicinal chemistry.',
            type: 'ALL_OF',
            courses: ['PHRMSCI 1', 'PHRMSCI 120', 'PHRMSCI 170', 'PHRMSCI 171', 'PHRMSCI 177']
          }
        ]
      },
      {
        id: 'pharm_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'pharm_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'pharm_min_upper_div_units',
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
  // Public Health Sciences B.S. (Program in Public Health)
  // =========================================================================
  {
    id: 'PUB_HLTH_SCI_BS_2026',
    name: 'Public Health Sciences B.S.',
    catalogYear: '2026-27',
    school: 'Program in Public Health',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'pub_hlth_sci_lower',
        category: 'LOWER_DIVISION',
        name: 'Public Health, Biology & Chemistry',
        requirements: [
          {
            id: 'pub_hlth_sci_prep',
            name: 'Science & Public Health Foundations',
            description: 'Public health principles, global health, biology, general chemistry, and statistics.',
            type: 'ALL_OF',
            courses: ['PUBHLTH 1', 'PUBHLTH 2', 'BIO SCI 93', 'BIO SCI 94', 'CHEM 1A', 'CHEM 1B', 'STATS 67']
          }
        ]
      },
      {
        id: 'pub_hlth_sci_upper',
        category: 'UPPER_DIVISION',
        name: 'Epidemiology & Health Systems',
        requirements: [
          {
            id: 'pub_hlth_sci_core',
            name: 'Epidemiology & Biostatistics Core',
            description: 'Epidemiology, biostatistics, health policy, and chronic disease epidemiology.',
            type: 'ALL_OF',
            courses: ['PUBHLTH 101', 'PUBHLTH 102', 'PUBHLTH 122', 'PUBHLTH 135']
          }
        ]
      },
      {
        id: 'pub_hlth_sci_practicum',
        category: 'UPPER_DIVISION',
        name: 'Public Health Practicum',
        requirements: [
          {
            id: 'pub_hlth_sci_capstone',
            name: 'Community Agency Practicum',
            description: 'Fieldwork and policy writing capstone.',
            type: 'ALL_OF',
            courses: ['PUBHLTH 195W']
          }
        ]
      },
      {
        id: 'pub_hlth_sci_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'pub_hlth_sci_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'pub_hlth_sci_min_upper_div_units',
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
  // Public Health Policy B.A. (Program in Public Health)
  // =========================================================================
  {
    id: 'PUB_HLTH_POL_BA_2026',
    name: 'Public Health Policy B.A.',
    catalogYear: '2026-27',
    school: 'Program in Public Health',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'pub_hlth_pol_lower',
        category: 'LOWER_DIVISION',
        name: 'Public Health & Social Sciences',
        requirements: [
          {
            id: 'pub_hlth_pol_prep',
            name: 'Policy & Social Science Foundations',
            description: 'Public health, global health, microeconomics, American government, and sociology.',
            type: 'ALL_OF',
            courses: ['PUBHLTH 1', 'PUBHLTH 2', 'ECON 20A', 'POL SCI 21A', 'SOCIOL 1']
          }
        ]
      },
      {
        id: 'pub_hlth_pol_upper',
        category: 'UPPER_DIVISION',
        name: 'Health Policy, Behavioral Sciences & Ethics',
        requirements: [
          {
            id: 'pub_hlth_pol_core',
            name: 'Epidemiology, Policy & Law',
            description: 'Epidemiology, health policy, behavioral sciences, and public health ethics/law.',
            type: 'ALL_OF',
            courses: ['PUBHLTH 101', 'PUBHLTH 122', 'PUBHLTH 144', 'PUBHLTH 150']
          }
        ]
      },
      {
        id: 'pub_hlth_pol_practicum',
        category: 'UPPER_DIVISION',
        name: 'Policy Practicum',
        requirements: [
          {
            id: 'pub_hlth_pol_capstone',
            name: 'Policy Brief Practicum',
            description: 'Public health policy internship and capstone.',
            type: 'ALL_OF',
            courses: ['PUBHLTH 195W']
          }
        ]
      },
      {
        id: 'pub_hlth_pol_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'pub_hlth_pol_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'pub_hlth_pol_min_upper_div_units',
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
  // Drama B.A. (Claire Trevor School of the Arts)
  // =========================================================================
  {
    id: 'DRAMA_BA_2026',
    name: 'Drama B.A.',
    catalogYear: '2026-27',
    school: 'Claire Trevor School of the Arts',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'drama_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Theatre Fundamentals & Stagecraft',
        requirements: [
          {
            id: 'drama_intro',
            name: 'Theatre, Acting & Production',
            description: 'Intro theatre, acting, stagecraft, and design principles.',
            type: 'ALL_OF',
            courses: ['DRAMA 10', 'DRAMA 30A', 'DRAMA 40A', 'DRAMA 50A']
          }
        ]
      },
      {
        id: 'drama_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Dramaturgy, Directing & Theatre History',
        requirements: [
          {
            id: 'drama_theory',
            name: 'Dramatic Literature & Practice',
            description: 'Dramaturgy, advanced acting, directing, and theatre history.',
            type: 'ALL_OF',
            courses: ['DRAMA 100', 'DRAMA 120A', 'DRAMA 130', 'DRAMA 140']
          }
        ]
      },
      {
        id: 'drama_production',
        category: 'UPPER_DIVISION',
        name: 'Mainstage Production',
        requirements: [
          {
            id: 'drama_showcase',
            name: 'Performance Credit',
            description: 'Claire Trevor School mainstage production performance.',
            type: 'ALL_OF',
            courses: ['DRAMA 101']
          }
        ]
      },
      {
        id: 'drama_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'drama_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'drama_min_upper_div_units',
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
  // Art B.A. (Claire Trevor School of the Arts)
  // =========================================================================
  {
    id: 'ART_BA_2026',
    name: 'Art B.A.',
    catalogYear: '2026-27',
    school: 'Claire Trevor School of the Arts',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'art_lower_div',
        category: 'LOWER_DIVISION',
        name: '2D/3D Studio Concepts & Art History',
        requirements: [
          {
            id: 'art_studio_intro',
            name: 'Art History & Visual Concepts',
            description: 'Prehistory art history, 2D design, 3D sculpture, and contemporary practice.',
            type: 'ALL_OF',
            courses: ['ART 1A', 'ART 9A', 'ART 9B', 'ART 12A']
          }
        ]
      },
      {
        id: 'art_upper_studio',
        category: 'UPPER_DIVISION',
        name: 'Advanced Interdisciplinary Studio & Media',
        requirements: [
          {
            id: 'art_media_core',
            name: 'Advanced Studio, Digital Photo & Video',
            description: 'Interdisciplinary studio, digital photography, and experimental video.',
            type: 'ALL_OF',
            courses: ['ART 100', 'ART 106A', 'ART 150']
          }
        ]
      },
      {
        id: 'art_senior',
        category: 'UPPER_DIVISION',
        name: 'Senior Exhibition',
        requirements: [
          {
            id: 'art_gallery',
            name: 'Senior Exhibition Capstone',
            description: 'Culminating senior exhibition and artist statement.',
            type: 'ALL_OF',
            courses: ['ART 190']
          }
        ]
      },
      {
        id: 'art_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'art_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'art_min_upper_div_units',
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
  // Music B.A. (Claire Trevor School of the Arts)
  // =========================================================================
  {
    id: 'MUSIC_BA_2026',
    name: 'Music B.A.',
    catalogYear: '2026-27',
    school: 'Claire Trevor School of the Arts',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'music_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Musicianship, Harmony & Technology',
        requirements: [
          {
            id: 'music_theory_intro',
            name: 'Harmony Sequence & Music Tech',
            description: 'Three quarters of harmony and music technology.',
            type: 'ALL_OF',
            courses: ['MUSIC 16A', 'MUSIC 16B', 'MUSIC 16C', 'MUSIC 51']
          }
        ]
      },
      {
        id: 'music_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Music History, Form & Orchestration',
        requirements: [
          {
            id: 'music_advanced_theory',
            name: 'History, Form & Arranging',
            description: 'World music history, form and analysis, and orchestration.',
            type: 'ALL_OF',
            courses: ['MUSIC 100', 'MUSIC 140A', 'MUSIC 140B']
          }
        ]
      },
      {
        id: 'music_ensemble',
        category: 'UPPER_DIVISION',
        name: 'University Concert Ensemble',
        requirements: [
          {
            id: 'music_performance',
            name: 'Ensemble Performance',
            description: 'Symphony, wind ensemble, choir, or jazz performance.',
            type: 'ALL_OF',
            courses: ['MUSIC 160']
          }
        ]
      },
      {
        id: 'music_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'music_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'music_min_upper_div_units',
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
  // Dance B.A. (Claire Trevor School of the Arts)
  // =========================================================================
  {
    id: 'DANCE_BA_2026',
    name: 'Dance B.A.',
    catalogYear: '2026-27',
    school: 'Claire Trevor School of the Arts',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'dance_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Ballet, Modern, Jazz & Choreography',
        requirements: [
          {
            id: 'dance_technique',
            name: 'Dance Technique Foundations',
            description: 'Ballet, modern dance, jazz, and movement composition.',
            type: 'ALL_OF',
            courses: ['DANCE 60A', 'DANCE 70A', 'DANCE 80A', 'DANCE 90A']
          }
        ]
      },
      {
        id: 'dance_upper_core',
        category: 'UPPER_DIVISION',
        name: 'History, Advanced Performance & Kinesiology',
        requirements: [
          {
            id: 'dance_advanced',
            name: 'Dance History, Performance & Movement Analysis',
            description: 'Dance history, concert performance, and somatic kinesiology.',
            type: 'ALL_OF',
            courses: ['DANCE 100', 'DANCE 160A', 'DANCE 170A']
          }
        ]
      },
      {
        id: 'dance_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'dance_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'dance_min_upper_div_units',
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
  // Film and Media Studies B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'FILM_MEDIA_BA_2026',
    name: 'Film and Media Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'film_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Film & Visual Foundations',
        requirements: [
          {
            id: 'film_intro',
            name: 'Visual Analysis & Production',
            description: 'Film aesthetics, media histories, and introduction to film analysis.',
            type: 'ALL_OF',
            courses: ['FLM&MDA 85A', 'FLM&MDA 85B', 'FLM&MDA 85C']
          }
        ]
      },
      {
        id: 'film_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Film Theory & Global Cinemas',
        requirements: [
          {
            id: 'film_theory_req',
            name: 'Theory, Directing & Genres',
            description: 'Film theory, international cinema traditions, and television studies.',
            type: 'ALL_OF',
            courses: ['FLM&MDA 101A', 'FLM&MDA 110', 'FLM&MDA 130', 'FLM&MDA 160']
          }
        ]
      },
      {
        id: 'film_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'film_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'film_min_upper_div_units',
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
  // African American Studies B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'AFAM_BA_2026',
    name: 'African American Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'afam_lower_div',
        category: 'LOWER_DIVISION',
        name: 'African American Foundations',
        requirements: [
          {
            id: 'afam_intro',
            name: 'Diaspora, History & Culture',
            description: 'Black diaspora history, social movements, and cultural expression.',
            type: 'ALL_OF',
            courses: ['AFAM 40A', 'AFAM 40B']
          }
        ]
      },
      {
        id: 'afam_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Black Intellectual Thought',
        requirements: [
          {
            id: 'afam_theory_req',
            name: 'Critical Race, Literature & Colloquium',
            description: 'Black feminist theory, African American literature, and senior colloquium.',
            type: 'ALL_OF',
            courses: ['AFAM 100A', 'AFAM 102', 'AFAM 190']
          }
        ]
      },
      {
        id: 'afam_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'afam_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'afam_min_upper_div_units',
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
  // Asian American Studies B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'ASIANAM_BA_2026',
    name: 'Asian American Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'asianam_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Asian American Foundations',
        requirements: [
          {
            id: 'asianam_intro',
            name: 'Migration, Labor & Communities',
            description: 'Asian American history, transpacific migration, and community politics.',
            type: 'ALL_OF',
            courses: ['ASIANAM 50', 'ASIANAM 51', 'ASIANAM 52']
          }
        ]
      },
      {
        id: 'asianam_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Cultural Studies & Senior Thesis',
        requirements: [
          {
            id: 'asianam_theory_req',
            name: 'Racialization & Community Research',
            description: 'Critical Asian American theory, media representations, and senior thesis.',
            type: 'ALL_OF',
            courses: ['ASIANAM 100W', 'ASIANAM 130', 'ASIANAM 190']
          }
        ]
      },
      {
        id: 'asianam_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'asianam_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'asianam_min_upper_div_units',
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
  // Chicano/Latino Studies B.A. (School of Social Sciences)
  // =========================================================================
  {
    id: 'CHICANO_BA_2026',
    name: 'Chicano/Latino Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'chicano_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Chicano/Latino Foundations',
        requirements: [
          {
            id: 'chicano_intro',
            name: 'History, Culture & Demographics',
            description: 'Borderlands history, Latinx cultural production, and contemporary social issues.',
            type: 'ALL_OF',
            courses: ['CHC/LAT 61', 'CHC/LAT 62', 'CHC/LAT 63']
          }
        ]
      },
      {
        id: 'chicano_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Immigration, Law & Capstone',
        requirements: [
          {
            id: 'chicano_theory_req',
            name: 'Immigration Policy & Field Research',
            description: 'Transnational migration, educational equity, and senior seminar.',
            type: 'ALL_OF',
            courses: ['CHC/LAT 101', 'CHC/LAT 150', 'CHC/LAT 180']
          }
        ]
      },
      {
        id: 'chicano_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'chicano_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'chicano_min_upper_div_units',
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
  // Gender and Sexuality Studies B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'GEN_SEX_BA_2026',
    name: 'Gender and Sexuality Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'gen_sex_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Gender & Sexuality Foundations',
        requirements: [
          {
            id: 'gen_sex_intro',
            name: 'Gender, Race & Queer Theories',
            description: 'Introduction to gender studies and queer histories.',
            type: 'ALL_OF',
            courses: ['GEN&SEX 50A', 'GEN&SEX 50B']
          }
        ]
      },
      {
        id: 'gen_sex_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Transnational Feminisms & Methodologies',
        requirements: [
          {
            id: 'gen_sex_theory_req',
            name: 'Feminist Theory & Research Colloquium',
            description: 'Feminist epistemologies, queer of color critique, and senior seminar.',
            type: 'ALL_OF',
            courses: ['GEN&SEX 100A', 'GEN&SEX 100B', 'GEN&SEX 190']
          }
        ]
      },
      {
        id: 'gen_sex_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'gen_sex_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'gen_sex_min_upper_div_units',
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
  // East Asian Studies B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'EAST_ASIAN_BA_2026',
    name: 'East Asian Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'east_asian_lower_div',
        category: 'LOWER_DIVISION',
        name: 'East Asian Traditions',
        requirements: [
          {
            id: 'east_asian_intro',
            name: 'Civilizations of East Asia',
            description: 'Historical and cultural survey of China, Japan, and Korea.',
            type: 'ALL_OF',
            courses: ['EAST ASIAN 20', 'EAST ASIAN 21']
          }
        ]
      },
      {
        id: 'east_asian_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Modern East Asia & Senior Thesis',
        requirements: [
          {
            id: 'east_asian_theory_req',
            name: 'Media, Politics & Senior Seminar',
            description: 'Modern East Asian literature, visual culture, and capstone thesis.',
            type: 'ALL_OF',
            courses: ['EAST ASIAN 110', 'EAST ASIAN 120', 'EAST ASIAN 190']
          }
        ]
      },
      {
        id: 'east_asian_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'east_asian_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'east_asian_min_upper_div_units',
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
  // Chinese Studies B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'CHINESE_BA_2026',
    name: 'Chinese Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'chinese_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Chinese Language Core',
        requirements: [
          {
            id: 'chinese_lang_intro',
            name: 'Intermediate Chinese',
            description: 'Intermediate Mandarin reading, grammar, and conversation.',
            type: 'ALL_OF',
            courses: ['CHINESE 2A', 'CHINESE 2B', 'CHINESE 2C']
          }
        ]
      },
      {
        id: 'chinese_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Advanced Chinese & Literature',
        requirements: [
          {
            id: 'chinese_lit_req',
            name: 'Advanced Reading & Classical Chinese',
            description: 'Classical Chinese grammar, modern fiction, and advanced composition.',
            type: 'ALL_OF',
            courses: ['CHINESE 100A', 'CHINESE 100B', 'CHINESE 115']
          }
        ]
      },
      {
        id: 'chinese_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'chinese_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'chinese_min_upper_div_units',
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
  // Japanese Language and Literature B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'JAPANESE_BA_2026',
    name: 'Japanese Language and Literature B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'japanese_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Japanese Language Core',
        requirements: [
          {
            id: 'japanese_lang_intro',
            name: 'Intermediate Japanese',
            description: 'Intermediate Japanese syntax, kanji, and listening comprehension.',
            type: 'ALL_OF',
            courses: ['JAPANSE 2A', 'JAPANSE 2B', 'JAPANSE 2C']
          }
        ]
      },
      {
        id: 'japanese_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Advanced Japanese & Literary Masterpieces',
        requirements: [
          {
            id: 'japanese_lit_req',
            name: 'Advanced Japanese & Literary Survey',
            description: 'Third-year Japanese language and classical/modern literary texts.',
            type: 'ALL_OF',
            courses: ['JAPANSE 100A', 'JAPANSE 100B', 'JAPANSE 115']
          }
        ]
      },
      {
        id: 'japanese_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'japanese_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'japanese_min_upper_div_units',
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
  // Korean Literature and Culture B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'KOREAN_BA_2026',
    name: 'Korean Literature and Culture B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'korean_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Korean Language Core',
        requirements: [
          {
            id: 'korean_lang_intro',
            name: 'Intermediate Korean',
            description: 'Intermediate Korean grammar, hanja, and conversational discourse.',
            type: 'ALL_OF',
            courses: ['KOREAN 2A', 'KOREAN 2B', 'KOREAN 2C']
          }
        ]
      },
      {
        id: 'korean_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Modern Korean Media & Literature',
        requirements: [
          {
            id: 'korean_lit_req',
            name: 'Advanced Korean & Hallyu Cultural Studies',
            description: 'Advanced Korean, modern literature, and contemporary media analysis.',
            type: 'ALL_OF',
            courses: ['KOREAN 100A', 'KOREAN 100B', 'KOREAN 120']
          }
        ]
      },
      {
        id: 'korean_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'korean_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'korean_min_upper_div_units',
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
  // Spanish B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'SPANISH_BA_2026',
    name: 'Spanish B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'spanish_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Intermediate Spanish',
        requirements: [
          {
            id: 'spanish_lang_intro',
            name: 'Intermediate Spanish Sequence',
            description: 'Grammar synthesis, composition, and oral communication.',
            type: 'ALL_OF',
            courses: ['SPANISH 2A', 'SPANISH 2B', 'SPANISH 2C']
          }
        ]
      },
      {
        id: 'spanish_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Hispanic Literatures & Linguistics',
        requirements: [
          {
            id: 'spanish_lit_ling',
            name: 'Spanish Literature & Linguistics',
            description: 'Introduction to literary analysis, phonetics, and Golden Age/Latin American literature.',
            type: 'ALL_OF',
            courses: ['SPANISH 101A', 'SPANISH 101B', 'SPANISH 110', 'SPANISH 113']
          }
        ]
      },
      {
        id: 'spanish_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'spanish_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'spanish_min_upper_div_units',
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
  // French B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'FRENCH_BA_2026',
    name: 'French B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'french_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Intermediate French',
        requirements: [
          {
            id: 'french_lang_intro',
            name: 'Intermediate French Sequence',
            description: 'Intermediate syntax, francophone readings, and conversational skills.',
            type: 'ALL_OF',
            courses: ['FRENCH 2A', 'FRENCH 2B', 'FRENCH 2C']
          }
        ]
      },
      {
        id: 'french_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Francophone Literature & Culture',
        requirements: [
          {
            id: 'french_lit_req',
            name: 'Advanced Composition & Literature',
            description: 'Advanced composition, Enlightenment thought, and Francophone cinema.',
            type: 'ALL_OF',
            courses: ['FRENCH 101A', 'FRENCH 101B', 'FRENCH 115']
          }
        ]
      },
      {
        id: 'french_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'french_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'french_min_upper_div_units',
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
  // German Studies B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'GERMAN_BA_2026',
    name: 'German Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'german_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Intermediate German',
        requirements: [
          {
            id: 'german_lang_intro',
            name: 'Intermediate German Sequence',
            description: 'Intermediate German grammar, translation, and cultural history.',
            type: 'ALL_OF',
            courses: ['GERMAN 2A', 'GERMAN 2B', 'GERMAN 2C']
          }
        ]
      },
      {
        id: 'german_upper_core',
        category: 'UPPER_DIVISION',
        name: 'German Intellectual History & Modern Culture',
        requirements: [
          {
            id: 'german_lit_req',
            name: 'German Philosophy, Film & Literature',
            description: 'German literary movements from Romanticism to Weimar and modern Berlin.',
            type: 'ALL_OF',
            courses: ['GERMAN 101', 'GERMAN 102', 'GERMAN 115']
          }
        ]
      },
      {
        id: 'german_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'german_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'german_min_upper_div_units',
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
  // European Studies B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'EUROPEAN_BA_2026',
    name: 'European Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'european_lower_div',
        category: 'LOWER_DIVISION',
        name: 'European History & Politics',
        requirements: [
          {
            id: 'european_intro',
            name: 'European Civilization',
            description: 'Historical evolution of modern Europe, European Union, and nation states.',
            type: 'ALL_OF',
            courses: ['HISTORY 21A', 'HISTORY 21B', 'POL SCI 51A']
          }
        ]
      },
      {
        id: 'european_upper_core',
        category: 'UPPER_DIVISION',
        name: 'European Union Politics & Cultural Studies',
        requirements: [
          {
            id: 'european_core_req',
            name: 'EU Integration, Culture & Senior Seminar',
            description: 'European political integration, post-war migrations, and senior thesis.',
            type: 'ALL_OF',
            courses: ['EURO ST 101', 'EURO ST 102', 'EURO ST 190']
          }
        ]
      },
      {
        id: 'european_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'european_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'european_min_upper_div_units',
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
  // Classics B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'CLASSICS_BA_2026',
    name: 'Classics B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'classics_lower_div',
        category: 'LOWER_DIVISION',
        name: 'Greek and Roman Civilization',
        requirements: [
          {
            id: 'classics_intro',
            name: 'Classical Mythology & Civilizations',
            description: 'Mythology, ancient Greece, and Republican/Imperial Rome.',
            type: 'ALL_OF',
            courses: ['CLASSIC 36A', 'CLASSIC 36B', 'CLASSIC 36C']
          }
        ]
      },
      {
        id: 'classics_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Ancient Languages & Historiography',
        requirements: [
          {
            id: 'classics_core_req',
            name: 'Classical Literature, Archaeology & Thesis',
            description: 'Homeric epics, Roman historians, classical philosophy, and senior thesis.',
            type: 'ALL_OF',
            courses: ['CLASSIC 110', 'CLASSIC 120', 'CLASSIC 190']
          }
        ]
      },
      {
        id: 'classics_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'classics_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'classics_min_upper_div_units',
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
  // Religious Studies B.A. (School of Humanities)
  // =========================================================================
  {
    id: 'RELIGIOUS_BA_2026',
    name: 'Religious Studies B.A.',
    catalogYear: '2026-27',
    school: 'School of Humanities',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'relig_lower_div',
        category: 'LOWER_DIVISION',
        name: 'World Religions',
        requirements: [
          {
            id: 'relig_intro',
            name: 'Introduction to World Religions',
            description: 'Abrahamic traditions, Dharmic religions, and indigenous spiritualities.',
            type: 'ALL_OF',
            courses: ['REL STD 5A', 'REL STD 5B', 'REL STD 5C']
          }
        ]
      },
      {
        id: 'relig_upper_core',
        category: 'UPPER_DIVISION',
        name: 'Comparative Religion & Senior Seminar',
        requirements: [
          {
            id: 'relig_core_req',
            name: 'Religious Theory & Sacred Texts',
            description: 'Sociology of religion, scriptural interpretation, and capstone research.',
            type: 'ALL_OF',
            courses: ['REL STD 100', 'REL STD 110', 'REL STD 190']
          }
        ]
      },
      {
        id: 'relig_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'relig_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'relig_min_upper_div_units',
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
  // Quantitative Economics B.S. (School of Social Sciences)
  // =========================================================================
  {
    id: 'QUANT_ECON_BS_2026',
    name: 'Quantitative Economics B.S.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'quant_econ_lower',
        category: 'LOWER_DIVISION',
        name: 'Calculus, Linear Algebra & Econ',
        requirements: [
          {
            id: 'quant_econ_foundations',
            name: 'Micro/Macro, Multivariable & Proofs',
            description: 'Micro/macro economics, multivariable calculus, and linear algebra.',
            type: 'ALL_OF',
            courses: ['ECON 20A', 'ECON 20B', 'MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A', 'STATS 67']
          }
        ]
      },
      {
        id: 'quant_econ_upper',
        category: 'UPPER_DIVISION',
        name: 'Advanced Mathematical Economics & Econometrics',
        requirements: [
          {
            id: 'quant_econ_theory',
            name: 'Micro, Macro, Econometrics & Game Theory',
            description: 'Intermediate economic theory, two quarters of econometrics, and game theory.',
            type: 'ALL_OF',
            courses: ['ECON 100A', 'ECON 100B', 'ECON 100C', 'ECON 122A', 'ECON 122B', 'ECON 145L']
          }
        ]
      },
      {
        id: 'quant_econ_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'quant_econ_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'quant_econ_min_upper_div_units',
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
  // Language Science B.S. (School of Social Sciences)
  // =========================================================================
  {
    id: 'LANG_SCI_BS_2026',
    name: 'Language Science B.S.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'lang_sci_lower',
        category: 'LOWER_DIVISION',
        name: 'Linguistics, Python & Logic',
        requirements: [
          {
            id: 'lang_sci_foundations',
            name: 'Introduction to Linguistics & Programming',
            description: 'Phonetics/phonology, syntax, Python programming, and discrete math.',
            type: 'ALL_OF',
            courses: ['LSCI 3', 'LSCI 10', 'ICS 31', 'MATH 2A']
          }
        ]
      },
      {
        id: 'lang_sci_upper',
        category: 'UPPER_DIVISION',
        name: 'Formal Syntax, Semantics & Computational Linguistics',
        requirements: [
          {
            id: 'lang_sci_core_req',
            name: 'Theoretical & Computational Linguistics',
            description: 'Syntactic theory, formal semantics, phonological analysis, and NLP.',
            type: 'ALL_OF',
            courses: ['LSCI 111', 'LSCI 121', 'LSCI 141', 'LSCI 165']
          }
        ]
      },
      {
        id: 'lang_sci_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'lang_sci_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'lang_sci_min_upper_div_units',
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
  // Social Policy and Public Service B.A. (School of Social Sciences)
  // =========================================================================
  {
    id: 'SOC_POLICY_BA_2026',
    name: 'Social Policy and Public Service B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'soc_policy_lower',
        category: 'LOWER_DIVISION',
        name: 'Social Policy & Government',
        requirements: [
          {
            id: 'soc_policy_intro',
            name: 'Government, Sociology & Economics',
            description: 'American government, introduction to sociology, and microeconomics.',
            type: 'ALL_OF',
            courses: ['POL SCI 21A', 'SOCIOL 1', 'ECON 20A']
          }
        ]
      },
      {
        id: 'soc_policy_upper',
        category: 'UPPER_DIVISION',
        name: 'Policy Evaluation & Community Fieldwork',
        requirements: [
          {
            id: 'soc_policy_core_req',
            name: 'Policy Analysis, Nonprofit Leadership & Internship',
            description: 'Social policy analysis, leadership in public service, and fieldwork.',
            type: 'ALL_OF',
            courses: ['SPPS 110', 'SPPS 115', 'SPPS 195A', 'SPPS 195B']
          }
        ]
      },
      {
        id: 'soc_policy_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'soc_policy_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'soc_policy_min_upper_div_units',
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
  // Applied Mathematics B.S. (School of Physical Sciences)
  // =========================================================================
  {
    id: 'APPL_MATH_BS_2026',
    name: 'Applied Mathematics B.S.',
    catalogYear: '2026-27',
    school: 'School of Physical Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'appl_math_lower',
        category: 'LOWER_DIVISION',
        name: 'Calculus, Linear Algebra & Differential Equations',
        requirements: [
          {
            id: 'appl_math_calc_series',
            name: 'Calculus & Proofs Core',
            description: 'Calculus, linear algebra, proofs, and differential equations.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A', 'MATH 3D', 'MATH 13']
          }
        ]
      },
      {
        id: 'appl_math_upper',
        category: 'UPPER_DIVISION',
        name: 'Numerical Analysis, Modeling & Optimization',
        requirements: [
          {
            id: 'appl_math_core_req',
            name: 'Numerical Methods, PDEs & Complex Variables',
            description: 'Numerical analysis, partial differential equations, and complex analysis.',
            type: 'ALL_OF',
            courses: ['MATH 105A', 'MATH 112A', 'MATH 115', 'MATH 140A']
          }
        ]
      },
      {
        id: 'appl_math_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'appl_math_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'appl_math_min_upper_div_units',
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
  // Mathematics for Biology B.S. (School of Physical Sciences)
  // =========================================================================
  {
    id: 'MATH_BIO_BS_2026',
    name: 'Mathematics for Biology B.S.',
    catalogYear: '2026-27',
    school: 'School of Physical Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'math_bio_lower',
        category: 'LOWER_DIVISION',
        name: 'Math, Biology & Chemistry Core',
        requirements: [
          {
            id: 'math_bio_foundations',
            name: 'Calculus, Linear Algebra & Cell Bio',
            description: 'Calculus sequence, differential equations, and general biology.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A', 'MATH 3D', 'BIO SCI 93', 'BIO SCI 94']
          }
        ]
      },
      {
        id: 'math_bio_upper',
        category: 'UPPER_DIVISION',
        name: 'Mathematical Modeling in Biology',
        requirements: [
          {
            id: 'math_bio_core_req',
            name: 'Biomathematics, Dynamical Systems & Genetics',
            description: 'Mathematical biology, genetics, and dynamical population models.',
            type: 'ALL_OF',
            courses: ['MATH 113A', 'MATH 113B', 'BIO SCI 97', 'MATH 105A']
          }
        ]
      },
      {
        id: 'math_bio_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'math_bio_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'math_bio_min_upper_div_units',
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
  // Mathematics for Education B.S. (School of Physical Sciences)
  // =========================================================================
  {
    id: 'MATH_EDUC_BS_2026',
    name: 'Mathematics for Education B.S.',
    catalogYear: '2026-27',
    school: 'School of Physical Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'math_educ_lower',
        category: 'LOWER_DIVISION',
        name: 'Calculus & Proofs Core',
        requirements: [
          {
            id: 'math_educ_foundations',
            name: 'Calculus, Linear Algebra & Education',
            description: 'Calculus sequence, linear algebra, foundations of education.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A', 'MATH 13', 'EDUC 50']
          }
        ]
      },
      {
        id: 'math_educ_upper',
        category: 'UPPER_DIVISION',
        name: 'Abstract Algebra, Geometry & Teaching',
        requirements: [
          {
            id: 'math_educ_core_req',
            name: 'Abstract Algebra, Modern Geometry & Methods',
            description: 'Abstract algebra, classical/modern geometry, and secondary math pedagogy.',
            type: 'ALL_OF',
            courses: ['MATH 120A', 'MATH 130A', 'MATH 161', 'EDUC 100']
          }
        ]
      },
      {
        id: 'math_educ_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'math_educ_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'math_educ_min_upper_div_units',
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
  // Environmental Science B.S. (School of Physical Sciences)
  // =========================================================================
  {
    id: 'ENVR_SCI_BS_2026',
    name: 'Environmental Science B.S.',
    catalogYear: '2026-27',
    school: 'School of Physical Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'envr_sci_lower',
        category: 'LOWER_DIVISION',
        name: 'Earth System, Chemistry, Physics & Math',
        requirements: [
          {
            id: 'envr_sci_foundations',
            name: 'Earth Science, Chemistry & Calculus',
            description: 'Earth system science, general chemistry, and calculus series.',
            type: 'ALL_OF',
            courses: ['EARTHSS 1', 'EARTHSS 51', 'CHEM 1A', 'CHEM 1B', 'CHEM 1C', 'MATH 2A', 'MATH 2B']
          }
        ]
      },
      {
        id: 'envr_sci_upper',
        category: 'UPPER_DIVISION',
        name: 'Atmospheric, Ocean & Soil Sciences',
        requirements: [
          {
            id: 'envr_sci_core_req',
            name: 'Climate, Oceanography & Field Methods',
            description: 'Global climate change, oceanography, biogeochemistry, and field measurements.',
            type: 'ALL_OF',
            courses: ['EARTHSS 114', 'EARTHSS 124', 'EARTHSS 144', 'EARTHSS 170']
          }
        ]
      },
      {
        id: 'envr_sci_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'envr_sci_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'envr_sci_min_upper_div_units',
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
  // Human Biology B.S. (School of Biological Sciences)
  // =========================================================================
  {
    id: 'HUMAN_BIO_BS_2026',
    name: 'Human Biology B.S.',
    catalogYear: '2026-27',
    school: 'School of Biological Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'human_bio_lower',
        category: 'LOWER_DIVISION',
        name: 'General Biology & Chemistry Core',
        requirements: [
          {
            id: 'human_bio_prep',
            name: 'Biology & Chemistry Series',
            description: 'General biology sequence, general chemistry, and organic chemistry.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 94', 'BIO SCI 97', 'BIO SCI 98', 'CHEM 1A', 'CHEM 1B', 'CHEM 51A']
          }
        ]
      },
      {
        id: 'human_bio_upper',
        category: 'UPPER_DIVISION',
        name: 'Human Anatomy, Physiology & Pathology',
        requirements: [
          {
            id: 'human_bio_core_req',
            name: 'Human Physiology & Molecular Mechanisms',
            description: 'Human physiology, human anatomy with lab, and pathophysiology.',
            type: 'ALL_OF',
            courses: ['BIO SCI E109', 'BIO SCI D170', 'BIO SCI M122', 'BIO SCI N110']
          }
        ]
      },
      {
        id: 'human_bio_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'human_bio_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'human_bio_min_upper_div_units',
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
  // Exercise Sciences B.S. (School of Biological Sciences)
  // =========================================================================
  {
    id: 'EXERCISE_SCI_BS_2026',
    name: 'Exercise Sciences B.S.',
    catalogYear: '2026-27',
    school: 'School of Biological Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'exercise_sci_lower',
        category: 'LOWER_DIVISION',
        name: 'Biology, Chemistry & Physics Core',
        requirements: [
          {
            id: 'exercise_sci_prep',
            name: 'Biology, Chemistry & Mechanics',
            description: 'General biology, general chemistry, and physics mechanics.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 94', 'CHEM 1A', 'CHEM 1B', 'PHYSICS 7C']
          }
        ]
      },
      {
        id: 'exercise_sci_upper',
        category: 'UPPER_DIVISION',
        name: 'Kinesiology, Exercise Physiology & Biomechanics',
        requirements: [
          {
            id: 'exercise_sci_core_req',
            name: 'Exercise Physiology & Biomechanics',
            description: 'Exercise physiology, kinesiology, cardiovascular adaptations, and nutrition.',
            type: 'ALL_OF',
            courses: ['BIO SCI E109', 'BIO SCI E136', 'BIO SCI E155', 'BIO SCI E179']
          }
        ]
      },
      {
        id: 'exercise_sci_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'exercise_sci_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'exercise_sci_min_upper_div_units',
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
  // Genetics B.S. (School of Biological Sciences)
  // =========================================================================
  {
    id: 'GENETICS_BS_2026',
    name: 'Genetics B.S.',
    catalogYear: '2026-27',
    school: 'School of Biological Sciences',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'genetics_lower',
        category: 'LOWER_DIVISION',
        name: 'General Biology & Chemistry Core',
        requirements: [
          {
            id: 'genetics_prep',
            name: 'Biology, Genetics & Organic Chemistry',
            description: 'DNA, ecosystems, genetics, biochemistry, and organic chemistry.',
            type: 'ALL_OF',
            courses: ['BIO SCI 93', 'BIO SCI 94', 'BIO SCI 97', 'BIO SCI 98', 'CHEM 1A', 'CHEM 1B', 'CHEM 51A']
          }
        ]
      },
      {
        id: 'genetics_upper',
        category: 'UPPER_DIVISION',
        name: 'Molecular Genetics, Genomics & Bioinformatics',
        requirements: [
          {
            id: 'genetics_core_req',
            name: 'Genomics, Gene Regulation & Lab',
            description: 'Human genetics, molecular biology of gene expression, and genomics lab.',
            type: 'ALL_OF',
            courses: ['BIO SCI M116', 'BIO SCI M123', 'BIO SCI M124A', 'BIO SCI M118']
          }
        ]
      },
      {
        id: 'genetics_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'genetics_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'genetics_min_upper_div_units',
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
  // Biomedical Engineering: Premedical B.S. (The Henry Samueli School of Engineering)
  // =========================================================================
  {
    id: 'BME_PREMED_BS_2026',
    name: 'Biomedical Engineering: Premedical B.S.',
    catalogYear: '2026-27',
    school: 'The Henry Samueli School of Engineering',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'bme_premed_lower',
        category: 'LOWER_DIVISION',
        name: 'Engineering Math, Physics & Pre-Med Bio/Chem',
        requirements: [
          {
            id: 'bme_premed_foundations',
            name: 'Calculus, Physics, Bio & Organic Chem',
            description: 'Calculus, physics, cell biology, and organic chemistry.',
            type: 'ALL_OF',
            courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'PHYSICS 7C', 'PHYSICS 7D', 'CHEM 1A', 'CHEM 1B', 'CHEM 51A', 'BIO SCI 93']
          }
        ]
      },
      {
        id: 'bme_premed_upper',
        category: 'UPPER_DIVISION',
        name: 'Biomechanics, Physiological Systems & Senior Design',
        requirements: [
          {
            id: 'bme_premed_core_req',
            name: 'Biomechanics, Bioinstrumentation & Capstone',
            description: 'Biomechanics, sensory systems, bioinstrumentation, and senior design.',
            type: 'ALL_OF',
            courses: ['BME 110A', 'BME 120', 'BME 140', 'BME 180A', 'BME 180B']
          }
        ]
      },
      {
        id: 'bme_premed_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'bme_premed_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'bme_premed_min_upper_div_units',
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
  // Environmental Science and Policy B.A. (School of Social Ecology)
  // =========================================================================
  {
    id: 'ENVR_POL_BA_2026',
    name: 'Environmental Science and Policy B.A.',
    catalogYear: '2026-27',
    school: 'School of Social Ecology',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'envr_pol_lower',
        category: 'LOWER_DIVISION',
        name: 'Social Ecology & Environmental Science',
        requirements: [
          {
            id: 'envr_pol_intro',
            name: 'Social Ecology, Earth System & Urban Design',
            description: 'Social ecology fundamentals, Earth systems, and environmental design.',
            type: 'ALL_OF',
            courses: ['SOCECOL 10', 'EARTHSS 1', 'UPPP 8']
          }
        ]
      },
      {
        id: 'envr_pol_upper',
        category: 'UPPER_DIVISION',
        name: 'Environmental Law, Climate Policy & Field Study',
        requirements: [
          {
            id: 'envr_pol_core_req',
            name: 'Environmental Policy, Climate Justice & Fieldwork',
            description: 'Environmental law, sustainable cities, and mandatory field study.',
            type: 'ALL_OF',
            courses: ['UPPP 115', 'SOCECOL 195', 'ENVE 114']
          }
        ]
      },
      {
        id: 'envr_pol_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'envr_pol_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'envr_pol_min_upper_div_units',
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
  // Dance B.F.A. (Claire Trevor School of the Arts)
  // =========================================================================
  {
    id: 'DANCE_BFA_2026',
    name: 'Dance B.F.A.',
    catalogYear: '2026-27',
    school: 'Claire Trevor School of the Arts',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'dance_bfa_lower',
        category: 'LOWER_DIVISION',
        name: 'Ballet, Modern, Jazz & Composition',
        requirements: [
          {
            id: 'dance_bfa_technique',
            name: 'Intensive Technique Series',
            description: 'Ballet, modern dance, jazz, and choreography.',
            type: 'ALL_OF',
            courses: ['DANCE 60A', 'DANCE 70A', 'DANCE 80A', 'DANCE 90A']
          }
        ]
      },
      {
        id: 'dance_bfa_upper',
        category: 'UPPER_DIVISION',
        name: 'Choreographic Studio & Concert Performance',
        requirements: [
          {
            id: 'dance_bfa_performance',
            name: 'Advanced Performance, Kinesiology & Capstone',
            description: 'Performance showcase, kinesiology, and senior choreographic thesis.',
            type: 'ALL_OF',
            courses: ['DANCE 100', 'DANCE 160A', 'DANCE 170A', 'DANCE 190']
          }
        ]
      },
      {
        id: 'dance_bfa_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'dance_bfa_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'dance_bfa_min_upper_div_units',
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
  // Music Performance B.Mus. (Claire Trevor School of the Arts)
  // =========================================================================
  {
    id: 'MUSIC_PERF_BMUS_2026',
    name: 'Music Performance B.Mus.',
    catalogYear: '2026-27',
    school: 'Claire Trevor School of the Arts',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'music_perf_lower',
        category: 'LOWER_DIVISION',
        name: 'Harmony, Musicianship & Private Instruction',
        requirements: [
          {
            id: 'music_perf_prep',
            name: 'Musicianship, Harmony & Music Tech',
            description: 'Three quarters of harmony and music technology.',
            type: 'ALL_OF',
            courses: ['MUSIC 16A', 'MUSIC 16B', 'MUSIC 16C', 'MUSIC 51']
          }
        ]
      },
      {
        id: 'music_perf_upper',
        category: 'UPPER_DIVISION',
        name: 'Orchestration, Ensembles & Solo Recital',
        requirements: [
          {
            id: 'music_perf_recital',
            name: 'Advanced Theory, Large Ensemble & Senior Recital',
            description: 'Music history, form/analysis, ensemble, and solo recital.',
            type: 'ALL_OF',
            courses: ['MUSIC 100', 'MUSIC 140A', 'MUSIC 160', 'MUSIC 190']
          }
        ]
      },
      {
        id: 'music_perf_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'music_perf_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'music_perf_min_upper_div_units',
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
  // Music Theatre B.F.A. (Claire Trevor School of the Arts)
  // =========================================================================
  {
    id: 'MUSIC_THEATRE_BFA_2026',
    name: 'Music Theatre B.F.A.',
    catalogYear: '2026-27',
    school: 'Claire Trevor School of the Arts',
    totalUnitsRequired: 180,
    minUpperDivisionUnits: 60,
    sections: [
      {
        id: 'music_theatre_lower',
        category: 'LOWER_DIVISION',
        name: 'Acting, Voice & Musical Theatre Dance',
        requirements: [
          {
            id: 'music_theatre_prep',
            name: 'Acting, Musicianship & Dance Fundamentals',
            description: 'Acting fundamentals, harmony, stagecraft, and jazz dance.',
            type: 'ALL_OF',
            courses: ['DRAMA 30A', 'DRAMA 40A', 'MUSIC 16A', 'DANCE 80A']
          }
        ]
      },
      {
        id: 'music_theatre_upper',
        category: 'UPPER_DIVISION',
        name: 'Music Theatre Workshop & Mainstage Production',
        requirements: [
          {
            id: 'music_theatre_core_req',
            name: 'Advanced Acting, Audition & Mainstage Performance',
            description: 'Advanced acting workshop, directing, and mainstage production.',
            type: 'ALL_OF',
            courses: ['DRAMA 120A', 'DRAMA 130', 'DRAMA 101', 'DRAMA 190']
          }
        ]
      },
      {
        id: 'music_theatre_university',
        category: 'UNIVERSITY',
        name: 'University & Unit Minimums',
        requirements: [
          {
            id: 'music_theatre_min_total_units',
            name: '180 Total Units Graduation Threshold',
            description: 'A minimum of 180 quarter units is required for the bachelor degree.',
            type: 'MIN_TOTAL_UNITS',
            targetCount: 180
          },
          {
            id: 'music_theatre_min_upper_div_units',
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
  // UCI General Education (GE Breadth) (Division of Undergraduate Education)
  // =========================================================================
  {
    id: 'UCI_GE_CORE_2026',
    name: 'UCI General Education (GE Breadth)',
    catalogYear: '2026-27',
    school: 'Division of Undergraduate Education',
    totalUnitsRequired: 68,
    minUpperDivisionUnits: 4,
    sections: [
      {
        id: 'ge_cat_1',
        category: 'GENERAL_EDUCATION',
        name: 'Category I: Writing',
        requirements: [
          {
            id: 'ge_1a_lower_writing',
            name: 'GE Ia: Lower-Division Writing',
            description: 'Two courses in academic rhetoric and composition (WRITING 39B and WRITING 39C).',
            type: 'ALL_OF',
            courses: ['WRITING 39B', 'WRITING 39C']
          },
          {
            id: 'ge_1b_upper_writing',
            name: 'GE Ib: Upper-Division Writing',
            description: 'One upper-division course with writing-intensive designation.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 1,
            courses: ['ENGLISH 101W', 'HISTORY 100W', 'SOCECOL 194W', 'PUBHLTH 195W', 'ASIANAM 100W']
          }
        ]
      },
      {
        id: 'ge_cat_2',
        category: 'GENERAL_EDUCATION',
        name: 'Category II: Science and Technology',
        requirements: [
          {
            id: 'ge_2_science',
            name: 'Science and Technology Breadth',
            description: 'Complete at least 3 courses in physical or biological sciences.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 3,
            courses: ['BIO SCI 93', 'BIO SCI 94', 'CHEM 1A', 'PHYSICS 7C', 'EARTHSS 1']
          }
        ]
      },
      {
        id: 'ge_cat_3',
        category: 'GENERAL_EDUCATION',
        name: 'Category III: Social and Behavioral Sciences',
        requirements: [
          {
            id: 'ge_3_social_behavioral',
            name: 'Social and Behavioral Sciences',
            description: 'Complete at least 3 courses in economics, psychology, sociology, politics, or anthropology.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 3,
            courses: ['ECON 20A', 'POL SCI 21A', 'PSYCH 9A', 'SOCIOL 1', 'ANTHRO 2A', 'SOCECOL 10']
          }
        ]
      },
      {
        id: 'ge_cat_4',
        category: 'GENERAL_EDUCATION',
        name: 'Category IV: Arts and Humanities',
        requirements: [
          {
            id: 'ge_4_arts_humanities',
            name: 'Arts and Humanities',
            description: 'Complete at least 3 courses in literature, philosophy, history, visual arts, music, or drama.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 3,
            courses: ['ART 1A', 'DRAMA 10', 'MUSIC 16A', 'PHILOS 1', 'HISTORY 21A', 'ENGLISH 8']
          }
        ]
      },
      {
        id: 'ge_cat_5',
        category: 'GENERAL_EDUCATION',
        name: 'Category V: Quantitative, Symbolic, and Computational Reasoning',
        requirements: [
          {
            id: 'ge_5_quantitative',
            name: 'Quantitative and Computational Reasoning',
            description: 'Complete at least 3 courses in calculus, linear algebra, statistics, or programming.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 3,
            courses: ['MATH 2A', 'MATH 2B', 'STATS 67', 'ICS 31']
          }
        ]
      },
      {
        id: 'ge_cat_6',
        category: 'GENERAL_EDUCATION',
        name: 'Category VI: Language Other Than English (LOTE)',
        requirements: [
          {
            id: 'ge_6_lote',
            name: 'Language Other Than English (Level 1C or Equivalent)',
            description: 'Demonstrate competence through intermediate language course or AP/SAT II.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 1,
            courses: ['SPANISH 2A', 'FRENCH 2A', 'CHINESE 2A', 'JAPANSE 2A', 'KOREAN 2A']
          }
        ]
      },
      {
        id: 'ge_cat_7',
        category: 'GENERAL_EDUCATION',
        name: 'Category VII: Multicultural Studies',
        requirements: [
          {
            id: 'ge_7_multicultural',
            name: 'Multicultural Studies',
            description: 'Complete at least 1 course examining diverse ethnic or cultural identities in the US.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 1,
            courses: ['ASIANAM 50', 'AFAM 40A', 'CHC/LAT 61', 'GEN&SEX 50A', 'EDUC 160']
          }
        ]
      },
      {
        id: 'ge_cat_8',
        category: 'GENERAL_EDUCATION',
        name: 'Category VIII: International/Global Issues',
        requirements: [
          {
            id: 'ge_8_international',
            name: 'International and Global Issues',
            description: 'Complete at least 1 course analyzing transnational, geopolitical, or global cultural phenomena.',
            type: 'CHOOSE_N_COURSES',
            targetCount: 1,
            courses: ['INTL ST 1', 'GLOBAL 1', 'PUBHLTH 2', 'HISTORY 21B', 'COM LIT 60A']
          }
        ]
      }
    ]
  }
]
export const UCI_GE_PROGRAM: DegreeProgram = UCI_DEGREE_PROGRAMS.find((p) => p.id === 'UCI_GE_CORE_2026')!

export const UCI_MINORS: Array<{ id: string; name: string; school: string; courses: string[] }> = [
  { id: 'MINOR_CS', name: 'Computer Science Minor', school: 'Donald Bren School of Information and Computer Sciences', courses: ['ICS 31', 'ICS 32', 'ICS 33', 'ICS 45C', 'ICS 46', 'ICS 6B', 'ICS 6D'] },
  { id: 'MINOR_IN4MATX', name: 'Informatics Minor', school: 'Donald Bren School of Information and Computer Sciences', courses: ['ICS 31', 'ICS 32', 'IN4MATX 43', 'IN4MATX 113', 'IN4MATX 121'] },
  { id: 'MINOR_MGMT', name: 'Management Minor', school: 'The Paul Merage School of Business', courses: ['MGMT 1', 'MGMT 30A', 'MGMT 30B', 'MGMT 101', 'MGMT 105'] },
  { id: 'MINOR_ECON', name: 'Economics Minor', school: 'School of Social Sciences', courses: ['ECON 20A', 'ECON 20B', 'MATH 2A', 'ECON 100A', 'ECON 100B'] },
  { id: 'MINOR_MATH', name: 'Mathematics Minor', school: 'School of Physical Sciences', courses: ['MATH 2A', 'MATH 2B', 'MATH 2D', 'MATH 3A', 'MATH 120A'] },
  { id: 'MINOR_DIGITAL_ARTS', name: 'Digital Arts Minor', school: 'Claire Trevor School of the Arts', courses: ['ART 9A', 'ART 100', 'ART 106A', 'ART 150'] },
  { id: 'MINOR_PSYCH_SCI', name: 'Psychological Science Minor', school: 'School of Social Ecology', courses: ['SOCECOL 10', 'PSYC SCI 9A', 'PSYC SCI 9B', 'PSYC SCI 102C'] },
  { id: 'MINOR_EDUC', name: 'Education Minor', school: 'School of Education', courses: ['EDUC 50', 'EDUC 30', 'EDUC 100', 'EDUC 124'] },
  { id: 'MINOR_PUBHLTH', name: 'Public Health Minor', school: 'Program in Public Health', courses: ['PUBHLTH 1', 'PUBHLTH 2', 'PUBHLTH 101', 'PUBHLTH 122'] }
]

export function getDegreeProgramById(id: string): DegreeProgram | undefined {
  return UCI_DEGREE_PROGRAMS.find((p) => p.id === id)
}

export function getDegreeProgramByName(name: string): DegreeProgram | undefined {
  const target = name.trim().toLowerCase()
  return (
    UCI_DEGREE_PROGRAMS.find((p) => p.name.toLowerCase() === target) ||
    UCI_DEGREE_PROGRAMS.find((p) => p.name.toLowerCase().startsWith(target)) ||
    UCI_DEGREE_PROGRAMS.find(
      (p) => p.name.toLowerCase().includes(target) || target.includes(p.name.toLowerCase())
    )
  )
}

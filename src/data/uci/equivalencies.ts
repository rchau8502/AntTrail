import { CourseEquivalency } from '../../academic-engine/types'

export const OFFICIAL_TRANSFER_EQUIVALENCIES: CourseEquivalency[] = [
  // --- Mt. San Antonio College (Mt. SAC) ---
  {
    id: 'EQ_MTSAC_MATH_180',
    targetUciCourseId: 'MATH 2A',
    sourceInstitution: 'Mt. San Antonio College',
    sourceCourseCode: 'MATH 180',
    sourceCourseTitle: 'Calculus and Analytic Geometry I',
    units: 4,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST',
    notes: 'Articulated on ASSIST.org as equivalent to UCI MATH 2A.'
  },
  {
    id: 'EQ_MTSAC_MATH_181',
    targetUciCourseId: 'MATH 2B',
    sourceInstitution: 'Mt. San Antonio College',
    sourceCourseCode: 'MATH 181',
    sourceCourseTitle: 'Calculus and Analytic Geometry II',
    units: 4,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST',
    notes: 'Articulated on ASSIST.org as equivalent to UCI MATH 2B.'
  },
  {
    id: 'EQ_MTSAC_MATH_280',
    targetUciCourseId: 'MATH 2D',
    sourceInstitution: 'Mt. San Antonio College',
    sourceCourseCode: 'MATH 280',
    sourceCourseTitle: 'Calculus and Analytic Geometry III',
    units: 5,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST',
    notes: 'Articulated on ASSIST.org as equivalent to UCI MATH 2D.'
  },
  {
    id: 'EQ_MTSAC_MATH_260',
    targetUciCourseId: 'MATH 3A',
    sourceInstitution: 'Mt. San Antonio College',
    sourceCourseCode: 'MATH 260',
    sourceCourseTitle: 'Linear Algebra',
    units: 4,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST',
    notes: 'Direct equivalent to UCI MATH 3A per ASSIST agreement.'
  },
  {
    id: 'EQ_MTSAC_CSCI_110',
    targetUciCourseId: 'ICS 31',
    sourceInstitution: 'Mt. San Antonio College',
    sourceCourseCode: 'CSCI 110',
    sourceCourseTitle: 'Fundamentals of Computer Science',
    units: 3.5,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST',
    notes: 'Articulated for UCI ICS 31.'
  },
  {
    id: 'EQ_MTSAC_CSCI_140',
    targetUciCourseId: 'ICS 32',
    sourceInstitution: 'Mt. San Antonio College',
    sourceCourseCode: 'CSCI 140',
    sourceCourseTitle: 'C++ Programming',
    units: 3.5,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST',
    notes: 'Articulated for UCI ICS 32.'
  },
  {
    id: 'EQ_MTSAC_CSCI_220',
    targetUciCourseId: 'ICS 45C',
    sourceInstitution: 'Mt. San Antonio College',
    sourceCourseCode: 'CSCI 220',
    sourceCourseTitle: 'Data Structures and Algorithms I',
    units: 3.5,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST',
    notes: 'Articulated for UCI ICS 45C.'
  },

  // --- Irvine Valley College (IVC) ---
  {
    id: 'EQ_IVC_MATH_3A',
    targetUciCourseId: 'MATH 2A',
    sourceInstitution: 'Irvine Valley College',
    sourceCourseCode: 'MATH 3A',
    sourceCourseTitle: 'Analytic Geometry and Calculus I',
    units: 5,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },
  {
    id: 'EQ_IVC_MATH_3B',
    targetUciCourseId: 'MATH 2B',
    sourceInstitution: 'Irvine Valley College',
    sourceCourseCode: 'MATH 3B',
    sourceCourseTitle: 'Analytic Geometry and Calculus II',
    units: 5,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },
  {
    id: 'EQ_IVC_MATH_4A',
    targetUciCourseId: 'MATH 2D',
    sourceInstitution: 'Irvine Valley College',
    sourceCourseCode: 'MATH 4A',
    sourceCourseTitle: 'Multivariable Calculus',
    units: 5,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },
  {
    id: 'EQ_IVC_MATH_26',
    targetUciCourseId: 'MATH 3A',
    sourceInstitution: 'Irvine Valley College',
    sourceCourseCode: 'MATH 26',
    sourceCourseTitle: 'Introduction to Linear Algebra',
    units: 4,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },
  {
    id: 'EQ_IVC_CS_10',
    targetUciCourseId: 'ICS 31',
    sourceInstitution: 'Irvine Valley College',
    sourceCourseCode: 'CS 10',
    sourceCourseTitle: 'Introduction to Computer Science using Python',
    units: 3,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },
  {
    id: 'EQ_IVC_CS_36',
    targetUciCourseId: 'ICS 32',
    sourceInstitution: 'Irvine Valley College',
    sourceCourseCode: 'CS 36',
    sourceCourseTitle: 'C Programming',
    units: 3,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },
  {
    id: 'EQ_IVC_CS_41',
    targetUciCourseId: 'ICS 46',
    sourceInstitution: 'Irvine Valley College',
    sourceCourseCode: 'CS 41',
    sourceCourseTitle: 'Data Structures',
    units: 3,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },

  // --- Orange Coast College (OCC) ---
  {
    id: 'EQ_OCC_MATH_A180',
    targetUciCourseId: 'MATH 2A',
    sourceInstitution: 'Orange Coast College',
    sourceCourseCode: 'MATH A180',
    sourceCourseTitle: 'Calculus 1',
    units: 4,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },
  {
    id: 'EQ_OCC_MATH_A185',
    targetUciCourseId: 'MATH 2B',
    sourceInstitution: 'Orange Coast College',
    sourceCourseCode: 'MATH A185',
    sourceCourseTitle: 'Calculus 2',
    units: 4,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },
  {
    id: 'EQ_OCC_MATH_A280',
    targetUciCourseId: 'MATH 2D',
    sourceInstitution: 'Orange Coast College',
    sourceCourseCode: 'MATH A280',
    sourceCourseTitle: 'Calculus 3',
    units: 4,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },
  {
    id: 'EQ_OCC_MATH_A285',
    targetUciCourseId: 'MATH 3A',
    sourceInstitution: 'Orange Coast College',
    sourceCourseCode: 'MATH A285',
    sourceCourseTitle: 'Introduction to Linear Algebra and Differential Equations',
    units: 5,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  },
  {
    id: 'EQ_OCC_CS_A131',
    targetUciCourseId: 'ICS 31',
    sourceInstitution: 'Orange Coast College',
    sourceCourseCode: 'CS A131',
    sourceCourseTitle: 'Python Programming 1',
    units: 4,
    minGradeRequired: 'C',
    articulationType: 'OFFICIAL_ASSIST'
  }
]

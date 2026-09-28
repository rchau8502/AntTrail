export type GradeLetter =
  | 'A+' | 'A' | 'A-'
  | 'B+' | 'B' | 'B-'
  | 'C+' | 'C' | 'C-'
  | 'D+' | 'D' | 'D-'
  | 'F' | 'P' | 'NP' | 'S' | 'U' | 'IP'

export const GRADE_POINTS: Record<GradeLetter, number | null> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
  'P': null,
  'NP': null,
  'S': null,
  'U': null,
  'IP': null
}

export type ClassStanding = 'Freshman' | 'Sophomore' | 'Junior' | 'Senior'

export type OfferingTerm = 'Fall' | 'Winter' | 'Spring' | 'Summer'

export type OfferingConfidence = 'CONFIRMED' | 'EXPECTED' | 'LIKELY' | 'UNKNOWN'

export interface TermOffering {
  term: OfferingTerm
  year: number
  confidence: OfferingConfidence
  instructors?: string[]
}

export type PrerequisiteNode =
  | {
      type: 'course'
      courseId: string // e.g. "ICS 33", "MATH 2B"
      minGrade?: GradeLetter // defaults to 'C' or 'C-'
      allowConcurrent?: boolean
    }
  | {
      type: 'and'
      children: PrerequisiteNode[]
    }
  | {
      type: 'or'
      children: PrerequisiteNode[]
    }
  | {
      type: 'units'
      minUnits: number
      department?: string
      description?: string
    }
  | {
      type: 'class_standing'
      minStanding: ClassStanding
    }
  | {
      type: 'major'
      allowedMajors?: string[]
      excludedMajors?: string[]
    }
  | {
      type: 'custom'
      description: string
      satisfiedByDefault?: boolean
    }

export interface Course {
  id: string // normalized ID, e.g. "ICS_46", "MATH_2D"
  code: string // display code, e.g. "ICS 46", "MATH 2D"
  title: string
  department: string // "ICS", "MATH", "COMPSCI", etc.
  units: number
  description: string
  catalogYear: string // "2026-27"
  prerequisiteExpression?: PrerequisiteNode
  prerequisiteText?: string // human readable string
  corequisites?: string[]
  offerings?: TermOffering[]
  repeatability?: {
    maxUnits?: number
    canRepeatForCredit: boolean
  }
}

export interface CourseEquivalency {
  id: string
  targetUciCourseId: string // e.g. "MATH 2A"
  sourceInstitution: string // e.g. "Mt. San Antonio College", "Irvine Valley College", "Orange Coast College"
  sourceCourseCode: string // e.g. "MATH 180"
  sourceCourseTitle: string
  units: number
  minGradeRequired?: GradeLetter
  articulationType: 'OFFICIAL_ASSIST' | 'DEPARTMENT_DIRECT' | 'PETITIONED'
  notes?: string
}

export interface StudentCourseRecord {
  id: string
  courseCode: string // e.g. "ICS 31", or transfer "MATH 180"
  institution: string // "UCI" or community college name
  term: string // "Fall 2024"
  units: number
  grade: GradeLetter
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED'
}

export interface StudentProfile {
  studentId?: string
  major: string // e.g. "Computer Science B.S.", "Mathematics B.S."
  catalogYear: string // "2026-27"
  classStanding: ClassStanding
  completedUnits: number
  courseHistory: StudentCourseRecord[]
}

export type EligibilityStatus =
  | 'ELIGIBLE'
  | 'MISSING_PREREQUISITES'
  | 'TRANSFER_EQUIVALENCY_USED'
  | 'REQUIRES_REVIEW'
  | 'RESTRICTED'

export interface PrerequisiteEvaluationTree {
  node: PrerequisiteNode
  satisfied: boolean
  label: string
  explanation?: string
  satisfiedBy?: {
    courseCode: string
    institution: string
    grade: GradeLetter
    isTransferEquivalent?: boolean
    transferSource?: string
  }
  children?: PrerequisiteEvaluationTree[]
}

export interface EligibilityResult {
  course: Course
  status: EligibilityStatus
  isEligible: boolean
  summary: string
  tree?: PrerequisiteEvaluationTree
  missingItems: string[]
  satisfiedItems: string[]
  transferEquivalentsUsed: Array<{
    uciCourse: string
    transferCourse: string
    institution: string
  }>
  warnings: string[]
}

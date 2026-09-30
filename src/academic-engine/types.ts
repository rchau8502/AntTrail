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

// ==========================================
// --- Phase 2: Degree Requirements & Planner Types ---
// ==========================================

export type RequirementType =
  | 'ALL_OF'              // Must complete every course in list
  | 'CHOOSE_N_COURSES'    // Complete at least N courses from list
  | 'CHOOSE_N_UNITS'      // Complete at least N units from list
  | 'MIN_TOTAL_UNITS'     // e.g. 180 units for graduation
  | 'MIN_UPPER_DIV_UNITS' // e.g. 60 units of upper-division coursework (numbered 100-199)

export interface DegreeRequirement {
  id: string
  name: string
  description?: string
  type: RequirementType
  targetCount?: number       // e.g. 3 courses, or 12 units, or 180 total units
  courses?: string[]         // Target UCI course codes (e.g. ['ICS 31', 'ICS 32'])
  subRequirements?: DegreeRequirement[]
}

export type RequirementCategory =
  | 'LOWER_DIVISION'
  | 'UPPER_DIVISION'
  | 'MAJOR_ELECTIVES'
  | 'GENERAL_EDUCATION'
  | 'UNIVERSITY'

export interface DegreeSection {
  id: string
  category: RequirementCategory
  name: string
  requirements: DegreeRequirement[]
}

export interface DegreeProgram {
  id: string
  name: string                 // e.g. "Computer Science B.S."
  catalogYear: string          // "2026-27"
  school: string               // "Donald Bren School of Information and Computer Sciences"
  totalUnitsRequired: number   // 180
  minUpperDivisionUnits: number // 60
  sections: DegreeSection[]
}

export interface PlannedCourse {
  courseCode: string
  units: number
  customTitle?: string
}

export interface PlannedQuarter {
  id: string                   // e.g. "fall-2026"
  term: 'Fall' | 'Winter' | 'Spring' | 'Summer'
  year: number                 // 2026
  courses: PlannedCourse[]
}

export interface SequenceValidationError {
  courseCode: string
  quarterId: string
  quarterLabel: string
  missingPrerequisite: string
  prerequisiteQuarterLabel?: string
  reason: 'NOT_SCHEDULED' | 'SCHEDULED_LATER' | 'SCHEDULED_CONCURRENTLY_ILLEGAL'
  message: string
}

export interface EvaluatedRequirement {
  requirement: DegreeRequirement
  isComplete: boolean
  isPlannedComplete: boolean // Complete when counting planned courses
  completedCourses: string[]
  plannedCourses: string[]
  missingCourses: string[]
  unitsCompleted: number
  unitsPlanned: number
  eligibleToSatisfy: string[] // Currently eligible courses that can satisfy this requirement
}

export interface DegreeAuditResult {
  program: DegreeProgram
  overallProgressPercent: number
  plannedProgressPercent: number
  totalUnitsEarned: number
  totalUnitsPlanned: number
  upperDivisionUnitsEarned: number
  upperDivisionUnitsPlanned: number
  sections: Array<{
    section: DegreeSection
    requirements: EvaluatedRequirement[]
    isComplete: boolean
    isPlannedComplete: boolean
  }>
}

// ==========================================
// --- Phase 3: Auto Plan & Offerings Types ---
// ==========================================

export type AutoPlanStrategy = 'BALANCED' | 'ACCELERATED' | 'LIGHT'

export interface AutoPlanPreferences {
  maxUnitsPerQuarter: number        // e.g. 16 or 20
  minUnitsPerQuarter: number        // e.g. 12
  includeSummer: boolean            // true | false
  targetGraduationYear?: number
  userSelectedCourseCodes?: string[] // Optional specific courses student wants prioritized
}

export interface GeneratedPlan {
  id: string
  name: string                      // e.g. "Balanced Standard Pace", "Accelerated Fast Track"
  strategy: AutoPlanStrategy
  description: string
  quarters: PlannedQuarter[]
  totalUnits: number
  totalQuarters: number
  graduationTerm: string            // e.g. "Spring 2028"
  averageUnitsPerQuarter: number
  isValid: boolean
  warningMessages?: string[]
}

export interface AutoPlanResult {
  plans: GeneratedPlan[]
  unfulfillableCourses: Array<{
    courseCode: string
    reason: string
  }>
}

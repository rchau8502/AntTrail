import { GradeLetter, Course } from '../types'

export type ParserFormat = 'STUDENT_ACCESS' | 'DEGREE_WORKS' | 'GENERIC_LIST' | 'UNKNOWN'

export interface ParsedCourseCandidate {
  id: string
  rawLine: string
  courseCode: string
  normalizedCode: string
  title?: string
  units: number
  grade: GradeLetter
  term: string
  status: 'COMPLETED' | 'IN_PROGRESS' | 'TRANSFER'
  institution?: string
  isArticulation: boolean
  articulationTargetCode?: string
  matchedCatalogCourse?: Course
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  selected: boolean
}

export interface ParseResult {
  detectedFormat: ParserFormat
  courses: ParsedCourseCandidate[]
  totalUnitsExtracted: number
  warnings: string[]
  sanitizedPiiCount: number
}

import {
  PlannedQuarter,
  SequenceValidationError,
  StudentProfile,
  Course,
  CourseEquivalency,
  StudentCourseRecord
} from './types'
import { normalizeCourseCode } from './prerequisites'
import { evaluateCourseEligibility } from './eligibility'

export interface QuarterUnitSummary {
  quarterId: string
  quarterLabel: string
  totalUnits: number
  courseCount: number
  isUnderload: boolean
  isOverload: boolean
}

export interface QuarterValidationResult {
  isValid: boolean
  errors: SequenceValidationError[]
}

/**
 * Calculates unit totals and detects underload (<12 units) or overload (>20 units).
 */
export function getQuarterUnitSummary(quarters: PlannedQuarter[]): QuarterUnitSummary[] {
  return quarters.map((q) => {
    const totalUnits = q.courses.reduce((sum, c) => sum + (c.units ?? 4), 0)
    return {
      quarterId: q.id,
      quarterLabel: `${q.term} ${q.year}`,
      totalUnits,
      courseCount: q.courses.length,
      isUnderload: totalUnits < 12,
      isOverload: totalUnits > 20
    }
  })
}

/**
 * Helper to recursively extract all required prerequisite course codes from an AST node.
 */
function extractPrerequisiteCourseCodes(node: any): string[] {
  if (!node) return []
  if (node.type === 'course') {
    return [normalizeCourseCode(node.courseId)]
  }
  if (node.type === 'and' || node.type === 'or') {
    return (node.children ?? []).flatMap(extractPrerequisiteCourseCodes)
  }
  return []
}

/**
 * Validates a multi-quarter schedule for prerequisite sequencing.
 * Ensures courses are not scheduled before or without their required prerequisites.
 */
export function validateQuarterPlan(
  plan: PlannedQuarter[],
  profile: StudentProfile,
  catalogCourses: Course[],
  equivalencies: CourseEquivalency[] = []
): QuarterValidationResult {
  const errors: SequenceValidationError[] = []

  // Pre-index where each planned course is scheduled: normCode -> { quarterIndex, quarterLabel }
  const courseScheduleMap = new Map<string, { quarterIndex: number; quarterLabel: string }>()
  plan.forEach((q, qIdx) => {
    const qLabel = `${q.term} ${q.year}`
    q.courses.forEach((c) => {
      courseScheduleMap.set(normalizeCourseCode(c.courseCode), {
        quarterIndex: qIdx,
        quarterLabel: qLabel
      })
    })
  })

  // Track courses available up to current quarter
  const accumulatedHistory: StudentCourseRecord[] = [...profile.courseHistory]

  for (let qIdx = 0; qIdx < plan.length; qIdx++) {
    const quarter = plan[qIdx]
    const quarterLabel = `${quarter.term} ${quarter.year}`

    for (const plannedCourse of quarter.courses) {
      const normCode = normalizeCourseCode(plannedCourse.courseCode)
      const courseDef = catalogCourses.find(
        (c) => normalizeCourseCode(c.code) === normCode
      )

      if (courseDef && courseDef.prerequisiteExpression) {
        // Evaluate eligibility based on accumulated history
        const tempProfile: StudentProfile = {
          ...profile,
          completedUnits: accumulatedHistory.reduce((sum, c) => sum + c.units, 0),
          courseHistory: accumulatedHistory
        }

        const evalResult = evaluateCourseEligibility(courseDef, tempProfile, equivalencies)

        if (!evalResult.isEligible) {
          // Find which prerequisite is missing
          const prereqCodes = extractPrerequisiteCourseCodes(courseDef.prerequisiteExpression)

          // Check if any required prerequisite is scheduled later or missing entirely
          for (const prereqCode of prereqCodes) {
            const scheduledInfo = courseScheduleMap.get(prereqCode)

            if (scheduledInfo && scheduledInfo.quarterIndex > qIdx) {
              errors.push({
                courseCode: plannedCourse.courseCode,
                quarterId: quarter.id,
                quarterLabel,
                missingPrerequisite: prereqCode,
                prerequisiteQuarterLabel: scheduledInfo.quarterLabel,
                reason: 'SCHEDULED_LATER',
                message: `${plannedCourse.courseCode} in ${quarterLabel} requires ${prereqCode}, which is scheduled later in ${scheduledInfo.quarterLabel}.`
              })
              break
            } else if (scheduledInfo && scheduledInfo.quarterIndex === qIdx) {
              errors.push({
                courseCode: plannedCourse.courseCode,
                quarterId: quarter.id,
                quarterLabel,
                missingPrerequisite: prereqCode,
                prerequisiteQuarterLabel: quarterLabel,
                reason: 'SCHEDULED_CONCURRENTLY_ILLEGAL',
                message: `${plannedCourse.courseCode} and its prerequisite ${prereqCode} are scheduled in the same term (${quarterLabel}).`
              })
              break
            }
          }

          // If no specific later schedule was found, it is unscheduled
          if (!errors.some((e) => e.courseCode === plannedCourse.courseCode && e.quarterId === quarter.id)) {
            errors.push({
              courseCode: plannedCourse.courseCode,
              quarterId: quarter.id,
              quarterLabel,
              missingPrerequisite: evalResult.missingItems.join(', '),
              reason: 'NOT_SCHEDULED',
              message: `${plannedCourse.courseCode} in ${quarterLabel} is missing required prerequisites (${evalResult.missingItems.join(', ')}).`
            })
          }
        }
      }
    }

    // Add this quarter's courses to accumulated history for subsequent quarters
    quarter.courses.forEach((c) => {
      accumulatedHistory.push({
        id: `planned-${c.courseCode}-${quarter.id}`,
        courseCode: c.courseCode,
        institution: 'UCI',
        term: quarterLabel,
        units: c.units ?? 4,
        grade: 'A',
        status: 'COMPLETED'
      })
    })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Creates default initial quarters starting with Fall 2026.
 */
export function createDefaultQuarters(): PlannedQuarter[] {
  return [
    {
      id: '2026-fall',
      term: 'Fall',
      year: 2026,
      courses: []
    },
    {
      id: '2027-winter',
      term: 'Winter',
      year: 2027,
      courses: []
    },
    {
      id: '2027-spring',
      term: 'Spring',
      year: 2027,
      courses: []
    }
  ]
}

/**
 * Validates a planned schedule against offerings, unit load, and prerequisite ordering.
 */
export function validatePlannedSchedule(
  quarters: any[],
  history: StudentCourseRecord[] = [],
  catalogCourses: Course[] = [],
  equivalencies: CourseEquivalency[] = []
) {
  const issues: Array<{
    severity: 'ERROR' | 'WARNING'
    quarterId: string
    quarterLabel: string
    courseCode?: string
    message: string
    details?: string
  }> = []

  const accumulatedHistory = [...history]

  for (let qIdx = 0; qIdx < quarters.length; qIdx++) {
    const q = quarters[qIdx]
    const label = q.label ?? `${q.term} ${q.year}`
    const totalUnits = (q.courses ?? []).reduce((sum: number, c: any) => sum + (c.units ?? 4), 0)

    if (totalUnits > (q.maxUnits ?? 20)) {
      issues.push({
        severity: 'WARNING',
        quarterId: q.id,
        quarterLabel: label,
        message: `High Unit Load: ${totalUnits} units exceeds recommended limit of ${q.maxUnits ?? 20}.`
      })
    }

    for (const c of q.courses ?? []) {
      const normCode = normalizeCourseCode(c.courseCode)
      const courseDef = catalogCourses.find((cat) => normalizeCourseCode(cat.code) === normCode)

      // Offering conflict check
      if (courseDef && courseDef.offerings && courseDef.offerings.length > 0) {
        const isOffered = courseDef.offerings.some((off) => off.term === q.term)
        if (!isOffered) {
          issues.push({
            severity: 'ERROR',
            quarterId: q.id,
            quarterLabel: label,
            courseCode: c.courseCode,
            message: `Offering Conflict: ${c.courseCode} is not offered in ${q.term}.`
          })
        }
      }

      // Prerequisite check
      if (courseDef && courseDef.prerequisiteExpression) {
        const tempProfile: StudentProfile = {
          major: 'Any',
          catalogYear: '2026-27',
          classStanding: 'Senior',
          completedUnits: accumulatedHistory.reduce((sum, h) => sum + h.units, 0),
          courseHistory: accumulatedHistory
        }
        const evalRes = evaluateCourseEligibility(courseDef, tempProfile, equivalencies)
        if (!evalRes.isEligible) {
          issues.push({
            severity: 'ERROR',
            quarterId: q.id,
            quarterLabel: label,
            courseCode: c.courseCode,
            message: `Prerequisite Violation: ${c.courseCode} cannot be taken in ${label}.`,
            details: `Missing prerequisites: ${evalRes.missingItems.join(', ')}`
          })
        }
      }

      accumulatedHistory.push({
        id: `planned-${c.courseCode}-${q.id}`,
        courseCode: c.courseCode,
        institution: 'UCI',
        term: label,
        units: c.units ?? 4,
        grade: 'A',
        status: 'COMPLETED'
      })
    }
  }

  const hasErrors = issues.some((i) => i.severity === 'ERROR')
  const hasWarnings = issues.some((i) => i.severity === 'WARNING')

  return {
    isValid: !hasErrors,
    hasErrors,
    hasWarnings,
    totalQuarters: quarters.length,
    issues
  }
}

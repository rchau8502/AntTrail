import {
  DegreeProgram,
  DegreeRequirement,
  DegreeSection,
  DegreeAuditResult,
  EvaluatedRequirement,
  StudentProfile,
  PlannedQuarter,
  CourseEquivalency,
  Course
} from './types'
import { normalizeCourseCode, isGradeSufficient } from './prerequisites'
import { evaluateCourseEligibility } from './eligibility'
import { UCI_CS_MATH_COURSES } from '../data/uci/courses'

// Legacy / Alternative Degree Types for degrees.ts compatibility
export interface DegreeRule {
  id: string
  title: string
  description?: string
  ruleType: 'ALL_COURSES' | 'CHOOSE_N_COURSES' | 'MIN_UNITS'
  courseCodes?: string[]
  requiredCount?: number
  minUnits?: number
}

export interface LegacyDegreeSection {
  id: string
  title: string
  description?: string
  rules: DegreeRule[]
}

export interface LegacyDegreeProgram {
  id: string
  name: string
  department: string
  school: string
  catalogYear: string
  totalUnitsRequired: number
  sections: LegacyDegreeSection[]
}

export interface EvaluatedRule {
  rule: DegreeRule
  isComplete: boolean
  isPlanned: boolean
  completedCourses: string[]
  plannedCourses: string[]
  missingCourses: string[]
  eligibleCoursesToSatisfy: Course[]
}

export interface EvaluatedSection {
  section: LegacyDegreeSection
  isComplete: boolean
  rules: EvaluatedRule[]
}

export interface DegreeAudit {
  program: LegacyDegreeProgram
  totalUnitsCompleted: number
  totalUnitsPlanned: number
  completionPercentage: number
  sections: EvaluatedSection[]
}

/**
 * Evaluates a LegacyDegreeProgram (e.g. from degrees.ts) against a student profile
 */
export function evaluateDegreeProgram(
  program: LegacyDegreeProgram,
  profile: StudentProfile,
  plannedCoursesInput: string[] | PlannedQuarter[] = [],
  catalog: Course[] = UCI_CS_MATH_COURSES,
  equivalencies: CourseEquivalency[] = []
): DegreeAudit {
  // 1. Gather completed courses
  const completedCodes = new Set<string>()
  for (const rec of profile.courseHistory) {
    if (rec.status === 'COMPLETED' && isGradeSufficient(rec.grade, 'C')) {
      const norm = normalizeCourseCode(rec.courseCode)
      completedCodes.add(norm)

      if (rec.institution !== 'UCI') {
        const match = equivalencies.find(
          (eq) =>
            normalizeCourseCode(eq.sourceCourseCode) === norm &&
            (eq.sourceInstitution.toLowerCase().includes(rec.institution.toLowerCase()) ||
              rec.institution.toLowerCase().includes(eq.sourceInstitution.toLowerCase()))
        )
        if (match) {
          completedCodes.add(normalizeCourseCode(match.targetUciCourseId))
        }
      }
    }
  }

  // 2. Gather planned courses
  const plannedCodes = new Set<string>()
  if (Array.isArray(plannedCoursesInput)) {
    for (const item of plannedCoursesInput) {
      if (typeof item === 'string') {
        plannedCodes.add(normalizeCourseCode(item))
      } else if (item && 'courses' in item) {
        for (const c of item.courses) {
          plannedCodes.add(normalizeCourseCode(c.courseCode))
        }
      }
    }
  }

  // 3. Precompute eligible catalog courses
  const eligibleCoursesMap = new Map<string, Course>()
  for (const course of catalog) {
    const res = evaluateCourseEligibility(course, profile, equivalencies)
    if (res.isEligible) {
      eligibleCoursesMap.set(normalizeCourseCode(course.code), course)
    }
  }

  let totalRules = 0
  let completedRules = 0

  const evaluatedSections: EvaluatedSection[] = program.sections.map((section) => {
    const evaluatedRules: EvaluatedRule[] = section.rules.map((rule) => {
      totalRules++
      const codes = rule.courseCodes?.map(normalizeCourseCode) ?? []
      const completed: string[] = []
      const planned: string[] = []
      const missing: string[] = []
      const eligibleToSatisfy: Course[] = []

      for (const code of codes) {
        if (completedCodes.has(code)) {
          completed.push(code)
        } else if (plannedCodes.has(code)) {
          planned.push(code)
        } else {
          missing.push(code)
          const eligibleCourse = eligibleCoursesMap.get(code)
          if (eligibleCourse) {
            eligibleToSatisfy.push(eligibleCourse)
          }
        }
      }

      // Also check if any planned course can satisfy
      for (const p of planned) {
        const eligibleCourse = eligibleCoursesMap.get(p)
        if (eligibleCourse && !eligibleToSatisfy.some((c) => normalizeCourseCode(c.code) === p)) {
          eligibleToSatisfy.push(eligibleCourse)
        }
      }

      let isComplete = false
      let isPlanned = false

      if (rule.ruleType === 'ALL_COURSES') {
        isComplete = codes.length > 0 && codes.every((c) => completedCodes.has(c))
        isPlanned = codes.length > 0 && codes.every((c) => completedCodes.has(c) || plannedCodes.has(c))
      } else if (rule.ruleType === 'CHOOSE_N_COURSES') {
        const reqCount = rule.requiredCount ?? 1
        isComplete = completed.length >= reqCount
        isPlanned = completed.length + planned.length >= reqCount
      }

      if (isComplete) completedRules++

      return {
        rule,
        isComplete,
        isPlanned,
        completedCourses: completed,
        plannedCourses: planned,
        missingCourses: missing,
        eligibleCoursesToSatisfy: eligibleToSatisfy
      }
    })

    return {
      section,
      isComplete: evaluatedRules.every((r) => r.isComplete),
      rules: evaluatedRules
    }
  })

  const completionPercentage = totalRules > 0 ? Math.round((completedRules / totalRules) * 100) : 0

  return {
    program,
    totalUnitsCompleted: profile.completedUnits,
    totalUnitsPlanned: plannedCodes.size * 4,
    completionPercentage,
    sections: evaluatedSections
  }
}

/**
 * Checks if a UCI course number represents an Upper-Division course (numbered 100-199).
 */
export function isUpperDivisionCourse(courseCode: string): boolean {
  const match = courseCode.match(/\b([1-9][0-9]{2})[A-Z]?\b/)
  if (!match) return false
  const num = parseInt(match[1], 10)
  return num >= 100 && num <= 199
}

/**
 * Evaluates an entire degree program for a student, incorporating completed
 * coursework, approved transfer credits, and future planned quarters.
 */
export function evaluateDegreeAudit(
  program: DegreeProgram,
  profile: StudentProfile,
  plannedQuarters: PlannedQuarter[] = [],
  equivalencies: CourseEquivalency[] = []
): DegreeAuditResult {
  // 1. Build set of earned course codes (direct UCI courses + articulated transfer equivalents)
  const earnedCourseCodes = new Set<string>()
  const courseUnitsMap = new Map<string, number>()

  for (const record of profile.courseHistory) {
    if (record.status === 'COMPLETED' && isGradeSufficient(record.grade, 'C')) {
      const normCode = normalizeCourseCode(record.courseCode)
      earnedCourseCodes.add(normCode)
      courseUnitsMap.set(normCode, record.units)

      // Check transfer articulation
      if (record.institution !== 'UCI') {
        const match = equivalencies.find(
          (eq) =>
            normalizeCourseCode(eq.sourceCourseCode) === normCode &&
            (eq.sourceInstitution.toLowerCase().includes(record.institution.toLowerCase()) ||
              record.institution.toLowerCase().includes(eq.sourceInstitution.toLowerCase()))
        )
        if (match) {
          const targetNorm = normalizeCourseCode(match.targetUciCourseId)
          earnedCourseCodes.add(targetNorm)
          courseUnitsMap.set(targetNorm, record.units)
        }
      }
    }
  }

  // 2. Build set of planned course codes
  const plannedCourseCodes = new Set<string>()
  let totalUnitsPlanned = 0
  let upperDivisionUnitsPlanned = 0

  for (const quarter of plannedQuarters) {
    for (const planned of quarter.courses) {
      const norm = normalizeCourseCode(planned.courseCode)
      plannedCourseCodes.add(norm)
      totalUnitsPlanned += planned.units
      if (isUpperDivisionCourse(norm)) {
        upperDivisionUnitsPlanned += planned.units
      }
    }
  }

  // 3. Precompute which catalog courses the student is currently eligible to take
  const eligibleCatalogCourses = new Set<string>()
  for (const course of UCI_CS_MATH_COURSES) {
    const evalRes = evaluateCourseEligibility(course, profile, equivalencies)
    if (evalRes.isEligible) {
      eligibleCatalogCourses.add(normalizeCourseCode(course.code))
    }
  }

  // 4. Compute completed units & upper division units
  let totalUnitsEarned = profile.completedUnits
  let upperDivisionUnitsEarned = 0
  for (const code of earnedCourseCodes) {
    if (isUpperDivisionCourse(code)) {
      upperDivisionUnitsEarned += courseUnitsMap.get(code) ?? 4
    }
  }

  // 5. Evaluate individual requirements
  function evaluateSingleRequirement(req: DegreeRequirement): EvaluatedRequirement {
    const completed: string[] = []
    const planned: string[] = []
    const missing: string[] = []
    const eligibleToSatisfy: string[] = []

    let unitsCompleted = 0
    let unitsPlanned = 0
    let isComplete = false
    let isPlannedComplete = false

    const courses = req.courses?.map(normalizeCourseCode) ?? []

    switch (req.type) {
      case 'ALL_OF': {
        for (const c of courses) {
          if (earnedCourseCodes.has(c)) {
            completed.push(c)
            unitsCompleted += courseUnitsMap.get(c) ?? 4
          } else {
            missing.push(c)
            if (plannedCourseCodes.has(c)) {
              planned.push(c)
              unitsPlanned += 4
            }
            if (eligibleCatalogCourses.has(c)) {
              eligibleToSatisfy.push(c)
            }
          }
        }
        isComplete = missing.length === 0
        isPlannedComplete = missing.every((c) => planned.includes(c))
        break
      }

      case 'CHOOSE_N_COURSES': {
        const target = req.targetCount ?? 1
        for (const c of courses) {
          if (earnedCourseCodes.has(c)) {
            completed.push(c)
            unitsCompleted += courseUnitsMap.get(c) ?? 4
          } else {
            if (plannedCourseCodes.has(c)) {
              planned.push(c)
              unitsPlanned += 4
            }
            if (eligibleCatalogCourses.has(c)) {
              eligibleToSatisfy.push(c)
            }
          }
        }
        isComplete = completed.length >= target
        isPlannedComplete = completed.length + planned.length >= target
        for (const c of courses) {
          if (!completed.includes(c) && !planned.includes(c)) {
            missing.push(c)
          }
        }
        break
      }

      case 'CHOOSE_N_UNITS': {
        const targetUnits = req.targetCount ?? 12
        for (const c of courses) {
          if (earnedCourseCodes.has(c)) {
            completed.push(c)
            unitsCompleted += courseUnitsMap.get(c) ?? 4
          } else {
            if (plannedCourseCodes.has(c)) {
              planned.push(c)
              unitsPlanned += 4
            }
            if (eligibleCatalogCourses.has(c)) {
              eligibleToSatisfy.push(c)
            }
          }
        }
        isComplete = unitsCompleted >= targetUnits
        isPlannedComplete = unitsCompleted + unitsPlanned >= targetUnits
        break
      }

      case 'MIN_TOTAL_UNITS': {
        const target = req.targetCount ?? 180
        unitsCompleted = totalUnitsEarned
        unitsPlanned = totalUnitsPlanned
        isComplete = totalUnitsEarned >= target
        isPlannedComplete = totalUnitsEarned + totalUnitsPlanned >= target
        break
      }

      case 'MIN_UPPER_DIV_UNITS': {
        const target = req.targetCount ?? 60
        unitsCompleted = upperDivisionUnitsEarned
        unitsPlanned = upperDivisionUnitsPlanned
        isComplete = upperDivisionUnitsEarned >= target
        isPlannedComplete = upperDivisionUnitsEarned + upperDivisionUnitsPlanned >= target
        break
      }
    }

    return {
      requirement: req,
      isComplete,
      isPlannedComplete,
      completedCourses: completed,
      plannedCourses: planned,
      missingCourses: missing,
      unitsCompleted,
      unitsPlanned,
      eligibleToSatisfy
    }
  }

  // 6. Evaluate all sections
  let totalRequirementsCount = 0
  let completedRequirementsCount = 0
  let plannedRequirementsCount = 0

  const evaluatedSections = program.sections.map((section: DegreeSection) => {
    const evaluatedReqs = section.requirements.map(evaluateSingleRequirement)
    const isSectionComplete = evaluatedReqs.every((r) => r.isComplete)
    const isSectionPlannedComplete = evaluatedReqs.every((r) => r.isPlannedComplete)

    for (const r of evaluatedReqs) {
      totalRequirementsCount++
      if (r.isComplete) completedRequirementsCount++
      if (r.isPlannedComplete) plannedRequirementsCount++
    }

    return {
      section,
      requirements: evaluatedReqs,
      isComplete: isSectionComplete,
      isPlannedComplete: isSectionPlannedComplete
    }
  })

  const overallProgressPercent =
    totalRequirementsCount > 0 ? Math.round((completedRequirementsCount / totalRequirementsCount) * 100) : 0

  const plannedProgressPercent =
    totalRequirementsCount > 0 ? Math.round((plannedRequirementsCount / totalRequirementsCount) * 100) : 0

  return {
    program,
    overallProgressPercent,
    plannedProgressPercent,
    totalUnitsEarned,
    totalUnitsPlanned,
    upperDivisionUnitsEarned,
    upperDivisionUnitsPlanned,
    sections: evaluatedSections
  }
}

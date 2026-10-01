import {
  GradeLetter,
  GRADE_POINTS,
  StudentProfile,
  PlannedQuarter,
  StudentCourseRecord
} from './types'

export interface TermGpaSummary {
  term: string
  gradedUnits: number
  totalUnits: number
  gradePoints: number
  gpa: number
  deansListEligible: boolean
  courses: Array<{
    courseCode: string
    units: number
    grade: GradeLetter
    gradePoints: number | null
    isRepeatReplaced?: boolean
    isTransferExcluded?: boolean
  }>
}

export interface UciGpaReport {
  cumulativeGpa: number
  totalGradedUnits: number
  totalEarnedUnits: number
  totalGradePoints: number
  academicStanding: 'GOOD_STANDING' | 'ACADEMIC_PROBATION' | 'UNSPECIFIED'
  repeatUnitsReplaced: number
  repeatAllowanceRemaining: number
  deansListTerms: string[]
  termSummaries: TermGpaSummary[]
}

export interface TargetGpaResult {
  targetGpa: number
  currentGpa: number
  currentGradedUnits: number
  plannedGradedUnits: number
  requiredGpa: number
  status: 'ACHIEVABLE' | 'IMPOSSIBLE' | 'ALREADY_EXCEEDED'
  recommendedAverageGrade: GradeLetter | 'A+' | 'BELOW_D'
  explanation: string
}

export interface TrajectoryPoint {
  periodId: string
  label: string
  termGpa: number
  cumulativeGpa: number
  cumulativeGradedUnits: number
  isProjected: boolean
}

const REPEATABLE_GRADES: Set<GradeLetter> = new Set(['C-', 'D+', 'D', 'D-', 'F', 'NP'])
const MAX_REPEAT_UNITS = 16

/**
 * Normalizes institution for UC GPA calculation.
 * Only UC Irvine (or general UC system) coursework is computed into UC Cumulative GPA.
 */
export function isUciCoursework(institution: string): boolean {
  if (!institution) return true
  const norm = institution.trim().toUpperCase()
  return norm === 'UCI' || norm === 'UC IRVINE' || norm.startsWith('UNIVERSITY OF CALIFORNIA')
}

/**
 * Deterministically evaluates cumulative GPA and term breakdowns
 * according to UC Irvine Academic Senate regulations (A340 & A345).
 */
export function calculateUciGpaReport(profile: StudentProfile): UciGpaReport {
  // Sort courses chronologically by term if possible, otherwise preserve order
  const records = [...profile.courseHistory]

  // Track course repeats: courseCode -> array of attempts with indices
  const courseAttempts = new Map<string, Array<{ record: StudentCourseRecord; index: number }>>()
  records.forEach((rec, idx) => {
    const code = rec.courseCode.trim().toUpperCase()
    if (!courseAttempts.has(code)) {
      courseAttempts.set(code, [])
    }
    courseAttempts.get(code)!.push({ record: rec, index: idx })
  })

  // Identify repeat replacements under the 16-unit allowance
  let repeatUnitsUsed = 0
  const replacedOriginalRecordIds = new Set<string>()

  courseAttempts.forEach((attempts) => {
    if (attempts.length > 1) {
      // If student took the course multiple times
      for (let i = 0; i < attempts.length - 1; i++) {
        const earlierAttempt = attempts[i].record
        // Check if earlier attempt was eligible for repeat under UCI policy (C- or lower)
        if (
          REPEATABLE_GRADES.has(earlierAttempt.grade) &&
          isUciCoursework(earlierAttempt.institution)
        ) {
          const units = earlierAttempt.units
          if (repeatUnitsUsed + units <= MAX_REPEAT_UNITS) {
            repeatUnitsUsed += units
            replacedOriginalRecordIds.add(earlierAttempt.id)
          }
        }
      }
    }
  })

  // Group into terms
  const termsMap = new Map<string, StudentCourseRecord[]>()
  records.forEach((rec) => {
    const termKey = rec.term || 'Transfer / Prior'
    if (!termsMap.has(termKey)) {
      termsMap.set(termKey, [])
    }
    termsMap.get(termKey)!.push(rec)
  })

  let cumulativeGradePoints = 0
  let cumulativeGradedUnits = 0
  let cumulativeEarnedUnits = 0
  const deansListTerms: string[] = []
  const termSummaries: TermGpaSummary[] = []

  termsMap.forEach((termCourses, term) => {
    let termGradePoints = 0
    let termGradedUnits = 0
    let termTotalUnits = 0

    const courseDetails = termCourses.map((c) => {
      const isUC = isUciCoursework(c.institution)
      const pointsPerUnit = GRADE_POINTS[c.grade]
      const isReplaced = replacedOriginalRecordIds.has(c.id)
      const isGraded = pointsPerUnit !== null && isUC

      termTotalUnits += c.units
      if (c.status === 'COMPLETED' && c.grade !== 'F' && c.grade !== 'NP' && c.grade !== 'U') {
        cumulativeEarnedUnits += c.units
      }

      if (isGraded && !isReplaced) {
        const pts = pointsPerUnit * c.units
        termGradePoints += pts
        termGradedUnits += c.units

        cumulativeGradePoints += pts
        cumulativeGradedUnits += c.units

        return {
          courseCode: c.courseCode,
          units: c.units,
          grade: c.grade,
          gradePoints: pts,
          isRepeatReplaced: false,
          isTransferExcluded: false
        }
      } else if (isReplaced) {
        return {
          courseCode: c.courseCode,
          units: c.units,
          grade: c.grade,
          gradePoints: null,
          isRepeatReplaced: true,
          isTransferExcluded: false
        }
      } else {
        return {
          courseCode: c.courseCode,
          units: c.units,
          grade: c.grade,
          gradePoints: null,
          isRepeatReplaced: false,
          isTransferExcluded: !isUC
        }
      }
    })

    const termGpa = termGradedUnits > 0 ? Math.round((termGradePoints / termGradedUnits) * 100) / 100 : 0
    // Dean's Honor List: Term GPA >= 3.5 in at least 12 graded units with no NP/F
    const isDeansList =
      termGradedUnits >= 12 &&
      termGpa >= 3.5 &&
      !termCourses.some((c) => c.grade === 'F' || c.grade === 'NP')

    if (isDeansList) {
      deansListTerms.push(term)
    }

    termSummaries.push({
      term,
      gradedUnits: termGradedUnits,
      totalUnits: termTotalUnits,
      gradePoints: termGradePoints,
      gpa: termGpa,
      deansListEligible: isDeansList,
      courses: courseDetails
    })
  })

  const rawCumGpa =
    cumulativeGradedUnits > 0
      ? Math.round((cumulativeGradePoints / cumulativeGradedUnits) * 1000) / 1000
      : 0

  const roundedCumGpa = Math.round(rawCumGpa * 100) / 100

  let academicStanding: 'GOOD_STANDING' | 'ACADEMIC_PROBATION' | 'UNSPECIFIED' = 'GOOD_STANDING'
  if (cumulativeGradedUnits > 0 && roundedCumGpa < 2.0) {
    academicStanding = 'ACADEMIC_PROBATION'
  }

  return {
    cumulativeGpa: roundedCumGpa,
    totalGradedUnits: cumulativeGradedUnits,
    totalEarnedUnits: cumulativeEarnedUnits,
    totalGradePoints: Math.round(cumulativeGradePoints * 100) / 100,
    academicStanding,
    repeatUnitsReplaced: repeatUnitsUsed,
    repeatAllowanceRemaining: Math.max(0, MAX_REPEAT_UNITS - repeatUnitsUsed),
    deansListTerms,
    termSummaries
  }
}

/**
 * Maps a numerical grade point average to the closest letter grade equivalent.
 */
export function getClosestLetterEquivalent(gpa: number): GradeLetter | 'A+' | 'BELOW_D' {
  if (gpa >= 3.85) return 'A'
  if (gpa >= 3.5) return 'A-'
  if (gpa >= 3.15) return 'B+'
  if (gpa >= 2.85) return 'B'
  if (gpa >= 2.5) return 'B-'
  if (gpa >= 2.15) return 'C+'
  if (gpa >= 1.85) return 'C'
  if (gpa >= 1.5) return 'C-'
  if (gpa >= 1.15) return 'D+'
  if (gpa >= 0.85) return 'D'
  if (gpa >= 0.5) return 'D-'
  return 'BELOW_D'
}

/**
 * Calculates the required average grade across remaining planned graded units
 * to achieve a specific target cumulative UC GPA.
 */
export function calculateTargetGpaRequirement(
  currentReport: UciGpaReport,
  plannedGradedUnits: number,
  targetGpa: number
): TargetGpaResult {
  const currentGradedUnits = currentReport.totalGradedUnits
  const currentGradePoints = currentReport.totalGradePoints

  if (plannedGradedUnits <= 0) {
    const isMet = currentReport.cumulativeGpa >= targetGpa
    return {
      targetGpa,
      currentGpa: currentReport.cumulativeGpa,
      currentGradedUnits,
      plannedGradedUnits: 0,
      requiredGpa: 0,
      status: isMet ? 'ALREADY_EXCEEDED' : 'IMPOSSIBLE',
      recommendedAverageGrade: isMet ? 'A' : 'BELOW_D',
      explanation: isMet
        ? 'Target achieved with existing coursework.'
        : 'No planned units remaining to increase GPA.'
    }
  }

  const totalFutureUnits = currentGradedUnits + plannedGradedUnits
  const totalPointsNeeded = targetGpa * totalFutureUnits
  const pointsRemaining = totalPointsNeeded - currentGradePoints
  const requiredGpa = Math.round((pointsRemaining / plannedGradedUnits) * 100) / 100

  if (requiredGpa > 4.0) {
    return {
      targetGpa,
      currentGpa: currentReport.cumulativeGpa,
      currentGradedUnits,
      plannedGradedUnits,
      requiredGpa,
      status: 'IMPOSSIBLE',
      recommendedAverageGrade: 'A+',
      explanation: `Mathematically unattainable. Requires an average of ${requiredGpa.toFixed(
        2
      )} (above 4.0 A) across ${plannedGradedUnits} planned units.`
    }
  }

  if (requiredGpa <= 0.0) {
    return {
      targetGpa,
      currentGpa: currentReport.cumulativeGpa,
      currentGradedUnits,
      plannedGradedUnits,
      requiredGpa: 0.0,
      status: 'ALREADY_EXCEEDED',
      recommendedAverageGrade: 'BELOW_D',
      explanation: `Target is already mathematically secured even with minimum passing marks.`
    }
  }

  const recommendedLetter = getClosestLetterEquivalent(requiredGpa)

  return {
    targetGpa,
    currentGpa: currentReport.cumulativeGpa,
    currentGradedUnits,
    plannedGradedUnits,
    requiredGpa,
    status: 'ACHIEVABLE',
    recommendedAverageGrade: recommendedLetter,
    explanation: `Requires an average of ${requiredGpa.toFixed(
      2
    )} (~${recommendedLetter}) across your remaining ${plannedGradedUnits} planned units.`
  }
}

/**
 * Projects cumulative GPA trajectory quarter-by-quarter based on
 * hypothetical grades assigned to upcoming planned quarters.
 */
export function projectWhatIfTrajectory(
  profile: StudentProfile,
  plannedQuarters: PlannedQuarter[],
  hypotheticalGrades: Record<string, GradeLetter> = {}
): TrajectoryPoint[] {
  const currentReport = calculateUciGpaReport(profile)
  const points: TrajectoryPoint[] = []

  let runningPoints = currentReport.totalGradePoints
  let runningUnits = currentReport.totalGradedUnits

  // 1. Add historical points
  let histPoints = 0
  let histUnits = 0
  currentReport.termSummaries.forEach((summary, idx) => {
    histPoints += summary.gradePoints
    histUnits += summary.gradedUnits
    const cumGpa = histUnits > 0 ? Math.round((histPoints / histUnits) * 100) / 100 : 0

    points.push({
      periodId: `hist_${idx}`,
      label: summary.term,
      termGpa: summary.gpa,
      cumulativeGpa: cumGpa,
      cumulativeGradedUnits: histUnits,
      isProjected: false
    })
  })

  // 2. Project future quarters
  plannedQuarters.forEach((q) => {
    let qPoints = 0
    let qUnits = 0

    q.courses.forEach((c) => {
      const assignedGrade: GradeLetter = hypotheticalGrades[c.courseCode] || 'B+'
      const pt = GRADE_POINTS[assignedGrade]
      if (pt !== null) {
        qPoints += pt * c.units
        qUnits += c.units
      }
    })

    const termGpa = qUnits > 0 ? Math.round((qPoints / qUnits) * 100) / 100 : 0
    runningPoints += qPoints
    runningUnits += qUnits
    const cumGpa = runningUnits > 0 ? Math.round((runningPoints / runningUnits) * 100) / 100 : 0

    points.push({
      periodId: q.id,
      label: `${q.term} ${q.year}`,
      termGpa,
      cumulativeGpa: cumGpa,
      cumulativeGradedUnits: runningUnits,
      isProjected: true
    })
  })

  return points
}

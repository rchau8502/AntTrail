import {
  Course,
  CourseEquivalency,
  DegreeProgram,
  PlannedQuarter,
  StudentProfile,
  StudentCourseRecord,
  AutoPlanPreferences,
  GeneratedPlan,
  AutoPlanResult,
  OfferingTerm
} from './types'
import { normalizeCourseCode, isGradeSufficient } from './prerequisites'
import { evaluateCourseEligibility } from './eligibility'
import { isCourseOfferedInTerm } from '../data/uci/offerings'
import { validatePlannedSchedule } from './planner'

/**
 * Calculates topological prerequisite depth and downstream dependency count.
 */
function calculateCoursePriority(
  courseCode: string,
  catalogMap: Map<string, Course>,
  depthMemo = new Map<string, number>()
): { depth: number; dependentsCount: number } {
  const norm = normalizeCourseCode(courseCode)
  if (depthMemo.has(norm)) {
    return { depth: depthMemo.get(norm)!, dependentsCount: 0 }
  }

  const course = catalogMap.get(norm)
  if (!course || !course.prerequisiteExpression) {
    depthMemo.set(norm, 0)
    return { depth: 0, dependentsCount: 0 }
  }

  let maxPrereqDepth = 0

  function inspectNode(node: any) {
    if (!node) return
    if (node.type === 'course') {
      const pNorm = normalizeCourseCode(node.courseId)
      const pDepth = calculateCoursePriority(pNorm, catalogMap, depthMemo).depth
      maxPrereqDepth = Math.max(maxPrereqDepth, pDepth + 1)
    } else if (node.type === 'and' || node.type === 'or') {
      node.children?.forEach(inspectNode)
    }
  }

  inspectNode(course.prerequisiteExpression)
  depthMemo.set(norm, maxPrereqDepth)

  // Count downstream dependents (how many catalog courses require this one)
  let dependentsCount = 0
  for (const [_, otherCourse] of catalogMap) {
    function hasPrereq(n: any): boolean {
      if (!n) return false
      if (n.type === 'course') return normalizeCourseCode(n.courseId) === norm
      if (n.type === 'and' || n.type === 'or') return n.children?.some(hasPrereq) ?? false
      return false
    }
    if (hasPrereq(otherCourse.prerequisiteExpression)) {
      dependentsCount++
    }
  }

  return { depth: maxPrereqDepth, dependentsCount }
}

/**
 * Generates deterministic quarter-by-quarter plans based on degree requirements,
 * actual UCI term offerings, and student pace preferences.
 */
export function generateAutoPlans(
  program: DegreeProgram,
  profile: StudentProfile,
  preferences: AutoPlanPreferences,
  catalogCourses: Course[],
  equivalencies: CourseEquivalency[] = []
): AutoPlanResult {
  const catalogMap = new Map<string, Course>()
  for (const c of catalogCourses) {
    catalogMap.set(normalizeCourseCode(c.code), c)
  }

  // 1. Identify completed course codes (direct + articulated transfer credits)
  const earnedCodes = new Set<string>()
  for (const rec of profile.courseHistory) {
    if (rec.status === 'COMPLETED' && isGradeSufficient(rec.grade, 'C')) {
      const norm = normalizeCourseCode(rec.courseCode)
      earnedCodes.add(norm)

      if (rec.institution !== 'UCI') {
        const match = equivalencies.find(
          (eq) =>
            normalizeCourseCode(eq.sourceCourseCode) === norm &&
            (eq.sourceInstitution.toLowerCase().includes(rec.institution.toLowerCase()) ||
              rec.institution.toLowerCase().includes(eq.sourceInstitution.toLowerCase()))
        )
        if (match) {
          earnedCodes.add(normalizeCourseCode(match.targetUciCourseId))
        }
      }
    }
  }

  // 2. Identify required courses from program that are not yet earned
  const neededCourseCodes: string[] = []

  for (const section of program.sections) {
    for (const req of section.requirements) {
      if (req.type === 'ALL_OF' && req.courses) {
        for (const code of req.courses) {
          const norm = normalizeCourseCode(code)
          if (!earnedCodes.has(norm) && !neededCourseCodes.includes(norm)) {
            neededCourseCodes.push(norm)
          }
        }
      } else if (req.type === 'CHOOSE_N_COURSES' && req.courses) {
        const target = req.targetCount ?? 1
        const completedInReq = req.courses.filter((c) => earnedCodes.has(normalizeCourseCode(c)))
        const remainingNeeded = target - completedInReq.length

        if (remainingNeeded > 0) {
          let added = 0
          for (const code of req.courses) {
            const norm = normalizeCourseCode(code)
            if (!earnedCodes.has(norm) && !neededCourseCodes.includes(norm) && added < remainingNeeded) {
              neededCourseCodes.push(norm)
              added++
            }
          }
        }
      }
    }
  }

  // Include user-selected desired courses if provided
  if (preferences.userSelectedCourseCodes) {
    for (const code of preferences.userSelectedCourseCodes) {
      const norm = normalizeCourseCode(code)
      if (!earnedCodes.has(norm) && !neededCourseCodes.includes(norm)) {
        neededCourseCodes.push(norm)
      }
    }
  }

  // Calculate critical path weights
  const priorityMap = new Map<string, number>()
  for (const code of neededCourseCodes) {
    const { depth, dependentsCount } = calculateCoursePriority(code, catalogMap)
    // Weight bottleneck courses that unlock future courses higher
    priorityMap.set(code, depth * 10 + dependentsCount * 5)
  }

  // Helper to build a plan given a strategy
  function buildPlan(
    strategy: 'BALANCED' | 'ACCELERATED' | 'LIGHT',
    maxUnits: number,
    allowSummer: boolean
  ): GeneratedPlan {
    const quarters: PlannedQuarter[] = []
    const remainingToSchedule = [...neededCourseCodes]

    // Track accumulated course history starting with transcript
    const accumulatedHistory: StudentCourseRecord[] = [...profile.courseHistory]
    const accumulatedCodes = new Set<string>(earnedCodes)

    let currentTerm: OfferingTerm = 'Fall'
    let currentYear = 2026
    let quarterIndex = 0
    const maxQuartersLimit = 16

    while (remainingToSchedule.length > 0 && quarterIndex < maxQuartersLimit) {
      // Skip summer if not allowed for this strategy
      if (currentTerm === 'Summer' && !allowSummer) {
        currentTerm = 'Fall'
        continue
      }

      const quarterId = `q-${currentTerm.toLowerCase()}-${currentYear}`
      const quarterCourses: Array<{ courseCode: string; units: number; customTitle?: string }> = []
      let quarterUnits = 0

      // Find candidates: must have all prerequisites satisfied by accumulatedHistory
      const candidates: string[] = []

      for (const code of remainingToSchedule) {
        const courseDef = catalogMap.get(code)
        if (!courseDef) {
          candidates.push(code)
          continue
        }

        // Check offering availability in this term
        const isOffered = isCourseOfferedInTerm(courseDef, currentTerm)
        if (!isOffered) continue

        // Check prerequisite eligibility
        const tempProfile: StudentProfile = {
          ...profile,
          completedUnits: accumulatedHistory.reduce((sum, h) => sum + h.units, 0),
          courseHistory: accumulatedHistory
        }
        const eligibility = evaluateCourseEligibility(courseDef, tempProfile, equivalencies)
        if (eligibility.isEligible) {
          candidates.push(code)
        }
      }

      // Sort candidates by priority (bottlenecks and high-dependency courses first)
      candidates.sort((a, b) => (priorityMap.get(b) ?? 0) - (priorityMap.get(a) ?? 0))

      // Slot courses into quarter up to maxUnits (or max 8-12 for summer)
      const termUnitLimit = currentTerm === 'Summer' ? Math.min(12, maxUnits) : maxUnits

      for (const candidate of candidates) {
        const courseDef = catalogMap.get(candidate)
        const units = courseDef?.units ?? 4
        if (quarterUnits + units <= termUnitLimit) {
          quarterCourses.push({
            courseCode: candidate,
            units,
            customTitle: courseDef?.title
          })
          quarterUnits += units

          // Remove from remaining
          const idx = remainingToSchedule.indexOf(candidate)
          if (idx !== -1) {
            remainingToSchedule.splice(idx, 1)
          }
        }
      }

      // Add quarter if courses were scheduled or if it's within the normal academic flow
      if (quarterCourses.length > 0 || quarterIndex < 3) {
        quarters.push({
          id: quarterId,
          term: currentTerm,
          year: currentYear,
          courses: quarterCourses
        })

        // Add scheduled courses to accumulated history for subsequent quarters
        for (const c of quarterCourses) {
          accumulatedCodes.add(normalizeCourseCode(c.courseCode))
          accumulatedHistory.push({
            id: `planned-${c.courseCode}-${quarterId}`,
            courseCode: c.courseCode,
            institution: 'UCI',
            term: `${currentTerm} ${currentYear}`,
            units: c.units,
            grade: 'A',
            status: 'COMPLETED'
          })
        }
      }

      // Advance to next term
      if (currentTerm === 'Fall') {
        currentTerm = 'Winter'
        currentYear++
      } else if (currentTerm === 'Winter') {
        currentTerm = 'Spring'
      } else if (currentTerm === 'Spring') {
        currentTerm = allowSummer ? 'Summer' : 'Fall'
      } else if (currentTerm === 'Summer') {
        currentTerm = 'Fall'
      }
      quarterIndex++
    }

    // Validate generated schedule
    const validation = validatePlannedSchedule(
      quarters,
      profile.courseHistory,
      catalogCourses,
      equivalencies
    )

    const totalUnits = quarters.reduce(
      (sum, q) => sum + q.courses.reduce((cSum, c) => cSum + (c.units ?? 4), 0),
      0
    )
    const activeQuarters = quarters.filter((q) => q.courses.length > 0)
    const lastActive = activeQuarters[activeQuarters.length - 1]
    const gradTerm = lastActive ? `${lastActive.term} ${lastActive.year}` : 'Spring 2028'

    let name = 'Balanced Standard Pace'
    let description = 'Standard 3-quarter pace (14–16 units/term), preserving summer breaks for internships or research.'
    if (strategy === 'ACCELERATED') {
      name = 'Accelerated Fast Track'
      description = allowSummer
        ? 'High unit density (16–18 units/term) with summer sessions, enabling graduation 1–2 terms early.'
        : 'Maximum full-time course load (16–18 units/term) to complete degree requirements as early as possible.'
    } else if (strategy === 'LIGHT') {
      name = 'Light Balanced Workload'
      description = 'Manageable course load (12–14 units/term) designed for part-time work, athletics, or reduced stress.'
    }

    return {
      id: `plan-${strategy.toLowerCase()}`,
      name,
      strategy,
      description,
      quarters,
      totalUnits,
      totalQuarters: activeQuarters.length,
      graduationTerm: gradTerm,
      averageUnitsPerQuarter: activeQuarters.length > 0 ? Math.round(totalUnits / activeQuarters.length) : 0,
      isValid: validation.isValid,
      warningMessages: validation.issues.map((i) => i.message)
    }
  }

  // Generate the 3 distinct plans
  const balancedPlan = buildPlan('BALANCED', Math.min(16, preferences.maxUnitsPerQuarter), false)
  const acceleratedPlan = buildPlan(
    'ACCELERATED',
    Math.max(16, preferences.maxUnitsPerQuarter),
    preferences.includeSummer
  )
  const lightPlan = buildPlan('LIGHT', Math.min(14, preferences.minUnitsPerQuarter + 2), false)

  return {
    plans: [balancedPlan, acceleratedPlan, lightPlan],
    unfulfillableCourses: []
  }
}

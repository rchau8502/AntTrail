import {
  Course,
  CourseEquivalency,
  EligibilityResult,
  EligibilityStatus,
  PrerequisiteEvaluationTree,
  StudentProfile
} from './types'
import {
  evaluatePrerequisiteNode,
  normalizeCourseCode
} from './prerequisites'

function collectTreeDetails(tree: PrerequisiteEvaluationTree): {
  satisfied: string[]
  missing: string[]
  transferEquivalents: Array<{
    uciCourse: string
    transferCourse: string
    institution: string
  }>
} {
  const satisfied: string[] = []
  const missing: string[] = []
  const transferEquivalents: Array<{
    uciCourse: string
    transferCourse: string
    institution: string
  }> = []

  function walk(node: PrerequisiteEvaluationTree) {
    if (node.satisfiedBy?.isTransferEquivalent) {
      transferEquivalents.push({
        uciCourse: (node.node as any).courseId ?? 'Course',
        transferCourse: node.satisfiedBy.courseCode,
        institution: node.satisfiedBy.institution
      })
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach(walk)
    } else {
      if (node.satisfied) {
        satisfied.push(node.label)
      } else {
        missing.push(node.explanation ?? node.label)
      }
    }
  }

  walk(tree)
  return { satisfied, missing, transferEquivalents }
}

/**
 * Evaluates course eligibility for a given student profile.
 * Deterministic and transparent without approximations.
 */
export function evaluateCourseEligibility(
  course: Course,
  profile: StudentProfile,
  equivalencies: CourseEquivalency[] = []
): EligibilityResult {
  const warnings: string[] = []
  const courseCodeNorm = normalizeCourseCode(course.code)

  // 1. Check if student already completed this course
  const alreadyTaken = profile.courseHistory.find((rec) => {
    return normalizeCourseCode(rec.courseCode) === courseCodeNorm && rec.status === 'COMPLETED'
  })

  // 2. Evaluate prerequisite expression
  if (!course.prerequisiteExpression) {
    return {
      course,
      status: 'ELIGIBLE',
      isEligible: true,
      summary: alreadyTaken
        ? `Already completed with grade ${alreadyTaken.grade} (${course.code})`
        : 'No prerequisite restrictions. Eligible for enrollment.',
      missingItems: [],
      satisfiedItems: ['No prerequisites required'],
      transferEquivalentsUsed: [],
      warnings
    }
  }

  const evalTree = evaluatePrerequisiteNode(course.prerequisiteExpression, profile, equivalencies)
  const { satisfied, missing, transferEquivalents } = collectTreeDetails(evalTree)

  // Determine overall status
  let status: EligibilityStatus = 'ELIGIBLE'
  let summary = 'Prerequisites satisfied'

  if (alreadyTaken) {
    summary = `Already completed with grade ${alreadyTaken.grade}`
  }

  if (!evalTree.satisfied) {
    status = 'MISSING_PREREQUISITES'
    summary = `Missing required prerequisites: ${missing.slice(0, 2).join('; ')}`
  } else if (transferEquivalents.length > 0) {
    status = 'TRANSFER_EQUIVALENCY_USED'
    const transferSummary = transferEquivalents
      .map((t) => `${t.institution} ${t.transferCourse} → ${t.uciCourse}`)
      .join(', ')
    summary = `Eligible (using transfer credit: ${transferSummary})`
    warnings.push(
      'Transfer articulation confirmed. Ensure official transcripts have been articulated by the UCI Registrar.'
    )
  }

  // Check custom/review requirements
  if (course.prerequisiteExpression.type === 'custom' && !course.prerequisiteExpression.satisfiedByDefault) {
    status = 'REQUIRES_REVIEW'
    summary = `Requires departmental review or placement exam: ${course.prerequisiteExpression.description}`
  }

  return {
    course,
    status,
    isEligible: evalTree.satisfied,
    summary,
    tree: evalTree,
    missingItems: missing,
    satisfiedItems: satisfied,
    transferEquivalentsUsed: transferEquivalents,
    warnings
  }
}

/**
 * Evaluates an entire catalog of courses against a student profile.
 */
export function evaluateCatalogEligibility(
  courses: Course[],
  profile: StudentProfile,
  equivalencies: CourseEquivalency[] = []
): EligibilityResult[] {
  return courses.map((course) => evaluateCourseEligibility(course, profile, equivalencies))
}

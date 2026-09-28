import {
  GradeLetter,
  GRADE_POINTS,
  ClassStanding,
  PrerequisiteNode,
  PrerequisiteEvaluationTree,
  StudentProfile,
  CourseEquivalency
} from './types'

const STANDING_RANK: Record<ClassStanding, number> = {
  Freshman: 1,
  Sophomore: 2,
  Junior: 3,
  Senior: 4
}

/**
 * Returns true if studentGrade meets or exceeds requiredGrade.
 * At UCI, a 'P' grade represents 'C' or higher work.
 */
export function isGradeSufficient(
  studentGrade: GradeLetter,
  requiredGrade: GradeLetter = 'C'
): boolean {
  if (studentGrade === 'IP') return false
  if (studentGrade === 'NP' || studentGrade === 'F' || studentGrade === 'U') return false

  // Handle Pass/No-Pass
  if (studentGrade === 'P' || studentGrade === 'S') {
    const requiredPoints = GRADE_POINTS[requiredGrade] ?? 2.0
    // UCI Pass (P) is strictly equivalent to 2.0 (C) or higher
    return requiredPoints <= 2.0
  }

  const studentPts = GRADE_POINTS[studentGrade]
  const requiredPts = GRADE_POINTS[requiredGrade]

  if (studentPts === null || requiredPts === null) return false
  return studentPts >= requiredPts
}

/**
 * Checks if a class standing meets a minimum required class standing.
 */
export function isStandingSufficient(
  studentStanding: ClassStanding,
  requiredStanding: ClassStanding
): boolean {
  return STANDING_RANK[studentStanding] >= STANDING_RANK[requiredStanding]
}

/**
 * Normalizes course codes for robust comparison (e.g. "math  2a" -> "MATH 2A")
 */
export function normalizeCourseCode(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, ' ')
}

/**
 * Converts a prerequisite AST node into a human-readable text representation.
 */
export function formatPrerequisiteExpression(node?: PrerequisiteNode): string {
  if (!node) return 'None'

  switch (node.type) {
    case 'course': {
      let text = node.courseId
      if (node.minGrade && node.minGrade !== 'C') {
        text += ` (with a grade of ${node.minGrade} or better)`
      }
      if (node.allowConcurrent) {
        text += ' (or concurrent enrollment)'
      }
      return text
    }
    case 'and': {
      if (node.children.length === 0) return 'None'
      const formattedChildren = node.children.map((child) => {
        const text = formatPrerequisiteExpression(child)
        return child.type === 'or' ? `(${text})` : text
      })
      return formattedChildren.join(' AND ')
    }
    case 'or': {
      if (node.children.length === 0) return 'None'
      const formattedChildren = node.children.map((child) => {
        const text = formatPrerequisiteExpression(child)
        return child.type === 'and' ? `(${text})` : text
      })
      return formattedChildren.join(' OR ')
    }
    case 'units':
      return `${node.minUnits} completed units${node.department ? ` in ${node.department}` : ''}`
    case 'class_standing':
      return `${node.minStanding} standing or higher`
    case 'major':
      return node.allowedMajors?.length
        ? `Major in ${node.allowedMajors.join(' or ')}`
        : 'Major restriction'
    case 'custom':
      return node.description
    default:
      return 'Special approval required'
  }
}

/**
 * Evaluates a prerequisite tree against a student's course history and profile,
 * factoring in official course equivalencies.
 */
export function evaluatePrerequisiteNode(
  node: PrerequisiteNode,
  profile: StudentProfile,
  equivalencies: CourseEquivalency[] = []
): PrerequisiteEvaluationTree {
  switch (node.type) {
    case 'course': {
      const targetCode = normalizeCourseCode(node.courseId)
      const minGrade = node.minGrade ?? 'C'

      // 1. Check direct UCI course history
      const directMatch = profile.courseHistory.find((rec) => {
        const matchesCode = normalizeCourseCode(rec.courseCode) === targetCode
        const isFinished = rec.status === 'COMPLETED' || (node.allowConcurrent && rec.status === 'IN_PROGRESS')
        return matchesCode && isFinished && isGradeSufficient(rec.grade, minGrade)
      })

      if (directMatch) {
        return {
          node,
          satisfied: true,
          label: `${node.courseId} satisfied directly`,
          explanation: `Completed with grade ${directMatch.grade} at ${directMatch.institution}`,
          satisfiedBy: {
            courseCode: directMatch.courseCode,
            institution: directMatch.institution,
            grade: directMatch.grade
          }
        }
      }

      // 2. Check transfer articulation equivalencies
      const matchingEquivalencies = equivalencies.filter(
        (eq) => normalizeCourseCode(eq.targetUciCourseId) === targetCode
      )

      for (const eq of matchingEquivalencies) {
        const sourceCode = normalizeCourseCode(eq.sourceCourseCode)
        const transferMatch = profile.courseHistory.find((rec) => {
          const matchesTransfer =
            normalizeCourseCode(rec.courseCode) === sourceCode &&
            (!eq.sourceInstitution || rec.institution.toLowerCase().includes(eq.sourceInstitution.toLowerCase()) || eq.sourceInstitution.toLowerCase().includes(rec.institution.toLowerCase()))
          const isFinished = rec.status === 'COMPLETED'
          const gradePasses = isGradeSufficient(rec.grade, eq.minGradeRequired ?? minGrade)
          return matchesTransfer && isFinished && gradePasses
        })

        if (transferMatch) {
          return {
            node,
            satisfied: true,
            label: `${node.courseId} satisfied via transfer equivalency`,
            explanation: `Satisfied by ${eq.sourceInstitution} ${eq.sourceCourseCode} (${transferMatch.grade})`,
            satisfiedBy: {
              courseCode: transferMatch.courseCode,
              institution: transferMatch.institution,
              grade: transferMatch.grade,
              isTransferEquivalent: true,
              transferSource: `${eq.sourceInstitution} ${eq.sourceCourseCode}`
            }
          }
        }
      }

      return {
        node,
        satisfied: false,
        label: `Missing ${node.courseId}`,
        explanation: `Requires ${node.courseId} with grade ${minGrade} or better${node.allowConcurrent ? ' (or concurrent enrollment)' : ''}`
      }
    }

    case 'and': {
      const childResults = node.children.map((child) =>
        evaluatePrerequisiteNode(child, profile, equivalencies)
      )
      const allSatisfied = childResults.every((c) => c.satisfied)
      const unsatisfiedItems = childResults
        .filter((c) => !c.satisfied)
        .map((c) => c.label)

      return {
        node,
        satisfied: allSatisfied,
        label: allSatisfied
          ? 'All prerequisite conditions met'
          : `Missing: ${unsatisfiedItems.join(', ')}`,
        explanation: allSatisfied
          ? 'All required components are satisfied'
          : `Incomplete prerequisites (${unsatisfiedItems.length} missing)`,
        children: childResults
      }
    }

    case 'or': {
      const childResults = node.children.map((child) =>
        evaluatePrerequisiteNode(child, profile, equivalencies)
      )
      const anySatisfied = childResults.some((c) => c.satisfied)
      const satisfiedChild = childResults.find((c) => c.satisfied)

      return {
        node,
        satisfied: anySatisfied,
        label: anySatisfied
          ? `Satisfied option: ${satisfiedChild?.label ?? 'One condition met'}`
          : `Requires one of: ${node.children.map(formatPrerequisiteExpression).join(' OR ')}`,
        explanation: anySatisfied
          ? `Satisfied via ${satisfiedChild?.label}`
          : 'None of the alternative prerequisite options have been met',
        satisfiedBy: satisfiedChild?.satisfiedBy,
        children: childResults
      }
    }

    case 'units': {
      const satisfied = profile.completedUnits >= node.minUnits
      return {
        node,
        satisfied,
        label: `${node.minUnits} units required`,
        explanation: satisfied
          ? `Completed ${profile.completedUnits} units (minimum required: ${node.minUnits})`
          : `Only ${profile.completedUnits} units completed; requires ${node.minUnits} units`
      }
    }

    case 'class_standing': {
      const satisfied = isStandingSufficient(profile.classStanding, node.minStanding)
      return {
        node,
        satisfied,
        label: `${node.minStanding} standing required`,
        explanation: satisfied
          ? `Student is currently ${profile.classStanding}`
          : `Current standing (${profile.classStanding}) does not meet ${node.minStanding} requirement`
      }
    }

    case 'major': {
      const isAllowed = node.allowedMajors
        ? node.allowedMajors.some((m) =>
            profile.major.toLowerCase().includes(m.toLowerCase())
          )
        : true
      const isExcluded = node.excludedMajors
        ? node.excludedMajors.some((m) =>
            profile.major.toLowerCase().includes(m.toLowerCase())
          )
        : false
      const satisfied = isAllowed && !isExcluded

      return {
        node,
        satisfied,
        label: satisfied ? 'Major restriction satisfied' : 'Restricted by major',
        explanation: satisfied
          ? `Major ${profile.major} is eligible`
          : `Major ${profile.major} is not among authorized programs`
      }
    }

    case 'custom': {
      const satisfied = Boolean(node.satisfiedByDefault)
      return {
        node,
        satisfied,
        label: node.description,
        explanation: satisfied
          ? 'Special prerequisite condition cleared'
          : `Requires administrative review or test score: ${node.description}`
      }
    }
  }
}

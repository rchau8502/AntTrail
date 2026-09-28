import { describe, it, expect } from 'vitest'
import {
  evaluatePrerequisiteNode,
  formatPrerequisiteExpression,
  isGradeSufficient,
  isStandingSufficient
} from '../src/academic-engine/prerequisites'
import { evaluateCourseEligibility } from '../src/academic-engine/eligibility'
import { UCI_CS_MATH_COURSES } from '../src/data/uci/courses'
import { OFFICIAL_TRANSFER_EQUIVALENCIES } from '../src/data/uci/equivalencies'
import { StudentProfile } from '../src/academic-engine/types'

describe('Grade and Standing checks', () => {
  it('correctly compares letter grades against minimum grade C', () => {
    expect(isGradeSufficient('A', 'C')).toBe(true)
    expect(isGradeSufficient('B+', 'C')).toBe(true)
    expect(isGradeSufficient('C', 'C')).toBe(true)
    expect(isGradeSufficient('C-', 'C')).toBe(false)
    expect(isGradeSufficient('D+', 'C')).toBe(false)
    expect(isGradeSufficient('F', 'C')).toBe(false)
  })

  it('correctly handles Pass (P) grades per UCI policy', () => {
    expect(isGradeSufficient('P', 'C')).toBe(true)
    expect(isGradeSufficient('P', 'C-')).toBe(true)
    expect(isGradeSufficient('P', 'B')).toBe(false) // P is only equivalent to C (2.0)
    expect(isGradeSufficient('NP', 'C')).toBe(false)
  })

  it('correctly evaluates class standing requirements', () => {
    expect(isStandingSufficient('Junior', 'Sophomore')).toBe(true)
    expect(isStandingSufficient('Sophomore', 'Junior')).toBe(false)
    expect(isStandingSufficient('Senior', 'Freshman')).toBe(true)
  })
})

describe('Boolean Prerequisite Expression Logic', () => {
  const baseProfile: StudentProfile = {
    major: 'Computer Science B.S.',
    catalogYear: '2026-27',
    classStanding: 'Sophomore',
    completedUnits: 45,
    courseHistory: []
  }

  it('evaluates AND node: requires all conditions to be satisfied', () => {
    const andNode = {
      type: 'and' as const,
      children: [
        { type: 'course' as const, courseId: 'MATH 2A', minGrade: 'C' as const },
        { type: 'course' as const, courseId: 'MATH 2B', minGrade: 'C' as const }
      ]
    }

    // Only MATH 2A completed
    const partialProfile: StudentProfile = {
      ...baseProfile,
      courseHistory: [
        { id: '1', courseCode: 'MATH 2A', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'A', status: 'COMPLETED' }
      ]
    }
    const result1 = evaluatePrerequisiteNode(andNode, partialProfile)
    expect(result1.satisfied).toBe(false)
    expect(result1.label).toContain('Missing')

    // Both completed
    const fullProfile: StudentProfile = {
      ...baseProfile,
      courseHistory: [
        { id: '1', courseCode: 'MATH 2A', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: '2', courseCode: 'MATH 2B', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'B', status: 'COMPLETED' }
      ]
    }
    const result2 = evaluatePrerequisiteNode(andNode, fullProfile)
    expect(result2.satisfied).toBe(true)
  })

  it('evaluates OR node: requires at least one condition to be satisfied', () => {
    const orNode = {
      type: 'or' as const,
      children: [
        { type: 'course' as const, courseId: 'MATH 2B', minGrade: 'C' as const },
        { type: 'course' as const, courseId: 'STATS 67', minGrade: 'C' as const }
      ]
    }

    // Neither completed
    const resultNone = evaluatePrerequisiteNode(orNode, baseProfile)
    expect(resultNone.satisfied).toBe(false)

    // Only STATS 67 completed
    const statsProfile: StudentProfile = {
      ...baseProfile,
      courseHistory: [
        { id: '1', courseCode: 'STATS 67', institution: 'UCI', term: 'Spring 2026', units: 4, grade: 'B+', status: 'COMPLETED' }
      ]
    }
    const resultStats = evaluatePrerequisiteNode(orNode, statsProfile)
    expect(resultStats.satisfied).toBe(true)
    expect(resultStats.satisfiedBy?.courseCode).toBe('STATS 67')
  })

  it('evaluates nested AND (B OR C) logic (e.g. ICS 46)', () => {
    const ics46 = UCI_CS_MATH_COURSES.find((c) => c.code === 'ICS 46')!
    expect(ics46).toBeDefined()

    // Case 1: Student has ICS 45C only (missing math/stats branch)
    const profileMissingMath: StudentProfile = {
      ...baseProfile,
      courseHistory: [
        { id: '1', courseCode: 'ICS 45C', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'A', status: 'COMPLETED' }
      ]
    }
    const res1 = evaluateCourseEligibility(ics46, profileMissingMath)
    expect(res1.isEligible).toBe(false)
    expect(res1.status).toBe('MISSING_PREREQUISITES')

    // Case 2: Student has ICS 45C and MATH 2B
    const profileWithMath2B: StudentProfile = {
      ...baseProfile,
      courseHistory: [
        { id: '1', courseCode: 'ICS 45C', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: '2', courseCode: 'MATH 2B', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'B', status: 'COMPLETED' }
      ]
    }
    const res2 = evaluateCourseEligibility(ics46, profileWithMath2B)
    expect(res2.isEligible).toBe(true)
    expect(res2.status).toBe('ELIGIBLE')

    // Case 3: Student has ICS 45C and STATS 67 instead of MATH 2B
    const profileWithStats: StudentProfile = {
      ...baseProfile,
      courseHistory: [
        { id: '1', courseCode: 'ICS 45C', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: '2', courseCode: 'STATS 67', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'C+', status: 'COMPLETED' }
      ]
    }
    const res3 = evaluateCourseEligibility(ics46, profileWithStats)
    expect(res3.isEligible).toBe(true)
  })

  it('evaluates Real Analysis MATH 140A (requires MATH 13 AND MATH 3A AND MATH 2D)', () => {
    const math140A = UCI_CS_MATH_COURSES.find((c) => c.code === 'MATH 140A')!
    expect(math140A).toBeDefined()

    // Missing MATH 13
    const profileMissing13: StudentProfile = {
      ...baseProfile,
      courseHistory: [
        { id: '1', courseCode: 'MATH 2D', institution: 'UCI', term: 'Spring 2025', units: 4, grade: 'A', status: 'COMPLETED' },
        { id: '2', courseCode: 'MATH 3A', institution: 'UCI', term: 'Fall 2025', units: 4, grade: 'A', status: 'COMPLETED' }
      ]
    }
    const res1 = evaluateCourseEligibility(math140A, profileMissing13)
    expect(res1.isEligible).toBe(false)
    expect(res1.missingItems.some((item) => item.includes('MATH 13'))).toBe(true)

    // Complete all 3
    const fullMathProfile: StudentProfile = {
      ...profileMissing13,
      courseHistory: [
        ...profileMissing13.courseHistory,
        { id: '3', courseCode: 'MATH 13', institution: 'UCI', term: 'Winter 2026', units: 4, grade: 'A', status: 'COMPLETED' }
      ]
    }
    const res2 = evaluateCourseEligibility(math140A, fullMathProfile)
    expect(res2.isEligible).toBe(true)
    expect(res2.status).toBe('ELIGIBLE')
  })
})

describe('Transfer Articulation & Equivalencies', () => {
  const transferProfile: StudentProfile = {
    major: 'Computer Science B.S.',
    catalogYear: '2026-27',
    classStanding: 'Junior',
    completedUnits: 60,
    courseHistory: [
      {
        id: 't1',
        courseCode: 'MATH 260',
        institution: 'Mt. San Antonio College',
        term: 'Fall 2024',
        units: 4,
        grade: 'A',
        status: 'COMPLETED'
      },
      {
        id: 't2',
        courseCode: 'MATH 181',
        institution: 'Mt. San Antonio College',
        term: 'Spring 2025',
        units: 4,
        grade: 'B+',
        status: 'COMPLETED'
      }
    ]
  }

  it('recognizes Mt. SAC MATH 260 as satisfying UCI MATH 3A', () => {
    const math3A = UCI_CS_MATH_COURSES.find((c) => c.code === 'MATH 3A')!
    const res = evaluateCourseEligibility(math3A, transferProfile, OFFICIAL_TRANSFER_EQUIVALENCIES)

    // Note: MATH 3A requires MATH 2B (satisfied by Mt. SAC MATH 181)
    expect(res.isEligible).toBe(true)
    expect(res.status).toBe('TRANSFER_EQUIVALENCY_USED')
    expect(res.transferEquivalentsUsed.some((t) => t.transferCourse === 'MATH 181')).toBe(true)
  })

  it('recognizes Mt. SAC CSCI 220 as satisfying UCI ICS 45C for ICS 46', () => {
    const ics46 = UCI_CS_MATH_COURSES.find((c) => c.code === 'ICS 46')!
    const studentWithTransferCS: StudentProfile = {
      ...transferProfile,
      courseHistory: [
        ...transferProfile.courseHistory,
        {
          id: 't3',
          courseCode: 'CSCI 220',
          institution: 'Mt. San Antonio College',
          term: 'Spring 2025',
          units: 3.5,
          grade: 'A',
          status: 'COMPLETED'
        }
      ]
    }

    const res = evaluateCourseEligibility(ics46, studentWithTransferCS, OFFICIAL_TRANSFER_EQUIVALENCIES)
    expect(res.isEligible).toBe(true)
    expect(res.status).toBe('TRANSFER_EQUIVALENCY_USED')
    expect(res.transferEquivalentsUsed.some((t) => t.transferCourse === 'CSCI 220')).toBe(true)
  })
})

describe('Human-readable expression formatter', () => {
  it('formats complex nested expressions clearly', () => {
    const ics46 = UCI_CS_MATH_COURSES.find((c) => c.code === 'ICS 46')!
    const formatted = formatPrerequisiteExpression(ics46.prerequisiteExpression)
    expect(formatted).toBe('ICS 45C AND (MATH 2B OR STATS 67)')
  })
})

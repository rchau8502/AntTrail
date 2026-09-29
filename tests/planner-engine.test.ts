import { describe, it, expect } from 'vitest'
import { validateQuarterPlan, getQuarterUnitSummary } from '../src/academic-engine/planner'
import { STUDENT_PERSONAS } from '../src/data/mock/mockStudentData'
import { UCI_CS_MATH_COURSES } from '../src/data/uci/courses'
import { OFFICIAL_TRANSFER_EQUIVALENCIES } from '../src/data/uci/equivalencies'
import { PlannedQuarter } from '../src/academic-engine/types'

describe('Quarter Sequence Validator Engine', () => {
  const freshman = STUDENT_PERSONAS.find((p) => p.id === 'freshman')!
  const soph = STUDENT_PERSONAS.find((p) => p.id === 'sophomore_cs')!

  it('validates a correct prerequisite progression without errors', () => {
    const validPlan: PlannedQuarter[] = [
      {
        id: 'fall-2026',
        term: 'Fall',
        year: 2026,
        courses: [
          { courseCode: 'ICS 31', units: 4 },
          { courseCode: 'MATH 2A', units: 4 }
        ]
      },
      {
        id: 'winter-2027',
        term: 'Winter',
        year: 2027,
        courses: [
          { courseCode: 'ICS 32', units: 4 },
          { courseCode: 'MATH 2B', units: 4 }
        ]
      },
      {
        id: 'spring-2027',
        term: 'Spring',
        year: 2027,
        courses: [
          { courseCode: 'ICS 33', units: 4 },
          { courseCode: 'MATH 2D', units: 4 }
        ]
      }
    ]

    const result = validateQuarterPlan(validPlan, freshman.profile, UCI_CS_MATH_COURSES, OFFICIAL_TRANSFER_EQUIVALENCIES)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('detects backward scheduling when prerequisite is placed in a later quarter', () => {
    const invalidPlan: PlannedQuarter[] = [
      {
        id: 'fall-2026',
        term: 'Fall',
        year: 2026,
        courses: [
          { courseCode: 'ICS 33', units: 4 } // Requires ICS 32!
        ]
      },
      {
        id: 'winter-2027',
        term: 'Winter',
        year: 2027,
        courses: [
          { courseCode: 'ICS 32', units: 4 }
        ]
      }
    ]

    const result = validateQuarterPlan(invalidPlan, freshman.profile, UCI_CS_MATH_COURSES, OFFICIAL_TRANSFER_EQUIVALENCIES)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)

    const error = result.errors.find((e) => e.courseCode === 'ICS 33')!
    expect(error).toBeDefined()
    expect(error.reason).toBe('SCHEDULED_LATER')
    expect(error.missingPrerequisite).toContain('ICS 32')
    expect(error.prerequisiteQuarterLabel).toBe('Winter 2027')
  })

  it('detects when prerequisites are completely unscheduled and uncompleted', () => {
    const unfulfilledPlan: PlannedQuarter[] = [
      {
        id: 'fall-2026',
        term: 'Fall',
        year: 2026,
        courses: [
          { courseCode: 'MATH 140A', units: 4 } // Needs MATH 13, 3A, 2D
        ]
      }
    ]

    const result = validateQuarterPlan(unfulfilledPlan, freshman.profile, UCI_CS_MATH_COURSES, OFFICIAL_TRANSFER_EQUIVALENCIES)
    expect(result.isValid).toBe(false)

    const error = result.errors.find((e) => e.courseCode === 'MATH 140A')!
    expect(error).toBeDefined()
    expect(error.reason).toBe('NOT_SCHEDULED')
  })

  it('recognizes transcript history: sophomore can plan ICS 45C because ICS 33 is already completed', () => {
    const sophPlan: PlannedQuarter[] = [
      {
        id: 'fall-2026',
        term: 'Fall',
        year: 2026,
        courses: [
          { courseCode: 'ICS 45C', units: 4 }
        ]
      }
    ]

    const result = validateQuarterPlan(sophPlan, soph.profile, UCI_CS_MATH_COURSES, OFFICIAL_TRANSFER_EQUIVALENCIES)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('correctly calculates quarter unit summaries with overload and underload warnings', () => {
    const testQuarters: PlannedQuarter[] = [
      {
        id: 'fall-2026',
        term: 'Fall',
        year: 2026,
        courses: [
          { courseCode: 'ICS 31', units: 4 },
          { courseCode: 'MATH 2A', units: 4 },
          { courseCode: 'WRITING 39B', units: 4 },
          { courseCode: 'GEN ED', units: 4 }
        ] // 16 units -> normal
      },
      {
        id: 'winter-2027',
        term: 'Winter',
        year: 2027,
        courses: [
          { courseCode: 'ICS 32', units: 4 }
        ] // 4 units -> underload (<12)
      },
      {
        id: 'spring-2027',
        term: 'Spring',
        year: 2027,
        courses: [
          { courseCode: 'ICS 33', units: 4 },
          { courseCode: 'MATH 2B', units: 4 },
          { courseCode: 'STATS 67', units: 4 },
          { courseCode: 'COURSE A', units: 4 },
          { courseCode: 'COURSE B', units: 4 },
          { courseCode: 'COURSE C', units: 4 }
        ] // 24 units -> overload (>20)
      }
    ]

    const summary = getQuarterUnitSummary(testQuarters)
    expect(summary[0].isUnderload).toBe(false)
    expect(summary[0].isOverload).toBe(false)

    expect(summary[1].isUnderload).toBe(true)
    expect(summary[1].totalUnits).toBe(4)

    expect(summary[2].isOverload).toBe(true)
    expect(summary[2].totalUnits).toBe(24)
  })
})

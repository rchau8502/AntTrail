import { describe, it, expect } from 'vitest'
import { generateAutoPlans } from '../src/academic-engine/autoplan'
import { getDegreeProgramById } from '../src/data/uci/programs'
import { STUDENT_PERSONAS } from '../src/data/mock/mockStudentData'
import { UCI_CS_MATH_COURSES } from '../src/data/uci/courses'
import { OFFICIAL_TRANSFER_EQUIVALENCIES } from '../src/data/uci/equivalencies'
import { validatePlannedSchedule } from '../src/academic-engine/planner'
import { normalizeCourseCode } from '../src/academic-engine/prerequisites'

describe('Auto Plan Constraint Engine', () => {
  const csProgram = getDegreeProgramById('CS_BS_2026')!
  const mathProgram = getDegreeProgramById('MATH_BS_2026')!
  const freshman = STUDENT_PERSONAS.find((p) => p.id === 'freshman')!
  const transfer = STUDENT_PERSONAS.find((p) => p.id === 'transfer_mtsac')!
  const mathJunior = STUDENT_PERSONAS.find((p) => p.id === 'math_junior')!

  it('generates 3 valid, distinct plans for an incoming CS freshman', () => {
    const result = generateAutoPlans(
      csProgram,
      freshman.profile,
      {
        maxUnitsPerQuarter: 16,
        minUnitsPerQuarter: 12,
        includeSummer: false
      },
      UCI_CS_MATH_COURSES,
      OFFICIAL_TRANSFER_EQUIVALENCIES
    )

    expect(result.plans).toHaveLength(3)

    const [balanced, accelerated, light] = result.plans
    expect(balanced.strategy).toBe('BALANCED')
    expect(accelerated.strategy).toBe('ACCELERATED')
    expect(light.strategy).toBe('LIGHT')

    // Every plan must pass validation with 0 prerequisite errors
    for (const plan of result.plans) {
      expect(plan.isValid).toBe(true)
      const report = validatePlannedSchedule(
        plan.quarters,
        freshman.profile.courseHistory,
        UCI_CS_MATH_COURSES,
        OFFICIAL_TRANSFER_EQUIVALENCIES
      )
      expect(report.hasErrors).toBe(false)
    }
  })

  it('maintains strict prerequisite chronological order for core CS sequences', () => {
    const result = generateAutoPlans(
      csProgram,
      freshman.profile,
      {
        maxUnitsPerQuarter: 16,
        minUnitsPerQuarter: 12,
        includeSummer: false
      },
      UCI_CS_MATH_COURSES,
      OFFICIAL_TRANSFER_EQUIVALENCIES
    )

    const balanced = result.plans.find((p) => p.strategy === 'BALANCED')!
    expect(balanced).toBeDefined()

    // Helper to find the quarter index of a scheduled course
    const findQuarterIndex = (courseCode: string): number => {
      const norm = normalizeCourseCode(courseCode)
      for (let i = 0; i < balanced.quarters.length; i++) {
        if (balanced.quarters[i].courses.some((c) => normalizeCourseCode(c.courseCode) === norm)) {
          return i
        }
      }
      return -1
    }

    const idx31 = findQuarterIndex('ICS 31')
    const idx32 = findQuarterIndex('ICS 32')
    const idx33 = findQuarterIndex('ICS 33')
    const idx45c = findQuarterIndex('ICS 45C')
    const idx46 = findQuarterIndex('ICS 46')
    const idx161 = findQuarterIndex('CS 161')

    // Prerequisite chain: 31 -> 32 -> 33 -> 45C -> 46 -> 161
    expect(idx31).toBeGreaterThanOrEqual(0)
    expect(idx32).toBeGreaterThan(idx31)
    expect(idx33).toBeGreaterThan(idx32)
    expect(idx45c).toBeGreaterThan(idx33)
    expect(idx46).toBeGreaterThan(idx45c)
    expect(idx161).toBeGreaterThan(idx46)
  })

  it('avoids rescheduling courses already completed via transfer articulation', () => {
    const result = generateAutoPlans(
      csProgram,
      transfer.profile,
      {
        maxUnitsPerQuarter: 16,
        minUnitsPerQuarter: 12,
        includeSummer: false
      },
      UCI_CS_MATH_COURSES,
      OFFICIAL_TRANSFER_EQUIVALENCIES
    )

    const plan = result.plans[0]
    const scheduledCodes = plan.quarters.flatMap((q) => q.courses.map((c) => normalizeCourseCode(c.courseCode)))

    // Transfer student already completed MATH 2A, 2B, 3A, and ICS 45C!
    expect(scheduledCodes).not.toContain('MATH 2A')
    expect(scheduledCodes).not.toContain('MATH 2B')
    expect(scheduledCodes).not.toContain('MATH 3A')
    expect(scheduledCodes).not.toContain('ICS 45C')

    // But should schedule ICS 46 and CS 161
    expect(scheduledCodes).toContain('ICS 46')
    expect(scheduledCodes).toContain('CS 161')
  })

  it('respects summer session preferences when includeSummer is toggled', () => {
    const withoutSummer = generateAutoPlans(
      csProgram,
      freshman.profile,
      {
        maxUnitsPerQuarter: 16,
        minUnitsPerQuarter: 12,
        includeSummer: false
      },
      UCI_CS_MATH_COURSES,
      OFFICIAL_TRANSFER_EQUIVALENCIES
    )

    // No summer terms in withoutSummer plan
    for (const plan of withoutSummer.plans) {
      expect(plan.quarters.some((q) => q.term === 'Summer')).toBe(false)
    }

    const withSummer = generateAutoPlans(
      csProgram,
      freshman.profile,
      {
        maxUnitsPerQuarter: 18,
        minUnitsPerQuarter: 12,
        includeSummer: true
      },
      UCI_CS_MATH_COURSES,
      OFFICIAL_TRANSFER_EQUIVALENCIES
    )

    // Accelerated plan with summer enabled should utilize summer term
    const accelerated = withSummer.plans.find((p) => p.strategy === 'ACCELERATED')!
    expect(accelerated.quarters.some((q) => q.term === 'Summer')).toBe(true)
  })

  it('plans realistic courses for Mathematics B.S. with proof and analysis sequences', () => {
    const result = generateAutoPlans(
      mathProgram,
      mathJunior.profile,
      {
        maxUnitsPerQuarter: 16,
        minUnitsPerQuarter: 12,
        includeSummer: false
      },
      UCI_CS_MATH_COURSES,
      OFFICIAL_TRANSFER_EQUIVALENCIES
    )

    const plan = result.plans[0]
    expect(plan.isValid).toBe(true)

    // Math Junior has MATH 13, ready for MATH 140A (Real Analysis) and MATH 105A (Numerical Analysis)
    const scheduledCodes = plan.quarters.flatMap((q) => q.courses.map((c) => normalizeCourseCode(c.courseCode)))
    expect(scheduledCodes).toContain('MATH 140A')
    expect(scheduledCodes).toContain('MATH 105A')
  })
})

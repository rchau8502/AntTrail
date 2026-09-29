import { describe, it, expect } from 'vitest'
import { evaluateDegreeAudit } from '../src/academic-engine/degree'
import { getDegreeProgramById } from '../src/data/uci/programs'
import { STUDENT_PERSONAS } from '../src/data/mock/mockStudentData'
import { OFFICIAL_TRANSFER_EQUIVALENCIES } from '../src/data/uci/equivalencies'
import { PlannedQuarter } from '../src/academic-engine/types'

describe('UCI Degree Requirement Engine', () => {
  const csProgram = getDegreeProgramById('CS_BS_2026')!
  const mathProgram = getDegreeProgramById('MATH_BS_2026')!

  it('correctly audits an incoming freshman with 0 completed units', () => {
    const freshman = STUDENT_PERSONAS.find((p) => p.id === 'freshman')!
    const audit = evaluateDegreeAudit(csProgram, freshman.profile, [], OFFICIAL_TRANSFER_EQUIVALENCIES)

    expect(audit.overallProgressPercent).toBe(0)
    expect(audit.totalUnitsEarned).toBe(0)

    const lowerDiv = audit.sections.find((s) => s.section.id === 'cs_lower_div')!
    expect(lowerDiv.isComplete).toBe(false)

    // Intro programming requirement
    const introProg = lowerDiv.requirements.find((r) => r.requirement.id === 'cs_intro_prog')!
    expect(introProg.isComplete).toBe(false)
    expect(introProg.missingCourses).toContain('ICS 31')
    expect(introProg.missingCourses).toContain('ICS 32')
    expect(introProg.missingCourses).toContain('ICS 33')

    // Should recommend ICS 31 and MATH 2A as eligibleToSatisfy (since freshman is eligible for them)
    expect(introProg.eligibleToSatisfy).toContain('ICS 31')
  })

  it('correctly recognizes completed coursework for Continuing CS Sophomore', () => {
    const soph = STUDENT_PERSONAS.find((p) => p.id === 'sophomore_cs')!
    const audit = evaluateDegreeAudit(csProgram, soph.profile, [], OFFICIAL_TRANSFER_EQUIVALENCIES)

    expect(audit.overallProgressPercent).toBe(22)

    const lowerDiv = audit.sections.find((s) => s.section.id === 'cs_lower_div')!
    // Intro programming (ICS 31, 32, 33) is 100% complete
    const introProg = lowerDiv.requirements.find((r) => r.requirement.id === 'cs_intro_prog')!
    expect(introProg.isComplete).toBe(true)
    expect(introProg.missingCourses).toHaveLength(0)
    expect(introProg.completedCourses).toEqual(expect.arrayContaining(['ICS 31', 'ICS 32', 'ICS 33']))

    // Statistics requirement is satisfied by STATS 67
    const statsReq = lowerDiv.requirements.find((r) => r.requirement.id === 'cs_stats')!
    expect(statsReq.isComplete).toBe(true)
    expect(statsReq.completedCourses).toContain('STATS 67')
  })

  it('credits articulated transfer courses toward degree requirements for Mt. SAC transfer', () => {
    const transfer = STUDENT_PERSONAS.find((p) => p.id === 'transfer_mtsac')!
    const audit = evaluateDegreeAudit(csProgram, transfer.profile, [], OFFICIAL_TRANSFER_EQUIVALENCIES)

    const lowerDiv = audit.sections.find((s) => s.section.id === 'cs_lower_div')!

    // Math foundations: MATH 2A (via Mt. SAC 180), 2B (via 181), 3A (via 260)
    const mathFoundations = lowerDiv.requirements.find((r) => r.requirement.id === 'cs_math_foundations')!
    expect(mathFoundations.isComplete).toBe(true)
    expect(mathFoundations.completedCourses).toEqual(expect.arrayContaining(['MATH 2A', 'MATH 2B', 'MATH 3A']))

    // C++ core: ICS 45C is satisfied by Mt. SAC CSCI 220
    const dataStructures = lowerDiv.requirements.find((r) => r.requirement.id === 'cs_data_structures')!
    expect(dataStructures.completedCourses).toContain('ICS 45C')
    expect(dataStructures.missingCourses).toContain('ICS 46')
  })

  it('updates degree progress when planned quarters are supplied', () => {
    const soph = STUDENT_PERSONAS.find((p) => p.id === 'sophomore_cs')!

    const plannedQuarters: PlannedQuarter[] = [
      {
        id: 'fall-2026',
        term: 'Fall',
        year: 2026,
        courses: [
          { courseCode: 'ICS 45C', units: 4 },
          { courseCode: 'MATH 3A', units: 4 }
        ]
      },
      {
        id: 'winter-2027',
        term: 'Winter',
        year: 2027,
        courses: [
          { courseCode: 'ICS 46', units: 4 },
          { courseCode: 'CS 161', units: 4 }
        ]
      }
    ]

    const audit = evaluateDegreeAudit(csProgram, soph.profile, plannedQuarters, OFFICIAL_TRANSFER_EQUIVALENCIES)

    // Planned progress should be higher than earned progress
    expect(audit.plannedProgressPercent).toBeGreaterThan(audit.overallProgressPercent)

    const lowerDiv = audit.sections.find((s) => s.section.id === 'cs_lower_div')!
    const dataStructures = lowerDiv.requirements.find((r) => r.requirement.id === 'cs_data_structures')!

    // Earned: incomplete. Planned: complete!
    expect(dataStructures.isComplete).toBe(false)
    expect(dataStructures.isPlannedComplete).toBe(true)
    expect(dataStructures.plannedCourses).toEqual(expect.arrayContaining(['ICS 45C', 'ICS 46']))
  })

  it('correctly evaluates Mathematics B.S. for math junior persona', () => {
    const mathJunior = STUDENT_PERSONAS.find((p) => p.id === 'math_junior')!
    const audit = evaluateDegreeAudit(mathProgram, mathJunior.profile, [], OFFICIAL_TRANSFER_EQUIVALENCIES)

    expect(audit.program.name).toBe('Mathematics B.S.')
    const lowerDiv = audit.sections.find((s) => s.section.id === 'math_lower_div')!
    // Calculus series (2A, 2B, 2D) should be complete
    const calc = lowerDiv.requirements.find((r) => r.requirement.id === 'math_calc_series')!
    expect(calc.isComplete).toBe(true)
    // Linear proofs (3A, 13) should be complete
    const proofs = lowerDiv.requirements.find((r) => r.requirement.id === 'math_linear_proofs')!
    expect(proofs.isComplete).toBe(true)
    // Real Analysis (140A) is unlocked and eligible to satisfy!
    const upperDiv = audit.sections.find((s) => s.section.id === 'math_upper_div')!
    const realAnalysis = upperDiv.requirements.find((r) => r.requirement.id === 'math_real_analysis')!
    expect(realAnalysis.eligibleToSatisfy).toContain('MATH 140A')
  })
})

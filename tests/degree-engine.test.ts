import { describe, it, expect } from 'vitest'
import { evaluateDegreeAudit } from '../src/academic-engine/degree'
import { getDegreeProgramById, getDegreeProgramByName, UCI_DEGREE_PROGRAMS } from '../src/data/uci/programs'
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

  it('correctly evaluates Software Engineering B.S. for SE junior persona', () => {
    const seProgram = getDegreeProgramById('SE_BS_2026')!
    expect(seProgram).toBeDefined()
    expect(seProgram.name).toBe('Software Engineering B.S.')

    const seJunior = STUDENT_PERSONAS.find((p) => p.id === 'se_junior')!
    expect(seJunior).toBeDefined()

    const audit = evaluateDegreeAudit(seProgram, seJunior.profile, [], OFFICIAL_TRANSFER_EQUIVALENCIES)
    expect(audit.program.id).toBe('SE_BS_2026')

    const lowerDiv = audit.sections.find((s) => s.section.id === 'se_lower_div')!
    expect(lowerDiv).toBeDefined()

    // Intro SE (IN4MATX 43) is complete
    const introSe = lowerDiv.requirements.find((r) => r.requirement.id === 'se_intro_se')!
    expect(introSe.isComplete).toBe(true)
    expect(introSe.completedCourses).toContain('IN4MATX 43')

    // Discrete Math (ICS 6B, 6D) is complete
    const discrete = lowerDiv.requirements.find((r) => r.requirement.id === 'se_discrete_math')!
    expect(discrete.isComplete).toBe(true)
    expect(discrete.completedCourses).toEqual(expect.arrayContaining(['ICS 6B', 'ICS 6D']))

    // Upper div core requires IN4MATX 113, 115, 121, 122
    const upperDiv = audit.sections.find((s) => s.section.id === 'se_upper_div')!
    const coreSwe = upperDiv.requirements.find((r) => r.requirement.id === 'se_core_swe')!
    expect(coreSwe.isComplete).toBe(false)
    expect(coreSwe.missingCourses).toEqual(
      expect.arrayContaining(['IN4MATX 113', 'IN4MATX 115', 'IN4MATX 121', 'IN4MATX 122'])
    )
  })

  it('correctly evaluates Data Science B.S. for DS sophomore persona', () => {
    const dsProgram = getDegreeProgramById('DS_BS_2026')!
    expect(dsProgram).toBeDefined()
    expect(dsProgram.name).toBe('Data Science B.S.')

    const dsSophomore = STUDENT_PERSONAS.find((p) => p.id === 'ds_sophomore')!
    expect(dsSophomore).toBeDefined()

    const audit = evaluateDegreeAudit(dsProgram, dsSophomore.profile, [], OFFICIAL_TRANSFER_EQUIVALENCIES)
    expect(audit.program.id).toBe('DS_BS_2026')

    const lowerDiv = audit.sections.find((s) => s.section.id === 'ds_lower_div')!
    expect(lowerDiv).toBeDefined()

    // Intro programming is complete
    const introProg = lowerDiv.requirements.find((r) => r.requirement.id === 'ds_intro_prog')!
    expect(introProg.isComplete).toBe(true)

    // Stats intro is complete
    const statsIntro = lowerDiv.requirements.find((r) => r.requirement.id === 'ds_stats_intro')!
    expect(statsIntro.isComplete).toBe(true)
    expect(statsIntro.completedCourses).toContain('STATS 67')

    // Upper div requires STATS 120 sequence
    const upperDiv = audit.sections.find((s) => s.section.id === 'ds_upper_div')!
    const probStats = upperDiv.requirements.find((r) => r.requirement.id === 'ds_prob_stats_seq')!
    expect(probStats.isComplete).toBe(false)
    expect(probStats.missingCourses).toEqual(
      expect.arrayContaining(['STATS 120A', 'STATS 120B', 'STATS 120C'])
    )
  })

  it('correctly verifies Computer Engineering B.S. requirement graph', () => {
    const cpeProgram = getDegreeProgramById('CPE_BS_2026')!
    expect(cpeProgram).toBeDefined()
    expect(cpeProgram.name).toBe('Computer Engineering B.S.')

    const freshman = STUDENT_PERSONAS.find((p) => p.id === 'freshman')!
    const audit = evaluateDegreeAudit(cpeProgram, freshman.profile, [], OFFICIAL_TRANSFER_EQUIVALENCIES)

    const lowerDiv = audit.sections.find((s) => s.section.id === 'cpe_lower_div')!
    expect(lowerDiv).toBeDefined()

    const digital = lowerDiv.requirements.find((r) => r.requirement.id === 'cpe_digital_logic')!
    expect(digital.isComplete).toBe(false)
    expect(digital.missingCourses).toEqual(expect.arrayContaining(['EECS 31', 'EECS 31L']))
  })

  it('covers all 13 undergraduate academic colleges and schools across UC Irvine', () => {
    expect(UCI_DEGREE_PROGRAMS.length).toBeGreaterThanOrEqual(50)
    const schools = new Set(UCI_DEGREE_PROGRAMS.map((p) => p.school))
    expect(schools.size).toBe(13)
    expect(schools).toContain('Donald Bren School of Information and Computer Sciences')
    expect(schools).toContain('The Henry Samueli School of Engineering')
    expect(schools).toContain('School of Physical Sciences')
    expect(schools).toContain('School of Biological Sciences')
    expect(schools).toContain('The Paul Merage School of Business')
    expect(schools).toContain('School of Social Sciences')
    expect(schools).toContain('School of Social Ecology')
    expect(schools).toContain('School of Humanities')
    expect(schools).toContain('School of Education')
    expect(schools).toContain('Sue & Bill Gross School of Nursing')
    expect(schools).toContain('School of Pharmacy and Pharmaceutical Sciences')
    expect(schools).toContain('Program in Public Health')
    expect(schools).toContain('Claire Trevor School of the Arts')
  })

  it('correctly audits expanded degree programs across non-ICS schools', () => {
    const freshman = STUDENT_PERSONAS.find((p) => p.id === 'freshman')!

    const testPrograms = [
      'Informatics B.S.',
      'Mechanical Engineering B.S.',
      'Physics B.S.',
      'Biological Sciences B.S.',
      'Business Administration B.A.',
      'Economics B.A.',
      'Criminology, Law and Society B.A.',
      'English B.A.',
      'Education Sciences B.A.',
      'Nursing Science B.S.',
      'Pharmaceutical Sciences B.S.',
      'Public Health Sciences B.S.',
      'Drama B.A.'
    ]

    for (const progName of testPrograms) {
      const prog = getDegreeProgramByName(progName)
      expect(prog, `Expected program ${progName} to exist`).toBeDefined()
      expect(prog!.name).toBe(progName)
      expect(prog!.totalUnitsRequired).toBe(180)
      expect(prog!.minUpperDivisionUnits).toBe(60)

      const audit = evaluateDegreeAudit(prog!, freshman.profile, [], OFFICIAL_TRANSFER_EQUIVALENCIES)
      expect(audit.program.id).toBe(prog!.id)
      expect(audit.overallProgressPercent).toBe(0)
      expect(audit.sections.length).toBeGreaterThanOrEqual(3)
      expect(audit.sections.every((s) => s.requirements.length > 0)).toBe(true)
    }
  })
})

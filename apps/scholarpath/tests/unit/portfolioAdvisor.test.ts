import { describe, expect, it } from 'vitest'
import {
  evaluateCampusAdmission,
  calculatePortfolioHealth,
  PRESET_PORTFOLIOS,
  APPLICATION_DEADLINES
} from '@/lib/portfolioAdvisor'

describe('portfolioAdvisor', () => {
  it('correctly evaluates transfer guarantees and selective reaches', () => {
    // UCI with eligible major and GPA 3.65 >= 3.4 TAG minimum
    const uciEval = evaluateCampusAdmission({
      campus: 'UC Irvine',
      studentGpa: 3.65,
      cohort: 'transfer',
      focus: 'Mathematics'
    })
    expect(uciEval.tier).toBe('guaranteed')
    expect(uciEval.tierLabel).toContain('Guaranteed')
    expect(uciEval.tagInfo?.eligible).toBe(true)

    // UCLA: No TAG, high selectivity
    const uclaEval = evaluateCampusAdmission({
      campus: 'UCLA',
      studentGpa: 3.85,
      cohort: 'transfer',
      focus: 'Mathematics'
    })
    expect(uclaEval.tier).toBe('reach')
    expect(uclaEval.tagInfo?.type).toBe('None')

    // Cal State Long Beach: ADT with 3.85 GPA (> 75th percentile 3.75)
    const csulbEval = evaluateCampusAdmission({
      campus: 'Cal State Long Beach',
      studentGpa: 3.85,
      cohort: 'transfer',
      focus: 'Mathematics'
    })
    expect(csulbEval.tier).toBe('safety')
    expect(csulbEval.tierLabel).toContain('Likely')
  })

  it('correctly evaluates freshman selectivity and standing', () => {
    // UC Berkeley: High selectivity reach
    const berkeleyEval = evaluateCampusAdmission({
      campus: 'UC Berkeley',
      studentGpa: 3.9,
      cohort: 'freshman',
      focus: 'Engineering'
    })
    expect(berkeleyEval.tier).toBe('reach')

    // UC Merced: High acceptance freshman safety with 3.8 GPA
    const mercedEval = evaluateCampusAdmission({
      campus: 'UC Merced',
      studentGpa: 3.8,
      cohort: 'freshman',
      focus: 'Engineering'
    })
    expect(mercedEval.tier).toBe('safety')

    // Cal Poly Pomona: Target with 3.5 GPA
    const cppEval = evaluateCampusAdmission({
      campus: 'Cal Poly Pomona',
      studentGpa: 3.5,
      cohort: 'freshman',
      focus: 'Engineering'
    })
    expect(cppEval.tier).toBe('target')
  })

  it('scores portfolio balance and flags top-heavy lists', () => {
    // 1. All reach portfolio
    const topHeavyEvals = [
      evaluateCampusAdmission({ campus: 'UC Berkeley', studentGpa: 3.7, cohort: 'transfer', focus: 'Computer Science' }),
      evaluateCampusAdmission({ campus: 'UCLA', studentGpa: 3.7, cohort: 'transfer', focus: 'Computer Science' }),
      evaluateCampusAdmission({ campus: 'Stanford University', studentGpa: 3.7, cohort: 'transfer', focus: 'Computer Science' })
    ]
    const topHeavyHealth = calculatePortfolioHealth(topHeavyEvals)
    expect(topHeavyHealth.status).toBe('top_heavy')
    expect(topHeavyHealth.balanceScore).toBeLessThan(50)
    expect(topHeavyHealth.recommendations.some((r) => r.includes('TAG') || r.includes('Likely'))).toBe(true)

    // 2. Balanced portfolio with TAG, Targets, and Reaches
    const balancedEvals = [
      evaluateCampusAdmission({ campus: 'UC Berkeley', studentGpa: 3.8, cohort: 'transfer', focus: 'Mathematics' }),
      evaluateCampusAdmission({ campus: 'UCLA', studentGpa: 3.8, cohort: 'transfer', focus: 'Mathematics' }),
      evaluateCampusAdmission({ campus: 'UC San Diego', studentGpa: 3.8, cohort: 'transfer', focus: 'Mathematics' }),
      evaluateCampusAdmission({ campus: 'UC Irvine', studentGpa: 3.8, cohort: 'transfer', focus: 'Mathematics' }), // TAG guaranteed
      evaluateCampusAdmission({ campus: 'UC Santa Barbara', studentGpa: 3.8, cohort: 'transfer', focus: 'Mathematics' })
    ]
    const balancedHealth = calculatePortfolioHealth(balancedEvals)
    expect(balancedHealth.status).toBe('balanced')
    expect(balancedHealth.balanceScore).toBeGreaterThanOrEqual(90)
    expect(balancedHealth.guaranteedCount).toBeGreaterThan(0)
  })

  it('provides comprehensive preset portfolios and California application deadlines', () => {
    expect(PRESET_PORTFOLIOS.length).toBeGreaterThanOrEqual(4)
    PRESET_PORTFOLIOS.forEach((preset) => {
      expect(preset.campuses.length).toBeGreaterThanOrEqual(4)
      expect(preset.title).toBeTruthy()
    })

    // Check deadlines
    const tagDeadline = APPLICATION_DEADLINES.find((d) => d.id === 'tag_submission')
    expect(tagDeadline).toBeDefined()
    expect(tagDeadline?.deadlineMonth).toBe(9)

    const ucAppDeadline = APPLICATION_DEADLINES.find((d) => d.id === 'uc_app_filing')
    expect(ucAppDeadline).toBeDefined()
    expect(ucAppDeadline?.deadlineMonth).toBe(11)

    const fafsaDeadline = APPLICATION_DEADLINES.find((d) => d.id === 'financial_aid_priority')
    expect(fafsaDeadline).toBeDefined()
    expect(fafsaDeadline?.deadlineMonth).toBe(3)
  })
})

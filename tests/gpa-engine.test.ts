import { describe, it, expect } from 'vitest'
import {
  calculateUciGpaReport,
  calculateTargetGpaRequirement,
  projectWhatIfTrajectory,
  isUciCoursework,
  getClosestLetterEquivalent
} from '../src/academic-engine/gpa'
import { StudentProfile, PlannedQuarter } from '../src/academic-engine/types'

describe('AntTrail Deterministic UCI GPA Engine', () => {
  describe('Basic Letter Grades & Grade Points', () => {
    it('calculates exact cumulative GPA for standard UCI coursework', () => {
      const profile: StudentProfile = {
        major: 'Computer Science B.S.',
        catalogYear: '2026-27',
        classStanding: 'Freshman',
        completedUnits: 12,
        courseHistory: [
          {
            id: '1',
            courseCode: 'ICS 31',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'A', // 4.0 * 4 = 16 pts
            status: 'COMPLETED'
          },
          {
            id: '2',
            courseCode: 'MATH 2A',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'B', // 3.0 * 4 = 12 pts
            status: 'COMPLETED'
          },
          {
            id: '3',
            courseCode: 'WRITING 39A',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'C+', // 2.3 * 4 = 9.2 pts
            status: 'COMPLETED'
          }
        ]
      }

      // Total pts = 16 + 12 + 9.2 = 37.2
      // Total units = 12
      // GPA = 37.2 / 12 = 3.10
      const report = calculateUciGpaReport(profile)
      expect(report.cumulativeGpa).toBe(3.1)
      expect(report.totalGradedUnits).toBe(12)
      expect(report.totalGradePoints).toBe(37.2)
      expect(report.academicStanding).toBe('GOOD_STANDING')
    })

    it('identifies Dean Honor List terms (GPA >= 3.5 with >= 12 graded units)', () => {
      const profile: StudentProfile = {
        major: 'Computer Science B.S.',
        catalogYear: '2026-27',
        classStanding: 'Freshman',
        completedUnits: 12,
        courseHistory: [
          {
            id: '1',
            courseCode: 'ICS 31',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'A',
            status: 'COMPLETED'
          },
          {
            id: '2',
            courseCode: 'MATH 2A',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'A-', // 3.7
            status: 'COMPLETED'
          },
          {
            id: '3',
            courseCode: 'I&C SCI 60',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'B+', // 3.3 -> Term GPA = (16 + 14.8 + 13.2)/12 = 44 / 12 = 3.67
            status: 'COMPLETED'
          }
        ]
      }

      const report = calculateUciGpaReport(profile)
      expect(report.deansListTerms).toContain('Fall 2025')
      expect(report.termSummaries[0].deansListEligible).toBe(true)
    })

    it('correctly maps GPA ranges to closest letter grades', () => {
      expect(getClosestLetterEquivalent(4.0)).toBe('A')
      expect(getClosestLetterEquivalent(3.6)).toBe('A-')
      expect(getClosestLetterEquivalent(3.3)).toBe('B+')
      expect(getClosestLetterEquivalent(3.0)).toBe('B')
      expect(getClosestLetterEquivalent(2.7)).toBe('B-')
      expect(getClosestLetterEquivalent(2.3)).toBe('C+')
      expect(getClosestLetterEquivalent(2.0)).toBe('C')
      expect(getClosestLetterEquivalent(0.2)).toBe('BELOW_D')
    })

    it('identifies UC coursework vs non-UC community college coursework', () => {
      expect(isUciCoursework('UCI')).toBe(true)
      expect(isUciCoursework('UC Irvine')).toBe(true)
      expect(isUciCoursework('University of California, Berkeley')).toBe(true)
      expect(isUciCoursework('Mt. San Antonio College')).toBe(false)
      expect(isUciCoursework('Irvine Valley College')).toBe(false)
    })
  })

  describe('Official UCI Policy Rules', () => {
    it('excludes transfer coursework from UC cumulative GPA per UCI Academic Senate regulations', () => {
      const profile: StudentProfile = {
        major: 'Computer Science B.S.',
        catalogYear: '2026-27',
        classStanding: 'Sophomore',
        completedUnits: 20,
        courseHistory: [
          // Transfer course from Mt. SAC (Straight A, but outside UC system)
          {
            id: 'transfer_1',
            courseCode: 'MATH 260',
            institution: 'Mt. San Antonio College',
            term: 'Spring 2025',
            units: 5,
            grade: 'A',
            status: 'COMPLETED'
          },
          // UCI course
          {
            id: 'uci_1',
            courseCode: 'ICS 32',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'B', // 3.0
            status: 'COMPLETED'
          }
        ]
      }

      const report = calculateUciGpaReport(profile)
      // Only ICS 32 (4 units, grade B) should count towards UC GPA
      expect(report.totalGradedUnits).toBe(4)
      expect(report.cumulativeGpa).toBe(3.0)
      expect(report.totalEarnedUnits).toBe(9) // 5 transfer + 4 UCI units
    })

    it('excludes Pass (P) courses from GPA denominator while awarding earned units', () => {
      const profile: StudentProfile = {
        major: 'Computer Science B.S.',
        catalogYear: '2026-27',
        classStanding: 'Freshman',
        completedUnits: 8,
        courseHistory: [
          {
            id: '1',
            courseCode: 'ICS 31',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'A', // 4.0 * 4 = 16 pts
            status: 'COMPLETED'
          },
          {
            id: '2',
            courseCode: 'WRITING 39A',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'P', // Pass -> 0 pts, 0 graded units
            status: 'COMPLETED'
          }
        ]
      }

      const report = calculateUciGpaReport(profile)
      expect(report.totalGradedUnits).toBe(4)
      expect(report.cumulativeGpa).toBe(4.0)
      expect(report.totalEarnedUnits).toBe(8)
    })

    it('applies UCI 16-unit repeat grade replacement policy (A345)', () => {
      const profile: StudentProfile = {
        major: 'Computer Science B.S.',
        catalogYear: '2026-27',
        classStanding: 'Freshman',
        completedUnits: 8,
        courseHistory: [
          // Attempt 1: Failed MATH 2A
          {
            id: 'attempt_1',
            courseCode: 'MATH 2A',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'F', // 0 pts, 4 units
            status: 'COMPLETED'
          },
          // Attempt 2: Retook MATH 2A and earned an A
          {
            id: 'attempt_2',
            courseCode: 'MATH 2A',
            institution: 'UCI',
            term: 'Winter 2026',
            units: 4,
            grade: 'A', // 16 pts, 4 units
            status: 'COMPLETED'
          }
        ]
      }

      const report = calculateUciGpaReport(profile)
      // Under UCI 16-unit repeat policy, the first F (4 units) is replaced by the A.
      // So only 4 graded units count, with 16 pts -> GPA = 4.0
      expect(report.repeatUnitsReplaced).toBe(4)
      expect(report.repeatAllowanceRemaining).toBe(12)
      expect(report.totalGradedUnits).toBe(4)
      expect(report.cumulativeGpa).toBe(4.0)
    })

    it('flags Academic Probation when cumulative GPA is below 2.0', () => {
      const profile: StudentProfile = {
        major: 'Computer Science B.S.',
        catalogYear: '2026-27',
        classStanding: 'Freshman',
        completedUnits: 8,
        courseHistory: [
          {
            id: '1',
            courseCode: 'MATH 2A',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'D', // 1.0
            status: 'COMPLETED'
          },
          {
            id: '2',
            courseCode: 'ICS 31',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'C-', // 1.7 -> Avg = 1.35
            status: 'COMPLETED'
          }
        ]
      }

      const report = calculateUciGpaReport(profile)
      expect(report.cumulativeGpa).toBe(1.35)
      expect(report.academicStanding).toBe('ACADEMIC_PROBATION')
    })
  })

  describe('Target GPA Requirement Solver', () => {
    it('calculates required GPA for achievable target', () => {
      // Current: 20 graded units with 3.0 GPA (60 pts)
      // Planned: 20 graded units
      // Target: 3.5 cumulative GPA
      // Future total units = 40. Total points needed = 3.5 * 40 = 140.
      // Points needed in planned units = 140 - 60 = 80.
      // Required average = 80 / 20 = 4.0 (A)
      const mockReport = {
        cumulativeGpa: 3.0,
        totalGradedUnits: 20,
        totalGradePoints: 60,
        totalEarnedUnits: 20,
        academicStanding: 'GOOD_STANDING' as const,
        repeatUnitsReplaced: 0,
        repeatAllowanceRemaining: 16,
        deansListTerms: [],
        termSummaries: []
      }

      const result = calculateTargetGpaRequirement(mockReport, 20, 3.5)
      expect(result.status).toBe('ACHIEVABLE')
      expect(result.requiredGpa).toBe(4.0)
      expect(result.recommendedAverageGrade).toBe('A')
    })

    it('flags mathematically impossible targets (> 4.0)', () => {
      const mockReport = {
        cumulativeGpa: 2.0,
        totalGradedUnits: 40,
        totalGradePoints: 80,
        totalEarnedUnits: 40,
        academicStanding: 'GOOD_STANDING' as const,
        repeatUnitsReplaced: 0,
        repeatAllowanceRemaining: 16,
        deansListTerms: [],
        termSummaries: []
      }

      // To jump from 2.0 (40 units) to 3.8 in only 12 planned units:
      // Total points needed = 3.8 * 52 = 197.6. Need 197.6 - 80 = 117.6 in 12 units -> 9.8 GPA! Impossible.
      const result = calculateTargetGpaRequirement(mockReport, 12, 3.8)
      expect(result.status).toBe('IMPOSSIBLE')
      expect(result.requiredGpa).toBeGreaterThan(4.0)
    })

    it('flags already guaranteed targets (required GPA <= 0.0)', () => {
      const mockReport = {
        cumulativeGpa: 3.9,
        totalGradedUnits: 100,
        totalGradePoints: 390,
        totalEarnedUnits: 100,
        academicStanding: 'GOOD_STANDING' as const,
        repeatUnitsReplaced: 0,
        repeatAllowanceRemaining: 16,
        deansListTerms: [],
        termSummaries: []
      }

      // Target 2.0 with only 4 planned units left
      const result = calculateTargetGpaRequirement(mockReport, 4, 2.0)
      expect(result.status).toBe('ALREADY_EXCEEDED')
    })
  })

  describe('What-If Scenario Trajectory Projection', () => {
    it('projects trajectory across planned quarters with hypothetical grades', () => {
      const profile: StudentProfile = {
        major: 'Computer Science B.S.',
        catalogYear: '2026-27',
        classStanding: 'Freshman',
        completedUnits: 4,
        courseHistory: [
          {
            id: '1',
            courseCode: 'ICS 31',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'B', // 3.0
            status: 'COMPLETED'
          }
        ]
      }

      const plannedQuarters: PlannedQuarter[] = [
        {
          id: 'winter-2026',
          term: 'Winter',
          year: 2026,
          courses: [{ courseCode: 'ICS 32', units: 4 }]
        },
        {
          id: 'spring-2026',
          term: 'Spring',
          year: 2026,
          courses: [{ courseCode: 'ICS 33', units: 4 }]
        }
      ]

      const trajectory = projectWhatIfTrajectory(profile, plannedQuarters, {
        'ICS 32': 'A', // 4.0 -> cumulative = (12 + 16)/8 = 28/8 = 3.50
        'ICS 33': 'A' // 4.0 -> cumulative = (28 + 16)/12 = 44/12 = 3.67
      })

      expect(trajectory.length).toBe(3) // 1 historical + 2 projected
      expect(trajectory[0].isProjected).toBe(false)
      expect(trajectory[0].cumulativeGpa).toBe(3.0)

      expect(trajectory[1].isProjected).toBe(true)
      expect(trajectory[1].termGpa).toBe(4.0)
      expect(trajectory[1].cumulativeGpa).toBe(3.5)

      expect(trajectory[2].isProjected).toBe(true)
      expect(trajectory[2].cumulativeGpa).toBe(3.67)
    })
  })
})

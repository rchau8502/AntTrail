import { describe, it, expect } from 'vitest'
import {
  classifyCccCourse,
  auditCourseArticulation,
  calculateTransferableUnits,
  bridgeArticulatedToStudentProfile,
  CAMPUS_MAJOR_REQUIREMENTS
} from '../lib/articulation'
import { CCC_COLLEGES } from '../data/cccArticulations'

describe('ScholarStack Transfer Articulation & Major Preparation Engine', () => {
  describe('classifyCccCourse', () => {
    it('correctly classifies Irvine Valley College (IVC) STEM coursework', () => {
      expect(classifyCccCourse('MATH 3A', 'Analytic Geometry and Calculus I')).toBe('calculus')
      expect(classifyCccCourse('MATH 3B', 'Analytic Geometry and Calculus II')).toBe('calculus_2')
      expect(classifyCccCourse('MATH 4A', 'Analytic Geometry and Calculus III')).toBe('multivariable')
      expect(classifyCccCourse('MATH 24', 'Elementary Differential Equations')).toBe('diff_equations')
      expect(classifyCccCourse('MATH 26', 'Introduction to Linear Algebra')).toBe('linear_algebra')
      expect(classifyCccCourse('CS 36', 'C++ Programming')).toBe('programming_intro')
      expect(classifyCccCourse('CS 37', 'C++ Data Structures')).toBe('data_structures')
      expect(classifyCccCourse('CS 41', 'Python Programming')).toBe('programming_intro')
      expect(classifyCccCourse('CS 6B', 'Discrete Mathematics for Computer Science')).toBe('discrete_math')
      expect(classifyCccCourse('PHYS 4A', 'General Physics: Mechanics')).toBe('physics_mechanics')
      expect(classifyCccCourse('WR 1', 'College Writing 1')).toBe('ge_writing')
      expect(classifyCccCourse('WR 2', 'Critical Thinking and Writing')).toBe('ge_critical_thinking')
      expect(classifyCccCourse('ECON 1', 'Principles of Economics - Micro')).toBe('microeconomics')
    })

    it('correctly classifies Orange Coast College (OCC) coursework', () => {
      expect(classifyCccCourse('MATH A180', 'Calculus 1')).toBe('calculus')
      expect(classifyCccCourse('MATH A185', 'Calculus 2')).toBe('calculus_2')
      expect(classifyCccCourse('MATH A280', 'Calculus 3')).toBe('multivariable')
      expect(classifyCccCourse('MATH A285', 'Introduction to Linear Algebra and Differential Equations')).toBe('linear_algebra')
      expect(classifyCccCourse('CS A150', 'C++ Programming 1')).toBe('programming_intro')
      expect(classifyCccCourse('CS A200', 'Data Structures and Algorithms')).toBe('data_structures')
      expect(classifyCccCourse('CS A216', 'Computer Architecture')).toBe('computer_architecture')
    })

    it('correctly classifies De Anza College coursework', () => {
      expect(classifyCccCourse('MATH 1A', 'Calculus')).toBe('calculus')
      expect(classifyCccCourse('MATH 1B', 'Calculus')).toBe('calculus_2')
      expect(classifyCccCourse('MATH 1C', 'Calculus')).toBe('multivariable')
      expect(classifyCccCourse('MATH 2A', 'Differential Equations')).toBe('diff_equations')
      expect(classifyCccCourse('MATH 2B', 'Linear Algebra')).toBe('linear_algebra')
      expect(classifyCccCourse('MATH 22', 'Discrete Mathematics')).toBe('discrete_math')
      expect(classifyCccCourse('CIS 22A', 'Beginning Programming Methodologies in C++')).toBe('programming_intro')
      expect(classifyCccCourse('CIS 22C', 'Data Abstraction and Structures')).toBe('data_structures')
    })
  })

  describe('auditCourseArticulation', () => {
    it('accurately audits UC Irvine Computer Science major requirements', () => {
      const studentCourses = [
        { code: 'MATH 3A', title: 'Analytic Geometry and Calculus I', units: 5, grade: 'A', term: 'Fall 2024' },
        { code: 'MATH 3B', title: 'Analytic Geometry and Calculus II', units: 5, grade: 'B', term: 'Spring 2025' },
        { code: 'MATH 26', title: 'Introduction to Linear Algebra', units: 4, grade: 'A', term: 'Fall 2025' },
        { code: 'CS 36', title: 'C++ Programming', units: 3, grade: 'A', term: 'Fall 2024' },
        { code: 'CS 41', title: 'Python Programming', units: 3, grade: 'A', term: 'Spring 2025' },
        { code: 'CS 37', title: 'C++ Data Structures', units: 3, grade: 'IP', term: 'Spring 2026' }
      ]

      const audit = auditCourseArticulation({
        targetCampus: 'UC Irvine',
        targetMajor: 'Computer Science',
        courses: studentCourses
      })

      expect(audit.targetCampus).toBe('UC Irvine')
      expect(audit.targetMajor).toBe('Computer Science')
      expect(audit.totalRequirements).toBe(8)
      expect(audit.satisfiedCount).toBeGreaterThanOrEqual(5)
      expect(audit.plannedCount).toBe(1) // CS 37 is in progress (IP)
      expect(audit.completionPercentage).toBeGreaterThanOrEqual(60)

      // Check matched articulation courses
      const math2aMatch = audit.articulatedCourses.find((c) => c.targetCourseCode === 'MATH 2A')
      expect(math2aMatch).toBeDefined()
      expect(math2aMatch?.originCourseCode).toBe('MATH 3A')
      expect(math2aMatch?.isArticulated).toBe(true)

      const math3aMatch = audit.articulatedCourses.find((c) => c.targetCourseCode === 'MATH 3A')
      expect(math3aMatch).toBeDefined()
      expect(math3aMatch?.originCourseCode).toBe('MATH 26')
    })

    it('identifies missing critical major preparation requirements and emits actionable advice', () => {
      // Student only took Calculus I and Intro Programming, missing Calc II, Linear Algebra, Data Structures, Discrete Math
      const studentCourses = [
        { code: 'MATH 3A', title: 'Analytic Geometry and Calculus I', units: 5, grade: 'A' },
        { code: 'CS 36', title: 'C++ Programming', units: 3, grade: 'A' }
      ]

      const audit = auditCourseArticulation({
        targetCampus: 'UC Irvine',
        targetMajor: 'Computer Science',
        courses: studentCourses
      })

      expect(audit.missingCount).toBeGreaterThan(4)
      expect(audit.recommendations.some((r) => r.includes('Priority prerequisite gap'))).toBe(true)
    })

    it('audits requirements across peer campuses like UC Berkeley and UCLA', () => {
      const studentCourses = [
        { code: 'MATH 1A', title: 'Calculus', units: 5, grade: 'A' },
        { code: 'MATH 1B', title: 'Calculus', units: 5, grade: 'A' },
        { code: 'CIS 22A', title: 'Beginning Programming Methodologies in C++', units: 4.5, grade: 'A' },
        { code: 'CIS 22C', title: 'Data Abstraction and Structures', units: 4.5, grade: 'A' }
      ]

      const berkeleyAudit = auditCourseArticulation({
        targetCampus: 'UC Berkeley',
        targetMajor: 'Computer Science',
        courses: studentCourses
      })
      expect(berkeleyAudit.satisfiedCount).toBeGreaterThanOrEqual(3)

      const uclaAudit = auditCourseArticulation({
        targetCampus: 'UCLA',
        targetMajor: 'Computer Science',
        courses: studentCourses
      })
      expect(uclaAudit.satisfiedCount).toBeGreaterThanOrEqual(3)
    })
  })

  describe('calculateTransferableUnits', () => {
    it('accurately calculates semester unit progress toward 60-unit threshold and 90 quarter units', () => {
      const courses = [
        { units: 5, grade: 'A' },
        { units: 5, grade: 'B' },
        { units: 4, grade: 'A' },
        { units: 3, grade: 'A' },
        { units: 3, grade: 'IP' } // planned
      ]

      const result = calculateTransferableUnits(courses, 'semester')
      expect(result.completedOriginUnits).toBe(17)
      expect(result.plannedOriginUnits).toBe(3)
      expect(result.totalOriginUnits).toBe(20)
      expect(result.completedQuarterUnits).toBe(25.5) // 17 * 1.5
      expect(result.totalQuarterUnits).toBe(30) // 20 * 1.5
      expect(result.targetThresholdSemesterUnits).toBe(60)
      expect(result.progressPercentage).toBe(28) // 17 / 60 = 28%
      expect(result.isThresholdMet).toBe(false)
    })

    it('flags threshold met when completed units reach 60 semester units', () => {
      const courses = Array(15).fill({ units: 4, grade: 'A' }) // 60 semester units
      const result = calculateTransferableUnits(courses, 'semester')
      expect(result.completedOriginUnits).toBe(60)
      expect(result.completedQuarterUnits).toBe(90)
      expect(result.progressPercentage).toBe(100)
      expect(result.isThresholdMet).toBe(true)
    })
  })

  describe('bridgeArticulatedToStudentProfile', () => {
    it('transforms articulated courses into StudentCourseRecord format for anttrail_active_profile_v2', () => {
      const studentCourses = [
        { code: 'MATH 3A', title: 'Analytic Geometry and Calculus I', units: 5, grade: 'A', term: 'Fall 2024' },
        { code: 'MATH 26', title: 'Introduction to Linear Algebra', units: 4, grade: 'B', term: 'Spring 2025' }
      ]

      const audit = auditCourseArticulation({
        targetCampus: 'UC Irvine',
        targetMajor: 'Computer Science',
        courses: studentCourses
      })

      const existingProfile = {
        studentId: 'UCI-12345',
        major: 'Computer Science B.S.',
        catalogYear: '2026-27',
        classStanding: 'FRESHMAN',
        completedUnits: 12,
        courseHistory: [
          {
            id: 'uci-wr-39a',
            courseCode: 'WRITING 39A',
            institution: 'UCI',
            term: 'Fall 2024',
            units: 4,
            grade: 'A',
            status: 'COMPLETED'
          }
        ]
      }

      const bridgeResult = bridgeArticulatedToStudentProfile({
        audit,
        originCollegeName: 'Irvine Valley College (IVC)',
        existingProfile
      })

      expect(bridgeResult.bridgedCount).toBeGreaterThanOrEqual(2)
      expect(bridgeResult.updatedProfile.courseHistory.length).toBe(3) // 1 existing + 2 bridged

      const bridgedMath2A = bridgeResult.updatedProfile.courseHistory.find(
        (c: any) => c.courseCode === 'MATH 2A'
      )
      expect(bridgedMath2A).toBeDefined()
      expect(bridgedMath2A.institution).toBe('Irvine Valley College (IVC)')
      expect(bridgedMath2A.grade).toBe('A')
      expect(bridgedMath2A.status).toBe('COMPLETED')
    })
  })

  describe('Preloaded CCC Catalogs', () => {
    it('contains all 8 required California Community Colleges with popular course catalogs', () => {
      expect(CCC_COLLEGES.length).toBe(8)
      const collegeIds = CCC_COLLEGES.map((c) => c.id)
      expect(collegeIds).toContain('ivc')
      expect(collegeIds).toContain('occ')
      expect(collegeIds).toContain('de-anza')
      expect(collegeIds).toContain('smc')
      expect(collegeIds).toContain('mtsac')
      expect(collegeIds).toContain('foothill')
      expect(collegeIds).toContain('dvc')
      expect(collegeIds).toContain('pcc')

      const ivc = CCC_COLLEGES.find((c) => c.id === 'ivc')
      expect(ivc?.popularCourses.length).toBeGreaterThan(10)
    })
  })
})

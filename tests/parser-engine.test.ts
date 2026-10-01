import { describe, it, expect } from 'vitest'
import {
  parseAcademicRecordText,
  detectDocumentFormat
} from '../src/academic-engine/parser/parser'
import {
  SAMPLE_STUDENT_ACCESS_TRANSCRIPT,
  SAMPLE_DEGREE_WORKS_AUDIT,
  SAMPLE_GENERIC_COURSE_LIST
} from '../src/data/mock/sampleTranscripts'
import { UCI_CS_MATH_COURSES } from '../src/data/uci/courses'
import { OFFICIAL_TRANSFER_EQUIVALENCIES } from '../src/data/uci/equivalencies'

describe('Deterministic Transcript & DegreeWorks Parser', () => {
  describe('Format Auto-Detection', () => {
    it('detects UCI StudentAccess format from unofficial record headers', () => {
      expect(detectDocumentFormat(SAMPLE_STUDENT_ACCESS_TRANSCRIPT)).toBe('STUDENT_ACCESS')
    })

    it('detects DegreeWorks format from Applied lines and Degree audit text', () => {
      expect(detectDocumentFormat(SAMPLE_DEGREE_WORKS_AUDIT)).toBe('DEGREE_WORKS')
    })

    it('detects generic shorthand list format as fallback', () => {
      expect(detectDocumentFormat(SAMPLE_GENERIC_COURSE_LIST)).toBe('GENERIC_LIST')
    })
  })

  describe('UCI StudentAccess Transcript Parsing', () => {
    it('extracts all quarterly courses with accurate grades, units, and terms', () => {
      const result = parseAcademicRecordText(
        SAMPLE_STUDENT_ACCESS_TRANSCRIPT,
        UCI_CS_MATH_COURSES,
        OFFICIAL_TRANSFER_EQUIVALENCIES
      )

      expect(result.detectedFormat).toBe('STUDENT_ACCESS')
      expect(result.courses.length).toBeGreaterThanOrEqual(8)

      // Verify specific courses extracted
      const ics31 = result.courses.find((c) => c.courseCode === 'ICS 31')
      expect(ics31).toBeDefined()
      expect(ics31?.grade).toBe('A')
      expect(ics31?.units).toBe(4)
      expect(ics31?.term).toBe('Fall 2025')
      expect(ics31?.status).toBe('COMPLETED')
      expect(ics31?.matchedCatalogCourse).toBeDefined()

      const math2a = result.courses.find((c) => c.courseCode === 'MATH 2A')
      expect(math2a).toBeDefined()
      expect(math2a?.grade).toBe('A-')
      expect(math2a?.units).toBe(4)

      const writing39a = result.courses.find((c) => c.courseCode === 'WRITING 39A')
      expect(writing39a).toBeDefined()
      expect(writing39a?.grade).toBe('P')

      const ics32 = result.courses.find((c) => c.courseCode === 'ICS 32')
      expect(ics32?.grade).toBe('B+')
      expect(ics32?.term).toBe('Winter 2026')

      const stats67 = result.courses.find((c) => c.courseCode === 'STATS 67')
      expect(stats67?.grade).toBe('A')
      expect(stats67?.term).toBe('Winter 2026')

      const ics33 = result.courses.find((c) => c.courseCode === 'ICS 33')
      expect(ics33?.grade).toBe('A')
      expect(ics33?.term).toBe('Spring 2026')
    })

    it('parses transfer credit section and recognizes articulation links', () => {
      const result = parseAcademicRecordText(
        SAMPLE_STUDENT_ACCESS_TRANSCRIPT,
        UCI_CS_MATH_COURSES,
        OFFICIAL_TRANSFER_EQUIVALENCIES
      )

      const transferMath = result.courses.find((c) => c.courseCode === 'MATH 260')
      expect(transferMath).toBeDefined()
      expect(transferMath?.institution).toBe('MT. SAN ANTONIO COLLEGE')
      expect(transferMath?.isArticulation).toBe(true)
      expect(transferMath?.articulationTargetCode).toBe('MATH 2A')
      expect(transferMath?.grade).toBe('A') // TA normalized to A

      const transferCs = result.courses.find((c) => c.courseCode === 'CSCI 220')
      expect(transferCs).toBeDefined()
      expect(transferCs?.articulationTargetCode).toBe('ICS 45C')
      expect(transferCs?.grade).toBe('B') // TB normalized to B
    })

    it('redacts sensitive PII lines (Student ID numbers, student names)', () => {
      const result = parseAcademicRecordText(
        SAMPLE_STUDENT_ACCESS_TRANSCRIPT,
        UCI_CS_MATH_COURSES,
        OFFICIAL_TRANSFER_EQUIVALENCIES
      )

      expect(result.sanitizedPiiCount).toBeGreaterThanOrEqual(1)
      // None of the parsed course records or titles contain student ID numbers
      for (const course of result.courses) {
        expect(course.courseCode).not.toContain('88492019')
        expect(course.courseCode).not.toContain('PETER')
      }
    })
  })

  describe('DegreeWorks Audit Text Parsing', () => {
    it('extracts applied requirement courses accurately and ignores still needed blocks', () => {
      const result = parseAcademicRecordText(
        SAMPLE_DEGREE_WORKS_AUDIT,
        UCI_CS_MATH_COURSES,
        OFFICIAL_TRANSFER_EQUIVALENCIES
      )

      expect(result.detectedFormat).toBe('DEGREE_WORKS')
      expect(result.courses.length).toBe(7)

      const codes = result.courses.map((c) => c.courseCode)
      expect(codes).toContain('ICS 31')
      expect(codes).toContain('ICS 32')
      expect(codes).toContain('ICS 33')
      expect(codes).toContain('MATH 2A')
      expect(codes).toContain('MATH 2B')
      expect(codes).toContain('MATH 3A')
      expect(codes).toContain('STATS 67')

      // ICS 46 is "Still Needed", so it should NOT be in completed courses
      expect(codes).not.toContain('ICS 46')
    })
  })

  describe('Generic Course List Parsing', () => {
    it('parses shorthand comma or hyphen separated course lines', () => {
      const result = parseAcademicRecordText(
        SAMPLE_GENERIC_COURSE_LIST,
        UCI_CS_MATH_COURSES,
        OFFICIAL_TRANSFER_EQUIVALENCIES
      )

      expect(result.detectedFormat).toBe('GENERIC_LIST')
      expect(result.courses.length).toBe(6)

      const ics31 = result.courses.find((c) => c.courseCode === 'ICS 31')
      expect(ics31).toBeDefined()
      expect(ics31?.grade).toBe('A')
      expect(ics31?.units).toBe(4)
      expect(ics31?.term).toBe('Fall 2025')
    })
  })
})

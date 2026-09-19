import { describe, expect, test } from 'vitest'
import { parseTranscriptText, parseCourseLine } from '@/lib/transcriptParser'

describe('transcriptParser', () => {
  test('parses individual course line with units and grade', () => {
    const course = parseCourseLine('MATH 1A Calculus I 5.0 A')
    expect(course).not.toBeNull()
    expect(course?.code).toBe('MATH 1A')
    expect(course?.units).toBe(5.0)
    expect(course?.grade).toBe('A')
    expect(course?.category).toBe('math')
    expect(course?.gradePoints).toBe(4.0)
  })

  test('calculates accurate GPA and 60-unit progress from multi-line transcript', () => {
    const rawTranscript = `
      ENGL 1A College Composition 4.0 A
      MATH 1 Calculus I 5.0 B
      CHEM 1A General Chemistry 5.0 A
      HIST 17A US History 3.0 A
      COMM 1 Public Speaking 3.0 B
      PHIL 106 Critical Thinking 3.0 A
      PSYC 101 General Psychology 3.0 A
      PE 10 Physical Fitness 1.0 P
    `

    const result = parseTranscriptText(rawTranscript)
    expect(result.courses.length).toBe(8)
    expect(result.totalUnits).toBe(27) // 4 + 5 + 5 + 3 + 3 + 3 + 3 + 1 = 27
    expect(result.gradedUnits).toBe(26)
    // 4*4 + 5*3 + 5*4 + 3*4 + 3*3 + 3*4 + 3*4 = 16 + 15 + 20 + 12 + 9 + 12 + 12 = 96
    // 96 / 26 = 3.69
    expect(result.gpa).toBe(3.69)
    expect(result.progress60Units).toBe(45) // 27 / 60 = 45%
  })

  test('audits CSU Golden Four and UC 7-Course pattern accurately', () => {
    const rawTranscript = `
      COMM 1 Public Speaking 3.0 A
      ENGL 1A English Composition 4.0 A
      ENGL 1B Critical Thinking and Literature 3.0 A
      MATH 2 Calculus II 5.0 B
      PSYC 1 Intro Psychology 3.0 A
      BIOL 1 General Biology 4.0 B
    `

    const result = parseTranscriptText(rawTranscript)
    expect(result.csuGoldenFour.a1OralComm.isSatisfied).toBe(true)
    expect(result.csuGoldenFour.a2WrittenComm.isSatisfied).toBe(true)
    expect(result.csuGoldenFour.a3CriticalThinking.isSatisfied).toBe(true)
    expect(result.csuGoldenFour.b4MathQuant.isSatisfied).toBe(true)
    expect(result.csuGoldenFour.isSatisfied).toBe(true)

    expect(result.ucSevenCoursePattern.englishComp.isSatisfied).toBe(true) // ENGL 1A & 1B
    expect(result.ucSevenCoursePattern.mathQuant.isSatisfied).toBe(true) // MATH 2
    expect(result.ucSevenCoursePattern.breadthAreas.matchingCourses.length).toBeGreaterThanOrEqual(2)
  })

  test('detects community college from transcript header or text', () => {
    const rawTranscript = `
      Irvine Valley College - Fall 2024
      MATH 1 Calculus I 5.0 A
      ENGL 1A Writing 4.0 A
    `
    const result = parseTranscriptText(rawTranscript)
    expect(result.detectedSchool).toBe('Irvine Valley College')
  })
})

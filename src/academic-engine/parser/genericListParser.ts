import { GradeLetter } from '../types'
import { normalizeCourseCode } from '../prerequisites'
import { ParsedCourseCandidate } from './types'

function normalizeGrade(rawGrade: string): GradeLetter {
  const g = rawGrade.trim().toUpperCase()
  if (['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'P', 'NP'].includes(g)) {
    return g as GradeLetter
  }
  return 'A'
}

export function parseGenericCourseList(rawText: string): {
  courses: ParsedCourseCandidate[]
  warnings: string[]
  sanitizedPiiCount: number
} {
  const lines = rawText.split(/\r?\n/)
  const courses: ParsedCourseCandidate[] = []
  const warnings: string[] = []
  let sanitizedPiiCount = 0

  // Pattern:
  // e.g. "ICS 31 - A (4 units) - Fall 2025"
  // or "MATH 2A, A, 4, Fall 2025"
  // or "ICS 32 B+ 4"
  const flexibleLineRegex = /([A-Z]{2,8}\s+\d+[A-Z]?)(?:[,\s:-]+|\s+Grade:\s*)([A-F][+-]?|P|NP)(?:[,\s(-]+|\s+Units:\s*)(\d+(?:\.\d+)?)(?:\s*units?\)?\s*)?(?:[,\s-]+((?:Fall|Winter|Spring|Summer)\s+\d{4}))?/i

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const match = trimmed.match(flexibleLineRegex)
    if (match) {
      const code = match[1]
      const rawGrade = match[2]
      const rawUnits = match[3]
      const rawTerm = match[4]

      const norm = normalizeCourseCode(code)
      const grade = normalizeGrade(rawGrade)
      const units = parseFloat(rawUnits) || 4
      const term = rawTerm ? rawTerm.trim() : 'Completed Prior'

      courses.push({
        id: `gen_${courses.length + 1}_${Math.random().toString(36).substring(2, 6)}`,
        rawLine: trimmed,
        courseCode: norm,
        normalizedCode: norm,
        units,
        grade,
        term,
        status: 'COMPLETED',
        institution: 'UCI',
        isArticulation: false,
        confidence: 'MEDIUM',
        selected: true
      })
    }
  }

  return { courses, warnings, sanitizedPiiCount }
}

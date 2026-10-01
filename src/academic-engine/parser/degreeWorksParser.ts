import { GradeLetter } from '../types'
import { normalizeCourseCode } from '../prerequisites'
import { ParsedCourseCandidate } from './types'

function normalizeGrade(rawGrade: string): GradeLetter {
  const g = rawGrade.trim().toUpperCase()
  if (g.startsWith('T') && g.length === 2) {
    const sub = g[1]
    if (['A', 'B', 'C', 'D', 'F'].includes(sub)) {
      return sub as GradeLetter
    }
  }
  return g as GradeLetter
}

export function parseDegreeWorksAudit(rawText: string): {
  courses: ParsedCourseCandidate[]
  warnings: string[]
  sanitizedPiiCount: number
} {
  const lines = rawText.split(/\r?\n/)
  const courses: ParsedCourseCandidate[] = []
  const warnings: string[] = []
  let sanitizedPiiCount = 0

  // Regex to extract applied courses in DegreeWorks
  // e.g. "Applied: Fall 2025  ICS 31  Intro to Programming I  4  A"
  // Group 1: Term (optional)
  // Group 2: Year (optional)
  // Group 3: Course Code
  // Group 4: Title
  // Group 5: Units
  // Group 6: Grade
  const appliedLineRegex = /Applied:\s*(?:(Fall|Winter|Spring|Summer)\s+(\d{4}))?\s*([A-Z]{2,8}\s+\d+[A-Z]?)\s+(.*?)\s+(\d+(?:\.\d+)?)\s+([A-F][+-]?|P|NP|IP|T[A-F])/i

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    // Detect and sanitize PII
    if (/Student:\s*|ID:\s*\d+|SSN/i.test(trimmed)) {
      sanitizedPiiCount++
      continue
    }

    const match = trimmed.match(appliedLineRegex)
    if (match) {
      const termName = match[1]
      const year = match[2]
      const code = match[3]
      const title = match[4]
      const rawUnits = match[5]
      const rawGrade = match[6]

      const term = termName && year ? `${termName} ${year}` : 'Completed Prior'
      const norm = normalizeCourseCode(code)
      const units = parseFloat(rawUnits) || 4
      const grade = normalizeGrade(rawGrade)
      const isTransfer = rawGrade.toUpperCase().startsWith('T')

      const candidate: ParsedCourseCandidate = {
        id: `dw_${courses.length + 1}_${Math.random().toString(36).substring(2, 6)}`,
        rawLine: trimmed,
        courseCode: norm,
        normalizedCode: norm,
        title: title.trim() || undefined,
        units,
        grade,
        term,
        status: isTransfer ? 'TRANSFER' : grade === 'IP' ? 'IN_PROGRESS' : 'COMPLETED',
        institution: isTransfer ? 'Transfer' : 'UCI',
        isArticulation: isTransfer,
        confidence: 'HIGH',
        selected: true
      }

      courses.push(candidate)
    }
  }

  return { courses, warnings, sanitizedPiiCount }
}

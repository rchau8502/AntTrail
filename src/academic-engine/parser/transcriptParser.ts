import { GradeLetter } from '../types'
import { normalizeCourseCode } from '../prerequisites'
import { ParsedCourseCandidate } from './types'

// Map transfer grades like TA -> A, TB -> B, etc.
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

export function parseStudentAccessTranscript(rawText: string): {
  courses: ParsedCourseCandidate[]
  warnings: string[]
  sanitizedPiiCount: number
} {
  const lines = rawText.split(/\r?\n/)
  const courses: ParsedCourseCandidate[] = []
  const warnings: string[] = []
  let sanitizedPiiCount = 0

  let currentTerm = 'Completed Prior'
  let currentInstitution = 'UCI'
  let inTransferSection = false
  let lastCourseCandidate: ParsedCourseCandidate | null = null

  // Pattern for quarterly header e.g. "FALL QUARTER 2025" or "WINTER 2026"
  const termHeaderRegex = /^(FALL|WINTER|SPRING|SUMMER)\s+(?:QUARTER\s+)?(\d{4})/i

  // Pattern for transfer section header
  const transferSectionRegex = /TRANSFER\s+CREDIT|ADVANCED\s+PLACEMENT/i
  const institutionRegex = /INSTITUTION:\s*(.+)/i

  // Pattern for articulation note following transfer course e.g. "(Articulation: UCI MATH 2A)"
  const articulationNoteRegex = /\((?:Articulation|Equivalent to):\s*(?:UCI\s*)?([A-Z0-9\s]+)\)/i

  // Pattern for course row:
  // e.g. "COMPSCI ICS 31  INTRO TO PROGRAMMING I  4.00  A  16.00"
  // or "MATH 2A  SINGLE VARIABLE CALCULUS I  4.00  A-  14.80"
  // Group 1: optional department prefix (e.g. COMPSCI)
  // Group 2: course code (e.g. ICS 31 or MATH 2A)
  // Group 3: title
  // Group 4: units
  // Group 5: grade
  const courseRowRegex = /^(?:([A-Z]{2,10})\s+)?([A-Z]{2,8}\s+\d+[A-Z]?)\s+(.*?)\s+(\d+(?:\.\d+)?)\s+([A-F][+-]?|P|NP|IP|T[A-F]|S|U)(?:\s+\d+(?:\.\d+)?)?$/i

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    // Detect and count PII lines to sanitize
    if (
      /STUDENT\s+ID|SSN|NAME:|BIRTH\s+DATE|ADDRESS|PHONE/i.test(line) &&
      !line.startsWith('COURSE')
    ) {
      sanitizedPiiCount++
      continue
    }

    // Skip summary / stats lines
    if (/^(?:Quarter|Cumulative|Total)\s+(?:Units|GPA|Points)|OFFICE\s+OF|UNIVERSITY\s+OF/i.test(line)) {
      continue
    }

    // Skip table header lines
    if (/^COURSE\s+TITLE\s+UNITS/i.test(line)) {
      continue
    }

    // Check for transfer section
    if (transferSectionRegex.test(line)) {
      inTransferSection = true
      currentInstitution = 'Transfer'
      currentTerm = 'Transfer Credit'
      continue
    }

    // Check for institution name in transfer section
    const instMatch = line.match(institutionRegex)
    if (instMatch) {
      currentInstitution = instMatch[1].trim()
      continue
    }

    // Check for term header
    const termMatch = line.match(termHeaderRegex)
    if (termMatch) {
      const termName = termMatch[1].toUpperCase()
      const year = termMatch[2]
      const formattedTerm = termName[0] + termName.slice(1).toLowerCase()
      currentTerm = `${formattedTerm} ${year}`
      inTransferSection = false
      currentInstitution = 'UCI'
      continue
    }

    // Check for articulation footnote on the line immediately following a course
    const artMatch = line.match(articulationNoteRegex)
    if (artMatch && lastCourseCandidate) {
      const targetCode = normalizeCourseCode(artMatch[1])
      lastCourseCandidate.isArticulation = true
      lastCourseCandidate.articulationTargetCode = targetCode
      continue
    }

    // Attempt matching standard course row
    const match = line.match(courseRowRegex)
    if (match) {
      let code = match[2]
      const rawTitle = match[3]
      const rawUnits = match[4]
      const rawGrade = match[5]

      // Handle cases where prefix + code might be COMPSCI ICS 31 -> ICS 31 is the true code
      const norm = normalizeCourseCode(code)
      const units = parseFloat(rawUnits) || 4
      const grade = normalizeGrade(rawGrade)
      const isTransfer = inTransferSection || rawGrade.toUpperCase().startsWith('T')

      const candidate: ParsedCourseCandidate = {
        id: `parsed_${courses.length + 1}_${Math.random().toString(36).substring(2, 6)}`,
        rawLine: line,
        courseCode: norm,
        normalizedCode: norm,
        title: rawTitle.trim() || undefined,
        units,
        grade,
        term: currentTerm,
        status: isTransfer ? 'TRANSFER' : grade === 'IP' ? 'IN_PROGRESS' : 'COMPLETED',
        institution: currentInstitution,
        isArticulation: isTransfer,
        confidence: 'HIGH',
        selected: true
      }

      courses.push(candidate)
      lastCourseCandidate = candidate
    }
  }

  return { courses, warnings, sanitizedPiiCount }
}

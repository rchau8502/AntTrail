import { Course, CourseEquivalency } from '../types'
import { normalizeCourseCode } from '../prerequisites'
import { ParseResult, ParserFormat } from './types'
import { parseStudentAccessTranscript } from './transcriptParser'
import { parseDegreeWorksAudit } from './degreeWorksParser'
import { parseGenericCourseList } from './genericListParser'

export function detectDocumentFormat(rawText: string): ParserFormat {
  if (
    /UNOFFICIAL\s+ACADEMIC\s+RECORD/i.test(rawText) ||
    (/(?:FALL|WINTER|SPRING|SUMMER)\s+QUARTER/i.test(rawText) && /UNITS\s+GRADE/i.test(rawText))
  ) {
    return 'STUDENT_ACCESS'
  }

  if (
    /Applied:\s*(?:(?:Fall|Winter|Spring|Summer)\s+\d{4})?\s*[A-Z]{2,8}\s+\d+/i.test(rawText) ||
    /Still\s+Needed:\s*\d+\s+Class/i.test(rawText) ||
    /DegreeWorks/i.test(rawText)
  ) {
    return 'DEGREE_WORKS'
  }

  return 'GENERIC_LIST'
}

export function parseAcademicRecordText(
  rawText: string,
  catalogCourses: Course[] = [],
  transferEquivalencies: CourseEquivalency[] = []
): ParseResult {
  const format = detectDocumentFormat(rawText)
  let intermediate: {
    courses: ParseResult['courses']
    warnings: string[]
    sanitizedPiiCount: number
  }

  switch (format) {
    case 'STUDENT_ACCESS':
      intermediate = parseStudentAccessTranscript(rawText)
      break
    case 'DEGREE_WORKS':
      intermediate = parseDegreeWorksAudit(rawText)
      break
    case 'GENERIC_LIST':
    default:
      intermediate = parseGenericCourseList(rawText)
      break
  }

  // Build catalog lookup maps for O(1) enrichment
  const catalogMap = new Map<string, Course>()
  for (const c of catalogCourses) {
    catalogMap.set(normalizeCourseCode(c.code), c)
  }

  // Build transfer equivalency map: sourceCourseCode -> targetUciCourseId
  const equivalencyMap = new Map<string, string>()
  for (const eq of transferEquivalencies) {
    const src = eq.sourceCourseCode || (eq as any).transferCourseCode
    const target = eq.targetUciCourseId || (eq as any).uciCourseCode
    if (src && target) {
      equivalencyMap.set(normalizeCourseCode(src), normalizeCourseCode(target))
    }
  }

  // Enrich parsed courses with catalog metadata & articulation links
  const enrichedCourses = intermediate.courses.map((cand) => {
    const norm = normalizeCourseCode(cand.courseCode)
    const catalogMatch = catalogMap.get(norm)

    // Check if it's an articulated transfer course
    const targetUciCode = cand.articulationTargetCode || equivalencyMap.get(norm)
    const isArt = Boolean(targetUciCode) || cand.isArticulation

    // Check if articulated target matches a catalog course
    const targetCatalogMatch = targetUciCode ? catalogMap.get(targetUciCode) : undefined
    const finalCatalogMatch = catalogMatch || targetCatalogMatch

    return {
      ...cand,
      title: cand.title || finalCatalogMatch?.title || undefined,
      matchedCatalogCourse: finalCatalogMatch,
      isArticulation: isArt,
      articulationTargetCode: targetUciCode || (isArt ? cand.articulationTargetCode : undefined),
      confidence: finalCatalogMatch ? ('HIGH' as const) : cand.confidence
    }
  })

  // Deduplicate identical courses from same term if encountered
  const seen = new Set<string>()
  const deduplicatedCourses = enrichedCourses.filter((c) => {
    const key = `${c.normalizedCode}_${c.term}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const totalUnits = deduplicatedCourses.reduce((sum, c) => sum + (c.units || 4), 0)

  return {
    detectedFormat: format,
    courses: deduplicatedCourses,
    totalUnitsExtracted: totalUnits,
    warnings: intermediate.warnings,
    sanitizedPiiCount: intermediate.sanitizedPiiCount
  }
}

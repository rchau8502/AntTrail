import { Course, OfferingTerm, OfferingConfidence } from '../../academic-engine/types'

/**
 * Checks whether a course is offered in a specific academic term (Fall, Winter, Spring, Summer).
 */
export function isCourseOfferedInTerm(course: Course, term: OfferingTerm): boolean {
  if (!course.offerings || course.offerings.length === 0) {
    // If no explicit offering schedule is listed, assume standard academic year (Fall/Winter/Spring)
    return term !== 'Summer'
  }
  return course.offerings.some((off) => off.term === term)
}

/**
 * Retrieves the offering confidence level (CONFIRMED, EXPECTED, LIKELY, UNKNOWN) for a term.
 */
export function getCourseOfferingConfidence(
  course: Course,
  term: OfferingTerm
): OfferingConfidence | null {
  if (!course.offerings) return null
  const match = course.offerings.find((off) => off.term === term)
  return match ? match.confidence : null
}

/**
 * Returns all terms in which the course is offered.
 */
export function getAvailableTermsForCourse(course: Course): OfferingTerm[] {
  if (!course.offerings || course.offerings.length === 0) {
    return ['Fall', 'Winter', 'Spring']
  }
  return Array.from(new Set(course.offerings.map((off) => off.term)))
}

/**
 * Returns formatted offering metadata badges for UI display.
 */
export function getCourseOfferingBadges(course: Course): Array<{
  term: OfferingTerm
  confidence: OfferingConfidence
  label: string
  colorClass: string
}> {
  if (!course.offerings || course.offerings.length === 0) {
    return [
      {
        term: 'Fall',
        confidence: 'LIKELY',
        label: 'Fall (Likely)',
        colorClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      },
      {
        term: 'Winter',
        confidence: 'LIKELY',
        label: 'Winter (Likely)',
        colorClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      },
      {
        term: 'Spring',
        confidence: 'LIKELY',
        label: 'Spring (Likely)',
        colorClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      }
    ]
  }

  return course.offerings.map((off) => {
    let colorClass = 'bg-slate-800 text-slate-300 border-slate-700'
    let label = `${off.term}`

    switch (off.confidence) {
      case 'CONFIRMED':
        colorClass = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
        label = `${off.term} (WebSOC Confirmed)`
        break
      case 'EXPECTED':
        colorClass = 'bg-sky-500/15 text-sky-300 border-sky-500/30'
        label = `${off.term} (Dept Teaching Plan)`
        break
      case 'LIKELY':
        colorClass = 'bg-amber-500/15 text-amber-300 border-amber-500/30'
        label = `${off.term} (Historical Likely)`
        break
      case 'UNKNOWN':
        colorClass = 'bg-slate-800/80 text-slate-400 border-slate-700'
        label = `${off.term} (Unknown)`
        break
    }

    return {
      term: off.term,
      confidence: off.confidence,
      label,
      colorClass
    }
  })
}

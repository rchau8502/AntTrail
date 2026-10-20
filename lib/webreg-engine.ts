/**
 * AntTrail ZotSniper WebReg Tactical Engine
 * Pure mathematical algorithms for waitlist odds calculation, bookmarklet generation,
 * and calendar alarm pre-flight coordination.
 */

export type SectionType = 'Lec' | 'Dis' | 'Lab' | 'Sem'
export type SectionStatus = 'OPEN' | 'Waitlist' | 'FULL'

export interface WebSocSection {
  courseCode: string // 5-digit code e.g. "34010"
  dept: string // e.g. "I&C SCI"
  courseNum: string // e.g. "46"
  courseTitle: string // e.g. "Data Structure Implementation"
  sectionType: SectionType
  sectionNum: string // e.g. "Lec A", "Dis 1"
  instructor: string // e.g. "PATTIS, R."
  time: string // e.g. "M W F 11:00-11:50p"
  place: string // e.g. "BS3 1200"
  maxCapacity: number
  enrolled: number
  waitlistCount: number
  status: SectionStatus
  restrictions?: string
}

export type WaitlistDepartment =
  | 'ICS'
  | 'MATH'
  | 'BIO_SCI'
  | 'ENGINEERING'
  | 'HUMANITIES_SOCSCI'
  | 'GENERAL'

export type WaitlistTiming =
  | 'BEFORE_FEE_DEADLINE'
  | 'WEEK_0'
  | 'WEEK_1'
  | 'WEEK_2'

export interface WaitlistProbabilityParams {
  capacity: number
  waitlistPosition: number
  department: WaitlistDepartment
  timing: WaitlistTiming
}

export interface WaitlistProbabilityReport {
  probability: number // 5 - 99
  tier: 'HIGH' | 'MODERATE' | 'LOW'
  expectedDropCount: number
  expectedDropRatePercent: number
  tacticalAdvice: string
  keyFactors: string[]
}

const DEPARTMENT_BASE_DROP_RATES: Record<WaitlistDepartment, number> = {
  MATH: 0.14,
  HUMANITIES_SOCSCI: 0.12,
  ICS: 0.10,
  ENGINEERING: 0.09,
  GENERAL: 0.10,
  BIO_SCI: 0.08
}

const TIMING_MULTIPLIERS: Record<WaitlistTiming, number> = {
  BEFORE_FEE_DEADLINE: 1.25,
  WEEK_0: 1.00,
  WEEK_1: 0.75,
  WEEK_2: 0.35
}

/**
 * Deterministic mathematical solver for estimating waitlist clearance probability.
 */
export function calculateWaitlistProbability(params: WaitlistProbabilityParams): WaitlistProbabilityReport {
  const { capacity, waitlistPosition, department, timing } = params

  const safeCapacity = Math.max(10, Math.min(1000, capacity || 100))
  const safePosition = Math.max(1, waitlistPosition || 1)

  const baseRate = DEPARTMENT_BASE_DROP_RATES[department] ?? 0.10
  const timingMult = TIMING_MULTIPLIERS[timing] ?? 1.00

  const adjustedRate = Math.max(0.02, Math.min(0.25, baseRate * timingMult))
  const expectedDropCount = Math.max(1, Math.round(safeCapacity * adjustedRate))
  const expectedDropRatePercent = Math.round(adjustedRate * 100)

  let probability = 50

  if (safePosition <= expectedDropCount * 0.7) {
    // Within prime clearance zone
    const ratio = safePosition / Math.max(1, expectedDropCount)
    probability = Math.round(96 - ratio * 20)
  } else if (safePosition <= expectedDropCount * 1.3) {
    // Competitive margin zone
    const extra = safePosition - expectedDropCount * 0.7
    const span = Math.max(1, expectedDropCount * 0.6)
    probability = Math.round(75 - (extra / span) * 35)
  } else {
    // Deep waitlist zone
    const extra = safePosition - expectedDropCount * 1.3
    const span = Math.max(1, expectedDropCount)
    probability = Math.round(Math.max(5, 38 - (extra / span) * 30))
  }

  // Ensure bounded probability
  probability = Math.max(5, Math.min(99, probability))

  let tier: 'HIGH' | 'MODERATE' | 'LOW' = 'MODERATE'
  if (probability >= 75) {
    tier = 'HIGH'
  } else if (probability < 40) {
    tier = 'LOW'
  }

  // Generate tactical advice
  let tacticalAdvice = ''
  const keyFactors: string[] = []

  if (tier === 'HIGH') {
    tacticalAdvice = `High clearance probability (${probability}%). You are within the top ${expectedDropCount} expected drops for ${department}. Maintain your position and check WebReg daily.`
    keyFactors.push(`Your position (#${safePosition}) is well within expected drops (${expectedDropCount} seats).`)
  } else if (tier === 'MODERATE') {
    tacticalAdvice = `Moderate odds (${probability}%). Clearance is likely if fee deadline drop triggers or students rearrange schedules during Week 1. Keep a backup section registered in WebReg.`
    keyFactors.push(`Expected total drops is approximately ${expectedDropCount} seats.`)
  } else {
    tacticalAdvice = `Low probability (${probability}%). Deep waitlist detected (#${safePosition} on ${safeCapacity} seats). We strongly advise switching to an open discussion section or secondary course option.`
    keyFactors.push(`Position #${safePosition} exceeds the projected clearance threshold (${expectedDropCount} drops).`)
  }

  if (timing === 'BEFORE_FEE_DEADLINE') {
    keyFactors.push('Upcoming Fee Payment Deadline will trigger bulk drops for unpaid student records.')
  } else if (timing === 'WEEK_2') {
    keyFactors.push('Week 2 cutoff approaches; enrollment velocity drops sharply after Week 1 Friday.')
  }

  return {
    probability,
    tier,
    expectedDropCount,
    expectedDropRatePercent,
    tacticalAdvice,
    keyFactors
  }
}

/**
 * Generate a safe, client-side WebReg 1-click Bookmarklet.
 * When clicked on the official WebReg portal, it auto-fills the 5-digit course codes into inputs.
 */
export function generateWebRegBookmarklet(courseCodes: string[]): string {
  const validCodes = courseCodes.map((c) => c.replace(/\D/g, '')).filter((c) => c.length === 5)
  const jsonCodes = JSON.stringify(validCodes)

  const script = `(function(){
    var codes = ${jsonCodes};
    var inputs = document.querySelectorAll('input[type="text"], input[name*="course"], input[name*="Code"]');
    var filled = 0;
    if (inputs.length > 0 && codes.length > 0) {
      for (var i = 0; i < Math.min(inputs.length, codes.length); i++) {
        inputs[i].value = codes[i];
        inputs[i].dispatchEvent(new Event('input', { bubbles: true }));
        filled++;
      }
      alert('AntTrail ZotSniper: Populated ' + filled + ' Course Codes into WebReg! Click Send to enroll.');
    } else {
      prompt('AntTrail ZotSniper Course Codes (Ctrl+C to copy):', codes.join(' '));
    }
  })();`

  return `javascript:${encodeURIComponent(script.replace(/\s+/g, ' ').trim())}`
}

/**
 * Generates an iCalendar (.ics) formatted string for the student's enrollment window.
 * Includes a 10-minute prior audio/push alarm.
 */
export function generateEnrollmentIcs(params: {
  title?: string
  windowDate: Date
  courseCodes?: string[]
}): string {
  const { title = 'UCI WebReg Enrollment Window Opens', windowDate, courseCodes = [] } = params

  const startDate = new Date(windowDate)
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1-hour event

  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const dtStart = formatDate(startDate)
  const dtEnd = formatDate(endDate)
  const now = formatDate(new Date())

  const codesDesc = courseCodes.length > 0 ? `Target 5-Digit Codes: ${courseCodes.join(', ')}\\n` : ''

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AntTrail//ZotSniper WebReg Command//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:anttrail-webreg-${startDate.getTime()}@uci.edu`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Anteater WebReg Alert: ${title}`,
    `DESCRIPTION:${codesDesc}Enroll directly at https://www.reg.uci.edu/registrar/soc/webreg.html\\nLog in 5 minutes early to clear Duo 2FA.`,
    'URL:https://www.reg.uci.edu/registrar/soc/webreg.html',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT10M',
    'ACTION:DISPLAY',
    'DESCRIPTION:WebReg Window opens in 10 minutes! Log in and ready your 5-digit course codes.',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')
}

/**
 * Preloaded WebSoc Sections across high-demand UCI courses.
 */
export const SAMPLE_WEBSOC_SECTIONS: WebSocSection[] = [
  {
    courseCode: '34010',
    dept: 'I&C SCI',
    courseNum: '46',
    courseTitle: 'Data Structure Implementation and Analysis',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'PATTIS, R.',
    time: 'M W F 11:00-11:50p',
    place: 'BS3 1200',
    maxCapacity: 250,
    enrolled: 250,
    waitlistCount: 18,
    status: 'FULL',
    restrictions: 'School of ICS majors only'
  },
  {
    courseCode: '34011',
    dept: 'I&C SCI',
    courseNum: '46',
    courseTitle: 'Data Structure Implementation and Analysis',
    sectionType: 'Dis',
    sectionNum: 'Dis 1',
    instructor: 'STAFF',
    time: 'Tu Th 8:00-8:50a',
    place: 'ICS 180',
    maxCapacity: 50,
    enrolled: 50,
    waitlistCount: 6,
    status: 'Waitlist',
    restrictions: 'School of ICS majors only'
  },
  {
    courseCode: '34012',
    dept: 'I&C SCI',
    courseNum: '46',
    courseTitle: 'Data Structure Implementation and Analysis',
    sectionType: 'Dis',
    sectionNum: 'Dis 2',
    instructor: 'STAFF',
    time: 'Tu Th 1:00-1:50p',
    place: 'ICS 180',
    maxCapacity: 50,
    enrolled: 49,
    waitlistCount: 0,
    status: 'OPEN',
    restrictions: 'School of ICS majors only'
  },
  {
    courseCode: '44100',
    dept: 'MATH',
    courseNum: '3A',
    courseTitle: 'Introduction to Linear Algebra',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'SIMONSON, R.',
    time: 'M W F 10:00-10:50a',
    place: 'SH 128',
    maxCapacity: 180,
    enrolled: 180,
    waitlistCount: 12,
    status: 'FULL'
  },
  {
    courseCode: '44101',
    dept: 'MATH',
    courseNum: '3A',
    courseTitle: 'Introduction to Linear Algebra',
    sectionType: 'Dis',
    sectionNum: 'Dis 1',
    instructor: 'TA STAFF',
    time: 'Tu Th 11:00-11:50a',
    place: 'RH 114',
    maxCapacity: 45,
    enrolled: 44,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '35100',
    dept: 'COMPSCI',
    courseNum: '161',
    courseTitle: 'Design and Analysis of Algorithms',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'EPPSTEIN, D.',
    time: 'Tu Th 3:30-4:50p',
    place: 'SSL 228',
    maxCapacity: 200,
    enrolled: 200,
    waitlistCount: 22,
    status: 'FULL',
    restrictions: 'Upper-division ICS majors'
  },
  {
    courseCode: '36050',
    dept: 'STATS',
    courseNum: '67',
    courseTitle: 'Introduction to Probability and Statistics for Computer Science',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'ARMSTRONG, D.',
    time: 'M W F 1:00-1:50p',
    place: 'ELH 100',
    maxCapacity: 220,
    enrolled: 218,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '34000',
    dept: 'I&C SCI',
    courseNum: '33',
    courseTitle: 'Intermediate Programming',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'PATTIS, R.',
    time: 'M W F 9:00-9:50a',
    place: 'DBH 1100',
    maxCapacity: 280,
    enrolled: 280,
    waitlistCount: 15,
    status: 'Waitlist'
  },
  {
    courseCode: '62010',
    dept: 'ECON',
    courseNum: '20A',
    courseTitle: 'Basic Economics I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'SARRAF, G.',
    time: 'Tu Th 12:30-1:50p',
    place: 'BS3 1200',
    maxCapacity: 350,
    enrolled: 348,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '51020',
    dept: 'WRITING',
    courseNum: '60',
    courseTitle: 'Critical Reading and Rhetoric',
    sectionType: 'Lec',
    sectionNum: 'Sec 10',
    instructor: 'STAFF',
    time: 'Tu Th 9:30-10:50a',
    place: 'HH 214',
    maxCapacity: 22,
    enrolled: 22,
    waitlistCount: 3,
    status: 'FULL'
  }
]

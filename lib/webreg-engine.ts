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
    time: 'M W F 11:00-11:50a',
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
    courseCode: '34001',
    dept: 'I&C SCI',
    courseNum: '33',
    courseTitle: 'Intermediate Programming',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'STAFF',
    time: 'Tu Th 10:00-11:50a',
    place: 'ICS 192',
    maxCapacity: 50,
    enrolled: 48,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '34030',
    dept: 'I&C SCI',
    courseNum: '31',
    courseTitle: 'Introduction to Programming',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'ALFARO, S.',
    time: 'Tu Th 9:30-10:50a',
    place: 'DBH 1100',
    maxCapacity: 300,
    enrolled: 300,
    waitlistCount: 42,
    status: 'FULL'
  },
  {
    courseCode: '34035',
    dept: 'I&C SCI',
    courseNum: '32',
    courseTitle: 'Programming with Software Libraries',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'THORNTON, A.',
    time: 'M W F 1:00-1:50p',
    place: 'DBH 1100',
    maxCapacity: 260,
    enrolled: 255,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '34045',
    dept: 'I&C SCI',
    courseNum: '45C',
    courseTitle: 'Programming in C/C++ as a Second Language',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'THORNTON, A.',
    time: 'M W F 10:00-10:50a',
    place: 'ELH 100',
    maxCapacity: 220,
    enrolled: 220,
    waitlistCount: 14,
    status: 'Waitlist'
  },
  {
    courseCode: '34046',
    dept: 'I&C SCI',
    courseNum: '45J',
    courseTitle: 'Programming in Java as a Second Language',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'HERMAN, M.',
    time: 'Tu Th 12:30-1:50p',
    place: 'SSH 100',
    maxCapacity: 180,
    enrolled: 176,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '34051',
    dept: 'I&C SCI',
    courseNum: '51',
    courseTitle: 'Introductory Computer Organization',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BOZDOG, A.',
    time: 'Tu Th 11:00-12:20p',
    place: 'BS3 1200',
    maxCapacity: 240,
    enrolled: 238,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '34053',
    dept: 'I&C SCI',
    courseNum: '53',
    courseTitle: 'Principles in System Design',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'HARRIS, I.',
    time: 'M W F 2:00-2:50p',
    place: 'DBH 1100',
    maxCapacity: 200,
    enrolled: 200,
    waitlistCount: 8,
    status: 'Waitlist'
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
    courseCode: '35122',
    dept: 'COMPSCI',
    courseNum: '122A',
    courseTitle: 'Introduction to Data Management',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'LI, C.',
    time: 'Tu Th 2:00-3:20p',
    place: 'ELH 100',
    maxCapacity: 250,
    enrolled: 248,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '35141',
    dept: 'COMPSCI',
    courseNum: '141',
    courseTitle: 'Concepts in Programming Languages',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'KLEFSTAD, R.',
    time: 'M W F 11:00-11:50a',
    place: 'ELH 100',
    maxCapacity: 220,
    enrolled: 220,
    waitlistCount: 10,
    status: 'Waitlist'
  },
  {
    courseCode: '35143',
    dept: 'COMPSCI',
    courseNum: '143A',
    courseTitle: 'Principles of Operating Systems',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BIC, L.',
    time: 'M W F 3:00-3:50p',
    place: 'BS3 1200',
    maxCapacity: 240,
    enrolled: 240,
    waitlistCount: 19,
    status: 'FULL'
  },
  {
    courseCode: '35171',
    dept: 'COMPSCI',
    courseNum: '171',
    courseTitle: 'Introduction to Artificial Intelligence',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'LATHROP, R.',
    time: 'Tu Th 12:30-1:50p',
    place: 'DBH 1100',
    maxCapacity: 240,
    enrolled: 235,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '35178',
    dept: 'COMPSCI',
    courseNum: '178',
    courseTitle: 'Machine Learning and Data-Mining',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'IHLEER, A.',
    time: 'Tu Th 9:30-10:50a',
    place: 'BS3 1200',
    maxCapacity: 220,
    enrolled: 220,
    waitlistCount: 25,
    status: 'FULL'
  },
  {
    courseCode: '35175',
    dept: 'COMPSCI',
    courseNum: '175',
    courseTitle: 'Project in Artificial Intelligence',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'MAJUMDER, A.',
    time: 'Tu Th 11:00-12:20p',
    place: 'DBH 1420',
    maxCapacity: 60,
    enrolled: 60,
    waitlistCount: 7,
    status: 'Waitlist'
  },
  {
    courseCode: '36143',
    dept: 'IN4MATX',
    courseNum: '43',
    courseTitle: 'Introduction to Software Engineering',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'VAN DER HOEK, A.',
    time: 'Tu Th 11:00-12:20p',
    place: 'ELH 100',
    maxCapacity: 200,
    enrolled: 198,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '36115',
    dept: 'IN4MATX',
    courseNum: '115',
    courseTitle: 'Software Testing, Analysis, and Quality Assurance',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'ZIV, H.',
    time: 'M W F 1:00-1:50p',
    place: 'DBH 1420',
    maxCapacity: 100,
    enrolled: 100,
    waitlistCount: 7,
    status: 'Waitlist'
  },
  {
    courseCode: '36121',
    dept: 'IN4MATX',
    courseNum: '121',
    courseTitle: 'Software Design I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'HADAR, E.',
    time: 'M W F 10:00-10:50a',
    place: 'DBH 1200',
    maxCapacity: 120,
    enrolled: 118,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '36131',
    dept: 'IN4MATX',
    courseNum: '131',
    courseTitle: 'Human-Computer Interaction',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'MARK, G.',
    time: 'Tu Th 2:00-3:20p',
    place: 'DBH 1200',
    maxCapacity: 120,
    enrolled: 118,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '37025',
    dept: 'GDIM',
    courseNum: '25',
    courseTitle: 'Game Design Methods',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'ALEXANDER, C.',
    time: 'M W F 10:00-10:50a',
    place: 'DBH 1200',
    maxCapacity: 140,
    enrolled: 140,
    waitlistCount: 11,
    status: 'FULL'
  },
  {
    courseCode: '37031',
    dept: 'GDIM',
    courseNum: '31',
    courseTitle: 'Gamelab I',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'DENGLER, C.',
    time: 'Tu Th 1:00-3:50p',
    place: 'DBH 1412',
    maxCapacity: 40,
    enrolled: 39,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '44020',
    dept: 'MATH',
    courseNum: '2A',
    courseTitle: 'Calculus I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'PLUTA, R.',
    time: 'M W F 8:00-8:50a',
    place: 'BS3 1200',
    maxCapacity: 320,
    enrolled: 310,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '44025',
    dept: 'MATH',
    courseNum: '2B',
    courseTitle: 'Calculus II',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'LEHMAN, J.',
    time: 'M W F 12:00-12:50p',
    place: 'BS3 1200',
    maxCapacity: 350,
    enrolled: 350,
    waitlistCount: 35,
    status: 'FULL'
  },
  {
    courseCode: '44026',
    dept: 'MATH',
    courseNum: '2B',
    courseTitle: 'Calculus II',
    sectionType: 'Dis',
    sectionNum: 'Dis 1',
    instructor: 'TA STAFF',
    time: 'Tu Th 1:00-1:50p',
    place: 'RH 114',
    maxCapacity: 45,
    enrolled: 45,
    waitlistCount: 8,
    status: 'Waitlist'
  },
  {
    courseCode: '44028',
    dept: 'MATH',
    courseNum: '2D',
    courseTitle: 'Multivariable Calculus I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'YOUSSEFPANAH, C.',
    time: 'M W F 9:00-9:50a',
    place: 'SH 128',
    maxCapacity: 220,
    enrolled: 214,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '44029',
    dept: 'MATH',
    courseNum: '2E',
    courseTitle: 'Multivariable Calculus II',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'HUBER, G.',
    time: 'M W F 2:00-2:50p',
    place: 'RH 101',
    maxCapacity: 160,
    enrolled: 160,
    waitlistCount: 9,
    status: 'Waitlist'
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
    courseCode: '44034',
    dept: 'MATH',
    courseNum: '3D',
    courseTitle: 'Elementary Differential Equations',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'SMITH, B.',
    time: 'Tu Th 12:30-1:50p',
    place: 'ELH 100',
    maxCapacity: 200,
    enrolled: 195,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '44130',
    dept: 'MATH',
    courseNum: '130A',
    courseTitle: 'Probability I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'WAN, F.',
    time: 'M W F 11:00-11:50a',
    place: 'RH 108',
    maxCapacity: 90,
    enrolled: 90,
    waitlistCount: 5,
    status: 'Waitlist'
  },
  {
    courseCode: '44131',
    dept: 'MATH',
    courseNum: '130B',
    courseTitle: 'Probability II',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'WAN, F.',
    time: 'M W F 1:00-1:50p',
    place: 'RH 108',
    maxCapacity: 85,
    enrolled: 82,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '36007',
    dept: 'STATS',
    courseNum: '7',
    courseTitle: 'Basic Statistics',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BALDI, P.',
    time: 'Tu Th 8:00-9:20a',
    place: 'BS3 1200',
    maxCapacity: 300,
    enrolled: 292,
    waitlistCount: 0,
    status: 'OPEN'
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
    courseCode: '36120',
    dept: 'STATS',
    courseNum: '120A',
    courseTitle: 'Introduction to Probability and Statistics I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'SHEN, Y.',
    time: 'M W F 9:00-9:50a',
    place: 'SSL 228',
    maxCapacity: 150,
    enrolled: 150,
    waitlistCount: 14,
    status: 'FULL'
  },
  {
    courseCode: '36121',
    dept: 'STATS',
    courseNum: '120B',
    courseTitle: 'Introduction to Probability and Statistics II',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'GULICK, H.',
    time: 'Tu Th 11:00-12:20p',
    place: 'SSH 100',
    maxCapacity: 140,
    enrolled: 136,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '05093',
    dept: 'BIO SCI',
    courseNum: '93',
    courseTitle: 'From DNA to Organisms',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'TRIO, M. / GREEN, D.',
    time: 'M W F 9:00-9:50a',
    place: 'BS3 1200',
    maxCapacity: 420,
    enrolled: 420,
    waitlistCount: 48,
    status: 'FULL',
    restrictions: 'Bio Sci / Health Sci majors priority'
  },
  {
    courseCode: '05094',
    dept: 'BIO SCI',
    courseNum: '94',
    courseTitle: 'From Organisms to Ecosystems',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'CAMPBELL, N.',
    time: 'Tu Th 11:00-12:20p',
    place: 'BS3 1200',
    maxCapacity: 400,
    enrolled: 390,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '05097',
    dept: 'BIO SCI',
    courseNum: '97',
    courseTitle: 'Genetics',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'WUNDERLICH, Z.',
    time: 'M W F 1:00-1:50p',
    place: 'ELH 100',
    maxCapacity: 350,
    enrolled: 350,
    waitlistCount: 28,
    status: 'FULL'
  },
  {
    courseCode: '05098',
    dept: 'BIO SCI',
    courseNum: '98',
    courseTitle: 'Biochemistry',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'KADANDALE, P.',
    time: 'M W F 10:00-10:50a',
    place: 'BS3 1200',
    maxCapacity: 380,
    enrolled: 376,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '05099',
    dept: 'BIO SCI',
    courseNum: '99',
    courseTitle: 'Molecular Biology',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'THORPE, C.',
    time: 'Tu Th 2:00-3:20p',
    place: 'ELH 100',
    maxCapacity: 320,
    enrolled: 320,
    waitlistCount: 17,
    status: 'Waitlist'
  },
  {
    courseCode: '05100',
    dept: 'BIO SCI',
    courseNum: '100',
    courseTitle: 'Scientific Writing',
    sectionType: 'Lec',
    sectionNum: 'Sec 1',
    instructor: 'STAFF',
    time: 'M W 3:00-4:20p',
    place: 'RH 114',
    maxCapacity: 25,
    enrolled: 25,
    waitlistCount: 5,
    status: 'FULL'
  },
  {
    courseCode: '40010',
    dept: 'CHEM',
    courseNum: '1A',
    courseTitle: 'General Chemistry',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'ARASASINGHAM, R.',
    time: 'M W F 11:00-11:50a',
    place: 'BS3 1200',
    maxCapacity: 450,
    enrolled: 450,
    waitlistCount: 52,
    status: 'FULL'
  },
  {
    courseCode: '40011',
    dept: 'CHEM',
    courseNum: '1A',
    courseTitle: 'General Chemistry',
    sectionType: 'Dis',
    sectionNum: 'Dis 1',
    instructor: 'TA STAFF',
    time: 'Tu Th 8:00-8:50a',
    place: 'RH 101',
    maxCapacity: 50,
    enrolled: 50,
    waitlistCount: 7,
    status: 'Waitlist'
  },
  {
    courseCode: '40015',
    dept: 'CHEM',
    courseNum: '1B',
    courseTitle: 'General Chemistry II',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'MANDELL, A.',
    time: 'M W F 1:00-1:50p',
    place: 'BS3 1200',
    maxCapacity: 400,
    enrolled: 394,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '40018',
    dept: 'CHEM',
    courseNum: '1C',
    courseTitle: 'General Chemistry III',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'PATTERSON, P.',
    time: 'Tu Th 9:30-10:50a',
    place: 'ELH 100',
    maxCapacity: 380,
    enrolled: 378,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '40019',
    dept: 'CHEM',
    courseNum: '1LC',
    courseTitle: 'General Chemistry Laboratory',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'EDWARDS, K.',
    time: 'M W 1:00-3:50p',
    place: 'RH 412',
    maxCapacity: 28,
    enrolled: 28,
    waitlistCount: 4,
    status: 'FULL'
  },
  {
    courseCode: '40510',
    dept: 'CHEM',
    courseNum: '51A',
    courseTitle: 'Organic Chemistry I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'KING, S.',
    time: 'M W F 8:00-8:50a',
    place: 'ELH 100',
    maxCapacity: 360,
    enrolled: 360,
    waitlistCount: 31,
    status: 'FULL'
  },
  {
    courseCode: '40512',
    dept: 'CHEM',
    courseNum: '51B',
    courseTitle: 'Organic Chemistry II',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'PRONIN, S.',
    time: 'Tu Th 12:30-1:50p',
    place: 'BS3 1200',
    maxCapacity: 340,
    enrolled: 335,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '40515',
    dept: 'CHEM',
    courseNum: '51LB',
    courseTitle: 'Organic Chemistry Laboratory',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'LINK, R.',
    time: 'Tu Th 2:00-4:50p',
    place: 'FRH 3110',
    maxCapacity: 24,
    enrolled: 24,
    waitlistCount: 3,
    status: 'Waitlist'
  },
  {
    courseCode: '47030',
    dept: 'PHYSICS',
    courseNum: '3A',
    courseTitle: 'Basic Physics I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'GUERRA, N.',
    time: 'Tu Th 11:00-12:20p',
    place: 'PSCB 120',
    maxCapacity: 260,
    enrolled: 258,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '47070',
    dept: 'PHYSICS',
    courseNum: '7C',
    courseTitle: 'Classical Physics I (Mechanics)',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BIAN, J.',
    time: 'M W F 12:00-12:50p',
    place: 'PSCB 100',
    maxCapacity: 300,
    enrolled: 300,
    waitlistCount: 21,
    status: 'FULL'
  },
  {
    courseCode: '47071',
    dept: 'PHYSICS',
    courseNum: '7LC',
    courseTitle: 'Classical Physics Laboratory',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'STAFF',
    time: 'Tu 2:00-4:50p',
    place: 'FRH 2111',
    maxCapacity: 24,
    enrolled: 24,
    waitlistCount: 3,
    status: 'Waitlist'
  },
  {
    courseCode: '47075',
    dept: 'PHYSICS',
    courseNum: '7D',
    courseTitle: 'Classical Physics II (Electricity & Magnetism)',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'RAGAN, M.',
    time: 'M W F 2:00-2:50p',
    place: 'PSCB 100',
    maxCapacity: 280,
    enrolled: 275,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '47078',
    dept: 'PHYSICS',
    courseNum: '7E',
    courseTitle: 'Classical Physics III (Waves, Optics, Thermo)',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'DENNIN, M.',
    time: 'Tu Th 9:30-10:50a',
    place: 'PSCB 100',
    maxCapacity: 240,
    enrolled: 238,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '18031',
    dept: 'EECS',
    courseNum: '31',
    courseTitle: 'Introduction to Digital Systems',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'GAJSKI, D.',
    time: 'Tu Th 12:30-1:50p',
    place: 'EH 1200',
    maxCapacity: 180,
    enrolled: 180,
    waitlistCount: 16,
    status: 'FULL'
  },
  {
    courseCode: '18070',
    dept: 'EECS',
    courseNum: '70A',
    courseTitle: 'Network Analysis I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'GREEN, M.',
    time: 'M W F 10:00-10:50a',
    place: 'EH 1200',
    maxCapacity: 160,
    enrolled: 155,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '18071',
    dept: 'EECS',
    courseNum: '70B',
    courseTitle: 'Network Analysis II',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'CAPOLINO, F.',
    time: 'M W F 1:00-1:50p',
    place: 'EH 1200',
    maxCapacity: 140,
    enrolled: 138,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '18112',
    dept: 'EECS',
    courseNum: '112',
    courseTitle: 'Organization of Digital Computers',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BAGHERZADEH, N.',
    time: 'Tu Th 2:00-3:20p',
    place: 'ELH 110',
    maxCapacity: 140,
    enrolled: 138,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '15010',
    dept: 'ENGRMAE',
    courseNum: '10',
    courseTitle: 'Introduction to Engineering Computations',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'COPPOLA, G.',
    time: 'M W F 9:00-9:50a',
    place: 'EH 1200',
    maxCapacity: 200,
    enrolled: 195,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '15030',
    dept: 'ENGRMAE',
    courseNum: '30',
    courseTitle: 'Statics',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BOBROV, V.',
    time: 'Tu Th 9:30-10:50a',
    place: 'EH 1200',
    maxCapacity: 220,
    enrolled: 220,
    waitlistCount: 14,
    status: 'Waitlist'
  },
  {
    courseCode: '15052',
    dept: 'ENGRMAE',
    courseNum: '52',
    courseTitle: 'Computer-Aided Design',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'MCCARTHY, J.',
    time: 'Tu Th 1:00-3:50p',
    place: 'ECT 123',
    maxCapacity: 40,
    enrolled: 40,
    waitlistCount: 6,
    status: 'FULL'
  },
  {
    courseCode: '15106',
    dept: 'ENGRMAE',
    courseNum: '106',
    courseTitle: 'Mechanical Systems Laboratory',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'PAPADOPOULOS, J.',
    time: 'M W 2:00-4:50p',
    place: 'EG 2100',
    maxCapacity: 30,
    enrolled: 29,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '14020',
    dept: 'ENGRCEE',
    courseNum: '20',
    courseTitle: 'Introduction to Computer Programming for Civil Engineers',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'SUN, L.',
    time: 'M W F 11:00-11:50a',
    place: 'MSTB 118',
    maxCapacity: 100,
    enrolled: 96,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '11001',
    dept: 'BME',
    courseNum: '1',
    courseTitle: 'Introduction to Biomedical Engineering',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BRODY, J.',
    time: 'Tu Th 11:00-12:20p',
    place: 'SH 128',
    maxCapacity: 150,
    enrolled: 145,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '11050',
    dept: 'BME',
    courseNum: '50A',
    courseTitle: 'Cell and Tissue Engineering',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'FALLAHA, M.',
    time: 'Tu Th 2:00-3:20p',
    place: 'MSTB 120',
    maxCapacity: 80,
    enrolled: 78,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '12040',
    dept: 'CBE',
    courseNum: '40A',
    courseTitle: 'Chemical Engineering Fundamentals',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'PLATT, M.',
    time: 'M W F 1:00-1:50p',
    place: 'MSTB 122',
    maxCapacity: 90,
    enrolled: 88,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '19050',
    dept: 'MSE',
    courseNum: '50',
    courseTitle: 'Introduction to Materials Science and Engineering',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'MANGOLINI, L.',
    time: 'Tu Th 3:30-4:50p',
    place: 'EH 1200',
    maxCapacity: 180,
    enrolled: 177,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '62010',
    dept: 'ECON',
    courseNum: '20A',
    courseTitle: 'Basic Economics I (Microeconomics)',
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
    courseCode: '62015',
    dept: 'ECON',
    courseNum: '20B',
    courseTitle: 'Basic Economics II (Macroeconomics)',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BRANCH, W.',
    time: 'M W F 10:00-10:50a',
    place: 'ELH 100',
    maxCapacity: 320,
    enrolled: 320,
    waitlistCount: 18,
    status: 'FULL'
  },
  {
    courseCode: '62100',
    dept: 'ECON',
    courseNum: '100A',
    courseTitle: 'Intermediate Economics I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'AGGARWAL, R.',
    time: 'Tu Th 9:30-10:50a',
    place: 'SSL 228',
    maxCapacity: 200,
    enrolled: 195,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '62122',
    dept: 'ECON',
    courseNum: '122A',
    courseTitle: 'Applied Econometrics I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'CHERNOZUKOV, V.',
    time: 'M W F 1:00-1:50p',
    place: 'SSPA 1100',
    maxCapacity: 140,
    enrolled: 140,
    waitlistCount: 8,
    status: 'Waitlist'
  },
  {
    courseCode: '08001',
    dept: 'MGMT',
    courseNum: '1',
    courseTitle: 'Introduction to Business',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'LEONARD, R.',
    time: 'M W F 2:00-2:50p',
    place: 'SB1 1200',
    maxCapacity: 220,
    enrolled: 220,
    waitlistCount: 15,
    status: 'FULL'
  },
  {
    courseCode: '08030',
    dept: 'MGMT',
    courseNum: '30A',
    courseTitle: 'Principles of Accounting I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'DEVINE, P.',
    time: 'Tu Th 11:00-12:20p',
    place: 'SB1 1200',
    maxCapacity: 200,
    enrolled: 196,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '08035',
    dept: 'MGMT',
    courseNum: '30B',
    courseTitle: 'Principles of Accounting II',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'GUTIERREZ, M.',
    time: 'M W F 11:00-11:50a',
    place: 'SB1 1200',
    maxCapacity: 180,
    enrolled: 180,
    waitlistCount: 9,
    status: 'Waitlist'
  },
  {
    courseCode: '08102',
    dept: 'MGMT',
    courseNum: '102',
    courseTitle: 'Managing Organizational Behavior',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'PEARCE, J.',
    time: 'Tu Th 3:30-4:50p',
    place: 'SB1 1100',
    maxCapacity: 160,
    enrolled: 158,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '08105',
    dept: 'MGMT',
    courseNum: '105',
    courseTitle: 'Principles of Marketing',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'GILLY, M.',
    time: 'M W F 1:00-1:50p',
    place: 'SB1 1100',
    maxCapacity: 180,
    enrolled: 180,
    waitlistCount: 12,
    status: 'FULL'
  },
  {
    courseCode: '68009',
    dept: 'PSYCH',
    courseNum: '9A',
    courseTitle: 'Psychology Fundamentals',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'HECKERMAN, D.',
    time: 'Tu Th 9:30-10:50a',
    place: 'BS3 1200',
    maxCapacity: 380,
    enrolled: 375,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '68010',
    dept: 'PSYCH',
    courseNum: '9B',
    courseTitle: 'Psychology Fundamentals II',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'LILIENTHAL, L.',
    time: 'M W F 12:00-12:50p',
    place: 'ELH 100',
    maxCapacity: 340,
    enrolled: 340,
    waitlistCount: 18,
    status: 'FULL'
  },
  {
    courseCode: '68102',
    dept: 'PSYCH',
    courseNum: '102C',
    courseTitle: 'Abnormal Psychology',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'LEWIS, K.',
    time: 'M W F 3:00-3:50p',
    place: 'SSPA 1100',
    maxCapacity: 200,
    enrolled: 198,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '67009',
    dept: 'PSCI',
    courseNum: '9',
    courseTitle: 'Introduction to Psychology',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'PETERS, E.',
    time: 'Tu Th 11:00-12:20p',
    place: 'SSL 228',
    maxCapacity: 220,
    enrolled: 220,
    waitlistCount: 11,
    status: 'Waitlist'
  },
  {
    courseCode: '67021',
    dept: 'POL SCI',
    courseNum: '21A',
    courseTitle: 'Introduction to American Government',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'PETRACCA, M.',
    time: 'Tu Th 2:00-3:20p',
    place: 'BS3 1200',
    maxCapacity: 350,
    enrolled: 346,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '67051',
    dept: 'POL SCI',
    courseNum: '51A',
    courseTitle: 'Introduction to Politics Around the World',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'MONRO, K.',
    time: 'M W F 11:00-11:50a',
    place: 'SSPA 1100',
    maxCapacity: 240,
    enrolled: 240,
    waitlistCount: 15,
    status: 'FULL'
  },
  {
    courseCode: '69001',
    dept: 'SOCIOL',
    courseNum: '1',
    courseTitle: 'Introduction to Sociology',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'SCHUSTER, T.',
    time: 'M W F 1:00-1:50p',
    place: 'BS3 1200',
    maxCapacity: 320,
    enrolled: 312,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '60002',
    dept: 'ANTHRO',
    courseNum: '2A',
    courseTitle: 'Introduction to Sociocultural Anthropology',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'DOUGLAS, T.',
    time: 'Tu Th 8:00-9:20a',
    place: 'ELH 100',
    maxCapacity: 380,
    enrolled: 380,
    waitlistCount: 22,
    status: 'Waitlist'
  },
  {
    courseCode: '50008',
    dept: 'SOCECOL',
    courseNum: 'E8',
    courseTitle: 'Environmental Analysis and Design',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'STOKOLS, D.',
    time: 'Tu Th 12:30-1:50p',
    place: 'SE2 1304',
    maxCapacity: 200,
    enrolled: 194,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '50007',
    dept: 'CRIM',
    courseNum: 'C7',
    courseTitle: 'Introduction to Criminology, Law and Society',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'COLE, S.',
    time: 'M W F 10:00-10:50a',
    place: 'BS3 1200',
    maxCapacity: 340,
    enrolled: 340,
    waitlistCount: 19,
    status: 'FULL'
  },
  {
    courseCode: '50004',
    dept: 'UPPP',
    courseNum: '4',
    courseTitle: 'Introduction to Urban Studies',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BASOLO, V.',
    time: 'Tu Th 9:30-10:50a',
    place: 'SE2 1304',
    maxCapacity: 160,
    enrolled: 156,
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
  },
  {
    courseCode: '51021',
    dept: 'WRITING',
    courseNum: '60',
    courseTitle: 'Critical Reading and Rhetoric',
    sectionType: 'Lec',
    sectionNum: 'Sec 12',
    instructor: 'STAFF',
    time: 'M W 1:00-2:20p',
    place: 'HH 214',
    maxCapacity: 22,
    enrolled: 20,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '51039',
    dept: 'WRITING',
    courseNum: '39C',
    courseTitle: 'Argument and Research',
    sectionType: 'Lec',
    sectionNum: 'Sec 04',
    instructor: 'STAFF',
    time: 'Tu Th 11:00-12:20p',
    place: 'HH 226',
    maxCapacity: 22,
    enrolled: 22,
    waitlistCount: 4,
    status: 'Waitlist'
  },
  {
    courseCode: '51040',
    dept: 'WRITING',
    courseNum: '40',
    courseTitle: 'Writing for Multilingual Students',
    sectionType: 'Lec',
    sectionNum: 'Sec 01',
    instructor: 'STAFF',
    time: 'M W F 10:00-10:50a',
    place: 'HH 242',
    maxCapacity: 20,
    enrolled: 19,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '51101',
    dept: 'WRITING',
    courseNum: '101W',
    courseTitle: 'Upper-Division Writing for Engineers',
    sectionType: 'Lec',
    sectionNum: 'Sec 02',
    instructor: 'BROWN, S.',
    time: 'Tu Th 3:30-4:50p',
    place: 'HH 230',
    maxCapacity: 22,
    enrolled: 22,
    waitlistCount: 6,
    status: 'FULL'
  },
  {
    courseCode: '24010',
    dept: 'ENGLISH',
    courseNum: '10',
    courseTitle: 'Introduction to Creative Writing',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'MILES, J.',
    time: 'Tu Th 2:00-3:20p',
    place: 'HH 178',
    maxCapacity: 120,
    enrolled: 120,
    waitlistCount: 10,
    status: 'FULL'
  },
  {
    courseCode: '24028',
    dept: 'ENGLISH',
    courseNum: '28A',
    courseTitle: 'Poetics and Interpretation',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'HUGHES, E.',
    time: 'M W F 1:00-1:50p',
    place: 'HH 118',
    maxCapacity: 90,
    enrolled: 88,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '28021',
    dept: 'HISTORY',
    courseNum: '21A',
    courseTitle: 'World History I',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'POMERANZ, K.',
    time: 'M W F 11:00-11:50a',
    place: 'SSH 100',
    maxCapacity: 260,
    enrolled: 255,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '28040',
    dept: 'HISTORY',
    courseNum: '40A',
    courseTitle: 'Colonial America',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'THORNE, T.',
    time: 'Tu Th 12:30-1:50p',
    place: 'HH 178',
    maxCapacity: 180,
    enrolled: 175,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '30001',
    dept: 'PHILOS',
    courseNum: '1',
    courseTitle: 'Introduction to Philosophy',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'PRITCHARD, D.',
    time: 'Tu Th 9:30-10:50a',
    place: 'BS3 1200',
    maxCapacity: 300,
    enrolled: 295,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '30004',
    dept: 'PHILOS',
    courseNum: '4',
    courseTitle: 'Introduction to Ethics',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'NELSON, J.',
    time: 'M W F 1:00-1:50p',
    place: 'ELH 100',
    maxCapacity: 250,
    enrolled: 250,
    waitlistCount: 12,
    status: 'Waitlist'
  },
  {
    courseCode: '22040',
    dept: 'ART HIST',
    courseNum: '40A',
    courseTitle: 'Ancient to Medieval Art',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'NISBET, P.',
    time: 'Tu Th 3:30-4:50p',
    place: 'HG 1800',
    maxCapacity: 160,
    enrolled: 158,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '02001',
    dept: 'ART',
    courseNum: '1A',
    courseTitle: 'Basic Drawing',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'TRENT, S.',
    time: 'Tu Th 9:00-11:50a',
    place: 'ART 252',
    maxCapacity: 25,
    enrolled: 25,
    waitlistCount: 5,
    status: 'FULL'
  },
  {
    courseCode: '02008',
    dept: 'ART',
    courseNum: '8',
    courseTitle: 'Basic Digital Photography',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'CHOI, E.',
    time: 'M W 1:00-3:50p',
    place: 'CAC 3001',
    maxCapacity: 24,
    enrolled: 24,
    waitlistCount: 4,
    status: 'Waitlist'
  },
  {
    courseCode: '02020',
    dept: 'ART',
    courseNum: '20',
    courseTitle: 'Basic Sculpture',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'RIVERA, M.',
    time: 'Tu Th 1:00-3:50p',
    place: 'ART 161',
    maxCapacity: 22,
    enrolled: 21,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '03010',
    dept: 'DRAMA',
    courseNum: '10',
    courseTitle: 'Introduction to Theatre',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'COHEN, R.',
    time: 'Tu Th 11:00-12:20p',
    place: 'WSH 100',
    maxCapacity: 220,
    enrolled: 214,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '03015',
    dept: 'DRAMA',
    courseNum: '15',
    courseTitle: 'Performance and Culture',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'MORGAN, T.',
    time: 'M W F 11:00-11:50a',
    place: 'CAC 3100',
    maxCapacity: 120,
    enrolled: 116,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '04003',
    dept: 'MUSIC',
    courseNum: '3',
    courseTitle: 'Music Appreciation',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BEATTY, D.',
    time: 'M W F 2:00-2:50p',
    place: 'WSH 100',
    maxCapacity: 200,
    enrolled: 198,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '04016',
    dept: 'MUSIC',
    courseNum: '16D',
    courseTitle: 'History of Rock',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'RODRIGUEZ, A.',
    time: 'Tu Th 3:30-4:50p',
    place: 'BS3 1200',
    maxCapacity: 350,
    enrolled: 350,
    waitlistCount: 38,
    status: 'FULL'
  },
  {
    courseCode: '01003',
    dept: 'DANCE',
    courseNum: '3',
    courseTitle: 'Movement and Sound in Culture',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'SHARP, L.',
    time: 'M W 9:00-10:20a',
    place: 'MSTB 118',
    maxCapacity: 100,
    enrolled: 95,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '01014',
    dept: 'DANCE',
    courseNum: '14',
    courseTitle: 'Sociocultural Modern Dance',
    sectionType: 'Lab',
    sectionNum: 'Lab 1',
    instructor: 'ADAMS, K.',
    time: 'Tu Th 10:00-11:50a',
    place: 'PSTU 1100',
    maxCapacity: 30,
    enrolled: 29,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '72001',
    dept: 'PUBHLTH',
    courseNum: '1',
    courseTitle: 'Principles of Public Health',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BODEN-ALBALA, B.',
    time: 'Tu Th 12:30-1:50p',
    place: 'BS3 1200',
    maxCapacity: 320,
    enrolled: 320,
    waitlistCount: 16,
    status: 'Waitlist'
  },
  {
    courseCode: '72070',
    dept: 'PUBHLTH',
    courseNum: '70',
    courseTitle: 'Global Health Economics',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'MORENO, E.',
    time: 'M W F 11:00-11:50a',
    place: 'ELH 100',
    maxCapacity: 240,
    enrolled: 235,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '74001',
    dept: 'PHRMSCI',
    courseNum: '1',
    courseTitle: 'Introduction to Pharmacology',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'HIRSCH, J.',
    time: 'M W F 1:00-1:50p',
    place: 'SH 128',
    maxCapacity: 180,
    enrolled: 178,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '70110',
    dept: 'NUR SCI',
    courseNum: '110',
    courseTitle: 'Foundations of Nursing Practice',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'BAKER, C.',
    time: 'Tu Th 9:00-10:50a',
    place: 'BH 120',
    maxCapacity: 60,
    enrolled: 60,
    waitlistCount: 8,
    status: 'FULL'
  },
  {
    courseCode: '20010',
    dept: 'EDUC',
    courseNum: '10',
    courseTitle: 'Educational Research and Design',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'CONKLIN, H.',
    time: 'Tu Th 2:00-3:20p',
    place: 'SE2 1304',
    maxCapacity: 150,
    enrolled: 146,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '65061',
    dept: 'CHC/LAT',
    courseNum: '61',
    courseTitle: 'Chicana/Latino Studies',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'CASANOVA, S.',
    time: 'M W F 10:00-10:50a',
    place: 'SSPA 1100',
    maxCapacity: 180,
    enrolled: 175,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '61050',
    dept: 'ASIANAM',
    courseNum: '50',
    courseTitle: 'Asian American Communities',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'LEE, J.',
    time: 'Tu Th 11:00-12:20p',
    place: 'HH 178',
    maxCapacity: 160,
    enrolled: 158,
    waitlistCount: 0,
    status: 'OPEN'
  },
  {
    courseCode: '21040',
    dept: 'AFAM',
    courseNum: '40A',
    courseTitle: 'African American Studies',
    sectionType: 'Lec',
    sectionNum: 'Lec A',
    instructor: 'WARREN, N.',
    time: 'M W F 2:00-2:50p',
    place: 'SSH 100',
    maxCapacity: 180,
    enrolled: 180,
    waitlistCount: 10,
    status: 'Waitlist'
  }
]

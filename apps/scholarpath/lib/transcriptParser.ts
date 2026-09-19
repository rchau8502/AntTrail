export interface ParsedCourse {
  raw: string
  subject: string
  courseNumber: string
  code: string
  title: string
  units: number
  grade: string
  gradePoints: number | null
  countsInGpa: boolean
  isPassing: boolean
  category?: 'english' | 'math' | 'arts_humanities' | 'social_sciences' | 'physical_biological' | 'oral_comm' | 'critical_thinking' | 'other'
}

export interface GeRequirementStatus {
  name: string
  required: number
  completed: number
  isSatisfied: boolean
  matchingCourses: string[]
}

export interface TranscriptAuditResult {
  courses: ParsedCourse[]
  totalUnits: number
  gradedUnits: number
  totalGradePoints: number
  gpa: number
  progress60Units: number
  detectedSchool?: string | null
  ucSevenCoursePattern: {
    englishComp: GeRequirementStatus
    mathQuant: GeRequirementStatus
    breadthAreas: GeRequirementStatus
    isSatisfied: boolean
  }
  csuGoldenFour: {
    a1OralComm: GeRequirementStatus
    a2WrittenComm: GeRequirementStatus
    a3CriticalThinking: GeRequirementStatus
    b4MathQuant: GeRequirementStatus
    isSatisfied: boolean
  }
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  'D+': 1.3,
  D: 1.0,
  'D-': 0.7,
  F: 0.0
}

function detectCategory(subject: string, courseNumber: string): ParsedCourse['category'] {
  const s = subject.toUpperCase().trim()
  const num = courseNumber.toUpperCase().trim()

  // Oral Comm
  if (['COMM', 'SPEECH'].includes(s) && ['1', '01', '1A', '3', '03', '4', '11'].some((prefix) => num.startsWith(prefix))) {
    return 'oral_comm'
  }

  // Critical Thinking
  if (
    (s === 'ENGL' && ['1B', '1C', '2', '02', '4', '7'].some((prefix) => num.startsWith(prefix))) ||
    (s === 'PHIL' && ['106', '110', '12', '20', '8', '9'].some((prefix) => num.startsWith(prefix)))
  ) {
    return 'critical_thinking'
  }

  // English Comp
  if (['ENGL', 'ENGLISH', 'WRIT', 'ESL'].includes(s)) {
    return 'english'
  }

  // Math / Stats
  if (['MATH', 'MATHEMATICS', 'STAT', 'STATISTICS', 'MATHS'].includes(s)) {
    return 'math'
  }

  // Arts & Humanities
  if (
    [
      'HIST',
      'HISTORY',
      'PHIL',
      'PHILOSOPHY',
      'HUM',
      'HUMANITIES',
      'ART',
      'ARTH',
      'MUSIC',
      'MUS',
      'THEA',
      'THEATRE',
      'DANCE',
      'SPAN',
      'SPANISH',
      'FREN',
      'FRENCH',
      'GERM',
      'CHIN',
      'JAPN',
      'LIT',
      'LITERATURE',
      'REL',
      'RELS'
    ].includes(s)
  ) {
    return 'arts_humanities'
  }

  // Social & Behavioral Sciences
  if (
    [
      'PSYC',
      'PSYCHOLOGY',
      'SOC',
      'SOCIOLOGY',
      'ECON',
      'ECONOMICS',
      'POLS',
      'POLISCI',
      'GOV',
      'ANTH',
      'ANTHROPOLOGY',
      'GEOG',
      'GEOGRAPHY',
      'COMM',
      'JOURN',
      'ETHN',
      'AFRAM',
      'CHICANO',
      'ASAM'
    ].includes(s)
  ) {
    return 'social_sciences'
  }

  // Physical & Biological Sciences
  if (
    [
      'BIOL',
      'BIOLOGY',
      'CHEM',
      'CHEMISTRY',
      'PHYS',
      'PHYSICS',
      'ASTR',
      'ASTRONOMY',
      'GEOL',
      'GEOLOGY',
      'ANAT',
      'ANATOMY',
      'PHYSIOL',
      'MICR',
      'MICROBIOLOGY',
      'ENVS',
      'EVST'
    ].includes(s)
  ) {
    return 'physical_biological'
  }

  return 'other'
}

export function parseCourseLine(line: string): ParsedCourse | null {
  const trimmed = line.trim()
  if (!trimmed || trimmed.length < 4) return null

  const codeRegex = /\b([A-Za-z]{2,8})\s*[-_]?\s*([0-9]{1,4}[A-Za-z]{0,2})\b/
  const match = trimmed.match(codeRegex)
  if (!match) return null

  const subject = match[1].toUpperCase()
  const courseNumber = match[2].toUpperCase()
  const code = `${subject} ${courseNumber}`

  // Work on the remainder after course code
  const codeIdx = trimmed.indexOf(match[0])
  const afterCode = trimmed.slice(codeIdx + match[0].length)

  const gradeRegex = /\b(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D-|D|F|P|CR|NP|NC|W|IP)\b/i
  const gradeMatch = afterCode.match(gradeRegex)
  const grade = gradeMatch ? gradeMatch[1].toUpperCase() : 'P'

  // Look for decimal unit first e.g. 4.0, 5.0, 3.5; then single digit with or without unit label
  const decimalUnitsRegex = /\b([0-9]\.[0-9]{1,2})\b/
  const explicitUnitsRegex = /\b([0-9](?:\.[0-9]{1,2})?)\s*(?:units?|cr|credits?)\b/i
  const fallbackUnitsRegex = /\b([0-9])\b/

  const unitMatch =
    afterCode.match(decimalUnitsRegex) ||
    afterCode.match(explicitUnitsRegex) ||
    afterCode.match(fallbackUnitsRegex)

  let units = unitMatch ? parseFloat(unitMatch[1]) : 3.0
  if (units < 0.5 || units > 12) {
    units = 3.0
  }

  const gradePoints = GRADE_POINTS[grade] ?? null
  const countsInGpa = gradePoints != null
  const isPassing = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'P', 'CR'].includes(grade)
  const category = detectCategory(subject, courseNumber)

  let title = afterCode
    .replace(new RegExp(`\\b${grade}\\b`, 'i'), '')
    .replace(unitMatch ? unitMatch[0] : '', '')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()

  if (!title) {
    title = code
  }

  return {
    raw: trimmed,
    subject,
    courseNumber,
    code,
    title,
    units,
    grade,
    gradePoints,
    countsInGpa,
    isPassing,
    category
  }
}

export function parseTranscriptText(text: string): TranscriptAuditResult {
  const lines = text.split(/\r?\n/)
  const courses: ParsedCourse[] = []
  const seenCodes = new Set<string>()

  for (const line of lines) {
    const parsed = parseCourseLine(line)
    if (parsed) {
      const key = `${parsed.code}::${parsed.grade}::${parsed.units}`
      if (!seenCodes.has(key)) {
        seenCodes.add(key)
        courses.push(parsed)
      }
    }
  }

  let totalUnits = 0
  let gradedUnits = 0
  let totalGradePoints = 0

  for (const course of courses) {
    if (course.isPassing || course.countsInGpa) {
      totalUnits += course.units
    }
    if (course.countsInGpa && course.gradePoints != null) {
      gradedUnits += course.units
      totalGradePoints += course.units * course.gradePoints
    }
  }

  const gpa = gradedUnits > 0 ? Math.round((totalGradePoints / gradedUnits) * 100) / 100 : 0.0
  const progress60Units = Math.min(100, Math.round((totalUnits / 60) * 100))

  const passingCourses = courses.filter((course) => course.isPassing)

  // In UC admissions, English composition requirement is 2 courses:
  // Can be english comp or critical thinking (written by English/Writ dept)
  const ucEnglishCourses = passingCourses.filter(
    (course) => course.category === 'english' || (course.category === 'critical_thinking' && ['ENGL', 'ENGLISH', 'WRIT'].includes(course.subject))
  )
  const mathCourses = passingCourses.filter((course) => course.category === 'math')
  const artsCourses = passingCourses.filter((course) => course.category === 'arts_humanities')
  const socialCourses = passingCourses.filter((course) => course.category === 'social_sciences')
  const scienceCourses = passingCourses.filter((course) => course.category === 'physical_biological')

  const breadthCategories = [
    { name: 'Arts & Humanities', courses: artsCourses },
    { name: 'Social Sciences', courses: socialCourses },
    { name: 'Physical & Biological Sciences', courses: scienceCourses }
  ].filter((group) => group.courses.length > 0)

  const totalBreadthCount = artsCourses.length + socialCourses.length + scienceCourses.length
  const distinctBreadthAreas = breadthCategories.length

  const ucEnglishComp: GeRequirementStatus = {
    name: '2 English Composition Courses',
    required: 2,
    completed: Math.min(2, ucEnglishCourses.length),
    isSatisfied: ucEnglishCourses.length >= 2,
    matchingCourses: ucEnglishCourses.map((c) => c.code)
  }

  const ucMathQuant: GeRequirementStatus = {
    name: '1 Mathematical Concepts Course',
    required: 1,
    completed: Math.min(1, mathCourses.length),
    isSatisfied: mathCourses.length >= 1,
    matchingCourses: mathCourses.map((c) => c.code)
  }

  const ucBreadthAreas: GeRequirementStatus = {
    name: '4 Courses across at least 2 GE Areas',
    required: 4,
    completed: Math.min(4, totalBreadthCount),
    isSatisfied: totalBreadthCount >= 4 && distinctBreadthAreas >= 2,
    matchingCourses: [...artsCourses, ...socialCourses, ...scienceCourses].map((c) => c.code)
  }

  const ucSatisfied = ucEnglishComp.isSatisfied && ucMathQuant.isSatisfied && ucBreadthAreas.isSatisfied

  // CSU Golden Four
  const oralCourses = passingCourses.filter((course) => course.category === 'oral_comm')
  const csuWrittenCourses = passingCourses.filter((course) => course.category === 'english')
  const critCourses = passingCourses.filter((course) => course.category === 'critical_thinking')

  const csuA1: GeRequirementStatus = {
    name: 'A1 Oral Communication',
    required: 1,
    completed: Math.min(1, oralCourses.length),
    isSatisfied: oralCourses.length >= 1,
    matchingCourses: oralCourses.map((c) => c.code)
  }

  const csuA2: GeRequirementStatus = {
    name: 'A2 Written Communication',
    required: 1,
    completed: Math.min(1, csuWrittenCourses.length),
    isSatisfied: csuWrittenCourses.length >= 1,
    matchingCourses: csuWrittenCourses.map((c) => c.code)
  }

  const csuA3: GeRequirementStatus = {
    name: 'A3 Critical Thinking',
    required: 1,
    completed: Math.min(1, critCourses.length),
    isSatisfied: critCourses.length >= 1,
    matchingCourses: critCourses.map((c) => c.code)
  }

  const csuB4: GeRequirementStatus = {
    name: 'B4 Quantitative Reasoning / Math',
    required: 1,
    completed: Math.min(1, mathCourses.length),
    isSatisfied: mathCourses.length >= 1,
    matchingCourses: mathCourses.map((c) => c.code)
  }

  const csuSatisfied = csuA1.isSatisfied && csuA2.isSatisfied && csuA3.isSatisfied && csuB4.isSatisfied

  const detectedSchool = detectSourceSchool(text)

  return {
    courses,
    totalUnits,
    gradedUnits,
    totalGradePoints: Math.round(totalGradePoints * 100) / 100,
    gpa,
    progress60Units,
    detectedSchool,
    ucSevenCoursePattern: {
      englishComp: ucEnglishComp,
      mathQuant: ucMathQuant,
      breadthAreas: ucBreadthAreas,
      isSatisfied: ucSatisfied
    },
    csuGoldenFour: {
      a1OralComm: csuA1,
      a2WrittenComm: csuA2,
      a3CriticalThinking: csuA3,
      b4MathQuant: csuB4,
      isSatisfied: csuSatisfied
    }
  }
}

const KNOWN_COLLEGES: Record<string, string> = {
  'santa monica': 'Santa Monica College',
  'de anza': 'De Anza College',
  'pasadena city': 'Pasadena City College',
  'orange coast': 'Orange Coast College',
  'el camino': 'El Camino College',
  'foothill': 'Foothill College',
  'riverside city': 'Riverside City College',
  'long beach city': 'Long Beach City College',
  'fullerton': 'Fullerton College',
  'diablo valley': 'Diablo Valley College',
  'cerritos': 'Cerritos College',
  'irvine valley': 'Irvine Valley College',
  'saddleback': 'Saddleback College',
  'glendale community': 'Glendale Community College',
  'san diego mesa': 'San Diego Mesa College',
  'mt. san antonio': 'Mt. San Antonio College',
  'mt san antonio': 'Mt. San Antonio College'
}

export function detectSourceSchool(text: string): string | null {
  const lower = text.toLowerCase()
  for (const [pattern, fullName] of Object.entries(KNOWN_COLLEGES)) {
    if (lower.includes(pattern)) {
      return fullName
    }
  }
  return null
}


import { TARGET_CAMPUSES } from './catalog'
import { getTransferGuarantee, type TransferGuaranteeInfo } from './admissionsGuidance'

export interface CampusAdmissionProfile {
  name: string
  segment: 'UC' | 'CSU' | 'Private'
  transferAdmitRate: number
  transferGpaP25: number
  transferGpaP75: number
  freshmanAdmitRate: number
  freshmanGpaP25: number
  freshmanGpaP75: number
  avgNetPrice: number
  medianEarnings: number
}

export const CAMPUS_ADMISSION_PROFILES: Record<string, CampusAdmissionProfile> = {
  'UC Berkeley': {
    name: 'UC Berkeley',
    segment: 'UC',
    transferAdmitRate: 25.0,
    transferGpaP25: 3.82,
    transferGpaP75: 4.0,
    freshmanAdmitRate: 11.6,
    freshmanGpaP25: 3.89,
    freshmanGpaP75: 4.0,
    avgNetPrice: 18450,
    medianEarnings: 86400
  },
  UCLA: {
    name: 'UCLA',
    segment: 'UC',
    transferAdmitRate: 24.0,
    transferGpaP25: 3.83,
    transferGpaP75: 4.0,
    freshmanAdmitRate: 8.8,
    freshmanGpaP25: 3.9,
    freshmanGpaP75: 4.0,
    avgNetPrice: 15724,
    medianEarnings: 82500
  },
  'UC San Diego': {
    name: 'UC San Diego',
    segment: 'UC',
    transferAdmitRate: 56.0,
    transferGpaP25: 3.56,
    transferGpaP75: 3.93,
    freshmanAdmitRate: 24.7,
    freshmanGpaP25: 3.8,
    freshmanGpaP75: 4.0,
    avgNetPrice: 16800,
    medianEarnings: 79200
  },
  'UC Irvine': {
    name: 'UC Irvine',
    segment: 'UC',
    transferAdmitRate: 43.5,
    transferGpaP25: 3.55,
    transferGpaP75: 3.92,
    freshmanAdmitRate: 21.0,
    freshmanGpaP25: 3.75,
    freshmanGpaP75: 4.0,
    avgNetPrice: 14200,
    medianEarnings: 74800
  },
  'UC Santa Barbara': {
    name: 'UC Santa Barbara',
    segment: 'UC',
    transferAdmitRate: 58.0,
    transferGpaP25: 3.52,
    transferGpaP75: 3.89,
    freshmanAdmitRate: 25.8,
    freshmanGpaP25: 3.75,
    freshmanGpaP75: 4.0,
    avgNetPrice: 17200,
    medianEarnings: 73100
  },
  'UC Davis': {
    name: 'UC Davis',
    segment: 'UC',
    transferAdmitRate: 56.5,
    transferGpaP25: 3.45,
    transferGpaP75: 3.88,
    freshmanAdmitRate: 41.9,
    freshmanGpaP25: 3.65,
    freshmanGpaP75: 4.0,
    avgNetPrice: 16100,
    medianEarnings: 75200
  },
  'UC Santa Cruz': {
    name: 'UC Santa Cruz',
    segment: 'UC',
    transferAdmitRate: 65.0,
    transferGpaP25: 3.25,
    transferGpaP75: 3.75,
    freshmanAdmitRate: 47.1,
    freshmanGpaP25: 3.45,
    freshmanGpaP75: 3.92,
    avgNetPrice: 17900,
    medianEarnings: 68500
  },
  'UC Riverside': {
    name: 'UC Riverside',
    segment: 'UC',
    transferAdmitRate: 68.0,
    transferGpaP25: 3.05,
    transferGpaP75: 3.65,
    freshmanAdmitRate: 68.5,
    freshmanGpaP25: 3.35,
    freshmanGpaP75: 3.85,
    avgNetPrice: 13800,
    medianEarnings: 67300
  },
  'UC Merced': {
    name: 'UC Merced',
    segment: 'UC',
    transferAdmitRate: 62.0,
    transferGpaP25: 2.95,
    transferGpaP75: 3.52,
    freshmanAdmitRate: 88.0,
    freshmanGpaP25: 3.1,
    freshmanGpaP75: 3.65,
    avgNetPrice: 12500,
    medianEarnings: 61400
  },
  'Cal Poly San Luis Obispo': {
    name: 'Cal Poly San Luis Obispo',
    segment: 'CSU',
    transferAdmitRate: 16.5,
    transferGpaP25: 3.55,
    transferGpaP75: 3.95,
    freshmanAdmitRate: 29.0,
    freshmanGpaP25: 3.85,
    freshmanGpaP75: 4.0,
    avgNetPrice: 19800,
    medianEarnings: 82100
  },
  'San Diego State University': {
    name: 'San Diego State University',
    segment: 'CSU',
    transferAdmitRate: 32.0,
    transferGpaP25: 3.35,
    transferGpaP75: 3.82,
    freshmanAdmitRate: 38.0,
    freshmanGpaP25: 3.55,
    freshmanGpaP75: 3.95,
    avgNetPrice: 14500,
    medianEarnings: 66900
  },
  'San Jose State University': {
    name: 'San Jose State University',
    segment: 'CSU',
    transferAdmitRate: 64.0,
    transferGpaP25: 3.15,
    transferGpaP75: 3.7,
    freshmanAdmitRate: 75.0,
    freshmanGpaP25: 3.25,
    freshmanGpaP75: 3.8,
    avgNetPrice: 15200,
    medianEarnings: 79800
  },
  'Cal State Long Beach': {
    name: 'Cal State Long Beach',
    segment: 'CSU',
    transferAdmitRate: 45.0,
    transferGpaP25: 3.25,
    transferGpaP75: 3.75,
    freshmanAdmitRate: 40.0,
    freshmanGpaP25: 3.4,
    freshmanGpaP75: 3.9,
    avgNetPrice: 11900,
    medianEarnings: 65400
  },
  'Cal Poly Pomona': {
    name: 'Cal Poly Pomona',
    segment: 'CSU',
    transferAdmitRate: 62.0,
    transferGpaP25: 3.1,
    transferGpaP75: 3.65,
    freshmanAdmitRate: 55.0,
    freshmanGpaP25: 3.3,
    freshmanGpaP75: 3.85,
    avgNetPrice: 13200,
    medianEarnings: 71200
  },
  'Cal State Fullerton': {
    name: 'Cal State Fullerton',
    segment: 'CSU',
    transferAdmitRate: 58.0,
    transferGpaP25: 3.15,
    transferGpaP75: 3.68,
    freshmanAdmitRate: 67.0,
    freshmanGpaP25: 3.25,
    freshmanGpaP75: 3.8,
    avgNetPrice: 8900,
    medianEarnings: 62800
  },
  'San Francisco State University': {
    name: 'San Francisco State University',
    segment: 'CSU',
    transferAdmitRate: 78.0,
    transferGpaP25: 2.85,
    transferGpaP75: 3.5,
    freshmanAdmitRate: 84.0,
    freshmanGpaP25: 3.0,
    freshmanGpaP75: 3.65,
    avgNetPrice: 14200,
    medianEarnings: 63100
  },
  'Cal State Northridge': {
    name: 'Cal State Northridge',
    segment: 'CSU',
    transferAdmitRate: 72.0,
    transferGpaP25: 2.8,
    transferGpaP75: 3.45,
    freshmanAdmitRate: 88.0,
    freshmanGpaP25: 2.95,
    freshmanGpaP75: 3.6,
    avgNetPrice: 9500,
    medianEarnings: 59700
  },
  'Stanford University': {
    name: 'Stanford University',
    segment: 'Private',
    transferAdmitRate: 2.1,
    transferGpaP25: 3.92,
    transferGpaP75: 4.0,
    freshmanAdmitRate: 3.9,
    freshmanGpaP25: 3.95,
    freshmanGpaP75: 4.0,
    avgNetPrice: 19500,
    medianEarnings: 112000
  },
  'University of Southern California': {
    name: 'University of Southern California',
    segment: 'Private',
    transferAdmitRate: 23.5,
    transferGpaP25: 3.72,
    transferGpaP75: 3.98,
    freshmanAdmitRate: 9.9,
    freshmanGpaP25: 3.85,
    freshmanGpaP75: 4.0,
    avgNetPrice: 38500,
    medianEarnings: 89500
  },
  'Santa Clara University': {
    name: 'Santa Clara University',
    segment: 'Private',
    transferAdmitRate: 48.0,
    transferGpaP25: 3.45,
    transferGpaP75: 3.88,
    freshmanAdmitRate: 45.0,
    freshmanGpaP25: 3.65,
    freshmanGpaP75: 3.95,
    avgNetPrice: 42100,
    medianEarnings: 93400
  }
}

export type ChancingTier = 'guaranteed' | 'safety' | 'target' | 'reach'

export interface CampusAdmissionEvaluation {
  campus: string
  segment: 'UC' | 'CSU' | 'Private'
  cohort: 'transfer' | 'freshman'
  tier: ChancingTier
  tierLabel: string
  tierColor: 'emerald' | 'sky' | 'amber' | 'rose'
  admitRate: number
  gpaP25: number
  gpaP75: number
  studentGpa: number | null
  gpaDelta: number | null
  gpaPosition: 'below_25' | 'mid_50' | 'above_75' | 'unspecified'
  tagInfo: TransferGuaranteeInfo | null
  netPrice: number | null
  medianEarnings: number | null
  summary: string
  keyAdvice: string
}

export interface PortfolioHealth {
  totalCount: number
  guaranteedCount: number
  safetyCount: number
  targetCount: number
  reachCount: number
  balanceScore: number
  status: 'balanced' | 'top_heavy' | 'conservative' | 'under_diversified' | 'empty'
  statusLabel: string
  summary: string
  recommendations: string[]
}

export interface PresetPortfolio {
  id: string
  title: string
  subtitle: string
  campuses: string[]
}

export const PRESET_PORTFOLIOS: PresetPortfolio[] = [
  {
    id: 'comprehensive_uc',
    title: 'UC Systemwide Balanced',
    subtitle: 'Flagships, mid-tier targets, and guaranteed TAG options',
    campuses: ['UC Berkeley', 'UCLA', 'UC San Diego', 'UC Irvine', 'UC Davis', 'UC Santa Barbara']
  },
  {
    id: 'top_tech_stem',
    title: 'California Tech & STEM',
    subtitle: 'Top software and engineering pipelines across UC and CSU',
    campuses: ['UC Berkeley', 'UCLA', 'UC San Diego', 'UC Irvine', 'Cal Poly San Luis Obispo', 'San Jose State University']
  },
  {
    id: 'csu_career_poly',
    title: 'Top CSU Career & Poly',
    subtitle: 'High-ROI polytechnics and top state universities',
    campuses: ['Cal Poly San Luis Obispo', 'San Diego State University', 'San Jose State University', 'Cal Poly Pomona', 'Cal State Long Beach']
  },
  {
    id: 'socal_publics',
    title: 'Southern California Hub',
    subtitle: 'Top commuting and residential universities in greater SoCal',
    campuses: ['UCLA', 'UC Irvine', 'UC San Diego', 'Cal State Long Beach', 'Cal Poly Pomona', 'Cal State Fullerton']
  },
  {
    id: 'norcal_corridor',
    title: 'Northern California Corridor',
    subtitle: 'Silicon Valley and Bay Area tech and research engines',
    campuses: ['UC Berkeley', 'UC Davis', 'UC Santa Cruz', 'San Jose State University', 'San Francisco State University']
  }
]

export interface ApplicationDeadline {
  id: string
  title: string
  dateDisplay: string
  deadlineMonth: number
  deadlineDay: number
  appliesTo: 'transfer' | 'freshman' | 'both'
  critical: boolean
  description: string
  actionItem: string
}

export const APPLICATION_DEADLINES: ApplicationDeadline[] = [
  {
    id: 'tag_submission',
    title: 'UC TAG Application Filing Window',
    dateDisplay: 'September 1 – 30',
    deadlineMonth: 9,
    deadlineDay: 30,
    appliesTo: 'transfer',
    critical: true,
    description: 'Submit your online Transfer Admission Guarantee (TAG) application for ONE participating UC campus.',
    actionItem: 'Pick your preferred TAG campus and confirm GPA + 30 transferable units requirement.'
  },
  {
    id: 'uc_app_filing',
    title: 'UC Application Priority Filing Window',
    dateDisplay: 'October 1 – November 30',
    deadlineMonth: 11,
    deadlineDay: 30,
    appliesTo: 'both',
    critical: true,
    description: 'Official filing period for undergraduate admission to all nine UC undergraduate campuses.',
    actionItem: 'Finalize personal insight questions (PIQs) and submit applications to all selected UC campuses.'
  },
  {
    id: 'csu_apply_filing',
    title: 'Cal State Apply Priority Filing Window',
    dateDisplay: 'October 1 – November 30',
    deadlineMonth: 11,
    deadlineDay: 30,
    appliesTo: 'both',
    critical: true,
    description: 'Priority application filing period across all 23 California State University campuses.',
    actionItem: 'Ensure ADT status is declared if completing an AA-T or AS-T degree at your CCC.'
  },
  {
    id: 'transfer_academic_update',
    title: 'UC Transfer Academic Update (TAU)',
    dateDisplay: 'January 8 – January 31',
    deadlineMonth: 1,
    deadlineDay: 31,
    appliesTo: 'transfer',
    critical: true,
    description: 'Mandatory update logging official fall grades and verifying in-progress spring coursework.',
    actionItem: 'Log in to your UC application and submit final fall term grades before Jan 31.'
  },
  {
    id: 'csu_supplemental',
    title: 'CSU Supplemental & Academic Updates',
    dateDisplay: 'January 15 – Mid-February',
    deadlineMonth: 2,
    deadlineDay: 15,
    appliesTo: 'transfer',
    critical: false,
    description: 'Campus-specific portals require grade updates (e.g. SJSU, SDSU, Cal Poly SLO).',
    actionItem: 'Check email for student portal invitations from each applied CSU campus.'
  },
  {
    id: 'financial_aid_priority',
    title: 'FAFSA & California Dream Act Priority',
    dateDisplay: 'March 2 Priority Deadline',
    deadlineMonth: 3,
    deadlineDay: 2,
    appliesTo: 'both',
    critical: true,
    description: 'Priority deadline to guarantee Cal Grant, UC Blue and Gold Plan, and Middle Class Scholarship.',
    actionItem: 'Submit FAFSA or CADAA and ensure your CCC or high school uploaded your Cal Grant GPA verification.'
  },
  {
    id: 'freshman_decision_window',
    title: 'Freshman Decisions & Financial Aid Offers',
    dateDisplay: 'March 1 – March 31',
    deadlineMonth: 3,
    deadlineDay: 31,
    appliesTo: 'freshman',
    critical: false,
    description: 'Freshman admission decisions and preliminary financial aid award letters released.',
    actionItem: 'Compare financial aid packages and schedule campus open-house visits.'
  },
  {
    id: 'transfer_decision_window',
    title: 'Transfer Admission Decisions Released',
    dateDisplay: 'April 1 – April 30',
    deadlineMonth: 4,
    deadlineDay: 30,
    appliesTo: 'transfer',
    critical: false,
    description: 'UC and CSU transfer admission decisions released rolling throughout the month of April.',
    actionItem: 'Review portal admission letters and track any conditional admission requirements.'
  },
  {
    id: 'freshman_sir_deadline',
    title: 'Freshman Statement of Intent to Register (SIR)',
    dateDisplay: 'May 1',
    deadlineMonth: 5,
    deadlineDay: 1,
    appliesTo: 'freshman',
    critical: true,
    description: 'Final binding deadline for high school admits to accept an admission offer and submit deposit.',
    actionItem: 'Accept offer, pay enrollment deposit, and submit campus housing application.'
  },
  {
    id: 'transfer_sir_deadline',
    title: 'Transfer Statement of Intent to Register (SIR)',
    dateDisplay: 'June 1',
    deadlineMonth: 6,
    deadlineDay: 1,
    appliesTo: 'transfer',
    critical: true,
    description: 'Final deadline for transfer admits to accept their offer and commit to their university.',
    actionItem: 'Accept offer, pay deposit, and register for transfer orientation and advising.'
  },
  {
    id: 'final_transcripts_due',
    title: 'Official Final Transcripts Due',
    dateDisplay: 'July 1 – July 15',
    deadlineMonth: 7,
    deadlineDay: 1,
    appliesTo: 'both',
    critical: true,
    description: 'Destination universities require official final transcripts with spring grades posted.',
    actionItem: 'Order electronic transcripts from all CCCs and high schools attended directly to university admissions.'
  }
]

export function evaluateCampusAdmission(params: {
  campus: string
  studentGpa: number | null
  cohort: 'transfer' | 'freshman'
  focus: string
}): CampusAdmissionEvaluation {
  const { campus, studentGpa, cohort, focus } = params

  const targetEntry = TARGET_CAMPUSES.find((entry) => entry.name === campus)
  const segment = (targetEntry?.segment ?? 'UC') as 'UC' | 'CSU' | 'Private'

  const profile = CAMPUS_ADMISSION_PROFILES[campus] ?? {
    name: campus,
    segment,
    transferAdmitRate: segment === 'UC' ? 45.0 : 60.0,
    transferGpaP25: 3.3,
    transferGpaP75: 3.8,
    freshmanAdmitRate: segment === 'UC' ? 30.0 : 55.0,
    freshmanGpaP25: 3.5,
    freshmanGpaP75: 3.9,
    avgNetPrice: 15000,
    medianEarnings: 68000
  }

  const admitRate = cohort === 'transfer' ? profile.transferAdmitRate : profile.freshmanAdmitRate
  const gpaP25 = cohort === 'transfer' ? profile.transferGpaP25 : profile.freshmanGpaP25
  const gpaP75 = cohort === 'transfer' ? profile.transferGpaP75 : profile.freshmanGpaP75

  const tagInfo = cohort === 'transfer' ? getTransferGuarantee(campus, focus) : null

  let gpaDelta: number | null = null
  let gpaPosition: 'below_25' | 'mid_50' | 'above_75' | 'unspecified' = 'unspecified'

  if (studentGpa != null && studentGpa > 0) {
    const midGpa = (gpaP25 + gpaP75) / 2
    gpaDelta = Number((studentGpa - midGpa).toFixed(2))

    if (studentGpa < gpaP25) {
      gpaPosition = 'below_25'
    } else if (studentGpa > gpaP75) {
      gpaPosition = 'above_75'
    } else {
      gpaPosition = 'mid_50'
    }
  }

  // Determine Tier
  let tier: ChancingTier = 'target'
  let tierLabel = 'Target'
  let tierColor: 'emerald' | 'sky' | 'amber' | 'rose' = 'sky'
  let summary = ''
  let keyAdvice = ''

  // 1. Guaranteed check (TAG for CCC transfers)
  if (
    cohort === 'transfer' &&
    tagInfo?.eligible &&
    tagInfo.type === 'TAG' &&
    studentGpa != null &&
    tagInfo.minGpa != null &&
    studentGpa >= tagInfo.minGpa
  ) {
    tier = 'guaranteed'
    tierLabel = 'Guaranteed (TAG)'
    tierColor = 'emerald'
    summary = `Guaranteed transfer admission locked in with your ${studentGpa.toFixed(2)} GPA (minimum required: ${tagInfo.minGpa.toFixed(1)}).`
    keyAdvice = `Submit your TAG application in September (Sept 1-30) and maintain above ${tagInfo.minGpa.toFixed(1)} GPA through spring.`
  } else if (cohort === 'transfer' && tagInfo?.type === 'ADT') {
    // CSU ADT pathway
    if (studentGpa != null && studentGpa >= gpaP75 && admitRate >= 45) {
      tier = 'safety'
      tierLabel = 'Likely (ADT Boost)'
      tierColor = 'emerald'
      summary = `High probability of admission with your ${studentGpa.toFixed(2)} GPA and CSU Associate Degree for Transfer advantage.`
      keyAdvice = 'Declare your ADT on Cal State Apply and complete your 60 semester units by end of spring.'
    } else if (studentGpa != null && studentGpa >= gpaP25) {
      tier = 'target'
      tierLabel = 'Target (ADT)'
      tierColor = 'sky'
      summary = `Competitive candidate within the admit band. ADT provides a 0.1-0.2 GPA bump for local consideration.`
      keyAdvice = 'Finish the Golden Four and ensure your CCC certifies your degree completion by spring.'
    } else {
      tier = 'reach'
      tierLabel = 'Reach (Impacted)'
      tierColor = 'rose'
      summary = `Impacted campus. Your GPA is below the typical middle 50% admit range (${gpaP25.toFixed(2)} - ${gpaP75.toFixed(2)}).`
      keyAdvice = 'Maximize spring grades and consider alternative local CSU options with lower impaction thresholds.'
    }
  } else {
    // Standard Chancing for non-guaranteed UCs, CSUs, and Freshmen
    const isUltraSelective = admitRate < 15 || ['UC Berkeley', 'UCLA', 'Stanford University'].includes(campus)

    if (studentGpa != null && studentGpa > 0) {
      if (studentGpa < gpaP25 || isUltraSelective) {
        tier = 'reach'
        tierLabel = isUltraSelective ? 'Reach (High Selectivity)' : 'Reach'
        tierColor = 'rose'
        summary = isUltraSelective
          ? `${campus} conducts holistic review with an admit rate of ${admitRate.toFixed(1)}%. Even top GPAs face competitive pools.`
          : `Your ${studentGpa.toFixed(2)} GPA is currently below the 25th percentile admit threshold (${gpaP25.toFixed(2)}).`
        keyAdvice = isUltraSelective
          ? 'Focus on distinctive personal insights / essays, rigor, and strong major preparation to stand out in holistic review.'
          : 'Strengthen prerequisite grades this semester and apply broadly to target and guaranteed campuses.'
      } else if (studentGpa >= gpaP75 && admitRate >= 45) {
        tier = 'safety'
        tierLabel = 'Likely / Safety'
        tierColor = 'emerald'
        summary = `Your ${studentGpa.toFixed(2)} GPA is above the 75th percentile (${gpaP75.toFixed(2)}) with a favorable ${admitRate.toFixed(1)}% admit rate.`
        keyAdvice = 'Ensure all basic general education and core major prep requirements are completed on schedule.'
      } else {
        tier = 'target'
        tierLabel = 'Target'
        tierColor = 'sky'
        summary = `Your ${studentGpa.toFixed(2)} GPA lands comfortably inside the middle 50% admit band (${gpaP25.toFixed(2)} - ${gpaP75.toFixed(2)}).`
        keyAdvice = 'Keep major prerequisite course grades strong and submit a comprehensive application.'
      }
    } else {
      // If student hasn't entered GPA yet
      if (isUltraSelective) {
        tier = 'reach'
        tierLabel = 'Reach (Selective)'
        tierColor = 'rose'
        summary = `${campus} is highly selective at ${admitRate.toFixed(1)}% acceptance rate.`
        keyAdvice = 'Enter your GPA or audit your transcript to see your personalized positioning.'
      } else if (admitRate >= 60) {
        tier = 'safety'
        tierLabel = 'Accessible'
        tierColor = 'emerald'
        summary = `${campus} offers accessible pathways with a ${admitRate.toFixed(1)}% acceptance rate.`
        keyAdvice = 'Enter your GPA to confirm your placement above the 75th percentile.'
      } else {
        tier = 'target'
        tierLabel = 'Target'
        tierColor = 'sky'
        summary = `Typical admit GPA range is ${gpaP25.toFixed(2)} - ${gpaP75.toFixed(2)} with a ${admitRate.toFixed(1)}% admit rate.`
        keyAdvice = 'Enter your GPA or audit your transcript to check your standing.'
      }
    }
  }

  return {
    campus,
    segment,
    cohort,
    tier,
    tierLabel,
    tierColor,
    admitRate,
    gpaP25,
    gpaP75,
    studentGpa,
    gpaDelta,
    gpaPosition,
    tagInfo,
    netPrice: profile.avgNetPrice,
    medianEarnings: profile.medianEarnings,
    summary,
    keyAdvice
  }
}

export function calculatePortfolioHealth(evaluations: CampusAdmissionEvaluation[]): PortfolioHealth {
  const totalCount = evaluations.length

  if (totalCount === 0) {
    return {
      totalCount: 0,
      guaranteedCount: 0,
      safetyCount: 0,
      targetCount: 0,
      reachCount: 0,
      balanceScore: 0,
      status: 'empty',
      statusLabel: 'Empty Portfolio',
      summary: 'Add at least 3 to 6 campuses to evaluate your portfolio balance.',
      recommendations: ['Select target campuses or click a preset template above to build your list.']
    }
  }

  const guaranteedCount = evaluations.filter((e) => e.tier === 'guaranteed').length
  const safetyCount = evaluations.filter((e) => e.tier === 'safety').length
  const targetCount = evaluations.filter((e) => e.tier === 'target').length
  const reachCount = evaluations.filter((e) => e.tier === 'reach').length

  const secureCount = guaranteedCount + safetyCount

  const recommendations: string[] = []
  let balanceScore = 50
  let status: 'balanced' | 'top_heavy' | 'conservative' | 'under_diversified' = 'balanced'
  let statusLabel = 'Balanced Portfolio'
  let summary = ''

  if (totalCount < 3) {
    status = 'under_diversified'
    statusLabel = 'Under-Diversified'
    balanceScore = 40
    summary = `You currently have ${totalCount} campus${totalCount === 1 ? '' : 'es'} selected. Admissions counselors strongly advise applying to 4–8 campuses.`
    recommendations.push('Add more campuses across different selectivity tiers to protect against unexpected variance.')
  } else if (reachCount === totalCount) {
    status = 'top_heavy'
    statusLabel = 'Critically Top-Heavy'
    balanceScore = 25
    summary = `All ${totalCount} selected campuses are Reaches. Without a Target or Guaranteed safety net, you face substantial rejection risk.`
    recommendations.push('Urgent: Add at least 1 UC TAG campus (e.g. UC Davis, Irvine, Santa Barbara) or a solid Likely/Safety.')
    recommendations.push('Include 2 Target campuses where your GPA is solidly in the middle 50% admit band.')
  } else if (reachCount >= totalCount * 0.7 && secureCount === 0) {
    status = 'top_heavy'
    statusLabel = 'Top-Heavy Risk'
    balanceScore = 45
    summary = `Over 70% of your list is in the Reach category with zero guaranteed or high-probability safeties.`
    recommendations.push('Add a guaranteed UC TAG campus or a high-acceptance CSU campus to secure your transition.')
  } else if (secureCount >= totalCount * 0.8 && reachCount === 0) {
    status = 'conservative'
    statusLabel = 'Conservative'
    balanceScore = 70
    summary = `You have strong safety coverage with high odds, but you have no Reach or stretch campuses.`
    recommendations.push('Consider adding 1 or 2 aspirational Reach campuses (e.g. UCLA, Berkeley, or UCSD) to test your ceiling.')
  } else {
    status = 'balanced'
    statusLabel = 'Well-Balanced Portfolio'
    balanceScore = 90

    if (guaranteedCount > 0) {
      balanceScore = 98
      summary = `Excellent portfolio architecture. You have ${guaranteedCount} Guaranteed TAG, ${targetCount} Target, and ${reachCount} Reach campus${reachCount === 1 ? '' : 'es'}.`
      recommendations.push('Your guaranteed TAG covers your downside while your target and reach applications maximize opportunity.')
    } else {
      summary = `Good tier diversification with ${safetyCount} Likely, ${targetCount} Target, and ${reachCount} Reach options.`
      recommendations.push('If eligible for UC TAG, lock in one guaranteed campus in September to raise your certainty.')
    }

    if (totalCount >= 4 && totalCount <= 8) {
      recommendations.push('Your portfolio size (4–8 campuses) fits the ideal sweet spot for focused, high-quality applications.')
    }
  }

  return {
    totalCount,
    guaranteedCount,
    safetyCount,
    targetCount,
    reachCount,
    balanceScore: Math.min(100, Math.max(0, balanceScore)),
    status,
    statusLabel,
    summary,
    recommendations
  }
}

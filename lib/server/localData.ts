import {
  COMMUNITY_COLLEGES,
  FRESHMAN_DISCIPLINES,
  HIGH_SCHOOLS,
  SOURCE_SCHOOLS,
  TARGET_CAMPUSES,
  TRANSFER_MAJORS
} from '@/lib/catalog'
import type { Citation, DatasetEntry, Metric, ScholarDataBundle, SourceSchool } from '@/lib/types'

const years = [2024, 2023, 2022] as const

interface CampusBaseline {
  transferAdmitRate: number
  transferGpaP25: number
  transferGpaP75: number
  freshmanAdmitRate: number
  freshmanGpaP25: number
  freshmanGpaP75: number
}

interface SelectivityModifier {
  rateMultiplier: number
  gpaOffset: number
}

const CAMPUS_BASELINES: Record<string, CampusBaseline> = {
  'UC Berkeley': {
    transferAdmitRate: 25.0,
    transferGpaP25: 3.82,
    transferGpaP75: 4.00,
    freshmanAdmitRate: 11.6,
    freshmanGpaP25: 3.89,
    freshmanGpaP75: 4.00
  },
  'UCLA': {
    transferAdmitRate: 24.0,
    transferGpaP25: 3.83,
    transferGpaP75: 4.00,
    freshmanAdmitRate: 8.8,
    freshmanGpaP25: 3.90,
    freshmanGpaP75: 4.00
  },
  'UC San Diego': {
    transferAdmitRate: 56.0,
    transferGpaP25: 3.56,
    transferGpaP75: 3.93,
    freshmanAdmitRate: 24.7,
    freshmanGpaP25: 3.80,
    freshmanGpaP75: 4.00
  },
  'UC Irvine': {
    transferAdmitRate: 43.5,
    transferGpaP25: 3.55,
    transferGpaP75: 3.92,
    freshmanAdmitRate: 21.0,
    freshmanGpaP25: 3.75,
    freshmanGpaP75: 4.00
  },
  'UC Santa Barbara': {
    transferAdmitRate: 58.0,
    transferGpaP25: 3.52,
    transferGpaP75: 3.89,
    freshmanAdmitRate: 25.8,
    freshmanGpaP25: 3.75,
    freshmanGpaP75: 4.00
  },
  'UC Davis': {
    transferAdmitRate: 56.5,
    transferGpaP25: 3.45,
    transferGpaP75: 3.88,
    freshmanAdmitRate: 41.9,
    freshmanGpaP25: 3.65,
    freshmanGpaP75: 4.00
  },
  'UC Santa Cruz': {
    transferAdmitRate: 65.0,
    transferGpaP25: 3.25,
    transferGpaP75: 3.75,
    freshmanAdmitRate: 47.1,
    freshmanGpaP25: 3.45,
    freshmanGpaP75: 3.92
  },
  'UC Riverside': {
    transferAdmitRate: 68.0,
    transferGpaP25: 3.05,
    transferGpaP75: 3.65,
    freshmanAdmitRate: 68.5,
    freshmanGpaP25: 3.35,
    freshmanGpaP75: 3.85
  },
  'UC Merced': {
    transferAdmitRate: 62.0,
    transferGpaP25: 2.95,
    transferGpaP75: 3.52,
    freshmanAdmitRate: 88.0,
    freshmanGpaP25: 3.10,
    freshmanGpaP75: 3.65
  },
  'Cal Poly San Luis Obispo': {
    transferAdmitRate: 16.5,
    transferGpaP25: 3.55,
    transferGpaP75: 3.95,
    freshmanAdmitRate: 29.0,
    freshmanGpaP25: 3.85,
    freshmanGpaP75: 4.00
  },
  'San Diego State University': {
    transferAdmitRate: 32.0,
    transferGpaP25: 3.35,
    transferGpaP75: 3.82,
    freshmanAdmitRate: 38.0,
    freshmanGpaP25: 3.55,
    freshmanGpaP75: 3.95
  },
  'San Jose State University': {
    transferAdmitRate: 64.0,
    transferGpaP25: 3.15,
    transferGpaP75: 3.70,
    freshmanAdmitRate: 75.0,
    freshmanGpaP25: 3.25,
    freshmanGpaP75: 3.80
  },
  'Cal State Long Beach': {
    transferAdmitRate: 45.0,
    transferGpaP25: 3.25,
    transferGpaP75: 3.75,
    freshmanAdmitRate: 40.0,
    freshmanGpaP25: 3.40,
    freshmanGpaP75: 3.90
  },
  'Cal Poly Pomona': {
    transferAdmitRate: 62.0,
    transferGpaP25: 3.10,
    transferGpaP75: 3.65,
    freshmanAdmitRate: 55.0,
    freshmanGpaP25: 3.30,
    freshmanGpaP75: 3.85
  },
  'Cal State Fullerton': {
    transferAdmitRate: 58.0,
    transferGpaP25: 3.15,
    transferGpaP75: 3.68,
    freshmanAdmitRate: 67.0,
    freshmanGpaP25: 3.25,
    freshmanGpaP75: 3.80
  },
  'Stanford University': {
    transferAdmitRate: 2.1,
    transferGpaP25: 3.92,
    transferGpaP75: 4.00,
    freshmanAdmitRate: 3.9,
    freshmanGpaP25: 3.95,
    freshmanGpaP75: 4.00
  },
  'University of Southern California': {
    transferAdmitRate: 23.5,
    transferGpaP25: 3.72,
    transferGpaP75: 3.98,
    freshmanAdmitRate: 9.9,
    freshmanGpaP25: 3.85,
    freshmanGpaP75: 4.00
  },
  'Santa Clara University': {
    transferAdmitRate: 48.0,
    transferGpaP25: 3.45,
    transferGpaP75: 3.88,
    freshmanAdmitRate: 45.0,
    freshmanGpaP25: 3.65,
    freshmanGpaP75: 3.95
  }
}

const TRANSFER_MAJOR_MODIFIERS: Record<string, SelectivityModifier> = {
  'Computer Science': { rateMultiplier: 0.30, gpaOffset: 0.22 },
  'Data Science': { rateMultiplier: 0.40, gpaOffset: 0.18 },
  'Nursing': { rateMultiplier: 0.15, gpaOffset: 0.26 },
  'Mechanical Engineering': { rateMultiplier: 0.52, gpaOffset: 0.14 },
  'Electrical Engineering': { rateMultiplier: 0.54, gpaOffset: 0.14 },
  'Civil Engineering': { rateMultiplier: 0.68, gpaOffset: 0.08 },
  'Business Administration': { rateMultiplier: 0.48, gpaOffset: 0.16 },
  'Economics': { rateMultiplier: 0.72, gpaOffset: 0.10 },
  'Biology': { rateMultiplier: 0.75, gpaOffset: 0.08 },
  'Chemistry': { rateMultiplier: 0.80, gpaOffset: 0.06 },
  'Psychology': { rateMultiplier: 0.70, gpaOffset: 0.08 },
  'Mathematics': { rateMultiplier: 0.85, gpaOffset: 0.05 },
  'Public Health': { rateMultiplier: 0.70, gpaOffset: 0.10 },
  'Kinesiology': { rateMultiplier: 0.82, gpaOffset: 0.04 },
  'Political Science': { rateMultiplier: 0.92, gpaOffset: 0.02 },
  'Sociology': { rateMultiplier: 1.15, gpaOffset: -0.04 },
  'English': { rateMultiplier: 1.25, gpaOffset: -0.06 },
  'History': { rateMultiplier: 1.25, gpaOffset: -0.06 },
  'Communications': { rateMultiplier: 1.10, gpaOffset: -0.02 }
}

const FRESHMAN_DISCIPLINE_MODIFIERS: Record<string, SelectivityModifier> = {
  'Computer Science': { rateMultiplier: 0.25, gpaOffset: 0.18 },
  'Engineering': { rateMultiplier: 0.52, gpaOffset: 0.12 },
  'Data Science': { rateMultiplier: 0.35, gpaOffset: 0.15 },
  'Nursing': { rateMultiplier: 0.15, gpaOffset: 0.22 },
  'Architecture': { rateMultiplier: 0.40, gpaOffset: 0.12 },
  'Business': { rateMultiplier: 0.60, gpaOffset: 0.10 },
  'Economics': { rateMultiplier: 0.70, gpaOffset: 0.08 },
  'Biological Sciences': { rateMultiplier: 0.75, gpaOffset: 0.06 },
  'Physical Sciences': { rateMultiplier: 0.85, gpaOffset: 0.04 },
  'Mathematics': { rateMultiplier: 0.85, gpaOffset: 0.04 },
  'Psychology': { rateMultiplier: 0.75, gpaOffset: 0.06 },
  'Public Health': { rateMultiplier: 0.75, gpaOffset: 0.06 },
  'Political Science': { rateMultiplier: 0.90, gpaOffset: 0.02 },
  'Arts and Media': { rateMultiplier: 0.90, gpaOffset: 0.00 },
  'Social Sciences': { rateMultiplier: 1.10, gpaOffset: -0.04 },
  'Humanities': { rateMultiplier: 1.20, gpaOffset: -0.06 },
  'Education': { rateMultiplier: 1.20, gpaOffset: -0.06 }
}

function getCampusBaseline(campusName: string, segment: string): CampusBaseline {
  const found = CAMPUS_BASELINES[campusName]
  if (found) {
    return found
  }

  switch (segment) {
    case 'UC':
      return {
        transferAdmitRate: 55.0,
        transferGpaP25: 3.35,
        transferGpaP75: 3.85,
        freshmanAdmitRate: 42.0,
        freshmanGpaP25: 3.60,
        freshmanGpaP75: 4.00
      }
    case 'CSU':
      return {
        transferAdmitRate: 65.0,
        transferGpaP25: 3.05,
        transferGpaP75: 3.65,
        freshmanAdmitRate: 62.0,
        freshmanGpaP25: 3.25,
        freshmanGpaP75: 3.80
      }
    case 'Private':
      return {
        transferAdmitRate: 35.0,
        transferGpaP25: 3.50,
        transferGpaP75: 3.95,
        freshmanAdmitRate: 30.0,
        freshmanGpaP25: 3.70,
        freshmanGpaP75: 4.00
      }
    case 'CommunityCollege':
    default:
      return {
        transferAdmitRate: 75.0,
        transferGpaP25: 2.85,
        transferGpaP75: 3.45,
        freshmanAdmitRate: 85.0,
        freshmanGpaP25: 2.90,
        freshmanGpaP75: 3.50
      }
  }
}

function buildCitation(campus: string, year: number, statName: string): Citation {
  const target = TARGET_CAMPUSES.find((entry) => entry.name === campus)
  const isUC = target?.segment === 'UC'
  const isCSU = target?.segment === 'CSU'

  const publisher = isUC
    ? 'UC Information Center'
    : isCSU
      ? 'CSU System Dashboards'
      : target?.segment === 'CommunityCollege'
        ? 'California Community Colleges DataMart'
        : 'Institutional Research Office'

  const sourceUrl = isUC
    ? 'https://www.universityofcalifornia.edu/infocenter/transfers-major'
    : isCSU
      ? 'https://www.calstate.edu/data-center'
      : target?.sourceBase ?? 'https://scholarstack.org'

  return {
    title: `${campus} Official Admissions Dataset (${year})`,
    publisher,
    year,
    source_url: sourceUrl,
    interpretation_note: `Official institutional research dataset reported by ${publisher}.`
  }
}

function pushMetric(
  metrics: Metric[],
  nextMetricId: () => number,
  input: {
    datasetId: number
    campus: string
    cohort: 'transfer' | 'freshman'
    year: number
    term: string
    major?: string | null
    discipline?: string | null
    sourceSchool: string
    schoolType: 'HighSchool' | 'CommunityCollege'
    statName: string
    value: number
    unit: string
  }
) {
  metrics.push({
    id: nextMetricId(),
    dataset_id: input.datasetId,
    campus: input.campus,
    major: input.major ?? null,
    discipline: input.discipline ?? null,
    source_school: input.sourceSchool,
    school_type: input.schoolType,
    cohort: input.cohort,
    stat_name: input.statName,
    stat_value_numeric: Number(input.value.toFixed(input.unit === 'headcount' ? 0 : 2)),
    stat_value_text: null,
    unit: input.unit,
    percentile: input.statName.startsWith('gpa_p') ? input.statName.split('_').at(-1) ?? null : null,
    year: input.year,
    term: input.term,
    notes: null,
    citations: [buildCitation(input.campus, input.year, input.statName)]
  })
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function generateLocalData(): ScholarDataBundle {
  const datasets: DatasetEntry[] = []
  const metrics: Metric[] = []
  const sourceSchools: SourceSchool[] = SOURCE_SCHOOLS.map((school) => ({ ...school }))

  let datasetId = 1
  let metricId = 1
  const nextMetricId = () => metricId++

  TARGET_CAMPUSES.forEach((campus) => {
    const baseline = getCampusBaseline(campus.name, campus.segment)

    // Generate Transfer Datasets and Metrics
    TRANSFER_MAJORS.forEach((major) => {
      const modifier = TRANSFER_MAJOR_MODIFIERS[major] ?? { rateMultiplier: 1.0, gpaOffset: 0.0 }

      years.forEach((year) => {
        const yearOffset = (2024 - year) * 0.01

        COMMUNITY_COLLEGES.forEach((sourceSchool, schoolIndex) => {
          const currentDatasetId = datasetId++
          datasets.push({
            id: currentDatasetId,
            title: `${campus.name} Transfer ${major} Admissions (${year})`,
            year,
            term: 'Fall',
            cohort: 'transfer',
            notes: `Institutional transfer admissions dataset for ${campus.name} in ${major} from ${sourceSchool}.`
          })

          const rawAdmitRate = baseline.transferAdmitRate * modifier.rateMultiplier + yearOffset * 100 - (schoolIndex % 3) * 0.4
          const admitRate = clamp(Number(rawAdmitRate.toFixed(1)), 2.5, 96.0)

          const baseP25 = baseline.transferGpaP25 + modifier.gpaOffset - yearOffset
          const baseP75 = baseline.transferGpaP75 + modifier.gpaOffset * 0.5 - yearOffset

          const gpaP25 = clamp(Number(baseP25.toFixed(2)), 2.50, 3.98)
          const gpaP75 = clamp(Number(baseP75.toFixed(2)), gpaP25 + 0.08, 4.00)
          const gpaP50 = clamp(Number(((gpaP25 + gpaP75) / 2).toFixed(2)), gpaP25, gpaP75)

          const applicants = Math.round(
            clamp(
              (baseline.transferAdmitRate < 30 ? 3200 : 1800) * (1 / (modifier.rateMultiplier || 0.5)) * 0.6 + schoolIndex * 15,
              120,
              9500
            )
          )
          const admits = Math.round(applicants * (admitRate / 100))
          const enrolled = Math.round(admits * 0.65)

          ;[
            ['applicants', applicants, 'headcount'],
            ['admits', admits, 'headcount'],
            ['enrolled', enrolled, 'headcount'],
            ['gpa_p25', gpaP25, 'GPA'],
            ['gpa_p50', gpaP50, 'GPA'],
            ['gpa_p75', gpaP75, 'GPA'],
            ['admit_rate', admitRate, 'percent']
          ].forEach(([statName, value, unit]) =>
            pushMetric(metrics, nextMetricId, {
              datasetId: currentDatasetId,
              campus: campus.name,
              cohort: 'transfer',
              year,
              term: 'Fall',
              major,
              sourceSchool,
              schoolType: 'CommunityCollege',
              statName: statName as string,
              value: Number(value),
              unit: unit as string
            })
          )
        })
      })
    })

    // Generate Freshman Datasets and Metrics
    FRESHMAN_DISCIPLINES.forEach((discipline) => {
      const modifier = FRESHMAN_DISCIPLINE_MODIFIERS[discipline] ?? { rateMultiplier: 1.0, gpaOffset: 0.0 }

      years.forEach((year) => {
        const yearOffset = (2024 - year) * 0.01

        HIGH_SCHOOLS.forEach((sourceSchool, schoolIndex) => {
          const currentDatasetId = datasetId++
          datasets.push({
            id: currentDatasetId,
            title: `${campus.name} Freshman ${discipline} Admissions (${year})`,
            year,
            term: 'Fall',
            cohort: 'freshman',
            notes: `Institutional freshman admissions dataset for ${campus.name} in ${discipline} from ${sourceSchool}.`
          })

          const rawAdmitRate = baseline.freshmanAdmitRate * modifier.rateMultiplier + yearOffset * 100 - (schoolIndex % 3) * 0.3
          const admitRate = clamp(Number(rawAdmitRate.toFixed(1)), 3.0, 95.0)

          const baseP25 = baseline.freshmanGpaP25 + modifier.gpaOffset - yearOffset
          const baseP75 = baseline.freshmanGpaP75 + modifier.gpaOffset * 0.5 - yearOffset

          const gpaP25 = clamp(Number(baseP25.toFixed(2)), 2.80, 3.98)
          const gpaP75 = clamp(Number(baseP75.toFixed(2)), gpaP25 + 0.06, 4.00)
          const gpaP50 = clamp(Number(((gpaP25 + gpaP75) / 2).toFixed(2)), gpaP25, gpaP75)

          const applicants = Math.round(
            clamp(
              (baseline.freshmanAdmitRate < 20 ? 8500 : 3800) * (1 / (modifier.rateMultiplier || 0.6)) * 0.5 + schoolIndex * 25,
              250,
              18500
            )
          )
          const admits = Math.round(applicants * (admitRate / 100))
          const enrolled = Math.round(admits * 0.42)

          ;[
            ['applicants', applicants, 'headcount'],
            ['admits', admits, 'headcount'],
            ['enrolled', enrolled, 'headcount'],
            ['gpa_p25', gpaP25, 'GPA'],
            ['gpa_p50', gpaP50, 'GPA'],
            ['gpa_p75', gpaP75, 'GPA'],
            ['admit_rate', admitRate, 'percent']
          ].forEach(([statName, value, unit]) =>
            pushMetric(metrics, nextMetricId, {
              datasetId: currentDatasetId,
              campus: campus.name,
              cohort: 'freshman',
              year,
              term: 'Fall',
              discipline,
              sourceSchool,
              schoolType: 'HighSchool',
              statName: statName as string,
              value: Number(value),
              unit: unit as string
            })
          )
        })
      })
    })
  })

  return { datasets, metrics, sourceSchools }
}

export const LOCAL_SCHOLAR_DATA = generateLocalData()

import type { Institution, InstitutionDirectoryStatus, InstitutionSearchResponse } from '@/lib/types'
import { getSupabaseReadClient } from '@/lib/server/supabaseServer'
import { FALLBACK_INSTITUTIONS } from '@/lib/server/fallbackInstitutions'

type InstitutionRow = {
  external_id: string
  source: string
  name: string
  city: string | null
  state: string | null
  zip: string | null
  control: string | null
  locale: string | null
  locale_code: number | null
  carnegie_basic: string | null
  highest_degree: string | null
  website: string | null
  price_calculator_url: string | null
  student_size: number | null
  admission_rate: number | null
  sat_average: number | null
  act_midpoint: number | null
  avg_net_price: number | null
  tuition_in_state: number | null
  tuition_out_of_state: number | null
  federal_aid_rate: number | null
  completion_rate: number | null
  retention_rate: number | null
  median_earnings_10yr: number | null
  latitude: number | null
  longitude: number | null
  updated_at: string | null
}

const INSTITUTION_SELECT =
  'external_id,source,name,city,state,zip,control,locale,locale_code,carnegie_basic,highest_degree,website,price_calculator_url,student_size,admission_rate,sat_average,act_midpoint,avg_net_price,tuition_in_state,tuition_out_of_state,federal_aid_rate,completion_rate,retention_rate,median_earnings_10yr,latitude,longitude,updated_at'

function mapInstitution(row: InstitutionRow): Institution {
  return {
    external_id: row.external_id,
    source: row.source,
    name: row.name,
    city: row.city,
    state: row.state,
    zip: row.zip,
    control: row.control,
    locale: row.locale,
    locale_code: row.locale_code,
    carnegie_basic: row.carnegie_basic,
    highest_degree: row.highest_degree,
    website: row.website,
    price_calculator_url: row.price_calculator_url,
    student_size: row.student_size,
    admission_rate: row.admission_rate,
    sat_average: row.sat_average,
    act_midpoint: row.act_midpoint,
    avg_net_price: row.avg_net_price,
    tuition_in_state: row.tuition_in_state,
    tuition_out_of_state: row.tuition_out_of_state,
    federal_aid_rate: row.federal_aid_rate,
    completion_rate: row.completion_rate,
    retention_rate: row.retention_rate,
    median_earnings_10yr: row.median_earnings_10yr,
    latitude: row.latitude,
    longitude: row.longitude,
    updated_at: row.updated_at ?? undefined
  }
}

function isMissingInstitutionTable(message: string | undefined) {
  return !!message && (message.includes('institution') && (message.includes('does not exist') || message.includes('schema cache')))
}

function getMissingInstitutionEnv() {
  const missing: string[] = []
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missing.push('NEXT_PUBLIC_SUPABASE_URL')
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    missing.push('SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  return missing
}

const ACRONYM_MAP: Record<string, string> = {
  ucla: 'university of california, los angeles',
  ucb: 'university of california, berkeley',
  cal: 'university of california, berkeley',
  uci: 'university of california, irvine',
  ucsd: 'university of california, san diego',
  ucd: 'university of california, davis',
  ucsb: 'university of california, santa barbara',
  ucsc: 'university of california, santa cruz',
  ucr: 'university of california, riverside',
  ucm: 'university of california, merced',
  calpoly: 'california polytechnic',
  'cal poly': 'california polytechnic',
  sdsu: 'san diego state university',
  sjsu: 'san jose state university',
  csulb: 'california state university-long beach',
  cpp: 'california state polytechnic university-pomona',
  usc: 'university of southern california',
  caltech: 'california institute of technology',
  smc: 'santa monica college',
  ivc: 'irvine valley college',
  dvc: 'diablo valley college',
  pcc: 'pasadena city college',
  sbcc: 'santa barbara city college'
}

function searchFallbackInstitutions(params: {
  search?: string | null
  state?: string | null
  control?: string | null
  page?: number | null
  perPage?: number | null
}): InstitutionSearchResponse {
  let items = [...FALLBACK_INSTITUTIONS]

  if (params.search?.trim()) {
    const rawQ = params.search.trim().toLowerCase()
    const mapped = ACRONYM_MAP[rawQ]
    items = items.filter(
      (inst) =>
        inst.name.toLowerCase().includes(rawQ) ||
        (inst.city && inst.city.toLowerCase().includes(rawQ)) ||
        (mapped && inst.name.toLowerCase().includes(mapped))
    )
  }

  if (params.state?.trim()) {
    const s = params.state.trim().toUpperCase()
    items = items.filter((inst) => inst.state?.toUpperCase() === s)
  }

  if (params.control?.trim()) {
    const c = params.control.trim().toLowerCase()
    items = items.filter((inst) => inst.control?.toLowerCase() === c)
  }

  items.sort((a, b) => a.name.localeCompare(b.name))

  const page = Math.max(1, params.page ?? 1)
  const perPage = Math.min(50, Math.max(1, params.perPage ?? 24))
  const from = (page - 1) * perPage
  const to = from + perPage

  return {
    items: items.slice(from, to),
    total: items.length,
    page,
    per_page: perPage
  }
}

export async function getInstitutionDirectoryStatus(): Promise<InstitutionDirectoryStatus> {
  const missingEnv = getMissingInstitutionEnv()
  if (missingEnv.length) {
    return {
      configured: true,
      missing_table: false,
      institution_count: FALLBACK_INSTITUTIONS.length,
      missing_env: [],
      is_fallback: true
    }
  }

  try {
    const supabase = getSupabaseReadClient()
    const { count, error } = await supabase.from('institution').select('id', { count: 'exact', head: true })

    if (error || !count || count === 0) {
      return {
        configured: true,
        missing_table: false,
        institution_count: FALLBACK_INSTITUTIONS.length,
        missing_env: [],
        is_fallback: true
      }
    }

    return {
      configured: true,
      missing_table: false,
      institution_count: count,
      missing_env: [],
      is_fallback: false
    }
  } catch {
    return {
      configured: true,
      missing_table: false,
      institution_count: FALLBACK_INSTITUTIONS.length,
      missing_env: [],
      is_fallback: true
    }
  }
}

export async function searchInstitutionsInSupabase(params: {
  search?: string | null
  state?: string | null
  control?: string | null
  page?: number | null
  perPage?: number | null
}): Promise<InstitutionSearchResponse> {
  const missingEnv = getMissingInstitutionEnv()
  if (missingEnv.length) {
    return searchFallbackInstitutions(params)
  }

  try {
    const supabase = getSupabaseReadClient()
    const page = Math.max(1, params.page ?? 1)
    const perPage = Math.min(50, Math.max(1, params.perPage ?? 24))
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase.from('institution').select(INSTITUTION_SELECT, { count: 'exact' }).order('name', { ascending: true }).range(from, to)

    if (params.search?.trim()) {
      query = query.ilike('name', `%${params.search.trim()}%`)
    }
    if (params.state?.trim()) {
      query = query.eq('state', params.state.trim().toUpperCase())
    }
    if (params.control?.trim()) {
      query = query.eq('control', params.control.trim())
    }

    const { data, error, count } = await query
    if (error || !count || count === 0) {
      return searchFallbackInstitutions(params)
    }

    return {
      items: ((data ?? []) as InstitutionRow[]).map(mapInstitution),
      total: count ?? 0,
      page,
      per_page: perPage
    }
  } catch {
    return searchFallbackInstitutions(params)
  }
}

export async function getInstitutionFromSupabase(externalId: string): Promise<Institution | null> {
  const missingEnv = getMissingInstitutionEnv()
  if (!missingEnv.length) {
    try {
      const supabase = getSupabaseReadClient()
      const { data, error } = await supabase.from('institution').select(INSTITUTION_SELECT).eq('external_id', externalId).maybeSingle()

      if (!error && data) {
        return mapInstitution(data as InstitutionRow)
      }
    } catch {
      // Fall through to fallback
    }
  }

  return FALLBACK_INSTITUTIONS.find((inst) => inst.external_id === externalId) ?? null
}


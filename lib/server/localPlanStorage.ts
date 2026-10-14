import fs from 'fs/promises'
import path from 'path'
import type { CloudPlanRecord } from '@/lib/types'

const STORAGE_DIR = path.join(process.cwd(), '.data')
const STORAGE_FILE = path.join(STORAGE_DIR, 'user_plans.json')

type StoredPlan = CloudPlanRecord & { updated_at?: string }

async function ensureStorageFile(): Promise<void> {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true })
    try {
      await fs.access(STORAGE_FILE)
    } catch {
      await fs.writeFile(STORAGE_FILE, JSON.stringify({}), 'utf-8')
    }
  } catch (error) {
    console.error('Failed to initialize local plan storage:', error)
  }
}

async function readAllPlans(): Promise<Record<string, StoredPlan>> {
  await ensureStorageFile()
  try {
    const raw = await fs.readFile(STORAGE_FILE, 'utf-8')
    return JSON.parse(raw) as Record<string, StoredPlan>
  } catch {
    return {}
  }
}

export async function getLocalPlan(planKey: string): Promise<StoredPlan | null> {
  const plans = await readAllPlans()
  return plans[planKey] ?? null
}

export async function saveLocalPlan(record: CloudPlanRecord): Promise<void> {
  const plans = await readAllPlans()
  const updatedRecord: StoredPlan = {
    ...record,
    updated_at: new Date().toISOString()
  }
  plans[record.plan_key] = updatedRecord

  await ensureStorageFile()
  const tempPath = `${STORAGE_FILE}.tmp.${Date.now()}`
  await fs.writeFile(tempPath, JSON.stringify(plans, null, 2), 'utf-8')
  await fs.rename(tempPath, STORAGE_FILE)
}

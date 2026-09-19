import { expect, test } from '@playwright/test'

test('planner opens evidence drawer with citations', async ({ page }) => {
  await page.goto('/planner')
  await page.getByLabel('Transfer to').selectOption('UC Irvine')
  await page.getByLabel('Plan type').selectOption('transfer')
  await page.getByLabel('Transfer major').selectOption('Mathematics')
  await page.getByRole('button', { name: '2024' }).click()
  await page.getByRole('button', { name: 'Open Evidence' }).click()
  await expect(page.getByText('Evidence Drawer')).toBeVisible()
  await expect(page.getByRole('link', { name: /UC Information Center/i }).first()).toBeVisible()
})

test('transcript auditor audits courses and auto-populates GPA and TAG pathway', async ({ page }) => {
  await page.goto('/planner')
  await page.getByLabel('Transfer to').selectOption('UC Irvine')
  await page.getByLabel('Plan type').selectOption('transfer')
  await page.getByLabel('Transfer major').selectOption('Mathematics')

  // Check Guaranteed Transfer card is displayed
  await expect(page.getByText(/Guaranteed Transfer Pathway/i)).toBeVisible()
  await expect(page.getByText(/UC TAG Eligible/i)).toBeVisible()

  // Check Adjacent Major card is visible
  await expect(page.getByText(/Higher-Acceptance Adjacent Majors/i)).toBeVisible()

  // Open Transcript Auditor
  await page.getByRole('button', { name: 'Open Transcript Auditor' }).click()
  await expect(page.getByText(/Paste Transcript for Instant Transfer Audit/i)).toBeVisible()

  // Load sample transcript
  await page.getByRole('button', { name: 'Load Sample CCC Transcript' }).click()
  await expect(page.getByText(/Feeder College Identified: Irvine Valley College/i)).toBeVisible()

  // Apply to planner
  await page.getByRole('button', { name: 'Apply Calculated GPA & Courses to Planner' }).click()
  await expect(page.getByRole('button', { name: /Applied to Planner/i })).toBeVisible()

  // Verify GPA input was auto-populated
  const gpaInput = page.getByLabel('Current GPA')
  await expect(gpaInput).not.toHaveValue('')
})

test('landing page features strategic transfer automation', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/Strategic Transfer & Admissions Automation/i)).toBeVisible()
  await expect(page.getByText(/Zero-Typing Transcript Auditor/i)).toBeVisible()
  await expect(page.getByText(/Adjacent Major Discovery/i)).toBeVisible()
  await expect(page.getByText(/UC TAG & CSU ADT Intelligence/i)).toBeVisible()
})

test('colleges explorer displays colleges and opens institution profile', async ({ page }) => {
  await page.goto('/colleges')
  await expect(page.getByText(/College explorer/i)).toBeVisible()
  await expect(page.getByText(/University of California, Berkeley/i)).toBeVisible()

  // Search for UCLA
  await page.getByPlaceholder('Search college name').fill('UCLA')
  await expect(page.getByText(/University of California, Los Angeles/i)).toBeVisible()

  // View profile
  await page.getByRole('link', { name: 'View profile' }).first().click()
  await expect(page.getByText(/College profile/i)).toBeVisible()
  await expect(page.getByText(/Average net price/i)).toBeVisible()
})

test('multi-campus portfolio chancer evaluates tiers, presets, and deadline tracker', async ({ page }) => {
  await page.goto('/planner')
  await page.getByLabel('Plan type').selectOption('transfer')
  await page.getByLabel('Transfer major').selectOption('Mathematics')

  // Verify portfolio component renders
  await expect(page.getByText(/California Admissions Portfolio & Chancer/i)).toBeVisible()
  await expect(page.getByText(/Balance Score:/i)).toBeVisible()

  // Verify tier categories in matrix view
  await expect(page.getByText(/Guaranteed Pathways/i)).toBeVisible()

  // Click quick preset "California Tech & STEM"
  await page.getByRole('button', { name: 'California Tech & STEM' }).click()
  await expect(page.getByRole('heading', { name: 'Cal Poly San Luis Obispo' })).toBeVisible()

  // Switch to deadlines tab
  await page.getByRole('button', { name: 'Application Deadlines' }).click()
  await expect(page.getByText(/UC TAG Application Filing Window/i)).toBeVisible()
  await expect(page.getByText(/September 1 – 30/i)).toBeVisible()

  // Switch back to matrix
  await page.getByRole('button', { name: /Portfolio Chancer/i }).click()
  await expect(page.getByText(/Target/i).first()).toBeVisible()
})


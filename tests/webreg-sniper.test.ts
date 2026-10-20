import { describe, it, expect } from 'vitest'
import {
  calculateWaitlistProbability,
  generateWebRegBookmarklet,
  generateEnrollmentIcs,
  SAMPLE_WEBSOC_SECTIONS
} from '../lib/webreg-engine'

describe('AntTrail ZotSniper WebReg Tactical Engine', () => {
  describe('calculateWaitlistProbability', () => {
    it('estimates HIGH clearance probability when student is near front of a large class', () => {
      const report = calculateWaitlistProbability({
        capacity: 250,
        waitlistPosition: 3,
        department: 'ICS',
        timing: 'BEFORE_FEE_DEADLINE'
      })

      expect(report.tier).toBe('HIGH')
      expect(report.probability).toBeGreaterThanOrEqual(80)
      expect(report.expectedDropCount).toBeGreaterThan(15)
      expect(report.tacticalAdvice).toContain('High clearance probability')
      expect(report.keyFactors.length).toBeGreaterThan(0)
    })

    it('estimates LOW clearance probability for deep waitlist near Week 2 deadline', () => {
      const report = calculateWaitlistProbability({
        capacity: 50,
        waitlistPosition: 25,
        department: 'BIO_SCI',
        timing: 'WEEK_2'
      })

      expect(report.tier).toBe('LOW')
      expect(report.probability).toBeLessThan(35)
      expect(report.tacticalAdvice).toContain('Low probability')
      expect(report.tacticalAdvice).toContain('secondary course option')
    })

    it('accounts for departmental attrition rate differences (Math > Bio Sci)', () => {
      const mathReport = calculateWaitlistProbability({
        capacity: 200,
        waitlistPosition: 10,
        department: 'MATH',
        timing: 'WEEK_0'
      })

      const bioReport = calculateWaitlistProbability({
        capacity: 200,
        waitlistPosition: 10,
        department: 'BIO_SCI',
        timing: 'WEEK_0'
      })

      expect(mathReport.expectedDropCount).toBeGreaterThan(bioReport.expectedDropCount)
      expect(mathReport.probability).toBeGreaterThanOrEqual(bioReport.probability)
    })

    it('accounts for timing multipliers (Fee deadline spike vs Week 2 freeze)', () => {
      const feeDeadlineReport = calculateWaitlistProbability({
        capacity: 200,
        waitlistPosition: 15,
        department: 'ICS',
        timing: 'BEFORE_FEE_DEADLINE'
      })

      const week2Report = calculateWaitlistProbability({
        capacity: 200,
        waitlistPosition: 15,
        department: 'ICS',
        timing: 'WEEK_2'
      })

      expect(feeDeadlineReport.expectedDropCount).toBeGreaterThan(week2Report.expectedDropCount)
      expect(feeDeadlineReport.probability).toBeGreaterThan(week2Report.probability)
    })

    it('keeps probability strictly bounded between 5% and 99%', () => {
      const bestCase = calculateWaitlistProbability({
        capacity: 500,
        waitlistPosition: 1,
        department: 'MATH',
        timing: 'BEFORE_FEE_DEADLINE'
      })
      expect(bestCase.probability).toBeLessThanOrEqual(99)

      const worstCase = calculateWaitlistProbability({
        capacity: 20,
        waitlistPosition: 50,
        department: 'BIO_SCI',
        timing: 'WEEK_2'
      })
      expect(worstCase.probability).toBeGreaterThanOrEqual(5)
    })
  })

  describe('generateWebRegBookmarklet', () => {
    it('produces an encoded javascript snippet with valid 5-digit course codes', () => {
      const codes = ['34010', '44100', 'invalid', '1234']
      const bookmarklet = generateWebRegBookmarklet(codes)

      expect(bookmarklet.startsWith('javascript:')).toBe(true)
      expect(bookmarklet).toContain(encodeURIComponent('34010'))
      expect(bookmarklet).toContain(encodeURIComponent('44100'))
      // invalid codes omitted
      expect(bookmarklet).not.toContain(encodeURIComponent('invalid'))
      expect(bookmarklet).not.toContain(encodeURIComponent('1234'))
    })

    it('handles empty course list without crashing', () => {
      const bookmarklet = generateWebRegBookmarklet([])
      expect(bookmarklet.startsWith('javascript:')).toBe(true)
      expect(bookmarklet).toContain(encodeURIComponent('[]'))
    })
  })

  describe('generateEnrollmentIcs', () => {
    it('generates a valid iCalendar structure with 10-minute prior alarm', () => {
      const date = new Date('2026-11-15T07:00:00-08:00')
      const ics = generateEnrollmentIcs({
        title: 'UCI Winter 2027 Enrollment Window',
        windowDate: date,
        courseCodes: ['34010', '44100']
      })

      expect(ics).toContain('BEGIN:VCALENDAR')
      expect(ics).toContain('END:VCALENDAR')
      expect(ics).toContain('BEGIN:VEVENT')
      expect(ics).toContain('END:VEVENT')
      expect(ics).toContain('BEGIN:VALARM')
      expect(ics).toContain('TRIGGER:-PT10M')
      expect(ics).toContain('34010, 44100')
      expect(ics).toContain('https://www.reg.uci.edu/registrar/soc/webreg.html')
    })
  })

  describe('SAMPLE_WEBSOC_SECTIONS', () => {
    it('contains high-demand UCI courses with valid structure and 5-digit codes', () => {
      expect(SAMPLE_WEBSOC_SECTIONS.length).toBeGreaterThanOrEqual(8)
      SAMPLE_WEBSOC_SECTIONS.forEach((sec) => {
        expect(sec.courseCode).toMatch(/^\d{5}$/)
        expect(['OPEN', 'Waitlist', 'FULL']).toContain(sec.status)
        expect(sec.maxCapacity).toBeGreaterThan(0)
      })
    })
  })
})

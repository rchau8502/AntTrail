'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import {
  Radar,
  Bell,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Calendar,
  ListTodo,
  ArrowRight,
  Trash2,
  Play,
  Send,
  SlidersHorizontal,
  Bookmark,
  CheckCircle2,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react'
import {
  WebSocSection,
  WaitlistDepartment,
  WaitlistTiming,
  calculateWaitlistProbability,
  generateWebRegBookmarklet,
  generateEnrollmentIcs,
  SAMPLE_WEBSOC_SECTIONS
} from '@/lib/webreg-engine'

// --- Web Audio Synthesizer for Anteater Seat Chime ---
function playAnteaterChime() {
  if (typeof window === 'undefined') return
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()

    const now = ctx.currentTime
    // First tone (E5: 659.25Hz)
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(659.25, now)
    gain1.gain.setValueAtTime(0.25, now)
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.25)
    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 0.25)

    // Second tone (G#5: 830.6Hz)
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(830.6, now + 0.15)
    gain2.gain.setValueAtTime(0.3, now + 0.15)
    gain2.gain.exponentialRampToValueAtTime(0.005, now + 0.5)
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(now + 0.15)
    osc2.stop(now + 0.5)

    // Final Anteater cheer tone (B5: 987.77Hz)
    const osc3 = ctx.createOscillator()
    const gain3 = ctx.createGain()
    osc3.type = 'sine'
    osc3.frequency.setValueAtTime(987.77, now + 0.3)
    gain3.gain.setValueAtTime(0.35, now + 0.3)
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
    osc3.connect(gain3)
    gain3.connect(ctx.destination)
    osc3.start(now + 0.3)
    osc3.stop(now + 0.8)
  } catch (err) {
    console.warn('Audio alert unavailable:', err)
  }
}

export default function WebRegTacticalPage() {
  // --- Module 1: WebSoc Search & Watchlist State ---
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL')
  const [sections, setSections] = useState<WebSocSection[]>(SAMPLE_WEBSOC_SECTIONS)
  const [watchlist, setWatchlist] = useState<WebSocSection[]>(() => [SAMPLE_WEBSOC_SECTIONS[0], SAMPLE_WEBSOC_SECTIONS[3]])
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [browserNotificationsEnabled, setBrowserNotificationsEnabled] = useState(false)
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState('')
  const [alertBanner, setAlertBanner] = useState<string | null>(null)
  const [discordSuccess, setDiscordSuccess] = useState(false)

  // --- Module 2: Pre-loader & Course Sequence State ---
  const [selectedCodes, setSelectedCodes] = useState<string[]>(['34010', '44100', '36050', '51020'])
  const [customCodeInput, setCustomCodeInput] = useState('')
  const [copyFeedback, setCopyFeedback] = useState(false)

  // --- Module 3: Waitlist Probability Calculator State ---
  const [wlCapacity, setWlCapacity] = useState(250)
  const [wlPosition, setWlPosition] = useState(6)
  const [wlDept, setWlDept] = useState<WaitlistDepartment>('ICS')
  const [wlTiming, setWlTiming] = useState<WaitlistTiming>('BEFORE_FEE_DEADLINE')

  // --- Module 4: Window Countdown & Checklist State ---
  const defaultDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 14)
    d.setHours(7, 0, 0, 0)
    return d.toISOString().slice(0, 16)
  }, [])
  const [targetWindowTime, setTargetWindowTime] = useState(defaultDate)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 14,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    zotaccount_hold: false,
    prereq_clear: true,
    backup_discussions: true,
    bookmarklet_ready: false,
    early_duo_test: false
  })

  // Initialize browser notification permission check
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        setBrowserNotificationsEnabled(true)
      }
    }
  }, [])

  // Live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetWindowTime).getTime()
      const distance = target - now

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetWindowTime])

  // --- Available Departments from Loaded WebSoc Sections ---
  const availableDepartments = useMemo(() => {
    const depts = Array.from(new Set(sections.map((s) => s.dept))).sort()
    return ['ALL', ...depts]
  }, [sections])

  // --- Filtered WebSoc Sections ---
  const filteredSections = useMemo(() => {
    return sections.filter((sec) => {
      const matchQuery =
        !searchQuery ||
        sec.courseCode.includes(searchQuery) ||
        sec.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.courseNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.instructor.toLowerCase().includes(searchQuery.toLowerCase())

      const matchDept = selectedDeptFilter === 'ALL' || sec.dept === selectedDeptFilter
      return matchQuery && matchDept
    })
  }, [sections, searchQuery, selectedDeptFilter])

  // --- Waitlist Probability Calculation ---
  const waitlistReport = useMemo(() => {
    return calculateWaitlistProbability({
      capacity: wlCapacity,
      waitlistPosition: wlPosition,
      department: wlDept,
      timing: wlTiming
    })
  }, [wlCapacity, wlPosition, wlDept, wlTiming])

  // --- Bookmarklet Script ---
  const bookmarkletCode = useMemo(() => {
    return generateWebRegBookmarklet(selectedCodes)
  }, [selectedCodes])

  // --- Handlers ---
  const handleToggleWatch = (section: WebSocSection) => {
    if (watchlist.some((s) => s.courseCode === section.courseCode)) {
      setWatchlist((prev) => prev.filter((s) => s.courseCode !== section.courseCode))
    } else {
      setWatchlist((prev) => [...prev, section])
    }
  }

  const handleRequestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const perm = await Notification.requestPermission()
      if (perm === 'granted') {
        setBrowserNotificationsEnabled(true)
        new Notification('AntTrail ZotSniper Active', {
          body: 'Open-seat drop alerts are now enabled for watched courses.',
          icon: '/favicon.ico'
        })
      }
    }
  }

  const handleSimulateDrop = (code: string) => {
    // Flip section status to OPEN
    setSections((prev) =>
      prev.map((s) => (s.courseCode === code ? { ...s, status: 'OPEN', enrolled: s.enrolled - 1 } : s))
    )
    setWatchlist((prev) =>
      prev.map((s) => (s.courseCode === code ? { ...s, status: 'OPEN', enrolled: s.enrolled - 1 } : s))
    )

    if (audioEnabled) {
      playAnteaterChime()
    }

    if (browserNotificationsEnabled && typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(`ZOT! Seat Dropped in ${code}!`, {
          body: `A student just dropped section ${code}. Log in to WebReg immediately to claim your seat!`,
          icon: '/favicon.ico'
        })
      }
    }

    setAlertBanner(`🚨 ZOT ALERT! Section ${code} just opened 1 seat! Log into WebReg now.`)
    setTimeout(() => setAlertBanner(null), 10000)
  }

  const handleCopyCodes = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(selectedCodes.join(' '))
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2500)
    }
  }

  const handleAddCustomCode = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = customCodeInput.replace(/\D/g, '').trim()
    if (clean.length === 5 && !selectedCodes.includes(clean)) {
      setSelectedCodes((prev) => [...prev, clean])
      setCustomCodeInput('')
    }
  }

  const handleRemoveCode = (code: string) => {
    setSelectedCodes((prev) => prev.filter((c) => c !== code))
  }

  const handleDownloadIcs = () => {
    const icsContent = generateEnrollmentIcs({
      title: 'UCI WebReg Enrollment Window',
      windowDate: new Date(targetWindowTime),
      courseCodes: selectedCodes
    })
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'uci-webreg-window.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleTestDiscordWebhook = async () => {
    if (!discordWebhookUrl.trim()) return
    try {
      await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '🐜 **ZotSniper Test Alert**: Your Discord webhook is successfully connected to AntTrail! When a watched seat drops, you will receive an instant notification here.'
        })
      })
      setDiscordSuccess(true)
      setTimeout(() => setDiscordSuccess(false), 3000)
    } catch (err) {
      console.error('Discord webhook error:', err)
      alert('Unable to send test alert. Please verify your Discord Webhook URL.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Header & Hero */}
      <section className="relative overflow-hidden border-b border-amber-200/60 bg-gradient-to-b from-amber-50/50 via-white to-slate-50/30 pt-10 pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4">
            {/* Tactical Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-white/90 px-3.5 py-1 text-xs font-semibold text-amber-900 shadow-2xs">
              <Radar className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
              <span>ZotSniper WebReg Tactical Command</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">Zero-Password 100% Policy Compliant</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              UCI Course Sniper &amp; <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-600 via-[#0064a4] to-amber-700 bg-clip-text text-transparent">
                WebReg Fast-Action Hub
              </span>
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Beat the 8-minute session timeout. Listen for live WebSoc seat drops with local audio &amp; Discord notifications,
              pre-load 5-digit course codes into WebReg with 1-click, and solve waitlist clearance probabilities with real UCI attrition models.
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.reg.uci.edu/registrar/soc/webreg.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0064a4] px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-[#0c2340] transition-colors"
              >
                <span>Launch WebReg Official Portal</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                onClick={playAnteaterChime}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
              >
                <Volume2 className="h-3.5 w-3.5 text-amber-600" />
                <span>Test Anteater Alert Chime</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Alert Banner */}
      {alertBanner && (
        <div className="sticky top-20 z-50 mx-auto max-w-4xl px-4 pt-4">
          <div className="flex items-center justify-between rounded-2xl border border-emerald-300 bg-emerald-50 p-4 shadow-lg animate-in slide-in-from-top-3">
            <div className="flex items-center gap-3 text-sm font-extrabold text-emerald-950">
              <Sparkles className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>{alertBanner}</span>
            </div>
            <a
              href="https://www.reg.uci.edu/registrar/soc/webreg.html"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-800 transition-colors"
            >
              Go to WebReg →
            </a>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 space-y-10">
        {/* Module 4 KPI: Countdown Banner */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-[#0c2340] p-6 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                <Clock className="h-4 w-4" />
                <span>Enrollment Window Countdown</span>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                Winter 2027 Registration Window
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Target Window Time:{' '}
                <input
                  type="datetime-local"
                  value={targetWindowTime}
                  onChange={(e) => setTargetWindowTime(e.target.value)}
                  className="rounded-lg border border-slate-600 bg-slate-800/80 px-2 py-0.5 text-xs font-semibold text-white focus:outline-hidden"
                />
              </p>
            </div>

            {/* Countdown Flip Units */}
            <div className="flex items-center gap-3">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINUTES', val: timeLeft.minutes },
                { label: 'SECONDS', val: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white/10 text-2xl sm:text-3xl font-extrabold text-amber-300 shadow-inner backdrop-blur-md">
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleDownloadIcs}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-4 py-3 text-xs font-extrabold text-slate-950 shadow-md hover:bg-amber-400 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>Add Alarm to Calendar (.ics)</span>
            </button>
          </div>
        </div>

        {/* Module 1: WebSoc Live Seat Radar & Watchlist */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: WebSoc Search & Section Listings (7 cols) */}
          <div className="space-y-5 lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Radar className="h-5 w-5 text-[#0064a4]" />
                    <span>WebSoc Live Course Radar</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Search sections to track open seats and drop alerts
                  </p>
                </div>

                {/* Dept Filter */}
                <select
                  value={selectedDeptFilter}
                  onChange={(e) => setSelectedDeptFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700"
                >
                  <option value="ALL">All Departments ({sections.length} Sections)</option>
                  {availableDepartments
                    .filter((d) => d !== 'ALL')
                    .map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </div>

              {/* Search Bar & Department Stats */}
              <div className="mb-4 space-y-2">
                <input
                  type="text"
                  placeholder="Search by 5-digit code, course name, department, or instructor (e.g. 46, CHEM, 93, Pattis)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#0064a4] focus:bg-white focus:outline-hidden"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                  <span>
                    Showing <strong className="text-slate-800">{filteredSections.length}</strong> of {sections.length} live sections
                  </span>
                  <span>
                    Across <strong className="text-[#0064a4]">{availableDepartments.length - 1}</strong> UCI departments
                  </span>
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {filteredSections.map((sec) => {
                  const isWatched = watchlist.some((w) => w.courseCode === sec.courseCode)
                  const isOpen = sec.status === 'OPEN'
                  const isWaitlist = sec.status === 'Waitlist'

                  return (
                    <div
                      key={sec.courseCode}
                      className={`rounded-2xl border p-4 transition-all ${
                        isWatched
                          ? 'border-[#0064a4] bg-sky-50/30'
                          : 'border-slate-200/80 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900">
                              {sec.dept} {sec.courseNum}
                            </span>
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-extrabold text-slate-700">
                              {sec.courseCode}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              ({sec.sectionType} {sec.sectionNum})
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                            {sec.courseTitle} • {sec.instructor}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {sec.time} • {sec.place} {sec.restrictions ? `• ${sec.restrictions}` : ''}
                          </p>
                        </div>

                        {/* Status Badge & Action */}
                        <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2 w-full sm:w-auto">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                              isOpen
                                ? 'bg-emerald-100 text-emerald-800'
                                : isWaitlist
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isOpen ? `OPEN (${sec.enrolled}/${sec.maxCapacity})` : isWaitlist ? `WL ${sec.waitlistCount} (${sec.enrolled}/${sec.maxCapacity})` : `FULL (${sec.enrolled}/${sec.maxCapacity})`}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleToggleWatch(sec)}
                              className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                                isWatched
                                  ? 'bg-[#0064a4] text-white shadow-xs'
                                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {isWatched ? '✓ Watching' : '+ Watch'}
                            </button>
                            <button
                              onClick={() => handleSimulateDrop(sec.courseCode)}
                              title="Simulate a student dropping this class to test alerts"
                              className="rounded-xl border border-dashed border-amber-300 bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-800 hover:bg-amber-100"
                            >
                              Test Drop
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: Active Watchlist & Notification Controls (5 cols) */}
          <div className="space-y-5 lg:col-span-5">
            {/* Notification Control Panel */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-600" />
                <span>Drop Alert Channels</span>
              </h3>

              <div className="space-y-3">
                {/* Audio Chime Toggle */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                  <div className="flex items-center gap-2.5">
                    {audioEnabled ? (
                      <Volume2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-slate-400" />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-800">Local Audio Chime</p>
                      <p className="text-[10px] text-slate-500">Synthesizes audio cheer on open seat</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={audioEnabled}
                    onChange={(e) => setAudioEnabled(e.target.checked)}
                    className="h-4 w-4 rounded-md accent-[#0064a4]"
                  />
                </div>

                {/* Browser Desktop Push */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
                  <div className="flex items-center gap-2.5">
                    <Bell className="h-4 w-4 text-[#0064a4]" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Browser Desktop Push</p>
                      <p className="text-[10px] text-slate-500">Desktop notification when tab is in background</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRequestNotificationPermission}
                    className={`rounded-xl px-2.5 py-1 text-[11px] font-bold ${
                      browserNotificationsEnabled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#0064a4] text-white'
                    }`}
                  >
                    {browserNotificationsEnabled ? 'Enabled' : 'Allow'}
                  </button>
                </div>

                {/* Discord Webhook Option */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800">Discord Webhook (Mobile Push)</p>
                    {discordSuccess && (
                      <span className="text-[10px] font-bold text-emerald-600">✓ Sent!</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://discord.com/api/webhooks/..."
                      value={discordWebhookUrl}
                      onChange={(e) => setDiscordWebhookUrl(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-800 focus:outline-hidden"
                    />
                    <button
                      onClick={handleTestDiscordWebhook}
                      className="shrink-0 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-900"
                    >
                      Test
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Watchlist Tray */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Watched Sections ({watchlist.length})
                </h3>
                {watchlist.length > 0 && (
                  <button
                    onClick={() => setWatchlist([])}
                    className="text-[11px] font-semibold text-rose-600 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {watchlist.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                  No sections on your watchlist. Click "+ Watch" on any course to monitor drops.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto pr-1">
                  {watchlist.map((sec) => (
                    <div key={sec.courseCode} className="py-2.5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs text-slate-900">
                            {sec.dept} {sec.courseNum}
                          </span>
                          <span className="rounded-md bg-slate-100 px-1.5 py-0.2 text-[10px] font-bold text-slate-700">
                            {sec.courseCode}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {sec.instructor} • Status: <strong>{sec.status}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSimulateDrop(sec.courseCode)}
                          className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100"
                        >
                          Trigger
                        </button>
                        <button
                          onClick={() => handleToggleWatch(sec)}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Module 2 & Module 3 Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Module 2: WebReg Fast-Copy & 1-Click Bookmarklet (6 cols) */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Bookmark className="h-5 w-5 text-[#0064a4]" />
                    <span>WebReg 5-Digit Fast Copy &amp; Preloader</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Never type 5-digit course codes under time pressure
                  </p>
                </div>
              </div>

              {/* Course Sequence Chips */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Selected Course Sequence ({selectedCodes.length})
                </label>
                <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  {selectedCodes.map((code) => (
                    <span
                      key={code}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-2.5 py-1 text-xs font-extrabold text-slate-800 shadow-2xs"
                    >
                      <span>{code}</span>
                      <button
                        onClick={() => handleRemoveCode(code)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        ✕
                      </button>
                    </span>
                  ))}

                  {/* Add Code Form */}
                  <form onSubmit={handleAddCustomCode} className="inline-flex items-center gap-1">
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="+ 5-digit"
                      value={customCodeInput}
                      onChange={(e) => setCustomCodeInput(e.target.value)}
                      className="w-20 rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs font-semibold focus:outline-hidden"
                    />
                  </form>
                </div>
              </div>

              {/* Action Buttons: 1-Click Copy & Draggable Bookmarklet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleCopyCodes}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#0064a4] px-4 py-3 text-xs font-extrabold text-white shadow-xs hover:bg-[#0c2340] transition-colors"
                >
                  {copyFeedback ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Copied {selectedCodes.length} Codes!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy All 5-Digit Codes</span>
                    </>
                  )}
                </button>

                <a
                  href={bookmarkletCode}
                  onClick={(e) => {
                    // Prevent navigation on click, instruct drag
                    e.preventDefault()
                    alert('Drag this button to your browser Bookmark Bar! When on the WebReg enrollment page, click it to auto-populate your course codes.')
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/80 px-4 py-3 text-xs font-extrabold text-amber-950 hover:bg-amber-100 transition-colors cursor-grab"
                >
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>Drag Me: WebReg Autofiller</span>
                </a>
              </div>

              {/* Instructions banner */}
              <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4 text-xs text-slate-700 space-y-1.5">
                <p className="font-bold text-[#0064a4]">How to use the WebReg Autofiller Bookmarklet:</p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600">
                  <li>Drag the amber button above into your Chrome / Safari Bookmarks bar.</li>
                  <li>Log in to WebReg normally with your NetID and Duo 2FA.</li>
                  <li>Click the bookmark on WebReg to populate all course codes in 1 second!</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Module 3: Waitlist Probability Calculator (6 cols) */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
                    <span>Waitlist Clearance Odds Calculator</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    UCI historical attrition &amp; fee drop predictive model
                  </p>
                </div>
              </div>

              {/* Sliders & Inputs */}
              <div className="grid grid-cols-2 gap-4">
                {/* Total Capacity Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Class Capacity:</span>
                    <span className="text-indigo-600">{wlCapacity} seats</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={500}
                    step={10}
                    value={wlCapacity}
                    onChange={(e) => setWlCapacity(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                {/* Waitlist Position Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Your Waitlist Position:</span>
                    <span className="text-indigo-600">#{wlPosition}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={wlPosition}
                    onChange={(e) => setWlPosition(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Department Dropdown */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Academic Department
                  </label>
                  <select
                    value={wlDept}
                    onChange={(e) => setWlDept(e.target.value as WaitlistDepartment)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
                  >
                    <option value="ICS">ICS / Computer Science (10% Attrition)</option>
                    <option value="MATH">Mathematics (14% Attrition)</option>
                    <option value="BIO_SCI">Biological Sciences (8% Attrition)</option>
                    <option value="ENGINEERING">Engineering (9% Attrition)</option>
                    <option value="HUMANITIES_SOCSCI">Humanities &amp; Social Sci (12%)</option>
                  </select>
                </div>

                {/* Timing Phase Dropdown */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Current Timing Phase
                  </label>
                  <select
                    value={wlTiming}
                    onChange={(e) => setWlTiming(e.target.value as WaitlistTiming)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
                  >
                    <option value="BEFORE_FEE_DEADLINE">Before Fee Deadline (High Drop)</option>
                    <option value="WEEK_0">Week 0 / Enrollment Window</option>
                    <option value="WEEK_1">Week 1 (Course Shopping)</option>
                    <option value="WEEK_2">Week 2 (Late Drop Freeze)</option>
                  </select>
                </div>
              </div>

              {/* Probability Results Display */}
              <div
                className={`rounded-2xl border p-4.5 transition-all ${
                  waitlistReport.tier === 'HIGH'
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : waitlistReport.tier === 'MODERATE'
                    ? 'border-amber-200 bg-amber-50/40'
                    : 'border-rose-200 bg-rose-50/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Clearance Probability
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-extrabold text-slate-900">
                        {waitlistReport.probability}%
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                          waitlistReport.tier === 'HIGH'
                            ? 'bg-emerald-100 text-emerald-800'
                            : waitlistReport.tier === 'MODERATE'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {waitlistReport.tier === 'HIGH'
                          ? 'HIGH ODDS (HOLD)'
                          : waitlistReport.tier === 'MODERATE'
                          ? 'MODERATE ODDS'
                          : 'LOW ODDS (PLAN B)'}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-700">
                      ≈ {waitlistReport.expectedDropCount} seats
                    </span>
                    <p className="text-[10px] text-slate-400">Projected total drops</p>
                  </div>
                </div>

                {/* Tactical Recommendation */}
                <p className="mt-3 text-xs leading-relaxed text-slate-700 border-t border-slate-200/60 pt-2.5">
                  <strong>Tactical Advice:</strong> {waitlistReport.tacticalAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Module 4: Pre-Flight Checklist */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <ListTodo className="h-5 w-5 text-amber-600" />
                <span>Pre-Flight WebReg Readiness Checklist</span>
              </h3>
              <p className="text-xs text-slate-500">
                Prevent enrollment window lockouts before your appointment begins
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              {Object.values(checklist).filter(Boolean).length} / 5 Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: 'zotaccount_hold',
                title: 'Check ZotAccount for \$0 Balance / Financial Holds',
                desc: 'Even an unpaid \$5 library or health fee will completely lock your WebReg window.',
                link: 'https://zotaccount.uci.edu/'
              },
              {
                id: 'prereq_clear',
                title: 'Prerequisite Clearances Verified in AntTrail',
                desc: 'Confirm all prerequisites (including transfer credits) are evaluated to avoid WebReg registration error blocks.',
                link: '/degree-planning'
              },
              {
                id: 'backup_discussions',
                title: 'Backup Discussion / Lab Section Codes Noted',
                desc: 'If your primary lecture or discussion is full, secondary discussion sections often remain open.',
                link: '#radar'
              },
              {
                id: 'bookmarklet_ready',
                title: 'WebReg Autofiller Bookmarklet Installed in Browser',
                desc: 'Installed on your bookmarks bar so you can populate codes in 1 second without typing.',
                link: '#bookmarklet'
              },
              {
                id: 'early_duo_test',
                title: 'Test Duo 2FA 10 Minutes Before Window Opens',
                desc: 'Avoid 2FA timeout or expired push notifications right when your window opens at 7:00 AM.',
                link: 'https://www.reg.uci.edu/registrar/soc/webreg.html'
              }
            ].map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                  checklist[item.id]
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!checklist[item.id]}
                  onChange={(e) => setChecklist((prev) => ({ ...prev, [item.id]: e.target.checked }))}
                  className="h-4 w-4 mt-1 rounded-md accent-emerald-600 shrink-0"
                />
                <div className="flex-1">
                  <span className="text-xs font-extrabold text-slate-900 block">
                    {item.title}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

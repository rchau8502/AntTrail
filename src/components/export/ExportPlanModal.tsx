import React, { useState, useMemo } from 'react'
import {
  StudentProfile,
  PlannedQuarter
} from '../../academic-engine/types'
import { UciGpaReport } from '../../academic-engine/gpa'
import {
  X,
  Download,
  FileText,
  Printer,
  Copy,
  Check,
  Award
} from 'lucide-react'

interface ExportPlanModalProps {
  isOpen: boolean
  onClose: () => void
  profile: StudentProfile
  plannedQuarters: PlannedQuarter[]
  programName: string
  overallProgress: number
  plannedProgress: number
  gpaReport: UciGpaReport
}

export const ExportPlanModal: React.FC<ExportPlanModalProps> = ({
  isOpen,
  onClose,
  profile,
  plannedQuarters,
  programName,
  overallProgress,
  plannedProgress,
  gpaReport
}) => {
  const [copied, setCopied] = useState(false)

  // Generate clean Markdown representation
  const markdownContent = useMemo(() => {
    const timestamp = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })

    let md = `# AntTrail Academic Degree Plan: ${profile.major}\n`
    md += `*Generated via AntTrail for UC Irvine on ${timestamp}*\n\n`
    md += `## Student Profile\n`
    md += `- **Major:** ${profile.major}\n`
    md += `- **Catalog Year:** ${profile.catalogYear}\n`
    md += `- **Class Standing:** ${profile.classStanding}\n`
    md += `- **Completed Units:** ${profile.completedUnits} units\n`
    md += `- **UC Cumulative GPA:** ${gpaReport.cumulativeGpa > 0 ? gpaReport.cumulativeGpa.toFixed(2) : 'N/A'}\n`
    md += `- **Academic Standing:** ${gpaReport.academicStanding.replace('_', ' ')}\n`
    md += `- **Degree Progress:** ${overallProgress}% completed (${plannedProgress}% with planned courses)\n\n`

    md += `## Completed Coursework (${profile.courseHistory.length} courses)\n`
    if (profile.courseHistory.length === 0) {
      md += `*No courses completed yet.*\n\n`
    } else {
      md += `| Term | Course | Units | Grade | Institution |\n`
      md += `| :--- | :--- | :---: | :---: | :--- |\n`
      profile.courseHistory.forEach((c) => {
        md += `| ${c.term || 'Prior'} | **${c.courseCode}** | ${c.units} | ${c.grade} | ${c.institution} |\n`
      })
      md += `\n`
    }

    md += `## Planned Quarter Schedule (${plannedQuarters.length} quarters)\n`
    if (plannedQuarters.length === 0) {
      md += `*No upcoming quarters scheduled.*\n\n`
    } else {
      plannedQuarters.forEach((q) => {
        const qUnits = q.courses.reduce((sum, c) => sum + c.units, 0)
        md += `### ${q.term} ${q.year} (${qUnits} units)\n`
        if (q.courses.length === 0) {
          md += `*No courses scheduled in this term.*\n\n`
        } else {
          q.courses.forEach((c) => {
            md += `- **${c.courseCode}** (${c.units} units)${c.customTitle ? ` - ${c.customTitle}` : ''}\n`
          })
          md += `\n`
        }
      })
    }

    md += `## Privacy & Academic Compliance\n`
    md += `> AntTrail is a deterministic, privacy-first academic roadmap tool. Prerequisites and GPA evaluations comply with official UC Irvine Academic Senate regulations (A340 and A345).\n`

    return md
  }, [profile, plannedQuarters, overallProgress, plannedProgress, gpaReport])

  if (!isOpen) return null

  const handleDownloadJson = () => {
    const exportData = {
      profile,
      plannedQuarters,
      degreeAuditSummary: {
        program: programName,
        overallProgress,
        plannedProgress
      },
      gpaReportSummary: {
        cumulativeGpa: gpaReport.cumulativeGpa,
        academicStanding: gpaReport.academicStanding
      }
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `anttrail-${profile.major.replace(/\s+/g, '_')}-plan.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const handleDownloadMarkdown = () => {
    const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(markdownContent)
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `anttrail-${profile.major.replace(/\s+/g, '_')}-roadmap.md`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div className="relative flex w-full max-w-2xl flex-col max-h-[90vh] rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-400">
                <Award className="h-3 w-3" />
                <span>Export & Share</span>
              </div>
              <h2 id="export-modal-title" className="text-lg font-extrabold text-white tracking-tight">
                Academic Roadmap Export
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close export modal"
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Cards */}
        <div className="p-6 border-b border-slate-800/80 bg-slate-950/40 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* JSON Export */}
          <button
            onClick={handleDownloadJson}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center hover:border-sky-500/40 hover:bg-slate-800/80 transition-all group"
          >
            <Download className="h-5 w-5 text-sky-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-white">Full JSON State</div>
              <div className="text-[10px] text-slate-400">For re-importing into AntTrail</div>
            </div>
          </button>

          {/* Markdown Report */}
          <button
            onClick={handleDownloadMarkdown}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center hover:border-emerald-500/40 hover:bg-slate-800/80 transition-all group"
          >
            <FileText className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-white">Markdown Report</div>
              <div className="text-[10px] text-slate-400">For Notion, Obsidian & email</div>
            </div>
          </button>

          {/* Print / PDF */}
          <button
            onClick={handlePrint}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-center hover:border-amber-500/40 hover:bg-slate-800/80 transition-all group"
          >
            <Printer className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-white">Print / Save PDF</div>
              <div className="text-[10px] text-slate-400">Formatted advising handout</div>
            </div>
          </button>
        </div>

        {/* Markdown Preview Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Preview Summary Report
            </span>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
          </div>

          <pre className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap overflow-x-auto max-h-[300px]">
            {markdownContent}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 bg-slate-950/80">
          <span className="text-xs text-slate-500">
            Exported directly from browser memory.
          </span>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

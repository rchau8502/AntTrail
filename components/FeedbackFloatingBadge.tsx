'use client';

import React, { useState } from 'react';
import { MessageSquarePlus, X, Star, Bug, ExternalLink, Sparkles } from 'lucide-react';

export default function FeedbackFloatingBadge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">AntTrail Feedback</h4>
                <p className="text-[10px] text-slate-400">Built by Anteaters, for Anteaters</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              aria-label="Close feedback panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3.5 space-y-2">
            <a
              href="https://github.com/rchau8502/AntTrail/issues/new?template=bug_report.md&title=[Course%20Issue]:%20"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-3 hover:border-amber-400 hover:bg-amber-50/50 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Bug className="h-4 w-4 text-amber-600" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800 group-hover:text-amber-900">
                    Report Missing Course / Bug
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Prereq conflict, missing CC class, or WebReg error
                  </div>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-600" />
            </a>

            <a
              href="https://github.com/rchau8502/AntTrail"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-3 hover:border-sky-400 hover:bg-sky-50/50 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Star className="h-4 w-4 text-sky-600" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800 group-hover:text-sky-900">
                    Star the Project on GitHub
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Open-source code, PRs and stars are appreciated!
                  </div>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-sky-600" />
            </a>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>100% Free &amp; Open-Source</span>
            <span className="font-semibold text-slate-600">Zot Zot Zot! 🐜</span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-xl hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all ring-2 ring-white/10"
        title="Send feedback or report an issue"
      >
        <MessageSquarePlus className="h-4 w-4 text-anteater-gold" />
        <span className="hidden sm:inline">Feedback</span>
      </button>
    </div>
  );
}

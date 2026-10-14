"use client";

import React from "react";
import { useStorage } from "@/context/storage-context";
import { ShieldAlert, CheckCircle2, Lock } from "lucide-react";

export function DisclaimerModal() {
  const { has_agreed_disclaimer, setAgreedDisclaimer } = useStorage();

  if (has_agreed_disclaimer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200/90 shadow-2xl rounded-2xl max-w-lg w-full p-6 sm:p-7 space-y-5">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Student Conduct & Safety
            </span>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Academic Integrity & Responsibility
            </h2>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-900">ZotCanvas</strong> is an independent, student-engineered study organization and workload optimization companion for UC Irvine students.
        </p>

        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-950 leading-relaxed space-y-2">
          <p>
            <strong>UCI Academic Honesty Policy:</strong> ZotCanvas is strictly an organizational aid (milestone decomposition, study sprint tracking, campus resource matching). It does <em>not</em> complete homework, solve exams, or generate unauthorized deliverables.
          </p>
          <p className="font-semibold text-amber-900">
            Any academic dishonesty or misuse is <strong>entirely the student&apos;s own responsibility</strong>.
          </p>
        </div>

        <button
          onClick={() => setAgreedDisclaimer(true)}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all active:scale-[0.98]"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>I Understand & Agree to the Terms</span>
        </button>
      </div>
    </div>
  );
}

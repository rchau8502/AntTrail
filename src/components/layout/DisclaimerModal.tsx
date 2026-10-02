"use client";

import React from "react";
import { useStorage } from "@/context/storage-context";
import { ShieldAlert, CheckCircle2, Lock } from "lucide-react";

export function DisclaimerModal() {
  const { has_agreed_disclaimer, setAgreedDisclaimer } = useStorage();

  if (has_agreed_disclaimer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="p-2 rounded-[2.5rem] bg-white/10 border border-white/20 shadow-2xl max-w-lg w-full">
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-5">
          <div className="flex items-center space-x-3 text-amber-600">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                Student Conduct & Safety
              </span>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Academic Integrity & Responsibility
              </h2>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>ZotCanvas</strong> is an independent, student-engineered study organization and workload optimization companion for UC Irvine students.
          </p>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 leading-relaxed space-y-2">
            <p>
              <strong>UCI Academic Honesty Policy:</strong> ZotCanvas is strictly an organizational aid (milestone decomposition, study sprint tracking, campus resource matching). It does <em>not</em> complete homework, solve exams, or generate unauthorized deliverables.
            </p>
            <p className="font-semibold text-amber-900">
              Any academic dishonesty or misuse is <strong>entirely the student&apos;s own responsibility</strong>.
            </p>
          </div>

          <button
            onClick={() => setAgreedDisclaimer(true)}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-full bg-uci-blue hover:bg-uci-darkblue text-white font-bold text-xs shadow-bezel transition-all active:scale-[0.98]"
          >
            <CheckCircle2 className="w-4 h-4 text-uci-gold" />
            <span>I Understand & Agree to the Terms</span>
          </button>
        </div>
      </div>
    </div>
  );
}

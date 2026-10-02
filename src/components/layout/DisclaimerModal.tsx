"use client";

import React from "react";
import { useStorage } from "@/context/storage-context";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

export function DisclaimerModal() {
  const { has_agreed_disclaimer, setAgreedDisclaimer } = useStorage();

  if (has_agreed_disclaimer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center space-x-3 text-amber-600 mb-4">
          <ShieldAlert className="w-8 h-8 flex-shrink-0" />
          <h2 className="text-xl font-bold text-slate-900">Academic Integrity & Disclaimer</h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          <strong>ZotCanvas</strong> is an independent, student-built time management, study organization, and campus resource companion for UC Irvine students.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 leading-relaxed space-y-2 mb-6">
          <p>
            <strong>UCI Academic Honesty Notice:</strong> ZotCanvas is strictly an organizational aid. It does <em>not</em> complete assignments, write code, or generate exam solutions.
          </p>
          <p>
            Any academic dishonesty, unauthorized collaboration, or violation of the UCI Academic Honesty Policy is <strong>entirely the user&apos;s own responsibility</strong>. The authors and hosts disclaim all liability for user academic conduct.
          </p>
        </div>

        <button
          onClick={() => setAgreedDisclaimer(true)}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-uci-blue text-white font-medium hover:bg-uci-darkblue transition-colors shadow-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-uci-gold" />
          <span>I Understand & Agree</span>
        </button>
      </div>
    </div>
  );
}

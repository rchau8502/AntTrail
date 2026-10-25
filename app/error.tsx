'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, GraduationCap, ShieldCheck } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error details without leaking client state
    console.error('AntTrail Application Error:', error.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg text-center space-y-6">
        {/* Anteater Error Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-extrabold text-rose-700 shadow-xs">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>Something went off track</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
          Unexpected Workstation Glitch
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your local academic vault and student profile remain safely preserved. Click below to re-initialize the session or navigate back to the main hub.
        </p>

        {error?.digest && (
          <div className="text-[10px] font-mono text-slate-400 bg-slate-100 rounded-lg py-1 px-3 inline-block">
            Error ID: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0064a4] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#004f82] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
          >
            <Home className="w-4 h-4 text-[#ffd200]" />
            <span>Return to Home</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero Server Retention: All academic plans stay local on your device.</span>
        </div>
      </div>
    </div>
  );
}

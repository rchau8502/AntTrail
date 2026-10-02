"use client";

import React from "react";
import { DailyWorkload } from "@/types/study";
import { AlertTriangle, CheckCircle, Flame } from "lucide-react";

export function BurnoutGuard({ workloads }: { workloads: DailyWorkload[] }) {
  const burnoutDays = workloads.filter((w) => w.isBurnoutRisk);
  const totalUpcomingHours = Math.round(workloads.reduce((acc, curr) => acc + curr.estimatedHours, 0) * 10) / 10;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 text-sm">Workload Fatigue & Burnout Guard</h3>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
          {totalUpcomingHours} hrs estimated across 7 days
        </span>
      </div>

      {burnoutDays.length > 0 ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start space-x-3 text-red-900">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold">Heavy Crunch Alert on {burnoutDays.map((d) => d.dayLabel).join(", ")}!</p>
            <p className="text-red-800">
              You have {burnoutDays[0].estimatedHours} hours of estimated homework due on a single day. Consider pulling the core drafting phase forward by 24–48 hours to prevent fatigue.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center space-x-2 text-emerald-900 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Workload is well-balanced across the week. No excessive deadline clustering detected!</span>
        </div>
      )}
    </div>
  );
}

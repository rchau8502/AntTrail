"use client";

import React from "react";
import { DailyWorkload } from "@/types/study";
import { AlertCircle, CheckCircle2, Flame, Sparkles } from "lucide-react";

export function BurnoutGuard({ workloads }: { workloads: DailyWorkload[] }) {
  const burnoutDays = workloads.filter((w) => w.isBurnoutRisk);
  const totalUpcomingHours = Math.round(workloads.reduce((acc, curr) => acc + curr.estimatedHours, 0) * 10) / 10;
  const maxDayHours = Math.max(...workloads.map((w) => w.estimatedHours), 1);

  return (
    <div className="p-1.5 rounded-[2rem] bg-slate-900/5 border border-slate-200/80 shadow-bezel">
      <div className="rounded-[calc(2rem-0.375rem)] bg-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-4">
        {/* Header with Eyebrow and Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${burnoutDays.length > 0 ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"}`}>
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                Workload Fatigue Engine
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
                Burnout Guard & Daily Stress Gauge
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-900 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              {totalUpcomingHours} hrs / 7 days
            </span>
          </div>
        </div>

        {/* Status Callout Banner */}
        {burnoutDays.length > 0 ? (
          <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200/90 text-rose-950 flex items-start space-x-3 text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-rose-900 block">
                Crunch Spike Detected: {burnoutDays.map((d) => d.dayLabel).join(", ")}
              </span>
              <p className="text-rose-800">
                You have {burnoutDays[0].estimatedHours} estimated hours clustered on a single day. Shift Milestone Phase 1 & 2 forward by 24–48 hours to preserve peak performance.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 flex items-center space-x-3 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-medium">
              Optimal study distribution detected. No individual day exceeds the 6-hour fatigue ceiling.
            </span>
          </div>
        )}

        {/* Micro Load Indicator Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-500">
            <span>Daily Distribution Profile</span>
            <span>Peak: {maxDayHours}h</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5 h-2">
            {workloads.map((day) => {
              const pct = Math.min((day.estimatedHours / 8) * 100, 100);
              let barColor = "bg-slate-200";
              if (day.estimatedHours >= 6) barColor = "bg-rose-500";
              else if (day.estimatedHours >= 3) barColor = "bg-amber-400";
              else if (day.estimatedHours > 0) barColor = "bg-emerald-400";

              return (
                <div key={day.dateString} className="h-full bg-slate-100 rounded-full overflow-hidden" title={`${day.dayLabel}: ${day.estimatedHours}h`}>
                  <div
                    className={`h-full ${barColor} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(pct, 10)}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

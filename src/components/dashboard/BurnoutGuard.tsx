"use client";

import React from "react";
import { DailyWorkload } from "@/types/study";
import { AlertCircle, CheckCircle2, Flame, ShieldAlert, Sparkles } from "lucide-react";

export function BurnoutGuard({ workloads }: { workloads: DailyWorkload[] }) {
  const burnoutDays = workloads.filter((w) => w.isBurnoutRisk);
  const totalUpcomingHours = Math.round(workloads.reduce((acc, curr) => acc + curr.estimatedHours, 0) * 10) / 10;
  const maxDayHours = Math.max(...workloads.map((w) => w.estimatedHours), 1);

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Header with Title and Total Load Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              burnoutDays.length > 0 ? "bg-rose-50 text-rose-600 border border-rose-200/80" : "bg-slate-100 text-slate-700"
            }`}
          >
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
                Workload Capacity Gauge
              </h3>
              {burnoutDays.length > 0 && (
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <ShieldAlert className="w-3 h-3" />
                  <span>Burnout Spike</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Deterministic 6-hour daily fatigue ceiling monitoring
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold font-mono text-slate-800 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80">
            {totalUpcomingHours} hrs / 7d
          </span>
        </div>
      </div>

      {/* Status Alert Banner */}
      {burnoutDays.length > 0 ? (
        <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/90 text-rose-950 flex items-start space-x-3 text-xs leading-relaxed">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-rose-900 block">
              Heavy Load Detected: {burnoutDays.map((d) => d.dayLabel).join(", ")}
            </span>
            <p className="text-rose-800">
              You have {burnoutDays[0].estimatedHours} hours scheduled on a single day. Spread assignments forward to maintain focus.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 flex items-center space-x-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-medium text-slate-600">
            Optimal pacing: no single day exceeds the 6-hour fatigue ceiling.
          </span>
        </div>
      )}

      {/* 7-Day Capacity Columns */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between text-[11px] font-semibold text-slate-400">
          <span>Daily Intensity Profile</span>
          <span>Peak: {maxDayHours}h</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {workloads.map((day) => {
            const isHigh = day.estimatedHours >= 6;
            const isMed = day.estimatedHours >= 3 && day.estimatedHours < 6;
            const isZero = day.estimatedHours === 0;

            const heightPct = Math.min((day.estimatedHours / 8) * 100, 100);

            return (
              <div
                key={day.dateString}
                className="flex flex-col items-center space-y-1.5"
                title={`${day.dayLabel}: ${day.estimatedHours} hours`}
              >
                <div className="w-full h-16 bg-slate-50 border border-slate-100 rounded-lg p-1 flex flex-col justify-end overflow-hidden">
                  <div
                    className={`w-full rounded-md transition-all duration-300 ${
                      isHigh
                        ? "bg-rose-500"
                        : isMed
                        ? "bg-amber-400"
                        : isZero
                        ? "bg-transparent"
                        : "bg-uci-blue/70"
                    }`}
                    style={{ height: `${Math.max(heightPct, isZero ? 0 : 15)}%` }}
                  />
                </div>
                <div className="text-center">
                  <span className="font-mono text-[10px] font-bold text-slate-700 block">
                    {day.estimatedHours}h
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium block truncate max-w-[40px]">
                    {day.dayLabel.split(" ")[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

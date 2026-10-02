"use client";

import React from "react";
import { DailyWorkload } from "@/types/study";
import { CheckCircle2, Flame, ShieldAlert } from "lucide-react";

export function BurnoutGuard({ workloads }: { workloads: DailyWorkload[] }) {
  const burnoutDays = workloads.filter((w) => w.isBurnoutRisk);
  const totalUpcomingHours =
    Math.round(workloads.reduce((acc, curr) => acc + curr.estimatedHours, 0) * 10) / 10;
  const maxDayHours = Math.max(...workloads.map((w) => w.estimatedHours), 1);

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full space-y-4">
      {/* Header with Title and Total Load Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              burnoutDays.length > 0 ? "bg-rose-500 animate-pulse" : "bg-emerald-500"
            }`}
          />
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            Workload Sentinel
          </span>
        </div>

        <span className="text-xs font-bold font-mono text-slate-700 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80">
          {totalUpcomingHours} hrs / 7d
        </span>
      </div>

      {/* 7-Day Capacity Columns (Sparkline) */}
      <div className="space-y-1.5 pt-1">
        <div className="grid grid-cols-7 gap-1.5 items-end">
          {workloads.map((day) => {
            const isHigh = day.estimatedHours >= 6;
            const isMed = day.estimatedHours >= 3 && day.estimatedHours < 6;
            const isZero = day.estimatedHours === 0;

            const heightPct = Math.min((day.estimatedHours / 8) * 100, 100);

            return (
              <div
                key={day.dateString}
                className="flex flex-col items-center space-y-1"
                title={`${day.dayLabel}: ${day.estimatedHours} hours`}
              >
                <div className="w-full h-11 bg-slate-50 border border-slate-100 rounded-md p-0.5 flex flex-col justify-end overflow-hidden">
                  <div
                    className={`w-full rounded-xs transition-all duration-300 ${
                      isHigh
                        ? "bg-rose-600"
                        : isMed
                        ? "bg-slate-800"
                        : isZero
                        ? "bg-transparent"
                        : "bg-slate-700"
                    }`}
                    style={{ height: `${Math.max(heightPct, isZero ? 0 : 20)}%` }}
                  />
                </div>
                <div className="text-center">
                  <span className="font-mono text-[9px] font-bold text-slate-700 block">
                    {day.estimatedHours}h
                  </span>
                  <span className="text-[8px] text-slate-400 font-mono block truncate max-w-[32px]">
                    {day.dayLabel.split(" ")[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Alert Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        {burnoutDays.length > 0 ? (
          <div className="flex items-center space-x-1.5 text-rose-700 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="truncate max-w-[210px]">
              Spike: {burnoutDays.map((d) => d.dayLabel.split(" ")[0]).join(", ")} &gt; 6h
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-1.5 text-slate-600 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Optimal pace · &lt; 6h ceiling</span>
          </div>
        )}

        <span className="text-[10px] font-mono text-slate-400">
          Peak: {maxDayHours}h
        </span>
      </div>
    </div>
  );
}

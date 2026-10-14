"use client";

import React from "react";
import { DailyWorkload } from "@/types/study";
import { Calendar as CalendarIcon } from "lucide-react";

export function WorkloadHeatmap({ workloads }: { workloads: DailyWorkload[] }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
              7-Day Study Workload Heatmap
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              Temporal Distribution
            </span>
          </div>
        </div>
        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
          Aggregated Deadlines
        </span>
      </div>

      {/* 7-Day Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
        {workloads.map((day) => {
          let badgeClass = "bg-slate-100 text-slate-600 border-slate-200";

          if (day.estimatedHours >= 6) {
            badgeClass = "bg-rose-50 text-rose-700 border-rose-200/80 font-bold";
          } else if (day.estimatedHours >= 3) {
            badgeClass = "bg-amber-50 text-amber-800 border-amber-200/80 font-semibold";
          } else if (day.estimatedHours > 0) {
            badgeClass = "bg-slate-100 text-slate-700 border-slate-200 font-medium";
          } else {
            badgeClass = "bg-slate-50 text-slate-400 border-slate-100 font-normal";
          }

          return (
            <div
              key={day.dateString}
              className="p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 flex flex-col justify-between text-center space-y-2.5 shadow-2xs hover:shadow-xs transition-all"
            >
              <div>
                <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                  {day.dayLabel}
                </span>
                <div className="text-xl font-bold font-mono tracking-tight text-slate-900 mt-1">
                  {day.estimatedHours}h
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className={`inline-block text-[10px] px-2 py-0.5 rounded-md border ${badgeClass}`}>
                  {day.assignmentCount} {day.assignmentCount === 1 ? "task" : "tasks"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { DailyWorkload } from "@/types/study";
import { Calendar as CalendarIcon } from "lucide-react";

export function WorkloadHeatmap({ workloads }: { workloads: DailyWorkload[] }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-uci-blue" />
          <h3 className="font-bold text-slate-900 text-sm">7-Day Study Workload Heatmap</h3>
        </div>
        <span className="text-xs text-slate-500">Calculated from assignment due dates</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {workloads.map((day) => {
          let bgClass = "bg-slate-50 border-slate-200 text-slate-700";
          if (day.estimatedHours >= 6) {
            bgClass = "bg-red-50 border-red-300 text-red-900";
          } else if (day.estimatedHours >= 3) {
            bgClass = "bg-amber-50 border-amber-300 text-amber-900";
          } else if (day.estimatedHours > 0) {
            bgClass = "bg-emerald-50 border-emerald-300 text-emerald-900";
          }

          return (
            <div key={day.dateString} className={`p-3.5 rounded-xl border ${bgClass} text-center space-y-1`}>
              <span className="block text-[11px] font-bold uppercase">{day.dayLabel}</span>
              <div className="text-xl font-black">{day.estimatedHours}h</div>
              <span className="block text-[10px] text-slate-500">
                {day.assignmentCount} {day.assignmentCount === 1 ? "task" : "tasks"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

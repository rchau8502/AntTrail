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
          let containerBg = "bg-slate-50/70 border-slate-200/80 text-slate-700";
          let tagBg = "bg-slate-200/60 text-slate-600";

          if (day.estimatedHours >= 6) {
            containerBg = "bg-rose-50/80 border-rose-300 text-rose-950";
            tagBg = "bg-rose-100 text-rose-700 font-bold";
          } else if (day.estimatedHours >= 3) {
            containerBg = "bg-amber-50/80 border-amber-300 text-amber-950";
            tagBg = "bg-amber-100 text-amber-800 font-semibold";
          } else if (day.estimatedHours > 0) {
            containerBg = "bg-emerald-50/80 border-emerald-300 text-emerald-950";
            tagBg = "bg-emerald-100 text-emerald-800 font-semibold";
          }

          return (
            <div
              key={day.dateString}
              className={`p-3.5 rounded-xl border ${containerBg} flex flex-col justify-between text-center space-y-2 hover:-translate-y-0.5 transition-transform`}
            >
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {day.dayLabel}
                </span>
                <div className="text-2xl font-black font-mono tracking-tight mt-1">
                  {day.estimatedHours}h
                </div>
              </div>

              <div className="pt-2 border-t border-black/5">
                <span className={`inline-block text-[10px] px-2 py-0.5 rounded-md font-semibold ${tagBg}`}>
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

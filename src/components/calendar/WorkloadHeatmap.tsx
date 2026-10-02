"use client";

import React from "react";
import { DailyWorkload } from "@/types/study";
import { Calendar as CalendarIcon, Flame, CheckCircle, Clock } from "lucide-react";

export function WorkloadHeatmap({ workloads }: { workloads: DailyWorkload[] }) {
  return (
    <div className="p-1.5 rounded-[2rem] bg-slate-900/5 border border-slate-200/80 shadow-bezel">
      <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-uci-blue/10 text-uci-blue flex items-center justify-center border border-uci-blue/20">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                Temporal Distribution
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
                7-Day Study Workload Heatmap
              </h3>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Real-time deadline aggregation
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {workloads.map((day) => {
            let containerBg = "bg-slate-50/70 border-slate-200/80 text-slate-700";
            let tagBg = "bg-slate-200/60 text-slate-600";

            if (day.estimatedHours >= 6) {
              containerBg = "bg-rose-50/80 border-rose-300 text-rose-950 shadow-xs";
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
                className={`p-4 rounded-2xl border ${containerBg} flex flex-col justify-between text-center space-y-2 hover:scale-[1.02] transition-transform`}
              >
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {day.dayLabel}
                  </span>
                  <div className="text-2xl font-black tracking-tight mt-1">
                    {day.estimatedHours}h
                  </div>
                </div>

                <div className="pt-2 border-t border-black/5">
                  <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full ${tagBg}`}>
                    {day.assignmentCount} {day.assignmentCount === 1 ? "task" : "tasks"}
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

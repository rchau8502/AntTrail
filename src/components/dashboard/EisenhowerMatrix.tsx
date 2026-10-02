"use client";

import React from "react";
import { PrioritizedAssignment } from "@/types/study";
import { AlertCircle, Calendar, CheckSquare, Clock, ArrowUpRight } from "lucide-react";

export function EisenhowerMatrix({
  priorities,
  onSelectAssignment,
}: {
  priorities: PrioritizedAssignment[];
  onSelectAssignment: (p: PrioritizedAssignment) => void;
}) {
  const doFirst = priorities.filter((p) => p.quadrant === "do_first");
  const schedule = priorities.filter((p) => p.quadrant === "schedule");
  const quick = priorities.filter((p) => p.quadrant === "delegate_or_quick");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
            Algorithmic Prioritization
          </span>
          <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
            Eisenhower Execution Matrix
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          Ranked by points × countdown
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Do First (Urgent) */}
        <div className="p-1.5 rounded-[2rem] bg-rose-500/10 border border-rose-200 shadow-bezel">
          <div className="rounded-[calc(2rem-0.375rem)] bg-white p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-3 min-h-[260px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-rose-100 mb-3">
                <div className="flex items-center space-x-2 text-rose-700">
                  <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Do Today ({doFirst.length})</span>
                </div>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  &lt; 48h
                </span>
              </div>

              <div className="space-y-2.5">
                {doFirst.length === 0 ? (
                  <div className="py-10 text-center text-xs text-slate-400 italic">
                    All urgent deadlines resolved!
                  </div>
                ) : (
                  doFirst.map((item) => (
                    <div
                      key={item.assignment.id}
                      onClick={() => onSelectAssignment(item)}
                      className="group p-3 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-rose-300 hover:shadow-bezel-hover transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold text-uci-blue tracking-tight uppercase">
                          {item.courseName}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-slate-200/60 group-hover:bg-rose-100 group-hover:text-rose-600 flex items-center justify-center transition-colors">
                          <ArrowUpRight className="w-3 h-3" />
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-rose-900">
                        {item.assignment.name}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                        <span className="font-bold text-slate-700">{item.assignment.points_possible} pts</span>
                        <span className="text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">
                          {item.hoursUntilDue !== null ? `${item.hoursUntilDue}h left` : "Urgent"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Ahead */}
        <div className="p-1.5 rounded-[2rem] bg-amber-500/10 border border-amber-200 shadow-bezel">
          <div className="rounded-[calc(2rem-0.375rem)] bg-white p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-3 min-h-[260px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-amber-100 mb-3">
                <div className="flex items-center space-x-2 text-amber-700">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Plan Ahead ({schedule.length})</span>
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  3–7 days
                </span>
              </div>

              <div className="space-y-2.5">
                {schedule.length === 0 ? (
                  <div className="py-10 text-center text-xs text-slate-400 italic">
                    No mid-term projects pending.
                  </div>
                ) : (
                  schedule.map((item) => (
                    <div
                      key={item.assignment.id}
                      onClick={() => onSelectAssignment(item)}
                      className="group p-3 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-bezel-hover transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold text-uci-blue tracking-tight uppercase">
                          {item.courseName}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-slate-200/60 group-hover:bg-amber-100 group-hover:text-amber-700 flex items-center justify-center transition-colors">
                          <ArrowUpRight className="w-3 h-3" />
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-amber-900">
                        {item.assignment.name}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                        <span className="font-bold text-slate-700">{item.assignment.points_possible} pts</span>
                        <span className="text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                          {item.hoursUntilDue !== null ? `${Math.round(item.hoursUntilDue / 24)}d left` : "Upcoming"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Wins */}
        <div className="p-1.5 rounded-[2rem] bg-emerald-500/10 border border-emerald-200 shadow-bezel">
          <div className="rounded-[calc(2rem-0.375rem)] bg-white p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-3 min-h-[260px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100 mb-3">
                <div className="flex items-center space-x-2 text-emerald-700">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckSquare className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Quick Wins ({quick.length})</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  &lt; 30 min
                </span>
              </div>

              <div className="space-y-2.5">
                {quick.length === 0 ? (
                  <div className="py-10 text-center text-xs text-slate-400 italic">
                    Minor quizzes and check-ins complete!
                  </div>
                ) : (
                  quick.map((item) => (
                    <div
                      key={item.assignment.id}
                      onClick={() => onSelectAssignment(item)}
                      className="group p-3 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-bezel-hover transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold text-uci-blue tracking-tight uppercase">
                          {item.courseName}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-slate-200/60 group-hover:bg-emerald-100 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                          <ArrowUpRight className="w-3 h-3" />
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-emerald-900">
                        {item.assignment.name}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                        <span className="font-bold text-slate-700">{item.assignment.points_possible} pts</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                          Fast
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

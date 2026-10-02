"use client";

import React from "react";
import { PrioritizedAssignment } from "@/types/study";
import { AlertCircle, Calendar, CheckSquare } from "lucide-react";

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
        <h3 className="font-bold text-slate-900 text-base">Prioritized Task Matrix (Eisenhower Engine)</h3>
        <span className="text-xs text-slate-500 font-medium">Auto-scored by points & due countdown</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Do First */}
        <div className="bg-red-50/60 rounded-2xl p-4 border border-red-200">
          <div className="flex items-center space-x-2 text-red-700 font-bold text-xs uppercase tracking-wide mb-3">
            <AlertCircle className="w-4 h-4" />
            <span>Do Today / Urgent ({doFirst.length})</span>
          </div>
          <div className="space-y-2">
            {doFirst.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No urgent deadlines pending!</p>
            ) : (
              doFirst.map((item) => (
                <div
                  key={item.assignment.id}
                  onClick={() => onSelectAssignment(item)}
                  className="bg-white rounded-xl p-3 border border-red-100 shadow-sm hover:border-red-300 hover:shadow transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold text-uci-blue uppercase">{item.courseName}</span>
                    <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                      {item.hoursUntilDue !== null ? `${item.hoursUntilDue}h left` : "Urgent"}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 mt-1 line-clamp-2">{item.assignment.name}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>{item.assignment.points_possible} pts</span>
                    <span>~{item.estimatedHours} hrs</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200">
          <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-wide mb-3">
            <Calendar className="w-4 h-4" />
            <span>Schedule Ahead ({schedule.length})</span>
          </div>
          <div className="space-y-2">
            {schedule.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No mid-term projects pending.</p>
            ) : (
              schedule.map((item) => (
                <div
                  key={item.assignment.id}
                  onClick={() => onSelectAssignment(item)}
                  className="bg-white rounded-xl p-3 border border-amber-100 shadow-sm hover:border-amber-300 hover:shadow transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold text-uci-blue uppercase">{item.courseName}</span>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      {item.hoursUntilDue !== null ? `${Math.round(item.hoursUntilDue / 24)}d left` : "Upcoming"}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 mt-1 line-clamp-2">{item.assignment.name}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>{item.assignment.points_possible} pts</span>
                    <span>~{item.estimatedHours} hrs</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Wins */}
        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wide mb-3">
            <CheckSquare className="w-4 h-4" />
            <span>Quick Wins / Low Stakes ({quick.length})</span>
          </div>
          <div className="space-y-2">
            {quick.length === 0 ? (
              <p className="text-xs text-slate-500 italic">All minor tasks clear.</p>
            ) : (
              quick.map((item) => (
                <div
                  key={item.assignment.id}
                  onClick={() => onSelectAssignment(item)}
                  className="bg-white rounded-xl p-3 border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold text-uci-blue uppercase">{item.courseName}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Fast
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 mt-1 line-clamp-2">{item.assignment.name}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>{item.assignment.points_possible} pts</span>
                    <span>~{item.estimatedHours} hrs</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

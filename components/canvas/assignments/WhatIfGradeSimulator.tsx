"use client";

import React from "react";
import { useStorage } from "@/context/storage-context";
import { CanvasAssignment } from "@/types/canvas";
import { calculateWhatIfGrade } from "@/lib/grade-simulator";
import { Calculator, TrendingUp } from "lucide-react";

export function WhatIfGradeSimulator({
  assignments,
  courseName,
}: {
  assignments: CanvasAssignment[];
  courseName: string;
}) {
  const { what_if_grades, setWhatIfScore } = useStorage();
  const summary = calculateWhatIfGrade(assignments, what_if_grades);

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Header with Projected Score */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight truncate max-w-[180px]">
              {courseName}
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              What-If Grade Simulator
            </span>
          </div>
        </div>

        <div className="flex items-baseline space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
          <span className="text-lg font-black text-slate-900 font-mono tracking-tight">
            {summary.percentage}%
          </span>
          <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
            {summary.letterGrade}
          </span>
        </div>
      </div>

      {/* Sliders Container */}
      <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
        {assignments.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400">
            No graded assignments found for this course.
          </div>
        ) : (
          assignments.map((a) => {
            const currentScore = what_if_grades[a.id] ?? Math.round(a.points_possible * 0.85);
            const scorePct = a.points_possible > 0 ? Math.round((currentScore / a.points_possible) * 100) : 0;

            return (
              <div
                key={a.id}
                className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1.5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 truncate max-w-[180px]" title={a.name}>
                    {a.name}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {currentScore}/{a.points_possible} ({scorePct}%)
                  </span>
                </div>

                <div className="relative flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={Math.max(a.points_possible, 1)}
                    value={currentScore}
                    onChange={(e) => setWhatIfScore(a.id, Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
        <span className="flex items-center space-x-1 text-slate-500 font-medium">
          <TrendingUp className="w-3.5 h-3.5 text-slate-700" />
          <span>Interactive weights</span>
        </span>
        <span className="font-mono text-slate-600 font-semibold">
          {summary.earnedPoints} / {summary.totalPoints} pts
        </span>
      </div>
    </div>
  );
}

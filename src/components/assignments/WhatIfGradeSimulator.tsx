"use client";

import React from "react";
import { useStorage } from "@/context/storage-context";
import { CanvasAssignment } from "@/types/canvas";
import { calculateWhatIfGrade } from "@/lib/grade-simulator";
import { Calculator, Sparkles, TrendingUp } from "lucide-react";

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
    <div className="p-1.5 rounded-[2rem] bg-slate-900/5 border border-slate-200/80 shadow-bezel">
      <div className="rounded-[calc(2rem-0.375rem)] bg-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-4">
        {/* Header with Projected Score */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-uci-blue/10 text-uci-blue flex items-center justify-center border border-uci-blue/20">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                Grade Projection
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-tight truncate max-w-[180px]">
                {courseName}
              </h3>
            </div>
          </div>

          <div className="flex items-baseline space-x-2 bg-gradient-to-tr from-slate-50 to-uci-lightgold/30 px-3.5 py-1.5 rounded-2xl border border-amber-200/60 shadow-sm">
            <span className="text-xl font-black text-uci-darkblue tracking-tight">
              {summary.percentage}%
            </span>
            <span className="text-xs font-black text-uci-blue bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-xs">
              {summary.letterGrade}
            </span>
          </div>
        </div>

        {/* Sliders Container */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {assignments.map((a) => {
            const currentScore = what_if_grades[a.id] ?? Math.round(a.points_possible * 0.85);
            const scorePct = Math.round((currentScore / a.points_possible) * 100);

            return (
              <div
                key={a.id}
                className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2 hover:bg-white hover:border-uci-blue/40 transition-all"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 truncate max-w-[200px]" title={a.name}>
                    {a.name}
                  </span>
                  <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                    {currentScore} / {a.points_possible} pts ({scorePct}%)
                  </span>
                </div>

                <div className="relative flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={a.points_possible}
                    value={currentScore}
                    onChange={(e) => setWhatIfScore(a.id, Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-uci-blue"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span className="flex items-center space-x-1 text-slate-600">
            <TrendingUp className="w-3.5 h-3.5 text-uci-blue" />
            <span>Interactive Simulator</span>
          </span>
          <span className="font-semibold text-slate-700">
            {summary.earnedPoints} / {summary.totalPoints} total pts
          </span>
        </div>
      </div>
    </div>
  );
}

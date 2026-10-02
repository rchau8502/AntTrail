"use client";

import React from "react";
import { useStorage } from "@/context/storage-context";
import { CanvasAssignment } from "@/types/canvas";
import { calculateWhatIfGrade } from "@/lib/grade-simulator";
import { Calculator } from "lucide-react";

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
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-uci-blue" />
          <h3 className="font-bold text-slate-900 text-sm">What-If Grade Simulator ({courseName})</h3>
        </div>
        <div className="text-right">
          <span className="text-xl font-extrabold text-uci-blue">{summary.percentage}%</span>
          <span className="ml-1.5 text-sm font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {summary.letterGrade}
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {assignments.map((a) => {
          const currentScore = what_if_grades[a.id] ?? Math.round(a.points_possible * 0.85);
          return (
            <div key={a.id} className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-800 truncate max-w-[240px]">{a.name}</span>
                <span className="font-mono text-slate-600 font-bold">
                  {currentScore} / {a.points_possible} pts
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={a.points_possible}
                value={currentScore}
                onChange={(e) => setWhatIfScore(a.id, Number(e.target.value))}
                className="w-full accent-uci-blue cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

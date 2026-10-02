"use client";

import React from "react";
import { CanvasCourse, CanvasAssignment } from "@/types/canvas";
import { useStorage } from "@/context/storage-context";
import { calculateWhatIfGrade } from "@/lib/grade-simulator";
import { Calculator, ArrowUpRight, TrendingUp } from "lucide-react";

export function GradeHorizonBento({
  courses,
  selectedCourseId,
  onSelectCourseId,
  assignments,
  onOpenSimulator,
}: {
  courses: CanvasCourse[];
  selectedCourseId: number | null;
  onSelectCourseId: (id: number) => void;
  assignments: CanvasAssignment[];
  onOpenSimulator: () => void;
}) {
  const { what_if_grades } = useStorage();

  const activeCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0];

  const courseAssignments = activeCourse
    ? assignments.filter((a) => a.course_id === activeCourse.id)
    : [];

  const summary = calculateWhatIfGrade(courseAssignments, what_if_grades);

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-slate-400" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">
            Grade Horizon
          </span>
        </div>

        {/* Course Dropdown Selector */}
        {courses.length > 0 && (
          <select
            value={activeCourse?.id || ""}
            onChange={(e) => onSelectCourseId(Number(e.target.value))}
            className="text-[11px] font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200/90 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-slate-300 max-w-[140px] truncate cursor-pointer"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.course_code || c.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Main Metric: Projected Score & Letter Grade */}
      <div className="flex items-baseline justify-between pt-1">
        <div>
          <div className="flex items-baseline space-x-2.5">
            <span className="text-3xl sm:text-4xl font-mono font-black tracking-tight text-slate-900">
              {summary.percentage}%
            </span>
            <span className="text-xs font-black text-slate-900 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-md font-mono">
              {summary.letterGrade}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium truncate max-w-[180px] mt-1">
            {activeCourse ? activeCourse.name : "Select a course"}
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-400 block">Baseline</span>
          <span className="font-mono text-xs font-bold text-slate-700">
            {summary.earnedPoints}/{summary.totalPoints} pts
          </span>
        </div>
      </div>

      {/* Action Footer: Launch Modal */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-medium flex items-center space-x-1">
          <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
          <span>Interactive Target</span>
        </span>

        <button
          onClick={onOpenSimulator}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-all flex items-center space-x-1 active:scale-95 shadow-2xs"
        >
          <span>Simulate</span>
          <ArrowUpRight className="w-3 h-3 text-slate-300" />
        </button>
      </div>
    </div>
  );
}

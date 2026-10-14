"use client";

import React from "react";
import { CanvasCourse, CanvasAssignment } from "@/types/canvas";
import { useStorage } from "@/context/storage-context";
import { calculateWhatIfGrade } from "@/lib/grade-simulator";
import { X, Calculator, TrendingUp, RotateCcw } from "lucide-react";

export function WhatIfModal({
  isOpen,
  onClose,
  courses,
  selectedCourseId,
  onSelectCourseId,
  assignments,
}: {
  isOpen: boolean;
  onClose: () => void;
  courses: CanvasCourse[];
  selectedCourseId: number | null;
  onSelectCourseId: (id: number) => void;
  assignments: CanvasAssignment[];
}) {
  const { what_if_grades, setWhatIfScore } = useStorage();

  if (!isOpen) return null;

  const activeCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0];

  const courseAssignments = activeCourse
    ? assignments.filter((a) => a.course_id === activeCourse.id)
    : [];

  const summary = calculateWhatIfGrade(courseAssignments, what_if_grades);

  const resetCourseGrades = () => {
    courseAssignments.forEach((a) => {
      setWhatIfScore(a.id, Math.round(a.points_possible * 0.85));
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200/90 shadow-2xl rounded-2xl max-w-2xl w-full p-6 space-y-5 my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                What-If Grade Simulator
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Adjust scores on future assignments to see their mathematical impact on your final letter grade.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Course Pills Switcher */}
        {courses.length > 1 && (
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 flex-shrink-0">
            {courses.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCourseId(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-tight whitespace-nowrap transition-all border ${
                  activeCourse?.id === c.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {c.course_code || c.name}
              </button>
            ))}
          </div>
        )}

        {/* Score Readout Hero Banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between flex-shrink-0">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              Projected Final Grade
            </span>
            <h3 className="font-extrabold text-slate-900 text-sm truncate max-w-sm">
              {activeCourse?.name || "Selected Course"}
            </h3>
          </div>

          <div className="flex items-baseline space-x-3">
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">Points</span>
              <span className="text-xs font-mono font-bold text-slate-700">
                {summary.earnedPoints} / {summary.totalPoints}
              </span>
            </div>
            <div className="flex items-baseline space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-2xl font-black font-mono text-slate-900">
                {summary.percentage}%
              </span>
              <span className="text-xs font-black font-mono text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                {summary.letterGrade}
              </span>
            </div>
          </div>
        </div>

        {/* Sliders Container (Scrollable) */}
        <div className="space-y-3 overflow-y-auto pr-1 flex-1 min-h-[200px]">
          {courseAssignments.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 italic">
              No assignments found for this course to simulate.
            </div>
          ) : (
            courseAssignments.map((a) => {
              const currentScore =
                what_if_grades[a.id] ?? Math.round(a.points_possible * 0.85);
              const scorePct =
                a.points_possible > 0
                  ? Math.round((currentScore / a.points_possible) * 100)
                  : 0;

              return (
                <div
                  key={a.id}
                  className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-2 hover:border-slate-300 transition-colors shadow-2xs"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span
                      className="font-bold text-slate-800 truncate max-w-md"
                      title={a.name}
                    >
                      {a.name}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
                      {currentScore} / {a.points_possible} pts ({scorePct}%)
                    </span>
                  </div>

                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min="0"
                      max={Math.max(a.points_possible, 1)}
                      value={currentScore}
                      onChange={(e) =>
                        setWhatIfScore(a.id, Number(e.target.value))
                      }
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
          <button
            onClick={resetCourseGrades}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all active:scale-95 shadow-2xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

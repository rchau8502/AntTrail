"use client";

import React from "react";
import { useStorage } from "@/context/storage-context";
import { X, Check, Eye, EyeOff, BookOpen, RotateCcw, AlertTriangle } from "lucide-react";

export function CourseFilterModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    cached_courses,
    hidden_course_ids,
    toggleCourseHidden,
    unhideAllCourses,
  } = useStorage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="p-2 rounded-[2.5rem] bg-slate-900/10 border border-white/20 shadow-2xl max-w-xl w-full my-8">
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-uci-blue bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Course Visibility
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
                Filter Active & Past Quarter Courses
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Toggle off past quarter classes or audited courses so they don&apos;t flood your priority matrix.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">
              {cached_courses.length - (hidden_course_ids?.length || 0)} of {cached_courses.length} Courses Visible
            </span>
            {(hidden_course_ids?.length || 0) > 0 && (
              <button
                onClick={() => unhideAllCourses()}
                className="text-uci-blue hover:text-uci-darkblue font-bold flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Show All Courses</span>
              </button>
            )}
          </div>

          {/* Courses List */}
          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {cached_courses.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 italic">
                No courses currently synced. Connect your Canvas token to load courses.
              </div>
            ) : (
              cached_courses.map((course) => {
                const isHidden = hidden_course_ids?.includes(course.id);
                return (
                  <div
                    key={course.id}
                    onClick={() => toggleCourseHidden(course.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isHidden
                        ? "bg-slate-100/70 border-slate-200 opacity-60"
                        : "bg-white border-slate-200 hover:border-uci-blue hover:shadow-xs"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-xs font-bold ${
                            isHidden ? "text-slate-500 line-through" : "text-uci-blue"
                          }`}
                        >
                          {course.course_code || `Course ${course.id}`}
                        </span>
                        {course.term_name && (
                          <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.2 rounded-full">
                            {course.term_name}
                          </span>
                        )}
                        {course.concluded && (
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                            Concluded
                          </span>
                        )}
                      </div>
                      <h4
                        className={`text-xs font-semibold leading-snug ${
                          isHidden ? "text-slate-400 line-through" : "text-slate-800"
                        }`}
                      >
                        {course.name}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ${
                          isHidden
                            ? "bg-slate-200 text-slate-600"
                            : "bg-uci-blue text-white shadow-2xs"
                        }`}
                      >
                        {isHidden ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hidden</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Active</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[11px] text-slate-400 flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>Hidden courses are preserved in cache but removed from deadlines and metrics.</span>
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

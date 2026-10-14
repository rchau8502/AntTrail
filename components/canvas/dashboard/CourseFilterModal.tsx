"use client";

import React from "react";
import { useStorage } from "@/context/storage-context";
import { X, Eye, EyeOff, BookOpen, RotateCcw } from "lucide-react";

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

  const visibleCount = cached_courses.length - (hidden_course_ids?.length || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200/90 shadow-2xl rounded-2xl max-w-lg w-full p-6 space-y-5 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Course Visibility Filter
              </h2>
              <span className="text-[10px] font-bold font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {visibleCount}/{cached_courses.length} Active
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Toggle off past quarter classes or audited courses to clean up your dashboard.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-500">
            Click any course to toggle visibility:
          </span>
          {(hidden_course_ids?.length || 0) > 0 && (
            <button
              onClick={() => unhideAllCourses()}
              className="text-slate-800 hover:text-slate-950 font-bold flex items-center space-x-1 text-xs transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Unhide All</span>
            </button>
          )}
        </div>

        {/* Course Cards List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {cached_courses.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 italic">
              No courses found in local storage. Connect Canvas to sync courses.
            </div>
          ) : (
            cached_courses.map((course) => {
              const isHidden = hidden_course_ids?.includes(course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => toggleCourseHidden(course.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isHidden
                      ? "bg-slate-50 border-slate-200/60 opacity-60"
                      : "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-2xs"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isHidden ? "text-slate-400 line-through" : "text-slate-900"
                        }`}
                      >
                        {course.course_code || `Course ${course.id}`}
                      </span>
                      {course.term_name && (
                        <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.2 rounded">
                          {course.term_name}
                        </span>
                      )}
                      {course.concluded && (
                        <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/80">
                          Concluded
                        </span>
                      )}
                    </div>
                    <h4
                      className={`text-xs font-medium leading-snug line-clamp-1 ${
                        isHidden ? "text-slate-400 line-through" : "text-slate-600"
                      }`}
                    >
                      {course.name}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1.5 ${
                        isHidden
                          ? "bg-slate-200 text-slate-600"
                          : "bg-slate-900 text-white shadow-2xs"
                      }`}
                    >
                      {isHidden ? (
                        <>
                          <EyeOff className="w-3 h-3 text-slate-500" />
                          <span>Hidden</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3 text-white" />
                          <span>Visible</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-400 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Hidden courses are preserved locally but removed from deadlines.</span>
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { Navbar } from "@/components/layout/Navbar";
import { DisclaimerModal } from "@/components/layout/DisclaimerModal";
import { BurnoutGuard } from "@/components/dashboard/BurnoutGuard";
import { PomodoroTimer } from "@/components/dashboard/PomodoroTimer";
import { EisenhowerMatrix } from "@/components/dashboard/EisenhowerMatrix";
import { CourseFilterModal } from "@/components/dashboard/CourseFilterModal";
import { AssignmentDetailModal } from "@/components/assignments/AssignmentDetailModal";
import { WhatIfGradeSimulator } from "@/components/assignments/WhatIfGradeSimulator";
import { WorkloadHeatmap } from "@/components/calendar/WorkloadHeatmap";
import { UciResourceHub } from "@/components/resources/UciResourceHub";
import { prioritizeAssignments, calculateDailyWorkload } from "@/lib/priority-engine";
import { calculateQuarterWeek } from "@/lib/grade-simulator";
import { CanvasAssignment } from "@/types/canvas";
import { PrioritizedAssignment } from "@/types/study";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Clock,
  AlertCircle,
  Filter,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

export default function Home() {
  const {
    cached_courses,
    cached_assignments,
    canvas_token,
    is_demo_mode,
    enableDemoMode,
    completed_assignment_ids,
    hidden_course_ids,
    toggleAssignmentCompleted,
    toggleCourseHidden,
  } = useStorage();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAssignment, setSelectedAssignment] = useState<CanvasAssignment | null>(null);
  const [activeFocusName, setActiveFocusName] = useState<string | undefined>(undefined);
  const [selectedSimulatorCourseId, setSelectedSimulatorCourseId] = useState<number | null>(null);
  const [isCourseFilterOpen, setIsCourseFilterOpen] = useState(false);

  const courseMap = cached_courses.reduce<Record<number, string>>((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {});

  // Visible courses (excluding hidden / past quarter)
  const visibleCourses = cached_courses.filter((c) => !hidden_course_ids?.includes(c.id));
  const visibleAssignments = cached_assignments.filter((a) => !hidden_course_ids?.includes(a.course_id));

  // Prioritize active, non-completed assignments from visible courses
  const prioritized = prioritizeAssignments(
    cached_assignments,
    courseMap,
    completed_assignment_ids,
    hidden_course_ids
  );

  const workloads = calculateDailyWorkload(
    cached_assignments,
    completed_assignment_ids,
    hidden_course_ids
  );

  const completedAssignments = cached_assignments.filter((a) =>
    completed_assignment_ids?.includes(a.id)
  );

  const quarterWeek = calculateQuarterWeek();

  // Active course for What-If Simulator (prefer visible course)
  const activeSimCourse =
    visibleCourses.find((c) => c.id === selectedSimulatorCourseId) ||
    visibleCourses[0] ||
    cached_courses[0];

  const handleSelectPrioritized = (item: PrioritizedAssignment) => {
    setSelectedAssignment(item.assignment);
  };

  const handleStartFocus = (a: CanvasAssignment) => {
    setActiveFocusName(a.name);
    setSelectedAssignment(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <DisclaimerModal />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pb-16 space-y-6">
        {/* Quarter Pace Status Pill Bar */}
        <div className="p-1.5 rounded-[2rem] bg-slate-900/5 border border-slate-200/80 shadow-bezel">
          <div className="rounded-[calc(2rem-0.375rem)] bg-white px-6 py-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-uci-lightgold flex items-center justify-center text-uci-darkblue border border-amber-300 shadow-sm font-extrabold text-sm">
                W{quarterWeek}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-sm text-slate-900 tracking-tight">
                    Academic Quarter Timeline
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-uci-blue/10 text-uci-blue border border-blue-200">
                    Week {quarterWeek} of 10
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {visibleCourses.length} Active Courses
                  {hidden_course_ids?.length > 0 && ` (${hidden_course_ids.length} hidden)`} •{" "}
                  {visibleAssignments.length} Assignments In Flight
                </p>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              {cached_courses.length > 0 && (
                <button
                  onClick={() => setIsCourseFilterOpen(true)}
                  className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-white text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-2xs hover:border-uci-blue"
                >
                  <Filter className="w-3.5 h-3.5 text-uci-blue" />
                  <span>Filter Courses ({visibleCourses.length}/{cached_courses.length})</span>
                </button>
              )}

              {!canvas_token && !is_demo_mode ? (
                <button
                  onClick={() => enableDemoMode()}
                  className="px-4 py-2 rounded-full bg-uci-gold hover:bg-yellow-400 text-slate-950 font-bold text-xs shadow-gold-glow transition-all flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch UCI Demo Data</span>
                </button>
              ) : (
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Client-Side Privacy</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Course Visibility Chips Bar */}
        {cached_courses.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 px-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex-shrink-0">
              Courses:
            </span>
            {cached_courses.map((course) => {
              const isHidden = hidden_course_ids?.includes(course.id);
              return (
                <button
                  key={course.id}
                  onClick={() => toggleCourseHidden(course.id)}
                  title={isHidden ? `Click to show ${course.name}` : `Click to hide ${course.name}`}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-tight whitespace-nowrap transition-all flex items-center space-x-1.5 border ${
                    isHidden
                      ? "bg-slate-100/90 text-slate-400 border-slate-200 line-through hover:text-slate-600"
                      : "bg-white text-slate-800 border-slate-200 shadow-2xs hover:border-uci-blue hover:text-uci-blue"
                  }`}
                >
                  <span>{course.course_code || course.name}</span>
                  {isHidden ? (
                    <EyeOff className="w-3 h-3 text-slate-400" />
                  ) : (
                    <Eye className="w-3 h-3 text-uci-blue" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* View 1: Main Dashboard (Asymmetrical Bento Grid) */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Column (Span 2): Burnout Guard & Eisenhower Grid */}
              <div className="lg:col-span-2 space-y-6">
                <BurnoutGuard workloads={workloads} />
                <EisenhowerMatrix
                  priorities={prioritized}
                  completedAssignments={completedAssignments}
                  onSelectAssignment={handleSelectPrioritized}
                  onToggleComplete={toggleAssignmentCompleted}
                />
              </div>

              {/* Right Column (Span 1): Pomodoro Chronometer & What-If Grade Simulator */}
              <div className="space-y-6">
                <PomodoroTimer activeAssignmentName={activeFocusName} />

                {visibleCourses.length > 0 && activeSimCourse && (
                  <div className="space-y-3">
                    {/* Simulator Course Picker if > 1 course */}
                    {visibleCourses.length > 1 && (
                      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                        {visibleCourses.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setSelectedSimulatorCourseId(c.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tight whitespace-nowrap transition-all ${
                              activeSimCourse.id === c.id
                                ? "bg-uci-blue text-white shadow-sm"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            {c.course_code}
                          </button>
                        ))}
                      </div>
                    )}
                    <WhatIfGradeSimulator
                      assignments={cached_assignments.filter((a) => a.course_id === activeSimCourse.id)}
                      courseName={activeSimCourse.name}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* View 2: Assignments & Milestone Breakdown */}
        {activeTab === "assignments" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Assignments & Milestone Blueprints
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Select any assignment to inspect rubric thresholds, check off milestones, and mark tasks complete.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full w-max">
                  {visibleAssignments.length} Tracked Tasks
                </span>
                {completedAssignments.length > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-max">
                    {completedAssignments.length} Completed
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleAssignments.map((a) => {
                const isDone = completed_assignment_ids?.includes(a.id);
                return (
                  <div
                    key={a.id}
                    onClick={() => setSelectedAssignment(a)}
                    className={`p-1.5 rounded-[2rem] border shadow-bezel hover:shadow-bezel-hover transition-all cursor-pointer group flex flex-col justify-between ${
                      isDone
                        ? "bg-emerald-500/5 border-emerald-200/60 opacity-80"
                        : "bg-slate-900/5 border-slate-200/80"
                    }`}
                  >
                    <div className="rounded-[calc(2rem-0.375rem)] bg-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between h-full space-y-4">
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wide text-uci-blue bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                            {courseMap[a.course_id] || `Course ${a.course_id}`}
                          </span>
                          {a.due_at && (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                              {new Date(a.due_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                          )}
                        </div>

                        <h3
                          className={`font-extrabold text-sm mt-2 line-clamp-2 leading-snug transition-colors ${
                            isDone ? "line-through text-slate-400" : "text-slate-900 group-hover:text-uci-blue"
                          }`}
                        >
                          {a.name}
                        </h3>

                        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {a.description.replace(/<[^>]*>?/gm, "") || "No assignment details specified."}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <span className="font-bold text-slate-800">{a.points_possible} pts</span>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAssignmentCompleted(a.id);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 border transition-all active:scale-95 ${
                              isDone
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                                : "bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border-slate-200 hover:border-emerald-300"
                            }`}
                            title={isDone ? "Mark as incomplete" : "Mark as done"}
                          >
                            <Check className={`w-3 h-3 ${isDone ? "text-white" : "text-slate-400"}`} />
                            <span>{isDone ? "Done ✓" : "Mark Done"}</span>
                          </button>

                          <span className="text-uci-blue font-bold flex items-center space-x-0.5 group-hover:translate-x-1 transition-transform">
                            <span>Plan</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View 3: Workload & Calendar */}
        {activeTab === "workload" && (
          <div className="space-y-6">
            <WorkloadHeatmap workloads={workloads} />
            <BurnoutGuard workloads={workloads} />
          </div>
        )}

        {/* View 4: UCI Campus Hub */}
        {activeTab === "resources" && (
          <div className="space-y-6">
            <UciResourceHub />
          </div>
        )}
      </main>

      {/* Course Filter Modal */}
      <CourseFilterModal
        isOpen={isCourseFilterOpen}
        onClose={() => setIsCourseFilterOpen(false)}
      />

      {/* Assignment Detail Modal */}
      <AssignmentDetailModal
        assignment={selectedAssignment}
        courseName={selectedAssignment ? courseMap[selectedAssignment.course_id] : ""}
        onClose={() => setSelectedAssignment(null)}
        onStartFocus={handleStartFocus}
      />
    </div>
  );
}

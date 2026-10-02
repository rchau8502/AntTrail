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
  Filter,
  Eye,
  EyeOff,
  Check,
  CheckCircle2,
  Calendar,
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
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-slate-900 selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <DisclaimerModal />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pb-20 space-y-6">
        {/* Executive Command Header */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Quarter Pace Timeline */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-sm text-slate-900 tracking-tight">
                Academic Quarter Timeline
              </span>
              <span className="text-[10px] font-bold font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                Week {quarterWeek} of 10
              </span>
            </div>

            {/* 10 Discreet Week Ticks */}
            <div className="flex items-center space-x-1.5">
              {Array.from({ length: 10 }).map((_, idx) => {
                const weekNum = idx + 1;
                const isCurrent = weekNum === quarterWeek;
                const isPast = weekNum < quarterWeek;

                return (
                  <div
                    key={weekNum}
                    className={`h-2 rounded-full transition-all ${
                      isCurrent
                        ? "w-8 bg-uci-blue shadow-2xs"
                        : isPast
                        ? "w-5 bg-slate-800"
                        : "w-5 bg-slate-200"
                    }`}
                    title={`Week ${weekNum}`}
                  />
                );
              })}
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {visibleCourses.length} Enrolled Courses
              {hidden_course_ids?.length > 0 && ` (${hidden_course_ids.length} hidden)`} •{" "}
              {prioritized.length} Active Deadlines • {completedAssignments.length} Done
            </p>
          </div>

          {/* Interactive Course Visibility & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {cached_courses.length > 0 && (
              <div className="flex items-center flex-wrap gap-1.5">
                {cached_courses.map((course) => {
                  const isHidden = hidden_course_ids?.includes(course.id);
                  return (
                    <button
                      key={course.id}
                      onClick={() => toggleCourseHidden(course.id)}
                      title={isHidden ? `Click to show ${course.name}` : `Click to hide ${course.name}`}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold tracking-tight whitespace-nowrap transition-all flex items-center space-x-1 border ${
                        isHidden
                          ? "bg-slate-50 text-slate-400 border-slate-200/60 line-through"
                          : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs"
                      }`}
                    >
                      <span>{course.course_code || course.name}</span>
                      {isHidden ? (
                        <EyeOff className="w-3 h-3 text-slate-400" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-uci-blue" />
                      )}
                    </button>
                  );
                })}

                <button
                  onClick={() => setIsCourseFilterOpen(true)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center space-x-1 transition-colors"
                >
                  <Filter className="w-3 h-3 text-slate-500" />
                  <span>Filter</span>
                </button>
              </div>
            )}

            {!canvas_token && !is_demo_mode ? (
              <button
                onClick={() => enableDemoMode()}
                className="px-3.5 py-1.5 rounded-xl bg-uci-gold hover:bg-yellow-400 text-slate-950 font-bold text-xs shadow-xs transition-all flex items-center space-x-1.5 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Demo</span>
              </button>
            ) : (
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>100% Client-Side</span>
              </div>
            )}
          </div>
        </div>

        {/* View 1: Main Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Column (Span 2): Burnout Capacity & Eisenhower Matrix */}
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
                    {/* Simulator Course Picker */}
                    {visibleCourses.length > 1 && (
                      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                        {visibleCourses.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setSelectedSimulatorCourseId(c.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold tracking-tight whitespace-nowrap transition-all border ${
                              activeSimCourse.id === c.id
                                ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
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
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Select any assignment to inspect rubric thresholds, check off milestones, and mark tasks complete.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg">
                  {visibleAssignments.length} Tasks
                </span>
                {completedAssignments.length > 0 && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{completedAssignments.length} Done</span>
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleAssignments.map((a) => {
                const isDone = completed_assignment_ids?.includes(a.id);
                return (
                  <div
                    key={a.id}
                    onClick={() => setSelectedAssignment(a)}
                    className={`rounded-2xl border p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between space-y-4 ${
                      isDone
                        ? "bg-slate-50/60 border-slate-200 opacity-60"
                        : "bg-white border-slate-200/90 hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          {courseMap[a.course_id] || `Course ${a.course_id}`}
                        </span>
                        {a.due_at && (
                          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {new Date(a.due_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        )}
                      </div>

                      <h3
                        className={`font-bold text-sm mt-2.5 line-clamp-2 leading-snug transition-colors ${
                          isDone ? "line-through text-slate-400" : "text-slate-900 group-hover:text-uci-blue"
                        }`}
                      >
                        {a.name}
                      </h3>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {a.description.replace(/<[^>]*>?/gm, "") || "No assignment details specified."}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">{a.points_possible} pts</span>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAssignmentCompleted(a.id);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border transition-all active:scale-95 ${
                            isDone
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 border-slate-200"
                          }`}
                          title={isDone ? "Mark incomplete" : "Mark done"}
                        >
                          <Check className={`w-3 h-3 ${isDone ? "text-white" : "text-slate-400"}`} />
                          <span>{isDone ? "Done ✓" : "Done"}</span>
                        </button>

                        <span className="text-slate-500 font-semibold flex items-center space-x-0.5 group-hover:text-uci-blue group-hover:translate-x-0.5 transition-all">
                          <span>Milestones</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
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

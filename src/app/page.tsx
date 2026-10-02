"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { Navbar } from "@/components/layout/Navbar";
import { DisclaimerModal } from "@/components/layout/DisclaimerModal";
import { BurnoutGuard } from "@/components/dashboard/BurnoutGuard";
import { PomodoroTimer } from "@/components/dashboard/PomodoroTimer";
import { EisenhowerMatrix } from "@/components/dashboard/EisenhowerMatrix";
import { AssignmentDetailModal } from "@/components/assignments/AssignmentDetailModal";
import { WhatIfGradeSimulator } from "@/components/assignments/WhatIfGradeSimulator";
import { WorkloadHeatmap } from "@/components/calendar/WorkloadHeatmap";
import { UciResourceHub } from "@/components/resources/UciResourceHub";
import { prioritizeAssignments, calculateDailyWorkload } from "@/lib/priority-engine";
import { calculateQuarterWeek } from "@/lib/grade-simulator";
import { CanvasAssignment } from "@/types/canvas";
import { PrioritizedAssignment } from "@/types/study";
import { Sparkles, ArrowRight, ShieldCheck, BookOpen, Clock, AlertCircle } from "lucide-react";

export default function Home() {
  const { cached_courses, cached_assignments, canvas_token, is_demo_mode, enableDemoMode } = useStorage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAssignment, setSelectedAssignment] = useState<CanvasAssignment | null>(null);
  const [activeFocusName, setActiveFocusName] = useState<string | undefined>(undefined);
  const [selectedSimulatorCourseId, setSelectedSimulatorCourseId] = useState<number | null>(null);

  const courseMap = cached_courses.reduce<Record<number, string>>((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {});

  const prioritized = prioritizeAssignments(cached_assignments, courseMap);
  const workloads = calculateDailyWorkload(cached_assignments);
  const quarterWeek = calculateQuarterWeek();

  // Active course for What-If Simulator
  const activeSimCourse =
    cached_courses.find((c) => c.id === selectedSimulatorCourseId) ||
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
                  {cached_courses.length} Active Courses • {cached_assignments.length} Total Assignments In Flight
                </p>
              </div>
            </div>

            {!canvas_token && !is_demo_mode ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => enableDemoMode()}
                  className="px-4 py-2 rounded-full bg-uci-gold hover:bg-yellow-400 text-slate-950 font-bold text-xs shadow-gold-glow transition-all flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch UCI Demo Data</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Client-Side Privacy Active</span>
              </div>
            )}
          </div>
        </div>

        {/* View 1: Main Dashboard (Asymmetrical Bento Grid) */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Column (Span 2): Burnout Guard & Eisenhower Grid */}
              <div className="lg:col-span-2 space-y-6">
                <BurnoutGuard workloads={workloads} />
                <EisenhowerMatrix priorities={prioritized} onSelectAssignment={handleSelectPrioritized} />
              </div>

              {/* Right Column (Span 1): Pomodoro Chronometer & What-If Grade Simulator */}
              <div className="space-y-6">
                <PomodoroTimer activeAssignmentName={activeFocusName} />

                {cached_courses.length > 0 && activeSimCourse && (
                  <div className="space-y-3">
                    {/* Simulator Course Picker if > 1 course */}
                    {cached_courses.length > 1 && (
                      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                        {cached_courses.map((c) => (
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
                  Select any assignment to inspect rubric thresholds, check off milestones, and access study support.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full w-max">
                {cached_assignments.length} Tracked Tasks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cached_assignments.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedAssignment(a)}
                  className="p-1.5 rounded-[2rem] bg-slate-900/5 border border-slate-200/80 shadow-bezel hover:shadow-bezel-hover transition-all cursor-pointer group flex flex-col justify-between"
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

                      <h3 className="font-extrabold text-sm text-slate-900 mt-2 line-clamp-2 leading-snug group-hover:text-uci-blue transition-colors">
                        {a.name}
                      </h3>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {a.description.replace(/<[^>]*>?/gm, "") || "No assignment details specified."}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span className="font-bold text-slate-800">{a.points_possible} pts</span>
                      <span className="text-uci-blue font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                        <span>Milestones</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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

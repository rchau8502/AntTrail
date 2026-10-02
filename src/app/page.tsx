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
import { AlertCircle, ArrowRight } from "lucide-react";

export default function Home() {
  const { cached_courses, cached_assignments, canvas_token, is_demo_mode } = useStorage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAssignment, setSelectedAssignment] = useState<CanvasAssignment | null>(null);
  const [activeFocusName, setActiveFocusName] = useState<string | undefined>(undefined);

  const courseMap = cached_courses.reduce<Record<number, string>>((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {});

  const prioritized = prioritizeAssignments(cached_assignments, courseMap);
  const workloads = calculateDailyWorkload(cached_assignments);
  const quarterWeek = calculateQuarterWeek();

  const handleSelectPrioritized = (item: PrioritizedAssignment) => {
    setSelectedAssignment(item.assignment);
  };

  const handleStartFocus = (a: CanvasAssignment) => {
    setActiveFocusName(a.name);
    setSelectedAssignment(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <DisclaimerModal />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Quarter Pace Header Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-uci-blue uppercase tracking-wider">Quarter Pace Tracker</span>
              <span className="text-xs bg-uci-lightgold text-uci-darkblue px-2 py-0.5 rounded font-bold">
                Week {quarterWeek} of 10
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active Courses: {cached_courses.length || "0"} | Pending Tasks: {cached_assignments.length}
            </p>
          </div>

          {!canvas_token && !is_demo_mode && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-3.5 py-2 text-xs text-blue-900 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-uci-blue flex-shrink-0" />
              <span>Connect your Canvas Token above or launch Demo Mode to load courses!</span>
            </div>
          )}
        </div>

        {/* View Switching */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <BurnoutGuard workloads={workloads} />
                <EisenhowerMatrix priorities={prioritized} onSelectAssignment={handleSelectPrioritized} />
              </div>

              <div className="space-y-6">
                <PomodoroTimer activeAssignmentName={activeFocusName} />
                {cached_courses.length > 0 && (
                  <WhatIfGradeSimulator
                    assignments={cached_assignments.filter((a) => a.course_id === cached_courses[0].id)}
                    courseName={cached_courses[0].name}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "assignments" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Assignments & Milestone Breakdown</h2>
                <p className="text-xs text-slate-500">Click any assignment to view rubric milestones and study support.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cached_assignments.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedAssignment(a)}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-uci-blue hover:shadow transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-uci-blue uppercase">
                      {courseMap[a.course_id] || `Course ${a.course_id}`}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1 line-clamp-2">{a.name}</h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {a.description.replace(/<[^>]*>?/gm, "") || "No prompt details."}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-bold">{a.points_possible} pts</span>
                    <span className="text-uci-blue font-semibold flex items-center space-x-1">
                      <span>View Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "workload" && (
          <div className="space-y-6">
            <WorkloadHeatmap workloads={workloads} />
            <BurnoutGuard workloads={workloads} />
          </div>
        )}

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

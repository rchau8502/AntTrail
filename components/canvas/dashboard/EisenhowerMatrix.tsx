"use client";

import React, { useState } from "react";
import { PrioritizedAssignment } from "@/types/study";
import { CanvasAssignment } from "@/types/canvas";
import {
  AlertCircle,
  Calendar,
  Zap,
  ArrowUpRight,
  Check,
  RotateCcw,
  Archive,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function EisenhowerMatrix({
  priorities,
  completedAssignments = [],
  onSelectAssignment,
  onToggleComplete,
}: {
  priorities: PrioritizedAssignment[];
  completedAssignments?: CanvasAssignment[];
  onSelectAssignment: (p: PrioritizedAssignment) => void;
  onToggleComplete?: (assignmentId: number) => void;
}) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // Exclude ancient overdue assignments (> 72 hours ago) from Do Today
  const doFirst = priorities.filter(
    (p) => p.quadrant === "do_first" && (p.hoursUntilDue === null || p.hoursUntilDue >= -72)
  );
  const schedule = priorities.filter((p) => p.quadrant === "schedule");
  const quick = priorities.filter((p) => p.quadrant === "delegate_or_quick");

  // Archived / ancient overdue tasks (> 72 hours ago)
  const archived = priorities.filter(
    (p) => p.quadrant === "backlog" || (p.hoursUntilDue !== null && p.hoursUntilDue < -72)
  );

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
            Algorithmic Prioritization
          </span>
          <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
            Eisenhower Execution Matrix
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          {completedAssignments.length > 0 && (
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200 transition-colors flex items-center space-x-1.5"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{completedAssignments.length} Done</span>
              {showCompleted ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
            </button>
          )}
          <span className="text-xs text-slate-500 font-medium bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200">
            Points × Urgency decay
          </span>
        </div>
      </div>

      {/* Tri-Column Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Do Today */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-4 space-y-3 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 ring-4 ring-rose-50" />
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                  Do Today
                </h4>
                <span className="text-[10px] font-mono font-bold text-rose-800 bg-rose-50 border border-rose-200/70 px-2 py-0.5 rounded-md">
                  {doFirst.length}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                &lt; 36h
              </span>
            </div>

            <div className="space-y-2.5">
              {doFirst.length === 0 ? (
                <div className="py-12 text-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-200/60">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-medium text-slate-400">All urgent deadlines resolved!</p>
                </div>
              ) : (
                doFirst.map((item) => (
                  <div
                    key={item.assignment.id}
                    onClick={() => onSelectAssignment(item)}
                    className="group p-3.5 rounded-xl bg-slate-50/60 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-150 cursor-pointer space-y-2"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold text-slate-700 bg-white border border-slate-200/80 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                        {item.courseName}
                      </span>
                      <div className="w-5 h-5 rounded-md bg-white border border-slate-200/60 group-hover:bg-slate-900 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>

                    <h5 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-slate-700 transition-colors">
                      {item.assignment.name}
                    </h5>

                    <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200/60">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-slate-600">{item.assignment.points_possible} pts</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[10px] font-bold text-rose-800 bg-rose-50 border border-rose-200/60 px-1.5 py-0.5 rounded-md">
                          {item.hoursUntilDue !== null
                            ? item.hoursUntilDue < 0
                              ? `${Math.abs(item.hoursUntilDue)}h late`
                              : `${item.hoursUntilDue}h left`
                            : "Urgent"}
                        </span>
                      </div>

                      {onToggleComplete && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleComplete(item.assignment.id);
                          }}
                          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white hover:bg-slate-900 hover:text-white text-slate-700 border border-slate-200 shadow-2xs transition-all active:scale-95 group/btn"
                          title="Mark completed"
                        >
                          <Check className="w-3 h-3 text-slate-400 group-hover/btn:text-white" />
                          <span>Done</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Plan Ahead */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-4 space-y-3 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-50" />
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                  Plan Ahead
                </h4>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                  {schedule.length}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                3–7 days
              </span>
            </div>

            <div className="space-y-2.5">
              {schedule.length === 0 ? (
                <div className="py-12 text-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-200/60">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-medium text-slate-400">No mid-term milestones pending.</p>
                </div>
              ) : (
                schedule.map((item) => (
                  <div
                    key={item.assignment.id}
                    onClick={() => onSelectAssignment(item)}
                    className="group p-3.5 rounded-xl bg-slate-50/60 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-150 cursor-pointer space-y-2"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold text-slate-700 bg-white border border-slate-200/80 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                        {item.courseName}
                      </span>
                      <div className="w-5 h-5 rounded-md bg-white border border-slate-200/60 group-hover:bg-slate-900 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>

                    <h5 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-slate-700 transition-colors">
                      {item.assignment.name}
                    </h5>

                    <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200/60">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-slate-600">{item.assignment.points_possible} pts</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded-md">
                          {item.hoursUntilDue !== null ? `${Math.round(item.hoursUntilDue / 24)}d left` : "Upcoming"}
                        </span>
                      </div>

                      {onToggleComplete && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleComplete(item.assignment.id);
                          }}
                          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white hover:bg-slate-900 hover:text-white text-slate-700 border border-slate-200 shadow-2xs transition-all active:scale-95 group/btn"
                          title="Mark completed"
                        >
                          <Check className="w-3 h-3 text-slate-400 group-hover/btn:text-white" />
                          <span>Done</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Quick Wins */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-4 space-y-3 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                  Quick Wins
                </h4>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                  {quick.length}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                &lt; 30m
              </span>
            </div>

            <div className="space-y-2.5">
              {quick.length === 0 ? (
                <div className="py-12 text-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-200/60">
                    <Zap className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-medium text-slate-400">All quick quizzes & checks complete!</p>
                </div>
              ) : (
                quick.map((item) => (
                  <div
                    key={item.assignment.id}
                    onClick={() => onSelectAssignment(item)}
                    className="group p-3.5 rounded-xl bg-slate-50/60 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-150 cursor-pointer space-y-2"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold text-slate-700 bg-white border border-slate-200/80 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                        {item.courseName}
                      </span>
                      <div className="w-5 h-5 rounded-md bg-white border border-slate-200/60 group-hover:bg-slate-900 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>

                    <h5 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-slate-700 transition-colors">
                      {item.assignment.name}
                    </h5>

                    <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200/60">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-slate-600">{item.assignment.points_possible} pts</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[10px] font-medium text-slate-600 bg-slate-100 border border-slate-200/60 px-1.5 py-0.5 rounded-md">
                          Fast win
                        </span>
                      </div>

                      {onToggleComplete && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleComplete(item.assignment.id);
                          }}
                          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white hover:bg-slate-900 hover:text-white text-slate-700 border border-slate-200 shadow-2xs transition-all active:scale-95 group/btn"
                          title="Mark completed"
                        >
                          <Check className="w-3 h-3 text-slate-400 group-hover/btn:text-white" />
                          <span>Done</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Completed Assignments Drawer */}
      {completedAssignments.length > 0 && showCompleted && (
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Completed Assignments ({completedAssignments.length})
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Click undo if marked by accident</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {completedAssignments.map((a) => (
              <div
                key={a.id}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700"
              >
                <div className="truncate pr-2">
                  <span className="line-through text-slate-400 font-medium block truncate">{a.name}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">{a.points_possible} pts</span>
                </div>
                {onToggleComplete && (
                  <button
                    onClick={() => onToggleComplete(a.id)}
                    className="flex-shrink-0 p-1 rounded-md hover:bg-white text-slate-400 hover:text-slate-800 transition-colors border border-transparent hover:border-slate-200"
                    title="Undo completion"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past-Due / Archived Tasks Accordion */}
      {archived.length > 0 && (
        <div className="pt-1">
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors flex items-center space-x-1.5"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>
              {showArchived ? "Hide" : "View"} {archived.length} Past-Due / Archived Task{archived.length > 1 ? "s" : ""}
            </span>
            {showArchived ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showArchived && (
            <div className="mt-2.5 p-3 rounded-xl bg-slate-100/80 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {archived.map((item) => (
                <div
                  key={item.assignment.id}
                  onClick={() => onSelectAssignment(item)}
                  className="p-2 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between cursor-pointer hover:border-slate-300"
                >
                  <div className="truncate pr-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase truncate">
                      {item.courseName}
                    </span>
                    <span className="font-semibold text-slate-700 truncate block">
                      {item.assignment.name}
                    </span>
                  </div>
                  {onToggleComplete && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleComplete(item.assignment.id);
                      }}
                      className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-emerald-600"
                      title="Mark as done"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

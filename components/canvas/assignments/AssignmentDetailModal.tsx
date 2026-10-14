"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { CanvasAssignment } from "@/types/canvas";
import { generateMilestonesForAssignment } from "@/lib/milestone-engine";
import { findRelevantUciResources } from "@/lib/uci-resources";
import { explainAssignmentWithGemini, AiHomeworkGuidance } from "@/lib/gemini-client";
import { CheckCircle2, Circle, Sparkles, ExternalLink, Clock, X, MapPin } from "lucide-react";

export function AssignmentDetailModal({
  assignment,
  courseName,
  onClose,
  onStartFocus,
}: {
  assignment: CanvasAssignment | null;
  courseName?: string;
  onClose: () => void;
  onStartFocus: (a: CanvasAssignment) => void;
}) {
  const {
    assignment_milestones,
    toggleMilestone,
    gemini_api_key,
    completed_assignment_ids,
    toggleAssignmentCompleted,
  } = useStorage();
  const [aiGuidance, setAiGuidance] = useState<AiHomeworkGuidance | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  if (!assignment) return null;

  const isCompleted = completed_assignment_ids?.includes(assignment.id);

  const currentMilestones = generateMilestonesForAssignment(
    assignment,
    assignment_milestones[assignment.id]
  );

  const uciResources = findRelevantUciResources(courseName || "", assignment.description);
  const completedCount = currentMilestones.filter((m) => m.completed).length;
  const progressPct = currentMilestones.length > 0 ? Math.round((completedCount / currentMilestones.length) * 100) : 0;

  const handleAskGemini = async () => {
    if (!gemini_api_key) {
      alert("No Gemini API Key found. You can add your free key in the Token settings, or use the built-in rule milestones!");
      return;
    }
    setIsAiLoading(true);
    setAiError(null);
    try {
      const guidance = await explainAssignmentWithGemini(
        assignment.name,
        assignment.description,
        gemini_api_key
      );
      setAiGuidance(guidance);
    } catch (e: any) {
      setAiError(e.message || "Failed to query Gemini API.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200/90 shadow-2xl rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-6 my-8">
        {/* Header Bar */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                {courseName || `Course ${assignment.course_id}`}
              </span>
              {isCompleted && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Completed</span>
                </span>
              )}
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {assignment.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-2.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{assignment.points_possible} Total Points</span>
              <span>•</span>
              <span>Due: {assignment.due_at ? new Date(assignment.due_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }) : "No fixed deadline"}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => toggleAssignmentCompleted(assignment.id)}
            className={`w-full sm:w-auto py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all active:scale-[0.98] ${
              isCompleted
                ? "bg-emerald-600 border-emerald-600 text-white shadow-xs hover:bg-emerald-700"
                : "bg-slate-100 hover:bg-emerald-50 border-slate-200 hover:border-emerald-300 text-slate-800"
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-white" : "text-emerald-600"}`} />
            <span>{isCompleted ? "Marked as Done ✓" : "Mark as Done"}</span>
          </button>

          <button
            onClick={() => onStartFocus(assignment)}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-xs active:scale-[0.98]"
          >
            <Clock className="w-4 h-4 text-white/80" />
            <span>Launch 25-Min Sprint</span>
          </button>

          {gemini_api_key && (
            <button
              onClick={handleAskGemini}
              disabled={isAiLoading}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              <span>{isAiLoading ? "Analyzing..." : "Concept Advice"}</span>
            </button>
          )}
        </div>

        {aiError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {aiError}
          </div>
        )}

        {/* AI Guidance Box if active */}
        {aiGuidance && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-2 animate-in fade-in">
            <div className="font-bold flex items-center space-x-1.5 text-slate-900">
              <Sparkles className="w-4 h-4 text-slate-600" />
              <span>Gemini Peer Tutor Analysis</span>
            </div>
            <p className="italic leading-relaxed">{aiGuidance.plainSummary}</p>
            <div className="space-y-1 pt-1">
              <span className="font-bold block">Action Milestones:</span>
              <ul className="list-disc pl-4 space-y-0.5">
                {aiGuidance.keyActionItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Milestone Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
                Milestone Task Checklist
              </h3>
              <p className="text-[11px] text-slate-400">
                Deconstructed deliverables to complete step-by-step
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">
              {progressPct}% ({completedCount}/{currentMilestones.length})
            </span>
          </div>

          <div className="space-y-2">
            {currentMilestones.map((m) => (
              <div
                key={m.id}
                onClick={() => toggleMilestone(assignment.id, m.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                  m.completed
                    ? "bg-slate-50/60 border-slate-200 text-slate-400"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {m.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 hover:text-slate-600" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <h4
                    className={`text-xs font-bold leading-snug ${
                      m.completed ? "line-through text-slate-400" : "text-slate-900"
                    }`}
                  >
                    {m.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed ${m.completed ? "text-slate-400" : "text-slate-600"}`}>
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Targeted UCI Campus Support */}
        {uciResources.length > 0 && (
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <span className="text-xs font-bold text-slate-900 block">
              Free Campus Academic Support for this Assignment:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {uciResources.slice(0, 2).map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white flex items-center justify-between text-xs group transition-all"
                >
                  <div>
                    <span className="font-bold text-slate-800 group-hover:text-slate-950 block">
                      {res.name}
                    </span>
                    <p className="text-[10px] text-slate-400 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{res.location}</span>
                    </p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 flex-shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

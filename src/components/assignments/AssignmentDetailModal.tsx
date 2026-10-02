"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { CanvasAssignment } from "@/types/canvas";
import { generateMilestonesForAssignment } from "@/lib/milestone-engine";
import { findRelevantUciResources } from "@/lib/uci-resources";
import { explainAssignmentWithGemini, AiHomeworkGuidance } from "@/lib/gemini-client";
import { CheckCircle2, Circle, Sparkles, ExternalLink, Clock, X, MapPin, ShieldCheck } from "lucide-react";

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
  const progressPct = Math.round((completedCount / currentMilestones.length) * 100);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Double-bezel Outer Shell */}
      <div className="p-2 rounded-[2.5rem] bg-slate-900/10 border border-white/20 shadow-2xl max-w-2xl w-full my-8">
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-6">
          {/* Header Bar */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-uci-blue bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {courseName || `Course ${assignment.course_id}`}
                </span>
                {isCompleted && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Completed</span>
                  </span>
                )}
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
                {assignment.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 pt-0.5">
                <span className="font-bold text-slate-800">{assignment.points_possible} Total Points</span>
                <span>•</span>
                <span>Due: {assignment.due_at ? new Date(assignment.due_at).toLocaleString() : "No fixed deadline"}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={() => toggleAssignmentCompleted(assignment.id)}
              className={`w-full sm:w-auto py-3 px-4 rounded-full border text-xs font-bold flex items-center justify-center space-x-2 transition-all active:scale-[0.98] ${
                isCompleted
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                  : "bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900"
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-white" : "text-emerald-700"}`} />
              <span>{isCompleted ? "Completed ✓" : "Mark as Done"}</span>
            </button>

            <button
              onClick={() => onStartFocus(assignment)}
              className="w-full sm:flex-1 py-3 px-4 rounded-full bg-uci-blue hover:bg-uci-darkblue text-white text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-bezel active:scale-[0.98]"
            >
              <Clock className="w-4 h-4 text-uci-gold" />
              <span>Launch 25-Minute Focus Sprint</span>
            </button>

            {gemini_api_key && (
              <button
                onClick={handleAskGemini}
                disabled={isAiLoading}
                className="w-full sm:w-auto py-3 px-4 rounded-full border border-purple-200 bg-purple-50/80 hover:bg-purple-100 text-purple-950 text-xs font-bold flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>{isAiLoading ? "Analyzing Prompt..." : "AI Concept Advice"}</span>
              </button>
            )}
          </div>

          {aiError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {aiError}
            </div>
          )}

          {/* AI Guidance Box if active */}
          {aiGuidance && (
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 space-y-2.5 animate-in fade-in">
              <div className="font-bold flex items-center space-x-1.5 text-purple-900">
                <Sparkles className="w-4 h-4 text-purple-600" />
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
              <p className="pt-1 text-[11px] text-purple-900 bg-purple-100/60 p-2 rounded-xl">
                <strong>Rubric Focus:</strong> {aiGuidance.rubricAdvice}
              </p>
            </div>
          )}

          {/* Milestone Checklist (Deterministic Rule Engine) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  Actionable Blueprint
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">
                  Milestone Task Checklist ({completedCount}/{currentMilestones.length})
                </h3>
              </div>
              <span className="text-xs font-black text-uci-blue px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                {progressPct}% Done
              </span>
            </div>

            <div className="space-y-2.5">
              {currentMilestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => toggleMilestone(assignment.id, m.id)}
                  className={`group p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                    m.completed
                      ? "bg-emerald-50/40 border-emerald-200/80 text-slate-400"
                      : "bg-slate-50/80 border-slate-200 hover:bg-white hover:border-uci-blue/40 shadow-xs"
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {m.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 group-hover:text-uci-blue transition-colors" />
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

          {/* Recommended UCI Campus Support */}
          {uciResources.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Targeted UCI Academic Support for this Assignment:
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Free Anteater Services</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {uciResources.slice(0, 2).map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl border border-slate-200 hover:border-uci-blue bg-slate-50/60 hover:bg-white flex items-center justify-between text-xs group transition-all"
                  >
                    <div>
                      <span className="font-bold text-slate-800 group-hover:text-uci-blue block">
                        {res.name}
                      </span>
                      <p className="text-[10px] text-slate-500 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{res.location}</span>
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-uci-blue flex-shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

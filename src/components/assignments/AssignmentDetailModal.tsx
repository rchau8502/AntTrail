"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { CanvasAssignment } from "@/types/canvas";
import { generateMilestonesForAssignment } from "@/lib/milestone-engine";
import { findRelevantUciResources } from "@/lib/uci-resources";
import { explainAssignmentWithGemini, AiHomeworkGuidance } from "@/lib/gemini-client";
import { CheckCircle2, Circle, Sparkles, ExternalLink, Clock } from "lucide-react";

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
  const { assignment_milestones, toggleMilestone, gemini_api_key } = useStorage();
  const [aiGuidance, setAiGuidance] = useState<AiHomeworkGuidance | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  if (!assignment) return null;

  const currentMilestones = generateMilestonesForAssignment(
    assignment,
    assignment_milestones[assignment.id]
  );

  const uciResources = findRelevantUciResources(courseName || "", assignment.description);

  const handleAskGemini = async () => {
    if (!gemini_api_key) {
      alert("No Gemini API Key entered. You can add your free key in the Token settings, or use the built-in rule milestones!");
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
      setAiError(e.message || "Failed to call Gemini.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <span className="text-xs font-bold text-uci-blue uppercase tracking-wide">{courseName}</span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{assignment.name}</h2>
            <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
              <span>{assignment.points_possible} Total Points</span>
              <span>•</span>
              <span>Due: {assignment.due_at ? new Date(assignment.due_at).toLocaleString() : "No fixed due date"}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-xl">
            ×
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 mb-6">
          <button
            onClick={() => onStartFocus(assignment)}
            className="flex-1 py-2 px-3 rounded-xl bg-uci-blue text-white text-xs font-semibold hover:bg-uci-darkblue transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <Clock className="w-3.5 h-3.5 text-uci-gold" />
            <span>Launch Pomodoro Focus Sprint</span>
          </button>

          {gemini_api_key && (
            <button
              onClick={handleAskGemini}
              disabled={isAiLoading}
              className="py-2 px-3 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-semibold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>{isAiLoading ? "Analyzing..." : "AI Study Advice"}</span>
            </button>
          )}
        </div>

        {aiError && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl mb-4 border border-red-200">
            {aiError}
          </div>
        )}

        {/* AI Guidance Box if loaded */}
        {aiGuidance && (
          <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 mb-6 text-xs text-purple-950 space-y-2">
            <div className="font-bold flex items-center space-x-1.5 text-purple-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Gemini Study Assistant Breakdown</span>
            </div>
            <p className="italic">{aiGuidance.plainSummary}</p>
            <div className="space-y-1 pt-1">
              <span className="font-semibold block">Key Action Steps:</span>
              <ul className="list-disc pl-4 space-y-0.5">
                {aiGuidance.keyActionItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="pt-1 text-[11px] text-purple-800">
              <strong>Rubric Advice:</strong> {aiGuidance.rubricAdvice}
            </p>
          </div>
        )}

        {/* Milestone Checklist */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 text-sm">Actionable Milestone Checklist (Rule-Engine)</h3>
            <span className="text-xs font-normal text-slate-500">
              {currentMilestones.filter((m) => m.completed).length} / {currentMilestones.length} Completed
            </span>
          </div>

          <div className="space-y-2">
            {currentMilestones.map((m) => (
              <div
                key={m.id}
                onClick={() => toggleMilestone(assignment.id, m.id)}
                className={`flex items-start space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  m.completed
                    ? "bg-emerald-50/50 border-emerald-200 text-slate-500"
                    : "bg-slate-50 border-slate-200 hover:border-uci-blue"
                }`}
              >
                {m.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={`text-xs font-bold ${m.completed ? "line-through text-slate-500" : "text-slate-900"}`}>
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Context-Aware UCI Resources */}
        {uciResources.length > 0 && (
          <div className="border-t border-slate-100 pt-4">
            <h4 className="font-bold text-slate-900 text-xs mb-2">Recommended UCI Campus Support for this Task:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {uciResources.slice(0, 2).map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 hover:border-uci-blue bg-white flex items-center justify-between text-xs group transition-colors"
                >
                  <div>
                    <span className="font-bold text-slate-800 group-hover:text-uci-blue">{res.name}</span>
                    <p className="text-[10px] text-slate-500">{res.location}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-uci-blue" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

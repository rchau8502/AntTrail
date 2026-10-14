"use client";

import React, { useState, useEffect } from "react";
import { useStorage } from "@/context/storage-context";
import { Play, Pause, RotateCcw, Target, Sparkles, CheckCircle2 } from "lucide-react";

export function PomodoroTimer({ activeAssignmentName }: { activeAssignmentName?: string }) {
  const { addFocusSession, focus_sessions } = useStorage();
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  const totalCompletedMinutes = focus_sessions.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      if (mode === "work") {
        addFocusSession({ durationMinutes: 25 });
        alert("Focus block completed! 25 minutes logged. Time for a 5-minute breather.");
        setMode("break");
        setSecondsLeft(5 * 60);
      } else {
        alert("Break complete! Ready to dive back in?");
        setMode("work");
        setSecondsLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, mode, addFocusSession]);

  const toggle = () => setIsRunning(!isRunning);
  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const totalDuration = mode === "work" ? 25 * 60 : 5 * 60;
  const progressPct = ((totalDuration - secondsLeft) / totalDuration) * 100;

  return (
    <div className="rounded-2xl bg-white text-slate-900 p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full space-y-4">
      <div className="flex flex-col justify-between h-full space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={`w-2 h-2 rounded-full transition-all ${
                isRunning ? "bg-emerald-500 animate-pulse ring-4 ring-emerald-50" : "bg-slate-300"
              }`}
            />
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">
              Focus Chronometer
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100/90 rounded-lg p-0.5 border border-slate-200/80 text-[11px]">
            <button
              onClick={() => {
                setMode("work");
                setSecondsLeft(25 * 60);
                setIsRunning(false);
              }}
              className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                mode === "work" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              25m Work
            </button>
            <button
              onClick={() => {
                setMode("break");
                setSecondsLeft(5 * 60);
                setIsRunning(false);
              }}
              className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                mode === "break" ? "bg-white text-emerald-800 shadow-2xs font-bold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              5m Break
            </button>
          </div>
        </div>

        {/* Big Digit Readout & Task Target */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <div className="text-3xl sm:text-4xl font-mono font-black tracking-tight text-slate-900">
              {formattedTime}
            </div>
            <p className="text-xs text-slate-500 truncate max-w-[190px] mt-1 font-medium">
              {activeAssignmentName || "Autonomous Sprint"}
            </p>
          </div>

          {/* Play/Pause Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggle}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all active:scale-95 shadow-2xs"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              <span>{isRunning ? "Pause" : "Start"}</span>
            </button>

            <button
              onClick={reset}
              title="Reset Timer"
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all border border-slate-200/80"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/60">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              mode === "work" ? "bg-slate-900" : "bg-emerald-600"
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Footer Metrics */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-0.5">
          <span>Logged: {totalCompletedMinutes}m this week</span>
          <span className="font-mono text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60">
            {Math.floor(totalCompletedMinutes / 25)} sprints
          </span>
        </div>
      </div>
    </div>
  );
}

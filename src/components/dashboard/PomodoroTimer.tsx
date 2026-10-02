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
    <div className="rounded-2xl bg-slate-950 text-white p-5 border border-slate-800 shadow-md relative overflow-hidden space-y-4">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-uci-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-uci-gold/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-uci-gold animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Focus Chronometer
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[11px]">
            <button
              onClick={() => {
                setMode("work");
                setSecondsLeft(25 * 60);
                setIsRunning(false);
              }}
              className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                mode === "work" ? "bg-slate-800 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"
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
                mode === "break" ? "bg-emerald-900/80 text-emerald-200 shadow-xs" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              5m Break
            </button>
          </div>
        </div>

        {/* Big Digit Readout & Task Target */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-white">
              {formattedTime}
            </div>
            <p className="text-xs text-slate-400 truncate max-w-[190px] mt-1">
              {activeAssignmentName || "Autonomous Sprint"}
            </p>
          </div>

          {/* Play/Pause Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggle}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-uci-gold hover:bg-yellow-400 text-slate-950 font-bold text-xs transition-all active:scale-95 shadow-xs"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              <span>{isRunning ? "Pause" : "Start"}</span>
            </button>

            <button
              onClick={reset}
              title="Reset Timer"
              className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all border border-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800/80">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              mode === "work" ? "bg-gradient-to-r from-uci-blue to-uci-gold" : "bg-emerald-500"
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Footer Metrics */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-0.5">
          <span>Logged: {totalCompletedMinutes}m this week</span>
          <span className="text-uci-lightgold font-bold">
            {Math.floor(totalCompletedMinutes / 25)} sprints
          </span>
        </div>
      </div>
    </div>
  );
}

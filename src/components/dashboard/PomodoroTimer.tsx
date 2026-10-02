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
    <div className="p-1.5 rounded-[2rem] bg-gradient-to-b from-uci-blue/20 to-uci-darkblue/40 border border-uci-blue/30 shadow-bezel">
      <div className="rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-uci-midnight via-uci-darkblue to-slate-950 p-6 text-white shadow-2xl relative overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-uci-blue/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-uci-gold/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-uci-gold/20 flex items-center justify-center text-uci-gold border border-uci-gold/30">
                <Target className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-uci-lightgold">
                Anteater Deep Work
              </span>
            </div>

            {/* Mode Toggle Pills */}
            <div className="flex items-center bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10 text-[11px]">
              <button
                onClick={() => {
                  setMode("work");
                  setSecondsLeft(25 * 60);
                  setIsRunning(false);
                }}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  mode === "work" ? "bg-uci-blue text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                25m Focus
              </button>
              <button
                onClick={() => {
                  setMode("break");
                  setSecondsLeft(5 * 60);
                  setIsRunning(false);
                }}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  mode === "break" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                5m Break
              </button>
            </div>
          </div>

          {/* Time Readout & Attached Task */}
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-white drop-shadow-sm">
                {formattedTime}
              </div>
              <p className="text-xs text-slate-300 font-medium truncate max-w-[220px] mt-1 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-uci-gold animate-pulse inline-block" />
                <span>{activeAssignmentName || "Autonomous Study Session"}</span>
              </p>
            </div>

            {/* Interactive Control Pill (Button-in-Button architecture) */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggle}
                className="group flex items-center space-x-2 pl-4 pr-2 py-2 rounded-full bg-uci-gold hover:bg-yellow-400 text-slate-950 font-bold text-xs shadow-gold-glow transition-all active:scale-[0.98]"
              >
                <span>{isRunning ? "Pause" : "Start"}</span>
                <div className="w-7 h-7 rounded-full bg-slate-950/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </div>
              </button>

              <button
                onClick={reset}
                title="Reset Clock"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Micro Track */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                mode === "work" ? "bg-gradient-to-r from-uci-blue to-uci-gold" : "bg-emerald-400"
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-0.5">
            <span>Total logged this week: {totalCompletedMinutes} mins</span>
            <span className="text-uci-lightgold font-semibold flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-uci-gold" />
              <span>{Math.floor(totalCompletedMinutes / 25)} sprints finished</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

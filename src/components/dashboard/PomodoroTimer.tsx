"use client";

import React, { useState, useEffect } from "react";
import { useStorage } from "@/context/storage-context";
import { Play, Pause, RotateCcw, Target } from "lucide-react";

export function PomodoroTimer({ activeAssignmentName }: { activeAssignmentName?: string }) {
  const { addFocusSession } = useStorage();
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      if (mode === "work") {
        addFocusSession({ durationMinutes: 25 });
        alert("Focus session complete! Take a well-earned 5-minute break.");
        setMode("break");
        setSecondsLeft(5 * 60);
      } else {
        alert("Break is over! Ready for the next sprint?");
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

  return (
    <div className="bg-gradient-to-br from-uci-darkblue to-slate-900 rounded-2xl p-5 text-white shadow-lg border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 text-uci-gold">
          <Target className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Anteater Focus Sprint</span>
        </div>
        <div className="flex space-x-1 bg-slate-800/80 rounded-lg p-0.5 text-[11px]">
          <button
            onClick={() => { setMode("work"); setSecondsLeft(25 * 60); setIsRunning(false); }}
            className={`px-2 py-0.5 rounded ${mode === "work" ? "bg-uci-blue text-white" : "text-slate-400"}`}
          >
            25m Focus
          </button>
          <button
            onClick={() => { setMode("break"); setSecondsLeft(5 * 60); setIsRunning(false); }}
            className={`px-2 py-0.5 rounded ${mode === "break" ? "bg-emerald-600 text-white" : "text-slate-400"}`}
          >
            5m Break
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div>
          <div className="text-3xl font-mono font-black tracking-tight">{formattedTime}</div>
          <p className="text-[11px] text-slate-300 truncate max-w-[200px]">
            {activeAssignmentName || "General Focus"}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggle}
            className="w-10 h-10 rounded-full bg-uci-gold text-slate-900 flex items-center justify-center font-bold hover:bg-yellow-400 transition-colors shadow"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button
            onClick={reset}
            className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

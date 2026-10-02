"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { TokenSetupModal } from "../onboarding/TokenSetupModal";
import {
  RefreshCw,
  Trash2,
  KeyRound,
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Compass,
  ShieldCheck,
} from "lucide-react";

export function Navbar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) {
  const { canvas_token, is_demo_mode, purgeAllData, refreshCanvasData, isLoading } = useStorage();
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "assignments", label: "Milestones", icon: CheckSquare },
    { id: "workload", label: "Workload", icon: CalendarDays },
    { id: "resources", label: "Campus Hub", icon: Compass },
  ];

  return (
    <>
      <header className="sticky top-3 z-40 px-4 sm:px-6 mb-6">
        <div className="max-w-6xl mx-auto">
          {/* Refined floating glass navbar */}
          <div className="px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-between transition-all">
            {/* Brand Logo & UCI Mark */}
            <div
              className="flex items-center space-x-2.5 pl-1.5 cursor-pointer group"
              onClick={() => setActiveTab("dashboard")}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-uci-gold flex items-center justify-center font-black text-sm tracking-tight shadow-xs group-hover:bg-uci-darkblue transition-colors">
                Z
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 group-hover:text-uci-blue transition-colors">
                  ZotCanvas
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80">
                  UCI
                </span>
                {is_demo_mode && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    Demo Mode
                  </span>
                )}
              </div>
            </div>

            {/* Segmented Navigation Capsule */}
            <nav className="hidden sm:flex items-center bg-slate-100/80 rounded-xl p-1 border border-slate-200/60">
              {navItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-uci-blue" : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Actions: Sync, Connect Token, Purge */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => refreshCanvasData()}
                disabled={isLoading}
                title="Sync with Canvas API"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-uci-blue hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-uci-blue" : ""}`} />
              </button>

              <button
                onClick={() => setIsTokenModalOpen(true)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  canvas_token
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                    : "bg-uci-blue text-white border-uci-blue hover:bg-uci-darkblue shadow-xs"
                }`}
              >
                {canvas_token ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Connected</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-3.5 h-3.5 text-white/80" />
                    <span>Connect Canvas</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (confirm("Reset local storage and clear all tokens?")) {
                    purgeAllData();
                  }
                }}
                title="Reset Local Cache"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile Tab Bar */}
          <nav className="sm:hidden flex items-center justify-around bg-white rounded-xl p-1 mt-2 border border-slate-200/80 shadow-xs">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    isActive ? "bg-slate-900 text-white font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <TokenSetupModal isOpen={isTokenModalOpen} onClose={() => setIsTokenModalOpen(false)} />
    </>
  );
}

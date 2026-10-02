"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { TokenSetupModal } from "../onboarding/TokenSetupModal";
import {
  RefreshCw,
  Trash2,
  KeyRound,
  Sparkles,
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Compass,
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
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "assignments", label: "Milestones", icon: CheckSquare },
    { id: "workload", label: "Workload", icon: CalendarDays },
    { id: "resources", label: "Campus Hub", icon: Compass },
  ];

  return (
    <>
      <header className="sticky top-4 z-40 px-4 sm:px-6 mb-6">
        <div className="max-w-6xl mx-auto">
          {/* Double-bezel outer shell */}
          <div className="p-1.5 rounded-full bg-slate-900/5 backdrop-blur-2xl border border-slate-200/80 shadow-bezel flex items-center justify-between">
            {/* Brand Logo & Anteater pill */}
            <div
              className="flex items-center space-x-3 pl-3 pr-2 py-1 cursor-pointer group"
              onClick={() => setActiveTab("dashboard")}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-uci-midnight via-uci-darkblue to-uci-blue flex items-center justify-center text-uci-gold font-extrabold text-lg shadow-sm border border-uci-gold/40 group-hover:scale-105 transition-transform">
                Z
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-sm tracking-tight text-slate-900">
                    ZotCanvas
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-uci-lightgold text-uci-darkblue border border-amber-300/80">
                    UCI
                  </span>
                  {is_demo_mode && (
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Demo
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 font-medium">Anteater Command</p>
              </div>
            </div>

            {/* Navigation Tabs (Centered Capsule) */}
            <nav className="flex items-center bg-slate-100/90 rounded-full p-1 border border-slate-200/50">
              {navItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-white text-uci-blue shadow-sm font-bold scale-[1.02]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-uci-blue" : "text-slate-400"}`} />
                    <span className="hidden md:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Actions: Sync, Token Drawer, Purge */}
            <div className="flex items-center space-x-1.5 pr-2">
              <button
                onClick={() => refreshCanvasData()}
                disabled={isLoading}
                title="Sync with Canvas"
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-uci-blue hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-uci-blue" : ""}`} />
              </button>

              <button
                onClick={() => setIsTokenModalOpen(true)}
                className={`group flex items-center space-x-2 pl-3 pr-2 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  canvas_token
                    ? "bg-uci-blue text-white border-uci-blue hover:bg-uci-darkblue shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:border-uci-blue hover:text-uci-blue shadow-sm"
                }`}
              >
                <span className="text-[11px] font-semibold">
                  {canvas_token ? "Token Active" : "Connect Canvas"}
                </span>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    canvas_token ? "bg-white/20 text-uci-gold" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <KeyRound className="w-3 h-3" />
                </div>
              </button>

              <button
                onClick={() => {
                  if (confirm("Purge all locally stored tokens, course caches, and focus stats?")) {
                    purgeAllData();
                  }
                }}
                title="Purge Local Token & Reset"
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <TokenSetupModal isOpen={isTokenModalOpen} onClose={() => setIsTokenModalOpen(false)} />
    </>
  );
}

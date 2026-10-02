"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { TokenSetupModal } from "../onboarding/TokenSetupModal";
import { RefreshCw, Trash2, Key } from "lucide-react";

export function Navbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) {
  const { canvas_token, is_demo_mode, purgeAllData, refreshCanvasData, isLoading } = useStorage();
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-uci-blue to-uci-darkblue flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-uci-gold">
              Z
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">ZotCanvas</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-uci-lightgold text-uci-darkblue border border-amber-300">
                  UCI
                </span>
                {is_demo_mode && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Demo Mode
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Anteater Study & Workload Command Center</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "assignments", label: "Assignments & Milestones" },
              { id: "workload", label: "Workload & Calendar" },
              { id: "resources", label: "UCI Campus Hub" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-uci-blue text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => refreshCanvasData()}
              disabled={isLoading}
              title="Refresh Canvas Data"
              className="p-2 text-slate-600 hover:text-uci-blue rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-uci-blue" : ""}`} />
            </button>

            <button
              onClick={() => setIsTokenModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 hover:border-uci-blue hover:text-uci-blue text-slate-700 bg-white transition-all shadow-sm"
            >
              <Key className="w-3.5 h-3.5 text-uci-blue" />
              <span>{canvas_token ? "Token Active" : "Connect Token"}</span>
            </button>

            <button
              onClick={() => {
                if (confirm("Purge all locally stored tokens and course data?")) {
                  purgeAllData();
                }
              }}
              title="Purge all local data and log out"
              className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <TokenSetupModal isOpen={isTokenModalOpen} onClose={() => setIsTokenModalOpen(false)} />
    </>
  );
}

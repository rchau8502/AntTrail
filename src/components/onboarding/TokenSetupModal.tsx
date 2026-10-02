"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { KeyRound, Lock, ExternalLink, Sparkles, X, ShieldCheck } from "lucide-react";

export function TokenSetupModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { canvas_token, setCanvasToken, gemini_api_key, setGeminiApiKey, enableDemoMode, refreshCanvasData } = useStorage();
  const [tokenInput, setTokenInput] = useState(canvas_token || "");
  const [geminiInput, setGeminiInput] = useState(gemini_api_key || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    setIsSubmitting(true);
    setCanvasToken(tokenInput.trim());
    if (geminiInput.trim()) {
      setGeminiApiKey(geminiInput.trim());
    } else {
      setGeminiApiKey(null);
    }

    setTimeout(async () => {
      await refreshCanvasData();
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const handleDemoClick = () => {
    enableDemoMode();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="p-2 rounded-[2.5rem] bg-white/10 border border-white/20 shadow-2xl max-w-lg w-full">
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-white p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5 text-uci-blue">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-uci-blue flex items-center justify-center border border-blue-200">
                <KeyRound className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Connect Your UCI Canvas
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/90 text-xs text-blue-950 flex items-start space-x-2.5">
            <Lock className="w-4 h-4 text-uci-blue flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong>100% Client-Side Privacy:</strong> Your token is stored exclusively in your device&apos;s browser memory. Zero servers, zero databases, zero tracking.
            </span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Canvas Personal Access Token <span className="text-rose-500">*</span>
              </label>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Paste token from Canvas Settings..."
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-uci-blue font-mono bg-slate-50/50"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
                <span>Canvas → Account → Settings → + New Access Token</span>
                <a
                  href="https://canvas.eee.uci.edu/profile/settings"
                  target="_blank"
                  rel="noreferrer"
                  className="text-uci-blue font-semibold underline flex items-center space-x-0.5 ml-1"
                >
                  <span>Open Settings</span>
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-800">
                  Google Gemini Free API Key (Strictly Optional)
                </label>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Free Tier
                </span>
              </div>
              <input
                type="password"
                value={geminiInput}
                onChange={(e) => setGeminiInput(e.target.value)}
                placeholder="AIzaSy... (Optional for AI tips)"
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-uci-blue font-mono bg-slate-50/50"
              />
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Leave blank if you don&apos;t want AI. Every scheduling and milestone feature operates 100% autonomously without any API keys.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !tokenInput.trim()}
                className="flex-1 py-3 px-4 rounded-full bg-uci-blue hover:bg-uci-darkblue text-white font-bold text-xs shadow-bezel transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                {isSubmitting ? "Connecting..." : "Save & Sync Canvas"}
              </button>
              <button
                type="button"
                onClick={handleDemoClick}
                className="py-3 px-5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Try Demo Mode</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

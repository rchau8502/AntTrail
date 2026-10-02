"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { KeyRound, Lock, ExternalLink, Sparkles } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-uci-blue">
            <KeyRound className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900">Connect Your UCI Canvas</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-xl">
            ×
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start space-x-2 mb-4">
          <Lock className="w-4 h-4 text-uci-blue flex-shrink-0 mt-0.5" />
          <span>
            <strong>100% Private:</strong> Your token is stored only in your browser&apos;s localStorage and never saved to any database.
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Canvas Personal Access Token <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Paste token from Canvas Settings..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uci-blue font-mono"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
              <span>How to get: Go to Canvas → Account → Settings → + New Access Token</span>
              <a
                href="https://canvas.eee.uci.edu/profile/settings"
                target="_blank"
                rel="noreferrer"
                className="text-uci-blue underline flex items-center space-x-0.5 ml-1"
              >
                <span>Open Canvas</span>
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Google Gemini API Key (Strictly Optional)
              </label>
              <span className="text-[10px] font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">100% Free Tier</span>
            </div>
            <input
              type="password"
              value={geminiInput}
              onChange={(e) => setGeminiInput(e.target.value)}
              placeholder="AIzaSy... (Optional for AI guidance)"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uci-blue font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Leave blank if you don&apos;t want AI. The app is fully operational with rule-based algorithms.
            </p>
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !tokenInput.trim()}
              className="flex-1 py-2.5 rounded-xl bg-uci-blue text-white font-medium hover:bg-uci-darkblue transition-colors disabled:opacity-50 text-sm shadow-sm"
            >
              {isSubmitting ? "Connecting..." : "Save & Sync Canvas"}
            </button>
            <button
              type="button"
              onClick={handleDemoClick}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium flex items-center space-x-1"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Use Demo Mode</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

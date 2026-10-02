"use client";

import React, { useState } from "react";
import { UCI_CAMPUS_RESOURCES } from "@/lib/uci-resources";
import { ExternalLink, Search, MapPin, Clock, Compass, Sparkles } from "lucide-react";

export function UciResourceHub() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = UCI_CAMPUS_RESOURCES.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = filterType === "all" || res.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Banner Card with Double-Bezel */}
      <div className="p-1.5 rounded-[2.5rem] bg-gradient-to-r from-uci-midnight via-uci-darkblue to-uci-blue border border-uci-blue/40 shadow-bezel">
        <div className="rounded-[calc(2.5rem-0.375rem)] bg-gradient-to-br from-uci-midnight/90 to-uci-darkblue p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-uci-gold/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="flex items-center space-x-2 text-uci-gold">
              <Compass className="w-5 h-5" />
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-uci-lightgold">
                Official Campus Compass
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              UCI Academic Tutoring & Wellness Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
              Direct access to free UC Irvine tutoring centers, drop-in engineering labs, writing consultations, and confidential student wellness support.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search LARC, CEWC, DBH labs, counseling, study rooms..."
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-uci-blue bg-white shadow-xs"
          />
        </div>

        <div className="flex space-x-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["all", "tutoring", "writing", "stem", "wellness", "library"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all ${
                filterType === type
                  ? "bg-uci-blue text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="p-1.5 rounded-[2rem] bg-slate-900/5 border border-slate-200/80 shadow-bezel hover:shadow-bezel-hover transition-all"
          >
            <div className="rounded-[calc(2rem-0.375rem)] bg-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-uci-blue bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {res.type}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base mt-2 tracking-tight">
                      {res.name}
                    </h3>
                  </div>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-uci-blue hover:text-white text-slate-500 flex items-center justify-center transition-colors"
                    title="Open official UCI portal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{res.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{res.hours}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

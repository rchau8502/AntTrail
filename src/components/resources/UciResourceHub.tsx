"use client";

import React, { useState } from "react";
import { UCI_CAMPUS_RESOURCES } from "@/lib/uci-resources";
import { ExternalLink, Search, MapPin, Clock, Compass } from "lucide-react";

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
      {/* Sleek Banner Card */}
      <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-7 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-uci-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center space-x-2 text-uci-gold">
            <Compass className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-uci-lightgold">
              UCI Campus Compass
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Academic Tutoring & Wellness Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Free UC Irvine peer tutoring (LARC), drop-in ICS engineering labs, writing consultations, and confidential student wellness support.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search LARC, CEWC, DBH labs, counseling, library study rooms..."
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-uci-blue bg-white shadow-2xs placeholder:text-slate-400"
          />
        </div>

        <div className="flex space-x-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["all", "tutoring", "writing", "stem", "wellness", "library"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                filterType === type
                  ? "bg-slate-900 text-white shadow-xs font-bold"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {res.type}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-2 tracking-tight">
                    {res.name}
                  </h3>
                </div>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-500 flex items-center justify-center transition-colors"
                  title="Open official portal"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500 font-medium">
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
        ))}
      </div>
    </div>
  );
}

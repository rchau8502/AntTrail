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
      <div className="bg-gradient-to-r from-uci-blue to-uci-darkblue rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center space-x-2 text-uci-gold mb-1">
          <Compass className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Anteater Resource Compass</span>
        </div>
        <h2 className="text-xl font-bold">UCI Academic & Wellness Campus Hub</h2>
        <p className="text-xs text-slate-200 mt-1 max-w-xl">
          Curated directory of UC Irvine tutoring centers, writing consultations, drop-in labs, and wellness counseling.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search LARC, CEWC, tutoring, DBH labs..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-uci-blue bg-white"
          />
        </div>

        <div className="flex space-x-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["all", "tutoring", "writing", "stem", "wellness", "library"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                filterType === type
                  ? "bg-uci-blue text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-uci-blue bg-blue-50 px-2 py-0.5 rounded">
                    {res.type}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-2">{res.name}</h3>
                </div>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-uci-blue hover:bg-slate-50"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{res.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{res.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
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

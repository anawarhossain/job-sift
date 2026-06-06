"use client";
// ✅ Leaf-level client component — শুধু এখানেই useState প্রয়োজন

import { useState } from "react";
import { Compass, Magnifier } from "@gravity-ui/icons";
import { cn } from "@/lib/utils";

export function HeroSearchForm({ trendingPositions }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: router.push(`/jobs?q=${search}&loc=${location}`)
    console.log("Searching:", { search, location });
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4">
      {/* ── মেইন সার্চ বার ── */}
      <form
        onSubmit={handleSearch}
        role="search"
        aria-label="Job search"
        className="w-full flex items-center gap-2 rounded-full border border-white/8 bg-[#0d0d0d]/70 p-1.5 pl-5 backdrop-blur-xl shadow-2xl
                   focus-within:border-indigo-500/50 transition-all duration-200"
      >
        {/* জব টাইটেল ইনপুট */}
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <Magnifier
            className="text-zinc-500 shrink-0 w-4 h-4"
            aria-hidden="true"
          />
          <input
            id="job-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title, skill or company"
            autoComplete="off"
            className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none py-2 min-w-0"
          />
        </div>

        {/* ডিভাইডার — শুধু sm+ এ দেখাবে */}
        <span
          className="hidden sm:inline-block h-5 w-px bg-zinc-800 mx-1 shrink-0"
          aria-hidden="true"
        />

        {/* লোকেশন ইনপুট — ✅ `hidden sm:flex` conflict ঠিক করা হলো */}
        <div className="hidden sm:flex flex-1 items-center gap-3 min-w-0">
          <Compass
            className="text-zinc-500 shrink-0 w-4 h-4"
            aria-hidden="true"
          />
          <input
            id="location-search"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location or Remote"
            autoComplete="off"
            className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none py-2 min-w-0"
          />
        </div>

        {/* সার্চ বাটন */}
        <button
          type="submit"
          aria-label="Search jobs"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                     bg-gradient-to-r from-[#4f46e5] to-[#6366f1]
                     text-white shadow-lg shadow-indigo-500/25
                     hover:opacity-90 active:scale-95 transition-all duration-150
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <Magnifier className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>

      {/* ── ট্রেন্ডিং পজিশন ট্যাগ ── */}
      <div
        className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm"
        aria-label="Trending positions"
      >
        <span className="text-zinc-600 text-xs">Trending:</span>
        {trendingPositions.map((position) => (
          <button
            key={position}
            type="button"
            onClick={() => setSearch(position)}
            className="rounded-full border border-white/5 bg-[#141414] px-3.5 py-1.5 text-xs text-zinc-400
                       hover:text-white hover:border-zinc-700 hover:bg-[#1a1a1a]
                       transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {position}
          </button>
        ))}
      </div>
    </div>
  );
}

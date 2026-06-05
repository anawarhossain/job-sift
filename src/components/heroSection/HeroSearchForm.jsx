"use client";

import { useState } from "react";
import { Compass, Magnifier } from "@gravity-ui/icons";
import { cn } from "@/lib/utils";

export function HeroSearchForm({ trendingPositions }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { search, location });
    // আপনার সার্চ লজিক বা রাউটিং এখানে লিখুন
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-5">
      {/* মেইন সার্চ বার কন্টেইনার */}
      <form
        onSubmit={handleSearch}
        className="w-full flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d0d]/60 p-2 pl-4 sm:pl-6 backdrop-blur-xl shadow-2xl focus-within:border-indigo-500/50 transition-all"
      >
        {/* প্রথম ইনপুট: জব টাইটেল বা কোম্পানি */}
        <div className="flex flex-1 items-center gap-3">
          <Magnifier className="text-zinc-500 text-lg shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title, skill or company"
            className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none py-2"
          />
        </div>

        {/* মাঝখানের ডিভাইডার লাইন */}
        <span className="h-6 w-px bg-zinc-800 hidden sm:inline-block mx-2" />

        {/* দ্বিতীয় ইনপুট: লোকেশন */}
        <div className="flex flex-1 items-center gap-3 hidden sm:flex">
          <Compass className="text-zinc-500 text-lg shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location or Remote"
            className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none py-2"
          />
        </div>

        {/* সার্চ বাটন (ইমেজের মতো ব্লু/পার্পল রাউন্ডেড বাটন) */}
        <button
          type="submit"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-[#4f46e5] to-[#6366f1] text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-95 transition-all shrink-0"
        >
          <Magnifier className="text-lg" strokeWidth={2.5} />
        </button>
      </form>

      {/* ট্রেন্ডিং পজিশন ট্যাগসমূহ */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1 text-xs sm:text-sm">
        <span className="text-zinc-500">Trending Position</span>
        {trendingPositions.map((position) => (
          <button
            key={position}
            type="button"
            onClick={() => setSearch(position)}
            className="rounded-full border border-white/5 bg-[#141414] px-4 py-1.5 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
          >
            {position}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export function DashboardSearch() {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full">
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search applications, jobs, or talent..."
        className="w-full bg-[#111111] border border-white/[0.07] hover:border-white/12 text-sm text-zinc-300 placeholder-zinc-600 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
      />
    </div>
  );
}

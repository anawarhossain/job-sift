"use client";

import { useState } from "react";
import { PostJobModal } from "./PostJobModal";

/**
 * Props:
 *   company: { name, plan, activeJobs, approved }
 *   — server থেকে pass করা হয়
 */
export function PostJobButton({ company }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── FAB — Fixed Action Button (bottom-right) ── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Post a new job"
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white text-sm font-semibold shadow-2xl shadow-indigo-500/30 hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
      >
        {/* Plus icon */}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Post a Job
      </button>

      {/* ── Modal ── */}
      <PostJobModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        company={company}
      />
    </>
  );
}

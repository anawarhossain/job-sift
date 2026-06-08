// ✅ Server Component — purely presentational stats card

/**
 * Props:
 *   label:   string   — "Total Job Posts"
 *   value:   string   — "48" or "1,284"
 *   iconPath: string  — SVG path d attribute
 */
export function DashboardStatCard({ label, value, iconPath, iconPath2 }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-white/6 bg-[#0f0f0f] p-6 hover:border-white/10 hover:bg-[#121212] transition-all duration-200">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/6 flex items-center justify-center shrink-0">
        <svg
          className="w-5 h-5 text-zinc-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
          {iconPath2 && (
            <path strokeLinecap="round" strokeLinejoin="round" d={iconPath2} />
          )}
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-zinc-500 font-medium tracking-wide">
          {label}
        </span>
        <span className="text-3xl font-bold text-white tracking-tight tabular-nums">
          {value}
        </span>
      </div>
    </div>
  );
}

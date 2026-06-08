// ✅ Server Component
// Design: top bar — search input, notification bell, user name + avatar

import { getUserSession } from "@/lib/core/session";
import { UserAvatar } from "@/components/navbar/UserAvatar";
import { DashboardSearch } from "./DashboardSearch";
import Link from "next/link";

// ── Notification bell ─────────────────────────────────────────
function NotificationBell({ count = 3 }) {
  return (
    <button
      aria-label={`${count} notifications`}
      className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.07] bg-white/3 hover:bg-white/[0.07] text-zinc-400 hover:text-zinc-200 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      {/* Notification dot */}
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center border border-[#0a0a0a]">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

export async function DashboardTopbar() {
  const user = await getUserSession();

  return (
    <header className="h-15 shrink-0 flex items-center gap-4 px-6 bg-[#0a0a0a] border-b border-white/6">
      {/* ── Search — client for interactivity ── */}
      <div className="flex-1 ">
        <DashboardSearch />
      </div>

      {/* ── Right side ── */}
      <div className="flex items-center gap-3 ml-auto shrink-0">
        <NotificationBell count={3} />

        {/* Vertical divider */}
        <span className="h-6 w-px bg-white/[0.07]" aria-hidden="true" />

        {/* User info + avatar */}
        <Link
          href="/dashboard/recruiter/settings"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-1"
        >
          <div className="flex flex-col items-end min-w-0">
            <span className="text-sm font-medium text-white leading-tight truncate max-w-30">
              {user?.name ?? "User"}
            </span>
            <span className="text-xs text-zinc-500 truncate max-w-30">
              {user?.email ?? ""}
            </span>
          </div>
          <UserAvatar
            name={user?.name ?? ""}
            image={user?.image ?? null}
            size="sm"
          />
        </Link>
      </div>
    </header>
  );
}

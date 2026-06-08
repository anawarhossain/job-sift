"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { UserAvatar } from "./UserAvatar";

// ── Icons ────────────────────────────────────────────────────
function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function MenuIcon({ d }) {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

// ── Dropdown menu items config ────────────────────────────────
const menuItems = [
  {
    label: "My Profile",
    href: "/profile",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    label: "My Applications",
    href: "/applications",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    label: "Saved Jobs",
    href: "/saved",
    icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

// ── Spinner ───────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      className="w-3.5 h-3.5 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────
export function UserDropdown({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh(); // server session clear করতে
    } catch {
      setLoggingOut(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="User menu"
        className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/4 hover:bg-white/8 px-2.5 py-1.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <UserAvatar name={user.name} image={user.image} size="sm" />
        <span className="hidden sm:block text-sm font-medium text-zinc-200 max-w-30 truncate">
          {user.name?.split(" ")[0] ?? "Account"}
        </span>
        <ChevronIcon open={open} />
      </button>

      {/* ── Dropdown panel ── */}
      {open && (
        <div
          role="menu"
          aria-label="User menu"
          className="absolute right-0 top-[calc(100%+10px)] w-64 rounded-2xl border border-white/[0.07] bg-[#0e0e0e]/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden z-50 animate-fade-up"
        >
          {/* User info header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/6">
            <UserAvatar name={user.name} image={user.image} size="md" />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate">
                {user.name}
              </span>
              <span className="text-xs text-zinc-500 truncate">
                {user.email}
              </span>
            </div>
          </div>

          {/* Menu links */}
          <div className="py-2 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/6 transition-all duration-150 group"
              >
                <span className="w-7 h-7 rounded-lg bg-white/4 group-hover:bg-white/8 flex items-center justify-center transition-colors shrink-0">
                  <MenuIcon d={item.icon} />
                </span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/6 mx-2" />

          {/* Sign out */}
          <div className="py-2 px-2">
            <button
              role="menuitem"
              onClick={handleSignOut}
              disabled={loggingOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              <span className="w-7 h-7 rounded-lg bg-red-500/8 group-hover:bg-red-500/12 flex items-center justify-center transition-colors shrink-0">
                {loggingOut ? (
                  <Spinner />
                ) : (
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                )}
              </span>
              {loggingOut ? "Signing out…" : "Sign Out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

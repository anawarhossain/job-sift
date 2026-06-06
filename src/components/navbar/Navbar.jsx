"use client";

import { useState, useEffect } from "react";
import { Link } from "@heroui/react";
import { cn } from "@/lib/utils";

const maxWidthClasses = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  xl: "max-w-[1280px]",
  "2xl": "max-w-[1536px]",
  full: "max-w-full",
};

export function Navbar({
  brand,
  items,
  rightContent,
  className,
  maxWidth = "xl",
  position = "sticky",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // স্ক্রল হলে navbar-এ border দেখাবে — ডিজাইনের নেটিভ ফিল আনবে
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // মোবাইল মেনু খোলা থাকলে body scroll বন্ধ রাখো
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "z-40 w-full py-4 px-4 sm:px-6 transition-all duration-300",
        position === "sticky" && "sticky top-0",
        position === "fixed" && "fixed top-0",
        className,
      )}
    >
      <div
        className={cn(
          "w-full rounded-2xl px-6 transition-all duration-300",
          maxWidth !== "full" && maxWidthClasses[maxWidth],
          "mx-auto",
          // স্ক্রল করলে আরো opaque + border visible হয়
          scrolled
            ? "bg-[#0a0a0a]/90 border border-white/8 backdrop-blur-xl shadow-2xl shadow-black/40"
            : "bg-[#121212]/70 border border-white/5 backdrop-blur-md",
        )}
      >
        <header className="flex h-16 items-center justify-between">
          {/* বাম — লোগো */}
          <div className="flex items-center gap-4">{brand}</div>

          {/* ডান — ডেস্কটপ মেনু */}
          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 md:flex">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200 text-zinc-400 hover:text-zinc-100",
                      item.isActive && "text-zinc-100 font-semibold",
                    )}
                    aria-current={item.isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {rightContent && (
              <div className="hidden items-center gap-4 md:flex">
                {rightContent}
              </div>
            )}

            {/* মোবাইল hamburger */}
            <button
              className="block md:hidden text-zinc-400 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md p-1"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </header>

        {/* মোবাইল ড্রপডাউন */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-white/5 md:hidden pb-5 pt-3"
          >
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block py-2.5 px-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/5 text-sm transition-all",
                      item.isActive && "text-zinc-100 font-medium bg-white/5",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {rightContent && (
                <li className="mt-4 flex flex-col gap-3 border-t border-white/5 pt-4">
                  {rightContent}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

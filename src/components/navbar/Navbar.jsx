"use client"
import { useState } from "react";
import { Link } from "@heroui/react";
import { cn } from "@/lib/utils"; // আপনার প্রোজেক্টের cn utility পাথ অনুযায়ী চেঞ্জ করতে পারেন

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
  maxWidth = "xl", // ইমেজ অনুযায়ী একটু চওড়া লেআউট বেটার দেখাবে
  position = "sticky",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        "z-40 w-full bg-transparent py-4 px-4 sm:px-6", // বাইরের মেইন ব্যাকগ্রাউন্ড ট্রান্সপারেন্ট রাখছি যেন ফ্লোটিং ফিল আসে
        position === "sticky" && "sticky top-0",
        position === "fixed" && "fixed top-0",
        className,
      )}
    >
      {/* ছবির মতো রাউন্ডেড এবং ডার্ক ফ্লোটিং কন্টেইনার */}
      <div
        className={cn(
          "w-full rounded-2xl border border-white/5 bg-[#121212]/80 px-6 backdrop-blur-xl shadow-2xl",
          maxWidth !== "full" && maxWidthClasses[maxWidth],
          "mx-auto",
        )}
      >
        <header className="flex h-16 items-center justify-between">
          {/* বাম পাশে লোগো এরিয়া */}
          <div className="flex items-center gap-4">{brand}</div>

          {/* ডান পাশে মেনু আইটেমস এবং রাইট কন্টেন্ট */}
          <div className="flex items-center gap-6">
            {/* ডেক্সটপ মেনু লিংকস */}
            <ul className="hidden items-center gap-6 md:flex">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors text-zinc-400 hover:text-zinc-100",
                      item.isActive && "text-zinc-100 font-semibold",
                    )}
                    aria-current={item.isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ডেক্সটপ রাইট কন্টেন্ট (বাটন এবং ডিভাইডার) */}
            {rightContent && (
              <div className="hidden items-center gap-4 md:flex">
                {rightContent}
              </div>
            )}

            {/* মোবাইল মেনু টগল বাটন */}
            <button
              className="block md:hidden text-zinc-400 hover:text-zinc-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
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

        {/* মোবাইল রেসপন্সিভ ড্রপডাউন মেনু */}
        {isMenuOpen && (
          <div className="border-t border-white/5 md:hidden pb-4 pt-2">
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 text-zinc-400 hover:text-zinc-100 text-sm",
                      item.isActive && "text-zinc-100 font-medium",
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

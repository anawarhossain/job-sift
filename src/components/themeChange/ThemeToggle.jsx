"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "@gravity-ui/icons"; // অথবা lucide-react

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ✅ Hydration mismatch এড়াতে mounted check জরুরি
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />; // placeholder — layout shift এড়ায়

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="w-9 h-9 flex items-center justify-center rounded-full
                 border border-white/10 dark:border-white/10 light:border-zinc-200
                 bg-zinc-900 dark:bg-zinc-900 hover:bg-zinc-800
                 text-zinc-400 hover:text-white transition-all duration-200"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}

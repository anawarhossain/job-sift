import Image from "next/image";
import { HeroSearchForm } from "./HeroSearchForm";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

export function HeroSection() {
  return (
    <section
      className="relative w-full bg-white dark:bg-black text-zinc-900 dark:text-white overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── ব্যাকগ্রাউন্ড গ্লোব ইমেজ ── */}

      <div
        aria-hidden="true"
        className="hidden dark:block absolute inset-x-0 bottom-0 h-full pointer-events-none select-none"
      >
        <Image
          src="/globe.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-100"
        />
        {/* Top-to-bottom fade: content side se seamless merge */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/30 to-transparent" />
        {/* Bottom fade: footer transition ke smooth kora */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      </div>

      {/* Blue glow at bottom center */}
      <div
        aria-hidden="true"
        className="hidden dark:block absolute bottom-0 left-1/2 -translate-x-1/2
                         w-125 sm:w-175 h-50
                         bg-indigo-500/50 rounded-full blur-[100px] pointer-events-none"
      />

      {/* ── মেইন কন্টেন্ট ── */}
      <div
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center
                      gap-6 px-4 pt-24 pb-32 sm:pt-28 sm:pb-40"
      >
        {/* ১. Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full border border-white/8
                        bg-linear-to-r from-zinc-900/80 to-zinc-800/40
                        px-4 py-1.5 backdrop-blur-md shadow-inner animate-fade-up"
        >
          <span aria-hidden="true">💼</span>
          <p className="text-xs font-medium tracking-wider uppercase text-zinc-200">
            <span className="text-white font-bold">50,000+</span> New Jobs This
            Month
          </p>
        </div>

        {/* ২. হেডিং */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl
                       leading-[1.1] animate-fade-up delay-100"
        >
          {/* ✅ gradient-text utility ব্যবহার — শেষ শব্দে accent */}
          Find Your Dream <span className="gradient-text">Job Today</span>
        </h1>

        {/* ৩. ডেসক্রিপশন */}
        <p
          className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl
                      leading-relaxed font-light animate-fade-up delay-200"
        >
          JobSift connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* ৪. সার্চ ফর্ম — Client Component */}
        <div className="w-full animate-fade-up delay-300">
          <HeroSearchForm trendingPositions={trendingPositions} />
        </div>
      </div>

      {/* ── নিচের গ্লোব ওভারলে টেক্সট ── */}
      <div className="relative z-10 flex flex-col items-center pb-16 px-4">
        <p className="text-base sm:text-lg md:text-xl font-medium text-center text-zinc-400 max-w-lg leading-relaxed">
          Assisting over <span className=" font-semibold">15,000+</span> job
          seekers find their dream positions.
        </p>
      </div>

      {/* সেকশন বটম ডিভাইডার */}
      <hr className="section-divider mx-auto max-w-5xl" />
    </section>
  );
}

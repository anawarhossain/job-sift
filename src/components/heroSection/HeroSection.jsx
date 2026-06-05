import { HeroSearchForm } from "./HeroSearchForm";

export function HeroSection() {
  // ট্রেন্ডিং ডেটা (প্রয়োজনে সার্ভার বা ডাটাবেজ থেকে ফেচ করতে পারেন)
  const trendingPositions = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
  ];

  return (
    <section className="relative w-full bg-black text-white py-24 px-4 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      {/* ইমেজের মতো ব্যাকগ্রাউন্ড গ্লো এবং পার্টিকেল ইফেক্ট এরিয়া (অপশনাল ডিজাইন টাচ) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
        {/* ১. টপ ব্যাজ (50,000+ New Jobs This Month) */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-linear-to-r from-zinc-900/80 to-zinc-800/40 px-4 py-1.5 backdrop-blur-md shadow-inner">
          <span className="text-base">💼</span>
          <p className="text-xs font-medium tracking-wider uppercase text-zinc-400">
            <span className="text-white font-bold">50,000+</span> New Jobs This
            Month
          </p>
        </div>

        {/* ২. মেইন হেডিং (Find Your Dream Job Today) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mt-2 leading-[1.15]">
          Find Your Dream Job Today
        </h1>

        {/* ৩. সাব-হেডলাইন ডেসক্রিপশন */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed font-light mb-4">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* ৪. ক্লাইন্ট সার্চ ফর্ম কম্পোনেন্ট কল করা হলো */}
        <HeroSearchForm trendingPositions={trendingPositions} />
      </div>
    </section>
  );
}

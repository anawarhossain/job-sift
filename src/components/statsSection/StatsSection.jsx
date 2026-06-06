import { Briefcase, Receipt, ShieldCheck, PersonMagnifier } from "@gravity-ui/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function StatsSection({ className }) {
  // স্ট্যাটস কার্ডের ডেটা স্ট্রাকচার (সার্ভার রেন্ডার্ড)
  const stats = [
    {
      id: 1,
      value: "50K",
      label: "Live Jobs",
      icon: <Briefcase className="text-indigo-500 text-lg" />,
    },
    {
      id: 2,
      value: "12K",
      label: "Companies",
      icon: <Receipt className="text-indigo-500 text-lg" />,
    },
    {
      id: 3,
      value: "2M",
      label: "Job Seekers",
      icon: <PersonMagnifier className="text-indigo-500 text-lg" />,
    },
    {
      id: 4,
      value: "97%",
      label: "Success Rate",
      icon: <ShieldCheck className="text-indigo-500 text-lg" />,
    },
  ];

  return (
    <section
      className={cn(
        "relative w-full bg-black text-white pt-12 pb-24 px-4 overflow-hidden",
        className,
      )}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        {/* গ্লোব ব্যাকগ্রাউন্ড কন্টেইনার এবং ওভারলে টেক্সট */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[280px] sm:min-h-[350px] mb-12">
          {/* গ্লোব ইমেজ বা ইফেক্ট (আপনার দেওয়া ছবির মকআপ অনুযায়ী রাউন্ডেড গ্লোব শেড) */}
          <div className="absolute top-10 w-[300px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full bg-gradient-to-b from-indigo-600/20 via-blue-900/10 to-transparent blur-2xl opacity-60 pointer-events-none" />

          {/* যদি আপনার কাছে গ্লোবের আসল পিএনজি ইমেজ থাকে, তবে নিচের ডিভটি অন করে পাথ দিয়ে দিবেন */}
          <div className="absolute top-0 w-full max-w-2xl h-full opacity-30 mix-blend-screen pointer-events-none">
            <Image src="/globe.png" fill alt="Global Network" className="w-full h-full object-contain" />
          </div> 
         

          {/* গ্লোবের ওপরের মেইন ডেসক্রিপশন টেক্সট */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-center text-zinc-300 max-w-xl leading-relaxed relative z-20 px-4 mt-16">
            Assisting over{" "}
            <span className="text-white font-semibold">15,000+</span> job
            seekers find their dream positions.
          </h2>
        </div>

        {/* স্ট্যাটস কার্ড গ্রিড (৪টি কার্ড পাশাপাশি) */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative rounded-2xl border border-white/5 bg-[#0d0d0d]/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-zinc-800 hover:bg-[#121212]"
            >
              {/* কার্ডের ভেতরের টপ গ্লো ইফেক্ট */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/0 to-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="flex flex-col gap-4 relative z-10">
                {/* আইকন বক্স */}
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  {stat.icon}
                </div>

                {/* ভ্যালু ও লেবেল */}
                <div className="flex flex-col gap-1">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-500 font-medium tracking-wide">
                    {stat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

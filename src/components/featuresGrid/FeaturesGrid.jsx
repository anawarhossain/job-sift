import {
  ShieldCheck,
  LayoutCellsLarge,
  CirclePlay,
  FolderFlows,
  Compass,
  Person,
  ChartLine,
  Magnifier,
} from "@gravity-ui/icons";
import { cn } from "@/lib/utils";

export function FeaturesGrid({ className }) {
  // ইমেজের ৮টি কার্ডের আইকন এবং টেক্সট স্ট্রাকচার
  const features = [
    {
      id: 1,
      title: "AI Screening",
      description:
        "Automated candidate screening powered by next-gen language models.",
      icon: <ShieldCheck className="text-[#6366f1] text-lg" />,
    },
    {
      id: 2,
      title: "ATS Integration",
      description:
        "Sync your hiring pipeline effortlessly with leading applicant tracking tools.",
      icon: <LayoutCellsLarge className="text-[#6366f1] text-lg" />,
    },
    {
      id: 3,
      title: "Smart Search",
      description:
        "Advanced multi-criteria filtering to target exact skills and experience.",
      icon: <Magnifier className="text-[#6366f1] text-lg" />,
    },
    {
      id: 4,
      title: "Video Insights",
      description:
        "Review asynchronous video introductions from shortlisted applicants.",
      icon: <CirclePlay className="text-[#6366f1] text-lg" />,
    },
    {
      id: 5,
      title: "Custom Workflows",
      description:
        "Tailor stage-by-stage pipeline rules according to company needs.",
      icon: <FolderFlows className="text-[#6366f1] text-lg" />,
    },
    {
      id: 6,
      title: "Global Reach",
      description:
        "Tap into an international talent pool spanning multiple continents.",
      icon: <Compass className="text-[#6366f1] text-lg" />,
    },
    {
      id: 7,
      title: "Candidate Profile",
      description:
        "Rich, centralized profile hubs holding resumes, portfolios, and scores.",
      icon: <Person className="text-[#6366f1] text-lg" />,
    },
    {
      id: 8,
      title: "Analytics Dashboard",
      description:
        "Track hiring velocities, source conversion rates, and metrics instantly.",
      icon: <ChartLine className="text-[#6366f1] text-lg" />,
    },
  ];

  return (
    <section
      className={cn(
        "w-full bg-black text-white py-24 px-4 sm:px-6 border-t border-white/5",
        className,
      )}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* সেকশন হেডার টেক্সট */}
        <div className="text-center flex flex-col gap-3">
          <span className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest">
            Core Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Everything you need <br /> to succeed
          </h2>
        </div>

        {/* ৮টি ফিচারের রেসপন্সিভ গ্রিড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative rounded-2xl border border-white/5 bg-[#080808] p-5 transition-all duration-300 hover:border-zinc-800 hover:bg-[#0d0d0d] flex flex-col gap-4"
            >
              {/* হোভার গ্লো ইফেক্ট লেয়ার */}
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* আইকন কন্টেইনার */}
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors flex-shrink-0">
                {feature.icon}
              </div>

              {/* টাইটেল এবং ডেসক্রিপশন */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

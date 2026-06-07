// Server Component
import {
  Magnifier,
  ChartLine,
  Person,
  ChartBar,
  Bookmark,
  Factory,
  CircleDashed,
} from "@gravity-ui/icons";
import { cn } from "@/lib/utils";
import { TbClick } from "react-icons/tb";

// Original design-er 8-ti feature section match kora holo
const features = [
  {
    id: 1,
    title: "Smart Search",
    description:
      "Find your ideal job with advanced filters and AI-powered recommendations.",
    Icon: Magnifier,
  },
  {
    id: 2,
    title: "Salary Insights",
    description:
      "Get real salary data to negotiate confidently for your next role.",
    Icon: ChartLine,
  },
  {
    id: 3,
    title: "Top Companies",
    description:
      "Apply to vetted companies that are actively hiring right now.",
    Icon: Factory,
  },
  {
    id: 4,
    title: "Saved Jobs",
    description: "Manage apps and favourites on your personal dashboard.",
    Icon: Bookmark,
  },
  {
    id: 5,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process.",
    Icon: TbClick,
  },
  {
    id: 6,
    title: "Resume Builder",
    description:
      "Create professional resumes with modern, ATS-friendly templates.",
    Icon: Person,
  },
  {
    id: 7,
    title: "Skill-Based Matching",
    description:
      "Discover jobs that truly match your skills and experience level.",
    Icon: CircleDashed,
  },
  {
    id: 8,
    title: "Career Growth Resources",
    description:
      "Boost your career with quick interview tips and growth guides.",
    Icon: ChartBar,
  },
];

export function FeaturesGrid({ className }) {
  return (
    <section
      className={cn(
        "w-full bg-white dark:bg-black text-zinc-900 dark:text-white py-24 px-4 sm:px-6 border-t border-white/5",
        className,
      )}
      aria-label="Platform features"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <span className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest">
            Features Job
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need <br /> to succeed
          </h2>
        </div>

        {/* 4-col grid on lg, 2-col on sm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ id, title, description, Icon }) => (
            <div
              key={id}
              className="group relative rounded-2xl border shadow-2xl  p-5
                         hover:border-zinc-800
                         transition-all duration-300 flex flex-col gap-4"
            >
              {/* Hover inner glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                           bg-linear-to-br from-indigo-500/3 to-transparent"
              />

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/15
                           flex items-center justify-center shrink-0
                           group-hover:border-indigo-500/30 transition-colors"
                aria-hidden="true"
              >
                <Icon className="text-[#6366f1] w-4 h-4" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5 relative z-10">
                <h3 className="text-sm font-semibold transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Server Component
import {
  Briefcase,
  Receipt,
  ShieldCheck,
  PersonMagnifier,
} from "@gravity-ui/icons";
import { cn } from "@/lib/utils";

const stats = [
  { id: 1, value: "50K", label: "Active Jobs", iconName: "briefcase" },
  { id: 2, value: "12K", label: "Companies", iconName: "receipt" },
  { id: 3, value: "2M", label: "Job Seekers", iconName: "person" },
  { id: 4, value: "97%", label: "Satisfaction Rate", iconName: "shield" },
];

// Icon renderer (avoids JSX in data array — keeps it serializable for future RSC use)
function StatIcon({ name }) {
  const cls = "text-indigo-400 w-4 h-4";
  if (name === "briefcase")
    return <Briefcase className={cls} aria-hidden="true" />;
  if (name === "receipt") return <Receipt className={cls} aria-hidden="true" />;
  if (name === "person")
    return <PersonMagnifier className={cls} aria-hidden="true" />;
  if (name === "shield")
    return <ShieldCheck className={cls} aria-hidden="true" />;
  return null;
}

export function StatsSection({ className }) {
  return (
    <section
      className={cn(
        "relative w-full bg-black text-white py-16 px-4 sm:px-6",
        className,
      )}
      aria-label="Platform statistics"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[500px] h-[200px] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative rounded-2xl border border-white/5 bg-[#0d0d0d]/80 p-6
                         hover:border-zinc-800 hover:bg-[#121212]
                         transition-all duration-300"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity
                           bg-gradient-to-br from-indigo-500/[0.04] to-transparent pointer-events-none"
              />
              <div className="flex flex-col gap-4 relative z-10">
                <div
                  className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/10
                                flex items-center justify-center group-hover:border-indigo-500/20 transition-colors"
                >
                  <StatIcon name={stat.iconName} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <dd className="text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="text-xs sm:text-sm text-zinc-500 font-medium tracking-wide">
                    {stat.label}
                  </dt>
                </div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

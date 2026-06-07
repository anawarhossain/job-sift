// Server Component — PricingToggle (client) e data pass kora hoy
import { PricingToggle } from "./PricingToggle";

// Icon strings pass korbo — JSX server component theke serializable
// PricingToggle nijer moto icon render korbe
const plans = [
  {
    name: "Starter",
    desc: "Perfect for job seekers just getting started.",
    priceMonthly: 0,
    priceYearly: 0,
    iconKey: "compass",
    isPopular: false,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary trends",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    desc: "Start building your insights hub.",
    priceMonthly: 17,
    priceYearly: 14,
    iconKey: "chart",
    isPopular: true,
    features: [
      "Everything in Starter",
      "Daily AI match brief (top 5)",
      "Verified salary trends",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Premium",
    desc: "Start building your insights hub.",
    priceMonthly: 99,
    priceYearly: 79,
    iconKey: "star",
    isPopular: false,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

export function PricingSection() {
  return (
    <section
      className="w-full bg-white dark:bg-black text-zinc-900 dark:text-white py-24 px-4 sm:px-6 border-t border-white/5 relative overflow-hidden"
      aria-label="Pricing plans"
    >
      {/* Subtle bg glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[700px] h-[300px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <span className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Pay for the leverage, <br /> not the listings
          </h2>
        </div>

        {/* Client toggle + cards */}
        <div className="w-full">
          <PricingToggle plans={plans} />
        </div>
      </div>
    </section>
  );
}

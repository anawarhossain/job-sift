import { PricingToggle } from "./PricingToggle";
import { Compass, FolderFlows, ChartLine } from "@gravity-ui/icons";

export function PricingSection() {
  // সার্ভার ডেটা যা ক্লায়েন্ট টগলে পাস করা হবে
  const plans = [
    {
      name: "Starter",
      desc: "Perfect for fast-growing startups.",
      priceMonthly: 0,
      priceYearly: 0,
      icon: <Compass />,
      isPopular: false,
      features: [
        "Access to 50K+ live job listings",
        "Basic candidate screening profile",
        "Standard multi-criteria filtering",
        "Community support channel",
      ],
    },
    {
      name: "Growth",
      desc: "Built for scaling businesses and teams.",
      priceMonthly: 19,
      priceYearly: 15, // ২০% ডিসকাউন্ট সহ
      icon: <FolderFlows />,
      isPopular: true,
      features: [
        "Everything in Starter plan",
        "Advanced AI screening & sorting",
        "Full ATS Integration & workflows",
        "Priority live-chat support 24/7",
        "Custom application tracking tags",
      ],
    },
    {
      name: "Enterprise",
      desc: "Custom leverage for corporate hiring.",
      priceMonthly: 99,
      priceYearly: 79,
      icon: <ChartLine />,
      isPopular: false,
      features: [
        "Everything in Growth plan",
        "Unlimited worker AI automation",
        "Dedicated account hiring manager",
        "Custom branding & white-label",
        "Advanced dashboard & API access",
      ],
    },
  ];

  return (
    <section className="w-full bg-black text-white py-24 px-4 sm:px-6 border-t border-white/5 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড হালকা লাইটিং ইফেক্ট */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 relative z-10">
        {/* সেকশন হেডার */}
        <div className="text-center flex flex-col gap-3">
          <span className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest">
            Pricing Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Pay for the leverage, <br /> not the listings
          </h2>
        </div>

        {/* ক্লায়েন্ট টগল কন্টেইনার কল করা হলো */}
        <div className="w-full mt-6">
          <PricingToggle plans={plans} />
        </div>
      </div>
    </section>
  );
}

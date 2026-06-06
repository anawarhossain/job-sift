"use client";

import { useState } from "react";
import { Check } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";

export function PricingToggle({ plans }) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-12">
      {/* ছবির মতো কাস্টম টগল বাটন */}
      <div className="flex items-center bg-[#0d0d0d] border border-white/5 p-1 rounded-full relative z-10">
        <button
          onClick={() => setIsYearly(false)}
          className={cn(
            "px-5 py-1.5 text-xs font-medium rounded-full transition-all",
            !isYearly
              ? "bg-white text-black shadow-md"
              : "text-zinc-500 hover:text-zinc-300",
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={cn(
            "px-5 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5",
            isYearly
              ? "bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white shadow-md"
              : "text-zinc-500 hover:text-zinc-300",
          )}
        >
          Yearly
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
              isYearly
                ? "bg-white/20 text-white"
                : "bg-[#4f46e5]/20 text-[#6366f1]",
            )}
          >
            -20%
          </span>
        </button>
      </div>

      {/* ৩টি প্রাইসিং কার্ড গ্রিড */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => {
          const isMain = plan.isPopular;
          return (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative",
                isMain
                  ? "bg-[#0d0d0d] border-2 border-[#4f46e5] shadow-2xl shadow-indigo-500/10 scale-105 z-10 md:-translate-y-2"
                  : "bg-[#080808] border border-white/5 hover:border-zinc-800",
              )}
            >
              {/* মেইন বা পপুলার কার্ডের জন্য গ্লো ইফেক্ট */}
              {isMain && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#4f46e5] to-[#6366f1] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                {/* কার্ড হেডার */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">{plan.desc}</p>
                  </div>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border border-white/5 text-zinc-400",
                      isMain && "bg-[#4f46e5]/10 text-[#6366f1]",
                    )}
                  >
                    {plan.icon}
                  </div>
                </div>

                {/* প্রাইসিং ডিসপ্লে */}
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-white tracking-tight">
                    ${isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">/mo</span>
                </div>

                {/* ফিচার লিস্ট */}
                <ul className="flex flex-col gap-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-zinc-400"
                    >
                      <Check
                        className={cn(
                          "text-zinc-600 mt-0.5 flex-shrink-0",
                          isMain && "text-[#6366f1]",
                        )}
                        width={16}
                        height={16}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* অ্যাকশন বাটন (HeroUI Button) */}
              <Button
                fullWidth
                radius="lg"
                variant={isMain ? "solid" : "bordered"}
                className={cn(
                  "font-medium transition-all text-sm py-5",
                  isMain
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "border-white/10 text-white hover:bg-white/5",
                )}
              >
                Choose Plan
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

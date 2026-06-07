"use client";

import { useState } from "react";
import { Check, Compass, ChartLine, Star } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Icon renderer — iconKey string theke JSX render
function PlanIcon({ iconKey, isPopular }) {
  const cls = cn("w-4 h-4", isPopular ? "text-[#6366f1]" : "text-zinc-400");
  if (iconKey === "chart") return <ChartLine className={cls} />;
  if (iconKey === "star") return <Star className={cls} />;
  return <Compass className={cls} />;
}

export function PricingToggle({ plans }) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* Toggle */}
      <div
        className="flex items-center  border border-white/5 p-1 rounded-full"
        role="group"
        aria-label="Billing cycle"
      >
        <button
          onClick={() => setIsYearly(false)}
          aria-pressed={!isYearly}
          className={cn(
            "px-5 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
            !isYearly
              ? "bg-white text-black shadow-sm"
              : "text-zinc-500 hover:text-zinc-300",
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsYearly(true)}
          aria-pressed={isYearly}
          className={cn(
            "px-5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5",
            isYearly
              ? "bg-linear-to-r from-[#4f46e5] to-[#6366f1] text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300",
          )}
        >
          Yearly
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.5 rounded-full font-bold tabular-nums",
              isYearly
                ? "bg-white/20 text-white"
                : "bg-[#4f46e5]/20 text-[#6366f1]",
            )}
          >
            -20%
          </span>
        </button>
      </div>

      {/* Pricing cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {plans.map((plan) => {
          const isMain = plan.isPopular;
          const price = isYearly ? plan.priceYearly : plan.priceMonthly;

          return (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl p-7 flex flex-col gap-6 transition-all duration-300 relative hover:outline-1",
                isMain
                  ? " border-2 border-[#4f46e5] shadow-2xl  shadow-indigo-500/15 md:-translate-y-3 z-10"
                  : " border dark:border-white/50 hover:border-zinc-800",
              )}
            >
              {/* Popular badge */}
              {isMain && (
                <div
                  aria-label="Most popular plan"
                  className="absolute -top-3 left-1/2 -translate-x-1/2
                             bg-linear-to-r from-[#4f46e5] to-[#6366f1]
                             text-white text-[10px] font-bold uppercase tracking-widest
                             px-3 py-1 rounded-full shadow-md whitespace-nowrap"
                >
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold ">{plan.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5 max-w-[160px] leading-relaxed">
                    {plan.desc}
                  </p>
                </div>
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center border",
                    isMain
                      ? "bg-[#4f46e5]/10 border-indigo-500/20"
                      : "bg-zinc-900 border-white/5",
                  )}
                  aria-hidden="true"
                >
                  <PlanIcon iconKey={plan.iconKey} isPopular={isMain} />
                </div>
              </div>

              {/* Price */}
              <div
                className="flex items-baseline gap-1"
                aria-label={`Price: $${price} per month`}
              >
                <span className="text-4xl font-extrabold tracking-tight tabular-nums">
                  ${price}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  /month
                </span>
                {/* Yearly savings hint */}
                {isYearly && plan.priceMonthly > 0 && (
                  <span className="ml-1 text-[10px] text-emerald-400 font-medium">
                    save ${(plan.priceMonthly - plan.priceYearly) * 12}/yr
                  </span>
                )}
              </div>

              {/* Feature list */}
              <ul
                className="flex flex-col gap-3"
                aria-label={`${plan.name} plan features`}
              >
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-zinc-400"
                  >
                    <Check
                      className={cn(
                        "mt-0.5 flex-shrink-0 w-3.5 h-3.5",
                        isMain ? "text-[#6366f1]" : "text-zinc-600",
                      )}
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                as={Link}
                href={
                  plan.priceMonthly === 0
                    ? "/signup"
                    : "/signup?plan=" + plan.name.toLowerCase()
                }
                fullWidth
                radius="lg"
                className={cn(
                  "font-medium text-sm py-5 transition-all duration-200",
                  isMain
                    ? "bg-white dark:bg-black text-zinc-900 dark:text-white hover:bg-zinc-100"
                    : " border border-white/10 text-white",
                )}
              >
                {plan.priceMonthly === 0
                  ? "Get Started Free"
                  : "Choose This Plan"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

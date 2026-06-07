// Server Component
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";

export function CTASection({ className }) {
  return (
    <section
      className={cn(
        "relative w-full bg-white dark:bg-black text-zinc-900 dark:text-white overflow-hidden",
        className,
      )}
      aria-label="Call to action"
    >
      {/* ── CTA background grid image ── */}
      <div
        aria-hidden="true"
        className="hidden dark:block absolute inset-x-0 bottom-0 h-full pointer-events-none select-none"
      >
        <Image
          src="/cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-50"
        />
        {/* Top-to-bottom fade: content side se seamless merge */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-transparent" />
        {/* Bottom fade: footer transition ke smooth kora */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Blue glow at bottom center */}
      <div
        aria-hidden="true"
        className="hidden dark:block absolute top-10 left-1/2 -translate-x-1/2
                   w-[500px] sm:w-[700px] h-[200px]
                   bg-indigo-600/80 rounded-full blur-[100px] pointer-events-none"
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center
                      gap-6 px-4 py-28 sm:py-36"
      >
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-xl leading-[1.15]">
          Your next role is <br /> already looking for you
        </h2>

        {/* Sub-description */}
        <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed font-light">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
          <Link href="/signup">
            <Button
              radius="full"
              className="bg-white text-black font-medium hover:bg-zinc-100
                       transition-all px-8 text-sm shadow-xl w-full sm:w-auto"
            >
              Create a free account
            </Button>
          </Link>

          <Link href="#pricing">
            <Button
              radius="full"
              variant="bordered"
              className="border-white/15  font-medium hover:bg-black/30 dark:hover:bg-white/30
                       transition-all px-8 text-sm w-full sm:w-auto"
            >
              View pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";

export function CTASection({ className }) {
  return (
    <section
      className={cn(
        "w-full bg-black text-white pt-24 pb-0 px-4 relative overflow-hidden flex flex-col items-center justify-end min-h-[550px]",
        className,
      )}
    >
      {/* ১. কন্টেন্ট এরিয়া (হেডিং, ডেসক্রিপশন এবং বাটন) */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative z-20 mb-8 px-4">
        {/* মেইন হেডিং */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl leading-[1.2]">
          Your next role is <br /> already looking for you
        </h2>

        {/* সাব-ডেসক্রিপশন */}
        <p className="text-sm sm:text-base text-zinc-500 max-w-lg leading-relaxed font-light">
          Join thousands of professionals who have accelerated their careers and
          found top-tier tech roles through HireLoop.
        </p>

        {/* ছবির মতো পাশাপাশি দুটি বাটন অ্যাকশন (HeroUI Buttons) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          {/* Create Account সাদা বাটন */}
          <Button
            radius="full"
            className="bg-white text-black font-medium hover:bg-zinc-200 transition-all px-8 py-2 text-sm shadow-xl w-full sm:w-auto"
          >
            Create Account
          </Button>

          {/* Post a Job ডার্ক/বর্ডার বাটন */}
          <Button
            radius="full"
            variant="bordered"
            className="border-white/10 text-white font-medium hover:bg-white/5 transition-all px-8 py-2 text-sm w-full sm:w-auto"
          >
            Post a Job
          </Button>
        </div>
      </div>

      {/* ২. ব্যাকগ্রাউন্ড ইমেজ এরিয়া (আপনার প্রোভাইড করা cta-bg.jpg) */}
      <div className="relative w-full max-w-[1000px] h-[220px] sm:h-[300px] md:h-[350px] mx-auto opacity-70 pointer-events-none z-10 select-none">
        {/* ছবির নিচের দিকের রাউন্ডেড গ্রিড নেটওয়ার্ক ব্যাকগ্রাউন্ড */}
        <Image
          src="/cta-bg.png"
          alt="Network Grid Background"
          fill
          priority
          className="object-contain object-bottom"
        />
        {/* ইমেজটিকে ব্যাকগ্রাউন্ডের সাথে নিখুঁতভাবে মেশানোর জন্য হালকা একটি বটম-টপ ব্ল্যাক গ্রেডিয়েন্ট ওভারলে */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* অতিরিক্ত গ্লো ইফেক্ট যা ছবির নীল আভা তৈরি করবে */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[150px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
    </section>
  );
}

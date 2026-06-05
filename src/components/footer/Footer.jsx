import { Link } from "@heroui/react";
import { cn } from "@/lib/utils"; // আপনার প্রোজেক্টের cn utility পাথ অনুযায়ী দিন
// Gravity UI Icons ইমপোর্ট করা হয়েছে
import { LogoFacebook, LogoLinkedin } from "@gravity-ui/icons";
import { FaPinterestSquare } from "react-icons/fa";
import Image from "next/image";

export function Footer({ className }) {
  // ডাইনামিক লিংক ডেটা স্ট্রাকচার
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Job discovery", href: "#" },
        { label: "Worker AI", href: "#" },
        { label: "Companies", href: "#" },
        { label: "Salary data", href: "#" },
      ],
    },
    {
      title: "Navigations",
      links: [
        { label: "Help center", href: "#" },
        { label: "Career library", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Brand Guideline", href: "#" },
        { label: "Newsroom", href: "#" },
      ],
    },
  ];

  return (
    <footer
      className={cn(
        "w-full bg-[#050505] text-zinc-400 pt-16 pb-8 px-6 sm:px-12 border-t border-white/5",
        className,
      )}
    >
      <div className="max-w-350 mx-auto flex flex-col gap-12">
        {/* উপরের মেইন সেকশন (লোগো এবং লিংকস) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          {/* বাম পাশের লোগো এবং ডেসক্রিপশন ব্লক */}
          <div className="md:col-span-5 flex flex-col gap-4">
                      {/* আপনার hireloop লোগো ইমেজটি এখানে বসাবেন */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">
                job<span className="text-orange-500">sift</span>
              </span>
            </div>

            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* ডান পাশের লিংক গ্রিড */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                {/* ক্যাটাগরি টাইটেল - আপনার ছবির মতো পার্পল/ব্লু শেড */}
                <h4 className="text-sm font-semibold text-[#4f46e5] tracking-wider">
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-zinc-500 hover:text-zinc-200 transition-colors text-sm font-normal"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* নিচের বটম বার (সোশ্যাল আইকন এবং কপিরাইট) */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* সোশ্যাল মিডিয়া আইকনসমূহ (ইমেজের মতো রাউন্ডেড বক্স লুক) */}
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <Link
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#121212] border border-white/5 text-zinc-500 hover:text-white transition-all hover:bg-zinc-800"
            >
              <LogoFacebook width={16} height={16} />
            </Link>
            <Link
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#312e81]/40 border border-[#4f46e5]/20 text-[#6366f1] hover:text-white transition-all hover:bg-[#4f46e5]"
            >
              <FaPinterestSquare width={16} height={16} />
            </Link>
            <Link
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#121212] border border-white/5 text-zinc-500 hover:text-white transition-all hover:bg-zinc-800"
            >
              <LogoLinkedin width={16} height={16} />
            </Link>
          </div>

          {/* কপিরাইট এবং পলিসি টেক্সট */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-zinc-600 order-1 sm:order-2 w-full sm:w-auto text-center sm:text-right justify-end">
            <p>Copyright © 2026 — JobSift</p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-zinc-600 hover:text-zinc-400 text-xs"
              >
                Terms & Policy
              </Link>
              <span className="text-zinc-700">•</span>
              <Link
                href="#"
                className="text-zinc-600 hover:text-zinc-400 text-xs"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

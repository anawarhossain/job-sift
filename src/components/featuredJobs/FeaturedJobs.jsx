import Image from "next/image";
import { Button } from "@heroui/react";
import { Compass, Clock, ArrowUpRight } from "@gravity-ui/icons";
import { cn } from "@/lib/utils";

export function FeaturedJobs({ className }) {
  // মক জব ডেটা (বাস্তব প্রোজেক্টে এটি ডাটাবেজ বা এপিআই থেকে আসবে)
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechLoop Inc.",
      location: "Remote / USA",
      type: "Full-time",
      salary: "$80k - $110k",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Innovate AI",
      location: "Dhaka, BD (Hybrid)",
      type: "Full-time",
      salary: "$60k - $80k",
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Quantum Cyber",
      location: "Remote",
      type: "Contract",
      salary: "$90k - $120k",
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "Skyline Studio",
      location: "London, UK",
      type: "Full-time",
      salary: "£70k - £90k",
    },
    {
      id: 5,
      title: "Frontend Developer",
      company: "Alpha FinTech",
      location: "Remote",
      type: "Part-time",
      salary: "$40k - $60k",
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "Pixel Craft",
      location: "Remote / Canada",
      type: "Full-time",
      salary: "$85k - $105k",
    },
  ];

  return (
    <section
      className={cn("w-full bg-black text-white py-20 px-4 sm:px-6", className)}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        {/* সেকশন হেডার টেক্সট */}
        <div className="text-center flex flex-col gap-3">
          <span className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest">
            Featured Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The roles you'd never <br className="hidden sm:block" /> find by
            searching
          </h2>
        </div>

        {/* ৬ কলামের জব কার্ড গ্রিড লেআউট */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group relative rounded-2xl border border-white/5 bg-[#0d0d0d] p-6 transition-all duration-300 hover:border-zinc-800 hover:bg-[#121212] flex flex-col justify-between min-h-[220px]"
            >
              {/* কার্ডের মেইন কন্টেন্ট */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {job.company}
                    </p>
                  </div>
                  {/* লোগো প্লেসহোল্ডার বা ছোট আইকন */}
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center p-1">
                    <Image
                      src="/jobsift_logo.png"
                      alt="Company Logo"
                      width={20}
                      height={20}
                      className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    />
                  </div>
                </div>

                {/* মেটা ডেটা (লোকেশন এবং জব টাইপ) */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Compass className="text-zinc-600 text-sm" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Clock className="text-zinc-600 text-sm" />
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>

              {/* কার্ডের নিচের ফুটার অংশ (স্যালারি এবং অ্যাকশন) */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-300">
                  {job.salary}
                </span>
                <button className="text-xs font-medium text-[#6366f1] group-hover:text-white flex items-center gap-1 transition-colors">
                  Apply Now
                  <ArrowUpRight className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* নিচে থাকা "View All Jobs" সাদা রিফাইন বাটন */}
        <div className="mt-4">
          <Button
            radius="full"
            variant="bordered"
            className="border-white/20 bg-white text-black font-medium hover:bg-zinc-200 hover:border-white transition-all px-6 py-2 text-sm shadow-xl"
          >
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
}

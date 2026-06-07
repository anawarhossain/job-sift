// Server Component
import Image from "next/image";
import { Button } from "@heroui/react";
import { Compass, Clock, ArrowUpRight } from "@gravity-ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Real project-e etai API/DB theke ashbe
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechLoop Inc.",
    location: "Remote / USA",
    type: "Full-time",
    salary: "$80k-$110k",
    tag: "New",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Innovate AI",
    location: "Dhaka, BD (Hybrid)",
    type: "Full-time",
    salary: "$60k-$80k",
    tag: null,
  },
  {
    id: 3,
    title: "AI Engineer",
    company: "Quantum Cyber",
    location: "Remote",
    type: "Contract",
    salary: "$90k-$120k",
    tag: "Hot",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "Skyline Studio",
    location: "London, UK",
    type: "Full-time",
    salary: "L70k-L90k",
    tag: null,
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "Alpha FinTech",
    location: "Remote",
    type: "Part-time",
    salary: "$40k-$60k",
    tag: null,
  },
  {
    id: 6,
    title: "Full-Stack Dev",
    company: "Pixel Craft",
    location: "Remote / Canada",
    type: "Full-time",
    salary: "$85k-$105k",
    tag: "New",
  },
];

const tagColors = {
  New: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Hot: "bg-orange-500/10  text-orange-400  border-orange-500/20",
};

export function FeaturedJobs({ className }) {
  return (
    <section
      className={cn(
        "w-full bg-white dark:bg-black text-zinc-900 dark:text-white py-24 px-4 sm:px-6",
        className,
      )}
      aria-label="Featured job listings"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <span className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest">
            Smart Job Discovery
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            The roles you&apos;d never <br className="hidden sm:block" />
            find by searching
          </h2>
        </div>

        {/* Job Cards — semantic ul/li/article */}
        <ul
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
        >
          {jobs.map((job) => (
            <li key={job.id}>
              <article
                className="group relative rounded-2xl border border-white/5 shadow-2xl p-6
                           hover:border-zinc-700/60 
                           transition-all duration-300 flex flex-col justify-between min-h-[200px]"
              >
                {/* Card top */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold transition-colors truncate">
                          {job.title}
                        </h3>
                        {job.tag && (
                          <span
                            className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide shrink-0",
                              tagColors[job.tag],
                            )}
                          >
                            {job.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5 truncate">
                        {job.company}
                      </p>
                    </div>

                    {/* Company logo */}
                    <div
                      className="w-9 h-9 shrink-0 rounded-xl bg-zinc-900 border border-white/5
                                 flex items-center justify-center overflow-hidden
                                 group-hover:border-zinc-700 transition-colors"
                    >
                      <Image
                        src="/jobsift_logo.png"
                        alt={`${job.company} logo`}
                        width={22}
                        height={22}
                        className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                      />
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Compass
                        className="w-3.5 h-3.5 text-zinc-600 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Clock
                        className="w-3.5 h-3.5 text-zinc-600 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    {job.salary}
                  </span>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-xs font-medium text-[#6366f1] group-hover:text-black dark:group-hover:text-white
                               flex items-center gap-1 transition-colors duration-200
                               focus-visible:outline-none focus-visible:underline"
                    aria-label={`Apply for ${job.title} at ${job.company}`}
                  >
                    Apply Now
                    <ArrowUpRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* View all CTA */}
        <Link href="/jobs">
          <Button
            radius="full"
            variant="bordered"
            className="border-zinc-700 bg-transparent text-white font-medium
                     hover:bg-white hover:text-black hover:border-white
                     transition-all duration-200 px-8 text-sm"
          >
            View all jobs open
          </Button>
        </Link>
      </div>
    </section>
  );
}

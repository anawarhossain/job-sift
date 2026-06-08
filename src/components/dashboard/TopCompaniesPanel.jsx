// ✅ Server Component
// Design: right panel — company list with active job count

import Link from "next/link";

// Mock data — real project-এ DB/API থেকে আসবে
const mockCompanies = [
  {
    id: 1,
    name: "Google Inc.",
    industry: "Technology",
    location: "Mountain View",
    activeJobs: 24,
    initial: "G",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Meta Platforms",
    industry: "Social Media",
    location: "Menlo Park",
    activeJobs: 18,
    initial: "M",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 3,
    name: "Stripe",
    industry: "Fintech",
    location: "San Francisco",
    activeJobs: 12,
    initial: "S",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 4,
    name: "Tesla",
    industry: "Automotive",
    location: "Austin",
    activeJobs: 31,
    initial: "T",
    color: "from-red-500 to-rose-600",
  },
];

function CompanyLogo({ name, initial, color }) {
  return (
    <div
      className={`w-10 h-10 rounded-xl bg-linear-to-br ${color} flex items-center justify-center shrink-0 text-white text-sm font-bold`}
    >
      {initial}
    </div>
  );
}

export function TopCompaniesPanel({ companies = mockCompanies }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/6 bg-[#0f0f0f] overflow-hidden h-full">
      {/* Rows */}
      <ul role="list" className="flex-1 divide-y divide-white/4">
        {companies.map((company) => (
          <li key={company.id}>
            <Link
              href={`/dashboard/recruiter/company/${company.id}`}
              className="flex items-center gap-3.5 px-5 py-4 hover:bg-white/3 transition-colors duration-150 group"
            >
              <CompanyLogo
                name={company.name}
                initial={company.initial}
                color={company.color}
              />

              {/* Company info */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors truncate">
                  {company.name}
                </span>
                <span className="text-xs text-zinc-600 truncate">
                  {company.industry} • {company.location}
                </span>
              </div>

              {/* Active jobs count */}
              <div className="flex flex-col items-end shrink-0">
                <span className="text-base font-bold text-white tabular-nums">
                  {company.activeJobs}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                  Active Jobs
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* View all button */}
      <div className="p-4 border-t border-white/6">
        <Link
          href="/dashboard/recruiter/company"
          className="flex items-center justify-center w-full rounded-xl border border-white/8 bg-white/3 hover:bg-white/[0.07] text-sm font-medium text-zinc-300 hover:text-white py-2.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          View All Companies
        </Link>
      </div>
    </div>
  );
}

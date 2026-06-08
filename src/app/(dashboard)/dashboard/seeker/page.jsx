// ✅ Server Component
import { requireRole } from "@/lib/core/session";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { ApplicationStatusBadge } from "@/components/dashboard/ApplicationStatusBadge";
import Link from "next/link";

const seekerStats = [
  {
    label: "Jobs Applied",
    value: "24",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    label: "Interviews",
    value: "6",
    iconPath:
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    label: "Saved Jobs",
    value: "18",
    iconPath: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
  },
  {
    label: "Profile Views",
    value: "142",
    iconPath: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    iconPath2:
      "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
];

const recentActivity = [
  {
    id: 1,
    role: "Senior Product Designer",
    company: "Google Inc.",
    date: "Oct 24, 2023",
    status: "Interviewing",
  },
  {
    id: 2,
    role: "UX Researcher",
    company: "Meta Platforms",
    date: "Oct 22, 2023",
    status: "Reviewing",
  },
  {
    id: 3,
    role: "Product Manager",
    company: "Stripe",
    date: "Oct 20, 2023",
    status: "New",
  },
  {
    id: 4,
    role: "Design Lead",
    company: "Tesla",
    date: "Oct 18, 2023",
    status: "Rejected",
  },
];

export default async function SeekerDashboard() {
  // ✅ requireRole — not logged in হলে /sign-in, wrong role হলে /unauthorized
  const user = await requireRole("Seeker");

  return (
    <div className="flex flex-col gap-8">
      {/* ── Welcome ── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Welcome back, {user.name}
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Here&apos;s your job search summary.
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {seekerStats.map((stat) => (
          <DashboardStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* ── Recent Activity ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">
            My Applications
          </h2>
          <Link
            href="/dashboard/seeker/applications"
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="flex flex-col rounded-2xl border border-white/6 bg-[#0f0f0f] overflow-hidden">
          <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.2fr] gap-4 px-6 py-3.5 border-b border-white/6 bg-white/2">
            {["Role", "Company", "Date Applied", "Status"].map((col) => (
              <span
                key={col}
                className="text-xs font-semibold text-zinc-500 uppercase tracking-wider"
              >
                {col}
              </span>
            ))}
          </div>
          <ul role="list" className="divide-y divide-white/4">
            {recentActivity.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/dashboard/seeker/applications/${item.id}`}
                  className="grid grid-cols-[2fr_1.5fr_1.5fr_1.2fr] gap-4 items-center px-6 py-4 hover:bg-white/3 transition-colors duration-150"
                >
                  <span className="text-sm font-medium text-zinc-200 truncate">
                    {item.role}
                  </span>
                  <span className="text-sm text-zinc-400 truncate">
                    {item.company}
                  </span>
                  <span className="text-sm text-zinc-500">{item.date}</span>
                  <ApplicationStatusBadge status={item.status} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

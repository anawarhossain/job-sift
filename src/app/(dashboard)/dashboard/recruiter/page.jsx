// Server Component
import { requireRole } from "@/lib/core/session";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { RecentApplicationsTable } from "@/components/dashboard/RecentApplicationsTable";
import { TopCompaniesPanel } from "@/components/dashboard/TopCompaniesPanel";
import { PostJobButton } from "@/components/dashboard/postJob/PostJobButton";
import Link from "next/link";

const stats = [
  {
    label: "Total Job Posts",
    value: "48",
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    label: "Total Applicants",
    value: "1,284",
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  { label: "Active Jobs", value: "18", iconPath: "M13 10V3L4 14h7v7l9-11h-7z" },
  {
    label: "Jobs Closed",
    value: "32",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default async function RecruiterDashboard() {
  const user = await requireRole("Recruiter");

  // Company data — real project-e DB theke ashbe
  const company = {
    name: user.companyName ?? "TechFlow Inc.",
    plan: user.plan ?? "Growth",
    activeJobs: 7,
    approved: true,
  };

  return (
    <div className="flex flex-col gap-8 ">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Welcome back, {user.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">
              Recent Applications
            </h2>
            <Link
              href="/dashboard/recruiter/applications"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all
            </Link>
          </div>
          <RecentApplicationsTable />
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">
              My Top Companies
            </h2>
            <Link
              href="/dashboard/recruiter/company"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all
            </Link>
          </div>
          <TopCompaniesPanel />
        </section>
      </div>

      {/* PostJobButton: server theke company data pass — client sirf modal handle kore */}
      <PostJobButton company={company} />
    </div>
  );
}

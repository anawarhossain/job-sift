// ✅ Server Component
// Design: table with Candidate Name, Role, Date Applied, Experience, Status

import Link from "next/link";
import { UserAvatar } from "@/components/navbar/UserAvatar";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

// Mock data — real project-এ DB/API থেকে আসবে (props হিসেবে পাস করুন)
const mockApplications = [
  {
    id: 1,
    name: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
  },
  {
    id: 2,
    name: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
  },
  {
    id: 3,
    name: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
  },
  {
    id: 4,
    name: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
  },
];

export function RecentApplicationsTable({ applications = mockApplications }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/6 bg-[#0f0f0f] overflow-hidden">
      {/* Table header row */}
      <div className="grid grid-cols-[2fr_2fr_1.5fr_1fr_1.2fr] gap-4 px-6 py-3.5 border-b border-white/6 bg-white/2">
        {["Candidate Name", "Role", "Date Applied", "Experience", "Status"].map(
          (col) => (
            <span
              key={col}
              className="text-xs font-semibold text-zinc-500 uppercase tracking-wider"
            >
              {col}
            </span>
          ),
        )}
      </div>

      {/* Rows */}
      <ul role="list" className="divide-y divide-white/4">
        {applications.map((app) => (
          <li key={app.id}>
            <Link
              href={`/dashboard/recruiter/applications/${app.id}`}
              className="grid grid-cols-[2fr_2fr_1.5fr_1fr_1.2fr] gap-4 items-center px-6 py-4 hover:bg-white/3 transition-colors duration-150 group"
            >
              {/* Candidate */}
              <div className="flex items-center gap-3 min-w-0">
                <UserAvatar name={app.name} size="sm" />
                <span className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
                  {app.name}
                </span>
              </div>

              {/* Role */}
              <span className="text-sm text-zinc-400 truncate">{app.role}</span>

              {/* Date */}
              <span className="text-sm text-zinc-500">{app.date}</span>

              {/* Experience */}
              <span className="text-sm text-zinc-500">{app.experience}</span>

              {/* Status */}
              <div>
                <ApplicationStatusBadge status={app.status} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ✅ Server Component — status badge pill

const statusConfig = {
  Interviewing: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  New: "bg-zinc-500/15    text-zinc-300   border-zinc-500/20",
  Reviewing: "bg-amber-500/15   text-amber-400  border-amber-500/20",
  Rejected: "bg-red-500/15     text-red-400    border-red-500/20",
  Shortlisted: "bg-blue-500/15    text-blue-400   border-blue-500/20",
  Hired: "bg-indigo-500/15  text-indigo-400 border-indigo-500/20",
};

export function ApplicationStatusBadge({ status }) {
  const classes =
    statusConfig[status] ?? "bg-zinc-500/15 text-zinc-400 border-zinc-500/20";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${classes}`}
    >
      {status}
    </span>
  );
}

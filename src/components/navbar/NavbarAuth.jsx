// ✅ Server Component — server-side session read করে সঠিক UI দেয়
// Client-এ কোনো flash বা layout shift হবে না

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@heroui/react";

// Guest UI — not logged in
function GuestButtons() {
  return (
    <>
      <span
        className="hidden h-5 w-px bg-zinc-700/80 md:inline-block"
        aria-hidden="true"
      />

      <Link
        href="/sign-in"
        className="text-sm font-medium text-[#6366f1] hover:text-[#818cf8] transition-colors duration-200 px-2"
      >
        Sign In
      </Link>

      {/* Get Started ব্লু-পার্পল গ্রেডিয়েন্ট বাটন */}
      <Link href={"/sign-up"}>
        <Button
          radius="md"
          className="bg-linear-to-r from-[#4f46e5] to-[#6366f1] text-white font-medium shadow-lg shadow-indigo-500/20 px-5 text-sm"
        >
          Get Started
        </Button>
      </Link>
    </>
  );
}

// Logged-in UI — passes user data to client dropdown
function AuthenticatedButtons({ user }) {
  return (
    <>
      <span
        className="hidden h-5 w-px bg-zinc-700/80 md:inline-block"
        aria-hidden="true"
      />

      {/* Post a Job — only visible when logged in */}
      <Link
        href="/post-job"
        className="hidden md:inline-flex items-center justify-center rounded-xl border border-white/8 bg-white/4 hover:bg-white/8 text-zinc-300 hover:text-white text-sm font-medium px-4 py-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        Post a Job
      </Link>

      {/* Client component — only the dropdown interaction is client-side */}
      <UserDropdown user={user} />
    </>
  );
}

// ── Main export ───────────────────────────────────────────────
export async function NavbarAuth() {
  // Server-side session fetch — better-auth
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch {
    // Session fetch ব্যর্থ হলে guest UI দেখাবে
    session = null;
  }

  const user = session?.user ?? null;

  if (!user) return <GuestButtons />;

  return (
    <AuthenticatedButtons
      user={{
        name: user.name ?? "User",
        email: user.email ?? "",
        image: user.image ?? null,
      }}
    />
  );
}

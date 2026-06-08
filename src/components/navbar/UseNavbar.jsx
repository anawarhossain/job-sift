// ✅ Server Component
import { Navbar } from "./Navbar";
import { NavbarAuth } from "./NavbarAuth";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../themeChange/ThemeToggle";

const UseNavbar = () => {
  return (
    <Navbar
      brand={
        <Link
          href="/"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
        >
          <div className="relative h-7 w-28">
            <Image
              src="/jobsift_logo.png"
              alt="Jobsift"
              fill
              sizes="112px"
              priority
              className="object-contain"
            />
          </div>
        </Link>
      }
      items={[
        { label: "Browse Jobs", href: "#jobs" },
        { label: "Company", href: "#company" },
        { label: "Pricing", href: "#pricing" },
      ]}
      // ✅ NavbarAuth: server-side session read করে
      // guest হলে Sign In + Get Started
      // logged in হলে Post a Job + UserDropdown
      rightContent={
        // ✅ ThemeToggle (client) আর NavbarAuth (server) —
        // fragment-এ একসাথে রাখা যায়, server/client boundary ঠিক থাকে
        <>
          <ThemeToggle />
          <NavbarAuth />
        </>
      }
    />
  );
};

export default UseNavbar;

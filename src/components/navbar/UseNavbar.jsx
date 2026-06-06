import React from 'react';
import { Navbar } from './Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@heroui/react';

const UseNavbar = () => {
    return (
      <Navbar
        // ১. ব্র্যান্ড লোগো (ছবির লোগো অনুযায়ী)
        brand={
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
          >
            {/*  লোগো ইমেজ */}
            <div className="relative h-7 w-32">
              <Image
                src="/jobsift_logo.png"
                alt="Jobshift"
                fill
                sizes="112"
                priority
                className="object-contain"
              />
            </div>
          </Link>
        }
        // ২. নেভিগেশন লিংকসমূহ
        items={[
          { label: "Browse Jobs", href: "#jobs" },
          { label: "Company", href: "#company" },
          { label: "Pricing", href: "#pricing" },
        ]}
        // ৩. ডান পাশের বাটন এবং ভার্টিক্যাল ডিভাইডার
        rightContent={
          <>
            {/* চিকন ডিভাইডার লাইন */}
            <span className="hidden h-5 w-px bg-zinc-700 md:inline-block" />

            {/* Sign In লিংক */}
            <Link
              href="#login"
              className="text-sm font-medium text-[#6366f1] hover:text-[#818cf8] transition-colors duration-200 px-2"
            >
              Sign In
            </Link>

            {/* Get Started ব্লু-পার্পল গ্রেডিয়েন্ট বাটন */}
            <Link href={"#signup"}>
              <Button
              radius="md"
              className="bg-linear-to-r from-[#4f46e5] to-[#6366f1] text-white font-medium shadow-lg shadow-indigo-500/20 px-5 text-sm"
            >
              Get Started
            </Button>
            </Link>
            
          </>
        }
      />
    );
};

export default UseNavbar;
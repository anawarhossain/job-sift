// ✅ Server Component — layout, background, branding সব static
import Image from "next/image";
import Link from "next/link";

export function AuthLayout({
  children,
  heading,
  subheading,
  footerText,
  footerLinkLabel,
  footerLinkHref,
}) {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black flex items-center justify-center overflow-hidden px-4 py-12">
      {/* ── Background radial glow (top-center) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full bg-indigo-600/10 blur-[120px]"
      />

      {/* ── Globe image faint background ── */}
      <div
        aria-hidden="true"
        className="hidden pointer-events-none select-none absolute inset-x-0 bottom-0 dark:flex justify-center opacity-20"
      >
        <div
          className="relative w-full max-w-2xl"
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src="/globe.png"
            alt=""
            fill
            sizes="800px"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* ── Bottom glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-45 bg-indigo-700/10 rounded-full blur-[100px]"
      />

      {/* ── Card container ── */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
          >
            <div className="relative h-7 w-28">
              <Image
                src="/jobsift_logo.png"
                alt="JobSift"
                fill
                sizes="112px"
                priority
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Heading block */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {heading}
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed">{subheading}</p>
        </div>

        {/* Slot — form content goes here */}
        <div className="rounded-2xl border border-black/30 dark:border-white/30 backdrop-blur-xl shadow-2xl shadow-black/60 p-7 sm:p-8">
          {children}
        </div>

        {/* Footer link */}
        {footerText && footerLinkLabel && footerLinkHref && (
          <p className="text-center text-sm text-zinc-500">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-150 underline underline-offset-4"
            >
              {footerLinkLabel}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

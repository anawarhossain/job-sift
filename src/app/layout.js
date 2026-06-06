import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UseNavbar from "@/components/navbar/UseNavbar";
import { Footer } from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // ফন্ট লোড হওয়ার আগে fallback দেখাবে — CLS কমাবে
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "JobSift — Find Your Dream Job Today",
    template: "%s | JobSift",
  },
  description:
    "JobSift connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.",
  keywords: ["jobs", "hiring", "career", "remote work", "tech jobs"],
  authors: [{ name: "JobSift" }],
  openGraph: {
    title: "JobSift — Find Your Dream Job Today",
    description: "JobSift connects top talent with world-class companies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobSift — Find Your Dream Job Today",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <UseNavbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

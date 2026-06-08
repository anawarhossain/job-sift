// ✅ Server Component
// (main) route group — Navbar ও Footer সহ সব public page
import UseNavbar from "@/components/navbar/UseNavbar";
import { Footer } from "@/components/footer/Footer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      {/* // show navbar in signup and signin page */}
      {/* <UseNavbar /> */}

      <div className="flex min-h-screen">
        {/* ── Left Sidebar ── */}
        <DashboardSidebar />

        {/* ── Main content area ── */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* ── Top bar ── */}
          <DashboardTopbar />

          {/* ── Page content ── */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>

      {/* //  show Footer in signup and signin page */}
      {/* <Footer /> */}
    </>
  );
}

// ✅ Server Component
// (main) route group — Navbar ও Footer সহ সব public page
import UseNavbar from "@/components/navbar/UseNavbar";
import { Footer } from "@/components/footer/Footer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      {/* // show navbar in signup and signin page */}
      {/* <UseNavbar /> */}
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1">{children}</main>
      </div>

      {/* //  show Footer in signup and signin page */}
      {/* <Footer /> */}
    </>
  );
}

// ✅ Server Component
// (main) route group — Navbar ও Footer সহ সব public page
import UseNavbar from "@/components/navbar/UseNavbar";
import { Footer } from "@/components/footer/Footer";

export default function DashboardLayout({ children }) {
  return (
    <>
      {/* // show navbar in signup and signin page */}
      {/* <UseNavbar /> */}
      <main className="flex-1">{children}</main>
      {/* //  show Footer in signup and signin page */}
      {/* <Footer /> */}
    </>
  );
}

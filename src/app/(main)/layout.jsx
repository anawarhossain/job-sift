// ✅ Server Component
// (main) route group — Navbar ও Footer সহ সব public page
import UseNavbar from "@/components/navbar/UseNavbar";
import { Footer } from "@/components/footer/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <UseNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

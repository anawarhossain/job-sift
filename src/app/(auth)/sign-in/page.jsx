// ✅ Server Component
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your HireLoop account and continue your job search.",
};

export default function SignInPage() {
  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to continue your job search."
    //   footerText="Don't have an account?"
    //   footerLinkLabel="Create one free"
    //   footerLinkHref="/sign-up"
    >
      <SignInForm />
    </AuthLayout>
  );
}

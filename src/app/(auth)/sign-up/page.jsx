// ✅ Server Component — page itself has no client logic
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Create Account",
  description: "Sign up for JobSift and start finding your dream job today.",
};

export default function SignUpPage() {
  return (
    <AuthLayout
      heading="Create your account"
      subheading="Join 50,000+ professionals already on JobSift."
    //   footerText="Already have an account?"
    //   footerLinkLabel="Sign in"
    //   footerLinkHref="/sign-in"
    >
      <SignUpForm />
    </AuthLayout>
  );
}

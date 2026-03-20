import type { Metadata } from "next";
import RegistrationForm from "@/components/registration/RegistrationForm";

export const metadata: Metadata = {
  title: "Apply to Attend",
  description:
    "Submit your application to attend The Convergence 2026. Screened admission for mid-level professionals, business owners, and corporate teams in Port Harcourt, Nigeria.",
  alternates: { canonical: "/register" },
  openGraph: {
    title: "Apply to Attend | The Convergence 2026",
    description:
      "Screened admission — apply now to secure your place at The Convergence 2026, Saturday 18th April, Heritage House, Port Harcourt.",
    url: "/register",
  },
  robots: { index: true, follow: true },
};

export default function RegisterPage() {
  return <RegistrationForm />;
}

import Link from "next/link";
import LoginForm from "@/components/dashboard/LoginForm";

export const metadata = {
  title: "Admin Login | The Convergence 2026",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center">
            <span className="font-bold text-xl text-teal-600 tracking-tight">The Convergence</span>
            <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mt-0.5">
              Faith · Business · Leadership
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-gray-900">Admin Login</h1>
            <p className="text-gray-400 text-sm mt-1">Sign in to access the dashboard</p>
          </div>
          <LoginForm />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href="/" className="hover:text-teal-500 transition-colors">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}

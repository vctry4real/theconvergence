import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/dashboard/LogoutButton";

export const metadata = {
  title: "Dashboard | The Convergence 2026",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex flex-col leading-none">
              <span className="font-bold text-blue-700 tracking-tight text-sm">The Convergence</span>
              <span className="text-[9px] tracking-[0.15em] text-gray-400 uppercase">Admin Dashboard</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-gray-500 hover:text-blue-700 transition-colors font-medium">
                Registrants
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:block">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}

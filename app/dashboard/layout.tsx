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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex flex-col leading-none">
              <span className="font-black text-teal-600 tracking-tight text-sm">The Convergence</span>
              <span className="text-[9px] tracking-[0.15em] text-gray-400 uppercase">Admin</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-1">
              <Link
                href="/dashboard"
                className="text-sm text-gray-500 hover:text-teal-600 transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-teal-50"
              >
                Registrants
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
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

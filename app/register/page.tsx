import Link from "next/link";
import RegistrationForm from "@/components/registration/RegistrationForm";

export const metadata = {
  title: "Apply to Attend | The Convergence 2026",
  description: "Submit your application to attend The Convergence 2026. Screened admission for mid-level professionals and scaling business leaders.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-bold text-blue-700 tracking-tight">The Convergence</span>
            <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">Faith · Business · Leadership</span>
          </Link>
          <span className="text-sm text-gray-500">April 18, 2026 · Port Harcourt</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-2">Screened Admission</p>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Apply to Attend</h1>
          <p className="text-gray-500 leading-relaxed max-w-xl">
            Convergence is designed for mid-level professionals, business owners, and corporate teams who are ready
            to scale influence, impact, and enterprise. Participation is screened — please complete the form accurately.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-10">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}

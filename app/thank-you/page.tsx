import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Application Received | The Convergence 2026",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-bold text-blue-700 tracking-tight">The Convergence</span>
            <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">Faith · Business · Leadership</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-lg w-full text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-4">Application Received</h1>

          <p className="text-gray-500 leading-relaxed mb-8">
            Thank you for your interest in Convergence. Your application is being reviewed.
            Selected participants will receive confirmation and payment details within{" "}
            <span className="font-semibold text-gray-700">48 hours</span>.
          </p>

          {/* Payment info box */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 text-left">
            <p className="text-blue-800 font-bold text-sm mb-2">What happens next?</p>
            <ol className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <span className="font-bold shrink-0">1.</span>
                Your application will be reviewed by our team.
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold shrink-0">2.</span>
                If selected, you will receive a confirmation email within 48 hours.
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold shrink-0">3.</span>
                Payment details will be included in your confirmation. You can also proceed to pay now via the link below.
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://selar.com/77n5328h53" target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white w-full sm:w-auto px-8">
                Proceed to Payment
              </Button>
            </a>
            <Link href="/">
              <Button variant="outline" className="border-gray-300 text-gray-600 w-full sm:w-auto px-8">
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="text-gray-400 text-xs mt-8">
            The Convergence 2026 · Saturday, 18th April · Heritage House, Port Harcourt
          </p>
        </div>
      </div>
    </div>
  );
}

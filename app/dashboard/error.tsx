"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-bold tracking-widest uppercase text-red-500 mb-3">Error</p>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-400 text-sm mb-6 max-w-sm">{error.message}</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 px-5 py-2.5 rounded-xl transition-colors"
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-5 py-2.5 border border-gray-200 rounded-xl transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

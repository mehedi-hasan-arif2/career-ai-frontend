"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-white via-red-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/20">
        <AlertTriangle className="h-10 w-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
        An unexpected error occurred while loading this page. You can try again or head back home.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient text-white px-6 py-3 text-sm font-medium hover:brightness-110 transition-all">
          <RefreshCcw className="h-4 w-4" /> Try Again
        </button>
        <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-6 py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}

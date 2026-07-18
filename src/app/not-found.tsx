import Link from "next/link";
import { SearchX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-white via-indigo-50/40 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-gradient opacity-10 blur-3xl" />
      <div className="relative">
        <div className="h-20 w-20 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
          <SearchX className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-7xl font-bold bg-gradient-to-r from-primary via-accent to-highlight bg-clip-text text-transparent mb-3">404</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient text-white px-6 py-3 text-sm font-medium hover:brightness-110 transition-all">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
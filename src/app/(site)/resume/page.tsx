"use client";

import { ProtectedRoute } from "@/components/layout";
import { ResumeAnalyzer } from "@/components/ai";

export default function ResumePage() {
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">AI Resume Analyzer</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Resume & Skill Analyzer — paste your resume and get structured AI insights.</p>
        <ResumeAnalyzer />
      </div>
    </ProtectedRoute>
  );
}

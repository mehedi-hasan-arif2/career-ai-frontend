"use client";

import { ProtectedRoute } from "@/components/layout";
import { RecommendationEngine } from "@/components/ai";

export default function RecommendationsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">AI Career Recommendations</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Smart Recommendation Engine — a personalized, reasoned roadmap toward your goal.</p>
        <RecommendationEngine />
      </div>
    </ProtectedRoute>
  );
}

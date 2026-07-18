"use client";

import { ProtectedRoute } from "@/components/layout";
import { WelcomeBanner, StatsCards, QuickActions } from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <WelcomeBanner />
        <StatsCards />
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mt-10 mb-4">Quick Actions</h2>
        <QuickActions />
      </div>
    </ProtectedRoute>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { ProtectedRoute } from "@/components/layout";
import { api } from "@/lib/api";
import { Card, EmptyState, Skeleton } from "@/components/ui";

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => (await api.get("/stats")).data,
  });

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Track your skill growth and platform activity over time.</p>

        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Skill Frequency</h3>
              {data?.otherSkillsCount > 0 && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Showing top {data.skillChartData.length} of {data.totalSkillsCount} skills — {data.otherSkillsCount} more not shown.
                </p>
              )}
              {!data?.otherSkillsCount && <div className="mb-4" />}
              {data?.skillChartData?.length ? (
                <ResponsiveContainer width="100%" height={280} className="text-slate-600 dark:text-slate-300">
                  <BarChart data={data.skillChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "currentColor" }} interval={0} angle={-60} textAnchor="end" height={90} />
                    <YAxis allowDecimals={false} tick={{ fill: "currentColor" }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title="No skill data yet" description="Analyze your resume to see skill frequency here." />
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Skills Detected Over Time</h3>
              {data?.progressOverTime?.length ? (
                <ResponsiveContainer width="100%" height={280} className="text-slate-600 dark:text-slate-300">
                  <LineChart data={data.progressOverTime}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "currentColor" }} />
                    <YAxis allowDecimals={false} tick={{ fill: "currentColor" }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="skills" stroke="#7C3AED" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title="No progress data yet" description="Run a few resume analyses to see your trend." />
              )}
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
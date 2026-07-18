"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FileSearch, Target, Layers, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Card, Button, Skeleton, Badge } from "./ui";

export function StatsCards() {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => (await api.get("/stats")).data,
  });

  const cards = [
    { icon: Layers, label: "Career Items You've Added", value: data?.myItemsCount, tone: "primary" as const },
    { icon: FileSearch, label: "Resume Analyses Done", value: data?.resumeAnalysesCount, tone: "accent" as const },
    { icon: Target, label: "Roadmaps Generated", value: data?.recommendationsCount, tone: "highlight" as const },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c, i) => (
        <Card key={i} className="p-5">
          {isLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <c.icon className="h-5 w-5 text-primary" />
                <Badge tone={c.tone}>Live</Badge>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{c.value ?? 0}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{c.label}</p>
            </>
          )}
        </Card>
      ))}
    </div>
  );
}

export function QuickActions() {
  const actions = [
    { href: "/resume", label: "Analyze Resume", desc: "Get AI skill insights", icon: FileSearch },
    { href: "/recommendations", label: "Get Roadmap", desc: "Generate a career plan", icon: Target },
    { href: "/items/add", label: "Add Career Item", desc: "Contribute a resource", icon: Layers },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {actions.map((a, i) => (
        <Link key={i} href={a.href}>
          <Card className="p-5 hover:-translate-y-1 transition-transform cursor-pointer h-full">
            <a.icon className="h-6 w-6 text-primary mb-3" />
            <p className="font-medium text-slate-800 dark:text-white text-sm">{a.label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{a.desc}</p>
            <span className="text-xs text-primary font-medium flex items-center gap-1 mt-3">
              Go <ArrowRight className="h-3 w-3" />
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function WelcomeBanner() {
  const { user } = useAuth();
  return (
    <div className="rounded-card bg-gradient-to-br from-primary to-accent p-8 text-white mb-8">
      <h1 className="text-2xl font-bold">Welcome back, {user?.name.split(" ")[0]} 👋</h1>
      <p className="text-indigo-100 mt-1">
        {user?.careerGoal ? `Currently working toward: ${user.careerGoal}` : "Set a career goal to get your personalized roadmap."}
      </p>
    </div>
  );
}
"use client";

import { ProtectedRoute } from "@/components/layout";
import { useAuth } from "@/lib/auth";
import { Card, Badge } from "@/components/ui";
import { User as UserIcon, Mail, Target } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Your Profile</h1>
        <Card className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{user?.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {user?.email}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1"><Target className="h-3.5 w-3.5" /> CAREER GOAL</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">{user?.careerGoal || "Not set yet — generate a roadmap to set one."}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-1"><UserIcon className="h-3.5 w-3.5" /> CURRENT SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {user?.skills && user.skills.length > 0 ? (
                  user.skills.map((s, i) => <Badge key={i} tone="primary">{s}</Badge>)
                ) : (
                  <p className="text-sm text-slate-400">No skills extracted yet — analyze your resume first.</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ProtectedRoute>
  );
}

"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      refreshUser().finally(() => {
        router.push("/dashboard");
      });
    } else {
      router.push("/login?error=google_auth_failed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <p className="text-slate-500 dark:text-slate-400">Signing you in...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center" />}>
      <AuthCallbackInner />
    </Suspense>
  );
}

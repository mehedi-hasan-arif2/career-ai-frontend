import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/providers";

export const metadata: Metadata = {
  title: "CareerAI — AI-Powered Career Growth Platform",
  description: "Analyze your resume, close skill gaps, and get a personalized AI career roadmap.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased bg-slate-50 dark:bg-slate-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

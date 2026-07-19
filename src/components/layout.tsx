"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sparkles, Github, Mail, Sun, Moon, LogOut, Linkedin, Twitter } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { api } from "@/lib/api";
import { Button } from "./ui";
import { toast } from "sonner";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, setUser, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const loggedInLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/resume", label: "Resume AI" },
    { href: "/recommendations", label: "Roadmap AI" },
    { href: "/ai-assistant", label: "AI Assistant" },
    { href: "/analytics", label: "Analytics" },
    { href: "/items/manage", label: "My Items" },
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  async function handleLogout() {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white flex-shrink-0">
          <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          CareerAI
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          {!loading && !user && (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
          {!loading && user && (
            <>
              <span className="text-sm text-slate-500 dark:text-slate-400">Hi, {user.name.split(" ")[0]}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:border-red-800 dark:hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button className="text-slate-700 dark:text-slate-200" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            {!user ? (
              <>
                <Link href="/login" onClick={() => setOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
                <Link href="/register" onClick={() => setOpen(false)}><Button className="w-full">Get Started</Button></Link>
              </>
            ) : (
              <Button
                variant="outline"
                className="w-full hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:border-red-800 dark:hover:text-red-400"
                onClick={handleLogout}
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 font-bold text-white mb-3">
            <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            CareerAI
          </div>
          <p className="text-sm text-slate-400">
            AI-powered career growth platform helping you close skill gaps and plan your next move.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/explore" className="hover:text-white transition-colors">Explore</Link></li>
            <li><Link href="/resume" className="hover:text-white transition-colors">Resume AI</Link></li>
            <li><Link href="/recommendations" className="hover:text-white transition-colors">Roadmap AI</Link></li>
            <li><Link href="/ai-assistant" className="hover:text-white transition-colors">AI Assistant</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Contact</h4>
          <a href="mailto:hello@careerai.dev" className="text-sm text-slate-400 flex items-center gap-2 mb-4 hover:text-white transition-colors">
            <Mail className="h-4 w-4" /> hello@careerai.dev
          </a>
          <div className="flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
              aria-label="Twitter / X"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} CareerAI Platform. All rights reserved.
      </div>
    </footer>
  );
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      router.refresh();
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
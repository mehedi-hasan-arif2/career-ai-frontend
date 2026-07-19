"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, FileSearch, Target, TrendingUp, BookOpen, Code2, Palette,
  BarChart3, Cloud, Megaphone, Star, ChevronDown, ArrowRight, MessageCircle,
} from "lucide-react";
import { Button, Card, Badge } from "./ui";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Hero() {
  return (
    <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-2xl">
          <Badge tone="accent">
            <span className="inline-flex items-center gap-1"><Sparkles className="h-3 w-3" /> Agentic AI Career Platform</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-5 leading-tight">
            Turn your resume into a <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">personalized career roadmap</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-5 text-lg">
            CareerAI analyzes your skills, finds the gaps, and builds an AI-reasoned plan to get you to your next role — not just a chatbot, an agent that acts on your data.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/register"><Button size="lg">Get Started Free <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link href="/explore"><Button size="lg" variant="outline">Explore Career Paths</Button></Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { icon: FileSearch, title: "Share Your Resume", desc: "Paste your experience and let AI extract your real skills." },
    { icon: Target, title: "AI Finds the Gaps", desc: "Our recommendation engine compares your profile to your goal." },
    { icon: TrendingUp, title: "Get Your Roadmap", desc: "Receive a reasoned, step-by-step plan to reach your career goal." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How CareerAI Works</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Three steps from resume to roadmap</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
            <Card className="p-6 h-full">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function AIFeatures() {
  const features = [
    { icon: Target, title: "Smart Recommendation Engine", desc: "A context-aware agent reasons over your skills, goal, and past interactions to generate a personalized roadmap.", tone: "accent" as const },
    { icon: MessageCircle, title: "AI Career Chat Assistant", desc: "A conversational agent that remembers your context, gives follow-up reasoning, and suggests next questions.", tone: "primary" as const },
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <Badge tone="accent">AI-Powered</Badge>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Real Agentic AI, Not a Chatbot Wrapper</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-card p-8 border border-slate-200 dark:border-slate-700">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  const cats = [
    { icon: Code2, label: "Software Development" },
    { icon: BarChart3, label: "Data & Analytics" },
    { icon: Palette, label: "Design" },
    { icon: Cloud, label: "Cloud & DevOps" },
    { icon: Megaphone, label: "Marketing" },
    { icon: Target, label: "Product" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Explore Learning Categories</h2>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {cats.map((c, i) => (
          <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}>
            <Link href={`/explore?category=${encodeURIComponent(c.label)}`}>
              <Card className="p-5 text-center hover:-translate-y-1 transition-transform cursor-pointer">
                <c.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{c.label}</p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Statistics() {
  const [careerTrackCount, setCareerTrackCount] = useState<number | null>(null);

  useEffect(() => {
    api
      .get("/career", { params: { limit: 1 } })
      .then((res) => setCareerTrackCount(res.data.total))
      .catch(() => setCareerTrackCount(null));
  }, []);

  const stats = [
    { value: careerTrackCount !== null ? `${careerTrackCount}+` : "—", label: "Career Tracks" },
    { value: "2", label: "Agentic AI Features" },
    { value: "100%", label: "Personalized Plans" },
    { value: "24/7", label: "AI Availability" },
  ];

  return (
    <section className="bg-gradient-to-r from-primary to-accent py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
            <p className="text-3xl sm:text-4xl font-bold text-white">{s.value}</p>
            <p className="text-indigo-100 text-sm mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Highlights() {
  const items = [
    { title: "Context-Aware Analysis", desc: "AI remembers your resume and skill history to refine future recommendations." },
    { title: "Actionable Roadmaps", desc: "Not vague advice — concrete, ordered steps with reasoning behind each one." },
    { title: "Built for Growth", desc: "Track your skill progress over time with visual analytics." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
            <div className="border-l-2 border-highlight pl-5">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  const outcomes = [
    { icon: Target, title: "Clearer Next Steps", text: "A structured skill-gap breakdown replaces generic advice with a concrete, ordered roadmap." },
    { icon: TrendingUp, title: "Focused Priorities", text: "An ordered roadmap makes it easier to know what to focus on first instead of a long list of resources." },
    { icon: Sparkles, title: "Recognized Strengths", text: "Seeing extracted skills laid out clearly helps you recognize strengths you may have undervalued." },
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-900/40 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">What CareerAI Helps You Achieve</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {outcomes.map((o, i) => (
            <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
              <Card className="p-6 h-full">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-50 dark:bg-indigo-500/100/10 flex items-center justify-center mb-4">
                  <o.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{o.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{o.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    { q: "Is CareerAI free to use?", a: "Yes, you can create an account and use the core AI features at no cost." },
    { q: "What AI model powers the platform?", a: "CareerAI uses Google's Gemini model for resume analysis and recommendations." },
    { q: "Do I need to upload a file?", a: "No — you can paste your resume or experience as text directly into the analyzer." },
    { q: "Can I sign in with Google?", a: "Yes, Google sign-in is supported alongside email/password and a demo account." },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
      </motion.div>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <Card key={i} className="p-0 overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-5 text-left"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span className="font-medium text-slate-800 dark:text-white text-sm">{f.q}</span>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
            </button>
            {openIdx === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400">
                {f.a}
              </motion.div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
        className="rounded-card bg-gradient-to-br from-primary via-accent to-highlight p-12 text-center relative overflow-hidden">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to plan your next career move?</h2>
        <p className="text-indigo-100 mb-8 max-w-lg mx-auto">Get your free AI-powered skill analysis and roadmap in minutes.</p>
        <Link href="/register"><Button size="lg" className="bg-white dark:bg-slate-900 text-primary hover:bg-slate-100">Start Free <ArrowRight className="h-4 w-4" /></Button></Link>
      </motion.div>
    </section>
  );
}
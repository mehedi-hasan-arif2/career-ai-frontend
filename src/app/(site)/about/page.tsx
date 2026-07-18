import { Sparkles, Target, Users } from "lucide-react";

export default function AboutPage() {
  const values = [
    { icon: Sparkles, title: "AI-First", desc: "We build real agentic workflows, not simple prompt wrappers, so recommendations actually reason over your data." },
    { icon: Target, title: "Outcome-Focused", desc: "Every feature is designed to end in a concrete next action, not just information." },
    { icon: Users, title: "Built for Learners", desc: "From career switchers to students, CareerAI adapts its roadmap to where you're starting from." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">About CareerAI</h1>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
        CareerAI is an AI-powered career growth platform built to help people move from "I don't know what to learn next"
        to a clear, personalized action plan. Using Google's Gemini model, we analyze your resume and career goals to
        surface skill gaps and generate a step-by-step roadmap grounded in your actual profile.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-card p-6">
            <v.icon className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{v.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

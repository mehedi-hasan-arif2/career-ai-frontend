"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { api, getErrorMessage } from "@/lib/api";
import { ResumeAnalysis, Recommendation } from "@/types";
import { Button, Textarea, Card, Badge, Skeleton, EmptyState, Input, FieldLabel } from "./ui";

// ---------- AI Feature 1: Resume Analyzer ----------
export function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["resume-latest"],
    queryFn: async () => {
      const res = await api.get("/ai/resume/latest");
      return res.data.analysis as ResumeAnalysis | null;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/ai/resume/analyze", { resumeText });
      return res.data.analysis as ResumeAnalysis;
    },
    onSuccess: () => {
      toast.success("Resume analyzed successfully");
      queryClient.invalidateQueries({ queryKey: ["resume-latest"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Paste Your Resume
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Paste your experience, skills, and background. AI will extract structured insights.</p>
        <Textarea
          rows={12}
          placeholder="e.g. I'm a final year CSE student with experience in React, Node.js, and MongoDB. I've built two full-stack projects..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
        <Button
          className="w-full mt-4"
          onClick={() => mutation.mutate()}
          loading={mutation.isPending}
          disabled={resumeText.trim().length < 50}
        >
          {mutation.isPending ? "Analyzing..." : "Analyze with AI"}
        </Button>
        {mutation.isPending && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-3">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" /> AI is reading your resume...
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Analysis Result</h3>
        {isLoading && <Skeleton className="h-64 w-full" />}
        {!isLoading && !data && !mutation.data && (
          <EmptyState title="No analysis yet" description="Paste your resume and click analyze to see results here." />
        )}
        {(mutation.data || data) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <p className="text-sm text-slate-600 dark:text-slate-300">{(mutation.data || data)?.summary}</p>

            <div>
              <p className="text-xs font-medium text-slate-400 mb-2">EXTRACTED SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {(mutation.data || data)?.extractedSkills.map((s, i) => <Badge key={i} tone="primary">{s}</Badge>)}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> STRENGTHS</p>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
                {(mutation.data || data)?.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5 text-amber-500" /> AREAS TO IMPROVE</p>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
                {(mutation.data || data)?.gaps.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </motion.div>
        )}
      </Card>
    </div>
  );
}

// ---------- AI Feature 2: Recommendation Engine ----------
export function RecommendationEngine() {
  const [careerGoal, setCareerGoal] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["recommendation-latest"],
    queryFn: async () => {
      const res = await api.get("/ai/recommendations/latest");
      return res.data.recommendation as Recommendation | null;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/ai/recommendations/generate", { careerGoal });
      return res.data.recommendation as Recommendation;
    },
    onSuccess: () => {
      toast.success("Roadmap generated");
      queryClient.invalidateQueries({ queryKey: ["recommendation-latest"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const current = mutation.data || data;

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" /> Your Career Goal
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Tell the AI where you want to go. It will reason over your resume analysis and current skills.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <FieldLabel>Career goal</FieldLabel>
            <Input placeholder="e.g. Become a Frontend Developer at a product company" value={careerGoal} onChange={(e) => setCareerGoal(e.target.value)} />
          </div>
          <div className="sm:self-end">
            <Button onClick={() => mutation.mutate()} loading={mutation.isPending} disabled={!careerGoal.trim()}>
              <Send className="h-4 w-4" /> {current ? "Regenerate" : "Generate Roadmap"}
            </Button>
          </div>
        </div>
      </Card>

      {isLoading && <Skeleton className="h-64 w-full" />}
      {!isLoading && !current && (
        <EmptyState title="No roadmap yet" description="Set a career goal above to get your personalized AI roadmap." />
      )}

      {current && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Roadmap for: {current.careerGoal}</h4>
            <div className="space-y-4">
              {current.roadmap.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < current.roadmap.length - 1 && <div className="w-px flex-1 bg-slate-200 my-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-slate-800 dark:text-white text-sm">{step.step}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <p className="text-xs font-medium text-slate-400 mb-3">RECOMMENDED SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {current.recommendedSkills.map((s, i) => <Badge key={i} tone="accent">{s}</Badge>)}
              </div>
            </Card>
            <Card className="p-6">
              <p className="text-xs font-medium text-slate-400 mb-3">RECOMMENDED ROLES</p>
              <div className="flex flex-wrap gap-2">
                {current.recommendedRoles.map((s, i) => <Badge key={i} tone="highlight">{s}</Badge>)}
              </div>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// AI Chat Assistant
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useQuery({
    queryKey: ["chat-history"],
    queryFn: async () => {
      const res = await api.get("/ai/chat/history");
      setMessages(res.data.messages);
      return res.data.messages as ChatMessage[];
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setFollowUps([]);
    setTyping(true);
    try {
      const res = await api.post("/ai/chat/message", { message: text });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
      setFollowUps(res.data.suggestedFollowUps || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setTyping(false);
    }
  }

  return (
    <Card className="flex flex-col h-[70vh]">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-900 dark:text-white">Career Assistant</p>
          <p className="text-xs text-slate-400">Context-aware, remembers this conversation</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading && <Skeleton className="h-20 w-2/3" />}
        {!isLoading && messages.length === 0 && (
          <EmptyState title="Start a conversation" description="Ask about career paths, skills, or how to use CareerAI." />
        )}
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "user"
                  ? "bg-brand-gradient text-white rounded-br-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm"
              }`}
            >
              {m.content}
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {followUps.length > 0 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {followUps.map((f, i) => (
            <button
              key={i}
              onClick={() => sendMessage(f)}
              className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <form
        className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your career..."
          className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
        />
        <Button type="submit" disabled={!input.trim() || typing}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
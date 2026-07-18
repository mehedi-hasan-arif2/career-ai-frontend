"use client";

import { ProtectedRoute } from "@/components/layout";
import { ChatAssistant } from "@/components/ai";

export default function AIAssistantPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">AI Career Assistant</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          A conversational agent that understands your career context and remembers your conversation.
        </p>
        <ChatAssistant />
      </div>
    </ProtectedRoute>
  );
}

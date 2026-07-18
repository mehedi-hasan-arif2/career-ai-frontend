"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button, Input, Textarea, FieldLabel, Card } from "@/components/ui";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">Have a question about CareerAI? We'd love to hear from you.</p>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center"><Mail className="h-5 w-5 text-primary" /></div>
            <span className="text-sm text-slate-700 dark:text-slate-200">hello@careerai.dev</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center"><Phone className="h-5 w-5 text-primary" /></div>
            <span className="text-sm text-slate-700 dark:text-slate-200">+880 1XXX-XXXXXX</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center"><MapPin className="h-5 w-5 text-primary" /></div>
            <span className="text-sm text-slate-700 dark:text-slate-200">Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FieldLabel>Name</FieldLabel>
            <Input required placeholder="Your name" />
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            <Input required type="email" placeholder="you@example.com" />
          </div>
          <div>
            <FieldLabel>Message</FieldLabel>
            <Textarea required rows={5} placeholder="How can we help?" />
          </div>
          <Button type="submit" className="w-full" loading={submitting}>Send Message</Button>
        </form>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/layout";
import { Button, Input, Textarea, Select, FieldLabel, Card } from "@/components/ui";
import { api, getErrorMessage } from "@/lib/api";

export default function AddItemPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "Software Development",
    difficulty: "Beginner",
    duration: "",
    imageUrl: "",
  });

  const mutation = useMutation({
    mutationFn: async () => (await api.post("/career", form)).data,
    onSuccess: () => {
      toast.success("Career item added successfully");
      router.push("/items/manage");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Add Career Item</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Contribute a new career resource or learning track.</p>

        <Card className="p-6">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
          >
            <div>
              <FieldLabel>Title</FieldLabel>
              <Input required value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Full Stack Developer Track" />
            </div>
            <div>
              <FieldLabel>Short Description</FieldLabel>
              <Input required value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} placeholder="One-line summary" />
            </div>
            <div>
              <FieldLabel>Full Description</FieldLabel>
              <Textarea required rows={5} value={form.fullDescription} onChange={(e) => update("fullDescription", e.target.value)} placeholder="Detailed overview of this career path" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Category</FieldLabel>
                <Select value={form.category} onChange={(e) => update("category", e.target.value)}>
                  {["Software Development", "Data & Analytics", "Design", "Cloud & DevOps", "Marketing", "Product"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </div>
              <div>
                <FieldLabel>Difficulty</FieldLabel>
                <Select value={form.difficulty} onChange={(e) => update("difficulty", e.target.value)}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Select>
              </div>
            </div>
            <div>
              <FieldLabel>Duration</FieldLabel>
              <Input value={form.duration} onChange={(e) => update("duration", e.target.value)} placeholder="e.g. 3 months" />
            </div>
            <div>
              <FieldLabel>Image URL (optional)</FieldLabel>
              <Input value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} placeholder="https://..." />
            </div>
            <Button type="submit" className="w-full" loading={mutation.isPending}>Submit</Button>
          </form>
        </Card>
      </div>
    </ProtectedRoute>
  );
}

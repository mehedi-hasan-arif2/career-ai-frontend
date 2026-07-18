"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, Trash2, Plus } from "lucide-react";
import { ProtectedRoute } from "@/components/layout";
import { api, getErrorMessage } from "@/lib/api";
import { CareerItem } from "@/types";
import { Button, Badge, EmptyState, ConfirmDialog, Skeleton } from "@/components/ui";

export default function ManageItemsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["my-items"],
    queryFn: async () => (await api.get("/career/mine/all")).data.items as CareerItem[],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/career/${id}`),
    onSuccess: () => {
      toast.success("Item deleted");
      queryClient.invalidateQueries({ queryKey: ["my-items"] });
      setDeleteId(null);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Career Items</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">View, inspect, or remove items you've added.</p>
          </div>
          <Link href="/items/add" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto"><Plus className="h-4 w-4" /> Add New</Button>
          </Link>
        </div>

        {isLoading && <Skeleton className="h-64 w-full" />}

        {!isLoading && data?.length === 0 && (
          <EmptyState title="No items yet" description="You haven't added any career items. Create your first one." />
        )}

        {!isLoading && data && data.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-card border border-slate-200 dark:border-slate-800 overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Title</th>
                  <th className="text-left px-5 py-3 font-medium">Category</th>
                  <th className="text-left px-5 py-3 font-medium">Difficulty</th>
                  <th className="text-left px-5 py-3 font-medium">Added</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">{item.title}</td>
                    <td className="px-5 py-3"><Badge tone="primary">{item.category}</Badge></td>
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{item.difficulty}</td>
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <Link href={`/careers/${item._id}`}>
                          <Button variant="outline" size="sm"><Eye className="h-3.5 w-3.5" /></Button>
                        </Link>
                        <Button variant="danger" size="sm" onClick={() => setDeleteId(item._id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ConfirmDialog
          open={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
          title="Delete this item?"
          description="This action cannot be undone."
          loading={deleteMutation.isPending}
        />
      </div>
    </ProtectedRoute>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, Clock, BarChart3 } from "lucide-react";
import { api } from "@/lib/api";
import { CareerItem } from "@/types";
import { Badge, Skeleton, EmptyState } from "@/components/ui";
import { CareerGrid } from "@/components/career";

export default function CareerDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["career-item", id],
    queryFn: async () => {
      const res = await api.get(`/career/${id}`);
      return res.data as { item: CareerItem; related: CareerItem[] };
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="py-20"><EmptyState title="Career path not found" description="This item may have been removed." /></div>;
  }

  const { item, related } = data;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="relative h-72 w-full rounded-card overflow-hidden bg-slate-100 mb-8">
        {item.imageUrl && <Image src={item.imageUrl} alt={item.title} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Badge tone="primary">{item.category}</Badge>
        <Badge tone="neutral">{item.difficulty}</Badge>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h1>

      <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-8">
        <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {item.rating} rating</span>
        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {item.duration}</span>
        <span className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4" /> {item.difficulty}</span>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Overview</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.fullDescription}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Key Information</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">Category</p>
            <p className="font-medium text-slate-800 dark:text-white">{item.category}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">Difficulty</p>
            <p className="font-medium text-slate-800 dark:text-white">{item.difficulty}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">Duration</p>
            <p className="font-medium text-slate-800 dark:text-white">{item.duration}</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Rating</h2>
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5">
          <div className="flex items-center gap-1 text-2xl font-bold text-slate-900 dark:text-white">
            {item.rating.toFixed(1)}
            <Star className="h-5 w-5 fill-amber-400 text-amber-400 ml-1" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Aggregate platform rating for this career track. Learner reviews are not yet collected for this item.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Related Career Paths</h2>
          <CareerGrid items={related} />
        </section>
      )}
    </div>
  );
}
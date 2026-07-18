"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CareerItem } from "@/types";
import { CareerGrid, CareerFilters } from "@/components/career";
import { CardSkeleton, EmptyState, Button } from "@/components/ui";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["career-items", search, category, difficulty, sort, page],
    queryFn: async () => {
      const res = await api.get("/career", {
        params: { search, category, difficulty, sort, page, limit: 8 },
      });
      return res.data as { items: CareerItem[]; totalPages: number; total: number };
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Explore Career Paths</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Browse curated learning tracks across every domain.</p>
      </div>

      <CareerFilters
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        category={category}
        onCategoryChange={(v) => { setCategory(v); setPage(1); }}
        difficulty={difficulty}
        onDifficultyChange={(v) => { setDifficulty(v); setPage(1); }}
        sort={sort}
        onSortChange={(v) => { setSort(v); setPage(1); }}
      />

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      )}

      {isError && (
        <EmptyState title="Couldn't load career paths" description="Please check your connection and try again." />
      )}

      {!isLoading && !isError && data?.items.length === 0 && (
        <EmptyState title="No results found" description="Try adjusting your search or filters." />
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <>
          <CareerGrid items={data.items} />
          {data.totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
              <span className="text-sm text-slate-500 dark:text-slate-400">Page {page} of {data.totalPages}</span>
              <Button variant="outline" size="sm" disabled={page === data.totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

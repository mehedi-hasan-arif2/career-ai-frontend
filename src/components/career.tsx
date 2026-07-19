"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, ArrowRight, Search } from "lucide-react";
import { CareerItem } from "@/types";
import { Card, Badge, Button, Input, Select } from "./ui";

export function CareerCard({ item }: { item: CareerItem }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full group">
      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge tone="primary">{item.category}</Badge>
          <Badge tone="neutral">{item.difficulty}</Badge>
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 flex-1">{item.shortDescription}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-3">
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {item.rating}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {item.duration}</span>
        </div>
        <Link href={`/careers/${item._id}`} className="mt-4">
          <Button variant="outline" className="w-full" size="sm">
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export function CareerGrid({ items }: { items: CareerItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <CareerCard key={item._id} item={item} />
      ))}
    </div>
  );
}

interface FiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  difficulty: string;
  onDifficultyChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
}

const CATEGORIES = ["Software Development", "Data & Analytics", "Design", "Cloud & DevOps", "Marketing", "Product"];

export function CareerFilters(props: FiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search career paths..."
          value={props.search}
          onChange={(e) => props.onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={props.category} onChange={(e) => props.onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </Select>
      <Select value={props.difficulty} onChange={(e) => props.onDifficultyChange(e.target.value)}>
        <option value="">All Difficulty Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </Select>
      <Select value={props.sort} onChange={(e) => props.onSortChange(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="rating">Highest Rated</option>
      </Select>
    </div>
  );
}
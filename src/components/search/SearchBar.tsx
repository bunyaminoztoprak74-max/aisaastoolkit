"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
  navigateOnSearch?: boolean; // navigate to /search?q=...
  size?: "sm" | "md" | "lg";
}

export function SearchBar({
  placeholder = "Search AI tools, comparisons, reviews…",
  className,
  autoFocus = false,
  onSearch,
  navigateOnSearch = false,
  size = "md",
}: SearchBarProps) {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [value,   setValue]   = useState(searchParams.get("q") ?? "");
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const commit = useCallback(
    (q: string) => {
      if (navigateOnSearch) {
        setLoading(true);
        const params = new URLSearchParams(searchParams.toString());
        if (q.trim()) { params.set("q", q.trim()); params.delete("page"); }
        else params.delete("q");
        router.push(`/search?${params.toString()}`);
        setTimeout(() => setLoading(false), 500);
      }
      onSearch?.(q);
    },
    [navigateOnSearch, onSearch, router, searchParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setValue(q);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => commit(q), 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    commit(value);
  };

  const heights = { sm: "h-9 text-sm", md: "h-11 text-sm", lg: "h-14 text-base" };
  const iconSz  = { sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-5 h-5" };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)} role="search">
      <Search className={cn("absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none", iconSz[size])} />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search AI tools"
        className={cn(
          "w-full rounded-xl border border-input bg-background pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow",
          heights[size]
        )}
      />
      {loading ? (
        <Loader2 className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground", iconSz[size])} />
      ) : value ? (
        <button
          type="button"
          onClick={() => { setValue(""); onSearch?.(""); if (navigateOnSearch) router.push("/search"); }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className={iconSz[size]} />
        </button>
      ) : null}
    </form>
  );
}

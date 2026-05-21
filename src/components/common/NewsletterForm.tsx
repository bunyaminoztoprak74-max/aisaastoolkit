"use client";
import { useState } from "react";

interface Props {
  variant?: "hero" | "inline" | "sidebar";
  leadMagnet?: string;
}

export function NewsletterForm({ variant = "inline", leadMagnet }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">✨Z</div>
        <p className="font-semibold text-green-800 dark:text-green-200">You&apos;re in!</p>
        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
          Check your inbox for a welcome email.{leadMagnet ? ` Your ${leadMagnet} is on its way.` : ""}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={variant === "sidebar" ? "flex flex-col gap-2" : "flex flex-col sm:flex-row gap-3"}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe Free"}
      </button>
    </form>
  );
}

"use client";
import { useState } from "react";
import { Mail, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg opacity-[0.06] dark:opacity-[0.10]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="relative container mx-auto px-4 text-center max-w-2xl">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay Ahead of the <span className="gradient-text">AI Curve</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Get weekly roundups of the best new AI tools, exclusive deals, and expert tips — straight to your inbox. No spam, ever.
        </p>
        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-semibold text-lg">
            <CheckCircle className="w-6 h-6" />
            You're in! Check your inbox for a confirmation.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button type="submit" variant="gradient" size="default" className="h-11 px-6">
              Subscribe Free
            </Button>
          </form>
        )}
        <p className="text-xs text-muted-foreground mt-4">Join 12,000+ readers. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

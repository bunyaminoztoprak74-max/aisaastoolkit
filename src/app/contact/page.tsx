"use client";
import { useState, useRef } from "react";
import { MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-black mb-3">Contact Us</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Got a question, spotted an error, or want us to review a tool? We&rsquo;d love to hear from you.
      </p>

      {status === "sent" ? (
        <div className="rounded-xl border border-green-300 bg-green-50 dark:bg-green-950/20 p-8 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
          <p className="text-muted-foreground">We&rsquo;ll get back to you within 2 business days.</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                required
                type="text"
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                required
                type="email"
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="tool-review-request">Request a Tool Review</option>
              <option value="error-report">Report an Error</option>
              <option value="affiliate-partnership">Affiliate Partnership</option>
              <option value="general">General Question</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Tell us what's on your mind..."
            />
          </div>

          {status === "error" && (
            <div className="rounded-lg border border-red-300 bg-red-50 dark:bg-red-950/20 p-3 text-sm text-red-700 dark:text-red-300">
              Something went wrong. Please try again or email us at hello@aisaastoolkit.com.
            </div>
          )}

          <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={status === "sending"}>
            {status === "sending" ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
            ) : (
              <><MessageSquare className="w-4 h-4 mr-2" /> Send Message</>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We respond to all messages within 2 business days.
          </p>
        </form>
      )}
    </div>
  );
}

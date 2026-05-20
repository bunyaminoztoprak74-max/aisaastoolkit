"use client";
import { useState } from "react";
import { Mail, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-black mb-3">Contact Us</h1>
      <p className="text-muted-foreground text-lg mb-8">Got a question, spotted an error, or want us to review a tool? We'd love to hear from you.</p>

      {sent ? (
        <div className="rounded-xl border border-green-300 bg-green-50 dark:bg-green-950/20 p-8 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
          <p className="text-muted-foreground">We'll get back to you within 2 business days.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {["Name", "Email"].map((label) => (
              <div key={label}>
                <label className="block text-sm font-medium mb-1.5">{label}</label>
                <input required type={label === "Email" ? "email" : "text"} className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder={label === "Email" ? "you@example.com" : "Your name"} />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Subject</label>
            <select className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Tool Review Request</option>
              <option>Correction or Error Report</option>
              <option>Affiliate Partnership</option>
              <option>General Inquiry</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Message</label>
            <textarea required rows={5} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder="Tell us what's on your mind..." />
          </div>
          <Button type="submit" variant="gradient" size="lg" className="w-full">Send Message</Button>
        </form>
      )}

      <div className="mt-10 pt-8 border-t border-border grid sm:grid-cols-2 gap-4">
        <a href="mailto:hello@aisaastoolkit.com" className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 hover:border-primary/50 transition-colors">
          <Mail className="w-5 h-5 text-primary" />
          <div><p className="text-xs text-muted-foreground">Email us directly</p><p className="text-sm font-semibold">hello@aisaastoolkit.com</p></div>
        </a>
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary" />
          <div><p className="text-xs text-muted-foreground">Response time</p><p className="text-sm font-semibold">Within 2 business days</p></div>
        </div>
      </div>
    </div>
  );
}

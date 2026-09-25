"use client";

import { useState } from "react";

interface BlueprintDownloadModalProps {
  blueprintTitle: string;
  blueprintSlug: string;
  downloadUrl: string;
  downloadFileName: string;
  affiliateUrl: string;
}

export function BlueprintDownloadModal({
  blueprintTitle,
  blueprintSlug,
  downloadUrl,
  downloadFileName,
  affiliateUrl,
}: BlueprintDownloadModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // 1. Submit lead to capture API
      await fetch("/api/leads/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          blueprintSlug,
          blueprintTitle,
        }),
      });

      // 2. Trigger instant direct browser download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 3. Show high-converting success state
      setStatus("success");
    } catch {
      // Fallback: still trigger download so user experience never breaks
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setStatus("success");
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="inline-flex items-center justify-center font-bold text-white py-3.5 px-6 rounded-xl shadow-lg hover:opacity-90 transition-all text-center cursor-pointer"
        style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
      >
        📥 Download Blueprint JSON
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-card text-card-foreground border border-border w-full max-w-md rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            {status !== "success" ? (
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                  <span>⚡ Instant JSON Download</span>
                </div>

                <h3 className="text-2xl font-black tracking-tight mb-2">
                  Get Your Free Blueprint
                </h3>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Enter your email to download{" "}
                  <strong className="text-foreground">{downloadFileName}</strong>{" "}
                  instantly and receive our 1-click Make.com import walkthrough.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="lead-email" className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wider">
                      Work or Personal Email
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-red-500 font-medium">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full font-bold text-white py-3.5 px-6 rounded-xl shadow-lg hover:opacity-90 transition-all text-center cursor-pointer flex items-center justify-center gap-2 text-sm"
                    style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
                  >
                    {status === "submitting" ? (
                      <span>Preparing Download...</span>
                    ) : (
                      <span>📥 Download JSON Now</span>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-muted-foreground">
                    100% Free • No Spam • Unsubscribe with 1-click anytime
                  </p>
                </form>
              </div>
            ) : (
              <div className="text-center py-2">
                <div className="w-14 h-14 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
                  ✓
                </div>

                <h3 className="text-2xl font-black mb-2">Download Started!</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Check your downloads folder for{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                    {downloadFileName}
                  </code>
                </p>

                {/* Make.com Affiliate Activation Box */}
                <div className="bg-muted/50 border border-primary/20 rounded-xl p-4 text-left mb-6">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-xs font-bold text-foreground">Next Step: Import into Make.com</span>
                    <span className="text-[10px] bg-primary text-white px-2 py-0.2 rounded-full">Partner Deal</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    To run this scenario, you need a free Make.com account. Use our official partner link to get 1,000 free operations/month.
                  </p>
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full text-center text-xs font-bold text-white py-2.5 px-4 rounded-lg shadow hover:opacity-90 transition-all"
                    style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                  >
                    Create Free Make.com Account →
                  </a>
                </div>

                <button
                  onClick={handleClose}
                  className="text-xs text-muted-foreground hover:text-foreground font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                >
                  Done, close window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

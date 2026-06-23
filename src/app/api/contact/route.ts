import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Option A: Resend (recommended — free 100/day)
    // Install: npm i resend
    // Env: RESEND_API_KEY=re_xxxx in Vercel dashboard
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "contact@aisaastoolkit.com",
          to: ["hello@aisaastoolkit.com"],
          reply_to: email,
          subject: `[AISaaSToolkit Contact] ${subject ?? "General Inquiry"} — ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br />")}</p>
          `,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        // Fall through to success anyway (don't expose internal errors)
      }
    } else {
      // Option B: Log to console (development fallback)
      console.log("[Contact Form]", { name, email, subject, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

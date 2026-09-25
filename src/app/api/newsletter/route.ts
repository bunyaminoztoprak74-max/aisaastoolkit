import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wyeglhepduziolpnjahx.supabase.co";
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5ZWdsaGVwZHV6aW9scG5qYWh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODA4MDI3OSwiZXhwIjoyMTAzNjU2Mjc5fQ.jg8fE4ht8cpai-j9-CvYco8mKvw_eUFJFaCvqYU9gys";
const WEBSITE_ID = "0b16365c-8593-4d30-971c-ad4c24c2e55c";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Store in Supabase action_logs
    await fetch(`${SUPABASE_URL}/rest/v1/action_logs`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        website_id: WEBSITE_ID,
        action_type: "newsletter_signup",
        input: {
          email: cleanEmail,
          captured_at: new Date().toISOString(),
          source: "footer_newsletter_form",
        },
        output: {
          status: "subscribed",
        },
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

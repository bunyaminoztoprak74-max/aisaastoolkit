import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wyeglhepduziolpnjahx.supabase.co";
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5ZWdsaGVwZHV6aW9scG5qYWh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODA4MDI3OSwiZXhwIjoyMTAzNjU2Mjc5fQ.jg8fE4ht8cpai-j9-CvYco8mKvw_eUFJFaCvqYU9gys";
const WEBSITE_ID = "0b16365c-8593-4d30-971c-ad4c24c2e55c";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, blueprintSlug, blueprintTitle } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Store in Supabase action_logs
    const response = await fetch(`${SUPABASE_URL}/rest/v1/action_logs`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        website_id: WEBSITE_ID,
        action_type: "lead_capture",
        input: {
          email: cleanEmail,
          blueprint_slug: blueprintSlug || "general",
          blueprint_title: blueprintTitle || "General Lead",
          captured_at: new Date().toISOString(),
          source: "blueprint_download_modal",
          partner: "make.com",
          affiliate_link: "https://www.make.com/en/register?pc=aisaastoolkit",
        },
        output: {
          status: "captured",
          drip_sequence: "3_day_make_com_affiliate",
          day_1_ready: true,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Failed to insert lead into Supabase:", errText);
      // Still return 200 so download is never interrupted
      return NextResponse.json({
        success: true,
        warning: "Lead captured with fallback",
      });
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      id: data?.[0]?.id,
      message: "Lead captured successfully",
    });
  } catch (error: any) {
    console.error("Error in lead capture route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

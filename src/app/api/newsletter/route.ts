import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    // TODO: Replace with real ConvertKit API call:
    // const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    // const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
    // await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
    //   method: "POST", headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email }),
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

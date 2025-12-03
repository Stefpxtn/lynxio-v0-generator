import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt in request." },
        { status: 400 }
      );
    }

    // Appel API Vercel v0.dev
    const response = await fetch("https://api.v0.dev/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.V0_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        format: "html",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error("Error from V0: " + text);
    }

    const data = await response.json();
    const html = data.html;

    return NextResponse.json(
      {
        html,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}

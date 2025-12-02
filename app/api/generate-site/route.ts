// app/api/generate-site/route.ts
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

function encodeHtml(html: string): string {
  // HTML -> base64 -> safe dans l’URL
  return encodeURIComponent(Buffer.from(html, "utf8").toString("base64"));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const html = body?.html;

    if (!html || typeof html !== "string") {
      return NextResponse.json(
        { error: "Missing HTML content in request." },
        { status: 400 }
      );
    }

    const id = randomUUID();

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
      "https://lynxio-v0-generator.vercel.app";

    const encodedHtml = encodeHtml(html);

    // ⚠️ IMPORTANT : on met le HTML encodé dans l’URL
    const siteUrl = `${baseUrl}/site/${id}?html=${encodedHtml}`;

    return NextResponse.json(
      {
        id,
        html,
        siteUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/generate-site", error);
    return NextResponse.json(
      { error: "Internal server error in generate-site." },
      { status: 500 }
    );
  }
}

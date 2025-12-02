import { NextRequest, NextResponse } from "next/server";

// Simple générateur d'ID sans uuid
function generateId(): string {
  const timePart = Date.now().toString(36);
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${timePart}-${randomPart}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // On attend { html: "<!DOCTYPE html>..." }
    const html = body?.html;

    if (!html || typeof html !== "string") {
      return NextResponse.json(
        { error: "Missing HTML content in request." },
        { status: 400 }
      );
    }

    // ID unique (sans uuid)
    const id = generateId();

    // Base URL propre
    const rawBaseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const baseUrl = rawBaseUrl.trim().replace(/\/+$/, ""); // retire les / à la fin

    // Encode le HTML dans l’URL
    const encodedHtml = encodeURIComponent(html);

    // URL finale du site (pas de \n, pas d’espace)
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
    console.error("Error in generate-site route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Si quelqu'un fait un GET direct sur /api/generate-site
export async function GET() {
  return NextResponse.json(
    {
      error: "Method not allowed. Use POST with JSON body { html }.",
    },
    { status: 405 }
  );
}

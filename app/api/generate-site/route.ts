// app/api/generate-site/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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

    // On génère un id unique
    const id = uuidv4();

    // On nettoie complètement la BASE_URL
    const rawBaseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const baseUrl = rawBaseUrl
      .trim() // enlève espaces / \n / \r au début et à la fin
      .replace(/\/+$/, ""); // enlève les / à la fin

    // On encode l'HTML dans la query (pour l'instant on reste sur cette solution)
    const encodedHtml = encodeURIComponent(html);

    // URL finale du site
    const siteUrl = `${baseUrl}/site/${id}?html=${encodedHtml}`;

    return NextResponse.json({ id, html, siteUrl }, { status: 200 });
  } catch (error) {
    console.error("Error in generate-site route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // On force le POST pour n8n
  return NextResponse.json(
    { error: "Method not allowed. Use POST with JSON { html }." },
    { status: 405 }
  );
}

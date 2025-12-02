import { NextResponse } from "next/server";

/**
 * Route API pour générer un site.
 * Reçoit : { html }
 * Retourne : { id, html, siteUrl }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { html } = body;

    if (!html) {
      return NextResponse.json(
        { error: "Missing HTML content in request." },
        { status: 400 }
      );
    }

    // ✅ ID unique natif (pas besoin du package "uuid")
    const id = crypto.randomUUID();

    // ✅ URL de base (configurée dans Vercel → Environment Variables)
    let baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "").trim();

    if (!baseUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_BASE_URL is not configured." },
        { status: 500 }
      );
    }

    // Supprime un / final éventuel
    baseUrl = baseUrl.replace(/\/+$/, "");

    // ✅ URL finale propre
    const siteUrl = `${baseUrl}/site/${id}`;

    return NextResponse.json({
      id,
      html,
      siteUrl,
    });
  } catch (error) {
    console.error("Error in /api/generate-site:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
Remove uuid, use crypto.randomUUID

import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

/**
 * Route API pour générer un site via l'appel de n8n.
 * Reçoit un JSON contenant : { html, prompt }
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

    // 🔥 ID unique pour l'URL du site
    const id = uuid();

    // 🔥 Base URL venant de Vercel (à configurer dans Environment Variables)
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "").trim();

    if (!baseUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_BASE_URL is not configured." },
        { status: 500 }
      );
    }

    // 🔥 URL finale propre (sans retour à la ligne)
    const siteUrl = `${baseUrl}/site/${id}`;

    // 👉 On peut sauvegarder le HTML dans un KV, un DB, ou Supabase plus tard.
    // Pour l'instant, on renvoie directement les données à n8n.
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

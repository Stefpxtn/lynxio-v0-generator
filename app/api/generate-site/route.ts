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
    const html = body?.html;

    // Vérification obligatoire
    if (!html || typeof html !== "string") {
      return NextResponse.json(
        { error: "Missing HTML content in request." },
        { status: 400 }
      );
    }

    // ID unique
    const id = generateId();

    // Base URL (configurable via env)
    const rawBaseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://lynxio-v0-generator.vercel.app";

    // Nettoie l’URL (retire les / en trop)
    const baseUrl = rawBaseUrl.trim().replace(/\/+$/, "");

    // Encode correctement tout le HTML
    const encodedHtml = encodeURIComponent(html);

    // URL finale
    const url = `${baseUrl}/site/${id}?html=${encodedHtml}`;

    // Réponse à renvoyer à n8n
    return NextResponse.json(
      {
        id,
        url,
        html,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans generate-site:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

// Pour empêcher un accès GET direct
export async function GET() {
  return NextResponse.json(
    {
      error: "Method not allowed, use POST with JSON body { html: \"...\" }.",
    },
    { status: 405 }
  );
}

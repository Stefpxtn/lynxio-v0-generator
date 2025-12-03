import { NextRequest, NextResponse } from "next/server";
import { V0 } from "@v0/sdk";

// Initialise V0 (aucune clé API requise)
const v0 = new V0();

/**
 * Cette route reçoit des données depuis n8n :
 *  - name
 *  - sector
 *  - activity
 *  - address
 *  - phone
 *  - prompt
 *  
 * Elle appelle V0 pour générer un HTML PERSONNALISÉ.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, sector, activity, address, phone, prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Missing 'prompt' in request." },
        { status: 400 }
      );
    }

    // ⚡ Génération HTML via V0
    const result = await v0.generate.prompt(prompt);

    if (!result || !result.html) {
      return NextResponse.json(
        { error: "V0 did not return HTML." },
        { status: 500 }
      );
    }

    const html = result.html;

    // Option : générer un ID pour l'étape suivante
    const id = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);

    return NextResponse.json(
      {
        success: true,
        id,
        html,       // HTML généré par V0
        rawPrompt: prompt,
        meta: { name, sector, activity, address, phone }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Error in generate-v0-site:", error);

    return NextResponse.json(
      {
        error: "Error from V0: " + (error?.message || "Unknown error"),
      },
      { status: 500 }
    );
  }
}

// Méthode GET interdite
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST with JSON body." },
    { status: 405 }
  );
}

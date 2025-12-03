import { NextRequest, NextResponse } from "next/server";
// + import du v0-sdk etc.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, sector, activity, address, phone, prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid prompt" },
        { status: 400 }
      );
    }

    // ... appel à V0, génération du HTML, etc.

    return NextResponse.json(
      {
        url,
        id,
        html,
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

// (optionnel)
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed, use POST with JSON body" },
    { status: 405 }
  );
}

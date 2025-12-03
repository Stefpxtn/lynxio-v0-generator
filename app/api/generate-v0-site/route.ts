import { NextRequest, NextResponse } from "next/server";
import { v0 } from "v0-sdk";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'prompt'" },
        { status: 400 }
      );
    }

    if (!process.env.V0_API_KEY) {
      console.error("V0_API_KEY is not set");
      return NextResponse.json(
        { error: "Server misconfigured: missing V0_API_KEY" },
        { status: 500 }
      );
    }

    // V0 SDK lit V0_API_KEY directement dans les variables d'env
    const chat = await v0.chats.create({
      message: prompt,
    });

    // D'après la doc : chat.id et chat.demo (URL de preview)
    return NextResponse.json({
      chatId: chat.id,
      demoUrl: chat.demo,
    });
  } catch (error: any) {
    console.error("V0 API Error:", error);
    return NextResponse.json(
      {
        error: "Error from V0",
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

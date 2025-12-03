import { NextRequest } from "next/server";

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /site/[id]?html=...
 * Affiche directement le HTML passé dans le paramètre "html".
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  // Next décode déjà l’URL : ici on récupère le HTML "normal"
  const html = req.nextUrl.searchParams.get("html");

  if (!html) {
    return new Response("Missing 'html' query parameter.", { status: 400 });
  }

  // On renvoie le HTML brut, avec le bon content-type
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

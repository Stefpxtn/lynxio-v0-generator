// app/site/[id]/page.tsx
export const dynamic = "force-dynamic";

type SitePageProps = {
  params: { id: string };
  searchParams: { html?: string };
};

function decodeHtml(encoded: string): string {
  try {
    const base64 = decodeURIComponent(encoded);
    return Buffer.from(base64, "base64").toString("utf8");
  } catch (e) {
    console.error("Error decoding HTML:", e);
    return "<h1>Erreur lors du chargement de la page</h1>";
  }
}

export default function SitePage({ searchParams }: SitePageProps) {
  const encoded = searchParams.html;

  if (!encoded) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Contenu introuvable</h1>
        <p>
          Ce lien ne contient pas le code HTML nécessaire. Regénère le site
          depuis Airtable / n8n.
        </p>
      </div>
    );
  }

  const html = decodeHtml(encoded);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

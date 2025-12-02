// app/site/[id]/page.tsx
import React from 'react';

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME!;
const AIRTABLE_PAT = process.env.AIRTABLE_PAT!;

async function getSiteHtml(recordId: string) {
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME,
    )}/${recordId}`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
      },
      // important : ISR/SSR ok
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    console.error('Airtable error', await res.text());
    throw new Error('Impossible de récupérer le site');
  }

  const data = await res.json();
  const html = data.fields?.['Site HTML'] as string | undefined;

  if (!html) {
    throw new Error('Pas de HTML pour ce site (champ "Site HTML" vide)');
  }

  return html;
}

export default async function SitePage({
  params,
}: {
  params: { id: string };
}) {
  const html = await getSiteHtml(params.id);

  return (
    <div className="site-wrapper">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

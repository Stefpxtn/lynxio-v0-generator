import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lynxio V0 Generator',
  description: 'Generate simple landing pages from Airtable prompts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

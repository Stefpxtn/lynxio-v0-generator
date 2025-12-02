// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Lynxio V0 Generator',
  description: 'Générateur de sites pour tes clients',
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

// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Lynxio V0 Generator',
  description: 'Générateur de site Lynxio via v0',
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

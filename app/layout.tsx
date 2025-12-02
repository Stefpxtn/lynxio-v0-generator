// app/layout.tsx
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Lynxio V0 Generator',
  description: 'Setup Next.js propre pour Lynxio',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

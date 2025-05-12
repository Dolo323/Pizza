import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Providers } from '../shared/components/shared/providers';

// Importing the Nunito font with specified subsets and weights
const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// Metadata for the root application (uses Next.js Metadata API)
export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.className}>
       <Providers>
        {children}
       </Providers>
      </body>
    </html>
  );
}

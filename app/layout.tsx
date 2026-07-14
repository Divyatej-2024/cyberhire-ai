import './globals.css';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CyberHire AI',
  description: 'AI‑powered job search and application tracker for cyber security professionals.',
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white font-sans min-h-screen flex flex-col">
        <SessionProvider session={session}>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

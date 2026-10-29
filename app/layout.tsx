import '../src/styles/globals.css';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

export const metadata: Metadata = {
  title: 'CyberHire AI',
  description: 'AI-powered job search and application tracker for cyber security professionals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white font-sans min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

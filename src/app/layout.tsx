/**
 * Root Layout
 * Main application layout with session context and global navigation.
 */

import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Providers from '@/components/Providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'CyberHire AI - AI-Powered Job Search Platform',
  description: 'AI-powered job search and application tracking platform for cyber security professionals.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <body className="bg-slate-950 text-white">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

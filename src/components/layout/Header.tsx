/**
 * Header Component
 * Main navigation header
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'CyberPath', href: '/cyberpath' },
  { label: 'Job Finder', href: '/job-finder' },
  { label: 'Applications', href: '/applications' },
  { label: 'Resume', href: '/resume-builder' },
  { label: 'Interview Prep', href: '/interview-prep' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-gradient-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-cyber rounded-lg flex items-center justify-center font-bold text-slate-900">
              C
            </div>
            <span className="text-xl font-bold text-gradient group-hover:text-cyber-300">CyberHire AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyber-400 transition-colors rounded-lg hover:bg-slate-800/50"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push('/profile')}>
              Profile
            </Button>
            <Button variant="primary" size="sm" onClick={() => router.push('/settings')}>
              Settings
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-slate-700/50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-slate-300 hover:text-cyber-400 hover:bg-slate-800/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

Header.displayName = 'Header';

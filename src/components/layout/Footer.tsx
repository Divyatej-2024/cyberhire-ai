/**
 * Footer Component
 * Application footer
 */

'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-700/50 bg-gradient-dark/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-cyber rounded-lg flex items-center justify-center font-bold text-slate-900 text-sm">
                C
              </div>
              <span className="font-bold text-gradient">CyberHire AI</span>
            </div>
            <p className="text-slate-400 text-sm">
              AI-powered job search and application tracking platform for cyber security professionals.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-cyber-400 mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/dashboard" className="hover:text-cyber-300 transition">Dashboard</Link></li>
              <li><Link href="/job-finder" className="hover:text-cyber-300 transition">Job Finder</Link></li>
              <li><Link href="/resume-builder" className="hover:text-cyber-300 transition">Resume Builder</Link></li>
              <li><Link href="/interview-prep" className="hover:text-cyber-300 transition">Interview Prep</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-cyber-400 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-cyber-300 transition">About</Link></li>
              <li><Link href="#" className="hover:text-cyber-300 transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-cyber-300 transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-cyber-300 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-cyber-400 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-cyber-300 transition">Privacy</Link></li>
              <li><Link href="#" className="hover:text-cyber-300 transition">Terms</Link></li>
              <li><Link href="#" className="hover:text-cyber-300 transition">Security</Link></li>
              <li><Link href="#" className="hover:text-cyber-300 transition">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <p>&copy; {currentYear} CyberHire AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-cyber-300 transition">Twitter</Link>
              <Link href="#" className="hover:text-cyber-300 transition">GitHub</Link>
              <Link href="#" className="hover:text-cyber-300 transition">LinkedIn</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

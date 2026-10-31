/**
 * Home Page
 * Landing page with hero section and features
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  const features = [
    {
      title: 'Opportunity Radar',
      description: 'Surface sponsor-aware roles with strong match confidence and clear priorities.',
      icon: '🛰️',
    },
    {
      title: 'Resume Lab',
      description: 'Tailor each application to the role family with ATS-friendly language.',
      icon: '🧪',
    },
    {
      title: 'Application Ledger',
      description: 'Track progress from queued to interview, assessment, and offer.',
      icon: '📚',
    },
    {
      title: 'Interview Coach',
      description: 'Practice scenario prompts and structured STAR answers before every call.',
      icon: '🎯',
    },
    {
      title: 'Visa Compass',
      description: 'Highlight companies and roles with better sponsorship likelihood.',
      icon: '🧭',
    },
    {
      title: 'Learning Path',
      description: 'Close skill gaps with targeted milestones and curated next steps.',
      icon: '⚡',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
                CyberPath OS • career operating system
              </p>
              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Build momentum for your next <span className="text-gradient">cybersecurity move</span>
              </h1>
              <p className="mb-8 text-xl leading-relaxed text-slate-300">
                Bring together job discovery, application tracking, visa signals, resume tailoring, and interview prep in one focused workspace.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard">
                  <Button className="px-8 py-3">Open mission control</Button>
                </Link>
                <Link href="/cyberpath">
                  <Button variant="ghost" className="px-8 py-3">Explore modules</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-1 shadow-2xl shadow-cyan-500/10">
              <div className="rounded-[22px] bg-slate-950/80 p-8">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Priority Queue</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-white">SOC Analyst II</p>
                          <p className="text-sm text-slate-400">Northstar Labs • Remote</p>
                        </div>
                        <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs text-cyan-300">91% match</span>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-white">Cloud Security Engineer</p>
                          <p className="text-sm text-slate-400">Aether Systems • London</p>
                        </div>
                        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-300">Low-risk visa</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-cyan-400/20 bg-cyan-400/5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-cyan-300">New workspace</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Explore CyberAI Mission Control</h2>
            <p className="mt-2 text-sm text-slate-400">Try the first defensive phishing-triage workflow.</p>
          </div>
          <Link href="/cyberai" className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">Open CyberAI →</Link>
        </div>
      </section>

      <section className="bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">What sits inside the OS</h2>
            <p className="text-lg text-slate-300">Every module is tuned for the cyber and IT professional who wants clarity and speed.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} hoverable variant="glass">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card variant="dark" className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to run your next chapter?</h2>
            <p className="mb-8 text-lg text-slate-300">
              Launch the workspace and turn your search into a focused operating system for career growth.
            </p>
            <Link href="/dashboard">
              <Button className="px-8 py-3">Start the mission</Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}

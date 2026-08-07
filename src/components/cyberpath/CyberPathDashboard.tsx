'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { OpportunityRecord, ProfileSnapshot } from '@/types/career';

const profile: ProfileSnapshot = {
  id: 'profile-1',
  fullName: 'Maya Chen',
  role: 'security-analyst',
  focusAreas: ['Detection Engineering', 'Cloud Security', 'Threat Hunting'],
  certifications: ['CompTIA Security+', 'AWS Security Specialty'],
  experienceYears: 4,
  location: 'London, UK',
  visaNeeds: true,
};

const opportunities: OpportunityRecord[] = [
  {
    id: 'opp-001',
    title: 'SOC Analyst II',
    company: 'Northstar Labs',
    roleFamily: 'SOC',
    location: 'Remote • UK',
    remote: true,
    salaryBand: '£55k - £75k',
    postedAt: '2 days ago',
    matchScore: 91,
    sponsorshipSignal: 'likely',
    status: 'queued',
  },
  {
    id: 'opp-002',
    title: 'Cloud Security Engineer',
    company: 'Aether Systems',
    roleFamily: 'Cloud Security',
    location: 'London',
    remote: false,
    salaryBand: '£70k - £95k',
    postedAt: '5 days ago',
    matchScore: 88,
    sponsorshipSignal: 'low-risk',
    status: 'applied',
  },
];

const modules = [
  { title: 'Opportunity Radar', description: 'Target roles with strong match confidence and sponsorship signals.', accent: 'from-cyan-500/20 to-sky-500/10' },
  { title: 'Application Ledger', description: 'Track your funnel from queued to interview and offer.', accent: 'from-fuchsia-500/20 to-purple-500/10' },
  { title: 'Visa Compass', description: 'Flag sponsor-friendly employers before you invest time.', accent: 'from-emerald-500/20 to-teal-500/10' },
  { title: 'Resume Lab', description: 'Tailor your narrative to each role family with higher ATS impact.', accent: 'from-amber-500/20 to-orange-500/10' },
  { title: 'Interview Coach', description: 'Practice structured answers with viva-ready prompts.', accent: 'from-blue-500/20 to-indigo-500/10' },
  { title: 'Learning Path', description: 'Close skill gaps with focused milestones and next steps.', accent: 'from-rose-500/20 to-pink-500/10' },
];

export function CyberPathDashboard() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-cyan-500/10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
              CyberPath OS • Mission Control
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Your next role is already in motion.
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Track opportunities, fine-tune your story, and stay ready for sponsor-friendly roles without losing momentum.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard">
              <Button variant="secondary">Open workspace</Button>
            </Link>
            <Button variant="primary">Run audit</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Operator profile</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{profile.fullName}</h2>
            </div>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
              {profile.experienceYears} years
            </span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Primary focus</p>
              <p className="mt-2 text-white">{profile.focusAreas.join(' • ')}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Certifications</p>
              <p className="mt-2 text-white">{profile.certifications.join(' • ')}</p>
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Priority queue</p>
          <div className="mt-4 space-y-3">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{opportunity.title}</h3>
                    <p className="text-sm text-slate-400">{opportunity.company}</p>
                  </div>
                  <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs text-cyan-300">
                    {opportunity.matchScore}% match
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                  <span>{opportunity.location}</span>
                  <span>•</span>
                  <span>{opportunity.salaryBand}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.title} variant="glass" hoverable className={`bg-gradient-to-br ${module.accent}`}>
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <h3 className="text-lg font-semibold text-white">{module.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{module.description}</p>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}

import { NextResponse } from 'next/server';

export async function GET() {
  const demoData = [
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

  return NextResponse.json(demoData);
}

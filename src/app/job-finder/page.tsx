/**
 * Job Finder Page
 * Search and filter jobs from multiple sources
 */

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const JobFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [workMode, setWorkMode] = useState<string>('all');

  const jobs = [
    {
      id: 1,
      title: 'SOC Analyst',
      company: 'SecureBank',
      location: 'London, UK',
      salary: '£45,000 - £55,000',
      type: 'Full-time',
      workMode: 'Hybrid',
      description: 'Join our Security Operations Center team...',
      match: 92,
      source: 'LinkedIn',
    },
    {
      id: 2,
      title: 'Cloud Security Engineer',
      company: 'TechCorp',
      location: 'Remote',
      salary: '£60,000 - £75,000',
      type: 'Full-time',
      workMode: 'Remote',
      description: 'Secure our cloud infrastructure...',
      match: 88,
      source: 'Indeed',
    },
    {
      id: 3,
      title: 'Penetration Tester',
      company: 'CyberDefense',
      location: 'Manchester, UK',
      salary: '£50,000 - £65,000',
      type: 'Contract',
      workMode: 'On-site',
      description: 'Test our security systems...',
      match: 85,
      source: 'Reed',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Find Your Next Role 🔍</h1>

      {/* Filters */}
      <Card variant="glass" className="mb-8">
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Input
            label="Search Jobs"
            placeholder="SOC Analyst, Security Engineer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <label className="block text-sm font-semibold mb-2 text-cyan-400">Work Mode</label>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Modes</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-cyan-400">Job Level</label>
            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500">
              <option>All Levels</option>
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button className="w-full">Search Jobs</Button>
          </div>
        </div>
      </Card>

      {/* Job Listings */}
      <div className="space-y-6">
        {jobs.map((job) => (
          <Card key={job.id} hoverable variant="glass">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{job.title}</h2>
                  <Badge variant="cyber">{job.match}% Match</Badge>
                </div>
                <p className="text-slate-400 mb-3">{job.company}</p>
                <p className="text-slate-300">{job.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div>
                <p className="text-slate-400 text-sm">Location</p>
                <p className="font-semibold">{job.location}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Salary</p>
                <p className="font-semibold">{job.salary}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Type</p>
                <p className="font-semibold">{job.type}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Mode</p>
                <p className="font-semibold">{job.workMode}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Source</p>
                <p className="font-semibold text-cyber-400">{job.source}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">Apply Now</Button>
              <Button variant="ghost">Save Job</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobFinder;

/**
 * Applications Page
 * View and track all applications
 */

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const ApplicationsPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statuses = ['Applied', 'Interview', 'Assessment', 'Offer', 'Rejected', 'Withdrawn'];

  const applications = [
    {
      id: 1,
      company: 'SecureBank',
      role: 'SOC Analyst',
      status: 'Interview',
      applied: '2024-01-10',
      lastUpdate: '2024-01-15',
    },
    {
      id: 2,
      company: 'TechCorp',
      role: 'Cloud Security',
      status: 'Applied',
      applied: '2024-01-14',
      lastUpdate: '2024-01-14',
    },
    {
      id: 3,
      company: 'CyberDefense',
      role: 'Penetration Tester',
      status: 'Assessment',
      applied: '2024-01-12',
      lastUpdate: '2024-01-16',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'info';
      case 'Interview':
        return 'cyber';
      case 'Assessment':
        return 'warning';
      case 'Offer':
        return 'success';
      case 'Rejected':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Application Tracker 📋</h1>

      {/* Status Filter */}
      <Card variant="glass" className="mb-8 p-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedStatus === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedStatus('all')}
          >
            All Applications
          </Button>
          {statuses.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} hoverable variant="glass">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{app.role}</h2>
                  <Badge variant={getStatusColor(app.status) as any}>{app.status}</Badge>
                </div>
                <p className="text-slate-400">{app.company}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-slate-400 text-sm">Applied</p>
                <p className="font-semibold">{app.applied}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Last Update</p>
                <p className="font-semibold">{app.lastUpdate}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Days</p>
                <p className="font-semibold">5 days ago</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Follow-up</p>
                <p className="font-semibold text-yellow-400">Pending</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" size="sm">View Details</Button>
              <Button variant="ghost" size="sm">Add Note</Button>
              <Button variant="ghost" size="sm">Update Status</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;

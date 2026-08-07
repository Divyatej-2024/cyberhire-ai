/**
 * Networking Page
 * Connect with recruiters and professionals
 */

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const NetworkingPage: React.FC = () => {
  const connections = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Hiring Manager at SecureBank',
      mutual: 12,
      status: 'Connected',
    },
    {
      id: 2,
      name: 'James Smith',
      title: 'SOC Analyst at TechCorp',
      mutual: 8,
      status: 'Following',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Networking 🤝</h1>

      <div className="space-y-6">
        {connections.map((conn) => (
          <Card key={conn.id} hoverable variant="glass">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{conn.name}</h3>
                <p className="text-slate-400">{conn.title}</p>
              </div>
              <Badge variant="cyber">{conn.status}</Badge>
            </div>

            <p className="text-slate-400 mb-4">{conn.mutual} mutual connections</p>

            <div className="flex gap-3">
              <Button variant="ghost" size="sm">💬 Message</Button>
              <Button variant="ghost" size="sm">👁 View Profile</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NetworkingPage;

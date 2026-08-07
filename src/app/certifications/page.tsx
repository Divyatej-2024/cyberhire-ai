/**
 * Certifications Page
 * Track and manage certifications
 */

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const CertificationsPage: React.FC = () => {
  const certifications = [
    {
      name: 'CompTIA Security+',
      issuer: 'CompTIA',
      issued: '2023-01-15',
      expires: '2026-01-15',
      status: 'Active',
    },
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issued: '2022-06-10',
      expires: '2025-06-10',
      status: 'Expires Soon',
    },
    {
      name: 'Microsoft Certified: Azure Administrator',
      issuer: 'Microsoft',
      issued: '2023-03-20',
      expires: '2026-03-20',
      status: 'Active',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Certifications 🏆</h1>

      <div className="space-y-6">
        {certifications.map((cert, idx) => (
          <Card key={idx} hoverable variant="glass">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{cert.name}</h3>
                <p className="text-slate-400">{cert.issuer}</p>
              </div>
              <Badge variant={cert.status === 'Active' ? 'success' : 'warning'}>
                {cert.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-slate-400 text-sm">Issued</p>
                <p className="font-semibold">{cert.issued}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Expires</p>
                <p className="font-semibold">{cert.expires}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Days Remaining</p>
                <p className="font-semibold text-cyber-400">420 days</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" size="sm">View Credential</Button>
              <Button variant="ghost" size="sm">Add to Resume</Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Card variant="glass">
          <h3 className="text-lg font-bold mb-4">Popular Certifications to Learn</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="ghost">+ CompTIA Certified Ethical Hacker</Button>
            <Button variant="ghost">+ Cisco CCNA</Button>
            <Button variant="ghost">+ ISC2 CISSP</Button>
            <Button variant="ghost">+ Fortinet NSE Certification</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CertificationsPage;

/**
 * Cover Letter Generator Page
 * Generate and customize cover letters
 */

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const CoverLetterPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [hiringManager, setHiringManager] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Cover Letter Generator ✍️</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form */}
        <div className="md:col-span-1">
          <Card variant="glass">
            <h3 className="text-lg font-bold mb-4">Job Details</h3>
            <div className="space-y-4">
              <Input
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Input
                label="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <Input
                label="Hiring Manager (optional)"
                value={hiringManager}
                onChange={(e) => setHiringManager(e.target.value)}
              />
              <Button className="w-full">✨ Generate with AI</Button>
            </div>
          </Card>
        </div>

        {/* Preview */}
        <div className="md:col-span-2">
          <Card variant="glass">
            <h3 className="text-lg font-bold mb-4">Generated Cover Letter</h3>
            <div className="bg-white text-slate-900 p-6 rounded-lg min-h-96 font-serif">
              <p className="mb-4">{hiringManager ? `Dear ${hiringManager},` : 'Dear Hiring Manager,'}</p>
              <p className="mb-4">
                I am writing to express my strong interest in the {jobTitle} position at {companyName || '[Company Name]'}. With my background in cybersecurity and proven track record of implementing robust security solutions, I am confident in my ability to contribute significantly to your team.
              </p>
              <p className="mb-4">
                Throughout my career, I have developed a deep expertise in security operations, threat detection, and incident response. My experience aligns well with the requirements outlined in your job posting, and I am excited about the opportunity to bring my skills to your organization.
              </p>
              <p>
                I look forward to discussing how I can contribute to {companyName || 'your'} success.
              </p>
              <p className="mt-6">Sincerely,<br/>Your Name</p>
            </div>

            <div className="flex gap-3 mt-6">
              <Button>📥 Download PDF</Button>
              <Button variant="ghost">✏️ Edit</Button>
              <Button variant="ghost">🔄 Regenerate</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPage;

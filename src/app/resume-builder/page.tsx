/**
 * Resume Builder Page
 * Create and edit resumes
 */

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Resume Builder 📄</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left - Editor */}
        <div className="md:col-span-2">
          <Card variant="glass">
            <div className="flex gap-2 mb-6 border-b border-slate-700 pb-4">
              <Button
                variant={activeTab === 'edit' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('edit')}
              >
                Edit
              </Button>
              <Button
                variant={activeTab === 'preview' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </Button>
            </div>

            {activeTab === 'edit' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input label="Phone" placeholder="+44 7XXX XXXXXX" />
                    <Input label="Location" placeholder="London, UK" />
                    <Input label="LinkedIn" placeholder="linkedin.com/in/yourprofile" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Professional Summary</h3>
                  <textarea
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    rows={4}
                    placeholder="Brief overview of your professional background..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button>Save Resume</Button>
                  <Button variant="ghost">Preview</Button>
                  <Button variant="ghost">Download PDF</Button>
                </div>
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="bg-white text-slate-900 p-8 rounded-lg">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold">{fullName}</h1>
                  <p className="text-slate-600">{email}</p>
                </div>
                <p>Preview of your resume will appear here</p>
              </div>
            )}
          </Card>
        </div>

        {/* Right - Templates and Actions */}
        <div className="space-y-6">
          <Card variant="glass">
            <h3 className="text-lg font-bold mb-4">AI Features</h3>
            <div className="space-y-2">
              <Button className="w-full">✨ AI Optimize</Button>
              <Button variant="ghost" className="w-full">🔄 Generate ATS Version</Button>
              <Button variant="ghost" className="w-full">🎯 Tailor for Job</Button>
            </div>
          </Card>

          <Card variant="glass">
            <h3 className="text-lg font-bold mb-4">Your Resumes</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">Default Resume</p>
                  <Badge variant="cyber" size="sm">Primary</Badge>
                </div>
                <p className="text-sm text-slate-400">Last updated 2 days ago</p>
              </div>
              <Button variant="ghost" className="w-full">+ Create New</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

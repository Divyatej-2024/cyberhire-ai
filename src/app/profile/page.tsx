/**
 * Profile Page
 * User profile and personal information
 */

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Profile 👤</h1>

      <Card variant="glass">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="First Name" placeholder="John" />
              <Input label="Last Name" placeholder="Doe" />
              <Input label="Email" type="email" placeholder="john@example.com" />
              <Input label="Phone" placeholder="+44 7XXX XXXXXX" />
              <Input label="Location" placeholder="London, UK" />
              <Input label="Industry" placeholder="Cyber Security" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Bio</h2>
            <textarea
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Social Links</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="LinkedIn" placeholder="linkedin.com/in/yourprofile" />
              <Input label="GitHub" placeholder="github.com/yourprofile" />
              <Input label="Portfolio" placeholder="yourwebsite.com" />
              <Input label="Twitter" placeholder="@yourhandle" />
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-700">
            <Button>Save Changes</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;

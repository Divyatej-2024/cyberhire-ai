/**
 * Settings Page
 * Application settings and preferences
 */

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Settings ⚙️</h1>

      {/* Display Settings */}
      <Card variant="glass" className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Display</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-cyan-400">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-cyan-400">Language</label>
            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card variant="glass" className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>
        <div className="space-y-4">
          {[
            { label: 'Email Notifications', state: emailNotifications, setState: setEmailNotifications },
            { label: 'Push Notifications', state: pushNotifications, setState: setPushNotifications },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <label className="font-medium">{item.label}</label>
              <input
                type="checkbox"
                checked={item.state}
                onChange={(e) => item.setState(e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card variant="glass" className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Privacy</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-cyan-400">Profile Visibility</label>
            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
              <option>Private</option>
              <option>Public</option>
              <option>Friends Only</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-medium">Allow Messages</label>
            <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </Card>

      {/* Data & Storage */}
      <Card variant="glass" className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Data & Storage</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto Backup</p>
              <p className="text-sm text-slate-400">Automatically backup your data</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
          </div>
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <Button variant="ghost" size="sm">📥 Export Data</Button>
            <Button variant="ghost" size="sm">🔄 Backup Now</Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card variant="glass" className="border-red-500/30 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-red-400">Danger Zone</h2>
        <div className="space-y-3">
          <Button variant="danger" className="w-full">
            🔐 Change Password
          </Button>
          <Button variant="danger" className="w-full">
            ⚠️ Delete Account
          </Button>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button>Save Settings</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  );
};

export default SettingsPage;

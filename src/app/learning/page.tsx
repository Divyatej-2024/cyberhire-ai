/**
 * Learning Dashboard Page
 * Career roadmaps and learning resources
 */

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const LearningPage: React.FC = () => {
  const roadmaps = [
    {
      title: 'SOC Analyst Roadmap',
      level: 'beginner',
      duration: '6 months',
      progress: 45,
    },
    {
      title: 'Penetration Tester',
      level: 'advanced',
      duration: '12 months',
      progress: 20,
    },
    {
      title: 'Cloud Security',
      level: 'intermediate',
      duration: '4 months',
      progress: 60,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Learning Dashboard 🎓</h1>

      <div className="space-y-6">
        {roadmaps.map((roadmap, idx) => (
          <Card key={idx} hoverable variant="glass">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{roadmap.title}</h3>
                <div className="flex items-center gap-3">
                  <Badge variant="cyber" size="sm">
                    {roadmap.level}
                  </Badge>
                  <span className="text-slate-400">⏱ {roadmap.duration}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Progress</span>
                <span className="text-sm font-semibold text-cyber-400">{roadmap.progress}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-cyber transition-all"
                  style={{ width: `${roadmap.progress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button>Continue Learning</Button>
              <Button variant="ghost">View Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;

/**
 * Skill Gap Analysis Page
 * Identify missing skills and learning resources
 */

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const SkillGapPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState('1');

  const skills = [
    { name: 'Python', level: 'Advanced', required: 'Intermediate', gap: 0 },
    { name: 'AWS', level: 'Intermediate', required: 'Advanced', gap: 1 },
    { name: 'Docker', level: 'Beginner', required: 'Intermediate', gap: 2 },
    { name: 'Kubernetes', level: 'None', required: 'Intermediate', gap: 3 },
    { name: 'Terraform', level: 'Intermediate', required: 'Advanced', gap: 1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Skill Gap Analysis 📊</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Summary */}
        <Card variant="glass">
          <h3 className="text-lg font-bold mb-4">Analysis Summary</h3>
          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-sm mb-2">Match Score</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-cyber-400">72%</div>
                <Badge variant="success" size="sm">Good Match</Badge>
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Skills to Learn</p>
              <p className="text-2xl font-bold">4</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Estimated Time</p>
              <p className="text-2xl font-bold">3 months</p>
            </div>
            <Button className="w-full">View Learning Plan</Button>
          </div>
        </Card>

        {/* Skills */}
        <div className="md:col-span-2">
          <Card variant="glass">
            <h3 className="text-lg font-bold mb-6">Skills Comparison</h3>
            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="pb-4 border-b border-slate-700/50 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">{skill.name}</p>
                    <Badge
                      variant={skill.gap === 0 ? 'success' : skill.gap <= 1 ? 'warning' : 'danger'}
                      size="sm"
                    >
                      {skill.gap === 0 ? 'Match' : `Gap: ${skill.gap}`}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Your level: {skill.level}</span>
                    <span>Required: {skill.required}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-cyber"
                      style={{ width: `${(skill.gap === 0 ? 100 : (3 - skill.gap) * 25)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillGapPage;

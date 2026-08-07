/**
 * Interview Preparation Page
 * Practice with AI-generated interview questions
 */

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const InterviewPrep: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('technical');
  const [isRecording, setIsRecording] = useState(false);

  const categories = [
    { id: 'technical', label: 'Technical Questions', count: 45 },
    { id: 'behavioral', label: 'Behavioral Questions', count: 32 },
    { id: 'hr', label: 'HR Questions', count: 28 },
    { id: 'scenario', label: 'Scenario-based', count: 18 },
  ];

  const questions = [
    {
      id: 1,
      question: 'Explain the difference between symmetric and asymmetric encryption',
      difficulty: 'medium',
      role: 'SOC Analyst',
    },
    {
      id: 2,
      question: 'How would you handle a security incident in your organization?',
      difficulty: 'medium',
      role: 'SOC Analyst',
    },
    {
      id: 3,
      question: 'What is your approach to staying updated with security trends?',
      difficulty: 'easy',
      role: 'SOC Analyst',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Interview Preparation 🎯</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar - Categories */}
        <div className="md:col-span-1">
          <Card variant="glass" className="sticky top-20">
            <h3 className="font-bold mb-4">Question Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-cyber text-white'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{cat.label}</span>
                    <Badge size="sm" variant="cyber">{cat.count}</Badge>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <Button className="w-full mb-2">🎬 Start Mock Interview</Button>
              <Button variant="ghost" className="w-full">📊 View Score</Button>
            </div>
          </Card>
        </div>

        {/* Main Content - Questions */}
        <div className="md:col-span-3 space-y-6">
          {questions.map((q) => (
            <Card key={q.id} hoverable variant="glass">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold flex-1">{q.question}</h3>
                  <Badge
                    variant={
                      q.difficulty === 'easy'
                        ? 'success'
                        : q.difficulty === 'medium'
                        ? 'warning'
                        : 'danger'
                    }
                    size="sm"
                  >
                    {q.difficulty}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm">Role: {q.role}</p>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-4 mb-4 border border-slate-700/50">
                <p className="text-slate-400 mb-3">Your answer:</p>
                <textarea
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  rows={3}
                  placeholder="Type or record your answer..."
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button
                  variant={isRecording ? 'danger' : 'primary'}
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? '⏹ Stop Recording' : '🎤 Record Answer'}
                </Button>
                <Button variant="ghost" size="sm">💡 Show STAR Answer</Button>
                <Button variant="ghost" size="sm">📝 Save Answer</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;

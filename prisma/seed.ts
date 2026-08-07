/**
 * Prisma Database Seeding Script
 * Populates initial data for development
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample user
  const user = await prisma.user.create({
    data: {
      email: 'demo@cyberhire.ai',
      name: 'Demo User',
      role: 'professional',
      industry: 'Cyber Security',
      location: 'London, UK',
      bio: 'Cybersecurity professional with 5 years of experience',
    },
  });

  console.log(`✅ Created user: ${user.email}`);

  // Create sample jobs
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'SOC Analyst',
        company: 'SecureBank',
        location: 'London, UK',
        workMode: 'hybrid',
        jobType: 'full-time',
        description: 'Join our Security Operations Center and monitor cyber threats in real-time.',
        requirements: ['Python', 'Linux', 'Networking', '2+ years experience'],
        skills: ['Python', 'Linux', 'Networking', 'SIEM'],
        industry: 'Finance',
        level: 'entry-level',
        salaryMin: 45000,
        salaryMax: 55000,
        source: 'LinkedIn',
        sourceUrl: 'https://linkedin.com/jobs/view/12345',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Cloud Security Engineer',
        company: 'TechCorp',
        location: 'Remote',
        workMode: 'remote',
        jobType: 'full-time',
        description: 'Secure our AWS cloud infrastructure and implement security best practices.',
        requirements: ['AWS', 'Python', 'Docker', 'Kubernetes', '3+ years experience'],
        skills: ['AWS', 'Python', 'Docker', 'Kubernetes'],
        industry: 'Technology',
        level: 'mid-level',
        salaryMin: 60000,
        salaryMax: 75000,
        source: 'Indeed',
        sourceUrl: 'https://indeed.com/jobs/12345',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Penetration Tester',
        company: 'CyberDefense',
        location: 'Manchester, UK',
        workMode: 'onsite',
        jobType: 'contract',
        description: 'Conduct security assessments and penetration tests for enterprise clients.',
        requirements: ['Kali Linux', 'Burp Suite', 'Metasploit', '5+ years experience'],
        skills: ['Kali Linux', 'Burp Suite', 'Metasploit', 'Web Security'],
        industry: 'Security',
        level: 'senior',
        salaryMin: 50000,
        salaryMax: 65000,
        source: 'Reed',
        sourceUrl: 'https://reed.co.uk/jobs/12345',
      },
    }),
  ]);

  console.log(`✅ Created ${jobs.length} sample jobs`);

  // Create sample applications
  const applications = await Promise.all([
    prisma.application.create({
      data: {
        userId: user.id,
        jobId: jobs[0].id,
        status: 'interview',
        notes: 'Had initial screening, waiting for technical interview',
        isWishlisted: false,
        appliedAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
    }),
    prisma.application.create({
      data: {
        userId: user.id,
        jobId: jobs[1].id,
        status: 'applied',
        notes: 'Application submitted via CyberHire',
        isWishlisted: true,
        appliedAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-14'),
      },
    }),
  ]);

  console.log(`✅ Created ${applications.length} sample applications`);

  // Create user settings
  await prisma.userSettings.create({
    data: {
      userId: user.id,
      theme: 'dark',
      language: 'en',
      emailOnNewJobs: true,
      emailOnInterviewReminder: true,
      emailOnOffers: true,
      autoBackup: true,
    },
  });

  console.log('✅ Created user settings');

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

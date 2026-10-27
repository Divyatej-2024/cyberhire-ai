import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const PROFILE_TITLE = 'CyberHire AI master career profile';

function resumeTitle(jobTitle: string, company: string): string {
  const target = [jobTitle.trim(), company.trim()].filter(Boolean).join(' at ');
  return target ? `${PROFILE_TITLE} — ${target}`.slice(0, 240) : PROFILE_TITLE;
}
const MAX_BODY_LENGTH = 100_000;

function profileSkills(profile: Record<string, unknown>): string[] {
  const raw = typeof profile.skills === 'string' ? profile.skills : '';
  return [...new Set(raw.split(/[\n,;•]+/).map((skill) => skill.trim()).filter(Boolean))].slice(0, 100);
}

async function getUserFromSession() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.trim().toLowerCase();
  if (!email) return null;
  return prisma.user.upsert({
    where: { email },
    update: { name: session.user?.name ?? undefined },
    create: { email, name: session.user?.name ?? null },
  });
}

export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user) return NextResponse.json({ error: 'Sign in to access your saved resume profile.' }, { status: 401 });
    const resume = await prisma.resume.findFirst({ where: { userId: user.id, title: { startsWith: PROFILE_TITLE } }, orderBy: { updatedAt: 'desc' } });
    if (!resume) return NextResponse.json({ profile: null, jobTitle: '', company: '', jobDescription: '' });
    let saved: Record<string, unknown>;
    try { saved = JSON.parse(resume.content) as Record<string, unknown>; } catch { saved = {}; }
    return NextResponse.json({
      profile: saved.profile ?? null,
      jobTitle: typeof saved.jobTitle === 'string' ? saved.jobTitle : '',
      company: typeof saved.company === 'string' ? saved.company : '',
      jobDescription: typeof saved.jobDescription === 'string' ? saved.jobDescription : '',
      updatedAt: resume.updatedAt,
    });
  } catch (error) {
    console.error('Resume profile load failed:', error);
    return NextResponse.json({ error: 'Could not load your saved resume profile.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromSession();
    if (!user) return NextResponse.json({ error: 'Sign in to save your resume profile.' }, { status: 401 });
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_LENGTH) return NextResponse.json({ error: 'Resume profile is too large.' }, { status: 413 });
    let body: Record<string, unknown>;
    try { body = JSON.parse(rawBody) as Record<string, unknown>; } catch { return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 }); }
    if (!body.profile || typeof body.profile !== 'object' || Array.isArray(body.profile)) {
      return NextResponse.json({ error: 'A valid resume profile is required.' }, { status: 400 });
    }
    const profile = body.profile as Record<string, unknown>;
    const allowedFields = ['fullName', 'email', 'phone', 'location', 'linkedin', 'portfolio', 'summary', 'skills', 'experience', 'education', 'projects', 'certifications'];
    const cleanProfile: Record<string, string> = {};
    for (const field of allowedFields) {
      const value = profile[field];
      if (value !== undefined && typeof value !== 'string') return NextResponse.json({ error: `Profile field ${field} must be text.` }, { status: 400 });
      cleanProfile[field] = typeof value === 'string' ? value.slice(0, 15_000) : '';
    }
    const cleanText = (value: unknown) => typeof value === 'string' ? value.slice(0, 30_000) : '';
    const content = JSON.stringify({ profile: cleanProfile, jobTitle: cleanText(body.jobTitle), company: cleanText(body.company), jobDescription: cleanText(body.jobDescription) });
    const title = resumeTitle(cleanText(body.jobTitle), cleanText(body.company));
    const existing = await prisma.resume.findFirst({ where: { userId: user.id, title }, orderBy: { updatedAt: 'desc' } });
    const resume = existing
      ? await prisma.resume.update({ where: { id: existing.id }, data: { content, skills: profileSkills(cleanProfile) } })
      : await prisma.resume.create({ data: { userId: user.id, title, content, skills: profileSkills(cleanProfile), isPrimary: true, atsOptimized: false } });
    return NextResponse.json({ success: true, updatedAt: resume.updatedAt });
  } catch (error) {
    console.error('Resume profile save failed:', error);
    return NextResponse.json({ error: 'Could not save your resume profile. Check that the database is configured.' }, { status: 500 });
  }
}

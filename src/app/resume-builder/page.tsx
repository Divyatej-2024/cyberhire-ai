'use client';

import React, { useEffect, useMemo, useState } from 'react';

type Profile = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
  projects: string;
  certifications: string;
};

const emptyProfile: Profile = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  portfolio: '',
  summary: '',
  skills: '',
  experience: '',
  education: '',
  projects: '',
  certifications: '',
};

const STORAGE_KEY = 'cyberhire-ai-cv-profile-v1';
const STOP_WORDS = new Set([
  'about', 'after', 'also', 'and', 'are', 'for', 'from', 'have', 'into',
  'job', 'our', 'the', 'their', 'this', 'with', 'will', 'you', 'your',
  'must', 'able', 'work', 'working', 'role', 'including', 'such', 'using',
  'experience', 'skills', 'knowledge', 'ability', 'strong', 'good',
]);

function splitLines(value: string): string[] {
  return value.split(/\n|•|;/).map((line) => line.trim().replace(/^[-*]\s*/, '')).filter(Boolean);
}

function extractKeywords(value: string): string[] {
  const words = value.toLowerCase().match(/[a-z][a-z0-9+#.-]{2,}/g) ?? [];
  return [...new Set(words.filter((word) => !STOP_WORDS.has(word)))];
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 break-inside-avoid">
      <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-widest text-slate-800">{title}</h2>
      {children}
    </section>
  );
}

export default function ResumeBuilder() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [saved, setSaved] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Profile>;
        setProfile({ ...emptyProfile, ...parsed });
      }
    } catch {
      // Ignore invalid or unavailable browser storage and let the user continue.
    } finally {
      setHasLoaded(true);
    }
  }, []);

  const update = (field: keyof Profile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const requiredKeywords = useMemo(() => extractKeywords(jobDescription), [jobDescription]);
  const profileText = useMemo(
    () => Object.values(profile).join(' ').toLowerCase(),
    [profile],
  );
  const matchedKeywords = useMemo(
    () => requiredKeywords.filter((keyword) => profileText.includes(keyword)),
    [requiredKeywords, profileText],
  );
  const missingKeywords = useMemo(
    () => requiredKeywords.filter((keyword) => !profileText.includes(keyword)).slice(0, 18),
    [requiredKeywords, profileText],
  );
  const matchScore = requiredKeywords.length
    ? Math.round((matchedKeywords.length / requiredKeywords.length) * 100)
    : 0;

  const saveProfile = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setSaved(true);
    } catch {
      window.alert('Your browser could not save this profile. You can still preview and print the CV.');
    }
  };

  const printCv = () => {
    setActiveTab('preview');
    window.setTimeout(() => window.print(), 100);
  };

  const cvReady = Boolean(profile.fullName.trim() && (profile.summary.trim() || profile.experience.trim() || profile.projects.trim()));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">CyberHire AI · Resume Lab</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Job-tailored CV builder</h1>
          <p className="mt-2 max-w-3xl text-slate-300">Keep one verified career profile, paste each job advert, and prepare a focused CV without inventing experience or qualifications.</p>
        </div>
        <div className="flex flex-wrap gap-2 no-print">
          <button type="button" onClick={saveProfile} className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold hover:border-cyan-400">{saved ? '✓ Profile saved' : 'Save profile'}</button>
          <button type="button" onClick={printCv} disabled={!cvReady} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">Print / Save PDF</button>
        </div>
      </div>

      <div className="mb-5 flex gap-2 no-print">
        <button type="button" onClick={() => setActiveTab('edit')} className={`rounded-lg px-4 py-2 text-sm font-semibold ${activeTab === 'edit' ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-200'}`}>Edit profile & job</button>
        <button type="button" onClick={() => setActiveTab('preview')} className={`rounded-lg px-4 py-2 text-sm font-semibold ${activeTab === 'preview' ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-200'}`}>CV preview</button>
      </div>

      {activeTab === 'edit' ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)] no-print">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
              <h2 className="mb-1 text-xl font-bold">1. Your master career profile</h2>
              <p className="mb-5 text-sm text-slate-400">Use real details only. This profile is saved in this browser when you press Save profile; it is not uploaded to a server by this page.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {([
                  ['fullName', 'Full name', 'e.g. Your full name'],
                  ['email', 'Email', 'name@example.com'],
                  ['phone', 'Phone', '+44…'],
                  ['location', 'Location', 'Town or city, UK'],
                  ['linkedin', 'LinkedIn URL', 'https://linkedin.com/in/…'],
                  ['portfolio', 'Portfolio / GitHub', 'https://…'],
                ] as [keyof Profile, string, string][]).map(([field, label, placeholder]) => (
                  <label key={field} className="block text-sm font-medium text-slate-200">
                    {label}
                    <input value={profile[field]} onChange={(event) => update(field, event.target.value)} placeholder={placeholder} className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none" />
                  </label>
                ))}
              </div>
              <div className="mt-4 space-y-4">
                <label className="block text-sm font-medium text-slate-200">Professional summary
                  <textarea value={profile.summary} onChange={(event) => update('summary', event.target.value)} rows={4} placeholder="Summarise your real background, strengths and career direction." className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none" />
                </label>
                <label className="block text-sm font-medium text-slate-200">Skills (one per line or separated by commas)
                  <textarea value={profile.skills} onChange={(event) => update('skills', event.target.value)} rows={3} placeholder="Examples: Microsoft Excel, Python, incident analysis — include only skills you can discuss honestly." className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none" />
                </label>
                <label className="block text-sm font-medium text-slate-200">Employment history
                  <textarea value={profile.experience} onChange={(event) => update('experience', event.target.value)} rows={6} placeholder="Job title | employer | dates, then a new line for each responsibility or achievement. Use accurate dates and duties." className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none" />
                </label>
                <label className="block text-sm font-medium text-slate-200">Education
                  <textarea value={profile.education} onChange={(event) => update('education', event.target.value)} rows={3} placeholder="Qualification, institution, dates and grade." className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none" />
                </label>
                <label className="block text-sm font-medium text-slate-200">Projects
                  <textarea value={profile.projects} onChange={(event) => update('projects', event.target.value)} rows={4} placeholder="Project name, tools used, what you built, and verifiable outcomes." className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none" />
                </label>
                <label className="block text-sm font-medium text-slate-200">Certifications and training
                  <textarea value={profile.certifications} onChange={(event) => update('certifications', event.target.value)} rows={3} placeholder="Only completed or clearly labelled in-progress qualifications." className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none" />
                </label>
              </div>
              <button type="button" onClick={saveProfile} className="mt-5 rounded-lg border border-cyan-500 px-4 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-950">{saved ? '✓ Saved in this browser' : 'Save master profile'}</button>
              {hasLoaded && <p className="mt-2 text-xs text-slate-500">Browser profile storage: ready.</p>}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
              <h2 className="mb-1 text-xl font-bold">2. Paste the job advert</h2>
              <p className="mb-4 text-sm text-slate-400">Paste the responsibilities and person specification. The keyword check is a local heuristic, not an ATS score or a guarantee of selection.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-200">Job title
                  <input value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} placeholder="e.g. IT Support Analyst" className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none" />
                </label>
                <label className="block text-sm font-medium text-slate-200">Employer
                  <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company or organisation" className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none" />
                </label>
              </div>
              <label className="mt-4 block text-sm font-medium text-slate-200">Job description
                <textarea value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} rows={10} placeholder="Paste the full advert here…" className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none" />
              </label>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h2 className="text-lg font-bold">3. Job match signals</h2>
              {requiredKeywords.length ? (
                <>
                  <div className="mt-4 flex items-end justify-between">
                    <span className="text-sm text-slate-400">Keyword overlap</span>
                    <span className="text-3xl font-bold text-cyan-300">{matchScore}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${matchScore}%` }} /></div>
                  <p className="mt-2 text-xs text-slate-500">{matchedKeywords.length} of {requiredKeywords.length} extracted terms appear in your profile text. This simple measure can overcount or miss context.</p>
                  <h3 className="mb-2 mt-5 text-sm font-semibold text-emerald-300">Terms already present</h3>
                  <div className="flex flex-wrap gap-2">{matchedKeywords.slice(0, 24).map((keyword) => <span key={keyword} className="rounded-full bg-emerald-950 px-2.5 py-1 text-xs text-emerald-200">{keyword}</span>)}</div>
                  <h3 className="mb-2 mt-5 text-sm font-semibold text-amber-300">Review these terms</h3>
                  <div className="flex flex-wrap gap-2">{missingKeywords.map((keyword) => <span key={keyword} className="rounded-full bg-amber-950/70 px-2.5 py-1 text-xs text-amber-100">{keyword}</span>)}</div>
                  <p className="mt-3 text-xs text-slate-500">Only add a missing term to your CV if it genuinely reflects your skills or experience. Otherwise, treat it as a learning gap.</p>
                </>
              ) : <p className="mt-3 text-sm text-slate-400">Paste a job advert to see keyword overlap and review terms to address honestly.</p>}
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h2 className="text-lg font-bold">4. Build your CV</h2>
              <p className="mt-2 text-sm text-slate-400">The preview uses your profile details as entered. It does not invent qualifications, rewrite facts with an unconfigured AI model, or automatically claim you meet requirements.</p>
              <button type="button" onClick={() => setActiveTab('preview')} disabled={!cvReady} className="mt-4 w-full rounded-lg bg-cyan-400 px-4 py-3 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">Review tailored CV</button>
              {!cvReady && <p className="mt-2 text-xs text-amber-300">Enter your name and at least a summary, employment history or projects to enable preview.</p>}
              <button type="button" onClick={() => { setProfile(emptyProfile); setSaved(false); window.localStorage.removeItem(STORAGE_KEY); }} className="mt-3 w-full rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-rose-400 hover:text-rose-300">Clear saved profile</button>
            </div>
          </aside>
        </div>
      ) : (
        <div className="no-print mb-4 flex justify-end gap-2">
          <button type="button" onClick={() => setActiveTab('edit')} className="rounded-lg border border-slate-600 px-4 py-2 text-sm">Back to edit</button>
          <button type="button" onClick={printCv} disabled={!cvReady} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 disabled:opacity-40">Print / Save PDF</button>
        </div>
      )}

      {activeTab === 'preview' && (
        <article className="cv-paper mx-auto max-w-4xl rounded-xl bg-white p-6 text-slate-900 shadow-2xl sm:p-10">
          <header className="mb-6 border-b-2 border-slate-800 pb-4 text-center">
            <h1 className="text-3xl font-bold">{profile.fullName || 'Your name'}</h1>
            <p className="mt-2 text-sm text-slate-600">{[profile.email, profile.phone, profile.location].filter(Boolean).join(' · ')}</p>
            <p className="mt-1 text-sm text-slate-600">{[profile.linkedin, profile.portfolio].filter(Boolean).join(' · ')}</p>
            {(jobTitle || company) && <p className="mt-3 text-sm font-semibold text-slate-700">CV tailored for {[jobTitle, company].filter(Boolean).join(' · ')}</p>}
          </header>
          {profile.summary.trim() && <Section title="Professional Profile"><p className="whitespace-pre-line text-sm leading-relaxed">{profile.summary}</p></Section>}
          {profile.skills.trim() && <Section title="Key Skills"><ul className="grid list-disc grid-cols-1 gap-x-6 gap-y-1 pl-5 text-sm sm:grid-cols-2">{splitLines(profile.skills.replace(/,/g, '\n')).map((line, index) => <li key={index}>{line}</li>)}</ul></Section>}
          {profile.experience.trim() && <Section title="Employment History"><ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">{splitLines(profile.experience).map((line, index) => <li key={index}>{line}</li>)}</ul></Section>}
          {profile.projects.trim() && <Section title="Projects"><ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">{splitLines(profile.projects).map((line, index) => <li key={index}>{line}</li>)}</ul></Section>}
          {profile.education.trim() && <Section title="Education"><ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">{splitLines(profile.education).map((line, index) => <li key={index}>{line}</li>)}</ul></Section>}
          {profile.certifications.trim() && <Section title="Certifications & Training"><ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">{splitLines(profile.certifications).map((line, index) => <li key={index}>{line}</li>)}</ul></Section>}
          {!cvReady && <p className="text-sm text-amber-700">Complete your profile before using this CV.</p>}
          <p className="mt-6 border-t border-slate-200 pt-3 text-xs text-slate-500">Review every detail for accuracy before sending this CV to an employer.</p>
        </article>
      )}

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 14mm; }
          body { background: white !important; color: #0f172a !important; }
          body * { visibility: hidden !important; }
          .cv-paper, .cv-paper * { visibility: visible !important; }
          .cv-paper { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; max-width: none !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; border-radius: 0 !important; }
          .no-print { display: none !important; }
          .break-inside-avoid { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}

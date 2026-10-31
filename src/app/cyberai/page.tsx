import Link from 'next/link';
import { PhishingTriage } from '@/components/cyberai/PhishingTriage';

const modules = [
  { name: 'Phishing triage', state: 'Available', detail: 'Local pattern-based review of message text.' },
  { name: 'Security cases', state: 'Planned', detail: 'Track evidence, findings and analyst decisions.' },
  { name: 'Log intelligence', state: 'Planned', detail: 'Parse authorised sample logs with source-line references.' },
  { name: 'Vulnerability intelligence', state: 'Planned', detail: 'Enrich CVE records and prioritise remediation.' },
];

export default function CyberAIPage() {
  return <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
    <div className="mx-auto max-w-6xl">
      <Link href="/" className="text-sm text-cyan-300 hover:text-cyan-200">← Back to home</Link>
      <header className="mt-8 border-b border-white/10 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[.25em] text-cyan-300">Defensive security intelligence workspace</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">CyberAI <span className="text-cyan-300">Mission Control</span></h1>
        <p className="mt-3 max-w-3xl text-slate-400">A human-led investigation assistant. Start with transparent phishing triage; additional intelligence modules will be added and validated incrementally.</p>
      </header>
      <section className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map(module => <article key={module.name} className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
          <div className="flex items-start justify-between gap-2"><h2 className="font-semibold">{module.name}</h2><span className={module.state === 'Available' ? 'rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300' : 'rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-300'}>{module.state}</span></div>
          <p className="mt-2 text-sm text-slate-400">{module.detail}</p>
        </article>)}
      </section>
      <PhishingTriage />
      <footer className="mt-8 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-6 text-amber-100/80">
        <strong className="text-amber-200">Responsible-use boundary:</strong> Use only messages and data you are authorised to examine. CyberAI provides decision support, not a definitive verdict. It does not open links, execute files, scan external systems or take remediation actions.
      </footer>
    </div>
  </div>;
}

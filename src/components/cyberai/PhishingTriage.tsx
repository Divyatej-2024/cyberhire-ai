'use client';
import { useMemo, useState } from 'react';

type Flag = { name: string; explanation: string; level: 'Review' | 'Caution' | 'Note' };

function analyse(text: string) {
  const flags: Flag[] = [];
  const urls = text.match(/https?:\/\/[^\s<>"')]+/gi) ?? [];
  if (urls.length) flags.push({ name: 'Links present', explanation: text.match(/https?:\/\/[^\s<>"')]+/gi)?.length + ' URL(s) detected. This demo does not open or reputation-check links.', level: 'Caution' });
  if (urls.some((url) => /bit\.ly|tinyurl\.com|t\.co|goo\.gl|ow\.ly/i.test(url))) flags.push({ name: 'URL shortener', explanation: 'A shortened URL can conceal its destination. Verify through a separate trusted channel.', level: 'Review' });
  if (/\b(urgent|immediately|act now|within 24 hours|account will be suspended|final warning)\b/i.test(text)) flags.push({ name: 'Urgency language', explanation: 'Pressure to act quickly is a common social-engineering signal.', level: 'Caution' });
  if (/\b(password|sign in|log in|verify your account|confirm your identity|one[- ]time code|otp)\b/i.test(text)) flags.push({ name: 'Credential or identity request', explanation: 'The message mentions credentials, sign-in or identity verification. Never disclose passwords or one-time codes.', level: 'Review' });
  if (/\b(payment|invoice|bank details|gift card|wire transfer)\b/i.test(text)) flags.push({ name: 'Financial request language', explanation: 'Verify payment or bank-detail changes independently using a known contact route.', level: 'Caution' });
  if (/\b(IT support|help desk|Microsoft 365|Google Workspace|payroll|HR team)\b/i.test(text)) flags.push({ name: 'Organisational impersonation theme', explanation: 'These are commonly impersonated services or teams; the wording alone is not proof of fraud.', level: 'Note' });
  return { flags, urls };
}

export function PhishingTriage() {
  const [text, setText] = useState('');
  const result = useMemo(() => text.trim() ? analyse(text) : null, [text]);
  return <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
    <p className="text-xs font-semibold uppercase tracking-[.2em] text-cyan-300">Defensive analysis · local only</p>
    <h2 className="mt-2 text-2xl font-semibold text-white">Phishing message triage</h2>
    <p className="mt-2 text-sm text-slate-400">Paste a suspicious message excerpt. Transparent pattern checks run in this browser; content is not sent to an AI service or saved.</p>
    <label htmlFor="cyberai-message" className="mt-5 block text-sm text-slate-200">Message text</label>
    <textarea id="cyberai-message" value={text} onChange={e => setText(e.target.value)} maxLength={12000} rows={7} placeholder="Paste message text here. Remove personal and confidential information first." className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none focus:border-cyan-400" />
    <div className="mt-1 text-right text-xs text-slate-500">{text.length}/12,000</div>
    {result && <div className="mt-5 space-y-3" aria-live="polite">
      <h3 className="font-semibold text-white">Indicators ({result.flags.length})</h3>
      {result.flags.length ? result.flags.map(flag => <article key={flag.name} className="rounded-xl border border-white/10 bg-slate-950 p-4">
        <div className="flex items-center justify-between gap-3"><strong className="text-sm text-white">{flag.name}</strong><span className="text-xs text-amber-300">{flag.level}</span></div>
        <p className="mt-1 text-sm text-slate-400">{flag.explanation}</p>
      </article>) : <p className="rounded-xl border border-emerald-400/20 p-4 text-sm text-emerald-200">No configured patterns matched. This does not mean the message is safe.</p>}
      {result.urls.length > 0 && <div className="rounded-xl border border-white/10 p-4"><strong className="text-sm text-white">URLs detected (not opened)</strong><ul className="mt-2 break-all text-sm text-cyan-200">{result.urls.map((url, i) => <li key={i}>{url}</li>)}</ul></div>}
      <div className="rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-300"><strong className="text-white">Next checks</strong><ul className="mt-2 list-disc pl-5"><li>Verify the sender using a known independent contact method.</li><li>Review full headers and SPF, DKIM and DMARC results.</li><li>Do not open unexpected links or attachments.</li><li>Report through your organisation&apos;s approved process.</li></ul></div>
    </div>}
    <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-slate-500">Limitations: heuristic demonstration only. No AI model, URL reputation, header, attachment or sandbox analysis. Findings require human review.</p>
  </section>;
}

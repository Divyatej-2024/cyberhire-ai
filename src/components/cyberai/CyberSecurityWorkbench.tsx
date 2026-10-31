"use client";

import { useEffect, useMemo, useState } from "react";

type CaseRecord = { id: string; title: string; severity: "Low" | "Medium" | "High" | "Critical"; status: "Open" | "Investigating" | "Contained" | "Resolved"; createdAt: string };
type LogFinding = { line: number; category: string; detail: string; severity: "Review" | "Caution" };

const STORAGE_KEY = "cyberai-cases-v1";

function inspectLogs(raw: string): LogFinding[] {
  const findings: LogFinding[] = [];
  raw.split(/\r?\n/).forEach((line, index) => {
    if (/\b(failed password|authentication failure|invalid user|login failed)\b/i.test(line)) findings.push({ line: index + 1, category: "Authentication failure", detail: line.slice(0, 240), severity: "Caution" });
    if (/\b(429|rate.?limit|too many requests)\b/i.test(line)) findings.push({ line: index + 1, category: "Rate limiting", detail: line.slice(0, 240), severity: "Review" });
    if (/\b(403|forbidden|access denied|permission denied)\b/i.test(line)) findings.push({ line: index + 1, category: "Access denied", detail: line.slice(0, 240), severity: "Review" });
    if (/\b(malware|ransomware|quarantined|defender alert)\b/i.test(line)) findings.push({ line: index + 1, category: "Security alert keyword", detail: line.slice(0, 240), severity: "Caution" });
  });
  return findings.slice(0, 200);
}

export function CyberSecurityWorkbench() {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<CaseRecord["severity"]>("Medium");
  const [logText, setLogText] = useState("");
  const [cveId, setCveId] = useState("");
  const [cveResult, setCveResult] = useState<{ id: string; description: string; score: number | null; severity: string; published: string; url: string } | null>(null);
  const [cveError, setCveError] = useState("");
  const [loadingCve, setLoadingCve] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setCases(JSON.parse(saved) as CaseRecord[]);
    } catch { setCases([]); }
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cases)); } catch { /* Browser storage may be unavailable. */ }
  }, [cases]);

  const logFindings = useMemo(() => logText.trim() ? inspectLogs(logText) : [], [logText]);

  function addCase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    const record: CaseRecord = { id: crypto.randomUUID(), title: title.trim(), severity, status: "Open", createdAt: new Date().toISOString() };
    setCases(current => [record, ...current]);
    setTitle("");
  }

  function updateStatus(id: string, status: CaseRecord["status"]) {
    setCases(current => current.map(item => item.id === id ? { ...item, status } : item));
  }

  async function lookupCve(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingCve(true); setCveError(""); setCveResult(null);
    try {
      const response = await fetch("/api/cyberai/cve?id=" + encodeURIComponent(cveId.trim().toUpperCase()));
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "CVE lookup failed.");
      setCveResult(payload);
    } catch (error) {
      setCveError(error instanceof Error ? error.message : "Unable to complete CVE lookup.");
    } finally { setLoadingCve(false); }
  }

  return <div className="mt-8 space-y-8">
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-cyan-300">Module 02 · case management</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Security investigation cases</h2>
      <p className="mt-2 text-sm text-slate-400">Create and track investigation records in this browser. Cases are stored in local storage on this device only; there is no shared database or account sync yet.</p>
      <form onSubmit={addCase} className="mt-5 grid gap-3 sm:grid-cols-[1fr_160px_auto]">
        <input value={title} onChange={e => setTitle(e.target.value)} maxLength={120} required placeholder="Case title, e.g. Suspicious payroll email" className="rounded-lg border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white" />
        <select value={severity} onChange={e => setSeverity(e.target.value as CaseRecord["severity"])} className="rounded-lg border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white"><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select>
        <button className="rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950">Create case</button>
      </form>
      <div className="mt-5 space-y-2">
        {cases.length === 0 ? <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm text-slate-500">No cases yet. Create a test case to try the workflow.</p> : cases.map(item => <article key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-950 p-4">
          <div><p className="font-medium text-white">{item.title}</p><p className="mt-1 text-xs text-slate-500">{item.severity} priority · {new Date(item.createdAt).toLocaleString()}</p></div>
          <select aria-label={"Status for " + item.title} value={item.status} onChange={e => updateStatus(item.id, e.target.value as CaseRecord["status"])} className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"><option>Open</option><option>Investigating</option><option>Contained</option><option>Resolved</option></select>
        </article>)}
      </div>
    </section>

    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-cyan-300">Module 03 · log triage</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Security log review</h2>
      <p className="mt-2 text-sm text-slate-400">Paste a small, authorised log excerpt. The browser checks for selected authentication, access-denied, rate-limit and security-alert patterns and preserves source line numbers.</p>
      <textarea value={logText} onChange={e => setLogText(e.target.value)} maxLength={30000} rows={7} placeholder={"Example:\n2026-10-31 10:00:01 sshd: Failed password for invalid user test\n2026-10-31 10:01:12 app: 403 access denied"} className="mt-4 w-full rounded-xl border border-white/10 bg-slate-950 p-4 font-mono text-xs text-white" />
      <p className="mt-2 text-xs text-slate-500">{logText.length}/30,000 characters · local analysis only</p>
      <div className="mt-4 space-y-2">
        {logText.trim() && logFindings.length === 0 && <p className="text-sm text-slate-400">No configured patterns matched. This does not prove the logs are benign.</p>}
        {logFindings.map((finding, index) => <article key={index} className="rounded-lg border border-white/10 bg-slate-950 p-3"><div className="flex justify-between gap-2"><strong className="text-sm text-white">{finding.category}</strong><span className="text-xs text-amber-300">{finding.severity} · line {finding.line}</span></div><p className="mt-1 break-all font-mono text-xs text-slate-400">{finding.detail}</p></article>)}
      </div>
      <p className="mt-4 text-xs text-slate-500">This is a keyword-based teaching aid, not a SIEM correlation engine. It does not identify an attacker or establish compromise.</p>
    </section>

    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-cyan-300">Module 04 · vulnerability intelligence</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">CVE record lookup</h2>
      <p className="mt-2 text-sm text-slate-400">Retrieve a published CVE record from the US National Vulnerability Database using its identifier.</p>
      <form onSubmit={lookupCve} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input value={cveId} onChange={e => setCveId(e.target.value)} pattern="CVE-[0-9]{4}-[0-9]{4,}" required placeholder="CVE-2024-3094" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950 px-3 py-3 font-mono text-sm text-white" />
        <button disabled={loadingCve} className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50">{loadingCve ? "Looking up…" : "Look up CVE"}</button>
      </form>
      {cveError && <p role="alert" className="mt-4 text-sm text-rose-300">{cveError}</p>}
      {cveResult && <article className="mt-4 rounded-xl border border-white/10 bg-slate-950 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold text-white">{cveResult.id}</h3><span className="text-sm text-cyan-200">{cveResult.score === null ? "No CVSS score supplied" : "CVSS " + cveResult.score + " · " + cveResult.severity}</span></div>
        <p className="mt-3 text-sm leading-6 text-slate-300">{cveResult.description}</p>
        <p className="mt-3 text-xs text-slate-500">Published: {cveResult.published ? new Date(cveResult.published).toLocaleDateString() : "Not supplied"} · Source: NVD</p>
        <a href={cveResult.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-cyan-300 underline">Open NVD record ↗</a>
      </article>}
      <p className="mt-4 text-xs text-slate-500">NVD availability and rate limits apply. A CVSS score is one prioritisation input; assess asset exposure, exploitability, compensating controls and vendor guidance before making remediation decisions.</p>
    </section>
  </div>;
}

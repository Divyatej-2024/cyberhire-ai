# CyberAI — Product Foundation

## Product direction

Evolve CyberHire AI into CyberAI: a defensive cybersecurity intelligence workspace for students, junior analysts, and small security teams. The product assists human-led investigation; it does not autonomously execute actions against systems.

## Initial release: analyst copilot

1. **Security case workspace** — create a case, record an alert or observation, add evidence references, track status, and export a report.
2. **Phishing triage** — analyse user-submitted email text, headers, and URLs as untrusted input; return indicators, reasoning, confidence, and safe next steps.
3. **Log triage** — accept explicitly uploaded sample logs, parse supported formats, identify notable events, and explain findings with source-line references.
4. **Vulnerability intelligence** — look up CVE metadata from trusted public sources, explain severity and affected versions, and produce remediation guidance.
5. **Threat knowledge** — map relevant findings to MITRE ATT&CK techniques with links to authoritative references.
6. **AI copilot** — summarise evidence and draft investigation notes; every generated conclusion must distinguish observed facts from hypotheses.

## Engineering principles

- Preserve the existing Next.js application and migrate incrementally.
- Keep secrets server-side; never expose provider keys in browser code.
- Validate and size-limit all user input and uploaded files.
- Treat emails, URLs, logs, and model output as untrusted data.
- Do not fetch arbitrary user-supplied URLs from the server. URL reputation checks must use approved reputation APIs or safe, isolated services.
- Do not execute uploaded files, commands, or suggested remediation automatically.
- Require human review before exporting or marking an incident as resolved.
- Record provenance for findings: input evidence, source, timestamp, and analysis version.
- Use synthetic or explicitly authorised data for demonstrations and tests.
- Do not claim a detection is definitive; show confidence, limitations, and supporting evidence.

## Delivery milestones

### M0 — Baseline and stabilisation
- Run the existing type-check, lint, test, and production build.
- Resolve existing compilation issues without broad rewrites.
- Inventory current routes, components, data models, authentication, and deployment configuration.

### M1 — CyberAI foundation
- Establish CyberAI navigation and product identity.
- Define typed case, evidence, finding, and analysis models.
- Add a case dashboard backed by the existing persistence layer.
- Add audit-friendly timestamps and provenance fields.

### M2 — First useful analysis workflow
- Implement phishing text/header triage with deterministic checks first.
- Add optional AI explanation behind a server-side provider interface.
- Return structured findings, limitations, and references.
- Add unit and integration tests with synthetic fixtures.

### M3 — Log and vulnerability intelligence
- Add safe parsing for a small, documented set of log formats.
- Integrate a trusted CVE source and cache results.
- Add ATT&CK mapping with source links.

### M4 — Validation and portfolio readiness
- Add security tests, rate limits, input limits, and access-control tests.
- Document architecture, threat model, data flow, limitations, and setup.
- Publish a demo using synthetic data and a clear responsible-use statement.

## First acceptance criteria

- The app builds and type-checks before new features are added.
- A signed-in user can create and view a case.
- A case can contain evidence references and analyst-authored notes.
- No secrets are sent to the client.
- The UI clearly labels AI-generated hypotheses and links them to supporting evidence.
- Tests cover validation, access control, and malformed inputs.

## Out of scope for the first release

- Autonomous remediation or command execution.
- Unauthorised scanning, exploitation, or credential collection.
- Unrestricted crawling of user-provided URLs.
- Claims of real-time SOC monitoring without an actual authorised telemetry integration.

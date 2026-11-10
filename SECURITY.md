# Security Policy

## Supported Versions

The following versions of Episteme AI are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| `main`  | ✅ Yes (active)    |
| Others  | ❌ No              |

## Reporting a Vulnerability

We take security seriously in Episteme AI. If you discover a vulnerability, **please do not open a public GitHub Issue**.

### How to Report

1. **GitHub Private Advisory** *(preferred)*: Use [GitHub Security Advisories](https://github.com/SreeNaresh1/episteme-ai/security/advisories/new) to report privately.
2. **Email**: Reach out via the contact listed on the [GitHub profile](https://github.com/SreeNaresh1).

### What to Include

Please provide as much of the following information as possible to help us triage and resolve quickly:

- Type of issue (e.g. SQL injection, XSS, path traversal, exposed API key)
- Full paths of source file(s) related to the issue
- Step-by-step instructions to reproduce
- Proof-of-concept or exploit code (if available)
- Impact of the issue

### Response Timeline

| Stage | Timeline |
| ----- | -------- |
| Acknowledgement | Within **48 hours** |
| Triage & assessment | Within **5 business days** |
| Patch / mitigation | Within **14 days** for critical issues |
| Public disclosure | Coordinated after fix is released |

## Security Considerations for Episteme AI

Episteme AI performs live web crawling and external URL resolution. Keep in mind:

- **API Keys**: Never commit your `GEMINI_API_KEY` or any other credentials. Use `.env.local` (gitignored).
- **SQLite Database**: The `learningpath.db` file may contain user plan data. Do not expose it publicly.
- **Crawler Scope**: The web discovery module only reads publicly accessible pages; it does not store personal data.
- **HITL Gate**: All enrollment actions require explicit user approval before dispatch — no background automation of irreversible actions.

Thank you for helping keep Episteme AI and its users safe! 🛡️


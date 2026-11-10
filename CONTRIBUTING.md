# Contributing to Episteme AI

First off — thank you for taking the time to contribute! 🎉  
Episteme AI is an autonomous self-healing learning path engine, and every contribution — big or small — helps push epistemic rigor into open-source education tooling.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Improving Documentation](#improving-documentation)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Development Setup](#development-setup)
- [Project Structure Overview](#project-structure-overview)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Checklist](#pull-request-checklist)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## How Can I Contribute?

### Reporting Bugs

Use the **[Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)** issue template. Before opening a new issue, please:

- Search existing [Issues](https://github.com/SreeNaresh1/episteme-ai/issues) to avoid duplicates
- Include your OS, Node.js version, and steps to reproduce
- Attach relevant logs or screenshots if available

### Suggesting Features

Use the **[Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)** template. Please describe:

- **The problem** you're trying to solve
- **Your proposed solution** and any alternatives considered
- Why this would benefit the broader Episteme AI user base

### Improving Documentation

Documentation improvements are always welcome! You can:
- Fix typos or unclear wording in `README.md`, `DEPLOYMENT.md`, or `ORGANIZER_VALIDATION.md`
- Add usage examples or diagrams
- Translate documentation (open an issue first to coordinate)

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Make your changes with clean, focused commits
4. Ensure the verification suite passes (see below)
5. Push and open a Pull Request against `main`

---

## Development Setup

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/episteme-ai.git
cd episteme-ai/app

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# 4. Start the development server
npm run dev
# → http://localhost:3000

# 5. Run the full verification suite
npm run test:organizer
```

### Environment Variables

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini 2.0 Flash API key from [Google AI Studio](https://aistudio.google.com/) |

---

## Project Structure Overview

```
episteme-ai/
├── app/src/
│   ├── app/api/          # Next.js Route Handlers
│   └── lib/              # Core engine modules (pathGenerator, linkChecker, etc.)
├── .github/              # Issue & PR templates
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md       # (you are here)
├── LICENSE
├── SECURITY.md
└── README.md
```

---

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

feat(crawler): add retry logic for transient 5xx errors
fix(db): resolve WAL journal lock on concurrent writes
docs(readme): add Docker one-click deployment badge
test(audit): extend organizer suite to cover redirect chains
refactor(pathGenerator): extract prerequisite DAG into separate module
```

**Types**: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `perf`, `ci`

---

## Pull Request Checklist

Before submitting, verify:

- [ ] Code follows the existing style (TypeScript strict mode, no `any` without justification)
- [ ] All 4 core validation scenarios pass: `curl -X POST http://localhost:3000/api/testcases`
- [ ] All 7 system audit checks pass: `npm run test:organizer`
- [ ] No new secrets or API keys committed (use `.env.local`)
- [ ] PR description clearly explains **what** changed and **why**
- [ ] Linked to a related Issue (if applicable): `Closes #<issue-number>`

---

## Questions?

Open a [Discussion](https://github.com/SreeNaresh1/episteme-ai/discussions) or file an Issue — we're happy to help! 🚀


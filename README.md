# Episteme AI — Autonomous Self-Healing Learning Path Engine

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.2-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.0%20Flash-8E75B2?logo=google)](https://aistudio.google.com/)
[![SQLite WAL](https://img.shields.io/badge/SQLite-WAL%20Stateful-003B57?logo=sqlite)](https://sqlite.org/)
[![Verification Suite](https://img.shields.io/badge/Tests-4%2F4%20Passed-22c55e)](#official-scenarios--verification-evidence)
[![RFC 5545](https://img.shields.io/badge/Calendar-RFC--5545%20.ics-amber)](#calendar-export--idempotent-scheduling)

> **Episteme** (Ancient Greek: *ἐπιστήμη* — justified, verified truth vs *δόξα* / unverified opinion) is an autonomous, agentic curriculum engineer. It transforms ambiguous career goals into strictly constrained, prerequisite-ordered weekly roadmaps powered exclusively by **100% verified free public courseware**, backed by **autonomous link self-healing** and **human-governed calendar scheduling**.

---

## 🌟 The Epistemic Philosophy: Why the Name?

In antiquity, Plato and Aristotle contrasted **Episteme** (*proven, mathematically grounded understanding*) with **Doxa** (*untested opinion and illusion*). 

The modern online learning landscape is saturated with *Doxa*:
- Courses marketed as "free" that abruptly demand a credit card on Week 3.
- Outdated syllabi with broken 404 links and obsolete APIs.
- Generic AI chatbots hallucinating unbudgeted, unrealistic, 40-hour weekly workloads.

**Episteme AI restores epistemic rigor to education**:
1. **Mathematical Hours Guarantee**: Strictly bounds weekly study time to the user's budget (e.g., exactly 5h/week for 26 weeks = 130 hours).
2. **Autonomous Paywall Heuristics**: Detects monetization traps before the learner ever visits the page.
3. **Self-Healing Link Resolution**: Autonomously crawls, flags broken URLs, discovers verified zero-cost replacements, and hot-swaps them into the live curriculum.
4. **Human-in-the-Loop Gatekeeper**: Never performs unapproved calendar actions or platform enrollments without explicit user consent.
5. **Strict Idempotency**: Prevents duplicate calendar blocks or repeated schedule corruption across retries or plan updates.

---

## 📐 System Architecture

Episteme AI operates as a coordinated multi-phase agent loop:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        EPISTEME AGENTIC ENGINE                         │
└────────────────────────────────────────────────────────────────────────┘
                                    │
    1. INTAKE & CONSTRAINTS         ▼
    ┌────────────────────────────────────────────────────────────────────┐
    │ Goal: "Become a Data Analyst" | Level: Beginner                   │
    │ Time Constraints: 5h / week × 26 weeks = 130 Total Hours Budget    │
    └────────────────────────────────────────────────────────────────────┘
                                    │
    2. REASONING & PREREQUISITE DAG ▼
    ┌────────────────────────────────────────────────────────────────────┐
    │ Gemini 2.0 Flash / Semantic Knowledge Base                         │
    │ Orders topics: Foundations → Python/SQL → Analysis → Capstone      │
    │ Distributes time budget precisely across 26 discrete weekly modules│
    └────────────────────────────────────────────────────────────────────┘
                                    │
    3. LINK VERIFICATION & PAYWALL AUDIT
    ┌────────────────────────────────────────────────────────────────────┐
    │ Active Crawler & Heuristic Classifier                              │
    │ • Checks HTTP Reachability (Detects 404 / NXDOMAIN / DNS drops)    │
    │ • Evaluates Paywall Signatures (Udemy, Pluralsight, Skillshare)     │
    │ • Validates Free Audit Status (Coursera, Kaggle, Khan, MDN)        │
    └────────────────────────────────────────────────────────────────────┘
                                    │
                                    ├─── [Broken Link or Paywall Found?]
                                    │               │
                                    │               ▼ (SELF-HEALING)
                                    │   ┌────────────────────────────────┐
                                    │   │ Search Topic-Tagged Free Pool  │
                                    │   │ Recheck Candidate Link via HTTP│
                                    │   │ Hot-Swap in DB & Store Reason  │
                                    │   └────────────────────────────────┘
                                    ▼
    4. HUMAN APPROVAL GATEWAY (HITL)
    ┌────────────────────────────────────────────────────────────────────┐
    │ Displays proposed actions, exact resource URLs, and hours          │
    │ Requires user approval prior to enrollment simulation & calendar   │
    └────────────────────────────────────────────────────────────────────┘
                                    │
    5. IDEMPOTENT DISPATCH & EXPORT ▼
    ┌────────────────────────────────────────────────────────────────────┐
    │ • Stateful SQLite tracking prevents duplicate runs / actions       │
    │ • RFC-5545 Standard .ics Calendar Export for Google/Apple/Outlook  │
    └────────────────────────────────────────────────────────────────────┘
```

---

## 🧪 Official Scenarios & Verification Evidence

Episteme AI includes an automated, built-in test suite executing the 4 required hackathon scenarios against live database transactions. All 4 tests pass deterministically.

| Scenario ID | Test Scenario | Specification & Expected Behavior | Actual Automated Output | Status |
| :--- | :--- | :--- | :--- | :---: |
| **TC1** | **6 Months at 5 h/week** | Curriculum must fit exact 26-week horizon at 5 h/week (130h total budget) with 100% valid free resources. | `Weeks generated: 26/26. Total hours: 130/130 (exact match). Per-week limit (≤5h) respected: true. All URLs valid & free.` | **PASSED** |
| **TC2** | **Course Becomes Paid** | Detect paywalled course URLs (e.g. Udemy/Pluralsight), flag status, and replace with verified free alternative. | `Paid course detected: true (status=paid). Classification: Paid platform pattern. Replacement proposed & verified live_free: freeCodeCamp Data Analysis with Python. Persisted to DB.` | **PASSED** |
| **TC3** | **Broken Link / 404** | Detect dead/broken URL (NXDOMAIN / HTTP error), discover replacement, verify replacement is live & free, hot-swap plan. | `Broken link detected: true (status=broken). Classification: Network error: fetch failed. Replacement verified (status=live_free). Replaced in plan.` | **PASSED** |
| **TC4** | **Rerun / Idempotency** | On rerun or plan replay, only missing sessions are appended; duplicate calendar actions prevented via idempotency key. | `Total weeks: 4. Completed: 2. Pending: 2. Missing: 0. Idempotency guard active: calendar action already executed. Duplicate prevented: true. Sessions before: 4, after: 4.` | **PASSED** |

### Live Test Runner API
- **Endpoint:** `POST /api/testcases`
- **Output:** Returns JSON summary with full input, output, and pass criteria.
- **Inspect Past Results:** `GET /api/testcases`

---

## 🛠️ Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.4.2 (App Router & Turbopack) | Server-rendered API routes, client-side reactive dashboard, sub-second compile |
| **UI & Styling** | React 19, Vanilla CSS Design System, Lucide Icons | Ultra-fast rendering, zero Tailwind lock-in, typography & micro-interactions |
| **AI Reasoning** | Google Gemini 2.0 Flash (`@google/generative-ai`) | Prerequisite topology ordering, weekly time decomposition, course semantic tagging |
| **Persistence** | SQLite with Write-Ahead Logging (`better-sqlite3`) | Stateful, ACID-compliant runs, actions, resources, and audit evidence |
| **Link Crawler** | Fetch API + Platform Paywall Heuristics | Real-time HTTP link checking, header inspection, and domain paywall classification |
| **Scheduling** | RFC-5545 Compliant `.ics` Generator | Universal export to Google Calendar, Apple Calendar, and Microsoft Outlook |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/episteme-ai.git
cd episteme-ai/app

# Install dependencies
npm install
```

### 3. Environment Variables (Optional)
Create a `.env.local` file in the `app` directory:
```env
# Optional: Google Gemini API Key (https://aistudio.google.com/)
# Note: Episteme includes a built-in deterministic fallback engine that works offline!
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running the Test Suite
Trigger the full verification suite directly from the UI tab **"Official Test Cases (4/4)"** or run:
```bash
curl -X POST http://localhost:3000/api/testcases
```

---

## 📁 Repository Directory Structure

```
Ziro/
└── app/
    ├── src/
    │   ├── app/
    │   │   ├── api/
    │   │   │   ├── runs/               # Create and list learning path runs
    │   │   │   │   ├── [id]/           # Run detail view
    │   │   │   │   │   ├── approve/    # Human approval gate (HITL)
    │   │   │   │   │   └── verify/     # On-demand link re-check & self-healing
    │   │   │   └── testcases/          # Official hackathon verification suite (TC1-TC4)
    │   │   ├── globals.css             # Comprehensive bespoke design system
    │   │   ├── layout.tsx              # SEO metadata, OpenGraph tags, font loading
    │   │   └── page.tsx                # Interactive dashboard, test runner, run inspector
    │   └── lib/
    │       ├── calendarExport.ts       # RFC-5545 iCalendar (.ics) generator
    │       ├── db.ts                   # SQLite schema, tables, queries & WAL mode
    │       ├── linkChecker.ts          # Paywall detection, HTTP crawler & replacement pool
    │       └── pathGenerator.ts        # Gemini 2.0 Flash prompt & deterministic curriculum DAG
    ├── data/
    │   └── learningpath.db             # Stateful SQLite database
    ├── public/
    │   └── brand-logo.jpg              # High-resolution brand icon
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

---

## 🛡️ License & Fair Use

All external course syllabi, documentation, tutorials, and trademarked names (Coursera®, Kaggle®, Khan Academy®, freeCodeCamp®, MIT OpenCourseWare®, Harvard CS50®, MDN Web Docs®) belong to their respective institutions. **Episteme AI** acts as an open-access aggregator and scheduler verifying zero-cost auditability under educational fair-use guidance.

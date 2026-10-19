'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, ChevronRight, Download, ExternalLink,
  Layers, Shield, CheckCircle2, AlertTriangle, ArrowRight,
  Sparkles, RefreshCw, Calendar, Cpu, Award
} from 'lucide-react';

interface Slide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    // ── Slide 1: Title & Hero ───────────────────────────────────────────────
    {
      id: 1,
      tag: 'BUILD & SUBMIT • AGENTIC AI HACKATHON 2026',
      title: 'Episteme AI',
      subtitle: 'The Autonomous Self-Healing Epistemic Curriculum Engine',
      content: (
        <div className="pres-slide-body">
          <div className="pres-quote-box">
            <p className="pres-quote-text">
              Named after classical philosophy: <strong>ἐπιστήμη (Episteme — justified, verified truth)</strong> vs{' '}
              <strong>δόξα (Doxa — unverified opinion)</strong>. Online learning is saturated with unverified links,
              surprise paywalls, and unbudgeted schedules. Episteme AI provides mathematical rigor: guaranteeing
              weekly hour caps (e.g. 5h/wk for 26w = 130h), verifying 100% free courses, and autonomously healing dead links and paywalls.
            </p>
          </div>

          <div className="pres-card-grid-3">
            <div className="pres-card">
              <div className="pres-card-num">01</div>
              <h3 className="pres-card-title">130h Budget Cap</h3>
              <p className="pres-card-desc">Exact mathematical constraint solver fitting 26 weeks @ 5h/wk with zero overflow</p>
            </div>
            <div className="pres-card">
              <div className="pres-card-num">02</div>
              <h3 className="pres-card-title">Self-Healing Links</h3>
              <p className="pres-card-desc">Active HTTP crawler catches 404s &amp; paywalls, hot-swapping verified free alternatives</p>
            </div>
            <div className="pres-card">
              <div className="pres-card-num">03</div>
              <h3 className="pres-card-title">Human Gatekeeper</h3>
              <p className="pres-card-desc">Explicit user approval prior to simulated platform enrollment &amp; idempotent calendar dispatch</p>
            </div>
          </div>
        </div>
      ),
    },

    // ── Slide 2: Problem Statement ──────────────────────────────────────────
    {
      id: 2,
      tag: 'PROBLEM STATEMENT • THE EDUCATION CRISIS',
      title: 'The E-Learning Doxa: Why LLMs Fail Students',
      subtitle: 'Why standard generative AI and self-directed study lead to high dropout rates',
      content: (
        <div className="pres-slide-body">
          <div className="pres-card-grid-2">
            <div className="pres-card pres-card-alert">
              <div className="pres-card-header-row">
                <AlertTriangle size={18} color="#EF4444" />
                <h3 className="pres-card-title">Hidden Paywalls &amp; Bait-and-Switch</h3>
              </div>
              <p className="pres-card-desc">
                Courses market themselves as &quot;free to start,&quot; but abruptly demand a credit card on Week 3 when certificate quizzes or assignments unlock. Learners hit unexpected monetary barriers midway through roadmaps.
              </p>
            </div>

            <div className="pres-card pres-card-alert">
              <div className="pres-card-header-row">
                <AlertTriangle size={18} color="#EF4444" />
                <h3 className="pres-card-title">Link Rot &amp; Dead Curricula</h3>
              </div>
              <p className="pres-card-desc">
                Online course links rot at an alarming rate. Syllabi recommend deprecated 404 pages, discontinued video series, and decommissioned interactive exercises with zero recourse.
              </p>
            </div>

            <div className="pres-card pres-card-alert">
              <div className="pres-card-header-row">
                <AlertTriangle size={18} color="#EF4444" />
                <h3 className="pres-card-title">Unbudgeted AI Hallucinations</h3>
              </div>
              <p className="pres-card-desc">
                Generic chatbots produce bloated 40-hour weekly plans when the learner only has 5 hours available. Topic ordering violates prerequisites, introducing complex models before foundational syntax.
              </p>
            </div>

            <div className="pres-card pres-card-alert">
              <div className="pres-card-header-row">
                <AlertTriangle size={18} color="#EF4444" />
                <h3 className="pres-card-title">Ungoverned Calendar Bloat</h3>
              </div>
              <p className="pres-card-desc">
                Automated scripts blindly flood calendars with duplicate study sessions on retries, lacking idempotency guards and human-in-the-loop review boundaries.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // ── Slide 3: 5-Phase Architecture ───────────────────────────────────────
    {
      id: 3,
      tag: 'SYSTEM ARCHITECTURE • MULTI-AGENT PIPELINE',
      title: '5-Phase Autonomous Agent Loop',
      subtitle: 'How Episteme orchestrates reasoning, crawler verification, HITL governance, and dispatch',
      content: (
        <div className="pres-slide-body">
          <div className="pres-arch-container">
            <div className="pres-arch-visual">
              <img
                src="/agent-architecture.svg"
                alt="Episteme AI Agent Architecture"
                className="pres-arch-img"
              />
              <div className="pres-arch-link-bar">
                <a
                  href="/agent-architecture.svg"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary-light"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  <ExternalLink size={12} /> Open Full SVG Diagram
                </a>
              </div>
            </div>

            <div className="pres-arch-steps">
              <div className="pres-step-item">
                <div className="pres-step-badge">1</div>
                <div>
                  <strong>Intake &amp; Constraints:</strong> Validates goal, starting level, weekly hours (1–40h), and horizon (1–52w).
                </div>
              </div>
              <div className="pres-step-item">
                <div className="pres-step-badge">2</div>
                <div>
                  <strong>Reasoning &amp; Prerequisite DAG:</strong> Gemini 2.0 Flash orders topics (Basics → Core → Applied → Capstone) fitting exact hours.
                </div>
              </div>
              <div className="pres-step-item">
                <div className="pres-step-badge">3</div>
                <div>
                  <strong>Link Crawler &amp; Self-Healing:</strong> HTTP HEAD reachability, paywall heuristics, topic-tagged free pool substitution.
                </div>
              </div>
              <div className="pres-step-item">
                <div className="pres-step-badge">4</div>
                <div>
                  <strong>Human Approval Gate:</strong> Explicit HITL review before calendar blocks and enrollment dispatch.
                </div>
              </div>
              <div className="pres-step-item">
                <div className="pres-step-badge">5</div>
                <div>
                  <strong>Idempotent Dispatch &amp; Export:</strong> RFC-5545 .ics generation with unique keys preventing duplicate schedule corruption.
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // ── Slide 4: Official Test Suite ────────────────────────────────────────
    {
      id: 4,
      tag: 'OFFICIAL TEST CASES • VERIFICATION SUITE',
      title: '100% Deterministic Verification (4/4 Passed)',
      subtitle: 'Automated test suite executing against live SQLite transactions and live HTTP crawls',
      content: (
        <div className="pres-slide-body">
          <div className="pres-table-container">
            <table className="pres-test-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Scenario</th>
                  <th>Pass Criteria</th>
                  <th>Actual Evidence String</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>TC1</strong></td>
                  <td><strong>6 Months at 5 h/week</strong></td>
                  <td>Exact 26w @ 5h/w = 130h total budget; 100% free valid resources</td>
                  <td><code>Weeks generated: 26/26. Total hours: 130/130 (exact match). Per-week limit (≤5h) respected: true. All URLs valid &amp; free.</code></td>
                  <td><span className="badge-pass"><CheckCircle2 size={13} /> PASSED</span></td>
                </tr>
                <tr>
                  <td><strong>TC2</strong></td>
                  <td><strong>Course Becomes Paid</strong></td>
                  <td>Detect paywalled URLs (Udemy/Pluralsight), flag status, hot-swap free alternative</td>
                  <td><code>Paid course detected: true (status=paid). Classification: Paid platform pattern. Replacement proposed &amp; verified live_free: freeCodeCamp Data Analysis with Python. Persisted to DB.</code></td>
                  <td><span className="badge-pass"><CheckCircle2 size={13} /> PASSED</span></td>
                </tr>
                <tr>
                  <td><strong>TC3</strong></td>
                  <td><strong>Broken Link / 404</strong></td>
                  <td>Detect dead URL (NXDOMAIN / HTTP 404), discover replacement, verify live &amp; free, hot-swap in DB</td>
                  <td><code>Broken link detected: true (status=broken). Classification: Network error: fetch failed. Replacement verified (status=live_free). Replaced in plan.</code></td>
                  <td><span className="badge-pass"><CheckCircle2 size={13} /> PASSED</span></td>
                </tr>
                <tr>
                  <td><strong>TC4</strong></td>
                  <td><strong>Rerun &amp; Idempotency</strong></td>
                  <td>Detect partial run, append ONLY missing sessions; duplicate calendar action prevented</td>
                  <td><code>Total weeks: 4. Completed: 2. Missing added: 2. Idempotency guard active: calendar action already executed. Duplicate prevented: true. Sessions before: 2, after: 4.</code></td>
                  <td><span className="badge-pass"><CheckCircle2 size={13} /> PASSED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },

    // ── Slide 5: Autonomous Link Self-Healing ────────────────────────────────
    {
      id: 5,
      tag: 'DEEP DIVE • AUTONOMOUS CRAWLER',
      title: 'Self-Healing Links: Paywall Audit &amp; Repair',
      subtitle: 'How Episteme detects unreachable or paywalled courses and swaps verified free alternatives',
      content: (
        <div className="pres-slide-body">
          <div className="pres-card-grid-3">
            <div className="pres-card">
              <div className="pres-card-num">01</div>
              <h3 className="pres-card-title">Live HTTP Reachability</h3>
              <p className="pres-card-desc">
                Dispatches non-blocking HEAD requests with 8s timeouts and browser headers. Flags 404 Not Found, 5xx server drops, and DNS resolution failures immediately.
              </p>
            </div>
            <div className="pres-card">
              <div className="pres-card-num">02</div>
              <h3 className="pres-card-title">Paywall Signature Engine</h3>
              <p className="pres-card-desc">
                Cross-references URLs against paid-only platform domains (Udemy, Pluralsight, Skillshare, Masterclass) and flags subscription barriers before students visit.
              </p>
            </div>
            <div className="pres-card">
              <div className="pres-card-num">03</div>
              <h3 className="pres-card-title">Hot-Swap &amp; Re-Verification</h3>
              <p className="pres-card-desc">
                Scores candidate replacements from the verified free pool by topic overlap, re-crawls the candidate via HTTP, updates the database, and records full audit rationale.
              </p>
            </div>
          </div>

          <div className="pres-code-box">
            <div className="pres-code-label">Stateful Audit Trail (SQLite Resources Table)</div>
            <code className="pres-code-snippet">
              {`UPDATE resources SET replaced_by = 'https://www.freecodecamp.org/learn/data-analysis-with-python/',\n` +
               `       replacement_reason = 'Original resource returned HTTP 404. Replaced with verified free alternative.',\n` +
               `       link_status = 'broken', link_http_status = 404 WHERE id = :resource_id;`}
            </code>
          </div>

          <div className="pres-quote-box" style={{ marginTop: 20 }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: 13, fontWeight: 700 }}>Why This Design Decision Matters</h4>
            <p className="pres-quote-text" style={{ fontSize: 12.5 }}>
              Standard LLMs produce static, unverified text that fails silently when courses rot or switch to paid subscriptions. Episteme separates the <em>probabilistic reasoning DAG</em> from the <em>deterministic crawler &amp; self-healing loop</em>: every resource must pass active HTTP reachability and paywall signature screening before reaching the student.
            </p>
          </div>
        </div>
      ),
    },

    // ── Slide 6: Human Gatekeeper & Calendar ─────────────────────────────────
    {
      id: 6,
      tag: 'HUMAN-IN-THE-LOOP & IDEMPOTENCY',
      title: 'Human Gatekeeper &amp; Universal Calendar Export',
      subtitle: 'Safety boundaries, simulated enrollments, and RFC-5545 compliant scheduling',
      content: (
        <div className="pres-slide-body">
          <div className="pres-card-grid-2">
            <div className="pres-card">
              <div className="pres-card-header-row">
                <Shield size={18} color="#111110" />
                <h3 className="pres-card-title">Human-in-the-Loop Gateway</h3>
              </div>
              <p className="pres-card-desc">
                The agent proposes platform enrolments and calendar blocks, but halts until explicit user approval or rejection. Controlled mock execution ensures safety while maintaining production-grade audit evidence in SQLite.
              </p>
              <div className="pres-sub-badge">mock_execution = 1 • Stored in DB</div>
            </div>

            <div className="pres-card">
              <div className="pres-card-header-row">
                <Calendar size={18} color="#111110" />
                <h3 className="pres-card-title">Universal RFC-5545 .ics Export</h3>
              </div>
              <p className="pres-card-desc">
                Generates industry-standard iCalendar files with scheduled study sessions starting every Saturday at 10:00 UTC. One-click import into Google Calendar, Apple Calendar, and Outlook.
              </p>
              <div className="pres-sub-badge">RFC-5545 • Universal Compatibility</div>
            </div>
          </div>

          <div className="pres-quote-box" style={{ marginTop: 20 }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: 13, fontWeight: 700 }}>Strict Idempotency Guard (TC4)</h4>
            <p className="pres-quote-text" style={{ fontSize: 12.5 }}>
              Each proposed action is keyed by <code>calendar-&#123;runId&#125;</code> with a UNIQUE constraint in the actions table. Retrying or rerunning a plan will NEVER generate duplicate calendar blocks or corrupt the learner&apos;s schedule.
            </p>
          </div>
        </div>
      ),
    },

    // ── Slide 7: Technical Stack ────────────────────────────────────────────
    {
      id: 7,
      tag: 'TECHNICAL STACK • ARCHITECTURE CHOICES',
      title: 'Engineered for Reliability &amp; Sub-Second Performance',
      subtitle: 'Modern TypeScript, Next.js 16, React 19, SQLite WAL, and Turbopack',
      content: (
        <div className="pres-slide-body">
          <div className="pres-card-grid-3">
            <div className="pres-card">
              <div className="pres-card-header-row">
                <Layers size={16} />
                <h3 className="pres-card-title">Next.js 16 &amp; React 19</h3>
              </div>
              <p className="pres-card-desc">
                App Router with Turbopack for instantaneous hot-reloading and sub-100ms API route responses. Zero external client state bloat.
              </p>
            </div>

            <div className="pres-card">
              <div className="pres-card-header-row">
                <Cpu size={16} />
                <h3 className="pres-card-title">SQLite WAL Mode</h3>
              </div>
              <p className="pres-card-desc">
                better-sqlite3 with Write-Ahead Logging. ACID-compliant state storage for runs, weekly modules, audited resources, and test evidence.
              </p>
            </div>

            <div className="pres-card">
              <div className="pres-card-header-row">
                <Sparkles size={16} />
                <h3 className="pres-card-title">Gemini 2.0 Flash</h3>
              </div>
              <p className="pres-card-desc">
                Google Generative AI SDK for curriculum topological sorting. Includes deterministic rule-based fallback for 100% offline reliability.
              </p>
            </div>
          </div>

          <div className="pres-quote-box" style={{ marginTop: 20 }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: 13, fontWeight: 700 }}>Design Philosophy: Editorial Precision</h4>
            <p className="pres-quote-text" style={{ fontSize: 12.5 }}>
              Bespoke vanilla CSS design system inspired by high-end typography and Swiss minimalism. Monospace data badges, subtle micro-interactions, zero layout shifts.
            </p>
          </div>
        </div>
      ),
    },

    // ── Slide 8: Conclusion & Links ─────────────────────────────────────────
    {
      id: 8,
      tag: 'CONCLUSION • AGENTIC AI HACKATHON 2026',
      title: 'Restoring Epistemic Truth to Education',
      subtitle: 'Guaranteed hours budgets, verified free courseware, and autonomous self-healing',
      content: (
        <div className="pres-slide-body">
          <div className="pres-card-grid-2">
            <div className="pres-card" style={{ background: '#111110', color: '#FFFFFF' }}>
              <h3 className="pres-card-title" style={{ color: '#FFFFFF', fontSize: 18 }}>Summary of Deliverables</h3>
              <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.8, marginTop: 12, color: '#D5D5D0' }}>
                <li><strong>TC1:</strong> 26-week / 130-hour exact mathematical constraint fit</li>
                <li><strong>TC2:</strong> Autonomous paywall detection and verified replacement</li>
                <li><strong>TC3:</strong> Active HTTP crawler link verification and self-healing</li>
                <li><strong>TC4:</strong> Incremental missing-session rerun with strict idempotency</li>
                <li><strong>HITL:</strong> Human approval gate for platform actions &amp; calendar blocks</li>
                <li><strong>Export:</strong> Universal RFC-5545 .ics calendar schedule download</li>
              </ul>
            </div>

            <div className="pres-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 className="pres-card-title">Ready for Review</h3>
                <p className="pres-card-desc">
                  Explore the live interactive application, run the official automated verification suite, or download the full presentation deck.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                <Link href="/" className="btn-header-cta" style={{ justifyContent: 'center' }}>
                  <span>Launch Live Path Builder</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href="/Episteme_AI_Presentation.pptx"
                  download
                  className="btn-secondary-light"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', fontWeight: 600 }}
                >
                  <Download size={14} />
                  <span>Download .pptx Slide Deck</span>
                </a>

                <a
                  href="/agent-architecture.svg"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary-light"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', fontSize: 12 }}
                >
                  <ExternalLink size={13} />
                  <span>View System Architecture SVG</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="page-wrapper" style={{ background: '#F4F4F1', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <header className="site-header">
        <div className="container">
          <div className="header-inner">
            <Link href="/" className="brand-link" title="Back to App">
              <span className="brand-text">Episteme</span>
              <span className="brand-sub-badge">Presentation Deck</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                Slide {currentSlide + 1} of {slides.length}
              </span>

              <a
                href="/Episteme_AI_Presentation.pptx"
                download
                className="btn-secondary-light"
                style={{ fontSize: 12, padding: '6px 12px' }}
                title="Download PowerPoint PPTX"
              >
                <Download size={13} /> Download .pptx
              </a>

              <Link href="/" className="btn-secondary-light" style={{ fontSize: 12, padding: '6px 12px' }}>
                Back to App
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Slide Deck Canvas */}
      <main className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 24px' }}>
        <div className="pres-slide-stage">
          {/* Slide Header */}
          <div className="pres-slide-header">
            <div className="pres-tag-badge">{slide.tag}</div>
            <h1 className="pres-slide-title">{slide.title}</h1>
            {slide.subtitle && <p className="pres-slide-subtitle">{slide.subtitle}</p>}
            <hr className="pres-divider" />
          </div>

          {/* Slide Content */}
          <div className="pres-slide-content-area">
            {slide.content}
          </div>

          {/* Slide Controls Footer */}
          <div className="pres-slide-footer">
            <div style={{ display: 'flex', gap: 6 }}>
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`pres-dot-btn ${currentSlide === idx ? 'active' : ''}`}
                  title={`Slide ${idx + 1}: ${s.title}`}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn-secondary-light"
                onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
                disabled={currentSlide === 0}
                style={{ padding: '8px 14px', fontSize: 13 }}
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button
                className="btn-secondary-light"
                onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
                disabled={currentSlide === slides.length - 1}
                style={{ padding: '8px 14px', fontSize: 13 }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

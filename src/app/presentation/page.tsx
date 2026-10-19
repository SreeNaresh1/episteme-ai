'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck,
  ExternalLink, Printer, Sparkles, Layers,
  Calendar, Check, AlertTriangle, RefreshCw, Cpu
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
    // Slide 1: Title
    {
      id: 1,
      tag: 'Build & Submit • Agentic AI Hackathon 2026',
      title: 'Episteme AI',
      subtitle: 'The Autonomous Self-Healing Epistemic Curriculum Engine',
      content: (
        <div style={{ textAlign: 'center', maxWidth: 820, margin: '36px auto 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 18px', borderRadius: 999, background: '#1c1c1c', border: '1px solid #333333', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ffffff' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#e5e5e5', letterSpacing: 0.8 }}>100% VERIFIED FREE • SELF-HEALING • MATHEMATICALLY BOUNDED</span>
          </div>
          <p style={{ fontSize: 19, lineHeight: 1.65, color: '#a3a3a3', marginBottom: 36 }}>
            Named after the classical philosophical concept of <strong style={{ color: '#ffffff' }}>ἐπιστήμη</strong> (justified, empirically verified knowledge vs unverified opinion). Episteme AI transforms ambitious career goals into topologically ordered, time-budgeted weekly roadmaps using 100% verified free public courseware.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: '20px 16px' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>130h Budget</div>
              <div style={{ fontSize: 12, color: '#888888', lineHeight: 1.5 }}>Exact mathematical constraint solver (5h/wk × 26 weeks)</div>
            </div>
            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: '20px 16px' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Self-Healing</div>
              <div style={{ fontSize: 12, color: '#888888', lineHeight: 1.5 }}>Real-time 404 &amp; paywall detection + hot-swap substitution</div>
            </div>
            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: '20px 16px' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Human Gate</div>
              <div style={{ fontSize: 12, color: '#888888', lineHeight: 1.5 }}>Idempotent calendar dispatch with explicit safety gates</div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 2: The Problem
    {
      id: 2,
      tag: '01 • Problem Statement',
      title: 'The "Free" Online Learning Trap',
      subtitle: 'Why 85% of self-directed learners abandon their ambitions',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 32 }}>
          <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: '#222222', border: '1px solid #333333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e5e5e5', marginBottom: 16 }}>
              <AlertTriangle size={18} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Surprise Paywalls</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#888888' }}>
              Courses advertised as "free" abruptly demand credit cards for graded assignments, certificates, or unlock gates midway through week 3.
            </p>
          </div>
          <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: '#222222', border: '1px solid #333333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e5e5e5', marginBottom: 16 }}>
              <RefreshCw size={18} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Dead Links &amp; 404s</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#888888' }}>
              Curricula decompose over time. Tutorials change domains, repositories get archived, and APIs deprecate, stranding students with broken materials.
            </p>
          </div>
          <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: '#222222', border: '1px solid #333333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e5e5e5', marginBottom: 16 }}>
              <Calendar size={18} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Time Budget Chaos</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#888888' }}>
              Generic LLMs generate unbudgeted 40-hour syllabi for people who only have 5 hours/week, guaranteeing cognitive overload and dropout.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 3: The Solution
    {
      id: 3,
      tag: '02 • The Episteme Solution',
      title: 'Epistemic Rigor Meets Agentic Automation',
      subtitle: 'A full-stack, closed-loop agent with self-healing curriculum integrity',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginTop: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 16, display: 'flex', gap: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 4, background: '#222222', border: '1px solid #383838', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                1
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>Mathematical Time-Budget Solver</h4>
                <p style={{ fontSize: 13, color: '#888888', margin: 0, lineHeight: 1.5 }}>
                  Takes available hours (e.g. 5h/wk) and horizon (26 weeks) to compute a strict 130h allocation. Every week is bounded with zero overflow.
                </p>
              </div>
            </div>
            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 16, display: 'flex', gap: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 4, background: '#222222', border: '1px solid #383838', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                2
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>Active Paywall &amp; Link Crawler</h4>
                <p style={{ fontSize: 13, color: '#888888', margin: 0, lineHeight: 1.5 }}>
                  Inspects actual HTTP status codes and domain heuristics. If a link goes paid (Udemy) or breaks (404), it hot-swaps verified free courseware.
                </p>
              </div>
            </div>
            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 16, display: 'flex', gap: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 4, background: '#222222', border: '1px solid #383838', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                3
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>Idempotent Calendar Engine</h4>
                <p style={{ fontSize: 13, color: '#888888', margin: 0, lineHeight: 1.5 }}>
                  Human gatekeeper controls simulated enrollment and exports standard RFC-5545 .ics calendars, with strict idempotency guards on rerun.
                </p>
              </div>
            </div>
          </div>
          <div style={{ background: '#141414', border: '1px solid #282828', borderRadius: 8, padding: 20 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#e5e5e5', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
              Verified Free Platforms Only
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: 12, color: '#a3a3a3' }}>
              <div style={{ padding: '8px 10px', background: '#1c1c1c', borderRadius: 4, border: '1px solid #282828' }}>✓ Coursera (Free Audit)</div>
              <div style={{ padding: '8px 10px', background: '#1c1c1c', borderRadius: 4, border: '1px solid #282828' }}>✓ Kaggle Learn</div>
              <div style={{ padding: '8px 10px', background: '#1c1c1c', borderRadius: 4, border: '1px solid #282828' }}>✓ Khan Academy</div>
              <div style={{ padding: '8px 10px', background: '#1c1c1c', borderRadius: 4, border: '1px solid #282828' }}>✓ freeCodeCamp</div>
              <div style={{ padding: '8px 10px', background: '#1c1c1c', borderRadius: 4, border: '1px solid #282828' }}>✓ Python &amp; Pandas Docs</div>
              <div style={{ padding: '8px 10px', background: '#1c1c1c', borderRadius: 4, border: '1px solid #282828' }}>✓ Microsoft Learn</div>
              <div style={{ padding: '8px 10px', background: '#1c1c1c', borderRadius: 4, border: '1px solid #282828' }}>✓ MIT OCW / CS50</div>
              <div style={{ padding: '8px 10px', background: '#1c1c1c', borderRadius: 4, border: '1px solid #282828' }}>✓ MDN Web Docs</div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 4: Multi-Agent Architecture
    {
      id: 4,
      tag: '03 • System Architecture',
      title: 'Coordinated Multi-Agent Architecture',
      subtitle: 'From unstructured ambition to verified, scheduled reality',
      content: (
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #282828', maxHeight: 370, display: 'flex', justifyContent: 'center', background: '#0e0e0e' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/agent-architecture.svg"
              alt="Episteme AI Multi-Agent Architecture"
              style={{ width: '100%', height: 'auto', maxHeight: 370, objectFit: 'contain' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12, fontSize: 12, color: '#737373' }}>
            <span>• <strong>Intake:</strong> Goal &amp; Constraint Solver</span>
            <span>• <strong>Reasoning:</strong> Gemini 2.0 Flash DAG</span>
            <span>• <strong>Auditing:</strong> HTTP Crawler &amp; Paywall Flag</span>
            <span>• <strong>Self-Healing:</strong> Dynamic Substitution Loop</span>
            <span>• <strong>Safety:</strong> Idempotent Calendar Dispatch</span>
          </div>
        </div>
      ),
    },

    // Slide 5: Official Scenarios (TC1-TC4)
    {
      id: 5,
      tag: '04 • Test Evidence & Benchmarks',
      title: 'Official Hackathon Test Cases (4/4 Passed)',
      subtitle: 'Deterministic, automated verification against live database transactions',
      content: (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>TC1: 6 Months @ 5 h/week</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#262626', border: '1px solid #404040', color: '#f5f5f5' }}>PASSED</span>
              </div>
              <div style={{ fontSize: 12, color: '#a3a3a3', lineHeight: 1.5 }}>
                <strong>Actual:</strong> 26/26 weeks generated. Total hours: 130/130 (exact match). Per-week limit (≤5h) respected: true. All resources valid &amp; free.
              </div>
            </div>

            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>TC2: Course Becomes Paid</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#262626', border: '1px solid #404040', color: '#f5f5f5' }}>PASSED</span>
              </div>
              <div style={{ fontSize: 12, color: '#a3a3a3', lineHeight: 1.5 }}>
                <strong>Actual:</strong> Paid course detected (Udemy pattern). Replaced with freeCodeCamp Data Analysis with Python. Verified live_free &amp; saved to DB.
              </div>
            </div>

            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>TC3: Broken Link (404/DNS)</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#262626', border: '1px solid #404040', color: '#f5f5f5' }}>PASSED</span>
              </div>
              <div style={{ fontSize: 12, color: '#a3a3a3', lineHeight: 1.5 }}>
                <strong>Actual:</strong> Network error/unreachable caught. Replacement found, re-checked via HTTP ping (status=live_free), and hot-swapped into curriculum.
              </div>
            </div>

            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>TC4: Rerun / Idempotency</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#262626', border: '1px solid #404040', color: '#f5f5f5' }}>PASSED</span>
              </div>
              <div style={{ fontSize: 12, color: '#a3a3a3', lineHeight: 1.5 }}>
                <strong>Actual:</strong> Existing completed weeks preserved. Missing sessions: 0. Duplicate calendar action blocked via idempotency key. Sessions: 4 before / 4 after.
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 6: Self-Healing & Paywall Heuristics
    {
      id: 6,
      tag: '05 • Autonomous Self-Healing',
      title: 'Real-Time Paywall Detection & Self-Healing',
      subtitle: 'How Episteme maintains 100% curriculum freshness over time',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
          <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={16} />
              Paywall Classification Heuristics
            </h4>
            <ul style={{ fontSize: 13, color: '#888888', lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
              <li><strong>Known Paid Traps:</strong> Matches domains requiring subscription (Udemy, Pluralsight, Skillshare, MasterClass).</li>
              <li><strong>Free Audit Whitelist:</strong> Explicitly audits free enrollment endpoints on Coursera, Kaggle, Khan Academy, and OpenCourseWare.</li>
              <li><strong>Timestamped Audits:</strong> Every link check records exact HTTP status codes and audit timestamps.</li>
            </ul>
          </div>
          <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} />
              Closed-Loop Hot-Swap Substitution
            </h4>
            <ul style={{ fontSize: 13, color: '#888888', lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
              <li><strong>Topic-Indexed Pool:</strong> Matches Python, SQL, Statistics, or Machine Learning tags to candidate courses.</li>
              <li><strong>Two-Step Re-Verification:</strong> Never swaps in an unverified replacement — candidate URL must pass a live HTTP ping first.</li>
              <li><strong>Audit Lineage:</strong> Tracks <code>replaced_by</code> and <code>replacement_reason</code> directly in SQLite.</li>
            </ul>
          </div>
        </div>
      ),
    },

    // Slide 7: Safety & Calendar Export
    {
      id: 7,
      tag: '06 • Governance & Scheduling',
      title: 'Human-in-the-Loop Gateway & Calendar Export',
      subtitle: 'Safe agent execution that integrates directly into the learner’s lifestyle',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
          <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 20 }}>
            <div style={{ width: 34, height: 34, borderRadius: 6, background: '#222222', border: '1px solid #333333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: 12 }}>
              <ShieldCheck size={18} />
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>Explicit Human Gate</h4>
            <p style={{ fontSize: 13, color: '#888888', lineHeight: 1.6 }}>
              No automated action occurs blindly. When calendar blocks or platform enrollments are scheduled, the agent halts at a Human-in-the-Loop approval gate displaying proposed hours, platforms, and curriculum breakdown.
            </p>
          </div>
          <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 20 }}>
            <div style={{ width: 34, height: 34, borderRadius: 6, background: '#222222', border: '1px solid #333333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: 12 }}>
              <Calendar size={18} />
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>RFC-5545 iCalendar (.ics) Export</h4>
            <p style={{ fontSize: 13, color: '#888888', lineHeight: 1.6 }}>
              Converts weekly commitments into actionable calendar events scheduled on recurring study windows. Fully compatible with Google Calendar, Apple Calendar, and Outlook with 1-click import.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 8: Summary & Roadmap
    {
      id: 8,
      tag: '07 • Conclusion & Roadmap',
      title: 'Episteme AI: The Future of Autonomous Learning',
      subtitle: 'Zero tuition paywalls. Zero dead links. Proven mathematical mastery.',
      content: (
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Phase 1 (Delivered)</div>
              <div style={{ fontSize: 12, color: '#888888', lineHeight: 1.5 }}>Constraint solver, Gemini DAG, HTTP link auditor, paywall heuristics, SQLite WAL, RFC-5545 export.</div>
            </div>
            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Phase 2 (Next)</div>
              <div style={{ fontSize: 12, color: '#888888', lineHeight: 1.5 }}>Discord/Slack study companion bot, weekly automated GitHub Actions link re-auditing cron.</div>
            </div>
            <div style={{ background: '#161616', border: '1px solid #2b2b2b', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Phase 3 (Vision)</div>
              <div style={{ fontSize: 12, color: '#888888', lineHeight: 1.5 }}>Decentralized, open-access courseware registry with peer-attested free certification audits.</div>
            </div>
          </div>
          <div style={{ display: 'inline-flex', gap: 14 }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px',
                borderRadius: 6, background: '#ffffff', color: '#111110', fontWeight: 700, fontSize: 13, textDecoration: 'none'
              }}
            >
              Launch Live App <ExternalLink size={15} />
            </Link>
            <a
              href="https://github.com/SreeNaresh1/episteme-ai"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px',
                borderRadius: 6, background: '#1c1c1c', color: '#f5f5f5', fontWeight: 600, fontSize: 13, textDecoration: 'none', border: '1px solid #333333'
              }}
            >
              View GitHub Repository <ExternalLink size={15} />
            </a>
          </div>
        </div>
      ),
    },
  ];

  const current = slides[currentSlide];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0e', color: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar (Clean Monochrome) */}
      <header style={{ height: 60, borderBottom: '1px solid #222222', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: '#121212' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#888888', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <span style={{ color: '#2a2a2a' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffffff' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff', letterSpacing: 0.3 }}>Episteme AI Presentation Deck</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 4, background: '#1c1c1c', color: '#e5e5e5', border: '1px solid #2e2e2e', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}
            title="Print or Save as PDF"
          >
            <Printer size={13} /> Print / Save PDF
          </button>
          <a
            href="https://github.com/SreeNaresh1/episteme-ai"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 4, background: '#1c1c1c', color: '#e5e5e5', border: '1px solid #2e2e2e', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}
          >
            GitHub Repo <ExternalLink size={12} />
          </a>
        </div>
      </header>

      {/* Main Slide Card (Minimalist Charcoal/Black) */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 24px' }}>
        <div
          style={{
            width: '100%',
            maxWidth: 1020,
            minHeight: 540,
            background: '#121212',
            border: '1px solid #242424',
            borderRadius: 12,
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            padding: '36px 44px',
            position: 'relative',
          }}
        >
          {/* Slide Tag / Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#888888', textTransform: 'uppercase', letterSpacing: 1.2 }}>
              {current.tag}
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#666666' }}>
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>

          <h2 style={{ fontSize: 30, fontWeight: 800, color: '#ffffff', margin: '0 0 6px', letterSpacing: -0.5 }}>
            {current.title}
          </h2>
          <p style={{ fontSize: 15, color: '#888888', margin: 0 }}>
            {current.subtitle}
          </p>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {current.content}
          </div>
        </div>
      </main>

      {/* Slide Navigation Controls */}
      <footer style={{ height: 68, borderTop: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: '#0e0e0e' }}>
        <button
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 6,
            background: currentSlide === 0 ? '#141414' : '#1c1c1c',
            color: currentSlide === 0 ? '#444444' : '#e5e5e5',
            border: '1px solid #282828', cursor: currentSlide === 0 ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: 13
          }}
        >
          <ArrowLeft size={15} /> Previous
        </button>

        {/* Slide Indicators */}
        <div style={{ display: 'flex', gap: 6 }}>
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: currentSlide === idx ? '#ffffff' : '#2b2b2b',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
          disabled={currentSlide === slides.length - 1}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 6,
            background: currentSlide === slides.length - 1 ? '#141414' : '#ffffff',
            color: currentSlide === slides.length - 1 ? '#444444' : '#111110',
            border: currentSlide === slides.length - 1 ? '1px solid #282828' : 'none',
            cursor: currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 13
          }}
        >
          Next <ArrowRight size={15} />
        </button>
      </footer>
    </div>
  );
}

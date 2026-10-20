'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, AlertTriangle,
  XCircle, Target, BarChart3, ExternalLink,
  RefreshCw, ChevronDown, ChevronUp,
  Shield, Info, ShieldCheck,
  Sparkles, Search, Play, Check,
  Download, Layers, Cpu, ArrowRight
} from 'lucide-react';
import { generateIcsCalendar, downloadIcsFile } from '@/lib/calendarExport';
import {
  extractGoalParameters,
  assessFeasibility,
  SkillLevel,
  LearnerPace,
  LifeSituation
} from '@/lib/pathGenerator';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Resource {
  id: string;
  title: string;
  url: string;
  platform: string;
  is_free: number;
  link_status: string;
  link_checked_at: string | null;
  link_http_status: number | null;
  classification_reason: string | null;
  replaced_by: string | null;
  replacement_reason: string | null;
}

interface Week {
  id: string;
  week_number: number;
  title: string;
  description: string;
  hours_allocated: number;
  resources: Resource[];
}

interface Action {
  id: string;
  action_type: string;
  description: string;
  proposed_data: string;
  status: string;
}

interface TestResult {
  id: string;
  tc_id: string;
  scenario: string;
  expected: string;
  actual: string | null;
  status: string;
  evidence: string | null;
  created_at: string;
  label?: string;
  goal?: string;
}

interface Run {
  id: string;
  label: string;
  goal: string;
  level: string;
  weekly_hours: number;
  horizon_weeks: number;
  total_hours: number;
  status: string;
  test_case: string | null;
  source?: string;
  created_at: string;
}

interface RunDetail {
  id: string;
  run: Run;
  weeks: Week[];
  actions: Action[];
  test_results: TestResult[];
}

// ── Presets ───────────────────────────────────────────────────────────────────
const PRESET_GOALS = [
  {
    badge: 'Official Hackathon Assignment',
    title: 'Data Analyst in 6mo @ 5h/wk',
    desc: 'The exact assigned problem statement. 26 weeks, 130 hours budget, 100% verified free resources.',
    goal: 'I want to become a data analyst in 6 months with 5 hours a week',
    level: 'beginner',
    weekly_hours: 5,
    horizon_weeks: 26,
    label: 'Data Analyst — 6 Months @ 5h/wk (Official Entry)',
    icon: '🎯',
    featured: true,
  },
  {
    badge: 'Software Engineering',
    title: 'Full-Stack Developer in 4mo @ 8h/wk',
    desc: 'Frontend to backend roadmap. 16 weeks, 128 hours, HTML, CSS, JavaScript, React, Node, and SQL.',
    goal: 'I want to become a full-stack web developer in 4 months with 8 hours a week',
    level: 'beginner',
    weekly_hours: 8,
    horizon_weeks: 16,
    label: 'Full-Stack Web Dev — 16 Weeks @ 8h/wk',
    icon: '⚡',
    featured: false,
  },
  {
    badge: 'Artificial Intelligence',
    title: 'Machine Learning in 6mo @ 6h/wk',
    desc: 'Math foundations, Python, Pandas, Scikit-Learn, and Deep Learning with verified Kaggle & fast.ai.',
    goal: 'I want to learn machine learning and data science in 6 months with 6 hours a week',
    level: 'intermediate',
    weekly_hours: 6,
    horizon_weeks: 26,
    label: 'Machine Learning — 26 Weeks @ 6h/wk',
    icon: '🤖',
    featured: false,
  },
  {
    badge: 'Security Operations',
    title: 'Cybersecurity Analyst in 5mo @ 5h/wk',
    desc: 'Computer networks, Linux administration, defensive security, and penetration testing fundamentals.',
    goal: 'I want to become a cybersecurity analyst in 5 months with 5 hours a week',
    level: 'beginner',
    weekly_hours: 5,
    horizon_weeks: 20,
    label: 'Cybersecurity — 20 Weeks @ 5h/wk',
    icon: '🛡️',
    featured: false,
  },
  {
    badge: 'Programming Core',
    title: 'Python Developer in 3mo @ 6h/wk',
    desc: 'Python syntax, data structures, automation, OOP, and web APIs with Coursera, Kaggle & official docs.',
    goal: 'I want to learn Python programming from scratch in 3 months with 6 hours a week',
    level: 'beginner',
    weekly_hours: 6,
    horizon_weeks: 12,
    label: 'Python Developer — 12 Weeks @ 6h/wk',
    icon: '🐍',
    featured: false,
  },
  {
    badge: 'Cloud & Infrastructure',
    title: 'Cloud DevOps in 4mo @ 6h/wk',
    desc: 'Linux administration, Docker containers, Kubernetes, CI/CD pipelines, and Azure/AWS free tiers.',
    goal: 'I want to become a cloud devops engineer in 4 months with 6 hours a week',
    level: 'intermediate',
    weekly_hours: 6,
    horizon_weeks: 16,
    label: 'Cloud DevOps — 16 Weeks @ 6h/wk',
    icon: '☁️',
    featured: false,
  },
  {
    badge: 'Big Data & Pipelines',
    title: 'Data Engineer in 5mo @ 6h/wk',
    desc: 'PostgreSQL, Apache Spark, distributed computing, Delta Lake, Docker, and Apache Airflow pipelines.',
    goal: 'I want to become a data engineer in 5 months with 6 hours a week',
    level: 'beginner',
    weekly_hours: 6,
    horizon_weeks: 20,
    label: 'Data Engineering — 20 Weeks @ 6h/wk',
    icon: '⚡',
    featured: false,
  },
  {
    badge: 'Mobile Engineering',
    title: 'Mobile App Developer in 4mo @ 6h/wk',
    desc: 'Cross-platform app development with Flutter, Dart, Android Jetpack Compose, and state management.',
    goal: 'I want to become a mobile app developer in 4 months with 6 hours a week',
    level: 'beginner',
    weekly_hours: 6,
    horizon_weeks: 16,
    label: 'Mobile App Dev — 16 Weeks @ 6h/wk',
    icon: '📱',
    featured: false,
  },
  {
    badge: 'Product Experience',
    title: 'UI/UX Designer in 3mo @ 5h/wk',
    desc: 'User research, wireframing, interactive prototyping in Figma, Laws of UX, and design system tokens.',
    goal: 'I want to learn UI/UX product design in 3 months with 5 hours a week',
    level: 'beginner',
    weekly_hours: 5,
    horizon_weeks: 12,
    label: 'UI/UX Design — 12 Weeks @ 5h/wk',
    icon: '🎨',
    featured: false,
  },
] as const;

// ── 4-Step Agent Workflow ─────────────────────────────────────────────────────
const AGENT_WORKFLOW_STEPS = [
  {
    num: '01',
    title: 'Collect the details',
    desc: 'Collects goal, starting level, weekly hours budget, and horizon. Generates validated, immutable records.',
  },
  {
    num: '02',
    title: 'Plan the next steps',
    desc: 'Constructs prerequisite dependency DAGs and fits them realistically into available hours without overload.',
  },
  {
    num: '03',
    title: 'Find the information',
    desc: 'Crawls public course pages via live HTTP HEAD; paywall detection & self-healing link substitution.',
  },
  {
    num: '04',
    title: 'Take action (Human Gate)',
    desc: 'Human approval required before simulated enrolment and calendar block scheduling with idempotency.',
  },
];

// ── Episteme Constellation Geometric Dotted Logo ─────────────────────────────
function EpistemeBrandLogo() {
  return (
    <div className="brand-glyph" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Central epistemic core node */}
        <circle cx="14" cy="14" r="3.2" fill="#111110" />
        {/* Outer 8 orbital verification nodes */}
        <circle cx="14" cy="4" r="2" fill="#111110" />
        <circle cx="21.07" cy="6.93" r="2" fill="#111110" />
        <circle cx="24" cy="14" r="2" fill="#111110" />
        <circle cx="21.07" cy="21.07" r="2" fill="#111110" />
        <circle cx="14" cy="24" r="2" fill="#111110" />
        <circle cx="6.93" cy="21.07" r="2" fill="#111110" />
        <circle cx="4" cy="14" r="2" fill="#111110" />
        <circle cx="6.93" cy="6.93" r="2" fill="#111110" />
      </svg>
    </div>
  );
}

// ── Status badge ─────────────────────────────────────────────────────────────
function RunStatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    generating:      { cls: 'badge-neutral-gray', label: 'Generating' },
    ready:           { cls: 'badge-live-green',   label: 'Ready' },
    verified:        { cls: 'badge-live-green',   label: 'Verified Free' },
    active:          { cls: 'badge-neutral-gray', label: 'Active Plan' },
    needs_review:    { cls: 'badge-warn-amber',   label: 'Needs Review' },
    testing:         { cls: 'badge-neutral-gray', label: 'Testing' },
    failed:          { cls: 'badge-err-red',      label: 'Failed' },
    pending:         { cls: 'badge-neutral-gray', label: 'Pending' },
  };
  const b = map[status] ?? { cls: 'badge-neutral-gray', label: status };
  return <span className={`clean-badge ${b.cls}`}>{b.label}</span>;
}

// ── Link status badge ─────────────────────────────────────────────────────────
function LinkStatusBadge({ status }: { status: string }) {
  if (status === 'live_free')    return <span className="clean-badge badge-live-green"><Check size={11} />Live &amp; Free</span>;
  if (status === 'live_unknown') return <span className="clean-badge badge-warn-amber"><AlertTriangle size={11} />Live (unverified)</span>;
  if (status === 'paid')         return <span className="clean-badge badge-warn-amber"><AlertTriangle size={11} />Paywalled</span>;
  if (status === 'broken')       return <span className="clean-badge badge-err-red"><XCircle size={11} />Broken (404)</span>;
  return <span className="clean-badge badge-neutral-gray">Unchecked</span>;
}

// ── TC status badge ──────────────────────────────────────────────────────────
function TCBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    passed: 'badge-live-green', failed: 'badge-err-red',
    partial: 'badge-warn-amber', error: 'badge-err-red', pending: 'badge-neutral-gray',
  };
  return <span className={`clean-badge ${map[status] ?? 'badge-neutral-gray'}`}>{status.toUpperCase()}</span>;
}

// ── Platform abbreviation ─────────────────────────────────────────────────────
function platformAbbr(platform: string): string {
  const map: Record<string, string> = {
    'Coursera': 'Coursera Audit', 'Kaggle': 'Kaggle Learn', 'Khan Academy': 'Khan Academy',
    'freeCodeCamp': 'freeCodeCamp', 'MDN': 'MDN Docs', 'Python Docs': 'Python Docs',
    'The Odin Project': 'Odin Project', 'Microsoft Learn': 'MS Learn',
    'Google': 'Google Developers', 'Mode Analytics': 'Mode SQL', 'Tableau Public': 'Tableau',
    'Seaborn': 'Seaborn Docs', 'Matplotlib': 'Matplotlib', 'Pandas': 'Pandas Docs',
    'React': 'React Docs', 'Fast.ai': 'Fast.ai',
  };
  return map[platform] ?? platform;
}

// ── Resource item with Self-Healing display ──────────────────────────────────
function ResourceItem({ r }: { r: Resource }) {
  const displayUrl = r.replaced_by ?? r.url;
  const isReplaced = !!r.replaced_by;

  return (
    <div className="resource-clean-card">
      <div className="resource-row-top">
        <a href={displayUrl} target="_blank" rel="noopener noreferrer" className="resource-link-anchor">
          <span>{r.title}</span>
          <ExternalLink size={12} style={{ opacity: 0.6 }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="clean-badge badge-neutral-gray mono" style={{ fontSize: 10.5 }}>{platformAbbr(r.platform)}</span>
          <LinkStatusBadge status={r.link_status} />
        </div>
      </div>

      {isReplaced && (
        <div className="self-heal-callout">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
            <Sparkles size={12} />
            <span>Autonomous Self-Healing: Replaced with Verified Free Course</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 11.5 }}>
            Original source was flagged ({r.classification_reason ?? 'unavailable'}). Automatically substituted with verified free alternative.
          </div>
        </div>
      )}
    </div>
  );
}

// ── Auto-Dismissing Toast Item (4-Second Auto Dismiss) ────────────────────────
function EditorialToastItem({
  toast,
  onClose,
}: {
  toast: { id: string; message: string; type: 'success' | 'error' | 'info' };
  onClose: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div className="editorial-toast" role="alert">
      {toast.type === 'success' && <CheckCircle2 size={15} color="var(--status-live)" />}
      {toast.type === 'error' && <XCircle size={15} color="var(--status-err)" />}
      {toast.type === 'info' && <Info size={15} color="#38bdf8" />}
      <span>{toast.message}</span>
      <button
        className="nav-link-btn"
        style={{ marginLeft: 8, color: '#fff', fontSize: 16, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}
        onClick={() => onClose(toast.id)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [tab, setTab] = useState<'builder' | 'runs' | 'testcases'>('builder');
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, message, type }]);
  }, []);
  const removeToast = useCallback((id: string) => setToasts(t => t.filter(x => x.id !== id)), []);

  // Form State with Human Learner Persona & Capacity Modeling
  const [form, setForm] = useState({
    goal: 'I want to become a data analyst in 6 months with 5 hours a week',
    level: 'beginner' as SkillLevel,
    pace: 'balanced' as LearnerPace,
    situation: 'working_professional' as LifeSituation,
    weekly_hours: 5,
    horizon_weeks: 26,
    label: 'Data Analyst — 6 Months @ 5h/wk (Official Entry)',
  });
  const [building, setBuilding] = useState(false);
  const [currentDetail, setCurrentDetail] = useState<RunDetail | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());
  const [showEvidence, setShowEvidence] = useState<string | null>(null);
  const [approving, setApproving] = useState<string | null>(null);

  // Runs State
  const [runs, setRuns] = useState<Run[]>([]);
  const [loadingRuns, setLoadingRuns] = useState(false);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  // Tests State
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [runningTests, setRunningTests] = useState(false);
  const [loadingTests, setLoadingTests] = useState(false);

  const loadRunDetail = useCallback(async (runId: string) => {
    try {
      const res = await fetch(`/api/runs/${runId}`);
      const data = await res.json() as { run: Run; weeks: Week[]; actions: Action[]; test_results: TestResult[] };
      setCurrentDetail({ id: runId, ...data });
      setSelectedRunId(runId);
      if (data.weeks && data.weeks.length > 0 && data.weeks[0]) {
        setExpandedWeeks(new Set([data.weeks[0].id]));
      }
    } catch {
      addToast('Failed to load run details', 'error');
    }
  }, [addToast]);

  const loadRuns = useCallback(async () => {
    setLoadingRuns(true);
    try {
      const res = await fetch('/api/runs');
      const data = await res.json() as { runs: Run[] };
      setRuns(data.runs ?? []);
    } catch {
      addToast('Failed to load runs', 'error');
    } finally {
      setLoadingRuns(false);
    }
  }, [addToast]);

  const loadTestResults = useCallback(async () => {
    setLoadingTests(true);
    try {
      const res = await fetch('/api/testcases');
      const data = await res.json() as { results: TestResult[] };
      setTestResults(data.results ?? []);
    } catch {
      addToast('Failed to load test results', 'error');
    } finally {
      setLoadingTests(false);
    }
  }, [addToast]);

  // Initial tab loading without cascading setState in effect
  useEffect(() => {
    let active = true;
    if (tab === 'runs') {
      fetch('/api/runs')
        .then(res => res.json() as Promise<{ runs: Run[] }>)
        .then(data => {
          if (active) setRuns(data.runs ?? []);
        })
        .catch(() => {
          if (active) addToast('Failed to load runs', 'error');
        });
    } else if (tab === 'testcases') {
      fetch('/api/testcases')
        .then(res => res.json() as Promise<{ results: TestResult[] }>)
        .then(data => {
          if (active) setTestResults(data.results ?? []);
        })
        .catch(() => {
          if (active) addToast('Failed to load test results', 'error');
        });
    }
    return () => {
      active = false;
    };
  }, [tab, addToast]);

  // Compute live smart parameters from user's input
  const smartParams = extractGoalParameters(form.goal);

  // Compute live workload feasibility and cognitive overload diagnostic
  const feasibility = assessFeasibility(
    smartParams.domain,
    form.level as SkillLevel,
    form.weekly_hours,
    form.horizon_weeks,
    form.pace
  );

  const handleBuild = async () => {
    if (!form.goal.trim()) { addToast('Please enter your learning goal', 'error'); return; }
    setBuilding(true);
    setCurrentDetail(null);
    try {
      const activeLabel = form.label.trim() && !form.label.includes('Official Entry')
        ? form.label.trim()
        : smartParams.label;

      const res = await fetch('/api/runs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: form.goal.trim(),
          level: form.level,
          pace: form.pace,
          situation: form.situation,
          weekly_hours: form.weekly_hours,
          horizon_weeks: form.horizon_weeks,
          label: activeLabel,
        }),
      });
      const data = await res.json() as { run_id?: string; weeks_count?: number; total_hours?: number; error?: string };
      if (!res.ok) {
        addToast(data.error || 'Path generation failed', 'error');
        return;
      }
      addToast(`Generated ${data.weeks_count}-week plan (${data.total_hours} hours total)`, 'success');
      if (data.run_id) {
        await loadRunDetail(data.run_id);
      }
    } catch (err) {
      addToast(`Failed to generate learning path: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error');
    } finally {
      setBuilding(false);
    }
  };

  const handleVerify = async () => {
    if (!currentDetail) return;
    setVerifying(true);
    try {
      const res = await fetch(`/api/runs/${currentDetail.id}/verify`, { method: 'POST' });
      const data = await res.json() as {
        summary?: { total: number; live_free: number; paid: number; broken: number; replacements_inserted: number };
        run_status?: string;
        error?: string;
      };
      if (!res.ok) {
        addToast(data.error || 'Verification failed', 'error');
        return;
      }
      if (data.summary) {
        addToast(
          `Link audit complete: ${data.summary.live_free}/${data.summary.total} verified free (${data.summary.replacements_inserted} self-healed)`,
          data.summary.replacements_inserted > 0 ? 'info' : 'success'
        );
      }
      await loadRunDetail(currentDetail.id);
    } catch (err) {
      addToast(`Verification failed: ${err instanceof Error ? err.message : 'Network error'}`, 'error');
    } finally {
      setVerifying(false);
    }
  };

  const handleInjectDemo = async (type: 'udemy' | 'broken') => {
    if (!currentDetail) return;
    try {
      const res = await fetch(`/api/runs/${currentDetail.id}/inject-demo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      const data = await res.json() as { message?: string; error?: string; week_id?: string };
      if (!res.ok) {
        addToast(data.error || 'Failed to inject demo resource', 'error');
        return;
      }
      addToast(data.message || 'Demo resource injected', 'info');
      await loadRunDetail(currentDetail.id);
      if (data.week_id) {
        setExpandedWeeks(prev => new Set([...prev, data.week_id!]));
      }
    } catch (err) {
      addToast(`Failed to inject demo resource: ${err instanceof Error ? err.message : 'Network error'}`, 'error');
    }
  };

  const handleApprove = async (actionId: string, decision: 'approve' | 'reject') => {
    if (!currentDetail) return;
    setApproving(actionId);
    try {
      const res = await fetch(`/api/runs/${currentDetail.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action_id: actionId, decision }),
      });
      const data = await res.json() as { message?: string; error?: string };
      if (!res.ok) {
        if (res.status === 409) {
          addToast('Idempotency protected: Action already executed', 'info');
        } else {
          addToast(data.error || 'Approval action failed', 'error');
        }
      } else {
        addToast(data.message || 'Action completed successfully', 'success');
      }
      await loadRunDetail(currentDetail.id);
    } catch (err) {
      addToast(`Failed to execute action: ${err instanceof Error ? err.message : 'Network error'}`, 'error');
    } finally {
      setApproving(null);
    }
  };

  const handleRunTests = async () => {
    setRunningTests(true);
    try {
      const res = await fetch('/api/testcases', { method: 'POST' });
      const data = await res.json() as { results: Array<{ status: string }>; total: number; passed: number };
      if (!res.ok) { addToast('Test run failed', 'error'); return; }
      addToast(`Official Test Suite: ${data.passed}/${data.total} passed`, data.passed === data.total ? 'success' : 'info');
      await loadTestResults();
    } catch {
      addToast('Test run failed', 'error');
    } finally {
      setRunningTests(false);
    }
  };

  const toggleWeek = (id: string) =>
    setExpandedWeeks(prev => {
      const s = new Set(prev);
      if (s.has(id)) {
        s.delete(id);
      } else {
        s.add(id);
      }
      return s;
    });

  const totalHours = form.weekly_hours * form.horizon_weeks;

  return (
    <div className="page-wrapper">

      {/* ── Navigation Header (Zaro Clean Minimalist Style) ────────────────── */}
      <header className="site-header">
        <div className="container">
          <div className="header-inner">
            <button
              className="brand-link"
              onClick={() => { setTab('builder'); }}
              title="Episteme AI Home"
            >
              <EpistemeBrandLogo />
              <span className="brand-text">Episteme</span>
              <span className="brand-sub-badge">Agentic AI 2026</span>
            </button>

            <nav className="header-nav">
              <button
                className={`nav-link-btn ${tab === 'builder' ? 'active' : ''}`}
                onClick={() => setTab('builder')}
              >
                Path Builder
              </button>
              <button
                className={`nav-link-btn ${tab === 'runs' ? 'active' : ''}`}
                onClick={() => setTab('runs')}
              >
                All Runs &amp; Evidence
              </button>
              <button
                className={`nav-link-btn ${tab === 'testcases' ? 'active' : ''}`}
                onClick={() => setTab('testcases')}
              >
                Official Test Cases (4/4)
              </button>
              <Link
                href="/presentation"
                className="nav-link-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
              >
                <span>Presentation</span>
                <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 4, background: '#111110', color: '#fff', fontWeight: 800 }}>SLIDES</span>
              </Link>
            </nav>

            <div className="header-cta-group">
              <button
                id="header-view-tests"
                className="nav-link-btn"
                style={{ fontWeight: 600, color: 'var(--text-secondary)' }}
                onClick={() => setTab('testcases')}
              >
                <ShieldCheck size={14} color="var(--status-live)" />
                <span>Verification Suite</span>
              </button>

              <button
                id="header-build-cta"
                className="btn-header-cta"
                onClick={() => { setTab('builder'); handleBuild(); }}
                disabled={building}
              >
                <span>{building ? 'Building…' : 'Build Path'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ──────────────────────────────────────────────── */}
      <main className="container" style={{ flex: 1, paddingBottom: 64 }}>

        {/* ══════════════════════════════════════════════════════════
            BUILDER TAB
        ══════════════════════════════════════════════════════════ */}
        {tab === 'builder' && (
          <div>
            {/* Hero Section: Zaro Style with Huge Typography & Layered Timeline */}
            <section className="hero-section">
              <div className="hero-content">
                <div className="hero-label-chip">
                  <Sparkles size={12} />
                  <span>AUTONOMOUS AGENT · EDUCATION &amp; CAREER PATH BUILDER</span>
                </div>
                <h1 className="hero-headline">
                  Autonomous learning paths.<br />
                  Zero tuition. Verified free.
                </h1>
                <p className="hero-description">
                  Turn ambitious career goals into scheduled, verified paths of public resources.
                  Ordered by prerequisites and fitted strictly to your weekly time budget,
                  with autonomous link self-healing and human-in-the-loop calendar synchronization.
                </p>

                <div className="hero-cta-row">
                  <button
                    id="hero-solve-button"
                    className="btn-primary-dark"
                    onClick={handleBuild}
                    disabled={building}
                  >
                    <span>{building ? 'Generating Path…' : 'Build Learning Path'}</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    id="hero-tests-button"
                    className="btn-secondary-light"
                    onClick={() => setTab('testcases')}
                  >
                    <ShieldCheck size={14} />
                    <span>Inspect 4 Test Scenarios</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Layered Timeline Card (Inspired by Zaro's Layered Plane) */}
              <div className="hero-visual-card">
                <div className="visual-top-meta">
                  <span>Prerequisite Dependency Topology</span>
                  <span style={{ color: 'var(--status-live)' }}>● 100% Zero-Cost Guarantee</span>
                </div>

                <div className="timeline-ladder">
                  <div className="timeline-tier active">
                    <span className="tier-dot-marker" />
                    <div className="tier-meta">MONTH 1</div>
                    <div className="tier-content">
                      <div className="tier-title">Foundations &amp; Python Syntax</div>
                      <div className="tier-desc">Basic programming, variables, control flow, functions</div>
                    </div>
                    <span className="tier-badge">Live &amp; Free</span>
                  </div>

                  <div className="timeline-tier active">
                    <span className="tier-dot-marker" />
                    <div className="tier-meta">MONTH 2–3</div>
                    <div className="tier-content">
                      <div className="tier-title">Core Skills: SQL &amp; Pandas</div>
                      <div className="tier-desc">Relational databases, filtering, grouping, data wrangling</div>
                    </div>
                    <span className="tier-badge">Live &amp; Free</span>
                  </div>

                  <div className="timeline-tier active">
                    <span className="tier-dot-marker" />
                    <div className="tier-meta">MONTH 4–5</div>
                    <div className="tier-content">
                      <div className="tier-title">Applied Practice &amp; Visualization</div>
                      <div className="tier-desc">Tableau Public, Seaborn, Matplotlib, real datasets</div>
                    </div>
                    <span className="tier-badge">Live &amp; Free</span>
                  </div>

                  <div className="timeline-tier active">
                    <span className="tier-dot-marker" />
                    <div className="tier-meta">MONTH 6</div>
                    <div className="tier-content">
                      <div className="tier-title">Portfolio &amp; Capstone Case Study</div>
                      <div className="tier-desc">End-to-end data pipeline, GitHub project showcase</div>
                    </div>
                    <span className="tier-badge">Career Ready</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Sources Bar (Zaro "Built by / Backed by" Style) */}
            <div className="sources-bar">
              <div className="sources-bar-label">
                OFFICIALLY AUDITED ZERO-COST PUBLIC RESOURCE PROVIDERS
              </div>
              <div className="sources-grid">
                {[
                  'Coursera (Free Audit Tier)',
                  'Kaggle Learn',
                  'Khan Academy',
                  'freeCodeCamp',
                  'MIT OpenCourseWare',
                  'MDN Web Docs',
                  'Harvard University (CS50)',
                  'Microsoft Learn',
                  'Google Developers & web.dev',
                  'Mode Analytics SQL',
                  'Python Software Foundation',
                  'PostgreSQL Documentation',
                  'Fast.ai Practical Deep Learning',
                  'Linux Foundation Free Training',
                  'Docker Official Documentation',
                  'Kubernetes Tutorials',
                  'PortSwigger Web Security Academy',
                  'OWASP Foundation',
                ].map(provider => (
                  <div key={provider} className="source-pill-box">
                    <span>{provider}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preset Problem Scenarios Section */}
            <section className="presets-section">
              <div className="section-eyebrow">EXPLORE SCENARIOS</div>
              <h2 className="section-heading-v2">One-Click Problem Presets</h2>
              <div className="presets-card-grid">
                {PRESET_GOALS.map((p, idx) => (
                  <div
                    key={idx}
                    className={`preset-interactive-card ${p.featured ? 'featured-card' : ''}`}
                    onClick={() => {
                      setForm(prev => ({
                        ...prev,
                        goal: p.goal,
                        level: p.level as SkillLevel,
                        weekly_hours: p.weekly_hours,
                        horizon_weeks: p.horizon_weeks,
                        label: p.label,
                      }));
                      addToast(`Loaded preset: ${p.title}`, 'info');
                    }}
                  >
                    <div className="preset-card-top-row">
                      <span style={{ fontSize: 18 }}>{p.icon}</span>
                      <span className="preset-badge-tag">{p.badge}</span>
                    </div>
                    <div className="preset-card-title">{p.title}</div>
                    <div className="preset-card-desc">{p.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4-Step Agent Workflow Stepper */}
            <div className="stepper-container">
              {AGENT_WORKFLOW_STEPS.map(step => (
                <div key={step.num} className="stepper-step">
                  <div className="step-num-label">STEP {step.num}</div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              ))}
            </div>

            {/* Builder Workspace: Parameter Form on Left, Output Roadmap on Right */}
            <div className={`workspace-grid ${currentDetail ? 'solo' : 'wide'}`}>

              {/* Left Column: Form Card */}
              <div className="surface-card">
                <div className="surface-card-header">
                  <h3 className="surface-card-title">
                    <Target size={16} />
                    <span>Curriculum Parameters</span>
                  </h3>
                  <span className="clean-badge badge-neutral-gray mono">STABLE SCHEMA</span>
                </div>
                <div className="surface-card-body">
                  <div className="input-block">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label className="input-label" htmlFor="goal-input">Learning Goal / Objective</label>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Type any tech ambition</span>
                    </div>
                    <textarea
                      id="goal-input"
                      className="textarea-input"
                      placeholder="e.g. I want to become a cybersecurity analyst in 4 months with 6 hours a week"
                      value={form.goal}
                      onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                      rows={3}
                    />

                    {/* AI Smart Goal Assistant */}
                    {form.goal.trim().length >= 2 && (
                      <div className="smart-goal-assistant">
                        <div className="smart-assistant-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="smart-assistant-tag">
                              <Sparkles size={11} />
                              <span>AI Goal Analyzer</span>
                            </div>
                            {smartParams.recognized && (
                              <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                                {smartParams.confidence}
                              </span>
                            )}
                          </div>
                          {smartParams.recognized ? (
                            <div className="smart-assistant-detected">
                              Standardized Role: <strong>{smartParams.domain_display}</strong>
                              {smartParams.domain_category && (
                                <span style={{ fontSize: 11, opacity: 0.8, marginLeft: 6 }}>· {smartParams.domain_category}</span>
                              )}
                            </div>
                          ) : (
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                              {smartParams.guidance || 'Awaiting standardized role or skill...'}
                            </div>
                          )}
                        </div>

                        {smartParams.recognized && (
                          <div className="smart-assistant-body">
                            {smartParams.competencies && smartParams.competencies.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                                <span style={{ fontSize: 10, color: 'var(--text-muted)', alignSelf: 'center', marginRight: 2 }}>Core Competencies:</span>
                                {smartParams.competencies.map(comp => (
                                  <span key={comp} style={{ fontSize: 10, background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#cbd5e1', borderRadius: 4, padding: '1px 6px' }}>
                                    {comp}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="smart-chips-row">
                              <span className="smart-param-chip" title="Recommended Level">📊 Level: {smartParams.level}</span>
                              <span className="smart-param-chip" title="Recommended Duration">⏱️ {smartParams.horizon_weeks}w ({Math.round(smartParams.horizon_weeks / 4.33)} mo)</span>
                              <span className="smart-param-chip" title="Recommended Weekly Hours">⏳ {smartParams.weekly_hours}h / wk</span>
                            </div>
                            <button
                              type="button"
                              className="btn-smart-apply"
                              onClick={() => {
                                setForm(f => ({
                                  ...f,
                                  level: smartParams.level,
                                  weekly_hours: smartParams.weekly_hours,
                                  horizon_weeks: smartParams.horizon_weeks,
                                  label: smartParams.label,
                                }));
                                addToast(`Auto-tuned parameters: ${smartParams.level} · ${smartParams.horizon_weeks}w · ${smartParams.weekly_hours}h/wk`, 'info');
                              }}
                              title="Auto-tune level, duration, and weekly hours to match this ambition"
                            >
                              <Sparkles size={12} />
                              <span>Auto-Tune Parameters</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Row 1: Starting Level & Learner Cognitive Profile */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div className="input-block">
                      <label className="input-label" htmlFor="level-select">Starting Level</label>
                      <select
                        id="level-select"
                        className="select-input"
                        value={form.level}
                        onChange={e => setForm(f => ({ ...f, level: e.target.value as SkillLevel }))}
                      >
                        <option value="beginner">Beginner (Zero / Minimal Tech)</option>
                        <option value="intermediate">Intermediate (Some Foundation)</option>
                        <option value="advanced">Advanced (Deep Dive / Scale)</option>
                      </select>
                    </div>

                    <div className="input-block">
                      <label className="input-label" htmlFor="pace-select">Learning Pace / Persona</label>
                      <select
                        id="pace-select"
                        className="select-input"
                        value={form.pace}
                        onChange={e => setForm(f => ({ ...f, pace: e.target.value as LearnerPace }))}
                      >
                        <option value="balanced">🎯 Steady / Standard Pace</option>
                        <option value="fast_track">⚡ Fast-Track / High-Velocity</option>
                        <option value="deep_mastery">🌱 Gentle / Deep Mastery</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Life Situation & Hours Per Week */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div className="input-block">
                      <label className="input-label" htmlFor="situation-select">Schedule &amp; Situation</label>
                      <select
                        id="situation-select"
                        className="select-input"
                        value={form.situation}
                        onChange={e => setForm(f => ({ ...f, situation: e.target.value as LifeSituation }))}
                      >
                        <option value="working_professional">💼 Working Professional (Evenings)</option>
                        <option value="career_switcher">🚀 Career Switcher (Dedicated)</option>
                        <option value="busy_caregiver">👶 Busy Parent (Micro-Sessions)</option>
                        <option value="student">🎓 Student / Academic Sprint</option>
                      </select>
                    </div>

                    <div className="input-block">
                      <label className="input-label" htmlFor="hours-input">Hours Per Week</label>
                      <input
                        id="hours-input"
                        type="number"
                        className="text-input"
                        min={1} max={40}
                        value={form.weekly_hours}
                        onChange={e => setForm(f => ({ ...f, weekly_hours: Math.max(1, Math.min(40, parseInt(e.target.value) || 1)) }))}
                      />
                    </div>
                  </div>

                  <div className="input-block">
                    <label className="input-label" htmlFor="duration-range">
                      Duration: {form.horizon_weeks} weeks ({Math.round(form.horizon_weeks / 4.33)} months)
                    </label>
                    <input
                      id="duration-range"
                      type="range"
                      className="range-slider"
                      min={4} max={52}
                      value={form.horizon_weeks}
                      onChange={e => setForm(f => ({ ...f, horizon_weeks: parseInt(e.target.value) }))}
                    />
                    <div className="range-legend">
                      <span>4 weeks</span>
                      <span>52 weeks (1 yr)</span>
                    </div>

                    {/* Workload Feasibility Diagnostic Advisor */}
                    <div className={`feasibility-card feasibility-${feasibility.status}`}>
                      <div className="feasibility-header">
                        <div className="feasibility-status-badge">
                          {feasibility.status === 'optimal' && <CheckCircle2 size={13} color="var(--status-live)" />}
                          {feasibility.status === 'compressed' && <AlertTriangle size={13} color="var(--status-warn)" />}
                          {feasibility.status === 'extended' && <Info size={13} color="var(--status-info)" />}
                          <span>{feasibility.headline}</span>
                        </div>
                        <div className="feasibility-metrics-pill">
                          {totalHours}h budget / ~{feasibility.benchmarkHours}h benchmark ({feasibility.coveragePercentage}% coverage)
                        </div>
                      </div>
                      <div className="feasibility-advice-text">
                        {feasibility.advice}
                      </div>
                      {feasibility.status !== 'optimal' && (
                        <div style={{ marginTop: 4 }}>
                          <button
                            type="button"
                            className="btn-smart-apply"
                            style={{ fontSize: 11, padding: '3px 8px' }}
                            onClick={() => {
                              setForm(f => ({
                                ...f,
                                weekly_hours: feasibility.recommendedHoursPerWeek,
                                horizon_weeks: feasibility.recommendedWeeks,
                              }));
                              addToast(`Auto-balanced: ${feasibility.recommendedWeeks} weeks @ ${feasibility.recommendedHoursPerWeek}h/wk`, 'success');
                            }}
                          >
                            <Sparkles size={11} />
                            <span>Auto-Balance Workload &amp; Duration ({feasibility.recommendedWeeks}w @ ${feasibility.recommendedHoursPerWeek}h/wk)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="metrics-strip">
                    <div className="metric-cell">
                      <div className="metric-val">{totalHours}h</div>
                      <div className="metric-label">Total Hours</div>
                    </div>
                    <div className="metric-cell">
                      <div className="metric-val">{form.horizon_weeks}w</div>
                      <div className="metric-label">Weeks</div>
                    </div>
                    <div className="metric-cell">
                      <div className="metric-val">{form.weekly_hours}h</div>
                      <div className="metric-label">Hours / Wk</div>
                    </div>
                  </div>

                  <div className="input-block">
                    <label className="input-label" htmlFor="label-input">Curriculum Label (optional)</label>
                    <input
                      id="label-input"
                      type="text"
                      className="text-input"
                      placeholder="e.g. Data Analyst — 6 Months @ 5h/wk"
                      value={form.label}
                      onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                    />
                  </div>

                  <button
                    id="build-button"
                    className="btn-primary-dark"
                    style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                    onClick={handleBuild}
                    disabled={building}
                  >
                    {building ? <><span className="spinner-icon" />Decomposing &amp; Building Path…</> : <><Sparkles size={15} />Build Learning Path</>}
                  </button>
                </div>
              </div>

              {/* Right Column: When Empty */}
              {!currentDetail && (
                <div className="surface-card">
                  <div className="surface-card-header">
                    <h3 className="surface-card-title">
                      <Cpu size={16} />
                      <span>Autonomous Engine Console</span>
                    </h3>
                    <span className="clean-badge badge-live-green">READY</span>
                  </div>
                  <div className="surface-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>
                        Strict 100% Free Public Resource Policy
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.55 }}>
                        The engine audits courses across Coursera Free Audit, Kaggle Learn, Khan Academy, freeCodeCamp, MIT OpenCourseWare, and MDN Web Docs. It performs live HTTP reachability checks and intercepts paywalls.
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <div style={{ padding: 14, background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700 }}>
                          <Layers size={14} />
                          Prerequisite Graph
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                          Foundations (Math, Python syntax) are ordered before machine learning and advanced analytics.
                        </div>
                      </div>

                      <div style={{ padding: 14, background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700 }}>
                          <RefreshCw size={14} />
                          Self-Healing Links
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                          Broken links and paywalls are automatically swapped with verified free replacements.
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: 18, background: 'var(--bg-subtle)', border: '1px dashed var(--border-dashed)', borderRadius: 'var(--radius-md)', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 800 }}>Ready to Solve Official Brief</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>&quot;Data Analyst in 6 months with 5 hours a week&quot;</div>
                        </div>
                        <button
                          id="quick-solve-btn"
                          className="btn-primary-dark"
                          style={{ padding: '8px 16px', fontSize: 13 }}
                          onClick={handleBuild}
                          disabled={building}
                        >
                          <Play size={12} />
                          Solve Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Right Column: When Plan is Generated */}
              {currentDetail && (
                <div className="surface-card">
                  {/* Roadmap Header */}
                  <div className="roadmap-header">
                    <div className="roadmap-title-row">
                      <div className="roadmap-main-title">{currentDetail.run.label}</div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        {currentDetail.run.source === 'gemini' ? (
                          <span className="engine-badge-gemini" title="Plan generated via Google Gemini 2.0 Flash AI Reasoning DAG">
                            <Sparkles size={11} /> Gemini 2.0 Flash (AI Reasoning Active)
                          </span>
                        ) : (
                          <span className="engine-badge-fallback" title="Deterministic rule-based DAG fallback is active. Set GEMINI_API_KEY in .env.local (or Vercel environment variables) to enable full Gemini AI reasoning.">
                            <Cpu size={11} /> Deterministic Fallback (set GEMINI_API_KEY to enable AI reasoning)
                          </span>
                        )}
                        <RunStatusBadge status={currentDetail.run.status} />
                      </div>
                    </div>
                    <div className="roadmap-goal-text">{currentDetail.run.goal}</div>

                    <div className="roadmap-controls-bar">
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <button
                          id="verify-button"
                          className="btn-primary-dark"
                          style={{ padding: '8px 16px', fontSize: 13 }}
                          onClick={handleVerify}
                          disabled={verifying}
                        >
                          {verifying ? <><span className="spinner-icon" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />Auditing Links…</> : <><Search size={13} />Verify Links &amp; Self-Heal</>}
                        </button>

                        <button
                          id="demo-inject-udemy-btn"
                          className="btn-secondary-light"
                          style={{ padding: '8px 14px', fontSize: 12.5, borderColor: '#f59e0b', color: '#b45309', background: '#fffbeb' }}
                          title="Inject a real Udemy course URL into Week 1 to demonstrate live paywall detection & autonomous self-healing"
                          onClick={() => handleInjectDemo('udemy')}
                          disabled={verifying}
                        >
                          <AlertTriangle size={13} color="#d97706" />
                          <span>Demo: Inject Udemy Paywall</span>
                        </button>

                        <button
                          id="export-calendar-btn"
                          className="btn-secondary-light"
                          style={{ padding: '8px 16px', fontSize: 13 }}
                          onClick={() => {
                            const ics = generateIcsCalendar(
                              currentDetail.run.goal,
                              currentDetail.run.label,
                              currentDetail.weeks
                            );
                            downloadIcsFile(`${currentDetail.run.label.replace(/[^a-z0-9]/gi, '_')}-schedule.ics`, ics);
                            addToast('Calendar (.ics) downloaded — ready to import into Google or Apple Calendar!', 'success');
                          }}
                        >
                          <Download size={13} />
                          Export Calendar (.ics)
                        </button>
                      </div>

                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11.5, color: 'var(--text-muted)' }}>
                        Run ID: {currentDetail.run.id}
                      </div>
                    </div>

                    <div className="roadmap-metrics-grid">
                      <div className="roadmap-stat-box">
                        <div className="roadmap-stat-num">{currentDetail.run.total_hours}h</div>
                        <div className="roadmap-stat-lbl">Total Budget</div>
                      </div>
                      <div className="roadmap-stat-box">
                        <div className="roadmap-stat-num">{currentDetail.run.horizon_weeks}w</div>
                        <div className="roadmap-stat-lbl">Duration</div>
                      </div>
                      <div className="roadmap-stat-box">
                        <div className="roadmap-stat-num">{currentDetail.run.weekly_hours}h</div>
                        <div className="roadmap-stat-lbl">Per-Week Limit</div>
                      </div>
                      <div className="roadmap-stat-box">
                        <div className="roadmap-stat-num">{currentDetail.weeks.reduce((s, w) => s + w.resources.length, 0)}</div>
                        <div className="roadmap-stat-lbl">Audited Resources</div>
                      </div>
                    </div>
                  </div>

                  {/* Human Approval Gate Banner */}
                  {currentDetail.actions.filter(a => a.status === 'pending_approval').map(action => (
                    <div key={action.id} className="approval-editorial-gate">
                      <div className="approval-gate-header">
                        <Shield size={14} />
                        <span>Safety Gate: Explicit Human Approval Required</span>
                      </div>
                      <div className="approval-gate-desc">{action.description}</div>
                      <div className="approval-gate-note">
                        <strong>Official Brief Compliance:</strong> Irreversible side effects (calendar block scheduling and free-tier platform enrollment) require explicit human consent. In this verified demo, approval simulates calendar blocks and platform enrollments without storing personal credentials.
                      </div>
                      <div className="approval-btns-row">
                        <button
                          id={`approve-btn-${action.id}`}
                          className="btn-primary-dark"
                          style={{ padding: '8px 16px', fontSize: 13 }}
                          onClick={() => handleApprove(action.id, 'approve')}
                          disabled={approving === action.id}
                        >
                          {approving === action.id ? <span className="spinner-icon" /> : <Check size={13} />}
                          Approve &amp; Execute
                        </button>
                        <button
                          id={`reject-btn-${action.id}`}
                          className="btn-secondary-light"
                          style={{ padding: '8px 16px', fontSize: 13 }}
                          onClick={() => handleApprove(action.id, 'reject')}
                          disabled={approving === action.id}
                        >
                          <XCircle size={13} />
                          Reject
                        </button>
                      </div>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
                        Idempotency Key: {`calendar-${currentDetail.id}`} (Prevents duplicate execution on retries)
                      </div>
                    </div>
                  ))}

                  {/* Executed Notice */}
                  {currentDetail.actions.filter(a => a.status === 'executed').map(action => (
                    <div key={action.id} className="executed-callout">
                      <CheckCircle2 size={16} />
                      <span>Approved &amp; executed (simulated) — {action.description}</span>
                      <span className="clean-badge badge-neutral-gray" style={{ marginLeft: 'auto' }}>Idempotent Mock</span>
                    </div>
                  ))}

                  {/* Week Modules Accordion */}
                  <div className="modules-accordion-wrap">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                        Week-By-Week Schedule ({currentDetail.weeks.length} Weeks)
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Click to view resources</span>
                    </div>

                    {currentDetail.weeks.map(week => {
                      const hasIssues = week.resources.some(r => r.link_status === 'broken' || r.link_status === 'paid');
                      const allVerified = week.resources.length > 0 && week.resources.every(r => r.link_status === 'live_free');
                      const expanded = expandedWeeks.has(week.id);
                      return (
                        <div key={week.id} className="module-card">
                          <div
                            className="module-card-trigger"
                            onClick={() => toggleWeek(week.id)}
                            role="button"
                            aria-expanded={expanded}
                            id={`week-${week.id}`}
                          >
                            <div className="module-num-circle">{week.week_number}</div>
                            <div className="module-info-col">
                              <div className="module-title-text">{week.title}</div>
                              <div className="module-meta-text">
                                {week.hours_allocated} hours · {week.resources.length} learning resource{week.resources.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              {hasIssues && <span className="clean-badge badge-err-red">Issues</span>}
                              {allVerified && <span className="clean-badge badge-live-green"><Check size={11} />Verified</span>}
                              {expanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                            </div>
                          </div>

                          {expanded && (
                            <div className="module-expand-body">
                              <div className="module-synopsis">{week.description}</div>
                              <div className="resource-rows">
                                {week.resources.map(r => (
                                  <ResourceItem key={r.id} r={r} />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            RUNS TAB
        ══════════════════════════════════════════════════════════ */}
        {tab === 'runs' && (
          <div style={{ paddingTop: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>All Executed Runs</h2>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  Audit trail of learning paths, link verification logs, and human decisions
                </div>
              </div>
              <button
                id="refresh-runs"
                className="btn-secondary-light"
                onClick={loadRuns}
                disabled={loadingRuns}
              >
                {loadingRuns ? <span className="spinner-icon" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#000' }} /> : <RefreshCw size={13} />}
                <span>Refresh Runs</span>
              </button>
            </div>

            {loadingRuns ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                Loading runs…
              </div>
            ) : runs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                No runs recorded yet. Use the Path Builder tab to generate your first curriculum.
              </div>
            ) : (
              <div className={`runs-layout-grid ${selectedRunId ? 'with-detail' : ''}`}>
                <div>
                  {runs.map(run => (
                    <div
                      key={run.id}
                      className={`run-card-editorial ${selectedRunId === run.id ? 'active-run' : ''}`}
                      onClick={() => loadRunDetail(run.id)}
                      id={`run-card-${run.id}`}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 16, fontWeight: 700 }}>{run.label}</span>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {run.test_case && <span className="clean-badge badge-neutral-gray mono" style={{ fontSize: 10 }}>{run.test_case}</span>}
                          <RunStatusBadge status={run.status} />
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>{run.goal}</div>
                      <div style={{ display: 'flex', gap: 14, fontSize: 11.5, fontFamily: 'JetBrains Mono', color: 'var(--text-muted)' }}>
                        <span>{run.total_hours}h total</span>
                        <span>{run.horizon_weeks} weeks</span>
                        <span>{run.level}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedRunId && currentDetail && currentDetail.id === selectedRunId && (
                  <div className="surface-card" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                    <div className="surface-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <h3 className="surface-card-title"><BarChart3 size={15} />Run Detail: {currentDetail.run.label}</h3>
                        {currentDetail.run.source === 'gemini' ? (
                          <span className="engine-badge-gemini" style={{ fontSize: 10, padding: '2px 8px' }}>
                            <Sparkles size={10} /> Gemini 2.0 Flash (AI Active)
                          </span>
                        ) : (
                          <span className="engine-badge-fallback" style={{ fontSize: 10, padding: '2px 8px' }}>
                            <Cpu size={10} /> Deterministic Fallback (set GEMINI_API_KEY)
                          </span>
                        )}
                      </div>
                      <button className="nav-link-btn" onClick={() => setSelectedRunId(null)}>Close</button>
                    </div>
                    <div style={{ padding: 20 }}>
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{currentDetail.run.goal}</div>
                      </div>
                      {currentDetail.weeks.map(week => (
                        <div key={week.id} className="module-card" style={{ marginBottom: 8 }}>
                          <div
                            className="module-card-trigger"
                            onClick={() => toggleWeek(week.id)}
                            role="button"
                            aria-expanded={expandedWeeks.has(week.id)}
                          >
                            <div className="module-num-circle">{week.week_number}</div>
                            <div className="module-info-col">
                              <div className="module-title-text">{week.title}</div>
                              <div className="module-meta-text">{week.hours_allocated}h · {week.resources.length} resources</div>
                            </div>
                            {expandedWeeks.has(week.id) ? <ChevronUp size={14} color="var(--text-muted)" /> : <ChevronDown size={14} color="var(--text-muted)" />}
                          </div>
                          {expandedWeeks.has(week.id) && (
                            <div className="module-expand-body">
                              <div className="resource-rows">
                                {week.resources.map(r => (
                                  <ResourceItem key={r.id} r={r} />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TEST CASES TAB
        ══════════════════════════════════════════════════════════ */}
        {tab === 'testcases' && (
          <div style={{ paddingTop: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>Official Test Cases</h2>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  4 mandatory hackathon scenarios demonstrating budget fit, paywall detection, link repair, and rerun idempotency
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  id="refresh-tests"
                  className="btn-secondary-light"
                  onClick={loadTestResults}
                  disabled={loadingTests}
                >
                  {loadingTests ? <span className="spinner-icon" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#000' }} /> : <RefreshCw size={13} />}
                  <span>Refresh</span>
                </button>
                <button
                  id="run-tests-button"
                  className="btn-primary-dark"
                  onClick={handleRunTests}
                  disabled={runningTests}
                >
                  {runningTests ? <><span className="spinner-icon" />Running Tests…</> : <><Play size={13} />Run All 4 Tests</>}
                </button>
              </div>
            </div>

            {/* TC 4-Card Grid */}
            <div className="tc-grid-editorial">
              {([
                {
                  id: 'TC1', scenario: '6 months at 5 h/week',
                  expected: 'Plan fits within 130 h total; every week ≤ 5 h budget limit.',
                },
                {
                  id: 'TC2', scenario: 'Course has become paid',
                  expected: 'Paid course detected, flagged, and replaced with verified free alternative.',
                },
                {
                  id: 'TC3', scenario: 'Broken link',
                  expected: 'Broken link detected, replacement found, rechecked, and inserted into plan.',
                },
                {
                  id: 'TC4', scenario: 'Rerun idempotency',
                  expected: 'Only missing sessions added; duplicate calendar action prevented by idempotency key.',
                },
              ] as const).map(tc => {
                const latest = testResults
                  .filter(r => r.tc_id === tc.id)
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

                return (
                  <div key={tc.id} className="tc-card-editorial">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="tc-id-tag">{tc.id}</div>
                      {latest ? <TCBadge status={latest.status} /> : <span className="clean-badge badge-neutral-gray">NOT RUN</span>}
                    </div>
                    <div className="tc-scenario-title">{tc.scenario}</div>
                    <div className="tc-expected-text">{tc.expected}</div>
                    {latest?.actual && <div className="tc-actual-codebox">{latest.actual}</div>}
                  </div>
                );
              })}
            </div>

            {/* Results List */}
            {testResults.length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
                  Test Execution Audit Trail
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {testResults.map(tr => (
                    <div key={tr.id} className="surface-card" style={{ padding: 18 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span className="tc-id-tag">{tr.tc_id}</span>
                        <TCBadge status={tr.status} />
                        <span style={{ fontSize: 14.5, fontWeight: 700 }}>{tr.scenario}</span>
                        <span style={{ marginLeft: 'auto', fontSize: 12, fontFamily: 'JetBrains Mono', color: 'var(--text-muted)' }}>
                          {new Date(tr.created_at).toLocaleString()}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13 }}>
                        <div>
                          <span style={{ fontWeight: 700, color: 'var(--text-muted)', display: 'block', fontSize: 11.5, textTransform: 'uppercase' }}>Expected</span>
                          {tr.expected}
                        </div>
                        <div>
                          <span style={{ fontWeight: 700, color: 'var(--text-muted)', display: 'block', fontSize: 11.5, textTransform: 'uppercase' }}>Actual</span>
                          {tr.actual ?? '—'}
                        </div>
                      </div>

                      {tr.evidence && (
                        <div style={{ marginTop: 12 }}>
                          <button
                            id={`evidence-toggle-${tr.id}`}
                            className="btn-secondary-light"
                            style={{ padding: '4px 10px', fontSize: 11.5 }}
                            onClick={() => setShowEvidence(showEvidence === tr.id ? null : tr.id)}
                          >
                            <Info size={11} />
                            <span>{showEvidence === tr.id ? 'Hide Evidence JSON' : 'Inspect Recorded Evidence (JSON)'}</span>
                          </button>
                          {showEvidence === tr.id && (
                            <pre style={{ marginTop: 8, padding: 12, background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: 6, fontSize: 11, overflowX: 'auto', maxHeight: 250 }}>
                              {JSON.stringify(JSON.parse(tr.evidence), null, 2)}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Editorial Footer & Disclaimer ─────────────────────────────────── */}
      <footer className="editorial-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <div className="footer-brand-title">
                <span className="brand-dot" />
                <span>Episteme AI</span>
              </div>
              <p className="footer-brand-desc">
                Autonomous agentic curriculum engineer turning career transitions into structured,
                prerequisite-ordered weekly roadmaps using 100% verified free public courseware.
              </p>
              <div className="footer-copyright-note">
                © {new Date().getFullYear()} Episteme AI. All rights reserved.
              </div>
            </div>

            <div className="footer-disclaimer-col">
              <div className="footer-col-heading">Open Education Disclaimer &amp; Fair Use</div>
              <p className="footer-disclaimer-text">
                All external course syllabi, documentation, tutorials, and trademarked names—including
                Coursera®, Kaggle®, Khan Academy®, freeCodeCamp®, MIT OpenCourseWare®, Harvard CS50®,
                MDN Web Docs®, and the Python Software Foundation®—are the intellectual property and copyright
                of their respective institutions. Episteme acts as an open-access aggregator and scheduler,
                verifying public link availability and zero-cost auditability under fair-use educational guidance.
              </p>
              <div className="footer-trust-badges">
                <span className="trust-badge-item">✓ Zero Tuition Paywalls</span>
                <span className="trust-badge-item">✓ Real HTTP Link Auditing</span>
                <span className="trust-badge-item">✓ Human Approval Safeguards</span>
                <span className="trust-badge-item">✓ RFC-5545 iCalendar Export</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Toast Notifications (Auto-Dismissing After 4s) ───────────────────── */}
      <div className="toast-stack" aria-live="polite">
        {toasts.map(t => (
          <EditorialToastItem key={t.id} toast={t} onClose={removeToast} />
        ))}
      </div>
    </div>
  );
}

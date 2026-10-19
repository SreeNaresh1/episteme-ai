const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

async function createPresentation() {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.title = 'Episteme AI — Autonomous Self-Healing Learning Path Engine';
  pptx.author = 'Episteme AI Team';
  pptx.subject = 'Agentic AI Hackathon 2026';

  // Editorial Palette: Whitish-Grey Background & Crisp Black/Charcoal Text
  const BG_COLOR = 'F4F4F1';      // Whitish-grey canvas
  const CARD_BG = 'FFFFFF';       // Pure white cards
  const CARD_BORDER = '111110';   // Crisp black border
  const LIGHT_BORDER = 'D5D5D0';  // Subtle divider border
  const TEXT_BLACK = '111110';    // Primary black
  const TEXT_CHARCOAL = '333333'; // Secondary text
  const TEXT_MUTED = '666666';    // Muted labels
  const BADGE_BG = 'EAEAE6';      // Neutral badge background

  const FONT_HEAD = 'Arial';
  const FONT_BODY = 'Calibri';

  // Helper for consistent headers
  function addSlideHeader(slide, tag, title, subtitle) {
    // Header Tag
    slide.addText(tag.toUpperCase(), {
      x: 0.8, y: 0.45, w: 10, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10, bold: true, color: TEXT_MUTED, charSpacing: 1.5
    });

    // Main Title
    slide.addText(title, {
      x: 0.8, y: 0.75, w: 11.5, h: 0.55,
      fontFace: FONT_HEAD, fontSize: 24, bold: true, color: TEXT_BLACK
    });

    // Subtitle
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8, y: 1.3, w: 11.5, h: 0.35,
        fontFace: FONT_BODY, fontSize: 13, italic: false, color: TEXT_MUTED
      });
    }

    // Top subtle divider line
    slide.addShape(pptx.ShapeType.line, {
      x: 0.8, y: 1.75, w: 11.7, h: 0,
      line: { color: LIGHT_BORDER, width: 1 }
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 1: TITLE SLIDE
  // ───────────────────────────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };

    // Tag Badge
    slide.addText('BUILD & SUBMIT • AGENTIC AI HACKATHON 2026', {
      x: 0.8, y: 0.8, w: 6.5, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: TEXT_BLACK,
      fill: { color: BADGE_BG }, align: 'center', line: { color: CARD_BORDER, width: 1 }
    });

    // Hero Title
    slide.addText('Episteme AI', {
      x: 0.8, y: 1.3, w: 11.5, h: 1.0,
      fontFace: FONT_HEAD, fontSize: 44, bold: true, color: TEXT_BLACK
    });

    // Subtitle
    slide.addText('The Autonomous Self-Healing Epistemic Curriculum Engine', {
      x: 0.8, y: 2.3, w: 11.5, h: 0.5,
      fontFace: FONT_BODY, fontSize: 18, bold: true, color: TEXT_CHARCOAL
    });

    // Philosophy block
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 2.9, w: 11.7, h: 1.25,
      fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
    });

    slide.addText(
      'Named after classical philosophy: ἐπιστήμη (Episteme — justified, verified truth) vs δόξα (Doxa — unverified opinion). Online learning is saturated with unverified links, surprise paywalls, and unbudgeted schedules. Episteme AI provides mathematical rigor: guaranteeing weekly hour caps (e.g. 5h/wk for 26w = 130h), verifying 100% free courses, and autonomously healing dead links and paywalls.',
      {
        x: 1.0, y: 3.05, w: 11.3, h: 0.95,
        fontFace: FONT_BODY, fontSize: 12.5, color: TEXT_CHARCOAL, lineSpacingMultiple: 1.2
      }
    );

    // 3 Highlight Feature Cards
    const features = [
      { num: '01', title: '130h Budget Cap', desc: 'Exact mathematical constraint solver fitting 26 weeks @ 5h/wk with zero overflow' },
      { num: '02', title: 'Self-Healing Links', desc: 'Active HTTP crawler catches 404s & paywalls, hot-swapping verified free alternatives' },
      { num: '03', title: 'Human Gatekeeper', desc: 'Explicit user approval prior to simulated platform enrollment & idempotent calendar dispatch' }
    ];

    features.forEach((feat, idx) => {
      const cardX = 0.8 + idx * 4.0;
      slide.addShape(pptx.ShapeType.rect, {
        x: cardX, y: 4.4, w: 3.7, h: 2.2,
        fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
      });

      slide.addText(feat.num, {
        x: cardX + 0.25, y: 4.6, w: 3.2, h: 0.35,
        fontFace: FONT_HEAD, fontSize: 14, bold: true, color: TEXT_MUTED
      });

      slide.addText(feat.title, {
        x: cardX + 0.25, y: 5.0, w: 3.2, h: 0.45,
        fontFace: FONT_HEAD, fontSize: 16, bold: true, color: TEXT_BLACK
      });

      slide.addText(feat.desc, {
        x: cardX + 0.25, y: 5.5, w: 3.2, h: 0.95,
        fontFace: FONT_BODY, fontSize: 11.5, color: TEXT_CHARCOAL, lineSpacingMultiple: 1.15
      });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 2: THE PROBLEM STATEMENT
  // ───────────────────────────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };
    addSlideHeader(slide, '01 • Problem Statement', 'The "Free" Online Learning Trap', 'Why 85% of self-directed technical learners abandon their educational ambitions');

    const problems = [
      {
        tag: 'MONETIZATION TRAPS',
        title: 'Surprise Paywalls',
        desc: 'Courses advertised as "free" abruptly demand credit cards midway through week 3 to unlock graded labs, assignments, or certificates. Learners waste weeks only to hit an unexpected financial wall.'
      },
      {
        tag: 'CURRICULUM DECAY',
        title: '404 Dead Links & Deprecation',
        desc: 'Technical syllabi decompose over time. Video links disappear, external repositories get archived, and APIs change, leaving ambitious students completely stranded with broken documentation.'
      },
      {
        tag: 'UNBUDGETED TIME',
        title: 'Chaotic Workloads & Burnout',
        desc: 'Generic AI chatbots hallucinate overwhelming 40-hour weekly roadmaps for busy professionals who only have 5 hours/week. Unrealistic scheduling is the #1 driver of student abandonment.'
      }
    ];

    problems.forEach((prob, idx) => {
      const cardX = 0.8 + idx * 4.0;
      slide.addShape(pptx.ShapeType.rect, {
        x: cardX, y: 2.1, w: 3.7, h: 4.6,
        fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
      });

      slide.addText(prob.tag, {
        x: cardX + 0.3, y: 2.35, w: 3.1, h: 0.3,
        fontFace: FONT_HEAD, fontSize: 10, bold: true, color: TEXT_MUTED, charSpacing: 1.2
      });

      slide.addText(prob.title, {
        x: cardX + 0.3, y: 2.75, w: 3.1, h: 0.7,
        fontFace: FONT_HEAD, fontSize: 17, bold: true, color: TEXT_BLACK
      });

      slide.addShape(pptx.ShapeType.line, {
        x: cardX + 0.3, y: 3.55, w: 3.1, h: 0,
        line: { color: LIGHT_BORDER, width: 1 }
      });

      slide.addText(prob.desc, {
        x: cardX + 0.3, y: 3.8, w: 3.1, h: 2.6,
        fontFace: FONT_BODY, fontSize: 12.5, color: TEXT_CHARCOAL, lineSpacingMultiple: 1.25
      });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 3: THE EPISTEME SOLUTION
  // ───────────────────────────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };
    addSlideHeader(slide, '02 • The Solution', 'Autonomous Curriculum Engineering', 'A closed-loop agentic workflow guaranteeing verified free resources, strict time caps, and link healing');

    // Left Column: 3 Pillars
    const pillars = [
      {
        title: '1. Mathematical Time-Budget Constraint Solver',
        desc: 'Computes exact weekly hours (5h/wk × 26 weeks = 130 hours). Every weekly module is strictly bounded with zero overflow.'
      },
      {
        title: '2. Active Link Verification & Paywall Auditor',
        desc: 'Proactively pings HTTP headers and scans domain heuristics. Flagged paid courses or 404 links trigger immediate automated substitution.'
      },
      {
        title: '3. Human-in-the-Loop Gateway & Idempotency',
        desc: 'Requires explicit user consent prior to simulated platform enrollments and generates standard RFC-5545 .ics calendars.'
      }
    ];

    pillars.forEach((p, idx) => {
      const y = 2.1 + idx * 1.5;
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.8, y: y, w: 6.8, h: 1.35,
        fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.2 }
      });

      slide.addText(p.title, {
        x: 1.0, y: y + 0.15, w: 6.4, h: 0.35,
        fontFace: FONT_HEAD, fontSize: 13.5, bold: true, color: TEXT_BLACK
      });

      slide.addText(p.desc, {
        x: 1.0, y: y + 0.55, w: 6.4, h: 0.7,
        fontFace: FONT_BODY, fontSize: 11.5, color: TEXT_CHARCOAL, lineSpacingMultiple: 1.15
      });
    });

    // Right Column: Verified Platforms Card
    slide.addShape(pptx.ShapeType.rect, {
      x: 7.9, y: 2.1, w: 4.6, h: 4.35,
      fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
    });

    slide.addText('100% VERIFIED FREE PLATFORMS', {
      x: 8.2, y: 2.35, w: 4.0, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10.5, bold: true, color: TEXT_MUTED, charSpacing: 1
    });

    slide.addText('Curated Zero-Tuition Source Pool', {
      x: 8.2, y: 2.7, w: 4.0, h: 0.45,
      fontFace: FONT_HEAD, fontSize: 15, bold: true, color: TEXT_BLACK
    });

    const sources = [
      '• Coursera (Free Audit Mode)',
      '• Kaggle Learn (Micro-courses & Datasets)',
      '• Khan Academy (Foundations & Statistics)',
      '• freeCodeCamp (Full Curriculum)',
      '• Python & Pandas Official Documentation',
      '• Microsoft Learn (Power BI / Data Fundamentals)',
      '• MIT OpenCourseWare & Harvard CS50',
      '• MDN Web Docs & Mozilla Foundation'
    ];

    slide.addText(sources.join('\n'), {
      x: 8.2, y: 3.3, w: 4.0, h: 3.0,
      fontFace: FONT_BODY, fontSize: 12, color: TEXT_CHARCOAL, lineSpacingMultiple: 1.3
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 4: SYSTEM ARCHITECTURE
  // ───────────────────────────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };
    addSlideHeader(slide, '03 • Architecture', 'Closed-Loop Multi-Agent Architecture', 'Autonomous flow from user ambition intake to verified, scheduled execution');

    // 5 Main Flow Boxes
    const stages = [
      { num: '01', title: 'Goal Intake', desc: 'Target & 5h/wk cap' },
      { num: '02', title: 'Gemini DAG', desc: 'Prerequisite order' },
      { num: '03', title: 'Link Auditor', desc: 'HTTP ping & paywalls' },
      { num: '04', title: 'Self-Healing', desc: 'Auto-substitution' },
      { num: '05', title: 'Human Gate', desc: 'Idempotent .ics' },
    ];

    stages.forEach((st, idx) => {
      const boxX = 0.8 + idx * 2.4;
      slide.addShape(pptx.ShapeType.rect, {
        x: boxX, y: 2.1, w: 2.1, h: 1.8,
        fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
      });

      slide.addText(st.num, {
        x: boxX + 0.15, y: 2.25, w: 1.8, h: 0.25,
        fontFace: FONT_HEAD, fontSize: 10, bold: true, color: TEXT_MUTED
      });

      slide.addText(st.title, {
        x: boxX + 0.15, y: 2.6, w: 1.8, h: 0.45,
        fontFace: FONT_HEAD, fontSize: 13, bold: true, color: TEXT_BLACK
      });

      slide.addText(st.desc, {
        x: boxX + 0.15, y: 3.15, w: 1.8, h: 0.65,
        fontFace: FONT_BODY, fontSize: 10.5, color: TEXT_CHARCOAL
      });

      // Arrow
      if (idx < stages.length - 1) {
        slide.addShape(pptx.ShapeType.rightArrow, {
          x: boxX + 2.15, y: 2.85, w: 0.2, h: 0.3,
          fill: { color: TEXT_BLACK }, line: { color: TEXT_BLACK, width: 1 }
        });
      }
    });

    // Lower Architecture Tier: SQLite WAL Persistence & Audit Layer
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 4.2, w: 11.7, h: 2.25,
      fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
    });

    slide.addText('STATEFUL AUDIT & PERSISTENCE TIER (SQLITE WAL MODE)', {
      x: 1.1, y: 4.4, w: 11.0, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: TEXT_MUTED, charSpacing: 1
    });

    const tables = [
      { name: 'TABLE: runs', desc: 'id, label, goal, level, weekly_hours (5), horizon_weeks (26), total_hours (130), status (verified)' },
      { name: 'TABLE: resources', desc: 'id, week_id, title, url, is_free, link_status (live_free), replaced_by, classification_reason' },
      { name: 'TABLE: actions & tests', desc: 'idempotency_key (calendar-runId), action_type, mock_execution=1, tc_id (TC1-TC4), evidence (JSON)' },
    ];

    tables.forEach((t, idx) => {
      const ty = 4.8 + idx * 0.5;
      slide.addText(t.name, {
        x: 1.1, y: ty, w: 2.5, h: 0.35,
        fontFace: FONT_HEAD, fontSize: 11, bold: true, color: TEXT_BLACK
      });
      slide.addText(t.desc, {
        x: 3.7, y: ty, w: 8.5, h: 0.35,
        fontFace: FONT_BODY, fontSize: 11, color: TEXT_CHARCOAL
      });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 5: OFFICIAL TEST EVIDENCE
  // ───────────────────────────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };
    addSlideHeader(slide, '04 • Verification Evidence', 'Official Hackathon Test Cases (4/4 Passed)', 'Automated, deterministic verification against live database transactions');

    const testCases = [
      {
        id: 'TC1',
        title: '6 Months @ 5 h/week',
        expected: 'Plan fits within total hours (26 weeks × 5 h = 130 h total).',
        actual: 'Weeks generated: 26/26. Total hours: 130/130 (exact match). Per-week limit (≤5h) respected: true. All URLs valid & free.',
        status: 'PASSED (100%)'
      },
      {
        id: 'TC2',
        title: 'Course Becomes Paid',
        expected: 'Paid course detected, flagged, and replaced with verified free alternative.',
        actual: 'Paid course detected (Udemy pattern). Replaced with freeCodeCamp Data Analysis with Python. Re-verified live_free & saved to DB.',
        status: 'PASSED (100%)'
      },
      {
        id: 'TC3',
        title: 'Broken Link (404/DNS)',
        expected: 'Broken link detected, replacement found, replacement rechecked, inserted into plan.',
        actual: 'Network error caught (NXDOMAIN). Free alternative discovered, verified live via real HTTP fetch, and hot-swapped into curriculum.',
        status: 'PASSED (100%)'
      },
      {
        id: 'TC4',
        title: 'Rerun / Idempotency',
        expected: 'Only missing sessions added; duplicate action prevented by idempotency key.',
        actual: 'Existing completed sessions preserved. Missing sessions: 0. Duplicate calendar action blocked via idempotency key. Sessions: 4 before / 4 after.',
        status: 'PASSED (100%)'
      }
    ];

    testCases.forEach((tc, idx) => {
      const rowY = 2.05 + idx * 1.15;
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.8, y: rowY, w: 11.7, h: 1.05,
        fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.2 }
      });

      // TC Badge
      slide.addText(tc.id, {
        x: 1.0, y: rowY + 0.15, w: 0.8, h: 0.3,
        fontFace: FONT_HEAD, fontSize: 13, bold: true, color: TEXT_BLACK
      });

      // Title & Status
      slide.addText(tc.title, {
        x: 1.9, y: rowY + 0.15, w: 4.5, h: 0.3,
        fontFace: FONT_HEAD, fontSize: 13, bold: true, color: TEXT_BLACK
      });

      slide.addText(tc.status, {
        x: 10.5, y: rowY + 0.15, w: 1.8, h: 0.3,
        fontFace: FONT_HEAD, fontSize: 11, bold: true, color: TEXT_BLACK, align: 'right'
      });

      // Actual Result
      slide.addText(tc.actual, {
        x: 1.0, y: rowY + 0.5, w: 11.3, h: 0.5,
        fontFace: FONT_BODY, fontSize: 11, color: TEXT_CHARCOAL
      });
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 6: SELF-HEALING & PAYWALL HEURISTICS
  // ───────────────────────────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };
    addSlideHeader(slide, '05 • Technical Innovation', 'Paywall Detection & Self-Healing Pipeline', 'How Episteme guarantees curriculum freshness and accessibility over time');

    // Left Box: Paywall Detection
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 2.1, w: 5.7, h: 4.4,
      fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
    });

    slide.addText('01 • HEURISTIC AUDITING', {
      x: 1.1, y: 2.35, w: 5.0, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10.5, bold: true, color: TEXT_MUTED, charSpacing: 1
    });

    slide.addText('Proactive Paywall Detection', {
      x: 1.1, y: 2.7, w: 5.0, h: 0.45,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: TEXT_BLACK
    });

    const audPoints = [
      '• Known Paid Traps: Pattern matches domains requiring recurring subscription (Udemy, Pluralsight, Skillshare, MasterClass, Brilliant).',
      '• Free Audit Whitelist: Validates auditability on platforms where course materials are freely viewable (Coursera, Kaggle, Khan, fast.ai).',
      '• HTTP Status Checking: Actively pings every URL before presenting it to the user. Non-200 responses and DNS drops are immediately caught.',
      '• Timestamped Evidence: Every audit event stores HTTP status code, ISO-8601 timestamp, and classification explanation.'
    ];

    slide.addText(audPoints.join('\n\n'), {
      x: 1.1, y: 3.3, w: 5.1, h: 3.0,
      fontFace: FONT_BODY, fontSize: 11.5, color: TEXT_CHARCOAL, lineSpacingMultiple: 1.15
    });

    // Right Box: Closed-Loop Substitution
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.8, y: 2.1, w: 5.7, h: 4.4,
      fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
    });

    slide.addText('02 • REPLACEMENT LOOP', {
      x: 7.1, y: 2.35, w: 5.0, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10.5, bold: true, color: TEXT_MUTED, charSpacing: 1
    });

    slide.addText('Autonomous Hot-Swap Substitution', {
      x: 7.1, y: 2.7, w: 5.0, h: 0.45,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: TEXT_BLACK
    });

    const subPoints = [
      '• Topic-Tagged Repository Pool: Maintains categorized index of verified open-access materials by topic (Python, SQL, Stats, EDA).',
      '• Two-Step Verification: Candidate replacements are re-checked via a live HTTP fetch before insertion to ensure they are accessible.',
      '• Live Database Hot-Swap: Automatically updates the curriculum table, recording the replacement URL and rationale.',
      '• Full Audit Lineage: The database preserves original URL, replacement URL, and replacement reason for complete transparency.'
    ];

    slide.addText(subPoints.join('\n\n'), {
      x: 7.1, y: 3.3, w: 5.1, h: 3.0,
      fontFace: FONT_BODY, fontSize: 11.5, color: TEXT_CHARCOAL, lineSpacingMultiple: 1.15
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 7: SAFETY, HUMAN GATEWAY & CALENDAR
  // ───────────────────────────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };
    addSlideHeader(slide, '06 • Safety & Scheduling', 'Human Governance & Calendar Integration', 'Safe execution with strict idempotency and universal RFC-5545 calendar export');

    // Left Box: Human Gatekeeper
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 2.1, w: 5.7, h: 4.4,
      fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
    });

    slide.addText('GOVERNANCE & SAFETY', {
      x: 1.1, y: 2.35, w: 5.0, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10.5, bold: true, color: TEXT_MUTED, charSpacing: 1
    });

    slide.addText('Explicit Human-in-the-Loop Gate', {
      x: 1.1, y: 2.7, w: 5.0, h: 0.45,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: TEXT_BLACK
    });

    const gatePoints = [
      '• No Blind Execution: Autonomous actions never enroll in courses or modify schedules without human review.',
      '• Interactive Review Modal: Presents weekly hours breakdown, course links, and proposed calendar actions before dispatch.',
      '• Idempotency Protection: Cryptographic action key (calendar-runId) ensures that duplicate approvals or network retries never create duplicate events.',
      '• Transparent Simulation: Simulated actions explicitly track mock_execution=1 in database audit logs.'
    ];

    slide.addText(gatePoints.join('\n\n'), {
      x: 1.1, y: 3.3, w: 5.1, h: 3.0,
      fontFace: FONT_BODY, fontSize: 11.5, color: TEXT_CHARCOAL, lineSpacingMultiple: 1.15
    });

    // Right Box: Calendar Sync
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.8, y: 2.1, w: 5.7, h: 4.4,
      fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
    });

    slide.addText('SEAMLESS WORKFLOW INTEGRATION', {
      x: 7.1, y: 2.35, w: 5.0, h: 0.3,
      fontFace: FONT_HEAD, fontSize: 10.5, bold: true, color: TEXT_MUTED, charSpacing: 1
    });

    slide.addText('RFC-5545 iCalendar (.ics) Export', {
      x: 7.1, y: 2.7, w: 5.0, h: 0.45,
      fontFace: FONT_HEAD, fontSize: 16, bold: true, color: TEXT_BLACK
    });

    const calPoints = [
      '• Universal Compatibility: Generates standard .ics files compatible with Google Calendar, Apple Calendar, and Microsoft Outlook.',
      '• Weekly Recurring Study Blocks: Distributes the allocated weekly hours into actionable calendar events.',
      '• Curated Resource Attachments: Each calendar event description contains direct links to that week’s curated free resources.',
      '• One-Click Download: Learners import their entire 26-week study roadmap in seconds directly from the dashboard.'
    ];

    slide.addText(calPoints.join('\n\n'), {
      x: 7.1, y: 3.3, w: 5.1, h: 3.0,
      fontFace: FONT_BODY, fontSize: 11.5, color: TEXT_CHARCOAL, lineSpacingMultiple: 1.15
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDE 8: SUMMARY & ROADMAP
  // ───────────────────────────────────────────────────────────────────────────
  {
    const slide = pptx.addSlide();
    slide.background = { color: BG_COLOR };
    addSlideHeader(slide, '07 • Conclusion & Roadmap', 'Episteme AI: The Future of Self-Education', 'Restoring epistemic rigor and mathematical feasibility to learning pathways');

    // 3 Roadmap Cards
    const roadmap = [
      {
        phase: 'PHASE 1 (DELIVERED)',
        title: 'Core Engine & Verification',
        items: [
          '✓ Mathematical 130h constraint solver',
          '✓ Gemini 2.0 Flash prerequisite DAG',
          '✓ Real-time HTTP link crawler',
          '✓ Heuristic paywall detector',
          '✓ SQLite WAL persistence tier',
          '✓ 4/4 official test cases passed'
        ]
      },
      {
        phase: 'PHASE 2 (NEXT)',
        title: 'Ecosystem & Monitoring',
        items: [
          '• Discord / Slack study companion bot',
          '• Weekly automated link health audits',
          '• Google Calendar direct API two-way sync',
          '• Learner completion check-in reminders',
          '• Adaptive pacing for rescheduled weeks'
        ]
      },
      {
        phase: 'PHASE 3 (VISION)',
        title: 'Open Knowledge Commons',
        items: [
          '• Decentralized open-access course index',
          '• Peer-attested free curriculum verification',
          '• Multilingual syllabus translation',
          '• Institutional university credit alignment',
          '• Universal Zero-Tuition learning access'
        ]
      }
    ];

    roadmap.forEach((r, idx) => {
      const cardX = 0.8 + idx * 4.0;
      slide.addShape(pptx.ShapeType.rect, {
        x: cardX, y: 2.1, w: 3.7, h: 3.6,
        fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
      });

      slide.addText(r.phase, {
        x: cardX + 0.25, y: 2.3, w: 3.2, h: 0.3,
        fontFace: FONT_HEAD, fontSize: 10, bold: true, color: TEXT_MUTED, charSpacing: 1
      });

      slide.addText(r.title, {
        x: cardX + 0.25, y: 2.65, w: 3.2, h: 0.45,
        fontFace: FONT_HEAD, fontSize: 14, bold: true, color: TEXT_BLACK
      });

      slide.addShape(pptx.ShapeType.line, {
        x: cardX + 0.25, y: 3.2, w: 3.2, h: 0,
        line: { color: LIGHT_BORDER, width: 1 }
      });

      slide.addText(r.items.join('\n'), {
        x: cardX + 0.25, y: 3.35, w: 3.2, h: 2.2,
        fontFace: FONT_BODY, fontSize: 11, color: TEXT_CHARCOAL, lineSpacingMultiple: 1.2
      });
    });

    // Bottom Repository & Submission Details Card
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 5.9, w: 11.7, h: 0.8,
      fill: { color: CARD_BG }, line: { color: CARD_BORDER, width: 1.5 }
    });

    slide.addText('SUBMISSION REPOSITORY: https://github.com/SreeNaresh1/episteme-ai  •  AGENTIC AI HACKATHON 2026', {
      x: 1.0, y: 6.15, w: 11.3, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 12, bold: true, color: TEXT_BLACK, align: 'center'
    });
  }

  // Save the presentation file to both d:\Ziro\ and d:\Ziro\app\
  const outPath1 = path.join(__dirname, '..', '..', 'Episteme_AI_Presentation.pptx');
  const outPath2 = path.join(__dirname, 'Episteme_AI_Presentation.pptx');

  await pptx.writeFile({ fileName: outPath1 });
  await pptx.writeFile({ fileName: outPath2 });

  console.log('Presentation created successfully at:', outPath1);
  console.log('Presentation created successfully at:', outPath2);
}

createPresentation().catch(err => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});

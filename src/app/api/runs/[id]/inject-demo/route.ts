import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let type: 'udemy' | 'broken' = 'udemy';
    try {
      const body = await req.json() as { type?: 'udemy' | 'broken' };
      if (body?.type === 'broken') type = 'broken';
    } catch {
      // Default to udemy if body is empty or not JSON
      type = 'udemy';
    }

    const db = getDb();
    const run = db.prepare('SELECT id, goal FROM runs WHERE id = ?').get(id) as { id: string; goal: string } | undefined;
    if (!run) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 });
    }

    const firstWeek = db.prepare('SELECT id, week_number FROM weeks WHERE run_id = ? ORDER BY week_number ASC LIMIT 1').get(id) as { id: string; week_number: number } | undefined;
    if (!firstWeek) {
      return NextResponse.json({ error: 'No weeks found for this run' }, { status: 400 });
    }

    const rid = generateId();

    if (type === 'udemy') {
      const goalLower = (run.goal || '').toLowerCase();
      let title = 'Complete Python Bootcamp: Go from zero to hero [Udemy - Paid Course]';
      let url = 'https://www.udemy.com/course/python-bootcamp/';

      if (goalLower.includes('web') || goalLower.includes('fullstack') || goalLower.includes('frontend') || goalLower.includes('javascript') || goalLower.includes('react')) {
        title = 'The Complete 2026 Web Development Bootcamp [Udemy - Paid Course]';
        url = 'https://www.udemy.com/course/the-complete-web-development-bootcamp/';
      } else if (goalLower.includes('machine learning') || goalLower.includes('ai') || goalLower.includes('deep learning')) {
        title = 'Machine Learning A-Z: AI, Python & R [Udemy - Paid Course]';
        url = 'https://www.udemy.com/course/machinelearning/';
      } else if (goalLower.includes('cyber') || goalLower.includes('security') || goalLower.includes('hack')) {
        title = 'The Complete Cyber Security Course: Hackers Exposed! [Udemy - Paid Course]';
        url = 'https://www.udemy.com/course/the-complete-internet-security-course/';
      } else if (goalLower.includes('cloud') || goalLower.includes('devops') || goalLower.includes('docker') || goalLower.includes('kubernetes')) {
        title = 'Docker & Kubernetes: The Practical Guide [Udemy - Paid Course]';
        url = 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/';
      } else if (goalLower.includes('mobile') || goalLower.includes('flutter') || goalLower.includes('android') || goalLower.includes('ios')) {
        title = 'Flutter & Dart - The Complete Guide [Udemy - Paid Course]';
        url = 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/';
      } else if (goalLower.includes('design') || goalLower.includes('ui') || goalLower.includes('ux') || goalLower.includes('figma')) {
        title = 'User Experience Design Essentials - Adobe XD / Figma [Udemy - Paid Course]';
        url = 'https://www.udemy.com/course/ui-ux-web-design-using-adobe-xd/';
      }

      db.transaction(() => {
        db.prepare(`
          INSERT INTO resources (id, week_id, run_id, title, url, platform, is_free, link_status)
          VALUES (?, ?, ?, ?, ?, 'Udemy', 0, 'unchecked')
        `).run(rid, firstWeek.id, id, title, url);
        db.prepare("UPDATE runs SET status = 'needs_review', updated_at = datetime('now') WHERE id = ?").run(id);
      })();

      return NextResponse.json({
        success: true,
        message: 'Injected real Udemy course URL into Week 1. Click "Verify Links & Self-Heal" to watch Episteme detect the paywall and autonomously hot-swap it.',
        resource_id: rid,
        week_id: firstWeek.id,
        type: 'udemy',
      });
    } else {
      const title = 'Advanced Data Structures & Algorithms [Dead Link / 404 Simulation]';
      const url = 'https://this-course-does-not-exist-learnpath-tc3.invalid/algorithms';
      db.transaction(() => {
        db.prepare(`
          INSERT INTO resources (id, week_id, run_id, title, url, platform, is_free, link_status)
          VALUES (?, ?, ?, ?, ?, 'Unknown', 1, 'unchecked')
        `).run(rid, firstWeek.id, id, title, url);
        db.prepare("UPDATE runs SET status = 'needs_review', updated_at = datetime('now') WHERE id = ?").run(id);
      })();

      return NextResponse.json({
        success: true,
        message: 'Injected dead URL into Week 1. Click "Verify Links & Self-Heal" to watch Episteme crawl, flag the broken link, and hot-swap a verified replacement.',
        resource_id: rid,
        week_id: firstWeek.id,
        type: 'broken',
      });
    }
  } catch (err) {
    console.error('inject-demo error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

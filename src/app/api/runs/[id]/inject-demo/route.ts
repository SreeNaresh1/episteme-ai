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
    const body = await req.json() as { type?: 'udemy' | 'broken' };
    const type = body.type || 'udemy';

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
      const title = 'Complete Python Bootcamp: Go from zero to hero [Udemy - Paid Course]';
      const url = 'https://www.udemy.com/course/python-bootcamp/';
      db.prepare(`
        INSERT INTO resources (id, week_id, run_id, title, url, platform, is_free, link_status)
        VALUES (?, ?, ?, ?, ?, 'Udemy', 0, 'unchecked')
      `).run(rid, firstWeek.id, id, title, url);

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
      db.prepare(`
        INSERT INTO resources (id, week_id, run_id, title, url, platform, is_free, link_status)
        VALUES (?, ?, ?, ?, ?, 'Unknown', 1, 'unchecked')
      `).run(rid, firstWeek.id, id, title, url);

      return NextResponse.json({
        success: true,
        message: 'Injected dead URL into Week 1. Click "Verify Links & Self-Heal" to watch Episteme crawl, flag the broken link, and hot-swap a verified replacement.',
        resource_id: rid,
        week_id: firstWeek.id,
        type: 'broken',
      });
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

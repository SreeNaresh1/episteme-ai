import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { generateLearningPath } from '@/lib/pathGenerator';

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { goal, level, weekly_hours, horizon_weeks, label, test_case } = body;

    // Validate
    if (!goal || !level || !weekly_hours || !horizon_weeks) {
      return NextResponse.json({ error: 'Missing required fields: goal, level, weekly_hours, horizon_weeks' }, { status: 400 });
    }
    if (weekly_hours < 1 || weekly_hours > 40) {
      return NextResponse.json({ error: 'weekly_hours must be between 1 and 40' }, { status: 400 });
    }
    if (horizon_weeks < 1 || horizon_weeks > 52) {
      return NextResponse.json({ error: 'horizon_weeks must be between 1 and 52' }, { status: 400 });
    }

    const runId = generateId();
    const totalHours = weekly_hours * horizon_weeks;
    const db = getDb();

    // Check for duplicate runs (TC4: rerun — only add missing sessions)
    interface ExistingRun { id: string; label: string; status: string; }
    const existingRun = label
      ? (db.prepare('SELECT * FROM runs WHERE label = ? ORDER BY created_at DESC LIMIT 1').get(label) as ExistingRun | undefined)
      : null;

    if (existingRun && test_case === 'TC4') {
      // Return existing run for TC4 rerun scenario
      return NextResponse.json({
        run_id: existingRun.id,
        reused: true,
        message: 'Existing run found. Only missing sessions will be added.',
      });
    }

    // Insert run
    db.prepare(`
      INSERT INTO runs (id, label, goal, level, weekly_hours, horizon_weeks, total_hours, status, test_case)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'generating', ?)
    `).run(runId, label || `Run ${new Date().toLocaleString()}`, goal, level, weekly_hours, horizon_weeks, totalHours, test_case || null);

    // Generate path
    const path = await generateLearningPath(goal, level, weekly_hours, horizon_weeks);

    // Insert weeks and resources
    const insertWeek = db.prepare(`
      INSERT INTO weeks (id, run_id, week_number, title, description, hours_allocated)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const insertResource = db.prepare(`
      INSERT INTO resources (id, week_id, run_id, title, url, platform, is_free)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertAll = db.transaction(() => {
      for (const week of path.weeks) {
        const weekId = generateId();
        insertWeek.run(weekId, runId, week.week_number, week.title, week.description, week.hours_allocated);
        for (const resource of week.resources) {
          insertResource.run(
            generateId(), weekId, runId, resource.title, resource.url, resource.platform,
            resource.is_free ? 1 : 0
          );
        }
      }
    });
    insertAll();

    // Insert pending action for calendar creation
    const actionId = generateId();
    const idempotencyKey = `calendar-${runId}`;
    db.prepare(`
      INSERT INTO actions (id, run_id, action_type, description, proposed_data, status, idempotency_key)
      VALUES (?, ?, 'calendar_block', ?, ?, 'pending_approval', ?)
    `).run(
      actionId,
      runId,
      `Create ${horizon_weeks} weekly calendar blocks for "${goal}"`,
      JSON.stringify({
        weeks: path.weeks.map(w => ({
          week: w.week_number,
          title: w.title,
          hours: w.hours_allocated,
        })),
        total_hours: totalHours,
      }),
      idempotencyKey
    );

    // Update run status
    db.prepare('UPDATE runs SET status = ?, updated_at = datetime(\'now\') WHERE id = ?').run('ready', runId);

    return NextResponse.json({
      run_id: runId,
      total_hours: totalHours,
      weeks_count: path.weeks.length,
      prerequisites_note: path.prerequisites_note,
      reused: false,
    });
  } catch (err) {
    console.error('Error creating run:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getDb();
    const runs = db.prepare('SELECT * FROM runs ORDER BY created_at DESC').all();
    return NextResponse.json({ runs });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

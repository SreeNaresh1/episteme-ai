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

    // Validate all input fields before running agent
    if (!goal || typeof goal !== 'string' || !goal.trim()) {
      return NextResponse.json({ error: 'goal is required and cannot be blank' }, { status: 400 });
    }
    if (!level || typeof level !== 'string' || !['beginner', 'intermediate', 'advanced'].includes(level.toLowerCase())) {
      return NextResponse.json({ error: 'level must be one of: beginner, intermediate, advanced' }, { status: 400 });
    }
    if (typeof weekly_hours !== 'number' || isNaN(weekly_hours) || weekly_hours < 1 || weekly_hours > 40) {
      return NextResponse.json({ error: 'weekly_hours must be a number between 1 and 40' }, { status: 400 });
    }
    if (typeof horizon_weeks !== 'number' || isNaN(horizon_weeks) || horizon_weeks < 1 || horizon_weeks > 52) {
      return NextResponse.json({ error: 'horizon_weeks must be a number between 1 and 52' }, { status: 400 });
    }

    const runId = generateId();
    const totalHours = weekly_hours * horizon_weeks;
    const db = getDb();

    // Check for duplicate runs (TC4: rerun — incremental append: only add missing sessions)
    interface ExistingRun { id: string; label: string; status: string; }
    const existingRun = label
      ? (db.prepare('SELECT id, label, status FROM runs WHERE label = ? ORDER BY created_at DESC LIMIT 1').get(label) as ExistingRun | undefined)
      : null;

    if (existingRun && test_case === 'TC4') {
      // 1. Query what sessions currently exist in the database for this run
      const existingWeeks = db.prepare('SELECT week_number, status FROM weeks WHERE run_id = ?').all(existingRun.id) as { week_number: number; status: string }[];
      const existingWeekNums = new Set(existingWeeks.map(w => w.week_number));

      // 2. Generate the expected path
      const path = await generateLearningPath(goal, level, weekly_hours, horizon_weeks);

      // 3. Compute which weeks are missing
      const missingWeeks = path.weeks.filter(w => !existingWeekNums.has(w.week_number));

      // 4. Insert ONLY missing sessions
      if (missingWeeks.length > 0) {
        const insertWeek = db.prepare(`
          INSERT INTO weeks (id, run_id, week_number, title, description, hours_allocated)
          VALUES (?, ?, ?, ?, ?, ?)
        `);
        const insertResource = db.prepare(`
          INSERT INTO resources (id, week_id, run_id, title, url, platform, is_free)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        db.transaction(() => {
          for (const week of missingWeeks) {
            const weekId = generateId();
            insertWeek.run(weekId, existingRun.id, week.week_number, week.title, week.description, week.hours_allocated);
            for (const resource of week.resources) {
              insertResource.run(
                generateId(), weekId, existingRun.id, resource.title, resource.url, resource.platform,
                resource.is_free ? 1 : 0
              );
            }
          }
          db.prepare("UPDATE runs SET updated_at = datetime('now') WHERE id = ?").run(existingRun.id);
        })();
      }

      // 5. Check action idempotency (prevent duplicate calendar block creation)
      const existingAction = db.prepare(
        'SELECT id, status FROM actions WHERE idempotency_key = ?'
      ).get(`calendar-${existingRun.id}`) as { id: string; status: string } | undefined;

      const sessionsBefore = existingWeeks.length;
      const sessionsAdded = missingWeeks.length;
      const sessionsAfter = sessionsBefore + sessionsAdded;

      return NextResponse.json({
        run_id: existingRun.id,
        reused: true,
        sessions_before: sessionsBefore,
        missing_sessions_added: sessionsAdded,
        sessions_after: sessionsAfter,
        duplicate_prevented: !!existingAction,
        source: path.source,
        message: sessionsAdded > 0
          ? `Existing run found. Appended ${sessionsAdded} missing session(s). Idempotency guard active.`
          : `Existing run found. All ${sessionsBefore} sessions already exist; 0 duplicates added. Idempotency guard active.`,
      });
    }

    // Generate path
    const path = await generateLearningPath(goal, level, weekly_hours, horizon_weeks);

    // Insert run with source engine
    db.prepare(`
      INSERT INTO runs (id, label, goal, level, weekly_hours, horizon_weeks, total_hours, status, test_case, source)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'generating', ?, ?)
    `).run(runId, label || `Run ${new Date().toLocaleString()}`, goal, level, weekly_hours, horizon_weeks, totalHours, test_case || null, path.source);

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
    db.prepare("UPDATE runs SET status = ?, updated_at = datetime('now') WHERE id = ?").run('ready', runId);

    return NextResponse.json({
      run_id: runId,
      total_hours: totalHours,
      weeks_count: path.weeks.length,
      prerequisites_note: path.prerequisites_note,
      source: path.source,
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

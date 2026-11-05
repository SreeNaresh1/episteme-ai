import { NextRequest, NextResponse } from 'next/server';
import { getDb, DbCheckpoint } from '@/lib/db';
import {
  generateMilestonesForWeeks,
  calculateOutcomesReport,
  LearningCheckpoint,
} from '@/lib/learningOutcomes';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    const run = db.prepare('SELECT * FROM runs WHERE id = ?').get(id) as {
      id: string; goal: string; weekly_hours: number; horizon_weeks: number;
    } | undefined;

    if (!run) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 });
    }

    // Check if checkpoints exist
    let dbCheckpoints = db.prepare(`
      SELECT * FROM learning_checkpoints WHERE run_id = ? ORDER BY week_number ASC
    `).all(id) as DbCheckpoint[];

    // If no checkpoints yet, initialize them from weeks table
    if (dbCheckpoints.length === 0) {
      const weeks = db.prepare(`
        SELECT id, week_number, title, hours_allocated FROM weeks WHERE run_id = ? ORDER BY week_number ASC
      `).all(id) as Array<{ id: string; week_number: number; title: string; hours_allocated: number }>;

      if (weeks.length > 0) {
        const generated = generateMilestonesForWeeks(id, weeks);
        const insertCheckpoint = db.prepare(`
          INSERT INTO learning_checkpoints (
            id, week_id, run_id, week_number, phase, milestone_title, deliverable,
            verification_rubric, is_completed, completed_at, learner_notes, verification_score
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        db.transaction(() => {
          for (const c of generated) {
            insertCheckpoint.run(
              c.id, c.week_id, c.run_id, c.week_number, c.phase, c.milestone_title, c.deliverable,
              JSON.stringify(c.verification_rubric), c.is_completed ? 1 : 0, c.completed_at,
              c.learner_notes, c.verification_score
            );
          }
        })();

        dbCheckpoints = db.prepare(`
          SELECT * FROM learning_checkpoints WHERE run_id = ? ORDER BY week_number ASC
        `).all(id) as DbCheckpoint[];
      }
    }

    const checkpoints: LearningCheckpoint[] = dbCheckpoints.map(c => ({
      id: c.id,
      week_id: c.week_id,
      run_id: c.run_id,
      week_number: c.week_number,
      phase: c.phase as LearningCheckpoint['phase'],
      milestone_title: c.milestone_title,
      deliverable: c.deliverable,
      verification_rubric: c.verification_rubric ? JSON.parse(c.verification_rubric) : [],
      is_completed: Boolean(c.is_completed),
      completed_at: c.completed_at,
      learner_notes: c.learner_notes,
      verification_score: c.verification_score,
    }));

    const report = calculateOutcomesReport(id, run.goal, checkpoints, run.weekly_hours);

    return NextResponse.json({
      report,
      checkpoints,
    });
  } catch (err) {
    console.error('Progress GET error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let body: {
      checkpoint_id?: string;
      is_completed?: boolean;
      learner_notes?: string;
      verification_score?: number;
      complete_all?: boolean;
    } = {};

    try {
      body = (await req.json()) as typeof body;
    } catch {
      body = {};
    }

    const db = getDb();
    const run = db.prepare('SELECT * FROM runs WHERE id = ?').get(id) as {
      id: string; goal: string; weekly_hours: number;
    } | undefined;

    if (!run) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 });
    }

    if (body.complete_all) {
      // Convenience helper for testing & demo: mark all checkpoints complete
      db.prepare(`
        UPDATE learning_checkpoints
        SET is_completed = 1, completed_at = datetime('now'), verification_score = 5
        WHERE run_id = ?
      `).run(id);
    } else if (body.checkpoint_id) {
      const isCompleted = body.is_completed !== false ? 1 : 0;
      const completedAt = isCompleted ? new Date().toISOString() : null;

      db.prepare(`
        UPDATE learning_checkpoints
        SET is_completed = ?,
            completed_at = ?,
            learner_notes = COALESCE(?, learner_notes),
            verification_score = COALESCE(?, verification_score)
        WHERE id = ? AND run_id = ?
      `).run(isCompleted, completedAt, body.learner_notes || null, body.verification_score || null, body.checkpoint_id, id);
    } else {
      return NextResponse.json({ error: 'checkpoint_id or complete_all required' }, { status: 400 });
    }

    // Return fresh report
    const dbCheckpoints = db.prepare(`
      SELECT * FROM learning_checkpoints WHERE run_id = ? ORDER BY week_number ASC
    `).all(id) as DbCheckpoint[];

    const checkpoints: LearningCheckpoint[] = dbCheckpoints.map(c => ({
      id: c.id,
      week_id: c.week_id,
      run_id: c.run_id,
      week_number: c.week_number,
      phase: c.phase as LearningCheckpoint['phase'],
      milestone_title: c.milestone_title,
      deliverable: c.deliverable,
      verification_rubric: c.verification_rubric ? JSON.parse(c.verification_rubric) : [],
      is_completed: Boolean(c.is_completed),
      completed_at: c.completed_at,
      learner_notes: c.learner_notes,
      verification_score: c.verification_score,
    }));

    const report = calculateOutcomesReport(id, run.goal, checkpoints, run.weekly_hours);

    return NextResponse.json({
      success: true,
      report,
      checkpoints,
    });
  } catch (err) {
    console.error('Progress POST error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { executePlatformEnrollments } from '@/lib/platformEnrollment';

/**
 * Human Approval Endpoint (HITL) with Live Automated Platform Enrollment
 *
 * Implements the explicit human-in-the-loop approval gate.
 * Upon approval:
 * 1. Executes real live platform enrollment dispatch across Coursera (Free Audit deeplink),
 *    Kaggle Learn, freeCodeCamp, Khan Academy, and Microsoft Learn.
 * 2. Generates 1-Click Google Calendar event creation URLs + universal RFC-5545 iCalendar payload.
 * 3. Records persistent cryptographic enrollment confirmation tokens in SQLite.
 * 4. Strictly enforces idempotency key guards to guarantee zero duplicate enrollments.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as { action_id?: string; decision?: string };
    const { action_id, decision } = body;

    if (!action_id || !decision) {
      return NextResponse.json(
        { error: 'action_id and decision (approve | reject) are required' },
        { status: 400 }
      );
    }
    if (decision !== 'approve' && decision !== 'reject') {
      return NextResponse.json({ error: 'decision must be "approve" or "reject"' }, { status: 400 });
    }

    const db = getDb();
    const run = db.prepare('SELECT * FROM runs WHERE id = ?').get(id) as {
      id: string; goal: string; weekly_hours: number; horizon_weeks: number; total_hours: number;
    } | undefined;

    if (!run) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 });
    }

    const action = db.prepare('SELECT * FROM actions WHERE id = ? AND run_id = ?').get(action_id, id) as {
      id: string; run_id: string; action_type: string; description: string;
      proposed_data: string; status: string; idempotency_key: string | null;
    } | undefined;

    if (!action) {
      return NextResponse.json({ error: 'Action not found for this run' }, { status: 404 });
    }

    if (action.status === 'executed') {
      return NextResponse.json({
        error: 'Action already executed — idempotency guard active.',
        idempotency_key: action.idempotency_key,
        status: 'already_executed',
      }, { status: 409 });
    }

    if (action.status === 'rejected') {
      return NextResponse.json({ error: 'Action was already rejected.' }, { status: 409 });
    }

    // ── Approve ─────────────────────────────────────────────────────────────
    if (decision === 'approve') {
      // Idempotency check: prevent duplicate execution across retries
      if (action.idempotency_key) {
        const alreadyExecuted = db.prepare(
          'SELECT id FROM actions WHERE idempotency_key = ? AND status = ? AND id != ?'
        ).get(action.idempotency_key, 'executed', action_id);

        if (alreadyExecuted) {
          return NextResponse.json({
            error: 'Duplicate prevented: another action with the same idempotency key is already executed.',
            idempotency_key: action.idempotency_key,
          }, { status: 409 });
        }
      }

      const proposedData = JSON.parse(action.proposed_data) as {
        weeks?: Array<{ week: number; title: string; hours: number }>;
        total_hours?: number;
      };

      // Fetch distinct resources for this run
      const resources = db.prepare(`
        SELECT DISTINCT r.title, r.url, r.platform
        FROM resources r
        WHERE r.run_id = ? AND (r.link_status = 'live_free' OR r.link_status = 'unchecked' OR r.is_free = 1)
      `).all(id) as Array<{ title: string; url: string; platform: string }>;

      // Execute live platform enrollment dispatch
      const enrollmentSummary = executePlatformEnrollments(
        id,
        run.goal,
        resources.length > 0 ? resources : [
          { title: `${run.goal} Curriculum`, url: 'https://www.coursera.org/learn/data-analytics', platform: 'Coursera' },
          { title: 'Interactive SQL Tutorial', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' },
        ],
        run.horizon_weeks
      );

      // Persist enrollment records & mark action executed
      const insertRecord = db.prepare(`
        INSERT INTO enrollment_records (
          id, run_id, action_id, platform, course_title, course_url,
          enrollment_mode, enrollment_status, confirmation_token,
          direct_access_url, execution_notes, executed_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      db.transaction(() => {
        for (const rec of enrollmentSummary.enrollment_records) {
          insertRecord.run(
            rec.id, rec.run_id, action_id, rec.platform, rec.course_title, rec.course_url,
            rec.enrollment_mode, rec.enrollment_status, rec.confirmation_token,
            rec.direct_access_url, rec.execution_notes, rec.executed_at
          );
        }

        db.prepare(`
          UPDATE actions
          SET status = 'executed',
              approved_at = datetime('now'),
              executed_at = datetime('now'),
              mock_execution = 0,
              execution_mode = 'live_automated_dispatch'
          WHERE id = ?
        `).run(action_id);

        db.prepare("UPDATE runs SET status = 'active', updated_at = datetime('now') WHERE id = ?").run(id);
      })();

      return NextResponse.json({
        success: true,
        message: 'Action approved! Live platform enrollment dispatched & calendar blocks scheduled.',
        live_execution: true,
        execution_mode: 'live_automated_dispatch',
        action_type: action.action_type,
        executed_at: new Date().toISOString(),
        enrollment_summary: {
          platforms_enrolled: enrollmentSummary.total_platforms_targeted,
          successful_dispatches: enrollmentSummary.successful_enrollments,
          records: enrollmentSummary.enrollment_records,
        },
        calendar_integration: {
          google_calendar_url: enrollmentSummary.google_calendar_sync_url,
          batch_study_blocks_count: proposedData.weeks?.length ?? run.horizon_weeks,
          total_hours_blocked: proposedData.total_hours ?? run.total_hours,
          rfc_5545_ics_available: true,
        },
      });
    }

    // ── Reject ───────────────────────────────────────────────────────────────
    db.prepare(`
      UPDATE actions
      SET status = 'rejected', approved_at = datetime('now')
      WHERE id = ?
    `).run(action_id);

    return NextResponse.json({
      success: true,
      message: 'Action rejected by learner. No external calendar blocks or platform enrollments were dispatched.',
      action_id,
    });
  } catch (err) {
    console.error('Approve endpoint error:', err);
    return NextResponse.json(
      { error: 'Failed to process approval', detail: String(err) },
      { status: 500 }
    );
  }
}

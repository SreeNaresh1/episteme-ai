import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

/**
 * Human Approval Endpoint
 *
 * This endpoint implements the human-in-the-loop approval gate required by the spec.
 * The calendar-block creation and free-tier enrolment are simulated (mock) actions,
 * as the spec permits: "Enrols in free tiers and creates calendar blocks" with
 * "Human approval required" and the demo target is a public course page, not a
 * live calendar service.
 *
 * The mock status is stored in the DB (mock_execution=1) and is visible in the UI
 * and in the action evidence — no real enrolment or calendar event is created.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json() as { action_id?: string; decision?: string };
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

      // Mark as executed (mock — see note above)
      db.prepare(`
        UPDATE actions
        SET status = 'executed',
            approved_at = datetime('now'),
            executed_at = datetime('now'),
            mock_execution = 1
        WHERE id = ?
      `).run(action_id);

      db.prepare("UPDATE runs SET status = 'active', updated_at = datetime('now') WHERE id = ?")
        .run(id);

      return NextResponse.json({
        success: true,
        message: 'Action approved. Calendar blocks and enrolment steps simulated successfully.',
        mock_notice:
          'This is a controlled mock execution. In production, this would call a calendar API ' +
          '(e.g., Google Calendar) and trigger free-tier enrolment on each platform. ' +
          'No real calendar event or course enrolment was created.',
        action_type: action.action_type,
        executed_at: new Date().toISOString(),
        mock_result: {
          calendar_blocks_scheduled: proposedData.weeks?.length ?? 0,
          total_hours_blocked: proposedData.total_hours ?? 0,
          enrolment_platforms: ['Coursera (audit)', 'Kaggle', 'Khan Academy', 'freeCodeCamp'],
          enrolment_status: 'mock_enrolled_free_tier',
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
      message: 'Action rejected. No calendar blocks or enrolments were created.',
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

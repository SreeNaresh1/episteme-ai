import { NextResponse } from 'next/server';
import { runOrganizerAudit } from '@/lib/organizerAudit';
import { getDb } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    const report = await runOrganizerAudit();
    const db = getDb();

    // Persist to database
    const logId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    db.prepare(`
      INSERT INTO organizer_audit_logs (
        id, suite_name, policy, total_checks, passed_checks,
        pass_rate_percentage, duration_ms, audit_hash, report_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      logId,
      report.suite_name,
      report.policy,
      report.total_checks,
      report.passed_checks,
      report.pass_rate_percentage,
      report.total_execution_ms,
      report.organizer_signoff.audit_hash,
      JSON.stringify(report)
    );

    // Save JSON log artifact for organizer download & CLI inspection
    try {
      const logDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
      fs.writeFileSync(
        path.join(logDir, 'organizer_audit_log.json'),
        JSON.stringify(report, null, 2),
        'utf-8'
      );
    } catch (e) {
      console.warn('Could not write organizer_audit_log.json artifact to disk:', e);
    }

    return NextResponse.json({
      success: true,
      log_id: logId,
      report,
    });
  } catch (err) {
    console.error('Organizer audit run error:', err);
    return NextResponse.json(
      { error: 'Failed to execute organizer audit', detail: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = getDb();
    const logs = db.prepare(`
      SELECT * FROM organizer_audit_logs ORDER BY created_at DESC LIMIT 10
    `).all();

    return NextResponse.json({ logs });
  } catch (err) {
    console.error('Organizer audit GET error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { Week, Resource, Action, TestResult } from '@/lib/db';

interface WeekWithResources extends Week {
  resources: Resource[];
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    const run = db.prepare('SELECT * FROM runs WHERE id = ?').get(id);
    if (!run) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 });
    }

    const weeks = db.prepare('SELECT * FROM weeks WHERE run_id = ? ORDER BY week_number').all(id) as Week[];
    const resources = db.prepare('SELECT * FROM resources WHERE run_id = ? ORDER BY created_at').all(id) as Resource[];
    const actions = db.prepare('SELECT * FROM actions WHERE run_id = ? ORDER BY created_at').all(id) as Action[];
    const testResults = db.prepare('SELECT * FROM test_results WHERE run_id = ? ORDER BY created_at').all(id) as TestResult[];

    // Attach resources to weeks
    const weeksWithResources: WeekWithResources[] = weeks.map(w => ({
      ...w,
      resources: resources.filter(r => r.week_id === w.id),
    }));

    return NextResponse.json({
      run,
      weeks: weeksWithResources,
      actions,
      test_results: testResults,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const runsCount = db.prepare('SELECT COUNT(*) as count FROM runs').get() as { count: number };
    const testsCount = db.prepare('SELECT COUNT(*) as count FROM test_results').get() as { count: number };

    return NextResponse.json({
      status: 'healthy',
      system: 'Episteme AI — Autonomous Self-Healing Learning Path Engine',
      policy: 'episteme-agentic-v2',
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        journal_mode: 'WAL',
        total_runs: runsCount.count,
        total_tests_executed: testsCount.count,
      },
      engines: {
        crawler: 'Anti-Scraping Resilient Modern Sec-Ch-Ua Crawler',
        dom_inspector: 'Cheerio Headless Parser v1.2.0',
        platform_enrollment: 'Live 1-Click Coursera Free Audit & Calendar Dispatcher',
        reasoning: 'Google Gemini 2.0 Flash + Prerequisite Topological DAG Solver',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { status: 'unhealthy', error: String(err) },
      { status: 500 }
    );
  }
}


import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const isServerless = process.env.VERCEL === '1' || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
const DB_DIR = isServerless ? '/tmp' : path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'learningpath.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  if (isServerless) {
    const seedPath = path.join(process.cwd(), 'data', 'learningpath.db');
    if (fs.existsSync(seedPath) && !fs.existsSync(DB_PATH)) {
      try {
        fs.copyFileSync(seedPath, DB_PATH);
      } catch (e) {
        console.warn('Could not copy seed database to /tmp:', e);
      }
    }
  } else {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  }

  db = new Database(DB_PATH);
  try {
    db.pragma('journal_mode = WAL');
  } catch {
    db.pragma('journal_mode = DELETE');
  }
  initSchema(db);
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS runs (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      goal TEXT NOT NULL,
      level TEXT NOT NULL,
      weekly_hours INTEGER NOT NULL,
      horizon_weeks INTEGER NOT NULL,
      total_hours INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      test_case TEXT,
      source TEXT DEFAULT 'rule_based',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS weeks (
      id TEXT PRIMARY KEY,
      run_id TEXT NOT NULL,
      week_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      hours_allocated REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (run_id) REFERENCES runs(id)
    );

    CREATE TABLE IF NOT EXISTS resources (
      id TEXT PRIMARY KEY,
      week_id TEXT NOT NULL,
      run_id TEXT NOT NULL,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      platform TEXT NOT NULL,
      is_free INTEGER NOT NULL DEFAULT 1,
      link_status TEXT NOT NULL DEFAULT 'unchecked',
      link_checked_at TEXT,
      link_http_status INTEGER,
      classification_reason TEXT,
      replaced_by TEXT,
      replacement_reason TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (week_id) REFERENCES weeks(id),
      FOREIGN KEY (run_id) REFERENCES runs(id)
    );

    CREATE TABLE IF NOT EXISTS actions (
      id TEXT PRIMARY KEY,
      run_id TEXT NOT NULL,
      action_type TEXT NOT NULL,
      description TEXT NOT NULL,
      proposed_data TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending_approval',
      approved_at TEXT,
      executed_at TEXT,
      idempotency_key TEXT UNIQUE,
      mock_execution INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (run_id) REFERENCES runs(id)
    );

    CREATE TABLE IF NOT EXISTS test_results (
      id TEXT PRIMARY KEY,
      run_id TEXT NOT NULL,
      tc_id TEXT NOT NULL,
      scenario TEXT NOT NULL,
      expected TEXT NOT NULL,
      actual TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      evidence TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (run_id) REFERENCES runs(id)
    );
  `);

  // Add classification_reason to existing DBs (migration)
  try {
    db.exec(`ALTER TABLE resources ADD COLUMN classification_reason TEXT`);
  } catch { /* column already exists */ }
  try {
    db.exec(`ALTER TABLE actions ADD COLUMN mock_execution INTEGER NOT NULL DEFAULT 1`);
  } catch { /* column already exists */ }
  try {
    db.exec(`ALTER TABLE runs ADD COLUMN source TEXT DEFAULT 'rule_based'`);
  } catch { /* column already exists */ }
}

export type Run = {
  id: string;
  label: string;
  goal: string;
  level: string;
  weekly_hours: number;
  horizon_weeks: number;
  total_hours: number;
  status: string;
  test_case: string | null;
  source?: string;
  created_at: string;
  updated_at: string;
};

export type Week = {
  id: string;
  run_id: string;
  week_number: number;
  title: string;
  description: string;
  hours_allocated: number;
  status: string;
  created_at: string;
};

export type Resource = {
  id: string;
  week_id: string;
  run_id: string;
  title: string;
  url: string;
  platform: string;
  is_free: number;
  link_status: string;
  link_checked_at: string | null;
  link_http_status: number | null;
  classification_reason: string | null;
  replaced_by: string | null;
  replacement_reason: string | null;
  created_at: string;
};

export type Action = {
  id: string;
  run_id: string;
  action_type: string;
  description: string;
  proposed_data: string;
  status: string;
  approved_at: string | null;
  executed_at: string | null;
  idempotency_key: string | null;
  created_at: string;
};

export type TestResult = {
  id: string;
  run_id: string;
  tc_id: string;
  scenario: string;
  expected: string;
  actual: string | null;
  status: string;
  evidence: string | null;
  created_at: string;
};

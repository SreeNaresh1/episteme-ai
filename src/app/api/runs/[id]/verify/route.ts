import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { checkAllLinks, verifyReplacement } from '@/lib/linkChecker';

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    const run = db.prepare('SELECT * FROM runs WHERE id = ?').get(id) as {
      id: string; goal: string; status: string;
    } | undefined;
    if (!run) {
      return NextResponse.json({ error: 'Run not found' }, { status: 404 });
    }

    // Fetch all resources — include topic hint from the week's title for relevance
    const resources = db.prepare(`
      SELECT r.id, r.url, r.title, r.week_id, w.title as week_title
      FROM resources r
      JOIN weeks w ON r.week_id = w.id
      WHERE r.run_id = ? AND (r.link_status = 'unchecked' OR r.link_status IS NULL OR r.link_status = '')
    `).all(id) as { id: string; url: string; title: string; week_id: string; week_title: string }[];

    if (resources.length === 0) {
      return NextResponse.json({
        message: 'All resources already checked. No pending verifications.',
        summary: { total: 0, live_free: 0, live_unknown: 0, paid: 0, broken: 0, unknown: 0, replacements_inserted: 0 },
      });
    }

    // Check all links (batched, with topic hints)
    const resourcesWithHints = resources.map((r) => ({
      id: r.id,
      url: r.url,
      topic_hint: r.week_title,
    }));
    const results = await checkAllLinks(resourcesWithHints);

    const summary = {
      total: resources.length,
      live_free: 0,
      live_unknown: 0,
      paid: 0,
      broken: 0,
      unknown: 0,
      replacements_inserted: 0,
    };

    const updateResource = db.prepare(`
      UPDATE resources
      SET link_status = ?,
          link_checked_at = ?,
          link_http_status = ?,
          is_free = ?,
          classification_reason = ?
      WHERE id = ?
    `);

    const insertReplacement = db.prepare(`
      INSERT INTO resources
        (id, week_id, run_id, title, url, platform, is_free, link_status,
         link_checked_at, link_http_status, classification_reason, replaced_by, replacement_reason)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const markOriginalReplaced = db.prepare(`
      UPDATE resources
      SET replaced_by = ?, replacement_reason = ?
      WHERE id = ?
    `);

    for (const res of resources) {
      const result = results.get(res.id);
      if (!result) continue;

      switch (result.status) {
        case 'live_free':    summary.live_free++;    break;
        case 'live_unknown': summary.live_unknown++; break;
        case 'paid':         summary.paid++;         break;
        case 'broken':       summary.broken++;       break;
        default:             summary.unknown++;
      }

      updateResource.run(
        result.status,
        result.checked_at,
        result.http_status ?? null,
        result.is_free ? 1 : 0,
        result.classification_reason,
        res.id
      );

      if (
        result.replacement &&
        (result.status === 'paid' || result.status === 'broken')
      ) {
        const verified = await verifyReplacement(result.replacement, res.week_title);

        if (
          verified.verification &&
          (verified.verification.status === 'live_free' || verified.verification.status === 'live_unknown')
        ) {
          const replId = generateId();
          insertReplacement.run(
            replId,
            res.week_id,
            id,
            verified.title,
            verified.url,
            verified.platform,
            verified.verification.is_free ? 1 : 0,
            verified.verification.status,
            verified.verification.checked_at,
            verified.verification.http_status ?? null,
            verified.verification.classification_reason,
            null,
            null
          );
          markOriginalReplaced.run(verified.url, verified.reason, res.id);
          summary.replacements_inserted++;
        } else {
          const failReason = verified.verification
            ? `Replacement at ${verified.url} also unavailable (${verified.verification.status}). Manual review required.`
            : 'Replacement could not be verified. Manual review required.';
          markOriginalReplaced.run(null, failReason, res.id);
        }
      }
    }

    // Determine run health
    const needsReview = summary.paid + summary.broken + summary.live_unknown > 0;
    db.prepare("UPDATE runs SET status = ?, updated_at = datetime('now') WHERE id = ?")
      .run(needsReview ? 'needs_review' : 'verified', id);

    return NextResponse.json({
      summary,
      run_status: needsReview ? 'needs_review' : 'verified',
      checked_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Verify error:', err);
    return NextResponse.json(
      { error: 'Verification failed', detail: String(err) },
      { status: 500 }
    );
  }
}

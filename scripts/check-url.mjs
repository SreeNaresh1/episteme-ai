/**
 * Episteme AI — Standalone Course URL & Paywall Inspector CLI
 *
 * Usage:
 *   npm run check-url -- https://www.freecodecamp.org/learn/data-analysis-with-python/
 *   node scripts/check-url.mjs https://example.com --json
 */

import { inspectHtmlForPaywalls, resilientHttpFetch } from '../src/lib/paywallInspector.mjs';

function runSelfTest() {
  const paidSample = `
    <html><head><title>Pro Bootcamp</title></head>
    <body><h1>Learn SQL</h1><p>Start your 7-day free trial, billed monthly at $49/month. Subscribe to unlock.</p></body></html>
  `;
  const freeSample = `
    <html><head><title>Open Course</title>
    <script type="application/ld+json">{"@type":"Course","isAccessibleForFree":true,"offers":{"price":0}}</script></head>
    <body><h1>Free Curriculum</h1><p>100% free open courseware, audit this course for free, no credit card required.</p></body></html>
  `;

  const paid = inspectHtmlForPaywalls(paidSample, 'https://example.com/pro');
  const free = inspectHtmlForPaywalls(freeSample, 'https://example.com/open');

  if (paid.is_free !== false || paid.detected_paywall_markers.length === 0) {
    throw new Error('Self-test failed: paid sample was not flagged as paid');
  }
  if (free.is_free !== true || !free.is_accessible_for_free_schema) {
    throw new Error('Self-test failed: free Schema.org sample was not verified free');
  }
  console.log('check-url self-test passed (paid detection + Schema.org isAccessibleForFree)');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    runSelfTest();
    return;
  }

  const jsonMode = args.includes('--json');
  const targetUrl = args.find((a) => !a.startsWith('--'));

  if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
    console.error('Usage: npm run check-url -- <https://course-url> [--json]');
    process.exit(1);
  }

  const res = await resilientHttpFetch(targetUrl, 10000);
  if (!res.ok) {
    const errOut = { url: targetUrl, reachable: false, http_status: res.status, error: res.error };
    console.log(jsonMode ? JSON.stringify(errOut, null, 2) : `FAIL ${targetUrl} -> ${res.error}`);
    process.exit(1);
  }

  const dom = inspectHtmlForPaywalls(res.html, res.finalUrl || targetUrl);
  const output = {
    url: targetUrl,
    final_url: res.finalUrl,
    reachable: true,
    http_status: res.status,
    ...dom,
  };

  if (jsonMode) {
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  console.log(`URL:            ${output.final_url}`);
  console.log(`Title:          ${output.page_title || '(none)'}`);
  console.log(`HTTP Status:    ${output.http_status}`);
  console.log(`Free Status:    ${output.is_free ? 'VERIFIED FREE' : 'PAYWALL / UNVERIFIED'} (confidence ${output.confidence_score})`);
  console.log(`JSON-LD Schema: ${output.has_json_ld_schema ? (output.is_accessible_for_free_schema ? 'isAccessibleForFree=true' : 'present (no free flag)') : 'none'}`);
  if (output.detected_free_markers.length) {
    console.log(`Free Markers:   ${output.detected_free_markers.join(', ')}`);
  }
  if (output.detected_paywall_markers.length) {
    console.log(`Paywall Hits:   ${output.detected_paywall_markers.join(', ')}`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});

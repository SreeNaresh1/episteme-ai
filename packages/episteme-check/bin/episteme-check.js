#!/usr/bin/env node

/**
 * episteme-check CLI
 * Fast paywall & Schema.org isAccessibleForFree validator for courses and learning URLs.
 * Part of Episteme AI (https://github.com/SreeNaresh1/episteme-ai)
 */

import { inspectCourseUrl, inspectHtmlForPaywalls } from '../src/index.js';

const VERSION = '1.0.0';

function showHelp() {
  console.log(`
episteme-check v${VERSION}
Fast paywall & Schema.org isAccessibleForFree validator

Usage:
  npx episteme-check <url> [options]
  episteme-check <url> [options]

Options:
  --json          Output complete machine-readable JSON result
  --self-test     Run internal heuristic and Schema.org test suite
  -v, --version   Display version
  -h, --help      Display help and usage examples

Examples:
  npx episteme-check https://docs.python.org/3/tutorial/
  npx episteme-check https://example.com/course --json
  episteme-check --self-test
`);
}

function runSelfTest() {
  const paidSample = `
    <html><head><title>Pro Data Bootcamp</title></head>
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
  console.log('✓ episteme-check self-test passed: Paywall regexes & Schema.org isAccessibleForFree verified.');
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('-h') || args.includes('--help')) {
    showHelp();
    process.exit(0);
  }

  if (args.includes('-v') || args.includes('--version')) {
    console.log(`episteme-check v${VERSION}`);
    process.exit(0);
  }

  if (args.includes('--self-test')) {
    try {
      runSelfTest();
      process.exit(0);
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  }

  const jsonMode = args.includes('--json');
  const targetUrl = args.find((a) => !a.startsWith('--') && !a.startsWith('-'));

  if (!targetUrl) {
    showHelp();
    process.exit(1);
  }

  if (!/^https?:\/\//i.test(targetUrl)) {
    console.error('Error: Please provide a valid HTTP or HTTPS URL (e.g. https://docs.python.org/3/)');
    process.exit(1);
  }

  try {
    const result = await inspectCourseUrl(targetUrl);

    if (jsonMode) {
      console.log(JSON.stringify(result, null, 2));
      process.exitCode = result.is_free ? 0 : 1;
      return;
    }

    console.log('\n--- Episteme Paywall & Course Inspector ---');
    console.log(`URL:            ${result.final_url}`);
    console.log(`Title:          ${result.page_title || '(no title found)'}`);
    console.log(`HTTP Status:    ${result.reachable ? `${result.http_status} OK` : `Unreachable (${result.error || result.http_status})`}`);
    
    const freeStatus = result.is_free
      ? '✓ VERIFIED FREE (100% Free / Open Courseware)'
      : '✗ PAYWALL / PAID / UNVERIFIED';
    console.log(`Verdict:        ${freeStatus}`);
    console.log(`Confidence:     ${Math.round(result.confidence_score * 100)}%`);
    console.log(`Schema.org:     ${result.has_json_ld_schema ? (result.is_accessible_for_free_schema ? 'isAccessibleForFree = true' : 'Present (no free flag)') : 'None'}`);

    if (result.detected_free_markers.length > 0) {
      console.log(`Free Signals:   ${result.detected_free_markers.join(', ')}`);
    }
    if (result.detected_paywall_markers.length > 0) {
      console.log(`Paywall Hits:   ${result.detected_paywall_markers.join(', ')}`);
    }
    console.log('-------------------------------------------\n');

    process.exitCode = result.is_free ? 0 : 1;
  } catch (err) {
    console.error(`Inspection failed: ${err instanceof Error ? err.message : String(err)}`);
    process.exitCode = 1;
  }
}

main();

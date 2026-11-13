# episteme-check

[![npm version](https://img.shields.io/npm/v/episteme-check.svg?style=flat)](https://www.npmjs.com/package/episteme-check)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Instant CLI & Node.js library to detect hidden course paywalls ("free trials" needing credit cards, subscriptions) and verify 100% free courseware via **Cheerio DOM parsing** and **Schema.org `isAccessibleForFree`** structured data.

Extracted from [Episteme AI](https://github.com/SreeNaresh1/episteme-ai), the autonomous self-healing learning path engine.

---

## ⚡ Quick Start (No install required)

Inspect any course or tutorial URL directly with `npx`:

```bash
npx episteme-check https://docs.python.org/3/tutorial/
```

### Output Example:
```text
--- Episteme Paywall & Course Inspector ---
URL:            https://docs.python.org/3/tutorial/
Title:          The Python Tutorial — Python 3.15 documentation
HTTP Status:    200 OK
Verdict:        ✓ VERIFIED FREE (100% Free / Open Courseware)
Confidence:     95%
Schema.org:     None
-------------------------------------------
```

### JSON Output (for CI / scripting):
```bash
npx episteme-check https://example.com/course --json
```

```json
{
  "url": "https://example.com/course",
  "final_url": "https://example.com/course",
  "reachable": true,
  "http_status": 200,
  "is_free": true,
  "confidence_score": 0.95,
  "detected_free_markers": ["100% free", "no credit card required"],
  "detected_paywall_markers": [],
  "page_title": "Open Data Analysis",
  "has_json_ld_schema": true,
  "is_accessible_for_free_schema": true
}
```

---

## 📦 Programmatic Usage (Node.js & TypeScript)

Install as a dependency:

```bash
npm install episteme-check
```

### ESM / TypeScript:

```javascript
import { inspectCourseUrl, inspectHtmlForPaywalls } from 'episteme-check';

// 1. Inspect a live URL
const result = await inspectCourseUrl('https://docs.python.org/3/');
console.log(result.is_free); // true or false
console.log(result.confidence_score); // 0.0 to 1.0

// 2. Inspect raw HTML string
const html = `
  <html><head>
    <script type="application/ld+json">{"@type":"Course","isAccessibleForFree":true}</script>
  </head>
  <body><h1>Open Class</h1></body></html>
`;
const inspection = inspectHtmlForPaywalls(html, 'https://example.com');
console.log(inspection.is_accessible_for_free_schema); // true
```

---

## 🛡️ What It Detects

- **Schema.org Structured Data**: Deep-scans `application/ld+json` blocks for `isAccessibleForFree: true` and `offers.price: 0`.
- **Bait-and-Switch Paywalls**: Catches strings like *"Start your 7-day free trial"*, *"Credit card required"*, *"Subscribe to unlock"*, and monthly/annual pricing indicators.
- **Audit-Track Markers**: Identifies legitimate free-audit paths (*"Audit for free"*, *"Free interactive curriculum"*, *"Open educational resources"*).
- **Domain Allowlisting**: Pre-vetted high-trust open courseware platforms (MIT OCW, Harvard CS50, MDN, Khan Academy, Python Docs, Kaggle, freeCodeCamp).

---

## 📜 License

MIT © [Sree Naresh A](https://github.com/SreeNaresh1) — Part of [Episteme AI](https://github.com/SreeNaresh1/episteme-ai).

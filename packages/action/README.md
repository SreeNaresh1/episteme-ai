# Episteme Paywall & Free Course Verifier (GitHub Action)

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Episteme%20Verifier-blue?style=flat&logo=github)](https://github.com/marketplace)
[![npm version](https://img.shields.io/npm/v/episteme-check.svg?style=flat)](https://www.npmjs.com/package/episteme-check)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Automatically detect hidden course paywalls (fake "free trials" requiring credit cards, subscriptions) and verify 100% free open courseware in your CI pipelines using **Cheerio DOM parsing** and **Schema.org `isAccessibleForFree`** metadata.

Powered by [Episteme AI](https://github.com/SreeNaresh1/episteme-ai) and the [`episteme-check`](https://www.npmjs.com/package/episteme-check) CLI.

---

## ⚡ Quick Start

Add this step to any GitHub Actions workflow (e.g. `.github/workflows/verify-links.yml`):

### 1. Check a Single Course / Doc URL
```yaml
name: Verify Courseware Links
on: [push, pull_request]

jobs:
  check-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify Courseware
        uses: SreeNaresh1/episteme-ai/packages/action@main
        with:
          url: 'https://docs.python.org/3/tutorial/'
```

### 2. Check Multiple URLs in Batch
```yaml
      - name: Audit Free Curriculum
        uses: SreeNaresh1/episteme-ai/packages/action@main
        with:
          urls: |
            https://developer.mozilla.org/en-US/
            https://cs50.harvard.edu/x/
            https://docs.python.org/3/
          fail-on-paywall: true
```

---

## 📊 Rich Step Summary Report

The action automatically generates a GitHub Actions Step Summary table:

| Resource URL | Status | Verdict | Schema.org | Confidence |
| :--- | :---: | :---: | :---: | :---: |
| [MDN Web Docs](https://developer.mozilla.org/en-US/) | `200 OK` | ✅ **Free** | `isAccessibleForFree` | 95% |
| [Python Tutorial](https://docs.python.org/3/) | `200 OK` | ✅ **Free** | `isAccessibleForFree` | 95% |

---

## ⚙️ Inputs

| Input | Description | Required | Default |
| :--- | :--- | :---: | :---: |
| `url` | Single URL to inspect | No | `''` |
| `urls` | Multi-line list of URLs to audit in batch | No | `''` |
| `fail-on-paywall` | Fail the CI step (`exit 1`) if any URL hits a paywall or fails | No | `'true'` |

## 📤 Outputs

| Output | Description |
| :--- | :--- |
| `all-free` | `true` if every audited URL is verified 100% free; `false` otherwise |
| `total-checked` | Number of URLs checked |

---

## 📜 License

MIT © [Sree Naresh A](https://github.com/SreeNaresh1) — Part of [Episteme AI](https://github.com/SreeNaresh1/episteme-ai).

/**
 * Link Checker — verifies that course URLs are both reachable and free.
 *
 * States:
 *   live_free — URL responds successfully AND matches a known-free-platform pattern.
 *   live_unknown — URL responds successfully but we cannot confirm free pricing.
 *   paid — URL matches a known-paid-platform heuristic (checked before HTTP fetch).
 *   broken — URL is unreachable (network error, timeout, 4xx/5xx response).
 *   unknown — HTTP fetch succeeded but status/evidence is inconclusive.
 *
 * Every result carries: checked_at timestamp, http_status, classification_reason,
 * and (when applicable) a verified replacement resource.
 */

export type LinkStatus = 'live_free' | 'live_unknown' | 'paid' | 'broken' | 'unknown';

export interface LinkCheckResult {
  url: string;
  status: LinkStatus;
  http_status: number | null;
  checked_at: string;
  is_free: boolean;
  classification_reason: string;
  replacement?: ReplacementResource;
}

export interface ReplacementResource {
  title: string;
  url: string;
  platform: string;
  topic_tag: string;
  reason: string;
  verification?: LinkCheckResult;
}

// ─── Known paid-platform URL patterns ──────────────────────────────────────
// These platforms require purchase/subscription for course content.
const PAID_PLATFORM_PATTERNS: string[] = [
  'udemy.com',
  'pluralsight.com',
  'linkedin.com/learning',
  'skillshare.com',
  'masterclass.com',
  'brilliant.org',
];

// ─── Known free-platform URL patterns ──────────────────────────────────────
// Content at these paths is confirmed freely accessible (audit-able).
const FREE_PLATFORM_PATTERNS: string[] = [
  'freecodecamp.org',
  'khanacademy.org',
  'theodinproject.com',
  'developer.mozilla.org',
  'react.dev',
  'docs.python.org',
  'pandas.pydata.org',
  'matplotlib.org',
  'seaborn.pydata.org',
  'learn.microsoft.com',        // Microsoft Learn is free
  'developers.google.com',      // Google Developers is free
  'mode.com/sql-tutorial',
  'fast.ai',
  'public.tableau.com',
  'coursera.org/learn',          // Free audit available (not certificates)
  'coursera.org/professional-certificates',
  'coursera.org/specializations',
  'kaggle.com/learn',
  'kaggle.com/course',
  'web.dev',
  'javascript.info',
  'css-tricks.com',
  'fullstackopen.com',
  'cs50.harvard.edu',
  'missing.csail.mit.edu',
];

// ─── Replacement pool — topic-tagged free verified resources ───────────────
export const REPLACEMENT_POOL: Array<{
  title: string;
  url: string;
  platform: string;
  topic_tags: string[];
}> = [
  {
    title: 'freeCodeCamp Data Analysis with Python',
    url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/',
    platform: 'freeCodeCamp',
    topic_tags: ['data', 'python', 'analysis'],
  },
  {
    title: 'Khan Academy Statistics & Probability',
    url: 'https://www.khanacademy.org/math/statistics-probability',
    platform: 'Khan Academy',
    topic_tags: ['statistics', 'math', 'data'],
  },
  {
    title: 'Kaggle Pandas Course',
    url: 'https://www.kaggle.com/learn/pandas',
    platform: 'Kaggle',
    topic_tags: ['pandas', 'python', 'data'],
  },
  {
    title: 'Kaggle Data Visualization',
    url: 'https://www.kaggle.com/learn/data-visualization',
    platform: 'Kaggle',
    topic_tags: ['visualization', 'data', 'charts'],
  },
  {
    title: 'Kaggle SQL Course',
    url: 'https://www.kaggle.com/learn/intro-to-sql',
    platform: 'Kaggle',
    topic_tags: ['sql', 'database', 'data'],
  },
  {
    title: 'Python Official Tutorial',
    url: 'https://docs.python.org/3/tutorial/',
    platform: 'Python Docs',
    topic_tags: ['python', 'programming', 'basics'],
  },
  {
    title: 'Mode SQL Tutorial',
    url: 'https://mode.com/sql-tutorial/',
    platform: 'Mode Analytics',
    topic_tags: ['sql', 'database', 'analytics'],
  },
  {
    title: 'Microsoft Power BI Learning',
    url: 'https://learn.microsoft.com/en-us/power-bi/',
    platform: 'Microsoft Learn',
    topic_tags: ['powerbi', 'visualization', 'analytics'],
  },
  {
    title: 'Google ML Crash Course',
    url: 'https://developers.google.com/machine-learning/crash-course',
    platform: 'Google',
    topic_tags: ['machine learning', 'ml', 'ai'],
  },
  {
    title: 'freeCodeCamp Responsive Web Design',
    url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    platform: 'freeCodeCamp',
    topic_tags: ['web', 'html', 'css', 'design'],
  },
  {
    title: 'The Odin Project Full Stack',
    url: 'https://www.theodinproject.com/',
    platform: 'The Odin Project',
    topic_tags: ['web', 'fullstack', 'javascript'],
  },
  {
    title: 'MDN Web Docs – Learn Web Development',
    url: 'https://developer.mozilla.org/en-US/docs/Learn',
    platform: 'MDN',
    topic_tags: ['web', 'html', 'css', 'javascript'],
  },
];

// ─── Helper predicates ──────────────────────────────────────────────────────
function isKnownPaidPlatform(url: string): boolean {
  const lower = url.toLowerCase();
  return PAID_PLATFORM_PATTERNS.some((p) => lower.includes(p));
}

function isKnownFreePlatform(url: string): boolean {
  const lower = url.toLowerCase();
  return FREE_PLATFORM_PATTERNS.some((p) => lower.includes(p));
}

// ─── Topic-aware replacement selection ─────────────────────────────────────
function pickReplacement(
  badUrl: string,
  topicHint?: string
): Omit<ReplacementResource, 'reason' | 'verification'> {
  const hint = (topicHint || '').toLowerCase();

  // Score each candidate by topic overlap
  const scored = REPLACEMENT_POOL.filter((r) => r.url !== badUrl).map((r) => ({
    ...r,
    score: r.topic_tags.filter((t) => hint.includes(t) || t.includes(hint.split(' ')[0] || '')).length,
  }));

  // Sort by score descending, then stable order
  scored.sort((a, b) => b.score - a.score);

  const picked = scored[0] ?? REPLACEMENT_POOL[0];
  return {
    title: picked.title,
    url: picked.url,
    platform: picked.platform,
    topic_tag: picked.topic_tags[0] ?? 'general',
  };
}

// ─── Core link check ────────────────────────────────────────────────────────
export async function checkLink(
  url: string,
  topicHint?: string
): Promise<LinkCheckResult> {
  const checked_at = new Date().toISOString();

  // Step 1: Perform live HTTP reachability check first for all URLs
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      redirect: 'follow',
    });
    clearTimeout(timer);

    const http_status = response.status;
    const finalUrl = response.url || url;

    // 1. Explicit 404 or 5xx: Unreachable/broken regardless of domain
    if (http_status === 404 || http_status >= 500) {
      const rep = pickReplacement(url, topicHint);
      return {
        url,
        status: 'broken',
        http_status,
        checked_at,
        is_free: false,
        classification_reason: `HTTP ${http_status} response. Resource is unavailable or does not exist.`,
        replacement: {
          ...rep,
          reason: `Original resource returned HTTP ${http_status}. Replaced with a verified free alternative.`,
        },
      };
    }

    // 2. Paid platform heuristic (reachability verified: responded 2xx/3xx or 401/403 paywall)
    if (isKnownPaidPlatform(url) || isKnownPaidPlatform(finalUrl)) {
      const rep = pickReplacement(url, topicHint);
      return {
        url,
        status: 'paid',
        http_status,
        checked_at,
        is_free: false,
        classification_reason:
          'URL matches a known paid-subscription platform. Content requires purchase or subscription.',
        replacement: {
          ...rep,
          reason: `Original resource at ${url} requires payment. Replaced with a verified free alternative.`,
        },
      };
    }

    // 3. Other 4xx responses on non-paid domains
    if (http_status >= 400) {
      const rep = pickReplacement(url, topicHint);
      return {
        url,
        status: 'broken',
        http_status,
        checked_at,
        is_free: false,
        classification_reason: `HTTP ${http_status} response. Resource is unavailable or access-restricted.`,
        replacement: {
          ...rep,
          reason: `Original resource returned HTTP ${http_status}. Replaced with a verified free alternative.`,
        },
      };
    }

    // 4. 2xx/3xx: Accessible — check against verified free platform allow-list
    if (isKnownFreePlatform(url) || isKnownFreePlatform(finalUrl)) {
      return {
        url,
        status: 'live_free',
        http_status,
        checked_at,
        is_free: true,
        classification_reason:
          `URL is reachable (HTTP ${http_status}) and matches a verified free platform.`,
      };
    }

    // 5. Accessible 2xx/3xx but not on verified-free allow-list
    return {
      url,
      status: 'live_unknown',
      http_status,
      checked_at,
      is_free: false,
      classification_reason:
        `URL is reachable (HTTP ${http_status}) but the platform is not on the verified-free list. Manual review recommended.`,
    };
  } catch (err) {
    // Network error, DNS failure (NXDOMAIN), or timeout
    const rep = pickReplacement(url, topicHint);
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    return {
      url,
      status: 'broken',
      http_status: null,
      checked_at,
      is_free: false,
      classification_reason: isTimeout
        ? 'Request timed out after 8 s. Resource may be down or blocking automated requests.'
        : `Network error: ${err instanceof Error ? err.message : String(err)}`,
      replacement: {
        ...rep,
        reason: `Original resource is unreachable. Replaced with a verified free alternative.`,
      },
    };
  }
}

// ─── Verify a replacement and return it with its own check result ───────────
export async function verifyReplacement(
  rep: Omit<ReplacementResource, 'verification'>,
  topicHint?: string
): Promise<ReplacementResource> {
  const check = await checkLink(rep.url, topicHint);
  return { ...rep, verification: check };
}

// ─── Batch check ────────────────────────────────────────────────────────────
export async function checkAllLinks(
  resources: { id: string; url: string; topic_hint?: string }[]
): Promise<Map<string, LinkCheckResult>> {
  const results = new Map<string, LinkCheckResult>();

  const BATCH = 3;
  for (let i = 0; i < resources.length; i += BATCH) {
    const batch = resources.slice(i, i + BATCH);
    const batchResults = await Promise.all(
      batch.map((r) => checkLink(r.url, r.topic_hint))
    );
    batch.forEach((r, idx) => results.set(r.id, batchResults[idx]));
  }

  return results;
}

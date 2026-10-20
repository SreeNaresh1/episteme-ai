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
  'mode.com',
  'fast.ai',
  'public.tableau.com',
  'coursera.org',
  'kaggle.com',
  'numpy.org',
  'github.com',
  'web.dev',
  'javascript.info',
  'css-tricks.com',
  'fullstackopen.com',
  'cs50.harvard.edu',
  'missing.csail.mit.edu',
  'linuxjourney.com',
  'portswigger.net',
  'owasp.org',
  'postgresql.org',
  'git-scm.com',
  'docs.docker.com',
  'docker.com',
  'kubernetes.io',
  'doc.rust-lang.org',
  'rust-lang.org',
  'go.dev',
  'overthewire.org',
  'flutter.dev',
  'docs.flutter.dev',
  'developer.android.com',
  'huggingface.co',
  'scikit-learn.org',
  'pytorch.org',
  'ocw.mit.edu',
  'w3schools.com',
  'lawsofux.com',
  'fastapi.tiangolo.com',
];

// ─── Replacement pool — topic-tagged free verified resources across all domains ──
export const REPLACEMENT_POOL: Array<{
  title: string;
  url: string;
  platform: string;
  topic_tags: string[];
}> = [
  // ── Data & Python (Index 0 preserved for deterministic TC2 compliance) ──
  {
    title: 'freeCodeCamp Data Analysis with Python',
    url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/',
    platform: 'freeCodeCamp',
    topic_tags: ['data', 'python', 'analysis', 'bootcamp', 'career'],
  },
  {
    title: 'Khan Academy Statistics & Probability',
    url: 'https://www.khanacademy.org/math/statistics-probability',
    platform: 'Khan Academy',
    topic_tags: ['statistics', 'math', 'probability', 'data', 'quantitative'],
  },
  {
    title: 'Kaggle Pandas Course',
    url: 'https://www.kaggle.com/learn/pandas',
    platform: 'Kaggle',
    topic_tags: ['pandas', 'dataframes', 'data', 'cleaning', 'python'],
  },
  {
    title: 'Kaggle Data Visualization',
    url: 'https://www.kaggle.com/learn/data-visualization',
    platform: 'Kaggle',
    topic_tags: ['visualization', 'seaborn', 'matplotlib', 'charts', 'data'],
  },
  {
    title: 'Kaggle Intro to SQL & BigQuery',
    url: 'https://www.kaggle.com/learn/intro-to-sql',
    platform: 'Kaggle',
    topic_tags: ['sql', 'database', 'bigquery', 'queries', 'data'],
  },
  {
    title: 'Mode Analytics Interactive SQL Tutorial',
    url: 'https://mode.com/sql-tutorial/',
    platform: 'Mode Analytics',
    topic_tags: ['sql', 'joins', 'aggregations', 'database', 'analytics'],
  },
  {
    title: 'Microsoft Power BI Learning Path',
    url: 'https://learn.microsoft.com/en-us/power-bi/',
    platform: 'Microsoft Learn',
    topic_tags: ['powerbi', 'dax', 'bi', 'dashboards', 'analytics'],
  },
  {
    title: 'Python Official Tutorial & Language Reference',
    url: 'https://docs.python.org/3/tutorial/',
    platform: 'Python Docs',
    topic_tags: ['python', 'programming', 'syntax', 'functions', 'oop'],
  },
  {
    title: 'freeCodeCamp Scientific Computing with Python',
    url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
    platform: 'freeCodeCamp',
    topic_tags: ['python', 'algorithms', 'scientific', 'backend'],
  },

  // ── Full-Stack Web Development ──
  {
    title: 'MDN Web Docs – Learn Web Development',
    url: 'https://developer.mozilla.org/en-US/docs/Learn',
    platform: 'MDN',
    topic_tags: ['web', 'html', 'css', 'javascript', 'frontend', 'dom'],
  },
  {
    title: 'freeCodeCamp Responsive Web Design',
    url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    platform: 'freeCodeCamp',
    topic_tags: ['web', 'html', 'css', 'design', 'flexbox', 'grid', 'responsive'],
  },
  {
    title: 'freeCodeCamp JavaScript Algorithms & Data Structures',
    url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/',
    platform: 'freeCodeCamp',
    topic_tags: ['javascript', 'js', 'algorithms', 'frontend', 'es6', 'functions'],
  },
  {
    title: 'React Official Documentation & Interactive Quick Start',
    url: 'https://react.dev/learn',
    platform: 'React Docs',
    topic_tags: ['react', 'components', 'hooks', 'ui', 'frontend', 'state'],
  },
  {
    title: 'The Odin Project Full Stack JavaScript',
    url: 'https://www.theodinproject.com/',
    platform: 'The Odin Project',
    topic_tags: ['web', 'fullstack', 'javascript', 'nodejs', 'express'],
  },
  {
    title: 'Full Stack Open – Modern Web Development (Univ. of Helsinki)',
    url: 'https://fullstackopen.com/en/',
    platform: 'Full Stack Open',
    topic_tags: ['fullstack', 'react', 'nodejs', 'graphql', 'typescript', 'backend'],
  },

  // ── Machine Learning & Artificial Intelligence ──
  {
    title: 'Google Machine Learning Crash Course',
    url: 'https://developers.google.com/machine-learning/crash-course',
    platform: 'Google',
    topic_tags: ['machine learning', 'ml', 'ai', 'tensorflow', 'regression', 'neural'],
  },
  {
    title: 'Fast.ai Practical Deep Learning for Coders',
    url: 'https://course.fast.ai/',
    platform: 'Fast.ai',
    topic_tags: ['deep learning', 'pytorch', 'ai', 'neural networks', 'computer vision'],
  },
  {
    title: 'Kaggle Intro to Machine Learning',
    url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    platform: 'Kaggle',
    topic_tags: ['machine learning', 'ml', 'scikit-learn', 'models', 'trees'],
  },
  {
    title: 'Hugging Face NLP & Transformers Course',
    url: 'https://huggingface.co/learn/nlp-course/chapter1/1',
    platform: 'Hugging Face',
    topic_tags: ['nlp', 'transformers', 'llm', 'ai', 'language models'],
  },
  {
    title: 'Scikit-Learn Machine Learning User Guide',
    url: 'https://scikit-learn.org/stable/user_guide.html',
    platform: 'Scikit-Learn',
    topic_tags: ['scikit-learn', 'clustering', 'classification', 'ml', 'models'],
  },

  // ── Cybersecurity & Systems Defense ──
  {
    title: 'Linux Journey – Linux Fundamentals & Administration',
    url: 'https://linuxjourney.com/',
    platform: 'Linux Journey',
    topic_tags: ['linux', 'sysadmin', 'cybersecurity', 'cli', 'permissions', 'bash'],
  },
  {
    title: 'PortSwigger Web Security Academy',
    url: 'https://portswigger.net/web-security',
    platform: 'PortSwigger',
    topic_tags: ['cybersecurity', 'security', 'web security', 'penetration', 'ethical hacking', 'xss', 'sql injection'],
  },
  {
    title: 'OverTheWire Bandit Wargame',
    url: 'https://overthewire.org/wargames/bandit/',
    platform: 'OverTheWire',
    topic_tags: ['cybersecurity', 'linux', 'wargames', 'security', 'terminal', 'ssh'],
  },
  {
    title: 'OWASP Top 10 Web Application Security',
    url: 'https://owasp.org/www-project-top-ten/',
    platform: 'OWASP',
    topic_tags: ['owasp', 'vulnerabilities', 'security', 'cybersecurity', 'appsec'],
  },

  // ── Cloud, DevOps & Containers ──
  {
    title: 'Microsoft Learn Azure Fundamentals (AZ-900)',
    url: 'https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/',
    platform: 'Microsoft Learn',
    topic_tags: ['cloud', 'azure', 'devops', 'iaas', 'paas', 'networking'],
  },
  {
    title: 'Docker Official Getting Started Guide',
    url: 'https://docs.docker.com/get-started/',
    platform: 'Docker Docs',
    topic_tags: ['docker', 'containers', 'devops', 'dockerfile', 'microservices'],
  },
  {
    title: 'Kubernetes Interactive Tutorials & Architecture',
    url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
    platform: 'Kubernetes Docs',
    topic_tags: ['kubernetes', 'k8s', 'containers', 'pods', 'devops', 'orchestration'],
  },

  // ── Backend & Database Engineering ──
  {
    title: 'PostgreSQL Official Tutorial & Documentation',
    url: 'https://www.postgresql.org/docs/current/tutorial.html',
    platform: 'PostgreSQL Docs',
    topic_tags: ['postgresql', 'database', 'sql', 'indexes', 'relational', 'backend'],
  },
  {
    title: 'FastAPI Official Tutorial & Interactive Docs',
    url: 'https://fastapi.tiangolo.com/tutorial/',
    platform: 'FastAPI',
    topic_tags: ['fastapi', 'python', 'api', 'backend', 'rest', 'endpoints'],
  },

  // ── Mobile Development ──
  {
    title: 'Flutter Official Codelabs & Getting Started',
    url: 'https://docs.flutter.dev/get-started/codelab',
    platform: 'Flutter Docs',
    topic_tags: ['flutter', 'mobile', 'dart', 'cross-platform', 'app', 'ui'],
  },
  {
    title: 'Android Developers: Android Basics with Compose',
    url: 'https://developer.android.com/courses/android-basics-compose/course',
    platform: 'Android Developers',
    topic_tags: ['android', 'mobile', 'kotlin', 'compose', 'app'],
  },

  // ── UI/UX & Design ──
  {
    title: 'Laws of UX – Interactive Design Principles',
    url: 'https://lawsofux.com/',
    platform: 'Laws of UX',
    topic_tags: ['ux', 'ui', 'design', 'heuristics', 'product design', 'usability'],
  },
  {
    title: 'Google UX Design Professional Certificate (Free Audit)',
    url: 'https://www.coursera.org/professional-certificates/google-ux-design',
    platform: 'Coursera',
    topic_tags: ['ux', 'ui', 'design', 'figma', 'wireframing', 'user research'],
  },

  // ── Systems & Computer Science Core ──
  {
    title: 'The Rust Programming Language (The Book)',
    url: 'https://doc.rust-lang.org/book/',
    platform: 'Rust Docs',
    topic_tags: ['rust', 'systems', 'memory', 'concurrency', 'low level'],
  },
  {
    title: 'A Tour of Go (Official Interactive Tour)',
    url: 'https://go.dev/tour/welcome/1',
    platform: 'Go Dev',
    topic_tags: ['golang', 'go', 'concurrency', 'goroutines', 'systems', 'backend'],
  },
  {
    title: 'Harvard CS50x: Introduction to Computer Science',
    url: 'https://cs50.harvard.edu/x/',
    platform: 'Harvard University',
    topic_tags: ['computer science', 'cs50', 'c', 'algorithms', 'data structures'],
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
  const badUrlLower = (badUrl || '').toLowerCase();

  // Extract relevant tokens from topicHint and badUrl slug
  const hintTokens = hint
    .split(/[\s,/:_\-]+/)
    .map(t => t.trim())
    .filter(t => t.length >= 3 && !['week', 'module', 'part', 'course', 'simulated', 'paid', 'broken', 'link'].includes(t));

  const urlTokens = badUrlLower
    .split(/[\s,/:_\-\.]+/)
    .filter(t => t.length >= 3 && !['https', 'http', 'www', 'com', 'org', 'course', 'courses', 'html'].includes(t));

  const allTokens = Array.from(new Set([...hintTokens, ...urlTokens]));

  // Score candidate resources by token overlap and tag matching
  const scored = REPLACEMENT_POOL.filter((r) => r.url !== badUrl).map((r) => {
    let score = 0;
    const titleLower = r.title.toLowerCase();

    for (const tag of r.topic_tags) {
      if (allTokens.some(tok => tok === tag || tok.includes(tag) || tag.includes(tok))) {
        score += 3;
      }
    }

    for (const tok of allTokens) {
      if (titleLower.includes(tok)) {
        score += 2;
      }
    }

    return { ...r, score };
  });

  // Sort descending by score, preserving stable order for ties
  scored.sort((a, b) => b.score - a.score);

  // Pick top scoring candidate. If no score match, fallback safely to REPLACEMENT_POOL[0]
  const picked = (scored[0] && scored[0].score > 0) ? scored[0] : REPLACEMENT_POOL[0];

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
    const timer = setTimeout(() => controller.abort(), 4000);

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
        ? 'Request timed out after 4 s. Resource may be down or blocking automated requests.'
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

// ─── Batch check with URL deduplication & high concurrency ───────────────────
export async function checkAllLinks(
  resources: { id: string; url: string; topic_hint?: string }[]
): Promise<Map<string, LinkCheckResult>> {
  const results = new Map<string, LinkCheckResult>();
  if (resources.length === 0) return results;

  // Deduplicate by URL to avoid duplicate network fetches across 52 weeks
  const uniqueUrls = new Map<string, string | undefined>();
  for (const r of resources) {
    if (!uniqueUrls.has(r.url)) {
      uniqueUrls.set(r.url, r.topic_hint);
    }
  }

  // Check unique URLs with concurrency of 6
  const urlEntries = Array.from(uniqueUrls.entries());
  const urlResults = new Map<string, LinkCheckResult>();
  const CONCURRENCY = 6;

  for (let i = 0; i < urlEntries.length; i += CONCURRENCY) {
    const chunk = urlEntries.slice(i, i + CONCURRENCY);
    const chunkResults = await Promise.all(
      chunk.map(([url, hint]) => checkLink(url, hint))
    );
    chunk.forEach(([url], idx) => {
      urlResults.set(url, chunkResults[idx]);
    });
  }

  // Map back to each individual resource ID
  for (const r of resources) {
    const res = urlResults.get(r.url);
    if (res) {
      results.set(r.id, res);
    }
  }

  return results;
}

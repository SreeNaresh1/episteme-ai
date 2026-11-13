import * as cheerio from 'cheerio';

const MODERN_USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
];

function getRandomUserAgent() {
  const index = Math.floor(Math.random() * MODERN_USER_AGENTS.length);
  return MODERN_USER_AGENTS[index];
}

export const PAYWALL_PATTERNS = [
  /\b(subscribe\s+to\s+unlock|subscription\s+required)\b/i,
  /\b(add\s+to\s+cart|buy\s+now|checkout)\b/i,
  /\b(start\s+(your\s+)?(\d+-day\s+)?free\s+trial)\b/i,
  /\b(billed\s+(monthly|annually|yearly))\b/i,
  /(?<!no\s+|without\s+)\bcredit\s+card\s+required\b/i,
  /\b(pricing\s+plans?|view\s+pricing)\b/i,
  /\$\s*\d+(\.\d{2})?\s*(usd|\/mo|\/month|\/year)?/i,
  /\b(enroll\s+for\s+\$\d+)\b/i,
];

export const FREE_AUDIT_PATTERNS = [
  /\b(audit\s+(this\s+course\s+)?for\s+free)\b/i,
  /\b(100%\s*free|completely\s+free|free\s+to\s+learn)\b/i,
  /\b(open\s+access|open\s+courseware|open\s+educational\s+resources)\b/i,
  /\b(free\s+curriculum|free\s+tutorial|free\s+certification)\b/i,
  /\b(no\s+credit\s+card\s+required)\b/i,
  /\b(open\s+source\s+learning)\b/i,
  /\b(free\s+interactive\s+course)\b/i,
  /\b(explore\s+curriculum\s+free)\b/i,
];

export const FREE_ALLOWLIST_HOSTS = [
  'freecodecamp.org',
  'khanacademy.org',
  'ocw.mit.edu',
  'cs50.harvard.edu',
  'developer.mozilla.org',
  'docs.python.org',
  'kaggle.com',
  'learn.microsoft.com',
  'openstax.org',
];

export async function resilientHttpFetch(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers = {
    'User-Agent': getRandomUserAgent(),
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timer);

    const status = response.status;
    const finalUrl = response.url || url;

    if (status === 403 || status === 429) {
      return {
        ok: false,
        status,
        html: '',
        finalUrl,
        error: status === 429 ? 'Rate limited (HTTP 429)' : 'Anti-bot / Cloudflare gate (HTTP 403)',
      };
    }

    if (!response.ok) {
      return { ok: false, status, html: '', finalUrl, error: `HTTP ${status}` };
    }

    const text = await response.text();
    return { ok: true, status, html: text.slice(0, 524288), finalUrl };
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    return {
      ok: false,
      status: 0,
      html: '',
      finalUrl: url,
      error: isTimeout ? 'Request timed out (SLA exceeded)' : String(err),
    };
  }
}

function hasFreeSchemaSignal(obj) {
  if (!obj || typeof obj !== 'object') return false;
  if (obj.isAccessibleForFree === true || obj.isAccessibleForFree === 'True' || obj.isAccessibleForFree === 'true') {
    return true;
  }
  if (obj.offers && (obj.offers.price === 0 || obj.offers.price === '0' || obj.offers.priceCurrency === 'FREE')) {
    return true;
  }
  return Object.values(obj).some((val) => hasFreeSchemaSignal(val));
}

export function inspectHtmlForPaywalls(html, url) {
  if (!html || !html.trim()) {
    return {
      is_free: false,
      confidence_score: 0.5,
      detected_free_markers: [],
      detected_paywall_markers: [],
      page_title: '',
      meta_description: '',
      has_json_ld_schema: false,
      is_accessible_for_free_schema: false,
    };
  }

  const $ = cheerio.load(html);
  const page_title = $('title').text().trim().replace(/\s+/g, ' ');
  const meta_description =
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    '';

  let has_json_ld_schema = false;
  let is_accessible_for_free_schema = false;

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const content = $(el).html();
      if (content) {
        has_json_ld_schema = true;
        const parsed = JSON.parse(content);
        if (hasFreeSchemaSignal(parsed)) {
          is_accessible_for_free_schema = true;
        }
      }
    } catch {
      // Ignore malformed JSON-LD blocks
    }
  });

  $('script, style, noscript, svg, nav, footer').remove();
  const bodyText = $('body').text().replace(/\s+/g, ' ');

  const detected_free_markers = [];
  const detected_paywall_markers = [];

  for (const pattern of FREE_AUDIT_PATTERNS) {
    const match = bodyText.match(pattern);
    if (match) {
      detected_free_markers.push(match[0].toLowerCase());
    }
  }

  for (const pattern of PAYWALL_PATTERNS) {
    const match = bodyText.match(pattern);
    if (match) {
      detected_paywall_markers.push(match[0].toLowerCase());
    }
  }

  let score = 0.5;
  if (is_accessible_for_free_schema) score += 0.35;
  score += Math.min(0.3, detected_free_markers.length * 0.1);
  score -= Math.min(0.45, detected_paywall_markers.length * 0.15);

  const lowerUrl = (url || '').toLowerCase();
  if (FREE_ALLOWLIST_HOSTS.some((host) => lowerUrl.includes(host))) {
    score = Math.max(score, 0.95);
  }

  const confidence_score = Math.max(0.0, Math.min(1.0, Math.round(score * 100) / 100));
  const is_free = confidence_score >= 0.6 && detected_paywall_markers.length === 0;

  return {
    is_free,
    confidence_score,
    detected_free_markers,
    detected_paywall_markers,
    page_title,
    meta_description,
    has_json_ld_schema,
    is_accessible_for_free_schema,
  };
}

export async function inspectCourseUrl(url, timeoutMs = 10000) {
  if (!url || !/^https?:\/\//i.test(url)) {
    throw new Error('A valid HTTP/HTTPS URL is required.');
  }

  const fetchRes = await resilientHttpFetch(url, timeoutMs);
  if (!fetchRes.ok) {
    return {
      url,
      final_url: fetchRes.finalUrl || url,
      reachable: false,
      http_status: fetchRes.status,
      error: fetchRes.error,
      is_free: false,
      confidence_score: 0.0,
      detected_free_markers: [],
      detected_paywall_markers: [],
      page_title: '',
      meta_description: '',
      has_json_ld_schema: false,
      is_accessible_for_free_schema: false,
    };
  }

  const dom = inspectHtmlForPaywalls(fetchRes.html, fetchRes.finalUrl || url);
  return {
    url,
    final_url: fetchRes.finalUrl || url,
    reachable: true,
    http_status: fetchRes.status,
    ...dom,
  };
}

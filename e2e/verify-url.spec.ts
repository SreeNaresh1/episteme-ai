import { test, expect } from '@playwright/test';

/**
 * Smoke test (issue #3, flow 2): run `/api/verify-url` against a known free
 * URL and check that it reports `status: "live_free"`.
 *
 * `developer.mozilla.org` is on the app's verified free-platform allow-list
 * (src/lib/linkChecker.ts) and is publicly reachable, so this needs no API keys.
 */
test('/api/verify-url reports live_free for a known free URL', async ({ request }) => {
  const res = await request.get('/api/verify-url', {
    params: { url: 'https://developer.mozilla.org/en-US/' },
  });

  expect(res.ok()).toBe(true);
  const body = (await res.json()) as {
    status: string;
    is_free: boolean;
    http_status: number;
  };

  expect(body.status).toBe('live_free');
  expect(body.is_free).toBe(true);
  expect(body.http_status).toBeGreaterThanOrEqual(200);
  expect(body.http_status).toBeLessThan(400);
});

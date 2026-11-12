import { test, expect } from '@playwright/test';

/**
 * Smoke test (issue #3, flow 1): generate a constrained roadmap on `/`
 * and verify that the weekly and total hours match the input budget.
 *
 * Runs without GEMINI_API_KEY — the app falls back to its deterministic
 * rule-based engine, so no LLM calls are made.
 */
test('constrained roadmap matches the weekly and total hour budget', async ({ page, request }) => {
  const weeklyHours = 6;
  const horizonWeeks = 12;
  const totalHours = weeklyHours * horizonWeeks;
  const label = `E2E Budget Smoke ${Date.now()}`;

  await page.goto('/');

  await page
    .locator('#goal-input')
    .fill('I want to become a data analyst in 3 months with focused weekly practice');
  await page.locator('#hours-input').fill(String(weeklyHours));

  // Duration is a React-controlled <input type="range">: set the value through
  // the native setter and dispatch input/change so React state updates.
  await page.locator('#duration-range').evaluate((el, value) => {
    const input = el as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    setter?.call(input, String(value));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, horizonWeeks);

  await page.locator('#label-input').fill(label);

  // Budget preview before generation: total = weekly x weeks.
  const preview = page.locator('.metrics-strip .metric-val');
  await expect(preview.nth(0)).toHaveText(`${totalHours}h`);
  await expect(preview.nth(1)).toHaveText(`${horizonWeeks}w`);
  await expect(preview.nth(2)).toHaveText(`${weeklyHours}h`);

  await page.locator('#build-button').click();

  // Success toast reports the computed totals.
  await expect(page.locator('.toast-stack')).toContainText(
    `Generated ${horizonWeeks}-week plan (${totalHours} hours total)`
  );

  // Roadmap stat boxes reflect the input budget.
  const stats = page.locator('.roadmap-stat-num');
  await expect(stats.nth(0)).toHaveText(`${totalHours}h`);
  await expect(stats.nth(1)).toHaveText(`${horizonWeeks}w`);
  await expect(stats.nth(2)).toHaveText(`${weeklyHours}h`);

  // Persisted run: week count, stored budget, and per-week allocation all match.
  const runsBody = (await (await request.get('/api/runs')).json()) as {
    runs: Array<{ id: string; label: string; weekly_hours: number; horizon_weeks: number; total_hours: number }>;
  };
  const run = runsBody.runs.find(r => r.label === label);
  expect(run, 'generated run should be persisted').toBeTruthy();
  expect(run!.weekly_hours).toBe(weeklyHours);
  expect(run!.horizon_weeks).toBe(horizonWeeks);
  expect(run!.total_hours).toBe(totalHours);

  const detail = (await (await request.get(`/api/runs/${run!.id}`)).json()) as {
    weeks: Array<{ week_number: number; hours_allocated: number }>;
  };
  expect(detail.weeks).toHaveLength(horizonWeeks);
  const allocated = detail.weeks.reduce((sum, w) => sum + w.hours_allocated, 0);
  expect(allocated).toBe(totalHours);
  for (const week of detail.weeks) {
    expect(week.hours_allocated).toBeLessThanOrEqual(weeklyHours);
  }
});

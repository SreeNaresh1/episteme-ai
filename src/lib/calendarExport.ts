/**
 * Calendar (.ics) Generator — creates an RFC-5545 compliant iCalendar file
 * allowing learners to import their week-by-week study schedule into
 * Google Calendar, Apple Calendar, or Microsoft Outlook with 1 click.
 */

export interface CalendarWeekItem {
  week_number: number;
  title: string;
  description: string;
  hours_allocated: number;
  resources: Array<{
    title: string;
    url: string;
    platform: string;
    replaced_by?: string | null;
  }>;
}

export function generateIcsCalendar(
  goal: string,
  label: string,
  weeks: CalendarWeekItem[]
): string {
  // Start date: Next upcoming Saturday at 10:00 AM UTC
  const now = new Date();
  const nextSaturday = new Date(now);
  const daysUntilSaturday = (6 - now.getUTCDay() + 7) % 7 || 7;
  nextSaturday.setUTCDate(now.getUTCDay() === 6 ? now.getUTCDate() : now.getUTCDate() + daysUntilSaturday);
  nextSaturday.setUTCHours(10, 0, 0, 0);

  const formatDate = (d: Date): string => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const escapeText = (str: string): string => {
    return (str || '')
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  };

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PathBuilder AI//Autonomous Learning Path Engine//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(label || goal)}`,
    `X-WR-CALDESC:${escapeText(`Autonomous 100% Free Study Path for: ${goal}`)}`,
  ];

  weeks.forEach((week, idx) => {
    const weekStart = new Date(nextSaturday.getTime() + idx * 7 * 24 * 60 * 60 * 1000);
    const durationHours = Math.max(1, week.hours_allocated || 5);
    const weekEnd = new Date(weekStart.getTime() + durationHours * 60 * 60 * 1000);

    const resourceList = week.resources
      .map(
        (r, i) =>
          `${i + 1}. ${r.title} (${r.platform}) - ${r.replaced_by ?? r.url}`
      )
      .join('\n');

    const desc = `${week.description}\n\nWeekly Target: ${durationHours} hours\n\nCurated Free Resources:\n${resourceList}\n\nBuilt by Episteme AI (Agentic AI Hackathon 2026)`;

    lines.push(
      'BEGIN:VEVENT',
      `UID:episteme-${Date.now()}-w${week.week_number}-${idx}@episteme.ai`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(weekStart)}`,
      `DTEND:${formatDate(weekEnd)}`,
      `SUMMARY:${escapeText(`[Study Block] Week ${week.week_number}: ${week.title}`)}`,
      `DESCRIPTION:${escapeText(desc)}`,
      `STATUS:CONFIRMED`,
      `TRANSP:OPAQUE`,
      'END:VEVENT'
    );
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadIcsFile(filename: string, icsContent: string): void {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.ics') ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

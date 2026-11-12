import { NextRequest, NextResponse } from 'next/server';
import { checkLink } from '@/lib/linkChecker';
import { inspectHtmlForPaywalls, resilientHttpFetch } from '@/lib/paywallInspector.mjs';

function isPublicHttpUrl(raw: string): boolean {
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host.endsWith('.local') ||
      host.startsWith('127.') ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      host.startsWith('169.254.') ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

async function runVerification(url: string, topic?: string) {
  if (!isPublicHttpUrl(url)) {
    return NextResponse.json(
      { error: 'Provide a valid public http:// or https:// URL' },
      { status: 400 }
    );
  }

  const [linkResult, htmlFetch] = await Promise.all([
    checkLink(url, topic),
    resilientHttpFetch(url, 4500),
  ]);

  const domInspection =
    htmlFetch.ok && htmlFetch.html
      ? inspectHtmlForPaywalls(htmlFetch.html, htmlFetch.finalUrl || url)
      : null;

  return NextResponse.json({
    ...linkResult,
    dom_inspection: domInspection,
    fetch_notes: htmlFetch.ok ? undefined : htmlFetch.error,
  });
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url') || '';
  const topic = req.nextUrl.searchParams.get('topic') || undefined;
  return runVerification(url, topic);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { url?: string; topic?: string };
    return runVerification(body.url || '', body.topic);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}


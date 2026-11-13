export interface UrlInspectionResult {
  url: string;
  final_url: string;
  reachable: boolean;
  http_status: number;
  error?: string;
  is_free: boolean;
  confidence_score: number;
  detected_free_markers: string[];
  detected_paywall_markers: string[];
  page_title: string;
  meta_description: string;
  has_json_ld_schema: boolean;
  is_accessible_for_free_schema: boolean;
}

export interface HtmlInspectionResult {
  is_free: boolean;
  confidence_score: number;
  detected_free_markers: string[];
  detected_paywall_markers: string[];
  page_title: string;
  meta_description: string;
  has_json_ld_schema: boolean;
  is_accessible_for_free_schema: boolean;
}

export declare const PAYWALL_PATTERNS: RegExp[];
export declare const FREE_AUDIT_PATTERNS: RegExp[];
export declare const FREE_ALLOWLIST_HOSTS: string[];

export declare function resilientHttpFetch(
  url: string,
  timeoutMs?: number
): Promise<{
  ok: boolean;
  status: number;
  html: string;
  finalUrl: string;
  error?: string;
}>;

export declare function inspectHtmlForPaywalls(
  html: string,
  url: string
): HtmlInspectionResult;

export declare function inspectCourseUrl(
  url: string,
  timeoutMs?: number
): Promise<UrlInspectionResult>;


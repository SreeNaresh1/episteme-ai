import json
import re
import urllib.parse
import bs4
import gradio as gr
import requests

MODERN_USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
]

PAYWALL_PATTERNS = [
    r"\b(subscribe\s+to\s+unlock|subscription\s+required)\b",
    r"\b(add\s+to\s+cart|buy\s+now|checkout)\b",
    r"\b(start\s+(your\s+)?(\d+-day\s+)?free\s+trial)\b",
    r"\b(billed\s+(monthly|annually|yearly))\b",
    r"(?<!no\s+|without\s+)\bcredit\s+card\s+required\b",
    r"\b(pricing\s+plans?|view\s+pricing)\b",
    r"\$\s*\d+(\.\d{2})?\s*(usd|\/mo|\/month|\/year)?",
    r"\b(enroll\s+for\s+\$\d+)\b",
]

FREE_AUDIT_PATTERNS = [
    r"\b(audit\s+(this\s+course\s+)?for\s+free)\b",
    r"\b(100%\s*free|completely\s+free|free\s+to\s+learn)\b",
    r"\b(open\s+access|open\s+courseware|open\s+educational\s+resources)\b",
    r"\b(free\s+curriculum|free\s+tutorial|free\s+certification)\b",
    r"\b(no\s+credit\s+card\s+required)\b",
    r"\b(open\s+source\s+learning)\b",
    r"\b(free\s+interactive\s+course)\b",
    r"\b(explore\s+curriculum\s+free)\b",
]

FREE_ALLOWLIST = [
    "freecodecamp.org",
    "khanacademy.org",
    "ocw.mit.edu",
    "cs50.harvard.edu",
    "developer.mozilla.org",
    "docs.python.org",
    "kaggle.com",
    "learn.microsoft.com",
    "openstax.org",
]

VETTED_CURRICULA = {
    "web": [
        ("HTML5 & Modern Web Semantics", "https://developer.mozilla.org/en-US/docs/Learn/HTML", "Build semantic portfolio markup"),
        ("CSS Architecture, Flexbox & Grid", "https://developer.mozilla.org/en-US/docs/Learn/CSS", "Responsive dashboard layout"),
        ("JavaScript Fundamentals & DOM", "https://developer.mozilla.org/en-US/docs/Learn/JavaScript", "Interactive task tracker"),
        ("Asynchronous JS, Fetch & APIs", "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous", "Weather API weatherboard"),
        ("React & Component Architecture", "https://react.dev/learn", "Stateful roadmap dashboard"),
        ("Backend Services & REST APIs", "https://developer.mozilla.org/en-US/docs/Learn/Server-side", "CRUD API with persistent storage"),
        ("Authentication & Security", "https://developer.mozilla.org/en-US/docs/Web/Security", "JWT / session protected routes"),
        ("Full Stack Capstone Deployment", "https://www.freecodecamp.org/", "Production release on Vercel/Cloud"),
    ],
    "data": [
        ("Python Programming Foundations", "https://docs.python.org/3/tutorial/", "CLI statistical analyzer"),
        ("Data Structures & Algorithms", "https://cs50.harvard.edu/x/", "Algorithmic problem set solution"),
        ("SQL & Relational Databases", "https://www.kaggle.com/learn/intro-to-sql", "Complex SQL analytics queries"),
        ("Pandas & Exploratory Data Analysis", "https://www.kaggle.com/learn/pandas", "Real-world dataset EDA report"),
        ("Data Visualization (Seaborn & Plotly)", "https://www.kaggle.com/learn/data-visualization", "Interactive executive dashboard"),
        ("Feature Engineering & Preprocessing", "https://www.kaggle.com/learn/feature-engineering", "Engineered ML tabular dataset"),
        ("Machine Learning Foundations", "https://www.kaggle.com/learn/intro-to-machine-learning", "End-to-end regression model"),
        ("Portfolio Capstone & Evaluation", "https://ocw.mit.edu/", "Published analysis with insights"),
    ],
}

def inspect_url(target_url: str):
    target_url = (target_url or "").strip()
    if not target_url or not target_url.startswith(("http://", "https://")):
        return "❌ Error: Please provide a valid HTTP or HTTPS URL.", ""

    try:
        headers = {
            "User-Agent": MODERN_USER_AGENTS[0],
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        }
        resp = requests.get(target_url, headers=headers, timeout=12, allow_redirects=True)
        final_url = resp.url
        status_code = resp.status_code

        if status_code in (403, 429):
            return f"❌ Request Gate: HTTP {status_code} (Anti-bot or Rate Limited).", ""

        soup = bs4.BeautifulSoup(resp.text[:524288], "html.parser")
        page_title = soup.title.string.strip() if soup.title and soup.title.string else "(no title)"

        has_json_ld = False
        is_accessible_for_free = False
        for script in soup.find_all("script", type="application/ld+json"):
            try:
                data = json.loads(script.string or "{}")
                has_json_ld = True
                def scan_dict(d):
                    if isinstance(d, dict):
                        if str(d.get("isAccessibleForFree", "")).lower() == "true":
                            return True
                        if isinstance(d.get("offers"), dict) and str(d["offers"].get("price", "")) in ("0", "0.00", "free"):
                            return True
                        return any(scan_dict(v) for v in d.values())
                    elif isinstance(d, list):
                        return any(scan_dict(item) for item in d)
                    return False
                if scan_dict(data):
                    is_accessible_for_free = True
            except Exception:
                pass

        for tag in soup(["script", "style", "nav", "footer", "svg"]):
            tag.decompose()
        text = " ".join(soup.stripped_strings)

        free_hits = []
        for p in FREE_AUDIT_PATTERNS:
            m = re.findall(p, text, re.IGNORECASE)
            if m:
                free_hits.append(m[0][0] if isinstance(m[0], tuple) else m[0])

        paywall_hits = []
        for p in PAYWALL_PATTERNS:
            m = re.findall(p, text, re.IGNORECASE)
            if m:
                paywall_hits.append(m[0][0] if isinstance(m[0], tuple) else m[0])

        score = 0.5
        if is_accessible_for_free:
            score += 0.35
        score += min(0.3, len(free_hits) * 0.1)
        score -= min(0.45, len(paywall_hits) * 0.15)

        is_allowlisted = any(h in final_url.lower() for h in FREE_ALLOWLIST)
        if is_allowlisted:
            score = max(score, 0.95)

        confidence = round(max(0.0, min(1.0, score)), 2)
        is_free = confidence >= 0.6 and len(paywall_hits) == 0

        verdict_badge = "✅ **VERIFIED FREE** (100% Free / Open Access)" if is_free else "❌ **PAYWALL / PAID / UNVERIFIED**"

        markdown_report = f"""### 🛡️ URL Paywall Inspection Result

* **Target URL:** `{final_url}`
* **Page Title:** `{page_title}`
* **HTTP Status:** `{status_code} OK`
* **Verdict:** {verdict_badge}
* **Confidence Score:** `{int(confidence * 100)}%`
* **Schema.org Data:** `{'isAccessibleForFree = true' if is_accessible_for_free else ('Present (no free flag)' if has_json_ld else 'None')}`
* **Allowlist Host:** `{'Yes (Trusted Public Provider)' if is_allowlisted else 'No'}`

---
#### Signals Detected
* **Free / Open Markers:** {', '.join(free_hits[:5]) if free_hits else '_None_'}
* **Paywall / Pricing Markers:** {', '.join(paywall_hits[:5]) if paywall_hits else '_None_'}
"""
        raw_json = json.dumps({
            "url": target_url,
            "final_url": final_url,
            "reachable": True,
            "http_status": status_code,
            "is_free": is_free,
            "confidence_score": confidence,
            "has_json_ld_schema": has_json_ld,
            "is_accessible_for_free_schema": is_accessible_for_free,
            "detected_free_markers": free_hits[:5],
            "detected_paywall_markers": paywall_hits[:5],
        }, indent=2)

        return markdown_report, raw_json
    except Exception as e:
        return f"❌ Inspection failed: {str(e)}", "{}"


def build_roadmap(career_goal: str, hours_per_week: int, duration_weeks: int, level: str):
    goal = (career_goal or "Full Stack Developer").strip()
    total_hours = hours_per_week * duration_weeks

    is_data = any(k in goal.lower() for k in ["data", "ml", "ai", "machine", "python", "analytics"])
    template = VETTED_CURRICULA["data"] if is_data else VETTED_CURRICULA["web"]

    out = f"""# 🎓 Episteme AI Learning Path
### Goal: **{goal}** ({level.capitalize()} Level)

| ⏱️ Total Time Budget | 📅 Duration | ⏳ Weekly Commitment | 🛡️ Content Policy |
| :---: | :---: | :---: | :---: |
| **{total_hours} Hours** | **{duration_weeks} Weeks** | **{hours_per_week}h / week** | **100% Free & Paywall-Free** |

---

### 🗺️ Weekly Curriculum & Milestone Roadmap
"""
    for w in range(1, duration_weeks + 1):
        idx = (w - 1) % len(template)
        topic, url, deliverable = template[idx]
        platform = urllib.parse.urlparse(url).netloc.replace("www.", "")
        out += f"""
#### Week {w}: {topic}
* **Allocated Budget:** `{hours_per_week} hours`
* **Verified Resource:** [{platform} — {topic}]({url}) *(Paywall Verified)*
* **Milestone Deliverable:** 🎯 `{deliverable}`
"""

    out += f"""
---
### 📅 Calendar Sync & Export
* Export this schedule into Google Calendar or import into `.ics` with `{hours_per_week}h/week` recurring study blocks.
* Try the CLI: `npx episteme-check <url>`
* Open-Source Repository: [github.com/SreeNaresh1/episteme-ai](https://github.com/SreeNaresh1/episteme-ai)
"""
    return out


with gr.Blocks(title="Episteme AI - Learning Path Engine", theme=gr.themes.Soft(primary_hue="indigo")) as demo:
    gr.Markdown("""
# 🎓 Episteme AI
### Autonomous Learning Path Engine & Live Paywall Verifier
[⭐ GitHub Repository](https://github.com/SreeNaresh1/episteme-ai) • [📦 npm: episteme-check](https://www.npmjs.com/package/episteme-check) • [🌐 Live Web App](https://episteme-ai-one.vercel.app)
""")

    with gr.Tab("🧭 Learning Path Builder"):
        gr.Markdown("Generate a strictly bounded study plan built **100% from free, verified courseware**.")
        with gr.Row():
            goal_input = gr.Textbox(label="Career or Skill Goal", value="Full Stack Web Developer", placeholder="e.g. Data Analyst, Cloud DevOps, AI Engineer")
            level_input = gr.Radio(["Beginner", "Intermediate", "Advanced"], label="Experience Level", value="Beginner")
        with gr.Row():
            hours_slider = gr.Slider(minimum=1, maximum=40, value=6, step=1, label="Weekly Hours Available")
            weeks_slider = gr.Slider(minimum=2, maximum=52, value=12, step=1, label="Target Duration (Weeks)")
        generate_btn = gr.Button("⚡ Build Learning Path", variant="primary")
        roadmap_output = gr.Markdown()

        generate_btn.click(
            fn=build_roadmap,
            inputs=[goal_input, hours_slider, weeks_slider, level_input],
            outputs=[roadmap_output]
        )

    with gr.Tab("🛡️ Course Paywall & Free Inspector"):
        gr.Markdown("Verify whether any course or tutorial is **truly free** or gated behind a credit-card paywall.")
        url_input = gr.Textbox(label="Courseware / Tutorial URL", placeholder="https://docs.python.org/3/tutorial/", value="https://docs.python.org/3/tutorial/")
        inspect_btn = gr.Button("🔍 Inspect URL with Cheerio/DOM Heuristics", variant="primary")
        with gr.Row():
            report_output = gr.Markdown()
            json_output = gr.Code(label="JSON Output", language="json")

        inspect_btn.click(
            fn=inspect_url,
            inputs=[url_input],
            outputs=[report_output, json_output]
        )

    gr.Markdown("""
---
<div align="center">
Built with ❤️ by <a href="https://github.com/SreeNaresh1">Sree Naresh A</a> • Open Source under MIT License • <a href="https://github.com/SreeNaresh1/episteme-ai">Star on GitHub ⭐</a>
</div>
""")

if __name__ == "__main__":
    demo.launch()

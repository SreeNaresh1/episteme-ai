# 🚀 Episteme AI — Live Deployment & Production Guide

This guide details how to deploy and operate **Episteme AI** in production environments, satisfying the **Live User Deployment** hackathon requirement.

---

## 🐳 1-Click Containerized Deployment (Docker & Docker Compose)

The easiest way to run Episteme AI in an isolated, production-grade container with SQLite persistence:

```bash
# Clone the repository
git clone https://github.com/your-username/episteme-ai.git
cd episteme-ai

# (Optional) Export Gemini API Key if using generative AI features
export GEMINI_API_KEY="your_api_key_here"

# Start the application container
docker compose up -d --build
```

The app will build and spin up at:
👉 **`http://localhost:3000`**

### Container Health Check
Episteme includes a built-in health probe:
```bash
curl http://localhost:3000/api/health
```
Response:
```json
{
  "status": "healthy",
  "system": "Episteme AI — Autonomous Self-Healing Learning Path Engine",
  "policy": "ziro-hackathon-2026-v2",
  "database": {
    "status": "connected",
    "journal_mode": "WAL"
  }
}
```

---

## ☁️ Cloud Platform Deployments

### Option A: Vercel Deploy (Zero-Config Serverless)
1. Push repository to GitHub.
2. Import repository in [Vercel](https://vercel.com).
3. Set root directory to `app`.
4. (Optional) Add `GEMINI_API_KEY` in Environment Variables.
5. Deploy! Episteme automatically configures serverless SQLite initialization via `/tmp` fallback.

### Option B: Railway / Render (Long-Lived Container with Persistent Volumes)
1. Connect GitHub repository.
2. Select Dockerfile deployment.
3. Attach persistent volume mount at `/app/data`.
4. Expose port `3000`.

---

## 🔒 Production Security & Anti-Scraping Resilience
- **Anti-Bot Header Rotation:** Automatically switches between modern Chrome, Firefox, and Safari Sec-Ch-Ua client hints.
- **SLA Enforcing Timeouts:** All external HTTP link inspections terminate safely after 4000ms using non-blocking AbortControllers.
- **ACID WAL Transactions:** Database transactions use Write-Ahead Logging (`PRAGMA journal_mode = WAL`) preventing write contention and ensuring strict zero-duplicate calendar block idempotency.


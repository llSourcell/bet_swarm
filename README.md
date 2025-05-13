# BetSwarm: 5-AI Swarm Betting Bot

## 🚀 Beginner Quickstart

1. **Clone the repo:**
   ```bash
   git clone https://github.com/sirajraval/betswarm.git
   cd betswarm
   ```


2. **Set your API keys:**
   - Copy `.env.example` to `.env` in both `backend/` and (if needed) `frontend/`:
     ```bash
     cp backend/.env.example backend/.env
     cp frontend/.env.example frontend/.env
     ```
   - Open `backend/.env` and fill in your keys for:
     - `BET105_KEY` (get from Bet105)
     - `OPENAI_KEY` (for GPT-4o)
     - `ANTHROPIC_KEY` (for Claude Sonnet)
     - `GEMINI_KEY` (for Gemini 2.5)
     - `LLAMA_ENDPOINT` (for Llama-4-70B, e.g. Together or Ollama)
     - `DEEPSEEK_KEY` (if using DeepSeek)
     - `REDIS_URL` (default is fine for local)
     - `FIREBASE_JSON` (optional, see below)

3. **[Optional] Enable Firestore logging:**
   - Get your Firebase service account JSON (Firebase Console → Project Settings → Service Accounts → Generate new private key).
   - Paste the JSON as a single line in `backend/.env` as `FIREBASE_JSON='{"type": ...}'` (use https://jsonformatter.org/json-to-one-line if needed).
   - If empty, Firestore logging is disabled but the demo still works.

4. **Start everything:**
   ```bash
   docker compose up --build
   ```
   - This will launch:
     - Backend (FastAPI, LangGraph, Redis, Playwright, Firestore)
     - Frontend (Next.js dashboard) on [http://localhost:3100](http://localhost:3100)

5. **See the dashboard:**
   - Open [http://localhost:3100](http://localhost:3100) in your browser.
   - You’ll see live agent debates, odds, bets, wallet feed, and stats.

---

## 🛠️ Integrations & What’s Left To Do

- **Playwright (Automatic Betting):**
  - Playwright is installed and used by the backend to automatically log in, click odds, enter stake, and confirm bets on Bet105.
  - No extra setup is needed—Docker handles it.
  - If you want screenshots of slips, ensure Chrome dependencies are available (Dockerfile already includes them).

- **Real Odds Integration:**
  - The backend fetches odds from Bet105. To use real odds, set the correct API endpoint and ensure your `BET105_KEY` is valid.
  - The demo uses mock odds if the API is unreachable or the key is missing.

- **Custom Models:**
  - You can swap in your own API keys or endpoints for any agent. Just update `backend/.env`.

- **Observability:**
  - Prometheus/Grafana stack is planned for advanced stats and risk metrics.

---

## 🧩 Project Structure

- `backend/` — FastAPI, LangGraph, Redis, Playwright, agent logic
- `frontend/` — Next.js 14, Tailwind, dashboard UI

---

## 💡 FAQ

- **Q: Do I need all API keys to run the demo?**
  - No! The frontend and backend will run with mock data if any key is missing. For full functionality, add your keys.
- **Q: How do I enable Playwright betting?**
  - Just add your Bet105 key and run as above. Playwright is auto-configured in Docker.
- **Q: How do I add my own AI model?**
  - Add your key/endpoint to `.env` and update the agent logic in `backend/app/agents.py`.
- **Q: Can I run this on Windows/Mac/Linux?**
  - Yes! Docker makes it cross-platform.

---

## 🏁 Next Steps for Contributors

- Integrate more sportsbooks
- Add more agent types
- Improve live stats and observability (Grafana)
- Enhance Playwright stealth and error handling

---

## 📜 License

MIT — fork, remix, and deploy your own swarm!

---

**Questions or issues?** Open an issue or PR on GitHub, or ping Siraj on Twitter/X.

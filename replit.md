# Fusion AI

An intelligent multimedia creation platform powered by a central Master Brain that orchestrates specialized AI agents to transform ideas into stories, images, videos, and social media content.

## Project overview

- **Frontend:** React + TypeScript (Mobile First, responsive, cross-browser)
- **Backend:** Node.js + TypeScript (orchestration, security, API gateway)
- **Database & Auth:** Firebase (Authentication, Firestore, Storage)
- **AI:** Multi-provider (OpenAI, Google Gemini, extensible via Adapter pattern)
- **Agents:** Creative, Image, Video, Analysis — independently pluggable

See `VISION.md` for the full architecture and development rules.

## Structure

```
/frontend    React + TypeScript UI
/backend     Node.js + TypeScript (Master Brain logic)
/agents      Specialized AI agents
/firebase    Config and security rules
/prompts     Master Brain system instructions
/docs        Technical documentation
```

## Development phases

1. Architecture & data schema
2. Foundations (Firebase auth, backend structure, frontend/backend communication)
3. Master Brain (orchestration & memory)
4. Agents (progressive integration)
5. Quality (security, performance, UX)

## Running the app

Use the **Run** button to start the `Fusion AI — Frontend` workflow.
The project uses Node.js 22 and keeps its dependencies inside `frontend/`.
The Vite server listens on `0.0.0.0:5000` and accepts Replit's proxied preview host.

```bash
cd frontend
npm ci          # install the locked frontend dependencies
npm run dev     # development (port 5000)
npm run build   # production build → frontend/dist/
npm run lint    # lint checks
```

The uploaded archive's public Firebase Web configuration has been restored as
shared environment variables. No administrator credentials are included. Firebase
Authentication must allow the current preview domain; an authenticated session
is required to verify profile persistence and the signed-in pages.

## Firebase

The frontend uses Firebase Authentication (email/password and Google) and Cloud Firestore for the signed-in user's profile and credit balance. Configure the four required `VITE_FIREBASE_*` Web app values in Replit. The current Firebase project uses the named database `default`, so `VITE_FIREBASE_DATABASE_ID=default` is also set; publish `firebase/firestore.rules` specifically to that database before testing profile persistence. Setup details and the credit-security boundary are in `docs/FIREBASE_SETUP.md`.

The browser reports offline and weak network states and shows Firebase authentication errors in French. Credit balances start at zero; client-side code cannot award or change credits. Advertising rewards require trusted server-side validation.

## Deployment

### Replit (static)
- Build: `cd frontend && npm install && npm run build`
- Public dir: `frontend/dist`
- These are the suggested publish settings; this import setup configures the development workflow only.

### Vercel
- Config: `vercel.json` at project root
- `rootDirectory: "frontend"` — Vercel auto-detects Vite, zero manual setup
- SPA rewrite rule included (all routes → `index.html`)
- Immutable cache headers on `/assets/*` for fast edge delivery

## User preferences

- Always analyse architecture before writing code
- Never expose API keys or secrets on the client side
- Mobile First responsive design on all UI work
- Multi-provider AI — no single-vendor lock-in
- Keep frontend, backend and AI services strictly separated

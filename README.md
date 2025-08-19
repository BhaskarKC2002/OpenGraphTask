# OpenGraphTask

Monorepo with a Next.js frontend and an Express + MongoDB backend demonstrating dynamic Open Graph (and Twitter) meta tags with optional video support.

## Apps
- `frontend`: Next.js 15 (App Router). Generates dynamic metadata via `generateMetadata` and `/api/og` image generation.
- `backend`: Express + Mongoose API with Zod validation and seed data.

## Local development
```bash
# backend
cd backend && npm install && npm run dev

# frontend (in a new terminal)
cd frontend && npm install && npm run dev
```

### Environment variables
- frontend (`frontend/.env.local`):
  - `NEXT_PUBLIC_SITE_URL` (e.g., http://localhost:3000 or your production URL)
  - `BACKEND_URL` (e.g., http://localhost:4000 or your Render URL)
- backend (`backend/.env`):
  - `MONGO_URI` (MongoDB Atlas or local)
  - `SITE_URL` and/or `PUBLIC_URL` (public base URL used in OG links)

## Deploy
### Frontend (Vercel)
- Root dir: `frontend`
- Install: `npm install`
- Build: `npm run build`
- Start: `npm run start`
- Env: `NEXT_PUBLIC_SITE_URL`, `BACKEND_URL`

### Backend (Render)
- Root dir: `backend`
- Build: `npm install && npm run build`
- Start: `npm run start`
- Env: `MONGO_URI`, `SITE_URL`, `PUBLIC_URL`

## Social preview testing
Use Facebook Sharing Debugger, Twitter Card Validator, and LinkedIn Post Inspector. If re-scrapes show old images, bump a cache param (e.g., `?v=2`).

## Repo structure
- `.gitignore`: root ignore covering both apps
- `ngrok.yml`: optional local tunneling config (root)
- `frontend/public/sample.jpg`, `frontend/public/sampleVideo.mp4`: demo assets

# OpenGraphTask

Monorepo with a Next.js frontend and an Express + MongoDB backend demonstrating dynamic Open Graph (and Twitter) meta tags with optional video support.

## Apps
- `frontend`: Next.js 15 (App Router). Generates dynamic metadata via `generateMetadata` and `/api/og` image generation.
- `backend`: Express + Mongoose API with Zod validation and seed data.

## Local development
```bash
# backend
cd backend && npm install && npm run dev
# frontend (in a new terminal)
cd frontend && npm install && npm run dev
```

### Environment variables
- frontend (`frontend/.env.local`):
  - `NEXT_PUBLIC_SITE_URL` (e.g., http://localhost:3000 or your production URL)
  - `BACKEND_URL` (e.g., http://localhost:4000 or your Render URL)
- backend (`backend/.env`):
  - `MONGO_URI` (MongoDB Atlas or local)
  - `SITE_URL` and/or `PUBLIC_URL` (public base URL used in OG links)

## Deploy
### Frontend (Vercel)
- Root dir: `frontend`
- Install: `npm install`
- Build: `npm run build`
- Start: `npm run start`
- Env: `NEXT_PUBLIC_SITE_URL`, `BACKEND_URL`

### Backend (Render)
- Root dir: `backend`
- Build: `npm install && npm run build`
- Start: `npm run start`
- Env: `MONGO_URI`, `SITE_URL`, `PUBLIC_URL`

## Social preview testing
Use Facebook Sharing Debugger, Twitter Card Validator, and LinkedIn Post Inspector. If re-scrapes show old images, bump a cache param (e.g., `?v=2`).

## Repo structure
- `.gitignore`: root ignore covering both apps
- `ngrok.yml`: optional local tunneling config (root)
- `frontend/public/sample.jpg`, `frontend/public/sampleVideo.mp4`: demo assets

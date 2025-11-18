# Vercel Backend Deployment Guide (Emily Bakes Cakes)

## 1. Prepare Cloud Postgres
- Sign up for a free cloud Postgres provider (Supabase, Neon, Render, etc.).
- Create a new database and copy the connection string (e.g., `postgres://user:pass@host:port/dbname`).

## 2. Set Environment Variables in Vercel
- Go to your Vercel project dashboard.
- Add `DATABASE_URL` with your cloud Postgres connection string.

## 3. Deploy Backend
- Push your code to GitHub (Vercel will auto-deploy if connected).
- Or, use the Vercel CLI: `vercel --prod`

## 4. API Endpoints
- `/api/health` — Health check
- `/api/products` — List products (GET)
- `/api/orders` — Create order (POST)

## 5. Update Frontend
- Point your frontend to use the Vercel API endpoints (e.g., `https://emilybakescakes.vercel.app/api/products`).

## 6. (Optional) Expand Functionality
- Add more endpoints or connect to more tables as needed.

---

**You do NOT need Docker or a local Postgres for Vercel deployment.**

If you need help, just ask!

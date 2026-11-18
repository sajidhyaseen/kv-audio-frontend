# KV Audio Frontend

A responsive equipment rental and event booking interface for KV Audio.

## Features

- Product catalogue with search, category filters, sorting, and availability
- Product details, image gallery, cart, rental dates, and live booking quotes
- Customer registration, login, Google OAuth, email verification, and password reset
- Customer booking history and cancellation
- Review submission and approval-aware display
- Protected admin dashboard for orders, products, users, reviews, and inquiries
- Dark, responsive interface with accessible mobile navigation

## Technology

- React 18
- Vite
- React Router
- Tailwind CSS
- Axios
- Supabase Storage
- Google Identity Services

## Local setup

```bash
npm install
cp .env.example .env
npm run dev -- --port 4001
```

Configure:

- `VITE_BACKEND_URL`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The frontend uses HttpOnly cookie authentication and sends the CSRF token with protected API requests. Never place a Supabase service-role key or private OAuth secret in Vite environment variables.

## Validation

```bash
npm run lint
npm run build
```

## Deployment

Deploy with Vercel:

1. Import this repository as a Vite project.
2. Set every `VITE_*` variable in Vercel Project Settings.
3. Use the HTTPS production backend URL.
4. Add the deployed Vercel origin to the backend `CLIENT_ORIGIN`.
5. Redeploy after environment changes.

Do not commit `.env` or generated `dist` files.

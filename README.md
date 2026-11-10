# Event Approval System

A college event-approval portal. Clubs submit events, and they move through an approval chain of faculty,
principal and admin, with each role seeing its own dashboard.

## Features

- **Accounts and login**: registration and login with passwords hashed using bcrypt, plus JWT sessions
  (1-hour expiry) restored on page reload through `/api/me`.
- **Role-based access control**: four roles (Club, Faculty, Principal, Admin). Express middleware checks
  each user's role in the database before allowing protected API routes, and React route guards keep each
  dashboard to its own role.
- **Event workflow** *(in progress)*: clubs create events, everyone signed in can view them, and admins
  approve them.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Vite, React Router |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL (`pg`) |
| Auth | JWT (`jsonwebtoken`), `bcryptjs` |

## API

| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/me` | Signed-in users |
| GET | `/api/admin-only` | Admin |
| GET | `/api/club-only` | Club |

## Run locally

**Backend**

```bash
cd backend
npm install
# create backend/.env with:
#   DATABASE_URL=postgres://user:password@host:5432/dbname
#   JWT_SECRET=a-long-random-string
npm run dev          # http://localhost:5000
```

The database needs a `roles` table (`id`, `name`) and a `users` table
(`id`, `name`, `email`, `password`, `role_id`).

**Frontend**

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

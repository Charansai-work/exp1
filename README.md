# Remote Internship Management System (RIMS)

Production-oriented monorepo with React + Express + Prisma/PostgreSQL.

## Features
- JWT auth + refresh tokens + RBAC (ADMIN, USER)
- Internship CRUD, applications workflow, task assignment/submission
- Feedback with history and notifications
- Analytics dashboard data (leaderboard + task completion)
- Secure middleware stack: Helmet, CORS, rate limit, sanitization, Zod validation
- Swagger docs, Winston logging, Dockerized setup

## Structure
- `backend/` Express API + Prisma schema + seed
- `frontend/` Vite React app with Tailwind and route guards

## Local Setup
1. Copy env files:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
2. Start services:
   - `docker compose up --build`
3. Run DB setup (in backend container):
   - `npx prisma migrate dev`
   - `npx prisma db seed`
4. Access:
   - Frontend: `http://localhost:5173`
   - API: `http://localhost:5000`
   - Swagger: `http://localhost:5000/api-docs`

## Seed Credentials
- Admin: `admin@rims.dev` / `Admin@123`
- User: `student@rims.dev` / `User@123`

## API Modules
- `/auth`, `/users`, `/internships`, `/applications`, `/tasks`, `/submissions`, `/feedback`, `/notifications`, `/analytics`

## Notes
- File uploads stored under `backend/uploads`
- Extendable to Redis, S3/Cloudinary, Socket.io, Nodemailer.

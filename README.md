# CyberHire AI

A premium AI‑powered job search and application tracking platform for Cyber Security and IT professionals.

## Features
- AI job finder across multiple job boards
- Sponsorship checker
- AI resume & cover‑letter builder
- Application tracker with timeline & reminders
- Interview preparation & skill‑gap analysis
- Certifications & learning roadmaps
- Dark mode, glassmorphism UI, PWA support

## Tech Stack
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, React Hook Form, Zod
- **Backend:** Next.js Server Actions, REST API, Prisma ORM
- **Database:** PostgreSQL via Supabase
- **Auth:** Clerk (or NextAuth)
- **Deployment:** GitHub + Vercel
- **CI/CD:** GitHub Actions
- **Containerisation:** Docker

## Getting Started
```bash
# Clone repo
git clone <repo-url>
cd cyberhire-ai

# Install dependencies
npm install

# Set up environment variables (see .env.example)
cp .env.example .env.local

# Initialise database
npx prisma migrate dev --name init

# Run dev server
npm run dev
```

## License
MIT

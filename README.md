# CyberHire AI 🚀

AI-powered job search and application tracking platform specifically designed for cybersecurity and IT professionals.

## 🎯 Features

### Core Modules

1. **Dashboard** - Comprehensive overview of applications, interviews, and statistics
2. **AI Job Finder** - Search jobs from LinkedIn, Indeed, Reed, and more
3. **Application Tracker** - Track all applications with timeline and notes
4. **Resume Builder** - Create ATS-optimized resumes with AI assistance
5. **Cover Letter Generator** - Generate personalized cover letters
6. **Interview Preparation** - Practice with AI-generated questions
7. **Skill Gap Analysis** - Identify missing skills and learning resources
8. **Sponsorship Checker** - Check visa sponsorship eligibility
9. **Certifications** - Track and manage professional certifications
10. **Learning Dashboard** - Career roadmaps and learning resources

### Technical Features

- ✅ **Modern UI** - Dark mode, cyber theme, glassmorphism design
- ✅ **Responsive** - Mobile-first, fully responsive design
- ✅ **Performance** - Server components, lazy loading, caching
- ✅ **Security** - Authentication, CSRF protection, input validation
- ✅ **Scalable** - Modular architecture, SOLID principles
- ✅ **Accessible** - WCAG 2.2 compliant
- ✅ **SEO** - Metadata, Open Graph, sitemap

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js Server Actions** - API layer
- **REST API** - Additional endpoints
- **Prisma ORM** - Database access

### Database
- **PostgreSQL** - Relational database
- **Supabase** - Backend as a service

### Authentication
- **Clerk** / **NextAuth** - Authentication

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **Vercel** - Deployment

## 📋 Prerequisites

- **Node.js** 18+ or 20+
- **npm** or **yarn**
- **PostgreSQL** 14+ (or Supabase)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cyberhire-ai.git
cd cyberhire-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 4. Set Up Database

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Start Development Server

```bash
npm run dev
```


### Resume Builder: AI tailoring

The Resume Builder supports a master career profile, job-advert keyword comparison, a reviewable AI-tailored draft, browser-local fallback, account-backed saving when signed in and the database is configured, print-to-PDF, and Word-compatible `.doc` export.

To enable AI tailoring, set `OPENAI_API_KEY` in your server-side environment (for example, Vercel Project Settings → Environment Variables) and optionally set `OPENAI_MODEL` (defaults to `gpt-4o-mini`). Never prefix the API key with `NEXT_PUBLIC_` or commit a real key. Redeploy after changing environment variables. Without a key, the rest of the Resume Builder remains available and the AI button returns a clear configuration message.

AI tailoring is an editing aid, not a verification service: it must use only the supplied profile facts. Review all content, dates, skills and qualifications before sending a CV. The keyword-overlap score is a simple text signal, not a prediction of hiring success.

## 🐳 Docker Setup

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

### GitHub Actions

Automatic deployment on push to main branch via `.github/workflows/ci-cd.yml`

## 🧪 Testing

```bash
npm test
npm run test:watch
npm run e2e
```

## 🔍 Code Quality

```bash
npm run lint
npm run format
npm run type-check
```

## 🔒 Security

- JWT Authentication
- CSRF Protection
- Input Validation (Zod)
- XSS Prevention
- SQL Injection Prevention (Prisma)
- Rate Limiting
- Security Headers (Helmet)

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Next.js team and community
- TailwindCSS community
- Prisma team

## 📞 Support

For support, open an issue on GitHub.

---

**Built with ❤️ for cybersecurity professionals**

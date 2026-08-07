# Quick Start Guide 🚀

Get CyberHire AI up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL running locally or Supabase account
- npm or yarn

## 1️⃣ Clone & Install (1 min)

```bash
git clone https://github.com/yourusername/cyberhire-ai.git
cd cyberhire-ai
npm install
```

## 2️⃣ Setup Environment (1 min)

```bash
cp .env.example .env.local
```

Edit `.env.local` with:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/cyberhire_ai"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

## 3️⃣ Database Setup (1 min)

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## 4️⃣ Start Development (1 min)

```bash
npm run dev
```

## 5️⃣ Open in Browser (1 min)

Go to: **http://localhost:3000** ✅

## 📋 What You Get

✅ Full-featured job search platform  
✅ Application tracking dashboard  
✅ Resume builder with AI  
✅ Interview preparation tools  
✅ Skill gap analysis  
✅ Modern UI with cyber theme  
✅ API ready for integrations  
✅ Docker support  

## 🧪 Verify Installation

1. Check home page loads
2. Browse Dashboard (http://localhost:3000/dashboard)
3. View Job Finder (http://localhost:3000/job-finder)
4. Check API (http://localhost:3000/api/health)

## 🛠 Available Commands

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run lint          # Check code quality
npm run format        # Auto-format code
npm test              # Run tests
npm run prisma:...    # Database commands
```

## 📚 Documentation

- [Full README](README.md) - Complete guide
- [API Docs](API.md) - API reference
- [Deployment](DEPLOYMENT.md) - Deploy guide
- [Architecture](ARCHITECTURE.md) - System design

## 🆘 Troubleshooting

### Database Error?
```bash
# Reset database
npx prisma migrate reset
```

### Build Error?
```bash
# Clear cache
rm -rf .next node_modules
npm install
```

### Port 3000 in use?
```bash
# Use different port
PORT=3001 npm run dev
```

## 🚀 Next Steps

1. ✅ Customize components
2. ✅ Add your own pages
3. ✅ Connect to your database
4. ✅ Deploy to Vercel/Docker
5. ✅ Add real job data APIs

## 💡 Pro Tips

- Use `src/components` as templates
- Type-safe with TypeScript
- Components in `src/components/ui`
- Services in `src/lib/services`
- API routes in `src/app/api`

## 📞 Need Help?

- Check [README.md](README.md)
- Review [CONTRIBUTING.md](CONTRIBUTING.md)
- Search [API.md](API.md)
- Check component props with TypeScript

---

**You're all set! Happy coding! 🎉**

```bash
npm run dev
# Open http://localhost:3000
```

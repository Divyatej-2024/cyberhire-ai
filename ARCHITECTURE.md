# Project Architecture

## Overview

CyberHire AI is built with a modern, scalable, and maintainable architecture using Next.js 15 and React 19.

## Directory Structure

```
cyberhire-ai/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── job-finder/     # Job finder pages
│   │   ├── applications/   # Application tracking
│   │   ├── resume-builder/ # Resume builder
│   │   ├── interview-prep/ # Interview preparation
│   │   ├── skill-gap/      # Skill gap analysis
│   │   ├── certifications/ # Certifications
│   │   ├── learning/       # Learning dashboard
│   │   ├── profile/        # User profile
│   │   ├── settings/       # Settings
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI components (Button, Card, etc)
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   └── dashboard/      # Dashboard-specific components
│   ├── lib/                 # Utility functions
│   │   ├── api/           # API client and utilities
│   │   ├── utils/         # Helper functions
│   │   ├── services/      # Business logic services
│   │   └── mongodb.ts     # Database client
│   ├── types/              # TypeScript type definitions
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   ├── styles/             # Global styles
│   └── middleware.ts       # Next.js middleware
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding script
├── public/                 # Static assets
├── __tests__/              # Test files
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose for development
├── docker-compose.prod.yml # Docker Compose for production
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── .eslintrc.json          # ESLint configuration
├── .prettierrc              # Prettier configuration
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
└── README.md               # Project documentation
```

## Layered Architecture

### 1. Presentation Layer (UI)

Located in `src/components/`:
- **UI Components** - Reusable, presentational components (Button, Card, Input)
- **Layout Components** - Navigation and structure (Header, Footer)
- **Page Components** - Feature-specific pages

Features:
- React 19 with hooks
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations

### 2. Business Logic Layer

Located in `src/lib/services/`:
- `job.ts` - Job search and filtering logic
- `application.ts` - Application tracking logic
- Resume management
- Interview preparation logic

### 3. Data Access Layer

Located in `src/lib/api/`:
- `client.ts` - HTTP client with Axios
- RESTful API endpoints
- Prisma ORM for database queries

### 4. Database Layer

- PostgreSQL database
- Prisma ORM for type-safe queries
- Models defined in `prisma/schema.prisma`

## Data Flow

```
User Input (UI)
    ↓
Event Handler (Component)
    ↓
API Call (lib/api/client)
    ↓
Server Action / API Route (src/app/api)
    ↓
Service Layer (lib/services)
    ↓
Prisma ORM
    ↓
PostgreSQL Database
    ↓
Response Back to UI
```

## Component Architecture

### Page Components

```typescript
// src/app/dashboard/page.tsx
export default function DashboardPage() {
  const [data, setData] = useState();
  
  useEffect(() => {
    // Fetch data
  }, []);
  
  return (
    <div>
      <StatCard />
      <ApplicationList />
      <Chart />
    </div>
  );
}
```

### Reusable UI Components

```typescript
// src/components/ui/Button.tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, children }, ref) => (
    <button className={cn(baseClasses, variants[variant])}>
      {children}
    </button>
  )
);
```

### Custom Hooks

```typescript
// src/hooks/useApplications.ts
export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchApplications();
  }, []);
  
  return { applications, loading };
};
```

## State Management

- **React Hooks** for component state
- **Context API** for global state (if needed)
- **React Query** for server state management (optional)

Example:
```typescript
const [applications, setApplications] = useState<Application[]>([]);
const [isLoading, setIsLoading] = useState(false);
```

## API Architecture

### Next.js Server Actions

```typescript
// src/app/api/applications/route.ts
export async function GET(request: NextRequest) {
  // Handle GET request
  return Response.json({ data });
}

export async function POST(request: NextRequest) {
  // Handle POST request
  return Response.json({ data }, { status: 201 });
}
```

### Client-side API Calls

```typescript
// Using axios
import { apiClient } from '@/lib/api/client';

const applications = await apiClient.get('/applications');
```

## Database Schema

Entities:
- **User** - User accounts and profiles
- **Job** - Job listings
- **Application** - Job applications
- **Resume** - User resumes
- **Interview** - Interview practice sessions
- **SkillGap** - Skill gap analysis
- **Certification** - User certifications
- **UserSettings** - User preferences

Relationships:
```
User
├── Applications (1-N)
├── Resumes (1-N)
├── Interviews (1-N)
├── SkillGaps (1-N)
└── UserSettings (1-1)

Job
├── Applications (1-N)
└── SkillGaps (1-N)
```

## Authentication Flow

1. User logs in via Clerk/NextAuth
2. Authentication middleware verifies token
3. User data fetched from database
4. Protected routes accessible
5. API calls include auth token
6. Server validates token before processing

## Error Handling

```typescript
try {
  const data = await apiClient.get('/jobs');
} catch (error) {
  const message = handleApiError(error);
  showNotification(message);
}
```

## Styling Architecture

- **Global Styles** - `src/styles/globals.css`
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Variables** - For theming (light/dark mode)
- **Inline Styles** - For dynamic values

## Performance Optimization

1. **Code Splitting** - Next.js automatic code splitting
2. **Image Optimization** - next/image component
3. **Lazy Loading** - Dynamic imports
4. **Caching** - ISR and SWR
5. **Compression** - Gzip and Brotli

## Security Architecture

1. **Authentication** - Clerk/NextAuth
2. **Authorization** - Route and API protection
3. **Input Validation** - Zod schemas
4. **CSRF Protection** - Next.js built-in
5. **XSS Prevention** - React sanitization
6. **Environment Variables** - Secrets management

## Testing Architecture

```
__tests__/
├── unit/           # Unit tests for utilities
├── integration/    # Integration tests
└── e2e/           # End-to-end tests
```

## Deployment Architecture

1. **Local Development** - Docker Compose
2. **CI/CD** - GitHub Actions
3. **Production** - Vercel or Docker

Pipeline:
```
Push to GitHub
    ↓
GitHub Actions CI/CD
    ↓
Run Tests
    ↓
Build Application
    ↓
Deploy to Vercel/Docker
```

## Monitoring & Logging

- Application errors → Sentry
- Analytics → Vercel Analytics
- Logs → Application logs (console)

## Scalability Considerations

1. **Database** - Connection pooling, indexing
2. **API** - Rate limiting, caching
3. **Frontend** - Lazy loading, code splitting
4. **Deployment** - Horizontal scaling with Vercel


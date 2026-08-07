# Deployment Guide

## Prerequisites

- Vercel account (or AWS/Azure account)
- PostgreSQL database (Supabase recommended)
- GitHub repository
- Clerk or NextAuth setup

## Vercel Deployment (Recommended)

### Step 1: Create Vercel Project

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select `Next.js` as the framework

### Step 2: Environment Variables

In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add all variables from `.env.example`:

```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key
```

### Step 3: Deploy

Click "Deploy" and wait for completion.

### Step 4: Run Migrations

After deployment:

```bash
npx prisma migrate deploy
```

## Docker Deployment

### Build Docker Image

```bash
docker build -t cyberhire-ai:latest .
```

### Push to Registry

#### Docker Hub

```bash
docker tag cyberhire-ai:latest yourusername/cyberhire-ai:latest
docker push yourusername/cyberhire-ai:latest
```

#### AWS ECR

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [account-id].dkr.ecr.us-east-1.amazonaws.com
docker tag cyberhire-ai:latest [account-id].dkr.ecr.us-east-1.amazonaws.com/cyberhire-ai:latest
docker push [account-id].dkr.ecr.us-east-1.amazonaws.com/cyberhire-ai:latest
```

### Deploy to AWS ECS

1. Create ECS cluster
2. Create task definition with Docker image
3. Create service from task definition

### Deploy to Kubernetes

```bash
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cyberhire-ai
spec:
  replicas: 3
  selector:
    matchLabels:
      app: cyberhire-ai
  template:
    metadata:
      labels:
        app: cyberhire-ai
    spec:
      containers:
      - name: app
        image: cyberhire-ai:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: connection-string
        - name: NEXTAUTH_SECRET
          valueFrom:
            secretKeyRef:
              name: auth-secret
              key: secret
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: cyberhire-ai-service
spec:
  type: LoadBalancer
  selector:
    app: cyberhire-ai
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
EOF
```

## Database Setup

### Supabase (Recommended)

1. Create account at [https://supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Use as `DATABASE_URL` in environment

### AWS RDS

1. Create RDS PostgreSQL instance
2. Enable public accessibility
3. Get endpoint and credentials
4. Format connection string: `postgresql://user:password@host:5432/dbname`

## SSL/HTTPS

### Vercel

Automatic SSL with `*.vercel.app` and custom domains.

### Custom Domain

1. Add domain in Vercel Settings
2. Update DNS records
3. SSL auto-provisioned

## Monitoring

### Vercel Analytics

1. Enable Web Analytics in Project Settings
2. View analytics in Vercel Dashboard

### Application Monitoring

Add Sentry for error tracking:

```bash
npm install @sentry/nextjs
```

Configure in `next.config.js`:

```js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## CI/CD Pipeline

GitHub Actions workflow in `.github/workflows/ci-cd.yml`:

1. Tests on PR
2. Build verification
3. Deploy to production on merge to main

## Scaling

### Database

- Monitor query performance
- Add indexes as needed
- Use connection pooling

### Application

- Use Vercel's auto-scaling
- Enable caching headers
- Optimize images

## Backup & Recovery

### Database

```bash
# Backup
pg_dump postgresql://user:password@host/db > backup.sql

# Restore
psql postgresql://user:password@host/db < backup.sql
```

### Application

GitHub repository serves as backup. Vercel keeps deployment history.

## Troubleshooting

### Database Connection Errors

1. Check `DATABASE_URL` format
2. Verify firewall rules
3. Test connection locally

### Build Failures

1. Check build logs
2. Verify environment variables
3. Run `npm run build` locally

### Runtime Errors

1. Check application logs
2. Review error tracking (Sentry)
3. Check database connection

## Performance Optimization

1. Enable image optimization
2. Use dynamic imports
3. Implement caching strategies
4. Monitor Core Web Vitals
5. Use CDN for static assets

## Security

1. Keep dependencies updated
2. Enable 2FA on Vercel/GitHub
3. Use secret management
4. Regular security audits
5. Enable HTTPS enforcement


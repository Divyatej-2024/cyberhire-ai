# API Documentation

## Base URL

```
https://cyberhire.com/api
```

## Authentication

All API endpoints require authentication via Bearer token:

```
Authorization: Bearer {token}
```

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "message": "Success"
}
```

## Endpoints

### Applications

#### List Applications

```
GET /api/applications
```

Query Parameters:
- `status` - Filter by status (applied, interview, offer, rejected)
- `page` - Page number
- `pageSize` - Items per page

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "jobId": "job-1",
      "status": "interview",
      "appliedAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-16T15:30:00Z"
    }
  ]
}
```

#### Get Application

```
GET /api/applications/:id
```

#### Create Application

```
POST /api/applications
```

Request Body:
```json
{
  "jobId": "job-1",
  "notes": "Applied via CyberHire"
}
```

#### Update Application

```
PUT /api/applications/:id
```

Request Body:
```json
{
  "status": "interview",
  "notes": "Interview scheduled"
}
```

#### Delete Application

```
DELETE /api/applications/:id
```

### Jobs

#### Search Jobs

```
GET /api/jobs
```

Query Parameters:
- `search` - Search keyword
- `location` - Job location
- `workMode` - remote, hybrid, onsite
- `level` - entry-level, mid-level, senior
- `salaryMin` - Minimum salary
- `salaryMax` - Maximum salary
- `page` - Page number
- `pageSize` - Items per page

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "job-1",
      "title": "SOC Analyst",
      "company": "SecureBank",
      "location": "London, UK",
      "salary": {
        "min": 45000,
        "max": 55000,
        "currency": "GBP"
      },
      "description": "...",
      "skills": ["Python", "Linux"],
      "workMode": "hybrid",
      "postedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

#### Get Job Details

```
GET /api/jobs/:id
```

#### Get Trending Jobs

```
GET /api/jobs/trending
```

#### Get Recommended Jobs

```
GET /api/jobs/recommended
```

### Dashboard

#### Get Dashboard Statistics

```
GET /api/dashboard/stats
```

Response:
```json
{
  "success": true,
  "data": {
    "totalApplications": 24,
    "interviewCount": 5,
    "offerCount": 2,
    "rejectedCount": 3,
    "successRate": 22,
    "upcomingInterviews": 2,
    "wishlistCount": 8
  }
}
```

#### Get Application Metrics

```
GET /api/dashboard/metrics
```

Response:
```json
{
  "success": true,
  "data": {
    "weeklyApplications": [2, 3, 5, 4, 6, 3, 1],
    "interviewRate": 20.8,
    "offerRate": 8.3,
    "companiesApplied": 24,
    "topCompanies": ["SecureBank", "TechCorp"],
    "topSalaryRange": {
      "min": 45000,
      "max": 75000
    }
  }
}
```

### Resume

#### Get Resume

```
GET /api/resume
```

#### Create Resume

```
POST /api/resume
```

Request Body:
```json
{
  "title": "My Resume",
  "content": "...",
  "skills": ["Python", "AWS"],
  "isPrimary": true
}
```

#### Update Resume

```
PUT /api/resume/:id
```

#### Optimize Resume (AI)

```
POST /api/resume/:id/optimize
```

Query Parameters:
- `jobId` - Tailor for specific job

### Interview Preparation

#### Get Questions

```
GET /api/interview/questions
```

Query Parameters:
- `category` - technical, behavioral, hr, scenario
- `role` - SOC Analyst, etc.
- `difficulty` - easy, medium, hard

#### Start Mock Interview

```
POST /api/interview/mock
```

Request Body:
```json
{
  "role": "SOC Analyst",
  "difficulty": "medium"
}
```

#### Submit Answers

```
POST /api/interview/mock/:id/submit
```

Request Body:
```json
{
  "answers": ["answer1", "answer2"]
}
```

### Skill Gap Analysis

#### Analyze Skills

```
POST /api/skill-gap
```

Request Body:
```json
{
  "jobId": "job-1",
  "resumeId": "resume-1"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "gapScore": 72,
    "matchPercentage": 72,
    "missingSkills": [
      {
        "skill": "Kubernetes",
        "importance": "important",
        "requiredLevel": "intermediate"
      }
    ],
    "recommendations": [
      {
        "skill": "Kubernetes",
        "estimatedTime": "3 months",
        "priority": 1
      }
    ]
  }
}
```

## Error Codes

| Code | Message |
|------|---------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## Rate Limiting

- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users

Headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1705330800
```

## Pagination

Default pagination:
- `page`: 1
- `pageSize`: 20
- Maximum `pageSize`: 100

Example:
```
GET /api/applications?page=2&pageSize=50
```

## Filtering

Combine multiple filters:
```
GET /api/jobs?location=London&workMode=remote&level=mid-level&salaryMin=50000
```

## Sorting

Query Parameter: `sortBy`

Options:
- `relevance` (default)
- `recent`
- `salary`
- `match`

Example:
```
GET /api/jobs?sortBy=salary
```

## Webhooks

Webhooks for events:

```
POST https://yourserver.com/webhooks/interview
Content-Type: application/json

{
  "event": "interview_scheduled",
  "applicationId": "app-1",
  "timestamp": "2024-01-16T15:30:00Z"
}
```

## SDK

```javascript
import { apiClient } from '@/lib/api/client';

// Get applications
const apps = await apiClient.get('/applications');

// Create application
const newApp = await apiClient.post('/applications', {
  jobId: 'job-1'
});
```

## Best Practices

1. Always include authentication token
2. Handle rate limiting with exponential backoff
3. Cache responses when appropriate
4. Validate input data
5. Log errors for debugging
6. Use pagination for large datasets
7. Test with Postman or curl


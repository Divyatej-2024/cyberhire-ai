/**
 * Type Definitions
 * Central location for all TypeScript interfaces and types
 */

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'professional' | 'recruiter' | 'admin';
  industry?: string;
  location?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  skills: string[];
  salary?: { min: number; max: number; currency: string };
  workMode: 'remote' | 'hybrid' | 'onsite';
  jobType: 'full-time' | 'part-time' | 'contract' | 'freelance';
  level: 'entry-level' | 'mid-level' | 'senior' | 'lead';
  industry: string;
  source: 'LinkedIn' | 'Indeed' | 'Reed' | 'Direct' | 'Other';
  sourceUrl?: string;
  postedAt: Date;
  expiresAt?: Date;
}

export interface JobFilters {
  search?: string;
  location?: string;
  workMode?: string;
  type?: string;
  level?: string;
  salaryMin?: number;
  salaryMax?: number;
  visaSponsorship?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: 'relevance' | 'recent' | 'salary' | 'match';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Application Types
export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: 'applied' | 'interview' | 'assessment' | 'offer' | 'rejected' | 'withdrawn';
  notes?: string;
  isWishlisted: boolean;
  appliedAt: Date;
  updatedAt: Date;
  interviewDates?: Date[];
  timeline?: TimelineEntry[];
}

export interface TimelineEntry {
  id: string;
  applicationId: string;
  type: 'application' | 'review' | 'interview' | 'offer' | 'rejection' | 'note';
  title: string;
  description?: string;
  date: Date;
  createdAt: Date;
}

export interface ApplicationMetrics {
  totalApplications: number;
  interviewCount: number;
  offerCount: number;
  rejectedCount: number;
  successRate: number;
  upcomingInterviews: number;
  wishlistCount: number;
}

// Resume Types
export interface Resume {
  id: string;
  userId: string;
  title: string;
  content: string;
  skills: string[];
  isPrimary: boolean;
  isAtsOptimized: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CoverLetter {
  id: string;
  userId: string;
  jobId?: string;
  content: string;
  isTemplate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interview Types
export interface MockInterview {
  id: string;
  userId: string;
  jobId?: string;
  role: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: InterviewQuestion[];
  answers: InterviewAnswer[];
  score?: number;
  feedback?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface InterviewQuestion {
  id: string;
  text: string;
  category: 'technical' | 'behavioral' | 'hr' | 'scenario';
  role?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  starAnswer?: string;
}

export interface InterviewAnswer {
  id: string;
  interviewId: string;
  questionId: string;
  text: string;
  recordingUrl?: string;
  score?: number;
  feedback?: string;
}

// Skill Gap Types
export interface SkillGap {
  id: string;
  userId: string;
  jobId?: string;
  skill: string;
  currentLevel: 'none' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
  requiredLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  gap: number;
}

// User Settings Types
export interface UserSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  emailOnNewJobs: boolean;
  emailOnInterviewReminder: boolean;
  emailOnOffers: boolean;
  pushNotifications: boolean;
  autoBackup: boolean;
  profileVisibility: 'private' | 'public' | 'friends-only';
  allowMessages: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Dashboard Types
export interface DashboardStats {
  totalApplications: number;
  interviewCount: number;
  offerCount: number;
  rejectedCount: number;
  successRate: number;
  upcomingInterviews: number;
  wishlistCount: number;
}

export interface DashboardMetrics {
  weeklyApplications: number[];
  interviewRate: number;
  offerRate: number;
  companiesApplied: number;
  topCompanies: string[];
  topSalaryRange: { min: number; max: number };
}
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'graduate';
  workMode: 'remote' | 'hybrid' | 'onsite';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  nice_to_haves?: string[];
  skills: string[];
  industry: string;
  level: 'entry-level' | 'mid-level' | 'senior' | 'graduate';
  visaSponsorship: boolean;
  securityClearance?: string;
  companySize: string;
  posted: Date;
  deadline?: Date;
  source: string; // LinkedIn, Indeed, etc.
  sourceUrl: string;
  matchScore?: number;
}

// Application Types
export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: 'applied' | 'interview' | 'assessment' | 'offer' | 'rejected' | 'withdrawn' | 'ghosted';
  appliedAt: Date;
  updatedAt: Date;
  notes: string;
  attachments: string[]; // File URLs
  timeline: TimelineEntry[];
  followUpDate?: Date;
  isWishlisted: boolean;
}

export interface TimelineEntry {
  id: string;
  type: 'applied' | 'interview' | 'assessment' | 'offer' | 'rejected' | 'note';
  title: string;
  description: string;
  date: Date;
  attachments?: string[];
}

// Resume Types
export interface Resume {
  id: string;
  userId: string;
  title: string;
  content: string; // JSON or HTML
  skills: string[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  isPrimary: boolean;
  atsOptimized: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  skills: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date;
  grade?: string;
  activities?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
}

// Interview Types
export interface InterviewQuestion {
  id: string;
  type: 'technical' | 'behavioral' | 'hr' | 'scenario';
  category: string;
  question: string;
  role: string;
  difficulty: 'easy' | 'medium' | 'hard';
  starAnswer?: string;
  tags: string[];
}

export interface MockInterview {
  id: string;
  userId: string;
  role: string;
  startedAt: Date;
  endedAt?: Date;
  questions: InterviewQuestion[];
  answers: string[];
  feedback?: string;
  score?: number;
}

// Skill Gap Types
export interface SkillGap {
  id: string;
  userId: string;
  jobId: string;
  missingSkills: SkillRequirement[];
  strongSkills: string[];
  recommendations: Recommendation[];
  gapScore: number; // 0-100
  matchPercentage: number;
}

export interface SkillRequirement {
  skill: string;
  importance: 'critical' | 'important' | 'nice-to-have';
  requiredLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  userLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Recommendation {
  id: string;
  skill: string;
  certifications: string[];
  courses: CourseResource[];
  estimatedTime: string;
  priority: number;
}

export interface CourseResource {
  id: string;
  title: string;
  provider: string;
  url: string;
  duration: string;
  level: string;
  cost: number;
  rating?: number;
}

// Learning Roadmap Types
export interface LearningRoadmap {
  id: string;
  title: string;
  specialization: 'soc-analyst' | 'penetration-tester' | 'cloud-security' | 'blue-team' | 'threat-hunter' | 'digital-forensics' | 'grc' | 'iam';
  description: string;
  stages: LearningStage[];
  estimatedDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface LearningStage {
  id: string;
  title: string;
  order: number;
  description: string;
  resources: CourseResource[];
  certifications: string[];
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  resources: string[];
  gitHubUrl?: string;
}

// Sponsorship Types
export interface SponsorshipStatus {
  id: string;
  companyId: string;
  companyName: string;
  visaTypes: VisaType[];
  sponsorStatus: 'licensed' | 'unlicensed' | 'unknown';
  confidence: number; // 0-100
  lastUpdated: Date;
  notes?: string;
}

export interface VisaType {
  type: 'skilled-worker' | 'graduate' | 'health-care' | 'intra-company' | 'other';
  available: boolean;
  notes?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalApplications: number;
  appliedCount: number;
  interviewCount: number;
  offerCount: number;
  rejectedCount: number;
  successRate: number;
  responseRate: number;
  averageTimeToResponse: number;
  upcomingInterviews: number;
  wishlistCount: number;
  savedJobsCount: number;
}

export interface ApplicationMetrics {
  weeklyApplications: number[];
  interviewRate: number;
  offerRate: number;
  companiesApplied: number;
  topCompanies: string[];
  topSalaryRange: {
    min: number;
    max: number;
  };
  averageSalary: number;
}

// Settings Types
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  emailNotifications: EmailNotificationSettings;
  dataBackup: DataBackupSettings;
}

export interface NotificationSettings {
  emailOnNewJobs: boolean;
  emailOnInterviewReminder: boolean;
  emailOnOffers: boolean;
  emailOnRejections: boolean;
  pushNotifications: boolean;
  dailyDigest: boolean;
}

export interface PrivacySettings {
  profilePrivacy: 'public' | 'private' | 'friends-only';
  showInSearchResults: boolean;
  allowMessages: boolean;
  shareApplicationStatus: boolean;
}

export interface EmailNotificationSettings {
  marketing: boolean;
  updates: boolean;
  jobAlerts: boolean;
  reminders: boolean;
}

export interface DataBackupSettings {
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  lastBackupDate: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter Types
export interface JobFilters {
  search?: string;
  location?: string;
  workMode?: 'remote' | 'hybrid' | 'onsite';
  type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'graduate';
  level?: 'entry-level' | 'mid-level' | 'senior' | 'graduate';
  salaryMin?: number;
  salaryMax?: number;
  visaSponsorship?: boolean;
  securityClearance?: boolean;
  skills?: string[];
  industries?: string[];
  companySize?: string[];
  sortBy?: 'relevance' | 'recent' | 'salary' | 'match';
  page?: number;
  pageSize?: number;
}

// Analytics Types
export interface AnalyticsEvent {
  id: string;
  userId: string;
  eventType: string;
  eventData: Record<string, any>;
  timestamp: Date;
  sessionId: string;
}

export interface ApplicationAnalytics {
  totalApplications: number;
  applicationsByStatus: Record<string, number>;
  applicationsByCompany: Record<string, number>;
  applicationsByRole: Record<string, number>;
  weeklyApplicationTrend: Array<{
    week: string;
    count: number;
  }>;
  successMetrics: {
    interviewRate: number;
    offerRate: number;
    responseRate: number;
  };
}

// AI Service Types
export interface AIGeneratedContent {
  id: string;
  userId: string;
  type: 'cover-letter' | 'resume' | 'interview-answer' | 'message';
  originalContent: string;
  generatedContent: string;
  context?: Record<string, any>;
  createdAt: Date;
}

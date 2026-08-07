/**
 * Service layer for business logic
 * Job-related services
 */

import { Job, JobFilters, PaginatedResponse } from '@/types';
import { get, post } from '@/lib/api/client';

/**
 * Fetch jobs with filters and pagination
 */
export const fetchJobs = async (filters: JobFilters): Promise<PaginatedResponse<Job>> => {
  const params = new URLSearchParams();

  if (filters.search) params.append('search', filters.search);
  if (filters.location) params.append('location', filters.location);
  if (filters.workMode) params.append('workMode', filters.workMode);
  if (filters.type) params.append('type', filters.type);
  if (filters.level) params.append('level', filters.level);
  if (filters.salaryMin) params.append('salaryMin', filters.salaryMin.toString());
  if (filters.salaryMax) params.append('salaryMax', filters.salaryMax.toString());
  if (filters.visaSponsorship) params.append('visaSponsorship', 'true');
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());
  if (filters.sortBy) params.append('sortBy', filters.sortBy);

  return get<PaginatedResponse<Job>>(`/jobs?${params.toString()}`);
};

/**
 * Fetch single job
 */
export const fetchJob = async (id: string): Promise<Job> => {
  return get<Job>(`/jobs/${id}`);
};

/**
 * Search jobs by keyword
 */
export const searchJobs = async (query: string): Promise<Job[]> => {
  return get<Job[]>(`/jobs/search?q=${encodeURIComponent(query)}`);
};

/**
 * Get trending jobs
 */
export const getTrendingJobs = async (): Promise<Job[]> => {
  return get<Job[]>('/jobs/trending');
};

/**
 * Get recommended jobs
 */
export const getRecommendedJobs = async (): Promise<Job[]> => {
  return get<Job[]>('/jobs/recommended');
};

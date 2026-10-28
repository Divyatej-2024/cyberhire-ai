/**
 * Service layer for business logic
 * Application-related services
 */

import { Application, ApplicationMetrics } from '@/types';
import { get, post, patch, del } from '@/lib/api/client';

/**
 * Fetch user applications
 */
export const fetchApplications = async (status?: string) => {
  const url = status ? `/applications?status=${status}` : '/applications';
  return get<Application[]>(url);
};

/**
 * Fetch single application
 */
export const fetchApplication = async (id: string): Promise<Application> => {
  return get<Application>(`/applications/${id}`);
};

/**
 * Create application
 */
export const createApplication = async (data: Partial<Application>): Promise<Application> => {
  return post<Application>('/applications', data);
};

/**
 * Update application
 */
export const updateApplication = async (
  id: string,
  data: Partial<Application>
): Promise<Application> => {
  return patch<Application>(`/applications/${id}`, data);
};

/**
 * Delete application
 */
export const deleteApplication = async (id: string): Promise<void> => {
  return del(`/applications/${id}`);
};

/**
 * Get application metrics
 */
export const getApplicationMetrics = async (): Promise<ApplicationMetrics> => {
  return get<ApplicationMetrics>('/applications/metrics');
};

/**
 * Add timeline entry
 */
export const addTimelineEntry = async (
  applicationId: string,
  data: any
): Promise<Application> => {
  return post(`/applications/${applicationId}/timeline`, data);
};

/**
 * Bulk update applications
 */
export const bulkUpdateApplications = async (
  ids: string[],
  status: string
): Promise<{ updated: number }> => {
  return patch('/applications/bulk', { ids, status });
};

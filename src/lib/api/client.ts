/**
 * API utilities
 * Configuration and helpers for API calls
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch wrapper with error handling
 */
export const fetchAPI = async <T,>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}/api${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

/**
 * GET request
 */
export const get = async <T,>(url: string) => apiClient.get<T>(url).then((res) => res.data);

/**
 * POST request
 */
export const post = async <T,>(url: string, data?: any) =>
  apiClient.post<T>(url, data).then((res) => res.data);

/**
 * PUT request
 */
export const put = async <T,>(url: string, data?: any) =>
  apiClient.put<T>(url, data).then((res) => res.data);

/**
 * PATCH request
 */
export const patch = async <T,>(url: string, data?: any) =>
  apiClient.patch<T>(url, data).then((res) => res.data);

/**
 * DELETE request
 */
export const del = async <T,>(url: string) => apiClient.delete<T>(url).then((res) => res.data);

/**
 * Handle API errors
 */
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

/**
 * Utility Functions
 * Common helper functions used throughout the application
 */

export const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | string, format: 'short' | 'long' = 'short'): string => {
  const d = new Date(date);
  if (format === 'short') {
    return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  return d.toLocaleDateString('en-GB', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Format time to readable string
 */
export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Calculate days remaining
 */
export const daysUntil = (date: Date | string): number => {
  const now = new Date();
  const target = new Date(date);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

/**
 * Format number as currency
 */
export const formatCurrency = (amount: number, currency = 'GBP'): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format number as compact (1K, 1M, etc.)
 */
export const formatCompact = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

/**
 * Truncate text to specified length
 */
export const truncate = (text: string, length = 100): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Check if URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Extract domain from URL
 */
export const extractDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

/**
 * Generate slug from text
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Generate random color
 */
export const generateColor = (seed: string): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0xffffff).toString(16);
  return '#' + '000000'.substring(0, 6 - color.length) + color;
};

/**
 * Check if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Group array by property
 */
export const groupBy = <T,>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const group = String(item[key]);
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastRun = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRun >= delay) {
      func(...args);
      lastRun = now;
    }
  };
};

/**
 * Wait/sleep utility
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Retry async function
 */
export const retry = async <T,>(
  fn: () => Promise<T>,
  options: { retries: number; delay: number } = { retries: 3, delay: 1000 }
): Promise<T> => {
  for (let i = 0; i <= options.retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === options.retries) throw err;
      await wait(options.delay);
    }
  }
  throw new Error('Retry failed');
};

/**
 * Safe JSON parse
 */
export const safeJsonParse = <T,>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get query parameters
 */
export const getQueryParams = (search: string): Record<string, string> => {
  const params = new URLSearchParams(search);
  const obj: Record<string, string> = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

/**
 * Build query string
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
};

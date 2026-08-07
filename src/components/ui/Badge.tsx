/**
 * Badge Component
 * Status badge and labels
 */

import React from 'react';
import { cn } from '@/lib/utils/helpers';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'cyber';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', children, className, ...props }, ref) => {
    const variants = {
      default: 'bg-slate-700 text-slate-200',
      success: 'bg-green-900/40 text-green-300 border border-green-500/30',
      warning: 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/30',
      danger: 'bg-red-900/40 text-red-300 border border-red-500/30',
      info: 'bg-blue-900/40 text-blue-300 border border-blue-500/30',
      cyber: 'bg-cyber-900/40 text-cyber-300 border border-cyber-500/30',
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center rounded-full font-medium', variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

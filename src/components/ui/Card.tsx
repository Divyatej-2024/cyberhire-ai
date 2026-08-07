/**
 * Card Component
 * Reusable card with glassmorphism effect
 */

import React from 'react';
import { cn } from '@/lib/utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'dark';
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hoverable = false, children, className, ...props }, ref) => {
    const variants = {
      default: 'bg-slate-900/50 border border-slate-700/50',
      glass: 'glass-card-dark',
      dark: 'bg-gradient-dark border border-slate-800',
    };

    const hover = hoverable ? 'hover:shadow-cyber hover:border-cyber-500/50 transition-all duration-300' : '';

    return (
      <div
        ref={ref}
        className={cn('rounded-2xl p-6', variants[variant], hover, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

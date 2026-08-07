/**
 * Button Component
 * Reusable button component with multiple variants
 */

import React from 'react';
import { cn } from '@/lib/utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, icon, children, className, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-gradient-cyber text-white hover:shadow-cyber hover:shadow-lg',
      secondary: 'bg-slate-800 text-cyber-400 hover:bg-slate-700 border border-cyber-500/30',
      ghost: 'text-cyber-400 hover:bg-slate-900/50 border border-cyber-500/20',
      danger: 'bg-red-600/80 text-white hover:bg-red-700',
      success: 'bg-green-600/80 text-white hover:bg-green-700',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⟳</span>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

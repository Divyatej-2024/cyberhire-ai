/**
 * Skeleton Loading Component
 * Placeholder component while content is loading
 */

import React from 'react';
import { cn } from '@/lib/utils/helpers';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '16px',
  circle = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-slate-700 to-slate-800 animate-pulse',
        circle ? 'rounded-full' : 'rounded-lg',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      {...props}
    />
  );
};

Skeleton.displayName = 'Skeleton';

export const SkeletonCard: React.FC = () => (
  <div className="rounded-2xl p-6 bg-slate-900/50 border border-slate-700/50">
    <Skeleton width="40%" height="24px" className="mb-4" />
    <Skeleton width="100%" height="16px" className="mb-2" />
    <Skeleton width="100%" height="16px" className="mb-4" />
    <Skeleton width="60%" height="16px" />
  </div>
);

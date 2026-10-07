import React from 'react';
import { ImportanceLevel, ItemStatus } from '@/src/shared/constants';
import { cn } from '@/src/shared/utils/cn';

interface StatusBadgeProps {
  importance?: ImportanceLevel;
  status?: ItemStatus;
  className?: string;
}

export function StatusBadge({ importance, status, className }: StatusBadgeProps) {
  if (importance === 'critical') {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30',
          className
        )}
      >
        Critical Notice
      </span>
    );
  }

  if (importance === 'high') {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30',
          className
        )}
      >
        Important
      </span>
    );
  }

  if (status === 'draft') {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30',
          className
        )}
      >
        Draft
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
        className
      )}
    >
      Active
    </span>
  );
}

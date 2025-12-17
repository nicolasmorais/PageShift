"use client";

import { useAnalyticsTracker } from '@/hooks/use-analytics-tracker';

interface PageTrackerProps {
  contentId: string;
}

export function PageTracker({ contentId }: PageTrackerProps) {
  useAnalyticsTracker(contentId);
  return null; // Não renderiza nada, apenas faz o tracking
}
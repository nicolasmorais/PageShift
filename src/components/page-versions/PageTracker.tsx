"use client";

import { usePageTracker } from '@/hooks/use-page-tracker';

interface PageTrackerProps {
  contentId: string;
}

export function PageTracker({ contentId }: PageTrackerProps) {
  usePageTracker(contentId);
  return null; // Não renderiza nada, apenas faz o tracking
}
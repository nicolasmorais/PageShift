"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { collectClientData } from '@/lib/visitor-utils';

/**
 * Hook para registrar uma visualização de página no endpoint de analytics,
 * coletando dados detalhados do cliente.
 * @param contentId O ID do conteúdo que está sendo exibido (ex: 'v1', 'ap', ou UUID do advertorial).
 */
export function useAnalyticsTracker(contentId: string) {
  const pathname = usePathname();

  useEffect(() => {
    if (!contentId) return;

    const trackPageView = async () => {
      try {
        const clientData = collectClientData();
        
        // Envia dados detalhados para o novo endpoint
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            contentId, 
            path: pathname,
            ...clientData,
          }),
        });
      } catch (error) {
        console.warn('Failed to send analytics tracking event:', error);
      }
    };

    trackPageView();
  }, [contentId, pathname]);
}
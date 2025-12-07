import { getDb } from '@/lib/database';
import { notFound } from 'next/navigation';

import { V1Page } from '@/components/page-versions/V1Page';
import { V2Page } from '@/components/page-versions/V2Page';
import { V3Page } from '@/components/page-versions/V3Page';
import { APPage } from '@/components/page-versions/APPage';
import { CustomAdvertorialPage } from '@/components/page-versions/CustomAdvertorialPage';

// This component maps a contentId to the actual Page Component
function ContentSwitcher({ contentId }: { contentId: string }) {
  switch (contentId) {
    case 'v1':
      return <V1Page />;
    case 'v2':
      return <V2Page />;
    case 'v3':
      return <V3Page />;
    case 'ap':
      return <APPage />;
    default:
      // If the contentId is not a fixed version, assume it's a Custom Advertorial ID
      // The CustomAdvertorialPage component will handle fetching the content by ID
      return <CustomAdvertorialPage advertorialId={contentId} />;
  }
}

interface DynamicPageProps {
  params: {
    slug?: string[];
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Refatorado para usar async/await, tratando-o como um Server Component
export default async function DynamicPage({ 
  params, 
  searchParams 
}: DynamicPageProps) {
  // Construct the path from the slug segments.
  // If slug is undefined or empty, it's the root path '/'.
  const path = params.slug ? `/${params.slug.join('/')}` : '/';

  const db = await getDb();
  const route = db.data.routes.find(r => r.path === path);

  if (route) {
    // Render the component corresponding to the contentId found in the database.
    return <ContentSwitcher contentId={route.contentId} />;
  }

  // If no route mapping is found in the database, check if the path itself is a Custom Advertorial ID
  const potentialId = path.substring(1); // Remove leading '/'
  const customAdvertorial = db.data.customAdvertorials.find(a => a.id === potentialId);
  
  if (customAdvertorial) {
    // If the path matches a custom advertorial ID, render it directly
    return <ContentSwitcher contentId={potentialId} />;
  }
  
  // If neither a mapped route nor a custom ID is found, return a 404.
  return notFound();
}
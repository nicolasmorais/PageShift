import { getDb } from '@/lib/database';
import { notFound } from 'next/navigation';

import { V1Page } from '@/components/page-versions/V1Page';
import { V2Page } from '@/components/page-versions/V2Page';
import { V3Page } from '@/components/page-versions/V3Page';
import { APPage } from '@/components/page-versions/APPage';

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
      // Render a default or a not found component if the id is unknown
      return notFound();
  }
}

export default async function DynamicPage({ 
  params,
}: { 
  params: { slug?: string[] };
}) {
  // Construct the path from the slug segments.
  // If slug is undefined or empty, it's the root path '/'.
  const path = params.slug ? `/${params.slug.join('/')}` : '/';

  const db = await getDb();
  const route = db.data.routes.find(r => r.path === path);

  if (!route) {
    // If no route mapping is found in the database, return a 404.
    return notFound();
  }

  // Render the component corresponding to the contentId found in the database.
  return <ContentSwitcher contentId={route.contentId} />;
}
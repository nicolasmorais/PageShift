import { getDb } from '@/lib/database';
import { notFound } from 'next/navigation';
import { Client } from 'pg';

import { V1Page } from '@/components/page-versions/V1Page';
import { V2Page } from '@/components/page-versions/V2Page';
import { V3Page } from '@/components/page-versions/V3Page';
import { APPage } from '@/components/page-versions/APPage';
import { CustomAdvertorialPage } from '@/components/page-versions/CustomAdvertorialPage';
import { RouteMapping } from '@/lib/advertorial-types'; // Import RouteMapping type

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
      // For custom advertorials, we pass the contentId (which is the advertorial ID)
      return <CustomAdvertorialPage advertorialId={contentId} />;
  }
}

interface DynamicPageProps {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Refatorado para usar async/await, tratando-o como um Server Component
export default async function DynamicPage({ 
  params, 
  searchParams, // Mantendo searchParams aqui, embora não seja usado, para desestruturação
}: DynamicPageProps) {
  // Await the params promise
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Construct the path from the slug segments.
  // If slug is undefined or empty, it's the root path '/'.
  const path = slug ? `/${slug.join('/')}` : '/';

  const client: Client = await getDb();
  
  // Busca a rota no PostgreSQL
  const routeResult = await client.query(
    'SELECT content_id as "contentId" FROM routes WHERE path = $1', 
    [path]
  );
  
  const route: RouteMapping | undefined = routeResult.rows[0];

  if (route) {
    // Render the component corresponding to the contentId found in the database.
    return <ContentSwitcher contentId={route.contentId} />;
  }

  // Se nenhuma rota mapeada for encontrada, retorna 404.
  return notFound();
}
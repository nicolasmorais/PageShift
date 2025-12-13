import { getDb } from '@/lib/database';
import { notFound } from 'next/navigation';

import { V1Page } from '@/components/page-versions/V1Page';
import { V2Page } from '@/components/page-versions/V2Page';
import { V3Page } from '@/components/page-versions/V3Page';
import { APPage } from '@/components/page-versions/APPage';
import { CustomAdvertorialPage } from '@/components/page-versions/CustomAdvertorialPage';
import { RouteMapping } from '@/lib/advertorial-types'; // Import RouteMapping type

// This component maps a contentId to the actual Page Component
function ContentSwitcher({ contentId }: { contentId: string }): JSX.Element {
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
  searchParams: { [key: string]: string | string[] | undefined };
}

// Refatorado para usar async/await, tratando-o como um Server Component
export default async function DynamicPage({ 
  params, 
}: DynamicPageProps): Promise<JSX.Element> {
  // Await the params promise (removed promise type from props interface)
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Construct the path from the slug segments.
  // If slug is undefined or empty, it's the root path '/'.
  const path = slug ? `/${slug.join('/')}` : '/';

  const db = await getDb();
  // Explicitly typing the parameter in find
  const route = db.data.routes.find((r: RouteMapping) => r.path === path);

  if (route) {
    // Render the component corresponding to the contentId found in the database.
    return <ContentSwitcher contentId={route.contentId} />;
  }

  // Se nenhuma rota mapeada for encontrada, retorna 404.
  // Removemos a lógica que tentava carregar pelo ID do advertorial.
  return notFound();
}
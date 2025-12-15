import { getDb } from '@/lib/database';
import { notFound } from 'next/navigation';
import { Client } from 'pg';

import { V1Page } from '@/components/page-versions/V1Page';
import { V2Page } from '@/components/page-versions/V2Page';
import { V3Page } from '@/components/page-versions/V3Page';
import { APPage } from '@/components/page-versions/APPage';
import { CustomAdvertorialPage } from '@/components/page-versions/CustomAdvertorialPage';
import { RouteMapping } from '@/lib/advertorial-types'; // Import RouteMapping type

// This component maps a contentId to actual Page Component
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
      // For custom advertorials, we pass the contentId (which is advertorial ID)
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
  // Await params promise
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Construct path from slug segments.
  // If slug is undefined or empty, it's root path '/'.
  const path = slug ? `/${slug.join('/')}` : '/';

  const client: Client = await getDb();
  
  // NOVA LÓGICA 1: Verifica se o path corresponde a uma rota automática (slug)
  if (path !== '/') {
    const slugWithoutSlash = path.replace(/^\//, '');
    const autoRoutesResult = await client.query('SELECT value FROM settings WHERE key = $1', ['autoRoutes']);
    if (autoRoutesResult.rows.length > 0) {
        const autoRoutes: { [slug: string]: string } = autoRoutesResult.rows[0].value;
        const advertorialIdFromSlug = autoRoutes[slugWithoutSlash];
        if (advertorialIdFromSlug) {
            // Se encontrou um mapeamento de slug para ID, renderiza o advertorial
            return <ContentSwitcher contentId={advertorialIdFromSlug} />;
        }
    }
  }

  // NOVA LÓGICA 2: Se não for rota automática, verifica se o path corresponde a um ID de advertorial dinâmico
  // Para isso, tratamos o path sem a barra inicial como um possível ID
  const potentialAdvertorialId = path.replace(/^\//, '');
  if (potentialAdvertorialId) {
    const advertorialResult = await client.query('SELECT id FROM custom_advertorials WHERE id = $1', [potentialAdvertorialId]);
    if (advertorialResult.rows.length > 0) {
      // Se encontrou um advertorial com este ID, renderiza ele diretamente
      return <ContentSwitcher contentId={potentialAdvertorialId} />;
    }
  }

  // LÓGICA 3 (Fallback): Se não for nada acima, busca a rota na tabela routes (para páginas estáticas como v1, v2, etc.)
  const routeResult = await client.query(
    'SELECT content_id as "contentId" FROM routes WHERE path = $1', 
    [path]
  );
  
  const route: RouteMapping | undefined = routeResult.rows[0];

  if (route) {
    // Renderiza componente correspondente ao contentId encontrado na tabela de rotas
    return <ContentSwitcher contentId={route.contentId} />;
  }

  // Se nenhuma rota mapeada for encontrada, retorna 404.
  return notFound();
}
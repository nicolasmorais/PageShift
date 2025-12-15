import { getDb } from '@/lib/database';
import { notFound } from 'next/navigation';
import { Client } from 'pg';

import { V1Page } from '@/components/page-versions/V1Page';
import { V2Page } from '@/components/page-versions/V2Page';
import { V3Page } from '@/components/page-versions/V3Page';
import { APPage } from '@/components/page-versions/APPage';
import { CustomAdvertorialPage } from '@/components/page-versions/CustomAdvertorialPage';
import { RouteMapping } from '@/lib/advertorial-types';

// Componente Cliente que apenas renderiza o conteúdo correto
// Ele não chama hooks de cliente diretamente, pois eles estão dentro dos componentes de página (V1Page, etc.)
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
      // Para advertoriais personalizados, passamos o contentId (que é o ID do advertorial)
      return <CustomAdvertorialPage advertorialId={contentId} />;
  }
}

interface DynamicPageProps {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Server Component principal: busca os dados e passa para o cliente
export default async function DynamicPage({ 
  params, 
  searchParams, 
}: DynamicPageProps) {
  // Await params promise
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Constrói o path a partir dos segmentos da slug.
  // Se slug for undefined ou vazio, é o caminho raiz '/'.
  const path = slug ? `/${slug.join('/')}` : '/';

  const client: Client = await getDb();
  
  // LÓGICA 1: Verifica se o path corresponde a uma rota automática (slug)
  let contentId: string | null = null;
  if (path !== '/') {
    const slugWithoutSlash = path.replace(/^\//, '');
    const autoRoutesResult = await client.query('SELECT value FROM settings WHERE key = $1', ['autoRoutes']);
    if (autoRoutesResult.rows.length > 0) {
        const autoRoutes: { [slug: string]: string } = autoRoutesResult.rows[0].value;
        const advertorialIdFromSlug = autoRoutes[slugWithoutSlash];
        if (advertorialIdFromSlug) {
            contentId = advertorialIdFromSlug;
        }
    }
  }

  // LÓGICA 2: Se não for rota automática, verifica se o path corresponde a um ID de advertorial dinâmico
  if (!contentId) {
    const potentialAdvertorialId = path.replace(/^\//, '');
    if (potentialAdvertorialId) {
        const advertorialResult = await client.query('SELECT id FROM custom_advertorials WHERE id = $1', [potentialAdvertorialId]);
        if (advertorialResult.rows.length > 0) {
            contentId = potentialAdvertorialId;
        }
    }
  }

  // LÓGICA 3 (Fallback): Se não for nada acima, busca a rota na tabela routes
  if (!contentId) {
    const routeResult = await client.query(
        'SELECT content_id as "contentId" FROM routes WHERE path = $1', 
        [path]
    );
    const route: RouteMapping | undefined = routeResult.rows[0];
    if (route) {
        contentId = route.contentId;
    }
  }

  // Se nenhuma rota mapeada for encontrada, retorna 404.
  if (!contentId) {
    return notFound();
  }

  // Renderiza o componente cliente com o contentId correto
  return <ContentSwitcher contentId={contentId} />;
}
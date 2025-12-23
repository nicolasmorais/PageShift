import { getDb } from '@/lib/database';
import { notFound, redirect } from 'next/navigation';
import { Client } from 'pg';
import { validate as isUUID } from 'uuid';

import { V1Page } from '@/components/page-versions/V1Page';
import { V2Page } from '@/components/page-versions/V2Page';
import { V3Page } from '@/components/page-versions/V3Page';
import { MenopausePage } from '@/components/page-versions/MenopausePage';
import APPage from '@/components/page-versions/APPage';
import CustomAdvertorialPage from '@/components/page-versions/CustomAdvertorialPage';
import { RouteMapping } from '@/lib/advertorial-types';

// IDs de páginas estáticas
const STATIC_PAGE_IDS = ['v1', 'v2', 'v3', 'ap', 'menopausa'];

// Componente que renderiza o conteúdo correto
function ContentSwitcher({ contentId }: { contentId: string }) {
  try {
    switch (contentId) {
      case 'v1':
        return <V1Page />;
      case 'v2':
        return <V2Page />;
      case 'v3':
        return <V3Page />;
      case 'ap':
        return <APPage />;
      case 'menopausa':
        return <MenopausePage />;
      default:
        return <CustomAdvertorialPage advertorialId={contentId} />;
    }
  } catch (error) {
    console.error("ContentSwitcher Error:", error);
    return (
      <div className="bg-white text-gray-800 p-8">
        <h1 className="text-2xl font-bold text-red-600">Erro ao carregar o conteúdo</h1>
        <p>ID: {contentId}</p>
      </div>
    );
  }
}

interface DynamicPageProps {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DynamicPage({ 
  params, 
  searchParams, 
}: DynamicPageProps) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    
    // Página inicial padrão
    if (!slug || slug.length === 0) {
      return <V1Page />;
    }
    
    const path = `/${slug.join('/')}`;
    const slugKey = slug.join('/');

    // LÓGICA 0: Verificação prioritária de páginas estáticas (Hardcoded)
    if (STATIC_PAGE_IDS.includes(slugKey)) {
      return <ContentSwitcher contentId={slugKey} />;
    }

    const client: Client = await getDb();
    let contentId: string | null = null;

    // LÓGICA 1: Rota Automática (Settings)
    const autoRoutesResult = await client.query('SELECT value FROM settings WHERE key = $1', ['autoRoutes']);
    if (autoRoutesResult.rows.length > 0) {
      const autoRoutes: { [slug: string]: string } = autoRoutesResult.rows[0].value;
      if (autoRoutes[slugKey]) {
        contentId = autoRoutes[slugKey];
      }
    }

    // LÓGICA 2: Tabela de Rotas
    if (!contentId) {
      const routeResult = await client.query(
        'SELECT content_id as "contentId" FROM routes WHERE path = $1', 
        [path]
      );
      if (routeResult.rows[0]) {
        contentId = routeResult.rows[0].contentId;
      }
    }

    // LÓGICA 3: UUID Direto
    if (!contentId && isUUID(slugKey) && !STATIC_PAGE_IDS.includes(slugKey)) {
      const advertorialResult = await client.query('SELECT id FROM custom_advertorials WHERE id = $1', [slugKey]);
      if (advertorialResult.rows.length > 0) {
        contentId = slugKey;
      }
    }

    if (!contentId) {
      return notFound();
    }

    return <ContentSwitcher contentId={contentId} />;
  } catch (error) {
    console.error("DynamicPage Error:", error);
    return notFound();
  }
}
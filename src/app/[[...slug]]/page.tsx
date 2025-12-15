import { getDb } from '@/lib/database';
import { notFound } from 'next/navigation';
import { Client } from 'pg';
import { validate as isUUID } from 'uuid';

import { V1Page } from '@/components/page-versions/V1Page';
import { V2Page } from '@/components/page-versions/V2Page';
import { V3Page } from '@/components/page-versions/V3Page';
import { APPage } from '@/components/page-versions/APPage';
import { CustomAdvertorialPage } from '@/components/page-versions/CustomAdvertorialPage';
import { RouteMapping } from '@/lib/advertorial-types';

// IDs de páginas estáticas que não devem ser procurados como advertoriais dinâmicos
const STATIC_PAGE_IDS = ['v1', 'v2', 'v3', 'ap'];

// Componente Cliente que apenas renderiza o conteúdo correto
function ContentSwitcher({ contentId }: { contentId: string }) {
  try {
    console.log("ContentSwitcher: Renderizando contentId:", contentId);
    
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
  } catch (error) {
    console.error("ContentSwitcher: Erro ao renderizar:", error);
    return (
      <div className="bg-white text-gray-800 font-merriweather p-8">
        <h1 className="text-2xl font-bold text-red-600">Erro ao carregar o conteúdo</h1>
        <p>Ocorreu um erro ao tentar carregar o conteúdo para: {contentId}</p>
        <details className="mt-4">
          <summary>Detalhes do erro</summary>
          <pre className="mt-2 p-4 bg-gray-100 rounded text-sm">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </details>
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

// Server Component principal: busca os dados e passa para o cliente
export default async function DynamicPage({ 
  params, 
  searchParams, 
}: DynamicPageProps) {
  try {
    console.log("DynamicPage: Iniciando renderização");
    
    // Await params promise
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    
    // Constrói o path a partir dos segmentos da slug.
    // Se slug for undefined ou vazio, é o caminho raiz '/'.
    const path = slug ? `/${slug.join('/')}` : '/';
    console.log("DynamicPage: Path construído:", path);

    const client: Client = await getDb();
    let contentId: string | null = null;

    // LÓGICA 1: Verifica se o path corresponde a uma rota automática (slug)
    if (path !== '/') {
      const slugWithoutSlash = path.replace(/^\//, '');
      console.log("DynamicPage: Verificando rota automática para slug:", slugWithoutSlash);
      
      const autoRoutesResult = await client.query('SELECT value FROM settings WHERE key = $1', ['autoRoutes']);
      if (autoRoutesResult.rows.length > 0) {
        const autoRoutes: { [slug: string]: string } = autoRoutesResult.rows[0].value;
        const advertorialIdFromSlug = autoRoutes[slugWithoutSlash];
        if (advertorialIdFromSlug) {
          console.log("DynamicPage: Encontrada rota automática:", slugWithoutSlash, "->", advertorialIdFromSlug);
          contentId = advertorialIdFromSlug;
        }
      }
    }

    // LÓGICA 2: Se não for rota automática, busca na tabela routes (fallback principal)
    if (!contentId) {
      console.log("DynamicPage: Buscando na tabela routes para path:", path);
      const routeResult = await client.query(
        'SELECT content_id as "contentId" FROM routes WHERE path = $1', 
        [path]
      );
      const route: RouteMapping | undefined = routeResult.rows[0];
      if (route) {
        console.log("DynamicPage: Encontrada rota na tabela routes:", path, "->", route.contentId);
        contentId = route.contentId;
      }
    }

    // LÓGICA 3: Se ainda não encontrou, verifica se é um ID de advertorial dinâmico válido
    // SÓ se for um UUID válido e não for página estática
    if (!contentId && path !== '/') {
      const potentialAdvertorialId = path.replace(/^\//, '');
      console.log("DynamicPage: Verificando se é advertorial dinâmico:", potentialAdvertorialId);
      console.log("DynamicPage: É UUID válido?", isUUID(potentialAdvertorialId));
      console.log("DynamicPage: É página estática?", STATIC_PAGE_IDS.includes(potentialAdvertorialId));
      
      if (isUUID(potentialAdvertorialId) && !STATIC_PAGE_IDS.includes(potentialAdvertorialId)) {
        console.log("DynamicPage: Buscando advertorial dinâmico com ID:", potentialAdvertorialId);
        const advertorialResult = await client.query('SELECT id FROM custom_advertorials WHERE id = $1', [potentialAdvertorialId]);
        if (advertorialResult.rows.length > 0) {
          console.log("DynamicPage: Encontrado advertorial dinâmico:", potentialAdvertorialId);
          contentId = potentialAdvertorialId;
        }
      }
    }

    // Se nenhuma rota mapeada for encontrada, retorna 404.
    if (!contentId) {
      console.log("DynamicPage: Nenhuma rota encontrada para path:", path);
      return notFound();
    }

    console.log("DynamicPage: ContentId final:", contentId);

    // Renderiza o componente cliente com o contentId correto
    return <ContentSwitcher contentId={contentId} />;
  } catch (error) {
    console.error("DynamicPage: Erro ao processar requisição:", error);
    return (
      <div className="bg-white text-gray-800 font-merriweather p-8">
        <h1 className="text-2xl font-bold text-red-600">Erro ao processar a requisição</h1>
        <p>Ocorreu um erro ao tentar processar esta página. Por favor, tente novamente mais tarde.</p>
        <details className="mt-4">
          <summary>Detalhes do erro</summary>
          <pre className="mt-2 p-4 bg-gray-100 rounded text-sm">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </details>
      </div>
    );
  }
}
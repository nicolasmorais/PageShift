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

// IDs de páginas estáticas - REMOVIDO 'menopausa' daqui para permitir override
const STATIC_PAGE_IDS = ['v1', 'v2', 'v3', 'ap'];

// Componente que renderiza o conteúdo correto
function ContentSwitcher({ contentId }: { contentId: string }) {
  console.log("ContentSwitcher: Renderizando contentId:", contentId);
  
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
  console.log("=== DynamicPage Iniciado ===");
  
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    
    console.log("Slug recebido:", slug);
    
    // Página inicial padrão
    if (!slug || slug.length === 0) {
      console.log("Renderizando página inicial (V1)");
      return <V1Page />;
    }
    
    const path = `/${slug.join('/')}`;
    const slugKey = slug.join('/');
    
    console.log("Path:", path);
    console.log("SlugKey:", slugKey);

    // VERIFICAÇÃO ESPECIAL: Se for 'menopausa', permite override pelas auto routes
    const isMenopause = slugKey === 'menopausa';
    
    const client: Client = await getDb();
    let contentId: string | null = null;

    // LÓGICA 1: Rota Automática (Settings) - MAIOR PRIORIDADE
    console.log("Verificando auto routes...");
    const autoRoutesResult = await client.query('SELECT value FROM settings WHERE key = $1', ['autoRoutes']);
    
    if (autoRoutesResult.rows.length > 0) {
      const autoRoutes: { [slug: string]: string } = autoRoutesResult.rows[0].value;
      console.log("AutoRoutes encontradas:", autoRoutes);
      console.log("Buscando slug:", slugKey);
      
      if (autoRoutes[slugKey]) {
        contentId = autoRoutes[slugKey];
        console.log("🎯 Rota automática encontrada:", slugKey, "→", contentId);
      }
    } else {
      console.log("Nenhuma auto route encontrada no banco");
    }

    // LÓGICA 2: Páginas Estáticas (exceto se 'menopausa' já teve auto route)
    if (!contentId && !isMenopause) {
      console.log("Verificando páginas estáticas...");
      if (STATIC_PAGE_IDS.includes(slugKey)) {
        contentId = slugKey;
        console.log("✅ Página estática encontrada:", contentId);
      }
    }

    // LÓGICA 3: Se 'menopausa' NÃO teve auto route, renderiza o conteúdo original
    if (!contentId && isMenopause) {
      console.log("Menopausa sem auto route - renderizando conteúdo original");
      contentId = 'menopausa';
    }

    // LÓGICA 4: Tabela de Rotas (só se não encontrar em auto routes nem estáticas)
    if (!contentId) {
      console.log("Verificando tabela de rotas...");
      const routeResult = await client.query(
        'SELECT content_id as "contentId" FROM routes WHERE path = $1', 
        [path]
      );
      if (routeResult.rows[0]) {
        contentId = routeResult.rows[0].contentId;
        console.log("✅ Rota encontrada na tabela:", contentId);
      }
    }

    // LÓGICA 5: UUID Direto
    if (!contentId && isUUID(slugKey)) {
      console.log("Verificando UUID direto...");
      const advertorialResult = await client.query('SELECT id FROM custom_advertorials WHERE id = $1', [slugKey]);
      if (advertorialResult.rows.length > 0) {
        contentId = slugKey;
        console.log("✅ UUID encontrado:", contentId);
      }
    }

    console.log("=== RESULTADO FINAL ===");
    console.log("Path:", path);
    console.log("SlugKey:", slugKey);
    console.log("ContentId:", contentId);

    if (!contentId) {
      console.log("❌ Conteúdo não encontrado para:", path);
      return notFound();
    }

    console.log("🎉 Renderizando ContentSwitcher com:", contentId);
    return <ContentSwitcher contentId={contentId} />;
  } catch (error) {
    console.error("=== ERRO NO DynamicPage ===");
    console.error(error);
    return notFound();
  }
}
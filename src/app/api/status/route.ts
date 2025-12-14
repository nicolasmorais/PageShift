import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';

export async function GET(): Promise<NextResponse> {
  try {
    const db = await getDb();
    
    // 1. Verificar status do DB (se a leitura foi bem-sucedida)
    const dbStatus = db ? 'OK' : 'ERROR';
    
    let routeCount = 0;
    let advertorialCount = 0;
    let pageViewCount = 0;
    let lastView = 'N/A';
    let authStatus = 'Padrão/Não Configurado';
    
    // Se estiver usando PostgreSQL, buscar dados das tabelas
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      
      try {
        // Contar rotas
        const routeResult = await client.query('SELECT COUNT(*) FROM routes');
        routeCount = parseInt(routeResult.rows[0].count);
        
        // Contar advertoriais
        const advertorialResult = await client.query('SELECT COUNT(*) FROM custom_advertorials');
        advertorialCount = parseInt(advertorialResult.rows[0].count);
        
        // Contar page views
        const pageViewResult = await client.query('SELECT COUNT(*) FROM page_views');
        pageViewCount = parseInt(pageViewResult.rows[0].count);
        
        // Última visualização
        if (pageViewCount > 0) {
          const lastViewResult = await client.query('SELECT timestamp FROM page_views ORDER BY timestamp DESC LIMIT 1');
          if (lastViewResult.rows.length > 0) {
            lastView = lastViewResult.rows[0].timestamp;
          }
        }
        
        // Status de autenticação
        const authResult = await client.query('SELECT value FROM settings WHERE key = $1', ['auth']);
        if (authResult.rows.length > 0) {
          const authData = authResult.rows[0].value;
          authStatus = authData.passwordHash ? 'Configurado' : 'Padrão/Não Configurado';
        }
      } catch (error) {
        console.error('Erro ao buscar dados do PostgreSQL:', error);
      }
    } else {
      // Fallback para lowdb (não deve acontecer)
      routeCount = db.data?.routes.length || 0;
      advertorialCount = db.data?.customAdvertorials.length || 0;
      pageViewCount = db.data?.pageViews.length || 0;
      lastView = db.data?.pageViews.length 
          ? db.data.pageViews[db.data.pageViews.length - 1].timestamp 
          : 'N/A';
      authStatus = db.data?.auth.passwordHash ? 'Configurado' : 'Padrão/Não Configurado';
    }
    
    // 2. Contar itens chave
    // 3. Verificar última visualização
    // 4. Verificar status de autenticação (se o hash existe)

    return NextResponse.json({
      status: 'OK',
      database: dbStatus,
      authStatus: authStatus,
      metrics: {
        routes: routeCount,
        advertorials: advertorialCount,
        pageViews: pageViewCount,
        lastPageView: lastView,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ 
      status: 'ERROR', 
      database: 'DOWN',
      message: 'Falha ao conectar ou ler o banco de dados.' 
    }, { status: 500 });
  }
}
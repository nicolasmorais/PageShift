import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { Client } from 'pg';

export async function GET(): Promise<NextResponse> {
  try {
    const db = await getDb();
    
    // 1. Verificar status do DB (se a leitura foi bem-sucedida)
    const dbStatus = db ? 'OK' : 'ERROR';
    
    let routeCount = 0;
    let advertorialCount = 0;
    let pageViewCount = 0;
    let lastView = 'N/A';
    let authStatus: 'Configurado' | 'Padrão/Não Configurado' = 'Padrão/Não Configurado';
    
    const client = db as Client;
    
    try {
      // Contar rotas
      const routeResult = await client.query('SELECT COUNT(*) FROM routes');
      routeCount = parseInt(routeResult.rows[0]?.count || '0');
      
      // Contar advertoriais
      const advertorialResult = await client.query('SELECT COUNT(*) FROM custom_advertorials');
      advertorialCount = parseInt(advertorialResult.rows[0]?.count || '0');
      
      // Contar page views
      const pageViewResult = await client.query('SELECT COUNT(*) FROM page_views');
      pageViewCount = parseInt(pageViewResult.rows[0]?.count || '0');
      
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
        authStatus = (authData && authData.passwordHash) ? 'Configurado' : 'Padrão/Não Configurado';
      }
    } catch (error) {
      console.error('Erro ao buscar dados das tabelas:', error);
    }
    
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
      authStatus: 'Padrão/Não Configurado',
      metrics: { routes: 0, advertorials: 0, pageViews: 0, lastPageView: 'N/A' },
      message: 'Falha ao conectar ou ler o banco de dados.',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
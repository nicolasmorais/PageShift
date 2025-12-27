import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { Client } from 'pg';

export async function GET(): Promise<NextResponse> {
  // Objeto de resposta padrão para garantir que nunca retorne undefined para o cliente
  const defaultResponse = {
    status: 'ERROR',
    database: 'DOWN',
    authStatus: 'Padrão/Não Configurado',
    metrics: {
      routes: 0,
      advertorials: 0,
      pageViews: 0,
      lastPageView: 'N/A',
    },
    timestamp: new Date().toISOString(),
  };

  try {
    const db = await getDb();
    if (!db) return NextResponse.json(defaultResponse);

    const client = db as Client;
    const response = { ...defaultResponse, status: 'OK', database: 'OK' };

    try {
      // 1. Contar rotas
      const routeResult = await client.query('SELECT COUNT(*) FROM routes');
      response.metrics.routes = parseInt(routeResult.rows[0]?.count || '0');
      
      // 2. Contar advertoriais
      const advertorialResult = await client.query('SELECT COUNT(*) FROM custom_advertorials');
      response.metrics.advertorials = parseInt(advertorialResult.rows[0]?.count || '0');
      
      // 3. Contar page views
      const pageViewResult = await client.query('SELECT COUNT(*) FROM page_views');
      response.metrics.pageViews = parseInt(pageViewResult.rows[0]?.count || '0');
      
      // 4. Última visualização
      if (response.metrics.pageViews > 0) {
        const lastViewResult = await client.query('SELECT timestamp FROM page_views ORDER BY timestamp DESC LIMIT 1');
        if (lastViewResult.rows.length > 0) {
          response.metrics.lastPageView = lastViewResult.rows[0].timestamp;
        }
      }
      
      // 5. Status de autenticação
      const authResult = await client.query('SELECT value FROM settings WHERE key = $1', ['auth']);
      if (authResult.rows.length > 0) {
        const authData = authResult.rows[0].value;
        if (authData && typeof authData === 'object') {
          response.authStatus = authData.passwordHash ? 'Configurado' : 'Padrão/Não Configurado';
        }
      }
    } catch (innerError) {
      console.error('Erro ao buscar métricas específicas:', innerError);
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ 
      ...defaultResponse,
      message: 'Falha ao conectar ou ler o banco de dados.'
    }, { status: 500 });
  }
}
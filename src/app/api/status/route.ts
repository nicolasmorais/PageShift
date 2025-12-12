import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';

export async function GET() {
  try {
    const db = await getDb();
    
    // 1. Verificar status do DB (se a leitura foi bem-sucedida)
    const dbStatus = db.data ? 'OK' : 'ERROR';
    
    // 2. Contar itens chave
    const routeCount = db.data?.routes.length || 0;
    const advertorialCount = db.data?.customAdvertorials.length || 0;
    const pageViewCount = db.data?.pageViews.length || 0;
    
    // 3. Verificar última visualização
    const lastView = db.data?.pageViews.length 
        ? db.data.pageViews[db.data.pageViews.length - 1].timestamp 
        : 'N/A';

    // 4. Verificar status de autenticação (se o hash existe)
    const authStatus = db.data?.auth.passwordHash ? 'Configurado' : 'Padrão/Não Configurado';

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
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { Client } from 'pg';

export async function POST() {
  try {
    const client: Client = await getDb();

    // 1. Dropar todas as tabelas existentes (CUIDADO: Isso apaga todos os dados)
    await client.query(`
      DROP TABLE IF EXISTS routes CASCADE;
      DROP TABLE IF EXISTS page_views CASCADE;
      DROP TABLE IF EXISTS settings CASCADE;
      DROP TABLE IF EXISTS custom_advertorials CASCADE;
      DROP TABLE IF EXISTS visits CASCADE;
      DROP TABLE IF EXISTS examples CASCADE;
    `);

    // 2. Recriando tabelas conforme o esquema do projeto
    await client.query(`CREATE TABLE IF NOT EXISTS routes (path VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, content_id VARCHAR(255) NOT NULL);`);
    await client.query(`CREATE TABLE IF NOT EXISTS page_views (id UUID PRIMARY KEY, content_id VARCHAR(255) NOT NULL, path VARCHAR(255) NOT NULL, timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, country VARCHAR(100), region_name VARCHAR(100));`);
    await client.query(`CREATE TABLE IF NOT EXISTS settings (key VARCHAR(255) PRIMARY KEY, value JSONB NOT NULL);`);
    await client.query(`CREATE TABLE IF NOT EXISTS custom_advertorials (id UUID PRIMARY KEY, name VARCHAR(255) NOT NULL, data JSONB NOT NULL);`);
    await client.query(`CREATE TABLE IF NOT EXISTS visits (id UUID PRIMARY KEY, visitor_id UUID NOT NULL, ip VARCHAR(50), city VARCHAR(100), region VARCHAR(100), country VARCHAR(100), latitude NUMERIC(10, 7), longitude NUMERIC(10, 7), device_type VARCHAR(50), os VARCHAR(100), browser VARCHAR(100), user_agent TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`);

    // 3. Inserindo dados iniciais (Seed)
    const defaultRoutes = [
        { path: '/', name: 'Página Principal', content_id: 'v1' },
        { path: '/v1', name: 'Rota do Advertorial V1', content_id: 'v1' },
        { path: '/v2', name: 'Rota do Advertorial V2', content_id: 'v2' },
        { path: '/v3', name: 'Rota do Advertorial V3', content_id: 'v3' },
        { path: '/aprovado', name: 'Página de Aprovação (Preview)', content_id: 'ap' },
    ];

    for (const route of defaultRoutes) {
        await client.query(
            'INSERT INTO routes (path, name, content_id) VALUES ($1, $2, $3)',
            [route.path, route.name, route.content_id]
        );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Banco de dados limpo e reinicializado com sucesso!' 
    });

  } catch (error: any) {
    console.error('Reset failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
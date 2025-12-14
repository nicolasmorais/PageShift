import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { GlobalPixelConfig } from '@/lib/advertorial-types';

// GET: Fetch pixel configuration
export async function GET() {
  try {
    const db = await getDb();
    
    // Se estiver usando PostgreSQL, buscar da tabela settings
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      const result = await client.query('SELECT value FROM settings WHERE key = $1', ['pixelConfig']);
      
      if (result.rows.length === 0) {
        return NextResponse.json({ message: 'Configuração não encontrada' }, { status: 404 });
      }
      
      return NextResponse.json(result.rows[0].value);
    }
    
    // Fallback para lowdb (não deve acontecer)
    const config: GlobalPixelConfig = db.data.pixelConfig;
    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to get pixel config:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}

// POST: Update pixel configuration
export async function POST(req: Request) {
  try {
    const newConfig: GlobalPixelConfig = await req.json();
    
    if (!newConfig) {
      return NextResponse.json({ message: 'Configuração é obrigatória' }, { status: 400 });
    }

    const db = await getDb();
    
    // Se estiver usando PostgreSQL, atualizar na tabela settings
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      
      await client.query(
        'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
        ['pixelConfig', JSON.stringify(newConfig)]
      );
      
      return NextResponse.json({ message: 'Configuração de Pixel atualizada com sucesso', config: newConfig });
    }
    
    // Fallback para lowdb (não deve acontecer)
    const dbData = db.data as any;
    dbData.pixelConfig = newConfig;
    await db.write();

    return NextResponse.json({ message: 'Configuração de Pixel atualizada com sucesso', config: db.data.pixelConfig });
  } catch (error) {
    console.error('Failed to update pixel config:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}
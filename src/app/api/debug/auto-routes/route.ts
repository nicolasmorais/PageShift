import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { Client } from 'pg';

export async function GET() {
  try {
    const client: Client = await getDb();
    
    // Verifica se a tabela settings existe
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'settings'
      );
    `);
    
    const tableExists = tableCheck.rows[0].exists;
    
    let autoRoutesData: any = null;
    let allSettings: any[] = [];
    
    if (tableExists) {
      // Busca as auto routes
      const autoRoutesResult = await client.query('SELECT value FROM settings WHERE key = $1', ['autoRoutes']);
      
      if (autoRoutesResult.rows.length > 0) {
        autoRoutesData = autoRoutesResult.rows[0].value;
      }
      
      // Busca todas as settings
      const allSettingsResult = await client.query('SELECT key, value FROM settings ORDER BY key');
      allSettings = allSettingsResult.rows;
    }
    
    return NextResponse.json({
      success: true,
      tableExists,
      autoRoutesData,
      allSettings,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Debug Auto Routes Error:', error);
    return NextResponse.json({
      success: false,
      error: String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
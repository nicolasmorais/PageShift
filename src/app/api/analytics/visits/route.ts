import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { VisitData } from '@/lib/advertorial-types';
import { Client } from 'pg';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const client: Client = await getDb();
    
    // Buscar da tabela visits
    const result = await client.query(
      `SELECT 
        id, visitor_id as "visitorId", ip, city, region, country, 
        latitude, longitude, device_type as "deviceType", os, browser, 
        user_agent as "userAgent", created_at as "createdAt" 
      FROM visits 
      ORDER BY created_at DESC 
      LIMIT $1`,
      [limit]
    );
    
    const visits: VisitData[] = result.rows.map(row => ({
        ...row,
        latitude: row.latitude ? parseFloat(row.latitude) : undefined,
        longitude: row.longitude ? parseFloat(row.longitude) : undefined,
    }));
    
    return NextResponse.json(visits);
    
  } catch (error) {
    console.error('Failed to fetch historical visits:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}
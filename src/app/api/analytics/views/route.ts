import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { PageViewEvent } from '@/lib/advertorial-types';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const db = await getDb();
    
    // Se estiver usando PostgreSQL, buscar da tabela page_views
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      
      let query = 'SELECT id, content_id as "contentId", path, timestamp, country, region_name as "regionName" FROM page_views';
      const params: any[] = [];
      
      if (startDateParam || endDateParam) {
        query += ' WHERE';
        const conditions: string[] = [];
        
        if (startDateParam) {
          conditions.push('timestamp >= $' + (params.length + 1));
          params.push(startDateParam);
        }
        
        if (endDateParam) {
          conditions.push('timestamp < $' + (params.length + 1));
          const nextDay = new Date(endDateParam);
          nextDay.setDate(nextDay.getDate() + 1);
          params.push(nextDay.toISOString());
        }
        
        query += ' ' + conditions.join(' AND ');
      }
      
      query += ' ORDER BY timestamp DESC';
      
      const result = await client.query(query, params);
      return NextResponse.json(result.rows);
    }
    
    // Fallback para lowdb (não deve acontecer)
    let pageViews: PageViewEvent[] = db.data.pageViews || [];

    if (startDateParam || endDateParam) {
      const startDate = startDateParam ? new Date(startDateParam) : null;
      const endDate = endDateParam ? new Date(endDateParam) : null;

      pageViews = pageViews.filter((view: PageViewEvent) => {
        const viewDate = new Date(view.timestamp);
        let matchesStart = true;
        let matchesEnd = true;

        if (startDate) {
          matchesStart = viewDate >= startDate;
        }

        if (endDate) {
          const nextDay = new Date(endDate);
          nextDay.setDate(nextDay.getDate() + 1);
          matchesEnd = viewDate < nextDay;
        }

        return matchesStart && matchesEnd;
      });
    }

    return NextResponse.json(pageViews);
  } catch (error) {
    console.error('Failed to fetch page views:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}
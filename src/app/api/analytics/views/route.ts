import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { PageViewEvent } from '@/lib/advertorial-types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const db = await getDb();
    let pageViews: PageViewEvent[] = db.data.pageViews || [];

    if (startDateParam || endDateParam) {
      const startDate = startDateParam ? new Date(startDateParam) : null;
      const endDate = endDateParam ? new Date(endDateParam) : null;

      pageViews = pageViews.filter(view => {
        const viewDate = new Date(view.timestamp);
        let matchesStart = true;
        let matchesEnd = true;

        if (startDate) {
          // Compara apenas a data (ignora o tempo)
          matchesStart = viewDate >= startDate;
        }

        if (endDate) {
          // Para incluir o dia final, comparamos com o início do dia seguinte
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
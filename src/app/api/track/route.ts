import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { PageViewEvent } from '@/lib/advertorial-types';
import { v4 as uuidv4 } from 'uuid';

// Função para buscar a localização baseada no IP
async function getGeoLocation(ip: string | null): Promise<{ country?: string, regionName?: string }> {
    if (!ip || ip === '::1' || ip === '127.0.0.1') {
        // IP local ou não disponível, retorna dados de teste
        return { country: 'Brasil', regionName: 'SP' };
    }
    
    // CRITICAL PITFALL: Server-side calls MUST use the direct ENV variable, not the proxy path.
    // However, since we are using a public GeoIP service (ip-api.com), we can use the proxy
    // if the user configured it, or call the external API directly using the ENV variable.
    // Since the user is expected to set GEOIP_API_URL, we use it directly for server-side fetch.
    
    const geoIpApiUrl = process.env.GEOIP_API_URL;
    if (!geoIpApiUrl) {
        console.warn("GEOIP_API_URL not set. Skipping GeoIP lookup.");
        return {};
    }

    try {
        // ip-api.com/json/{ip}
        const response = await fetch(`${geoIpApiUrl}/${ip}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // Adicionando timeout para evitar bloqueio
            signal: AbortSignal.timeout(1000), 
        });

        if (!response.ok) {
            console.error(`GeoIP API returned status ${response.status}`);
            return {};
        }

        const data = await response.json();
        
        if (data.status === 'success') {
            return {
                country: data.country || 'Desconhecido',
                regionName: data.regionName || 'Desconhecido', // Nome do estado/região
            };
        }
        return {};
    } catch (error) {
        console.error('GeoIP lookup failed:', error);
        return {};
    }
}

export async function POST(req: Request) {
  try {
    const { contentId, path } = await req.json();
    
    if (!contentId || !path) {
      return NextResponse.json({ message: 'contentId e path são obrigatórios' }, { status: 400 });
    }

    // 1. Obter o IP do cliente
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : null;
    
    // 2. Obter a localização
    const location = await getGeoLocation(clientIp);

    const db = await getDb();
    
    const newEvent: PageViewEvent = {
      id: uuidv4(),
      contentId,
      path,
      timestamp: new Date().toISOString(),
      country: location.country,
      regionName: location.regionName,
    };

    db.data.pageViews.push(newEvent);
    await db.write();

    return NextResponse.json({ success: true, message: 'Evento registrado' }, { status: 201 });
  } catch (error) {
    console.error('Failed to track page view:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
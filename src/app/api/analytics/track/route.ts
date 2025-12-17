import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { VisitData } from '@/lib/advertorial-types';
import { v4 as uuidv4 } from 'uuid';
import { Client } from 'pg';
import { getSocketIoInstance } from '../../../../../socket-server'; // Importa a instância do servidor Socket.IO

// Interface para os dados recebidos do cliente
interface ClientPayload {
    contentId: string;
    path: string;
    visitorId: string;
    deviceType: string;
    os: string;
    browser: string;
    userAgent: string;
    timestamp: string;
}

// Interface para a localização geográfica
interface GeoLocation {
    country?: string;
    regionName?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
}

// Função para buscar a localização baseada no IP
async function getGeoLocation(ip: string | null): Promise<GeoLocation> {
    if (!ip || ip === '::1' || ip === '127.0.0.1') {
        // IP local ou não disponível, retorna dados de teste
        return { 
            country: 'Brasil', 
            regionName: 'Goiás', 
            city: 'Goiânia', 
            latitude: -16.6869, 
            longitude: -49.2648 
        };
    }
    
    const apiKey = process.env.IPGEOLOCATION_API_KEY;
    const apiUrl = 'https://api.ipgeolocation.io/ipgeo';

    if (!apiKey) {
        console.warn("IPGEOLOCATION_API_KEY not set. Skipping GeoIP lookup.");
        return {};
    }

    try {
        const url = `${apiUrl}?apiKey=${apiKey}&ip=${ip}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(1000), 
        });

        if (!response.ok) {
            console.error(`GeoIP API returned status ${response.status}`);
            return {};
        }

        const data = await response.json();
        
        return {
            country: data.country_name || 'N/A',
            regionName: data.state_prov || 'N/A',
            city: data.city || 'N/A',
            latitude: parseFloat(data.latitude) || undefined,
            longitude: parseFloat(data.longitude) || undefined,
        };
    } catch (error) {
        console.error('GeoIP lookup failed:', error);
        return {};
    }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const payload: ClientPayload = await req.json();
    
    if (!payload.visitorId || !payload.path) {
      return NextResponse.json({ message: 'Dados de rastreamento incompletos' }, { status: 400 });
    }

    // 1. Obter o IP do cliente
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : null;
    
    // 2. Obter a localização detalhada
    const location: GeoLocation = await getGeoLocation(clientIp);

    const db: Client = await getDb();
    
    const newVisit: VisitData = {
      id: uuidv4(),
      visitorId: payload.visitorId,
      ip: clientIp || 'N/A',
      city: location.city || 'N/A',
      region: location.regionName || 'N/A',
      country: location.country || 'N/A',
      latitude: location.latitude,
      longitude: location.longitude,
      deviceType: payload.deviceType as VisitData['deviceType'],
      os: payload.os,
      browser: payload.browser,
      userAgent: payload.userAgent,
      createdAt: new Date().toISOString(),
    };

    // 3. Salvar no PostgreSQL (Tabela visits)
    await db.query(
      `INSERT INTO visits (
        id, visitor_id, ip, city, region, country, latitude, longitude, 
        device_type, os, browser, user_agent, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        newVisit.id, newVisit.visitorId, newVisit.ip, newVisit.city, newVisit.region, newVisit.country,
        newVisit.latitude, newVisit.longitude, newVisit.deviceType, newVisit.os, newVisit.browser,
        newVisit.userAgent, newVisit.createdAt
      ]
    );
    
    // 4. Emitir evento WebSocket em tempo real
    try {
        const io = getSocketIoInstance();
        // Emitir o novo evento de visita
        io.emit('new_visit', newVisit);
    } catch (socketError) {
        console.warn('Falha ao emitir evento Socket.IO (servidor pode estar inativo):', socketError);
    }
      
    return NextResponse.json({ success: true, message: 'Visita registrada' }, { status: 201 });
  } catch (error) {
    console.error('Failed to track detailed visit:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
import UAParser from 'ua-parser-js';
import { v4 as uuidv4 } from 'uuid';

// Define a interface para os dados de visita coletados no frontend
export interface ClientVisitData {
    visitorId: string;
    deviceType: 'mobile' | 'desktop' | 'tablet' | 'unknown';
    os: string;
    browser: string;
    userAgent: string;
    timestamp: string;
}

/**
 * Coleta dados do navegador e dispositivo usando ua-parser-js.
 */
export function collectClientData(): ClientVisitData {
    const parser = new UAParser();
    const result = parser.getResult();

    // Determina o tipo de dispositivo de forma mais robusta
    let deviceType: 'mobile' | 'desktop' | 'tablet' | 'unknown' = 'unknown';
    if (result.device.type === 'mobile') {
        deviceType = 'mobile';
    } else if (result.device.type === 'tablet') {
        deviceType = 'tablet';
    } else if (result.ua.includes('Mobile') || result.ua.includes('Android')) {
        deviceType = 'mobile';
    } else {
        deviceType = 'desktop';
    }

    // Tenta obter o visitorId do localStorage ou gera um novo
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem('visitorId', visitorId);
    }

    return {
        visitorId,
        deviceType,
        os: `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim(),
        browser: `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`.trim(),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
    };
}
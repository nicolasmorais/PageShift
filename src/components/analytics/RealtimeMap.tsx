"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import { getSocketClient } from '@/lib/socket';
import { VisitData } from '@/lib/advertorial-types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

// Configurações
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAX_MARKER_AGE_MS = 1000 * 60 * 5; // 5 minutos

interface RealtimeMapProps {
    onNewVisit: (visit: VisitData) => void;
    onActiveVisitorsChange: (count: number) => void;
}

// Estrutura para armazenar marcadores ativos
interface ActiveMarker {
    marker: Marker;
    timestamp: number;
    id: string;
}

export const RealtimeMap = ({ onNewVisit, onActiveVisitorsChange }: RealtimeMapProps) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map | null>(null);
    const markersRef = useRef<Record<string, ActiveMarker>>({});
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    // 1. Inicialização do Mapa
    useEffect(() => {
        if (!MAPBOX_TOKEN) {
            console.error("MAPBOX_TOKEN não configurado.");
            toast.error("Erro: MAPBOX_TOKEN não configurado para o mapa.");
            return;
        }
        mapboxgl.accessToken = MAPBOX_TOKEN;

        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v12', // Estilo padrão
                center: [-49.2648, -16.6869], // Centro inicial (Goiânia)
                zoom: 3,
                projection: { name: 'globe' } as any, // Habilita o globo
            });

            mapRef.current.on('load', () => {
                setIsMapLoaded(true);
                mapRef.current?.setFog({}); // Adiciona efeito de nevoeiro para o globo
            });
        }

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);

    // 2. Função para adicionar e animar o marcador
    const addMarker = useCallback((visit: VisitData) => {
        if (!mapRef.current || !visit.latitude || !visit.longitude) return;

        // Remove marcador antigo se existir
        if (markersRef.current[visit.id]) {
            markersRef.current[visit.id].marker.remove();
            delete markersRef.current[visit.id];
        }

        // Cria o elemento do marcador
        const el = document.createElement('div');
        el.className = 'marker-pulse';
        el.style.width = '16px';
        el.style.height = '16px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#6B16ED'; // Cor primária
        el.style.boxShadow = '0 0 0 0 rgba(107, 22, 237, 1)';
        el.style.animation = 'pulse 2s infinite';

        // Adiciona o marcador
        const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([visit.longitude, visit.latitude])
            .addTo(mapRef.current);

        // Adiciona um popup simples
        const popupContent = `
            <div class="p-1 text-xs text-gray-800 dark:text-white">
                <p class="font-bold">${visit.city}, ${visit.region}</p>
                <p>${visit.os} / ${visit.browser}</p>
                <p class="text-gray-500">${visit.deviceType}</p>
            </div>
        `;
        marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent));

        // Armazena a referência
        markersRef.current[visit.id] = {
            marker,
            timestamp: Date.now(),
            id: visit.id,
        };

        // Centraliza o mapa no novo ponto (animação suave)
        mapRef.current.flyTo({
            center: [visit.longitude, visit.latitude],
            zoom: Math.max(mapRef.current.getZoom(), 5),
            speed: 1.5,
            curve: 1,
            easing: (t) => t,
        });

    }, []);

    // 3. Conexão Socket.IO e Limpeza de Marcadores
    useEffect(() => {
        if (!isMapLoaded) return;

        const socket = getSocketClient();

        // Listener para novas visitas
        const handleNewVisit = (visit: VisitData) => {
            console.log("Nova visita recebida via Socket:", visit.city);
            addMarker(visit);
            onNewVisit(visit); // Notifica o componente pai
        };

        // Listener para contagem de visitantes ativos
        const handleActiveVisitors = (count: number) => {
            onActiveVisitorsChange(count);
        };

        socket.on('new_visit', handleNewVisit);
        socket.on('active_visitors', handleActiveVisitors);

        // Limpeza de marcadores antigos
        const cleanupInterval = setInterval(() => {
            const now = Date.now();
            Object.entries(markersRef.current).forEach(([id, activeMarker]) => {
                if (now - activeMarker.timestamp > MAX_MARKER_AGE_MS) {
                    activeMarker.marker.remove();
                    delete markersRef.current[id];
                }
            });
        }, 60000); // Roda a cada minuto

        return () => {
            socket.off('new_visit', handleNewVisit);
            socket.off('active_visitors', handleActiveVisitors);
            clearInterval(cleanupInterval);
        };
    }, [isMapLoaded, addMarker, onNewVisit, onActiveVisitorsChange]);

    // 4. Estilos CSS para a animação de pulso (injetado via globals.css ou aqui)
    
    return (
        <>
            <style jsx global>{`
                @keyframes pulse {
                    0% {
                        transform: scale(0.9);
                        box-shadow: 0 0 0 0 rgba(107, 22, 237, 0.7);
                    }
                    70% {
                        transform: scale(1);
                        box-shadow: 0 0 0 10px rgba(107, 22, 237, 0);
                    }
                    100% {
                        transform: scale(0.9);
                        box-shadow: 0 0 0 0 rgba(107, 22, 237, 0);
                    }
                }
                .marker-pulse {
                    animation: pulse 2s infinite;
                }
            `}</style>
            <div ref={mapContainerRef} className={cn("w-full h-[500px] rounded-lg shadow-lg", !isMapLoaded && "bg-gray-200 dark:bg-gray-800 animate-pulse")} />
        </>
    );
};
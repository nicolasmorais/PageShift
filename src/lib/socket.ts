import { io, Socket } from 'socket.io-client';

// A URL deve ser configurada via variável de ambiente NEXT_PUBLIC_SOCKET_URL
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

let socket: Socket | null = null;

/**
 * Retorna a instância singleton do cliente Socket.IO.
 */
export function getSocketClient(): Socket {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ['websocket'],
            reconnectionAttempts: 5,
        });

        socket.on('connect', () => {
            console.log('[Socket Client] Conectado ao servidor.');
        });

        socket.on('disconnect', () => {
            console.log('[Socket Client] Desconectado do servidor.');
        });

        socket.on('connect_error', (err) => {
            console.error('[Socket Client] Erro de conexão:', err.message);
        });
    }
    return socket;
}
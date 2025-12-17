import { Server } from 'socket.io';
import { createServer } from 'http';
import { getDb } from './src/lib/database'; // Importa a função de conexão com o DB

const PORT = process.env.SOCKET_PORT ? parseInt(process.env.SOCKET_PORT) : 3001;

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Permitir conexões de qualquer origem (para desenvolvimento)
        methods: ["GET", "POST"]
    }
});

// Armazena o objeto io para que possa ser acessado por outros módulos (como a API track)
let socketIoInstance: Server | null = null;

io.on('connection', (socket) => {
    console.log(`[Socket.IO] Cliente conectado: ${socket.id}`);
    
    // Opcional: Enviar o número de clientes ativos
    io.emit('active_visitors', io.engine.clientsCount);

    socket.on('disconnect', () => {
        console.log(`[Socket.IO] Cliente desconectado: ${socket.id}`);
        io.emit('active_visitors', io.engine.clientsCount);
    });
});

httpServer.listen(PORT, () => {
    console.log(`[Socket.IO] Servidor rodando na porta ${PORT}`);
    // Tenta conectar ao DB para garantir que as tabelas existam
    getDb().catch(err => console.error("Falha ao conectar o DB no servidor Socket:", err));
});

socketIoInstance = io;

/**
 * Retorna a instância do servidor Socket.IO.
 * @returns A instância do Server do Socket.IO.
 */
export function getSocketIoInstance(): Server {
    if (!socketIoInstance) {
        throw new Error("Socket.IO server not initialized.");
    }
    return socketIoInstance;
}
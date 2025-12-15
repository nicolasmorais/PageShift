import { DbSchema, defaultDbData } from './advertorial-types';
import { Client } from 'pg';

// Configuração de conexão baseada na variável de ambiente DATABASE_URL
const connectionString = process.env.DATABASE_URL;

let client: Client | null = null;

/**
 * Inicializa e retorna a instância do cliente PostgreSQL com lógica de retry.
 */
export async function getDb(): Promise<Client> {
    // FORÇAR USO DO POSTGRESQL - Se não tiver DATABASE_URL, usar valores padrão do docker-compose
    const dbConnectionString = connectionString || 'postgres://user:password@db:5432/mydatabase';

    if (client) {
        // Se o cliente já existe, verifica se a conexão ainda está válida
        try {
            await client.query('SELECT NOW()');
            return client;
        } catch (error) {
            console.warn('Conexão PostgreSQL existente falhou. Tentando reconectar...', error);
            client = null; // Reseta o cliente para forçar uma nova conexão
        }
    }

    if (!dbConnectionString) {
        throw new Error("DATABASE_URL não configurada. O PostgreSQL é obrigatório para este projeto.");
    }

    let retries = 5;
    let lastError: Error | null = null;

    while (retries > 0) {
        try {
            // Importação dinâmica para evitar erro de dependência se pg não for usado
            const { Client: PgClient } = await import('pg');
            client = new PgClient({ connectionString: dbConnectionString });
            
            await client.connect();
            console.log("Conexão PostgreSQL estabelecida com sucesso.");
            
            // Criar tabelas se não existirem
            await ensureTablesExist(client);
            
            return client;
        } catch (error: any) {
            lastError = error;
            console.error(`Falha ao conectar ao PostgreSQL (tentativas restantes: ${retries - 1}):`, error.message);
            retries--;
            // Espera 5 segundos antes de tentar novamente
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    // Se todas as tentativas falharem, lança o último erro
    throw new Error(`Não foi possível conectar ao PostgreSQL após várias tentativas. Último erro: ${lastError?.message}`);
}

/**
 * Garante que as tabelas necessárias existam no PostgreSQL
 */
async function ensureTablesExist(client: Client): Promise<void> {
    // Tabela para rotas
    await client.query(`
        CREATE TABLE IF NOT EXISTS routes (
            path VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            content_id VARCHAR(255) NOT NULL
        );
    `);
    
    // Tabela para visualizações de página
    await client.query(`
        CREATE TABLE IF NOT EXISTS page_views (
            id UUID PRIMARY KEY,
            content_id VARCHAR(255) NOT NULL,
            path VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            country VARCHAR(100),
            region_name VARCHAR(100)
        );
    `);
    
    // Tabela para configurações
    await client.query(`
        CREATE TABLE IF NOT EXISTS settings (
            key VARCHAR(255) PRIMARY KEY,
            value JSONB NOT NULL
        );
    `);
    
    // Tabela para Advertoriais Dinâmicos
    await client.query(`
        CREATE TABLE IF NOT EXISTS custom_advertorials (
            id UUID PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            data JSONB NOT NULL
        );
    `);
    
    // Inserir dados padrão se não existirem
    await insertDefaultData(client);
    
    console.log("Tabelas do PostgreSQL verificadas/criadas.");
}

/**
 * Insere dados padrão nas tabelas se não existirem
 */
async function insertDefaultData(client: Client): Promise<void> {
    // Verificar se já existem rotas
    const routeCount = await client.query('SELECT COUNT(*) FROM routes');
    if (parseInt(routeCount.rows[0].count) === 0) {
        // Inserir rotas padrão
        const defaultRoutes = [
            { path: '/', name: 'Página Principal', content_id: 'v1' },
            { path: '/v1', name: 'Rota do Advertorial V1', content_id: 'v1' },
            { path: '/v2', name: 'Rota do Advertorial V2', content_id: 'v2' },
            { path: '/v3', name: 'Rota do Advertorial V3', content_id: 'v3' },
            { path: '/aprovado', name: 'Página de Aprovação (Preview)', content_id: 'ap' },
        ];

        for (const route of defaultRoutes) {
            await client.query(
                'INSERT INTO routes (path, name, content_id) VALUES ($1, $2, $3)',
                [route.path, route.name, route.content_id]
            );
        }
    }

    // Verificar se já existe configuração de approval page
    const approvalPageCount = await client.query('SELECT COUNT(*) FROM settings WHERE key = $1', ['approvalPageContent']);
    if (parseInt(approvalPageCount.rows[0].count) === 0) {
        await client.query(
            'INSERT INTO settings (key, value) VALUES ($1, $2)',
            ['approvalPageContent', JSON.stringify(defaultDbData.approvalPageContent)]
        );
    }

    // Verificar se já existe configuração de pixels
    const pixelConfigCount = await client.query('SELECT COUNT(*) FROM settings WHERE key = $1', ['pixelConfig']);
    if (parseInt(pixelConfigCount.rows[0].count) === 0) {
        await client.query(
            'INSERT INTO settings (key, value) VALUES ($1, $2)',
            ['pixelConfig', JSON.stringify(defaultDbData.pixelConfig)]
        );
    }

    // Verificar se já existe configuração de auth
    const authCount = await client.query('SELECT COUNT(*) FROM settings WHERE key = $1', ['auth']);
    if (parseInt(authCount.rows[0].count) === 0) {
        await client.query(
            'INSERT INTO settings (key, value) VALUES ($1, $2)',
            ['auth', JSON.stringify(defaultDbData.auth)]
        );
    }
}

/**
 * Função de compatibilidade para verificar se está usando PostgreSQL.
 * Sempre retorna true, pois o lowdb foi removido.
 */
export function isUsingPostgres(): boolean {
    return true;
}
import { DbSchema, defaultDbData } from './advertorial-types';
import { Client } from 'pg';

// Não armazenamos a connectionString fora para garantir que pegamos a mais recente do env
let client: Client | null = null;

export async function getDb(): Promise<Client> {
    const connectionString = process.env.DATABASE_URL;
    // Usando credenciais padrão PostgreSQL que devem funcionar
    const dbConnectionString = connectionString || 'postgres://postgres:password@localhost:5432/postgres';

    // Se o cliente já existe, tenta uma consulta simples para ver se a conexão ainda é válida
    if (client) {
        try {
            await client.query('SELECT 1');
            return client;
        } catch (error) {
            console.warn("Conexão antiga perdida, tentando reconectar...");
            client = null;
        }
    }

    let retries = 5;
    while (retries > 0) {
        try {
            const { Client: PgClient } = await import('pg');
            client = new PgClient({ connectionString: dbConnectionString });
            await client.connect();
            console.log("Conectado ao banco de dados com sucesso.");
            await ensureTablesExist(client);
            return client;
        } catch (error: any) {
            console.error(`Falha na conexão (tentativa ${6 - retries}/5):`, error.message);
            retries--;
            if (retries > 0) await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    throw new Error(`Não foi possível conectar ao banco de dados após várias tentativas.`);
}

async function ensureTablesExist(client: Client): Promise<void> {
    await client.query(`CREATE TABLE IF NOT EXISTS routes (path VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, content_id VARCHAR(255) NOT NULL);`);
    await client.query(`CREATE TABLE IF NOT EXISTS page_views (id UUID PRIMARY KEY, content_id VARCHAR(255) NOT NULL, path VARCHAR(255) NOT NULL, timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, country VARCHAR(100), region_name VARCHAR(100));`);
    await client.query(`CREATE TABLE IF NOT EXISTS settings (key VARCHAR(255) PRIMARY KEY, value JSONB NOT NULL);`);
    await client.query(`CREATE TABLE IF NOT EXISTS custom_advertorials (id UUID PRIMARY KEY, name VARCHAR(255) NOT NULL, data JSONB NOT NULL);`);
    await client.query(`CREATE TABLE IF NOT EXISTS visits (id UUID PRIMARY KEY, visitor_id UUID NOT NULL, ip VARCHAR(50), city VARCHAR(100), region VARCHAR(100), country VARCHAR(100), latitude NUMERIC(10, 7), longitude NUMERIC(10, 7), device_type VARCHAR(50), os VARCHAR(100), browser VARCHAR(100), user_agent TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`);
    
    await client.query(`CREATE INDEX IF NOT EXISTS idx_visits_created_at ON visits (created_at);`);
    
    await insertDefaultData(client);
}

async function insertDefaultData(client: Client): Promise<void> {
    // Configurações iniciais
    const configs = [
        { key: 'approvalPageContent', value: defaultDbData.approvalPageContent },
        { key: 'pixelConfig', value: defaultDbData.pixelConfig },
        { key: 'auth', value: defaultDbData.auth },
    ];

    for (const cfg of configs) {
        const check = await client.query('SELECT COUNT(*) FROM settings WHERE key = $1', [cfg.key]);
        if (parseInt(check.rows[0].count) === 0) {
            await client.query('INSERT INTO settings (key, value) VALUES ($1, $2)', [cfg.key, JSON.stringify(cfg.value)]);
        }
    }
    
    // Rotas padrão
    const defaultRoutes = [
        { path: '/', name: 'Página Principal', content_id: 'v1' },
        { path: '/v1', name: 'Rota do Advertorial V1', content_id: 'v1' },
        { path: '/v2', name: 'Rota do Advertorial V2', content_id: 'v2' },
        { path: '/v3', name: 'Rota do Advertorial V3', content_id: 'v3' },
        { path: '/aprovado', name: 'Página de Aprovação (Preview)', content_id: 'ap' },
        { path: '/menopausa', name: 'Vendas: Menopausa Nunca Mais', content_id: 'menopausa' },
    ];

    for (const route of defaultRoutes) {
        await client.query(
            'INSERT INTO routes (path, name, content_id) VALUES ($1, $2, $3) ON CONFLICT (path) DO NOTHING',
            [route.path, route.name, route.content_id]
        );
    }
}

export function isUsingPostgres(): boolean { return true; }
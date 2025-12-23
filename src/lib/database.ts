import { DbSchema, defaultDbData } from './advertorial-types';
import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL;
let client: Client | null = null;

export async function getDb(): Promise<Client> {
    const dbConnectionString = connectionString || 'postgres://user:password@db:5432/mydatabase';

    if (client) {
        try {
            await client.query('SELECT NOW()');
            return client;
        } catch (error) {
            client = null;
        }
    }

    let retries = 5;
    while (retries > 0) {
        try {
            const { Client: PgClient } = await import('pg');
            client = new PgClient({ connectionString: dbConnectionString });
            await client.connect();
            await ensureTablesExist(client);
            return client;
        } catch (error: any) {
            retries--;
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    throw new Error(`Connection failed.`);
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
            'INSERT INTO routes (path, name, content_id) VALUES ($1, $2, $3) ON CONFLICT (path) DO UPDATE SET content_id = $3, name = $2',
            [route.path, route.name, route.content_id]
        );
    }

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
}

export function isUsingPostgres(): boolean { return true; }
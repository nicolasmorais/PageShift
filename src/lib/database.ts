import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { DbSchema, defaultDbData } from './advertorial-types';
import { Client } from 'pg'; // Importando Client

// Esta classe simula a interface do lowdb (db.data) para que o código do Next.js
// possa ser migrado gradualmente.
class PgDbSimulator {
    private client: Client;
    
    constructor(client: Client) {
        this.client = client;
    }
    
    // Adiciona o getter 'data' que retorna 'this' para compatibilidade com db.data.prop
    get data(): PgDbSimulator {
        return this;
    }
    
    // --- Implementação de Leitura (GET) ---
    
    // Nota: A implementação completa de todas as propriedades (routes, customAdvertorials, etc.)
    // deve ser feita aqui, mas por enquanto, retornamos os defaults para evitar quebras.
    
    get examples(): DbSchema['examples'] {
        // Em um ambiente real, você faria uma busca assíncrona aqui,
        // mas como o lowdb é síncrono, precisamos de um wrapper.
        // Por enquanto, retornamos um array vazio para evitar erros de acesso.
        console.warn("Acesso síncrono a 'examples' no PgDbSimulator. Use funções assíncronas para leitura real.");
        return defaultDbData.examples;
    }
    
    get routes(): DbSchema['routes'] {
        // Em um ambiente real, você faria uma busca assíncrona aqui,
        // mas como o lowdb é síncrono, precisamos de um wrapper.
        // Por enquanto, retornamos um array vazio para evitar erros de acesso.
        console.warn("Acesso síncrono a 'routes' no PgDbSimulator. Use funções assíncronas para leitura real.");
        return defaultDbData.routes; 
    }
    
    get approvalPageContent(): DbSchema['approvalPageContent'] {
        console.warn("Acesso síncrono a 'approvalPageContent' no PgDbSimulator.");
        return defaultDbData.approvalPageContent;
    }
    
    get customAdvertorials(): DbSchema['customAdvertorials'] {
        console.warn("Acesso síncrono a 'customAdvertorials' no PgDbSimulator.");
        return defaultDbData.customAdvertorials;
    }
    
    get auth(): DbSchema['auth'] {
        console.warn("Acesso síncrono a 'auth' no PgDbSimulator.");
        return defaultDbData.auth;
    }
    
    get pixelConfig(): DbSchema['pixelConfig'] {
        console.warn("Acesso síncrono a 'pixelConfig' no PgDbSimulator.");
        return defaultDbData.pixelConfig;
    }
    
    get pageViews(): DbSchema['pageViews'] {
        console.warn("Acesso síncrono a 'pageViews' no PgDbSimulator.");
        return defaultDbData.pageViews;
    }
    
    // --- Implementação de Escrita (POST/PUT/DELETE) ---
    
    // O método write() é mantido para compatibilidade, mas deve ser evitado.
    async write(): Promise<void> {
        console.warn("Chamada a 'db.write()' no PgDbSimulator. Esta função não faz nada no modo PostgreSQL. Use funções de persistência específicas.");
    }
}

// Configuração de conexão baseada na variável de ambiente DATABASE_URL
const connectionString = process.env.DATABASE_URL;

let db: Low<DbSchema> | PgDbSimulator;
let isPostgres = false;

/**
 * Inicializa e retorna a instância do banco de dados (lowdb ou PostgreSQL)
 */
export async function getDb(): Promise<Low<DbSchema> | PgDbSimulator> {
    if (db) {
        return db;
    }

    // FORÇAR USO DO POSTGRESQL - Se não tiver DATABASE_URL, usar valores padrão do docker-compose
    const dbConnectionString = connectionString || 'postgres://user:password@db:5432/mydatabase';

    if (dbConnectionString) {
        // Modo PostgreSQL
        try {
            // Importação dinâmica para evitar erro de dependência se pg não for usado
            const { Client: PgClient } = await import('pg');
            const client = new PgClient({ connectionString: dbConnectionString });
            await client.connect();
            console.log("Conexão PostgreSQL estabelecida com sucesso.");
            
            // Criar tabelas se não existirem
            await ensureTablesExist(client);
            
            db = new PgDbSimulator(client);
            isPostgres = true;
            return db;
        } catch (error) {
            console.error("Falha ao conectar ao PostgreSQL:", error);
            throw new Error("Não foi possível conectar ao PostgreSQL. Verifique a configuração DATABASE_URL.");
        }
    }

    // NÃO USAR LOWDB - Lançar erro se não conseguir conectar ao PostgreSQL
    throw new Error("DATABASE_URL não configurada. O PostgreSQL é obrigatório para este projeto.");
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
 * Retorna o caminho para o arquivo do banco de dados (mantido para compatibilidade)
 */
function getDatabasePath(): string {
    const databaseDir = process.env.DATABASE_DIR || './data';
    return `${databaseDir}/db.json`;
}

/**
 * Verifica se está usando PostgreSQL
 */
export function isUsingPostgres(): boolean {
    return isPostgres;
}

// Exporta o PgDbSimulator para uso em outros arquivos se necessário
export { PgDbSimulator };
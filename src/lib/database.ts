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
    console.log("Verificando/criando tabelas no PostgreSQL...");
    
    // Tabela para rotas
    await client.query(`
        CREATE TABLE IF NOT EXISTS routes (
            path VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            content_id VARCHAR(255) NOT NULL
        );
    `);
    console.log("Tabela 'routes' verificada/criada.");
    
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
    console.log("Tabela 'page_views' verificada/criada.");
    
    // Tabela para configurações
    await client.query(`
        CREATE TABLE IF NOT EXISTS settings (
            key VARCHAR(255) PRIMARY KEY,
            value JSONB NOT NULL
        );
    `);
    console.log("Tabela 'settings' verificada/criada.");
    
    // Tabela para Advertoriais Dinâmicos
    await client.query(`
        CREATE TABLE IF NOT EXISTS custom_advertorials (
            id UUID PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            data JSONB NOT NULL
        );
    `);
    console.log("Tabela 'custom_advertorials' verificada/criada.");
    
    // Tabela para VISITS (Analytics em tempo real)
    await client.query(`
        CREATE TABLE IF NOT EXISTS visits (
            id UUID PRIMARY KEY,
            visitor_id UUID NOT NULL,
            ip VARCHAR(50),
            city VARCHAR(100),
            region VARCHAR(100),
            country VARCHAR(100),
            latitude NUMERIC(10, 7),
            longitude NUMERIC(10, 7),
            device_type VARCHAR(50),
            os VARCHAR(100),
            browser VARCHAR(100),
            user_agent TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
    
    // Criar índices
    await client.query(`CREATE INDEX IF NOT EXISTS idx_visits_created_at ON visits (created_at);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_visits_country ON visits (country);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_visits_city ON visits (city);`);
    console.log("Tabela 'visits' e índices verificados/criados.");
    
    // Inserir dados padrão se não existirem
    await insertDefaultData(client);
    
    console.log("Todas as tabelas verificadas/criadas com sucesso.");
}

/**
 * Insere dados padrão nas tabelas se não existirem
 */
async function insertDefaultData(client: Client): Promise<void> {
    console.log("Verificando dados padrão...");
    
    // Verificar se já existem rotas
    const routeCountResult = await client.query('SELECT COUNT(*) FROM routes');
    const routeCount = parseInt(routeCountResult.rows[0].count);
    
    if (routeCount < 6) { // Aumentado para acomodar novas rotas padrão
        console.log("Inserindo/Atualizando rotas padrão...");
        const defaultRoutes = [
            { path: '/', name: 'Página Principal', content_id: 'v1' },
            { path: '/v1', name: 'Rota do Advertorial V1', content_id: 'v1' },
            { path: '/v2', name: 'Rota do Advertorial V2', content_id: 'v2' },
            { path: '/v3', name: 'Rota do Advertorial V3', content_id: 'v3' },
            { path: '/aprovado', name: 'Página de Aprovação (Preview)', content_id: 'ap' },
            { path: '/menopausa', name: 'Vendas: Menopausa Nunca Mais', content_id: 'menopausa' }, // NEW
        ];

        for (const route of defaultRoutes) {
            await client.query(
                'INSERT INTO routes (path, name, content_id) VALUES ($1, $2, $3) ON CONFLICT (path) DO UPDATE SET content_id = $3, name = $2',
                [route.path, route.name, route.content_id]
            );
        }
        console.log("Rotas padrão inseridas/atualizadas.");
    }

    // Verificar se já existe configuração de approval page
    const approvalPageCount = await client.query('SELECT COUNT(*) FROM settings WHERE key = $1', ['approvalPageContent']);
    if (parseInt(approvalPageCount.rows[0].count) === 0) {
        console.log("Inserindo configuração padrão da approval page...");
        await client.query(
            'INSERT INTO settings (key, value) VALUES ($1, $2)',
            ['approvalPageContent', JSON.stringify(defaultDbData.approvalPageContent)]
        );
        console.log("Configuração da approval page inserida.");
    }

    // Verificar se já existe configuração de pixels
    const pixelConfigCount = await client.query('SELECT COUNT(*) FROM settings WHERE key = $1', ['pixelConfig']);
    if (parseInt(pixelConfigCount.rows[0].count) === 0) {
        console.log("Inserindo configuração padrão de pixels...");
        await client.query(
            'INSERT INTO settings (key, value) VALUES ($1, $2)',
            ['pixelConfig', JSON.stringify(defaultDbData.pixelConfig)]
        );
        console.log("Configuração de pixels inserida.");
    }

    // Verificar se já existe configuração de auth
    const authCount = await client.query('SELECT COUNT(*) FROM settings WHERE key = $1', ['auth']);
    if (parseInt(authCount.rows[0].count) === 0) {
        console.log("Inserindo configuração padrão de auth...");
        await client.query(
            'INSERT INTO settings (key, value) VALUES ($1, $2)',
            ['auth', JSON.stringify(defaultDbData.auth)]
        );
        console.log("Configuração de auth inserida.");
    }
    
    console.log("Verificação de dados padrão concluída.");
}

/**
 * Função de compatibilidade para verificar se está usando PostgreSQL.
 * Sempre retorna true, pois o lowdb foi removido.
 */
export function isUsingPostgres(): boolean {
    return true;
}
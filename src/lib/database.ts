import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import fs from 'fs';
import { 
  RouteMapping, 
  ApprovalPageContent, 
  CustomAdvertorial, 
  defaultCustomAdvertorialFooter,
  defaultDbData,
  AuthSchema,
  GlobalPixelConfig,
  PageViewEvent
} from './advertorial-types';
import { getPgClient } from './postgres'; // NEW: Importa o cliente PG

// ----------------------------------------------

interface DbSchema {
  examples: { id: number; name: string; createdAt: string }[];
  routes: RouteMapping[];
  approvalPageContent: ApprovalPageContent;
  customAdvertorials: CustomAdvertorial[];
  auth: AuthSchema;
  pixelConfig: GlobalPixelConfig;
  pageViews: PageViewEvent[];
}

const DB_FILE_NAME = 'db.json';
const DB_DIR_PATH = process.env.DATABASE_DIR || './data';
const DB_FULL_PATH = path.resolve(process.cwd(), DB_DIR_PATH, DB_FILE_NAME);

let dbInstance: Low<DbSchema> | null = null;

// ----------------------------------------------
// Interface para simular o objeto db.data do lowdb, mas usando funções assíncronas
// para buscar dados do PostgreSQL.
// ----------------------------------------------

interface PgDbData {
    // Acesso a dados simulado para compatibilidade com o código existente
    examples: { id: number; name: string; createdAt: string }[];
    routes: RouteMapping[];
    approvalPageContent: ApprovalPageContent;
    customAdvertorials: CustomAdvertorial[];
    auth: AuthSchema;
    pixelConfig: GlobalPixelConfig;
    pageViews: PageViewEvent[];
}

// Esta classe simula a interface do lowdb (db.data) para que o código do Next.js
// possa ser migrado gradualmente.
class PgDbSimulator {
    private client: any; // pg.Client
    
    constructor(client: any) {
        this.client = client;
    }
    
    // Adiciona o getter 'data' que retorna 'this' para compatibilidade com db.data.prop
    get data(): PgDbSimulator {
        return this;
    }
    
    // --- Implementação de Leitura (GET) ---
    
    // Nota: A implementação completa de todas as propriedades (routes, customAdvertorials, etc.)
    // deve ser feita aqui, mas por enquanto, retornamos os defaults para evitar quebras.
    
    get routes(): RouteMapping[] {
        // Em um ambiente real, você faria uma busca assíncrona aqui,
        // mas como o lowdb é síncrono, precisamos de um wrapper.
        // Por enquanto, retornamos um array vazio para evitar erros de acesso.
        console.warn("Acesso síncrono a 'routes' no PgDbSimulator. Use funções assíncronas para leitura real.");
        return defaultDbData.routes; 
    }
    
    get approvalPageContent(): ApprovalPageContent {
        console.warn("Acesso síncrono a 'approvalPageContent' no PgDbSimulator.");
        return defaultDbData.approvalPageContent;
    }
    
    get customAdvertorials(): CustomAdvertorial[] {
        console.warn("Acesso síncrono a 'customAdvertorials' no PgDbSimulator.");
        return defaultDbData.customAdvertorials;
    }
    
    get auth(): AuthSchema {
        console.warn("Acesso síncrono a 'auth' no PgDbSimulator.");
        return defaultDbData.auth;
    }
    
    get pixelConfig(): GlobalPixelConfig {
        console.warn("Acesso síncrono a 'pixelConfig' no PgDbSimulator.");
        return defaultDbData.pixelConfig;
    }
    
    get pageViews(): PageViewEvent[] {
        console.warn("Acesso síncrono a 'pageViews' no PgDbSimulator.");
        return defaultDbData.pageViews;
    }
    
    // --- Implementação de Escrita (POST/PUT/DELETE) ---
    
    // Para escrita, o código do Next.js deve ser atualizado para usar funções assíncronas
    // que interagem diretamente com o PostgreSQL, em vez de modificar db.data.
    // Por exemplo, em vez de `db.data.routes.push(newRoute); await db.write();`,
    // o código deve chamar uma função `await savePgRoute(newRoute);`.
    
    // O método write() é mantido para compatibilidade, mas deve ser evitado.
    async write() {
        console.warn("Chamada a 'db.write()' no PgDbSimulator. Esta função não faz nada no modo PostgreSQL. Use funções de persistência específicas.");
    }
}

// ----------------------------------------------
// Função Principal de Conexão
// ----------------------------------------------

/**
 * Retorna a instância do banco de dados (lowdb) ou um simulador (PostgreSQL).
 * @returns A instância do lowdb (para lowdb) ou um objeto compatível (para PostgreSQL).
 */
export async function getDb(): Promise<Low<DbSchema> | PgDbSimulator> {
  // 1. Tenta conectar ao PostgreSQL se DATABASE_URL estiver configurada
  if (process.env.DATABASE_URL) {
    try {
        const pgClient = await getPgClient();
        // Retorna o simulador que usa o cliente PG internamente
        return new PgDbSimulator(pgClient);
    } catch (error) {
        // Se a conexão PG falhar, loga o erro e continua para o fallback lowdb
        console.error("Falha na conexão PostgreSQL. Usando lowdb como fallback.");
        // Se a conexão PG falhar, precisamos garantir que o lowdb ainda funcione.
        // O código abaixo continuará a inicialização do lowdb.
    }
  }

  // 2. Fallback para lowdb (JSON file)
  if (dbInstance) {
    if (dbInstance.data) {
      return dbInstance;
    }
    await dbInstance.read();
    return dbInstance;
  }

  try {
    // Ensure the directory exists
    const dir = path.dirname(DB_FULL_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const defaultData = {
      examples: [],
      routes: defaultDbData.routes,
      approvalPageContent: defaultDbData.approvalPageContent,
      customAdvertorials: defaultDbData.customAdvertorials,
      auth: defaultDbData.auth,
      pixelConfig: defaultDbData.pixelConfig,
      pageViews: defaultDbData.pageViews,
    };

    const adapter = new JSONFile<DbSchema>(DB_FULL_PATH);
    dbInstance = new Low<DbSchema>(adapter, defaultData);

    await dbInstance.read();

    // Initialize with default data if file doesn't exist or is empty
    if (!dbInstance.data || Object.keys(dbInstance.data).length === 0) {
      dbInstance.data = defaultData;
      await dbInstance.write();
    } else {
      // Ensure all collections exist and have defaults if missing
      let needsUpdate = false;
      
      if (!dbInstance.data.routes) {
        dbInstance.data.routes = defaultDbData.routes;
        needsUpdate = true;
      }
      if (!dbInstance.data.approvalPageContent) {
        dbInstance.data.approvalPageContent = defaultDbData.approvalPageContent;
        needsUpdate = true;
      }
      if (!dbInstance.data.customAdvertorials) {
        dbInstance.data.customAdvertorials = defaultDbData.customAdvertorials;
        needsUpdate = true;
      }
      if (!dbInstance.data.auth) {
        dbInstance.data.auth = defaultDbData.auth;
        needsUpdate = true;
      }
      if (!dbInstance.data.pixelConfig) {
        dbInstance.data.pixelConfig = defaultDbData.pixelConfig;
        needsUpdate = true;
      }
      if (!dbInstance.data.pageViews) {
        dbInstance.data.pageViews = defaultDbData.pageViews;
        needsUpdate = true;
      }
      
      // Ensure existing custom advertorials have the new footer structure
      dbInstance.data.customAdvertorials = dbInstance.data.customAdvertorials.map(adv => ({
        ...adv,
        footer: adv.footer || defaultCustomAdvertorialFooter,
      }));

      if (needsUpdate) {
        await dbInstance.write();
      }
    }
    
    return dbInstance;
  } catch (error) {
    console.error('Failed to initialize lowdb:', error);
    throw error;
  }
}
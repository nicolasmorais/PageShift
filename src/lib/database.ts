import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import fs from 'fs';

interface RouteMapping {
  path: string;
  contentId: string;
  name: string;
}

interface ApprovalPageContent {
  header: {
    preTitle: string;
    title: string;
  };
  content: {
    intro: string;
    pillarsTitle: string;
    pillars: string[];
    outro: string;
  };
  footer: {
    disclaimer: string;
    copyright: string;
  };
}

interface DbSchema {
  examples: { id: number; name: string; createdAt: string }[];
  routes: RouteMapping[];
  approvalPageContent: ApprovalPageContent;
}

const DB_FILE_NAME = 'db.json';
const DB_DIR_PATH = process.env.DATABASE_DIR || './data';
const DB_FULL_PATH = path.resolve(process.cwd(), DB_DIR_PATH, DB_FILE_NAME);

let dbInstance: Low<DbSchema> | null = null;

const defaultApprovalPageContent: ApprovalPageContent = {
  header: {
    preTitle: "Bem-Estar e Saúde",
    title: "Um Guia Para Uma Rotina Mais Saudável",
  },
  content: {
    intro: "Descubra práticas e dicas que podem ser incorporadas no seu dia a dia para promover mais equilíbrio e bem-estar. Uma rotina bem estruturada é o primeiro passo para uma vida mais saudável.",
    pillarsTitle: "Pilares do Bem-Estar",
    pillars: [
      "Alimentação Consciente",
      "Hidratação Adequada",
      "Movimento e Atividade Física",
      "Descanso e Recuperação",
    ],
    outro: "Nosso guia oferece um olhar aprofundado sobre como pequenas mudanças podem gerar grandes resultados na sua saúde e disposição diária.",
  },
  footer: {
    disclaimer: "AVISO LEGAL: Este conteúdo é informativo. Sempre consulte um profissional da saúde para tratar de assuntos relativos à sua saúde.",
    copyright: "Todos os direitos reservados © 2024",
  },
};

export async function getDb(): Promise<Low<DbSchema>> {
  if (dbInstance) {
    if (dbInstance.data) {
      return dbInstance;
    }
    await dbInstance.read();
    return dbInstance;
  }

  try {
    const dir = path.dirname(DB_FULL_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const adapter = new JSONFile<DbSchema>(DB_FULL_PATH);
    dbInstance = new Low<DbSchema>(adapter, { 
      examples: [],
      routes: [
        { path: '/', name: 'Página Principal', contentId: 'v1' },
        { path: '/v1', name: 'Rota do Advertorial V1', contentId: 'v1' },
        { path: '/v2', name: 'Rota do Advertorial V2', contentId: 'v2' },
        { path: '/v3', name: 'Rota do Advertorial V3', contentId: 'v3' },
      ],
      approvalPageContent: defaultApprovalPageContent,
    });

    await dbInstance.read();

    // Ensure default data exists if file was empty
    if (!dbInstance.data.routes) {
      dbInstance.data.routes = [];
    }
    if (!dbInstance.data.approvalPageContent) {
      dbInstance.data.approvalPageContent = defaultApprovalPageContent;
    }
    
    await dbInstance.write();

    console.log(`Database initialized/loaded from: ${DB_FULL_PATH}`);
    return dbInstance;
  } catch (error) {
    console.error('Failed to initialize Lowdb database:', error);
    throw error;
  }
}
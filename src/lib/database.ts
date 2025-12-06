import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import fs from 'fs';

interface RouteMapping {
  path: string; // e.g., "/", "/v1", "/v2"
  contentId: string; // e.g., "v1", "v2", "ap"
  name: string; // A friendly name for the dashboard
}

interface DbSchema {
  examples: { id: number; name: string; createdAt: string }[];
  routes: RouteMapping[];
}

const DB_FILE_NAME = 'db.json';
const DB_DIR_PATH = process.env.DATABASE_DIR || './data';
const DB_FULL_PATH = path.resolve(process.cwd(), DB_DIR_PATH, DB_FILE_NAME);

let dbInstance: Low<DbSchema> | null = null;

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
        { path: '/', name: 'Main Page', contentId: 'v1' },
        { path: '/v1', name: 'Advertorial V1 Path', contentId: 'v1' },
        { path: '/v2', name: 'Advertorial V2 Path', contentId: 'v2' },
        { path: '/v3', name: 'Advertorial V3 Path', contentId: 'v3' },
      ]
    });

    await dbInstance.read();

    if (!dbInstance.data.routes || dbInstance.data.routes.length === 0) {
      dbInstance.data.routes = [
        { path: '/', name: 'Main Page', contentId: 'v1' },
        { path: '/v1', name: 'Advertorial V1 Path', contentId: 'v1' },
        { path: '/v2', name: 'Advertorial V2 Path', contentId: 'v2' },
        { path: '/v3', name: 'Advertorial V3 Path', contentId: 'v3' },
      ];
      await dbInstance.write();
    }

    console.log(`Database initialized/loaded from: ${DB_FULL_PATH}`);
    return dbInstance;
  } catch (error) {
    console.error('Failed to initialize Lowdb database:', error);
    throw error;
  }
}
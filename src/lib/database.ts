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
  PixelConfig, // NEW: Import PixelConfig
  defaultPixelConfig // NEW: Import defaultPixelConfig
} from './advertorial-types';

// ----------------------------------------------

interface DbSchema {
  examples: { id: number; name: string; createdAt: string }[];
  routes: RouteMapping[];
  approvalPageContent: ApprovalPageContent;
  customAdvertorials: CustomAdvertorial[];
  auth: AuthSchema;
  pixelConfig: PixelConfig; // NEW: Pixel configuration
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
      pixelConfig: defaultDbData.pixelConfig, // Include pixelConfig default
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
      if (!dbInstance.data.pixelConfig) { // Check for new pixelConfig field
        dbInstance.data.pixelConfig = defaultDbData.pixelConfig;
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
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
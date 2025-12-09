import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import fs from 'fs';
import { 
  RouteMapping, 
  ApprovalPageContent, 
  CustomAdvertorial, 
  defaultCustomAdvertorialFooter,
  defaultDbData
} from './advertorial-types';

// ----------------------------------------------

interface DbSchema {
  examples: { id: number; name: string; createdAt: string }[];
  routes: RouteMapping[];
  approvalPageContent: ApprovalPageContent;
  customAdvertorials: CustomAdvertorial[];
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
      console.log(`Created database directory: ${dir}`);
    }

    // Check if database file exists
    const dbExists = fs.existsSync(DB_FULL_PATH);
    console.log(`Database file exists: ${dbExists} at ${DB_FULL_PATH}`);

    const adapter = new JSONFile<DbSchema>(DB_FULL_PATH);
    dbInstance = new Low<DbSchema>(adapter);

    // Try to read existing data
    await dbInstance.read();

    // Initialize with default data if file doesn't exist or is empty
    if (!dbInstance.data || Object.keys(dbInstance.data).length === 0) {
      console.log('Initializing database with default data...');
      dbInstance.data = {
        examples: [],
        routes: defaultDbData.routes,
        approvalPageContent: defaultDbData.approvalPageContent,
        customAdvertorials: defaultDbData.customAdvertorials,
      };
      await dbInstance.write();
      console.log('Database initialized successfully');
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
      
      // Ensure existing custom advertorials have the new footer structure
      dbInstance.data.customAdvertorials = dbInstance.data.customAdvertorials.map(adv => ({
        ...adv,
        footer: adv.footer || defaultCustomAdvertorialFooter,
      }));

      if (needsUpdate) {
        await dbInstance.write();
        console.log('Database structure updated');
      }
    }

    console.log(`Database loaded successfully from: ${DB_FULL_PATH}`);
    console.log(`Routes count: ${dbInstance.data.routes.length}`);
    console.log(`Custom advertorials count: ${dbInstance.data.customAdvertorials.length}`);
    
    return dbInstance;
  } catch (error) {
    console.error('Failed to initialize Lowdb database:', error);
    console.error('Database path:', DB_FULL_PATH);
    console.error('Database directory:', DB_DIR_PATH);
    throw error;
  }
}